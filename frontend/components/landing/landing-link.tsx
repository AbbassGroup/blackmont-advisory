'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type LandingLinkProps = Omit<ComponentProps<'a'>, 'href'> & { href: string };

/** Native fragments scroll again even when the URL already has the same hash. */
export function LandingLink({ href, ...props }: LandingLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/home' || pathname === '/home/';
  const resolvedHref = isHome && href.startsWith('/#') ? href.slice(1) : href;

  if (resolvedHref.startsWith('#')) {
    return <a href={resolvedHref} {...props} />;
  }

  return <Link href={resolvedHref} {...props} />;
}
