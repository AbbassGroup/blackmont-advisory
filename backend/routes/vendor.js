const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Vendor = require('../models/Vendor');
const Listing = require('../models/Listing');
const Enquiry = require('../models/Enquiry');
const ImViewLog = require('../models/ImViewLog');
const ProspectCategory = require('../models/ProspectCategory');
const ProspectNote = require('../models/ProspectNote');

const vendorAuth = require('../middleware/vendorAuth.middleware');
const fetchProspects = require('../utils/fetchProspects');
const fetchBusinessNames = require('../utils/fetchBusinessNames');

const signVendorToken = (vendor) =>
  jwt.sign(
    { vendorId: vendor._id, listingId: vendor.listingId.toString(), role: 'vendor' },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );

// ── Auth ──────────────────────────────────────────────────────────────────

// POST /api/vendor/login — identifier may be an email or a username.
router.post('/login', async (req, res) => {
  try {
    const { identifier, email, password } = req.body;
    const id = String(identifier ?? email ?? '').toLowerCase().trim();
    if (!id || !password) {
      return res.status(400).json({ message: 'Email/username and password are required' });
    }

    const vendor = await Vendor.findOne({
      $or: [{ email: id }, { username: id }],
    });
    if (!vendor) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    let matched = false;
    try {
      matched = await vendor.matchPassword(password);
    } catch {
      return res.status(500).json({ message: 'Error while verifying password' });
    }
    if (!matched) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    vendor.lastLoginAt = new Date();
    await vendor.save();

    return res.status(200).json({
      success: true,
      message: 'Successfully logged in',
      token: signVendorToken(vendor),
      vendor: {
        _id: vendor._id,
        email: vendor.email,
        username: vendor.username,
        listingId: vendor.listingId,
      },
    });
  } catch (err) {
    console.error('[Vendor Login Error]', err.message);
    return res.status(500).json({ message: 'An error occurred while logging in' });
  }
});

// GET /api/vendor/me — validate token, return vendor + token (mirrors /auth/me)
router.get('/me', vendorAuth, async (req, res) => {
  return res.status(200).json({
    success: true,
    token: (req.headers['authorization'] || '').split(' ')[1] || null,
    vendor: {
      _id: req.vendor._id,
      email: req.vendor.email,
      username: req.vendor.username,
      listingId: req.vendor.listingId,
    },
  });
});

// POST /api/vendor/change-password
router.post('/change-password', vendorAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }
    if (String(newPassword).length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    const matched = await req.vendor.matchPassword(currentPassword);
    if (!matched) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    req.vendor.password = newPassword; // hashed by pre-save hook
    await req.vendor.save();

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error('[Vendor Change Password Error]', err.message);
    return res.status(500).json({ message: 'An error occurred while updating the password' });
  }
});

// ── Deal data (all scoped to req.listingId) ─────────────────────────────────

// GET /api/vendor/deal — deal meta for the vendor's listing
router.get('/deal', vendorAuth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.listingId)
      .select('_id title deal imTemplateId')
      .lean();
    if (!listing) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    let businessName = listing.title || 'Your Business';
    try {
      if (listing.deal) {
        const names = await fetchBusinessNames([listing.deal]);
        const info = names.find((bn) => bn.dealId === listing.deal);
        if (info?.businessName) businessName = info.businessName;
      }
    } catch (e) {
      console.error('Vendor deal business name lookup failed:', e.message);
    }

    return res.json({
      listingId: listing._id,
      businessName,
      // The final published IM the vendor can view (read-only). May be null.
      imTemplateId: listing.imTemplateId || null,
    });
  } catch (err) {
    console.error('[Vendor Deal Error]', err.message);
    return res.status(500).json({ message: 'Failed to load deal' });
  }
});

