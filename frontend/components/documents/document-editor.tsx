'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, X } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAutosave } from '@/hooks/use-autosave';
import { useHistory } from '@/hooks/use-history';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingTheme } from '@/components/landing/landing-theme';
import { landingFontVariables } from '@/components/landing/fonts';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { SavedIndicator } from './saved-indicator';
import { DocumentControlBar, DocumentControlBarSkeleton, type PanelKey } from './control-bar';
import { SectionsPanel } from './sections-panel';
import {
  canRemoveSection,
  sectionInsertIndex,
  type DocSection,
  type DocumentKindConfig,
  type EditorDocument,
  type EditorUser,
  type RawSectionData,
  type SectionPatch,
} from './types';

const PANEL_META: Record<PanelKey, { title: string; description: string }> = {
  sections: {
    title: 'Sections',
    description: 'Add, reorder, hide or remove sections.',
  },
  settings: { title: 'Settings', description: 'Document details and status.' },
};

const EDITOR_CLASS = '-m-6 min-w-0 bg-canvas text-sm min-[681px]:text-sm';
const EDITOR_HEADER_CLASS = 'mx-auto flex max-w-advisory flex-wrap items-center justify-between gap-4 px-4 py-6 min-[681px]:px-6';
const EDITOR_TITLE_CLASS = 'm-0 font-advisory-heading text-[26px] leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:text-[30px]';
const EDITOR_CANVAS_CLASS = 'min-h-[calc(100vh-3.5rem)] bg-canvas px-4 pt-8 pb-[calc(7rem+env(safe-area-inset-bottom))] min-[681px]:px-6';

/**
 * The shared editor for every section-based document: Information Memorandums,
 * Acquisition Reports and Digital Proposals.
 *
 * Everything product-specific — the section registry, the renderer, the settings
 * drawer, what the status button does — arrives in `config`. What lives here is
 * the machinery all three need: load, autosave, undo/redo, and the section
 * operations.
 */
