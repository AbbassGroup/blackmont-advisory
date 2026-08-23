/**
 * Digital Proposal section engine — the backend half of the contract.
 *
 * A proposal is laid out as an ordered list of sections, exactly like an
 * Information Memorandum (`models/ImTemplate.js`). Unlike an IM, a proposal is
 * a document the customer accepts: `utils/emailTemplates.js` reads flat scalar
 * fields off the model to build the notification emails, and any future signing
 * integration would read the same fields.
 *
 * So the two representations are kept in step:
 *
 *   sections[]   → source of truth for presentation (what the customer reads)
 *   flat fields  → source of truth for the contract  (what the emails quote)
 *
 * Two section types are LOCKED — `banner` and `investment`. They may be edited
 * and hidden but never deleted, because `deriveFlatFields()` reads the contract
 * values back out of them on every save. Everything else is free to add,
 * reorder, duplicate and delete, subject to `MIN_COUNTS`.
 */

const LOCKED_TYPES = Object.freeze(['banner', 'investment']);

/**
 * Types that must appear at least N times. `accept` is freely placeable — the
 * original proposal repeated the Accept button three times down the page — but
 * an approved proposal with no way to accept it is a dead end, so one is kept.
 */
const MIN_COUNTS = Object.freeze({ accept: 1 });

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

/**
 * The seven factors from the standard appraisal worksheet — scored out of 35.
 * Brokers can add more from the document; the total follows the count.
 * Mirrors DEFAULT_FACTORS in the frontend registry.
 */
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
/** Stable-ish client id. Mirrors `makeUid` in the frontend registry. */
function makeUid(prefix) {
  uidCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${uidCounter.toString(36)}`;
}

// ── Default content ─────────────────────────────────────────────────────────
// Lifted verbatim from the components that used to hardcode it, so a migrated
// proposal renders byte-identically to how it did before the section engine.
// The fixed sections (disclaimer, about, contact) keep their copy on the
// frontend instead — see `frontend/components/proposal/fixed-content.ts`.

const DEFAULT_PROCESS_STEPS = [
  ['STEP 1: REVIEW APPRAISAL', 'Review the appraisal provided by Blackmont Advisory to understand where your business sits'],
  ['STEP 2: Q&A', 'Ask us any questions you may have in regards to this appraisal or anything else related to the sale of your business'],
  ['STEP 3: AGREE ON TERMS', 'Agree on terms to proceed with on an exclusive or non exclusive agreement'],
  ['STEP 4: SIGN AGREEMENT', 'Provide business owners name(s) and address and proceed to sign agreement which will be sent for electronic signing'],
  ['STEP 5: CONFIDENTIAL AD IS LAUNCHED', 'We launch your ad confidentially across all platforms as well as our website'],
  ['STEP 6: INFORMATION MATERIAL PREPARED', 'Your investment grade information material is prepared for you to review and approve'],
  ['STEP 7: CAMPAIGN LAUNCHED', 'The campaign starts by reaching out to our qualified database to gauge interest'],
];

// Rich text — mirrors DEFAULT_ENGAGEMENT_BODY in the frontend registry. Legacy
// plain-text values are converted to HTML on read by the Investment section.
const DEFAULT_ENGAGEMENT_BODY =
  '<p>Call through key contacts in database</p>' +
  '<p>Handle enquiries from prospects</p>' +
  '<p>Obtain NDA from prospects &amp; review client profile Nurture clients</p>' +
  '<p>Negotiate &amp; structure deal with clients Collaborate with stakeholders on deal structure</p>';

/** Fee-option rows carry a uid so the editor can reorder them without React
 *  losing track, and so the customer's selection survives an edit. */
function normaliseOptions(rows, fallbackUnit) {
  return (Array.isArray(rows) ? rows : []).map((row) => ({
    id: row.id || makeUid('opt'),
    text: row.text || '',
    amount: row.amount === undefined || row.amount === null ? '' : String(row.amount),
    unit: row.unit || fallbackUnit,
  }));
}

/** The default payload for one section type, seeded from a proposal's existing
 *  flat fields where it has them. */
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

    // The appraisal statement itself is fixed wording on the frontend; only the
    // heading and the two signature captions are stored.
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

    // Fixed-content sections carry no data — the Conditions of Acceptance
    // disclaimer and the About / Contact boilerplate read the same on every
    // proposal and are rendered from
    // `frontend/components/proposal/fixed-content.ts`.
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

/** One section with a fresh uid, seeded from flat fields where relevant. */
function makeDefaultSection(type, flat = {}) {
  return {
    uid: makeUid(type),
    type,
    enabled: true,
    data: makeDefaultData(type, flat),
  };
}

/**
 * The default section order for a new (or migrating) proposal. Matches the
 * hardcoded order the public `/proposal` page rendered before the engine.
 *
 * `accept` sits after `investment` because that is where the first Accept
 * button appeared; the customer-facing page still repeats the button further
 * down, driven by this one section's data.
 */
function makeDefaultSections(flat = {}) {
  const isAppraisal = (flat.template || 'business_appraisal') === 'business_appraisal';

  // Mirrors the order the public page hardcoded before the section engine,
  // including all three Accept buttons.
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
 * Pull the contract-critical values back out of the locked sections so the flat
 * fields — the ones the email templates read — stay authoritative.
 *
 * Only returns keys it can actually resolve: a caller merges this over the
 * existing document, so a missing/disabled section leaves the last known value
 * in place rather than blanking a signed agreement's inputs.
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

  // Financial assumptions live in a free section, but the customer email quotes
  // them, so mirror the first enabled one.
  const financial = sections.find((s) => s && s.type === 'financialOverview' && s.enabled !== false);
  if (financial && financial.data && typeof financial.data.html === 'string') {
    out.financialAssumptions = financial.data.html;
  }

  return out;
}

/**
 * Guarantee the required sections exist and sit in a sane place. Called on save
 * so a malformed client payload can never strip the contract out of the
 * document — the editor enforces the same rules, this is the backstop.
 *
 * Missing required sections are re-seeded from the current flat fields, and
 * `banner` is forced back to index 0.
 */
function enforceLockedSections(sections, flat = {}) {
  // Drop anything the renderer has no case for, so a malformed or out-of-date
  // client can't persist sections that would silently render as nothing.
  const list = (Array.isArray(sections) ? sections : []).filter(
    (s) => s && SECTION_TYPES.includes(s.type),
  );

  for (const type of LOCKED_TYPES) {
    if (!list.some((s) => s.type === type)) {
      list.push(makeDefaultSection(type, flat));
    }
  }

  for (const [type, min] of Object.entries(MIN_COUNTS)) {
    let have = list.filter((s) => s.type === type).length;
    while (have < min) {
      list.push(makeDefaultSection(type, flat));
      have += 1;
    }
  }

  // A locked section can be hidden but not deleted out of existence — the
  // banner also always leads the document.
  const bannerAt = list.findIndex((s) => s.type === 'banner');
  if (bannerAt > 0) list.unshift(list.splice(bannerAt, 1)[0]);

  return list;
}

/**
 * Legacy documents predate the engine and have an empty `sections` array. Build
 * one from their flat fields on read so the editor and the public page never
 * have to special-case them. Returns true when it changed the doc.
 */
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
  LOCKED_TYPES,
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
