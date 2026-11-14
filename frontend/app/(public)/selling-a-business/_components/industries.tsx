import { ArrowRight } from 'lucide-react';
import { LandingLink } from '@/components/landing/landing-link';
import { LandingButtonLink } from '@/components/landing/presentation';
import { indexableIndustryPages } from '@/lib/data/industry-benchmarks';
import { SectionShell } from '@/components/landing/tabbed-page/section-shell';

export function Industries() {
  const industries = indexableIndustryPages();

  return (
    <SectionShell
      id='industries'
      heading='Selling a business in your industry'
      intro='Buyers look for different things in different industries. Check the typical multiple and time to sell for yours.'
    >
      <ul className='m-0 grid list-none gap-px border border-advisory-rule bg-advisory-rule p-0 min-[541px]:grid-cols-2 min-[931px]:grid-cols-3 min-[1121px]:grid-cols-5'>
        {industries.map(({ name, multi, days, page }) => (
          <li key={page.slug} className='bg-white'>
            <LandingLink
              href={`/selling-a/${page.slug}`}
              className='group flex h-full flex-col p-5 transition-colors duration-200 hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none'
            >
              <span className='mb-3 font-advisory-heading text-lg leading-[1.35] font-bold text-midnight'>
                {page.h1.replace(/ in Australia$/, '')}
              </span>
              <span className='text-sm leading-[1.6] text-ink'>
                <span className='sr-only'>{name}: </span>
                Typical multiple {multi.trim()}
                <br />
                Time to sell {days}
              </span>
              <ArrowRight
                size={16}
                aria-hidden='true'
                className='mt-4 text-gilt transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none'
              />
            </LandingLink>
          </li>
        ))}
      </ul>
      <div className='mt-10 flex justify-center'>
        <LandingButtonLink href='/selling-a' className='group'>
          Compare what businesses sell for in Australia
          <ArrowRight
            size={16}
            aria-hidden='true'
            className='transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none'
          />
        </LandingButtonLink>
      </div>
    </SectionShell>
  );
}
