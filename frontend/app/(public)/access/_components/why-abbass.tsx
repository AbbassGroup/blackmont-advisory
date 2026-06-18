'use client';

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
import { Reveal } from '@/components/landing/primitives';

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
    <section className='bg-background py-20 lg:py-28'>
      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16'>
        <SectionHeading
          label='The ABBASS Difference'
          title='Why Business Owners Choose ABBASS'
        />

        {/* Reasons grid */}
        <Reveal className='mt-14 grid grid-cols-1 gap-px overflow-hidden border border-secondary/15 bg-secondary/10 sm:grid-cols-2 lg:grid-cols-3'>
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className='group bg-background p-8 transition-colors duration-300 hover:bg-accent-pale lg:p-9'
              >
                <div className='flex h-12 w-12 items-center justify-center border-[1.5px] border-accent/30 transition-colors duration-300 group-hover:bg-accent'>
                  <Icon
                    className='h-6 w-6 text-accent transition-colors duration-300 group-hover:text-primary'
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className='mt-6 text-lg font-bold text-secondary'>
                  {r.title}
                </h3>
                <p className='mt-2 leading-relaxed text-muted-foreground'>
                  {r.description}
                </p>
              </div>
            );
          })}
        </Reveal>

        {/* Stats band */}
        <div className='mt-16 grid grid-cols-2 gap-y-10  bg-accent/8 px-6 py-12 lg:mt-20 lg:grid-cols-4 lg:px-8'>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 text-center lg:px-8 ${
                i !== 0 ? 'lg:border-l lg:border-accent/15' : ''
              }`}
            >
              <div className='text-4xl font-semibold tracking-tight text-secondary lg:text-5xl'>
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className='mt-2 text-sm text-muted-foreground'>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
