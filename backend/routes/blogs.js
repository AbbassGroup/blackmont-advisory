const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// ─── Image uploads ────────────────────────────────────────────────────────────
const uploadDir = path.join(__dirname, '../uploads/blogs/');
fs.mkdirSync(uploadDir, { recursive: true });
const MAX_UPLOAD_MB = 10;

// Keep the original extension so the file is served with the right content type.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname) || '').toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_UPLOAD_MB * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Uploaded file must be an image'), false);
  },
});

function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return fail(res, 400, `File too large. Maximum allowed size is ${MAX_UPLOAD_MB}MB.`);
  }
  if (err) return fail(res, 400, err.message);
  next();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const OBJECT_ID_RE = /^[0-9a-fA-F]{24}$/;
const DEFAULT_PER_PAGE = 12;

function publicBase(req) {
  return process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
}

function ok(res, statusCode, message, extra = {}) {
  return res.status(statusCode).json({ success: true, statusCode, message, ...extra });
}

function fail(res, statusCode, message, error) {
  return res
    .status(statusCode)
    .json({ success: false, statusCode, message, ...(error ? { error } : {}) });
}

// The frontend reads `_id` like everywhere else in this API; `id` is kept as an
// alias so clients written against the original blogs service keep working.
function serializeBlog(blog) {
  const doc = typeof blog.toObject === 'function' ? blog.toObject() : blog;
  return { ...doc, id: String(doc._id) };
}

const IMAGE_EXT_BY_MIME = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
  'image/avif': '.avif',
  'image/bmp': '.bmp',
};

// Rich-text editors paste images straight into the HTML as `data:` URIs. Left
// alone they bloat the document (a couple of screenshots can outgrow Mongo's
// 16MB per-document limit) and are re-sent in full on every read. Write each one
// to /uploads/blogs/ and swap the src for its URL, exactly like the cover image.
function processBlogContentImages(content, baseUrl) {
  if (!content || !content.includes('data:image/')) return content || '';

  const dataUriRe = /data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)/g;

  return content.replace(dataUriRe, (match, mimeType, base64) => {
    try {
      const buffer = Buffer.from(base64.replace(/\s/g, ''), 'base64');
      if (!buffer.length) return match;

      const ext = IMAGE_EXT_BY_MIME[mimeType.toLowerCase()] || '.png';
      const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      return `${baseUrl}/uploads/blogs/${filename}`;
    } catch (error) {
      // A single unreadable image must not fail the whole save — leave it inline.
      console.error('Failed to extract inline blog image:', error.message);
      return match;
    }
  });
}

// Best-effort cleanup of a cover image we own, so replaced/deleted articles
// don't leave orphaned files behind. Only ever touches /uploads/blogs/.
function removeUploadedImage(imageUrl) {
  if (!imageUrl) return;

  const marker = '/uploads/blogs/';
  const index = imageUrl.indexOf(marker);
  if (index === -1) return;

  const filename = path.basename(imageUrl.slice(index + marker.length));
  const target = path.join(uploadDir, filename);
  if (!target.startsWith(uploadDir)) return;

  fs.promises.unlink(target).catch(() => {});
}

// ─── Public routes ────────────────────────────────────────────────────────────

// GET / — paginated list, newest first. 12 per page unless overridden.
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = DEFAULT_PER_PAGE, category, search = '' } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || DEFAULT_PER_PAGE));

    const query = {};
    if (category) query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { metaDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean(),
      Blog.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limitNum) || 1;

    return ok(res, 200, 'Blogs fetched successfully', {
      data: blogs.map(serializeBlog),
      pagination: {
        total,
        page: pageNum,
        perPage: limitNum,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return fail(res, 500, 'Failed to fetch blogs', error.message);
  }
});

// GET /:id — a single article. Accepts the ObjectId or, so the public
// /resources/<slug> page can fetch directly, the article's `url` slug.
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blog = OBJECT_ID_RE.test(id)
      ? await Blog.findById(id).lean()
      : await Blog.findOne({ url: id }).lean();

    if (!blog) return fail(res, 404, 'Blog not found');

    return ok(res, 200, 'Blog fetched successfully', { data: serializeBlog(blog) });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return fail(res, 500, 'Failed to fetch blog', error.message);
  }
});

