import { ArrowRight } from 'lucide-react';
import { LandingButtonLink } from '@/components/landing/presentation';
import {
  SectionShell,
  bodyText,
} from '@/components/landing/tabbed-page/section-shell';

const STEPS = [
  {
    title: 'Your brief',
    text: 'We work out what you want to buy, your budget, your appetite for risk and the return you need.',
  },
  {
    title: 'The search',
    text: 'We find and qualify businesses through listings, broker networks and direct, off-market approaches to owners.',
  },
  {
    title: 'Analysis and valuation',
    text: 'We check the financials, what drives the results and the growth potential, and tell you what the business is worth.',
  },
  {
    title: 'Negotiation and offer',
    text: 'We negotiate with the owner or their broker to get you the right price and terms.',
  },
  {
    title: 'Due diligence and settlement',
    text: 'We work with your accountant and lawyer to check everything before you commit, then take the deal to settlement.',
  },
  {
    title: 'Transition and handover',
    text: 'We make sure the handover is properly planned, so you take over a business that keeps running.',
  },
];

export function HowWeWork() {
  return (
    <SectionShell
      id='how-we-work'
      tone='canvas'
      heading='How to buy a business, step by step'
      intro='The steps are the same for every purchase, but the detail changes with each buyer and each business.'
    >
      <ol className='m-0 grid list-none gap-x-10 p-0 min-[931px]:grid-cols-2'>
        {STEPS.map(({ title, text }, i) => (
          <li key={title} className='flex gap-5 border-t border-advisory-rule py-6'>
            <span
              aria-hidden='true'
              className='font-advisory-heading text-[28px] leading-none font-bold text-gilt'
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className='min-w-0'>
              <h3 className='m-0 mb-2 font-advisory-heading text-xl leading-[1.35] font-bold tracking-normal text-midnight'>
                <span className='sr-only'>Step {i + 1}: </span>
                {title}
              </h3>
              <p className={bodyText}>{text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className='mt-10 flex justify-center'>
        <LandingButtonLink href='#enquire' className='group'>
          Discuss your acquisition
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
