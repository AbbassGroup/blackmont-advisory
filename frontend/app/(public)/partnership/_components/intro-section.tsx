import { PartnershipModal } from '@/components/global/partnership-modal';
import { LandingButton, LandingContainer } from '@/components/landing/presentation';

export function IntroSection() {
  return (
    <section
      aria-labelledby='partnership-intro-title'
      className='bg-white text-ink py-14 min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='partnership-intro-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          Helping your clients buy or sell a business
        </h2>
        <div className='mt-6 flex flex-col items-start gap-6'>
          <p className='m-0 max-w-[780px] text-base leading-[1.8] min-[681px]:text-[17px]'>
            Blackmont Advisory works alongside partners to provide expert
            business sale and acquisition support, while you remain the
            trusted advisor.
          </p>
          <PartnershipModal>
            <LandingButton variant='outline' className='max-w-full'>
              Book a confidential discussion
            </LandingButton>
          </PartnershipModal>
        </div>
      </LandingContainer>
    </section>
  );
}
