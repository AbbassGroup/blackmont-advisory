'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container, Reveal } from '@/components/landing/primitives';
import { FAQS, type Faq } from './faqs';

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className='border border-secondary/10 bg-background'>
      <button
        type='button'
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        className='flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-accent-pale'
      >
        <span className='text-[1.02rem] font-semibold text-secondary'>
          {faq.question}
        </span>
        <ChevronDown
          aria-hidden
          className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {/* Answer stays in the DOM (collapsed via grid-rows) so it remains crawlable */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className='overflow-hidden'>
          <p className='border-t border-secondary/10 px-6 py-4 text-sm leading-relaxed text-muted-foreground'>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className='bg-muted py-20 lg:py-28'>
      <Container className='max-w-3xl'>
        <Reveal className='mb-12 text-center'>
          <p className='mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent'>
            Got Questions?
          </p>
          <h2 className='text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
            Frequently Asked Questions
          </h2>
        </Reveal>

        <Reveal className='flex flex-col gap-3'>
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} faq={faq} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
