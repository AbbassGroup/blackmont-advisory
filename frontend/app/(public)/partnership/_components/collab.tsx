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
    color: 'text-[#c9a84c]',
    borderColor: 'border-[#c9a84c]/40',
    bgLight: 'bg-[#c9a84c]/5',
  },
  {
    number: '2',
    text: 'We meet jointly (or independently if preferred).',
    icon: Users,
    color: 'text-[#c9a84c]',
    borderColor: 'border-[#c9a84c]/40',
    bgLight: 'bg-[#c9a84c]/5',
  },
  {
    number: '3',
    text: 'We assess readiness and provide a structured plan.',
    icon: ClipboardCheck,
    color: 'text-[#c9a84c]',
    borderColor: 'border-[#c9a84c]/40',
    bgLight: 'bg-[#c9a84c]/5',
  },
  {
    number: '4',
    text: 'We manage the transaction process.',
    icon: Settings,
    color: 'text-[#c9a84c]',
    borderColor: 'border-[#c9a84c]/40',
    bgLight: 'bg-[#c9a84c]/5',
  },
  {
    number: '5',
    text: 'We keep you informed throughout the process, whilst maintaining client confidentiality.',
    icon: Building2,
    color: 'text-[#c9a84c]',
    borderColor: 'border-[#c9a84c]/40',
    bgLight: 'bg-[#c9a84c]/5',
  },
];

export function Collab() {
  return (
    <section className='border-t border-secondary/10 bg-background py-20 lg:py-28'>
      <div className='mx-auto max-w-[760px] px-6 sm:px-10 lg:px-16'>
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
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 bg-background shadow-sm ${step.borderColor} ${step.bgLight}`}
                  >
                    <Icon className={`h-6 w-6 ${step.color}`} />
                  </div>
                  {!isLast && (
                    <div className='my-2 w-0.5 grow rounded-full bg-linear-to-b from-accent/30 to-accent/5' />
                  )}
                </div>

                {/* Step card */}
                <div className={isLast ? 'flex-1' : 'flex-1 pb-8'}>
                  <div className=' border border-secondary/10 bg-muted/60 p-5 transition-colors hover:border-accent/30 sm:p-6'>
                    <span
                      className={`text-xs font-bold uppercase tracking-widest ${step.color}`}
                    >
                      Step {step.number}
                    </span>
                    <p className='mt-2 text-[1.05rem] font-medium leading-relaxed text-secondary'>
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
