const mongoose = require('mongoose');

const imNotificationPrefSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  brokerEmail: { type: String, required: true },
  enabled: { type: Boolean, default: false },
  timezone: { type: String, default: 'Australia/Melbourne' }, // Broker's local timezone for email formatting
}, { timestamps: true });

// One preference record per broker per listing
imNotificationPrefSchema.index({ listingId: 1, brokerEmail: 1 }, { unique: true });

module.exports = mongoose.model('ImNotificationPref', imNotificationPrefSchema);
