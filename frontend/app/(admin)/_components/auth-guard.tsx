'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/admin-auth-context';
import { SessionLoading } from '@/components/portal/session-loading';

// The token is stored in localStorage. Wait for mount before redirecting.
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, user } = useAdminAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && token === null) router.replace('/admin/login');
  }, [mounted, token, router]);

  if (!mounted || token === null) return <SessionLoading />;
  if (!user) return <SessionLoading message='Verifying session…' />;
  return <>{children}</>;
}
