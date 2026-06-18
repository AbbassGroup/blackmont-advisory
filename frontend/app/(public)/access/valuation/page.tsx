import type { Metadata } from 'next';
import { ToolHeader } from '../_components/tool-header';
import { ValuationTool } from './_components/valuation-tool';
import { AccessTracker } from '../_components/access-tracker';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, webAppJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/access/valuation',
  title: 'Business Valuation Tool | Blackmont Advisory',
  description:
    'Estimate the potential value of your business with our free valuation tool. Get an indicative range based on your revenue, profit, industry, and management.',
});

const jsonLd = [
  webAppJsonLd({
    name: 'Business Valuation Tool',
    description:
      'Estimate the potential value of your business with our free valuation tool. Get an indicative range based on your revenue, profit, industry, and management.',
    path: '/access/valuation',
  }),
  breadcrumbJsonLd([
    { name: 'Home', path: '' },
    { name: 'Sell Your Business', path: '/access' },
    { name: 'Business Valuation Tool', path: '/access/valuation' },
  ]),
];

export default function ValuationPage() {
  return (
    <main className='min-h-screen bg-muted'>
      <JsonLd data={jsonLd} />
      <AccessTracker resource='Valuation Tool' />
      <ToolHeader
        title='Business Valuation Tool'
        subtitle='Answer 5 quick questions to get an indicative value range for your business, based on revenue, profit, industry, and management structure.'
      />
      <ValuationTool />
    </main>
  );
}
