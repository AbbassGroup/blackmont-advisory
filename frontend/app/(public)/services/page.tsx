'use client';

import { motion } from 'framer-motion';
import { ReviewsCarousel } from '@/components/global/reviews-carousel';
import { ServicesGrid } from './_components/services-grid';
import { ProcessSteps } from './_components/process-steps';
import { FAQSection } from './_components/faq-section';
import { CTASection } from './_components/cta-section';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

export default function ServicesPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className='relative pt-[80px] min-h-[500px] lg:min-h-[580px] flex items-center justify-center overflow-hidden'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url('/businessbrokers/services.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className='absolute inset-0 bg-black/45' />
        <div className='relative z-10 text-center px-4 max-w-3xl mx-auto'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight'
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow'
          >
            Comprehensive business brokerage services tailored to your needs.
          </motion.p>
        </div>

        <ScrollIndicator />
      </section>

      <ServicesGrid />
      <ProcessSteps />
      <ReviewsCarousel className='py-24' />
      <FAQSection />
      <CTASection />
    </main>
  );
}
