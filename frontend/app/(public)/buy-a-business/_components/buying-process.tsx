import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingContainer } from '@/components/landing/presentation';

const buyingProcess = [
  {
    step: '1',
    title: 'Independent advice',
    description:
      'We define what you want to buy, your budget, risk tolerance, and return goals.',
  },
  {
    step: '2',
    title: 'Business search',
    description:
      'We find and qualify potential businesses through our network, databases, and off-market connections.',
  },
  {
    step: '3',
    title: 'Analysis & valuation',
    description:
      'We review financials, performance drivers, and growth potential.',
  },
  {
    step: '4',
    title: 'Negotiation & offer',
    description:
      'We negotiate directly with the broker or owner to secure the best possible deal for you.',
  },
  {
    step: '5',
    title: 'Due diligence & settlement',
    description:
      'We coordinate with accountants and lawyers to ensure a smooth and safe acquisition.',
  },
  {
    step: '6',
    title: 'Transition & handover',
    description:
      'We guide the transition of everything across to you and ensure you receive an adequate handover.',
  },
];

export function BuyingProcess() {
  return (
    <LandingTheme>
      <section
        id='buying-process'
        aria-labelledby='buying-process-title'
        className='py-14 min-[681px]:py-20'
      >
        <LandingContainer>
          <div className='mb-7 min-[681px]:mb-9'>
            <h2
              id='buying-process-title'
              className='m-0 mb-5 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
            >
              Our business buying process
            </h2>
            <p className='m-0 max-w-[760px] text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>
              Buying a business is complex, but we make it simple.
            </p>
          </div>

          <ol role='list' className='m-0 list-none border-b border-advisory-rule p-0'>
            {buyingProcess.map((step) => (
              <li
                key={step.step}
                className='grid min-w-0 grid-cols-[24px_minmax(0,1fr)] gap-3 border-t border-advisory-rule py-5 min-[681px]:grid-cols-[36px_minmax(0,1fr)] min-[681px]:gap-6 min-[931px]:py-6'
              >
                <span aria-hidden className='pt-0.5 text-base leading-[1.75] font-semibold text-midnight tabular-nums'>
                  {step.step}.
                </span>
                <div className='grid min-w-0 gap-2 min-[931px]:grid-cols-[0.8fr_1.2fr] min-[931px]:gap-[clamp(32px,4vw,56px)]'>
                  <h3 className='m-0 font-advisory-heading text-xl leading-[1.4] font-bold tracking-normal text-midnight min-[681px]:text-[23px]'>
                    {step.title}
                  </h3>
                  <p className='m-0 max-w-[640px] text-[15px] leading-[1.8] text-ink min-[681px]:text-base'>
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
