import { Minus, Plus } from 'lucide-react';
import { LandingContainer } from '@/components/landing/presentation';
import type { IndustryFaq } from '@/lib/data/industry-benchmarks';

export function IndustryFaqs({ items }: { items: IndustryFaq[] }) {
  if (!items.length) return null;

  return (
    <section
      aria-labelledby='industry-faq-title'
      className='bg-canvas text-ink py-14 min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='industry-faq-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          Common questions
        </h2>
        <div className='mt-8 border-b border-advisory-rule min-[681px]:mt-10'>
          {items.map(({ q, a }, index) => (
            <details key={q} open={index === 0} className='group border-t border-advisory-rule'>
              <summary className='flex min-h-16 cursor-pointer list-none items-start justify-between gap-5 py-5 text-midnight transition-colors duration-200 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt motion-reduce:transition-none min-[681px]:py-6 [&::-webkit-details-marker]:hidden'>
                <span className='font-advisory-heading text-[21px] leading-[1.45] font-bold tracking-normal min-[681px]:text-[24px]'>
                  {q}
                </span>
                <Plus aria-hidden='true' className='mt-1 size-5 shrink-0 text-gilt group-open:hidden' />
                <Minus aria-hidden='true' className='mt-1 hidden size-5 shrink-0 text-gilt group-open:block' />
              </summary>
              <p className='m-0 max-w-[960px] pr-10 pb-6 text-base leading-[1.8] min-[681px]:pb-7 min-[681px]:text-[17px]'>
                {a}
              </p>
            </details>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}
