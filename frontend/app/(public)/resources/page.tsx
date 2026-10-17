import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { fetchPublicBlogs, BLOGS_PER_PAGE, type Blog } from '@/lib/blogs';
import { ResourceTools } from '@/components/resources/resource-tools';
import { ResourcesBanner } from './_components/banner';
import { BlogSection } from './_components/blog-section';

const SITE_URL = 'https://blackmontadvisory.com';

type ResourcesPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

/** `?page=` is user input — anything that isn't a positive integer is page 1. */
function toPageNumber(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? '1', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export async function generateMetadata({
  searchParams,
}: ResourcesPageProps): Promise<Metadata> {
  const page = toPageNumber((await searchParams).page);

  // Each paginated page needs its own canonical, or page 2+ reads to crawlers
  // as duplicate content pointing at page 1.
  const canonical = page === 1 ? '/resources' : `/resources?page=${page}`;
  const suffix = page === 1 ? '' : ` – Page ${page}`;

  return {
    title: `Resources & Blog – Business Insights & Guides${suffix} | Blackmont Advisory`,
    description:
      'Insights, guides, and tips for business owners, buyers, and sellers. Stay informed with the latest from Blackmont Advisory.',
    alternates: { canonical },
    openGraph: {
      title: `Resources & Blog${suffix} | Blackmont Advisory`,
      description:
        'Expert guides and insights for buying and selling businesses.',
    },
  };
}

function buildStructuredData(blogs: Blog[], page: number) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Resources',
          item: `${SITE_URL}/resources`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Blackmont Advisory Resources & Blog',
      itemListElement: blogs.map((blog, i) => ({
        '@type': 'ListItem',
        // Keep positions running across pages rather than restarting at 1.
        position: (page - 1) * BLOGS_PER_PAGE + i + 1,
        url: `${SITE_URL}/resources/${blog.url}`,
        item: {
          '@type': 'Article',
          headline: blog.title,
          description: blog.metaDescription,
          url: `${SITE_URL}/resources/${blog.url}`,
          image: blog.image ?? undefined,
          author: { '@type': 'Organization', name: 'Blackmont Advisory' },
          datePublished: blog.createdAt,
          dateModified: blog.updatedAt,
        },
      })),
    },
  ];
}

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const page = toPageNumber((await searchParams).page);

  // The resource tools above don't depend on the API, so a blogs outage should
  // degrade this page to "no articles" rather than take the whole page down.
  let blogs: Blog[] = [];
  let totalPages = 1;
  let failed = false;

  try {
    const result = await fetchPublicBlogs({ page, limit: BLOGS_PER_PAGE });
    blogs = result.blogs;
    totalPages = result.pagination.totalPages;
  } catch (error) {
    console.error('Failed to load blogs for /resources:', error);
    failed = true;
  }

  return (
    <>
      <JsonLd data={buildStructuredData(blogs, page)} />

      <ResourcesBanner />

      {/* ── Resource Tools ────────────────────────────── */}
      <ResourceTools
        id='resource-tools'
        heading='Resource tools'
        headingId='resource-tools-title'
      />

      {/* ── Blog Grid ────────────────────────────────── */}
      <BlogSection blogs={blogs} page={page} totalPages={totalPages} failed={failed} />
    </>
  );
}
