'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogOut, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAcquirerAuth } from '@/context/acquirer-auth-context';
import { AcquirerAuthGuard } from './_components/acquirer-auth-guard';

// Auth routes that should render bare (no header / no guard).
const AUTH_PATHS = ['/acquisition/login'];

export default function AcquisitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { acquirer, logout } = useAcquirerAuth();
  const isAuthPage = AUTH_PATHS.some((p) => pathname?.startsWith(p));

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <AcquirerAuthGuard>
      <div className='min-h-dvh bg-background flex flex-col'>
        <header className='sticky top-0 z-30 flex h-14 items-center justify-between gap-2 border-b border-border bg-card px-4 md:px-6 shrink-0'>
          <div className='flex items-center gap-2.5'>
            <Image
              src='/assets/logo.png'
              alt='Blackmont Advisory'
              width={28}
              height={28}
              className='h-7 w-7 object-contain'
            />
            <span className='text-sm font-semibold text-secondary'>
              Acquisition Portal
            </span>
          </div>
          <div className='flex items-center gap-2'>
            {(acquirer?.email || acquirer?.username) && (
              <span className='hidden sm:inline text-sm text-muted-foreground'>
                {acquirer.email || acquirer.username}
              </span>
            )}
            <Button
              variant='outline'
              size='sm'
              className='gap-1.5'
              onClick={() => router.push('/acquisition/change-password')}
            >
              <KeyRound className='w-4 h-4' />
              <span className='hidden sm:inline'>Password</span>
            </Button>
            <Button
              variant='outline'
              size='sm'
              className='gap-1.5'
              onClick={() => {
                logout();
                router.replace('/acquisition/login');
              }}
            >
              <LogOut className='w-4 h-4' />
              <span className='hidden sm:inline'>Logout</span>
            </Button>
          </div>
        </header>
        <main className='flex-1 overflow-auto p-4 md:p-6'>{children}</main>
      </div>
    </AcquirerAuthGuard>
  );
}
