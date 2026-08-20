'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAutosave } from '@/hooks/use-autosave';
import { useHistory } from '@/hooks/use-history';
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
  type RawSectionData,
  type ReportKindConfig,
  type SectionPatch,
  type SectionType,
} from '@/components/im';
import { AcquirerAccessDialog } from '@/components/admin/acquirer-access-dialog';
import { SavedIndicator } from './saved-indicator';
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
  const [publishing, setPublishing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [acquirerOpen, setAcquirerOpen] = useState(false);

  const templateRef = useRef<ImTemplate | null>(null);

  // One PUT at a time. Overlapping saves used to let an older copy land last
  // and quietly undo newer edits, even though every request came back OK.
  const saveTemplate = useCallback(
    async (snapshot: ImTemplate) => {
      // brokerEmail is always sent; the backend only applies a broker change
      // when the user is a superadmin.
      await apiClient.put(`${BASE}/${id}`, {
        businessName: snapshot.businessName,
        brokerEmail: snapshot.brokerEmail,
        sections: snapshot.sections,
        // Acquisition Reports only; ignored by the IM backend.
        deal: snapshot.deal,
        dealName: snapshot.dealName,
      });
    },
    [id, BASE],
  );

  const {
    state: saveState,
    lastSavedAt,
    isDirty,
    update: trackChange,
    reset: adoptSaved,
    sync: syncSnapshot,
    commit: commitSave,
    flush,
  } = useAutosave<ImTemplate>({ save: saveTemplate });

  const {
    canUndo,
    canRedo,
    record: recordHistory,
    undo: undoHistory,
    redo: redoHistory,
    reset: resetHistory,
    close: closeHistory,
  } = useHistory<ImTemplate>();

  // Blur ends a typing burst, so the next keystroke starts a fresh undo step.
  const commit = useCallback(() => {
    closeHistory();
    commitSave();
  }, [closeHistory, commitSave]);

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
        adoptSaved(loaded);
        resetHistory();
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
  }, [id, BASE, config.docNoun, adoptSaved, resetHistory]);

  // ── Mutators ──────────────────────────────────────────────────
  // `patch` updates the preview and flags the change as unsaved. The save
  // itself comes from `commit` (on blur, or a discrete action like reorder or
  // toggle) or from the idle timer, so an edit that never blurs isn't lost.
  const patch = useCallback(
    (
      updater: (prev: ImTemplate) => ImTemplate,
      // Continuous edits (typing in one field) share a key and collapse into a
      // single undo step. `null` — every discrete action — gets its own.
      coalesceKey: string | null = null,
    ) => {
      const prev = templateRef.current;
      if (!prev) return;
      const next = updater(prev);
      // Updaters bail out by returning `prev` (moving the first section up, say).
      if (next === prev) return;
      recordHistory(prev, coalesceKey);
      templateRef.current = next;
      setTemplate(next);
      trackChange(next);
    },
    [trackChange, recordHistory],
  );

  // Same, but for things the PUT doesn't send — publish status has its own
  // endpoint, so don't flag the document as unsaved.
  const patchLocal = useCallback(
    (updater: (prev: ImTemplate) => ImTemplate) => {
      const prev = templateRef.current;
      if (!prev) return;
      const next = updater(prev);
      templateRef.current = next;
      setTemplate(next);
      syncSnapshot(next);
    },
    [syncSnapshot],
  );

  const patchCommit = useCallback(
    (updater: (prev: ImTemplate) => ImTemplate) => {
      patch(updater);
      commit();
    },
    [patch, commit],
  );

  const handleSectionChange = useCallback(
    (index: number, p: SectionPatch<RawSectionData>) => {
      const current = templateRef.current;
      const target = current?.sections[index];
      if (!current || !target) return;
      // Resolve against the section's current data, not a render-old copy.
      // `patch` reads the same `templateRef` on the next line, so this sees
      // exactly the state the change will be applied to.
      const data = target.data ?? {};
      const applied = typeof p === 'function' ? p(data) : p;
      // Typing in one field is one undo step; moving to another field — or
      // another section — starts the next one.
      const key = `${index}:${Object.keys(applied).sort().join(',')}`;
      patch(
        (prev) => {
          const sections = prev.sections.map((s, i) =>
            i === index ? { ...s, data: { ...data, ...applied } } : s,
          );
          const extra: Partial<ImTemplate> = {};
          if (
            target.type === 'banner' &&
            typeof applied.businessName === 'string'
          ) {
            extra.businessName = applied.businessName;
          }
          if (
            target.type === 'welcome' &&
            typeof applied.brokerEmail === 'string'
          ) {
            extra.brokerEmail = applied.brokerEmail;
          }
          return { ...prev, sections, ...extra };
        },
        key,
      );
    },
    [patch],
  );

  // ── Undo / redo ─────────────────────────────────────────────────────────────
  const applySnapshot = useCallback(
    (snapshot: ImTemplate) => {
      templateRef.current = snapshot;
      setTemplate(snapshot);
      // Stepping back is itself an edit — it saves like any other change.
      trackChange(snapshot);
    },
    [trackChange],
  );

  // InlineText keeps the focused field uncontrolled so the caret stays put,
  // which also means it won't repaint under us. Blurring first makes the
  // restored text show up, and flushes that field's own edit into history.
  const step = useCallback(
    (take: (current: ImTemplate) => ImTemplate | null) => {
      (document.activeElement as HTMLElement | null)?.blur?.();
      const current = templateRef.current;
      if (!current) return;
      const snapshot = take(current);
      if (!snapshot) return;
      applySnapshot(snapshot);
      // A discrete action, so persist it now rather than on the idle timer.
      commit();
    },
    [applySnapshot, commit],
  );

  const undo = useCallback(() => step(undoHistory), [step, undoHistory]);
  const redo = useCallback(() => step(redoHistory), [step, redoHistory]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) return;
      const key = e.key.toLowerCase();
      if (key !== 'z' && key !== 'y') return;
      // Rich-text blocks carry their own history (TipTap), so leave undo to
      // them while the caret is inside one.
      const target = e.target as HTMLElement | null;
      if (e.defaultPrevented || target?.closest?.('.ProseMirror')) return;
      e.preventDefault();
      if (key === 'y' || e.shiftKey) redo();
      else undo();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [undo, redo]);

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
      // Save pending edits first so we don't publish a stale document.
      await flush();
      const next = template.status === 'published' ? 'draft' : 'published';
      await apiClient.patch(`${BASE}/${id}/status`, { status: next });
      patchLocal((prev) => ({
        ...prev,
        status: next,
        publishedAt: next === 'published' ? new Date().toISOString() : null,
      }));
    } finally {
      setPublishing(false);
    }
  }, [template, id, patchLocal, flush, BASE]);

  const handleDelete = useCallback(async () => {
    try {
      await apiClient.delete(`${BASE}/${id}`);
      // Already archived, so don't let the save-on-exit put it back.
      if (templateRef.current) adoptSaved(templateRef.current);
      router.push(config.basePath);
    } catch {
      setConfirmDelete(false);
    }
  }, [id, router, BASE, config.basePath, adoptSaved]);

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
        <SavedIndicator
          state={saveState}
          lastSavedAt={lastSavedAt}
          isDirty={isDirty}
          onRetry={() => void flush()}
        />
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
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
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
