'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';
import { useAdminAuth } from '@/context/admin-auth-context';
import { canAccessPath, getAllowedPagesForUser } from '@/lib/admin-pages';

/**
 * Enforces the per-user page allow-list. Sits inside the authenticated shell
 * (after AuthGuard), so `user` is loaded by the time this renders. Superadmins
 * pass everything; an admin who lands on a page they aren't granted is bounced
 * to their first allowed page (or shown a no-access notice if they have none).
 */
export function PageAccessGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();

  const role = user?.user?.role;
  const allowedPages = user?.user?.allowedPages;
  const allowed = user ? canAccessPath(role, allowedPages, pathname) : true;

  useEffect(() => {
    if (!user || allowed) return;
    const fallback = getAllowedPagesForUser(role, allowedPages)[0];
    if (fallback && fallback.href !== pathname) {
      router.replace(fallback.href);
    }
  }, [user, allowed, role, allowedPages, pathname, router]);

  if (user && !allowed) {
    return (
      <div className='flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center'>
        <ShieldAlert className='h-8 w-8 text-accent' />
        <p className='text-lg font-semibold text-secondary'>
          You don&apos;t have access to this page
        </p>
        <p className='max-w-sm text-sm text-muted-foreground'>
          Contact a super admin if you believe you should have access.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
