'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

export function JoinHero() {
  return (
    <section className='relative pt-[80px] bg-[#1c2434] text-white min-h-[600px] flex items-center overflow-hidden'>
      {/* Background Effect matching Franchise Hero */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(86,193,188,0.15)_0%,transparent_70%)] pointer-events-none' />

      <div className='max-w-[1260px] mx-auto px-6 lg:px-8 py-16 relative z-10 w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className='max-w-2xl text-center lg:text-left mx-auto lg:mx-0'
          >
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.15] drop-shadow-md tracking-tight'>
              Welcome To The World Of <br />
              <span className='text-brand-primary'>Blackmont Advisory</span>
            </h1>

            <h2 className='text-xl md:text-2xl font-bold text-gray-300 mb-6'>
              Join Our Elite Network of Experts
            </h2>

            <p className='text-lg text-white/80 leading-relaxed font-medium mb-10 max-w-[600px] mx-auto lg:mx-0'>
              Take your career to the next level as an Blackmont Advisory.
              Unlock unparalleled opportunities to grow your wealth, expand your
              professional network, and empower entrepreneurs in making their
              most critical business decisions. Enjoy the freedom to work on
              your terms while building a truly rewarding and impactful career.
            </p>

            <div className='pl-5 border-l-4 border-brand-primary inline-flex flex-col items-start'>
              <p className='font-bold text-lg text-white'>Sadeq Abbass</p>
              <p className='text-brand-primary font-medium text-left'>
                Managing Director | ABBASS Group
              </p>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative max-w-[420px] w-full mx-auto lg:mx-0 lg:ml-auto'
          >
            <div className='relative rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(86,193,188,0.2)] aspect-3/4'>
              <Image
                src='/businessbrokers/IMG_3392.webp'
                alt='Sadeq Abbass'
                fill
                className='object-cover object-center'
                priority
              />
              <div className='absolute inset-0 bg-linear-to-t from-[#1c2434]/80 via-transparent to-transparent' />
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
