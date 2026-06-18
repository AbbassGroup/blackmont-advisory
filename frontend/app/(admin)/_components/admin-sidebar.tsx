'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  ScrollText,
  Building2,
  MessageSquare,
  Shield,
  Briefcase,
  Users,
  Handshake,
  BarChart3,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAdminAuth } from '@/context/admin-auth-context';
import Image from 'next/image';

const NAV_ITEMS = [
  {
    label: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
    superAdminOnly: true,
  },
  {
    label: 'Digital Proposals',
    href: '/admin/proposals',
    icon: FileText,
    superAdminOnly: false,
  },
  {
    label: 'Information Memorandum',
    href: '/admin/information-memorandum',
    icon: ScrollText,
    superAdminOnly: false,
  },
  {
    label: 'Deals',
    href: '/admin/deals',
    icon: Handshake,
    superAdminOnly: false,
  },
  {
    label: 'Listings',
    href: '/admin/listings',
    icon: Building2,
    superAdminOnly: true,
  },
  {
    label: 'Enquiries',
    href: '/admin/enquiries',
    icon: MessageSquare,
    superAdminOnly: true,
  },
  {
    label: 'Resource Analytics',
    href: '/admin/access',
    icon: BarChart3,
    superAdminOnly: true,
  },
  {
    label: 'Confidentiality',
    href: '/admin/confidentiality',
    icon: Shield,
    superAdminOnly: true,
  },
  {
    label: 'Career Applications',
    href: '/admin/careers',
    icon: Briefcase,
    superAdminOnly: true,
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: Users,
    superAdminOnly: true,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const isSuperAdmin = user?.user?.role === 'superadmin';

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.superAdminOnly || isSuperAdmin,
  );

  return (
    <Sidebar collapsible='icon'>
      {/* Logo / Brand */}
      <SidebarHeader className='border-b border-sidebar-border px-4 py-4'>
        <Link href='/' className='flex items-center gap-2.5'>
          <Image
            loading='eager'
            src='/businessbrokers/mark.webp'
            alt='ABBASS Business Brokers'
            width={40}
            height={40}
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => {
                const isActive =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: User + Logout */}
      <SidebarFooter className='border-t border-sidebar-border p-2'>
        {/* User info */}
        <div className='flex items-center gap-2.5 px-2 py-2 group-data-[collapsible=icon]:justify-center'>
          <div className='w-8 h-8 rounded-full bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center shrink-0'>
            <span className='text-xs font-bold text-brand-primary uppercase'>
              {user?.user?.username?.[0] ?? 'A'}
            </span>
          </div>
          <div className='group-data-[collapsible=icon]:hidden overflow-hidden'>
            <p className='text-sm font-semibold text-sidebar-foreground truncate'>
              {user?.user?.username}
            </p>
            <p className='text-xs text-sidebar-foreground/60 truncate'>
              {user?.user?.role}
            </p>
          </div>
        </div>
        {/* Logout */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip='Sign Out'>
              <LogOut className='text-red-500' />
              <span className='text-red-500'>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
