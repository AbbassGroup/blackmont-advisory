'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  BarChart3,
  Handshake,
  Search,
  DollarSign,
  Building2,
  HeadphonesIcon,
} from 'lucide-react';
import Title from '@/components/global/title';

const services = [
  {
    title: 'Business Appraisals',
    description:
      'Get an accurate assessment of your business worth with our comprehensive valuation services. We use industry-standard methods to determine the true market value.',
    icon: <BarChart3 className='w-7 h-7' />,
    image: '/businessbrokers/services.webp',
    details: [
      'Financial Analysis & Reporting',
      'Market Comparison Analysis',
      'Asset-Based Valuation',
      'Future Earnings Projection',
      'Industry Multiplier Assessment',
    ],
  },
  {
    title: 'Selling Small Businesses',
    description:
      'We handle the entire process of selling your business, from marketing to negotiations and closing. Our expertise ensures you get the best possible price.',
    icon: <Handshake className='w-7 h-7' />,
    image: '/businessbrokers/business_sales.webp',
    details: [
      'Confidential Marketing',
      'Buyer Screening',
      'Negotiation Support',
      'Due Diligence Assistance',
      'Transaction Closing Services',
    ],
  },
  {
    title: 'Business Buyer Advisory',
    description:
      'We represent the Buyer in sourcing, analysing and negotiating the purchase of a business.',
    icon: <Search className='w-7 h-7' />,
    image: '/businessbrokers/mergers.webp',
    details: [
      'Business Search & Matching',
      'Market Analysis',
      'Due Diligence Support',
      'Negotiation Assistance',
      'Transition Planning',
    ],
  },
  {
    title: 'Business Advisory',
    description:
      'Get advice around the structure and operations of your business to improve efficiency and the overall value of your business.',
    icon: <DollarSign className='w-7 h-7' />,
    image: '/businessbrokers/business_advisory.webp',
    details: [
      'Tax Planning',
      'Financial Structuring',
      'Risk Assessment',
      'Growth Strategy',
      'Exit Planning',
    ],
  },
  {
    title: 'Business Exit Strategy',
    description:
      'We work close to prepare your Business exit strategy to get the best ultimate outcome for your business.',
    icon: <Building2 className='w-7 h-7' />,
    image: '/businessbrokers/exit_strategy.webp',
    details: [
      'Confidential Representation',
      'Market Analysis',
      'Buyer-Seller Matching',
      'Transaction Management',
      'Post-Sale Support',
    ],
  },
  {
    title: 'Business Consulting Services',
    description:
      'General Business Consulting Services for your every day business operations and needs.',
    icon: <HeadphonesIcon className='w-7 h-7' />,
    image: '/businessbrokers/business_consulting.webp',
    details: [
      'Operational Assessment',
      'Growth Strategy',
      'Market Analysis',
      'Business Planning',
      'Performance Optimization',
    ],
  },
];

export function ServicesGrid() {
  return (
    <section className='bg-brand-offwhite py-24'>
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8'>
        <div className='text-center mb-16'>
          <Title>What We Offer</Title>
          <div className='w-16 h-1 bg-brand-primary rounded-full mx-auto' />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className='group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col'
            >
              {/* Image */}
              <div className='relative h-52 overflow-hidden'>
                <Image
                  loading='eager'
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-black/25' />
                {/* Icon badge */}
                <div className='absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-lg'>
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className='flex flex-col flex-1 p-7'>
                <h3 className='text-lg font-bold text-brand-black mb-3'>
                  {service.title}
                </h3>
                <p className='text-gray-500 text-base leading-relaxed mb-5 flex-1'>
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
