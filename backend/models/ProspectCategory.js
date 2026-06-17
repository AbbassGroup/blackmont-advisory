const mongoose = require('mongoose');

const prospectCategorySchema = new mongoose.Schema({
  listingId: { type: String, required: true },
  prospectId: { type: String, required: true },
  adminUserId: { type: String, required: true },
  category: { type: String, enum: ['Hot', 'Warm', 'Cold'], required: true },
}, { timestamps: true });


prospectCategorySchema.index({ listingId: 1, prospectId: 1, adminUserId: 1 }, { unique: true });

module.exports = mongoose.model('ProspectCategory', prospectCategorySchema);
