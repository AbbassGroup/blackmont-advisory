import {
  LayoutDashboard,
  FileText,
  ScrollText,
  FileSearch,
  Building2,
  MessageSquare,
  Shield,
  Users,
  Handshake,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';

/**
 * Single source of truth for the admin portal's pages.
 *
 * `key` is the stable identifier persisted on the User (`allowedPages`) — never
 * change an existing key. `href` is the route; `defaultForAdmin` marks the pages
 * a plain admin can see when a superadmin hasn't explicitly set their access
 * (preserves the legacy behaviour so existing admins don't lose their pages).
 */
export type AdminPage = {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  defaultForAdmin: boolean;
};

export const ADMIN_PAGES: AdminPage[] = [
  { key: 'overview', label: 'Overview', href: '/admin', icon: LayoutDashboard, defaultForAdmin: false },
  { key: 'proposals', label: 'Digital Proposals', href: '/admin/proposals', icon: FileText, defaultForAdmin: true },
  { key: 'information-memorandum', label: 'Information Memorandum', href: '/admin/information-memorandum', icon: ScrollText, defaultForAdmin: true },
  { key: 'acquisition-reports', label: 'Acquisition Reports', href: '/admin/acquisition-reports', icon: FileSearch, defaultForAdmin: true },
  { key: 'deals', label: 'Deals', href: '/admin/deals', icon: Handshake, defaultForAdmin: true },
  { key: 'listings', label: 'Listings', href: '/admin/listings', icon: Building2, defaultForAdmin: false },
  { key: 'enquiries', label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare, defaultForAdmin: false },
  { key: 'access', label: 'Resource Analytics', href: '/admin/access', icon: BarChart3, defaultForAdmin: false },
  { key: 'confidentiality', label: 'Confidentiality', href: '/admin/confidentiality', icon: Shield, defaultForAdmin: false },
  { key: 'users', label: 'User Management', href: '/admin/users', icon: Users, defaultForAdmin: false },
];

/** Options for the page-access multi-select in the create/edit user modal. */
export const ADMIN_PAGE_OPTIONS = ADMIN_PAGES.map((p) => ({
  value: p.key,
  label: p.label,
}));

/**
 * The pages a given user may see.
 * - superadmin → every page, always.
 * - admin with an explicit allow-list → exactly those pages.
 * - admin with no allow-list yet → the legacy default set.
 */
export function getAllowedPagesForUser(
  role: string | undefined,
  allowedPages: string[] | undefined,
): AdminPage[] {
  if (role === 'superadmin') return ADMIN_PAGES;
  if (allowedPages && allowedPages.length > 0) {
    return ADMIN_PAGES.filter((p) => allowedPages.includes(p.key));
  }
  return ADMIN_PAGES.filter((p) => p.defaultForAdmin);
}

/** Find the page a pathname belongs to (longest matching href wins). */
export function matchAdminPage(pathname: string): AdminPage | undefined {
  const candidates = ADMIN_PAGES.filter((p) =>
    p.href === '/admin'
      ? pathname === '/admin'
      : pathname === p.href || pathname.startsWith(p.href + '/'),
  );
  return candidates.sort((a, b) => b.href.length - a.href.length)[0];
}

/**
 * Whether a user may access a given pathname. Routes that don't map to a known
 * admin page (e.g. shared sub-routes) fail open — access control is per top-level page.
 */
export function canAccessPath(
  role: string | undefined,
  allowedPages: string[] | undefined,
  pathname: string,
): boolean {
  const page = matchAdminPage(pathname);
  if (!page) return true;
  return getAllowedPagesForUser(role, allowedPages).some((p) => p.key === page.key);
}
