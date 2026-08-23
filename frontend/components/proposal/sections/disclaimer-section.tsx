'use client';

import { DISCLAIMER_CONTENT } from '../fixed-content';

/**
 * FIXED CONTENT — the Conditions of Acceptance disclaimer is the same legal text
 * on every proposal, so it is rendered from `fixed-content.ts` and carries no
 * editable fields. The section can still be placed, reordered and hidden.
 */
export function DisclaimerSection({
  showTitle = true,
}: {
  /** The heading only appears on Business Appraisal proposals. */
  showTitle?: boolean;
}) {
  const c = DISCLAIMER_CONTENT;

  return (
    <div className='mb-12 mt-8 bg-transparent shadow-none'>
      {showTitle && (
        <div className='mb-6 border-b border-border pb-4'>
          <h2 className='text-2xl font-bold text-secondary'>{c.title}</h2>
        </div>
      )}

      <div className='mb-8 space-y-4'>
        <h3 className='mb-4 text-lg font-bold text-secondary'>{c.subtitle}</h3>

        {c.paragraphs.map((text, index) => (
          <p key={index} className='leading-relaxed text-muted-foreground'>
            {text}
          </p>
        ))}
      </div>

      <div className='pt-2'>
        <p className='font-bold text-secondary'>{c.entityName}</p>
        <p className='mt-1 text-sm text-muted-foreground'>{c.abn}</p>
        <p className='text-sm text-muted-foreground'>{c.license}</p>
      </div>
    </div>
  );
}
