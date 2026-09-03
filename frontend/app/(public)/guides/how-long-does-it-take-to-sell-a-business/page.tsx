import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  gatedMetadata,
} from '@/lib/seo';
import { SHELL, H2, TH, TD } from '@/lib/seo-layout';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { FaqSection } from '@/components/seo/faq-section';
import { LastUpdated } from '@/components/seo/last-updated';
import { guideBySlug } from '@/lib/data/guides';
import { EXIT_PHASES } from '@/lib/data/exit-phases';
import {
  CONTENT_UPDATED,
  INDUSTRY_BENCHMARKS,
  indexableIndustryPages,
} from '@/lib/data/industry-benchmarks';

const guide = guideBySlug('how-long-does-it-take-to-sell-a-business')!;

const DELAYS = [
  {
    label: 'Financial records that are not ready',
    detail:
      'The most common cause by a distance. If three years of accountant-prepared statements do not exist when a buyer asks, the deal stalls while they are produced, and serious buyers move on to something else in the meantime.',
  },
  {
    label: 'Landlord consent',
    detail:
      'For anything tied to a premises, the lease has to be assigned and the landlord decides when that happens. Shopping centre landlords run a formal approval process with their own timeframes. This sits outside the control of both buyer and seller.',
  },
  {
    label: 'Regulatory transfer',
    detail:
      'In childcare, allied health and transport the incoming operator needs approvals, registrations or accreditation in their own name. None of it can be compressed by motivated parties, and it is why those sectors carry the longest ranges.',
  },
  {
    label: 'Buyer finance',
    detail:
      'A buyer who needs lending is dependent on their bank, and the bank works from your numbers. Clean books shorten this materially; weak ones can remove financed buyers from your pool entirely.',
  },
  {
    label: 'Due diligence surprises',
    detail:
      'An unresolved dispute, an outstanding tax position, a contract with a change of control clause. Each one is discoverable in advance, and each one costs weeks when it emerges mid-transaction instead.',
  },
];

const FAQS = [
  {
    q: 'How long does it take to sell a small business in Australia?',
    a: 'Most businesses find a buyer within 60 to 240 days of listing, depending on the sector. Trades sit at the fast end at 60 to 90 days; manufacturing and childcare at the slow end at 120 to 240. Preparation before listing usually adds another six to twelve months.',
  },
  {
    q: 'Why do some industries take so much longer?',
    a: 'Rarely a shortage of buyers. It is almost always process: regulatory approvals that must be issued to the new operator, or due diligence that covers plant, contracts and site conditions rather than just the accounts.',
  },
  {
    q: 'Can I speed up the sale?',
    a: 'The preparation phase is the part you control, and it is where the time actually goes. Clean financials, a secured lease and resolved legal matters before you list will shorten the transaction more than anything you can do once a buyer is engaged.',
  },
  {
    q: 'What if my business does not sell?',
    a: 'It usually means the price, the presentation or the readiness is wrong rather than that no buyer exists. A business that has sat on the market for months develops a reputation among buyers, which is a good reason to be ready before listing rather than testing the market first.',
  },
];

export const metadata: Metadata = gatedMetadata({
  path: `/guides/${guide.slug}`,
  title: guide.pageTitle,
  description: guide.metaDescription,
  reviewed: guide.reviewed,
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: 'Guides', path: '/guides' },
  { name: guide.h1, path: `/guides/${guide.slug}` },
];

const jsonLd = [
  breadcrumbJsonLd(CRUMBS),
  articleJsonLd({
    headline: guide.h1,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    updated: CONTENT_UPDATED,
  }),
  faqJsonLd(FAQS),
];

