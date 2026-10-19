import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingContainer, LandingTextLink } from '@/components/landing/presentation';

export interface ToolNotesProps {
  heading: string;
  paragraphs: string[];
  limits: { heading: string; body: string };
  related: { href: string; label: string; detail: string };
}

export function ToolNotes({
  heading,
  paragraphs,
  limits,
  related,
}: ToolNotesProps) {
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
