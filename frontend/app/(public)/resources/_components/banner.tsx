import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingImage } from '@/components/landing/landing-image';
import financialReview from '@/public/landing/resources-financial-review.jpeg';
import {
  LandingButtonLink,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';

export function ResourcesBanner() {
  return (
    <LandingTheme className='bg-canvas'>
      <section
        aria-labelledby='resources-page-title'
        className='relative isolate overflow-hidden'
      >
        <LandingContainer className='pointer-events-none relative z-10 min-[931px]:flex min-[931px]:min-h-[520px] min-[931px]:items-center min-[1121px]:min-h-[560px]'>
          <div className='pointer-events-auto min-w-0 pt-[50px] pb-7 motion-safe:animate-advisory-hero focus-within:animate-none min-[681px]:pt-[60px] min-[681px]:pb-9 min-[931px]:w-[55%] min-[931px]:py-[76px] min-[1121px]:w-[54%] min-[1121px]:py-[88px]'>
          <h1
            id='resources-page-title'
            className='m-0 mb-6 max-w-[650px] font-advisory-heading text-[clamp(38px,9.5vw,54px)] leading-[1.14] font-bold tracking-normal text-midnight min-[681px]:mb-[30px] min-[681px]:text-[clamp(37px,5.15vw,52px)] min-[931px]:text-[clamp(42px,5.1vw,58px)] min-[1121px]:text-[clamp(46px,4.85vw,66px)]'
          >
            Resources &amp; blogs
          </h1>
            <p className='m-0 mb-[27px] max-w-[540px] text-[17px] leading-[1.7] text-ink min-[681px]:mb-[33px] min-[1121px]:text-lg'>
              Insights, guides, and tips for business owners, buyers, and sellers.
              Stay informed with the latest from Blackmont Advisory.
            </p>
            <nav aria-label='Resources page sections' className='flex flex-wrap items-center gap-x-6 gap-y-3'>
              <LandingButtonLink href='#resource-tools'>
                Explore free tools
              </LandingButtonLink>
              <LandingTextLink href='#articles' className='inline-flex min-h-11 items-center'>
                Read the articles
              </LandingTextLink>
            </nav>
          </div>
        </LandingContainer>
        <figure className='group/image relative m-0 h-[clamp(260px,65vw,400px)] w-full overflow-hidden min-[931px]:absolute min-[931px]:inset-y-0 min-[931px]:right-0 min-[931px]:h-auto min-[931px]:w-[60%]'>
          <LandingImage
            src={financialReview}
            alt='Illustrative photograph of a financial report being reviewed with a pen'
            unoptimized
            preload
            fill
            className='object-cover object-[65%_center]'
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
