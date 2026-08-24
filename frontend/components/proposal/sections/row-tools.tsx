'use client';

import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Move/remove controls for one row of a repeatable list inside a section. */
export function RowTools({
  index,
  count,
  onMove,
  onRemove,
  minRows = 1,
  className,
  orientation = 'vertical',
  removeLabel = 'Remove',
}: {
  index: number;
  count: number;
  onMove: (index: number, dir: -1 | 1) => void;
  onRemove: (index: number) => void;
  /** Below this many rows the remove button is disabled. */
  minRows?: number;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  removeLabel?: string;
}) {
  const canRemove = count > minRows;
  return (
    <div
      className={cn(
        'flex shrink-0 gap-0.5 opacity-40 transition-opacity group-hover/row:opacity-100 focus-within:opacity-100',
        orientation === 'vertical' ? 'flex-col' : 'items-center',
        className,
      )}
    >
      <button
        type='button'
        onClick={() => onMove(index, -1)}
        disabled={index === 0}
        title='Move up'
        className='p-0.5 text-muted-foreground/70 transition hover:text-accent disabled:opacity-25 disabled:hover:text-muted-foreground/70'
      >
        <ChevronUp className='h-3.5 w-3.5' />
      </button>
      <button
        type='button'
        onClick={() => onMove(index, 1)}
        disabled={index === count - 1}
        title='Move down'
        className='p-0.5 text-muted-foreground/70 transition hover:text-accent disabled:opacity-25 disabled:hover:text-muted-foreground/70'
      >
        <ChevronDown className='h-3.5 w-3.5' />
      </button>
      <button
        type='button'
        onClick={() => onRemove(index)}
        disabled={!canRemove}
        title={canRemove ? removeLabel : `At least ${minRows} required`}
        className='p-0.5 text-muted-foreground/70 transition hover:text-red-500 disabled:opacity-25 disabled:hover:text-muted-foreground/70'
      >
        <Trash2 className='h-3.5 w-3.5' />
      </button>
    </div>
  );
}

/** Dashed "add another" affordance beneath a repeatable list. */
export function AddRowButton({
  label,
  onClick,
  disabled,
  disabledHint,
  className,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  disabledHint?: string;
  className?: string;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      title={disabled ? disabledHint : label}
      className={cn(
        'flex w-full items-center justify-center gap-1.5 border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-accent hover:bg-accent/5 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-transparent disabled:hover:text-muted-foreground',
        className,
      )}
    >
      <Plus className='h-3.5 w-3.5' /> {label}
    </button>
  );
}

/** Returns the same reference on a no-op move, so `patch` skips the undo step. */
export function moveItem<T>(items: T[], index: number, dir: -1 | 1): T[] {
  const j = index + dir;
  if (j < 0 || j >= items.length) return items;
  const next = [...items];
  [next[index], next[j]] = [next[j], next[index]];
  return next;
}
