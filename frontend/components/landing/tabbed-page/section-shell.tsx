import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LandingContainer } from '@/components/landing/presentation';

/**
 * One tab's section. `scroll-mt` clears the sticky tab bar on top of the
 * header offset the page already applies via scroll-padding.
 *
 * Header is stacked: a full-width title (kept short so it fits one line on
 * desktop) with a smaller intro line underneath, rather than the shared
 * side-by-side LandingSectionIntro.
 */
export function SectionShell({
  id,
  heading,
  intro,
  tone = 'white',
  children,
}: {
  id: string;
  heading: ReactNode;
  intro?: ReactNode;
  tone?: 'white' | 'canvas';
  children: ReactNode;
}) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        'lp-section',
        tone === 'canvas' ? 'bg-canvas' : 'bg-white',
      )}
    >
      <LandingContainer>
        <div className='mb-8 min-[681px]:mb-10'>
          <h2
            data-landing-reveal
            id={headingId}
            className='lp-section-title'
          >
            {heading}
          </h2>
          {intro && (
            <p className='m-0 mt-3 max-w-[720px] text-[15px] leading-[1.7] text-ink'>
              {intro}
            </p>
          )}
        </div>
        {children}
      </LandingContainer>
    </section>
  );
}

export const cardTitle =
  'lp-card-title';
export const bodyText = 'lp-body';
