/**
 * Digital Proposal module.
 *
 * A proposal is a section-based document rendered by `<ProposalDocument>` —
 * editable inline in the admin via `<ProposalEditor>`, read-only (with fee
 * selection and acceptance) for the customer on `/proposal`.
 *
 * The section content that used to be hardcoded in `app/(public)/proposal/
 * _components/` now lives as editable defaults in `./types.ts`, mirrored by
 * `backend/utils/proposalSections.js`.
 */

export { ProposalDocument, getProposalNavItems, proposalAnchorId } from './proposal-document';
export type {
  ProposalDocumentContext,
  ProposalDocumentProps,
  ProposalInteraction,
} from './proposal-document';
export { ProposalEditor } from './proposal-editor';
export { ProposalPrint } from './proposal-print';
export { ProposalSettingsPanel } from './settings-panel';
export { RichTextEditor } from './rich-text-editor';
export * from './types';
