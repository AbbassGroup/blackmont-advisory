const express = require('express');
const Enquiry = require('../models/Enquiry');
const ImViewLog = require('../models/ImViewLog');
const jwt = require('jsonwebtoken');
const ImNotificationPref = require('../models/ImNotificationPref');
const sendEmail = require('../utils/sendEmail');
const { createImViewedEmail } = require('../utils/emailTemplates');
const router = express.Router();
const Listing = require('../models/Listing');
const ImTemplate = require('../models/ImTemplate');
const auth = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const logApiUsage = require('../utils/logApiUsage');
const { viewImTemplate } = require('../utils/emailTemplates');
const fetchBusinessNames = require('../utils/fetchBusinessNames');
const recordImView = require('../utils/recordImView');
const generateReferenceId = require('../utils/generateReferenceId');

const upload = multer({
  dest: path.join(__dirname, '../uploads/'),
  limits: { fileSize: 50 * 1024 * 1024 },
});

function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large. Maximum allowed size is 50MB.' });
  }
  next(err);
}





router.get('/', async (req, res) => {
  try {
    // latest first
    const filter = {};
    if (req.query.category) {
      filter.category = { $regex: new RegExp(`^${req.query.category}$`, 'i') };
    }
    if (req.query.location) {
      filter.location = { $regex: new RegExp(req.query.location, 'i') };
    }
    const listings = await Listing.find(filter).sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/external', logApiUsage({ sampleRate: 1 }), async (req, res) => {
  try {
    const listings = await Listing.find(
      { partnerShared: true },
      { location: 0, contact: 0 }
    );
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, upload.single('image'), multerErrorHandler, async (req, res) => {
  try {
    const referenceId = await generateReferenceId();
    const listingData = {
      ...req.body,
      referenceId,
      image: req.file ? `${process.env.BACKEND_URL}/uploads/${req.file.filename}` : req.body.image || '',
      contact: req.body.contact ? JSON.parse(req.body.contact) : null,
      brokers: req.body.brokers ? JSON.parse(req.body.brokers) : [],
      // Empty string would fail the ObjectId cast — normalise to null.
      imTemplateId: req.body.imTemplateId || null,
    };

    const newListing = new Listing(listingData);
    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    console.error('Create listing error:', err);
    res.status(400).json({ error: err.message, details: err });
  }
});

router.put('/:id', auth, upload.single('image'), multerErrorHandler, async (req, res) => {
  try {
    const updateData = {};

    const allowedFields = ['title', 'category', 'location', 'suburb', 'description', 'price', 'summary', 'about', 'keyFeatures', 'whyOpportunity', 'mapLink', 'featured', 'partnerShared', 'brokers', 'businessType', 'priceRange', 'deal'];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Reference ID: keep the existing value when one is supplied, otherwise
    // generate the next sequential ID (ABB001, ABB002, ...). Handled after the
    // loop so an empty submitted value can't overwrite a freshly generated ID.
    if (req.body.referenceId) {
      updateData.referenceId = req.body.referenceId;
    } else {
      updateData.referenceId = await generateReferenceId();
    }

    if (req.file) {
      updateData.image = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      updateData.image = req.body.image;
    }

    if (req.body.contact !== undefined) {
      updateData.contact = typeof req.body.contact === 'string'
        ? JSON.parse(req.body.contact)
        : req.body.contact;
    }

    if (req.body.brokers !== undefined) {
      updateData.brokers = typeof req.body.brokers === 'string'
        ? JSON.parse(req.body.brokers)
        : req.body.brokers;
    }

    // IM source: a web template (id) OR uploaded PDFs — never both. An empty
    // value clears the template assignment (falls back to PDF documents).
    if (req.body.imTemplateId !== undefined) {
      updateData.imTemplateId = req.body.imTemplateId || null;
    }

    console.log('Updating listing with data:', updateData);

    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedListing) return res.status(404).json({ error: 'Listing not found' });
    res.json(updatedListing);
  } catch (err) {
    console.error('Update listing error:', err);
    res.status(400).json({ error: err.message, details: err });
  }
});
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) return res.status(404).json({ error: 'Listing not found' });
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const documentsDir = path.join(__dirname, '../uploads/documents');
if (!fs.existsSync(documentsDir)) fs.mkdirSync(documentsDir, { recursive: true });

const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, documentsDir),
  filename: (req, file, cb) => {
    const ts = Date.now();
    const ext = path.extname(file.originalname) || '.pdf';
    cb(null, `doc_${req.params.id}_${ts}_${Math.random().toString(36).slice(2, 7)}${ext}`);
  },
});
const uploadPdf = multer({
  storage: pdfStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'));
  },
});

