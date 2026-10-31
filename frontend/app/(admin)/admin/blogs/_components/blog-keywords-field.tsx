'use client';

import { useId, useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { HINT_CLASS, INPUT_CLASS, LABEL_CLASS } from './form-styles';

export const MAX_KEYWORDS = 10;

interface BlogKeywordsFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  /** Keywords other articles already use — offered as suggestions. */
  suggestions: string[];
  disabled?: boolean;
}

const normalise = (keyword: string) => keyword.replace(/\s+/g, ' ').trim().toLowerCase();

/**
 * Chip input for an article's keywords. Enter or comma adds, Backspace on an
 * empty input removes the last chip. Stored lowercased and de-duplicated, to
 * match what the API keeps.
 */
export default function BlogKeywordsField({ value, onChange, suggestions, disabled }: BlogKeywordsFieldProps) {
  const listId = useId();
  const [draft, setDraft] = useState('');
  const full = value.length >= MAX_KEYWORDS;

  const add = (raw: string) => {
    // A pasted "a, b, c" adds all three.
    const incoming = raw.split(',').map(normalise).filter(Boolean);
    const next = [...value];
    for (const keyword of incoming) {
      if (next.length >= MAX_KEYWORDS) break;
      if (!next.includes(keyword)) next.push(keyword);
    }
    if (next.length !== value.length) onChange(next);
    setDraft('');
  };

  const remove = (keyword: string) => onChange(value.filter((k) => k !== keyword));

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      add(draft);
    } else if (event.key === 'Backspace' && !draft && value.length) {
      remove(value[value.length - 1]);
    }
  };

  return (
    <div className='flex min-w-0 flex-col gap-2'>
      <label htmlFor='blog-keywords' className={LABEL_CLASS}>Keywords <span className='font-normal text-ink'>(optional)</span></label>
      <p id='blog-keywords-hint' className={HINT_CLASS}>
        Topics this article covers. Used to link related articles and as structured data — not shown in Google results. Press Enter or comma to add, up to {MAX_KEYWORDS}.
      </p>
      {value.length > 0 && (
        <ul aria-label='Added keywords' className='m-0 flex list-none flex-wrap gap-2 p-0'>
          {value.map((keyword) => (
            <li key={keyword} className='inline-flex items-center gap-1 bg-canvas py-1 pr-1 pl-3 text-xs text-midnight'>
              {keyword}
              <button type='button' onClick={() => remove(keyword)} disabled={disabled} aria-label={`Remove keyword ${keyword}`}
                className='inline-flex size-6 cursor-pointer items-center justify-center text-ink hover:text-red-800 focus-visible:outline-2 focus-visible:outline-gilt disabled:cursor-not-allowed'>
                <X aria-hidden='true' className='size-3.5' />
              </button>
            </li>
          ))}
        </ul>
      )}
      <input id='blog-keywords' type='text' list={listId} aria-describedby='blog-keywords-hint' value={draft} disabled={disabled || full}
        onChange={(event) => {
          // Picking a datalist suggestion adds it straight away. Chrome reports the
          // pick as an `insertReplacementText` InputEvent, Firefox as a plain Event;
          // typing is always an InputEvent of another kind.
          const next = event.target.value;
          const native = event.nativeEvent;
          const picked = !(native instanceof InputEvent) || native.inputType === 'insertReplacementText';
          if (picked && suggestions.includes(next)) add(next);
          else setDraft(next);
        }}
        onKeyDown={handleKeyDown} onBlur={() => draft.trim() && add(draft)}
        placeholder={full ? `Maximum of ${MAX_KEYWORDS} keywords reached` : 'e.g. selling a business'} className={INPUT_CLASS} />
      <datalist id={listId}>{suggestions.filter((s) => !value.includes(s)).map((s) => <option key={s} value={s} />)}</datalist>
    </div>
  );
}
