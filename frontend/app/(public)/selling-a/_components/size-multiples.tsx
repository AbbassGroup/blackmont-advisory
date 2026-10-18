import { LandingContainer } from '@/components/landing/presentation';
import { EbitdaMultiples } from '@/components/seo/ebitda-multiples';

export function SizeMultiples() {
  return (
    <section
      aria-labelledby='size-multiples-title'
      className='bg-canvas py-14 text-ink min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='size-multiples-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          How size changes the multiple
        </h2>
        <p className='mt-5 mb-0 max-w-[960px] text-base leading-[1.8] min-[681px]:text-[17px]'>
          Sector is only half the picture. The same business earning five times
          more sits in a different band entirely, because larger businesses
          carry less key-person risk, have real management underneath the
          owner, and attract a different class of buyer. This is the single
          factor owners most often underestimate.
        </p>

        <EbitdaMultiples />
      </LandingContainer>
    </section>
  );
}
