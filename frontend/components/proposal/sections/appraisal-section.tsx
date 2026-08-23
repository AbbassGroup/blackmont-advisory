'use client';

import { Fragment } from 'react';
import { InlineText } from '@/components/im';
import { APPRAISAL_CONTENT } from '../fixed-content';
import type { AppraisalData, SectionChangeHandler } from './shared';

/**
 * The appraisal statement is fixed wording. `{businessName}` and
 * `{businessValue}` are replaced with the cover's values — including in the
 * editor, so the broker sees exactly what the customer will read.
 */
function renderAppraisalBody(businessName: string, businessValue: string) {
  const parts = APPRAISAL_CONTENT.body.split(/(\{businessName\}|\{businessValue\})/g);
  return parts.map((part, i) => {
    if (part === '{businessName}' || part === '{businessValue}') {
      const value = part === '{businessName}' ? businessName : businessValue;
      return (
        <strong key={i} className='font-semibold text-secondary'>
          {value}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function AppraisalSection({
  data,
  businessName,
  businessValue,
  brokerName,
  editable,
  onChange,
}: {
  data: AppraisalData;
  businessName: string;
  businessValue: string;
  brokerName: string;
  editable?: boolean;
  onChange?: SectionChangeHandler<AppraisalData>;
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
          placeholder='Business Appraisal'
          className='text-2xl font-bold text-secondary'
        />
      </div>

      <div>
        <p className='mb-8 text-base leading-relaxed text-muted-foreground md:text-lg'>
          {renderAppraisalBody(
            businessName || '[Business Name]',
            businessValue || '[Business Value]',
          )}
        </p>

        {/* Prepared By and Approved By Section */}
        <div className='mt-10 flex flex-col justify-between gap-4 sm:flex-row sm:gap-6'>
          <div className='flex-1 bg-secondary px-6 py-3 text-center text-parchment'>
            <InlineText
              singleLine
              editable={editable}
              value={data.preparedByLabel}
              onChange={(v) => onChange?.({ preparedByLabel: v })}
              placeholder='Prepared By'
              className='text-sm font-semibold uppercase tracking-wide'
            />
          </div>

          <div className='flex-1 bg-secondary px-6 py-3 text-center text-parchment'>
            <InlineText
              singleLine
              editable={editable}
              value={data.approvedByLabel}
              onChange={(v) => onChange?.({ approvedByLabel: v })}
              placeholder='Approved By'
              className='text-sm font-semibold uppercase tracking-wide'
            />
          </div>
        </div>

        {/* Names Section */}
        <div className='mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:gap-6'>
          {/* The broker is chosen in the Settings drawer, so it is read-only here. */}
          <div className='flex-1 bg-muted px-6 py-3 text-center font-medium text-secondary'>
            {brokerName || '[Broker Name]'}
          </div>

          <div className='flex-1 bg-muted px-6 py-3 text-center font-medium text-secondary'>
            <InlineText
              singleLine
              editable={editable}
              value={data.approvedByName}
              onChange={(v) => onChange?.({ approvedByName: v })}
              placeholder='Approver name'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
