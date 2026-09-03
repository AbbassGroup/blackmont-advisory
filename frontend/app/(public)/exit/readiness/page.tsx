import type { Metadata } from 'next';
import { ToolHeader } from '../_components/tool-header';
import { Scorecard } from './_components/scorecard';
import { AccessTracker } from '../_components/access-tracker';
import { ToolNotes } from '../_components/tool-notes';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, webAppJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/exit/readiness',
  title: 'Sale Readiness Scorecard | Blackmont Advisory',
  description:
    'Answer 10 quick questions to get your personalised business sale-readiness score, a category breakdown, and tailored next steps.',
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: 'Sell Your Business', path: '/exit' },
  { name: 'Sale Readiness Scorecard', path: '/exit/readiness' },
];

const jsonLd = [
  webAppJsonLd({
    name: 'Sale Readiness Scorecard',
    description:
      'Answer 10 quick questions to get your personalised business sale-readiness score, a category breakdown, and tailored next steps.',
    path: '/exit/readiness',
  }),
  breadcrumbJsonLd(CRUMBS),
];

export default function ReadinessPage() {
  return (
    <main className='min-h-screen bg-muted'>
      <JsonLd data={jsonLd} />
      <AccessTracker resource='Sale Readiness Score' />
      <ToolHeader
        crumbs={CRUMBS}
        title='Is Your Business Sale Ready?'
        subtitle='Answer 10 questions to receive your personalised readiness score, category breakdown, and tailored recommendations.'
      />
      <Scorecard />

      <ToolNotes
        heading='How to read your score'
        paragraphs={[
          'Ten dimensions, each scored from zero to ten. The total gives you a band, but the total is the least useful part of the result. What matters is which two or three areas came back weakest, because those are the ones a buyer will find and price against.',
          'Treat the low scores as a shortlist rather than a report card. Most owners cannot fix everything before going to market, and they do not need to. Fixing the worst two usually moves the price more than lifting every score by a point.',
        ]}
        limits={{
          heading: 'What it cannot tell you',
          body:
            'The scorecard weights every dimension equally, and real buyers do not. Lease security is close to decisive for a cafe or a retail shop and almost irrelevant for an ecommerce business. Read your result alongside what actually matters in your sector.',
        }}
        related={{
          href: '/guides/is-my-business-ready-to-sell',
          label: 'the ten things buyers check',
          detail: 'For what a strong answer looks like on each dimension, see',
        }}
      />
    </main>
  );
}
