'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/* Centered content container — consistent gutters across every section. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* Gilt eyebrow label with a leading rule. */
export function Eyebrow({
  children,
  withRule = false,
  className,
}: {
  children: React.ReactNode;
  withRule?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3.5 text-sm font-bold uppercase tracking-[0.1em] text-accent',
        className,
      )}
    >
      {withRule && <span className='h-0.5 w-8 bg-accent' aria-hidden />}
      {children}
    </p>
  );
}

/* Section intro: eyebrow + heading on the left, supporting lead on the right.
   Collapses to a single column on small screens. */
export function SectionHeader({
  eyebrow,
  heading,

  className,
}: {
  eyebrow: string;
  heading: React.ReactNode;

  className?: string;
}) {
  return (
    <Reveal className={cn('mb-14', className)}>
      <Eyebrow className='mb-5'>{eyebrow}</Eyebrow>

      <h2 className='text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
        {heading}
      </h2>
    </Reveal>
  );
}

/* Reveal-on-scroll wrapper. Falls back to visible without JS / reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
