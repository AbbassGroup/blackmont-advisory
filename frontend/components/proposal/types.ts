/**
 * Type system + defaults for Digital Proposals.
 *
 * The frontend half of `backend/utils/proposalSections.js` — the two files
 * describe the same sections and must be changed together. Adding a section
 * type means: add its data interface here, register it in
 * `PROPOSAL_SECTION_REGISTRY`, add a default in `makeDefaultData`, render it in
 * `<ProposalDocument>`, and mirror all of that on the backend.
 *
 * Locked sections (`locked: true`) are the ones the backend denormalises back
 * onto the model's flat fields — the values that end up in the signed agreement
 * and the notification emails. They can be edited and hidden but never removed,
 * duplicated or reordered. Sections with a `minCount` move freely but cannot be
 * deleted down to none.
 */

import type {
  ChartsData,
  CustomData,
} from '@/components/im';
import type { DocSection, DocSectionMeta, EditorDocument } from '@/components/documents/types';

/** Backend base and admin route base. Kept here, free of React imports, so the
 *  print view can reach them without pulling in the editor. */
export const PROPOSAL_API_BASE = '/api/digital-proposals';
export const PROPOSAL_BASE_PATH = '/admin/proposals';

export type ProposalTemplate = 'business_appraisal' | 'franchise_proposal';

export type ProposalSectionType =
  | 'banner'
  | 'disclaimer'
  | 'scorecard'
  | 'financialOverview'
  | 'appraisal'
  | 'investment'
  | 'accept'
  | 'accreditations'
  | 'process'
  | 'about'
  | 'contact'
  | 'custom'
  | 'charts';

// ─── Section data ────────────────────────────────────────────────────────────

/** LOCKED — business name and value flow into the agreement. */
export interface ProposalBannerData {
  eyebrow: string;
  businessName: string;
  businessValue: string;
  backgroundImage: string;
}

export interface TextItem {
  id: string;
  text: string;
}

/** One weighting factor, scored out of 5. A factor with no label is an unfilled
 *  slot: the editor shows it, the reader skips it, and it is left out of the
 *  denominator so the total can never be out of a number nobody was scored on. */
export interface ScorecardFactor {
  id: string;
  label: string;
  /** The scale, e.g. "1 = Easy, 5 = Difficult". */
  hint: string;
  /** 0–5, quarter steps. Empty string while the field is being cleared. */
  score: number | '';
}

export interface ScorecardData {
  title: string;
  /** Screenshots of the financials, stacked full-width above the factors. */
  photos: string[];
  factorsTitle: string;
  factors: ScorecardFactor[];
}

export interface FinancialOverviewData {
  title: string;
  /** Rich text. Mirrored to `financialAssumptions` on the model. */
  html: string;
}

/** The statement itself is fixed wording (`fixed-content.ts`); only the heading
 *  and the two signature captions are editable. */
export interface AppraisalData {
  title: string;
  preparedByLabel: string;
  approvedByLabel: string;
  approvedByName: string;
}

export type FeeUnit = 'Dollar' | 'Percentage';

/** One selectable fee option. The customer picks one of each on the public page
 *  and the choice is sent with the acceptance. */
export interface FeeOption {
  id: string;
  /** Rich text (HTML). */
  text: string;
  amount: string;
  unit: FeeUnit;
}

/** LOCKED — every value here reaches the agreement. */
export interface InvestmentData {
  title: string;
  advertisementTitle: string;
  advertisement: FeeOption[];
  engagementTitle: string;
  engagementBody: string;
  engagementFee: string;
  successFeeTitle: string;
  successFee: FeeOption[];
}

/** At least one must remain — without it the customer has no way to accept. */
export interface AcceptData {
  buttonLabel: string;
  note: string;
}

export interface AccreditationBadge {
  id: string;
  src: string;
  alt: string;
  url: string;
}

export interface AccreditationsData {
  title: string;
  ratingCard: { name: string; rating: number; caption: string };
  badges: AccreditationBadge[];
}

export interface ProcessStep {
  id: string;
  label: string;
  description: string;
}

