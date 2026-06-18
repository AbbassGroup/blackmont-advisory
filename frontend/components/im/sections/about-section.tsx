'use client';

import { Check, Facebook, Instagram, Linkedin, Globe } from 'lucide-react';
import { SectionHeading } from '../section-chrome';

const SERVICES = [
  'Business Sales',
  'Business Appraisals',
  'Vendor Advisory',
  'Exit Strategy',
  'Business Consulting',
  'Buyer Advisory',
];

const SOCIALS = [
  {
    icon: Globe,
    href: 'https://abbass.com.au/businessbrokers',
    label: 'Website',
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/abbassbusinessbrokers',
    label: 'Instagram',
  },
  {
    icon: Facebook,
    href: 'https://facebook.com/abbassbusinessbrokers',
    label: 'Facebook',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/abbassbusinessbrokers/',
    label: 'LinkedIn',
  },
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
        src='/businessbrokers/mark.webp'
        alt=''
        aria-hidden
        className='pointer-events-none absolute left-1/2 top-1/2 w-60 -translate-x-1/2 -translate-y-1/2 opacity-[0.12] sm:w-80'
      />
      <div className='relative z-10'>
        <SectionHeading
          title={title}
          editable={editable}
          onChange={(v) => onChange?.({ title: v })}
          placeholder='About ABBASS'
        />

        <p className='max-w-3xl text-[0.95rem] leading-relaxed text-gray-500'>
          At Blackmont Advisory, we specialise in facilitating the seamless sale
          and acquisition of businesses across Australia. With deep market
          knowledge and a personalised approach, we guide business owners and
          aspiring business owners through every step of the process, ensuring
          that transactions are smooth, efficient, and successful. Whether
          you&apos;re looking to sell your business or invest in a new
          opportunity, our team is dedicated to helping you achieve your goals
          with confidence and ease.
        </p>

        <p className='mt-7 font-semibold text-brand-black'>
          We help business owners with:
        </p>
        <div className='mt-4 grid gap-3 sm:grid-cols-2'>
          {SERVICES.map((s) => (
            <div
              key={s}
              className='flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3'
            >
              <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary'>
                <Check className='h-3.5 w-3.5' />
              </span>
              <span className='text-sm font-medium text-brand-black'>{s}</span>
            </div>
          ))}
        </div>

        <div className='mt-8 flex items-center gap-3'>
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              title={label}
              className='flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white transition-colors hover:bg-brand-primary/85'
            >
              <Icon className='h-4 w-4' />
            </a>
          ))}
        </div>

        {/* Thick brand line — from here on it's the business information */}
        <div className='mt-12 h-1.5 w-full rounded-full bg-brand-primary' />
      </div>
    </div>
  );
}
