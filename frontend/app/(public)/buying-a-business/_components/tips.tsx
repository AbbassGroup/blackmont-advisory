import { ArrowRight } from 'lucide-react';
import { LandingButtonLink } from '@/components/landing/presentation';
import {
  SectionShell,
  bodyText,
} from '@/components/landing/tabbed-page/section-shell';

const TIPS = [
  {
    title: 'Know exactly what you want',
    text: 'Set your industry, location, size and budget before you start, or every listing will look like an opportunity.',
  },
  {
    title: 'Get your finance lined up early',
    text: 'Know your borrowing limit and deposit before you make an offer. Sellers take buyers with finance in place more seriously.',
  },
  {
    title: 'Look past the asking price',
    text: 'Value the business on its verified earnings. The asking price is where the negotiation starts, not where it ends.',
  },
  {
    title: 'Never skip due diligence',
    text: 'Check the financials, the lease, the staff and the customers before you commit, however good the business looks.',
  },
  {
    title: 'Plan the handover',
    text: 'Agree how long the seller will stay to train you and introduce you to customers and suppliers.',
  },
  {
    title: 'Keep emotion out of it',
    text: 'Be ready to walk away. The most expensive mistake is buying the wrong business because you have fallen for it.',
  },
];

export function Tips() {
  return (
    <SectionShell
      id='tips'
      heading='Business buying tips'
      intro='Direct business buying tips that protect your money, whether you buy on your own or with an advisor.'
    >
      <ol className='m-0 grid list-none gap-x-10 gap-y-0 p-0 min-[931px]:grid-cols-2'>
        {TIPS.map(({ title, text }, i) => (
          <li key={title} className='border-t border-advisory-rule py-5'>
            <h3 className='m-0 mb-1.5 font-advisory-heading text-lg leading-[1.4] font-bold tracking-normal text-midnight'>
              <span className='text-gilt'>{i + 1}.</span> {title}
            </h3>
            <p className={bodyText}>{text}</p>
          </li>
        ))}
      </ol>
      <div className='mt-10 flex justify-center'>
        <LandingButtonLink href='#enquire' className='group'>
          Talk to a buying advisor
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
