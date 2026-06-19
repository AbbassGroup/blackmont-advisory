/**
 * Type system + defaults for Information Memorandum templates.
 *
 * A template is an ordered list of sections rendered as a continuous web page.
 * Each section has a `type` (which renderer to use) and a free-form `data`
 * payload. Adding a section type means: extend `SectionType`, add a data
 * interface, register it in `SECTION_REGISTRY`, add a default in
 * `makeDefaultSection`, and render it in `<ImDocument>`.
 */

export type SectionType =
  | 'banner'
  | 'confidentiality'
  | 'welcome'
  | 'about'
  | 'hours'
  | 'process'
  | 'makeoffer'
  | 'keycontacts'
  | 'reviews'
  | 'socials'
  | 'ownership'
  | 'highlights'
  | 'charts'
  | 'custom';

export interface BannerData {
  title: string; // e.g. "Information Memorandum"
  businessName: string;
  price: string; // e.g. "$1,000,000 + SaV"
  backgroundImage: string;
}

export interface ConfidentialityData {
  heading: string;
}

// The broker shown in Welcome / Process is the template-level brokerEmail
// (chosen in Settings), so these sections carry only an editable title.
export type WelcomeData = { title?: string };
export type AboutData = { title: string };
export type ProcessData = { title: string };
export type ReviewsData = { title: string };

/** A hyperlinked button in a custom section: either an external link or an
 * uploaded PDF (opened in a download-protected viewer). */
export interface CustomButton {
  id: string;
  label: string;
  kind: 'link' | 'pdf';
  /** External URL (kind='link') or uploaded PDF URL (kind='pdf'). */
  url: string;
}

/** A playable video in a custom section: either an uploaded file or a link
 * (direct video file, or a YouTube / Vimeo URL). */
export interface CustomVideo {
  id: string;
  kind: 'upload' | 'link';
  url: string;
}

/** A single table cell with optional per-cell formatting and merge spans.
 * `hidden` marks a cell that is covered by another cell's row/col span. */
export interface TableCell {
  text: string;
  bold?: boolean;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
  rowSpan?: number;
  colSpan?: number;
  hidden?: boolean;
}

/** A table row. `bg` is an optional row background colour (CSS value).
 * `merged` is legacy (whole-row merge) — migrated to a cell colSpan. */
export interface TableRow {
  cells: TableCell[];
  merged?: boolean;
  bg?: string;
}

/** A reorderable content block inside a custom section. */
export type CustomBlock =
  | { id: string; type: 'text'; html: string }
  /** `rows[0]` is the header row; every row has the same number of columns. */
  | { id: string; type: 'table'; rows: TableRow[] }
  | { id: string; type: 'buttons'; buttons: CustomButton[] }
  | { id: string; type: 'photos'; photos: string[] }
  | { id: string; type: 'video'; kind: 'upload' | 'link'; url: string }
  | { id: string; type: 'pdf'; url: string };

export interface CustomData {
  title: string;
  /** Ordered, reorderable blocks. New sections use this exclusively. */
  blocks?: CustomBlock[];
  // ── Legacy fields (pre-blocks) — migrated to `blocks` on first edit. ──
  body?: string;
  pdfUrl?: string;
  buttons?: CustomButton[];
  videos?: CustomVideo[];
  photos?: string[];
}

export interface HoursRow {
  day: string;
  hours: string;
}

export interface HoursData {
  title: string;
  rows: HoursRow[];
}

export interface MakeOfferData {
  title: string;
  /** Unique trust-account reference generated once per template. */
  ref: string;
}

export interface KeyContactsData {
  title: string;
}

/** Supported social platforms (logo + brand colour live in the section). */
export type SocialPlatform =
  | 'facebook'
  | 'instagram'
  | 'x'
  | 'linkedin'
  | 'youtube'
  | 'tiktok'
  | 'whatsapp'
  | 'website';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  url: string;
}

export interface SocialsData {
  title: string;
  links: SocialLink[];
}

