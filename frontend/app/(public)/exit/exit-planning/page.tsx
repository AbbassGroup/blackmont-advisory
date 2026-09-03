import type { Metadata } from 'next';
import { ToolHeader } from '../_components/tool-header';
import { ExitGuide } from './_components/exit-guide';
import { AccessTracker } from '../_components/access-tracker';
import { ToolNotes } from '../_components/tool-notes';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, webAppJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/exit/exit-planning',
  title: 'Exit Planning Guide | Blackmont Advisory',
  description:
    'A practical, phase-by-phase checklist to prepare your business for a successful sale. Track your progress from 24 months out through to settlement.',
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: 'Sell Your Business', path: '/exit' },
  { name: 'Exit Planning Guide', path: '/exit/exit-planning' },
];

const jsonLd = [
  webAppJsonLd({
    name: 'Exit Planning Guide',
    description:
      'A practical, phase-by-phase checklist to prepare your business for a successful sale. Track your progress from 24 months out through to settlement.',
    path: '/exit/exit-planning',
  }),
  breadcrumbJsonLd(CRUMBS),
];

export default function ExitPlanningPage() {
  return (
    <main className='min-h-screen bg-muted'>
      <JsonLd data={jsonLd} />
      <AccessTracker resource='Exit Planning Guide' />
      <ToolHeader
        crumbs={CRUMBS}
        title='Your Exit Planning Roadmap'
        subtitle='A practical phase-by-phase checklist to prepare your business for a successful sale. Tick off tasks as you complete them, your progress is saved automatically.'
      />
      <ExitGuide />

      <ToolNotes
        heading='How to use this checklist'
        paragraphs={[
          'Five phases, running from around two years before a sale through to being under offer. It is built to be worked through rather than read, so tick items off as you complete them and come back to it.',
          'You do not need to start at the first phase. Find where you actually are and work forward from there. Owners who come to us late can still sell well, they simply have fewer levers available.',
          'The items that lift a sale price most are also the slowest: getting three years of clean financials prepared, and genuinely reducing how much the business depends on you. Both take months, which is the argument for starting earlier than feels necessary.',
        ]}
        limits={{
          heading: 'What it cannot tell you',
          body:
            'The checklist is deliberately general. It does not cover the transfer requirements specific to your sector, and those are often what sets the timeline: licence transfers, regulatory approvals, or landlord consent to assign a lease can each add months that no amount of preparation removes.',
        }}
        related={{
          href: '/guides/how-long-does-it-take-to-sell-a-business',
          label: 'how long it takes to sell',
          detail: 'For time to sell by industry and what causes delays, see',
        }}
      />
    </main>
  );
}
