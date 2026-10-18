import { PartnershipModal } from '@/components/global/partnership-modal';
import {
  LandingButton,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';

const OFFICE_ADDRESS = '1/459 Toorak Road, Toorak, VIC 3149';
const OFFICE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS)}`;

export function CTASection() {
  return (
    <section
      aria-labelledby='partnership-contact-title'
      className='bg-canvas py-14 text-ink min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='partnership-contact-title'
          className='m-0 max-w-[1100px] font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          Let&rsquo;s strengthen the support you offer your clients
        </h2>
        <p className='mt-5 mb-0 max-w-[820px] text-base leading-[1.8] min-[681px]:text-[17px]'>
          If you would like to explore how Blackmont Advisory can support your
          firm and your clients, we welcome a confidential discussion.
        </p>

        <div className='mt-8 grid gap-8 min-[681px]:mt-10 min-[931px]:grid-cols-3 min-[931px]:gap-10 min-[1121px]:gap-12'>
          <div className='min-w-0 border-t border-advisory-rule pt-5'>
            <h3 className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight min-[681px]:text-[25px]'>
              Book a meeting
            </h3>
            <p className='mt-3 mb-5 text-base leading-[1.8]'>
              Schedule a confidential discussion at a time that suits you.
            </p>
            <PartnershipModal>
              <LandingButton className='max-w-full'>
                Book a confidential discussion
              </LandingButton>
            </PartnershipModal>
          </div>

          <div className='min-w-0 border-t border-advisory-rule pt-5'>
            <h3 className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight min-[681px]:text-[25px]'>
              Visit our office
            </h3>
            <p className='mt-3 mb-0 text-base leading-[1.8]'>
              Meet us in person to discuss how we can work together.
            </p>
            <address className='mt-3 not-italic'>
              <LandingTextLink
                href={OFFICE_MAP_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex min-h-11 items-center text-[15px] leading-[1.8] font-normal'
              >
                {OFFICE_ADDRESS}
              </LandingTextLink>
            </address>
          </div>

          <div className='min-w-0 border-t border-advisory-rule pt-5'>
            <h3 className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight min-[681px]:text-[25px]'>
              Contact us directly
            </h3>
            <LandingTextLink
              href='tel:+61433525731'
              className='mt-3 inline-flex min-h-11 items-center text-[20px] leading-[1.5] font-medium'
            >
              +61 433 525 731
            </LandingTextLink>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
