import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { PageBanner } from '@/components/global/page-banner';
import { Container } from '@/components/landing/primitives';
import { fetchPublicBlogs, BLOGS_PER_PAGE, type Blog } from '@/lib/blogs';
import { ResourceLink } from '../exit/_components/resource-link';
import { BlogCard } from './_components/blog-card';
import { BlogPagination } from './_components/blog-pagination';

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

const resourceTools = [
  {
    title: 'Business Valuation Tool',
    apiName: 'Valuation Tool',
    summary:
      'Estimate the potential value of your business using industry-based insights.',
    image: '/valuation.webp',
    href: '/exit/valuation',
    cta: 'Access Tool',
  },
  {
    title: 'Business Sale Checklist',
    apiName: 'Sale Readiness Score',
    summary:
      'Understand what buyers look for before taking your business to market.',
    image: '/sale.webp',
    href: '/exit/readiness',
    cta: 'Download Checklist',
  },
  {
    title: 'Industry Benchmark Report',
    apiName: 'Industry Benchmark Report',
    summary:
      'Compare your business performance against broader industry standards.',
    image: '/benchmark.webp',
    href: '/exit/benchmarks',
    cta: 'View Report',
  },
  {
    title: 'Exit Planning Guide',
    apiName: 'Exit Planning Guide',
    summary:
      'Learn how to prepare for a smoother and more profitable business exit.',
    image: '/exit-plan.webp',
    href: '/exit/exit-planning',
    cta: 'Get Guide',
  },
];

const resourceCardClass =
  'group flex h-full w-full cursor-pointer flex-col overflow-hidden border border-secondary/10 bg-background text-left transition-colors hover:border-accent/40';

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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='mb-12 text-center text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
      {children}
    </h2>
  );
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

      <PageBanner
        title={
          <>
            Resources &amp;{' '}
            <span className='font-light text-accent'>Blogs</span>
          </>
        }
        description='Insights, guides, and tips for business owners, buyers, and sellers. Stay informed with the latest from Blackmont Advisory.'
        image='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1500&q=80'
      />

      {/* ── Resource Tools ────────────────────────────── */}
      <section className='bg-background pt-20 lg:pt-28'>
        <Container>
          <SectionHeading>Resource Tools</SectionHeading>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {resourceTools.map((tool, idx) => (
              <ResourceLink
                key={tool.title}
                href={tool.href}
                resourceTitle={tool.apiName}
                className={resourceCardClass}
                index={idx}
              >
                <div className='relative h-48 w-full overflow-hidden'>
                  <Image
                    src={tool.image}
                    alt={tool.title}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                </div>
                <div className='flex flex-1 flex-col p-6'>
                  <p className='mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-accent'>
                    Free Resource
                  </p>
                  <h3 className='mb-3 line-clamp-2 text-lg font-bold tracking-tight text-secondary transition-colors group-hover:text-accent'>
                    {tool.title}
                  </h3>
                  <p className='mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground'>
                    {tool.summary}
                  </p>
                  <div className='mt-auto flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent'>
                    {tool.cta}
                    <ArrowUpRight className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                  </div>
                </div>
              </ResourceLink>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Blog Grid ────────────────────────────────── */}
      <section className='bg-background py-20 lg:py-28'>
        <Container>
          <SectionHeading>Blogs</SectionHeading>

          {blogs.length > 0 ? (
            <>
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              <BlogPagination page={page} totalPages={totalPages} />
            </>
          ) : (
            <p className='text-center text-muted-foreground'>
              {failed
                ? 'Our articles are temporarily unavailable. Please check back shortly.'
                : page > 1
                  ? 'There are no articles on this page.'
                  : 'No articles have been published yet.'}
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
