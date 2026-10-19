'use client';

import { Check, CloudUpload, Loader2, AlertTriangle, RotateCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { SaveState } from '@/hooks/use-autosave';
import { LandingButton } from '@/components/landing/presentation';

export type { SaveState };

/** Reports outstanding edits and keeps save failures visible until resolved. */
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
      <div role='alert' className='flex flex-wrap items-center gap-x-3 gap-y-2 border border-red-200 bg-red-50 px-3 py-2 text-sm leading-[1.6] text-red-800'>
        <AlertTriangle aria-hidden='true' className='size-4 shrink-0' />
        <span>Not saved — your changes are still here</span>
        {onRetry && (
          <LandingButton variant='outline' size='compact' onClick={onRetry} className='border-red-700 bg-white text-red-800 hover:bg-red-100 hover:text-red-900'>
            <RotateCw aria-hidden='true' className='size-4' /> Retry
          </LandingButton>
        )}
      </div>
    );
  }

  const { icon, text, cls } =
    state === 'saving'
      ? {
          icon: <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />,
          text: 'Saving…',
          cls: 'text-ink',
        }
      : isDirty
        ? {
            icon: <CloudUpload aria-hidden='true' className='size-4' />,
            text: 'Unsaved changes',
            cls: 'text-amber-800',
          }
        : lastSavedAt
          ? {
              icon: <Check aria-hidden='true' className='size-4' />,
              text: `Saved ${formatDistanceToNow(lastSavedAt, { addSuffix: true })}`,
              cls: 'text-emerald-800',
            }
          : {
              icon: <Check aria-hidden='true' className='size-4' />,
              text: 'All changes saved',
              cls: 'text-ink',
            };

  return (
    <div role='status' aria-live='polite' aria-atomic='true' className={`flex items-center gap-2 text-sm leading-[1.6] ${cls}`}>
      {icon}<span>{text}</span>
    </div>
  );
}
