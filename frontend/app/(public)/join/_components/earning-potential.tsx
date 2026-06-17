'use client';

import { motion } from 'framer-motion';
import Title from '@/components/global/title';

const examples = [
  {
    title: '12 listings | 6 sales\n25-30 hrs p.w',
    value: '$90,000',
    example: 'Example 1',
  },
  {
    title: '20 listings | 10 sales\n40 hrs p.w',
    value: '$250,000',
    example: 'Example 2',
  },
  {
    title: '30 listings | 15 sales\n50-60 hrs p.w',
    value: '$450,000',
    example: 'Example 3',
  },
];

export function EarningPotential() {
  return (
    <section className='py-24 bg-[#f4f4f4]'>
      <div className='max-w-[1260px] mx-auto px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <Title>Earning Potential</Title>
          <div className='w-16 h-1.5 bg-brand-primary rounded-full mx-auto mt-4' />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-12'
        >
          <ul className='space-y-4 text-[1.1rem] text-brand-black list-disc pl-6 marker:text-brand-primary'>
            <li>Commission range = $10,000 - $200,000 (typically $15–$20k)</li>
            <li>
              Conversion rate of listings to sales within 6 months = 50%
            </li>
            <li>Listings per month = 1</li>
            <li>Annual earning = 12 listings, 6 sales, $90,000</li>
            <li>Time required to achieve above = 25–30 hours a week</li>
          </ul>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {examples.map((ex, i) => (
            <motion.div
              key={ex.example}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className='bg-white rounded-[2rem] p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-center min-h-[160px]'
            >
              <h3 className='font-bold text-gray-800 whitespace-pre-wrap leading-tight mb-3'>
                {ex.title}
              </h3>
              <p className='text-3xl lg:text-4xl font-extrabold text-brand-primary tracking-tight mb-2'>
                {ex.value}
              </p>
              <p className='text-gray-500 font-medium text-sm'>{ex.example}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='text-center text-gray-500 mt-12 max-w-3xl mx-auto leading-relaxed'
        >
          The more listings you get, the more particular you will be about the
          quality of the listing and the higher the commission that you set. Due
          to this and economies of scale, your income potential increases
          exponentially.
        </motion.p>
      </div>
    </section>
  );
}
