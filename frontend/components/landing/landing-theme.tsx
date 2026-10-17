import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { landingFontVariables } from './fonts';

/** Opt-in typography and base surface for the redesigned landing experience. */
export function LandingTheme({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        landingFontVariables,
        'bg-white font-advisory-body text-base leading-[1.65] text-ink antialiased min-[681px]:text-[17px]',
        className,
      )}
      {...props}
    />
  );
}
