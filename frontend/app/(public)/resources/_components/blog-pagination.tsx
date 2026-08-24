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
    target === 1 ? '/resources' : `/resources?page=${target}`;

  return (
    <nav
      aria-label='Blog pagination'
      className='mt-14 flex items-center justify-center gap-2'
    >
      <PageLink
        href={href(page - 1)}
        disabled={page <= 1}
        aria-label='Previous page'
      >
        <ChevronLeft className='h-4 w-4' />
      </PageLink>

      {pageWindow(page, totalPages).map((entry, idx) =>
        entry === 'gap' ? (
          <span
            key={`gap-${idx}`}
            className='px-1 text-sm text-muted-foreground/60'
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

      <PageLink href={href(page + 1)} disabled={page >= totalPages} aria-label='Next page'>
        <ChevronRight className='h-4 w-4' />
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
    'flex h-10 min-w-10 items-center justify-center border px-3 text-sm font-medium transition-colors',
    active
      ? 'border-accent bg-accent text-primary'
      : 'border-secondary/15 bg-background text-secondary hover:border-accent/40 hover:text-accent',
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
