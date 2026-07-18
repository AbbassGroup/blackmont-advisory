'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAcquirerAuth } from '@/context/acquirer-auth-context';

// Token lives in localStorage, so wait for client mount before redirecting.
export function AcquirerAuthGuard({ children }: { children: React.ReactNode }) {
  const { token, acquirer } = useAcquirerAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && token === null) {
      router.replace('/acquisition/login');
    }
  }, [isMounted, token, router]);

  if (!isMounted) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <Loader2 className='w-6 h-6 animate-spin text-accent' />
      </div>
    );
  }

  if (token && !acquirer) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-3'>
          <Loader2 className='w-6 h-6 animate-spin text-accent' />
          <p className='text-muted-foreground text-sm'>Verifying session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
