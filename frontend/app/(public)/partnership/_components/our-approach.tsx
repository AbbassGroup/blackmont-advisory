import { LandingImage } from '@/components/landing/landing-image';
import { LandingContainer } from '@/components/landing/presentation';
import financialPlanning from '@/public/landing/partnership-financial-planning.jpeg';

const focusPoints = [
  'Strategic preparation',
  'Accurate valuations',
  'Serious buyer engagement',
  'Structured negotiation',
  'Professional execution',
];

export function OurApproach() {
  return (
    <section
      aria-labelledby='partnership-approach-title'
      className='bg-white py-14 text-ink min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='partnership-approach-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          Our approach
        </h2>
        <div className='mt-8 grid items-stretch gap-8 min-[681px]:mt-10 min-[931px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] min-[931px]:gap-12 min-[1121px]:gap-16'>
          <div className='min-w-0 min-[931px]:self-center'>
            <h3 className='m-0 mb-5 max-w-[560px] font-advisory-heading text-[24px] leading-[1.45] font-bold tracking-normal text-midnight min-[681px]:text-[27px]'>
              Boutique. Strategic. Relationship-driven.
            </h3>
            <p className='m-0 max-w-[70ch] text-base leading-[1.8] min-[681px]:text-[17px]'>
              Blackmont Advisory is a Melbourne-based firm specialising in
              business sales across Australia.
            </p>

            <p className='mt-5 mb-3 text-base leading-[1.8]'>We focus on:</p>
            <ul role='list' className='m-0 grid list-none gap-x-6 gap-y-3 p-0 min-[681px]:grid-cols-2'>
              {focusPoints.map((point) => (
                <li
                  key={point}
                  className='flex items-start gap-3 text-base leading-[1.7] min-[681px]:text-[17px]'
                >
                  <span aria-hidden='true' className='mt-3 size-1 shrink-0 bg-gilt' />
                  {point}
                </li>
              ))}
            </ul>
            <p className='mt-6 mb-0 max-w-[70ch] border-t border-advisory-rule pt-5 text-base leading-[1.8] font-medium text-midnight'>
              Our approach aligns naturally with professional advisory firms
              who prioritise quality and reputation.
            </p>
          </div>
          <figure className='group/image relative m-0 aspect-[4/3] overflow-hidden min-[931px]:aspect-auto min-[931px]:min-h-[460px]'>
            <LandingImage
              src={financialPlanning}
              alt='Illustrative photograph of a professional reviewing printed business charts and reports'
              fill
              sizes='(max-width: 930px) 100vw, (max-width: 1444px) 52vw, 670px'
              className='object-cover object-[center_85%]'
              unoptimized
              loading='lazy'
            />
          </figure>
        </div>
      </LandingContainer>
    </section>
  );
}
