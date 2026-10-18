import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/json-ld';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  gatedMetadata,
} from '@/lib/seo';
import { IndustryBanner } from './_components/banner';
import { IndustrySaleMultiples } from './_components/sale-multiples';
import { IndustrySaleTiming } from './_components/sale-timing';
import { BuyerValueDrivers } from './_components/buyer-value-drivers';
import { OwnershipTransfer } from './_components/ownership-transfer';
import { BuyerChecks } from './_components/buyer-checks';
import { IndustryFaqs } from './_components/faqs';
import { IndustryNextSteps } from './_components/next-steps';
import { IndustryRelatedGuides } from './_components/related-guides';
import {
  CONTENT_UPDATED,
  indexableIndustryPages,
  industryBySlug,
  publishedIndustryPages,
} from '@/lib/data/industry-benchmarks';
import { indexableGuides } from '@/lib/data/guides';

type IndustryPageProps = {
  params: Promise<{ industry: string }>;
};

export function generateStaticParams() {
  return publishedIndustryPages().map(({ page }) => ({ industry: page.slug }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { industry } = await params;
  const match = industryBySlug(industry);
  if (!match) return { title: 'Not Found' };

  const { page } = match;
  return gatedMetadata({
    path: `/selling-a/${page.slug}`,
    title: page.pageTitle,
    description: page.metaDescription,
    reviewed: page.reviewed,
  });
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { industry } = await params;
  const match = industryBySlug(industry);
  if (!match) notFound();

  const { page, multi, price, days, demand, drivers } = match;

  const related = indexableIndustryPages().filter(
    (other) => other.page.slug !== page.slug,
  );
  const guides = indexableGuides();

  const crumbs = [
    { name: 'Home', path: '' },
    { name: 'What businesses sell for', path: '/selling-a' },
    { name: page.h1, path: `/selling-a/${page.slug}` },
  ];

  const jsonLd = [
    breadcrumbJsonLd(crumbs),
    articleJsonLd({
      headline: page.h1,
      description: page.metaDescription,
      path: `/selling-a/${page.slug}`,
      updated: CONTENT_UPDATED,
    }),
    faqJsonLd(page.faqs),
  ];

  const headline = [
    { label: 'Typical multiple', value: multi.trim() },
    { label: 'Typical sale price', value: price },
    { label: 'Time to sell', value: days },
    { label: 'Buyer demand', value: demand },
  ];

  return (
    <div className='min-h-screen bg-white'>
      <JsonLd data={jsonLd} />

      <IndustryBanner
        title={page.h1}
        intro={page.intro}
        note={page.heroNote}
        crumbs={crumbs}
        headline={headline}
      />

      <IndustrySaleMultiples
        covers={page.covers}
        multiple={multi}
        insight={page.insightAside}
      />

      <IndustrySaleTiming days={days} description={page.timing} />

      <BuyerValueDrivers drivers={drivers} details={page.driverDetail} />

      <OwnershipTransfer transfer={page.transfer} />

      <BuyerChecks items={page.buyerChecks} />

      <IndustryFaqs items={page.faqs} />

      <IndustryNextSteps />

      <IndustryRelatedGuides
        industries={related.map(({ page: other, multi: multiple }) => ({
          slug: other.slug,
          title: other.h1.replace(/^Selling an? /, ''),
          multiple: multiple.trim(),
        }))}
        guides={guides}
      />
    </div>
  );
}
