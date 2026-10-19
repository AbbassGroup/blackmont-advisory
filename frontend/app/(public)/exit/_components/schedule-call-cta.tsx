import { GetStarted } from './get-started';
import { Suspense } from 'react';
import { LandingTheme } from '@/components/landing/landing-theme';
import {
  LandingButton,
  LandingContainer,
  landingButtonVariants,
} from '@/components/landing/presentation';

interface ScheduleCallCtaProps {
  title?: string;
  subtitle?: string;
}

export function ScheduleCallCta({
  title = 'Ready to discuss your exit?',
  subtitle = 'Speak confidentially with our senior advisory team about your business value, timing, and options. No obligation.',
}: ScheduleCallCtaProps) {
  return (
    <LandingTheme className='bg-canvas'>
      <section
        aria-labelledby='exit-cta-title'
        className='border-t border-advisory-rule py-10 min-[681px]:py-12 min-[1121px]:py-16'
      >
        <LandingContainer className='flex flex-col items-start gap-7 min-[931px]:flex-row min-[931px]:items-center min-[931px]:justify-between min-[931px]:gap-12'>
          <div className='min-w-0 max-w-[760px]'>
            <h2
              id='exit-cta-title'
              className='m-0 mb-5 font-advisory-heading text-[32px] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(34px,3.5vw,43px)]'
            >
              {title}
            </h2>
            <p className='m-0 max-w-[650px] text-base leading-[1.75] text-ink'>
              {subtitle}
            </p>
          </div>
          <Suspense fallback={<LandingButton disabled className='shrink-0'>Schedule a confidential call</LandingButton>}>
            <GetStarted className={landingButtonVariants({ className: 'shrink-0' })}>
              Schedule a confidential call
            </GetStarted>
          </Suspense>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
