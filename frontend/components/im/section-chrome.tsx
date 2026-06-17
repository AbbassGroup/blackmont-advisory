'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { InlineText } from './inline-text';

/**
 * Full-width band for a section, matching the marketing site's rhythm
 * (alternating white / off-white). The anchor id lives here for the preview
 * scroll-spy. Banner renders outside this shell (full-bleed).
 */
export function SectionShell({
  id,
  tone = 'white',
  className,
  children,
}: {
  id?: string;
  tone?: 'white' | 'offwhite';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 px-5 py-9 sm:px-12 sm:py-14',
        tone === 'offwhite' ? 'bg-brand-offwhite' : 'bg-white',
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Semibold, tight section title. Inline-editable in the editor. */
export function SectionHeading({
  title,
  editable,
  onChange,
  placeholder = 'Section title',
  className,
}: {
  title: string;
  editable?: boolean;
  onChange?: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn('mb-6 sm:mb-8', className)}>
      <InlineText
        as="h2"
        singleLine
        editable={editable}
        value={title}
        onChange={onChange}
        placeholder={placeholder}
        className="text-[1.5rem] font-semibold leading-tight tracking-tight text-brand-black sm:text-[2.1rem]"
      />
    </div>
  );
}
