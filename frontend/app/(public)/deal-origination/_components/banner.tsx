import { ContactFormModal } from '@/components/global/contact-form-modal';
import { LandingTheme } from '@/components/landing/landing-theme';
import {
  LandingButton,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';
import { HeroVideo } from './hero-video';

export function DealOriginationBanner() {
  return (
    <LandingTheme className='bg-canvas'>
      <section aria-labelledby='deal-origination-title' className='py-14 min-[681px]:py-16 min-[1121px]:py-20'>
        <LandingContainer className='grid items-center min-[931px]:min-h-[400px] min-[931px]:grid-cols-[0.85fr_1.15fr] gap-8 min-[681px]:gap-10 min-[1121px]:gap-16'>
          <div className='min-w-0'>
            <h1
              id='deal-origination-title'
              className='m-0 mb-6 max-w-[570px] font-advisory-heading text-[clamp(38px,9.5vw,54px)] leading-[1.14] font-bold tracking-normal text-midnight min-[681px]:mb-[32px] min-[681px]:text-[clamp(37px,5.15vw,52px)] min-[931px]:text-[clamp(42px,5.1vw,58px)] min-[1121px]:text-[clamp(46px,4.4vw,62px)]'
            >
              Buy a business with confidence
            </h1>
            <p className='m-0 mb-7 max-w-[500px] text-[17px] leading-[1.75] text-ink min-[1121px]:text-lg'>
              Buy Side Deal Origination by Blackmont Advisory
            </p>
            <div className='flex flex-wrap items-center gap-x-6 gap-y-4'>
              <ContactFormModal>
                <LandingButton>Discuss an acquisition</LandingButton>
              </ContactFormModal>
              <LandingTextLink href='#buying-process' className='inline-flex min-h-11 items-center'>
                How the process works
              </LandingTextLink>
            </div>
          </div>
          <HeroVideo />
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
