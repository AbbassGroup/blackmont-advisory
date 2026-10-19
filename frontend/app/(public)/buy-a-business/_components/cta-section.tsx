import { ContactFormModal } from '@/components/global/contact-form-modal';
import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingButton, LandingContainer } from '@/components/landing/presentation';

export function CTASection() {
  return (
    <LandingTheme className='bg-canvas'>
      <section aria-labelledby='buying-final-cta-title' className='border-t border-advisory-rule py-10 min-[681px]:py-12 min-[1121px]:py-16'>
        <LandingContainer className='flex flex-col items-start gap-7 min-[931px]:flex-row min-[931px]:items-center min-[931px]:justify-between min-[931px]:gap-12'>
          <div className='min-w-0 max-w-[760px]'>
            <h2
              id='buying-final-cta-title'
              className='m-0 mb-5 font-advisory-heading text-[32px] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(34px,3.5vw,43px)]'
            >
              Ready to buy a business?
            </h2>
            <p className='m-0 mb-2 max-w-[650px] text-base leading-[1.75] text-ink'>
              Take the stress and risk out of your next purchase.
            </p>
            <p className='m-0 max-w-[650px] text-base leading-[1.75] text-ink'>
              Let Blackmont Advisory represent you and ensure you buy the right
              business at the right price.
            </p>
          </div>
          <ContactFormModal>
            <LandingButton className='shrink-0'>Schedule a consultation</LandingButton>
          </ContactFormModal>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
