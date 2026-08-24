const mongoose = require('mongoose');

const offerTermSheetViewLogSchema = new mongoose.Schema(
  {
    sheetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OfferTermSheet',
      required: true,
      index: true,
    },
    role: { type: String, enum: ['buyer', 'vendor'], required: true },
    name: { type: String, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    // The sheet's status when it was opened, so a view reads in context.
    status: { type: String, default: '' },
    ip: { type: String, default: '' },
    userAgent: { type: String, default: '' },
  },
  { timestamps: true },
);

offerTermSheetViewLogSchema.index({ sheetId: 1, createdAt: -1 });

module.exports = mongoose.model(
  'OfferTermSheetViewLog',
  offerTermSheetViewLogSchema,
);
