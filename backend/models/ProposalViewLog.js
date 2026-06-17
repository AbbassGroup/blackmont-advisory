const mongoose = require('mongoose');

const proposalViewLogSchema = new mongoose.Schema({
  proposalId: { type: mongoose.Schema.Types.ObjectId, ref: 'DigitalProposal', required: true, index: true },
  customerEmail: { type: String, required: true },
  customerName: { type: String, default: '' },
  businessName: { type: String, default: '' },
  ip: { type: String },
  userAgent: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('ProposalViewLog', proposalViewLogSchema);
