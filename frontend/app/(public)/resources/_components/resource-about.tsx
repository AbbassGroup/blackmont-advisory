import type { ReactNode } from 'react';
import { LandingContainer } from '@/components/landing/presentation';

/**
 * A block of reading copy under a Resources tab, so the page is more than a
 * grid of cards (audits flag card-only pages for low text-to-HTML ratio).
 * Styling lives on one wrapper; children are plain <p>/<a> with no classes.
 */
export function ResourceAbout({
  id,
  heading,
  className = 'bg-white py-14 min-[681px]:py-16 min-[1121px]:py-20',
  children,
}: {
  id: string;
  heading: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={`text-ink ${className}`}>
      <LandingContainer>
        <div className='max-w-[820px] text-base leading-[1.8] min-[681px]:text-[17px] [&_h2]:m-0 [&_h2]:font-advisory-heading [&_h2]:text-[clamp(26px,5.6vw,32px)] [&_h2]:leading-[1.25] [&_h2]:font-bold [&_h2]:text-midnight [&_p]:mt-4 [&_p]:mb-0 [&_a]:text-midnight [&_a]:underline [&_a]:decoration-gilt [&_a]:underline-offset-4'>
          <h2 id={id}>{heading}</h2>
          {children}
        </div>
      </LandingContainer>
    </section>
  );
}
