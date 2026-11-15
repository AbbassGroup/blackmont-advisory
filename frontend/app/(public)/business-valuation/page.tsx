import type { Metadata } from 'next';
import { AccessTracker } from '@/app/(public)/exit/_components/access-tracker';
import { ToolNotes } from '@/app/(public)/exit/_components/tool-notes';
import { JsonLd } from '@/components/seo/json-ld';
import { FaqSection } from '@/components/landing/tabbed-page/faq-section';
import { ClosingCta } from '@/components/landing/tabbed-page/closing-cta';
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, webAppJsonLd } from '@/lib/seo';
import { FAQS, PAGE_PATH } from './_components/content';
import { ValuationBanner } from './_components/banner';
import { Calculator, Formula, ValueDrivers } from './_components/sections';

// Primary: "free business valuation calculator" (title, H1, meta).
// Secondary: "what is my business worth", "value your business",
// "business valuation formula", "how to value a small business", "EBIT formula".
const DESCRIPTION =
  'What is my business worth? Use our free business valuation calculator to value your business in minutes, with the valuation formula and multiples explained.';

export const metadata: Metadata = buildMetadata({
  path: PAGE_PATH,
  title: 'Business Valuation Calculator | Blackmont Advisory',
  description: DESCRIPTION,
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: 'Business Valuation', path: PAGE_PATH },
];

const jsonLd = [
  webAppJsonLd({
    name: 'Business Valuation Calculator',
    description: DESCRIPTION,
    path: PAGE_PATH,
  }),
  breadcrumbJsonLd(CRUMBS),
  faqJsonLd(FAQS),
];

export default function ValuationPage() {
  return (
    <div className='min-h-screen bg-white'>
      <JsonLd data={jsonLd} />
      <AccessTracker resource='Valuation Tool' />
      <ValuationBanner crumbs={CRUMBS} />
      <Calculator />

      <div className='border-t border-advisory-rule'>
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
          relatedPlacement='aside'
        />
      </div>

      <Formula />
      <ValueDrivers />
      <FaqSection
        faqs={FAQS}
        heading='Business valuation FAQs'
        intro='Straight answers to what owners ask us most about valuing a business.'
      />
      <ClosingCta
        heading='Want a figure you can rely on?'
        text='Get a confidential appraisal from a Blackmont advisor.'
        enquireHref='/selling-a-business#enquire'
      />
    </div>
  );
}
