const mongoose = require('mongoose');

const CareerApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  coverLetter: { type: String },
  resumeFile: { type: String, required: true }, // path to uploaded file
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CareerApplication', CareerApplicationSchema); 