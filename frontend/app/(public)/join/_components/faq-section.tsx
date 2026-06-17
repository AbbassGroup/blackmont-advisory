'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Title from '@/components/global/title';
import Image from 'next/image';

const faqs = [
  {
    q: 'Do I need to have previous Business Broking experience?',
    a: 'No. We will provide you with the toolkit provided to excel in your role however we look for franchise partners with a strong foundation in business operations including financial literacy and ideally experience in ownership and management.',
  },
  {
    q: 'What support & training is required?',
    a: 'A comprehensive training program is in place which will cover sales training, process training, systems training as well as financial analysis training. Additional ongoing support & training is also available.',
  },
  {
    q: 'Why ABBASS Business Brokers?',
    a: "Leverage from an interconnected international brand that's being recognised exponentially by Australians.",
  },
  {
    q: 'How does Business Broking compare to Real Estate?',
    a: 'A Real estate business has higher start up and ongoing fees and requires greater overheads to operate. Business Broking provides greater opportunity as there are currently only ~1,500 active business brokers in Australia compared to ~50,000 registered in real estate.',
  },
  {
    q: 'Do I need a licence?',
    a: "Yes, in most Australian states you need a real estate license or a business agent license to legally broker business sales. The exact requirement depends on your state or territory. We can assist you to obtain the correct license. If you don't have the required licence, a one off licence fee (typically $1,000) is required to the RTO.",
  },
  {
    q: 'How much can a Business Broker earn?',
    a: "Earnings vary. It's a commission-based industry, so income depends on effort, market activity, and deal size. ABBASS typically works on commissions between 5-8% of the business sale price, with some deals generating $10,000 to $100,000+ per transaction.",
  },
  {
    q: 'Do I need an office to operate out of?',
    a: 'No, you can operate from home or a shared space. We encourage lean models, especially in the early stages. What matters is professionalism, not fancy overheads.',
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
      className='border-b border-brand-primary/15 overflow-hidden'
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className='w-full flex items-center justify-between gap-4 py-5 text-left transition-colors duration-150 group'
      >
        <span
          className={`font-semibold text-[1.05rem] transition-colors ${open ? 'text-brand-black' : 'text-brand-black group-hover:text-brand-primary'}`}
        >
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-brand-primary' : 'text-gray-400'}`}
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
            <div className='pb-6 text-gray-500 leading-relaxed text-[1rem]'>
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
    <section className='py-20 lg:py-28 bg-linear-to-b from-[#F8FFFE] via-white to-[#F5FCFB]'>
      <div className='max-w-[1260px] mx-auto px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <Title>Frequently Asked Questions</Title>
          <div className='w-20 h-1.5 bg-linear-to-r from-brand-primary to-brand-primary-dark rounded-full mx-auto mt-4' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center text-left'>
          {/* Left FAQs */}
          <div className='md:col-span-7 flex flex-col'>
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>

          {/* Right SVG */}
          <div className='hidden md:block md:col-span-5'>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className='relative w-full max-w-[400px] mx-auto aspect-square'
            >
              <Image
                src='/businessbrokers/faq.svg'
                alt='Frequently Asked Questions'
                fill
                className='object-contain'
                unoptimized
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
