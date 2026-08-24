/**
 * Digital Proposal section engine. Mirrors `frontend/components/proposal/types.ts`.
 *
 * `sections[]` is the source of truth for presentation; the model's flat fields
 * are what the notification emails quote. `deriveFlatFields` keeps them in step.
 */

// Types the document must always keep at least one of, re-seeded if dropped.
const MIN_COUNTS = Object.freeze({ banner: 1, investment: 1, accept: 1 });

const SECTION_TYPES = Object.freeze([
  'banner',
  'disclaimer',
  'scorecard',
  'financialOverview',
  'appraisal',
  'investment',
  'accept',
  'accreditations',
  'process',
  'about',
  'contact',
  'custom',
  'charts',
]);

const DEFAULT_FACTORS = [
  ['What are the barriers to entry?', '1 = Easy, 5 = Difficult. Would it be easy for a competitor to become established in this industry?'],
  ['What is the risk profile of this business?', '1 = Risky, 5 = Not risky. e.g. relies on 1 or 2 clients, supplier contracts not in place, relies on the owner.'],
  ['How established is the business?', '1 = Less than 1 year, 2 = 1 to 3 years, 3 = 3 to 10 years, 4 = 10 to 20 years, 5 = 20 years +'],
  ['How unique is the business?', '1 = Not unique, 5 = Highly unique. Does the business have a well-defined niche?'],
  ['What is the risk profile of the industry?', '1 = High risk, 5 = Low risk. Vulnerability of the industry as a whole.'],
  ['Where is the business located?', '1 = Remote, 2 = Rural, 3 = Provincial town, 4 = City, 5 = Major city'],
  ['What is the likely buyer demand?', '1 = Few buyers, 5 = Many buyers. Is this business likely to attract few or many buyers at the current time?'],
];

