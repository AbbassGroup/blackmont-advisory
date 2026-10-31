import { Minus, Plus } from 'lucide-react';
import type { BlogFaq } from '@/lib/blogs';

/**
 * The article's answer-first summary. Sits above the body so readers — and the
 * AI answer engines that quote pages — get the conclusions before the detail.
 */
export function BlogKeyTakeaways({ items }: { items: string[] }) {
  return (
    <section aria-labelledby='key-takeaways-title' className='mb-10 border-l-2 border-gilt bg-canvas p-5 min-[681px]:p-6'>
      <h2 id='key-takeaways-title' className='m-0 mb-4 font-advisory-heading text-[20px] leading-[1.4] font-bold tracking-normal text-midnight'>
        Key takeaways
      </h2>
      <ul className='m-0 list-outside list-disc space-y-2 pl-5 leading-[1.75] text-ink marker:text-gilt'>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

/**
 * The article's FAQ, matching the guides' "Common questions" pattern. Answers
 * stay in the HTML while collapsed, so search engines still read them — and
 * they must, since the same pairs are published as FAQPage structured data.
 */
export function BlogFaqs({ items }: { items: BlogFaq[] }) {
  return (
    <section aria-labelledby='blog-faqs-title' className='mt-12 border-t border-secondary/10 pt-10'>
      <h2 id='blog-faqs-title' className='m-0 font-advisory-heading text-[25px] leading-[1.4] font-bold tracking-normal text-midnight md:text-[28px]'>
        Frequently asked questions
      </h2>
      <div className='mt-6 border-b border-advisory-rule'>
        {items.map(({ question, answer }) => (
          <details key={question} className='group border-t border-advisory-rule'>
            <summary className='flex min-h-16 cursor-pointer list-none items-start justify-between gap-5 py-5 text-midnight transition-colors duration-200 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none [&::-webkit-details-marker]:hidden'>
              <h3 className='m-0 font-advisory-heading text-[18px] leading-[1.5] font-bold min-[681px]:text-[20px]'>{question}</h3>
              <Plus aria-hidden='true' className='mt-1 size-5 shrink-0 text-gilt group-open:hidden' />
              <Minus aria-hidden='true' className='mt-1 hidden size-5 shrink-0 text-gilt group-open:block' />
            </summary>
            <p className='m-0 max-w-[75ch] pr-8 pb-6 leading-[1.85] whitespace-pre-line text-ink'>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
