import { LandingContainer } from '@/components/landing/presentation';

type IndustrySaleTimingProps = {
  days: string;
  description: string;
};

export function IndustrySaleTiming({ days, description }: IndustrySaleTimingProps) {
  return (
    <section
      aria-labelledby='industry-sale-timing-title'
      className='bg-canvas py-14 text-ink min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='industry-sale-timing-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          How long it takes to sell
        </h2>

        <div className='mt-7 grid items-start gap-6 border-t border-advisory-rule pt-6 min-[931px]:grid-cols-[0.65fr_1.35fr] min-[931px]:gap-12 min-[1121px]:gap-16'>
          <dl className='m-0'>
            <dt className='text-sm leading-relaxed'>Typical time to sell</dt>
            <dd className='m-0 mt-2 font-advisory-heading text-[28px] leading-[1.35] font-bold text-midnight min-[681px]:text-[32px]'>
              {days}
            </dd>
          </dl>
          <p className='m-0 max-w-[75ch] text-base leading-[1.8] min-[681px]:text-[17px]'>
            {description}
          </p>
        </div>
      </LandingContainer>
    </section>
  );
}
