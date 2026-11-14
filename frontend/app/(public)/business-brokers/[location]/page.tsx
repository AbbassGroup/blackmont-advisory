import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/json-ld';
import { Contact } from '@/components/landing/contact';
import { CredentialsBar } from '@/components/landing/credentials-bar';
import { FaqSection } from '@/components/landing/tabbed-page/faq-section';
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  SITE_URL,
} from '@/lib/seo';
import {
  BROKER_LOCATIONS,
  SHARED_LOCATION_FAQS,
  brokerLocationBySlug,
} from '@/lib/data/broker-locations';
import { BrokersBanner } from '../_components/banner';
import {
  LocationAreas,
  LocationMarket,
  LocationServices,
  OtherLocations,
} from '../_components/locations';

type LocationPageProps = {
  params: Promise<{ location: string }>;
};

// Only the cities in BROKER_LOCATIONS exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return BROKER_LOCATIONS.map(({ slug }) => ({ location: slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = brokerLocationBySlug((await params).location);
  if (!location) return { title: 'Not Found' };
  return buildMetadata({
    path: `/business-brokers/${location.slug}`,
    title: location.title,
    description: location.description,
  });
}

export default async function BrokerLocationPage({ params }: LocationPageProps) {
  const location = brokerLocationBySlug((await params).location);
  if (!location) notFound();

  const path = `/business-brokers/${location.slug}`;
  const crumbs = [
    { name: 'Home', path: '' },
    { name: 'Business Brokers', path: '/business-brokers' },
    { name: location.city, path },
  ];
  const faqs = [...location.faqs, ...SHARED_LOCATION_FAQS];

  const jsonLd = [
    breadcrumbJsonLd(crumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Business brokers ${location.city}`,
      serviceType: 'Business brokerage',
      description: location.description,
      url: absoluteUrl(path),
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'City', name: location.city },
        { '@type': 'State', name: location.state },
      ],
    },
    faqJsonLd(faqs),
  ];

  return (
    <div className='min-h-screen bg-white'>
      <JsonLd data={jsonLd} />
      <BrokersBanner
        crumbs={crumbs}
        eyebrow={`${location.state} business brokers`}
        title={location.h1}
        intro={location.intro}
        primary={{ href: '#contact', label: `Talk to a ${location.city} broker` }}
        secondary={{ href: '/business-valuation', label: 'Free business valuation' }}
        image={location.image}
      />
      <CredentialsBar />
      <LocationServices location={location} />
      <LocationMarket location={location} />
      <LocationAreas location={location} />
      <FaqSection
        faqs={faqs}
        heading={`Business brokers ${location.city}: FAQs`}
        intro={`What ${location.city} owners and buyers ask us most.`}
      />
      <OtherLocations current={location.slug} />
      <Contact />
    </div>
  );
}
