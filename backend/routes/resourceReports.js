const express = require('express');
const multer = require('multer');
const { sendMail } = require('../utils/mailer');

const router = express.Router();

/**
 * Emails a tool report (valuation, scorecard, benchmark, exit guide) to the
 * address the visitor entered. The PDF is rendered in the browser by
 * @react-pdf/renderer and posted here, so the emailed document is byte-for-byte
 * what the tool produced.
 *
 * The endpoint mails an uploaded attachment to a caller-supplied address, so it
 * is deliberately narrow: PDF only, size capped, resource must be one we know,
 * subject and body are built here rather than taken from the request, the
 * filename is generated server-side, and each IP is throttled.
 */

const MAX_BYTES = 5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES, files: 1 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF reports are accepted.'), false);
  },
});

// Allow-list: anything not here is rejected, so the wording we send is ours.
const RESOURCES = {
  'Valuation Tool': {
    subject: 'Your business valuation estimate',
    file: 'Blackmont-Business-Valuation.pdf',
    blurb: 'your indicative business valuation range',
  },
  'Sale Readiness Score': {
    subject: 'Your sale readiness scorecard',
    file: 'Blackmont-Sale-Readiness-Scorecard.pdf',
    blurb: 'your sale readiness scorecard',
  },
  'Industry Benchmark Report': {
    subject: 'Your industry benchmark report',
    file: 'Blackmont-Industry-Benchmark-Report.pdf',
    blurb: 'your industry benchmark report',
  },
  'Exit Planning Guide': {
    subject: 'Your exit planning guide',
    file: 'Blackmont-Exit-Planning-Guide.pdf',
    blurb: 'your exit planning guide',
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-IP throttle. In-process and best-effort, which matches the follow-up
// scheduler already running here; it is a brake on abuse, not an audit trail.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map();

function throttled(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

router.post('/', upload.single('report'), async (req, res) => {
  try {
    const email = String(req.body.email || '').trim();
    const resource = String(req.body.resource || '').trim();
    const meta = RESOURCES[resource];

    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'A valid email is required.' });
    }
    if (!meta) return res.status(400).json({ error: 'Unknown resource.' });
    if (!req.file) return res.status(400).json({ error: 'No report attached.' });

    // Trust the bytes, not the declared mime type.
    if (req.file.buffer.subarray(0, 5).toString('latin1') !== '%PDF-') {
      return res.status(400).json({ error: 'Attachment is not a PDF.' });
    }

    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    if (throttled(ip)) {
      return res.status(429).json({ error: 'Too many requests. Try again later.' });
    }

    await sendMail({
      to: email,
      subject: meta.subject,
      text: `Thanks for using our tools. ${meta.subject} is attached.\n\nIf you would like to talk through what it means for your business, reply to this email and one of our brokers will be in touch. Every conversation is confidential.\n\nBlackmont Advisory`,
      html: `
        <p>Thanks for using our tools. Attached is ${meta.blurb}.</p>
        <p>If you would like to talk through what it means for your business, just reply to this email and one of our brokers will be in touch. Every conversation is confidential.</p>
        <p>Blackmont Advisory</p>
      `,
      attachments: [
        {
          filename: meta.file,
          content: req.file.buffer,
          type: 'application/pdf',
        },
      ],
    });

    res.json({ sent: true });
  } catch (err) {
    console.error('Failed to email resource report:', err);
    res.status(500).json({ error: 'Could not send the report.' });
  }
});

// multer rejects (size / type) surface here rather than as a 500.
router.use((err, req, res, next) => {
  if (err) return res.status(400).json({ error: err.message });
  next();
});

module.exports = router;
