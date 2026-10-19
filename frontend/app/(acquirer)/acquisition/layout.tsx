'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAcquirerAuth } from '@/context/acquirer-auth-context';
import { PortalShell } from '@/components/portal/portal-shell';
import { AcquirerAuthGuard } from './_components/acquirer-auth-guard';

export default function AcquirerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { acquirer, logout } = useAcquirerAuth();
  if (pathname?.startsWith('/acquisition/login')) return <>{children}</>;
  return (
    <AcquirerAuthGuard>
      <PortalShell title='Acquisition portal' home='/acquisition' identity={acquirer?.email || acquirer?.username} onLogout={() => { logout(); router.replace('/acquisition/login'); }}>{children}</PortalShell>
    </AcquirerAuthGuard>
  );
}
