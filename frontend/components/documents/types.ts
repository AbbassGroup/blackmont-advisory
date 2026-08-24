/** The generic document-editor contract. */

import type { ComponentType, ReactNode } from 'react';

/** A section's payload. Shape depends on `type` and is owned by its renderer. */
export type RawSectionData = Record<string, unknown>;

/** A change to a section's data. */
export type SectionPatch<T = RawSectionData> =
  | Partial<T>
  | ((prev: RawSectionData) => Partial<T>);

export interface DocSection {
  _id?: string;
  /** Stable client-side key (sections may have no Mongo _id before first save). */
  uid?: string;
  type: string;
  enabled?: boolean;
  data: RawSectionData;
}

/** The minimum an editable document must expose. Products extend this. */
export interface EditorDocument {
  _id: string;
  sections: DocSection[];
  createdAt?: string;
  updatedAt?: string;
}

// ─── Registry ────────────────────────────────────────────────────────────────

export interface DocSectionMeta {
  type: string;
  label: string;
  description: string;
  /** Key into the icon map in `sections-panel.tsx`. */
  icon: string;
  /** If true, only one instance of this section may exist in a document. */
  singleton: boolean;
  /** Whether the section appears in the preview sidebar navigation. */
  inNav: boolean;
  /** Keep at least this many of the type in the document. */
  minCount?: number;
  /** The section renders fixed content and has nothing to edit inline. */
  fixed?: boolean;
  /** Don't start this type on a fresh page when exporting. */
  noPageBreak?: boolean;
}

export const findSectionMeta = (
  registry: DocSectionMeta[],
  type: string,
): DocSectionMeta | undefined => registry.find((m) => m.type === type);

/** Whether the section at `index` may be deleted. */
export function canRemoveSection(
  registry: DocSectionMeta[],
  sections: DocSection[],
  index: number,
): boolean {
  const section = sections[index];
  if (!section) return false;
  const min = findSectionMeta(registry, section.type)?.minCount ?? 0;
  if (min <= 0) return true;
  return sections.filter((s) => s.type === section.type).length > min;
}

/** Where a newly added section belongs. */
export function sectionInsertIndex(
  registry: DocSectionMeta[],
  sections: DocSection[],
  type: string,
): number {
  const rank = (t: string) => {
    const i = registry.findIndex((m) => m.type === t);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  const target = rank(type);
  if (target === Number.MAX_SAFE_INTEGER) return sections.length;
  const at = sections.findIndex((s) => rank(s.type) > target);
  return at === -1 ? sections.length : at;
}

// ─── Renderer / settings props ───────────────────────────────────────────────

export interface DocumentRenderProps<T extends EditorDocument = EditorDocument> {
  doc: T;
  sections: DocSection[];
  editable?: boolean;
  /** Called with the section's index in the full array and a data patch. */
  onSectionChange?: (index: number, patch: SectionPatch) => void;
  /** Uploads a file and returns its URL, or null on failure. */
  onUploadFile?: (file: File) => Promise<string | null>;
  /** Persist immediately — for discrete actions like finishing an upload. */
  onCommit?: () => void;
}

export interface SettingsRenderProps<T extends EditorDocument = EditorDocument> {
  doc: T;
  isSuperAdmin: boolean;
  /** Apply a change and save it straight away. */
  onPatch: (updater: (prev: T) => T) => void;
  /** Open the delete confirmation. */
  onDelete: () => void;
  /** A status change (publish / submit / approve) is in flight. */
  busy: boolean;
  /** Run the document's status action, if it has one. */
  onStatusAction: () => void;
  /** Open one of the product's `Extras` dialogs by key, closing the drawer first. */
  onOpenExtra: (key: string) => void;
}

// ─── Status action (publish / submit for approval / approve) ─────────────────

export type StatusIcon = 'globe' | 'send' | 'check';

/** What the control bar's right-hand button does for this product. */
export interface DocStatusAction {
  /** Button caption, e.g. "Publish", "Submit", "Approve". */
  label: string;
  title?: string;
  icon: StatusIcon;
  /** Filled/active styling — the document is live. */
  active: boolean;
  disabled?: boolean;
  /** One-line summary shown in the settings drawer. */
  hint?: string;
}

/** Who is editing. Supplied by the editor so configs stay plain constants. */
export interface EditorUser {
  username: string;
  email: string;
  isSuperAdmin: boolean;
}

export interface StatusActionContext<T extends EditorDocument> extends EditorUser {
  id: string;
  /** Save any pending edits before acting on the server copy. */
  flush: () => Promise<void>;
  /** Update local state without marking the document dirty. */
  patchLocal: (updater: (prev: T) => T) => void;
}

// ─── The config a product supplies ───────────────────────────────────────────

export interface DocumentKindConfig<T extends EditorDocument = EditorDocument> {
  /** Discriminator, e.g. 'im' | 'acquisition' | 'proposal'. */
  kind: string;
  /** Backend base, e.g. '/api/digital-proposals'. */
  apiBase: string;
  /** Admin list/editor route base. */
  basePath: string;
  /** Public (client-facing) viewer route base, or null if it has none. */
  viewerBase: string | null;
  /** Broker-only print route base, or null. */
  printBase: string | null;
  /** Toolbar wording for that route. Defaults to a plain browser print. */
  printLabel?: string;
  printIcon?: 'printer' | 'download';
  /**
   * Overrides `viewerBase` when the preview link needs more than the id — a proposal's customer link carries their email address as well.
   */
  previewHref?: (doc: T, id: string) => string | null;
  /** Lowercase noun for UI copy: "Delete {docNoun}?". */
  docNoun: string;

  registry: DocSectionMeta[];
  makeDefaultSection: (type: string) => DocSection;
  makeUid: (type: string) => string;

  /** The JSON body sent by autosave. */
  toSavePayload: (doc: T, user: EditorUser) => Record<string, unknown>;

  /**
   * Document-level fields that mirror a section's data — an IM's banner carries the business name, a proposal's banner the same.
   */
  mirrorSectionFields?: (
    section: DocSection,
    applied: RawSectionData,
  ) => Partial<T> | undefined;

  /** Renders the document body, editable in the admin. */
  Document: ComponentType<DocumentRenderProps<T>>;
  /** Renders the Settings drawer contents. */
  Settings: ComponentType<SettingsRenderProps<T>>;

  /** The control bar's status button, or null for a document with no such step. */
  statusAction?: (doc: T, isSuperAdmin: boolean) => DocStatusAction | null;
  /** Performs that action. Resolves once the server and local state agree. */
  runStatusAction?: (doc: T, ctx: StatusActionContext<T>) => Promise<void>;

  /** Product dialogs mounted as siblings of the drawer. */
  Extras?: ComponentType<{
    doc: T;
    id: string;
    openKey: string | null;
    onClose: () => void;
  }>;

  /** Copy for the delete confirmation body. */
  deleteWarning?: ReactNode;
}