export interface ProcessData {
  title: string;
  steps: ProcessStep[];
}

/** Only the editable sections have a data payload; the fixed ones store `{}`. */
export type ProposalSectionData =
  | ProposalBannerData
  | ScorecardData
  | FinancialOverviewData
  | AppraisalData
  | InvestmentData
  | AcceptData
  | AccreditationsData
  | ProcessData
  | CustomData
  | ChartsData;

// ─── Document ────────────────────────────────────────────────────────────────

export interface ProposalSection extends DocSection {
  type: ProposalSectionType;
}

/**
 * A proposal as the editor sees it: the section list plus the settings-drawer
 * fields. The flat presentation fields (`businessName`, `advertisement`, …) also
 * come down from the API — they are the backend's denormalised mirror, read by
 * the notification emails, and are not edited directly here.
 */
export interface DigitalProposalDoc extends EditorDocument {
  _id: string;
  sections: ProposalSection[];

  // Settings drawer — contract inputs that never appear as document text.
  template: ProposalTemplate;
  brokerName: string;
  brokerEmail: string;
  customerName: string;
  customerEmail: string;
  agreementTerm: string;
  businessAddress: string;
  listingPrice: string;
  performanceBonus: string;
  salePrice: string;

  // Derived mirrors (read-only in the editor).
  businessName?: string;
  businessValue?: string;

  // Approval workflow.
  isApproved?: boolean;
  approvedBy?: string;
  approvedAt?: string | null;
  submittedForApprovalAt?: string | null;
  archived?: boolean;
  archivedAt?: string | null;
  createdBy?: string;
  lastEditedBy?: string;
}

/** Three states, derived from the two timestamps the backend keeps. */
export type ProposalStage = 'draft' | 'pending' | 'approved';

export function getProposalStage(doc: {
  isApproved?: boolean;
  submittedForApprovalAt?: string | null;
}): ProposalStage {
  if (doc.isApproved) return 'approved';
  if (doc.submittedForApprovalAt) return 'pending';
  return 'draft';
}

// ─── Registry ────────────────────────────────────────────────────────────────

export const PROPOSAL_SECTION_REGISTRY: DocSectionMeta[] = [
  {
    type: 'banner',
    label: 'Cover',
    description: 'Business name, appraised value and background image.',
    icon: 'banner',
    singleton: true,
    inNav: false,
    locked: true,
  },
  {
    type: 'disclaimer',
    label: 'Disclaimer',
    description:
      'Conditions of acceptance and the standard appraisal disclaimer. Fixed wording.',
    icon: 'disclaimer',
    singleton: false,
    inNav: true,
    fixed: true,
  },
  {
    type: 'scorecard',
    label: 'Financial Data & Weighting',
    description:
      'Screenshots of the financials, then weighting factors scored out of 5 with a running total.',
    icon: 'scorecard',
    singleton: false,
    inNav: true,
  },
  {
    type: 'financialOverview',
    label: 'Financial Assumptions',
    description: 'Rich-text notes on the numbers behind the appraisal.',
    icon: 'financialOverview',
    singleton: false,
    inNav: true,
  },
  {
    type: 'appraisal',
    label: 'Business Appraisal',
    description:
      'Fixed appraisal statement, with editable heading and signature captions.',
    icon: 'appraisal',
    singleton: false,
    inNav: true,
  },
  {
    type: 'investment',
    label: 'Your Investment',
    description: 'Advertisement, engagement and success-fee options the customer chooses from.',
    icon: 'investment',
    singleton: true,
    inNav: true,
    locked: true,
  },
  {
    // Not locked: the original page repeated this button three times down the
    // page, so brokers place as many as they like — but never zero.
    type: 'accept',
    label: 'Accept Proposal',
    description: 'The acceptance button the customer signs off with. Place as many as you like.',
    icon: 'accept',
    singleton: false,
    inNav: false,
    minCount: 1,
  },
  {
    type: 'accreditations',
    label: 'Accreditations',
    description: 'Rating card and industry association badges.',
    icon: 'accreditations',
    singleton: false,
    inNav: true,
  },
  {
    type: 'process',
    label: 'The Process',
    description: 'Numbered timeline of what happens after acceptance.',
    icon: 'process',
    singleton: false,
    inNav: true,
  },
  {
    type: 'about',
    label: 'About Blackmont',
    description: 'Firm introduction and the list of services offered. Fixed wording.',
    icon: 'about',
    singleton: false,
    inNav: true,
    fixed: true,
  },
  {
    type: 'contact',
    label: 'Contact Us',
    description: 'Closing contact card over a background image. Fixed wording.',
    icon: 'contact',
    singleton: false,
    inNav: false,
    fixed: true,
  },
  {
    type: 'custom',
    label: 'Custom Section',
    description: 'Your own heading with text, tables, photos, buttons, video or a PDF.',
    icon: 'custom',
    singleton: false,
    inNav: true,
  },
  {
    type: 'charts',
    label: 'Charts',
    description: 'Financial, growth, ROI, pie and KPI charts.',
    icon: 'charts',
    singleton: false,
    inNav: true,
  },
];

