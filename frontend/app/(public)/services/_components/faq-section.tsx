'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Title from '@/components/global/title';

const faqs = [
  {
    question: 'What businesses do you sell?',
    answer:
      'We sell a variety of businesses in the SME space spanning across hospitality, retail, manufacturing, transport and service based businesses.',
  },
  {
    question: 'What are your services?',
    answer:
      'We specialise in selling small businesses but offer other services including business advisory, exit strategy development, business appraisals and marketing advice.',
  },
  {
    question: 'Why ABBASS Business Brokers?',
    answer:
      'We are a boutique Business Broking agency focused on providing exceptional customer service to a limited number of businesses at a time. We pride ourselves on being there for the client and going above and beyond to find the right buyer for your business.',
  },
  {
    question: 'What are your fees?',
    answer:
      'We run a success only business model. Our fees range depending on the level of service provided, which will be outlined in our initial consultation. We offer a no sale no fee guarantee.',
  },
  {
    question: 'Where are you located?',
    answer:
      'Our office is based in South Melbourne, Victoria and we operate across Victoria, Tasmania and Queensland.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Reach out to us via email (info@abbass.group) or phone (03 9103 1317) to get started with an initial consultation.',
  },
  {
    question: 'How long does it typically take to sell a business?',
    answer:
      'The timeline varies depending on factors such as business size, industry, and market conditions. On average, it takes 6-9 months to complete a business sale.',
  },
  {
    question: 'How do you determine the value of my business?',
    answer:
      'We use multiple valuation methods including asset-based valuation, market comparison, and earnings multipliers. We also consider industry-specific factors and market conditions.',
  },
  {
    question: 'What makes your business brokerage service different?',
    answer:
      'We offer a comprehensive approach combining market expertise, confidential marketing, and personalised service. Our team has extensive experience across various industries.',
  },
  {
    question: 'How do you maintain confidentiality during the sale process?',
    answer:
      'We implement strict confidentiality protocols, including NDAs for potential buyers, anonymous listings, and controlled information disclosure.',
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
          {faq.question}
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
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section className='bg-brand-offwhite py-24'>
      <div className='max-w-[860px] mx-auto px-4 lg:px-8'>
        <div className='text-center mb-16'>
          <span className='inline-block text-brand-primary font-semibold text-xs uppercase tracking-widest mb-3'>
            Got Questions?
          </span>
          <Title>Frequently Asked Questions</Title>
          <div className='w-16 h-1 bg-brand-primary rounded-full mx-auto' />
        </div>

        <div className='flex flex-col gap-3'>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
