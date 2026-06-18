'use client';
import { ArrowRight, Lock, MapPin, Gem } from 'lucide-react';
import { Suspense } from 'react';
import { GetStarted } from './get-started';
import { PageBanner } from '@/components/global/page-banner';

const trust = [
  { label: 'Confidential', icon: Lock },
  { label: 'SME Business Sales', icon: MapPin },
  { label: 'Boutique Advisory', icon: Gem },
];

export function SellHero() {
  return (
    <Suspense>
      <PageBanner
        title={
          <>
            Thinking About{' '}
            <span className='font-light text-accent'>Selling</span>
            <br />
            Your Business?
          </>
        }
        image='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80'
      >
        <div className='mt-9 flex flex-col gap-4 sm:flex-row sm:items-center'>
          <a
            href='#resources'
            className='group inline-flex items-center justify-center gap-2 bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light'
          >
            Access Free Resources
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
          </a>
          <GetStarted consultationTrigger>
            <button className='inline-flex cursor-pointer items-center justify-center border border-secondary/25 px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-secondary transition-colors hover:border-accent hover:text-accent'>
              Book Confidential Strategy Call
            </button>
          </GetStarted>
        </div>

        <div className='mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted-foreground'>
          {trust.map(({ label, icon: Icon }) => (
            <span key={label} className='flex items-center gap-2'>
              <Icon className='h-4 w-4 text-accent' />
              {label}
            </span>
          ))}
        </div>
      </PageBanner>
    </Suspense>
  );
}
