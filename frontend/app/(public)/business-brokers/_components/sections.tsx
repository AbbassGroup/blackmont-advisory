import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  FileSignature,
  Handshake,
  LockKeyhole,
  Search,
  Store,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import { LandingLink } from '@/components/landing/landing-link';
import { LandingButtonLink } from '@/components/landing/presentation';
import {
  SectionShell,
  bodyText,
  cardTitle,
} from '@/components/landing/tabbed-page/section-shell';

/* ── What we do ──────────────────────────────────────────────── */

const SERVICES = [
  {
    href: '/selling-a-business',
    icon: Store,
    title: 'For business owners',
    text: 'We value your business, prepare it for market and take it to qualified buyers privately, then negotiate through to settlement.',
    cta: 'Selling a business',
  },
  {
    href: '/buying-a-business',
    icon: Search,
    title: 'For buyers',
    text: 'We find, value and negotiate the right business for you, on and off market, working only on your side of the deal.',
    cta: 'Buying a business',
  },
];

export function WhatWeDo() {
  return (
    <SectionShell
      id='what-we-do'
      heading='What a business broker does'
      intro='A good business broker takes the work and the risk out of a sale or purchase. We act for both sellers and buyers, never both sides of the same deal.'
    >
      <ul className='m-0 grid list-none gap-5 p-0 min-[931px]:grid-cols-2 min-[931px]:gap-6'>
        {SERVICES.map(({ href, icon: Icon, title, text, cta }) => (
          <li key={href}>
            <LandingLink
              href={href}
              className='group relative flex h-full flex-col overflow-hidden border border-advisory-rule bg-white p-7 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-gilt hover:shadow-[0_22px_48px_-28px_rgba(15,22,35,0.55)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none motion-reduce:hover:translate-y-0 min-[681px]:p-8'
            >
              <span aria-hidden='true' className='absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gilt transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none' />
              <span className='mb-5 flex size-12 items-center justify-center bg-midnight text-gilt transition-colors duration-300 group-hover:bg-gilt group-hover:text-midnight motion-reduce:transition-none'>
                <Icon size={22} strokeWidth={1.75} aria-hidden='true' />
              </span>
              <h3 className={cardTitle}>{title}</h3>
              <p className={`${bodyText} mb-6`}>{text}</p>
              <span className='mt-auto inline-flex items-center gap-2 text-sm font-bold text-midnight'>
                {cta}
                <ArrowRight size={16} aria-hidden='true' className='text-gilt transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none' />
              </span>
            </LandingLink>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

/* ── Fees ────────────────────────────────────────────────────── */

const FEE_PARTS = [
  {
    title: 'Success fee (commission)',
    text: 'The main fee in most Australian business sales: a percentage of the sale price, paid at settlement. Smaller businesses usually pay a higher percentage than larger ones.',
  },
  {
    title: 'Engagement or marketing fee',
    text: 'Some brokers charge an upfront fee for preparing the business and marketing it. Ask what it covers and whether it comes off the final commission.',
  },
  {
    title: 'Other costs of selling',
    text: 'Your lawyer, your accountant and any tax on the sale, such as capital gains tax. Small business CGT concessions may reduce the tax; ask your accountant.',
  },
];

export function Fees() {
  return (
    <SectionShell
      id='fees'
      tone='canvas'
      heading='Business broker fees and commission'
      intro='How much does it cost to sell a business? Here is how business broker fees in Melbourne and across Australia usually work.'
    >
      <ol className='m-0 grid list-none gap-4 p-0 min-[931px]:grid-cols-3 min-[931px]:gap-6'>
        {FEE_PARTS.map(({ title, text }, i) => (
          <li key={title} className='border-t-2 border-gilt bg-white p-6'>
            <h3 className={cardTitle}>
              <span className='text-gilt'>{i + 1}.</span> {title}
            </h3>
            <p className={bodyText}>{text}</p>
          </li>
        ))}
      </ol>
      <div className='mt-6 flex flex-col gap-4 border-l-[3px] border-gilt bg-white p-6 min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:p-7'>
        <p className='m-0 max-w-[680px] text-[15px] leading-[1.7] text-ink min-[681px]:text-base'>
          <span className='font-semibold text-midnight'>Our fees:</span> agreed
          in writing before we start, with no surprises at settlement. We will
          explain exactly what you pay in your first conversation.
        </p>
        <LandingButtonLink href='#enquire' variant='outline' size='compact' className='shrink-0'>
          Ask about our fees
        </LandingButtonLink>
      </div>
    </SectionShell>
  );
}

/* ── Choosing a broker ───────────────────────────────────────── */

const CHECKS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BadgeCheck, title: 'Licensed', text: 'In Victoria business agents must be licensed. Ask for the number. Ours is BLA 092153L.' },
  { icon: UserCheck, title: 'Who does the work', text: 'Find out who will actually run your sale, and whether they stay with it to the end.' },
  { icon: Briefcase, title: 'Relevant experience', text: 'Ask about recent sales of businesses like yours, in size and industry.' },
  { icon: LockKeyhole, title: 'Confidentiality', text: 'Ask how buyers are screened and what is shared before an NDA is signed.' },
  { icon: FileSignature, title: 'Clear fees', text: 'Get every fee, and when it is payable, in writing before you sign.' },
  { icon: Handshake, title: 'Buyer reach', text: 'Ask how they find buyers beyond online listings, including private networks.' },
];

export function Choosing() {
  return (
    <SectionShell
      id='choosing'
      heading='How to choose the best business broker in Melbourne'
      intro='Rankings and “top 10” lists only tell you so much. These are the questions to ask any broker before you sign.'
    >
      <ul className='m-0 grid list-none gap-px border border-advisory-rule bg-advisory-rule p-0 min-[681px]:grid-cols-2 min-[1121px]:grid-cols-3'>
        {CHECKS.map(({ icon: Icon, title, text }) => (
          <li key={title} className='flex gap-4 bg-white p-6'>
            <span className='flex size-11 shrink-0 items-center justify-center rounded-full bg-canvas text-gilt'>
              <Icon size={20} strokeWidth={1.75} aria-hidden='true' />
            </span>
            <div className='min-w-0'>
              <h3 className='m-0 mb-1.5 font-advisory-heading text-lg leading-[1.35] font-bold tracking-normal text-midnight'>
                {title}
              </h3>
              <p className='m-0 text-[15px] leading-[1.65] text-ink'>{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
