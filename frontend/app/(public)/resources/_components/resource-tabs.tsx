import Link from 'next/link';
import { BookOpen, BriefcaseBusiness, Newspaper, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LandingContainer } from '@/components/landing/presentation';

export type ResourceTab = 'blogs' | 'guides' | 'case-studies';

/** Anchor the footer links jump to, so the tab content is in view on arrival. */
export const RESOURCE_TABS_ID = 'resources-tabs';

export const RESOURCE_TABS: { id: ResourceTab; label: string; href: string; icon: LucideIcon }[] = [
  { id: 'blogs', label: 'Blogs', href: '/resources/blogs', icon: Newspaper },
  { id: 'guides', label: 'Guides', href: '/resources/guides', icon: BookOpen },
  { id: 'case-studies', label: 'Case Studies', href: '/resources/case-studies', icon: BriefcaseBusiness },
];

/**
 * Tabs are real links to separate URLs (not client-side state), so each tab
 * is its own indexable page and the browser back button works as expected.
 */
export function ResourceTabs({ active }: { active: ResourceTab }) {
  return (
    <nav
      id={RESOURCE_TABS_ID}
      aria-label='Resource types'
      className='scroll-mt-[73px] border-b border-advisory-rule bg-white min-[681px]:scroll-mt-[78px] min-[931px]:scroll-mt-[90px]'
    >
      <LandingContainer>
        <ul className='m-0 flex list-none gap-1 overflow-x-auto p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {RESOURCE_TABS.map(({ id, label, href, icon: Icon }) => {
            const current = id === active;
            return (
              <li key={id} className='shrink-0'>
                <Link
                  href={`${href}#${RESOURCE_TABS_ID}`}
                  aria-current={current ? 'page' : undefined}
                  className={cn(
                    'inline-flex min-h-[60px] items-center gap-2 border-b-[3px] px-4 text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none min-[681px]:px-6 min-[681px]:text-base',
                    current
                      ? 'border-gilt text-midnight'
                      : 'border-transparent text-ink hover:text-midnight',
                  )}
                >
                  <Icon size={18} strokeWidth={1.75} aria-hidden='true' className={current ? 'text-gilt' : undefined} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </LandingContainer>
    </nav>
  );
}
