'use client';

import { AlertCircle, Loader2 } from 'lucide-react';
import { InlineText } from '@/components/im';
import type { AcceptData, SectionChangeHandler } from './shared';

/**
 * LOCKED SECTION — the customer's way to accept.
 *
 * Removing it would leave an approved proposal with no acceptance path, so it
 * can be hidden and reworded but not deleted. In the editor it renders as a
 * disabled preview of the button.
 */
export function AcceptSection({
  data,
  editable,
  onChange,
  onAccept,
  accepting,
  acceptError,
}: {
  data: AcceptData;
  editable?: boolean;
  onChange?: SectionChangeHandler<AcceptData>;
  onAccept?: () => void;
  accepting?: boolean;
  acceptError?: string;
}) {
  return (
    <div className='relative z-20 my-10 text-center'>
      {acceptError && (
        <div className='mx-auto mb-6 flex max-w-[600px] items-center justify-center gap-2 border border-red-200 bg-red-50 p-4 text-red-700'>
          <AlertCircle className='h-5 w-5 shrink-0' />
          <span className='text-sm'>{acceptError}</span>
        </div>
      )}

      <button
        type='button'
        onClick={editable ? undefined : onAccept}
        disabled={editable || accepting}
        className='mx-auto flex min-w-[190px] items-center justify-center gap-2.5 bg-accent px-7 py-2.5 text-sm font-bold uppercase tracking-[0.14em] text-primary shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-light disabled:transform-none disabled:cursor-default disabled:opacity-70'
      >
        {accepting ? (
          <>
            <Loader2 className='h-4 w-4 animate-spin' />
            <span>Processing...</span>
          </>
        ) : editable ? (
          <InlineText
            singleLine
            editable
            value={data.buttonLabel}
            onChange={(v) => onChange?.({ buttonLabel: v })}
            placeholder='Accept Proposal'
            hideEditIcon
          />
        ) : (
          data.buttonLabel || 'Accept Proposal'
        )}
      </button>

      {accepting && (
        <p className='mt-4 text-sm text-muted-foreground'>
          Please wait while we process your proposal acceptance...
        </p>
      )}

      {(editable || data.note) && !accepting && (
        <InlineText
          as='p'
          editable={editable}
          value={data.note}
          onChange={(v) => onChange?.({ note: v })}
          placeholder='Optional note beneath the button'
          className='mx-auto mt-4 max-w-xl text-sm text-muted-foreground'
        />
      )}
    </div>
  );
}
