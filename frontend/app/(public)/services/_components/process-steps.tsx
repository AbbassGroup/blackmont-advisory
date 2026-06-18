'use client';

import { motion } from 'framer-motion';
import {
  Handshake,
  BarChart3,
  TrendingUp,
  Megaphone,
  FileText,
  ClipboardList,
} from 'lucide-react';

const processSteps = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'Initial consultation and a deep dive into your business operations to better advise you.',
    icon: <Handshake className='w-6 h-6' />,
  },
  {
    number: '02',
    title: 'Appraisal',
    description:
      'Based on an initial consultation and finance assessment, we provide you with an appraisal for your business.',
    icon: <BarChart3 className='w-6 h-6' />,
  },
  {
    number: '03',
    title: 'Strategy Development',
    description:
      'We develop a strategy around the potential sale of your business.',
    icon: <TrendingUp className='w-6 h-6' />,
  },
  {
    number: '04',
    title: 'Strategic Marketing',
    description:
      'Strategic marketing on your business to best position it for sale to the right buyer.',
    icon: <Megaphone className='w-6 h-6' />,
  },
  {
    number: '05',
    title: 'Offer Reviews',
    description: 'We receive, vet and negotiate the best outcome for you.',
    icon: <FileText className='w-6 h-6' />,
  },
  {
    number: '06',
    title: 'Post Sale',
    description:
      'We help you with the sale and transition of business ownership.',
    icon: <ClipboardList className='w-6 h-6' />,
  },
];

export function ProcessSteps() {
  return (
    <section className='bg-[#1c2434] py-24'>
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8'>
        <div className='text-center mb-16'>
          <span className='inline-block text-brand-primary font-semibold text-xs uppercase tracking-widest mb-3'>
            How We Work
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Our Proven Process
          </h2>
          <p className='text-white/60 text-lg max-w-[520px] mx-auto'>
            Guiding you from consultation to post-sale.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className='group bg-white/8 hover:bg-white/15 border border-white/10 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1'
            >
              <div className='flex items-center gap-4 mb-5'>
                <div className='w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300'>
                  {step.icon}
                </div>
                <span className='text-brand-primary font-bold text-xl'>
                  {step.number}
                </span>
              </div>
              <h3 className='text-white font-bold text-lg mb-2'>
                {step.title}
              </h3>
              <p className='text-white/55 text-sm leading-relaxed'>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
