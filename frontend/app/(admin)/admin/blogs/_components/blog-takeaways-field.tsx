'use client';

import { Plus, Trash2 } from 'lucide-react';
import { HINT_CLASS, INPUT_CLASS, LABEL_CLASS, TEXT_ACTION_CLASS } from './form-styles';

export const MAX_TAKEAWAYS = 8;

interface BlogTakeawaysFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

/** Editable list of one-sentence summary bullets, shown above the article body. */
export default function BlogTakeawaysField({ value, onChange, disabled }: BlogTakeawaysFieldProps) {
  const update = (index: number, text: string) => onChange(value.map((item, i) => (i === index ? text : item)));
  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <fieldset className='m-0 flex min-w-0 flex-col gap-3 border-0 p-0'>
      <legend className={`${LABEL_CLASS} mb-2 p-0`}>Key takeaways <span className='font-normal text-ink'>(optional)</span></legend>
      <p className={HINT_CLASS}>
        3–5 one-sentence answers a reader could act on without reading further. Shown in a box at the top of the article — the part AI answer engines are most likely to quote.
      </p>
      {value.map((item, index) => (
        <div key={index} className='flex min-w-0 items-center gap-2'>
          <span aria-hidden='true' className='w-5 shrink-0 text-right text-xs font-semibold text-ink'>{index + 1}.</span>
          <input type='text' value={item} disabled={disabled} maxLength={240} aria-label={`Key takeaway ${index + 1}`}
            onChange={(event) => update(index, event.target.value)}
            placeholder='e.g. Most business sales take 6–9 months from listing to settlement.' className={INPUT_CLASS} />
          <button type='button' onClick={() => remove(index)} disabled={disabled} aria-label={`Remove key takeaway ${index + 1}`}
            className='inline-flex size-10 shrink-0 cursor-pointer items-center justify-center text-ink hover:text-red-800 focus-visible:outline-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-50'>
            <Trash2 aria-hidden='true' className='size-4' />
          </button>
        </div>
      ))}
      {value.length < MAX_TAKEAWAYS ? (
        <button type='button' onClick={() => onChange([...value, ''])} disabled={disabled} className={TEXT_ACTION_CLASS}>
          <Plus aria-hidden='true' className='size-4' />Add takeaway
        </button>
      ) : (
        <p className={HINT_CLASS}>Maximum of {MAX_TAKEAWAYS} takeaways.</p>
      )}
    </fieldset>
  );
}
