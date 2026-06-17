'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Title from '@/components/global/title';

const faqs = [
  {
    q: 'Do I need to prepare anything?',
    a: "No preparation is required. We'll lead the conversation and take notes.",
  },
  {
    q: 'Will you ask for financials during the meeting?',
    a: 'No. This meeting is about your business operations. Following the meeting, we will request this information after the meeting via our RFI.',
  },
  {
    q: 'Is this meeting confidential?',
    a: 'Yes. Everything discussed is treated with the strictest confidentiality. We do not share any details without your explicit consent.',
  },
  {
    q: 'What does the appraisal cost?',
    a: 'Our appraisal is complimentary following your submission of the RFI.',
  },
  {
    q: 'Can I bring someone with me?',
    a: "Yes, you're welcome to have a business partner, co-director, or accountant attend.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className='border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm'
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className='w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-150'
      >
        <span className='font-semibold text-brand-black text-[1.02rem]'>
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-brand-primary shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className='overflow-hidden'
          >
            <div className='px-6 pb-5 text-gray-500 leading-relaxed text-sm border-t border-gray-100 pt-4'>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section className='py-20 bg-brand-offwhite'>
      <div className='max-w-[1400px] mx-auto px-6'>
        <div className='text-center mb-16'>
          <Title>Frequently Asked Questions</Title>
          <div className='w-20 h-1.5 bg-gradient-to-r from-brand-primary to-brand-primary-dark rounded-full mx-auto mt-4 mb-6' />
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Here are some common questions we're asked before and during the
            initial consultation.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
          {/* Left image */}
          <div className='lg:col-span-5'>
            <div className='relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.08)]'>
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: 'url("/faq-bg.webp")' }}
              />
            </div>
          </div>

          {/* Right FAQs */}
          <div className='lg:col-span-7 flex flex-col gap-4'>
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
