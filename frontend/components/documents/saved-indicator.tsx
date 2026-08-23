'use client';

import {
  Check,
  CloudUpload,
  Loader2,
  AlertTriangle,
  RotateCw,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { SaveState } from '@/hooks/use-autosave';

export type { SaveState };

/**
 * Shows where the document stands, not how the last request went. "Saved" only
 * shows when nothing is outstanding, and a failure sticks around until it's
 * dealt with instead of being covered up by the next success.
 */
export function SavedIndicator({
  state,
  lastSavedAt,
  isDirty,
  onRetry,
}: {
  state: SaveState;
  lastSavedAt: Date | null;
  isDirty: boolean;
  onRetry?: () => void;
}) {
  if (state === 'error') {
    return (
      <div className='flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1.5 text-sm font-medium text-red-600 shadow-sm'>
        <AlertTriangle className='h-4 w-4' />
        <span>Not saved — your changes are still here</span>
        {onRetry && (
          <button
            type='button'
            onClick={onRetry}
            className='ml-1 inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-white transition hover:bg-red-700'
          >
            <RotateCw className='h-3 w-3' /> Retry
          </button>
        )}
      </div>
    );
  }

  const { icon, text, cls } =
    state === 'saving'
      ? {
          icon: <Loader2 className='h-4 w-4 animate-spin' />,
          text: 'Saving...',
          cls: 'border-border bg-card text-muted-foreground',
        }
      : isDirty
        ? {
            icon: <CloudUpload className='h-4 w-4' />,
            text: 'Unsaved changes',
            cls: 'border-amber-200 bg-amber-50 text-amber-700',
          }
        : lastSavedAt
          ? {
              icon: <Check className='h-4 w-4' />,
              text: `Saved ${formatDistanceToNow(lastSavedAt, { addSuffix: true })}`,
              cls: 'border-green-200 bg-green-50 text-green-600',
            }
          : {
              icon: <CloudUpload className='h-4 w-4' />,
              text: 'All changes saved',
              cls: 'border-border bg-card text-muted-foreground',
            };

  return (
    <div
      className={`pointer-events-none flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium shadow-sm transition-colors ${cls}`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