/** A staff group (full-time, part-time, …). Only the values are editable; the
 * field labels and group headings are static. `rate` is shown for some groups. */
export interface StaffGroup {
  people: string;
  hours: string;
  tasks: string;
  rate: string;
}

export interface OwnershipData {
  title: string;
  owner: { owners: string; hours: string; tasks: string };
  fulltime: StaffGroup;
  parttime: StaffGroup;
  casual: StaffGroup;
  subcontractors: StaffGroup;
}

/** A single key-business-highlight: an icon (key into the section's catalog)
 * plus an inline-editable title and description. */
export interface HighlightItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface HighlightsData {
  title: string;
  items: HighlightItem[];
}

// ─── Charts ──────────────────────────────────────────────────────────────────
/** Chart kinds. `finance` is the multi-year bar/line graph; `roi` is the
 * Asking-Price-vs-SDE doughnut; `growth` is the single-value-per-year trajectory
 * bar chart; `pie` is a labelled breakdown (each option's share of the total);
 * `kpi` is a grid of metric tiles. The `type` discriminates which fields a chart
 * uses, leaving room for more kinds without touching existing data. */
export type ChartType = 'finance' | 'roi' | 'growth' | 'pie' | 'kpi';

/** How a chart is drawn. Brokers can switch between these per chart. */
export type ChartVariant = 'bar' | 'line' | 'area';

/** The scale the entered figures represent — drives axis suffix ("600k") and
 * the full value shown in tooltips ("$600,000"). */
export type ChartUnit = 'plain' | 'k' | 'm';

/** One period (a year, quarter, …) of finance figures. Values are plain
 * dollars; the chart formats them (e.g. 700000 → "$700k"). */
export interface FinanceRow {
  id: string;
  label: string;
  revenue: number;
  grossProfit: number;
  sde: number;
}

/** Whether a growth bar is a recorded result or a future projection. */
export type GrowthPhase = 'actual' | 'trajectory';

/** One period of the growth chart: a single value plus its phase (which colours
 * the bar — actual vs trajectory). */
export interface GrowthRow {
  id: string;
  label: string;
  value: number;
  phase: GrowthPhase;
}

/** One slice of a pie breakdown: a label and a raw number; its share is computed
 * as value ÷ total of all slices. */
export interface PieSlice {
  id: string;
  label: string;
  value: number;
}

/** One metric tile in a KPI row: a big headline value and a small caption. */
export interface KpiCell {
  big: string;
  small: string;
}

/** Background style for a KPI row. */
export type KpiStyle = 'plain' | 'dark' | 'gold' | 'teal';

/** A KPI row: a sideways category label, a colour style, and its metric tiles. */
export interface KpiRow {
  id: string;
  category: string;
  style: KpiStyle;
  cells: KpiCell[];
}

/** A single chart inside a Charts section. Fields are used per `type`:
 *  - finance: `variant`, `unit`, `rows`
 *  - roi:     `unit`, `askingPrice`, `sde`, `caption` (% = SDE / askingPrice)
 *  - growth:  `unit`, `growthRows`
 *  - pie:     `pieSlices`
 *  - kpi:     `kpiRows`. */
export interface ChartItem {
  id: string;
  type: ChartType;
  title: string;
  /** Scale of the entered figures (defaults to thousands for finance/growth). */
  unit?: ChartUnit;
  // ── finance ──
  variant?: ChartVariant;
  rows?: FinanceRow[];
  // ── roi (doughnut) ──
  askingPrice?: number;
  sde?: number;
  caption?: string;
  // ── growth (trajectory) ──
  growthRows?: GrowthRow[];
  // ── pie (breakdown) ──
  pieSlices?: PieSlice[];
  // ── kpi (metric grid) ──
  kpiRows?: KpiRow[];
}

export interface ChartsData {
  title: string;
  charts: ChartItem[];
}

export type SectionData =
  | BannerData
  | ConfidentialityData
  | WelcomeData
  | AboutData
  | HoursData
  | ProcessData
  | MakeOfferData
  | KeyContactsData
  | ReviewsData
  | SocialsData
  | OwnershipData
  | HighlightsData
  | ChartsData
  | CustomData;

