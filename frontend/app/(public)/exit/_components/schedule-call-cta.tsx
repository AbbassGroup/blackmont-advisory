'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GetStarted } from './get-started';
import { Suspense } from 'react';
import { Container, Reveal } from '@/components/landing/primitives';

interface ScheduleCallCtaProps {
  title?: string;
  subtitle?: string;
}

export function ScheduleCallCta({
  title = 'Ready to discuss your exit?',
  subtitle = 'Speak confidentially with our senior advisory team about your business value, timing, and options. No obligation.',
}: ScheduleCallCtaProps) {
  return (
    <Suspense>
      <section className='bg-background py-20 lg:py-28'>
        <Container>
          <Reveal className='relative border-[1.5px] border-secondary bg-secondary px-6 py-16 text-center sm:px-10 lg:py-20'>
            <span
              aria-hidden
              className='absolute inset-x-10 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
            />
            <h2 className='mx-auto max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-parchment sm:text-4xl lg:text-5xl'>
              {title}
            </h2>
            <p className='mx-auto mt-5 max-w-xl text-lg font-light leading-relaxed text-parchment/60'>
              {subtitle}
            </p>
            <GetStarted className='mt-9 inline-block'>
              <Button className='group inline-flex h-auto items-center gap-2 rounded-none bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light'>
                Schedule a Confidential Call
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
              </Button>
            </GetStarted>
          </Reveal>
        </Container>
      </section>
    </Suspense>
  );
}
