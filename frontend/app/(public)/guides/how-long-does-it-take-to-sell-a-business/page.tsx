import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  gatedMetadata,
} from '@/lib/seo';
import { guideBySlug } from '@/lib/data/guides';
import { EXIT_PHASES } from '@/lib/data/exit-phases';
import {
  CONTENT_UPDATED,
  INDUSTRY_BENCHMARKS,
  indexableIndustryPages,
} from '@/lib/data/industry-benchmarks';

import { GuideArticle, GuideActions, GuideFaqs, guideHeading, guideSubheading } from '../_components/article';

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

const PHASE_NOTES: Record<string, string> = {
  'Lay the foundation':
    'Work out where you stand and start separating yourself from the business. Structure and tax planning belong here too, because both are difficult to change once a sale is close.',
  'Clean up and systemise':
    'The unglamorous year. Financials get prepared properly, the lease gets secured, disputes and tax positions get resolved, and handshake arrangements become written contracts.',
  'Prepare for market':
    'Position rather than fix. Confirm a realistic price, begin the Information Memorandum, reduce any customer concentration, and tidy what a buyer will see first.',
  'Engage Blackmont Advisory and go to market':
    'Terms, structure and disclosure get settled, the data room is built, and you agree who knows what and when before anything goes live.',
  'Manage the sale process':
    'Enquiries, inspections, offers and due diligence. Speed of response matters more than owners expect: it is read as a signal about the business itself.',
};

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
    <div className='bg-white'>
      <JsonLd data={jsonLd} />
      <GuideArticle
        title={guide.h1}
        crumbs={CRUMBS}
        intro={"Most Australian businesses find a buyer within 60 to 240 days of listing, depending on the sector. That is the part owners ask about. The part that decides the outcome happens before it."}
        contents={[
          { id: 'industry-timing', label: 'Time by industry' },
          { id: 'preparation-timeline', label: 'Before you list' },
          { id: 'sale-delays', label: 'What causes delays' },
          { id: 'common-questions', label: 'Common questions' },
          { id: 'next-steps', label: 'Your next step' },
        ]}
      >
        <section id='industry-timing' aria-labelledby='industry-timing-title' className='scroll-mt-32'>
          <h2 id='industry-timing-title' className={guideHeading}>Time on the market, by industry</h2>
          <p className='mt-5 mb-0 max-w-[75ch] leading-[1.85] text-ink'>
            These are the ranges from listing to an accepted offer. They vary by
            a factor of four across sectors, and the difference is almost never
            buyer demand.
          </p>

          <div role='region' aria-label='Time to sell by industry' tabIndex={0} className='mt-8 overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt'>
            <table className='w-full min-w-[520px] border-collapse text-left'>
              <caption className='sr-only'>Typical time to sell and buyer demand by industry</caption>
              <thead>
                <tr className='border-y border-advisory-rule bg-canvas'>
                  <th scope='col' className='px-4 py-3 text-sm font-medium text-midnight'>Industry</th>
                  <th scope='col' className='px-4 py-3 text-sm font-medium text-midnight'>Time to sell</th>
                  <th scope='col' className='px-4 py-3 text-sm font-medium text-midnight'>Buyer demand</th>
                </tr>
              </thead>
              <tbody>
                {INDUSTRY_BENCHMARKS.map(({ name, days, demand }) => {
                  const slug = linkable.get(name);
                  return (
                    <tr key={name} className='border-b border-advisory-rule'>
                      <th scope='row' className='px-4 py-4 text-[15px] font-medium text-midnight'>
                        {slug ? (
                          <Link
                            href={`/selling-a/${slug}`}
                            className='underline decoration-advisory-rule underline-offset-4 transition-colors duration-200 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'
                          >
                            {name}
                          </Link>
                        ) : (
                          name
                        )}
                      </th>
                      <td className='px-4 py-4 text-[15px] text-ink'>{days}</td>
                      <td className='px-4 py-4 text-[15px] text-ink'>{demand}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className='mt-6 mb-0 max-w-[75ch] leading-[1.85] text-ink'>
            Trades move fastest because the buyer pool is deep and there is
            little to transfer beyond the work itself. Childcare and
            manufacturing sit at the other end, and in both cases the delay is
            process rather than demand: approvals that must be issued to the new
            operator, or due diligence that covers plant, contracts and the site
            as well as the accounts.
          </p>
        </section>

        <section id='preparation-timeline' aria-labelledby='preparation-timeline-title' className='mt-12 min-[681px]:mt-14 scroll-mt-32'>
          <h2 id='preparation-timeline-title' className={guideHeading}>The timeline before you list</h2>
          <p className='mt-5 mb-0 max-w-[75ch] leading-[1.85] text-ink'>
            Time on the market is the visible part. Owners who achieve the
            strongest outcomes start two years out, because the things that lift
            a price cannot be arranged quickly. This is the sequence we work
            through with sellers.
          </p>

          <ol className='mt-8 border-t border-advisory-rule'>
            {EXIT_PHASES.map((phase) => (
              <li key={phase.title} className='grid gap-2 border-b border-advisory-rule py-6 min-[681px]:grid-cols-[145px_minmax(0,1fr)] min-[681px]:gap-x-7'>
                <span className='pt-1 text-sm font-medium text-midnight min-[681px]:row-span-2'>
                  {phase.label}
                </span>
                <h3 className={guideSubheading}>
                  {phase.title}
                </h3>
                <p className='mt-2 mb-0 max-w-[75ch] leading-[1.85] text-ink'>
                  {PHASE_NOTES[phase.title]}
                </p>
              </li>
            ))}
          </ol>

          <p className='mt-8 mb-0 max-w-[75ch] leading-[1.85] text-ink'>
            Each phase has a working checklist behind it.{' '}
            <Link
              href='/exit/exit-planning'
              className='font-medium text-midnight underline underline-offset-4 transition-colors duration-200 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'
            >
              Open the exit planning guide
            </Link>{' '}
            to tick items off as you go.
          </p>
        </section>

        <section id='sale-delays' aria-labelledby='sale-delays-title' className='mt-12 min-[681px]:mt-14 scroll-mt-32'>
          <h2 id='sale-delays-title' className={guideHeading}>What actually causes delays</h2>
          <p className='mt-5 mb-0 max-w-[75ch] leading-[1.85] text-ink'>
            When a sale runs long, it is rarely because no buyer could be found.
            These are the five things that hold transactions up, in roughly the
            order we encounter them.
          </p>
          <dl className='mt-7 border-t border-advisory-rule'>
            {DELAYS.map(({ label, detail }) => (
              <div key={label} className='border-b border-advisory-rule py-5'>
                <dt className='font-semibold text-midnight'>{label}</dt>
                <dd className='mt-2 max-w-[75ch] leading-[1.85] text-ink'>
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <GuideFaqs items={FAQS} />
        <GuideActions
          items={[
            {
              href: '/guides/is-my-business-ready-to-sell',
              title: 'Is my business ready to sell?',
              detail: 'The ten things buyers check before making an offer.',
            },
            {
              href: '/selling-a',
              title: 'What businesses sell for',
              detail: 'Multiples and price ranges across ten sectors.',
            },
          ]}
        />
      </GuideArticle>
    </div>
  );
}
