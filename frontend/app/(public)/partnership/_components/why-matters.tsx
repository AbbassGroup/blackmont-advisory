'use client';

import { CheckCircle2 } from 'lucide-react';

const bulletPoints = [
  'Selling their business',
  'Strategic Acquisitions',
  'Succession planning',
  'Business valuation',
  'Strategic exit timing',
];

export function WhyMatters() {
  return (
    <section className='relative overflow-hidden bg-secondary py-20 lg:py-28'>
      {/* Teal ambient glow */}
      <div className='pointer-events-none absolute inset-0 bg-cover bg-[url("/mesh.png")] opacity-5' />

      <div className='relative z-10 mx-auto max-w-[1000px] px-6 text-center'>
        <div className='mb-12'>
          <h2 className='mb-4 text-3xl font-bold leading-[1.15] text-parchment sm:text-4xl lg:text-5xl'>
            Why It Matters
          </h2>
          <h3 className='text-xl font-bold text-parchment/90 md:text-2xl'>
            Your Clients Will Eventually Ask About Exiting or Acquiring
          </h3>
        </div>

        <div className='flex flex-wrap justify-center gap-5'>
          {bulletPoints.map((item) => (
            <div
              key={item}
              className='flex w-full items-center gap-4  border border-white/10 bg-background/5 p-4 transition-colors hover:border-accent/40 hover:bg-background/10 sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]'
            >
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent'>
                <CheckCircle2 className='h-5 w-5' />
              </div>
              <span className='text-left font-semibold text-parchment'>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
