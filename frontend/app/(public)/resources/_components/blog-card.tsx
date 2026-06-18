import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface BlogItem {
  title: string;
  summary: string;
  image: string;
  link: string;

  content: any[];
}

export function BlogCard({ blog }: { blog: BlogItem }) {
  const isExternal = blog.image?.startsWith('http');

  return (
    <Link
      href={`/resources/${blog.link}`}
      className='group flex h-full flex-col overflow-hidden border border-secondary/10 bg-background transition-colors hover:border-accent/40'
    >
      <div className='relative h-48 w-full overflow-hidden'>
        {isExternal ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={blog.image}
            alt={blog.title}
            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
        ) : (
          <Image
            src={`${blog.image}`}
            alt={blog.title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        )}
      </div>
      <div className='flex flex-1 flex-col p-6'>
        <h3 className='mb-3 line-clamp-2 text-lg font-bold tracking-tight text-secondary transition-colors group-hover:text-accent'>
          {blog.title}
        </h3>
        <p className='mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground'>
          {blog.summary}
        </p>
        <div className='mt-auto flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent'>
          Read More
          <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
        </div>
      </div>
    </Link>
  );
}
