import type { Metadata } from 'next';
import { SellHero } from './_components/hero';
import { Resources } from './_components/resources';
import { Process } from './_components/process';
import { Booking } from './_components/booking';
import { WhyAbbass } from './_components/why-abbass';
import { Team } from './_components/team';
import { Testimonials } from './_components/testimonials';
import { ScheduleCallCta } from './_components/schedule-call-cta';
import { AccessTracker } from './_components/access-tracker';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/access',
  title: 'Sell Your Business | Free Exit Tools & Advisory | Blackmont Advisory',
  description:
    'Thinking about selling your business? Access free valuation tools, exit-readiness checklists, and confidential advice from ABBASS, a Melbourne boutique business brokerage.',
  ogTitle: 'Sell Your Business | Blackmont Advisory',
  ogDescription:
    'Free tools and expert insights to maximise your business exit, guided by a Melbourne boutique advisory firm.',
});

const jsonLd = [
  breadcrumbJsonLd([
    { name: 'Home', path: '' },
    { name: 'Sell Your Business', path: '/access' },
  ]),
  itemListJsonLd('Free Business Exit Resources', [
    {
      name: 'Business Valuation Tool',
      description:
        'Estimate the potential value of your business using industry-based insights.',
      path: '/access/valuation',
    },
    {
      name: 'Business Sale Checklist',
      description:
        'Understand what buyers look for before taking your business to market.',
      path: '/access/readiness',
    },
    {
      name: 'Industry Benchmark Report',
      description:
        'Compare your business performance against broader industry standards.',
      path: '/access/benchmarks',
    },
    {
      name: 'Exit Planning Guide',
      description:
        'Learn how to prepare for a smoother and more profitable business exit.',
      path: '/access/exit-planning',
    },
  ]),
];

export default function SellPage() {
  return (
    <main className='min-h-screen bg-white'>
      <JsonLd data={jsonLd} />
      <AccessTracker resource='Access Landing' />
      <SellHero />
      <Resources />
      <Process />
      <Booking />
      <WhyAbbass />
      <ScheduleCallCta />
      <Team />
      <Testimonials />
      <ScheduleCallCta
        title='Take the next step'
        subtitle='Book a 30-minute confidential strategy call with our senior team. No obligation.'
      />
    </main>
  );
}
