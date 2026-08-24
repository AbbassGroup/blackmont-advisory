'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export interface AutosaveOptions<T> {
  save: (snapshot: T) => Promise<void>;
  debounceMs?: number;
  retries?: number;
  retryDelayMs?: number;
  warnOnUnload?: boolean;
}

export interface Autosave<T> {
  state: SaveState;
  lastSavedAt: Date | null;
  isDirty: boolean;
  update: (snapshot: T) => void;
  reset: (snapshot: T) => void;
  sync: (snapshot: T) => void;
  commit: () => void;
  flush: () => Promise<void>;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export function useAutosave<T>({
  save,
  debounceMs = 2000,
  retries = 3,
  retryDelayMs = 800,
  warnOnUnload = true,
}: AutosaveOptions<T>): Autosave<T> {
  const snapshotRef = useRef<T | null>(null);
  const dirtyRef = useRef(false);
  const inflightRef = useRef<Promise<void> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [state, setState] = useState<SaveState>('idle');
  const [isDirty, setIsDirty] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // Held in a ref so the callbacks below stay stable.
  const saveRef = useRef(save);
  useEffect(() => {
    saveRef.current = save;
  });

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const markDirty = useCallback((dirty: boolean) => {
    dirtyRef.current = dirty;
    setIsDirty(dirty);
  }, []);

  // Keeps saving until nothing is left, rather than starting a second request.
  const cycle = useCallback(async () => {
    setState('saving');
    try {
      while (dirtyRef.current && snapshotRef.current != null) {
        const snapshot = snapshotRef.current;
        markDirty(false); // a change after this point loops us round again

        for (let attempt = 0; ; attempt += 1) {
          try {
            await saveRef.current(snapshot);
            break;
          } catch (error) {
            if (attempt >= retries) {
              // Leave it queued so it can be retried later.
              markDirty(true);
              throw error;
            }
            await sleep(retryDelayMs * 2 ** attempt);
          }
        }

        setLastSavedAt(new Date());
      }
      setState('saved');
    } catch {
      setState('error');
    }
  }, [markDirty, retries, retryDelayMs]);

  const run = useCallback((): Promise<void> => {
    // Already saving — hand back that promise; it'll pick up the new changes.
    if (inflightRef.current) return inflightRef.current;
    if (!dirtyRef.current || snapshotRef.current == null) return Promise.resolve();

    const promise = cycle().finally(() => {
      inflightRef.current = null;
    });
    inflightRef.current = promise;
    return promise;
  }, [cycle]);

  const update = useCallback(
    (snapshot: T) => {
      snapshotRef.current = snapshot;
      markDirty(true);
      if (debounceMs > 0) {
        clearTimer();
        timerRef.current = setTimeout(() => {
          timerRef.current = null;
          void run();
        }, debounceMs);
      }
    },
    [clearTimer, debounceMs, markDirty, run],
  );

  const sync = useCallback((snapshot: T) => {
    snapshotRef.current = snapshot;
  }, []);

  const reset = useCallback(
    (snapshot: T) => {
      clearTimer();
      snapshotRef.current = snapshot;
      markDirty(false);
    },
    [clearTimer, markDirty],
  );

  const commit = useCallback(() => {
    clearTimer();
    if (!dirtyRef.current) return;
    void run();
  }, [clearTimer, run]);

  const flush = useCallback(async () => {
    clearTimer();
    await run();
    // A change may have snuck in as the save was finishing.
    if (dirtyRef.current) await run();
  }, [clearTimer, run]);

  // Last chance to save on mobile, which can drop a backgrounded tab silently.
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') void run();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [run]);

  useEffect(() => {
    if (!warnOnUnload) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirtyRef.current && !inflightRef.current) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [warnOnUnload]);

  // Save on the way out. Via a ref so this only fires on unmount.
  const runRef = useRef(run);
  useEffect(() => {
    runRef.current = run;
  });
  useEffect(
    () => () => {
      clearTimeout(timerRef.current ?? undefined);
      void runRef.current();
    },
    [],
  );

  return { state, lastSavedAt, isDirty, update, reset, sync, commit, flush };
}
