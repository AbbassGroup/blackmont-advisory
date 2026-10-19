'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2, TriangleAlert } from 'lucide-react';
import { isSlugTaken } from '@/lib/blogs';

interface BlogUrlFieldProps {
  url: string;
  setUrl: (value: string) => void;
  /** Id of the article being edited, so its own slug isn't a conflict. */
  currentId?: string;
  onAvailabilityChange: (available: boolean) => void;
  onCheckingChange: (checking: boolean) => void;
  onValidityChange: (valid: boolean) => void;
  disabled?: boolean;
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Slug input with a debounced uniqueness check.
 *
 * The backend's unique index is the real guard (it 409s on save); this just
 * surfaces the clash while the user is still editing.
 */
export default function BlogUrlField({
  url,
  setUrl,
  currentId,
  onAvailabilityChange,
  onCheckingChange,
  onValidityChange,
  disabled,
}: BlogUrlFieldProps) {
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'error'>(
    'idle',
  );

  const trimmed = url.trim();
  const isValid = trimmed.length === 0 || SLUG_RE.test(trimmed);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  useEffect(() => {
    if (!trimmed) {
      setStatus('idle');
      onCheckingChange(false);
      // An empty slug is allowed — the form falls back to slugifying the title.
      onAvailabilityChange(true);
      return;
    }

    if (!SLUG_RE.test(trimmed)) {
      setStatus('idle');
      onCheckingChange(false);
      onAvailabilityChange(false);
      return;
    }

    let cancelled = false;
    setStatus('checking');
    onCheckingChange(true);

    const timer = setTimeout(async () => {
      try {
        const taken = await isSlugTaken(trimmed, currentId);
        if (cancelled) return;
        setStatus(taken ? 'taken' : 'available');
        onAvailabilityChange(!taken);
      } catch {
        if (cancelled) return;
        // Don't block publishing on a failed lookup — the unique index still
        // catches a real clash on save.
        setStatus('error');
        onAvailabilityChange(true);
      } finally {
        if (!cancelled) onCheckingChange(false);
      }
    }, 450);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      onCheckingChange(false);
    };
  }, [trimmed, currentId, onAvailabilityChange, onCheckingChange]);

  const message = !isValid ? 'Use lowercase letters, numbers and single hyphens only.'
    : status === 'taken' ? 'This URL is already used by another blog.'
    : status === 'available' ? 'This URL is available.'
    : status === 'checking' ? 'Checking URL availability…'
    : status === 'error' ? 'Availability could not be checked. You can still try saving.'
    : 'Leave blank to generate a URL from the title.';

  return (
    <div className='flex min-w-0 flex-col gap-2'>
      <div className='flex h-10 min-w-0 items-center border border-advisory-input bg-white focus-within:border-gilt'>
        <span aria-hidden='true' className='flex h-full shrink-0 items-center border-r border-advisory-rule bg-canvas px-3 text-xs text-ink'>/resources/</span>
        <input id='blog-url' type='text' value={url} disabled={disabled} onChange={(event) => setUrl(event.target.value)}
          aria-describedby='blog-url-status' aria-invalid={!isValid || status === 'taken'} autoCapitalize='none' spellCheck={false}
          placeholder='how-to-sell-a-business' className='h-full w-full min-w-0 bg-transparent px-3 text-base text-midnight outline-none placeholder:text-ink/65 disabled:cursor-not-allowed disabled:opacity-50 min-[681px]:text-sm' />
        <span aria-hidden='true' className='flex w-9 shrink-0 items-center justify-center'>
          {status === 'checking' && <Loader2 className='size-4 animate-spin text-ink motion-reduce:animate-none' />}
          {status === 'available' && <Check className='size-4 text-emerald-800' />}
          {(status === 'taken' || !isValid) && <TriangleAlert className='size-4 text-red-800' />}
        </span>
      </div>
      <p id='blog-url-status' aria-live='polite' className={`m-0 min-h-5 text-xs leading-[1.75] ${!isValid || status === 'taken' ? 'text-red-800' : status === 'available' ? 'text-emerald-800' : 'text-ink'}`}>{message}</p>
    </div>
  );
}
