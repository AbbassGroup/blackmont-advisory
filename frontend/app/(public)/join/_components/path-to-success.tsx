'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  FileText,
  Users,
  ShieldCheck,
  GraduationCap,
  CircleDollarSign,
} from 'lucide-react';

const steps = [
  {
    title: 'Review\nOverview',
    subtitle: 'Learn about Business\nBroking',
    icon: BookOpen,
  },
  {
    title: 'Complete EOI\nForm',
    subtitle: 'Submit your\nExpression of Interest',
    icon: FileText,
  },
  {
    title: '1:1 Consultation',
    subtitle: 'Meet with Sadeq\nAbbass',
    icon: Users,
  },
  {
    title: 'Due Diligence',
    subtitle: 'Review licence details\n& conduct checks',
    icon: ShieldCheck,
  },
  {
    title: 'Onboarding',
    subtitle: 'Begin your\ncomprehensive\ntraining',
    icon: GraduationCap,
  },
  {
    title: 'Start Earning',
    subtitle: 'Launch your business\nbroker career',
    icon: CircleDollarSign,
  },
];

export function PathToSuccess() {
  return (
    <section className='py-24 bg-[#f4f6f8] relative overflow-hidden'>
      <div className='max-w-[1260px] mx-auto px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-20'>
          <h2 className='text-[2.2rem] md:text-[2.75rem] font-extrabold text-[#333] mb-4 tracking-tight drop-shadow-sm'>
            Your Path to Success
          </h2>
          <p className='text-gray-500 text-lg md:text-[1.1rem] max-w-2xl mx-auto mt-4 leading-relaxed'>
            Follow these 6 simple steps to launch your business brokerage
            <br className='hidden md:block' /> career with ABBASS
          </p>
        </div>

        <div className='relative max-w-6xl mx-auto'>
          {/* Horizontal Line (Desktop only) */}
          <div className='hidden md:block absolute top-[48px] left-[8%] right-[8%] h-[2px] bg-gray-200 z-0' />

          <div className='grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-4 relative z-10'>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='relative flex flex-col items-center text-center group bg-transparent'
                >
                  {/* Step Number Circle (Using relative to strictly contain the absolute badge) */}
                  <div className='relative w-24 h-24 shrink-0 rounded-full bg-white flex items-center justify-center text-brand-primary z-10 shadow-sm border-[4px] border-white ring-1 ring-gray-100 mb-6 group-hover:shadow-[0_8px_30px_rgba(86,193,188,0.2)] group-hover:ring-brand-primary/20 transition-all duration-300'>
                    <Icon className='w-8 h-8 group-hover:scale-110 transition-transform duration-300 stroke-[2px]' />

                    {/* Small number badge anchored strictly to the circle */}
                    <div className='absolute top-0 -right-2 w-6 h-6 rounded-full bg-[#333] text-white text-[11px] font-bold flex items-center justify-center shadow-md border-2 border-white'>
                      {index + 1}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className='flex flex-col items-center max-w-[140px]'>
                    <h3 className='font-bold text-[1.05rem] text-[#333] leading-snug mb-2 whitespace-pre-wrap'>
                      {step.title}
                    </h3>
                    <p className='text-[#6b7280] text-[0.85rem] font-medium leading-[1.4] whitespace-pre-wrap'>
                      {step.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
