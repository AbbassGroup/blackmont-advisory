'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVendorAuth } from '@/context/vendor-auth-context';
import { SessionLoading } from '@/components/portal/session-loading';

// The token is stored in localStorage. Wait for mount before redirecting.
export function VendorAuthGuard({ children }: { children: React.ReactNode }) {
  const { token, vendor } = useVendorAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && token === null) router.replace('/vendor/login');
  }, [mounted, token, router]);

  if (!mounted || token === null) return <SessionLoading />;
  if (!vendor) return <SessionLoading message='Verifying session…' />;
  return <>{children}</>;
}
