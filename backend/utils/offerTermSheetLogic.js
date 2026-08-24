// Status graph, field ownership and money rules. The field tables mirror frontend/components/offer-term-sheet/schema.ts.

const STATUSES = [
  'draft',
  'changes_requested',
  'pending_approval_buyer',
  'sent_to_buyer',
  'pending_approval_vendor',
  'sent_to_vendor',
  'completed',
  'declined',
  'cancelled',
];

const TERMINAL_STATUSES = ['completed', 'declined', 'cancelled'];

const ACTOR_ROLES = ['broker', 'superadmin', 'buyer', 'vendor', 'system'];

const NON_TERMINAL_STATUSES = STATUSES.filter(
  (s) => !TERMINAL_STATUSES.includes(s),
);

// ─── Deposit ────────────────────────────────────────────────────────────────

const DEPOSIT_RATE = 0.1;
const MINIMUM_DEPOSIT = 25000;

const round2 = (n) => Math.round(n * 100) / 100;

const isBlank = (v) => v === null || v === undefined || v === '';

// The default deposit: 10% with a $25,000 floor, capped at the price.
function computeAmounts(purchasePrice) {
  const price = Number(purchasePrice);
  if (!Number.isFinite(price) || price <= 0) {
    return { depositAmount: null, balanceAmount: null };
  }
  const deposit = Math.min(
    round2(Math.max(price * DEPOSIT_RATE, MINIMUM_DEPOSIT)),
    round2(price),
  );
  return { depositAmount: deposit, balanceAmount: round2(price - deposit) };
}

// A stated deposit is kept, a blank one takes the default, and the balance is the remainder.
function resolveAmounts(purchasePrice, depositAmount) {
  const price = Number(purchasePrice);
  if (!Number.isFinite(price) || price <= 0) {
    return { depositAmount: null, balanceAmount: null };
  }
  if (isBlank(depositAmount)) return computeAmounts(price);

  const stated = Number(depositAmount);
  if (!Number.isFinite(stated)) return computeAmounts(price);

  const deposit = Math.min(Math.max(round2(stated), 0), round2(price));
  return { depositAmount: deposit, balanceAmount: round2(price - deposit) };
}

// A deposit larger than the price is a typo worth stopping, not silently fixing.
function depositExceedsPrice(purchasePrice, depositAmount) {
  const price = Number(purchasePrice);
  const deposit = Number(depositAmount);
  if (isBlank(purchasePrice) || isBlank(depositAmount)) return false;
  if (!Number.isFinite(price) || !Number.isFinite(deposit)) return false;
  return deposit > price;
}

// ─── Status graph ───────────────────────────────────────────────────────────

const TRANSITIONS = [
  {
    action: 'submit',
    from: ['draft', 'changes_requested'],
    to: 'pending_approval_buyer',
    roles: ['broker', 'superadmin'],
  },
  {
    action: 'approve',
    from: ['pending_approval_buyer'],
    to: 'sent_to_buyer',
    roles: ['superadmin'],
  },
  {
    action: 'approve',
    from: ['pending_approval_vendor'],
    to: 'sent_to_vendor',
    roles: ['superadmin'],
  },
  {
    action: 'request_changes',
    from: ['pending_approval_buyer', 'pending_approval_vendor'],
    to: 'changes_requested',
    roles: ['superadmin'],
  },
  {
    action: 'buyer_sign',
    from: ['sent_to_buyer'],
    to: 'pending_approval_vendor',
    roles: ['buyer'],
  },
  {
    action: 'vendor_sign',
    from: ['sent_to_vendor'],
    to: 'completed',
    roles: ['vendor'],
  },
  {
    action: 'decline',
    from: ['sent_to_buyer'],
    to: 'declined',
    roles: ['buyer'],
  },
  {
    action: 'decline',
    from: ['sent_to_vendor'],
    to: 'declined',
    roles: ['vendor'],
  },
  {
    action: 'cancel',
    from: NON_TERMINAL_STATUSES,
    to: 'cancelled',
    roles: ['broker', 'superadmin'],
  },
];

const ACTIONS = [...new Set(TRANSITIONS.map((t) => t.action))];

