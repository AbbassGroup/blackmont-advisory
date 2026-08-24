'use client';

import { apiClient } from '@/lib/api';
import { DocumentEditor } from '@/components/documents/document-editor';
import type {
  DocSection,
  DocumentKindConfig,
  DocumentRenderProps,
  RawSectionData,
} from '@/components/documents/types';
import { ProposalDocument } from './proposal-document';
import { ProposalSettingsPanel } from './settings-panel';
import {
  getProposalStage,
  PROPOSAL_API_BASE,
  PROPOSAL_BASE_PATH,
  makeDefaultSection,
  makeUid,
  PROPOSAL_SECTION_REGISTRY,
  type DigitalProposalDoc,
  type ProposalBannerData,
} from './types';

/** Digital Proposal editor. */
export function ProposalEditor() {
  return <DocumentEditor<DigitalProposalDoc> config={PROPOSAL_CONFIG} />;
}

function buildProposalConfig(): DocumentKindConfig<DigitalProposalDoc> {
  const ProposalDocumentAdapter = ({
    doc,
    sections,
    editable,
    onSectionChange,
    onUploadFile,
    onCommit,
  }: DocumentRenderProps<DigitalProposalDoc>) => (
    <ProposalDocument
      sections={sections}
      context={{
        template: doc.template ?? 'business_appraisal',
        brokerName: doc.brokerName ?? '',
        customerName: doc.customerName ?? '',
        businessName: doc.businessName ?? '',
        businessValue: doc.businessValue ?? '',
        // The cover dates the appraisal: when it was approved, else when it was made.
        preparedOn: doc.approvedAt ?? doc.createdAt,
      }}
      editable={editable}
      onSectionChange={onSectionChange}
      onUploadFile={onUploadFile}
      onCommit={onCommit}
      // The editor already constrains the page width, so the document only
      // needs its own inner gutter here.
      contentClassName='px-4 sm:px-8'
    />
  );

  return {
    kind: 'proposal',
    apiBase: PROPOSAL_API_BASE,
    basePath: PROPOSAL_BASE_PATH,
    viewerBase: null,
    printBase: '/proposal-print',
    printLabel: 'Export',
    printIcon: 'download',

    // The customer link is gated on their email address, so it needs more than
    // the id. Without an address there is nothing to preview yet.
    previewHref: (doc, id) =>
      doc.customerEmail
        ? `/proposal?id=${id}&email=${encodeURIComponent(doc.customerEmail)}`
        : null,
    docNoun: 'proposal',

    registry: PROPOSAL_SECTION_REGISTRY,
    makeDefaultSection,
    makeUid,

    toSavePayload: (doc, user) => ({
      sections: doc.sections,
      template: doc.template,
      brokerName: doc.brokerName,
      brokerEmail: doc.brokerEmail,
      customerName: doc.customerName,
      customerEmail: doc.customerEmail,
      agreementTerm: doc.agreementTerm,
      businessAddress: doc.businessAddress,
      listingPrice: doc.listingPrice,
      performanceBonus: doc.performanceBonus,
      salePrice: doc.salePrice,
      lastEditedBy: user.username,
    }),

    // The cover's business name and value are denormalised onto the model by
    // the backend; mirroring them locally keeps the appraisal section and the
    // admin list in step without waiting for a save to come back.
    mirrorSectionFields: (section: DocSection, applied: RawSectionData) => {
      if (section.type !== 'banner') return undefined;
      const patch: Partial<DigitalProposalDoc> = {};
      const { businessName, businessValue } = applied as Partial<ProposalBannerData>;
      if (typeof businessName === 'string') patch.businessName = businessName;
      if (typeof businessValue === 'string') patch.businessValue = businessValue;
      return Object.keys(patch).length ? patch : undefined;
    },

    Document: ProposalDocumentAdapter,
    Settings: ProposalSettingsPanel,

    statusAction: (doc, isSuperAdmin) => {
      const stage = getProposalStage(doc);
      if (stage === 'approved') {
        return {
          label: 'Revoke',
          title: 'Revoke approval — the customer link stops working',
          icon: 'check',
          active: true,
        };
      }
      if (stage === 'pending') {
        return {
          label: isSuperAdmin ? 'Approve' : 'Pending',
          title: isSuperAdmin
            ? 'Approve and email the customer their link'
            : 'Waiting on the owner to approve',
          icon: 'check',
          active: false,
          disabled: !isSuperAdmin,
        };
      }
      return {
        label: 'Submit',
        title: 'Submit for the owner to approve',
        icon: 'send',
        active: false,
      };
    },

    runStatusAction: async (doc, { id, username, patchLocal }) => {
      const stage = getProposalStage(doc);

      if (stage === 'approved') {
        await apiClient.put(`${PROPOSAL_API_BASE}/${id}/revoke`);
        patchLocal((prev) => ({
          ...prev,
          isApproved: false,
          approvedBy: '',
          approvedAt: null,
        }));
        return;
      }

      if (stage === 'pending') {
        // Approving emails the customer their link, so only the owner may.
        const { data } = await apiClient.put(`${PROPOSAL_API_BASE}/${id}/approve`, {
          approvedBy: username || 'Admin',
        });
        patchLocal((prev) => ({
          ...prev,
          isApproved: true,
          approvedBy: data?.approvedBy ?? username,
          approvedAt: data?.approvedAt ?? new Date().toISOString(),
        }));
        return;
      }

      const { data } = await apiClient.post(`${PROPOSAL_API_BASE}/${id}/submit`);
      patchLocal((prev) => ({
        ...prev,
        submittedForApprovalAt:
          data?.submittedForApprovalAt ?? new Date().toISOString(),
      }));
    },

    deleteWarning: (
      <>
        This proposal will be removed from your list and stop opening for the
        customer. It is archived (kept in the database) rather than permanently
        erased, so it can be recovered if needed.
      </>
    ),
  };
}

/**
 * Built once — the config holds no state of its own; the editor supplies the signed-in user to the callbacks that need it.
 */
const PROPOSAL_CONFIG = buildProposalConfig();
