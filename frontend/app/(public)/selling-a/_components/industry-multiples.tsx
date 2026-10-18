import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { LandingContainer } from '@/components/landing/presentation';
import {
  INDUSTRY_BENCHMARKS,
  indexableIndustryPages,
} from '@/lib/data/industry-benchmarks';

export function IndustryMultiples() {
  const linkable = new Map(
    indexableIndustryPages().map(({ name, page }) => [name, page]),
  );

  return (
    <section
      id='industry-multiples'
      aria-labelledby='industry-multiples-title'
      className='scroll-mt-28 bg-white py-14 text-ink min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='industry-multiples-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          Sale multiples by industry
        </h2>
        <p
          id='industry-multiples-description'
          className='mt-5 mb-0 max-w-[860px] text-base leading-[1.8] min-[681px]:text-[17px]'
        >
          Multiples are applied to EBITDA. The ranges below reflect typical
          outcomes for established, profitable businesses with clean financial
          records. Businesses that fall short on either count sit at the bottom
          of the range or below it.
        </p>

        <div
          role='region'
          aria-labelledby='industry-multiples-title'
          aria-describedby='industry-multiples-description'
          tabIndex={0}
          className='mt-8 overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt min-[681px]:mt-10'
        >
          <table className='w-full min-w-[820px] border-collapse text-left'>
            <caption className='sr-only'>
              Typical Australian business sale multiples, prices, time to sell
              and demand by industry.
            </caption>
            <thead className='border-y border-advisory-rule bg-canvas/60 text-sm font-semibold text-midnight'>
              <tr>
                <th scope='col' className='py-4 pr-5 pl-4 font-semibold'>Industry</th>
                <th scope='col' className='px-5 py-4 font-semibold'>EBITDA multiple</th>
                <th scope='col' className='px-5 py-4 font-semibold'>Typical price</th>
                <th scope='col' className='px-5 py-4 font-semibold'>Time to sell</th>
                <th scope='col' className='py-4 pr-4 pl-5 font-semibold'>Demand</th>
              </tr>
            </thead>
            <tbody>
              {INDUSTRY_BENCHMARKS.map(({ name, multi, price, days, demand }) => {
                const page = linkable.get(name);

                return (
                  <tr key={name} className='border-b border-advisory-rule'>
                    <th
                      scope='row'
                      className='py-6 pr-5 pl-4 text-base leading-relaxed font-semibold text-midnight min-[1121px]:text-[17px]'
                    >
                      {page ? (
                        <Link
                          href={`/selling-a/${page.slug}`}
                          className='inline-flex items-center gap-2 no-underline transition-colors duration-200 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt motion-reduce:transition-none'
                        >
                          {name}
                          <ArrowUpRight aria-hidden='true' className='size-4 shrink-0 text-gilt' />
                        </Link>
                      ) : name}
                    </th>
                    <td className='px-5 py-6 font-advisory-heading text-[21px] leading-relaxed font-bold whitespace-nowrap text-midnight min-[1121px]:text-[23px]'>
                      {multi.trim()}
                    </td>
                    <td className='px-5 py-6 font-advisory-heading text-[19px] leading-relaxed whitespace-nowrap text-midnight min-[1121px]:text-[21px]'>
                      {price}
                    </td>
                    <td className='px-5 py-6 text-[15px] leading-relaxed whitespace-nowrap'>
                      {days}
                    </td>
                    <td className='py-6 pr-4 pl-5 text-[15px] leading-relaxed font-medium whitespace-nowrap text-midnight'>
                      {demand}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </LandingContainer>
    </section>
  );
}
