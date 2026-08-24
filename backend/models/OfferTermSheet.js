const mongoose = require('mongoose');
const { STATUSES, ACTOR_ROLES } = require('../utils/offerTermSheetLogic');

const EMAIL_PATTERN = /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PRICE = 1_000_000_000;
const MAX_WEEKS = 260;
const MAX_DUE_DILIGENCE_DAYS = 365;
// Signatures are PNG data URLs; the cap bounds a pathological upload.
const MAX_SIGNATURE_BYTES = 1_500_000;

const emailField = (extra = {}) => ({
  type: String,
  trim: true,
  lowercase: true,
  maxlength: 254,
  match: [EMAIL_PATTERN, 'Invalid email address'],
  default: '',
  ...extra,
});

const moneyField = () => ({
  type: Number,
  default: null,
  min: 0,
  max: MAX_PRICE,
  validate: {
    validator: (v) => v === null || Number.isFinite(v),
    message: 'Must be a finite number',
  },
});

// A party's execution block; signedAt, ip and userAgent are captured server-side.
const executionSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true, maxlength: 150, default: '' },
    email: emailField(),
    phone: { type: String, trim: true, maxlength: 40, default: '' },
    date: { type: Date, default: null },
    signatureImage: {
      type: String,
      default: '',
      maxlength: MAX_SIGNATURE_BYTES,
    },
    // Acceptance of the Electronic Transactions (Victoria) Act 2000 wording.
    consentAccepted: { type: Boolean, default: false },
    signedAt: { type: Date, default: null },
    ip: { type: String, default: '' },
    userAgent: { type: String, default: '' },
  },
  { _id: false },
);

const auditEntrySchema = new mongoose.Schema(
  {
    action: { type: String, required: true, trim: true },
    actorRole: { type: String, enum: ACTOR_ROLES, required: true },
    actorEmail: { type: String, trim: true, lowercase: true, default: '' },
    actorName: { type: String, trim: true, default: '' },
    fromStatus: { type: String, enum: [...STATUSES, ''], default: '' },
    toStatus: { type: String, enum: [...STATUSES, ''], default: '' },
    note: { type: String, trim: true, maxlength: 2000, default: '' },
    ip: { type: String, default: '' },
    userAgent: { type: String, default: '' },
    at: { type: Date, default: Date.now },
  },
  { _id: false },
);

const approvalSchema = new mongoose.Schema(
  {
    stage: { type: String, enum: ['buyer', 'vendor'], required: true },
    approvedBy: emailField({ required: true }),
    approvedAt: { type: Date, default: Date.now },
    note: { type: String, trim: true, maxlength: 2000, default: '' },
  },
  { _id: false },
);

// A Letter of Intent moving from broker setup, through two approvals, to buyer and vendor signatures.
const offerTermSheetSchema = new mongoose.Schema(
  {
    // ─── Ownership & routing ──────────────────────────────────────────────
    brokerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    brokerName: { type: String, trim: true, maxlength: 150, default: '' },
    // Where the invitation is sent; purchaserEmail is the buyer's own entry on the letter.
    buyerInviteEmail: emailField(),

    // ─── Broker-completed ─────────────────────────────────────────────────
    businessName: { type: String, trim: true, maxlength: 200, default: '' },
    businessAddress: { type: String, trim: true, maxlength: 300, default: '' },
    vendorName: { type: String, trim: true, maxlength: 150, default: '' },
    vendorEmail: emailField(),
    inclusions: {
      businessName: { type: Boolean, default: false },
      intellectualProperty: { type: Boolean, default: false },
      plantAndEquipment: { type: Boolean, default: false },
      goodwill: { type: Boolean, default: false },
      otherEnabled: { type: Boolean, default: false },
      otherText: { type: String, trim: true, maxlength: 300, default: '' },
    },

    // ─── Buyer-completed ──────────────────────────────────────────────────
    purchaserName: { type: String, trim: true, maxlength: 150, default: '' },
    purchaserEmail: emailField(),
    purchasePrice: moneyField(),
    stockTreatment: {
      type: String,
      enum: ['plus_sav', 'including_sav', ''],
      default: '',
    },
    settlementMode: { type: String, enum: ['date', 'weeks', ''], default: '' },
    settlementDate: { type: Date, default: null },
    settlementWeeks: {
      type: Number,
      default: null,
      min: 1,
      max: MAX_WEEKS,
      validate: {
        validator: (v) => v === null || Number.isInteger(v),
        message: 'Must be a whole number of weeks',
      },
    },
    subjectTo: {
      dueDiligenceEnabled: { type: Boolean, default: false },
      dueDiligenceDays: {
        type: Number,
        default: null,
        min: 1,
        max: MAX_DUE_DILIGENCE_DAYS,
        validate: {
          validator: (v) => v === null || Number.isInteger(v),
          message: 'Must be a whole number of days',
        },
      },
      leaseTransfer: { type: Boolean, default: false },
      financeApproval: { type: Boolean, default: false },
      transitionEnabled: { type: Boolean, default: false },
      transitionWeeks: {
        type: Number,
        default: null,
        min: 1,
        max: MAX_WEEKS,
        validate: {
          validator: (v) => v === null || Number.isInteger(v),
          message: 'Must be a whole number of weeks',
        },
      },
      otherEnabled: { type: Boolean, default: false },
      otherText: { type: String, trim: true, maxlength: 300, default: '' },
    },

    // ─── Money ────────────────────────────────────────────────────────────
    // Deposit may be stated by either party; the balance is always derived.
    depositAmount: moneyField(),
    balanceAmount: moneyField(),

    // ─── Signatures ───────────────────────────────────────────────────────
    purchaserExecution: { type: executionSchema, default: () => ({}) },
    vendorExecution: { type: executionSchema, default: () => ({}) },

    // ─── Workflow ─────────────────────────────────────────────────────────
    status: {
      type: String,
      enum: STATUSES,
      default: 'draft',
      index: true,
    },
    approvals: { type: [approvalSchema], default: [] },
    // Bumping this invalidates every link previously emailed for this sheet.
    tokenVersion: { type: Number, default: 1, min: 1 },

    submittedAt: { type: Date, default: null },
    sentToBuyerAt: { type: Date, default: null },
    buyerSignedAt: { type: Date, default: null },
    sentToVendorAt: { type: Date, default: null },
    vendorSignedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },

    declinedBy: { type: String, enum: ['buyer', 'vendor', null], default: null },
    declineReason: { type: String, trim: true, maxlength: 2000, default: '' },

    pdfPath: { type: String, default: '' },
    pdfGeneratedAt: { type: Date, default: null },

    auditTrail: { type: [auditEntrySchema], default: [] },

    archived: { type: Boolean, default: false, index: true },
    archivedAt: { type: Date, default: null },

    createdBy: { type: String, trim: true, lowercase: true, default: '' },
    lastEditedBy: { type: String, trim: true, lowercase: true, default: '' },
  },
  { timestamps: true },
);

offerTermSheetSchema.index({ brokerEmail: 1, updatedAt: -1 });
offerTermSheetSchema.index({ status: 1, updatedAt: -1 });
offerTermSheetSchema.index({ archived: 1, updatedAt: -1 });
offerTermSheetSchema.index({ businessName: 1 });
offerTermSheetSchema.index({ buyerInviteEmail: 1 });
offerTermSheetSchema.index({ vendorEmail: 1 });

offerTermSheetSchema.statics.STATUSES = STATUSES;
offerTermSheetSchema.statics.ACTOR_ROLES = ACTOR_ROLES;

module.exports = mongoose.model('OfferTermSheet', offerTermSheetSchema);
