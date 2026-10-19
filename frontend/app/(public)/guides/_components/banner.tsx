import { LandingImage } from '@/components/landing/landing-image';
import {
  LandingButtonLink,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';
import { Breadcrumbs, type Crumb } from '@/components/seo/breadcrumbs';
import businessPlanning from '@/public/landing/guides-business-planning.jpeg';

export function GuidesBanner({ title, crumbs }: { title: string; crumbs: Crumb[] }) {
  return (
    <section aria-labelledby='guides-page-title' className='relative isolate overflow-hidden bg-canvas'>
      <LandingContainer className='pointer-events-none relative z-10 min-[931px]:flex min-[931px]:min-h-[540px] min-[931px]:items-center min-[1121px]:min-h-[580px]'>
        <div className='pointer-events-auto min-w-0 min-[931px]:w-[56%] min-[1121px]:w-[55%] py-12 min-[681px]:py-14 min-[931px]:py-16 min-[1121px]:py-20'>
          <Breadcrumbs items={crumbs} tone='light' />
          <h1
            id='guides-page-title'
            className='m-0 mt-8 mb-6 max-w-[660px] font-advisory-heading text-[clamp(36px,8.7vw,50px)] leading-[1.18] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(40px,5vw,54px)] min-[931px]:text-[clamp(42px,4.4vw,60px)] min-[1121px]:text-[clamp(46px,4.5vw,64px)]'
          >
            {title}
          </h1>
          <p className='m-0 max-w-[560px] text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>
            Straight answers to the questions owners ask before they sell, drawn
            from the transactions we run rather than from general advice.
          </p>
          <nav aria-label='Selling guide actions' className='mt-7 flex flex-wrap items-center gap-x-6 gap-y-4'>
            <LandingButtonLink href='#selling-guides'>Read the guides</LandingButtonLink>
            <LandingTextLink href='/selling-a' className='inline-flex min-h-11 items-center'>
              Browse industries
            </LandingTextLink>
          </nav>
        </div>
      </LandingContainer>
      <figure className='group/image relative m-0 h-[clamp(280px,65vw,420px)] w-full overflow-hidden min-[931px]:absolute min-[931px]:inset-y-0 min-[931px]:right-0 min-[931px]:h-auto min-[931px]:w-[60%]'>
        <LandingImage
          src={businessPlanning}
          alt='Illustrative photograph of a person reading a notebook and making notes at a wooden table'
          unoptimized
          preload
          fill
          sizes='(max-width: 930px) 100vw, 60vw'
          className='object-cover object-[center_45%]'
        />
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 bg-linear-to-b from-canvas via-canvas/60 via-[6%] to-canvas/0 to-[22%] min-[931px]:bg-linear-to-r min-[931px]:via-canvas/90 min-[931px]:via-[22%] min-[931px]:to-[55%]'
        />
      </figure>
    </section>
  );
}
