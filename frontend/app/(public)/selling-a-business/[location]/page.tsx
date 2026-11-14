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
  StepsSection,
  TipsSection,
  cityLinksFor,
} from '@/components/landing/location-page/sections';
import { SELL_LOCATIONS, SELL_STEPS, sellLocationBySlug } from '@/lib/data/location-pages';
import { SELL_SUBURBS, sellSuburbBySlug, suburbHrefsFor } from '@/lib/data/suburb-pages';
import { SuburbLanding, suburbMetadata } from '@/components/landing/location-page/suburb-page';
import { absoluteUrl, breadcrumbJsonLd, buildMetadata, faqJsonLd, SITE_URL } from '@/lib/seo';

const BASE = '/selling-a-business';

type PageProps = { params: Promise<{ location: string }> };

// Cities (SELL_LOCATIONS) and CBD / inner-city suburbs (SELL_SUBURBS); anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...SELL_LOCATIONS, ...SELL_SUBURBS].map(({ slug }) => ({ location: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await params;
  const suburb = sellSuburbBySlug(location);
  if (suburb) return suburbMetadata(suburb, 'sell');
  const page = sellLocationBySlug(location);
  if (!page) return { title: 'Not Found' };
  return buildMetadata({ path: `${BASE}/${page.slug}`, title: page.title, description: page.description });
}

export default async function SellLocationPage({ params }: PageProps) {
  const { location } = await params;
  const suburb = sellSuburbBySlug(location);
  if (suburb) return <SuburbLanding page={suburb} mode='sell' siblings={SELL_SUBURBS} />;

  const page = sellLocationBySlug(location);
  if (!page) notFound();

  const { city, state } = page.place;
  const path = `${BASE}/${page.slug}`;
  const crumbs = [
    { name: 'Home', path: '' },
    { name: 'Selling a Business', path: BASE },
    { name: city, path },
  ];

  const jsonLd = [
    breadcrumbJsonLd(crumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Selling a business in ${city}`,
      serviceType: 'Business sale advisory',
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
        titleId='sell-location-title'
        crumbs={crumbs}
        title={page.h1}
        intro={page.intro}
        points={page.points}
        primary={{ href: '/business-valuation', label: 'Get a free business valuation' }}
        secondary={{ href: BASE, label: 'How we sell a business' }}
        form={<ContactForm lockedType='sell' headingAs='h2' />}
      />
      <CredentialsBar />
      <LocationOverview page={page} panelLabel={`Why sell with Blackmont in ${city}`} />
      <StepsSection
        heading={`How we sell a ${city} business`}
        intro={`The same five steps for every sale, run by one senior advisor. Nothing about your ${city} business is shared without your approval.`}
        steps={SELL_STEPS}
      />
      <TipsSection page={page} />
      <AreasSection
        page={page}
        links={suburbHrefsFor(page.slug, BASE)}
        heading={`Sell your business anywhere in ${city}`}
        intro={`We act for business owners across ${city} and ${state}, including:`}
      />
      <FaqSection
        faqs={page.faqs}
        heading={`Selling a business in ${city}: FAQs`}
        intro={`What ${city} business owners ask us most before they sell.`}
        tone='white'
      />
      <CityLinks
        heading='Selling a business in other cities'
        intro='The same confidential, senior-led sale process, wherever your business is.'
        tone='canvas'
        cities={cityLinksFor(SELL_LOCATIONS, BASE, (c) => `Sell a business in ${c}`, page.slug)}
      />
      <ClosingCta
        heading={`Ready to sell your ${city} business?`}
        text='Start with a confidential conversation.'
      />
    </div>
  );
}
