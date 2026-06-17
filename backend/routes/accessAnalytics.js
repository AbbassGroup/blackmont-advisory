const express = require('express');
const router = express.Router();
const AccessEvent = require('../models/AccessEvent');
const authMiddleware = require('../middleware/auth.middleware');

const ALLOWED_TYPES = [
  'page_view',
  'resource_open',
  'lead_submitted',
  'tool_started',
  'tool_completed',
  'cta_click',
];

function getClientIp(req) {
  const fwd = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || req.socket?.remoteAddress || '';
}

// POST /api/access-analytics/event — public, fire-and-forget ingest.
router.post('/event', async (req, res) => {
  try {
    const body = req.body || {};
    const {
      type,
      resource,
      path,
      sessionId,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      lead,
    } = body;

    if (!ALLOWED_TYPES.includes(type)) return res.status(204).end();

    const doc = {
      type,
      resource: typeof resource === 'string' ? resource.slice(0, 200) : '',
      path: typeof path === 'string' ? path.slice(0, 300) : '',
      sessionId: typeof sessionId === 'string' ? sessionId.slice(0, 100) : '',
      referrer: typeof referrer === 'string' ? referrer.slice(0, 500) : undefined,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      ip: getClientIp(req),
      userAgent: (req.headers['user-agent'] || '').slice(0, 500),
    };

    if (type === 'lead_submitted' && lead && typeof lead === 'object') {
      doc.name = lead.name;
      doc.email = lead.email;
      doc.phone = lead.phone;
      doc.industry = lead.industry;
      doc.location = lead.location;
      doc.comments = lead.comments;
      doc.leadType = lead.leadType;
    }

    await AccessEvent.create(doc);
    return res.status(204).end();
  } catch (err) {
    console.error('Access event ingest error:', err.message);
    return res.status(204).end();
  }
});

// GET /api/access-analytics/summary?days=30 — admin aggregates (days=0 = all-time).
router.get('/summary', authMiddleware, async (req, res) => {
  try {
    const days = Math.min(Math.max(parseInt(req.query.days, 10) || 30, 0), 365);
    const match =
      days > 0
        ? { createdAt: { $gte: new Date(Date.now() - days * 86400000) } }
        : {};

    const grouped = await AccessEvent.aggregate([
      { $match: match },
      {
        $group: {
          _id: { type: '$type', resource: '$resource' },
          count: { $sum: 1 },
        },
      },
    ]);

    const uniqueAgg = await AccessEvent.aggregate([
      { $match: { ...match, sessionId: { $nin: [null, ''] } } },
      { $group: { _id: '$sessionId' } },
      { $count: 'count' },
    ]);
    const uniqueVisitors = uniqueAgg[0]?.count || 0;

    const totals = {
      pageViews: 0,
      uniqueVisitors,
      cardOpens: 0,
      toolStarts: 0,
      toolCompletions: 0,
      leads: 0,
      ctaClicks: 0,
      conversionRate: 0,
    };

    const resourceMap = {};
    const ensureResource = (name) => {
      const key = name || '(unlabelled)';
      if (!resourceMap[key]) {
        resourceMap[key] = {
          resource: key,
          views: 0,
          cardOpens: 0,
          completions: 0,
          leads: 0,
        };
      }
      return resourceMap[key];
    };

    for (const row of grouped) {
      const { type, resource } = row._id;
      const count = row.count;
      const r = ensureResource(resource);
      switch (type) {
        case 'page_view':
          totals.pageViews += count;
          r.views += count;
          break;
        case 'resource_open':
          totals.cardOpens += count;
          r.cardOpens += count;
          break;
        case 'tool_started':
          totals.toolStarts += count;
          break;
        case 'tool_completed':
          totals.toolCompletions += count;
          r.completions += count;
          break;
        case 'lead_submitted':
          totals.leads += count;
          r.leads += count;
          break;
        case 'cta_click':
          totals.ctaClicks += count;
          break;
        default:
          break;
      }
    }

    totals.conversionRate = totals.pageViews
      ? +((totals.leads / totals.pageViews) * 100).toFixed(1)
      : 0;

    const byResource = Object.values(resourceMap).sort(
      (a, b) => b.cardOpens + b.views - (a.cardOpens + a.views),
    );

    const recentLeads = await AccessEvent.find({
      ...match,
      type: 'lead_submitted',
    })
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    res.json({ days, totals, byResource, recentLeads });
  } catch (err) {
    console.error('Access analytics summary error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
