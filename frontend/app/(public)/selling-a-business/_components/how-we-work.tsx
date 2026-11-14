import { ArrowRight } from 'lucide-react';
import { LandingButtonLink } from '@/components/landing/presentation';
import { SectionShell, bodyText } from '@/components/landing/tabbed-page/section-shell';

const STEPS = [
  {
    title: 'A private conversation',
    text: 'We talk about your business, your timing and what you want next, at no cost.',
  },
  {
    title: 'Valuation and sale readiness',
    text: 'We go through your financials and give you a realistic price range.',
  },
  {
    title: 'Preparing the business for market',
    text: 'We prepare an anonymous teaser, an Information Memorandum and the documents buyers will ask for.',
  },
  {
    title: 'Confidential buyer outreach',
    text: 'We approach qualified buyers privately, and you approve each one before they see any details.',
  },
  {
    title: 'Offers, negotiation and due diligence',
    text: 'We weigh up offers, negotiate for you and manage due diligence with your accountant and lawyer.',
  },
  {
    title: 'Settlement and handover',
    text: 'We take the sale through contracts and settlement, then help with the handover.',
  },
];

export function HowWeWork() {
  return (
    <SectionShell
      id='how-we-work'
      tone='canvas'
      heading='How to sell a business, step by step'
      intro="The steps are the same for every sale, but the detail changes with each business. Once it's on the market, most businesses sell in 60 to 240 days, depending on the industry."
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
        <LandingButtonLink
          href='/guides/how-long-does-it-take-to-sell-a-business'
          className='group'
        >
          How long it takes to sell a business
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