export function DocumentEditor<T extends EditorDocument>({
  config,
}: {
  config: DocumentKindConfig<T>;
}) {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { user } = useAdminAuth();
  const isMobile = useIsMobile();
  const BASE = config.apiBase;

  const editorUser: EditorUser = useMemo(
    () => ({
      username: user?.user?.username ?? '',
      email: user?.user?.email ?? '',
      isSuperAdmin: user?.user?.role === 'superadmin',
    }),
    [user],
  );
  const { isSuperAdmin } = editorUser;

  const [doc, setDoc] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const [statusBusy, setStatusBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [openExtra, setOpenExtra] = useState<string | null>(null);

  const docRef = useRef<T | null>(null);
  // The load effect reads the config through a ref so that a config rebuilt
  // mid-session (its closure captures state that arrives late, like the signed-in
  // user) can't retrigger the fetch and throw away unsaved edits.
  const configRef = useRef(config);
  configRef.current = config;

  // One PUT at a time. Overlapping saves used to let an older copy land last
  // and quietly undo newer edits, even though every request came back OK.
  const saveDoc = useCallback(
    async (snapshot: T) => {
      await apiClient.put(`${BASE}/${id}`, config.toSavePayload(snapshot, editorUser));
    },
    [id, BASE, config, editorUser],
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
  } = useAutosave<T>({ save: saveDoc });

  const {
    canUndo,
    canRedo,
    record: recordHistory,
    undo: undoHistory,
    redo: redoHistory,
    reset: resetHistory,
    close: closeHistory,
  } = useHistory<T>();

  // Blur ends a typing burst, so the next keystroke starts a fresh undo step.
  const commit = useCallback(() => {
    closeHistory();
    commitSave();
  }, [closeHistory, commitSave]);

  // ── Load ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    let active = true;
    const cfg = configRef.current;
    apiClient
      .get(`${BASE}/${id}`)
      .then(({ data }) => {
        if (!active) return;
        // Ensure every section has a stable client id for React keys/identity.
        const sections: DocSection[] = (data.sections ?? []).map(
          (s: DocSection) => ({
            ...s,
            uid: s.uid || s._id || cfg.makeUid(s.type),
          }),
        );
        const loaded = { ...data, sections } as T;
        docRef.current = loaded;
        setDoc(loaded);
        adoptSaved(loaded);
        resetHistory();
      })
      .catch((e) => {
        if (!active) return;
        setLoadError(
          e?.response?.status === 403
            ? `You do not have access to this ${cfg.docNoun}.`
            : `Failed to load this ${cfg.docNoun}.`,
        );
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id, BASE, adoptSaved, resetHistory]);

  // ── Mutators ──────────────────────────────────────────────────────────────
  // `patch` updates the preview and flags the change as unsaved. The save
  // itself comes from `commit` (on blur, or a discrete action like reorder or
  // toggle) or from the idle timer, so an edit that never blurs isn't lost.
  const patch = useCallback(
    (
      updater: (prev: T) => T,
      // Continuous edits (typing in one field) share a key and collapse into a
      // single undo step. `null` — every discrete action — gets its own.
      coalesceKey: string | null = null,
    ) => {
      const prev = docRef.current;
      if (!prev) return;
      const next = updater(prev);
      // Updaters bail out by returning `prev` (moving the first section up, say).
      if (next === prev) return;
      recordHistory(prev, coalesceKey);
      docRef.current = next;
      setDoc(next);
      trackChange(next);
    },
    [trackChange, recordHistory],
  );

  // Same, but for things the PUT doesn't send — status has its own endpoint,
  // so don't flag the document as unsaved.
  const patchLocal = useCallback(
    (updater: (prev: T) => T) => {
      const prev = docRef.current;
      if (!prev) return;
      const next = updater(prev);
      docRef.current = next;
      setDoc(next);
      syncSnapshot(next);
    },
    [syncSnapshot],
  );

  const patchCommit = useCallback(
    (updater: (prev: T) => T) => {
      patch(updater);
      commit();
    },
    [patch, commit],
  );

  const handleSectionChange = useCallback(
    (index: number, p: SectionPatch) => {
      const current = docRef.current;
      const target = current?.sections[index];
      if (!current || !target) return;
      // Resolve against the section's current data, not a render-old copy.
      // `patch` reads the same `docRef` on the next line, so this sees exactly
      // the state the change will be applied to.
      const data = target.data ?? {};
      const applied = (typeof p === 'function' ? p(data) : p) as RawSectionData;
      // Typing in one field is one undo step; moving to another field — or
      // another section — starts the next one.
      const key = `${index}:${Object.keys(applied).sort().join(',')}`;
      patch((prev) => {
        const sections = prev.sections.map((s, i) =>
          i === index ? { ...s, data: { ...data, ...applied } } : s,
        );
        const extra = config.mirrorSectionFields?.(target, applied) ?? {};
        // Respreading a generic `T` narrows `sections` to the constraint's
        // element type, so cast back — these are the same objects either way.
        return { ...prev, sections, ...extra } as T;
      }, key);
    },
    [patch, config],
  );

  // ── Undo / redo ───────────────────────────────────────────────────────────
  const applySnapshot = useCallback(
    (snapshot: T) => {
      docRef.current = snapshot;
      setDoc(snapshot);
      // Stepping back is itself an edit — it saves like any other change.
      trackChange(snapshot);
    },
    [trackChange],
  );

  // InlineText keeps the focused field uncontrolled so the caret stays put,
  // which also means it won't repaint under us. Blurring first makes the
  // restored text show up, and flushes that field's own edit into history.
  const step = useCallback(
    (take: (current: T) => T | null) => {
      (document.activeElement as HTMLElement | null)?.blur?.();
      const current = docRef.current;
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
        return { ...prev, sections } as T;
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
      }) as T),
    [patchCommit],
  );

  const removeSection = useCallback(
    (index: number) =>
      patchCommit((prev) => {
        if (!canRemoveSection(config.registry, prev.sections, index)) return prev;
        return { ...prev, sections: prev.sections.filter((_, i) => i !== index) } as T;
      }),
    [patchCommit, config.registry],
  );

  const addSection = useCallback(
    (type: string) =>
      patchCommit((prev) => {
        // Slot it in where the registry says it reads, rather than dropping it
        // at the very bottom for the user to walk back up the document.
        const sections = [...prev.sections];
        sections.splice(
          sectionInsertIndex(config.registry, sections, type),
          0,
          config.makeDefaultSection(type),
        );
        return { ...prev, sections } as T;
      }),
    [patchCommit, config],
  );

  const duplicateSection = useCallback(
    (index: number) =>
      patchCommit((prev) => {
        const src = prev.sections[index];
        if (!src) return prev;
        const copy: DocSection = {
          ...src,
          _id: undefined,
          uid: config.makeUid(src.type),
          data: JSON.parse(JSON.stringify(src.data ?? {})),
        };
        const sections = [...prev.sections];
        sections.splice(index + 1, 0, copy);
        return { ...prev, sections } as T;
      }),
    [patchCommit, config],
  );

  // Generic upload (banner image, photo, PDF). Returns the URL.
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

  // ── Status action (publish / submit for approval / approve) ───────────────
  const statusAction = useMemo(
    () => (doc && config.statusAction ? config.statusAction(doc, isSuperAdmin) : null),
    [doc, config, isSuperAdmin],
  );

  const runStatusAction = useCallback(async () => {
    if (!doc || !config.runStatusAction || statusBusy) return;
    setStatusError('');
    setStatusBusy(true);
    try {
      // Save pending edits first so we don't publish a stale document.
      await flush();
      await config.runStatusAction(doc, { id, ...editorUser, flush, patchLocal });
    } catch {
      setStatusError('We could not update the status. Check the save indicator and try again.');
    } finally {
      setStatusBusy(false);
    }
  }, [doc, config, id, editorUser, flush, patchLocal, statusBusy]);

  const handleDelete = useCallback(async () => {
    if (deleteBusy) return;
    setDeleteBusy(true);
    setDeleteError('');
    try {
      await apiClient.delete(`${BASE}/${id}`);
      // Already archived, so don't let the save-on-exit put it back.
      if (docRef.current) adoptSaved(docRef.current);
      router.push(config.basePath);
    } catch {
      setDeleteError(`Could not delete this ${config.docNoun}. Please try again.`);
    } finally {
      setDeleteBusy(false);
    }
  }, [id, router, BASE, config.basePath, config.docNoun, adoptSaved, deleteBusy]);

  // ── Render ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <LandingTheme aria-busy='true' className={EDITOR_CLASS}>
        <p role='status' className='sr-only'>Loading document.</p>
        <header className={EDITOR_HEADER_CLASS}>
          <h1 className={EDITOR_TITLE_CLASS}>Edit {config.docNoun}</h1>
          <div aria-hidden='true' className='h-[23px] w-40 animate-pulse bg-advisory-rule/60 motion-reduce:animate-none' />
        </header>
        <div aria-hidden='true' className={EDITOR_CANVAS_CLASS}>
          <div className='mx-auto max-w-4xl overflow-hidden border border-advisory-rule bg-white'>
            <div className={cn('relative flex flex-col bg-advisory-rule/30', config.kind === 'proposal' ? 'min-h-[600px] px-7 pt-24 pb-9 sm:min-h-[780px] sm:px-16 sm:pt-32 sm:pb-14' : 'min-h-[340px] px-6 py-10 sm:min-h-[460px] sm:px-14 sm:py-12')}>
              <div className='absolute top-5 right-5 h-7 w-28 animate-pulse bg-advisory-rule motion-reduce:animate-none' />
              {config.kind !== 'proposal' && <div className='h-10 w-56 max-w-[65%] animate-pulse bg-advisory-rule motion-reduce:animate-none' />}
              <div className='mt-auto space-y-4'>
                <div className='h-5 w-44 max-w-[65%] animate-pulse bg-advisory-rule motion-reduce:animate-none' />
                <div className='h-10 w-3/4 animate-pulse bg-advisory-rule motion-reduce:animate-none sm:h-16' />
                <div className='h-7 w-1/2 animate-pulse bg-advisory-rule motion-reduce:animate-none' />
              </div>
              {config.kind === 'proposal' && <div className='mt-10 flex gap-8 border-t border-advisory-rule pt-5 sm:mt-14 sm:pt-6'>{[0, 1, 2].map((index) => <div key={index} className='h-10 w-1/4 animate-pulse bg-advisory-rule motion-reduce:animate-none' />)}</div>}
            </div>
          </div>
        </div>
        <DocumentControlBarSkeleton hasPreview={Boolean(config.previewHref || config.viewerBase)} hasPrint={Boolean(config.printBase)} hasStatus={Boolean(config.statusAction)} />
      </LandingTheme>
    );
  }

  if (loadError || !doc) {
    return (
      <AdminPageLayout title={`Edit ${config.docNoun}`} description='Your document could not be opened.'>
        <section role='alert' className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
          <p className='mt-0 mb-5 text-sm leading-[1.75] text-ink'>{loadError || 'Not found'}</p>
          <LandingButtonLink href={config.basePath} variant='outline' size='compact'>Back to list</LandingButtonLink>
        </section>
      </AdminPageLayout>
    );
  }

  const { Document, Settings, Extras } = config;

  return (
    <LandingTheme className={EDITOR_CLASS}>
      <header className={EDITOR_HEADER_CLASS}>
        <h1 className={EDITOR_TITLE_CLASS}>
          Edit {config.docNoun}
        </h1>
        <SavedIndicator state={saveState} lastSavedAt={lastSavedAt} isDirty={isDirty} onRetry={() => void flush()} />
      </header>
      {statusError && <p role='alert' className='mx-4 mt-0 mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm leading-[1.75] text-red-800 min-[681px]:mx-6'>{statusError}</p>}

      <DocumentControlBar
        backHref={config.basePath}
        previewHref={
          config.previewHref
            ? config.previewHref(doc, id)
            : config.viewerBase ? `${config.viewerBase}/${id}` : null
        }
        printHref={config.printBase ? `${config.printBase}/${id}` : null}
        printLabel={config.printLabel}
        printIcon={config.printIcon}
        activePanel={activePanel}
        onOpenPanel={(panel) => setActivePanel(panel)}
        statusAction={statusAction}
        statusBusy={statusBusy}
        onStatusAction={() => void runStatusAction()}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
      />

      {/* Keep the document's own presentation separate from the editor controls. */}
      <div className={EDITOR_CANVAS_CLASS}>
        <div className='mx-auto max-w-4xl'>
          <div onBlur={commit} className='overflow-hidden border border-advisory-rule bg-white font-sans text-base leading-[1.6]'>
            <Document doc={doc} sections={doc.sections} editable onSectionChange={handleSectionChange} onUploadFile={uploadFile} onCommit={commit} />
          </div>
        </div>
      </div>

      <Drawer open={Boolean(activePanel)} onOpenChange={(open) => !open && setActivePanel(null)} direction={isMobile ? 'bottom' : 'right'}>
        <DrawerContent
          className={cn(
            landingFontVariables,
            'border-advisory-rule bg-white font-advisory-body text-sm text-ink data-[vaul-drawer-direction=bottom]:max-h-[85dvh] data-[vaul-drawer-direction=bottom]:rounded-t-none data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:rounded-l-none data-[vaul-drawer-direction=right]:sm:max-w-[440px]',
          )}
        >
          {activePanel && (
            <DrawerHeader className='relative shrink-0 border-b border-advisory-rule p-6 pr-16 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-left'>
              <DrawerTitle className='font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>{PANEL_META[activePanel].title}</DrawerTitle>
              <DrawerDescription className='mt-2 text-sm leading-[1.75] text-ink'>{PANEL_META[activePanel].description}</DrawerDescription>
              <DrawerClose asChild>
                <button type='button' aria-label='Close panel' className='absolute top-5 right-4 inline-flex size-10 cursor-pointer items-center justify-center border border-transparent text-midnight transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none'>
                  <X aria-hidden='true' className='size-4' />
                </button>
              </DrawerClose>
            </DrawerHeader>
          )}
          <div className={cn('min-h-0 flex-1 overflow-y-auto', activePanel === 'sections' ? 'p-5' : 'p-6')}>
            {activePanel === 'sections' && (
              <SectionsPanel sections={doc.sections} registry={config.registry} onMove={moveSection} onToggle={toggleSection} onRemove={removeSection} onDuplicate={duplicateSection} onAdd={addSection} />
            )}
            {activePanel === 'settings' && (
              <Settings
                doc={doc}
                isSuperAdmin={isSuperAdmin}
                onPatch={patchCommit}
                busy={statusBusy}
                onStatusAction={() => void runStatusAction()}
                onOpenExtra={(key) => { setActivePanel(null); setOpenExtra(key); }}
                onDelete={() => { setActivePanel(null); setDeleteError(''); setConfirmDelete(true); }}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {Extras && <Extras doc={doc} id={id} openKey={openExtra} onClose={() => setOpenExtra(null)} />}

      <Dialog open={confirmDelete} onOpenChange={(open) => { if (!deleteBusy) setConfirmDelete(open); }}>
        <DialogContent
          showCloseButton={false}
          className={cn(landingFontVariables, 'max-h-[85dvh] overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-midnight ring-0 sm:max-w-[460px] min-[681px]:p-8')}
        >
          <DialogHeader>
            <DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>Delete {config.docNoun}?</DialogTitle>
            <DialogDescription className='mt-3 text-sm leading-[1.8] text-ink'>
              {config.deleteWarning ?? <>This {config.docNoun} will be removed from your list. It is archived (kept in the database) rather than permanently erased, so it can be recovered if needed.</>}
            </DialogDescription>
          </DialogHeader>
          {deleteError && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{deleteError}</p>}
          <div className='flex flex-wrap justify-end gap-3'>
            <LandingButton variant='outline' size='compact' disabled={deleteBusy} onClick={() => setConfirmDelete(false)}>Cancel</LandingButton>
            <LandingButton size='compact' onClick={() => void handleDelete()} disabled={deleteBusy} className='border-red-700 bg-red-700 text-white hover:bg-red-800'>
              {deleteBusy ? <><Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> Deleting…</> : 'Delete'}
            </LandingButton>
          </div>
        </DialogContent>
      </Dialog>
    </LandingTheme>
  );
}
