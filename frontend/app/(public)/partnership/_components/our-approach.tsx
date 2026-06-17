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
    <section className='py-20 lg:py-28 bg-gradient-to-b from-[#F8FFFE] via-white to-[#F5FCFB] relative overflow-hidden'>
      {/* Decorative gradient orb */}
      <div className='absolute bottom-[10%] -right-[8%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(86,193,188,0.05)_0%,transparent_70%)] pointer-events-none' />

      <div className='max-w-[1260px] mx-auto px-6 lg:px-8 relative z-10'>
        <SectionHeading title='Our Approach' className='mb-16' />

        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center'>
          {/* Text Content */}
          <div className='md:col-span-7'>
            <h3 className='text-xl lg:text-2xl font-extrabold text-brand-black mb-6 tracking-wide'>
              Boutique. Strategic. Relationship-Driven.
            </h3>

            <p className='text-[1.05rem] text-gray-600 leading-relaxed mb-4'>
              ABBASS Business Brokers is a Melbourne-based firm specialising in
              business sales across Australia.
            </p>

            <p className='text-gray-500 mb-4'>We focus on:</p>

            <div className='flex flex-wrap gap-3 mb-10'>
              {focusPoints.map((point) => (
                <div
                  key={point}
                  className='px-4 py-2 rounded-xl text-sm font-semibold bg-brand-primary/5 border border-brand-primary/20 text-brand-black'
                >
                  {point}
                </div>
              ))}
            </div>

            <div className='pl-6 border-l-[3px] border-[#56C1BC]'>
              <p className='text-[1.05rem] text-brand-black font-medium italic leading-relaxed'>
                Our approach aligns naturally with professional advisory firms
                who prioritise quality and reputation.
              </p>
            </div>
          </div>

          {/* Image Content */}
          <div className='hidden md:block md:col-span-5'>
            <div className='relative w-full aspect-4/4'>
              <Image
                src='/businessbrokers/our-approach.png'
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
