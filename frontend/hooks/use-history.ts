'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

export interface HistoryOptions {
  /** How many steps back you can go. Older entries fall off the bottom. */
  limit?: number;
  /** Changes sharing a coalesce key within this window become one step. */
  coalesceMs?: number;
}

export interface History<T> {
  canUndo: boolean;
  canRedo: boolean;
  /**
   * Note the state a change is about to replace. Pass a `coalesceKey` for
   * continuous edits (typing in one field) so they collapse into a single step;
   * pass `null` for a discrete action that deserves its own step.
   */
  record: (snapshot: T, coalesceKey?: string | null) => void;
  /** Step back. Hand in what's on screen; get back what to show, or null. */
  undo: (current: T) => T | null;
  /** Step forward again. */
  redo: (current: T) => T | null;
  /** Drop everything (on load, or when switching documents). */
  reset: () => void;
  /** End the open coalescing group, so the next change starts a new step. */
  close: () => void;
}

/**
 * Undo/redo over whole-document snapshots.
 *
 * Snapshots are taken by reference, not cloned — the editor builds each new
 * document immutably, reusing every untouched section, so a hundred steps of
 * history costs little more than the parts that actually changed.
 *
 * The hook holds only the past and the future; the caller owns the present.
 */
export function useHistory<T>({
  limit = 100,
  coalesceMs = 600,
}: HistoryOptions = {}): History<T> {
  const pastRef = useRef<T[]>([]);
  const futureRef = useRef<T[]>([]);
  const groupKeyRef = useRef<string | null>(null);
  const groupAtRef = useRef(0);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Cheap to call often: React skips the re-render when the value is unchanged.
  const sync = useCallback(() => {
    setCanUndo(pastRef.current.length > 0);
    setCanRedo(futureRef.current.length > 0);
  }, []);

  const close = useCallback(() => {
    groupKeyRef.current = null;
  }, []);

  const record = useCallback(
    (snapshot: T, coalesceKey: string | null = null) => {
      const now = Date.now();
      const continuing =
        coalesceKey !== null &&
        coalesceKey === groupKeyRef.current &&
        now - groupAtRef.current < coalesceMs;

      groupKeyRef.current = coalesceKey;
      groupAtRef.current = now;

      // Mid-burst: the step already holds the state this burst started from.
      if (continuing) return;

      pastRef.current.push(snapshot);
      if (pastRef.current.length > limit) pastRef.current.shift();
      // Editing after undoing abandons the branch that was undone.
      futureRef.current = [];
      sync();
    },
    [coalesceMs, limit, sync],
  );

  const undo = useCallback(
    (current: T) => {
      const snapshot = pastRef.current.pop();
      if (snapshot === undefined) return null;
      futureRef.current.push(current);
      close();
      sync();
      return snapshot;
    },
    [close, sync],
  );

  const redo = useCallback(
    (current: T) => {
      const snapshot = futureRef.current.pop();
      if (snapshot === undefined) return null;
      pastRef.current.push(current);
      close();
      sync();
      return snapshot;
    },
    [close, sync],
  );

  const reset = useCallback(() => {
    pastRef.current = [];
    futureRef.current = [];
    close();
    sync();
  }, [close, sync]);

  // Memoised so the callers that depend on it don't re-render every keystroke.
  return useMemo(
    () => ({ canUndo, canRedo, record, undo, redo, reset, close }),
    [canUndo, canRedo, record, undo, redo, reset, close],
  );
}
