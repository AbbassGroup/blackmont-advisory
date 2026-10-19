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
      <div role='status' className='mx-auto flex w-full max-w-advisory flex-col items-start gap-3 border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
        <ShieldAlert aria-hidden='true' className='size-6 text-midnight' />
        <p className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight'>
          You don&apos;t have access to this page
        </p>
        <p className='m-0 max-w-lg text-sm leading-[1.75] text-ink'>
          Contact a super admin if you believe you should have access.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