// GET /api/vendor/deal/prospects — Nexar prospects + categories, PII stripped.
// Vendors only ever receive name + category (never email/phone).
router.get('/deal/prospects', vendorAuth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.listingId).select('deal').lean();
    if (!listing) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    let prospects = [];
    try {
      prospects = await fetchProspects(listing.deal);
    } catch (e) {
      console.error('Vendor prospects fetch failed:', e.message);
      prospects = [];
    }

    // Map prospectId → category (most recent wins).
    const cats = await ProspectCategory.find({ listingId: req.listingId })
      .sort({ updatedAt: -1 })
      .lean();
    const catMap = {};
    for (const c of cats) {
      if (!(c.prospectId in catMap)) catMap[c.prospectId] = c.category;
    }

    // Strip PII — name + category only.
    const safe = (prospects || []).map((p) => ({
      _id: p._id,
      firstName: p.firstName || '',
      lastName: p.lastName || '',
      category: catMap[p._id] || null,
    }));

    return res.json(safe);
  } catch (err) {
    console.error('[Vendor Prospects Error]', err.message);
    return res.status(500).json({ message: 'Failed to load prospects' });
  }
});

// GET /api/vendor/deal/im-views — IM view history for this listing, email stripped.
router.get('/deal/im-views', vendorAuth, async (req, res) => {
  try {
    const listingObjectId = req.vendor.listingId;

    const logs = await ImViewLog.find({ listingId: listingObjectId })
      .sort({ createdAt: -1 })
      .lean();

    const enquiryIds = [
      ...new Set(logs.map((l) => l.enquiryId?.toString()).filter(Boolean)),
    ];
    const enquiries = await Enquiry.find(
      { _id: { $in: enquiryIds } },
      { imRevoked: 1, imSharedAt: 1, updatedAt: 1 }
    ).lean();

    const enquiryMap = {};
    for (const eq of enquiries) {
      const sharedDate = eq.imSharedAt || eq.updatedAt;
      const daysSinceShared =
        (Date.now() - new Date(sharedDate).getTime()) / (1000 * 60 * 60 * 24);
      const autoExpired = daysSinceShared > 30;
      enquiryMap[eq._id.toString()] = {
        imSharedAt: sharedDate,
        autoExpired,
        effectivelyRevoked: eq.imRevoked || autoExpired,
      };
    }

    // Enrich and strip PII (no email/phone for vendors).
    const enriched = logs.map((log) => {
      const eqData = log.enquiryId ? enquiryMap[log.enquiryId.toString()] : null;
      return {
        _id: log._id,
        name: log.name || '—',
        email: '', // intentionally stripped for vendors
        enquiryId: log.enquiryId,
        listingId: log.listingId,
        type: log.type,
        createdAt: log.createdAt,
        imRevoked: eqData?.effectivelyRevoked || false,
        imSharedAt: eqData?.imSharedAt || null,
        autoExpired: eqData?.autoExpired || false,
      };
    });

    return res.json(enriched);
  } catch (err) {
    console.error('[Vendor IM Views Error]', err.message);
    return res.status(500).json({ message: 'Failed to load IM history' });
  }
});

// PATCH /api/vendor/deal/im-revoke/:enquiryId — the one thing a vendor can edit.
// The enquiry must belong to the vendor's own listing.
router.patch('/deal/im-revoke/:enquiryId', vendorAuth, async (req, res) => {
  try {
    const { revoked } = req.body;

    if (typeof revoked !== 'boolean') {
      return res.status(400).json({ error: '"revoked" must be a boolean' });
    }

    const enquiry = await Enquiry.findById(req.params.enquiryId);
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    enquiry.imRevoked = revoked;
    if (!revoked) enquiry.imSharedAt = new Date(); // fresh 30-day window
    await enquiry.save();

    return res.json({
      success: true,
      imRevoked: enquiry.imRevoked,
      imSharedAt: enquiry.imSharedAt,
    });
  } catch (err) {
    console.error('[Vendor IM Revoke Error]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/vendor/deal/notes — read-only notes for the listing, grouped by prospect.
router.get('/deal/notes', vendorAuth, async (req, res) => {
  try {
    const notes = await ProspectNote.find({ listingId: req.listingId })
      .sort({ createdAt: -1 })
      .lean();

    const map = {};
    for (const n of notes) {
      (map[n.prospectId] = map[n.prospectId] || []).push({
        _id: n._id,
        body: n.body,
        authorName: n.authorName,
        createdAt: n.createdAt,
        updatedAt: n.updatedAt,
      });
    }
    return res.json(map);
  } catch (err) {
    console.error('[Vendor Notes Error]', err.message);
    return res.status(500).json({ message: 'Failed to load notes' });
  }
});

module.exports = router;
