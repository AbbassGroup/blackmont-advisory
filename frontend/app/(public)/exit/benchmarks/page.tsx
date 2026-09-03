import type { Metadata } from 'next';
import { ToolHeader } from '../_components/tool-header';
import { BenchmarkReport } from './_components/benchmark-report';
import { AccessTracker } from '../_components/access-tracker';
import { ToolNotes } from '../_components/tool-notes';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, webAppJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/exit/benchmarks',
  title: 'Industry Benchmark Report | Blackmont Advisory',
  description:
    'Current Australian SME market data. See typical EBITDA multiples, sale price ranges, time to sell, and what buyers look for in your industry.',
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: 'Sell Your Business', path: '/exit' },
  { name: 'Industry Benchmark Report', path: '/exit/benchmarks' },
];

const jsonLd = [
  webAppJsonLd({
    name: 'Industry Benchmark Report',
    description:
      'Current Australian SME market data. See typical EBITDA multiples, sale price ranges, time to sell, and what buyers look for in your industry.',
    path: '/exit/benchmarks',
  }),
  breadcrumbJsonLd(CRUMBS),
];

export default function BenchmarksPage() {
  return (
    <main className='min-h-screen bg-muted'>
      <JsonLd data={jsonLd} />
      <AccessTracker resource='Industry Benchmark Report' />
      <ToolHeader
        crumbs={CRUMBS}
        title='Industry Benchmark Report'
        subtitle='Current Australian SME market data. Select your industry to see typical EBITDA multiples, sale price ranges, and what buyers are really looking for.'
      />
      <BenchmarkReport />

      <ToolNotes
        heading='How to use these benchmarks'
        paragraphs={[
          'Select your sector to see the typical multiple, price range, time to sell and buyer demand, along with the five factors buyers weigh most heavily in that industry.',
          'One thing to be clear about: these multiples apply to EBITDA, not to revenue. Applying a multiple to turnover is the single most common mistake owners make when estimating what their business is worth, and it usually produces a number several times too high.',
          'The ranges describe established, profitable businesses with clean financial records. A business that falls short on either count sits at the bottom of its range or below it, regardless of sector.',
        ]}
        limits={{
          heading: 'What it cannot tell you',
          body:
            'A sector range cannot tell you where inside it your business belongs. Size is the largest factor, and earnings quality, owner dependency and customer concentration account for most of the rest.',
        }}
        related={{
          href: '/selling-a',
          label: 'the full table with size brackets',
          detail: 'For every sector side by side, plus how the multiple changes with the size of the business, see',
        }}
      />
    </main>
  );
}
