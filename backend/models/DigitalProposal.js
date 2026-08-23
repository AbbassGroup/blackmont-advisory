const mongoose = require('mongoose');

/**
 * A single section inside a Digital Proposal.
 *
 * Mirrors the Information Memorandum engine (`models/ImTemplate.js`): `type`
 * picks the renderer, `data` is a free-form payload owned by that renderer, and
 * order is the position in the `sections` array.
 *
 * The difference from an IM: a proposal is a *contract*. The banner and
 * investment section types are locked because their content is denormalised
 * back onto the flat fields below, which `utils/emailTemplates.js` reads when
 * the client accepts. Presentation lives in `sections`; the contract lives in
 * the flat fields, and the PUT handler keeps the two in step via
 * `utils/proposalSections.js`.
 */
const proposalSectionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, trim: true },
    enabled: { type: Boolean, default: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { _id: true }
);

const digitalProposalSchema = new mongoose.Schema({
  businessName: {//
    type: String,
    // required: true,
    trim: true
  },
  businessValue: {//
    type: String,
    // required: true,
    trim: true
  },
  brokerName: {//
    type: String,
    // required: true,
    trim: true
  },
  brokerEmail: {//
    type: String,
    // required: true,
    trim: true
  },
  financialAssumptions: {//
    type: String,
    default: ''
  },
  backgroundImage: {//
    type: String,
    default: ''
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: String,
    default: ''
  },
  approvedAt: {
    type: Date,
    default: null
  },
  createdBy: {
    type: String,
    default: 'Admin'
  },
  customerEmail: {//
    type: String,
    trim: true,
    default: ''
  },
  customerName: {//
    type: String,
    trim: true,
    default: ''
  },
  agreementTerm: {
    type: String,
    default: '90'
  },
  businessAddress: {
    type: String,
    trim: true,
    default: ''
  },
  listingPrice: {
    type: String,
    trim: true,
    default: ''
  },
  performanceBonus: {
    type: String,
    trim: true,
    default: ''
  },
  salePrice: {
    type: String,
    trim: true,
    default: ''
  },
  engagementFee: {
    type: String,
    default: '0'
  },
  advertisement: [{
    text: {//
      type: String,
      default: ''
    },
    amount: {//
      type: String,
      default: ''
    },
    unit: {
      type: String,
      enum: ['Dollar', 'Percentage'],
      default: 'Dollar'
    }
  }],
  successFee: [{//
    text: {
      type: String,
      default: ''
    },
    amount: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      enum: ['Dollar', 'Percentage'],
      default: 'Percentage'
    }
  }],
  // expired after 30 days
  // expiredAt: {
  //   type: Date,
  // },
  // ── Section engine ────────────────────────────────────────────────────────
  // Source of truth for how the proposal is laid out and what it says. Empty on
  // legacy documents; `buildSectionsFromFlat()` fills it in lazily on read.
  sections: {
    type: [proposalSectionSchema],
    default: []
  },

  // Set when the broker submits the draft for the owner's approval. Together
  // with `isApproved` this gives the editor its three states: draft (unset),
  // pending (set, not approved), approved.
  submittedForApprovalAt: {
    type: Date,
    default: null
  },

  // Soft delete, as per Information Memorandums: archived proposals drop out of
  // the admin list and stop serving to customers, but stay recoverable.
  archived: {
    type: Boolean,
    default: false,
    index: true
  },
  archivedAt: {
    type: Date,
    default: null
  },

  lastEditedBy: {
    type: String,
    trim: true,
    default: ''
  },

  template: {
    type: String,
    enum: ['business_appraisal', 'franchise_proposal'],
    default: 'business_appraisal'
  }
}, {
  timestamps: true
});

// Index for faster queries
digitalProposalSchema.index({ businessName: 1 });
digitalProposalSchema.index({ brokerName: 1 });
digitalProposalSchema.index({ isApproved: 1 });
digitalProposalSchema.index({ customerEmail: 1 });

module.exports = mongoose.model('DigitalProposal', digitalProposalSchema);
