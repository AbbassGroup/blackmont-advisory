'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { SavedIndicator } from './saved-indicator';
import { DocumentControlBar, type PanelKey } from './control-bar';
import { SectionsPanel } from './sections-panel';
import {
  canRemoveSection,
  isSectionLocked,
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

  // Locked sections are fixed structure — the panel disables these controls,
  // and these guards make a stray call a no-op rather than a broken contract.
  const locked = useCallback(
    (section: DocSection | undefined) =>
      !!section && isSectionLocked(config.registry, section.type),
    [config.registry],
  );

  const moveSection = useCallback(
    (index: number, dir: -1 | 1) =>
      patchCommit((prev) => {
        const j = index + dir;
        if (j < 0 || j >= prev.sections.length) return prev;
        if (locked(prev.sections[index]) || locked(prev.sections[j])) return prev;
        const sections = [...prev.sections];
        [sections[index], sections[j]] = [sections[j], sections[index]];
        return { ...prev, sections } as T;
      }),
    [patchCommit, locked],
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
        if (!src || locked(src)) return prev;
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
    [patchCommit, config, locked],
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
    if (!doc || !config.runStatusAction) return;
    setStatusBusy(true);
    try {
      // Save pending edits first so we don't publish a stale document.
      await flush();
      await config.runStatusAction(doc, { id, ...editorUser, flush, patchLocal });
    } finally {
      setStatusBusy(false);
    }
  }, [doc, config, id, editorUser, flush, patchLocal]);

  const handleDelete = useCallback(async () => {
    try {
      await apiClient.delete(`${BASE}/${id}`);
      // Already archived, so don't let the save-on-exit put it back.
      if (docRef.current) adoptSaved(docRef.current);
      router.push(config.basePath);
    } catch {
      setConfirmDelete(false);
    }
  }, [id, router, BASE, config.basePath, adoptSaved]);

  // ── Render ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className='flex min-h-[60vh] items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin text-accent' />
      </div>
    );
  }

  if (loadError || !doc) {
    return (
      <div className='mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 text-center'>
        <div className='flex items-center gap-2 border border-red-100 bg-red-50 px-5 py-4 text-red-600'>
          <AlertCircle className='h-5 w-5' />
          <span className='text-sm font-medium'>{loadError || 'Not found'}</span>
        </div>
        <Link href={config.basePath}>
          <Button variant='outline' className='rounded-none'>
            Back to list
          </Button>
        </Link>
      </div>
    );
  }

  const { Document, Settings, Extras } = config;

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
            <Document
              doc={doc}
              sections={doc.sections}
              editable
              onSectionChange={handleSectionChange}
              onUploadFile={uploadFile}
              onCommit={commit}
            />
          </div>
        </div>
      </div>

      {/* Bottom control bar */}
      <DocumentControlBar
        backHref={config.basePath}
        previewHref={
          config.previewHref
            ? config.previewHref(doc, id)
            : config.viewerBase
              ? `${config.viewerBase}/${id}`
              : null
        }
        printHref={config.printBase ? `${config.printBase}/${id}` : null}
        activePanel={activePanel}
        onOpenPanel={(p) => setActivePanel(p)}
        statusAction={statusAction}
        statusBusy={statusBusy}
        onStatusAction={() => void runStatusAction()}
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
                sections={doc.sections}
                registry={config.registry}
                onMove={moveSection}
                onToggle={toggleSection}
                onRemove={removeSection}
                onDuplicate={duplicateSection}
                onAdd={addSection}
              />
            )}
            {activePanel === 'settings' && (
              <Settings
                doc={doc}
                isSuperAdmin={isSuperAdmin}
                onPatch={patchCommit}
                busy={statusBusy}
                onStatusAction={() => void runStatusAction()}
                onOpenExtra={(key) => {
                  setActivePanel(null);
                  setOpenExtra(key);
                }}
                onDelete={() => {
                  setActivePanel(null);
                  setConfirmDelete(true);
                }}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Product-specific dialogs — siblings of the drawer, not children */}
      {Extras && (
        <Extras
          doc={doc}
          id={id}
          openKey={openExtra}
          onClose={() => setOpenExtra(null)}
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
              {config.deleteWarning ?? (
                <>
                  This {config.docNoun} will be removed from your list. It is
                  archived (kept in the database) rather than permanently erased,
                  so it can be recovered if needed.
                </>
              )}
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
