'use client';

import { SectionHeading } from './section-heading';
import Image from 'next/image';

const focusPoints = [
  'Strategic preparation',
  'Accurate valuations',
  'Serious buyer engagement',
  'Structured negotiation',
  'Professional execution',
];

export function OurApproach() {
  return (
    <section className='py-20 lg:py-28 bg-white relative overflow-hidden'>
      {/* Decorative gradient orb */}
      <div className='absolute bottom-[10%] -right-[8%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none' />

      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10'>
        <SectionHeading title='Our Approach' className='mb-16' />

        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center'>
          {/* Text Content */}
          <div className='md:col-span-7'>
            <h3 className='text-xl lg:text-2xl font-bold text-secondary mb-6 tracking-wide'>
              Boutique. Strategic. Relationship-Driven.
            </h3>

            <p className='text-[1.05rem] text-muted-foreground leading-relaxed mb-4'>
              Blackmont Advisory is a Melbourne-based firm specialising in
              business sales across Australia.
            </p>

            <p className='text-muted-foreground mb-4'>We focus on:</p>

            <div className='flex flex-wrap gap-3 mb-10'>
              {focusPoints.map((point) => (
                <div
                  key={point}
                  className='px-4 py-2  text-sm font-semibold bg-accent/5 border border-accent/20 text-secondary'
                >
                  {point}
                </div>
              ))}
            </div>

            <div className='pl-6 border-l-[3px] border-[#c9a84c]'>
              <p className='text-[1.05rem] text-secondary font-medium italic leading-relaxed'>
                Our approach aligns naturally with professional advisory firms
                who prioritise quality and reputation.
              </p>
            </div>
          </div>

          {/* Image Content */}
          <div className='hidden md:block md:col-span-5'>
            <div className='relative w-full aspect-square'>
              <Image
                src='/assets/partnership.webp'
                alt='Our boutique, strategic approach'
                fill
                className='object-cover'
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
