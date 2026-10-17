import { LandingImage } from './landing-image';
import { landingImages } from './images';
import { LandingTheme } from './landing-theme';
import { LandingButtonLink, LandingContainer } from './presentation';

export function Buying() {
  return (
    <LandingTheme className='bg-canvas'>
      <section
        id='buying'
        aria-labelledby='buying-title'
        className='py-16 min-[681px]:py-[90px]'
      >
        <LandingContainer className='grid items-center gap-10 min-[681px]:grid-cols-2 min-[681px]:gap-[clamp(48px,8vw,110px)]'>
          <div className='min-w-0'>
            <h2
              data-landing-reveal
              id='buying-title'
              className='m-0 mb-6 font-advisory-heading text-[34px] leading-[1.15] font-normal tracking-normal text-midnight min-[681px]:text-[clamp(34px,3.5vw,44px)]'
            >
              Looking to buy a
              <br />
              business?
            </h2>
            <p className='m-0 mb-7 max-w-[520px] text-base leading-[1.75]'>
              We also work exclusively for buyers. Whether this is your first
              business or your next acquisition, we help you identify
              opportunities, assess the financials and negotiate the terms.
            </p>
            <ul className='m-0 mb-7 list-disc space-y-2 pl-5 text-[15px] leading-[1.65]'>
              <li>On-market and off-market sourcing</li>
              <li>Independent assessment and due diligence</li>
              <li>Advice and representation through settlement</li>
            </ul>
            <LandingButtonLink
              href='#contact'
              variant='outline'
              className='min-h-[46px] px-5 py-3 text-[13px]'
            >
              Discuss an acquisition
            </LandingButtonLink>
          </div>
          <figure className='group/image m-0 min-w-0 overflow-hidden'>
            <LandingImage
              src={landingImages.lookingToBuy.src}
              alt={landingImages.lookingToBuy.alt}
              unoptimized
              loading='lazy'
              className='block aspect-[1.16] h-auto w-full object-cover object-center'
            />
          </figure>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
