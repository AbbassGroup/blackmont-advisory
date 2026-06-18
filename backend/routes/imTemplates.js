const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const ImTemplate = require('../models/ImTemplate');
const authMiddleware = require('../middleware/auth.middleware');
const { sendMail } = require('../utils/mailer');



const OFFER_INTERNAL_RECIPIENTS = ['sadeq@abbass.group'];

// In-memory upload for the offer's deposit screenshot (emailed as an attachment).
const offerUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only image or PDF files are allowed.'), false);
  },
});

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

router.get('/public/:id', async (req, res) => {
  try {
    const template = await ImTemplate.findById(req.params.id).lean();
    if (!template || template.archived) {
      return res.status(404).json({ message: 'Memorandum not found' });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/public/offer', offerUpload.single('deposit'), async (req, res) => {
  try {
    const b = req.body || {};
    const businessName = (b.businessName || '').trim();
    const brokerEmail = (b.brokerEmail || '').trim().toLowerCase();

    const recipients = [...new Set([brokerEmail, ...OFFER_INTERNAL_RECIPIENTS].filter(Boolean))];

    const rows = [
      ['Name', b.name],
      ['Phone number', b.number],
      ['Mobile', b.mobile],
      ['Email', b.email],
      ['Offer amount', b.offerAmount],
      ['Offer terms', b.offerTerms],
      ['Comments', b.comments],
      ['Refund — Account name', b.accountName],
      ['Refund — BSB', b.bsb],
      ['Refund — Account number', b.accountNumber],
    ];
    console.log('🚀 ~ rows:', rows)

    const rowsHtml = rows
      .filter(([, v]) => v && String(v).trim())
      .map(
        ([label, v]) =>
          `<tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;color:#555;white-space:nowrap;vertical-align:top">${esc(
            label
          )}</td><td style="padding:8px 12px;border:1px solid #eee;color:#333">${esc(v)}</td></tr>`
      )
      .join('');

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:640px;color:#333">
        <h2 style="color:#56C1BC;margin:0 0 4px">New Offer Submitted</h2>
        ${businessName ? `<p style="margin:0 0 16px;color:#666">For <strong>${esc(businessName)}</strong></p>` : ''}
        <table style="border-collapse:collapse;width:100%;font-size:14px">${rowsHtml}</table>
        ${req.file ? '<p style="margin:16px 0 0;color:#666;font-size:13px">A deposit screenshot is attached.</p>' : ''}
        <p style="margin-top:24px;color:#999;font-size:12px">Blackmont Advisory</p>
      </div>`;

    const attachments = req.file
      ? [
        {
          filename: req.file.originalname || 'deposit',
          content: req.file.buffer.toString('base64'),
          type: req.file.mimetype,
        },
      ]
      : [];

    await sendMail({
      to: recipients,
      subject: `New Offer Submitted${businessName ? ` — ${businessName}` : ''}`,
      html,
      attachments,
    });

    res.json({ ok: true });
  } catch (error) {
    console.error('IM offer submission error:', error.message);
    res.status(500).json({ message: 'Failed to submit offer.' });
  }
});

// Every Information Memorandum endpoint below requires an authenticated admin/broker.
router.use(authMiddleware);

// ─── Image / PDF uploads ────────────────────────────────────────────────────
const uploadDir = path.join(__dirname, '../uploads/im/');
fs.mkdirSync(uploadDir, { recursive: true });
const MAX_UPLOAD_MB = 200; // generous enough for multi-page PDFs and short videos

// Keep the original extension so files (esp. PDFs/videos) are served with the right type.
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
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/') ||
      file.mimetype === 'application/pdf'
    )
      cb(null, true);
    else cb(new Error('Only image, video or PDF files are allowed.'), false);
  },
});

function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res
      .status(400)
      .json({ message: `File too large. Maximum allowed size is ${MAX_UPLOAD_MB}MB.` });
  }
  if (err) return res.status(400).json({ message: err.message });
  next();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isSuperAdmin = (user) => user?.role === 'superadmin';

const ownsTemplate = (user, template) =>
  isSuperAdmin(user) ||
  (template.brokerEmail || '').toLowerCase() === (user.email || '').toLowerCase();

function publicBase(req) {
  return process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
}

// ─── Routes ────────────────────────────────────────────────────────────────────

// GET / — list templates. Superadmins see everything; brokers see only their own.
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', status, brokerEmail, archived } = req.query;
    const query = archived === 'true' ? { archived: true } : { archived: { $ne: true } };

    if (!isSuperAdmin(req.user)) {
      query.brokerEmail = (req.user.email || '').toLowerCase();
    } else if (brokerEmail) {
      query.brokerEmail = String(brokerEmail).toLowerCase();
    }

    if (status === 'draft' || status === 'published') query.status = status;

    if (search) {
      query.$or = [
        { businessName: { $regex: search, $options: 'i' } },
        { brokerEmail: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 20);

    const [templates, total] = await Promise.all([
      ImTemplate.find(query)
        .sort({ updatedAt: -1 })
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum)
        .lean(),
      ImTemplate.countDocuments(query),
    ]);

    res.json({
      templates,
      total,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /:id — fetch a single template (owner or superadmin).
router.get('/:id', async (req, res) => {
  try {
    const template = await ImTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    if (!ownsTemplate(req.user, template)) {
      return res.status(403).json({ message: 'You do not have access to this template' });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST / — create a template. The broker defaults to the logged-in user; a
// superadmin may create on behalf of another broker by passing brokerEmail.
router.post('/', async (req, res) => {
  try {
    const me = req.user;
    const myEmail = (me.email || '').toLowerCase();
    const brokerEmail =
      isSuperAdmin(me) && req.body.brokerEmail
        ? String(req.body.brokerEmail).toLowerCase()
        : myEmail;

    const template = await ImTemplate.create({
      businessName: req.body.businessName || '',
      brokerEmail,
      status: 'draft',
      sections: Array.isArray(req.body.sections) ? req.body.sections : [],
      createdBy: me.username || me.email || '',
      lastEditedBy: me.username || me.email || '',
    });

    res.status(201).json(template);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /:id — full/partial update. Used by the editor's autosave (JSON body).
router.put('/:id', async (req, res) => {
  try {
    const template = await ImTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    if (!ownsTemplate(req.user, template)) {
      return res.status(403).json({ message: 'You do not have access to this template' });
    }

    const editable = ['businessName', 'sections'];
    for (const key of editable) {
      if (req.body[key] !== undefined) template[key] = req.body[key];
    }
    // `sections[].data` is a Mixed type; ensure Mongoose persists nested changes.
    if (req.body.sections !== undefined) template.markModified('sections');

    // Reassigning the broker (the owner) is a superadmin-only operation.
    if (isSuperAdmin(req.user) && req.body.brokerEmail !== undefined) {
      template.brokerEmail = String(req.body.brokerEmail).toLowerCase();
    }

    template.lastEditedBy = req.user.username || req.user.email || '';
    await template.save();
    res.json(template);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH /:id/status — publish / unpublish.
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['draft', 'published'].includes(status)) {
      return res.status(400).json({ message: 'Status must be "draft" or "published"' });
    }

    const template = await ImTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    if (!ownsTemplate(req.user, template)) {
      return res.status(403).json({ message: 'You do not have access to this template' });
    }

    template.status = status;
    template.publishedAt = status === 'published' ? new Date() : null;
    template.lastEditedBy = req.user.username || req.user.email || '';
    await template.save();
    res.json(template);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /upload — upload an image (e.g. banner background); returns its URL.
router.post('/upload', upload.single('image'), multerErrorHandler, async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image provided' });
    const url = `${publicBase(req)}/uploads/im/${req.file.filename}`;
    res.status(201).json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /:id — soft-delete (archive) a template (owner or superadmin). The
// record stays in the database for recovery but is hidden everywhere.
router.delete('/:id', async (req, res) => {
  try {
    const template = await ImTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    if (!ownsTemplate(req.user, template)) {
      return res.status(403).json({ message: 'You do not have access to this template' });
    }
    template.archived = true;
    template.archivedAt = new Date();
    template.lastEditedBy = req.user.username || req.user.email || '';
    await template.save();
    res.json({ message: 'Template archived successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /:id/restore — un-archive a template (owner or superadmin).
router.patch('/:id/restore', async (req, res) => {
  try {
    const template = await ImTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    if (!ownsTemplate(req.user, template)) {
      return res.status(403).json({ message: 'You do not have access to this template' });
    }
    template.archived = false;
    template.archivedAt = null;
    template.lastEditedBy = req.user.username || req.user.email || '';
    await template.save();
    res.json({ message: 'Template restored', template });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /:id/permanent — permanently remove a template from the database
// (owner or superadmin). Irreversible; intended for archived templates.
router.delete('/:id/permanent', async (req, res) => {
  try {
    const template = await ImTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    if (!ownsTemplate(req.user, template)) {
      return res.status(403).json({ message: 'You do not have access to this template' });
    }
    await ImTemplate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Template permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
