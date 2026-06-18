import type { Metadata } from 'next';
import { ToolHeader } from '../_components/tool-header';
import { ExitGuide } from './_components/exit-guide';
import { AccessTracker } from '../_components/access-tracker';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, webAppJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/access/exit-planning',
  title: 'Exit Planning Guide | Blackmont Advisory',
  description:
    'A practical, phase-by-phase checklist to prepare your business for a successful sale. Track your progress from 24 months out through to settlement.',
});

const jsonLd = [
  webAppJsonLd({
    name: 'Exit Planning Guide',
    description:
      'A practical, phase-by-phase checklist to prepare your business for a successful sale. Track your progress from 24 months out through to settlement.',
    path: '/access/exit-planning',
  }),
  breadcrumbJsonLd([
    { name: 'Home', path: '' },
    { name: 'Sell Your Business', path: '/access' },
    { name: 'Exit Planning Guide', path: '/access/exit-planning' },
  ]),
];

export default function ExitPlanningPage() {
  return (
    <main className='min-h-screen bg-muted'>
      <JsonLd data={jsonLd} />
      <AccessTracker resource='Exit Planning Guide' />
      <ToolHeader
        title='Your Exit Planning Roadmap'
        subtitle='A practical phase-by-phase checklist to prepare your business for a successful sale. Tick off tasks as you complete them, your progress is saved automatically.'
      />
      <ExitGuide />
    </main>
  );
}
