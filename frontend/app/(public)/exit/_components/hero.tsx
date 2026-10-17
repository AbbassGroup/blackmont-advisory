import { Suspense } from 'react';
import { LandingImage } from '@/components/landing/landing-image';
import { landingImages } from '@/components/landing/images';
import { LandingTheme } from '@/components/landing/landing-theme';
import {
  LandingButton,
  LandingButtonLink,
  LandingContainer,
  landingButtonVariants,
} from '@/components/landing/presentation';
import { GetStarted } from './get-started';

const trust = ['Confidential', 'Business sales', 'Boutique advisory'];

export function SellHero() {
  return (
    <LandingTheme className='bg-canvas'>
      <section
        aria-labelledby='exit-hero-title'
        className='relative isolate overflow-hidden'
      >
        <LandingContainer className='pointer-events-none relative z-10 min-[931px]:flex min-[931px]:min-h-[600px] min-[931px]:items-center min-[1121px]:min-h-[640px]'>
          <div className='pointer-events-auto min-w-0 pt-[50px] pb-7 motion-safe:animate-advisory-hero focus-within:animate-none min-[681px]:pt-[60px] min-[681px]:pb-9 min-[931px]:w-[57%] min-[931px]:py-[76px] min-[1121px]:w-[55%] min-[1121px]:py-[88px]'>
            <h1
              id='exit-hero-title'
              className='m-0 mb-6 max-w-[570px] font-advisory-heading text-[clamp(38px,9.5vw,54px)] leading-[1.14] font-bold tracking-normal text-midnight min-[681px]:mb-[30px] min-[681px]:max-w-[650px] min-[681px]:text-[clamp(37px,5.15vw,52px)] min-[931px]:text-[clamp(42px,5.1vw,58px)] min-[1121px]:text-[clamp(46px,4.85vw,66px)]'
            >
              Thinking about selling your business?
            </h1>
            <p className='m-0 mb-[27px] max-w-[540px] text-[17px] leading-[1.7] text-ink min-[681px]:mb-[33px] min-[1121px]:text-lg'>
              Access free valuation tools, exit-readiness checklists, and
              confidential advice from Blackmont Advisory.
            </p>
            <div className='flex flex-wrap items-start gap-3.5'>
              <LandingButtonLink href='#resources'>
                Access free resources
              </LandingButtonLink>
              <Suspense
                fallback={
                  <LandingButton variant='outline' disabled>
                    Book confidential strategy call
                  </LandingButton>
                }
              >
                <GetStarted
                  consultationTrigger
                  className={landingButtonVariants({ variant: 'outline' })}
                >
                  Book confidential strategy call
                </GetStarted>
              </Suspense>
            </div>
            <ul
              aria-label='Our approach'
              className='m-0 mt-8 flex max-w-[540px] list-none flex-wrap gap-x-6 gap-y-2 border-t border-advisory-rule p-0 pt-5 text-sm leading-[1.6] text-ink'
            >
              {trust.map((label) => <li key={label}>{label}</li>)}
            </ul>
          </div>
        </LandingContainer>
        <figure className='group/image relative m-0 h-[clamp(280px,65vw,440px)] w-full overflow-hidden min-[931px]:absolute min-[931px]:inset-y-0 min-[931px]:right-0 min-[931px]:h-auto min-[931px]:w-[60%]'>
          <LandingImage
            src={landingImages.sellingConversation.src}
            alt={landingImages.sellingConversation.alt}
            quality={85}
            preload
            fill
            sizes='(max-width: 930px) 100vw, 60vw'
            className='object-cover object-[65%_center]'
          />
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 bg-linear-to-b from-canvas via-canvas/60 via-[8%] to-canvas/0 to-[35%] min-[931px]:bg-linear-to-r min-[931px]:via-canvas/90 min-[931px]:via-[22%] min-[931px]:to-[55%]'
          />
        </figure>
      </section>
    </LandingTheme>
  );
}
