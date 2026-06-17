'use client';

import React, { useEffect, useRef } from 'react';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tag = 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';

const BLOCK_TAGS = new Set<Tag>(['div', 'h1', 'h2', 'h3', 'p']);

interface InlineTextProps {
  value: string;
  onChange?: (value: string) => void;
  editable?: boolean;
  as?: Tag;
  className?: string;
  placeholder?: string;
  /** Prevent line breaks (Enter blurs instead of inserting a newline). */
  singleLine?: boolean;
  /** Hide the little pencil affordance (e.g. dense rows). */
  hideEditIcon?: boolean;
}

/**
 * Click-to-edit plain text rendered directly into the document. Uncontrolled
 * while focused (stable caret); syncs from props only when not being edited.
 * The wrapper preserves the tag's block/inline nature so headings keep stacking,
 * and a small pencil sits beside the text so users know it's editable.
 */
export function InlineText({
  value,
  onChange,
  editable = false,
  as = 'span',
  className,
  placeholder,
  singleLine = false,
  hideEditIcon = false,
}: InlineTextProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as React.ElementType;
  const isBlock = BLOCK_TAGS.has(as);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.activeElement !== el && el.innerText !== value) {
      el.innerText = value ?? '';
    }
  }, [value, editable]);

  if (!editable) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <span
      className={cn(
        'group/inline gap-1.5',
        isBlock ? 'flex items-start' : 'inline-flex max-w-full items-start align-top',
      )}
    >
      <Tag
        ref={ref as React.Ref<HTMLElement>}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        role="textbox"
        tabIndex={0}
        data-placeholder={placeholder}
        onInput={(e: React.FormEvent<HTMLElement>) => {
          const el = e.currentTarget as HTMLElement;
          if (!el.innerText.trim()) el.innerHTML = '';
          onChange?.(el.innerText);
        }}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (singleLine && e.key === 'Enter') {
            e.preventDefault();
            (e.currentTarget as HTMLElement).blur();
          }
        }}
        className={cn('im-editable min-w-0 cursor-text', className)}
      />
      {!hideEditIcon && (
        <Pencil className="mt-[0.4em] h-3 w-3 shrink-0 text-current opacity-30 transition-opacity group-hover/inline:opacity-70" />
      )}
    </span>
  );
}
