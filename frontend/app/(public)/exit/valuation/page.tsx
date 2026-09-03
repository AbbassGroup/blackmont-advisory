import type { Metadata } from 'next';
import { ToolHeader } from '../_components/tool-header';
import { ValuationTool } from './_components/valuation-tool';
import { AccessTracker } from '../_components/access-tracker';
import { ToolNotes } from '../_components/tool-notes';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, webAppJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/exit/valuation',
  title: 'Business Valuation Tool | Blackmont Advisory',
  description:
    'Estimate the potential value of your business with our free valuation tool. Get an indicative range based on your revenue, profit, industry, and management.',
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: 'Sell Your Business', path: '/exit' },
  { name: 'Business Valuation Tool', path: '/exit/valuation' },
];

const jsonLd = [
  webAppJsonLd({
    name: 'Business Valuation Tool',
    description:
      'Estimate the potential value of your business with our free valuation tool. Get an indicative range based on your revenue, profit, industry, and management.',
    path: '/exit/valuation',
  }),
  breadcrumbJsonLd(CRUMBS),
];

export default function ValuationPage() {
  return (
    <main className='min-h-screen bg-muted'>
      <JsonLd data={jsonLd} />
      <AccessTracker resource='Valuation Tool' />
      <ToolHeader
        crumbs={CRUMBS}
        title='Business Valuation Tool'
        subtitle='Answer 5 quick questions to get an indicative value range for your business, based on revenue, profit, industry, and management structure.'
      />
      <ValuationTool />

      <ToolNotes
        heading='How to read your range'
        paragraphs={[
          'The tool applies a multiple to your EBITDA, adjusted for the size of the business, your industry and how the business is managed. What it returns is a range rather than a valuation, and the width of that range is deliberate.',
          'Management structure moves the number more than most owners expect. A business that runs without its owner and one that depends on them daily can report identical profit and still sit at opposite ends of the same range, because the buyer is pricing risk rather than earnings alone.',
          'The calculation is driven by the EBITDA figure you enter, so use your real number rather than a rounded guess. If profit is left at zero the tool falls back to estimating it at 15% of revenue, which is a general average and almost certainly not your business.',
        ]}
        limits={{
          heading: 'What it cannot tell you',
          body:
            'It does not see your customer concentration, your lease, whether your staff intend to stay, or the state of your financial records. Those are the things that decide where inside the range a real buyer lands, and they are what a broker assesses in an appraisal.',
        }}
        related={{
          href: '/selling-a',
          label: 'what businesses sell for by industry',
          detail: 'For the typical multiples and price ranges in your sector, see',
        }}
      />
    </main>
  );
}
