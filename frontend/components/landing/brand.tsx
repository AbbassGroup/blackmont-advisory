import { LandingLink } from './landing-link';
import { cn } from '@/lib/utils';

export function LandingBrand({ className }: { className?: string }) {
  return (
    <LandingLink
      href='#top'
      aria-label='Blackmont Advisory, back to top'
      className={cn(
        'inline-flex shrink-0 items-center gap-2.5 text-white no-underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt min-[681px]:gap-[13px]',
        className,
      )}
    >
      <span
        aria-hidden='true'
        className='grid size-[38px] shrink-0 place-items-center border border-gilt font-advisory-heading text-sm font-normal text-gilt min-[681px]:size-[42px] min-[681px]:text-[17px]'
      >
        BA
      </span>
      <span className='font-advisory-heading text-base leading-[1.25] font-bold whitespace-nowrap min-[681px]:text-lg min-[1121px]:text-xl'>
        Blackmont Advisory
      </span>
    </LandingLink>
  );
}
