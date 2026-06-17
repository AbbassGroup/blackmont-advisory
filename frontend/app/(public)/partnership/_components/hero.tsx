'use client';

import { ScrollIndicator } from '@/components/global/scroll-indicator';

export function PartnershipHero() {
  return (
    <div className='relative flex min-h-[500px] items-center justify-center overflow-hidden pt-[80px] text-center lg:min-h-[580px]'>
      {/* Background image */}
      <div className='absolute inset-0 bg-[url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80")] bg-cover bg-center' />
      {/* Navy gradient overlays for depth + legibility */}
      <div className='absolute inset-0 bg-linear-to-br from-[#0f1722]/75 via-[#1c2434]/80 to-[#1c2434]/60 opacity-55' />
      <div className='absolute inset-0 bg-linear-to-t from-[#0f1722] via-transparent to-transparent opacity-55' />
      {/* Teal glow (radial gradient — far cheaper than a blur filter) */}
      <div className='pointer-events-none absolute -top-40 right-[-12%] h-[600px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(86,193,188,0.18)_0%,transparent_70%)]' />

      <div className='relative z-10 mx-auto max-w-[900px] px-6'>
        <h1 className='mb-6 text-4xl font-extrabold tracking-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl'>
          Partnering with <span className='text-brand-primary'>ABBASS</span>
        </h1>
      </div>

      <ScrollIndicator />
    </div>
  );
}
