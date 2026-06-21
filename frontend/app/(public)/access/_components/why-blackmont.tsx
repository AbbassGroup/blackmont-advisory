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

export function WhyBlackmont() {
  return (
    <section className='bg-background py-20 lg:py-28'>
      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16'>
        <SectionHeading
          label='The Blackmont Advisory Difference'
          title='Why Business Owners Choose Blackmont Advisory'
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
      </div>
    </section>
  );
}
