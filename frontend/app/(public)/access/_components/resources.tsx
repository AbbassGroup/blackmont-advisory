'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './section-heading';
import { ResourceGate } from './resource-gate';

interface Resource {
  title: string;
  apiName: string;
  summary: string;
  image: string;
  href: string;
  cta: string;
}

const resources: Resource[] = [
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

const cardClass =
  'group flex h-full w-full cursor-pointer flex-col overflow-hidden border border-secondary/10 bg-background text-left transition-colors hover:border-accent/40';

function CardInner({ resource }: { resource: Resource }) {
  return (
    <>
      <div className='relative h-48 w-full overflow-hidden bg-muted'>
        <Image
          src={resource.image}
          alt={resource.title}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
          className='object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </div>
      <div className='flex flex-1 flex-col p-6'>
        <h3 className='mb-3 line-clamp-2 text-lg font-bold text-secondary transition-colors group-hover:text-accent'>
          {resource.title}
        </h3>
        <p className='mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground'>
          {resource.summary}
        </p>
        <div className='mt-auto flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent'>
          {resource.cta}
          <ArrowUpRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
        </div>
      </div>
    </>
  );
}

export function Resources() {
  return (
    <section id='resources' className='scroll-mt-24 bg-background py-20 lg:py-28'>
      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16'>
        <SectionHeading label='Complimentary' title='Business Exit Resources' />

        <div className='mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4'>
          {resources.map((resource, i) => (
            <ResourceGate
              key={resource.title}
              href={resource.href}
              resourceTitle={resource.apiName}
              className={cardClass}
              index={i}
            >
              <CardInner resource={resource} />
            </ResourceGate>
          ))}
        </div>
      </div>
    </section>
  );
}
