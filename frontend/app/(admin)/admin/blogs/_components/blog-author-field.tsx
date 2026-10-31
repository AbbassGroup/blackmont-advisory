'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listAuthors, type Author } from '@/lib/authors';
import { HINT_CLASS, INPUT_CLASS, LABEL_CLASS } from './form-styles';

interface BlogAuthorFieldProps {
  /** Author id, or '' to credit the firm. */
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/** Picks the named expert credited on the article. */
export default function BlogAuthorField({ value, onChange, disabled }: BlogAuthorFieldProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    listAuthors()
      .then((list) => { if (active) setAuthors(list); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, []);

  return (
    <div className='flex min-w-0 flex-col gap-2'>
      <label htmlFor='blog-author' className={LABEL_CLASS}>Author <span className='font-normal text-ink'>(recommended)</span></label>
      <p id='blog-author-hint' className={HINT_CLASS}>
        A named expert builds trust with readers and Google.{' '}
        <Link href='/admin/blogs/authors' className='font-medium text-midnight underline underline-offset-4 hover:text-gilt'>Manage authors</Link>
        {failed && <span className='text-amber-800'> — couldn&apos;t load the author list.</span>}
      </p>
      <select id='blog-author' aria-describedby='blog-author-hint' value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className={INPUT_CLASS}>
        <option value=''>Blackmont Advisory (no named author)</option>
        {authors.map((author) => (
          <option key={author._id} value={author._id}>{author.name}{author.role ? ` — ${author.role}` : ''}</option>
        ))}
        {/* Keep the saved value selectable while the list is loading. */}
        {value && !authors.some((a) => a._id === value) && <option value={value}>Current author</option>}
      </select>
    </div>
  );
}
