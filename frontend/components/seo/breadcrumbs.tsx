import { Fragment } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, tone = 'dark' }: { items: Crumb[]; tone?: 'light' | 'dark' }) {
  return (
    <nav aria-label='Breadcrumb'>
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-xs leading-[1.6]', tone === 'light' ? 'text-ink' : 'text-parchment/45')}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={item.path}>
              {i > 0 && <ChevronRight className='h-3 w-3' aria-hidden />}
              {last ? (
                <li aria-current='page' className={tone === 'light' ? 'font-medium text-midnight' : 'text-parchment/70'}>
                  {item.name}
                </li>
              ) : (
                <li>
                  <Link
                    href={item.path || '/'}
                    className='transition-colors duration-200 hover:text-gilt hover:underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'
                  >
                    {item.name}
                  </Link>
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
