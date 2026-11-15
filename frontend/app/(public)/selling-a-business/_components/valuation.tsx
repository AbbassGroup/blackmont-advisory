import { ArrowRight } from 'lucide-react';
import { LandingLink } from '@/components/landing/landing-link';
import { SectionShell, bodyText, cardTitle } from '@/components/landing/tabbed-page/section-shell';

const STEPS = [
  {
    title: 'Work out your true earnings',
    text: 'Start with EBITDA, then add back the owner’s personal and one-off expenses and adjust the owner’s wage to a market rate. This “normalised” figure is what a buyer is really paying for.',
  },
  {
    title: 'Apply an industry multiple',
    text: 'Multiply normalised earnings by a multiple that reflects your sector and size. Across the industries we track, multiples range from roughly 0.8× for cafés to around 5× for childcare and allied health.',
  },
  {
    title: 'Adjust for risk',
    text: 'Owner dependency, customer concentration, a short lease or falling revenue push the multiple down. Recurring revenue, a strong team and growth push it up.',
  },
];

const TOOLS = [
  {
    href: '/business-valuation',
    title: 'Free business valuation calculator',
    text: 'Value your business in a few minutes and get an indicative price range based on your industry and earnings.',
  },
  {
    href: '/exit/sale-readiness',
    title: 'Is your business sale ready?',
    text: 'Check your business against the things buyers examine before they make an offer.',
  },
  {
    href: '/exit/industry-benchmarks',
    title: 'Industry benchmark report',
    text: 'Compare your business against typical multiples and performance in your sector.',
  },
];

export function Valuation() {
  return (
    <SectionShell
      id='valuation'
      tone='canvas'
      heading='What is my business worth?'
      // intro='Most small and medium businesses in Australia are valued as a multiple of earnings. This is how the maths works, and how to set a price that actually sells.'
    >
      <ol className='m-0 grid list-none gap-6 p-0 min-[931px]:grid-cols-3'>
        {STEPS.map(({ title, text }, i) => (
          <li key={title} className='border-t-2 border-gilt bg-white p-6'>
            <h3 className={cardTitle}>
              <span className='text-gilt'>{i + 1}.</span> {title}
            </h3>
            <p className={bodyText}>{text}</p>
          </li>
        ))}
      </ol>

      <div className='mt-10 grid gap-6 min-[931px]:grid-cols-2'>
        <article className='flex flex-col border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
          <h3 className='m-0 font-advisory-heading text-xl leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:text-2xl'>
            How to calculate EBIT and EBITDA
          </h3>
          <p className={`${bodyText} mt-2`}>
            EBIT (earnings before interest and tax) shows what the business
            earns from its operations, before financing and tax decisions.
          </p>
          <dl className='m-0 mt-6 grid gap-3'>
            <div className='border-l-[3px] border-gilt bg-canvas px-5 py-4'>
              <dt className='text-xs font-bold tracking-[0.08em] text-midnight uppercase'>EBIT</dt>
              <dd className='m-0 mt-1.5 text-[15px] leading-[1.6] text-ink'>
                Revenue − cost of goods sold − operating expenses (including
                depreciation)
              </dd>
              <dd className='m-0 mt-1 text-sm leading-[1.6] text-ink/75'>
                or: net profit + interest + tax
              </dd>
            </div>
            <div className='border-l-[3px] border-gilt bg-canvas px-5 py-4'>
              <dt className='text-xs font-bold tracking-[0.08em] text-midnight uppercase'>EBITDA</dt>
              <dd className='m-0 mt-1.5 text-[15px] leading-[1.6] text-ink'>
                EBIT + depreciation + amortisation
              </dd>
            </div>
          </dl>
        </article>

        <article className='flex flex-col border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
          <h3 className='m-0 font-advisory-heading text-xl leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:text-2xl'>
            How to price a business to sell
          </h3>
          <p className={`${bodyText} mt-2`}>
            Price at the top of what the evidence supports, not above it. An
            overpriced business sits on the market, and buyers start to ask
            what is wrong with it.
          </p>
          <div className='mt-6 bg-midnight px-5 py-5 text-white min-[681px]:px-6'>
            <p className='m-0 text-xs font-bold tracking-[0.08em] text-gilt uppercase'>
              Worked example
            </p>
            <dl className='m-0 mt-3 text-[15px] leading-[1.6]'>
              <div className='flex items-baseline justify-between gap-4 border-b border-white/15 py-2'>
                <dt className='text-white/75'>Normalised EBITDA</dt>
                <dd className='m-0 font-semibold'>$400,000</dd>
              </div>
              <div className='flex items-baseline justify-between gap-4 border-b border-white/15 py-2'>
                <dt className='text-white/75'>Industry multiple</dt>
                <dd className='m-0 font-semibold'>2× to 3×</dd>
              </div>
              <div className='flex items-baseline justify-between gap-4 pt-3'>
                <dt className='font-semibold'>Indicative price</dt>
                <dd className='m-0 font-advisory-heading text-lg font-bold text-gilt'>
                  $800k to $1.2m
                </dd>
              </div>
            </dl>
            <p className='m-0 mt-3 text-sm leading-[1.6] text-white/65'>
              Before adjusting for risk.
            </p>
          </div>
        </article>
      </div>

      <ul className='m-0 mt-10 grid list-none gap-4 p-0 min-[931px]:grid-cols-3'>
        {TOOLS.map(({ href, title, text }) => (
          <li key={href}>
            <LandingLink
              href={href}
              className='group flex h-full flex-col bg-midnight p-6 text-white transition-colors duration-200 hover:bg-deep-navy focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'
            >
              <span className='mb-2 font-advisory-heading text-xl leading-[1.35] font-bold'>{title}</span>
              <span className='mb-4 text-[15px] leading-[1.65] text-white/80'>{text}</span>
              <span className='mt-auto inline-flex items-center gap-2 text-sm font-bold text-gilt'>
                Open the free tool
                <ArrowRight size={16} aria-hidden='true' className='transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none' />
              </span>
            </LandingLink>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
