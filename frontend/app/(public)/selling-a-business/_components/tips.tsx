import { ArrowRight } from 'lucide-react';
import { LandingButtonLink } from '@/components/landing/presentation';
import { SectionShell, bodyText } from '@/components/landing/tabbed-page/section-shell';

const TIPS = [
  {
    title: 'Get your financials in order',
    text: 'Start 12 to 24 months out if you can. Buyers want three years of reconciled accounts that match your tax returns.',
  },
  {
    title: 'Make yourself less essential',
    text: 'If the business depends on you for sales, supplier relationships or know-how, buyers discount the price. Document systems and delegate.',
  },
  {
    title: 'Secure your lease',
    text: 'A lease with enough term remaining, and that can be assigned to a buyer, is often a condition of finance. Talk to your landlord early.',
  },
  {
    title: 'Reduce customer concentration',
    text: 'When one customer accounts for a large share of revenue, buyers see risk. Formal contracts with key customers help.',
  },
  {
    title: 'Keep trading strongly during the sale',
    text: 'Buyers watch the current year closely. A dip while you are distracted by the sale can cost more than any other mistake.',
  },
  {
    title: 'Know your number and your terms',
    text: 'Decide the lowest price you will accept and the terms that matter to you, such as handover period, staff and timing, before offers arrive.',
  },
];

export function Tips() {
  return (
    <SectionShell
      id='tips'
      heading='Is your business ready to sell?'
      intro='Good preparation does more for your sale price than almost anything else. These six steps make a business easier to sell and harder to knock down on price.'
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
      <div className='mt-10 flex flex-wrap justify-center gap-3'>
        <LandingButtonLink href='/guides/is-my-business-ready-to-sell' className='group'>
          Is my business ready to sell?
          <ArrowRight
            size={16}
            aria-hidden='true'
            className='transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none'
          />
        </LandingButtonLink>
        <LandingButtonLink href='/exit/exit-planning' variant='outline'>
          Exit planning guide
        </LandingButtonLink>
      </div>
    </SectionShell>
  );
}
