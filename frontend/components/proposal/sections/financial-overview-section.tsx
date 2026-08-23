'use client';

import { InlineText } from '@/components/im';
import { RichTextEditor } from '../rich-text-editor';
import type { FinancialOverviewData, SectionChangeHandler } from './shared';

/**
 * Free-form notes on the numbers behind the appraisal.
 *
 * The HTML here is mirrored onto the model's `financialAssumptions` field, which
 * the customer approval email quotes — see `deriveFlatFields` in
 * `backend/utils/proposalSections.js`.
 */
export function FinancialOverviewSection({
  data,
  editable,
  onChange,
}: {
  data: FinancialOverviewData;
  editable?: boolean;
  onChange?: SectionChangeHandler<FinancialOverviewData>;
}) {
  return (
    <div className='mb-12 mt-16 bg-transparent'>
      <div className='mb-6 border-b border-border pb-4'>
        <InlineText
          as='h2'
          singleLine
          editable={editable}
          value={data.title}
          onChange={(v) => onChange?.({ title: v })}
          placeholder='Financial Assumptions'
          className='text-2xl font-bold text-secondary'
        />
      </div>

      {editable ? (
        <RichTextEditor
          value={data.html || ''}
          onChange={(html) => onChange?.({ html })}
          placeholder='Enter financial assumptions, market conditions, and other relevant details...'
        />
      ) : (
        <div className='prose prose-gray max-w-none prose-headings:mb-3 prose-headings:mt-6 prose-headings:font-bold prose-headings:text-secondary prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground'>
          <div dangerouslySetInnerHTML={{ __html: data.html || '' }} />
        </div>
      )}
    </div>
  );
}