export const getProposalSectionMeta = (type: string): DocSectionMeta | undefined =>
  PROPOSAL_SECTION_REGISTRY.find((m) => m.type === type);

export const isProposalSectionLocked = (type: string): boolean =>
  !!getProposalSectionMeta(type)?.locked;

// ─── Defaults ────────────────────────────────────────────────────────────────

let uidCounter = 0;
/** Generate a stable-enough client id without relying on crypto/Date. */
export function makeUid(type: string): string {
  uidCounter += 1;
  return `${type}-${uidCounter}-${Math.floor(performance.now())}`;
}

const DEFAULT_PROCESS_STEPS: [string, string][] = [
  ['STEP 1: REVIEW APPRAISAL', 'Review the appraisal provided by Blackmont Advisory to understand where your business sits'],
  ['STEP 2: Q&A', 'Ask us any questions you may have in regards to this appraisal or anything else related to the sale of your business'],
  ['STEP 3: AGREE ON TERMS', 'Agree on terms to proceed with on an exclusive or non exclusive agreement'],
  ['STEP 4: SIGN AGREEMENT', 'Provide business owners name(s) and address and proceed to sign agreement which will be sent for electronic signing'],
  ['STEP 5: CONFIDENTIAL AD IS LAUNCHED', 'We launch your ad confidentially across all platforms as well as our website'],
  ['STEP 6: INFORMATION MATERIAL PREPARED', 'Your investment grade information material is prepared for you to review and approve'],
  ['STEP 7: CAMPAIGN LAUNCHED', 'The campaign starts by reaching out to our qualified database to gauge interest'],
];

/** Rich text — the engagement blurb uses the same editor as the fee options.
 *  Legacy plain-text values are converted to HTML on read by the section. */
export const DEFAULT_ENGAGEMENT_BODY =
  '<p>Call through key contacts in database</p>' +
  '<p>Handle enquiries from prospects</p>' +
  '<p>Obtain NDA from prospects &amp; review client profile Nurture clients</p>' +
  '<p>Negotiate &amp; structure deal with clients Collaborate with stakeholders on deal structure</p>';

export const DEFAULT_BANNER_IMAGE =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80';

/**
 * The seven factors from the standard appraisal worksheet — scored out of 35.
 * Brokers can add more from the document; the total follows the count.
 */
const DEFAULT_FACTORS: [string, string][] = [
  [
    'What are the barriers to entry?',
    '1 = Easy, 5 = Difficult. Would it be easy for a competitor to become established in this industry?',
  ],
  [
    'What is the risk profile of this business?',
    '1 = Risky, 5 = Not risky. e.g. relies on 1 or 2 clients, supplier contracts not in place, relies on the owner.',
  ],
  [
    'How established is the business?',
    '1 = Less than 1 year, 2 = 1 to 3 years, 3 = 3 to 10 years, 4 = 10 to 20 years, 5 = 20 years +',
  ],
  [
    'How unique is the business?',
    '1 = Not unique, 5 = Highly unique. Does the business have a well-defined niche?',
  ],
  [
    'What is the risk profile of the industry?',
    '1 = High risk, 5 = Low risk. Vulnerability of the industry as a whole.',
  ],
  [
    'Where is the business located?',
    '1 = Remote, 2 = Rural, 3 = Provincial town, 4 = City, 5 = Major city',
  ],
  [
    'What is the likely buyer demand?',
    '1 = Few buyers, 5 = Many buyers. Is this business likely to attract few or many buyers at the current time?',
  ],
];

