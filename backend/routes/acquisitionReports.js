const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const AcquisitionReport = require('../models/AcquisitionReport');
const Acquirer = require('../models/Acquirer');
const authMiddleware = require('../middleware/auth.middleware');
const { sendMail } = require('../utils/mailer');

const OFFER_INTERNAL_RECIPIENTS = ['sadeq@blackmontadvisory.com'];

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

// ─── Public (no auth) ────────────────────────────────────────────────────────

router.get('/public/:id', async (req, res) => {
  try {
    const report = await AcquisitionReport.findById(req.params.id).lean();
    if (!report || report.archived) {
      return res.status(404).json({ message: 'Acquisition Report not found' });
    }
    res.json(report);
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
        <h2 style="color:#c9a84c;margin:0 0 4px">New Offer Submitted</h2>
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
    console.error('Acquisition offer submission error:', error.message);
    res.status(500).json({ message: 'Failed to submit offer.' });
  }
});

// Every endpoint below requires an authenticated admin/broker.
router.use(authMiddleware);

// ─── Image / PDF uploads ────────────────────────────────────────────────────
const uploadDir = path.join(__dirname, '../uploads/acquisition/');
fs.mkdirSync(uploadDir, { recursive: true });
const MAX_UPLOAD_MB = 200;

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

const ownsReport = (user, report) =>
  isSuperAdmin(user) ||
  (report.brokerEmail || '').toLowerCase() === (user.email || '').toLowerCase();

function publicBase(req) {
  return process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
}

// ─── Routes ────────────────────────────────────────────────────────────────────

