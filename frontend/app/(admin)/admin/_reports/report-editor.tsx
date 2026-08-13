'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import {
  ImDocument,
  makeDefaultSection,
  makeUid,
  type ImSection,
  type ImTemplate,
  type ReportKindConfig,
  type SectionType,
} from '@/components/im';
import { AcquirerAccessDialog } from '@/components/admin/acquirer-access-dialog';
import { SavedIndicator, type SaveState } from './saved-indicator';
import { ImControlBar, type PanelKey } from './im-control-bar';
import { SectionsPanel } from './sections-panel';
import { SettingsPanel } from './settings-panel';

const PANEL_META: Record<PanelKey, { title: string; description: string }> = {
  sections: {
    title: 'Sections',
    description: 'Add, reorder, hide or remove sections.',
  },
  settings: { title: 'Settings', description: 'Publish status and deletion.' },
};

export function ReportEditor({ config }: { config: ReportKindConfig }) {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { user } = useAdminAuth();
  const isSuperAdmin = user?.user?.role === 'superadmin';
  const isMobile = useIsMobile();
  const BASE = config.apiBase;

  const [template, setTemplate] = useState<ImTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [acquirerOpen, setAcquirerOpen] = useState(false);

  const templateRef = useRef<ImTemplate | null>(null);

  // ── Load ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    let active = true;
    apiClient
      .get(`${BASE}/${id}`)
      .then(({ data }) => {
        if (!active) return;
        // Ensure every section has a stable client id for React keys/identity.
        const sections: ImSection[] = (data.sections ?? []).map(
          (s: ImSection) => ({
            ...s,
            uid: s.uid || s._id || makeDefaultSection(s.type).uid,
          }),
        );
        const loaded = { ...data, sections } as ImTemplate;
        templateRef.current = loaded;
        setTemplate(loaded);
      })
      .catch((e) => {
        if (!active) return;
        setLoadError(
          e?.response?.status === 403
            ? `You do not have access to this ${config.docNoun}.`
            : `Failed to load this ${config.docNoun}.`,
        );
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id, BASE, config.docNoun]);

  const saveNow = useCallback(async () => {
    const current = templateRef.current;
    if (!current) return;
    setSaveState('saving');
    try {
      // brokerEmail is always sent; the backend only applies a broker change
      // when the user is a superadmin.
      await apiClient.put(`${BASE}/${id}`, {
        businessName: current.businessName,
        brokerEmail: current.brokerEmail,
        sections: current.sections,
        // Acquisition Reports only; ignored by the IM backend.
        deal: current.deal,
        dealName: current.dealName,
      });
      setSaveState('saved');
      setLastSavedAt(new Date());
    } catch {
      setSaveState('error');
    }
  }, [id, BASE]);

  const hasPending = useRef(false);

  const patch = useCallback((updater: (prev: ImTemplate) => ImTemplate) => {
    const prev = templateRef.current;
    if (!prev) return;
    const next = updater(prev);
    templateRef.current = next;
    setTemplate(next);
    hasPending.current = true;
  }, []);

  const commit = useCallback(() => {
    if (!hasPending.current) return;
    hasPending.current = false;
    void saveNow();
  }, [saveNow]);

  const patchCommit = useCallback(
    (updater: (prev: ImTemplate) => ImTemplate) => {
      patch(updater);
      commit();
    },
    [patch, commit],
  );

  const handleSectionChange = useCallback(
    (index: number, p: Record<string, unknown>) =>
      patch((prev) => {
        const target = prev.sections[index];
        const sections = prev.sections.map((s, i) =>
          i === index ? { ...s, data: { ...s.data, ...p } } : s,
        );
        const extra: Partial<ImTemplate> = {};
        if (target.type === 'banner' && typeof p.businessName === 'string') {
          extra.businessName = p.businessName;
        }
        if (target.type === 'welcome' && typeof p.brokerEmail === 'string') {
          extra.brokerEmail = p.brokerEmail;
        }
        return { ...prev, sections, ...extra };
      }),
    [patch],
  );

  const moveSection = useCallback(
    (index: number, dir: -1 | 1) =>
      patchCommit((prev) => {
        const j = index + dir;
        if (j < 0 || j >= prev.sections.length) return prev;
        const sections = [...prev.sections];
        [sections[index], sections[j]] = [sections[j], sections[index]];
        return { ...prev, sections };
      }),
    [patchCommit],
  );

  const toggleSection = useCallback(
    (index: number) =>
      patchCommit((prev) => ({
        ...prev,
        sections: prev.sections.map((s, i) =>
          i === index ? { ...s, enabled: s.enabled === false } : s,
        ),
      })),
    [patchCommit],
  );

  const removeSection = useCallback(
    (index: number) =>
      patchCommit((prev) => ({
        ...prev,
        sections: prev.sections.filter((_, i) => i !== index),
      })),
    [patchCommit],
  );

  const addSection = useCallback(
    (type: SectionType) =>
      patchCommit((prev) => ({
        ...prev,
        sections: [...prev.sections, makeDefaultSection(type)],
      })),
    [patchCommit],
  );

  const duplicateSection = useCallback(
    (index: number) =>
      patchCommit((prev) => {
        const src = prev.sections[index];
        if (!src) return prev;
        const copy: ImSection = {
          ...src,
          _id: undefined,
          uid: makeUid(src.type),
          data: JSON.parse(JSON.stringify(src.data ?? {})),
        };
        const sections = [...prev.sections];
        sections.splice(index + 1, 0, copy);
        return { ...prev, sections };
      }),
    [patchCommit],
  );

  const setBroker = useCallback(
    (email: string) => patchCommit((prev) => ({ ...prev, brokerEmail: email })),
    [patchCommit],
  );

  const setDeal = useCallback(
    (dealId: string, personName: string, businessName: string) =>
      patchCommit((prev) => {
        const next: ImTemplate = {
          ...prev,
          deal: dealId,
          dealName: businessName,
        };
        if (personName) {
          next.businessName = personName;
          next.sections = prev.sections.map((s) =>
            s.type === 'banner'
              ? { ...s, data: { ...s.data, businessName: personName } }
              : s,
          );
        }
        return next;
      }),
    [patchCommit],
  );

  // Generic upload (banner image or a custom section's PDF). Returns the URL.
  const uploadFile = useCallback(
    async (file: File): Promise<string | null> => {
      try {
        const fd = new FormData();
        fd.append('image', file);
        const { data } = await apiClient.post(`${BASE}/upload`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.url as string;
      } catch {
        return null;
      }
    },
    [BASE],
  );

  const togglePublish = useCallback(async () => {
    if (!template) return;
    setPublishing(true);
    try {
      const next = template.status === 'published' ? 'draft' : 'published';
      await apiClient.patch(`${BASE}/${id}/status`, { status: next });
      patch((prev) => ({
        ...prev,
        status: next,
        publishedAt: next === 'published' ? new Date().toISOString() : null,
      }));
    } finally {
      setPublishing(false);
    }
  }, [template, id, patch, BASE]);

  const handleDelete = useCallback(async () => {
    try {
      await apiClient.delete(`${BASE}/${id}`);
      router.push(config.basePath);
    } catch {
      setConfirmDelete(false);
    }
  }, [id, router, BASE, config.basePath]);

  // ── Render ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className='flex min-h-[60vh] items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin text-accent' />
      </div>
    );
  }

  if (loadError || !template) {
    return (
      <div className='mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 text-center'>
        <div className='flex items-center gap-2 border border-red-100 bg-red-50 px-5 py-4 text-red-600'>
          <AlertCircle className='h-5 w-5' />
          <span className='text-sm font-medium'>
            {loadError || 'Not found'}
          </span>
        </div>
        <Link href={config.basePath}>
          <Button variant='outline' className='rounded-none'>
            Back to list
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='-m-6'>
      {/* Saved indicator */}
      <div className='fixed right-6 top-20 z-40'>
        <SavedIndicator state={saveState} lastSavedAt={lastSavedAt} />
      </div>

      {/* Document — continuous web-page flow, edited inline */}
      <div className='min-h-[calc(100vh-3.5rem)] bg-muted/40 pb-32'>
        <div className='mx-auto max-w-4xl px-4 py-8'>
          <div
            onBlur={commit}
            className='overflow-hidden border border-border bg-card shadow-sm'
          >
            <ImDocument
              sections={template.sections}
              editable
              kind={config.kind}
              brokerEmail={template.brokerEmail}
              onSectionChange={handleSectionChange}
              onUploadFile={uploadFile}
              onCommit={commit}
            />
          </div>
        </div>
      </div>

      {/* Bottom control bar */}
      <ImControlBar
        backHref={config.basePath}
        previewHref={`${config.viewerBase}/${id}`}
        printHref={`${config.printBase}/${id}`}
        activePanel={activePanel}
        onOpenPanel={(p) => setActivePanel(p)}
        status={template.status}
        publishing={publishing}
        onTogglePublish={togglePublish}
      />

      {/* Controls drawer (right on desktop, bottom on mobile) */}
      <Drawer
        open={!!activePanel}
        onOpenChange={(o) => !o && setActivePanel(null)}
        direction={isMobile ? 'bottom' : 'right'}
      >
        <DrawerContent className='data-[vaul-drawer-direction=right]:sm:max-w-md'>
          {activePanel && (
            <DrawerHeader className='border-b border-border'>
              <DrawerTitle>{PANEL_META[activePanel].title}</DrawerTitle>
              <DrawerDescription>
                {PANEL_META[activePanel].description}
              </DrawerDescription>
            </DrawerHeader>
          )}
          <div className='flex-1 overflow-y-auto p-4'>
            {activePanel === 'sections' && (
              <SectionsPanel
                sections={template.sections}
                onMove={moveSection}
                onToggle={toggleSection}
                onRemove={removeSection}
                onDuplicate={duplicateSection}
                onAdd={addSection}
              />
            )}
            {activePanel === 'settings' && (
              <SettingsPanel
                template={template}
                isSuperAdmin={isSuperAdmin}
                onChangeBroker={setBroker}
                publishing={publishing}
                onTogglePublish={togglePublish}
                noun={config.docNoun}
                linkDeals={config.linkDeals}
                dealBusinessUnit={config.dealBusinessUnit}
                onChangeDeal={setDeal}
                onManageAccess={
                  config.linkDeals ? () => setAcquirerOpen(true) : undefined
                }
                onDelete={() => {
                  setActivePanel(null);
                  setConfirmDelete(true);
                }}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Acquirer portal access (Acquisition Reports only) */}
      {config.linkDeals && (
        <AcquirerAccessDialog
          open={acquirerOpen}
          onOpenChange={setAcquirerOpen}
          reportId={id}
          token={user?.token || ''}
        />
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-secondary/40 p-4 backdrop-blur-sm'>
          <div className='w-full max-w-sm border border-border bg-card p-6 shadow-xl'>
            <h3 className='mb-2 text-lg font-bold text-secondary'>
              Delete {config.docNoun}?
            </h3>
            <p className='mb-6 text-sm text-muted-foreground'>
              This {config.docNoun} will be removed from your list. It is
              archived (kept in the database) rather than permanently erased, so
              it can be recovered if needed.
            </p>
            <div className='flex justify-end gap-3'>
              <Button
                variant='outline'
                className='rounded-none'
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className='rounded-none bg-red-600 text-white hover:bg-red-700'
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
