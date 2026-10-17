import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Pagination for the Resources list.
 *
 * Plain <Link>s rather than click handlers so each page is a real, crawlable
 * URL that works without JavaScript — this is a public, indexed page.
 */
export function BlogPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const href = (target: number) =>
    target === 1 ? '/resources#articles' : `/resources?page=${target}#articles`;

  return (
    <nav
      aria-label='Blog pagination'
      className='mt-10 flex flex-wrap items-center justify-center gap-2 border-t border-advisory-rule pt-6 min-[681px]:mt-12'
    >
      <PageLink
        href={href(page - 1)}
        disabled={page <= 1}
        aria-label='Previous page'
      >
        <ChevronLeft aria-hidden='true' className='size-4' />
      </PageLink>

      <span className='px-3 text-sm text-ink min-[681px]:hidden'>
        Page {page} of {totalPages}
      </span>
      <div className='hidden flex-wrap items-center justify-center gap-2 min-[681px]:flex'>
      {pageWindow(page, totalPages).map((entry, idx) =>
        entry === 'gap' ? (
          <span
            key={`gap-${idx}`}
            className='px-1 text-sm text-ink'
            aria-hidden='true'
          >
            &hellip;
          </span>
        ) : (
          <PageLink
            key={entry}
            href={href(entry)}
            active={entry === page}
            aria-label={`Page ${entry}`}
            aria-current={entry === page ? 'page' : undefined}
          >
            {entry}
          </PageLink>
        ),
      )}
      </div>

      <PageLink href={href(page + 1)} disabled={page >= totalPages} aria-label='Next page'>
        <ChevronRight aria-hidden='true' className='size-4' />
      </PageLink>
    </nav>
  );
}

/**
 * Page numbers to show: always the first and last, plus a window around the
 * current page, with gaps standing in for the rest.
 */
function pageWindow(page: number, totalPages: number): Array<number | 'gap'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, totalPages, page]);
  if (page - 1 > 1) pages.add(page - 1);
  if (page + 1 < totalPages) pages.add(page + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const result: Array<number | 'gap'> = [];

  sorted.forEach((value, idx) => {
    if (idx > 0 && value - sorted[idx - 1] > 1) result.push('gap');
    result.push(value);
  });

  return result;
}

function PageLink({
  href,
  children,
  active,
  disabled,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
} & React.ComponentProps<'a'>) {
  const className = cn(
    'inline-flex min-h-11 min-w-11 items-center justify-center border px-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-midnight motion-reduce:transition-none',
    active
      ? 'border-midnight bg-midnight text-white'
      : 'border-advisory-rule bg-transparent text-midnight hover:border-gilt hover:text-midnight',
    disabled && 'pointer-events-none opacity-40',
  );

  // A disabled arrow is not a destination, so it must not be a link.
  if (disabled) {
    return (
      <span className={className} aria-disabled='true' {...rest}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
