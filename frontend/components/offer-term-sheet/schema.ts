// Every field on the Letter of Intent and who fills it. backend/utils/offerTermSheetLogic.js mirrors the owner map.

import { depositExceedsPrice } from './amounts';

export type FieldOwner = 'broker' | 'buyer' | 'vendor' | 'computed';

export type FieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'money'
  | 'number'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'signature';

export type SectionId =
  | 'business'
  | 'purchaser'
  | 'vendorDetails'
  | 'offer'
  | 'settlement'
  | 'inclusions'
  | 'subjectTo'
  | 'purchaserExecution'
  | 'vendorExecution';

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

export interface SectionDef {
  readonly id: SectionId;
  // Heading as printed on the letter.
  readonly title: string;
  // Role that completes the section; computed sections are read-only.
  readonly owner: FieldOwner;
}

export interface FieldDef {
  // Dot path into the OfferTermSheet document.
  readonly key: string;
  readonly section: SectionId;
  readonly label: string;
  readonly type: FieldType;
  readonly owner: FieldOwner;
  // Roles that may also write this field; the owner still decides who must fill it.
  readonly editableBy?: readonly FieldOwner[];
  // Must be present before its owner can submit or sign.
  readonly required?: boolean;
  readonly options?: readonly SelectOption[];
  // Rendered after the input, e.g. "days".
  readonly suffix?: string;
  readonly maxLength?: number;
  readonly min?: number;
  readonly max?: number;
  // Only shown, and only required, while the condition holds.
  readonly showWhen?: { readonly key: string; readonly equals: unknown };
}

export const SECTIONS = [
  { id: 'business', title: 'The Business', owner: 'broker' },
  { id: 'purchaser', title: 'Purchaser Details', owner: 'buyer' },
  { id: 'vendorDetails', title: 'Vendor Details', owner: 'broker' },
  { id: 'offer', title: 'Offer', owner: 'buyer' },
  { id: 'settlement', title: 'Settlement Date', owner: 'buyer' },
  { id: 'inclusions', title: 'Inclusions', owner: 'broker' },
  { id: 'subjectTo', title: 'Subject To', owner: 'buyer' },
  {
    id: 'purchaserExecution',
    title: 'Executed by the Purchaser',
    owner: 'buyer',
  },
  { id: 'vendorExecution', title: 'Accepted by the Vendor', owner: 'vendor' },
] as const satisfies readonly SectionDef[];

export const STOCK_TREATMENT_OPTIONS = [
  { value: 'plus_sav', label: '+ Stock at Valuation' },
  { value: 'including_sav', label: 'Including Stock at Valuation' },
] as const satisfies readonly SelectOption[];

export const SETTLEMENT_MODE_OPTIONS = [
  { value: 'date', label: 'On a set date' },
  {
    value: 'weeks',
    label: 'Weeks after the formal contract is signed and executed',
  },
] as const satisfies readonly SelectOption[];

// Upper bounds are sanity limits that bound payloads and catch fat-finger entry.
const MAX_PRICE = 1_000_000_000;
const MAX_DUE_DILIGENCE_DAYS = 365;
const MAX_WEEKS = 260;

