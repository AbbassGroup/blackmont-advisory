import {
  ArrowRight,
  CalendarClock,
  ChartLine,
  FileCheck2,
  Repeat,
  TrendingDown,
  TrendingUp,
  UserRoundCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  LandingButtonLink,
  LandingContainer,
} from '@/components/landing/presentation';
import {
  SectionShell,
  bodyText,
  cardTitle,
} from '@/components/landing/tabbed-page/section-shell';
import { EBITDA_BRACKETS } from '@/lib/data/valuation-brackets';
import { ValuationTool } from './valuation-tool';

/* ── Calculator ──────────────────────────────────────────────── */

const NEEDS = [
  'Your industry',
  'Where the business is located',
  'Annual revenue',
  'How the business is managed',
  'Net profit (EBITDA)',
];

export function Calculator() {
  return (
    <section
      id='calculator'
      aria-labelledby='calculator-title'
      className='scroll-mt-4 bg-white py-12 min-[681px]:py-14 min-[1121px]:py-16'
    >
      {/* When results appear the tool takes the full width. */}
      <LandingContainer className='grid items-start gap-8 min-[931px]:grid-cols-[0.75fr_1.25fr] min-[931px]:gap-12 min-[1121px]:gap-16 min-[931px]:has-[[data-tool-results]]:grid-cols-1'>
        <div className='min-w-0 min-[931px]:sticky min-[931px]:top-[120px]'>
          <h2
            id='calculator-title'
            className='m-0 mb-4 font-advisory-heading text-[clamp(26px,5.6vw,32px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(28px,3vw,36px)]'
          >
            Value your business in five questions
          </h2>
          <p className={`${bodyText} mb-6`}>
            Have your latest profit and loss statement handy. You will need:
          </p>
          <ol className='m-0 list-none space-y-3 p-0'>
            {NEEDS.map((need, i) => (
              <li key={need} className='flex items-center gap-3 text-[15px] text-midnight'>
                <span className='flex size-7 shrink-0 items-center justify-center bg-midnight text-xs font-bold text-gilt'>
                  {i + 1}
                </span>
                {need}
              </li>
            ))}
          </ol>
        </div>
        <div className='min-w-0 border-t-[3px] border-gilt shadow-[0_24px_56px_-32px_rgba(15,22,35,0.4)]'>
          <ValuationTool />
        </div>
      </LandingContainer>
    </section>
  );
}

/* ── Formula ─────────────────────────────────────────────────── */

const FORMULA_STEPS = [
  {
    title: 'EBIT formula',
    text: 'Revenue − cost of goods sold − operating expenses (including depreciation). Or: net profit + interest + tax.',
  },
  {
    title: 'From EBIT to EBITDA',
    text: 'Add depreciation and amortisation back to EBIT. EBITDA is the figure most small business valuations start from.',
  },
  {
    title: 'Normalise the earnings',
    text: 'Add back the owner’s personal and one-off expenses, and adjust your own wage to a market rate. This is what a buyer is really paying for.',
  },
];

