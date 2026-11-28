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
            <summary className='lp-faq-summary'>
              <h3 className='lp-faq-q'>
                {q}
              </h3>
              <ChevronDown
                size={20}
                aria-hidden='true'
                className='lp-faq-chevron'
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
