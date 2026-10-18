import { PartnershipModal } from '@/components/global/partnership-modal';
import { LandingImage } from '@/components/landing/landing-image';
import {
  LandingButton,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import collaboration from '@/public/landing/partnership-collaboration.jpeg';

const crumbs = [
  { name: 'Home', path: '' },
  { name: 'Partnership', path: '/partnership' },
];

export function PartnershipHero() {
  return (
    <section
      aria-labelledby='partnership-title'
      className='relative isolate overflow-hidden bg-canvas'
    >
      <LandingContainer className='pointer-events-none relative z-10 min-[931px]:flex min-[931px]:min-h-[580px] min-[931px]:items-center min-[1121px]:min-h-[620px]'>
        <div className='pointer-events-auto min-w-0 pt-10 pb-8 min-[681px]:pt-12 min-[681px]:pb-9 min-[931px]:w-[55%] min-[931px]:py-14 min-[1121px]:w-[54%] min-[1121px]:py-16'>
          <Breadcrumbs items={crumbs} tone='light' />
          <h1
            id='partnership-title'
            className='m-0 mt-7 mb-6 max-w-[650px] font-advisory-heading text-[clamp(38px,9.5vw,54px)] leading-[1.16] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(40px,5.1vw,54px)] min-[931px]:text-[clamp(42px,4.8vw,64px)] min-[1121px]:text-[clamp(46px,4.7vw,66px)]'
          >
            Partnering with Blackmont
          </h1>
          <p className='m-0 max-w-[540px] text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>
            If you would like to explore how Blackmont Advisory can support your
            firm and your clients, we welcome a confidential discussion.
          </p>
          <div className='mt-7 flex flex-wrap items-center gap-x-6 gap-y-4'>
            <PartnershipModal>
              <LandingButton>Book a confidential discussion</LandingButton>
            </PartnershipModal>
            <LandingTextLink href='#partnership-models' className='inline-flex min-h-11 items-center'>
              How we work with you
            </LandingTextLink>
          </div>
        </div>
      </LandingContainer>

      <figure className='group/image relative m-0 h-[clamp(280px,65vw,440px)] w-full overflow-hidden min-[931px]:absolute min-[931px]:inset-y-0 min-[931px]:right-0 min-[931px]:h-auto min-[931px]:w-[60%]'>
        <LandingImage
          src={collaboration}
          alt='Illustrative photograph of two colleagues exchanging documents across an office desk'
          unoptimized
          preload
          fill
          sizes='(max-width: 930px) 100vw, 60vw'
          className='object-cover object-[78%_center]'
        />
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 bg-linear-to-b from-canvas via-canvas/60 via-[6%] to-canvas/0 to-[22%] min-[931px]:bg-linear-to-r min-[931px]:via-canvas/90 min-[931px]:via-[22%] min-[931px]:to-[55%]'
        />
      </figure>
    </section>
  );
}
