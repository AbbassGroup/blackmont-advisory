const mongoose = require('mongoose');

const imViewLogSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true, index: true },
  enquiryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Enquiry' },
  email: { type: String, required: true },
  name: { type: String },
  ip: { type: String },
  userAgent: { type: String },
  accessDenied: { type: Boolean, default: false },
  // 'grant' = access granted at approval (a placeholder so the person shows in
  // the history with 0 views); 'view' = an actual IM open. Only 'view' counts.
  type: { type: String, enum: ['grant', 'view'], default: 'view', index: true },
}, { timestamps: true });

module.exports = mongoose.model('ImViewLog', imViewLogSchema);
