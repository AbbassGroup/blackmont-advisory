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
import { SHELL, H2 } from '@/lib/seo-layout';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { FaqSection } from '@/components/seo/faq-section';
import { LastUpdated } from '@/components/seo/last-updated';
import { guideBySlug } from '@/lib/data/guides';
import { READINESS_QUESTIONS } from '@/lib/data/readiness';
import { CONTENT_UPDATED } from '@/lib/data/industry-benchmarks';

const guide = guideBySlug('is-my-business-ready-to-sell')!;

const COMMENTARY: Record<string, string> = {
  'Financial records':
    'Buyers and their financiers work from the numbers, not from what you tell them. Informal or cash-based records do not simply reduce the price, they end deals, because a bank will not lend against figures an accountant has never signed. This is the one item that can stop a sale outright regardless of how well the business trades.',
  'Revenue trend':
    'Direction over three years matters more to a buyer than the level. Growth supports your asking price; a decline does not prevent a sale but it moves the conversation onto why, and buyers price whatever answer you give. A flat business with a clear explanation is easier to sell than a growing one nobody can account for.',
  'Owner dependency':
    'Across every sector we cover, this is the single largest determinant of the multiple. If the quoting, the key relationships and the decisions all run through you, a buyer is purchasing a job rather than a business, and they price it accordingly. It is also the slowest thing to fix, which is why it needs the longest lead time.',
  'Documented processes':
    'Documentation is how you prove the work can be done to the same standard by someone else. It also shortens the handover, which buyers value because it reduces the period they are dependent on you after settlement. Basic written notes are worth far more than nothing at all.',
  'Customer concentration':
    'One client at more than 40% of revenue is treated as a serious risk, because losing them after settlement changes the economics of the whole purchase. Under 20% is where you want to be. Where concentration is unavoidable, long-term contracts with that client are the next best thing.',
  'Lease security':
    'For retail, hospitality and anything else tied to a location, this decides whether the business sells at all. A lease with under twelve months remaining and no option is the most common reason a profitable business fails to find a buyer, because the buyer cannot recover their investment inside the term they are certain of.',
  'Staff stability':
    'Buyers will ask your team directly during due diligence, and in most sectors they make key people staying a condition of the deal. Where the technical capability or the client relationships sit with one or two individuals, their intentions matter as much as your financials.',
  'Profitability':
    'A business can carry strong revenue and almost no margin, and buyers price on earnings rather than turnover. Consistency counts too: steady profits across three years are worth more than the same total delivered by one exceptional year and two poor ones.',
  'Legal & compliance':
    'Unresolved disputes, outstanding tax debts and licensing problems all surface during due diligence, and they surface at the worst possible moment, when the buyer is already committed and looking for leverage. Anything you know about is better dealt with before you go to market.',
  'Reason for selling':
    'Buyers ask this early and they read the answer closely. Selling from a position of strength attracts better offers than selling under pressure, and it is the one item on this list you cannot improve by working on the business. It is a reason to start planning your exit before you need one.',
};

const FAQS = [
  {
    q: 'How long does it take to fix a low score?',
    a: 'Six to twelve months of focused work is typical, and most of that time goes on the two slowest items: getting three years of clean financials prepared, and genuinely reducing how much the business depends on you.',
  },
  {
    q: 'Should I wait until everything is perfect?',
    a: 'No. There are diminishing returns, and market conditions and your own circumstances matter too. The goal is to fix the two or three weakest areas rather than to score full marks on all ten.',
  },
  {
    q: 'Which of these matters most?',
    a: 'Financial records and owner dependency, in that order. Weak financials can stop a sale entirely. Heavy owner dependency rarely stops one but it reduces the multiple more than anything else on the list.',
  },
  {
    q: 'Can I sell a business that scores poorly?',
    a: 'Usually yes, at a price. It changes who buys it, from someone acquiring a stable asset to someone acquiring a turnaround, and those buyers price for the work they are taking on.',
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

export default function ReadinessGuidePage() {
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
            Buyers assess the same ten things in almost every transaction. Below
            is each one, the question a buyer is really asking, and the
            difference between an answer that costs you money and one that
            supports your price.
          </p>
        </div>
      </section>

      <div className={`${SHELL} py-16 lg:py-20`}>
        <section>
          <h2 className={H2}>The ten things buyers check</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            Nothing here is a surprise to a buyer. They will work through all ten
            during due diligence whether or not you have looked at them first.
            The advantage of going through them yourself is that you get to fix
            the weak ones before anybody is negotiating against them.
          </p>

          <div className='mt-10 space-y-10'>
            {READINESS_QUESTIONS.map(({ cat, text, opts }) => {
              const scored = opts.filter((o) => !o.na);
              const weakest = scored.reduce((a, b) => (a.pts <= b.pts ? a : b));
              const strongest = scored.reduce((a, b) => (a.pts >= b.pts ? a : b));

              return (
                <div key={cat}>
                  <h3 className='text-lg font-bold tracking-tight text-secondary'>
                    {cat}
                  </h3>
                  <p className='mt-2 text-sm font-medium text-secondary/70'>
                    {text}
                  </p>
                  <p className='mt-4 leading-relaxed text-muted-foreground'>
                    {COMMENTARY[cat]}
                  </p>

                  <dl className='mt-5 grid gap-px border-[1.5px] border-secondary/10 bg-secondary/10 sm:grid-cols-2'>
                    <div className='bg-muted px-5 py-4'>
                      <dt className='text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted-foreground'>
                        Costs you money
                      </dt>
                      <dd className='mt-1.5 text-sm leading-relaxed text-secondary'>
                        {weakest.label}
                      </dd>
                    </div>
                    <div className='bg-muted px-5 py-4'>
                      <dt className='text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent'>
                        Supports your price
                      </dt>
                      <dd className='mt-1.5 text-sm leading-relaxed text-secondary'>
                        {strongest.label}
                      </dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>
        </section>

        <section className='mt-14'>
          <h2 className={H2}>Where owners most often lose value</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            Of the ten, two account for most of the gap between what owners
            expect and what they achieve. The first is financial records, because
            weak books do not reduce a price so much as remove the buyers who
            need finance to complete. The second is owner dependency, because it
            is the one thing a buyer cannot fix by working harder than you did.
          </p>
          <p className='mt-4 leading-relaxed text-muted-foreground'>
            Both take months rather than weeks to improve, which is the argument
            for looking at this list well before you intend to sell. The items
            that can be fixed quickly, presentation and tidying up paperwork,
            are also the ones that move the price least.
          </p>
        </section>

        <FaqSection items={FAQS} />

        <section className='mt-16 grid gap-px border-[1.5px] border-secondary/10 bg-secondary/10 sm:grid-cols-2'>
          <Link
            href='/access/readiness'
            className='group bg-muted px-8 py-9 transition-colors hover:bg-accent-pale'
          >
            <span className='flex items-center justify-between text-lg font-bold tracking-tight text-secondary'>
              Score your business
              <ArrowUpRight className='h-5 w-5 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
            </span>
            <span className='mt-2 block text-sm text-muted-foreground'>
              Answer the ten questions and get a readiness score with next steps.
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
              Multiples, price ranges and time to sell across ten sectors.
            </span>
          </Link>
        </section>

        <LastUpdated />
      </div>
    </main>
  );
}
