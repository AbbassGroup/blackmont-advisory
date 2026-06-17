const mongoose = require('mongoose');

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
