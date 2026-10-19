import { LandingImage } from '@/components/landing/landing-image';
import {
  LandingButtonLink,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';
import { Breadcrumbs, type Crumb } from '@/components/seo/breadcrumbs';
import ownerReview from '@/public/landing/industry-owner-review.jpeg';

type IndustryBannerProps = {
  title: string;
  intro: string;
  note: string;
  crumbs: Crumb[];
  headline: { label: string; value: string }[];
};

export function IndustryBanner({
  title,
  intro,
  note,
  crumbs,
  headline,
}: IndustryBannerProps) {
  return (
    <>
      <section
        aria-labelledby='industry-title'
        className='relative isolate overflow-hidden bg-canvas'
      >
        <LandingContainer className='pointer-events-none relative z-10 min-[931px]:flex min-[931px]:min-h-[620px] min-[931px]:items-center'>
          <div className='pointer-events-auto min-w-0 min-[931px]:w-[58%] min-[1121px]:w-[57%] py-12 min-[681px]:py-14 min-[931px]:py-16 min-[1121px]:py-20'>
            <Breadcrumbs items={crumbs} tone='light' />
            <h1
              id='industry-title'
              className='m-0 mt-8 mb-6 max-w-[690px] font-advisory-heading text-[clamp(34px,8vw,48px)] leading-[1.2] font-bold tracking-normal text-midnight min-[931px]:text-[clamp(38px,3.8vw,54px)]'
            >
              {title}
            </h1>
            <p className='m-0 mb-5 max-w-[590px] text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>
              {intro}
            </p>
            <p className='m-0 max-w-[570px] text-[15px] leading-[1.75] text-ink'>
              {note}
            </p>
            <nav
              aria-label='Industry guide actions'
              className='mt-7 flex flex-wrap items-center gap-x-6 gap-y-4'
            >
              <LandingButtonLink href='/exit/valuation'>
                Estimate your own range
              </LandingButtonLink>
              <LandingTextLink href='/#contact' className='inline-flex min-h-11 items-center'>
                Speak with Blackmont
              </LandingTextLink>
            </nav>
          </div>
        </LandingContainer>

        <figure className='group/image relative m-0 h-[clamp(280px,65vw,440px)] w-full overflow-hidden min-[931px]:absolute min-[931px]:inset-y-0 min-[931px]:right-0 min-[931px]:h-auto min-[931px]:w-[60%]'>
          <LandingImage
            src={ownerReview}
            alt='Illustrative photograph of a professional reviewing business documents at a desk'
            unoptimized
            preload
            fill
            sizes='(max-width: 930px) 100vw, 60vw'
            className='object-cover object-[65%_center]'
          />
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 bg-linear-to-b from-canvas via-canvas/60 via-[6%] to-canvas/0 to-[22%] min-[931px]:bg-linear-to-r min-[931px]:via-canvas/90 min-[931px]:via-[22%] min-[931px]:to-[55%]'
          />
        </figure>
      </section>

      <section aria-label='Industry sale benchmarks' className='border-b border-advisory-rule bg-white py-8 min-[681px]:py-10'>
        <LandingContainer>
          <dl className='m-0 grid grid-cols-2 gap-x-6 gap-y-7 min-[1121px]:grid-cols-4 min-[1121px]:gap-x-10'>
            {headline.map(({ label, value }, index) => (
              <div key={label} className='min-w-0 pt-4'>
                <dt className='text-[13px] leading-relaxed text-ink min-[681px]:text-sm'>
                  {label}
                </dt>
                <dd className={index < 2
                  ? 'm-0 mt-2 font-advisory-heading text-[clamp(17px,4.4vw,22px)] leading-[1.4] font-bold text-midnight min-[681px]:text-[27px]'
                  : 'm-0 mt-2 text-[19px] leading-[1.4] font-semibold text-midnight min-[681px]:text-[23px]'}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </LandingContainer>
      </section>
    </>
  );
}
