'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useVendorAuth } from '@/context/vendor-auth-context';
import { PortalShell } from '@/components/portal/portal-shell';
import { VendorAuthGuard } from './_components/vendor-auth-guard';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { vendor, logout } = useVendorAuth();
  if (pathname?.startsWith('/vendor/login')) return <>{children}</>;
  return (
    <VendorAuthGuard>
      <PortalShell title='Vendor portal' home='/vendor' identity={vendor?.email || vendor?.username} onLogout={() => { logout(); router.replace('/vendor/login'); }}>{children}</PortalShell>
    </VendorAuthGuard>
  );
}
