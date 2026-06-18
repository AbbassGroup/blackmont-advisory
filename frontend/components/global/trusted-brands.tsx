'use client';

import Image from 'next/image';

const logos = [
  {
    src: '/car/Donut-King.webp',
    alt: 'Donut King',
    href: 'https://www.donutking.com.au/',
  },
  {
    src: '/car/Degani-Logo.webp',
    alt: 'Degani',
    href: 'https://degani.com.au/',
  },
  {
    src: '/car/NDIS.webp',
    alt: 'NDIS',
    href: 'https://www.ndis.gov.au/',
  },
  {
    src: '/car/Sumo-Salad.webp',
    alt: 'Sumo Salad',
    href: 'https://sumosalad.com/',
  },
  {
    src: '/car/Rolld.webp',
    alt: "Roll'd",
    href: 'https://rolld.com.au/',
  },
  {
    src: '/car/Big-Als.webp',
    alt: "Big Al's Pizza",
    href: 'https://www.bigalpizza.com.au/',
  },
  {
    src: '/car/Gami-Chicken.webp',
    alt: 'Gami Chicken',
    href: 'https://www.gamichicken.com.au/',
  },
  {
    src: '/car/Cheesecake-Shop.webp',
    alt: 'Cheesecake Shop',
    href: 'https://www.cheesecake.com.au/',
  },
  {
    src: '/car/Burgertory.webp',
    alt: 'Burgertory',
    href: 'https://www.burgertory.com.au/',
  },
];

// Duplicate for seamless loop
const allLogos = [...logos, ...logos];

export function TrustedBrands() {
  return (
    <section className='py-16 bg-brand-offwhite border-t border-gray-100'>
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8 mb-10'>
        <p className='text-center text-brand-black/50 text-sm font-semibold uppercase tracking-widest'>
          Trusted By Leading Brands
        </p>
      </div>

      {/* Infinite Marquee */}
      <div className='relative overflow-hidden'>
        {/* Fade edges */}
        <div className='absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-brand-offwhite to-transparent pointer-events-none' />
        <div className='absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-brand-offwhite to-transparent pointer-events-none' />

        <div
          className='flex gap-8 items-center animate-marquee hover:paused pb-4'
          style={{ width: 'max-content' }}
        >
          {allLogos.map((logo, i) => (
            <a
              key={i}
              href={logo.href}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center w-[140px] h-[80px] bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow shrink-0'
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={60}
                className='object-contain max-h-[50px] w-auto grayscale hover:grayscale-0 transition-all duration-300'
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
