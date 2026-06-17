const mongoose = require('mongoose');

const valuationRequestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  formCompleted: { type: Boolean, default: false },
  source: { type: String, default: 'Valuations Form' },
}, { timestamps: true });

module.exports = mongoose.model('ValuationRequest', valuationRequestSchema); 