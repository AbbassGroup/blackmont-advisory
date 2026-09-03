import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from '@/lib/seo';
import { SHELL } from '@/lib/seo-layout';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { LastUpdated } from '@/components/seo/last-updated';
import { indexableGuides } from '@/lib/data/guides';


const TITLE = 'Guides to Selling a Business';
const DESCRIPTION =
  'Practical guides for Australian business owners considering a sale: what buyers check, how long it takes, and what the process actually involves.';

export const metadata: Metadata = buildMetadata({
  path: '/guides',
  title: `${TITLE} | Blackmont Advisory`,
  description: DESCRIPTION,
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: TITLE, path: '/guides' },
];

export default function GuidesIndexPage() {
  const guides = indexableGuides();

  const jsonLd = [
    breadcrumbJsonLd(CRUMBS),
    ...(guides.length
      ? [
          itemListJsonLd(
            TITLE,
            guides.map((guide) => ({
              name: guide.h1,
              description: guide.summary,
              path: `/guides/${guide.slug}`,
            })),
          ),
        ]
      : []),
  ];

  return (
    <main className='min-h-screen bg-background'>
      <JsonLd data={jsonLd} />

      <section className='relative overflow-hidden border-b border-accent/15 bg-secondary pb-16 pt-28 lg:pt-32'>
        <span
          aria-hidden
          className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent'
        />
        <div className={`relative z-10 ${SHELL}`}>
          <Breadcrumbs items={CRUMBS} />

          <h1 className='mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-parchment md:text-4xl lg:text-5xl'>
            {TITLE}
          </h1>
          <p className='mt-6 max-w-3xl text-lg font-light leading-relaxed text-parchment/70'>
            Straight answers to the questions owners ask before they sell, drawn
            from the transactions we run rather than from general advice.
          </p>
        </div>
      </section>

      <div className={`${SHELL} py-16 lg:py-20`}>
        <ul className='grid gap-px border-[1.5px] border-secondary/10 bg-secondary/10'>
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className='group block bg-muted px-8 py-9 transition-colors hover:bg-accent-pale'
              >
                <span className='flex items-start justify-between gap-6 text-xl font-bold tracking-tight text-secondary'>
                  {guide.h1}
                  <ArrowUpRight className='mt-1 h-5 w-5 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                </span>
                <span className='mt-2 block max-w-2xl text-sm leading-relaxed text-muted-foreground'>
                  {guide.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section className='mt-14'>
          <h2 className='text-2xl font-bold tracking-tight text-secondary sm:text-3xl'>
            Looking for your industry?
          </h2>
          <p className='mt-5 max-w-3xl leading-relaxed text-muted-foreground'>
            The guides above apply across sectors. For what your particular type
            of business sells for, how long it takes and what buyers examine, the
            industry pages go into the detail that is specific to you.
          </p>
          <Link
            href='/selling-a'
            className='mt-6 inline-block text-accent underline underline-offset-4 transition-opacity hover:opacity-75'
          >
            Browse the industry pages
          </Link>
        </section>

        <LastUpdated />
      </div>
    </main>
  );
}
