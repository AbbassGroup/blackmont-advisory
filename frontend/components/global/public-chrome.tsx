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
  interiorFooter: ReactNode;
};

/** Server-rendered page and footer slots retain their server component boundary. */
export function PublicChrome({ children, footer, landingFooter, interiorFooter }: PublicChromeProps) {
  const pathname = usePathname();
  const isLanding = pathname === '/' || pathname === '/home' || pathname === '/home/';
  const isExit = pathname === '/exit' || pathname === '/exit/';
  const isResources = pathname === '/resources' || pathname === '/resources/';

  if (isLanding || isExit || isResources) {
    return (
      <LandingTheme data-landing-page className='flex flex-1 flex-col'>
        <LandingHeader homePath={isLanding ? '' : '/'} />
        <main id='top' className='flex-1'>{children}</main>
        {isLanding ? landingFooter : interiorFooter}
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
