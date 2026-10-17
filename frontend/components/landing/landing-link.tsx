import type { ComponentProps } from 'react';
import Link from 'next/link';

type LandingLinkProps = Omit<ComponentProps<'a'>, 'href'> & { href: string };

/** Native fragments scroll again even when the URL already has the same hash. */
export function LandingLink({ href, ...props }: LandingLinkProps) {
  if (href.startsWith('#')) {
    return <a href={href} {...props} />;
  }

  return <Link href={href} {...props} />;
}
