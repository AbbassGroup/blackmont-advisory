'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GetStarted } from './get-started';
import { Suspense } from 'react';

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
      <section className='relative overflow-hidden bg-brand-black py-14 lg:py-16'>
        <div className='pointer-events-none absolute left-1/2 top-1/2 h-72 w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/15 blur-[140px]' />

        <div className='relative z-10 mx-auto max-w-3xl px-6 text-center'>
          <h3 className='text-2xl font-semibold tracking-tight text-white md:text-3xl'>
            {title}
          </h3>
          <p className='mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/65'>
            {subtitle}
          </p>
          <GetStarted className='mt-7 inline-block'>
            <Button className='group inline-flex items-center gap-2 rounded-full bg-brand-primary px-7 py-5 text-sm font-semibold text-white shadow-md shadow-black/10 transition-all hover:-translate-y-0.5 hover:bg-brand-primary-dark'>
              Schedule a Confidential Call
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
            </Button>
          </GetStarted>
        </div>
      </section>
    </Suspense>
  );
}
