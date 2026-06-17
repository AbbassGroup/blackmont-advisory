'use client';

import {
  UserSearch,
  Users,
  ClipboardCheck,
  Settings,
  Building2,
} from 'lucide-react';
import { SectionHeading } from './section-heading';

const steps = [
  {
    number: '1',
    text: 'You identify a client considering sale or acquisition.',
    icon: UserSearch,
    color: 'text-[#56C1BC]',
    borderColor: 'border-[#56C1BC]/40',
    bgLight: 'bg-[#56C1BC]/5',
  },
  {
    number: '2',
    text: 'We meet jointly (or independently if preferred).',
    icon: Users,
    color: 'text-[#4A9B94]',
    borderColor: 'border-[#4A9B94]/40',
    bgLight: 'bg-[#4A9B94]/5',
  },
  {
    number: '3',
    text: 'We assess readiness and provide a structured plan.',
    icon: ClipboardCheck,
    color: 'text-[#3D8A84]',
    borderColor: 'border-[#3D8A84]/40',
    bgLight: 'bg-[#3D8A84]/5',
  },
  {
    number: '4',
    text: 'We manage the transaction process.',
    icon: Settings,
    color: 'text-[#4A9B94]',
    borderColor: 'border-[#4A9B94]/40',
    bgLight: 'bg-[#4A9B94]/5',
  },
  {
    number: '5',
    text: 'We keep you informed throughout the process, whilst maintaining client confidentiality.',
    icon: Building2,
    color: 'text-[#56C1BC]',
    borderColor: 'border-[#56C1BC]/40',
    bgLight: 'bg-[#56C1BC]/5',
  },
];

export function Collab() {
  return (
    <section className='border-t border-gray-100 bg-white py-20 lg:py-28'>
      <div className='mx-auto max-w-[760px] px-6 lg:px-8'>
        <SectionHeading
          title='What a Typical Collaboration Looks Like'
          className='mb-16'
        />

        <div className='flex flex-col'>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <div key={index} className='flex items-stretch gap-5 sm:gap-6'>
                {/* Node + connecting line */}
                <div className='flex flex-col items-center'>
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 bg-white shadow-sm ${step.borderColor} ${step.bgLight}`}
                  >
                    <Icon className={`h-6 w-6 ${step.color}`} />
                  </div>
                  {!isLast && (
                    <div className='my-2 w-0.5 grow rounded-full bg-linear-to-b from-brand-primary/30 to-brand-primary/5' />
                  )}
                </div>

                {/* Step card */}
                <div className={isLast ? 'flex-1' : 'flex-1 pb-8'}>
                  <div className='rounded-2xl border border-gray-100 bg-brand-offwhite/60 p-5 transition-colors hover:border-brand-primary/30 sm:p-6'>
                    <span
                      className={`text-xs font-extrabold uppercase tracking-widest ${step.color}`}
                    >
                      Step {step.number}
                    </span>
                    <p className='mt-2 text-[1.05rem] font-medium leading-relaxed text-gray-700'>
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
