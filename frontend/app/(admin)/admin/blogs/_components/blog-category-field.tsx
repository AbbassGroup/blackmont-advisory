'use client';

import { useId } from 'react';

interface BlogCategoryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
}

/** Free text with native suggestions from categories already in use. */
export default function BlogCategoryCombobox({ value, onChange, options, disabled }: BlogCategoryComboboxProps) {
  const listId = useId();
  return (
    <div className='flex min-w-0 flex-col gap-2'>
      <label htmlFor='blog-category' className='text-sm font-medium text-midnight'>Category <span aria-hidden='true'>*</span></label>
      <p id='blog-category-hint' className='m-0 text-xs leading-[1.75] text-ink'>Pick an existing category or type a new one.</p>
      <input id='blog-category' required type='text' list={listId} aria-describedby='blog-category-hint' value={value} disabled={disabled}
        onChange={(event) => onChange(event.target.value)} placeholder='e.g. Selling a Business'
        className='h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white px-3 text-base text-midnight outline-none placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:opacity-50 min-[681px]:text-sm' />
      <datalist id={listId}>{options.map((option) => <option key={option} value={option} />)}</datalist>
    </div>
  );
}
