import { ArrowRight, ChevronDown } from 'lucide-react';
import { LandingTextLink } from '@/components/landing/presentation';
import { SectionShell } from './section-shell';

export type Faq = {
  q: string;
  a: string;
  /** Optional next step under the answer: one of our tools, guides or a section. */
  link?: { href: string; label: string };
};

/** Native <details>: no JavaScript, and every answer stays in the HTML for crawlers. */
export function FaqSection({
  faqs,
  heading,
  intro,
  id = 'faqs',
  tone = 'canvas',
}: {
  faqs: Faq[];
  heading: string;
  intro?: string;
  id?: string;
  tone?: 'white' | 'canvas';
}) {
  return (
    <SectionShell id={id} tone={tone} heading={heading} intro={intro}>
      <div className='border-b border-advisory-rule'>
        {faqs.map(({ q, a, link }, i) => (
          <details key={q} open={i === 0} className='group border-t border-advisory-rule'>
            <summary className='flex cursor-pointer list-none items-start justify-between gap-6 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt [&::-webkit-details-marker]:hidden'>
              <h3 className='m-0 font-advisory-heading text-lg leading-[1.4] font-bold tracking-normal text-midnight min-[681px]:text-xl'>
                {q}
              </h3>
              <ChevronDown
                size={20}
                aria-hidden='true'
                className='mt-1 shrink-0 text-gilt transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none'
              />
            </summary>
            <div className='pb-6'>
              <p className='m-0 text-[15px] leading-[1.75] text-ink min-[681px]:text-base'>
                {a}
              </p>
              {link && (
                <LandingTextLink
                  href={link.href}
                  className='mt-3 inline-flex min-h-11 items-center gap-2'
                >
                  {link.label}
                  <ArrowRight size={16} aria-hidden='true' className='text-gilt' />
                </LandingTextLink>
              )}
            </div>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
