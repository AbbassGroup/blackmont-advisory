import { LandingButtonLink, LandingContainer } from '@/components/landing/presentation';
import { LastUpdated } from '@/components/seo/last-updated';

export function IndustryLinks() {
  return (
    <section aria-labelledby='guides-industry-title' className='bg-canvas text-ink py-14 min-[681px]:py-16 min-[1121px]:py-20'>
      <LandingContainer>
        <h2
          id='guides-industry-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          Looking for your industry?
        </h2>
        <p className='mt-5 mb-6 max-w-[880px] text-base leading-[1.8] min-[681px]:text-[17px]'>
          The guides above apply across sectors. For what your particular type
          of business sells for, how long it takes and what buyers examine, the
          industry pages go into the detail that is specific to you.
        </p>
        <LandingButtonLink href='/selling-a' variant='outline'>
          Browse the industry pages
        </LandingButtonLink>
        <div className='mt-10 border-t border-advisory-rule pt-5 [&>p]:m-0 [&>p]:text-ink'>
          <LastUpdated />
        </div>
      </LandingContainer>
    </section>
  );
}
