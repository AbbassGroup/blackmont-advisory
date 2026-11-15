import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  SITE_URL,
} from '@/lib/seo';
import { SectionNav } from '@/components/landing/tabbed-page/section-nav';
import { FaqSection } from '@/components/landing/tabbed-page/faq-section';
import { ClosingCta } from '@/components/landing/tabbed-page/closing-cta';
import { FAQS, PAGE_PATH, SECTIONS } from './_components/content';
import { BuyingHero } from './_components/hero';
import { RecentAcquisitions } from './_components/recent-acquisitions';
import { WhyBlackmont } from './_components/why-blackmont';
import { HowWeWork } from './_components/how-we-work';
import { WhoWeHelp } from './_components/who-we-help';
import { AgentVsDiy } from './_components/agent-vs-diy';
import { DueDiligence } from './_components/due-diligence';
import { Locations } from './_components/locations';
import { Tips } from './_components/tips';

// Primary keyword: "buying a business" (slug, title, H1, description, H2s).
// Secondary: "buy a business", "how to buy a business", "business advisor Melbourne".
// The older /buy-a-business page targets "buy a business" in its title.
export const metadata: Metadata = buildMetadata({
  path: PAGE_PATH,
  title: 'Buying a Business | Blackmont Advisory',
  description:
    'Buying a business? Blackmont Advisory, a Melbourne buying advisor, finds, values and negotiates the right business for you, on and off market.',
  ogDescription:
    'Independent buy-side advice in Melbourne and across Australia, from the search through to settlement and handover.',
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: 'Buying a Business', path: PAGE_PATH },
];

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Buying a business',
  serviceType: 'Buy-side business advisory',
  description:
    'Independent advice for business buyers in Australia: search, valuation, negotiation, due diligence, settlement and handover.',
  url: absoluteUrl(PAGE_PATH),
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: ['Victoria', 'New South Wales', 'Queensland', 'Western Australia'].map(
    (name) => ({ '@type': 'State', name }),
  ),
};

export default function BuyingABusinessPage() {
  return (
    <div className='min-h-screen bg-white'>
      <JsonLd data={[breadcrumbJsonLd(CRUMBS), serviceJsonLd, faqJsonLd(FAQS)]} />
      <BuyingHero crumbs={CRUMBS} />
      <SectionNav sections={SECTIONS} />
      <RecentAcquisitions />
      <WhyBlackmont />
      <HowWeWork />
      <WhoWeHelp />
      <AgentVsDiy />
      <DueDiligence />
      <Locations />
      <Tips />
      <FaqSection
        faqs={FAQS}
        heading='Buying a business: FAQs'
        intro='The questions buyers ask us most before they buy.'
      />
      <ClosingCta
        heading='Ready to buy a business?'
        text='If you want to buy a business, tell us what you are looking for.'
      />
    </div>
  );
}
