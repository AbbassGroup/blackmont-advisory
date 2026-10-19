'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { useAdminAuth } from '@/context/admin-auth-context';
import { getAllowedPagesForUser } from '@/lib/admin-pages';
import { landingFontVariables } from '@/components/landing/fonts';
import { cn } from '@/lib/utils';

const MENU_CLASS = 'min-h-10 h-auto gap-3 rounded-none px-3 py-2.5 font-advisory-body text-[13px] leading-[1.5] font-medium text-white/80 hover:bg-deep-navy hover:text-white active:bg-deep-navy active:text-white data-active:bg-gilt/15 data-active:font-semibold data-active:text-gilt focus-visible:ring-gilt group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:overflow-visible [&>span:last-child]:text-clip [&>span:last-child]:whitespace-normal';

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const { isMobile, setOpenMobile } = useSidebar();
  const visibleItems = getAllowedPagesForUser(user?.user?.role, user?.user?.allowedPages);
  const fontClass = cn(landingFontVariables, 'bg-midnight font-advisory-body text-sm text-white');

  return (
    <Sidebar collapsible='icon' className={cn(fontClass, '[&_[data-slot=sidebar-inner]]:bg-midnight')}>
      <SidebarHeader className={cn(fontClass, 'flex min-h-16 justify-center border-b border-white/15 px-4 py-3 group-data-[collapsible=icon]:px-0')}>
        <Link href='/' aria-label='Blackmont Advisory home' className='flex min-h-10 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt group-data-[collapsible=icon]:justify-center'>
          <Image loading='eager' unoptimized src='/assets/blackmont-light.png' alt='Blackmont Advisory' width={215} height={36} className='h-auto w-full max-w-[215px] group-data-[collapsible=icon]:hidden' />
          <Image loading='eager' unoptimized src='/assets/logo.png' alt='' width={28} height={28} className='hidden size-7 shrink-0 group-data-[collapsible=icon]:block' />
        </Link>
      </SidebarHeader>
      <SidebarContent className={cn(fontClass, 'gap-0 py-4')}>
        <SidebarGroup className='px-2 py-0'>
          <SidebarGroupContent>
            <SidebarMenu className='gap-1'>
              {visibleItems.map((item) => {
                const active = item.href === '/admin' ? pathname === '/admin' : pathname === item.href || pathname.startsWith(item.href + '/');
                return <SidebarMenuItem key={item.href}><SidebarMenuButton asChild isActive={active} tooltip={item.label} className={MENU_CLASS}>
                  <Link href={item.href} aria-current={active ? 'page' : undefined} onClick={() => { if (isMobile) setOpenMobile(false); }}><item.icon aria-hidden='true' /><span className='group-data-[collapsible=icon]:hidden'>{item.label}</span></Link>
                </SidebarMenuButton></SidebarMenuItem>;
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={cn(fontClass, 'gap-3 border-t border-white/15 p-2')}>
        <div className='flex min-w-0 items-center gap-3 px-2 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0'>
          <span aria-hidden='true' className='inline-flex size-8 shrink-0 items-center justify-center bg-deep-navy text-xs font-semibold uppercase text-gilt'>{user?.user?.username?.[0] ?? 'A'}</span>
          <div className='flex min-w-0 flex-col gap-1 group-data-[collapsible=icon]:hidden'><p className='m-0 truncate text-sm font-semibold text-white'>{user?.user?.username}</p><p className='m-0 text-xs text-white/70'>{user?.user?.role === 'superadmin' ? 'Super admin' : 'Admin'}</p></div>
        </div>
        <SidebarMenu><SidebarMenuItem><SidebarMenuButton onClick={logout} tooltip='Sign out' className={MENU_CLASS}><LogOut aria-hidden='true' /><span className='group-data-[collapsible=icon]:hidden'>Sign out</span></SidebarMenuButton></SidebarMenuItem></SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
