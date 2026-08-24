'use client';

import { ABOUT_CONTENT } from '../fixed-content';

/** Fixed wording from `fixed-content.ts`; nothing here is editable. */
export function ProposalAboutSection() {
  const c = ABOUT_CONTENT;

  return (
    <div className='mb-12 mt-16 bg-transparent'>
      <div className='mb-6 border-b border-border pb-4'>
        <h2 className='text-2xl font-bold text-secondary'>{c.title}</h2>
      </div>

      <div>
        <p className='mb-6 text-justify text-base leading-relaxed text-foreground'>
          {c.body}
        </p>

        <p className='mb-4 text-base font-medium text-secondary'>
          {c.servicesIntro}
        </p>

        <ul className='mb-8 space-y-3'>
          {c.services.map((service, index) => (
            <li key={index} className='flex items-start'>
              <div className='mr-3 mt-2 h-2 w-2 shrink-0 rounded-full bg-accent' />
              <span className='text-base text-foreground'>{service}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
