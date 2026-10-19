import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import {
  LandingButtonLink,
  LandingContainer,
} from '@/components/landing/presentation';

export const metadata: Metadata = {
  title: 'Thank You | Blackmont Advisory',
  robots: { index: false, follow: true },
};

export default function SuccessPage() {
  return (
    <section
      aria-labelledby='success-title'
      className='flex min-h-[60vh] items-center border-b border-advisory-rule bg-canvas py-14 text-midnight min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <div className='mx-auto max-w-[780px] text-center'>
          <CheckCircle2
            aria-hidden='true'
            strokeWidth={1.5}
            className='mx-auto mb-6 size-10 text-gilt'
          />
          <h1
            id='success-title'
            className='m-0 font-advisory-heading text-[34px] leading-[1.3] font-bold tracking-normal text-balance min-[681px]:text-[44px]'
          >
            Thank you. We&apos;ve received your details.
          </h1>
          <p className='mx-auto mt-6 mb-0 max-w-[580px] text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>
            Thank you for choosing Blackmont Advisory. A broker will be in touch
            shortly to discuss your business goals.
          </p>
          <div className='mt-8 flex flex-col items-stretch justify-center gap-3 min-[426px]:flex-row min-[426px]:flex-wrap min-[426px]:items-center'>
            <LandingButtonLink href='/'>Back to home</LandingButtonLink>
            <LandingButtonLink href='/resources' variant='outline'>
              Explore resources
            </LandingButtonLink>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
