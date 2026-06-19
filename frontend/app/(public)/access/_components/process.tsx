'use client';

import { SectionHeading } from './section-heading';
import { Reveal } from '@/components/landing/primitives';

const steps = [
  {
    number: '01',
    title: 'Access resources instantly',
    description: 'Get immediate access to the full suite of tools.',
  },
  {
    number: '02',
    title: 'Book a strategy call',
    description: 'Schedule a confidential conversation at your convenience.',
  },
  {
    number: '03',
    title: 'Receive tailored advice',
    description: 'Hear directly from the Blackmont Advisory advisory team.',
  },
];

export function Process() {
  return (
    <section className='bg-muted py-20 lg:py-28'>
      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16'>
        <SectionHeading label='Process' title='How the Process Works' />

        <div className='relative mt-16'>
          {/* Connector line through circle centers (desktop) */}
          <div className='absolute left-[16.67%] right-[16.67%] top-7 hidden h-px bg-accent/25 lg:block' />

          <Reveal className='grid grid-cols-1 gap-y-12 sm:grid-cols-3'>
            {steps.map((step) => (
              <div
                key={step.number}
                className='flex flex-col items-center text-center'
              >
                <div className='relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-background text-base font-bold text-accent ring-1 ring-accent/25'>
                  {step.number}
                </div>
                <h3 className='mt-6 text-lg font-bold text-secondary'>
                  {step.title}
                </h3>
                <p className='mt-2 max-w-[15rem] leading-relaxed text-muted-foreground'>
                  {step.description}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
