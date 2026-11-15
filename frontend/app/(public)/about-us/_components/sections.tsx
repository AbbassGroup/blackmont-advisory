import {
  ArrowRight,
  Building2,
  Check,
  Compass,
  Gem,
  Landmark,
  LockKeyhole,
  Scale,
  Search,
  Store,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LandingLink } from '@/components/landing/landing-link';
import {
  LandingButtonLink,
  LandingContainer,
} from '@/components/landing/presentation';
export { CredentialsBar } from '@/components/landing/credentials-bar';

const h2Class =
  'm-0 font-advisory-heading text-[clamp(26px,5.6vw,32px)] leading-[1.25] font-bold tracking-normal min-[681px]:text-[clamp(28px,3vw,38px)]';
const sectionPad = 'py-14 min-[681px]:py-16 min-[1121px]:py-20';

function Eyebrow({ children, tone = 'gilt' }: { children: string; tone?: 'gilt' | 'muted' }) {
  return (
    <p
      className={cn(
        'm-0 mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.14em] uppercase',
        tone === 'gilt' ? 'text-gilt' : 'text-ink',
      )}
    >
      <span aria-hidden='true' className='h-px w-8 bg-gilt' />
      {children}
    </p>
  );
}

/* ── Who we are ──────────────────────────────────────────────── */

export function WhoWeAre() {
  return (
    <section aria-labelledby='who-we-are-title' className={cn('bg-white', sectionPad)}>
      <LandingContainer className='grid gap-10 min-[931px]:grid-cols-[0.95fr_1.05fr] min-[931px]:gap-16'>
        <div>
          <Eyebrow>Who we are</Eyebrow>
          <h2 id='who-we-are-title' className={cn(h2Class, 'mb-6 text-midnight')}>
            A boutique M&amp;A advisor in Melbourne
          </h2>
          <blockquote className='m-0 border-l-[3px] border-gilt pl-6'>
            <p className='m-0 font-advisory-heading text-[22px] leading-[1.45] font-bold text-midnight min-[681px]:text-[26px]'>
              “We only represent one side of a transaction, and we stay with you
              until it is done.”
            </p>
          </blockquote>
        </div>
        <div className='space-y-5 self-end text-[15px] leading-[1.8] text-ink min-[681px]:text-base'>
          <p className='m-0'>
            Blackmont Advisory is a Business Brokerage firm based in Toorak. We
            help owners sell their businesses privately and at the right price,
            and we act as buyer advocates for people and companies looking to
            acquire.
          </p>
          <p className='m-0'>
            You have spent years building your business. When the time comes to
            sell, or to buy your next one, you deserve an advisor who handles
            the process carefully, protects your confidentiality and works for
            your best outcome.
          </p>
        </div>
      </LandingContainer>
    </section>
  );
}

/* ── Principles (dark) ───────────────────────────────────────── */

const PRINCIPLES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Scale,
    title: 'One side of the table',
    text: 'We only ever represent one side of a transaction.',
  },
  {
    icon: UserCheck,
    title: 'One advisor, start to finish',
    text: 'The advisor you meet at the first briefing stays responsible for your mandate through to completion.',
  },
  {
    icon: LockKeyhole,
    title: 'Confidential by default',
    text: 'Sensitive information is shared only with buyers who we have qualified.',
  },
  {
    icon: Compass,
    title: 'Sound decisions',
    text: 'Our job is to help you make good decisions and negotiate an outcome that works for you.',
  },
];

export function Principles() {
  return (
    <section aria-labelledby='principles-title' className={cn('relative isolate overflow-hidden bg-midnight text-white', sectionPad)}>
      {/* Soft gilt glow for depth. */}
      <span aria-hidden='true' className='pointer-events-none absolute -top-32 -left-32 -z-10 size-96 rounded-full bg-gilt/10 blur-3xl' />
      <LandingContainer>
        <div className='mb-10 max-w-[640px]'>
          <Eyebrow>Our principles</Eyebrow>
          <h2 id='principles-title' className={cn(h2Class, 'text-white')}>
            What we stand for
          </h2>
        </div>
        <ol className='m-0 grid list-none gap-4 p-0 min-[681px]:grid-cols-2 min-[681px]:gap-5 min-[1121px]:grid-cols-4'>
          {PRINCIPLES.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className='group relative flex flex-col border border-white/15 bg-white/[0.03] p-6 transition-[border-color,background-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-gilt/60 hover:bg-white/[0.06] motion-reduce:transition-none motion-reduce:hover:translate-y-0'
            >
              <div className='mb-6 flex items-start justify-between'>
                <span className='flex size-12 items-center justify-center bg-gilt text-midnight'>
                  <Icon size={22} strokeWidth={1.75} aria-hidden='true' />
                </span>
                <span aria-hidden='true' className='font-advisory-heading text-[28px] leading-none font-bold text-white/15'>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className='m-0 mb-2 font-advisory-heading text-xl leading-[1.35] font-bold tracking-normal text-white'>
                {title}
              </h3>
              <p className='m-0 text-[15px] leading-[1.7] text-white/75'>{text}</p>
            </li>
          ))}
        </ol>
      </LandingContainer>
    </section>
  );
}

/* ── Services ────────────────────────────────────────────────── */

