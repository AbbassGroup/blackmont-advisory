import { Minus, Plus } from 'lucide-react';
import { LandingContainer } from '@/components/landing/presentation';
import { BookDiscussionButton } from './book-discussion-button';

const faqs = [
  {
    q: 'Do you take over the client relationship?',
    a: 'No. We operate in collaboration and respect your advisory role at all times.',
  },
  {
    q: 'Do you provide valuations?',
    a: 'We are not licenced valuers but we provide market-based appraisals aligned with current buyer demand.',
  },
  {
    q: 'How are fees handled?',
    a: 'Fees are transparent and agreed directly with the client. Referral arrangements can be structured compliantly where appropriate.',
  },
  {
    q: 'Will I be kept informed?',
    a: 'Yes. Communication is structured and consistent throughout the process.',
  },
  {
    q: 'Where are you licenced?',
    a: 'We are licenced to sell business in Victoria, New South Wales, Queensland, South Australia and Tasmania.',
  },
];

function FAQItem({ faq }: { faq: (typeof faqs)[0] }) {
  return (
    <details className='group border-t border-advisory-rule'>
      <summary className='flex min-h-16 cursor-pointer list-none items-start justify-between gap-5 py-5 text-midnight transition-colors duration-200 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt motion-reduce:transition-none min-[681px]:py-6 [&::-webkit-details-marker]:hidden'>
        <span className='font-advisory-heading text-[21px] leading-[1.45] font-bold tracking-normal min-[681px]:text-[24px]'>
          {faq.q}
        </span>
        <Plus aria-hidden='true' className='mt-1 size-5 shrink-0 text-gilt group-open:hidden' />
        <Minus aria-hidden='true' className='mt-1 hidden size-5 shrink-0 text-gilt group-open:block' />
      </summary>
      <p className='m-0 max-w-[960px] pr-10 pb-6 text-base leading-[1.8] min-[681px]:pb-7 min-[681px]:text-[17px]'>
        {faq.a}
      </p>
    </details>
  );
}

export function FAQSection() {
  return (
    <section
      aria-labelledby='partnership-faq-title'
      className='bg-white py-14 text-ink min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='partnership-faq-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          Frequent questions
        </h2>
        <div className='mt-8 border-b border-advisory-rule min-[681px]:mt-10'>
          {faqs.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </div>
        <div className='mt-7 flex justify-start min-[681px]:mt-8'>
          <BookDiscussionButton />
        </div>
      </LandingContainer>
    </section>
  );
}