export interface ImSection {
  _id?: string;
  /** Stable client-side key (sections may not have a Mongo _id before first save). */
  uid?: string;
  type: SectionType;
  enabled?: boolean;
  data: Record<string, unknown>;
}

export interface ImTemplate {
  _id: string;
  businessName: string;
  /** The broker who owns the memorandum (single owner field). */
  brokerEmail: string;
  status: 'draft' | 'published';
  publishedAt?: string | null;
  archived?: boolean;
  archivedAt?: string | null;
  sections: ImSection[];
  createdAt?: string;
  updatedAt?: string;
}

// ─── Registry: drives the "add section" picker + the preview nav ────────────
export interface SectionMeta {
  type: SectionType;
  label: string;
  description: string;
  /** Lucide icon name, mapped to a component in the admin panel. */
  icon: string;
  /** If true, only one instance of this section may exist in a template. */
  singleton: boolean;
  /** Whether the section appears in the preview sidebar navigation. */
  inNav: boolean;
}

export const SECTION_REGISTRY: SectionMeta[] = [
  {
    type: 'banner',
    label: 'Cover',
    description: 'Header with business name, price and background image.',
    icon: 'Image',
    singleton: true,
    inNav: false,
  },
  {
    type: 'confidentiality',
    label: 'Confidentiality & Disclaimer',
    description: 'Standard conditions of acceptance and disclaimer.',
    icon: 'ShieldAlert',
    singleton: true,
    inNav: true,
  },
  {
    type: 'welcome',
    label: 'Welcome Message',
    description: "Selected broker's welcome message and contact details.",
    icon: 'MessageSquareQuote',
    singleton: true,
    inNav: true,
  },
  {
    type: 'about',
    label: 'About Blackmont Advisory',
    description: 'About the firm and the services offered.',
    icon: 'Building2',
    singleton: true,
    inNav: true,
  },
  {
    type: 'hours',
    label: 'Hours of Operations',
    description: 'Weekly trading hours.',
    icon: 'Clock',
    singleton: true,
    inNav: true,
  },
  {
    type: 'process',
    label: 'The Process',
    description: 'Step-by-step buying process with broker contact.',
    icon: 'ListChecks',
    singleton: true,
    inNav: true,
  },
  {
    type: 'makeoffer',
    label: 'Make an Offer',
    description: 'Offer form plus trust account details.',
    icon: 'HandCoins',
    singleton: true,
    inNav: true,
  },
  {
    type: 'keycontacts',
    label: 'Key Contacts',
    description: 'Appraisal & advocacy CTAs plus recommended contacts.',
    icon: 'Contact',
    singleton: true,
    inNav: true,
  },
  {
    type: 'reviews',
    label: 'Reviews',
    description: 'Accreditations and client reviews (fixed content).',
    icon: 'Star',
    singleton: true,
    inNav: true,
  },
  {
    type: 'socials',
    label: 'Social Media',
    description: 'Linked social profiles with their original logos.',
    icon: 'Share2',
    singleton: true,
    inNav: true,
  },
  {
    type: 'ownership',
    label: 'Ownership & Staff',
    description: 'Business owner and staff breakdown (editable values).',
    icon: 'Users',
    singleton: true,
    inNav: true,
  },
  {
    type: 'highlights',
    label: 'Key Business Highlights',
    description: 'Icon highlights with editable title and detail.',
    icon: 'Sparkles',
    singleton: true,
    inNav: true,
  },
  {
    type: 'charts',
    label: 'Charts',
    description: 'Financial graphs — revenue, gross profit and SDE across years.',
    icon: 'BarChart3',
    singleton: false,
    inNav: true,
  },
  {
    type: 'custom',
    label: 'Custom Section',
    description: 'Your own heading and text, with an optional PDF whose pages render inline.',
    icon: 'FileText',
    singleton: false,
    inNav: true,
  },
];

