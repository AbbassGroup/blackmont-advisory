'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from './section-heading';
import Image from 'next/image';
import { BookDiscussionButton } from './book-discussion-button';

const faqs = [
  {
    q: 'Do you take over the client relationship?',
    a: 'No. We operate in collaboration and respect your advisory role at all times.',
  },
  {
    q: 'Do you provide valuations?',
    a: 'We are not licenced valuers but we provide market-based appraisals aligned with current buyer demand.',
  },
  {
    q: 'How are fees handled?',
    a: 'Fees are transparent and agreed directly with the client. Referral arrangements can be structured compliantly where appropriate.',
  },
  {
    q: 'Will I be kept informed?',
    a: 'Yes. Communication is structured and consistent throughout the process.',
  },
  {
    q: 'Where are you licenced?',
    a: 'We are licenced to sell business in Victoria, New South Wales, Queensland, South Australia and Tasmania.',
  },
];

function FAQItem({ faq }: { faq: (typeof faqs)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className='border-b border-accent/15 overflow-hidden'>
      <button
        onClick={() => setOpen((p) => !p)}
        className='w-full flex items-center justify-between gap-4 py-5 text-left transition-colors duration-150 group'
      >
        <span
          className={`font-semibold text-[1.05rem] transition-colors ${open ? 'text-secondary' : 'text-secondary group-hover:text-accent'}`}
        >
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-accent' : 'text-muted-foreground'}`}
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
            <div className='pb-6 text-muted-foreground leading-relaxed text-[1rem]'>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className='py-20 lg:py-28 bg-background'>
      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16'>
        <SectionHeading title='Frequent Questions' className='mb-16' />

        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center text-left'>
          {/* Left FAQs */}
          <div className='md:col-span-7 flex flex-col'>
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>

          {/* Right SVG */}
          <div className='hidden md:block md:col-span-5'>
            <div className='relative w-full max-w-[400px] mx-auto aspect-square'>
              <Image
                src='/faq.svg'
                alt='Frequently Asked Questions'
                fill
                className='object-contain'
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-12'>
        <BookDiscussionButton />
      </div>
    </section>
  );
}
