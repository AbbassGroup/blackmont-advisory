import { ArrowRight, Check } from 'lucide-react';
import { LandingButtonLink } from '@/components/landing/presentation';
import {
  SectionShell,
  bodyText,
  cardTitle,
} from '@/components/landing/tabbed-page/section-shell';

const VALUE_STEPS = [
  {
    title: 'Check the financials',
    text: 'Rebuild the profit from the accounts, add back genuine one-off and personal expenses, and make sure it matches the tax returns and BAS.',
  },
  {
    title: 'Compare with the market',
    text: 'Apply a multiple that suits the industry and the size of the business. Asking prices are often set above what the numbers support.',
  },
  {
    title: 'Price the risk',
    text: 'Owner dependency, a short lease, one big customer or falling revenue are all reasons to pay less, or to change the terms.',
  },
];

const CHECKLIST = [
  'Three years of financials, checked against tax returns and BAS',
  'Lease term, rent and whether the lease can be assigned to you',
  'Staff, their entitlements and who the key people are',
  'Customer and supplier concentration, and the contracts behind them',
  'Licences, permits and regulatory compliance',
  'Condition of equipment, vehicles and stock',
];

export function DueDiligence() {
  return (
    <SectionShell
      id='due-diligence'
      heading='How to value a business before you buy'
      intro='The asking price is the seller’s opinion. Here is how to work out what a business is really worth, and what to check before you commit.'
    >
      <ol className='m-0 grid list-none gap-6 p-0 min-[931px]:grid-cols-3'>
        {VALUE_STEPS.map(({ title, text }, i) => (
          <li key={title} className='border-t-2 border-gilt bg-canvas p-6'>
            <h3 className={cardTitle}>
              <span className='text-gilt'>{i + 1}.</span> {title}
            </h3>
            <p className={bodyText}>{text}</p>
          </li>
        ))}
      </ol>

      <div className='mt-10 grid gap-8 min-[931px]:grid-cols-2 min-[931px]:gap-12'>
        <div>
          <h3 className='m-0 mb-4 font-advisory-heading text-2xl leading-[1.3] font-bold tracking-normal text-midnight'>
            Due diligence checklist
          </h3>
          <ul className='m-0 list-none space-y-3 p-0'>
            {CHECKLIST.map((item) => (
              <li key={item} className='flex items-start gap-3 text-[15px] leading-[1.6] text-ink min-[681px]:text-base'>
                <Check size={18} strokeWidth={2.25} aria-hidden='true' className='mt-[3px] shrink-0 text-gilt' />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className='m-0 mb-4 font-advisory-heading text-2xl leading-[1.3] font-bold tracking-normal text-midnight'>
            Financing a business acquisition
          </h3>
          <p className={`${bodyText} mb-4`}>
            Most purchases combine your own funds with bank lending, and the
            bank will run its own checks on the business. Talk to your lender
            early so you know your limit before you make an offer.
          </p>
          <p className={bodyText}>
            Vendor finance or an earn-out, where part of the price is paid
            later from the business’s results, can close a gap on price and
            keeps the seller invested in a smooth handover.
          </p>
        </div>
      </div>

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
