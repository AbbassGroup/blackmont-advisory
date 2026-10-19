'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAcquirerAuth } from '@/context/acquirer-auth-context';
import { SessionLoading } from '@/components/portal/session-loading';

// The token is stored in localStorage. Wait for mount before redirecting.
export function AcquirerAuthGuard({ children }: { children: React.ReactNode }) {
  const { token, acquirer } = useAcquirerAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && token === null) router.replace('/acquisition/login');
  }, [mounted, token, router]);

  if (!mounted || token === null) return <SessionLoading />;
  if (!acquirer) return <SessionLoading message='Verifying session…' />;
  return <>{children}</>;
}
