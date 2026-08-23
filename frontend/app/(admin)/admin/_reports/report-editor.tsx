'use client';

import { useMemo } from 'react';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { DocumentEditor } from '@/components/documents/document-editor';
import type {
  DocSection,
  DocumentKindConfig,
  DocumentRenderProps,
  RawSectionData,
  SettingsRenderProps,
} from '@/components/documents/types';
import {
  ImDocument,
  makeDefaultSection,
  makeUid,
  SECTION_REGISTRY,
  type ImSection,
  type ImTemplate,
  type ReportKindConfig,
  type SectionType,
} from '@/components/im';
import { AcquirerAccessDialog } from '@/components/admin/acquirer-access-dialog';
import { SettingsPanel } from './settings-panel';

/**
 * Information Memorandum / Acquisition Report editor.
 *
 * A thin adapter: it maps the report-kind config onto the shared
 * `<DocumentEditor>` contract (`@/components/documents`), which the Digital
 * Proposal editor also uses. Everything below is what makes an IM an IM —
 * the section registry, the renderer, the settings drawer and publishing.
 */
export function ReportEditor({ config }: { config: ReportKindConfig }) {
  const docConfig = useMemo(() => buildImDocumentConfig(config), [config]);
  return <DocumentEditor<ImTemplate> config={docConfig} />;
}

function buildImDocumentConfig(
  config: ReportKindConfig,
): DocumentKindConfig<ImTemplate> {
  const ImDocumentAdapter = ({
    doc,
    sections,
    editable,
    onSectionChange,
    onUploadFile,
    onCommit,
  }: DocumentRenderProps<ImTemplate>) => (
    <ImDocument
      sections={sections as ImSection[]}
      editable={editable}
      kind={config.kind}
      brokerEmail={doc.brokerEmail}
      onSectionChange={onSectionChange}
      onUploadFile={onUploadFile}
      onCommit={onCommit}
    />
  );

  const ImSettings = ({
    doc,
    isSuperAdmin,
    onPatch,
    onDelete,
    busy,
    onStatusAction,
    onOpenExtra,
  }: SettingsRenderProps<ImTemplate>) => (
    <SettingsPanel
      template={doc}
      isSuperAdmin={isSuperAdmin}
      onChangeBroker={(email) => onPatch((prev) => ({ ...prev, brokerEmail: email }))}
      publishing={busy}
      onTogglePublish={onStatusAction}
      noun={config.docNoun}
      linkDeals={config.linkDeals}
      dealBusinessUnit={config.dealBusinessUnit}
      onChangeDeal={(dealId, personName, businessName) =>
        onPatch((prev) => {
          const next: ImTemplate = { ...prev, deal: dealId, dealName: businessName };
          if (personName) {
            next.businessName = personName;
            next.sections = prev.sections.map((s) =>
              s.type === 'banner'
                ? { ...s, data: { ...s.data, businessName: personName } }
                : s,
            );
          }
          return next;
        })
      }
      onManageAccess={config.linkDeals ? () => onOpenExtra('acquirer-access') : undefined}
      onDelete={onDelete}
    />
  );

  const ImExtras = ({
    id,
    openKey,
    onClose,
  }: {
    doc: ImTemplate;
    id: string;
    openKey: string | null;
    onClose: () => void;
  }) => {
    const { user } = useAdminAuth();
    if (!config.linkDeals) return null;
    return (
      <AcquirerAccessDialog
        open={openKey === 'acquirer-access'}
        onOpenChange={(open) => !open && onClose()}
        reportId={id}
        token={user?.token || ''}
      />
    );
  };

  return {
    kind: config.kind,
    apiBase: config.apiBase,
    basePath: config.basePath,
    viewerBase: config.viewerBase,
    printBase: config.printBase,
    docNoun: config.docNoun,

    registry: SECTION_REGISTRY,
    makeDefaultSection: (type: string) => makeDefaultSection(type as SectionType),
    makeUid,

    // brokerEmail is always sent; the backend only applies a broker change when
    // the user is a superadmin.
    toSavePayload: (doc) => ({
      businessName: doc.businessName,
      brokerEmail: doc.brokerEmail,
      sections: doc.sections,
      // Acquisition Reports only; ignored by the IM backend.
      deal: doc.deal,
      dealName: doc.dealName,
    }),

    mirrorSectionFields: (section: DocSection, applied: RawSectionData) => {
      if (section.type === 'banner' && typeof applied.businessName === 'string') {
        return { businessName: applied.businessName };
      }
      if (section.type === 'welcome' && typeof applied.brokerEmail === 'string') {
        return { brokerEmail: applied.brokerEmail };
      }
      return undefined;
    },

    Document: ImDocumentAdapter,
    Settings: ImSettings,
    Extras: ImExtras,

    statusAction: (doc) => ({
      label: doc.status === 'published' ? 'Unpublish' : 'Publish',
      title: doc.status === 'published' ? 'Unpublish' : 'Publish',
      icon: 'globe',
      active: doc.status === 'published',
    }),

    runStatusAction: async (doc, { id, patchLocal }) => {
      const next = doc.status === 'published' ? 'draft' : 'published';
      await apiClient.patch(`${config.apiBase}/${id}/status`, { status: next });
      patchLocal((prev) => ({
        ...prev,
        status: next,
        publishedAt: next === 'published' ? new Date().toISOString() : null,
      }));
    },

    deleteWarning: (
      <>
        This {config.docNoun} will be removed from your list. It is archived
        (kept in the database) rather than permanently erased, so it can be
        recovered if needed.
      </>
    ),
  };
}
