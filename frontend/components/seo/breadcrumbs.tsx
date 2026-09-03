import { Fragment } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label='Breadcrumb'>
      <ol className='flex flex-wrap items-center gap-1.5 text-xs text-parchment/45'>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={item.path}>
              {i > 0 && <ChevronRight className='h-3 w-3' aria-hidden />}
              {last ? (
                <li aria-current='page' className='text-parchment/70'>
                  {item.name}
                </li>
              ) : (
                <li>
                  <Link
                    href={item.path || '/'}
                    className='transition-colors hover:text-accent'
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
