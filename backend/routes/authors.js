const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const Author = require('../models/Author');
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// ─── Photo uploads ────────────────────────────────────────────────────────────
// Served later from /uploads, so disk storage (see CLAUDE.md upload convention).
const uploadDir = path.join(__dirname, '../uploads/authors/');
fs.mkdirSync(uploadDir, { recursive: true });
const MAX_UPLOAD_MB = 5;

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = (path.extname(file.originalname) || '').toLowerCase();
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
    },
  }),
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
// Same `{ success, statusCode, message, data }` envelope as routes/blogs.js, so
// the frontend unwraps both the same way.
const OBJECT_ID_RE = /^[0-9a-fA-F]{24}$/;

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

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseCredentials(value) {
  let list = value;
  if (typeof value === 'string') {
    try {
      list = JSON.parse(value);
    } catch {
      list = [];
    }
  }
  if (!Array.isArray(list)) return [];
  return list.map((c) => String(c ?? '').replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 10);
}

// Only accept a real LinkedIn URL — it's published as the author's `sameAs`.
function cleanLinkedin(value) {
  const url = String(value || '').trim();
  if (!url) return '';
  return /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\//i.test(url) ? url : null;
}

function removeUploadedPhoto(photoUrl) {
  if (!photoUrl) return;
  const marker = '/uploads/authors/';
  const index = photoUrl.indexOf(marker);
  if (index === -1) return;
  const target = path.join(uploadDir, path.basename(photoUrl.slice(index + marker.length)));
  if (!target.startsWith(uploadDir)) return;
  fs.promises.unlink(target).catch(() => {});
}

/** Apply the editable fields present in `body` to `author`. Returns an error message or null. */
function applyFields(author, body) {
  if (body.name !== undefined) author.name = String(body.name).trim();
  if (body.slug !== undefined || (body.name !== undefined && !author.slug)) {
    author.slug = slugify(body.slug || author.name);
  }
  if (body.role !== undefined) author.role = String(body.role).trim();
  if (body.bio !== undefined) author.bio = String(body.bio).trim();
  if (body.credentials !== undefined) author.credentials = parseCredentials(body.credentials);
  if (body.linkedin !== undefined) {
    const linkedin = cleanLinkedin(body.linkedin);
    if (linkedin === null) return 'LinkedIn must be a https://linkedin.com/… URL';
    author.linkedin = linkedin;
  }
  if (!author.name) return 'Name is required';
  if (!author.slug) return 'Name must contain letters or numbers';
  return null;
}

// ─── Public routes ────────────────────────────────────────────────────────────

// GET / — every author, alphabetical. Small collection, so no pagination.
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find().sort({ name: 1 }).lean();
    return ok(res, 200, 'Authors fetched successfully', { data: authors });
  } catch (error) {
    console.error('Error fetching authors:', error);
    return fail(res, 500, 'Failed to fetch authors', error.message);
  }
});

// GET /:id — one author by ObjectId or slug (the public profile uses the slug).
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const author = OBJECT_ID_RE.test(id)
      ? await Author.findById(id).lean()
      : await Author.findOne({ slug: id }).lean();
    if (!author) return fail(res, 404, 'Author not found');
    return ok(res, 200, 'Author fetched successfully', { data: author });
  } catch (error) {
    console.error('Error fetching author:', error);
    return fail(res, 500, 'Failed to fetch author', error.message);
  }
});

// ─── Everything below requires an authenticated admin/broker ──────────────────
router.use(authMiddleware);

router.post('/', upload.single('photo'), multerErrorHandler, async (req, res) => {
  try {
    const author = new Author();
    const error = applyFields(author, req.body);
    if (error) {
      if (req.file) removeUploadedPhoto(`/uploads/authors/${req.file.filename}`);
      return fail(res, 400, error);
    }
    if (req.file) author.photo = `${publicBase(req)}/uploads/authors/${req.file.filename}`;

    await author.save();
    return ok(res, 201, 'Author created successfully', { data: author.toObject() });
  } catch (error) {
    if (error.code === 11000) return fail(res, 409, 'An author with this profile URL already exists');
    console.error('Error creating author:', error);
    return fail(res, 500, 'Failed to create author', error.message);
  }
});

// PUT /:id — partial update; only the fields present change.
router.put('/:id', upload.single('photo'), multerErrorHandler, async (req, res) => {
  try {
    if (!OBJECT_ID_RE.test(req.params.id)) return fail(res, 400, 'Invalid author ID format');

    const author = await Author.findById(req.params.id);
    if (!author) return fail(res, 404, 'Author not found');

    const error = applyFields(author, req.body);
    if (error) return fail(res, 400, error);

    if (req.file) {
      removeUploadedPhoto(author.photo);
      author.photo = `${publicBase(req)}/uploads/authors/${req.file.filename}`;
    } else if (req.body.removePhoto === 'true') {
      removeUploadedPhoto(author.photo);
      author.photo = null;
    }

    await author.save();
    return ok(res, 200, 'Author updated successfully', { data: author.toObject() });
  } catch (error) {
    if (error.code === 11000) return fail(res, 409, 'An author with this profile URL already exists');
    console.error('Error updating author:', error);
    return fail(res, 500, 'Failed to update author', error.message);
  }
});

// DELETE /:id — also detaches the author from their articles, which then fall
// back to crediting the firm.
router.delete('/:id', async (req, res) => {
  try {
    if (!OBJECT_ID_RE.test(req.params.id)) return fail(res, 400, 'Invalid author ID format');

    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return fail(res, 404, 'Author not found');

    await Blog.updateMany({ author: author._id }, { $set: { author: null } });
    removeUploadedPhoto(author.photo);

    return ok(res, 200, 'Author deleted successfully', { data: author.toObject() });
  } catch (error) {
    console.error('Error deleting author:', error);
    return fail(res, 500, 'Failed to delete author', error.message);
  }
});

module.exports = router;
