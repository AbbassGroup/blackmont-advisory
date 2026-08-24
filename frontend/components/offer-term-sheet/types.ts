// Shapes returned by /api/offer-term-sheets, mirroring backend/models/OfferTermSheet.js.

export type SheetStatus =
  | 'draft'
  | 'changes_requested'
  | 'pending_approval_buyer'
  | 'sent_to_buyer'
  | 'pending_approval_vendor'
  | 'sent_to_vendor'
  | 'completed'
  | 'declined'
  | 'cancelled';

export type SheetAction =
  | 'submit'
  | 'approve'
  | 'request_changes'
  | 'buyer_sign'
  | 'vendor_sign'
  | 'decline'
  | 'cancel';

export type WaitingOn = 'broker' | 'superadmin' | 'buyer' | 'vendor' | null;

export interface Execution {
  fullName: string;
  email: string;
  phone: string;
  date: string | null;
  signatureImage: string;
  consentAccepted: boolean;
  signedAt: string | null;
}

export interface Inclusions {
  businessName: boolean;
  intellectualProperty: boolean;
  plantAndEquipment: boolean;
  goodwill: boolean;
  otherEnabled: boolean;
  otherText: string;
}

export interface SubjectTo {
  dueDiligenceEnabled: boolean;
  dueDiligenceDays: number | null;
  leaseTransfer: boolean;
  financeApproval: boolean;
  transitionEnabled: boolean;
  transitionWeeks: number | null;
  otherEnabled: boolean;
  otherText: string;
}

export interface Approval {
  stage: 'buyer' | 'vendor';
  approvedBy: string;
  approvedAt: string;
  note: string;
}

export interface AuditEntry {
  action: string;
  actorRole: 'broker' | 'superadmin' | 'buyer' | 'vendor' | 'system';
  actorEmail: string;
  actorName: string;
  fromStatus: string;
  toStatus: string;
  note: string;
  at: string;
}

export interface OfferTermSheet {
  _id: string;
  brokerEmail: string;
  brokerName: string;
  buyerInviteEmail: string;

  businessName: string;
  businessAddress: string;
  vendorName: string;
  vendorEmail: string;
  inclusions: Inclusions;

  purchaserName: string;
  purchaserEmail: string;
  purchasePrice: number | null;
  stockTreatment: 'plus_sav' | 'including_sav' | '';
  settlementMode: 'date' | 'weeks' | '';
  settlementDate: string | null;
  settlementWeeks: number | null;
  subjectTo: SubjectTo;

  depositAmount: number | null;
  balanceAmount: number | null;

  purchaserExecution: Execution;
  vendorExecution: Execution;

  status: SheetStatus;
  approvals: Approval[];
  tokenVersion: number;

  submittedAt: string | null;
  sentToBuyerAt: string | null;
  buyerSignedAt: string | null;
  sentToVendorAt: string | null;
  vendorSignedAt: string | null;
  completedAt: string | null;

  declinedBy: 'buyer' | 'vendor' | null;
  declineReason: string;

  auditTrail: AuditEntry[];
  archived: boolean;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// List rows omit the audit trail and signature images, and carry a derived waitingOn.
export type OfferTermSheetRow = Omit<
  OfferTermSheet,
  'auditTrail' | 'approvals'
> & {
  waitingOn: WaitingOn;
};

// What the signed-in user may do with a sheet right now.
export interface SheetMeta {
  role: 'broker' | 'superadmin';
  waitingOn: WaitingOn;
  availableActions: SheetAction[];
  editableFields: string[];
  missingBroker: string[];
  missingBuyer: string[];
  missingVendor: string[];
}

export interface SheetListResponse {
  sheets: OfferTermSheetRow[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface SheetResponse {
  sheet: OfferTermSheet;
  meta: SheetMeta;
}

// What /public/:token returns, the letter only, never the workflow internals.
export interface PublicOfferTermSheet {
  status: SheetStatus;
  role: 'buyer' | 'vendor';
  businessName: string;
  businessAddress: string;
  vendorName: string;
  vendorEmail: string;
  purchaserName: string;
  purchaserEmail: string;
  purchasePrice: number | null;
  stockTreatment: 'plus_sav' | 'including_sav' | '';
  depositAmount: number | null;
  balanceAmount: number | null;
  settlementMode: 'date' | 'weeks' | '';
  settlementDate: string | null;
  settlementWeeks: number | null;
  inclusions: Inclusions;
  subjectTo: SubjectTo;
  purchaserExecution: Execution;
  vendorExecution: Execution;
  editableFields: string[];
}

export type PartyRefusalCode =
  | 'expired'
  | 'invalid'
  | 'superseded'
  | 'not_found'
  | 'already_signed'
  | 'declined'
  | 'cancelled'
  | 'not_yet';
