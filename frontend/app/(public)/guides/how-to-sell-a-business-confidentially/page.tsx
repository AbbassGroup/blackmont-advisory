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
import { CONTENT_UPDATED } from '@/lib/data/industry-benchmarks';

const guide = guideBySlug('how-to-sell-a-business-confidentially')!;

const LEAKS = [
  {
    label: 'You tell one person',
    detail:
      'Almost every leak we see starts here, and usually with someone trusted: a long-serving manager, a supplier you are close to, a friend in the same industry. The information is rarely misused deliberately. It simply travels, and once it does you cannot pull it back.',
  },
  {
    label: 'The buyer is a competitor',
    detail:
      'Some enquiries come from people who have no intention of buying and every intention of learning what you charge, who you supply and how you operate. This is the risk owners worry about most, and it is the one a proper process is built to handle.',
  },
  {
    label: 'Your own behaviour changes',
    detail:
      'Deferring a hire, cancelling a planned upgrade, taking calls with the door shut, an unfamiliar visitor walking the floor mid-week. Staff notice patterns before they hear anything, and they draw conclusions that are often worse than the truth.',
  },
  {
    label: 'Inspections during trading hours',
    detail:
      'A buyer walking through while the team is working is one of the most common ways a sale becomes visible. It is avoidable with scheduling, and it is a reason to agree how and when inspections happen before anyone is booked in.',
  },
  {
    label: 'Advisers who have not been briefed',
    detail:
      'Your accountant, solicitor and bank all need to know at some stage, but each additional person is an additional point of exposure. They should be told deliberately, at the point they need to act, rather than early as a courtesy.',
  },
];

const CONTROLS = [
  {
    label: 'An anonymised profile',
    detail:
      'Your business is marketed without its name, address or anything else that identifies it. A buyer sees the sector, the region, the scale and the shape of the opportunity, which is enough for a serious party to decide whether to look further and not enough for anyone to work out who you are.',
  },
  {
    label: 'A confidentiality agreement before anything identifying',
    detail:
      'No identifying detail is released until the enquirer has signed. That is the point at which an anonymous enquiry becomes a named person with a binding obligation attached to it.',
  },
  {
    label: 'Enquiries approved individually',
    detail:
      'A signed agreement does not by itself grant access. Every enquiry comes to us for a decision, and we can decline. Where an enquirer looks like a competitor or cannot demonstrate they are in a position to transact, they do not receive your information at all.',
  },
  {
    label: 'Information released to one buyer at a time',
    detail:
      'The Information Memorandum is issued individually rather than distributed. Access expires automatically after thirty days and can be withdrawn at any point before that, so information does not sit indefinitely with someone who has gone quiet.',
  },
  {
    label: 'Access that is logged',
    detail:
      'We can see who opened your Information Memorandum and when. That tells us who is genuinely engaged, and it means that if something does surface, there is a record of who held the information rather than guesswork.',
  },
];

