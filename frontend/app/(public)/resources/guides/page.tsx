import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { ResourceTools } from '@/components/resources/resource-tools';
import { LandingContainer } from '@/components/landing/presentation';
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from '@/lib/seo';
import { indexableGuides } from '@/lib/data/guides';
import { GuideList } from '@/app/(public)/guides/_components/guide-list';
import { IndustryLinks } from '@/app/(public)/guides/_components/industry-links';
import { ResourcesBanner } from '../_components/banner';
import { ResourceTabs } from '../_components/resource-tabs';
import { BlogSection } from '../_components/blog-section';
import { loadResourceTab, pagedCanonical, pagedDescription, toPageNumber } from '../_components/load-tab';
import Link from 'next/link';
import { ResourceAbout } from '../_components/resource-about';

const PATH = '/resources/guides';
// Must differ from /guides (the in-depth guide hub) to avoid duplicate titles.
const TITLE = 'Business Sale Guides and Articles';

type GuidesPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: GuidesPageProps): Promise<Metadata> {
  const page = toPageNumber((await searchParams).page);
  return buildMetadata({
    path: pagedCanonical(PATH, page),
    title: `Business Sale Guides & Articles for Owners and Buyers${page > 1 ? ` – Page ${page}` : ''} | Blackmont Advisory`,
    description: pagedDescription(
      'Step-by-step articles for Australian business owners and buyers on valuation, due diligence, confidentiality, financing and completing a business sale or purchase.',
      page,
    ),
  });
}

export default async function ResourceGuidesPage({ searchParams }: GuidesPageProps) {
  const page = toPageNumber((await searchParams).page);
  const { blogs, totalPages, failed } = await loadResourceTab('guide', page);
  // The hand-built, in-depth guides live at /guides/<slug>; they sit below the
  // admin-published guides on the first page.
  const inDepthGuides = page === 1 ? indexableGuides() : [];

  const listItems = [
    ...blogs
      .filter((guide) => guide.url)
      .map((guide) => ({
        name: guide.title,
        description: guide.metaDescription,
        path: `/resources/${guide.url}`,
      })),
    ...inDepthGuides.map((guide) => ({
      name: guide.h1,
      description: guide.summary,
      path: `/guides/${guide.slug}`,
    })),
  ];

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Home', path: '' },
      { name: 'Guides', path: PATH },
    ]),
    // An ItemList with no items is a structured-data error, so omit it.
    ...(listItems.length ? [itemListJsonLd(TITLE, listItems)] : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ResourcesBanner
        title={TITLE}
        intro='Step-by-step guides for Australian business owners and buyers: whether your business is ready to sell, how long a sale takes, and how to keep it confidential.'
      />
      <ResourceTabs active='guides' />
      <BlogSection
        blogs={blogs}
        page={page}
        totalPages={totalPages}
        failed={failed}
        heading='Guides'
        basePath={PATH}
        noun='guides'
      />

      {inDepthGuides.length > 0 && (
        <>
          <div className='bg-white pt-14 min-[681px]:pt-16 min-[1121px]:pt-20'>
            <LandingContainer>
              <h2 className='m-0 font-advisory-heading text-[clamp(26px,5.6vw,32px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(28px,3vw,38px)]'>
                In-depth selling guides
              </h2>
            </LandingContainer>
          </div>
          <GuideList guides={inDepthGuides} />
          <GuidesAbout />
          <IndustryLinks />
        </>
      )}

      <ResourceTools id='resource-tools' heading='Resource tools' headingId='resource-tools-title' />
    </>
  );
}

/** Reading copy for the first page, so the tab is more than a grid of cards. */
function GuidesAbout() {
  return (
    <ResourceAbout
      id='resource-guides-about-title'
      heading='Using these guides'
      className='bg-white pb-14 min-[681px]:pb-16 min-[1121px]:pb-20'
    >
      <p>
        The articles above answer specific questions that come up during a
        sale or a purchase: how a business is valued, what due diligence
        covers, how deals are financed and structured, and what happens
        between signing and settlement. They are written for Australian
        owners and buyers, and they reflect how transactions actually run
        rather than how they look in a textbook.
      </p>
      <p>
        The in-depth guides go further on the three questions owners ask
        most often: whether the business is ready, how long a sale takes,
        and how to keep it confidential. For an overview of the whole
        process, stage by stage, start with our{' '}
        <Link href='/guides'>selling guides hub</Link>.
      </p>
      <p>
        Buyers will find it useful to read alongside our{' '}
        <Link href='/buying-a-business'>buying a business</Link> page and
        the current <Link href='/buy-a-business'>businesses for sale</Link>.
        Owners who want a figure to work from can read about our{' '}
        <Link href='/business-valuation'>business valuation</Link> approach,
        or see <Link href='/selling-a-business'>how we sell a business</Link>.
      </p>
    </ResourceAbout>
  );
}
