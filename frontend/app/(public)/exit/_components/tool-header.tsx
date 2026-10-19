import { Breadcrumbs, type Crumb } from '@/components/seo/breadcrumbs';
import type { ReactNode } from 'react';
import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingContainer } from '@/components/landing/presentation';
import { cn } from '@/lib/utils';

interface ToolHeaderProps {
  title: string;
  subtitle: string;
  crumbs: Crumb[];
  layout?: 'split' | 'stacked' | 'wide';
  children?: ReactNode;
}

export function ToolHeader({
  title,
  subtitle,
  crumbs,
  layout = 'split',
  children,
}: ToolHeaderProps) {
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
