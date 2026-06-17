'use client';

import { Users, EyeOff, Handshake, ShieldCheck } from 'lucide-react';
import { SectionHeading } from './section-heading';

const partnershipOptions = [
  {
    title: 'Referral Model',
    description:
      'You introduce the client. We manage the sale or acquisition process and keep you informed at every stage.',
    icon: Handshake,
    iconColor: 'text-[#56C1BC]',
    iconBgColor: 'bg-[#56C1BC]/10',
    cardStyles: 'bg-gradient-to-br from-[#F0FFFE] to-white',
  },
  {
    title: 'Co-Branded Approach',
    description:
      'We collaborate under both brands, reinforcing your involvement throughout the process.',
    icon: Users,
    iconColor: 'text-[#4A9B94]',
    iconBgColor: 'bg-[#4A9B94]/10',
    cardStyles: 'bg-gradient-to-br from-[#E8F9F7] to-white',
  },
  {
    title: 'White-Label Support',
    description:
      'We operate under your brand with our licence as an extension of your firms service offerings.',
    icon: EyeOff,
    iconColor: 'text-[#3D8A84]',
    iconBgColor: 'bg-[#3D8A84]/10',
    cardStyles: 'bg-gradient-to-br from-[#F0FFFE] to-white',
  },
];

export function HowWork() {
  return (
    <section className='py-20 lg:py-24 bg-white'>
      <div className='max-w-[1260px] mx-auto px-6 lg:px-8'>
        <SectionHeading title='How We Work With You' className='mb-16' />

        {/* Options Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {partnershipOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.title}
                className={`flex flex-col items-center text-center p-8 lg:p-10 rounded-[2rem] border border-brand-primary/10 shadow-sm h-full ${option.cardStyles}`}
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shrink-0 ${option.iconBgColor}`}
                >
                  <Icon className={`w-10 h-10 ${option.iconColor}`} />
                </div>
                <h3 className='text-xl lg:text-2xl font-bold text-brand-black mb-4 leading-snug'>
                  {option.title}
                </h3>
                <p className='text-gray-600 leading-relaxed text-[1.05rem]'>
                  {option.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Banner */}
        <div className='flex items-center justify-center gap-3 max-w-4xl mx-auto'>
          <ShieldCheck className='w-8 h-8 text-[#4A9B94] shrink-0' />
          <p className='text-brand-black font-semibold text-center'>
            All models are designed around transparency, compliance, and
            protecting your client relationship.
          </p>
        </div>
      </div>
    </section>
  );
}