router.post('/:id/documents', auth, uploadPdf.array('documents', 20), multerErrorHandler, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'No PDF files uploaded' });

    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5005';

    for (const file of req.files) {
      listing.documents.push({
        name: file.originalname,
        filename: file.filename,
        url: `${backendUrl}/uploads/documents/${file.filename}`,
        uploadedAt: new Date(),
      });
    }

    await listing.save();
    res.status(201).json({ documents: listing.documents });
  } catch (err) {
    console.error('Document upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/documents/reorder', auth, async (req, res) => {
  try {
    const { order } = req.body;
    if (!Array.isArray(order)) return res.status(400).json({ error: 'order must be an array of document IDs' });

    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const docMap = new Map(listing.documents.map(d => [d._id.toString(), d]));
    const reordered = order.map(id => docMap.get(id)).filter(Boolean);


    const inOrder = new Set(order);
    listing.documents.forEach(d => { if (!inOrder.has(d._id.toString())) reordered.push(d); });

    listing.documents = reordered;
    await listing.save();
    res.json({ documents: listing.documents });
  } catch (err) {
    console.error('Document reorder error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id/documents/:docId', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const doc = listing.documents.id(req.params.docId);
    if (!doc) return res.status(404).json({ error: 'Document not found' });


    const filePath = path.join(documentsDir, doc.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    listing.documents.pull(req.params.docId);
    await listing.save();
    res.json({ message: 'Document deleted', documents: listing.documents });
  } catch (err) {
    console.error('Document delete error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/im', async (req, res) => {
  try {
    const { token } = req.query;
    let isAuthorized = false;
    let isAdmin = false;
    let viewerEnquiry = null;
    let isRevoked = false;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === 'admin' || decoded.role === 'superadmin') {
          isAuthorized = true;
          isAdmin = true;
        } else if (decoded.enquiryId) {
          const enquiry = await Enquiry.findById(decoded.enquiryId);
          if (enquiry && enquiry.ndaStatus !== 'rejected') {
            viewerEnquiry = enquiry; // Always capture the enquiry for logging
            // Check manual revocation
            if (enquiry.imRevoked) {
              isRevoked = true;
            } else {
              // Check 30-day auto-expiry
              const sharedDate = enquiry.imSharedAt || enquiry.updatedAt;
              const daysSinceShared = (Date.now() - new Date(sharedDate).getTime()) / (1000 * 60 * 60 * 24);
              if (daysSinceShared > 30) {
                isRevoked = true; // Auto-expired
              } else {
                isAuthorized = true;
              }
            }
          }
        }
      } catch (err) {
        console.error('IM viewer token error:', err.message);
      }
    }

    // If this listing serves a web IM template (instead of PDFs), hand off to
    // the email-gated template viewer. The view is recorded when the recipient
    // verifies their email there, so we neither log nor serve content here.
    const tmplListing = await Listing.findById(req.params.id).select('imTemplateId').lean();
    if (tmplListing && tmplListing.imTemplateId) {
      const frontendBase = (process.env.FRONTEND_URL || '').replace(/\/$/, '');
      if (isAdmin) {
        // Admins/brokers preview the template directly (ungated).
        return res.redirect(`${frontendBase}/information-memorandum/${tmplListing.imTemplateId}`);
      }
      if (!viewerEnquiry) {
        return res.status(403).send(`
          <!DOCTYPE html><html><head><meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1"><title>Access Denied</title>
          <style>body{font-family:Arial,sans-serif;background:#f9f9f9;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}.box{background:#fff;padding:40px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.1);text-align:center;max-width:400px;margin:20px}.icon{font-size:48px;margin-bottom:20px}h1{font-size:24px;color:#333;margin:0 0 10px}p{color:#666;line-height:1.5;font-size:15px;margin:0}</style>
          </head><body><div class="box"><div class="icon">🔒</div><h1>Access Denied</h1>
          <p>You do not have permission to view this Information Memorandum. Your link may be invalid.</p></div></body></html>
        `);
      }
      // Authorized, revoked or expired — the email gate re-checks and logs.
      return res.redirect(
        `${frontendBase}/information-memorandum/secure/${req.params.id}?token=${encodeURIComponent(token)}`
      );
    }

    // Log the IM view attempt and send email notifications for ALL enquiry-based views
    // (including revoked/expired users who were denied access)
    if (!isAdmin && viewerEnquiry) {
      recordImView({
        listingId: req.params.id,
        enquiry: viewerEnquiry,
        accessDenied: !isAuthorized,
        userAgent: req.get('User-Agent'),
      });
    }

    // Show a tactful "expired" message for revoked users
    if (isRevoked) {
      return res.status(403).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Link Expired</title>
          <style>
            body { font-family: Arial, sans-serif; background: #f9f9f9; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .box { background: white; padding: 48px 40px; border-radius: 10px; box-shadow: 0 2px 16px rgba(0,0,0,0.08); text-align: center; max-width: 440px; margin: 20px; }
            .icon { font-size: 48px; margin-bottom: 20px; }
            h1 { font-size: 24px; color: #333; margin: 0 0 12px; }
            p { color: #666; line-height: 1.6; font-size: 15px; margin: 0 0 24px; }
            a { display: inline-block; padding: 12px 28px; background: #1b2535; color: #fff; font-weight: bold; text-decoration: none; border-radius: 6px; font-size: 14px; }
            a:hover { background: #0f1623; }
            .footer { color: #999; font-size: 12px; margin-top: 28px; }
          </style>
        </head>
        <body>
          <div class="box">
            <div class="icon">⏳</div>
            <h1>This Link Has Expired</h1>
            <p>This Information Memorandum is no longer available. The link you used has expired or is no longer active.</p>
            <p style="font-size:14px;color:#888;margin:0">If you believe this is an error, please contact the broker directly.</p>
            <p class="footer">Blackmont Advisory<br/>(03) 9103 1317 &bull; info@blackmontadvisory.com</p>
          </div>
        </body>
        </html>
      `);
    }

    if (!isAuthorized) {
      return res.status(403).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Access Denied</title>
          <style>
            body { font-family: Arial, sans-serif; background: #f9f9f9; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .box { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; max-width: 400px; margin: 20px; }
            .icon { font-size: 48px; margin-bottom: 20px; }
            h1 { font-size: 24px; color: #333; margin: 0 0 10px; }
            p { color: #666; line-height: 1.5; font-size: 15px; margin: 0; }
          </style>
        </head>
        <body>
          <div class="box">
            <div class="icon">🔒</div>
            <h1>Access Denied</h1>
            <p>You do not have permission to view these documents. Your confidentiality agreement may have been rejected or your link is invalid.</p>
          </div>
        </body>
        </html>
      `);
    }


    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).send('<h2>Listing not found</h2>');
    if (!listing.documents || listing.documents.length === 0) {
      return res.status(404).send('<h2>No Information Memorandum available for this listing.</h2>');
    }

    const title = listing.title || 'Information Memorandum';
    const docsJson = JSON.stringify(listing.documents.map((d, i) => ({
      name: d.name,
      url: `/api/listings/pdf-proxy/${d.filename}`,
      idx: i,
    })));

    const html = viewImTemplate(title, docsJson);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(html);
  } catch (err) {
    console.error('IM view error:', err);
    res.status(500).send('<h2>Error loading document.</h2>');
  }
});

// POST /:id/im-template/verify — public, email-gated access to a listing's web
// IM template. The submitted email must match the enquiry tied to the share
// token; each matching submission records exactly one IM view (mirroring the
// PDF view history). Returns the template data on success.
router.post('/:id/im-template/verify', async (req, res) => {
  try {
    const { token, email } = req.body || {};
    if (!token || !email) return res.status(400).json({ error: 'missing_fields' });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(403).json({ error: 'invalid_token' });
    }

    // Admins/brokers bypass the email gate (internal preview).
    const isAdmin = decoded.role === 'admin' || decoded.role === 'superadmin';
    let enquiry = null;
    let accessDenied = false;

    if (!isAdmin) {
      if (!decoded.enquiryId) return res.status(403).json({ error: 'invalid_token' });
      enquiry = await Enquiry.findById(decoded.enquiryId);
      if (!enquiry || enquiry.ndaStatus === 'rejected') {
        return res.status(403).json({ error: 'access_denied' });
      }

      // The submitted email must match the enquiry on record.
      const submitted = String(email).trim().toLowerCase();
      const onRecord = String(enquiry.email || '').trim().toLowerCase();
      if (!submitted || submitted !== onRecord) {
        return res.status(403).json({ error: 'email_mismatch' });
      }

      // Manual revocation / 30-day auto-expiry (same rules as the PDF viewer).
      if (enquiry.imRevoked) {
        accessDenied = true;
      } else {
        const sharedDate = enquiry.imSharedAt || enquiry.updatedAt;
        const days = (Date.now() - new Date(sharedDate).getTime()) / (1000 * 60 * 60 * 24);
        if (days > 30) accessDenied = true;
      }

      // A matching email always counts as one view (granted or denied).
      recordImView({
        listingId: req.params.id,
        enquiry,
        accessDenied,
        userAgent: req.get('User-Agent'),
      });
    }

    if (accessDenied) return res.status(403).json({ error: 'expired' });

    const listing = await Listing.findById(req.params.id).lean();
    if (!listing || !listing.imTemplateId) return res.status(404).json({ error: 'not_found' });

    const template = await ImTemplate.findById(listing.imTemplateId).lean();
    if (!template || template.archived) return res.status(404).json({ error: 'not_found' });

    return res.json({
      template: {
        _id: template._id,
        businessName: template.businessName,
        brokerEmail: template.brokerEmail,
        sections: template.sections,
      },
    });
  } catch (err) {
    console.error('IM template verify error:', err);
    return res.status(500).json({ error: 'server_error' });
  }
});

router.get('/pdf-proxy/:filename', async (req, res) => {
  try {
    const filePath = path.join(documentsDir, req.params.filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });
    const fileBuffer = fs.readFileSync(filePath);
    const base64 = fileBuffer.toString('base64');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'private, max-age=3600');
    res.json({ data: base64 });
  } catch (err) {
    console.error('PDF proxy error:', err);
    res.status(500).json({ error: err.message });
  }
});

// router.get('/:id/im-views', auth, async (req, res) => {
//   try {
//     const logs = await ImViewLog.find({ listingId: req.params.id })
//       .sort({ createdAt: -1 })
//       .lean();

//     // Collect unique enquiry IDs and fetch their revocation + share date
//     const enquiryIds = [...new Set(logs.map(l => l.enquiryId?.toString()).filter(Boolean))];
//     const enquiries = await Enquiry.find(
//       { _id: { $in: enquiryIds } },
//       { imRevoked: 1, imSharedAt: 1, updatedAt: 1 }
//     ).lean();

//     const enquiryMap = {};
//     for (const eq of enquiries) {
//       const sharedDate = eq.imSharedAt || eq.updatedAt;
//       const daysSinceShared = (Date.now() - new Date(sharedDate).getTime()) / (1000 * 60 * 60 * 24);
//       const autoExpired = daysSinceShared > 30;

//       enquiryMap[eq._id.toString()] = {
//         imRevoked: eq.imRevoked || false,
//         imSharedAt: sharedDate,
//         autoExpired,
//         effectivelyRevoked: eq.imRevoked || autoExpired,
//       };
//     }

//     // Attach enriched data to each log
//     const enrichedLogs = logs.map(log => {
//       const eqData = log.enquiryId ? enquiryMap[log.enquiryId.toString()] : null;
//       return {
//         ...log,
//         imRevoked: eqData?.effectivelyRevoked || false,
//         imSharedAt: eqData?.imSharedAt || null,
//         autoExpired: eqData?.autoExpired || false,
//       };
//     });

//     res.json(enrichedLogs);
//   } catch (err) {
//     console.error('IM view logs error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });
router.get('/im-views/all', auth, async (req, res) => {
  try {

    const { listingId } = req.query;
    const query = { 'brokers.email': req.user.email };

    if (listingId) {
      query._id = listingId;
    }

    const listings = await Listing.find(query)
      .select('_id deal title')
      .lean();

    const dealIds = listings.map(l => l.deal?.toString()).filter(Boolean);

    const businessNames = await fetchBusinessNames(dealIds);

    const listingMap = {};
    for (const listing of listings) {
      const businessInfo = businessNames.find(bn => bn.dealId === listing.deal);
      listingMap[listing._id.toString()] = {
        businessName: businessInfo ? businessInfo.businessName : listing.title || 'Unknown Business'
      };
    }

    const listingObjectIds = listings.map(l => l._id);

    const logs = await ImViewLog.find({ listingId: { $in: listingObjectIds } })
      .sort({ createdAt: -1 })
      .lean();

    const enquiryIds = [...new Set(logs.map(l => l.enquiryId?.toString()).filter(Boolean))];
    const enquiries = await Enquiry.find(
      { _id: { $in: enquiryIds } },
      { imRevoked: 1, imSharedAt: 1, updatedAt: 1 }
    ).lean();

    const enquiryMap = {};
    for (const eq of enquiries) {
      const sharedDate = eq.imSharedAt || eq.updatedAt;
      const daysSinceShared = (Date.now() - new Date(sharedDate).getTime()) / (1000 * 60 * 60 * 24);
      const autoExpired = daysSinceShared > 30;

      enquiryMap[eq._id.toString()] = {
        imRevoked: eq.imRevoked || false,
        imSharedAt: sharedDate,
        autoExpired,
        effectivelyRevoked: eq.imRevoked || autoExpired,
      };
    }

    // Attach enriched data to each log
    const enrichedLogs = logs.map(log => {
      const eqData = log.enquiryId ? enquiryMap[log.enquiryId.toString()] : null;
      const listingData = listingMap[log.listingId.toString()];
      return {
        ...log,
        businessName: listingData?.businessName || 'Unknown Business',
        imRevoked: eqData?.effectivelyRevoked || false,
        imSharedAt: eqData?.imSharedAt || null,
        autoExpired: eqData?.autoExpired || false,
      };
    });

    res.json(enrichedLogs);
  } catch (err) {
    console.error('IM view logs error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/listings/:listingId/im-revoke/:enquiryId — toggle IM access for a specific person
router.patch('/im-revoke/:enquiryId', auth, async (req, res) => {
  try {
    const { revoked } = req.body;
    if (typeof revoked !== 'boolean') {
      return res.status(400).json({ error: '"revoked" must be a boolean' });
    }

    // When re-enabling access, reset imSharedAt to give a fresh 30-day window
    const updateData = { imRevoked: revoked };
    if (!revoked) {
      updateData.imSharedAt = new Date();
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.enquiryId,
      updateData,
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    res.json({ success: true, imRevoked: enquiry.imRevoked, imSharedAt: enquiry.imSharedAt });
  } catch (err) {
    console.error('IM revoke error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.use('/uploads/documents', express.static(documentsDir));

module.exports = router;

