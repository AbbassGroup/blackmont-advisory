import { LandingTheme } from '@/components/landing/landing-theme';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  LandingButtonLink,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';

export interface ToolNotesProps {
  heading: string;
  paragraphs: string[];
  limits: { heading: string; body: string };
  related: { href: string; label: string; detail: string };
  /**
   * 'inline' (default): the related link closes the main text.
   * 'aside': it moves under the limits box as a button, and both columns
   * stretch to the same height.
   */
  relatedPlacement?: 'inline' | 'aside';
}

export function ToolNotes({
  heading,
  paragraphs,
  limits,
  related,
  relatedPlacement = 'inline',
}: ToolNotesProps) {
  const aside = relatedPlacement === 'aside';
  return (
    <LandingTheme>
      <section aria-labelledby='tool-notes-title' className='py-10 min-[681px]:py-12 min-[1121px]:py-16'>
        <LandingContainer className={cn('grid min-[931px]:grid-cols-[1.3fr_0.8fr] gap-8 min-[681px]:gap-10 min-[1121px]:gap-16', aside ? 'items-stretch' : 'items-start')}>
          <div className='min-w-0'>
            <h2 id='tool-notes-title' className='m-0 mb-6 font-advisory-heading text-[28px] leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:text-[34px]'>
              {heading}
            </h2>
            {paragraphs.map((para) => <p key={para} className='m-0 mb-5 max-w-[740px] text-[15px] leading-[1.8] text-ink last:mb-0 min-[681px]:text-base'>{para}</p>)}
            {!aside && (
              <p className='m-0 max-w-[740px] text-[15px] leading-[1.8] text-ink min-[681px]:text-base'>
                {related.detail}{' '}
                <LandingTextLink href={related.href} className='font-normal'>{related.label}</LandingTextLink>.
              </p>
            )}
          </div>
          <div className={cn('min-w-0', aside && 'flex flex-col gap-3')}>
            <aside aria-labelledby='tool-limits-title' className={cn('min-w-0 bg-canvas', aside ? 'flex-1 p-5 min-[681px]:p-6' : 'p-6 min-[681px]:p-8')}>
              <h3 id='tool-limits-title' className={cn('m-0 font-advisory-heading', aside ? 'mb-3' : 'mb-4', ' text-[23px] leading-[1.35] font-bold tracking-normal text-midnight')}>{limits.heading}</h3>
              <p className='m-0 text-[15px] leading-[1.8] text-ink'>{limits.body}</p>
            </aside>
            {aside && (
              <div className='border-t-[3px] border-gilt bg-midnight p-5 text-white min-[681px]:p-6'>
                <p className='m-0 mb-4 text-[15px] leading-[1.7] text-white/85'>
                  {related.detail.replace(/,?\s*see$/i, '.')}
                </p>
                <LandingButtonLink href={related.href} variant='gilt' size='compact' className='group'>
                  <span className='first-letter:uppercase'>{related.label}</span>
                  <ArrowRight size={16} aria-hidden='true' className='transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none' />
                </LandingButtonLink>
              </div>
            )}
          </div>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
