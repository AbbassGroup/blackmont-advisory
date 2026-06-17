const mongoose = require('mongoose');

const accessEventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        'page_view',
        'resource_open',
        'lead_submitted',
        'tool_started',
        'tool_completed',
        'cta_click',
      ],
      index: true,
    },
    resource: { type: String, default: '', index: true },
    path: { type: String, default: '' },
    sessionId: { type: String, default: '', index: true },

    // Captured lead (lead_submitted only).
    name: { type: String },
    email: { type: String, index: true },
    phone: { type: String },
    industry: { type: String },
    location: { type: String },
    comments: { type: String },
    leadType: { type: String }, // 'resource_gate' | 'consultation'

    referrer: { type: String },
    utmSource: { type: String },
    utmMedium: { type: String },
    utmCampaign: { type: String },
    utmTerm: { type: String },
    utmContent: { type: String },

    ip: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true },
);

accessEventSchema.index({ createdAt: -1 });

module.exports = mongoose.model('AccessEvent', accessEventSchema);