export const FIELDS = [
  // The Business
  {
    key: 'businessName',
    section: 'business',
    label: 'Business Name',
    type: 'text',
    owner: 'broker',
    required: true,
    maxLength: 200,
  },
  {
    key: 'businessAddress',
    section: 'business',
    label: 'Business Address',
    type: 'text',
    owner: 'broker',
    required: true,
    maxLength: 300,
  },

  // Purchaser Details
  {
    key: 'purchaserName',
    section: 'purchaser',
    label: 'Full Name',
    type: 'text',
    owner: 'buyer',
    required: true,
    maxLength: 150,
  },
  {
    key: 'purchaserEmail',
    section: 'purchaser',
    label: 'Email',
    type: 'email',
    owner: 'buyer',
    required: true,
    maxLength: 254,
  },

  // Vendor Details
  {
    key: 'vendorName',
    section: 'vendorDetails',
    label: 'Name',
    type: 'text',
    owner: 'broker',
    required: true,
    maxLength: 150,
  },
  {
    key: 'vendorEmail',
    section: 'vendorDetails',
    label: 'Email',
    type: 'email',
    owner: 'broker',
    required: true,
    maxLength: 254,
  },

  // Offer
  {
    key: 'purchasePrice',
    section: 'offer',
    label: 'Purchase price',
    type: 'money',
    owner: 'buyer',
    editableBy: ['broker'],
    required: true,
    min: 1,
    max: MAX_PRICE,
  },
  {
    key: 'stockTreatment',
    section: 'offer',
    label: 'Stock',
    type: 'select',
    owner: 'buyer',
    required: true,
    options: STOCK_TREATMENT_OPTIONS,
  },
  {
    key: 'depositAmount',
    section: 'offer',
    label: 'Deposit',
    type: 'money',
    owner: 'buyer',
    editableBy: ['broker'],
    // Not required: a blank deposit falls back to the 10% default.
    min: 0,
    max: MAX_PRICE,
  },
  {
    key: 'balanceAmount',
    section: 'offer',
    label: 'Balance of purchase price',
    type: 'money',
    owner: 'computed',
  },

  // Settlement Date
  {
    key: 'settlementMode',
    section: 'settlement',
    label: 'Settlement',
    type: 'select',
    owner: 'buyer',
    required: true,
    options: SETTLEMENT_MODE_OPTIONS,
  },
  {
    key: 'settlementDate',
    section: 'settlement',
    label: 'Settlement date',
    type: 'date',
    owner: 'buyer',
    required: true,
    showWhen: { key: 'settlementMode', equals: 'date' },
  },
  {
    key: 'settlementWeeks',
    section: 'settlement',
    label: 'Weeks from contract execution',
    type: 'number',
    owner: 'buyer',
    required: true,
    suffix: 'weeks',
    min: 1,
    max: MAX_WEEKS,
    showWhen: { key: 'settlementMode', equals: 'weeks' },
  },

  // Inclusions
  {
    key: 'inclusions.businessName',
    section: 'inclusions',
    label: 'Business Name',
    type: 'checkbox',
    owner: 'broker',
  },
  {
    key: 'inclusions.intellectualProperty',
    section: 'inclusions',
    label: 'Intellectual Property',
    type: 'checkbox',
    owner: 'broker',
  },
  {
    key: 'inclusions.plantAndEquipment',
    section: 'inclusions',
    label: 'All Power, Plant & Equipment',
    type: 'checkbox',
    owner: 'broker',
  },
  {
    key: 'inclusions.goodwill',
    section: 'inclusions',
    label: 'Business Goodwill',
    type: 'checkbox',
    owner: 'broker',
  },
  {
    key: 'inclusions.otherEnabled',
    section: 'inclusions',
    label: 'Other',
    type: 'checkbox',
    owner: 'broker',
  },
  {
    key: 'inclusions.otherText',
    section: 'inclusions',
    label: 'Other inclusion',
    type: 'text',
    owner: 'broker',
    required: true,
    maxLength: 300,
    showWhen: { key: 'inclusions.otherEnabled', equals: true },
  },

  // Subject To
  {
    key: 'subjectTo.dueDiligenceEnabled',
    section: 'subjectTo',
    label: 'Due Diligence',
    type: 'checkbox',
    owner: 'buyer',
  },
  {
    key: 'subjectTo.dueDiligenceDays',
    section: 'subjectTo',
    label: 'Due Diligence period from contract date',
    type: 'number',
    owner: 'buyer',
    required: true,
    suffix: 'days',
    min: 1,
    max: MAX_DUE_DILIGENCE_DAYS,
    showWhen: { key: 'subjectTo.dueDiligenceEnabled', equals: true },
  },
  {
    key: 'subjectTo.leaseTransfer',
    section: 'subjectTo',
    label: 'Lease transfer approval',
    type: 'checkbox',
    owner: 'buyer',
  },
  {
    key: 'subjectTo.financeApproval',
    section: 'subjectTo',
    label: 'Finance approval',
    type: 'checkbox',
    owner: 'buyer',
  },
  {
    key: 'subjectTo.transitionEnabled',
    section: 'subjectTo',
    label: 'Transition & handover support',
    type: 'checkbox',
    owner: 'buyer',
  },
  {
    key: 'subjectTo.transitionWeeks',
    section: 'subjectTo',
    label: 'Transition & handover support',
    type: 'number',
    owner: 'buyer',
    required: true,
    suffix: 'weeks',
    min: 1,
    max: MAX_WEEKS,
    showWhen: { key: 'subjectTo.transitionEnabled', equals: true },
  },
  {
    key: 'subjectTo.otherEnabled',
    section: 'subjectTo',
    label: 'Other',
    type: 'checkbox',
    owner: 'buyer',
  },
  {
    key: 'subjectTo.otherText',
    section: 'subjectTo',
    label: 'Other condition',
    type: 'text',
    owner: 'buyer',
    required: true,
    maxLength: 300,
    showWhen: { key: 'subjectTo.otherEnabled', equals: true },
  },

  // Executed by the Purchaser
  {
    key: 'purchaserExecution.fullName',
    section: 'purchaserExecution',
    label: 'Full Name',
    type: 'text',
    owner: 'buyer',
    required: true,
    maxLength: 150,
  },
  {
    key: 'purchaserExecution.email',
    section: 'purchaserExecution',
    label: 'Email',
    type: 'email',
    owner: 'buyer',
    required: true,
    maxLength: 254,
  },
  {
    key: 'purchaserExecution.phone',
    section: 'purchaserExecution',
    label: 'Phone',
    type: 'phone',
    owner: 'buyer',
    required: true,
    maxLength: 40,
  },
  {
    key: 'purchaserExecution.date',
    section: 'purchaserExecution',
    label: 'Date',
    type: 'date',
    owner: 'buyer',
    required: true,
  },
  {
    key: 'purchaserExecution.signatureImage',
    section: 'purchaserExecution',
    label: 'Signature',
    type: 'signature',
    owner: 'buyer',
    required: true,
  },

  // Accepted by the Vendor
  {
    key: 'vendorExecution.fullName',
    section: 'vendorExecution',
    label: 'Full Name',
    type: 'text',
    owner: 'vendor',
    required: true,
    maxLength: 150,
  },
  {
    key: 'vendorExecution.email',
    section: 'vendorExecution',
    label: 'Email',
    type: 'email',
    owner: 'vendor',
    required: true,
    maxLength: 254,
  },
  {
    key: 'vendorExecution.phone',
    section: 'vendorExecution',
    label: 'Phone',
    type: 'phone',
    owner: 'vendor',
    required: true,
    maxLength: 40,
  },
  {
    key: 'vendorExecution.date',
    section: 'vendorExecution',
    label: 'Date',
    type: 'date',
    owner: 'vendor',
    required: true,
  },
  {
    key: 'vendorExecution.signatureImage',
    section: 'vendorExecution',
    label: 'Signature',
    type: 'signature',
    owner: 'vendor',
    required: true,
  },
] as const satisfies readonly FieldDef[];