// Whose move it is, for the "Waiting on" column and reminder emails.
const WAITING_ON = {
  draft: 'broker',
  changes_requested: 'broker',
  pending_approval_buyer: 'superadmin',
  pending_approval_vendor: 'superadmin',
  sent_to_buyer: 'buyer',
  sent_to_vendor: 'vendor',
  completed: null,
  declined: null,
  cancelled: null,
};

const isTerminal = (status) => TERMINAL_STATUSES.includes(status);

const waitingOn = (status) => WAITING_ON[status] ?? null;

// Returns { ok: true, to } or { ok: false, code, message }.
function resolveTransition({ status, action, role }) {
  if (!ACTIONS.includes(action)) {
    return {
      ok: false,
      code: 'unknown_action',
      message: `Unknown action "${action}".`,
    };
  }

  const forAction = TRANSITIONS.filter((t) => t.action === action);
  const match = forAction.find((t) => t.from.includes(status));
  if (!match) {
    return {
      ok: false,
      code: 'invalid_status',
      message: `Cannot ${action} a term sheet that is ${humanStatus(status)}.`,
    };
  }

  if (!match.roles.includes(role)) {
    return {
      ok: false,
      code: 'forbidden_role',
      message: `A ${role} cannot ${action} this term sheet.`,
    };
  }

  return { ok: true, to: match.to };
}

const canTransition = (args) => resolveTransition(args).ok === true;

// Actions a role may take right now, which is what the UI renders as buttons.
function availableActions({ status, role }) {
  return ACTIONS.filter((action) => canTransition({ status, action, role }));
}

const humanStatus = (status) => String(status || 'unknown').replace(/_/g, ' ');

// ─── Field ownership ────────────────────────────────────────────────────────

const OWNED_FIELDS = {
  broker: [
    'businessName',
    'businessAddress',
    'vendorName',
    'vendorEmail',
    'inclusions.businessName',
    'inclusions.intellectualProperty',
    'inclusions.plantAndEquipment',
    'inclusions.goodwill',
    'inclusions.otherEnabled',
    'inclusions.otherText',
  ],
  buyer: [
    'purchaserName',
    'purchaserEmail',
    'purchasePrice',
    'depositAmount',
    'stockTreatment',
    'settlementMode',
    'settlementDate',
    'settlementWeeks',
    'subjectTo.dueDiligenceEnabled',
    'subjectTo.dueDiligenceDays',
    'subjectTo.leaseTransfer',
    'subjectTo.financeApproval',
    'subjectTo.transitionEnabled',
    'subjectTo.transitionWeeks',
    'subjectTo.otherEnabled',
    'subjectTo.otherText',
    'purchaserExecution.fullName',
    'purchaserExecution.email',
    'purchaserExecution.phone',
    'purchaserExecution.date',
    'purchaserExecution.signatureImage',
  ],
  vendor: [
    'vendorExecution.fullName',
    'vendorExecution.email',
    'vendorExecution.phone',
    'vendorExecution.date',
    'vendorExecution.signatureImage',
  ],
};

// Paths a role may write although another owns them; ownership still decides who must fill them.
const SHARED_FIELDS = {
  broker: ['purchasePrice', 'depositAmount'],
  buyer: [],
  vendor: [],
};

// Required before an owner can submit or sign; a conditional entry applies only while its controller matches.
const REQUIRED_FIELDS = {
  businessName: true,
  businessAddress: true,
  vendorName: true,
  vendorEmail: true,
  'inclusions.otherText': {
    when: 'inclusions.otherEnabled',
    equals: true,
  },

  purchaserName: true,
  purchaserEmail: true,
  purchasePrice: true,
  stockTreatment: true,
  settlementMode: true,
  settlementDate: { when: 'settlementMode', equals: 'date' },
  settlementWeeks: { when: 'settlementMode', equals: 'weeks' },
  'subjectTo.dueDiligenceDays': {
    when: 'subjectTo.dueDiligenceEnabled',
    equals: true,
  },
  'subjectTo.transitionWeeks': {
    when: 'subjectTo.transitionEnabled',
    equals: true,
  },
  'subjectTo.otherText': { when: 'subjectTo.otherEnabled', equals: true },
  'purchaserExecution.fullName': true,
  'purchaserExecution.email': true,
  'purchaserExecution.phone': true,
  'purchaserExecution.date': true,
  'purchaserExecution.signatureImage': true,

  'vendorExecution.fullName': true,
  'vendorExecution.email': true,
  'vendorExecution.phone': true,
  'vendorExecution.date': true,
  'vendorExecution.signatureImage': true,
};

