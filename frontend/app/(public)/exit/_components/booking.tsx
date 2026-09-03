'use client';

import { Suspense, useState } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { GetStarted } from './get-started';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/landing/primitives';

const slots = [
  'Tue 9:30 AM',
  'Wed 11:00 AM',
  'Wed 2:30 PM',
  'Thu 10:00 AM',
  'Fri 1:00 PM',
  'Fri 4:00 PM',
];

export function Booking() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Suspense>
      <section
        id='booking'
        className='scroll-mt-24 bg-secondary py-20 lg:py-28'
      >
        <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16'>
          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20'>
            {/* Left */}
            <Reveal>
              <div className='mb-5'>
                <span className='text-xs font-bold uppercase tracking-[0.22em] text-accent'>
                  Confidential
                </span>
              </div>
              <h2 className='text-[1.9rem] font-bold leading-[1.12] tracking-tight text-parchment md:text-4xl lg:text-[2.6rem]'>
                Want Personalised Advice?
              </h2>
              <p className='mt-5 max-w-md text-lg leading-relaxed text-parchment/70'>
                Speak confidentially with our team about business value, buyer
                demand, timing, and exit strategies.
              </p>
              <GetStarted selectedTime={selected ?? undefined}>
                <Button className='group mt-9 inline-flex h-auto items-center gap-2 rounded-none bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light'>
                  Schedule a Confidential Call
                  <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                </Button>
              </GetStarted>
            </Reveal>

            {/* Right — booking card */}
            <Reveal
              delay={120}
              className='border border-accent/20 bg-background p-7 lg:p-8'
            >
              <div className='flex items-center justify-between gap-4 border-b border-secondary/10 pb-5'>
                <div className='flex flex-col'>
                  <h3 className='text-lg font-bold text-secondary'>
                    Select a time
                  </h3>
                  <span className='text-xs text-muted-foreground'>
                    A 30-minute strategy call
                  </span>
                </div>
                <span className='flex h-10 w-10 items-center justify-center border-[1.5px] border-accent/30'>
                  <CalendarDays className='h-5 w-5 text-accent' />
                </span>
              </div>

              <div className='mt-6 grid grid-cols-2 gap-3'>
                {slots.map((slot) => {
                  const active = selected === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelected(slot)}
                      className={`border px-4 py-3.5 text-sm font-medium transition-colors ${
                        active
                          ? 'border-accent bg-accent text-primary'
                          : 'border-secondary/15 bg-background text-secondary hover:border-accent hover:bg-accent-pale'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Suspense>
  );
}
