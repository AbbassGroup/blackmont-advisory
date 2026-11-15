import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { ContactForm } from '@/components/landing/contact-form';
import { CredentialsBar } from '@/components/landing/credentials-bar';
import { FormBanner } from '@/components/landing/tabbed-page/form-banner';
import { FaqSection } from '@/components/landing/tabbed-page/faq-section';
import { ClosingCta } from '@/components/landing/tabbed-page/closing-cta';
import {
  CityLinks,
  LocationOverview,
  StepsSection,
  TipsSection,
  type CityLink,
} from '@/components/landing/location-page/sections';
import { BUY_STEPS, SELL_STEPS } from '@/lib/data/location-pages';
import type { SuburbPage } from '@/lib/data/suburb-pages';
import { absoluteUrl, breadcrumbJsonLd, buildMetadata, faqJsonLd, SITE_URL } from '@/lib/seo';

type Mode = 'sell' | 'buy';

const MODES = {
  sell: {
    base: '/selling-a-business',
    section: 'Selling a Business',
    serviceType: 'Business sale advisory',
    steps: SELL_STEPS,
    lockedType: 'sell',
  },
  buy: {
    base: '/buying-a-business',
    section: 'Buying a Business',
    serviceType: 'Buy-side business advisory',
    steps: BUY_STEPS,
    lockedType: 'buy',
  },
} as const;

export function suburbMetadata(page: SuburbPage, mode: Mode): Metadata {
  return buildMetadata({
    path: `${MODES[mode].base}/${page.slug}`,
    title: page.title,
    description: page.description,
  });
}

/**
 * A CBD / inner-city page. Same layout as the city pages, one level deeper:
 * Home › Selling a Business › Melbourne › Southbank.
 */
export function SuburbLanding({ page, mode, siblings }: { page: SuburbPage; mode: Mode; siblings: SuburbPage[] }) {
  const { base, section, serviceType, steps, lockedType } = MODES[mode];
  const sell = mode === 'sell';
  const suburb = page.suburb.name;
  const { city, slug: citySlug, stateAbbr, outline } = page.place;
  const cityPath = `${base}/${citySlug}`;
  const path = `${base}/${page.slug}`;

  const crumbs = [
    { name: 'Home', path: '' },
    { name: section, path: base },
    { name: city, path: cityPath },
    { name: suburb, path },
  ];

  const jsonLd = [
    breadcrumbJsonLd(crumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.h1,
      alternateName: page.keyword,
      serviceType,
      description: page.description,
      url: absoluteUrl(path),
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: {
        '@type': 'Place',
        name: `${suburb}, ${city} ${stateAbbr}`,
        containedInPlace: { '@type': 'City', name: city },
      },
    },
    faqJsonLd(page.faqs),
  ];

  const nearby: CityLink[] = page.suburb.nearby
    .map((slug) => siblings.find((s) => s.slug === slug))
    .filter((s): s is SuburbPage => Boolean(s))
    .map((s) => ({
      href: `${base}/${s.slug}`,
      city: s.suburb.name,
      state: city,
      stateAbbr,
      outline,
      cta: `${sell ? 'Sell' : 'Buy'} a business in ${s.suburb.name}`,
    }));
  // Close the loop back up to the city page.
  nearby.push({
    href: cityPath,
    city: `All of ${city}`,
    state: city,
    stateAbbr,
    outline,
    cta: `${sell ? 'Sell' : 'Buy'} a business in ${city}`,
  });

  return (
    <div className='min-h-screen bg-white'>
      <JsonLd data={jsonLd} />
      <FormBanner
        titleId={`${mode}-suburb-title`}
        crumbs={crumbs}
        title={page.h1}
        intro={page.intro}
        points={page.points}
        primary={
          sell
            ? { href: '/business-valuation', label: 'Get a free business valuation' }
            : { href: '#enquire', label: `Start your ${suburb} search` }
        }
        secondary={{ href: cityPath, label: `${sell ? 'Selling' : 'Buying'} across ${city}` }}
        form={<ContactForm lockedType={lockedType} headingAs='h2' />}
        imageAlt={page.imageAlt}
      />
      <CredentialsBar />
      <LocationOverview page={page} panelLabel={`Why ${sell ? 'sell' : 'buy'} with Blackmont in ${suburb}`} />
      <StepsSection
        heading={sell ? `How we sell a ${suburb} business` : `How to buy a business in ${suburb}`}
        intro={
          sell
            ? 'Five steps, one senior advisor, and nothing shared with a buyer until you approve them.'
            : 'Five steps, with an advisor on your side only, from the brief to the keys.'
        }
        steps={steps}
      />
      <TipsSection page={page} />
      <FaqSection
        faqs={page.faqs}
        heading={`${sell ? 'Selling' : 'Buying'} a business in ${suburb}: FAQs`}
        intro={sell ? `What ${suburb} owners ask before they sell.` : `What buyers ask about ${suburb}.`}
        tone='canvas'
      />
      <CityLinks
        id='nearby'
        heading={`${sell ? 'Selling' : 'Buying'} a business near ${suburb}`}
        intro={`Other ${city} areas we cover.`}
        cities={nearby}
      />
      <ClosingCta
        heading={sell ? `Ready to sell your ${suburb} business?` : `Ready to buy a business in ${suburb}?`}
        text={sell ? 'Start with a confidential conversation.' : 'Tell us what you are looking for.'}
      />
    </div>
  );
}
