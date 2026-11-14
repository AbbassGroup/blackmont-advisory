import { ArrowRight } from 'lucide-react';
import { LandingLink } from '@/components/landing/landing-link';
import { BROKER_LOCATIONS } from '@/lib/data/broker-locations';
import {
  SectionShell,
  bodyText,
  cardTitle,
} from '@/components/landing/tabbed-page/section-shell';
import { STATE_OUTLINES } from '@/components/landing/tabbed-page/state-outlines';

const MELBOURNE_AREAS = [
  'Melbourne CBD',
  'Southbank',
  'Docklands',
  'South Melbourne',
  'Port Melbourne',
  'Richmond',
  'South Yarra',
  'St Kilda',
  'Fitzroy',
  'Brunswick',
  'Preston',
  'Essendon',
  'Hawthorn',
  'Box Hill',
  'Doncaster',
  'Glen Waverley',
  'Oakleigh',
  'Ringwood',
  'Dandenong',
  'Moorabbin',
  'Frankston',
  'Cranbourne',
  'Footscray',
  'Werribee',
  'Tullamarine',
];

const STATES = [
  {
    title: 'Victoria',
    text: 'Our home market. We help buyers across Melbourne and regional Victoria, in almost every industry.',
  },
  {
    title: 'New South Wales',
    text: 'For buyers in Sydney and regional NSW.',
  },
  {
    title: 'Queensland',
    text: 'For buyers in Brisbane and across Queensland.',
  },
  {
    title: 'Western Australia',
    text: 'For buyers in Perth and across WA.',
  },
];

export function Locations() {
  return (
    <SectionShell
      id='locations'
      tone='canvas'
      heading='Buy a business in Melbourne and across Australia'
      intro="We're a Melbourne business advisor based in Toorak. Most of our buyers are in Victoria, but we also help clients buy businesses interstate."
    >
      <div className='grid gap-8 min-[931px]:grid-cols-[1fr_1.1fr] min-[931px]:gap-12'>
        <div>
          <h3 className='m-0 mb-3 font-advisory-heading text-2xl leading-[1.3] font-bold tracking-normal text-midnight'>
            Buy a business anywhere in Melbourne
          </h3>
          <p className={`${bodyText} mb-5`}>
            We help buyers right across metropolitan Melbourne, including:
          </p>
          <ul className='m-0 flex list-none flex-wrap gap-2 p-0'>
            {MELBOURNE_AREAS.map((area) => (
              <li key={area} className='border border-advisory-rule bg-white px-3 py-1.5 text-sm text-ink'>
                {area}
              </li>
            ))}
          </ul>
        </div>
        <ul className='m-0 grid list-none gap-px self-start border border-advisory-rule bg-advisory-rule p-0 min-[541px]:grid-cols-2'>
          {STATES.map(({ title, text }) => {
            // Each state card opens the city page for that state (Victoria → Melbourne, …).
            const place = BROKER_LOCATIONS.find((location) => location.outline === title);
            const card = (
              <>
                {STATE_OUTLINES[title] && (
                  // Decorative state outline, sitting faintly behind the text.
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    viewBox={STATE_OUTLINES[title].viewBox}
                    className='pointer-events-none absolute top-1/2 -right-4 -z-10 h-[88%] w-auto -translate-y-1/2 fill-midnight/[0.08] transition-[fill,scale] duration-500 ease-out group-hover:scale-105 group-hover:fill-gilt/[0.22] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
                  >
                    <path d={STATE_OUTLINES[title].d} />
                  </svg>
                )}
                <h3 className={cardTitle}>{title}</h3>
                <p className='m-0 text-[15px] leading-[1.65] text-ink'>{text}</p>
                {place && (
                  <span className='mt-4 inline-flex items-center gap-2 text-sm font-bold text-midnight'>
                    Buy a business in {place.city}
                    <ArrowRight size={16} aria-hidden='true' className='text-gilt transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none' />
                  </span>
                )}
              </>
            );
            return (
              <li key={title} className='bg-white'>
                {place ? (
                  <LandingLink
                    href={`/buying-a-business/${place.slug}`}
                    className='group relative isolate flex h-full flex-col overflow-hidden p-5 transition-colors duration-200 hover:bg-canvas/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none'
                  >
                    {card}
                  </LandingLink>
                ) : (
                  <div className='group relative isolate overflow-hidden p-5'>{card}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </SectionShell>
  );
}