export type FieldKey = (typeof FIELDS)[number]['key'];

// FIELDS is `as const` so FieldKey stays literal; helpers read this widened view.
const ALL_FIELDS: readonly FieldDef[] = FIELDS;

export const FIELD_MAP = Object.fromEntries(
  ALL_FIELDS.map((f) => [f.key, f]),
) as Record<FieldKey, FieldDef>;

export const SECTION_MAP = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s]),
) as Record<SectionId, SectionDef>;

export function getField(key: string): FieldDef | undefined {
  return FIELD_MAP[key as FieldKey];
}

export function fieldsForOwner(owner: FieldOwner): readonly FieldDef[] {
  return ALL_FIELDS.filter((f) => f.owner === owner);
}

// Whether a role may write a field: it owns it, or shares it with the owner.
export function canEditField(field: FieldDef, owner: FieldOwner): boolean {
  return field.owner === owner || !!field.editableBy?.includes(owner);
}

// Every field a role may write, owned or shared.
export function editableFieldsForOwner(
  owner: FieldOwner,
): readonly FieldDef[] {
  return ALL_FIELDS.filter((f) => canEditField(f, owner));
}

export function fieldsForSection(section: SectionId): readonly FieldDef[] {
  return ALL_FIELDS.filter((f) => f.section === section);
}

