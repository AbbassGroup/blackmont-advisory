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
        'scroll-mt-[56px] pt-9 pb-12 min-[681px]:pt-10 min-[681px]:pb-14 min-[1121px]:pt-12 min-[1121px]:pb-16',
        tone === 'canvas' ? 'bg-canvas' : 'bg-white',
      )}
    >
      <LandingContainer>
        <div className='mb-8 min-[681px]:mb-10'>
          <h2
            data-landing-reveal
            id={headingId}
            className='m-0 font-advisory-heading text-[clamp(26px,5.6vw,32px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(28px,3vw,38px)]'
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
  'm-0 mb-2 font-advisory-heading text-xl leading-[1.35] font-bold tracking-normal text-midnight';
export const bodyText = 'm-0 text-[15px] leading-[1.7] text-ink min-[681px]:text-base';
