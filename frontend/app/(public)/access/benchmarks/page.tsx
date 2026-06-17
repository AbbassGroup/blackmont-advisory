import type { Metadata } from 'next';
import { ToolHeader } from '../_components/tool-header';
import { BenchmarkReport } from './_components/benchmark-report';
import { AccessTracker } from '../_components/access-tracker';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, webAppJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/access/benchmarks',
  title: 'Industry Benchmark Report | ABBASS Business Brokers',
  description:
    'Current Australian SME market data. See typical EBITDA multiples, sale price ranges, time to sell, and what buyers look for in your industry.',
});

const jsonLd = [
  webAppJsonLd({
    name: 'Industry Benchmark Report',
    description:
      'Current Australian SME market data. See typical EBITDA multiples, sale price ranges, time to sell, and what buyers look for in your industry.',
    path: '/access/benchmarks',
  }),
  breadcrumbJsonLd([
    { name: 'Home', path: '' },
    { name: 'Sell Your Business', path: '/access' },
    { name: 'Industry Benchmark Report', path: '/access/benchmarks' },
  ]),
];

export default function BenchmarksPage() {
  return (
    <main className='min-h-screen bg-brand-offwhite'>
      <JsonLd data={jsonLd} />
      <AccessTracker resource='Industry Benchmark Report' />
      <ToolHeader
        title='Industry Benchmark Report'
        subtitle='Current Australian SME market data. Select your industry to see typical EBITDA multiples, sale price ranges, and what buyers are really looking for.'
      />
      <BenchmarkReport />
    </main>
  );
}
