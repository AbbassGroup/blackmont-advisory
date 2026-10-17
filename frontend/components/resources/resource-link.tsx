'use client';

import Link from 'next/link';
import { trackAccessEvent } from '@/lib/track';

interface ResourceLinkProps {
  href: string;
  resourceTitle: string;
  className: string;
  children: React.ReactNode;
}

export function ResourceLink({
  href,
  resourceTitle,
  className,
  children,
}: ResourceLinkProps) {
  const onClick = () =>
    trackAccessEvent('resource_open', { resource: resourceTitle });

  return (
    <Link
      href={href}
      onClick={onClick}
      className={className}
    >
      {children}
    </Link>
  );
}