const FAQS = [
  {
    q: 'Will my staff find out that I am selling?',
    a: 'Not from the process itself if it is run properly. The business is marketed anonymously, buyers sign before receiving anything identifying, and inspections are scheduled outside trading hours. Most leaks come from conversations rather than from marketing.',
  },
  {
    q: 'What if a competitor enquires?',
    a: 'It happens, and it is the reason enquiries are approved individually rather than automatically. An enquirer who looks like a competitor or who cannot show they are in a position to buy does not receive your information. Being able to decline is the point of the process.',
  },
  {
    q: 'When should I tell my team?',
    a: 'Usually once a buyer is under contract and the major conditions are close to satisfied, so that what you tell them is settled rather than speculative. Key people who the buyer will want retained are often told slightly earlier, deliberately and individually.',
  },
  {
    q: 'Can information be taken back once I have shared it?',
    a: 'Access can be, and is. Information Memorandum access expires automatically after thirty days and can be withdrawn sooner. The confidentiality agreement continues to bind the recipient regardless, but withdrawing access limits what they can keep referring to.',
  },
  {
    q: 'Do I have to tell my customers and suppliers?',
    a: 'Generally not until settlement or handover. The exception is where key contracts require consent to a change of ownership, in which case the timing is set by the contract rather than by you, and it should be identified early rather than discovered late.',
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

export default function ConfidentialityGuidePage() {
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
            Most owners who are thinking about selling have told nobody. The fear
            is reasonable: staff resign, customers hedge, competitors circle. A
            confidential sale is not a promise of discretion, it is a set of
            controls, and they are worth understanding before you speak to
            anyone.
          </p>
        </div>
      </section>

      <div className={`${SHELL} py-16 lg:py-20`}>
        <section>
          <h2 className={H2}>What a leak actually costs</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            The damage is rarely dramatic and almost always expensive. Good staff
            start looking, because uncertainty about ownership reads as
            uncertainty about their job. Customers on renewal quietly take
            another meeting. Suppliers become slightly less flexible on terms.
            Competitors use it in pitches.
          </p>
          <p className='mt-4 leading-relaxed text-muted-foreground'>
            None of that stops a sale, but all of it shows up in the numbers a
            buyer is examining, and it shows up at exactly the moment you need
            those numbers to look their best. That is the real reason
            confidentiality matters. It is not secrecy for its own sake, it is
            protecting the value of the thing you are selling while you sell it.
          </p>
        </section>

        <section className='mt-14'>
          <h2 className={H2}>What actually leaks</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            In our experience it is almost never the marketing. It is one of
            these five.
          </p>
          <dl className='mt-8 space-y-6'>
            {LEAKS.map(({ label, detail }) => (
              <div key={label}>
                <dt className='font-semibold text-secondary'>{label}</dt>
                <dd className='mt-1.5 leading-relaxed text-muted-foreground'>
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className='mt-14'>
          <h2 className={H2}>How a confidential sale is controlled</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            Confidentiality is a sequence of gates, each one releasing a little
            more information to a slightly smaller group of people. This is how
            we run it.
          </p>
          <ol className='mt-8 space-y-8'>
            {CONTROLS.map(({ label, detail }, i) => (
              <li key={label} className='flex gap-5'>
                <span className='shrink-0 text-2xl font-bold leading-none text-accent/25'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className='block font-semibold text-secondary'>
                    {label}
                  </span>
                  <span className='mt-1.5 block leading-relaxed text-muted-foreground'>
                    {detail}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className='mt-14'>
          <h2 className={H2}>When to tell your team</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            The instinct to tell people early, out of loyalty, is understandable
            and usually a mistake. Telling staff about a possibility means asking
            them to carry uncertainty for months with nothing they can act on. In
            most sales the right moment is once a buyer is under contract and the
            major conditions are close to satisfied, so what you say is settled
            rather than speculative.
          </p>
          <p className='mt-4 leading-relaxed text-muted-foreground'>
            The exception is the small number of people the buyer will want to
            retain. Their intentions affect the deal, so buyers frequently make
            retention a condition, and those conversations have to happen before
            settlement. They are handled individually and deliberately, usually
            with something concrete to offer rather than an open question.
          </p>
          <p className='mt-4 leading-relaxed text-muted-foreground'>
            Customers and suppliers generally come last, at settlement or
            handover. Where a key contract requires consent to a change of
            ownership, the timing is dictated by that contract rather than by
            you, which is a good reason to identify those clauses early rather
            than discover them in due diligence.
          </p>
        </section>

        <section className='mt-14'>
          <h2 className={H2}>If word does get out</h2>
          <p className='mt-5 leading-relaxed text-muted-foreground'>
            Address it directly and quickly. A rumour left to run does more
            damage than a plain statement that you are exploring options and that
            nothing is decided. What staff react badly to is not the prospect of
            a sale so much as being the last to hear about it, and evasion
            confirms the worst version of the story.
          </p>
        </section>

        <FaqSection items={FAQS} />

        <section className='mt-16 grid gap-px border-[1.5px] border-secondary/10 bg-secondary/10 sm:grid-cols-2'>
          <Link
            href='/#contact'
            className='group bg-muted px-8 py-9 transition-colors hover:bg-accent-pale'
          >
            <span className='flex items-center justify-between text-lg font-bold tracking-tight text-secondary'>
              Start a confidential conversation
              <ArrowUpRight className='h-5 w-5 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
            </span>
            <span className='mt-2 block text-sm text-muted-foreground'>
              Nothing is disclosed and nothing is committed. An NDA applies from
              the first conversation.
            </span>
          </Link>
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
        </section>

        <LastUpdated />
      </div>
    </main>
  );
}
