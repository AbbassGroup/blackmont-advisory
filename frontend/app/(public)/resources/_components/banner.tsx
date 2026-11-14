import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingImage } from '@/components/landing/landing-image';
import financialReview from '@/public/landing/resources-financial-review.jpeg';
import {
  LandingButtonLink,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';

/**
 * Shared banner for the Blogs / Guides / Case Studies tabs. Each tab passes its
 * own H1 and intro so the three pages don't share one heading.
 */
export function ResourcesBanner({ title, intro }: { title: string; intro: string }) {
  return (
    <LandingTheme className='bg-canvas'>
      <section
        aria-labelledby='resources-page-title'
        className='relative isolate overflow-hidden'
      >
        <LandingContainer className='pointer-events-none relative z-10 min-[931px]:flex min-[931px]:min-h-[520px] min-[931px]:items-center min-[1121px]:min-h-[560px]'>
          <div className='pointer-events-auto min-w-0 motion-safe:animate-advisory-hero focus-within:animate-none min-[931px]:w-[55%] min-[1121px]:w-[54%] py-12 min-[681px]:py-14 min-[931px]:py-16 min-[1121px]:py-20'>
          <h1
            id='resources-page-title'
            className='m-0 mb-6 max-w-[650px] font-advisory-heading text-[clamp(38px,9.5vw,54px)] leading-[1.14] font-bold tracking-normal text-midnight min-[681px]:mb-[32px] min-[681px]:text-[clamp(37px,5.15vw,52px)] min-[931px]:text-[clamp(42px,5.1vw,58px)] min-[1121px]:text-[clamp(46px,4.85vw,66px)]'
          >
            {title}
          </h1>
            <p className='m-0 mb-[28px] max-w-[540px] text-[17px] leading-[1.7] text-ink min-[681px]:mb-[32px] min-[1121px]:text-lg'>
              {intro}
            </p>
            <nav aria-label='Resources page sections' className='flex flex-wrap items-center gap-x-6 gap-y-3'>
              <LandingButtonLink href='#resource-tools'>
                Explore free tools
              </LandingButtonLink>
              <LandingTextLink href='#resources-tabs' className='inline-flex min-h-11 items-center'>
                Browse blogs, guides and case studies
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
