import Image from 'next/image';
import Link from 'next/link';

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
      className='group h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1.5'
    >
      <div className='relative h-48 w-full overflow-hidden bg-gray-100'>
        {isExternal ? (
          <img
            src={blog.image}
            alt={blog.title}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
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
      <div className='p-6 flex flex-col flex-1'>
        {/* <p className='text-xs font-semibold text-brand-primary mb-2 uppercase tracking-wide'>
          {blog.date}
        </p> */}
        <h3 className='text-lg font-bold text-brand-black mb-3 line-clamp-2 group-hover:text-brand-primary transition-colors'>
          {blog.title}
        </h3>
        <p className='text-sm text-gray-500 mb-5 flex-1 line-clamp-3 leading-relaxed'>
          {blog.summary}
        </p>
        <div className='text-sm font-semibold text-brand-primary flex items-center gap-1 mt-auto'>
          Read More{' '}
          <span className='group-hover:translate-x-1 transition-transform'>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
