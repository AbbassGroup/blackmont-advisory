import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { ResourceTools } from '@/components/resources/resource-tools';
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from '@/lib/seo';
import type { Blog } from '@/lib/blogs';
import { ResourcesBanner } from '../_components/banner';
import { BlogSection } from '../_components/blog-section';
import { ResourceTabs } from '../_components/resource-tabs';
import { ResourceAbout } from '../_components/resource-about';
import {
  loadResourceTab,
  pagedCanonical,
  pagedDescription,
  toPageNumber,
} from '../_components/load-tab';

const PATH = '/resources/blogs';
const TITLE = 'Business Blogs for Owners & Buyers';

type ResourcesPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: ResourcesPageProps): Promise<Metadata> {
  const page = toPageNumber((await searchParams).page);

  // Each paginated page gets its own canonical, title and description, or
  // page 2+ read to crawlers as duplicates of page 1.
  return buildMetadata({
    path: pagedCanonical(PATH, page),
    title: `${TITLE}${page > 1 ? ` – Page ${page}` : ''} | Blackmont Advisory`,
    description: pagedDescription(
      'Business blogs for owners and buyers: practical insights on selling, buying and valuing a business in Australia, from the team at Blackmont Advisory.',
      page,
    ),
  });
}

function buildStructuredData(blogs: Blog[]) {
  const items = blogs
    // A blog without a slug would otherwise emit /resources/null.
    .filter((blog) => blog.url)
    .map((blog) => ({
      name: blog.title,
      description: blog.metaDescription,
      path: `/resources/${blog.url}`,
    }));

  return [
    breadcrumbJsonLd([
      { name: 'Home', path: '' },
      { name: 'Blogs', path: PATH },
    ]),
    // An ItemList with no items is a structured-data error, so omit it.
    ...(items.length ? [itemListJsonLd('Blackmont Advisory blogs', items)] : []),
  ];
}

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const page = toPageNumber((await searchParams).page);
  // The resource tools below don't depend on the API, so a blogs outage
  // degrades this page to "unavailable" rather than taking it down.
  const { blogs, totalPages, failed } = await loadResourceTab('blog', page);

  return (
    <>
      <JsonLd data={buildStructuredData(blogs)} />

      <ResourcesBanner
        title={TITLE}
        intro='Practical articles on selling, buying and valuing a business in Australia: what buyers look for, how deals are priced, and what to do before you go to market.'
      />
      <ResourceTabs active='blogs' />

      <BlogSection blogs={blogs} page={page} totalPages={totalPages} failed={failed} noun='blogs' />

      <ResourceAbout id='resource-blogs-about-title' heading='About these articles'>
        <p>
          Our blogs are written by the team that runs Blackmont Advisory&apos;s
          sales, for the owners and buyers on either side of them. Each article
          takes one question that comes up in real transactions and answers it
          plainly: how a business is valued, what buyers look for in the
          financials, how a deal is structured and financed, and what tends to
          go wrong between an offer and settlement.
        </p>
        <p>
          If you are thinking about selling, the articles on preparation and
          valuation are the place to start. Our{' '}
          <Link href='/guides'>selling guides</Link> cover the whole process in
          more depth, the <Link href='/business-valuation'>business valuation</Link>{' '}
          page explains how a price is reached, and the{' '}
          <Link href='/exit/industry-benchmarks'>industry benchmarks</Link> show
          how businesses in your sector are typically priced.
        </p>
        <p>
          If you are buying, read the articles on due diligence and financing
          alongside our <Link href='/buying-a-business'>buying a business</Link>{' '}
          page, then browse the{' '}
          <Link href='/buy-a-business'>businesses currently for sale</Link>.
          For worked examples of how sales have actually played out, see our{' '}
          <Link href='/resources/case-studies'>case studies</Link>.
        </p>
      </ResourceAbout>

      <ResourceTools
        id='resource-tools'
        heading='Resource tools'
        headingId='resource-tools-title'
      />
    </>
  );
}
