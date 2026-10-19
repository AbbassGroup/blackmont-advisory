'use client';

import { Suspense, useState } from 'react';
import { GetStarted } from './get-started';
import { LandingTheme } from '@/components/landing/landing-theme';
import {
  LandingButton,
  LandingContainer,
  landingButtonVariants,
} from '@/components/landing/presentation';
import { cn } from '@/lib/utils';

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
    <LandingTheme className='bg-midnight text-white'>
      <section
        id='booking'
        aria-labelledby='exit-booking-title'
        className='py-14 min-[681px]:py-16 min-[1121px]:py-20'
      >
        <LandingContainer className='grid items-center min-[931px]:grid-cols-[1fr_0.94fr] gap-8 min-[681px]:gap-10 min-[1121px]:gap-16'>
            <div className='min-w-0'>
              <h2
                id='exit-booking-title'
                className='m-0 mb-4 max-w-[500px] font-advisory-heading text-[32px] leading-[1.25] font-bold tracking-normal text-white min-[681px]:text-[clamp(34px,3.5vw,43px)]'
              >
                Want personalised advice?
              </h2>
              <p className='m-0 max-w-[490px] text-base leading-[1.75] text-white/90 min-[1121px]:text-[17px]'>
                Speak confidentially with our team about business value, buyer
                demand, timing, and exit strategies.
              </p>
            </div>

            <div className='min-w-0 bg-canvas text-ink p-6 min-[681px]:p-8'>
              <div className='border-b border-advisory-rule pb-4'>
                  <h3 id='booking-time-title' className='m-0 mb-2 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>
                    Select a preferred time
                  </h3>
                  <p className='m-0 text-sm leading-[1.65]'>
                    A 30-minute strategy call
                  </p>
              </div>

              <div role='group' aria-labelledby='booking-time-title' className='mt-4 grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2'>
                {slots.map((slot) => {
                  const active = selected === slot;
                  return (
                    <button
                      key={slot}
                      type='button'
                      aria-pressed={active}
                      onClick={() => setSelected(slot)}
                      className={cn(
                        'min-h-11 cursor-pointer border px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-midnight motion-reduce:transition-none',
                        active
                          ? 'border-midnight bg-midnight text-white'
                          : 'border-advisory-input bg-transparent text-midnight hover:border-midnight hover:bg-white',
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              <p aria-live='polite' className='m-0 mt-3 min-h-[23px] text-[13px] leading-[1.65]'>
                {selected ? `Preferred time: ${selected}` : 'You can also enquire without choosing a time.'}
              </p>
              <Suspense fallback={<LandingButton disabled className='mt-4 w-full'>Schedule a confidential call</LandingButton>}>
                <GetStarted
                  selectedTime={selected ?? undefined}
                  className={cn(landingButtonVariants(), 'mt-4 w-full')}
                >
                  Schedule a confidential call
                </GetStarted>
              </Suspense>
            </div>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
