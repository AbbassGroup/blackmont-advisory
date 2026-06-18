'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className='bg-[#1c2434] py-20'>
      <div className='max-w-[700px] mx-auto px-6 text-center'>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-3xl md:text-4xl font-bold text-white mb-4'
        >
          Ready to Get Started?
        </motion.h2>
        <p className='text-white/70 text-lg mb-10'>
          Contact us today for a confidential consultation about buying or
          selling a business.
        </p>
        <Button
          asChild
          className='bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-brand-primary/30 font-semibold'
        >
          <Link href='/contact'>Book a Free Consultation</Link>
        </Button>
      </div>
    </section>
  );
}
