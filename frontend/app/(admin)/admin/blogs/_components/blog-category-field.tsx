'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCategoryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  /** Categories already in use, offered as suggestions. */
  options: string[];
  disabled?: boolean;
}

/**
 * Category picker: choose one already in use, or type a new one.
 *
 * Categories aren't a managed list on the backend — they're a free-text field on
 * the article — so this suggests what other articles already use rather than
 * constraining the choice.
 */
export default function BlogCategoryCombobox({
  value,
  onChange,
  options,
  disabled,
}: BlogCategoryComboboxProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close when focus or a click leaves the field.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as globalThis.Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  const query = value.trim().toLowerCase();
  const matches = options.filter((option) => option.toLowerCase().includes(query));
  const isNew =
    value.trim().length > 0 &&
    !options.some((option) => option.toLowerCase() === query);

  return (
    <div className='space-y-2'>
      <div>
        <label className='text-sm font-medium text-secondary'>Category</label>
        <p className='mt-0.5 text-xs text-muted-foreground'>
          Pick an existing category or type a new one.
        </p>
      </div>

      <div ref={wrapperRef} className='relative'>
        <input
          type='text'
          value={value}
          disabled={disabled}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
          placeholder='e.g. Selling a Business'
          className='h-11 w-full border border-border bg-background px-4 pr-10 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-60'
        />
        <button
          type='button'
          tabIndex={-1}
          disabled={disabled}
          onClick={() => setOpen((prev) => !prev)}
          className='absolute right-0 top-0 flex h-11 w-10 items-center justify-center text-muted-foreground'
        >
          <ChevronDown className='h-4 w-4' />
        </button>

        {open && (matches.length > 0 || isNew) && (
          <div className='absolute z-30 mt-1 max-h-56 w-full overflow-y-auto border border-border bg-card shadow-lg'>
            {isNew && (
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-accent transition-colors hover:bg-muted'
              >
                <Plus className='h-3.5 w-3.5 shrink-0' />
                Use &ldquo;{value.trim()}&rdquo;
              </button>
            )}
            {matches.map((option) => (
              <button
                key={option}
                type='button'
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className='flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-muted'
              >
                <span className='truncate'>{option}</span>
                {option.toLowerCase() === query && (
                  <Check className={cn('h-3.5 w-3.5 shrink-0 text-accent')} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