export function getSectionMeta(type: string): SectionMeta | undefined {
  return SECTION_REGISTRY.find((s) => s.type === type);
}

// ─── Default content ─────────────────────────────────────────────────────────
/** Default banner background (served under the public basePath). Editable per template. */
export const DEFAULT_BANNER_IMAGE = '/abbass.avif';

export const DEFAULT_HOURS_ROWS: HoursRow[] = [
  { day: 'Monday', hours: '8am - 6pm' },
  { day: 'Tuesday', hours: '8am - 6pm' },
  { day: 'Wednesday', hours: '8am - 6pm' },
  { day: 'Thursday', hours: '8am - 6pm' },
  { day: 'Friday', hours: '8am - 6pm' },
  { day: 'Saturday', hours: 'Closed' },
  { day: 'Sunday', hours: 'Closed' },
];

let uidCounter = 0;
/** Generate a stable-enough client id without relying on crypto/Date. */
export function makeUid(type: string): string {
  uidCounter += 1;
  return `${type}-${uidCounter}-${Math.floor(performance.now())}`;
}

/** A blank finance row (one period). */
export function makeFinanceRow(label = ''): FinanceRow {
  return { id: makeUid('yr'), label, revenue: 0, grossProfit: 0, sde: 0 };
}

/** A new finance chart pre-seeded with three empty periods so the broker sees
 * the input grid immediately. */
export function makeFinanceChart(): ChartItem {
  return {
    id: makeUid('chart'),
    type: 'finance',
    title: 'Financial Performance',
    variant: 'bar',
    unit: 'k',
    rows: [makeFinanceRow('Year 1'), makeFinanceRow('Year 2'), makeFinanceRow('Year 3')],
  };
}

/** A blank growth period. */
export function makeGrowthRow(label = '', phase: GrowthPhase = 'actual'): GrowthRow {
  return { id: makeUid('gr'), label, value: 0, phase };
}

/** A new growth-trajectory chart seeded with three "actual" years followed by
 * two "trajectory" (projected) years — the broker reassigns phases as needed. */
export function makeGrowthChart(): ChartItem {
  return {
    id: makeUid('chart'),
    type: 'growth',
    title: 'Growth Trajectory',
    unit: 'k',
    growthRows: [
      makeGrowthRow('Year 1', 'actual'),
      makeGrowthRow('Year 2', 'actual'),
      makeGrowthRow('Year 3', 'actual'),
      makeGrowthRow('Year 4', 'trajectory'),
      makeGrowthRow('Year 5', 'trajectory'),
    ],
  };
}

/** A blank pie slice. */
export function makePieSlice(label = ''): PieSlice {
  return { id: makeUid('ps'), label, value: 0 };
}

/** A new pie breakdown seeded with three empty options. */
export function makePieChart(): ChartItem {
  return {
    id: makeUid('chart'),
    type: 'pie',
    title: 'Breakdown',
    pieSlices: [makePieSlice('Option 1'), makePieSlice('Option 2'), makePieSlice('Option 3')],
  };
}

/** A blank KPI metric tile. */
export function makeKpiCell(): KpiCell {
  return { big: '', small: '' };
}

/** A KPI row with three empty tiles. */
export function makeKpiRow(category = '', style: KpiStyle = 'plain'): KpiRow {
  return { id: makeUid('kr'), category, style, cells: [makeKpiCell(), makeKpiCell(), makeKpiCell()] };
}

/** A new KPI grid seeded with four labelled rows (alternating styles) and empty
 * tiles for the broker to fill in. */
export function makeKpiChart(): ChartItem {
  return {
    id: makeUid('chart'),
    type: 'kpi',
    title: 'Key Performance Indicators',
    kpiRows: [
      makeKpiRow('Financial', 'plain'),
      makeKpiRow('Operations', 'teal'),
      makeKpiRow('Quality & Clients', 'dark'),
      makeKpiRow('Staff & Sustainability', 'plain'),
    ],
  };
}

