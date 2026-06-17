const mongoose = require('mongoose');

const seekEmailSchema = new mongoose.Schema({
  sender: { type: String },
  recipient: { type: String },
  subject: { type: String },
  textContent: { type: String },
  htmlContent: { type: String },
  isProcessed: { type: Boolean, default: false },
  receivedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SeekEmail', seekEmailSchema);