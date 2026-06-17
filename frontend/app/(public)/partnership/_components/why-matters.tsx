'use client';

import { CheckCircle2 } from 'lucide-react';

const bulletPoints = [
  'Selling their business',
  'Buying a business',
  'Succession planning',
  'Business valuation',
  'Strategic exit timing',
];

export function WhyMatters() {
  return (
    <section className='relative overflow-hidden bg-[#1c2434] py-20 lg:py-28'>
      {/* Teal ambient glow */}
      <div className='pointer-events-none absolute inset-0 bg-cover bg-[url("/businessbrokers/mesh.png")] opacity-5' />

      <div className='relative z-10 mx-auto max-w-[1000px] px-6 text-center'>
        <div className='mb-12'>
          <h2 className='mb-4 text-3xl font-extrabold leading-[1.15] text-white md:text-[40px]'>
            Why It Matters
          </h2>
          <h3 className='text-xl font-bold text-white/90 md:text-2xl'>
            Your Clients Will Eventually Ask About Buying or Selling
          </h3>
        </div>

        <div className='flex flex-wrap justify-center gap-5'>
          {bulletPoints.map((item) => (
            <div
              key={item}
              className='flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-primary/40 hover:bg-white/10 sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]'
            >
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/15 text-brand-primary'>
                <CheckCircle2 className='h-5 w-5' />
              </div>
              <span className='text-left font-semibold text-white'>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
