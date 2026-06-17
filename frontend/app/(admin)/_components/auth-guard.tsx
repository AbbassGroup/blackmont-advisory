'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAdminAuth } from '@/context/admin-auth-context';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, user } = useAdminAuth();
  const router = useRouter();
  // isMounted prevents SSR/client hydration mismatch — token lives in localStorage
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [isMounted, setIsMounted] = useState(false);

  // This is the standard Next.js client-only-mount pattern
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && token === null) {
      router.replace('/admin/login');
    }
  }, [isMounted, token, router]);

  // Server render / before hydration completes → show nothing (avoids mismatch)
  if (!isMounted) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <Loader2 className='w-6 h-6 animate-spin text-brand-primary' />
      </div>
    );
  }

  // Mounted but no token → redirect in progress
  // if (token === null) {
  //   return (
  //     <div className='min-h-screen flex items-center justify-center bg-gray-50'>
  //       <div className='flex flex-col items-center gap-3'>
  //         <Loader2 className='w-6 h-6 animate-spin text-brand-primary' />
  //         <p className='text-gray-400 text-sm'>Redirecting...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // Token present but user profile not yet fetched
  if (token && !user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='flex flex-col items-center gap-3'>
          <Loader2 className='w-6 h-6 animate-spin text-brand-primary' />
          <p className='text-gray-400 text-sm'>Verifying session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
