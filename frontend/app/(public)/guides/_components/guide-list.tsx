import { ArrowUpRight } from 'lucide-react';
import { LandingContainer } from '@/components/landing/presentation';
import { LandingLink } from '@/components/landing/landing-link';
import type { Guide } from '@/lib/data/guides';

export function GuideList({ guides }: { guides: Guide[] }) {
  return (
    <section id='selling-guides' aria-label='Selling guides' className='scroll-mt-28 bg-white text-ink py-14 min-[681px]:py-16 min-[1121px]:py-20'>
      <LandingContainer>
        <ul role='list' className='m-0 list-none border-b border-advisory-rule p-0'>
          {guides.map(({ slug, h1, summary }) => (
            <li key={slug} className='border-t border-advisory-rule'>
              <LandingLink
                href={`/guides/${slug}`}
                className='group grid grid-cols-[minmax(0,1fr)_24px] items-start gap-x-5 gap-y-3 py-6 text-midnight no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt min-[681px]:py-8 min-[931px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)_24px] min-[931px]:gap-x-10 min-[1121px]:gap-x-12'
              >
                <h2 className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold tracking-normal transition-colors duration-200 group-hover:text-gilt motion-reduce:transition-none min-[681px]:text-[27px]'>
                  {h1}
                </h2>
                <p className='col-start-1 row-start-2 m-0 max-w-[70ch] text-base leading-[1.8] text-ink min-[681px]:text-[17px] min-[931px]:col-start-2 min-[931px]:row-start-1'>
                  {summary}
                </p>
                <ArrowUpRight aria-hidden='true' className='col-start-2 row-start-1 mt-1 size-5 shrink-0 text-gilt min-[931px]:col-start-3' />
              </LandingLink>
            </li>
          ))}
        </ul>
      </LandingContainer>
    </section>
  );
}
