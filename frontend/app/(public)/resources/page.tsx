import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { blogs } from '@/data/blog-data';
import { JsonLd } from '@/components/seo/json-ld';
import { PageBanner } from '@/components/global/page-banner';
import { Container } from '@/components/landing/primitives';
import { ResourceGate } from '../access/_components/resource-gate';
import { BlogCard } from './_components/blog-card';

const SITE_URL = 'https://blackmontadvisory.com';

const resourceTools = [
  {
    title: 'Business Valuation Tool',
    apiName: 'Valuation Tool',
    summary:
      'Estimate the potential value of your business using industry-based insights.',
    image: '/valuation.webp',
    href: '/access/valuation',
    cta: 'Access Tool',
  },
  {
    title: 'Business Sale Checklist',
    apiName: 'Sale Readiness Score',
    summary:
      'Understand what buyers look for before taking your business to market.',
    image: '/sale.webp',
    href: '/access/readiness',
    cta: 'Download Checklist',
  },
  {
    title: 'Industry Benchmark Report',
    apiName: 'Industry Benchmark Report',
    summary:
      'Compare your business performance against broader industry standards.',
    image: '/benchmark.webp',
    href: '/access/benchmarks',
    cta: 'View Report',
  },
  {
    title: 'Exit Planning Guide',
    apiName: 'Exit Planning Guide',
    summary:
      'Learn how to prepare for a smoother and more profitable business exit.',
    image: '/exit-plan.webp',
    href: '/access/exit-planning',
    cta: 'Get Guide',
  },
];

const resourceCardClass =
  'group flex h-full w-full cursor-pointer flex-col overflow-hidden border border-secondary/10 bg-background text-left transition-colors hover:border-accent/40';

export const metadata: Metadata = {
  title: 'Resources & Blog – Business Insights & Guides | Blackmont Advisory',
  description:
    'Insights, guides, and tips for business owners, buyers, and sellers. Stay informed with the latest from Blackmont Advisory.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Resources & Blog | Blackmont Advisory',
    description:
      'Expert guides and insights for buying and selling businesses.',
  },
};

const structuredData = [
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
      position: i + 1,
      url: `${SITE_URL}/resources/${blog.link}`,
      item: {
        '@type': 'Article',
        headline: blog.title,
        description: blog.summary,
        url: `${SITE_URL}/resources/${blog.link}`,
        image: blog.image,
        author: { '@type': 'Organization', name: 'Blackmont Advisory' },
      },
    })),
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='mb-12 text-center text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
      {children}
    </h2>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={structuredData} />

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
              <ResourceGate
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
              </ResourceGate>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Blog Grid ────────────────────────────────── */}
      <section className='bg-background py-20 lg:py-28'>
        <Container>
          <SectionHeading>Blogs</SectionHeading>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {blogs.map((blog, idx) => (
              <BlogCard key={idx} blog={blog} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
