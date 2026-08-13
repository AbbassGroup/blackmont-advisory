'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useVendorAuth } from '@/context/vendor-auth-context';

// Token lives in localStorage, so wait for client mount before redirecting.
export function VendorAuthGuard({ children }: { children: React.ReactNode }) {
  const { token, vendor } = useVendorAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && token === null) {
      router.replace('/vendor/login');
    }
  }, [isMounted, token, router]);

  if (!isMounted) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <Loader2 className='w-6 h-6 animate-spin text-accent' />
      </div>
    );
  }

  if (token && !vendor) {
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
