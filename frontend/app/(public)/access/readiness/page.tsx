import type { Metadata } from 'next';
import { ToolHeader } from '../_components/tool-header';
import { Scorecard } from './_components/scorecard';
import { AccessTracker } from '../_components/access-tracker';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, webAppJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/access/readiness',
  title: 'Sale Readiness Scorecard | Blackmont Advisory',
  description:
    'Answer 10 quick questions to get your personalised business sale-readiness score, a category breakdown, and tailored next steps.',
});

const jsonLd = [
  webAppJsonLd({
    name: 'Sale Readiness Scorecard',
    description:
      'Answer 10 quick questions to get your personalised business sale-readiness score, a category breakdown, and tailored next steps.',
    path: '/access/readiness',
  }),
  breadcrumbJsonLd([
    { name: 'Home', path: '' },
    { name: 'Sell Your Business', path: '/access' },
    { name: 'Sale Readiness Scorecard', path: '/access/readiness' },
  ]),
];

export default function ReadinessPage() {
  return (
    <main className='min-h-screen bg-brand-offwhite'>
      <JsonLd data={jsonLd} />
      <AccessTracker resource='Sale Readiness Score' />
      <ToolHeader
        title='Is Your Business Sale Ready?'
        subtitle='Answer 10 questions to receive your personalised readiness score, category breakdown, and tailored recommendations.'
      />
      <Scorecard />
    </main>
  );
}
