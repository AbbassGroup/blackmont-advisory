import { ContactFormModal } from '@/components/global/contact-form-modal';
import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingButton, LandingContainer } from '@/components/landing/presentation';

export function IntroSection() {
  return (
    <LandingTheme>
      <section aria-labelledby='buying-intro-title' className='py-14 min-[681px]:py-16 min-[1121px]:py-20'>
        <LandingContainer className='grid items-start min-[931px]:grid-cols-[0.85fr_1.15fr] gap-8 min-[681px]:gap-10 min-[1121px]:gap-16'>
          <h2
            id='buying-intro-title'
            className='m-0 max-w-[500px] font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
          >
            Looking to buy a business?
          </h2>
          <div className='min-w-0'>
            <p className='m-0 mb-6 max-w-[640px] text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>
              Don&apos;t go it alone. Blackmont Advisory helps individuals and
              investors find, analyse, and negotiate the right business, so you
              make a smart purchase with confidence and clarity.
            </p>
            <ContactFormModal>
              <LandingButton variant='outline'>Book your free strategy call</LandingButton>
            </ContactFormModal>
          </div>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