// GET / — list reports. Superadmins see everything; brokers see only their own.
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

    const [reports, total] = await Promise.all([
      AcquisitionReport.find(query)
        .sort({ updatedAt: -1 })
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum)
        .lean(),
      AcquisitionReport.countDocuments(query),
    ]);

    res.json({
      templates: reports,
      total,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /:id — fetch a single report (owner or superadmin).
router.get('/:id', async (req, res) => {
  try {
    const report = await AcquisitionReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    if (!ownsReport(req.user, report)) {
      return res.status(403).json({ message: 'You do not have access to this report' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST / — create a report. The broker defaults to the logged-in user; a
// superadmin may create on behalf of another broker by passing brokerEmail.
router.post('/', async (req, res) => {
  try {
    const me = req.user;
    const myEmail = (me.email || '').toLowerCase();
    const brokerEmail =
      isSuperAdmin(me) && req.body.brokerEmail
        ? String(req.body.brokerEmail).toLowerCase()
        : myEmail;

    const report = await AcquisitionReport.create({
      businessName: req.body.businessName || '',
      brokerEmail,
      status: 'draft',
      sections: Array.isArray(req.body.sections) ? req.body.sections : [],
      createdBy: me.username || me.email || '',
      lastEditedBy: me.username || me.email || '',
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /:id — full/partial update. Used by the editor's autosave (JSON body).
router.put('/:id', async (req, res) => {
  try {
    const report = await AcquisitionReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    if (!ownsReport(req.user, report)) {
      return res.status(403).json({ message: 'You do not have access to this report' });
    }

    const editable = ['businessName', 'sections', 'deal', 'dealName'];
    for (const key of editable) {
      if (req.body[key] !== undefined) report[key] = req.body[key];
    }
    // `sections[].data` is a Mixed type; ensure Mongoose persists nested changes.
    if (req.body.sections !== undefined) report.markModified('sections');

    // Reassigning the broker (the owner) is a superadmin-only operation.
    if (isSuperAdmin(req.user) && req.body.brokerEmail !== undefined) {
      report.brokerEmail = String(req.body.brokerEmail).toLowerCase();
    }

    report.lastEditedBy = req.user.username || req.user.email || '';
    await report.save();
    res.json(report);
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

    const report = await AcquisitionReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    if (!ownsReport(req.user, report)) {
      return res.status(403).json({ message: 'You do not have access to this report' });
    }

    report.status = status;
    report.publishedAt = status === 'published' ? new Date() : null;
    report.lastEditedBy = req.user.username || req.user.email || '';
    await report.save();
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /upload — upload an image (e.g. banner background); returns its URL.
router.post('/upload', upload.single('image'), multerErrorHandler, async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image provided' });
    const url = `${publicBase(req)}/uploads/acquisition/${req.file.filename}`;
    res.status(201).json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /:id — soft-delete (archive) a report (owner or superadmin).
router.delete('/:id', async (req, res) => {
  try {
    const report = await AcquisitionReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    if (!ownsReport(req.user, report)) {
      return res.status(403).json({ message: 'You do not have access to this report' });
    }
    report.archived = true;
    report.archivedAt = new Date();
    report.lastEditedBy = req.user.username || req.user.email || '';
    await report.save();
    res.json({ message: 'Report archived successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /:id/restore — un-archive a report (owner or superadmin).
router.patch('/:id/restore', async (req, res) => {
  try {
    const report = await AcquisitionReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    if (!ownsReport(req.user, report)) {
      return res.status(403).json({ message: 'You do not have access to this report' });
    }
    report.archived = false;
    report.archivedAt = null;
    report.lastEditedBy = req.user.username || req.user.email || '';
    await report.save();
    res.json({ message: 'Report restored', template: report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /:id/permanent — permanently remove a report from the database.
router.delete('/:id/permanent', async (req, res) => {
  try {
    const report = await AcquisitionReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    if (!ownsReport(req.user, report)) {
      return res.status(403).json({ message: 'You do not have access to this report' });
    }
    await AcquisitionReport.findByIdAndDelete(req.params.id);
    res.json({ message: 'Report permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── Acquirer portal access (broker only) ────────────────────────────────────
// The acquirer login is keyed to the report's linked Nexar deal, so it is shared
// by every report on that deal. Managed here from any report linked to the deal.

// GET /:id/acquirer — the acquirer login for this report's linked deal.
router.get('/:id/acquirer', async (req, res) => {
  try {
    const report = await AcquisitionReport.findById(req.params.id).lean();
    if (!report) return res.status(404).json({ error: 'Report not found' });
    if (!ownsReport(req.user, report)) return res.status(403).json({ error: 'Forbidden' });

    if (!report.deal) {
      return res.json({ acquirer: null, deal: '', dealName: '' });
    }
    const acquirer = await Acquirer.findOne({ deal: report.deal })
      .select('email username lastLoginAt createdAt')
      .lean();
    res.json({ acquirer: acquirer || null, deal: report.deal, dealName: report.dealName || '' });
  } catch (err) {
    console.error('Get acquirer error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /:id/acquirer — create or update the acquirer login for this report's deal.
router.put('/:id/acquirer', async (req, res) => {
  try {
    const report = await AcquisitionReport.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    if (!ownsReport(req.user, report)) return res.status(403).json({ error: 'Forbidden' });
    if (!report.deal) {
      return res.status(400).json({ error: 'Link a deal to this report before granting portal access' });
    }

    const { email, username, password } = req.body;
    const cleanEmail = String(email || '').toLowerCase().trim();
    const cleanUsername = String(username || '').toLowerCase().trim();
    if (!cleanEmail && !cleanUsername) {
      return res.status(400).json({ error: 'An email or username is required' });
    }

    let acquirer = await Acquirer.findOne({ deal: report.deal });

    if (!acquirer) {
      if (!password || String(password).length < 6) {
        return res
          .status(400)
          .json({ error: 'A password (min 6 characters) is required to create access' });
      }
      acquirer = new Acquirer({
        deal: report.deal,
        email: cleanEmail,
        username: cleanUsername,
        password,
      });
    } else {
      acquirer.email = cleanEmail;
      acquirer.username = cleanUsername;
      if (password) {
        if (String(password).length < 6) {
          return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }
        acquirer.password = password; // hashed by pre-save hook
      }
    }

    await acquirer.save();

    res.json({
      success: true,
      acquirer: {
        email: acquirer.email,
        username: acquirer.username,
        lastLoginAt: acquirer.lastLoginAt,
      },
    });
  } catch (err) {
    console.error('Set acquirer error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /:id/acquirer — revoke the acquirer login for this report's deal.
router.delete('/:id/acquirer', async (req, res) => {
  try {
    const report = await AcquisitionReport.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    if (!ownsReport(req.user, report)) return res.status(403).json({ error: 'Forbidden' });

    if (report.deal) await Acquirer.findOneAndDelete({ deal: report.deal });
    res.json({ success: true });
  } catch (err) {
    console.error('Delete acquirer error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