const SERVICES = [
  {
    href: '/selling-a-business',
    icon: Store,
    eyebrow: 'Selling',
    title: 'For business owners',
    text: 'Plan a confidential sale with a dedicated advisor handling the details.',
    points: ['Valuation and sale preparation', 'Private buyer outreach under NDA', 'Negotiation through to settlement'],
    cta: 'How we help sellers',
    dark: false,
  },
  {
    href: '/buying-a-business',
    icon: Search,
    eyebrow: 'Buying',
    title: 'For buyers',
    text: 'Find, assess and negotiate an acquisition with an advocate on your side.',
    points: ['On- and off-market search', 'Independent valuation and due diligence', 'Negotiation on price and terms'],
    cta: 'How we help buyers',
    dark: true,
  },
];

export function Services() {
  return (
    <section aria-labelledby='services-title' className={cn('bg-canvas', sectionPad)}>
      <LandingContainer>
        <div className='mb-10 max-w-[640px]'>
          <Eyebrow>What we do</Eyebrow>
          <h2 id='services-title' className={cn(h2Class, 'text-midnight')}>
            Business advisory services for sellers and buyers
          </h2>
        </div>
        <ul className='m-0 grid list-none gap-5 p-0 min-[931px]:grid-cols-2 min-[931px]:gap-6'>
          {SERVICES.map(({ href, icon: Icon, eyebrow, title, text, points, cta, dark }) => (
            <li key={href}>
              <LandingLink
                href={href}
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden border p-7 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_48px_-28px_rgba(15,22,35,0.55)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none motion-reduce:hover:translate-y-0 min-[681px]:p-10',
                  dark
                    ? 'border-midnight bg-midnight text-white hover:border-gilt'
                    : 'border-advisory-rule bg-white text-midnight hover:border-gilt',
                )}
              >
                <span aria-hidden='true' className='absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gilt transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none' />
                <div className='mb-6 flex items-center gap-4'>
                  <span className={cn('flex size-12 items-center justify-center', dark ? 'bg-gilt text-midnight' : 'bg-midnight text-gilt')}>
                    <Icon size={22} strokeWidth={1.75} aria-hidden='true' />
                  </span>
                  <span className='text-xs font-bold tracking-[0.14em] text-gilt uppercase'>{eyebrow}</span>
                </div>
                <h3 className={cn('m-0 mb-3 font-advisory-heading text-[26px] leading-[1.3] font-bold tracking-normal', dark ? 'text-white' : 'text-midnight')}>
                  {title}
                </h3>
                <p className={cn('m-0 mb-6 text-[15px] leading-[1.7] min-[681px]:text-base', dark ? 'text-white/80' : 'text-ink')}>{text}</p>
                <ul className='m-0 mb-8 list-none space-y-3 p-0'>
                  {points.map((point) => (
                    <li key={point} className={cn('flex items-start gap-3 text-[15px] leading-[1.6]', dark ? 'text-white/90' : 'text-ink')}>
                      <Check size={18} strokeWidth={2.25} aria-hidden='true' className='mt-[3px] shrink-0 text-gilt' />
                      {point}
                    </li>
                  ))}
                </ul>
                <span className={cn('mt-auto inline-flex items-center gap-2 text-sm font-bold', dark ? 'text-gilt' : 'text-midnight')}>
                  {cta}
                  <ArrowRight size={16} aria-hidden='true' className='text-gilt transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none' />
                </span>
              </LandingLink>
            </li>
          ))}
        </ul>
      </LandingContainer>
    </section>
  );
}

/* ── Network ─────────────────────────────────────────────────── */

const NETWORK: { icon: LucideIcon; title: string }[] = [
  { icon: Users, title: 'Private investors' },
  { icon: Landmark, title: 'Family offices' },
  { icon: Gem, title: 'High-net-worth individuals' },
  { icon: Building2, title: 'Private equity groups' },
];

export function Network() {
  return (
    <section aria-labelledby='network-title' className={cn('bg-white', sectionPad)}>
      <LandingContainer className='grid items-center gap-10 min-[931px]:grid-cols-2 min-[931px]:gap-16'>
        <div>
          <Eyebrow>Who we work with</Eyebrow>
          <h2 id='network-title' className={cn(h2Class, 'mb-6 text-midnight')}>
            Local knowledge. A wider circle of buyers.
          </h2>
          <p className='m-0 mb-4 text-[15px] leading-[1.8] text-ink min-[681px]:text-base'>
            Based in Melbourne, we work with private investors, family offices,
            high-net-worth individuals and private equity groups looking for
            Australian businesses.
          </p>
          <p className='m-0 mb-8 text-[15px] leading-[1.8] text-ink min-[681px]:text-base'>
            We bring the right people into the conversation without exposing
            your business to the wider market.
          </p>
          <LandingButtonLink href='/#contact' className='group'>
            Start a private discussion
            <ArrowRight size={16} aria-hidden='true' className='transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none' />
          </LandingButtonLink>
        </div>
        <ul className='m-0 grid list-none grid-cols-2 gap-3 p-0 min-[681px]:gap-4'>
          {NETWORK.map(({ icon: Icon, title }) => (
            <li
              key={title}
              className='group flex min-h-[150px] flex-col justify-between border-t-2 border-gilt bg-canvas p-5 transition-colors duration-300 hover:bg-midnight motion-reduce:transition-none min-[681px]:min-h-[170px] min-[681px]:p-6'
            >
              <Icon size={26} strokeWidth={1.5} aria-hidden='true' className='text-gilt' />
              <span className='font-advisory-heading text-lg leading-[1.3] font-bold text-midnight transition-colors duration-300 group-hover:text-white motion-reduce:transition-none'>
                {title}
              </span>
            </li>
          ))}
        </ul>
      </LandingContainer>
    </section>
  );
}
