'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PartnershipModal } from '@/components/global/partnership-modal';

export function IntroSection() {
  return (
    <section className='py-20 lg:py-28 bg-background overflow-hidden'>
      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left Content */}
          <div className='mx-auto max-w-[600px] text-center md:mx-0 md:text-left'>
            <h2 className='mb-6 text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
              Helping Your Clients Buy or Sell a Business
            </h2>
            <p className='mb-8 text-lg font-light leading-relaxed text-muted-foreground'>
              Blackmont Advisory works alongside partners to provide expert
              business sale and acquisition support, while you remain the
              trusted advisor.
            </p>

            <div className='inline-block'>
              <PartnershipModal>
                <Button className='h-auto rounded-none bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light'>
                  Book a Confidential Discussion
                </Button>
              </PartnershipModal>
            </div>
          </div>

          {/* Right SVG Graphic */}
          <div className='hidden md:flex justify-center'>
            <div className='relative w-full max-w-[400px] aspect-square'>
              <Image
                src='/partnership.svg'
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
