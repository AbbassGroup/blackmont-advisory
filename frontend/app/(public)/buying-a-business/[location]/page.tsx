import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/json-ld';
import { ContactForm } from '@/components/landing/contact-form';
import { CredentialsBar } from '@/components/landing/credentials-bar';
import { FormBanner } from '@/components/landing/tabbed-page/form-banner';
import { FaqSection } from '@/components/landing/tabbed-page/faq-section';
import { ClosingCta } from '@/components/landing/tabbed-page/closing-cta';
import {
  AreasSection,
  CityLinks,
  LocationOverview,
  RecentDeals,
  StepsSection,
  TipsSection,
  cityLinksFor,
} from '@/components/landing/location-page/sections';
import { BUY_LOCATIONS, BUY_STEPS, buyLocationBySlug } from '@/lib/data/location-pages';
import { BUY_SUBURBS, buySuburbBySlug, suburbHrefsFor } from '@/lib/data/suburb-pages';
import { SuburbLanding, suburbMetadata } from '@/components/landing/location-page/suburb-page';
import { RECENT_ACQUISITIONS } from '@/lib/data/recent-acquisitions';
import { absoluteUrl, breadcrumbJsonLd, buildMetadata, faqJsonLd, SITE_URL } from '@/lib/seo';

const BASE = '/buying-a-business';

type PageProps = { params: Promise<{ location: string }> };

// Cities (BUY_LOCATIONS) and CBD / inner-city suburbs (BUY_SUBURBS); anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...BUY_LOCATIONS, ...BUY_SUBURBS].map(({ slug }) => ({ location: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await params;
  const suburb = buySuburbBySlug(location);
  if (suburb) return suburbMetadata(suburb, 'buy');
  const page = buyLocationBySlug(location);
  if (!page) return { title: 'Not Found' };
  return buildMetadata({ path: `${BASE}/${page.slug}`, title: page.title, description: page.description });
}

export default async function BuyLocationPage({ params }: PageProps) {
  const { location } = await params;
  const suburb = buySuburbBySlug(location);
  if (suburb) return <SuburbLanding page={suburb} mode='buy' siblings={BUY_SUBURBS} />;

  const page = buyLocationBySlug(location);
  if (!page) notFound();

  const { city, state } = page.place;
  const path = `${BASE}/${page.slug}`;
  const crumbs = [
    { name: 'Home', path: '' },
    { name: 'Buying a Business', path: BASE },
    { name: city, path },
  ];
  // Real deals only: shown when we have completed acquisitions in this city.
  const deals = RECENT_ACQUISITIONS.filter((deal) => deal.location === city);

  const jsonLd = [
    breadcrumbJsonLd(crumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Buying a business in ${city}`,
      serviceType: 'Buy-side business advisory',
      description: page.description,
      url: absoluteUrl(path),
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'City', name: city },
        { '@type': 'State', name: state },
      ],
    },
    faqJsonLd(page.faqs),
  ];

  return (
    <div className='min-h-screen bg-white'>
      <JsonLd data={jsonLd} />
      <FormBanner
        titleId='buy-location-title'
        crumbs={crumbs}
        title={page.h1}
        intro={page.intro}
        points={page.points}
        primary={{ href: '#enquire', label: `Start your ${city} search` }}
        secondary={{ href: BASE, label: 'How we help buyers' }}
        form={<ContactForm lockedType='buy' headingAs='h2' />}
      />
      <CredentialsBar />
      <LocationOverview page={page} panelLabel={`Why buy with Blackmont in ${city}`} />
      <RecentDeals
        heading={`Recent business acquisitions in ${city}`}
        intro='Businesses we have helped clients buy, from first-time owners to operators growing through acquisition.'
        deals={deals}
      />
      <StepsSection
        heading={`How to buy a business in ${city}`}
        intro='Five steps, with an advisor working only for you from the brief to the handover.'
        steps={BUY_STEPS}
      />
      <TipsSection page={page} />
      <AreasSection
        page={page}
        links={suburbHrefsFor(page.slug, BASE)}
        heading={`Buy a business anywhere in ${city}`}
        intro={`We help buyers find businesses across ${city} and ${state}, including:`}
      />
      <FaqSection
        faqs={page.faqs}
        heading={`Buying a business in ${city}: FAQs`}
        intro={`What buyers ask us most about buying a business in ${city}.`}
        tone='white'
      />
      <CityLinks
        heading='Buying a business in other cities'
        intro='Independent buy-side advice, wherever you want to buy.'
        tone='canvas'
        cities={cityLinksFor(BUY_LOCATIONS, BASE, (c) => `Buy a business in ${c}`, page.slug)}
      />
      <ClosingCta
        heading={`Ready to buy a business in ${city}?`}
        text='Tell us what you are looking for.'
      />
    </div>
  );
}
