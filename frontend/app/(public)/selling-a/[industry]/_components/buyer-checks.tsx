import { Check } from 'lucide-react';
import { LandingContainer } from '@/components/landing/presentation';
import type { BuyerCheck } from '@/lib/data/industry-benchmarks';

export function BuyerChecks({ items }: { items: BuyerCheck[] }) {
  return (
    <section
      aria-labelledby='buyer-checks-title'
      className='bg-white text-ink py-14 min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='buyer-checks-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          What buyers will ask for
        </h2>
        <ul role='list' className='m-0 mt-8 list-none border-b border-advisory-rule p-0 min-[681px]:mt-10'>
          {items.map(({ label, detail }) => (
            <li key={label} className='flex items-start gap-4 border-t border-advisory-rule py-5 min-[681px]:gap-5 min-[681px]:py-6'>
              <Check aria-hidden='true' className='mt-1.5 size-5 shrink-0 text-gilt' />
              <p className='m-0 max-w-[100ch] text-base leading-[1.8] min-[681px]:text-[17px]'>
                <strong className='font-semibold text-midnight'>{label}.</strong>{' '}
                {detail}
              </p>
            </li>
          ))}
        </ul>
      </LandingContainer>
    </section>
  );
}
