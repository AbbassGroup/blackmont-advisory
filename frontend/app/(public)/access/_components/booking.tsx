'use client';

import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { GetStarted } from './get-started';
import { Button } from '@/components/ui/button';

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
        className='scroll-mt-24 bg-brand-primary py-16 lg:py-24'
      >
        <div className='max-w-[1260px] mx-auto px-6 lg:px-8'>
          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20'>
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <div className='mb-5'>
                <span className='text-xs font-semibold uppercase tracking-[0.22em] text-white/80'>
                  Confidential
                </span>
              </div>
              <h2 className='text-[1.9rem] font-semibold leading-[1.12] tracking-tight text-white md:text-4xl lg:text-[2.6rem]'>
                Want Personalised Advice?
              </h2>
              <p className='mt-5 max-w-md text-lg leading-relaxed text-white/85'>
                Speak confidentially with our team about business value, buyer
                demand, timing, and exit strategies.
              </p>
              <GetStarted selectedTime={selected ?? undefined}>
                <Button className='group mt-9 inline-flex items-center gap-2 rounded-full bg-white hover:bg-white/90 px-7 py-5.5 text-base font-semibold text-brand-primary shadow-md shadow-black/10 transition-all hover:-translate-y-0.5'>
                  Schedule a Confidential Call
                  <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                </Button>
              </GetStarted>
            </motion.div>

            {/* Right — booking card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='rounded-xl bg-white p-7  lg:p-8'
            >
              <div className='flex items-center justify-between gap-4 border-b border-gray-100 pb-5'>
                <div className='flex flex-col'>
                  <h3 className='text-lg font-semibold text-brand-black'>
                    Select a time
                  </h3>
                  <span className='text-xs text-gray-400'>
                    A 30-minute strategy call
                  </span>
                </div>
                <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10'>
                  <CalendarDays className='h-5 w-5 text-brand-primary' />
                </span>
              </div>

              <div className='mt-6 grid grid-cols-2 gap-3'>
                {slots.map((slot) => {
                  const active = selected === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelected(slot)}
                      className={`rounded-xl border px-4 py-3.5 text-sm font-medium transition-colors ${
                        active
                          ? 'border-brand-primary bg-brand-primary text-white'
                          : 'border-gray-200 bg-white text-brand-black hover:border-brand-primary hover:bg-brand-primary/5'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}
