'use client';

import { motion } from 'framer-motion';

const whyJoin = [
  {
    title: 'Market Opportunity',
    desc: 'Capitalise on the growing wave of business transitions as baby boomers retire, creating unprecedented opportunities in the business sales market.'
  },
  {
    title: 'Network',
    desc: 'Leverage from an interconnected multinational brand. Our established brand and marketing systems deliver a consistent pipeline of opportunities to our brokers.'
  },
  {
    title: 'Expert Training',
    desc: 'Access comprehensive systems, process and sales training through, providing you with the skills, knowledge, and support needed to successfully broker business deals.'
  },
  {
    title: 'Attractive Compensation',
    desc: 'Benefit from our competitive commission structure and rewards program. We\'ve designed our model to maximise earnings for dedicated brokers.'
  },
  {
    title: 'Advanced Platform',
    desc: 'Leverage our cutting-edge brokerage platform featuring advanced systems and tools, and marketing automation to streamline your operations.'
  },
  {
    title: 'Specialisation',
    desc: 'Develop your expertise in specific industries or niches. We support brokers in building their reputation in sectors they\'re passionate about.'
  }
];

export function WhyJoin() {
  return (
    <section className='relative py-24 bg-brand-black overflow-hidden'>
      {/* Background Image Overlay matching About Us */}
      <div 
        className='absolute inset-0 opacity-20'
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
        }}
      />
      <div className='absolute inset-0 bg-linear-to-b from-transparent to-brand-black/90 pointer-events-none' />

      <div className='max-w-[1260px] mx-auto px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight'>
            Why join <span className='text-brand-primary'>ABBASS</span>
          </h2>
          <div className='w-20 h-1.5 bg-brand-primary rounded-full mx-auto mt-6' />
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {whyJoin.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className='group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-primary/50 rounded-[2rem] p-8 text-center transition-all duration-300 backdrop-blur-md flex flex-col justify-center h-full hover:-translate-y-1'
            >
              <h3 className='text-xl lg:text-2xl font-bold text-brand-primary mb-4 group-hover:text-white transition-colors duration-300'>
                {item.title}
              </h3>
              <p className='text-white/70 text-[1.05rem] leading-relaxed group-hover:text-white/90 transition-colors duration-300'>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
