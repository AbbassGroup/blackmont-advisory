import Link from 'next/link';
import { H2, SHELL } from '@/lib/seo-layout';
import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingContainer, LandingTextLink } from '@/components/landing/presentation';

export interface ToolNotesProps {
  heading: string;
  paragraphs: string[];
  limits: { heading: string; body: string };
  related: { href: string; label: string; detail: string };
  appearance?: 'legacy' | 'advisory';
}

export function ToolNotes({
  heading,
  paragraphs,
  limits,
  related,
  appearance = 'legacy',
}: ToolNotesProps) {
  if (appearance === 'advisory') {
    return (
      <LandingTheme>
        <section aria-labelledby='tool-notes-title' className='py-10 min-[681px]:py-12 min-[1121px]:py-16'>
          <LandingContainer className='grid items-start min-[931px]:grid-cols-[1.3fr_0.8fr] gap-8 min-[681px]:gap-10 min-[1121px]:gap-16'>
            <div className='min-w-0'>
              <h2 id='tool-notes-title' className='m-0 mb-6 font-advisory-heading text-[28px] leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:text-[34px]'>
                {heading}
              </h2>
              {paragraphs.map((para) => <p key={para} className='m-0 mb-5 max-w-[740px] text-[15px] leading-[1.8] text-ink min-[681px]:text-base'>{para}</p>)}
              <p className='m-0 max-w-[740px] text-[15px] leading-[1.8] text-ink min-[681px]:text-base'>
                {related.detail}{' '}
                <LandingTextLink href={related.href} className='font-normal'>{related.label}</LandingTextLink>.
              </p>
            </div>
            <aside aria-labelledby='tool-limits-title' className='min-w-0 bg-canvas p-6 min-[681px]:p-8'>
              <h3 id='tool-limits-title' className='m-0 mb-4 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>{limits.heading}</h3>
              <p className='m-0 text-[15px] leading-[1.8] text-ink'>{limits.body}</p>
            </aside>
          </LandingContainer>
        </section>
      </LandingTheme>
    );
  }

  return (
    <section className='border-t border-secondary/10 bg-background py-14 lg:py-16'>
      <div className={SHELL}>
        <h2 className={H2}>{heading}</h2>
        {paragraphs.map((para) => (
          <p
            key={para}
            className='mt-5 max-w-3xl leading-relaxed text-muted-foreground'
          >
            {para}
          </p>
        ))}

        <h3 className='mt-10 text-lg font-bold tracking-tight text-secondary'>
          {limits.heading}
        </h3>
        <p className='mt-3 max-w-3xl leading-relaxed text-muted-foreground'>
          {limits.body}
        </p>

        <p className='mt-8 max-w-3xl leading-relaxed text-muted-foreground'>
          {related.detail}{' '}
          <Link
            href={related.href}
            className='text-accent underline underline-offset-4 transition-opacity hover:opacity-75'
          >
            {related.label}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