export default function TimeToSellGuidePage() {
  const linkable = new Map(
    indexableIndustryPages().map(({ name, page }) => [name, page.slug]),
  );

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
            {guide.h1}
          </h1>
          <p className='mt-6 max-w-3xl text-lg font-light leading-relaxed text-parchment/70'>
            Most Australian businesses find a buyer within 60 to 240 days of
            listing, depending on the sector. That is the part owners ask about.
            The part that decides the outcome happens before it.
          </p>
        </div>
      </section>

      <div className={`${SHELL} py-16 lg:py-20`}>
        <section>
          <h2 className={H2}>Time on the market, by industry</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            These are the ranges from listing to an accepted offer. They vary by
            a factor of four across sectors, and the difference is almost never
            buyer demand.
          </p>

          <div className='mt-8 overflow-x-auto'>
            <table className='w-full min-w-[520px] border-collapse text-left'>
              <thead>
                <tr className='border-b-[1.5px] border-secondary/20'>
                  <th className={TH}>Industry</th>
                  <th className={TH}>Time to sell</th>
                  <th className={TH}>Buyer demand</th>
                </tr>
              </thead>
              <tbody>
                {INDUSTRY_BENCHMARKS.map(({ name, days, demand }) => {
                  const slug = linkable.get(name);
                  return (
                    <tr key={name} className='border-b border-secondary/10'>
                      <td className={`${TD} font-semibold text-secondary`}>
                        {slug ? (
                          <Link
                            href={`/selling-a/${slug}`}
                            className='transition-colors hover:text-accent'
                          >
                            {name}
                          </Link>
                        ) : (
                          name
                        )}
                      </td>
                      <td className={TD}>{days}</td>
                      <td className={TD}>{demand}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className='mt-6 leading-relaxed text-muted-foreground'>
            Trades move fastest because the buyer pool is deep and there is
            little to transfer beyond the work itself. Childcare and
            manufacturing sit at the other end, and in both cases the delay is
            process rather than demand: approvals that must be issued to the new
            operator, or due diligence that covers plant, contracts and the site
            as well as the accounts.
          </p>
        </section>

        <section className='mt-14'>
          <h2 className={H2}>The timeline before you list</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            Time on the market is the visible part. Owners who achieve the
            strongest outcomes start two years out, because the things that lift
            a price cannot be arranged quickly. This is the sequence we work
            through with sellers.
          </p>

          <ol className='mt-10 space-y-10'>
            {EXIT_PHASES.map((phase) => (
              <li key={phase.title} className='border-l-2 border-accent pl-6'>
                <span className='text-[0.7rem] font-bold uppercase tracking-[0.14em] text-accent'>
                  {phase.label}
                </span>
                <h3 className='mt-1.5 text-lg font-bold tracking-tight text-secondary'>
                  {phase.title}
                </h3>
                <ul className='mt-3 space-y-1.5'>
                  {phase.tasks.map((task) => (
                    <li
                      key={task}
                      className='text-sm leading-relaxed text-muted-foreground'
                    >
                      {task}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className='mt-14'>
          <h2 className={H2}>What actually causes delays</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            When a sale runs long, it is rarely because no buyer could be found.
            These are the five things that hold transactions up, in roughly the
            order we encounter them.
          </p>
          <dl className='mt-8 space-y-6'>
            {DELAYS.map(({ label, detail }) => (
              <div key={label}>
                <dt className='font-semibold text-secondary'>{label}</dt>
                <dd className='mt-1.5 leading-relaxed text-muted-foreground'>
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <FaqSection items={FAQS} />

        <section className='mt-16 grid gap-px border-[1.5px] border-secondary/10 bg-secondary/10 sm:grid-cols-2'>
          <Link
            href='/guides/is-my-business-ready-to-sell'
            className='group bg-muted px-8 py-9 transition-colors hover:bg-accent-pale'
          >
            <span className='flex items-center justify-between text-lg font-bold tracking-tight text-secondary'>
              Is my business ready to sell?
              <ArrowUpRight className='h-5 w-5 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
            </span>
            <span className='mt-2 block text-sm text-muted-foreground'>
              The ten things buyers check before making an offer.
            </span>
          </Link>
          <Link
            href='/selling-a'
            className='group bg-muted px-8 py-9 transition-colors hover:bg-accent-pale'
          >
            <span className='flex items-center justify-between text-lg font-bold tracking-tight text-secondary'>
              What businesses sell for
              <ArrowUpRight className='h-5 w-5 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
            </span>
            <span className='mt-2 block text-sm text-muted-foreground'>
              Multiples and price ranges across ten sectors.
            </span>
          </Link>
        </section>

        <LastUpdated />
      </div>
    </main>
  );
}
