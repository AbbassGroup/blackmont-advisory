'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AdminSidebar } from '../_components/admin-sidebar';
import { Separator } from '@/components/ui/separator';
import { AuthGuard } from '../_components/auth-guard';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAdminAuth } from '@/context/admin-auth-context';

// Auth routes that should NOT show the sidebar shell
const AUTH_PATHS = [
  '/admin/login',
  '/admin/forgot-password',
  '/admin/reset-password',
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAdminAuth();
  const pathname = usePathname();
  const isAuthPage = AUTH_PATHS.some((p) => pathname?.startsWith(p));

  // Auth pages: render children directly with no sidebar
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Dashboard pages: full sidebar layout with auth guard
  return (
    <AuthGuard>
      <TooltipProvider delayDuration={0}>
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
            <header className='sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-card px-4 shrink-0'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='h-5' />
              <p className='text-sm text-muted-foreground'>
                Welcome{' '}
                <span className='font-semibold text-secondary'>
                  {user?.user?.username}
                </span>
              </p>
            </header>
            <div className='flex-1 overflow-auto p-6 bg-background'>
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </AuthGuard>
  );
}
