import Image from 'next/image';
import blackmontLogo from '@/public/assets/blackmont-light.png';
import { LandingLink } from './landing-link';
import { cn } from '@/lib/utils';

export function LandingBrand({
  className,
  placement = 'header',
}: {
  className?: string;
  placement?: 'header' | 'footer';
}) {
  return (
    <LandingLink
      href='#top'
      aria-label='Blackmont Advisory, back to top'
      className={cn(
        'inline-flex max-w-full shrink-0 items-center no-underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt',
        className,
      )}
    >
      <Image
        src={blackmontLogo}
        alt='Blackmont Advisory'
        unoptimized
        loading={placement === 'header' ? 'eager' : 'lazy'}
        className={cn(
          'block h-auto max-w-full object-contain',
          placement === 'footer'
            ? 'w-[300px]'
            : 'w-[220px] min-[426px]:w-[260px] min-[681px]:w-[280px] min-[1280px]:w-[240px] min-[1444px]:w-[300px]',
        )}
      />
    </LandingLink>
  );
}
