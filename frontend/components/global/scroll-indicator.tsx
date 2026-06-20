'use client';

import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  /** Extra classes for fine-tuning position/colour per hero. */
  className?: string;
}

/**
 * Animated "scroll down" cue for hero banners.
 * A bouncing double-chevron pinned to the bottom-centre of the nearest
 * positioned ancestor (the hero). The bounce is a CSS animation (composited,
 * no per-frame JS). Clicking smoothly scrolls past the hero.
 */
export function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // offsetParent of an absolutely-positioned element is the nearest
    // positioned ancestor — i.e. the `relative` hero wrapper.
    const hero = e.currentTarget.offsetParent as HTMLElement | null;
    const top = hero
      ? hero.getBoundingClientRect().bottom + window.scrollY
      : window.innerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      aria-label='Scroll down'
      className={`group absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center ${className}`}
    >
      <span className='animate-scroll-cue flex flex-col items-center -space-y-3.5'>
        <ChevronDown className='h-7 w-7 text-white/80 drop-shadow-md transition-colors group-hover:text-accent' />
        <ChevronDown className='h-7 w-7 text-white/40 drop-shadow-md transition-colors group-hover:text-accent/70' />
      </span>
    </button>
  );
}
