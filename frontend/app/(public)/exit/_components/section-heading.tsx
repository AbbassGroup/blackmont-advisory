'use client';

import { Reveal } from '@/components/landing/primitives';

interface SectionHeadingProps {
  label: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  align = 'left',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const center = align === 'center';

  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} ${className}`}>
      <h2
        className={`text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
          light ? 'text-parchment' : 'text-secondary'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-lg font-light leading-relaxed ${
            center ? 'mx-auto' : ''
          } ${light ? 'text-parchment/60' : 'text-muted-foreground'}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
