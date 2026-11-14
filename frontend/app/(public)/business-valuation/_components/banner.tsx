import { Check } from 'lucide-react';
import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingImage } from '@/components/landing/landing-image';
import valuationImage from '@/public/valuation.webp';
import {
  LandingButtonLink,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';
import { Breadcrumbs, type Crumb } from '@/components/seo/breadcrumbs';

const POINTS = ['Free', 'Five quick questions', 'Instant indicative range'];

/** Same layout as the Resources and About banners: text left, photo fading in from the right. */
export function ValuationBanner({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <LandingTheme className='bg-canvas'>
      <section aria-labelledby='valuation-page-title' className='relative isolate overflow-hidden'>
        <LandingContainer className='pointer-events-none relative z-10 min-[931px]:flex min-[931px]:min-h-[520px] min-[931px]:items-center min-[1121px]:min-h-[560px]'>
          <div className='pointer-events-auto min-w-0 motion-safe:animate-advisory-hero focus-within:animate-none min-[931px]:w-[55%] min-[1121px]:w-[54%] py-12 min-[681px]:py-14 min-[931px]:py-16 min-[1121px]:py-20'>
            <Breadcrumbs items={crumbs} tone='light' />
            <h1
              id='valuation-page-title'
              className='m-0 mt-8 mb-6 max-w-[650px] font-advisory-heading text-[clamp(36px,9vw,52px)] leading-[1.14] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(37px,5vw,50px)] min-[931px]:text-[clamp(42px,4.8vw,56px)] min-[1121px]:text-[clamp(46px,4.5vw,62px)]'
            >
              Free Business Valuation Calculator
            </h1>
            <p className='m-0 mb-6 max-w-[540px] text-[17px] leading-[1.7] text-ink min-[1121px]:text-lg'>
              What is my business worth? Answer five quick questions to value
              your business and get an indicative price range, based on your
              earnings, industry and how the business is run.
            </p>
            <ul className='m-0 mb-8 flex list-none flex-wrap gap-x-6 gap-y-2 p-0'>
              {POINTS.map((point) => (
                <li key={point} className='flex items-center gap-2 text-[15px] font-semibold text-midnight'>
                  <Check size={17} strokeWidth={2.5} aria-hidden='true' className='text-gilt' />
                  {point}
                </li>
              ))}
            </ul>
            <nav aria-label='Valuation page sections' className='flex flex-wrap items-center gap-x-6 gap-y-3'>
              <LandingButtonLink href='#calculator'>Value your business</LandingButtonLink>
              <LandingTextLink href='#formula' className='inline-flex min-h-11 items-center'>
                How the formula works
              </LandingTextLink>
            </nav>
          </div>
        </LandingContainer>
        <figure className='group/image relative m-0 h-[clamp(260px,65vw,400px)] w-full overflow-hidden min-[931px]:absolute min-[931px]:inset-y-0 min-[931px]:right-0 min-[931px]:h-auto min-[931px]:w-[60%]'>
          <LandingImage
            src={valuationImage}
            alt='Illustrative photograph of business valuation charts on a laptop screen on an office desk'
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
