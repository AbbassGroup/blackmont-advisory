'use client';

import { Users, EyeOff, Handshake, ShieldCheck } from 'lucide-react';
import { SectionHeading } from './section-heading';

const partnershipOptions = [
  {
    title: 'Referral Model',
    description:
      'You introduce the client. We manage the sale or acquisition process and keep you informed at every stage.',
    icon: Handshake,
    iconColor: 'text-[#c9a84c]',
    iconBgColor: 'bg-[#c9a84c]/10',
    cardStyles: 'bg-background',
  },
  {
    title: 'Co-Branded Approach',
    description:
      'We collaborate under both brands, reinforcing your involvement throughout the process.',
    icon: Users,
    iconColor: 'text-[#c9a84c]',
    iconBgColor: 'bg-[#c9a84c]/10',
    cardStyles: 'bg-background',
  },
  {
    title: 'White-Label Support',
    description:
      'We operate under your brand with our licence as an extension of your firms service offerings.',
    icon: EyeOff,
    iconColor: 'text-[#c9a84c]',
    iconBgColor: 'bg-[#c9a84c]/10',
    cardStyles: 'bg-background',
  },
];

export function HowWork() {
  return (
    <section className='py-20 lg:py-28 bg-background'>
      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16'>
        <SectionHeading title='How We Work With You' className='mb-16' />

        {/* Options Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {partnershipOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.title}
                className={`flex flex-col items-center text-center p-8 lg:p-10  border border-accent/10 shadow-sm h-full ${option.cardStyles}`}
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shrink-0 ${option.iconBgColor}`}
                >
                  <Icon className={`w-10 h-10 ${option.iconColor}`} />
                </div>
                <h3 className='text-xl lg:text-2xl font-bold text-secondary mb-4 leading-snug'>
                  {option.title}
                </h3>
                <p className='text-muted-foreground leading-relaxed text-[1.05rem]'>
                  {option.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Banner */}
        <div className='flex items-center justify-center gap-3 max-w-4xl mx-auto'>
          <ShieldCheck className='w-8 h-8 text-[#c9a84c] shrink-0' />
          <p className='text-secondary font-semibold text-center'>
            All models are designed around transparency, compliance, and
            protecting your client relationship.
          </p>
        </div>
      </div>
    </section>
  );
}
