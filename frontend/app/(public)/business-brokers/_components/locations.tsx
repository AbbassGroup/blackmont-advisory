import { ArrowRight, Check, Search, Store } from 'lucide-react';
import { LandingLink } from '@/components/landing/landing-link';
import {
  SectionShell,
  bodyText,
  cardTitle,
} from '@/components/landing/tabbed-page/section-shell';
import { STATE_OUTLINES } from '@/components/landing/tabbed-page/state-outlines';
import { BROKER_LOCATIONS, type BrokerLocation } from '@/lib/data/broker-locations';

const locationPath = (slug: string) => `/business-brokers/${slug}`;

function StateOutline({ name, className }: { name: string; className: string }) {
  const outline = STATE_OUTLINES[name];
  if (!outline) return null;
  return (
    <svg aria-hidden='true' focusable='false' viewBox={outline.viewBox} className={className}>
      <path d={outline.d} />
    </svg>
  );
}

function LocationCard({ location }: { location: BrokerLocation }) {
  return (
    <LandingLink
      href={locationPath(location.slug)}
      className='group relative isolate flex h-full min-h-[220px] flex-col overflow-hidden border border-advisory-rule bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-gilt/60 hover:shadow-[0_18px_40px_-24px_rgba(15,22,35,0.45)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none motion-reduce:hover:translate-y-0 min-[681px]:p-7'
    >
      <span aria-hidden='true' className='absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gilt transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none' />
      <StateOutline
        name={location.outline}
        className='pointer-events-none absolute top-1/2 -right-6 -z-10 h-[78%] w-auto -translate-y-1/2 fill-midnight/[0.06] transition-[fill,scale] duration-500 ease-out group-hover:scale-105 group-hover:fill-gilt/[0.2] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
      />
      <span className='mb-3 text-xs font-bold tracking-[0.14em] text-gilt uppercase'>
        {location.state} · {location.stateAbbr}
      </span>
      <span className='mb-2 font-advisory-heading text-2xl leading-[1.3] font-bold text-midnight'>
        {location.city}
      </span>
      <span className='mb-6 max-w-[240px] text-[15px] leading-[1.65] text-ink'>{location.summary}</span>
      <span className='mt-auto inline-flex items-center gap-2 text-sm font-bold text-midnight'>
        Business brokers {location.city}
        <ArrowRight size={16} aria-hidden='true' className='text-gilt transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none' />
      </span>
    </LandingLink>
  );
}

/* ── Hub: find a broker near you ─────────────────────────────── */

export function LocationsGrid() {
  return (
    <SectionShell
      id='locations'
      tone='canvas'
      heading='Find a business broker near you'
      intro='Based in Melbourne, acting for sellers and buyers in Victoria, New South Wales, Queensland and Western Australia.'
    >
      <ul className='m-0 grid list-none gap-4 p-0 min-[681px]:grid-cols-2 min-[681px]:gap-5 min-[1121px]:grid-cols-4 min-[1121px]:gap-6'>
        {BROKER_LOCATIONS.map((location) => (
          <li key={location.slug}>
            <LocationCard location={location} />
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

/* ── Location: selling or buying ─────────────────────────────── */

export function LocationServices({ location }: { location: BrokerLocation }) {
  const services = [
    {
      href: '/selling-a-business',
      icon: Store,
      title: `Selling a business in ${location.city}`,
      text: `We value your business, prepare it for market and take it to qualified buyers privately, then negotiate through to settlement. Nothing about your ${location.city} business is shared without your approval.`,
      cta: 'How we sell a business',
    },
    {
      href: '/buying-a-business',
      icon: Search,
      title: `Buying a business in ${location.city}`,
      text: `We find, value and negotiate the right business for you in ${location.city} and across ${location.stateAbbr}, on and off market, working only on your side of the deal.`,
      cta: 'How we help buyers',
    },
  ];

  return (
    <SectionShell
      id='services'
      heading={`Business broker services in ${location.city}`}
      intro='We act for sellers and buyers, never for both sides of the same deal.'
    >
      <ul className='m-0 grid list-none gap-5 p-0 min-[931px]:grid-cols-2 min-[931px]:gap-6'>
        {services.map(({ href, icon: Icon, title, text, cta }) => (
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

/* ── Location: local market + highlights ─────────────────────── */

export function LocationMarket({ location }: { location: BrokerLocation }) {
  return (
    <SectionShell id='market' tone='canvas' heading={location.marketHeading}>
      <div className='grid items-stretch gap-6 min-[931px]:grid-cols-[1.1fr_0.9fr] min-[931px]:gap-10'>
        <div className='space-y-5 self-center'>
          {location.market.map((para) => (
            <p key={para} className='m-0 text-[15px] leading-[1.8] text-ink min-[681px]:text-base'>
              {para}
            </p>
          ))}
        </div>
        <div className='relative isolate overflow-hidden border-t-[3px] border-gilt bg-midnight p-6 text-white min-[681px]:p-8'>
          <StateOutline
            name={location.outline}
            className='pointer-events-none absolute -right-8 -bottom-8 -z-10 h-[75%] w-auto fill-gilt/[0.12]'
          />
          <p className='m-0 mb-5 text-xs font-bold tracking-[0.14em] text-gilt uppercase'>
            Why Blackmont in {location.city}
          </p>
          <ul className='m-0 list-none space-y-4 p-0'>
            {location.highlights.map((point) => (
              <li key={point} className='flex items-start gap-3 text-[15px] leading-[1.6] text-white/90'>
                <Check size={18} strokeWidth={2.25} aria-hidden='true' className='mt-[3px] shrink-0 text-gilt' />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}

/* ── Location: areas covered ─────────────────────────────────── */

export function LocationAreas({ location }: { location: BrokerLocation }) {
  return (
    <SectionShell
      id='areas'
      heading={`Areas we cover in ${location.city} and ${location.stateAbbr}`}
      intro={`Wherever your business is in ${location.state}, we can help you sell it or find the right one to buy.`}
    >
      <div className='grid gap-x-10 gap-y-8 min-[681px]:grid-cols-2'>
        {location.areaGroups.map(({ name, areas }) => (
          <div key={name}>
            <h3 className='m-0 mb-3 font-advisory-heading text-lg leading-[1.35] font-bold text-midnight'>{name}</h3>
            <ul className='m-0 flex list-none flex-wrap gap-2 p-0'>
              {areas.map((area) => (
                <li key={area} className='border border-advisory-rule bg-canvas px-3 py-1.5 text-sm text-ink'>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ── Location: other cities ──────────────────────────────────── */

export function OtherLocations({ current }: { current: string }) {
  const others = BROKER_LOCATIONS.filter(({ slug }) => slug !== current);
  return (
    <SectionShell
      id='other-locations'
      heading='Business brokers in other cities'
      intro='The same senior-led, confidential process, wherever you are.'
    >
      <ul className='m-0 grid list-none gap-4 p-0 min-[681px]:grid-cols-3 min-[681px]:gap-5'>
        {others.map((location) => (
          <li key={location.slug}>
            <LocationCard location={location} />
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
