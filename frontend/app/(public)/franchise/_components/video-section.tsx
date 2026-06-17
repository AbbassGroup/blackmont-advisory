'use client';

import { motion } from 'framer-motion';
import Title from '@/components/global/title';

const videos = [
  {
    src: 'https://abbass.com.au/businessbrokers/ABBASS%20Testimonials.mp4',
    label: 'ABBASS Testimonials',
  },
  {
    src: 'https://abbass.com.au/businessbrokers/Frequent%20Asked%20Questions.mp4',
    label: 'Frequently Asked Questions',
  },
  {
    src: 'https://abbass.com.au/businessbrokers/Introduction%20to%20Franchising%20at%20ABBASS.mp4',
    label: 'Introduction to Franchising',
  },
];

export function VideoSection() {
  return (
    <section className='py-24 bg-linear-to-br from-[#f8fafd] to-[#e6f7fa]'>
      <div className='max-w-[1260px] mx-auto px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <Title>Hear from Our Team & Learn More</Title>
          <div className='w-20 h-1.5 bg-brand-primary rounded-full mx-auto mt-6' />
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10'>
          {videos.map((vid, i) => (
            <motion.div
              key={vid.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className='group flex flex-col bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
            >
              <div className='relative w-full aspect-video bg-black rounded-2xl overflow-hidden mb-6 shadow-md border border-gray-800/10 group-hover:shadow-[0_8px_30px_rgba(86,193,188,0.2)] transition-shadow duration-300'>
                <video
                  controls
                  className='w-full h-full object-cover'
                  preload='metadata'
                >
                  <source src={vid.src} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h3 className='text-lg font-bold text-center text-brand-black group-hover:text-brand-primary transition-colors duration-300 tracking-tight leading-snug px-2'>
                {vid.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
