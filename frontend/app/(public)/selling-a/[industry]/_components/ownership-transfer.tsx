import { LandingContainer } from '@/components/landing/presentation';
import type { IndustryPage } from '@/lib/data/industry-benchmarks';

export function OwnershipTransfer({ transfer }: { transfer: IndustryPage['transfer'] }) {
  return (
    <section
      aria-labelledby='ownership-transfer-title'
      className='bg-canvas text-ink py-14 min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='ownership-transfer-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          {transfer.heading}
        </h2>
        <div className='mt-6 grid gap-5 text-base leading-[1.8] min-[681px]:text-[17px] min-[931px]:grid-cols-2 min-[931px]:gap-x-12 min-[931px]:gap-y-6 min-[1121px]:gap-x-16'>
          {transfer.body.map((paragraph, index) => (
            <p
              key={paragraph}
              className={index === 0 && transfer.body.length > 2
                ? 'm-0 max-w-[960px] min-[931px]:col-span-2'
                : 'm-0 max-w-[75ch]'}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}
