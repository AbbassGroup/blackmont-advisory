const mongoose = require('mongoose');

// A broker's free-text note against a prospect on a deal; vendors read-only.
// `prospectId` is the external Nexar contact id (a string).
const prospectNoteSchema = new mongoose.Schema(
  {
    listingId: { type: String, required: true, index: true },
    prospectId: { type: String, required: true, index: true },
    body: { type: String, required: true, trim: true },

    // Author captured at create time for the byline (authorId = admin User._id).
    authorId: { type: String, required: true },
    authorName: { type: String, default: '' },
  },
  { timestamps: true }
);

prospectNoteSchema.index({ listingId: 1, prospectId: 1, createdAt: -1 });

module.exports = mongoose.model('ProspectNote', prospectNoteSchema);
