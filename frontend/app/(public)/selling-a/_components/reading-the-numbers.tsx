import { ArrowUpRight } from 'lucide-react';
import {
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';
import { LastUpdated } from '@/components/seo/last-updated';

const actions = [
  {
    href: '/exit/valuation',
    title: 'Estimate your own range',
    detail: 'Free valuation tool. Five questions, indicative range.',
  },
  {
    href: '/#contact',
    title: 'Talk to a broker confidentially',
    detail: 'A 30-minute strategy call. No obligation.',
  },
];

export function ReadingTheNumbers() {
  return (
    <section
      aria-labelledby='reading-the-numbers-title'
      className='bg-white py-14 text-ink min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='reading-the-numbers-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          How to read these numbers
        </h2>

        <div className='mt-6 grid gap-5 text-base leading-[1.8] min-[681px]:text-[17px] min-[931px]:grid-cols-2 min-[931px]:gap-12 min-[1121px]:gap-16'>
          <p className='m-0'>
            A range is not a valuation. Where a specific business lands depends
            on the quality of its financial records, how dependent it is on the
            owner, how concentrated its customers are, and what the buyer intends
            to do with it. Two businesses in the same sector with identical
            profit can sell for very different numbers.
          </p>
          <p className='m-0'>
            These figures are indicative ranges drawn from the Australian SME
            market. Treat them as a starting point for a conversation, not as an
            appraisal of your business.
          </p>
        </div>

        <nav
          aria-label='Business valuation next steps'
          className='mt-9 grid gap-8 min-[681px]:mt-10 min-[931px]:grid-cols-2 min-[931px]:gap-12 min-[1121px]:gap-16'
        >
          {actions.map(({ href, title, detail }) => (
            <div key={href} className='border-t border-advisory-rule pt-6'>
              <LandingTextLink
                href={href}
                className='inline-flex min-h-11 items-center gap-4 font-advisory-heading text-[22px] leading-[1.4] no-underline min-[681px]:text-[25px]'
              >
                {title}
                <ArrowUpRight aria-hidden='true' className='size-5 shrink-0 text-gilt' />
              </LandingTextLink>
              <p className='mt-2 mb-0 text-[15px] leading-[1.75]'>{detail}</p>
            </div>
          ))}
        </nav>

        <div className='mt-10 border-t border-advisory-rule pt-5 [&>p]:m-0 [&>p]:text-ink'>
          <LastUpdated />
        </div>
      </LandingContainer>
    </section>
  );
}
