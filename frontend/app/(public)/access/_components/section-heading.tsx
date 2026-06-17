'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const center = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`${center ? 'mx-auto text-center' : ''} ${className}`}
    >
      <div className={`mb-5 ${center ? 'text-center' : ''}`}>
        <span className='text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary'>
          {label}
        </span>
      </div>
      <h2
        className={`text-[1.9rem] md:text-4xl lg:text-[2.6rem] font-semibold tracking-tight leading-[1.12] ${
          light ? 'text-white' : 'text-brand-black'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base md:text-lg leading-relaxed max-w-5xl ${
            center ? 'mx-auto' : ''
          } ${light ? 'text-white/60' : 'text-gray-500'}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
