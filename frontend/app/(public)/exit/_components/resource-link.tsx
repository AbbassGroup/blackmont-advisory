'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { trackAccessEvent } from '@/lib/track';

const MotionLink = motion.create(Link);

interface ResourceLinkProps {
  href: string;
  resourceTitle: string;
  className: string;
  index: number;
  children: React.ReactNode;
}

export function ResourceLink({
  href,
  resourceTitle,
  className,
  index,
  children,
}: ResourceLinkProps) {
  return (
    <MotionLink
      href={href}
      onClick={() =>
        trackAccessEvent('resource_open', { resource: resourceTitle })
      }
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
      className={className}
    >
      {children}
    </MotionLink>
  );
}
