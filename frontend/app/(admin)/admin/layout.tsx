'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '../_components/admin-sidebar';
import { AuthGuard } from '../_components/auth-guard';
import { PageAccessGuard } from '../_components/page-access-guard';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAdminAuth } from '@/context/admin-auth-context';
import { landingFontVariables } from '@/components/landing/fonts';
import { matchAdminPage } from '@/lib/admin-pages';
import { cn } from '@/lib/utils';

const AUTH_PATHS = ['/admin/login', '/admin/forgot-password', '/admin/reset-password'];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAdminAuth();
  const pathname = usePathname();
  if (AUTH_PATHS.some((path) => pathname?.startsWith(path))) return <>{children}</>;

  return (
    <AuthGuard>
      <TooltipProvider delayDuration={0}>
        <SidebarProvider className={cn(landingFontVariables, 'bg-canvas font-advisory-body text-sm text-ink')}>
          <AdminSidebar />
          <SidebarInset className='min-w-0 bg-canvas'>
            <header className='sticky top-0 z-30 flex min-h-16 shrink-0 items-center justify-between gap-4 border-b border-advisory-rule bg-white px-4 min-[681px]:px-6'>
              <div className='flex min-w-0 items-center gap-3'><SidebarTrigger className='size-10 shrink-0 rounded-none text-midnight hover:bg-canvas focus-visible:ring-gilt' /><span aria-hidden='true' className='h-5 w-px shrink-0 bg-advisory-rule' /><p className='m-0 truncate text-sm font-medium text-midnight'>{matchAdminPage(pathname)?.label || 'Admin'}</p></div>
              <p className='m-0 hidden min-w-0 truncate text-sm text-ink min-[481px]:block'>Welcome <span className='font-semibold text-midnight'>{user?.user?.username}</span></p>
            </header>
            <div className='min-w-0 flex-1 overflow-auto bg-canvas p-6'><PageAccessGuard>{children}</PageAccessGuard></div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </AuthGuard>
  );
}
