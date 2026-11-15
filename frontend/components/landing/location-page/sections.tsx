import { ArrowRight, Check } from 'lucide-react';
import { LandingLink } from '@/components/landing/landing-link';
import { TransactionCard } from '@/components/landing/transaction-card';
import {
  SectionShell,
  bodyText,
  cardTitle,
} from '@/components/landing/tabbed-page/section-shell';
import { STATE_OUTLINES } from '@/components/landing/tabbed-page/state-outlines';
import type { RecentAcquisition } from '@/lib/data/recent-acquisitions';
import type { LocationPage, Tip } from '@/lib/data/location-pages';

function StateOutline({ name, className }: { name: string; className: string }) {
  const outline = STATE_OUTLINES[name];
  if (!outline) return null;
  return (
    <svg aria-hidden='true' focusable='false' viewBox={outline.viewBox} className={className}>
      <path d={outline.d} />
    </svg>
  );
}

/* ── Overview: local copy beside a navy highlights panel ─────── */

export function LocationOverview({ page, panelLabel }: { page: LocationPage; panelLabel: string }) {
  return (
    <SectionShell id='overview' heading={page.overviewHeading}>
      <div className='grid items-stretch gap-6 min-[931px]:grid-cols-[1.1fr_0.9fr] min-[931px]:gap-10'>
        <div className='space-y-5 self-center'>
          {page.overview.map((para) => (
            <p key={para} className='m-0 text-[15px] leading-[1.8] text-ink min-[681px]:text-base'>
              {para}
            </p>
          ))}
        </div>
        <div className='relative isolate overflow-hidden border-t-[3px] border-gilt bg-midnight p-6 text-white min-[681px]:p-8'>
          <StateOutline
            name={page.place.outline}
            className='pointer-events-none absolute -right-8 -bottom-8 -z-10 h-[75%] w-auto fill-gilt/[0.12]'
          />
          <p className='m-0 mb-5 text-xs font-bold tracking-[0.14em] text-gilt uppercase'>{panelLabel}</p>
          <ul className='m-0 list-none space-y-4 p-0'>
            {page.highlights.map((point) => (
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

/* ── Numbered steps ──────────────────────────────────────────── */

export function StepsSection({
  heading,
  intro,
  steps,
}: {
  heading: string;
  intro: string;
  steps: Tip[];
}) {
  return (
    <SectionShell id='process' tone='canvas' heading={heading} intro={intro}>
      <ol className='m-0 grid list-none gap-x-10 p-0 min-[931px]:grid-cols-2'>
        {steps.map(({ title, text }, i) => (
          <li key={title} className='flex gap-5 border-t border-advisory-rule py-6'>
            <span aria-hidden='true' className='font-advisory-heading text-[28px] leading-none font-bold text-gilt'>
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
    </SectionShell>
  );
}

/* ── City-specific tips ──────────────────────────────────────── */

export function TipsSection({ page }: { page: LocationPage }) {
  return (
    <SectionShell id='tips' heading={page.tipsHeading} intro={page.tipsIntro}>
      <ul className='m-0 grid list-none gap-4 p-0 min-[681px]:grid-cols-2 min-[681px]:gap-5'>
        {page.tips.map(({ title, text }, i) => (
          <li key={title} className='border-t-2 border-gilt bg-canvas p-6'>
            <h3 className={cardTitle}>
              <span className='text-gilt'>{i + 1}.</span> {title}
            </h3>
            <p className={bodyText}>{text}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

/* ── Recent deals in this city (real data only) ──────────────── */

export function RecentDeals({ heading, intro, deals }: { heading: string; intro: string; deals: RecentAcquisition[] }) {
  if (!deals.length) return null;
  return (
    <SectionShell id='recent-deals' tone='canvas' heading={heading} intro={intro}>
      <ul className='m-0 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 min-[601px]:grid-cols-2 min-[1121px]:grid-cols-4'>
        {deals.map((deal) => (
          <li key={deal.id} className='flex'>
            <TransactionCard deal={deal} href={null} />
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

/* ── Areas covered ───────────────────────────────────────────── */

export function AreasSection({
  page,
  heading,
  intro,
  links = {},
}: {
  page: LocationPage;
  heading: string;
  intro: string;
  /** Area name → page URL; areas with a page of their own become links. */
  links?: Record<string, string>;
}) {
  return (
    <SectionShell id='areas' tone='canvas' heading={heading} intro={intro}>
      <div className='grid gap-x-10 gap-y-8 min-[681px]:grid-cols-2'>
        {page.place.areaGroups.map(({ name, areas }) => (
          <div key={name}>
            <h3 className='m-0 mb-3 font-advisory-heading text-lg leading-[1.35] font-bold text-midnight'>{name}</h3>
            <ul className='m-0 flex list-none flex-wrap gap-2 p-0'>
              {areas.map((area) =>
                links[area] ? (
                  <li key={area}>
                    <LandingLink
                      href={links[area]}
                      className='inline-flex items-center gap-1.5 border border-gilt/50 bg-white px-3 py-1.5 text-sm font-semibold text-midnight transition-colors hover:border-gilt hover:bg-gilt/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gilt'
                    >
                      {area}
                      <ArrowRight size={13} aria-hidden='true' className='text-gilt' />
                    </LandingLink>
                  </li>
                ) : (
                  <li key={area} className='border border-advisory-rule bg-white px-3 py-1.5 text-sm text-ink'>
                    {area}
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ── Other cities ────────────────────────────────────────────── */

export type CityLink = {
  href: string;
  city: string;
  state: string;
  stateAbbr: string;
  outline: string;
  cta: string;
};

export function CityLinks({
  id = 'other-cities',
  heading,
  intro,
  cities,
  tone = 'white',
}: {
  id?: string;
  heading: string;
  intro?: string;
  cities: CityLink[];
  tone?: 'white' | 'canvas';
}) {
  return (
    <SectionShell id={id} tone={tone} heading={heading} intro={intro}>
      <ul
        className={`m-0 grid list-none gap-4 p-0 min-[681px]:gap-5 ${cities.length >= 4 ? 'min-[681px]:grid-cols-2 min-[1121px]:grid-cols-4' : 'min-[681px]:grid-cols-3'}`}
      >
        {cities.map((city) => (
          <li key={city.href}>
            <LandingLink
              href={city.href}
              className='group relative isolate flex h-full min-h-[170px] flex-col overflow-hidden border border-advisory-rule bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-gilt/60 hover:shadow-[0_18px_40px_-24px_rgba(15,22,35,0.45)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none motion-reduce:hover:translate-y-0'
            >
              <span aria-hidden='true' className='absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gilt transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none' />
              <StateOutline
                name={city.outline}
                className='pointer-events-none absolute top-1/2 -right-6 -z-10 h-[78%] w-auto -translate-y-1/2 fill-midnight/[0.06] transition-[fill,scale] duration-500 ease-out group-hover:scale-105 group-hover:fill-gilt/[0.2] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
              />
              <span className='mb-3 text-xs font-bold tracking-[0.14em] text-gilt uppercase'>
                {city.state} · {city.stateAbbr}
              </span>
              <span className='mb-6 font-advisory-heading text-2xl leading-[1.3] font-bold text-midnight'>{city.city}</span>
              <span className='mt-auto inline-flex items-center gap-2 text-sm font-bold text-midnight'>
                {city.cta}
                <ArrowRight size={16} aria-hidden='true' className='text-gilt transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none' />
              </span>
            </LandingLink>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

/** City cards for a family of location pages, optionally leaving one out. */
export function cityLinksFor(
  pages: LocationPage[],
  basePath: string,
  cta: (city: string) => string,
  exclude?: string,
): CityLink[] {
  return pages
    .filter(({ slug }) => slug !== exclude)
    .map(({ slug, place }) => ({
      href: `${basePath}/${slug}`,
      city: place.city,
      state: place.state,
      stateAbbr: place.stateAbbr,
      outline: place.outline,
      cta: cta(place.city),
    }));
}
