'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { LandingHeader } from '@/components/landing/header';
import { LandingTheme } from '@/components/landing/landing-theme';
import { Header } from './header';

type PublicChromeProps = {
  children: ReactNode;
  footer: ReactNode;
  landingFooter: ReactNode;
};

/** Server-rendered page and footer slots retain their server component boundary. */
export function PublicChrome({ children, footer, landingFooter }: PublicChromeProps) {
  const pathname = usePathname();
  const isLanding = pathname === '/' || pathname === '/home' || pathname === '/home/';

  if (isLanding) {
    return (
      <LandingTheme data-landing-page className='flex flex-1 flex-col'>
        <LandingHeader />
        <main id='top' className='flex-1'>{children}</main>
        {landingFooter}
      </LandingTheme>
    );
  }

  return (
    <>
      <Header />
      <main className='flex-1'>{children}</main>
      {footer}
    </>
  );
}