/** A new ROI doughnut. Defaults to millions, since asking prices usually run
 * into the millions, with an empty caption for the broker to fill in. */
export function makeRoiChart(): ChartItem {
  return {
    id: makeUid('chart'),
    type: 'roi',
    title: 'Return on Investment',
    unit: 'm',
    askingPrice: 0,
    sde: 0,
    caption: '',
  };
}

/** A unique, human-friendly trust-account reference for a memorandum. */
export function makeOfferRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i += 1) s += chars[Math.floor(Math.random() * chars.length)];
  return `IM-${s}`;
}

export function makeDefaultSection(type: SectionType): ImSection {
  const base = { uid: makeUid(type), type, enabled: true };
  switch (type) {
    case 'banner':
      return {
        ...base,
        data: {
          title: 'Information Memorandum',
          businessName: '',
          price: '',
          backgroundImage: DEFAULT_BANNER_IMAGE,
        } satisfies BannerData,
      };
    case 'confidentiality':
      return { ...base, data: { heading: 'Conditions of Acceptance' } satisfies ConfidentialityData };
    case 'welcome':
      return { ...base, data: { title: 'Welcome Message' } satisfies WelcomeData };
    case 'about':
      return { ...base, data: { title: 'About Blackmont Advisory' } satisfies AboutData };
    case 'process':
      return { ...base, data: { title: 'The Process' } satisfies ProcessData };
    case 'reviews':
      return { ...base, data: { title: 'Reviews' } satisfies ReviewsData };
    case 'custom':
      return {
        ...base,
        data: {
          title: 'Custom Section',
          blocks: [{ id: makeUid('blk'), type: 'text', html: '' }],
        } satisfies CustomData,
      };
    case 'hours':
      return {
        ...base,
        data: {
          title: 'Hours of Operations',
          rows: DEFAULT_HOURS_ROWS.map((r) => ({ ...r })),
        } satisfies HoursData,
      };
    case 'makeoffer':
      return {
        ...base,
        data: { title: 'Make an Offer', ref: makeOfferRef() } satisfies MakeOfferData,
      };
    case 'keycontacts':
      return { ...base, data: { title: 'Key Contacts' } satisfies KeyContactsData };
    case 'charts':
      return { ...base, data: { title: 'Charts', charts: [makeFinanceChart()] } satisfies ChartsData };
    case 'socials':
      return { ...base, data: { title: 'Social Media', links: [] } satisfies SocialsData };
    case 'highlights':
      return {
        ...base,
        data: {
          title: 'Key Business Highlights',
          items: [
            { id: makeUid('hl'), icon: 'store', title: 'Business Name', desc: '' },
            { id: makeUid('hl'), icon: 'factory', title: 'Industry', desc: '' },
            { id: makeUid('hl'), icon: 'mapPin', title: 'Address', desc: '' },
            { id: makeUid('hl'), icon: 'tag', title: 'Price', desc: '' },
          ],
        } satisfies HighlightsData,
      };
    case 'ownership':
      return {
        ...base,
        data: {
          title: 'Ownership & Staff',
          owner: { owners: '', hours: '', tasks: '' },
          fulltime: { people: '', hours: '', tasks: '', rate: '' },
          parttime: { people: '', hours: '', tasks: '', rate: '' },
          casual: { people: '', hours: '', tasks: '', rate: '' },
          subcontractors: { people: '', hours: '', tasks: '', rate: '' },
        } satisfies OwnershipData,
      };
    default:
      return { ...base, data: {} };
  }
}

/** The sections every new template starts with, in order. */
export function buildDefaultSections(): ImSection[] {
  return [
    makeDefaultSection('banner'),
    makeDefaultSection('confidentiality'),
    makeDefaultSection('about'),
    makeDefaultSection('highlights'),
    makeDefaultSection('hours'),
    makeDefaultSection('socials'),
    makeDefaultSection('ownership'),
    makeDefaultSection('process'),
    makeDefaultSection('makeoffer'),
    makeDefaultSection('keycontacts'),
    makeDefaultSection('reviews'),
  ];
}
