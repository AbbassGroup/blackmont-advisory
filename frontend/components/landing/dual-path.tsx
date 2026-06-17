import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Reveal } from './primitives';

const PATHS = [
  {
    tag: 'For Business Owners',
    heading: <>Exit on your terms.</>,
    body: 'You deserve more than a listing. You deserve a managed exit with a trusted specialist in your corner.',
    points: [
      'Confidential process, no public listings',
      'Pre-qualified private buyer network',
      'Investment-grade IM prepared for you',
      'Deal structuring to maximise your outcome',
    ],
    cta: { label: 'How we manage your sale', href: '#selling' },
    // Full-bleed colour; divider on the right edge (center of the page).
    surface:
      'bg-background border-b border-secondary/10 md:border-b-0 md:border-r',
    // Inner content hugs the centre and aligns to the container's left edge.
    align: 'ml-auto lg:pl-16 lg:pr-12',
  },
  {
    tag: 'For Aspiring Acquirers',
    heading: <>We work exclusively for you.</>,
    body: "Whether it's your first business or a strategic acquisition, Blackmont sources and negotiates firmly in your corner.",
    points: [
      'Off-market sourcing matched to your brief',
      'Independent assessment and due diligence',
      'Negotiation with your interests only',
      'Guidance for first-time buyers through every step',
    ],
    cta: { label: 'How we find your business', href: '#buying' },
    surface: 'bg-muted',
    align: 'mr-auto lg:pr-16 lg:pl-12',
  },
];

export function DualPath() {
  return (
    <section className='grid border-y border-secondary/10 md:grid-cols-2'>
      {PATHS.map((path, i) => (
        <div
          key={path.tag}
          className={cn('transition-colors hover:bg-accent-pale', path.surface)}
        >
          {/* max-w = half of the 1500px container, so content aligns edge-to-edge with the rest of the page */}
          <Reveal
            delay={i * 100}
            className={cn(
              'w-full max-w-[750px] px-6 py-16 sm:px-10 lg:py-20',
              path.align,
            )}
          >
            <span className='mb-7 inline-block bg-secondary px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-parchment'>
              {path.tag}
            </span>
            <h3 className='mb-5 text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl'>
              {path.heading}
            </h3>
            <p className='mb-8 max-w-md text-base font-light leading-relaxed text-muted-foreground'>
              {path.body}
            </p>
            <ul className='mb-10 flex flex-col gap-3'>
              {path.points.map((point) => (
                <li
                  key={point}
                  className='relative pl-5 text-base leading-relaxed text-foreground before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent'
                >
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href={path.cta.href}
              className='inline-block bg-secondary px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-parchment transition-colors hover:bg-accent hover:text-primary'
            >
              {path.cta.label}
            </Link>
          </Reveal>
        </div>
      ))}
    </section>
  );
}
