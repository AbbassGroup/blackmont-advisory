'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, MapPin, Gem } from 'lucide-react';
import { GetStarted } from './get-started';
import { Suspense } from 'react';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

const trust = [
  { label: 'Confidential', icon: Lock },
  { label: 'SME Business Sales', icon: MapPin },
  { label: 'Boutique Advisory', icon: Gem },
];

export function SellHero() {
  return (
    <Suspense>
      <section className='relative flex min-h-screen items-center overflow-hidden bg-[#0c1218] pt-20'>
        {/* Background image */}
        <div
          className='absolute inset-0 bg-cover bg-position-[30%_30%] sm:bg-position-[center_25%]'
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80)`,
          }}
        />
        {/* Overlays for legibility */}
        <div className='absolute inset-0' />
        <div className='absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80' />
        <div className='pointer-events-none absolute left-1/2 -top-30 h-120 w-190 -translate-x-1/2 rounded-full bg-brand-primary/15 blur-[130px]' />

        <div className='relative z-10 mx-auto w-full max-w-315 px-6 py-20 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='mx-auto max-w-4xl text-center'
          >
            <h1 className='mx-auto font-semibold tracking-tight text-white leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)]'>
              Thinking About{' '}
              <span className='bg-linear-to-r from-brand-primary to-[#8fe3df] bg-clip-text text-transparent'>
                Selling
              </span>{' '}
              Your Business?
            </h1>

            <div className='mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <a
                href='#resources'
                className='group inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-primary-dark'
              >
                Access Free Resources
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
              </a>
              <GetStarted consultationTrigger>
                <button className='cursor-pointer inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-colors hover:border-white/50 hover:bg-white/10'>
                  Book Confidential Strategy Call
                </button>
              </GetStarted>
            </div>

            <div className='mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/70'>
              {trust.map(({ label, icon: Icon }) => (
                <span key={label} className='flex items-center gap-2'>
                  <Icon className='h-4 w-4 text-brand-primary' />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <ScrollIndicator />
      </section>
    </Suspense>
  );
}
