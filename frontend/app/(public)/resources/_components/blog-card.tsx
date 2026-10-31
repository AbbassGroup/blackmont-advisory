import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Blog } from '@/lib/blogs';
import { LandingImage } from '@/components/landing/landing-image';

// Words that stay lowercase mid-title, so `selling-a-business` reads
// "Selling a Business" rather than "Selling A Business".
const MINOR_WORDS = new Set(['a', 'an', 'the', 'of', 'and', 'or', 'for', 'to', 'in', 'on']);

/** Turn a stored category slug (`selling-a-business`) into a display label. */
function categoryLabel(category: string): string {
  return category
    .split('-')
    .filter(Boolean)
    .map((word, i) =>
      i > 0 && MINOR_WORDS.has(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(' ');
}

export function BlogCard({ blog }: { blog: Blog }) {
  // Covers uploaded through the API are absolute URLs on the API host, which
  // next/image would reject unless that exact host is in remotePatterns — so
  // they go through a plain <img>. Relative paths stay optimised.
  const isExternal = blog.image?.startsWith('http');
  const published = new Date(blog.createdAt);
  const hasDate = !Number.isNaN(published.getTime());
  const displayDate = hasDate
    ? new Intl.DateTimeFormat('en-AU', {
        day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Australia/Melbourne',
      }).format(published)
    : null;

  return (
    <Link
      href={`/resources/${blog.url}`}
      className='group flex h-full min-w-0 flex-col overflow-hidden border border-advisory-rule bg-white no-underline transition-colors duration-200 hover:border-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'
    >
      {blog.image && (
        <div className='group/image relative aspect-video w-full shrink-0 overflow-hidden bg-canvas'>
          {isExternal ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={blog.image}
              alt={blog.imageAlt || blog.title}
              loading='lazy'
              decoding='async'
              className='h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/image:transform-[scale(1.04)] motion-reduce:transition-none'
            />
          ) : (
            <LandingImage
              src={blog.image}
              alt={blog.imageAlt || blog.title}
              fill
              quality={85}
              loading='lazy'
              sizes='(max-width: 680px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 50px), (max-width: 1120px) calc(33.333vw - 42px), (max-width: 1279px) calc(33.333vw - 53px), (max-width: 1444px) calc(25vw - 46px), 315px'
              className='object-cover'
            />
          )}
        </div>
      )}
      <div className='flex min-w-0 flex-1 flex-col p-5'>
        <h3 className='m-0 mb-3 line-clamp-3 font-advisory-heading text-xl leading-[1.4] font-bold tracking-normal text-midnight'>
          {blog.title}
        </h3>
        {(blog.category || displayDate) && (
          <div className='mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-[1.6] text-ink'>
            {blog.category && <span>{categoryLabel(blog.category)}</span>}
            {blog.category && displayDate && <span aria-hidden='true'>·</span>}
            {displayDate && <time dateTime={published.toISOString()}>{displayDate}</time>}
          </div>
        )}
        <p className='m-0 mb-4 line-clamp-2 flex-1 text-[15px] leading-[1.65] text-ink'>
          {blog.metaDescription}
        </p>
        <div className='mt-auto flex min-h-11 items-center justify-between gap-3 border-t border-advisory-rule pt-[16px] text-sm font-bold text-midnight transition-colors duration-200 group-hover:text-gilt group-focus-visible:text-gilt motion-reduce:transition-none'>
          Read article
          <ArrowRight aria-hidden='true' className='size-4 shrink-0' />
        </div>
      </div>
    </Link>
  );
}
