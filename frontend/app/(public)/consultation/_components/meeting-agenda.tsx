'use client';

import { motion } from 'framer-motion';
import Title from '@/components/global/title';
import {
  Info,
  Building,
  Flag,
  Store,
  BarChart,
  ArrowRightCircle,
} from 'lucide-react';

const agendaItems = [
  {
    id: 1,
    icon: Info,
    title: 'A short introduction to Blackmont Advisory and how we operate',
    description:
      'A short introduction to Blackmont Advisory and how we operate.',
  },
  {
    id: 2,
    icon: Building,
    title: 'Your business: industry, operations, size, and key drivers',
    description:
      'Industry, operations, size, and key drivers that shape your company.',
  },
  {
    id: 3,
    icon: Flag,
    title: 'Your motivations and goals for selling (now or in the future)',
    description:
      'Your reasons for selling (now or in the future) and long-term goals.',
  },
  {
    id: 4,
    icon: Store,
    title: 'Our process for marketing and selling businesses',
    description:
      'An overview of how we market and sell businesses effectively.',
  },
  {
    id: 5,
    icon: BarChart,
    title:
      'How we determine business value (an overview of our appraisal approach)',
    description: 'How we determine business value with our appraisal approach.',
  },
  {
    id: 6,
    icon: ArrowRightCircle,
    title: 'The next steps following the consultation',
    description:
      'What happens after the consultation and moving forward with us.',
  },
];

export function MeetingAgenda() {
  return (
    <section className='py-20 lg:py-28 bg-brand-offwhite relative overflow-hidden'>
      {/* Decorative background element */}
      <div className='absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(86,193,188,0.03)_0%,transparent_50%)] pointer-events-none' />

      <div className='max-w-[1400px] mx-auto px-6 relative z-10'>
        <div className='text-center mb-16'>
          <Title>Meeting Agenda</Title>
          <div className='w-20 h-1.5 bg-linear-to-r from-brand-primary to-brand-primary-dark rounded-full mx-auto mb-8' />
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            This section of the meeting is structured but conversational.{' '}
            <strong className='text-brand-black'>Topics</strong> we typically
            cover include
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {agendaItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='h-full'
              >
                <div className='bg-white rounded-3xl p-8 h-full flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(86,193,188,0.12)] transition-all duration-300 hover:-translate-y-2 border border-brand-primary/5'>
                  <div className='w-20 h-20 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6'>
                    <Icon className='w-8 h-8' />
                  </div>
                  <h3 className='text-xl font-bold text-brand-black mb-4 leading-snug'>
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className='text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto text-center'>
          We&apos;ll also outline how we ensure{' '}
          <strong className='text-brand-black'>confidentiality</strong> and walk
          you through a{' '}
          <strong className='text-brand-black'>high-level timeline</strong> of
          the sales process, if you decide to move forward.
        </p>
      </div>
    </section>
  );
}
