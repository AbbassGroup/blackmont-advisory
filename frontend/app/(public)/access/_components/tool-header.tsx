'use client';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
}

export function ToolHeader({ eyebrow, title, subtitle }: ToolHeaderProps) {
  return (
    <section className='relative overflow-hidden border-b border-accent/15 bg-secondary pb-14 pt-28 lg:pb-16 lg:pt-32'>
      <span
        aria-hidden
        className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent'
      />

      <div className='relative z-10 mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-16'>
        <Button
          onClick={() => window.history.back()}
          className='group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-parchment/60 transition-colors hover:text-accent'
        >
          <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
          Back to resources
        </Button>

        {eyebrow && (
          <span className='mt-7 block text-xs font-bold uppercase tracking-[0.2em] text-accent'>
            {eyebrow}
          </span>
        )}
        <h1
          className={`text-3xl font-bold leading-[1.1] tracking-tight text-parchment md:text-4xl lg:text-5xl ${
            eyebrow ? 'mt-3' : 'mt-7'
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
