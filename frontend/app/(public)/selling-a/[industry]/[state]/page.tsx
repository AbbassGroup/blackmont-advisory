import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/json-ld';
import { ContactForm } from '@/components/landing/contact-form';
import { CredentialsBar } from '@/components/landing/credentials-bar';
import { FormBanner } from '@/components/landing/tabbed-page/form-banner';
import { SectionShell, bodyText } from '@/components/landing/tabbed-page/section-shell';
import { CityLinks } from '@/components/landing/location-page/sections';
import { IndustrySaleMultiples } from '../_components/sale-multiples';
import { IndustrySaleTiming } from '../_components/sale-timing';
import { BuyerValueDrivers } from '../_components/buyer-value-drivers';
import { OwnershipTransfer } from '../_components/ownership-transfer';
import { BuyerChecks } from '../_components/buyer-checks';
import { IndustryFaqs } from '../_components/faqs';
import { IndustryNextSteps } from '../_components/next-steps';
import { industryBySlug } from '@/lib/data/industry-benchmarks';
import { aOrAn, industryLabel, industryStateCopy, industryStateLinks, industryStateParams } from '@/lib/data/industry-states';
import { absoluteUrl, breadcrumbJsonLd, buildMetadata, faqJsonLd, SITE_URL } from '@/lib/seo';

type PageProps = { params: Promise<{ industry: string; state: string }> };

// Only industry × state pairs with written copy exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return industryStateParams();
}

function load(industry: string, state: string) {
  const match = industryBySlug(industry);
  const local = industryStateCopy(industry, state);
  if (!match?.page || !local) return undefined;
  return { ...match, page: match.page, ...local };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { industry, state } = await params;
  const data = load(industry, state);
  if (!data) return { title: 'Not Found' };
  return buildMetadata({
    path: `/selling-a/${industry}/${state}`,
    title: data.copy.title,
    description: data.copy.description,
    keywords: [data.copy.keyword, ...data.copy.keywords],
  });
}

export default async function IndustryStatePage({ params }: PageProps) {
  const { industry, state: stateSlug } = await params;
  const data = load(industry, stateSlug);
  if (!data) notFound();

  const { page, multi, days, drivers, state, copy } = data;
  const label = industryLabel(page.h1);
  const path = `/selling-a/${page.slug}/${state.slug}`;
  const nationalPath = `/selling-a/${page.slug}`;
  const cityPath = `/selling-a-business/${state.citySlug}`;

  const crumbs = [
    { name: 'Home', path: '' },
    { name: 'What businesses sell for', path: '/selling-a' },
    { name: label, path: nationalPath },
    { name: state.name, path },
  ];

  const jsonLd = [
    breadcrumbJsonLd(crumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: copy.h1,
      alternateName: copy.keyword,
      serviceType: 'Business sale advisory',
      description: copy.description,
      url: absoluteUrl(path),
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'State', name: state.name, containedInPlace: { '@type': 'Country', name: 'Australia' } },
    },
    faqJsonLd(copy.faqs),
  ];

  const otherStates = industryStateLinks(page.slug, label, state.slug);
  otherStates.push({
    href: nationalPath,
    city: 'All of Australia',
    state: 'National guide',
    stateAbbr: 'AUS',
    outline: '',
    cta: `${label} sale guide`,
  });

  return (
    <div className='min-h-screen bg-white'>
      <JsonLd data={jsonLd} />
      <FormBanner
        titleId='industry-state-title'
        crumbs={crumbs}
        title={copy.h1}
        intro={copy.intro}
        points={copy.points}
        primary={{ href: '/business-valuation', label: 'Get a business valuation' }}
        secondary={{ href: cityPath, label: `Selling a business in ${state.city}` }}
        form={<ContactForm lockedType='sell' headingAs='h2' />}
        imageAlt={copy.imageAlt}
      />
      <CredentialsBar />

      <SectionShell id='market' heading={copy.marketHeading}>
        <div className='grid max-w-[960px] gap-5'>
          {copy.market.map((paragraph) => (
            <p key={paragraph} className={bodyText}>{paragraph}</p>
          ))}
        </div>
      </SectionShell>

      <IndustrySaleMultiples
        covers={page.covers}
        multiple={multi}
        insight={page.insightAside}
        heading={`What ${page.covers} businesses sell for in ${state.name}`}
      />
      <IndustrySaleTiming
        days={days}
        description={page.timing}
        heading={`How long it takes to sell in ${state.name}`}
      />
      <BuyerValueDrivers
        drivers={drivers}
        details={page.driverDetail}
        heading={`What ${state.adjective} buyers pay for`}
      />
      <OwnershipTransfer transfer={copy.transfer} />
      <BuyerChecks items={page.buyerChecks} heading={`What ${state.adjective} buyers will ask for`} />
      <IndustryFaqs items={copy.faqs} heading={`Selling ${aOrAn(label)} ${label.toLowerCase()} in ${state.name}: FAQs`} />
      <CityLinks
        id='other-states'
        heading={`${label} sales in other states`}
        intro='The same confidential, senior-led sale process, wherever your business is.'
        cities={otherStates}
      />
      <IndustryNextSteps />
    </div>
  );
}
