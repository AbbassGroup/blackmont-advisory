import {
  ChartNoAxesColumn,
  Handshake,
  KeyRound,
  Search,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import {
  SectionShell,
  bodyText,
  cardTitle,
} from '@/components/landing/tabbed-page/section-shell';

const REASONS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: 'On your side of the table',
    text: 'The seller’s broker works for the seller. We work only for you, so our advice is about what is right for you.',
  },
  {
    icon: Search,
    title: 'Access to off-market businesses',
    text: 'Many good businesses are never advertised. We approach owners directly, alongside listings and broker networks.',
  },
  {
    icon: ChartNoAxesColumn,
    title: 'An independent valuation',
    text: 'We check the earnings behind the asking price and tell you what the business is actually worth before you make an offer.',
  },
  {
    icon: Handshake,
    title: 'Negotiation on price and terms',
    text: 'We negotiate the price and the terms that protect you: deposit, vendor finance, earn-outs, stock and the handover period.',
  },
  {
    icon: Users,
    title: 'A team of specialists',
    text: 'We bring in trusted finance, legal and accounting specialists at the right moments, so nothing falls through the cracks.',
  },
  {
    icon: KeyRound,
    title: 'Through to settlement and handover',
    text: 'We stay with you through due diligence, settlement and the handover, until the business is running in your hands.',
  },
];

export function WhyBlackmont() {
  return (
    <SectionShell
      id='why-blackmont'
      heading='Why use Blackmont as your business buying advisor'
      intro='Buying a business is a big commitment. We help you find the right one, pay the right price and avoid the mistakes that cost buyers money.'
    >
      <ul className='m-0 grid list-none gap-4 p-0 min-[681px]:grid-cols-2 min-[681px]:gap-5 min-[1121px]:grid-cols-3 min-[1121px]:gap-6'>
        {REASONS.map(({ icon: Icon, title, text }, i) => (
          <li
            key={title}
            className='group relative flex flex-col overflow-hidden border border-advisory-rule bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-gilt/60 hover:shadow-[0_18px_40px_-24px_rgba(15,22,35,0.45)] min-[681px]:p-8 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
          >
            {/* Gilt rule that draws across the top on hover. */}
            <span
              aria-hidden='true'
              className='absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gilt transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none'
            />
            <div className='mb-6 flex items-start justify-between'>
              <span className='flex size-12 items-center justify-center bg-midnight text-gilt transition-colors duration-300 group-hover:bg-gilt group-hover:text-midnight motion-reduce:transition-none'>
                <Icon size={22} strokeWidth={1.75} aria-hidden='true' />
              </span>
              <span
                aria-hidden='true'
                className='font-advisory-heading text-[28px] leading-none font-bold text-advisory-rule'
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className={cardTitle}>{title}</h3>
            <p className={bodyText}>{text}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
