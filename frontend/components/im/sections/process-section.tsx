'use client';

import { resolveBroker } from '@/lib/data/brokers';
import { SectionHeading } from '../section-chrome';
import { BrokerCard } from '../broker-card';

const STEPS = [
  {
    title: 'Review Sales Memorandum',
    desc: 'Review the document and consider if the business meets your needs, and whether your finance situation and goals align.',
  },
  {
    title: 'Q&A',
    desc: 'Contact your business broker with any clarification questions you may have.',
  },
  {
    title: 'Inspection / Meet & Greet',
    desc: 'Arrange a time to inspect the business or do a meet & greet with the business owner.',
  },
  {
    title: 'Submit EOI',
    desc: 'Submit your offer via a non-binding expression of interest with the offer amount and any conditions. A small, fully refundable deposit is paid before signing the contract of sale.',
  },
  {
    title: 'Conduct Due Diligence',
    desc: 'Upon acceptance from the owner, you will be presented with further collateral to conduct due diligence.',
  },
  {
    title: 'Sign Contract of Sale',
    desc: 'A contract of sale is prepared and signed by both parties. A 10% deposit is paid (non-refundable unless conditions are not met).',
  },
  {
    title: 'Settlement',
    desc: 'Lease transfer is finalised (if applicable), all other conditions are met and full payment is made on the settlement date.',
  },
  {
    title: 'Transition',
    desc: 'Transition occurs, with the new business owner taking over the current operations.',
  },
];

export function ProcessSection({
  brokerEmail,
  title,
  editable,
  onChange,
}: {
  brokerEmail?: string;
  title: string;
  editable?: boolean;
  onChange?: (patch: { title: string }) => void;
}) {
  const broker = resolveBroker(brokerEmail);

  return (
    <>
      <SectionHeading
        title={title}
        editable={editable}
        onChange={(v) => onChange?.({ title: v })}
        placeholder='The Process'
      />

      <ol className='space-y-6'>
        {STEPS.map((step, i) => (
          <li key={i} className='flex gap-4'>
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent ring-1 ring-accent/30'>
              {i + 1}
            </div>
            <div>
              <h4 className='text-sm font-semibold uppercase tracking-wide text-secondary'>
                {step.title}
              </h4>
              <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
                {step.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className='mt-10 border-t border-border pt-8'>
        <p className='mb-3 text-sm font-semibold text-secondary'>
          Your point of contact
        </p>
        <BrokerCard broker={broker} className='max-w-full' />
      </div>
    </>
  );
}
