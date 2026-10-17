import { LandingImage } from './landing-image';
import { landingImages } from './images';
import { LandingTheme } from './landing-theme';
import {
  LandingButtonLink,
  LandingContainer,
  LandingTextLink,
} from './presentation';

export function Hero() {
  return (
    <LandingTheme className='bg-canvas'>
      <section
        id='home'
        aria-labelledby='hero-title'
        className='relative isolate overflow-hidden'
      >
        <LandingContainer className='pointer-events-none relative z-10 min-[931px]:flex min-[931px]:min-h-[620px] min-[931px]:items-center min-[1121px]:min-h-[660px]'>
          <div className='pointer-events-auto min-w-0 pt-[50px] pb-7 motion-safe:animate-advisory-hero focus-within:animate-none min-[681px]:pt-[60px] min-[681px]:pb-9 min-[931px]:w-[55%] min-[931px]:py-[76px] min-[1121px]:w-[54%] min-[1121px]:py-[88px]'>
            <h1
              id='hero-title'
              className='m-0 mb-6 max-w-[570px] font-advisory-heading text-[clamp(38px,9.5vw,54px)] leading-[1.14] font-bold tracking-normal text-midnight min-[681px]:mb-[30px] min-[681px]:max-w-[650px] min-[681px]:text-[clamp(37px,5.15vw,52px)] min-[931px]:text-[clamp(42px,5.1vw,58px)] min-[1121px]:text-[clamp(46px,4.85vw,66px)]'
            >
              Thinking about selling your business?
            </h1>
            <p className='m-0 mb-[27px] max-w-[560px] text-[17px] leading-[1.7] text-ink min-[681px]:mb-[33px] min-[681px]:max-w-[580px] min-[681px]:text-base min-[681px]:leading-[1.8] min-[931px]:text-[17px] min-[1121px]:text-lg'>
              You have spent years building your business. When the time comes
              to sell, you deserve an advisor who handles the process carefully,
              protects your confidentiality and works for your best outcome.
            </p>
            <div className='flex flex-col flex-wrap items-start gap-[13px] min-[426px]:flex-row min-[426px]:items-center min-[426px]:gap-3.5 min-[681px]:flex-col min-[681px]:items-start min-[931px]:flex-row min-[931px]:items-center min-[931px]:gap-x-[27px] min-[931px]:gap-y-[22px]'>
              <LandingButtonLink href='#contact'>
                Discuss selling my business
              </LandingButtonLink>
              <LandingTextLink
                href='#buying'
                className='py-[5px] min-[931px]:py-0'
              >
                I want to buy a business
              </LandingTextLink>
            </div>
          </div>
        </LandingContainer>
        <figure className='group/image relative m-0 h-[clamp(280px,65vw,440px)] w-full overflow-hidden min-[931px]:absolute min-[931px]:inset-y-0 min-[931px]:right-0 min-[931px]:h-auto min-[931px]:w-[60%]'>
          <LandingImage
            src={landingImages.hero.src}
            alt={landingImages.hero.alt}
            quality={85}
            preload
            fill
            sizes='(max-width: 930px) 100vw, 60vw'
            className='object-cover object-[60%_center]'
          />
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 bg-linear-to-b from-canvas via-canvas/60 via-[8%] to-canvas/0 to-[35%] min-[931px]:bg-linear-to-r min-[931px]:via-canvas/90 min-[931px]:via-[22%] min-[931px]:to-[55%]'
          />
        </figure>
      </section>
    </LandingTheme>
  );
}
