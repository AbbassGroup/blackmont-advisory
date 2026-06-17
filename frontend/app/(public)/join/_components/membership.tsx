'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Title from '@/components/global/title';

const memberships = [
  {
    title: 'Standard',
    price: '$500 + GST p.m',
    split: 'Keep 70%',
    desc: 'Perfect for sole operators or new licensees who want access to core ABBASS infrastructure with autonomy. Keep 70% of overall commission received.',
    inclusions: [
      'Use of ABBASS brand name',
      'License to use ABBASS brand (with custom email, business card, etc.)',
      'Neaxr CRM access + full digital systems (templates, workflows, lead qs)',
      'SMS & Email Marketing Campaigns',
      'Basic website profile under ABBASS domain',
      'Email hosting & domain including full Google Workspace (Gmail, Drive, Calendar)',
      'Limited access to group marketing (brand-aligned content)',
      'Monthly group call with other members',
      'Access to standard pitch decks',
      'Community WhatsApp & Slack support',
      'Use of co-branded brochures & pitch decks',
      'Ad-hoc group training',
      'Use of ABBASS brand guidelines',
    ],
  },
  {
    title: 'Growth',
    price: '$1,000 + GST p.m',
    split: 'Keep 80%',
    desc: 'Ideal for operators wanting strategic input, deeper training, and some lead support. Keep 80% of overall commission received.',
    highlighted: true,
    inclusions: [
      'Everything in Standard, plus:',
      'Access to ABBASS digital ads library (Facebook/Google templates)',
      '1x lead gen funnel setup (landing page + CRM integration)',
      'Access to inbound leads shared from HQ (round robin & location dependant)',
      'Quarterly 1-on-1 business coaching call with HQ',
      'Access to our internal marketing designer for 1 item / month',
      'Exclusive content assets (scripts, proposals, objection handling)',
      'Access to Executive Assistant for admin work',
    ],
  },
];

export function Membership() {
  const scrollToContact = () => {
    document.getElementById('join-contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className='py-24 bg-brand-offwhite relative overflow-hidden'>
      <div className='max-w-[1260px] mx-auto px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <Title>Membership Options</Title>
          <div className='w-16 h-1.5 bg-brand-primary rounded-full mx-auto mt-4' />
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto'>
          {memberships.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`flex flex-col rounded-3xl p-8 lg:p-12 relative transition-all duration-300 ${
                m.highlighted
                  ? 'bg-brand-black text-white shadow-2xl shadow-brand-black/20 scale-100 md:scale-105 z-10'
                  : 'bg-white text-brand-black shadow-md border border-gray-100'
              }`}
            >
              <div className='mb-8'>
                <h3
                  className={`text-2xl font-extrabold mb-2 ${
                    m.highlighted ? 'text-white' : 'text-brand-primary'
                  }`}
                >
                  {m.title}
                </h3>
                <div className='flex items-end gap-2 mb-2'>
                  <span
                    className={`text-4xl lg:text-5xl font-black ${
                      m.highlighted ? 'text-brand-primary' : 'text-brand-black'
                    }`}
                  >
                    {m.price.split(' ')[0]}
                  </span>
                  <span
                    className={`text-lg font-bold pb-1 ${
                      m.highlighted ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    + GST p.m
                  </span>
                </div>
                <div
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mt-2 ${
                    m.highlighted
                      ? 'bg-brand-primary/20 text-brand-primary'
                      : 'bg-brand-black/5 text-brand-black'
                  }`}
                >
                  {m.split}
                </div>
                <p
                  className={`mt-6 text-[1.05rem] leading-relaxed ${
                    m.highlighted ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {m.desc}
                </p>
              </div>

              <div className='flex-1'>
                <ul className='space-y-4 flex flex-col'>
                  {m.inclusions.map((inc, idx) => (
                    <li key={idx} className='flex items-start gap-3'>
                      <Check
                        className={`w-5 h-5 shrink-0 mt-0.5 ${
                          m.highlighted ? 'text-brand-primary' : 'text-green-500'
                        }`}
                      />
                      <span
                        className={`text-[0.95rem] leading-snug ${
                          m.highlighted ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {inc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='mt-20 text-center flex justify-center'
        >
          <button
            onClick={scrollToContact}
            className='bg-brand-primary hover:bg-brand-primary-dark text-white font-bold text-lg px-10 py-5 rounded-full shadow-[0_8px_25px_rgba(86,193,188,0.4)] hover:shadow-[0_12px_35px_rgba(86,193,188,0.6)] transition-all hover:-translate-y-1'
          >
            Submit your EOI
          </button>
        </motion.div>
      </div>
    </section>
  );
}