// Statuses in which each role's own fields are open for editing.
const EDITABLE_IN = {
  broker: ['draft', 'changes_requested'],
  superadmin: ['draft', 'changes_requested'],
  buyer: ['sent_to_buyer'],
  vendor: ['sent_to_vendor'],
};

// A superadmin editing a draft acts with the broker's field ownership.
const ownerForRole = (role) => (role === 'superadmin' ? 'broker' : role);

function getValue(doc, path) {
  return path
    .split('.')
    .reduce(
      (acc, part) =>
        acc === null || typeof acc !== 'object' ? undefined : acc[part],
      doc,
    );
}

function isFieldActive(path, doc) {
  const rule = REQUIRED_FIELDS[path];
  if (!rule || rule === true) return true;
  return getValue(doc, rule.when) === rule.equals;
}

// Field paths a role may write at a given status: what it owns, plus what it shares.
function editableFields(status, role) {
  if (!(EDITABLE_IN[role] || []).includes(status)) return [];
  const owner = ownerForRole(role);
  return [
    ...(OWNED_FIELDS[owner] || []),
    ...(SHARED_FIELDS[owner] || []),
  ];
}

// Required fields an owner has not filled; inactive conditionals are skipped.
function missingRequiredFields(owner, doc) {
  return (OWNED_FIELDS[owner] || []).filter((path) => {
    if (!REQUIRED_FIELDS[path] || !isFieldActive(path, doc)) return false;
    const value = getValue(doc, path);
    return value === undefined || value === null || value === '';
  });
}

// Flattens a nested payload to dot paths, stopping at non-plain values.
function flatten(value, prefix = '', out = {}) {
  const isPlainObject =
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !(value instanceof Date);

  if (!isPlainObject) {
    if (prefix) out[prefix] = value;
    return out;
  }
  for (const [key, child] of Object.entries(value)) {
    flatten(child, prefix ? `${prefix}.${key}` : key, out);
  }
  return out;
}

// Splits a payload into the writes a role may make and the paths it may not; computed and unknown fields are always rejected.
function filterWritableFields(payload, { status, role }) {
  const allowed = new Set(editableFields(status, role));
  const writes = {};
  const rejected = [];

  for (const [path, value] of Object.entries(flatten(payload || {}))) {
    if (allowed.has(path)) writes[path] = value;
    else rejected.push(path);
  }

  return { writes, rejected };
}

// ─── Audit trail ────────────────────────────────────────────────────────────

// Builds an audit entry; req is optional and only supplies the origin.
function buildAuditEntry({
  action,
  actorRole,
  actorEmail = '',
  actorName = '',
  fromStatus = '',
  toStatus = '',
  note = '',
  req = null,
}) {
  return {
    action,
    actorRole,
    actorEmail,
    actorName,
    fromStatus,
    toStatus,
    note,
    ip: req ? req.headers['x-forwarded-for'] || req.ip || '' : '',
    userAgent: req ? req.headers['user-agent'] || '' : '',
    at: new Date(),
  };
}

module.exports = {
  STATUSES,
  TERMINAL_STATUSES,
  NON_TERMINAL_STATUSES,
  ACTOR_ROLES,
  ACTIONS,
  TRANSITIONS,
  DEPOSIT_RATE,
  MINIMUM_DEPOSIT,
  OWNED_FIELDS,
  SHARED_FIELDS,
  REQUIRED_FIELDS,
  EDITABLE_IN,
  computeAmounts,
  resolveAmounts,
  depositExceedsPrice,
  resolveTransition,
  canTransition,
  availableActions,
  isTerminal,
  waitingOn,
  humanStatus,
  editableFields,
  missingRequiredFields,
  filterWritableFields,
  buildAuditEntry,
  getValue,
};