export function Formula() {
  return (
    <SectionShell
      id='formula'
      tone='canvas'
      heading='The business valuation formula'
      intro='How to calculate your business worth, the same way buyers and brokers do.'
    >
      <div className='relative mb-8 overflow-hidden bg-midnight px-6 py-8 text-center text-white min-[681px]:px-10 min-[681px]:py-10'>
        <span aria-hidden='true' className='pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-gilt/15 blur-3xl' />
        <p className='relative m-0 mb-3 text-xs font-bold tracking-[0.14em] text-gilt uppercase'>
          Business value
        </p>
        <p className='relative m-0 font-advisory-heading text-[clamp(22px,5vw,36px)] leading-[1.35] font-bold'>
          Normalised EBITDA <span className='text-gilt'>×</span> Earnings multiple
        </p>
      </div>

      <ol className='m-0 grid list-none gap-4 p-0 min-[931px]:grid-cols-3 min-[931px]:gap-6'>
        {FORMULA_STEPS.map(({ title, text }, i) => (
          <li key={title} className='border-t-2 border-gilt bg-white p-6'>
            <h3 className={cardTitle}>
              <span className='text-gilt'>{i + 1}.</span> {title}
            </h3>
            <p className={bodyText}>{text}</p>
          </li>
        ))}
      </ol>

      {/* Text, worked example and a call to action stacked with no gaps,
          beside a compact table of about the same height. */}
      <div className='mt-10 grid items-start gap-6 min-[931px]:grid-cols-2 min-[931px]:gap-10'>
        <div>
          <h3 className='m-0 mb-3 font-advisory-heading text-2xl leading-[1.3] font-bold tracking-normal text-midnight'>
            How to value a small business by size
          </h3>
          <p className={`${bodyText} mb-6`}>
            Larger, more established businesses attract higher multiples because
            buyers see less risk. These are the ranges our calculator starts
            from, before adjusting for industry and management.
          </p>
          <div className='border-l-[3px] border-gilt bg-white p-5 min-[681px]:p-6'>
            <p className='m-0 mb-3 text-xs font-bold tracking-[0.14em] text-gilt uppercase'>
              Worked example
            </p>
            <p className='m-0 mb-4 font-advisory-heading text-lg leading-[1.45] font-bold text-midnight min-[681px]:text-xl'>
              $400,000 EBITDA <span className='text-gilt'>×</span> 1.6–3.0{' '}
              <span className='text-gilt'>=</span> $640,000–$1.2M
            </p>
            <p className='m-0 text-[15px] leading-[1.65] text-ink'>
              A business earning $400,000 a year sits in the highlighted
              bracket, before adjusting for industry and risk.
            </p>
          </div>
          <LandingButtonLink href='#calculator' className='group mt-6'>
            Value your business
            <ArrowRight
              size={16}
              aria-hidden='true'
              className='transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none'
            />
          </LandingButtonLink>
        </div>
        <div className='overflow-x-auto border border-advisory-rule bg-white'>
          <table className='w-full min-w-[320px] border-collapse text-left text-[15px] leading-[1.5]'>
            <caption className='sr-only'>Typical EBITDA multiples by business size</caption>
            <thead>
              <tr className='bg-midnight text-white'>
                <th scope='col' className='px-5 py-3 font-semibold'>Annual EBITDA</th>
                <th scope='col' className='px-5 py-3 text-right font-semibold text-gilt'>Typical multiple</th>
              </tr>
            </thead>
            <tbody>
              {[...EBITDA_BRACKETS].reverse().map(({ label, min, max, floor }) => {
                // The bracket used in the worked example ($250k – $500k).
                const highlighted = floor === 250_000;
                return (
                  <tr
                    key={label}
                    className={cn(
                      'border-t border-advisory-rule even:bg-canvas/60',
                      highlighted && 'bg-gilt/15! font-semibold',
                    )}
                  >
                    <th
                      scope='row'
                      className={cn(
                        'px-5 py-2.5 font-semibold text-midnight',
                        highlighted && 'border-l-[3px] border-gilt pl-[17px]',
                      )}
                    >
                      {label}
                    </th>
                    <td className='px-5 py-2.5 text-right text-ink tabular-nums'>
                      {min.toFixed(1)}× – {max.toFixed(1)}×
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </SectionShell>
  );
}

/* ── Value drivers ───────────────────────────────────────────── */

const DRIVERS: { icon: LucideIcon; title: string; text: string; up: boolean }[] = [
  { icon: UserRoundCheck, title: 'Runs without the owner', text: 'A team that runs the business day to day is worth far more than one that depends on you.', up: true },
  { icon: Repeat, title: 'Recurring revenue', text: 'Contracts, subscriptions and repeat customers make future earnings easier to trust.', up: true },
  { icon: ChartLine, title: 'Growing earnings', text: 'Three years of steady or rising profit supports a higher multiple.', up: true },
  { icon: FileCheck2, title: 'Clean financial records', text: 'Accounts that match your tax returns and BAS give buyers and banks confidence.', up: true },
  { icon: Users, title: 'Customer concentration', text: 'When one customer makes up a large share of revenue, buyers see risk and pay less.', up: false },
  { icon: CalendarClock, title: 'Short or insecure lease', text: 'Not enough lease term left, or a lease that cannot be assigned, can stop a sale.', up: false },
];

export function ValueDrivers() {
  return (
    <SectionShell
      id='value-drivers'
      heading='What makes your business worth more'
      intro='Two businesses with the same profit can sell for very different prices. These are the factors that move the multiple.'
    >
      <ul className='m-0 grid list-none gap-4 p-0 min-[681px]:grid-cols-2 min-[681px]:gap-5 min-[1121px]:grid-cols-3 min-[1121px]:gap-6'>
        {DRIVERS.map(({ icon: Icon, title, text, up }) => {
          const Trend = up ? TrendingUp : TrendingDown;
          return (
            <li
              key={title}
              className='group relative flex flex-col overflow-hidden border border-advisory-rule bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-gilt/60 hover:shadow-[0_18px_40px_-24px_rgba(15,22,35,0.45)] min-[681px]:p-7 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
            >
              <span aria-hidden='true' className='absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gilt transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none' />
              <div className='mb-5 flex items-start justify-between'>
                <span className='flex size-12 items-center justify-center bg-midnight text-gilt transition-colors duration-300 group-hover:bg-gilt group-hover:text-midnight motion-reduce:transition-none'>
                  <Icon size={22} strokeWidth={1.75} aria-hidden='true' />
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold',
                    up ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700',
                  )}
                >
                  <Trend size={14} aria-hidden='true' />
                  {up ? 'Raises value' : 'Lowers value'}
                </span>
              </div>
              <h3 className={cardTitle}>{title}</h3>
              <p className={bodyText}>{text}</p>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
