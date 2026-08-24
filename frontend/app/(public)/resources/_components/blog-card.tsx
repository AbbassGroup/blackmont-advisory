import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Blog } from '@/lib/blogs';

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

  return (
    <Link
      href={`/resources/${blog.url}`}
      className='group flex h-full flex-col overflow-hidden border border-secondary/10 bg-background transition-colors hover:border-accent/40'
    >
      <div className='relative h-48 w-full overflow-hidden bg-muted'>
        {blog.image ? (
          isExternal ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={blog.image}
              alt={blog.title}
              className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
          ) : (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-cover transition-transform duration-500 group-hover:scale-105'
            />
          )
        ) : null}
      </div>
      <div className='flex flex-1 flex-col p-6'>
        {blog.category && (
          <p className='mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-accent'>
            {categoryLabel(blog.category)}
          </p>
        )}
        <h3 className='mb-3 line-clamp-2 text-lg font-bold tracking-tight text-secondary transition-colors group-hover:text-accent'>
          {blog.title}
        </h3>
        <p className='mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground'>
          {blog.metaDescription}
        </p>
        <div className='mt-auto flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent'>
          Read More
          <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
        </div>
      </div>
    </Link>
  );
}
