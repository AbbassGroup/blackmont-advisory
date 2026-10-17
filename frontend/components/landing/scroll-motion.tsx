'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const REVEAL_CLASS = 'motion-safe:animate-advisory-reveal';

/** Enhance visible server-rendered content without hiding it before hydration. */
export function LandingScrollMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;

    const targets = root.querySelectorAll<HTMLElement>('h2[data-landing-reveal]');
    const played = new Set<Element>();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | null = null;

    const observe = () => {
      observer?.disconnect();
      if (reducedMotion.matches) {
        targets.forEach((target) => target.classList.remove(REVEAL_CLASS));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting || reducedMotion.matches) continue;
            const target = entry.target;
            observer?.unobserve(target);
            if (played.has(target)) continue;
            played.add(target);
            if (!target.contains(document.activeElement)) {
              target.classList.add(REVEAL_CLASS);
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
      );

      targets.forEach((target) => {
        if (!played.has(target)) observer?.observe(target);
      });
    };

    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest('[data-landing-reveal]');
      if (!target || !root.contains(target)) return;
      played.add(target);
      observer?.unobserve(target);
      target.classList.remove(REVEAL_CLASS);
    };

    observe();
    reducedMotion.addEventListener('change', observe);
    root.addEventListener('focusin', onFocus);
    return () => {
      observer?.disconnect();
      reducedMotion.removeEventListener('change', observe);
      root.removeEventListener('focusin', onFocus);
      targets.forEach((target) => target.classList.remove(REVEAL_CLASS));
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
