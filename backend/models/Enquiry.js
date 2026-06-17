const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  name: { type: String }, // For forms that use single name field
  phone: { type: String },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String },
  source: { 
    type: String, 
    required: true,
    enum: ['Valuations Form', 'Contact Form', 'Franchise Form', 'Listing EOI', 'Career Application', 'Confidentiality Agreement']
  },
  formCompleted: { type: Boolean, default: false },
  ndaStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  imRevoked: { type: Boolean, default: false },
  imSharedAt: { type: Date }, // Set when NDA is approved; used for 30-day auto-expiry
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }, // captured at approval; used by the follow-up
  imFollowUpSentAt: { type: Date }, // follow-up email sent (guards duplicates)
  imFollowUpInterestedAt: { type: Date }, // prospect clicked "Interested"
  additionalData: { type: mongoose.Schema.Types.Mixed }, // For any form-specific data
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema); 