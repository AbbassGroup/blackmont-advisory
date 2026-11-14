import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  SITE_URL,
} from '@/lib/seo';
import { FAQS, PAGE_PATH, SECTIONS } from './_components/content';
import { SellingHero } from './_components/hero';
import { SectionNav } from '@/components/landing/tabbed-page/section-nav';
import { WhyBlackmont } from './_components/why-blackmont';
import { HowWeWork } from './_components/how-we-work';
import { PrivateVsBroker } from './_components/private-vs-broker';
import { Valuation } from './_components/valuation';
import { Industries } from './_components/industries';
import { Locations } from './_components/locations';
import { Tips } from './_components/tips';
import { FaqSection } from '@/components/landing/tabbed-page/faq-section';
import { ClosingCta } from '@/components/landing/tabbed-page/closing-cta';

// Primary keyword: "selling a business" (slug, title, H1, description, H2s).
// Secondary: "sell my business", "business broker(s) Melbourne" (meta, H2s).
export const metadata: Metadata = buildMetadata({
  path: PAGE_PATH,
  title: 'Selling a Business | Blackmont Advisory',
  description:
    'Selling a business? Blackmont Advisory, a Melbourne business broker, values and sells businesses confidentially. Free valuation and a private first chat.',
  ogDescription:
    'Sell your business privately and at the right price, with a senior-led Melbourne business sale advisor.',
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: 'Selling a Business', path: PAGE_PATH },
];

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Selling a business',
  serviceType: 'Business brokerage and sale advisory',
  description:
    'Confidential business sale advisory for Australian business owners: valuation, preparation, buyer outreach, negotiation and settlement.',
  url: absoluteUrl(PAGE_PATH),
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: ['Victoria', 'New South Wales', 'Queensland', 'Western Australia'].map(
    (name) => ({ '@type': 'State', name }),
  ),
};

export default function SellingABusinessPage() {
  return (
    <div className='min-h-screen bg-white'>
      <JsonLd data={[breadcrumbJsonLd(CRUMBS), serviceJsonLd, faqJsonLd(FAQS)]} />
      <SellingHero crumbs={CRUMBS} />
      <SectionNav sections={SECTIONS} />
      <WhyBlackmont />
      <HowWeWork />
      <PrivateVsBroker />
      <Valuation />
      <Industries />
      <Locations />
      <Tips />
      <FaqSection
        faqs={FAQS}
        heading='Selling a business: FAQs'
        intro='The questions owners ask us most before they sell.'
      />
      <ClosingCta
        heading='Ready to talk about selling your business?'
        text='Start with a confidential conversation.'
      />
    </div>
  );
}
