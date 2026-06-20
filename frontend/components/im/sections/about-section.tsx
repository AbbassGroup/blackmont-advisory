'use client';

import { Check } from 'lucide-react';
import { SectionHeading } from '../section-chrome';

const SERVICES = [
  'Business Sales',
  'Business Appraisals',
  'Vendor Advisory',
  'Exit Strategy',
  'Business Consulting',
  'Buyer Advisory',
];

export function AboutSection({
  title,
  editable,
  onChange,
}: {
  title: string;
  editable?: boolean;
  onChange?: (patch: { title: string }) => void;
}) {
  return (
    <div className='relative'>
      {/* Faint logo watermark on the right — signals the "About" section */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src='/assets/logo.png'
        alt=''
        aria-hidden
        className='pointer-events-none absolute left-1/2 top-1/2 w-60 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] sm:w-80'
      />
      <div className='relative z-10'>
        <SectionHeading
          title={title}
          editable={editable}
          onChange={(v) => onChange?.({ title: v })}
          placeholder='About Blackmont Advisory'
        />

        <p className='max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground'>
          At Blackmont Advisory, we specialise in facilitating the seamless sale
          and acquisition of businesses across Australia. With deep market
          knowledge and a personalised approach, we guide business owners and
          aspiring business owners through every step of the process, ensuring
          that transactions are smooth, efficient, and successful. Whether
          you&apos;re looking to sell your business or invest in a new
          opportunity, our team is dedicated to helping you achieve your goals
          with confidence and ease.
        </p>

        <p className='mt-7 font-semibold text-secondary'>
          We help business owners with:
        </p>
        <div className='mt-4 grid gap-3 sm:grid-cols-2'>
          {SERVICES.map((s) => (
            <div
              key={s}
              className='flex items-center gap-3 border border-border bg-card px-4 py-3'
            >
              <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent'>
                <Check className='h-3.5 w-3.5' />
              </span>
              <span className='text-sm font-medium text-secondary'>{s}</span>
            </div>
          ))}
        </div>

        {/* Thick brand line — from here on it's the business information */}
        <div className='mt-12 h-1.5 w-full rounded-full bg-accent' />
      </div>
    </div>
  );
}