let uidCounter = 0;
function makeUid(prefix) {
  uidCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${uidCounter.toString(36)}`;
}

const DEFAULT_PROCESS_STEPS = [
  ['STEP 1: REVIEW APPRAISAL', 'Review the appraisal provided by Blackmont Advisory to understand where your business sits'],
  ['STEP 2: Q&A', 'Ask us any questions you may have in regards to this appraisal or anything else related to the sale of your business'],
  ['STEP 3: AGREE ON TERMS', 'Agree on terms to proceed with on an exclusive or non exclusive agreement'],
  ['STEP 4: SIGN AGREEMENT', 'Provide business owners name(s) and address and proceed to sign agreement which will be sent for electronic signing'],
  ['STEP 5: CONFIDENTIAL AD IS LAUNCHED', 'We launch your ad confidentially across all platforms as well as our website'],
  ['STEP 6: INFORMATION MATERIAL PREPARED', 'Your investment grade information material is prepared for you to review and approve'],
  ['STEP 7: CAMPAIGN LAUNCHED', 'The campaign starts by reaching out to our qualified database to gauge interest'],
];

const DEFAULT_ENGAGEMENT_BODY =
  '<p>Call through key contacts in database</p>' +
  '<p>Handle enquiries from prospects</p>' +
  '<p>Obtain NDA from prospects &amp; review client profile Nurture clients</p>' +
  '<p>Negotiate &amp; structure deal with clients Collaborate with stakeholders on deal structure</p>';

// Ids let the editor reorder rows and the customer's tick survive an edit.
function normaliseOptions(rows, fallbackUnit) {
  return (Array.isArray(rows) ? rows : []).map((row) => ({
    id: row.id || makeUid('opt'),
    text: row.text || '',
    amount: row.amount === undefined || row.amount === null ? '' : String(row.amount),
    unit: row.unit || fallbackUnit,
  }));
}

function makeDefaultData(type, flat = {}) {
  switch (type) {
    case 'banner':
      return {
        eyebrow: 'Business Appraisal',
        businessName: flat.businessName || '',
        businessValue: flat.businessValue || '',
        backgroundImage: flat.backgroundImage || '',
      };

    case 'scorecard':
      return {
        title: 'Historical Financial Data',
        photos: [],
        factorsTitle: 'Weighting Factors',
        factors: DEFAULT_FACTORS.map(([label, hint]) => ({
          id: makeUid('fac'),
          label,
          hint,
          score: '',
        })),
      };

    case 'financialOverview':
      return {
        title: 'Financial Assumptions',
        html: flat.financialAssumptions || '',
      };

    case 'appraisal':
      return {
        title: 'Business Appraisal',
        preparedByLabel: 'Prepared By',
        approvedByLabel: 'Approved By',
        approvedByName: 'Sadeq Abbass',
      };

    case 'investment':
      return {
        title: 'Your Investment',
        advertisementTitle: 'Advertisement',
        advertisement: normaliseOptions(flat.advertisement, 'Dollar'),
        engagementTitle: 'Engagement',
        engagementBody: DEFAULT_ENGAGEMENT_BODY,
        engagementFee:
          flat.engagementFee === undefined || flat.engagementFee === null
            ? '0'
            : String(flat.engagementFee),
        successFeeTitle: 'Success Fee',
        successFee: normaliseOptions(flat.successFee, 'Percentage'),
      };

    case 'accept':
      return {
        buttonLabel: 'Accept Proposal',
        note: '',
      };

    // Fixed wording — rendered from `fixed-content.ts`, nothing to store.
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
      };

    case 'process':
      return {
        title: 'The Process',
        steps: DEFAULT_PROCESS_STEPS.map(([label, description]) => ({
          id: makeUid('step'),
          label,
          description,
        })),
      };

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

function makeDefaultSection(type, flat = {}) {
  return {
    uid: makeUid(type),
    type,
    enabled: true,
    data: makeDefaultData(type, flat),
  };
}

function makeDefaultSections(flat = {}) {
  const isAppraisal = (flat.template || 'business_appraisal') === 'business_appraisal';

  const order = [
    'banner',
    'disclaimer',
    ...(isAppraisal ? ['scorecard', 'financialOverview', 'appraisal'] : []),
    'investment',
    'accept',
    'accreditations',
    'accept',
    'process',
    'about',
    'contact',
    'accept',
  ];

  return order.map((type) => makeDefaultSection(type, flat));
}

/**
 * Contract values read back out of the sections. Only returns keys it can
 * resolve, so a missing section leaves the last known value rather than
 * blanking it.
 */
function deriveFlatFields(sections) {
  const out = {};
  if (!Array.isArray(sections)) return out;

  const find = (type) => sections.find((s) => s && s.type === type);

  const banner = find('banner');
  if (banner && banner.data) {
    if (typeof banner.data.businessName === 'string') out.businessName = banner.data.businessName;
    if (typeof banner.data.businessValue === 'string') out.businessValue = banner.data.businessValue;
    if (typeof banner.data.backgroundImage === 'string') out.backgroundImage = banner.data.backgroundImage;
  }

  const investment = find('investment');
  if (investment && investment.data) {
    const d = investment.data;
    if (Array.isArray(d.advertisement)) out.advertisement = normaliseOptions(d.advertisement, 'Dollar');
    if (Array.isArray(d.successFee)) out.successFee = normaliseOptions(d.successFee, 'Percentage');
    if (d.engagementFee !== undefined && d.engagementFee !== null) {
      out.engagementFee = String(d.engagementFee);
    }
  }

  const financial = sections.find((s) => s && s.type === 'financialOverview' && s.enabled !== false);
  if (financial && financial.data && typeof financial.data.html === 'string') {
    out.financialAssumptions = financial.data.html;
  }

  return out;
}

/**
 * Backstop on save: a malformed payload can't strip the contract out. Missing
 * required sections are re-seeded and appended; order is never touched.
 */
function enforceLockedSections(sections, flat = {}) {
  // Drop types the renderer has no case for.
  const list = (Array.isArray(sections) ? sections : []).filter(
    (s) => s && SECTION_TYPES.includes(s.type),
  );

  for (const [type, min] of Object.entries(MIN_COUNTS)) {
    let have = list.filter((s) => s.type === type).length;
    while (have < min) {
      list.push(makeDefaultSection(type, flat));
      have += 1;
    }
  }

  return list;
}

// Builds sections for documents that predate the engine. True if it changed.
function ensureSections(proposal) {
  if (!proposal) return false;
  if (Array.isArray(proposal.sections) && proposal.sections.length > 0) return false;

  proposal.sections = makeDefaultSections({
    businessName: proposal.businessName,
    businessValue: proposal.businessValue,
    backgroundImage: proposal.backgroundImage,
    financialAssumptions: proposal.financialAssumptions,
    advertisement: proposal.advertisement,
    successFee: proposal.successFee,
    engagementFee: proposal.engagementFee,
    template: proposal.template,
  });
  return true;
}

module.exports = {
  MIN_COUNTS,
  SECTION_TYPES,
  makeUid,
  makeDefaultData,
  makeDefaultSection,
  makeDefaultSections,
  deriveFlatFields,
  enforceLockedSections,
  ensureSections,
};
