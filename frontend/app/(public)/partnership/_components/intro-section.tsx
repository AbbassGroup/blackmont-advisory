'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PartnershipModal } from '@/components/global/partnership-modal';

export function IntroSection() {
  return (
    <section className='py-20 lg:py-28 bg-white overflow-hidden'>
      <div className='max-w-[1260px] mx-auto px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left Content */}
          <div className='max-w-[600px] mx-auto md:mx-0 text-center md:text-left'>
            <h2 className='text-3xl lg:text-5xl font-extrabold text-brand-black mb-6 leading-[1.15]'>
              Helping Your Clients Buy or Sell a Business
            </h2>
            <p className='text-gray-700 leading-relaxed font-semibold mb-8'>
              Blackmont Advisory works alongside partners to provide expert
              business sale and acquisition support, while you remain the
              trusted advisor.
            </p>

            <div className='inline-block'>
              <PartnershipModal>
                <Button className='bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-7 font-bold md:text-lg shadow-[0_4px_14px_rgba(86,193,188,0.4)] hover:shadow-[0_6px_20px_rgba(86,193,188,0.6)] transition-all'>
                  Book a Confidential Discussion
                </Button>
              </PartnershipModal>
            </div>
          </div>

          {/* Right SVG Graphic */}
          <div className='hidden md:flex justify-center'>
            <div className='relative w-full max-w-[400px] aspect-square'>
              <Image
                src='/businessbrokers/partnership.svg'
                alt='Business Partnership'
                fill
                className='object-contain'
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
