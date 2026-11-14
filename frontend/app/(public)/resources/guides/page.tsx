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
import { loadResourceTab, pagedCanonical, toPageNumber } from '../_components/load-tab';

const PATH = '/resources/guides';
const TITLE = 'Guides to Selling a Business';

type GuidesPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: GuidesPageProps): Promise<Metadata> {
  const page = toPageNumber((await searchParams).page);
  return buildMetadata({
    path: pagedCanonical(PATH, page),
    title: `${TITLE}${page > 1 ? ` – Page ${page}` : ''} | Blackmont Advisory`,
    description:
      'Practical guides for Australian business owners and buyers: what buyers check, how long a sale takes, and what the process actually involves.',
  });
}

export default async function ResourceGuidesPage({ searchParams }: GuidesPageProps) {
  const page = toPageNumber((await searchParams).page);
  const { blogs, totalPages, failed } = await loadResourceTab('guide', page);
  // The hand-built, in-depth guides live at /guides/<slug>; they sit below the
  // admin-published guides on the first page.
  const inDepthGuides = page === 1 ? indexableGuides() : [];

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Home', path: '' },
      { name: 'Guides', path: PATH },
    ]),
    itemListJsonLd(TITLE, [
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
    ]),
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
          <IndustryLinks />
        </>
      )}

      <ResourceTools id='resource-tools' heading='Resource tools' headingId='resource-tools-title' />
    </>
  );
}
