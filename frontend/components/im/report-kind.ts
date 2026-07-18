/**
 * Two products share one template engine: the seller-side Information Memorandum
 * and the buyer-side Acquisition Report. They differ only in terminology and
 * routing — this config is the single source of truth for those differences so
 * the admin list/editor, the document renderer and the public viewer stay DRY.
 */
export type ReportKind = 'im' | 'acquisition';

export interface ReportKindConfig {
  kind: ReportKind;
  /** Shared backend base — both products live in the same collection. */
  apiBase: string;
  /** Admin list/editor route base. */
  basePath: string;
  /** Public (client-facing) viewer route base. */
  viewerBase: string;
  /** Broker-only print route base. */
  printBase: string;
  /** Document title (banner default + placeholder), e.g. "Acquisition Report". */
  docTitle: string;
  /** Lowercase noun used in UI copy, e.g. "report" → "Delete report?". */
  docNoun: string;
  /** Banner subject-line label: "Business Name" vs "Customer Name". */
  subjectLabel: string;
  /** Whether the banner shows the price line. */
  showPrice: boolean;
  /** Whether the editor offers a "Linked Deal" picker in Settings. */
  linkDeals: boolean;
  /** Nexar business unit to pull deals from (when linkDeals is true). */
  dealBusinessUnit?: string;
  // Admin list copy
  listTitle: string;
  listDescription: string;
  newButtonLabel: string;
  columnLabel: string;
  searchPlaceholder: string;
}

export const REPORT_KINDS: Record<ReportKind, ReportKindConfig> = {
  im: {
    kind: 'im',
    apiBase: '/api/im-templates',
    basePath: '/admin/information-memorandum',
    viewerBase: '/information-memorandum',
    printBase: '/im-print',
    docTitle: 'Information Memorandum',
    docNoun: 'memorandum',
    subjectLabel: 'Business Name',
    showPrice: true,
    linkDeals: false,
    listTitle: 'Information Memorandum',
    listDescription: 'Create and manage Information Memorandum templates',
    newButtonLabel: 'New Template',
    columnLabel: 'Memorandum',
    searchPlaceholder: 'Search by business or broker...',
  },
  acquisition: {
    kind: 'acquisition',
    // Fully independent backend service — its own collection and routes.
    apiBase: '/api/acquisition-reports',
    basePath: '/admin/acquisition-reports',
    viewerBase: '/acquisition-report',
    printBase: '/acquisition-report-print',
    docTitle: 'Acquisition Report',
    docNoun: 'report',
    subjectLabel: 'Customer Name',
    showPrice: false,
    linkDeals: true,
    dealBusinessUnit: 'Business Buyers',
    listTitle: 'Acquisition Reports',
    listDescription: 'Create and manage Acquisition Report templates',
    newButtonLabel: 'New Report',
    columnLabel: 'Report',
    searchPlaceholder: 'Search by customer or broker...',
  },
};

/** Coerce any stored/unknown value to a valid kind (legacy docs → 'im'). */
export const resolveReportKind = (k?: string | null): ReportKind =>
  k === 'acquisition' ? 'acquisition' : 'im';

/** Config for a kind value (legacy/undefined → the IM config). */
export const getReportConfig = (k?: string | null): ReportKindConfig =>
  REPORT_KINDS[resolveReportKind(k)];
