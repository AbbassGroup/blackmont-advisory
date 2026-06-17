const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const ProspectCategory = require('../models/ProspectCategory');
const ImNotificationPref = require('../models/ImNotificationPref');
const auth = require('../middleware/auth.middleware');
const fetchBusinessNames = require('../utils/fetchBusinessNames');

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

module.exports = router;