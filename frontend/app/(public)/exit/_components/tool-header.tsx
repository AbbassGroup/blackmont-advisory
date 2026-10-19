import { Breadcrumbs, type Crumb } from '@/components/seo/breadcrumbs';
import { SHELL } from '@/lib/seo-layout';
import type { ReactNode } from 'react';
import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingContainer } from '@/components/landing/presentation';
import { cn } from '@/lib/utils';

interface ToolHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  crumbs: Crumb[];
  appearance?: 'legacy' | 'advisory';
  layout?: 'split' | 'stacked' | 'wide';
  children?: ReactNode;
}

export function ToolHeader({
  eyebrow,
  title,
  subtitle,
  crumbs,
  appearance = 'legacy',
  layout = 'split',
  children,
}: ToolHeaderProps) {
  if (appearance === 'advisory') {
    return (
      <LandingTheme className='bg-canvas'>
        <section aria-labelledby='tool-page-title' className='border-b border-advisory-rule py-10 min-[681px]:py-12 min-[1121px]:py-16'>
          <LandingContainer className={layout === 'stacked' ? 'max-w-[880px] has-[[data-tool-results]]:max-w-advisory' : undefined}>
            <Breadcrumbs items={crumbs} tone='light' />
            <div className={cn('mt-8 grid items-start gap-8 min-[681px]:gap-10 min-[1121px]:gap-16', layout === 'split' && 'min-[931px]:grid-cols-[0.85fr_1.15fr] min-[931px]:has-[[data-tool-results]]:grid-cols-1')}>
              <div className={cn('min-w-0', layout === 'split' && 'min-[931px]:pt-4')}>
                <h1 id='tool-page-title' className={cn('m-0 mb-6 font-advisory-heading text-[clamp(32px,6.5vw,40px)] leading-[1.2] font-bold tracking-normal text-midnight min-[1121px]:text-[44px]', layout !== 'split' && 'mb-4')}>
                  {title}
                </h1>
                <p className={cn('m-0 text-base leading-[1.75] text-ink min-[1121px]:text-[17px]', layout !== 'split' ? 'max-w-[760px]' : 'max-w-[560px]')}>
                  {subtitle}
                </p>
              </div>
              {children}
            </div>
          </LandingContainer>
        </section>
      </LandingTheme>
    );
  }

  return (
    <section className='relative overflow-hidden border-b border-accent/15 bg-secondary pb-14 pt-28 lg:pb-16 lg:pt-32'>
      <span
        aria-hidden
        className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent'
      />

      <div className={`relative z-10 ${SHELL}`}>
        <Breadcrumbs items={crumbs} />

        {eyebrow && (
          <span className='mt-7 block text-xs font-bold uppercase tracking-[0.2em] text-accent'>
            {eyebrow}
          </span>
        )}
        <h1
          className={`text-3xl font-bold leading-[1.1] tracking-tight text-parchment md:text-4xl lg:text-5xl ${
            eyebrow ? 'mt-3' : 'mt-6'
          }`}
        >
          {title}
        </h1>
        <p className='mt-5 max-w-2xl text-lg font-light leading-relaxed text-parchment/60'>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
