const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const ProspectCategory = require('../models/ProspectCategory');
const ImNotificationPref = require('../models/ImNotificationPref');
const Vendor = require('../models/Vendor');
const ProspectNote = require('../models/ProspectNote');
const auth = require('../middleware/auth.middleware');
const fetchBusinessNames = require('../utils/fetchBusinessNames');

// Returns the listing if the admin owns it (or is superadmin); otherwise sends
// the error response and returns null so the caller can `return`.
async function requireOwnedListing(req, res) {
  const listing = await Listing.findById(req.params.listingId).lean();
  if (!listing) {
    res.status(404).json({ error: 'Deal not found' });
    return null;
  }
  const owns =
    req.user.role === 'superadmin' ||
    (listing.brokers || []).some(
      (b) => (b.email || '').toLowerCase() === (req.user.email || '').toLowerCase()
    );
  if (!owns) {
    res.status(403).json({ error: 'Forbidden: you do not own this deal' });
    return null;
  }
  return listing;
}

router.get("/", auth, async (req, res) => {
  try {
    const listings = await Listing.find({ 'brokers.email': req.user.email }).lean().sort({ createdAt: -1 });

    const dealIds = listings.map(listing => listing.deal).filter(Boolean);
    console.log('🚀 ~ dealIds:', dealIds)

    if (dealIds.length === 0) {
      return res.json(listings);
    }

    try {
      const businessNames = await fetchBusinessNames(dealIds);
      console.log('🚀 ~ businessNames:', businessNames)

      const mergedData = listings.map(deal => {
        const businessInfo = businessNames.find(bn => bn.dealId === deal.deal);
        return {
          ...deal,
          businessName: businessInfo ? businessInfo.businessName : deal.title || 'Unknown Business'
        };
      });

      res.json(mergedData);
    } catch (apiErr) {
      console.error('Failed to fetch business names from Nexar API:', apiErr.message);
      const fallbackData = listings.map(deal => ({
        ...deal,
        businessName: deal.title || 'Unknown Business'
      }));
      res.json(fallbackData);
    }
  } catch (err) {
    console.error('Error in GET /api/deals:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:listingId/categories', auth, async (req, res) => {
  try {
    const cats = await ProspectCategory.find({
      listingId: req.params.listingId,
      adminUserId: req.user._id,
    }).lean();
    const map = {};
    cats.forEach(c => { map[c.prospectId] = c.category; });
    res.json(map);
  } catch (err) {
    console.error('Fetch categories error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.put('/:listingId/categories/:prospectId', auth, async (req, res) => {
  try {
    const { category } = req.body;
    if (!['Hot', 'Warm', 'Cold'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    await ProspectCategory.findOneAndUpdate(
      {
        listingId: req.params.listingId,
        prospectId: req.params.prospectId,
        adminUserId: req.user._id,
      },
      { category },
      { upsert: true, new: true }
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Set category error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── IM Notification Preferences ──

// GET /api/deals/im-notifications/bulk — get notification prefs for all broker's listings
router.get('/im-notifications/bulk', auth, async (req, res) => {
  try {
    const prefs = await ImNotificationPref.find({
      brokerEmail: req.user.email,
    }).lean();

    const map = {};
    for (const pref of prefs) {
      map[pref.listingId.toString()] = pref.enabled;
    }
    res.json(map);
  } catch (err) {
    console.error('Bulk notification prefs error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/deals/:listingId/im-notifications — get notification pref for a specific listing
router.get('/:listingId/im-notifications', auth, async (req, res) => {
  try {
    const pref = await ImNotificationPref.findOne({
      listingId: req.params.listingId,
      brokerEmail: req.user.email,
    }).lean();

    res.json({ enabled: pref?.enabled || false });
  } catch (err) {
    console.error('Get notification pref error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/deals/:listingId/im-notifications — toggle notification pref
router.put('/:listingId/im-notifications', auth, async (req, res) => {
  try {
    const { enabled, timezone } = req.body;
    if (typeof enabled !== 'boolean') {
      return res.status(400).json({ error: '"enabled" must be a boolean' });
    }

    const pref = await ImNotificationPref.findOneAndUpdate(
      {
        listingId: req.params.listingId,
        brokerEmail: req.user.email,
      },
      {
        enabled,
        ...(timezone ? { timezone } : {}),
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, enabled: pref.enabled });
  } catch (err) {
    console.error('Toggle notification pref error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Vendor access management (broker only) ──────────────────────────────────

// GET /api/deals/:listingId/vendor — current vendor email for this deal (no password)
router.get('/:listingId/vendor', auth, async (req, res) => {
  try {
    const listing = await requireOwnedListing(req, res);
    if (!listing) return;

    const vendor = await Vendor.findOne({ listingId: req.params.listingId })
      .select('email username lastLoginAt createdAt')
      .lean();

    res.json({ vendor: vendor || null });
  } catch (err) {
    console.error('Get vendor error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/deals/:listingId/vendor — create or update vendor credentials
// (email and/or username required; password optional on update).
router.put('/:listingId/vendor', auth, async (req, res) => {
  try {
    const listing = await requireOwnedListing(req, res);
    if (!listing) return;

    const { email, username, password } = req.body;
    const cleanEmail = String(email || '').toLowerCase().trim();
    const cleanUsername = String(username || '').toLowerCase().trim();
    if (!cleanEmail && !cleanUsername) {
      return res.status(400).json({ error: 'A vendor email or username is required' });
    }

    let vendor = await Vendor.findOne({ listingId: req.params.listingId });

    if (!vendor) {
      if (!password || String(password).length < 6) {
        return res
          .status(400)
          .json({ error: 'A password (min 6 characters) is required to create vendor access' });
      }
      vendor = new Vendor({
        listingId: req.params.listingId,
        email: cleanEmail,
        username: cleanUsername,
        password,
      });
    } else {
      vendor.email = cleanEmail;
      vendor.username = cleanUsername;
      if (password) {
        if (String(password).length < 6) {
          return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }
        vendor.password = password; // hashed by pre-save hook
      }
    }

    await vendor.save();

    res.json({
      success: true,
      vendor: {
        email: vendor.email,
        username: vendor.username,
        lastLoginAt: vendor.lastLoginAt,
      },
    });
  } catch (err) {
    console.error('Set vendor error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/deals/:listingId/vendor — revoke vendor login access entirely
router.delete('/:listingId/vendor', auth, async (req, res) => {
  try {
    const listing = await requireOwnedListing(req, res);
    if (!listing) return;

    await Vendor.findOneAndDelete({ listingId: req.params.listingId });
    res.json({ success: true });
  } catch (err) {
    console.error('Delete vendor error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Prospect notes (broker create/edit/delete; vendor reads via /api/vendor) ─

// GET /api/deals/:listingId/notes — all notes for the deal, grouped by prospectId
router.get('/:listingId/notes', auth, async (req, res) => {
  try {
    const notes = await ProspectNote.find({ listingId: req.params.listingId })
      .sort({ createdAt: -1 })
      .lean();

    const map = {};
    for (const n of notes) {
      (map[n.prospectId] = map[n.prospectId] || []).push(n);
    }
    res.json(map);
  } catch (err) {
    console.error('Get notes error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/deals/:listingId/notes/:prospectId — add a note against a prospect
router.post('/:listingId/notes/:prospectId', auth, async (req, res) => {
  try {
    const listing = await requireOwnedListing(req, res);
    if (!listing) return;

    const { body } = req.body;
    if (!body || !String(body).trim()) {
      return res.status(400).json({ error: 'Note body is required' });
    }

    const note = await ProspectNote.create({
      listingId: req.params.listingId,
      prospectId: req.params.prospectId,
      body: String(body).trim(),
      authorId: req.user._id.toString(),
      authorName: req.user.username || req.user.email || 'Broker',
    });

    res.status(201).json(note);
  } catch (err) {
    console.error('Create note error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/deals/:listingId/notes/:noteId — edit a note
router.put('/:listingId/notes/:noteId', auth, async (req, res) => {
  try {
    const listing = await requireOwnedListing(req, res);
    if (!listing) return;

    const { body } = req.body;
    if (!body || !String(body).trim()) {
      return res.status(400).json({ error: 'Note body is required' });
    }

    const note = await ProspectNote.findOneAndUpdate(
      { _id: req.params.noteId, listingId: req.params.listingId },
      { body: String(body).trim() },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    console.error('Edit note error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/deals/:listingId/notes/:noteId — delete a note
router.delete('/:listingId/notes/:noteId', auth, async (req, res) => {
  try {
    const listing = await requireOwnedListing(req, res);
    if (!listing) return;

    const note = await ProspectNote.findOneAndDelete({
      _id: req.params.noteId,
      listingId: req.params.listingId,
    });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Delete note error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
