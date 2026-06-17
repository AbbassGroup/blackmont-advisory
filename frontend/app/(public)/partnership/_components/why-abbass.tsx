'use client';

import { ShieldCheck, Sparkles, Clock, Heart } from 'lucide-react';
import { SectionHeading } from './section-heading';

const reasons = [
  {
    title: 'Protects the Client Relationship',
    description:
      'We never compete for your advisory role. Your client remains your client.',
    icon: ShieldCheck,
  },
  {
    title: 'Enhances Your Service Offering',
    description:
      'You become a more complete advisor without adding operational burden.',
    icon: Sparkles,
  },
  {
    title: 'Saves Time',
    description:
      'We manage buyer enquiries, negotiations, documentation coordination, and transaction flow.',
    icon: Clock,
  },
  {
    title: 'Strengthens Client Loyalty',
    description:
      'Clients appreciate when their accountant connects them with the right specialist at the right time.',
    icon: Heart,
  },
];

export function WhyAbbass() {
  return (
    <section className='relative overflow-hidden bg-[#1c2434] py-20 lg:py-28'>
      {/* Teal ambient glow */}
      <div className='pointer-events-none absolute inset-0 bg-cover bg-no-repeat bg-[url("/businessbrokers/dotted.png")] opacity-5' />

      <div className='relative z-10 mx-auto max-w-[1260px] px-6 lg:px-8'>
        <SectionHeading
          title='Why Partner with ABBASS'
          theme='dark'
          className='mb-16'
        />

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8'>
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className='flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-brand-primary/30 hover:bg-white/10 lg:p-7'
              >
                <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10'>
                  <Icon className='h-7 w-7 text-brand-primary' />
                </div>
                <div>
                  <h3 className='mb-3 text-xl font-bold leading-snug text-white'>
                    {reason.title}
                  </h3>

                  <p className='text-[1.05rem] leading-relaxed text-white/60'>
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
