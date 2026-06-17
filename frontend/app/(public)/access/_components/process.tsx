'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './section-heading';

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
    description: 'Hear directly from the ABBASS advisory team.',
  },
];

export function Process() {
  return (
    <section className='bg-brand-offwhite py-10 lg:py-14'>
      <div className='max-w-[1260px] mx-auto px-6 lg:px-8'>
        <SectionHeading label='Process' title='How the Process Works' />

        <div className='relative mt-16'>
          {/* Connector line through circle centers (desktop) */}
          <div className='absolute left-[16.67%] right-[16.67%] top-7 hidden h-px bg-brand-primary/25 lg:block' />

          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-3'>
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className='flex flex-col items-center text-center'
              >
                <div className='relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white text-base font-semibold text-brand-primary shadow-[0_6px_16px_-8px_rgba(86,193,188,0.5)] ring-1 ring-brand-primary/20'>
                  {step.number}
                </div>
                <h3 className='mt-6 text-lg font-semibold text-brand-black'>
                  {step.title}
                </h3>
                <p className='mt-2 max-w-[15rem] leading-relaxed text-gray-500'>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