export function makeScorecardFactor(label = '', hint = ''): ScorecardFactor {
  return { id: makeUid('fac'), label, hint, score: '' };
}

/** Only labelled factors count — see `ScorecardFactor`. */
export function scoreScorecard(factors: ScorecardFactor[] = []) {
  const rated = factors.filter((f) => f.label.trim());
  const total = rated.reduce(
    (sum, f) => sum + (typeof f.score === 'number' ? f.score : 0),
    0,
  );
  return { total, outOf: rated.length * 5, rated };
}

export function makeFeeOption(unit: FeeUnit): FeeOption {
  return { id: makeUid('opt'), text: '', amount: '', unit };
}

export function makeDefaultData(type: ProposalSectionType): Record<string, unknown> {
  switch (type) {
    case 'banner':
      return {
        eyebrow: 'Business Appraisal',
        businessName: '',
        businessValue: '',
        backgroundImage: '',
      } satisfies ProposalBannerData as unknown as Record<string, unknown>;

    case 'scorecard':
      return {
        title: 'Historical Financial Data',
        photos: [],
        factorsTitle: 'Weighting Factors',
        factors: DEFAULT_FACTORS.map(([label, hint]) => makeScorecardFactor(label, hint)),
      } satisfies ScorecardData as unknown as Record<string, unknown>;

    case 'financialOverview':
      return { title: 'Financial Assumptions', html: '' };

    case 'appraisal':
      return {
        title: 'Business Appraisal',
        preparedByLabel: 'Prepared By',
        approvedByLabel: 'Approved By',
        approvedByName: 'Sadeq Abbass',
      } satisfies AppraisalData as unknown as Record<string, unknown>;

    case 'investment':
      return {
        title: 'Your Investment',
        advertisementTitle: 'Advertisement',
        advertisement: [makeFeeOption('Dollar')],
        engagementTitle: 'Engagement',
        engagementBody: DEFAULT_ENGAGEMENT_BODY,
        engagementFee: '0',
        successFeeTitle: 'Success Fee',
        successFee: [makeFeeOption('Percentage')],
      } satisfies InvestmentData as unknown as Record<string, unknown>;

    case 'accept':
      return { buttonLabel: 'Accept Proposal', note: '' } satisfies AcceptData as unknown as Record<string, unknown>;

    // Fixed-content sections carry no data; see `fixed-content.ts`.
    case 'disclaimer':
    case 'about':
    case 'contact':
      return {};

    case 'accreditations':
      return {
        title: '',
        ratingCard: {
          name: 'Blackmont Advisory',
          rating: 5,
          caption: 'Business Broker in South Melbourne, Victoria',
        },
        badges: [
          { id: makeUid('badge'), src: '/aibb.png', alt: 'AIBB Logo', url: '' },
          { id: makeUid('badge'), src: '/reiv.png', alt: 'REIV Logo', url: '' },
        ],
      } satisfies AccreditationsData as unknown as Record<string, unknown>;

    case 'process':
      return {
        title: 'The Process',
        steps: DEFAULT_PROCESS_STEPS.map(([label, description]) => ({
          id: makeUid('step'),
          label,
          description,
        })),
      } satisfies ProcessData as unknown as Record<string, unknown>;

    case 'custom':
      return {
        title: 'New Section',
        blocks: [{ id: makeUid('blk'), type: 'text', html: '' }],
      };

    case 'charts':
      return { title: 'Financials', charts: [] };

    default:
      return {};
  }
}

export function makeDefaultSection(type: string): ProposalSection {
  return {
    uid: makeUid(type),
    type: type as ProposalSectionType,
    enabled: true,
    data: makeDefaultData(type as ProposalSectionType),
  };
}
