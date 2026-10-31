'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { BlogFaq } from '@/lib/blogs';
import { HINT_CLASS, INPUT_CLASS, LABEL_CLASS, REMOVE_ACTION_CLASS, TEXTAREA_CLASS, TEXT_ACTION_CLASS } from './form-styles';

export const MAX_FAQS = 15;

interface BlogFaqFieldProps {
  value: BlogFaq[];
  onChange: (value: BlogFaq[]) => void;
  disabled?: boolean;
}

/**
 * Question/answer pairs rendered under the article and emitted as FAQPage
 * structured data. A pair missing either half is dropped on save.
 */
export default function BlogFaqField({ value, onChange, disabled }: BlogFaqFieldProps) {
  const update = (index: number, patch: Partial<BlogFaq>) =>
    onChange(value.map((faq, i) => (i === index ? { ...faq, ...patch } : faq)));
  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <fieldset className='m-0 flex min-w-0 flex-col gap-3 border-0 p-0'>
      <legend className={`${LABEL_CLASS} mb-2 p-0`}>Frequently asked questions <span className='font-normal text-ink'>(optional)</span></legend>
      <p className={HINT_CLASS}>
        Real questions sellers or buyers ask, each with a direct 2–4 sentence answer. Shown at the end of the article and marked up for search and AI engines.
      </p>
      {value.map((faq, index) => {
        const n = index + 1;
        return (
          <div key={index} className='flex min-w-0 flex-col gap-3 border border-advisory-rule bg-canvas/40 p-4'>
            <div className='flex min-w-0 flex-col gap-2'>
              <label htmlFor={`blog-faq-q-${index}`} className={LABEL_CLASS}>Question {n}</label>
              <input id={`blog-faq-q-${index}`} type='text' value={faq.question} disabled={disabled} maxLength={200}
                onChange={(event) => update(index, { question: event.target.value })}
                placeholder='e.g. How long does it take to sell a business?' className={INPUT_CLASS} />
            </div>
            <div className='flex min-w-0 flex-col gap-2'>
              <label htmlFor={`blog-faq-a-${index}`} className={LABEL_CLASS}>Answer {n}</label>
              <textarea id={`blog-faq-a-${index}`} rows={3} value={faq.answer} disabled={disabled} maxLength={1200}
                onChange={(event) => update(index, { answer: event.target.value })}
                placeholder='Answer the question in the first sentence, then add context.' className={TEXTAREA_CLASS} />
            </div>
            <button type='button' onClick={() => remove(index)} disabled={disabled} className={REMOVE_ACTION_CLASS}>
              <Trash2 aria-hidden='true' className='size-4' />Remove question {n}
            </button>
          </div>
        );
      })}
      {value.length < MAX_FAQS ? (
        <button type='button' onClick={() => onChange([...value, { question: '', answer: '' }])} disabled={disabled} className={TEXT_ACTION_CLASS}>
          <Plus aria-hidden='true' className='size-4' />Add question
        </button>
      ) : (
        <p className={HINT_CLASS}>Maximum of {MAX_FAQS} questions.</p>
      )}
    </fieldset>
  );
}
