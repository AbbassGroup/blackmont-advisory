import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { blogs } from '@/data/blog-data';
import { ResourceGate } from '../access/_components/resource-gate';
import { BlogCard } from './_components/blog-card';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

const resourceTools = [
  {
    title: 'Business Valuation Tool',
    apiName: 'Valuation Tool',
    summary:
      'Estimate the potential value of your business using industry-based insights.',
    image: '/businessbrokers/valuation.webp',
    href: '/access/valuation',
    cta: 'Access Tool',
  },
  {
    title: 'Business Sale Checklist',
    apiName: 'Sale Readiness Score',
    summary:
      'Understand what buyers look for before taking your business to market.',
    image: '/businessbrokers/sale.webp',
    href: '/access/readiness',
    cta: 'Download Checklist',
  },
  {
    title: 'Industry Benchmark Report',
    apiName: 'Industry Benchmark Report',
    summary:
      'Compare your business performance against broader industry standards.',
    image: '/businessbrokers/benchmark.webp',
    href: '/access/benchmarks',
    cta: 'View Report',
  },
  {
    title: 'Exit Planning Guide',
    apiName: 'Exit Planning Guide',
    summary:
      'Learn how to prepare for a smoother and more profitable business exit.',
    image: '/businessbrokers/exit-plan.webp',
    href: '/access/exit-planning',
    cta: 'Get Guide',
  },
];

const resourceCardClass =
  'group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-primary hover:shadow-xl';

export const metadata: Metadata = {
  title:
    'Resources & Blog – Business Insights & Guides | ABBASS Business Brokers',
  description:
    'Insights, guides, and tips for business owners, buyers, and sellers. Stay informed with the latest from ABBASS Business Brokers.',
  openGraph: {
    title: 'Resources & Blog | ABBASS Business Brokers',
    description:
      'Expert guides and insights for buying and selling businesses.',
  },
};

export default function ResourcesPage() {
  return (
    <main className='min-h-screen bg-brand-offwhite'>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className='relative pt-[80px] min-h-[500px] lg:min-h-[580px] flex items-center justify-center overflow-hidden'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1500&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className='absolute inset-0 bg-black/45' />
        <div className='relative z-10 text-center px-4 max-w-3xl mx-auto'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight'>
            Resources &amp; Blogs
          </h1>
          <p className='text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow'>
            Insights, guides, and tips for business owners, buyers, and sellers.
            Stay informed with the latest from ABBASS Business Brokers.
          </p>
        </div>

        <ScrollIndicator />
      </section>

      {/* ── Resource Tools ────────────────────────────── */}
      <section className='py-16 md:py-24 px-4 lg:px-8 max-w-[1500px] mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-brand-black mb-4 inline-block relative'>
            Resource Tools
            <span className='absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-brand-primary rounded-full' />
          </h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
          {resourceTools.map((tool, idx) => (
            <ResourceGate
              key={tool.title}
              href={tool.href}
              resourceTitle={tool.apiName}
              className={resourceCardClass}
              index={idx}
            >
              <div className='relative h-48 w-full overflow-hidden bg-gray-100'>
                <Image
                  src={tool.image}
                  alt={tool.title}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <div className='flex flex-1 flex-col p-6'>
                <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-brand-primary'>
                  Free Resource
                </p>
                <h3 className='mb-3 line-clamp-2 text-lg font-bold text-brand-black transition-colors group-hover:text-brand-primary'>
                  {tool.title}
                </h3>
                <p className='mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-500'>
                  {tool.summary}
                </p>
                <div className='mt-auto flex items-center gap-1 text-sm font-semibold text-brand-primary'>
                  {tool.cta}
                  <ArrowUpRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </div>
              </div>
            </ResourceGate>
          ))}
        </div>
      </section>

      {/* ── Blog Grid ────────────────────────────────── */}
      <section className='pb-16 md:pb-24 px-4 lg:px-8 max-w-[1500px] mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-brand-black mb-4 inline-block relative'>
            Blogs
            <span className='absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-brand-primary rounded-full' />
          </h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
          {blogs.map((blog, idx) => (
            <BlogCard key={idx} blog={blog} />
          ))}
        </div>
      </section>
    </main>
  );
}
