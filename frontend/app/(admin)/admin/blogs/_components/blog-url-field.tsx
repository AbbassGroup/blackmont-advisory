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

  return (
    <div className='space-y-1.5'>
      <div className='flex items-center border border-border bg-background focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15'>
        <span className='shrink-0 border-r border-border px-3 py-2.5 text-xs text-muted-foreground'>
          /resources/
        </span>
        <input
          type='text'
          value={url}
          disabled={disabled}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='how-to-sell-a-business'
          className='h-11 w-full bg-transparent px-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60'
        />
        <span className='flex w-9 shrink-0 items-center justify-center'>
          {status === 'checking' && (
            <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
          )}
          {status === 'available' && <Check className='h-4 w-4 text-emerald-600' />}
          {status === 'taken' && <TriangleAlert className='h-4 w-4 text-red-500' />}
        </span>
      </div>

      {!isValid && (
        <p className='text-xs text-red-500'>
          Use lowercase letters, numbers and single hyphens only.
        </p>
      )}
      {isValid && status === 'taken' && (
        <p className='text-xs text-red-500'>This URL is already used by another blog.</p>
      )}
      {isValid && status === 'available' && (
        <p className='text-xs text-emerald-600'>This URL is available.</p>
      )}
      {isValid && status === 'idle' && !trimmed && (
        <p className='text-xs text-muted-foreground'>
          Leave blank to generate one from the title.
        </p>
      )}
    </div>
  );
}