// Reads a dot-path field off a term sheet document.
export function getFieldValue(doc: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc === null || typeof acc !== 'object') return undefined;
    return (acc as Record<string, unknown>)[part];
  }, doc);
}

// A conditional field is inert until its controlling field matches.
export function isFieldVisible(field: FieldDef, doc: unknown): boolean {
  if (!field.showWhen) return true;
  return getFieldValue(doc, field.showWhen.key) === field.showWhen.equals;
}

// Fields an owner must still complete; required is only enforced on visible fields.
export function missingRequiredFields(
  owner: FieldOwner,
  doc: unknown,
): readonly FieldDef[] {
  return ALL_FIELDS.filter((f) => {
    if (f.owner !== owner || !f.required || !isFieldVisible(f, doc))
      return false;
    const value = getFieldValue(doc, f.key);
    return value === undefined || value === null || value === '';
  });
}

// Immutably writes a dot-path field, creating intermediate objects as needed.
export function setFieldValue<T>(doc: T, key: string, value: unknown): T {
  const [head, ...rest] = key.split('.');
  const source = (doc ?? {}) as Record<string, unknown>;
  return {
    ...source,
    [head]: rest.length
      ? setFieldValue(source[head] ?? {}, rest.join('.'), value)
      : value,
  } as T;
}

// Builds a nested payload containing only the given dot-path fields.
export function pickFields(
  doc: unknown,
  keys: readonly string[],
): Record<string, unknown> {
  return keys.reduce<Record<string, unknown>>(
    (out, key) => setFieldValue(out, key, getFieldValue(doc, key) ?? null),
    {},
  );
}

export interface FieldIssue {
  key: string;
  message: string;
}

const limitText = (field: FieldDef, limit: number) =>
  field.type === 'money'
    ? `$${limit.toLocaleString('en-AU')}`
    : `${limit.toLocaleString('en-AU')}${field.suffix ? ` ${field.suffix}` : ''}`;

// Blanks, out-of-range numbers and over-long text, against the bounds the server enforces.
export function validateOwnerFields(
  owner: FieldOwner,
  doc: unknown,
): FieldIssue[] {
  const issues: FieldIssue[] = [];

  for (const field of ALL_FIELDS) {
    if (!canEditField(field, owner) || !isFieldVisible(field, doc)) continue;

    const value = getFieldValue(doc, field.key);
    const blank = value === undefined || value === null || value === '';

    if (blank) {
      // Only the owner is held to a required field; a sharer may leave it.
      if (field.required && field.owner === owner) {
        issues.push({ key: field.key, message: `${field.label} is required` });
      }
      continue;
    }

    if (typeof value === 'number') {
      if (field.min !== undefined && value < field.min) {
        issues.push({
          key: field.key,
          message: `${field.label} must be at least ${limitText(field, field.min)}`,
        });
      } else if (field.max !== undefined && value > field.max) {
        issues.push({
          key: field.key,
          message: `${field.label} cannot be more than ${limitText(field, field.max)}`,
        });
      } else if (field.type === 'number' && !Number.isInteger(value)) {
        issues.push({
          key: field.key,
          message: `${field.label} must be a whole number`,
        });
      }
    }

    if (
      typeof value === 'string' &&
      field.maxLength &&
      value.length > field.maxLength
    ) {
      issues.push({
        key: field.key,
        message: `${field.label} must be ${field.maxLength} characters or fewer`,
      });
    }
  }

  // A stated deposit has to fit inside the price.
  if (canEditField(FIELD_MAP.depositAmount, owner)) {
    const price = getFieldValue(doc, 'purchasePrice') as number | null;
    const deposit = getFieldValue(doc, 'depositAmount') as number | null;
    if (depositExceedsPrice(price, deposit)) {
      issues.push({
        key: 'depositAmount',
        message: 'The deposit cannot be more than the purchase price',
      });
    }
  }

  return issues;
}
