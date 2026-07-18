const mongoose = require('mongoose');

/**
 * A single page/section inside an Acquisition Report.
 *
 * `type` picks the frontend renderer (banner, about, highlights, ...); `data` is
 * a free-form, per-type payload. Section order is the array order.
 *
 * Acquisition Reports are the buyer-side counterpart to the Information
 * Memorandum. They are a completely independent service — their own collection,
 * routes and lifecycle — even though the editor/renderer look the same. There is
 * deliberately NO view tracking or view notifications for these reports.
 */
const acquisitionSectionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, trim: true },
    enabled: { type: Boolean, default: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { _id: true }
);

const acquisitionReportSchema = new mongoose.Schema(
  {
    // Display — the customer name is the report's identifier.
    businessName: { type: String, trim: true, default: '' },

    // Optional link to a Nexar "Business Buyers" deal. `deal` is the Nexar deal
    // id; `dealName` caches its display name. Used to associate the report with a
    // buyer (and, later, to grant that buyer portal access).
    deal: { type: String, trim: true, default: '' },
    dealName: { type: String, trim: true, default: '' },

    // The broker who owns this report — the single owner field used for access
    // control. A non-superadmin only sees/edits reports matching their email; a
    // superadmin sees them all.
    brokerEmail: { type: String, required: true, lowercase: true, trim: true, index: true },

    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date, default: null },

    // Soft delete: archived reports are hidden from lists but kept for recovery.
    archived: { type: Boolean, default: false, index: true },
    archivedAt: { type: Date, default: null },

    sections: { type: [acquisitionSectionSchema], default: [] },

    createdBy: { type: String, trim: true, default: '' },
    lastEditedBy: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

acquisitionReportSchema.index({ brokerEmail: 1, updatedAt: -1 });
acquisitionReportSchema.index({ status: 1 });
acquisitionReportSchema.index({ businessName: 1 });

module.exports = mongoose.model('AcquisitionReport', acquisitionReportSchema);
