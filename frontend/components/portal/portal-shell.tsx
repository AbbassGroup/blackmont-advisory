'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { KeyRound, LogOut } from 'lucide-react';
import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';

export function PortalShell({ title, home, identity, onLogout, children }: { title: string; home: string; identity?: string; onLogout: () => void; children: ReactNode }) {
  return (
    <LandingTheme className='flex min-h-dvh flex-col bg-canvas text-[15px] min-[681px]:text-[15px]'>
      <header className='sticky top-0 z-30 border-b border-advisory-rule bg-white'>
        <div className='mx-auto flex min-h-16 w-full max-w-advisory items-center justify-between gap-4 px-4 py-3 min-[681px]:px-6'>
          <Link href={home} className='flex min-w-0 items-center gap-3 text-midnight focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt' aria-label={title + ' home'}>
            <Image unoptimized src='/assets/blackmont.png' alt='Blackmont Advisory' width={220} height={44} className='hidden h-auto w-[200px] min-[1121px]:block' priority />
            <Image unoptimized src='/assets/logo.png' alt='Blackmont Advisory' width={28} height={28} className='size-7 shrink-0 min-[1121px]:hidden' priority />
            <span aria-hidden='true' className='hidden h-6 w-px bg-advisory-rule min-[1121px]:block' />
            <span className='text-sm font-medium'>{title}</span>
          </Link>
          <div className='flex shrink-0 items-center gap-2'>
            {identity && <span className='mr-3 hidden max-w-56 truncate text-sm text-ink min-[901px]:block'>{identity}</span>}
            <LandingButtonLink href={home + '/change-password'} size='compact' variant='outline' aria-label='Change password' title='Change password' className='size-10 px-0 min-[681px]:w-auto min-[681px]:px-4'><KeyRound aria-hidden='true' className='size-4' /><span className='hidden min-[681px]:inline'>Password</span></LandingButtonLink>
            <LandingButton size='compact' variant='outline' onClick={onLogout} aria-label='Sign out' title='Sign out' className='size-10 px-0 min-[681px]:w-auto min-[681px]:px-4'><LogOut aria-hidden='true' className='size-4' /><span className='hidden min-[681px]:inline'>Sign out</span></LandingButton>
          </div>
        </div>
      </header>
      <main className='min-w-0 flex-1 p-5 min-[681px]:p-6'>{children}</main>
    </LandingTheme>
  );
}
