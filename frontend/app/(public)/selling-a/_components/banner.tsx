import { LandingImage } from '@/components/landing/landing-image';
import { LandingTheme } from '@/components/landing/landing-theme';
import {
  LandingButtonLink,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';
import { Breadcrumbs, type Crumb } from '@/components/seo/breadcrumbs';
import marketAnalysis from '@/public/landing/selling-market-analysis.jpeg';

export function SellingBanner({ title, crumbs }: { title: string; crumbs: Crumb[] }) {
  return (
    <LandingTheme className='bg-canvas'>
      <section aria-labelledby='selling-overview-title' className='relative isolate overflow-hidden'>
        <LandingContainer className='pointer-events-none relative z-10 min-[931px]:flex min-[931px]:min-h-[600px] min-[931px]:items-center min-[1121px]:min-h-[640px]'>
          <div className='pointer-events-auto min-w-0 pt-10 pb-8 min-[681px]:pt-12 min-[681px]:pb-9 min-[931px]:w-[58%] min-[931px]:py-14 min-[1121px]:w-[57%] min-[1121px]:py-16'>
            <Breadcrumbs items={crumbs} tone='light' />
            <h1
              id='selling-overview-title'
              className='m-0 mt-7 mb-6 max-w-[680px] font-advisory-heading text-[clamp(34px,8.5vw,48px)] leading-[1.18] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(38px,4.8vw,50px)] min-[931px]:text-[clamp(40px,4.1vw,54px)] min-[1121px]:text-[clamp(44px,4.2vw,58px)]'
            >
              {title}
            </h1>
            <p className='m-0 mb-7 max-w-[580px] text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>
              Most owners have no reference point for what their business is
              actually worth. These are the ranges we see across the Australian SME
              market: what each sector typically sells for, how long a sale takes,
              and how much the size of the business changes the answer.
            </p>
            <nav aria-label='Selling overview actions' className='flex flex-wrap items-center gap-x-6 gap-y-4'>
              <LandingButtonLink href='#industry-multiples'>View industry multiples</LandingButtonLink>
              <LandingTextLink href='/exit/valuation' className='inline-flex min-h-11 items-center'>
                Estimate your own range
              </LandingTextLink>
            </nav>
          </div>
        </LandingContainer>
        <figure className='group/image relative m-0 h-[clamp(280px,65vw,440px)] w-full overflow-hidden min-[931px]:absolute min-[931px]:inset-y-0 min-[931px]:right-0 min-[931px]:h-auto min-[931px]:w-[60%]'>
          <LandingImage
            src={marketAnalysis}
            alt='Illustrative photograph of business financial reports and a calculator being used for analysis'
            unoptimized
            preload
            fill
            sizes='(max-width: 930px) 100vw, 60vw'
            className='object-cover object-[70%_70%]'
          />
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 bg-linear-to-b from-canvas via-canvas/60 via-[6%] to-canvas/0 to-[22%] min-[931px]:bg-linear-to-r min-[931px]:via-canvas/90 min-[931px]:via-[22%] min-[931px]:to-[55%]'
          />
        </figure>
      </section>
    </LandingTheme>
  );
}
