import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  gatedMetadata,
} from '@/lib/seo';
import { SHELL, H2 } from '@/lib/seo-layout';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { CtaPair } from '@/components/seo/cta-pair';
import { FaqSection } from '@/components/seo/faq-section';
import { LastUpdated } from '@/components/seo/last-updated';
import {
  CONTENT_UPDATED,
  indexableIndustryPages,
  industryBySlug,
  publishedIndustryPages,
} from '@/lib/data/industry-benchmarks';
import { EBITDA_BRACKETS } from '@/lib/data/valuation-brackets';
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
    <main className='min-h-screen bg-background'>
      <JsonLd data={jsonLd} />

      <section className='relative overflow-hidden border-b border-accent/15 bg-secondary pb-16 pt-28 lg:pt-32'>
        <span
          aria-hidden
          className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent'
        />
        <div className={`relative z-10 ${SHELL}`}>
          <Breadcrumbs items={crumbs} />

          <h1 className='mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-parchment md:text-4xl lg:text-5xl'>
            {page.h1}
          </h1>
          <p className='mt-6 max-w-3xl text-lg font-light leading-relaxed text-parchment/70'>
            {page.intro}
          </p>
          <p className='mt-4 max-w-3xl text-base font-light leading-relaxed text-parchment/50'>
            {page.heroNote}
          </p>
        </div>
      </section>

      <section className='border-b border-secondary/10 bg-linen py-10'>
        <div className={SHELL}>
          <dl className='grid grid-cols-2 gap-8 lg:grid-cols-4'>
            {headline.map(({ label, value }) => (
              <div key={label}>
                <dt className='text-[0.7rem] font-medium uppercase tracking-[0.02em] text-muted-foreground'>
                  {label}
                </dt>
                <dd className='mt-1 text-xl font-bold tracking-tight text-secondary'>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className={`${SHELL} py-16 lg:py-20`}>
        <section>
          <h2 className={H2}>What {page.covers} businesses sell for</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            The headline range is {multi.trim()} EBITDA, but where you land
            inside it depends heavily on the size of the business. Larger
            businesses attract higher multiples, because buyers see less risk and
            more management depth.
          </p>

          <div className='mt-8 overflow-x-auto'>
            <table className='w-full min-w-[420px] border-collapse text-left'>
              <thead>
                <tr className='border-b-[1.5px] border-secondary/20'>
                  <th className='py-3 pr-4 text-xs font-bold uppercase tracking-[0.1em] text-secondary'>
                    Annual EBITDA
                  </th>
                  <th className='py-3 text-xs font-bold uppercase tracking-[0.1em] text-secondary'>
                    Typical multiple
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...EBITDA_BRACKETS].reverse().map((bracket) => (
                  <tr
                    key={bracket.label}
                    className='border-b border-secondary/10'
                  >
                    <td className='py-3 pr-4 text-sm text-muted-foreground'>
                      {bracket.label}
                    </td>
                    <td className='py-3 text-sm font-semibold text-secondary'>
                      {bracket.min}× – {bracket.max}×
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className='mt-6 leading-relaxed text-muted-foreground'>
            {page.insightAside}
          </p>
        </section>

        <section className='mt-14'>
          <h2 className={H2}>How long it takes to sell</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            {page.timing}
          </p>
        </section>

        <section className='mt-14'>
          <h2 className={H2}>The five things buyers pay for</h2>
          <div className='mt-8 space-y-8'>
            {drivers.map((driver, i) => (
              <div key={driver}>
                <h3 className='text-lg font-bold tracking-tight text-secondary'>
                  {driver}
                </h3>
                <p className='mt-2 leading-relaxed text-muted-foreground'>
                  {page.driverDetail[i]}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className='mt-14'>
          <h2 className={H2}>{page.transfer.heading}</h2>
          {page.transfer.body.map((para) => (
            <p key={para} className='mt-5 leading-relaxed text-muted-foreground'>
              {para}
            </p>
          ))}
        </section>

        <section className='mt-14'>
          <h2 className={H2}>What buyers will ask for</h2>
          <ul className='mt-8 space-y-5'>
            {page.buyerChecks.map(({ label, detail }) => (
              <li key={label} className='flex gap-4'>
                <Check
                  className='mt-1 h-4 w-4 shrink-0 text-accent'
                  aria-hidden
                />
                <span>
                  <strong className='font-semibold text-secondary'>
                    {label}.
                  </strong>{' '}
                  <span className='text-muted-foreground'>{detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <FaqSection items={page.faqs} />

        <CtaPair
          items={[
            {
              href: '/exit/valuation',
              title: 'Find out what your business is worth',
              detail: 'Free valuation tool. Five questions, indicative range.',
            },
            {
              href: '/#contact',
              title: 'Talk to a broker confidentially',
              detail: 'A 30-minute strategy call. No obligation.',
            },
          ]}
        />

        {related.length > 0 && (
          <section className='mt-16 border-t border-secondary/10 pt-10'>
            <h2 className='text-lg font-bold tracking-tight text-secondary'>
              Other industry guides
            </h2>
            <ul className='mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3'>
              {related.map((other) => (
                <li key={other.page.slug}>
                  <Link
                    href={`/selling-a/${other.page.slug}`}
                    className='text-sm text-muted-foreground transition-colors hover:text-accent'
                  >
                    {other.page.h1.replace(/^Selling an? /, '')}
                    <span className='ml-2 text-xs text-secondary/50'>
                      {other.multi.trim()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href='/selling-a'
              className='mt-6 inline-block text-accent underline underline-offset-4 transition-opacity hover:opacity-75'
            >
              See all industries and multiples
            </Link>
          </section>
        )}

        {guides.length > 0 && (
          <section className='mt-12 border-t border-secondary/10 pt-10'>
            <h2 className='text-lg font-bold tracking-tight text-secondary'>
              Before you sell
            </h2>
            <ul className='mt-5 space-y-3'>
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className='group inline-flex items-baseline gap-2 text-sm font-semibold text-secondary transition-colors hover:text-accent'
                  >
                    {guide.h1}
                  </Link>
                  <span className='ml-2 text-sm text-muted-foreground'>
                    {guide.summary}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <LastUpdated />
      </div>
    </main>
  );
}
