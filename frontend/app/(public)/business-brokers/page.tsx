import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { Contact } from '@/components/landing/contact';
import { CredentialsBar } from '@/components/landing/credentials-bar';
import { FaqSection } from '@/components/landing/tabbed-page/faq-section';
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  itemListJsonLd,
  SITE_URL,
} from '@/lib/seo';
import { BROKER_LOCATIONS } from '@/lib/data/broker-locations';
import { FAQS, PAGE_PATH } from './_components/content';
import { BrokersBanner } from './_components/banner';
import { LocationsGrid } from './_components/locations';
import { Choosing, Fees, WhatWeDo } from './_components/sections';

// Hub for location searches. Primary: "business brokers" (Australia-wide).
// "Business brokers Melbourne" belongs to /business-brokers/melbourne, so the
// hub's title and H1 stay national to avoid the two competing.
export const metadata: Metadata = buildMetadata({
  path: PAGE_PATH,
  title: 'Business Brokers Australia | Blackmont Advisory',
  description:
    'Business brokers in Melbourne, Sydney, Brisbane and Perth. Blackmont Advisory sells businesses confidentially and acts for buyers in VIC, NSW, QLD and WA.',
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: 'Business Brokers', path: PAGE_PATH },
];

const jsonLd = [
  breadcrumbJsonLd(CRUMBS),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Business brokers',
    serviceType: 'Business brokerage',
    url: absoluteUrl(PAGE_PATH),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: BROKER_LOCATIONS.map(({ city }) => ({ '@type': 'City', name: city })),
  },
  itemListJsonLd(
    'Business brokers by location',
    BROKER_LOCATIONS.map(({ h1, summary, slug }) => ({
      name: h1,
      description: summary,
      path: `${PAGE_PATH}/${slug}`,
    })),
  ),
  faqJsonLd(FAQS),
];

export default function BusinessBrokersPage() {
  return (
    <div className='min-h-screen bg-white'>
      <JsonLd data={jsonLd} />
      <BrokersBanner
        crumbs={CRUMBS}
        title='Business Brokers Across Australia'
        intro='Looking for a business broker you can trust? Blackmont Advisory is a boutique Melbourne business broker and M&A advisor, selling businesses confidentially and acting for buyers across Australia.'
        primary={{ href: '#locations', label: 'Find a broker near you' }}
        secondary={{ href: '#contact', label: 'Talk to a broker' }}
      />
      <CredentialsBar />
      <LocationsGrid />
      <WhatWeDo />
      <Fees />
      <Choosing />
      <FaqSection
        faqs={FAQS}
        heading='Business brokers: FAQs'
        intro='What owners and buyers ask us most about working with a business broker.'
      />
      <Contact />
    </div>
  );
}
