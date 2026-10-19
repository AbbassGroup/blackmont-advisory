import { LandingContainer } from '@/components/landing/presentation';

const sellingPoints = [
  'Accurate market positioning',
  'Access to qualified buyers',
  'Confidential marketing',
  'Negotiation expertise',
  'End-to-end deal management',
  'Buyer qualification and filtering',
];

const buyingPoints = [
  'Business identification',
  'Deal assessment',
  'Negotiation strategy',
  'Market insight',
  'Acquisition structuring support',
];

type ValueColumnProps = {
  headingId: string;
  title: string;
  subtitle: string;
  points: string[];
  resultText: string;
};

function ValueColumn({
  headingId,
  title,
  subtitle,
  points,
  resultText,
}: ValueColumnProps) {
  return (
    <section
      aria-labelledby={headingId}
      className='grid min-w-0 min-[931px]:row-span-4 min-[931px]:grid-rows-subgrid'
    >
      <h3
        id={headingId}
        className='m-0 pb-3 font-advisory-heading text-[24px] leading-[1.4] font-bold tracking-normal text-midnight min-[681px]:text-[28px]'
      >
        {title}
      </h3>
      <p className='m-0 pb-5 text-base leading-[1.8] min-[681px]:text-[17px]'>{subtitle}</p>
      <ul role='list' className='m-0 list-none p-0 pb-6'>
        {points.map((point) => (
          <li key={point} className='border-t border-advisory-rule py-3 text-base leading-[1.7] min-[681px]:text-[17px]'>
            {point}
          </li>
        ))}
      </ul>
      <p className='m-0 border-t border-advisory-rule pt-5 text-[15px] leading-[1.8] font-medium text-midnight'>
        {resultText}
      </p>
    </section>
  );
}

export function HowAddValue() {
  return (
    <section
      aria-labelledby='partnership-value-title'
      className='bg-canvas text-ink py-14 min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='partnership-value-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          How we add value to your clients
        </h2>
        <div className='mt-8 grid gap-10 min-[681px]:mt-10 min-[931px]:grid-cols-2 min-[931px]:gap-x-12 min-[931px]:gap-y-0 min-[1121px]:gap-x-16'>
          <ValueColumn
            headingId='partnership-selling-value-title'
            title='For clients selling a business'
            subtitle='We provide:'
            points={sellingPoints}
            resultText='Greater sales confidence, smoother transactions, and stronger outcomes.'
          />
          <ValueColumn
            headingId='partnership-buying-value-title'
            title='For clients buying a business'
            subtitle='We assist with:'
            points={buyingPoints}
            resultText='We work collaboratively with you to ensure the deal is structured correctly for our mutual client.'
          />
        </div>
      </LandingContainer>
    </section>
  );
}
