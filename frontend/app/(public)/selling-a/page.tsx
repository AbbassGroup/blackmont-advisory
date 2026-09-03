import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from '@/lib/seo';
import { SHELL, H2, TH, TD } from '@/lib/seo-layout';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { CtaPair } from '@/components/seo/cta-pair';
import { LastUpdated } from '@/components/seo/last-updated';
import {
  INDUSTRY_BENCHMARKS,
  indexableIndustryPages,
} from '@/lib/data/industry-benchmarks';
import { EBITDA_BRACKETS } from '@/lib/data/valuation-brackets';


const TITLE = 'What Businesses Sell For in Australia';const DESCRIPTION =
  'Typical EBITDA multiples, sale price ranges and time to sell across ten Australian SME sectors, plus how the multiple changes with the size of the business.';

export const metadata: Metadata = buildMetadata({
  path: '/selling-a',
  title: `${TITLE} | Blackmont Advisory`,
  description: DESCRIPTION,
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: TITLE, path: '/selling-a' },
];

export default function SellingIndexPage() {
  const linkable = new Map(
    indexableIndustryPages().map(({ name, page }) => [name, page]),
  );

  const jsonLd = [
    breadcrumbJsonLd(CRUMBS),
    ...(linkable.size
      ? [
          itemListJsonLd(
            'Selling a business by industry',
            indexableIndustryPages().map(({ name, page }) => ({
              name: page.h1,
              description: `What ${name.toLowerCase()} businesses sell for in Australia.`,
              path: `/selling-a/${page.slug}`,
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
            Most owners have no reference point for what their business is
            actually worth. These are the ranges we see across the Australian SME
            market: what each sector typically sells for, how long a sale takes,
            and how much the size of the business changes the answer.
          </p>
        </div>
      </section>

      <div className={`${SHELL} py-16 lg:py-20`}>
        <section>
          <h2 className={H2}>Sale multiples by industry</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            Multiples are applied to EBITDA. The ranges below reflect typical
            outcomes for established, profitable businesses with clean financial
            records. Businesses that fall short on either count sit at the bottom
            of the range or below it.
          </p>

          <div className='mt-8 overflow-x-auto'>
            <table className='w-full min-w-[640px] border-collapse text-left'>
              <thead>
                <tr className='border-b-[1.5px] border-secondary/20'>
                  <th className={TH}>Industry</th>
                  <th className={TH}>EBITDA multiple</th>
                  <th className={TH}>Typical price</th>
                  <th className={TH}>Time to sell</th>
                  <th className={TH}>Demand</th>
                </tr>
              </thead>
              <tbody>
                {INDUSTRY_BENCHMARKS.map(
                  ({ name, multi, price, days, demand }) => {
                    const page = linkable.get(name);
                    return (
                      <tr key={name} className='border-b border-secondary/10'>
                        <td className={`${TD} font-semibold text-secondary`}>
                          {page ? (
                            <Link
                              href={`/selling-a/${page.slug}`}
                              className='group inline-flex items-center gap-1.5 transition-colors hover:text-accent'
                            >
                              {name}
                              <ArrowUpRight className='h-3.5 w-3.5 text-accent opacity-0 transition-opacity group-hover:opacity-100' />
                            </Link>
                          ) : (
                            name
                          )}
                        </td>
                        <td className={`${TD} font-semibold text-secondary`}>
                          {multi.trim()}
                        </td>
                        <td className={TD}>{price}</td>
                        <td className={TD}>{days}</td>
                        <td className={TD}>{demand}</td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className='mt-14'>
          <h2 className={H2}>How size changes the multiple</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            Sector is only half the picture. The same business earning five times
            more sits in a different band entirely, because larger businesses
            carry less key-person risk, have real management underneath the
            owner, and attract a different class of buyer. This is the single
            factor owners most often underestimate.
          </p>

          <div className='mt-8 overflow-x-auto'>
            <table className='w-full min-w-[420px] border-collapse text-left'>
              <thead>
                <tr className='border-b-[1.5px] border-secondary/20'>
                  <th className={TH}>Annual EBITDA</th>
                  <th className={TH}>Typical multiple</th>
                </tr>
              </thead>
              <tbody>
                {[...EBITDA_BRACKETS].reverse().map((bracket) => (
                  <tr
                    key={bracket.label}
                    className='border-b border-secondary/10'
                  >
                    <td className={TD}>{bracket.label}</td>
                    <td className={`${TD} font-semibold text-secondary`}>
                      {bracket.min}× – {bracket.max}×
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className='mt-14'>
          <h2 className={H2}>How to read these numbers</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            A range is not a valuation. Where a specific business lands depends
            on the quality of its financial records, how dependent it is on the
            owner, how concentrated its customers are, and what the buyer intends
            to do with it. Two businesses in the same sector with identical
            profit can sell for very different numbers.
          </p>
          <p className='mt-4 leading-relaxed text-muted-foreground'>
            These figures are indicative ranges drawn from the Australian SME
            market. Treat them as a starting point for a conversation, not as an
            appraisal of your business.
          </p>
        </section>

        <CtaPair
          items={[
            {
              href: '/access/valuation',
              title: 'Estimate your own range',
              detail: 'Free valuation tool. Five questions, indicative range.',
            },
            {
              href: '/#contact',
              title: 'Talk to a broker confidentially',
              detail: 'A 30-minute strategy call. No obligation.',
            },
          ]}
        />

        <LastUpdated />
      </div>
    </main>
  );
}
