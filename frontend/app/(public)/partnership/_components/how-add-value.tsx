'use client';

import { Store, ShoppingBag, Lightbulb } from 'lucide-react';
import { SectionHeading } from './section-heading';

const sellingPoints = [
  'Accurate market positioning',
  'Access to qualified buyers',
  'Confidential marketing',
  'Negotiation expertise',
  'End-to-end deal management',
  'Buyer qualification and filtering',
];

const buyingPoints = [
  'Business identification',
  'Deal assessment',
  'Negotiation strategy',
  'Market insight',
  'Acquisition structuring support',
];

interface ValueColumnProps {
  icon: any;
  title: string;
  subtitle: string;
  points: string[];
  resultText: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
}

function ValueColumn({
  icon: Icon,
  title,
  subtitle,
  points,
  resultText,
  accentColor,
  accentBg,
  accentBorder,
}: ValueColumnProps) {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex items-center gap-4 mb-4'>
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${accentBg}`}
        >
          <Icon className={`w-7 h-7 ${accentColor}`} />
        </div>
        <h3 className='text-xl lg:text-2xl font-bold text-brand-black leading-snug'>
          {title}
        </h3>
      </div>

      <div className='pl-18 flex-1'>
        <p className='text-gray-600 font-medium mb-4'>{subtitle}</p>
        <div className={`w-12 h-1 rounded-full mb-6 ${accentBg}`} />

        <div className='flex flex-wrap gap-2 mb-8'>
          {points.map((point) => (
            <div
              key={point}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border ${accentBorder} ${accentBg} text-brand-black`}
            >
              {point}
            </div>
          ))}
        </div>

        <div className='flex items-start gap-3 mt-auto'>
          <Lightbulb className={`w-6 h-6 shrink-0 mt-0.5 ${accentColor}`} />
          <p className='text-gray-600 italic leading-relaxed'>{resultText}</p>
        </div>
      </div>
    </div>
  );
}

export function HowAddValue() {
  return (
    <section className='py-20 lg:py-28 relative overflow-hidden'>
      <div className="absolute inset-0 bg-[url('/businessbrokers/dotted-abbass.png')] bg-cover bg-center opacity-20 "></div>
      <div className='max-w-[1260px] mx-auto px-6 lg:px-8 relative z-10'>
        <SectionHeading
          title='How We Add Value to Your Clients'
          className='mb-16'
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch'>
          <ValueColumn
            icon={Store}
            title='For Clients Selling a Business'
            subtitle='We provide:'
            points={sellingPoints}
            resultText='Greater sales confidence, smoother transactions, and stronger outcomes.'
            accentColor='text-[#56C1BC]'
            accentBg='bg-[#56C1BC]/10'
            accentBorder='border-[#56C1BC]/20'
          />

          {/* Divider visible only on md+ */}
          <div className='hidden md:block absolute left-1/2 top-48 bottom-12 w-px border-l-2 border-dashed border-brand-primary/20 -translate-x-1/2' />

          {/* Divider visible only on mobile */}
          <div className='block md:hidden w-full border-t-2 border-dashed border-brand-primary/20 my-4' />

          <ValueColumn
            icon={ShoppingBag}
            title='For Clients Buying a Business'
            subtitle='We assist with:'
            points={buyingPoints}
            resultText='We work collaboratively with you to ensure the deal is structured correctly for our mutual client.'
            accentColor='text-[#4A9B94]'
            accentBg='bg-[#4A9B94]/10'
            accentBorder='border-[#4A9B94]/20'
          />
        </div>
      </div>
    </section>
  );
}
