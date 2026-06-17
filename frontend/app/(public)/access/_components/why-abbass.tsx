'use client';

import { motion } from 'framer-motion';
import {
  Gem,
  Sparkles,
  Network,
  Handshake,
  LineChart,
  ShieldCheck,
} from 'lucide-react';
import { SectionHeading } from './section-heading';
import { CountUp } from './count-up';

const reasons = [
  {
    title: 'Boutique Advisory Approach',
    description: 'Senior advisors on every engagement, never handed off.',
    icon: Gem,
  },
  {
    title: 'High-Quality Marketing',
    description:
      'Polished campaigns that elevate how your business is perceived.',
    icon: Sparkles,
  },
  {
    title: 'Strong Buyer Network',
    description: 'Direct access to qualified, capable acquirers.',
    icon: Network,
  },
  {
    title: 'Negotiation Expertise',
    description: 'Decades of structuring deals that protect your value.',
    icon: Handshake,
  },
  {
    title: 'Finance + Business Combined',
    description: 'The rare blend of commercial and financial fluency.',
    icon: LineChart,
  },
  {
    title: 'Professional & Confidential',
    description: 'Total discretion from first call to settlement.',
    icon: ShieldCheck,
  },
];

const stats = [
  { to: 40, suffix: '+', label: 'Years of combined industry experience' },
  { to: 5000, suffix: '+', label: 'Qualified buyers in our database' },
  { to: 20000, suffix: '+', label: 'Monthly marketing reach' },
  { to: 10, suffix: '+', label: 'Industry sectors served' },
];

export function WhyAbbass() {
  return (
    <section className='bg-white py-10 lg:py-14'>
      <div className='max-w-[1260px] mx-auto px-6 lg:px-8'>
        <SectionHeading
          label='The ABBASS Difference'
          title='Why Business Owners Choose ABBASS'
        />

        {/* Reasons grid */}
        <div className='mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3'>
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className='group bg-white p-8 transition-colors duration-300 hover:bg-brand-offwhite lg:p-9'
              >
                <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 transition-colors duration-300 group-hover:bg-brand-primary'>
                  <Icon
                    className='h-6 w-6 text-brand-primary transition-colors duration-300 group-hover:text-white'
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className='mt-6 text-lg font-semibold text-brand-black'>
                  {r.title}
                </h3>
                <p className='mt-2 leading-relaxed text-gray-500'>
                  {r.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats band */}
        <div className='mt-16 grid grid-cols-2 gap-y-10 rounded-2xl bg-brand-primary/8 px-6 py-12 lg:mt-20 lg:grid-cols-4 lg:px-8'>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 text-center lg:px-8 ${
                i !== 0 ? 'lg:border-l lg:border-brand-primary/15' : ''
              }`}
            >
              <div className='text-4xl font-semibold tracking-tight text-brand-black lg:text-5xl'>
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className='mt-2 text-sm text-gray-500'>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