// ─── Everything below requires an authenticated admin/broker ──────────────────
router.use(authMiddleware);

// POST / — create an article. Multipart, with an optional cover `image`.
async function createBlog(req, res) {
  try {
    const { title, content, url, category, metaDescription } = req.body;

    if (!title || !String(title).trim()) {
      return fail(res, 400, 'Title is required');
    }
    if (!content || !String(content).trim()) {
      return fail(res, 400, 'Content is required');
    }

    const blog = await Blog.create({
      title: String(title).trim(),
      content: processBlogContentImages(content, publicBase(req)),
      url: url ? String(url).trim() : null,
      category: category || '',
      metaDescription: metaDescription || '',
      image: req.file ? `${publicBase(req)}/uploads/blogs/${req.file.filename}` : null,
    });

    return ok(res, 201, 'Blog created successfully', { data: serializeBlog(blog) });
  } catch (error) {
    if (error.code === 11000) {
      return fail(res, 409, 'A blog with this URL already exists');
    }
    console.error('Error creating blog:', error);
    return fail(res, 500, 'Failed to create blog', error.message);
  }
}

router.post('/', upload.single('image'), multerErrorHandler, createBlog);
// `/add` mirrors the original blogs service, so clients written against it work unchanged.
router.post('/add', upload.single('image'), multerErrorHandler, createBlog);

// POST /upload — store one image and hand back its URL. Backs the editor's
// image button and the cover-image quick upload, which both need a URL before
// the article itself is saved.
router.post('/upload', upload.single('image'), multerErrorHandler, async (req, res) => {
  try {
    if (!req.file) return fail(res, 400, 'No image provided');

    const url = `${publicBase(req)}/uploads/blogs/${req.file.filename}`;
    return ok(res, 201, 'Image uploaded successfully', { data: { url } });
  } catch (error) {
    console.error('Error uploading blog image:', error);
    return fail(res, 500, 'Failed to upload image', error.message);
  }
});

// PUT /:id — partial update; only the fields present in the request change.
router.put('/:id', upload.single('image'), multerErrorHandler, async (req, res) => {
  try {
    if (!OBJECT_ID_RE.test(req.params.id)) {
      return fail(res, 400, 'Invalid blog ID format');
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return fail(res, 404, 'Blog not found');

    const { title, content, url, category, metaDescription } = req.body;

    if (title !== undefined) blog.title = String(title).trim();
    if (content !== undefined) blog.content = processBlogContentImages(content, publicBase(req));
    if (url !== undefined) blog.url = url ? String(url).trim() : null;
    if (category !== undefined) blog.category = category;
    if (metaDescription !== undefined) blog.metaDescription = metaDescription;

    if (req.file) {
      const previousImage = blog.image;
      blog.image = `${publicBase(req)}/uploads/blogs/${req.file.filename}`;
      removeUploadedImage(previousImage);
    } else if (req.body.removeImage === 'true') {
      // Clearing the cover without replacing it. Needs its own flag: an absent
      // `image` field means "leave it alone", so it can't also mean "remove".
      removeUploadedImage(blog.image);
      blog.image = null;
    }

    await blog.save();

    return ok(res, 200, 'Blog updated successfully', { data: serializeBlog(blog) });
  } catch (error) {
    if (error.code === 11000) {
      return fail(res, 409, 'A blog with this URL already exists');
    }
    console.error('Error updating blog:', error);
    return fail(res, 500, 'Failed to update blog', error.message);
  }
});

// DELETE /:id — hard delete, along with its cover image.
router.delete('/:id', async (req, res) => {
  try {
    if (!OBJECT_ID_RE.test(req.params.id)) {
      return fail(res, 400, 'Invalid blog ID format');
    }

    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return fail(res, 404, 'Blog not found');

    removeUploadedImage(blog.image);

    return ok(res, 200, 'Blog deleted successfully', { data: serializeBlog(blog) });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return fail(res, 500, 'Failed to delete blog', error.message);
  }
});

module.exports = router;
