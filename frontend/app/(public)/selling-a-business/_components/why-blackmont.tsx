import {
  BadgeCheck,
  ChartNoAxesColumn,
  Handshake,
  LockKeyhole,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { SectionShell, bodyText, cardTitle } from '@/components/landing/tabbed-page/section-shell';

const REASONS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: UserCheck,
    title: 'Senior-led from start to finish',
    text: 'The advisor you meet in the first conversation runs your sale through to settlement. Your business is never handed to a junior team.',
  },
  {
    icon: LockKeyhole,
    title: 'Confidential by design',
    text: 'Your business is marketed anonymously. Buyers sign an NDA, and you approve each one before they learn who you are.',
  },
  {
    icon: ChartNoAxesColumn,
    title: 'Priced on evidence',
    text: 'Pricing starts from your normalised earnings, industry multiples and comparable Australian sales, not from what an owner hopes to hear.',
  },
  {
    icon: Users,
    title: 'Buyers who are already looking',
    text: 'We approach a private network of qualified buyers, acquirers and investors directly, alongside public listings, so the right buyers see your business.',
  },
  {
    icon: Handshake,
    title: 'Negotiation that protects value',
    text: 'Price is only part of a deal. We negotiate the terms that decide what you actually walk away with: deposit, earn-outs, vendor finance, stock and handover.',
  },
  {
    icon: BadgeCheck,
    title: 'Licensed and accountable',
    text: 'Blackmont Advisory is a licensed Victorian business agent (BLA 092153L), based in Toorak, Melbourne.',
  },
];

export function WhyBlackmont() {
  return (
    <SectionShell
      id='why-blackmont'
      heading='Why choose Blackmont as business sale advisor'
      intro="Most owners only sell a business once. We've done it many times, we keep it quiet, and we stay with you until the money is in your account."
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
