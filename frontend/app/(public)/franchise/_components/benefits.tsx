'use client';

import { motion } from 'framer-motion';
import { CircleDollarSign, Clock, Trophy, BriefcaseBusiness, TrendingUp, GraduationCap } from 'lucide-react';
import Title from '@/components/global/title';

const benefits = [
  {
    label: 'Unlimited earning potential',
    icon: CircleDollarSign,
  },
  {
    label: 'Flexible work-life balance',
    icon: Clock,
  },
  {
    label: 'Rewarding and impactful career',
    icon: Trophy,
  },
  {
    label: 'High-value niche industry',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Dynamic and growing marketplace',
    icon: TrendingUp,
  },
  {
    label: 'Comprehensive training and support',
    icon: GraduationCap,
  },
];

export function Benefits() {
  return (
    <section className='py-24 bg-white'>
      <div className='max-w-[1000px] mx-auto px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <Title>Benefits of Being a Business Broker</Title>
          <div className='w-20 h-1.5 bg-brand-primary rounded-full mx-auto mt-6' />
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className='group flex flex-col items-center justify-center text-center bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(86,193,188,0.2)] hover:border-brand-primary/30 hover:-translate-y-1 transition-all duration-300 h-full'
              >
                <div className='w-16 h-16 rounded-full bg-brand-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-primary/10 transition-transform duration-300 shrink-0'>
                  <Icon className='w-8 h-8 text-brand-primary group-hover:text-brand-primary-dark transition-colors duration-300' />
                </div>
                <h3 className='text-lg font-bold text-brand-black leading-snug'>
                  {b.label}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
