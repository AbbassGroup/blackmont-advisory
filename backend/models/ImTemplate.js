const mongoose = require('mongoose');

/**
 * A single page/section inside an Information Memorandum template.
 *
 * `type`  identifies which renderer the frontend uses (banner, confidentiality,
 *         welcome, hours, ...). New section types can be added without changing
 *         this schema.
 * `data`  is an open, free-form object whose shape depends on `type`. Keeping it
 *         as Mixed makes the model flexible — each section owns its own content
 *         contract on the frontend.
 * Order is determined by the position of the section in the `sections` array.
 */
const imSectionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, trim: true },
    enabled: { type: Boolean, default: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { _id: true }
);

const imTemplateSchema = new mongoose.Schema(
  {
    // Display — the business name is the memorandum's identifier.
    businessName: { type: String, trim: true, default: '' },

    // The broker who owns this memorandum. This is the single owner field used
    // for access control AND for the Welcome / Process sections. A non-superadmin
    // can only see and edit templates whose brokerEmail matches their account
    // email; a superadmin can see and manage every template.
    brokerEmail: { type: String, required: true, lowercase: true, trim: true, index: true },

    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date, default: null },

    // Soft delete: archived memorandums are hidden from lists and stop serving
    // to recipients, but remain in the database for recovery.
    archived: { type: Boolean, default: false, index: true },
    archivedAt: { type: Date, default: null },

    sections: { type: [imSectionSchema], default: [] },

    createdBy: { type: String, trim: true, default: '' },
    lastEditedBy: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

imTemplateSchema.index({ brokerEmail: 1, updatedAt: -1 });
imTemplateSchema.index({ status: 1 });
imTemplateSchema.index({ businessName: 1 });

module.exports = mongoose.model('ImTemplate', imTemplateSchema);
