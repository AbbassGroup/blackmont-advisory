import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { blogs } from '@/data/blog-data';

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.link,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const paramsResolved = await params;
  const blog = blogs.find((b) => b.link === paramsResolved.slug);
  if (!blog) return { title: 'Not Found' };

  return {
    title: `${blog.title} | ABBASS Business Brokers`,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      type: 'article',
      images: [
        {
          url: blog.image.startsWith('http') ? blog.image : `/${blog.image}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
  };
}

// Helper to render content blocks recursively
function renderContent(blocks: any[], level = 0) {
  return blocks.map((block, idx) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p
            key={idx}
            className={`text-gray-600 leading-relaxed mb-6 ${block.sx?.fontWeight ? 'font-semibold text-brand-black' : ''}`}
          >
            {block.text}
          </p>
        );
      case 'list':
        return (
          <ul
            key={idx}
            className='list-disc list-inside space-y-2 mb-6 text-gray-600 pl-4'
          >
            {block.items?.map((item: string, i: number) => (
              <li key={i} className='leading-relaxed'>
                {item}
              </li>
            ))}
          </ul>
        );
      case 'section':
        return (
          <div key={idx} className='mt-10 mb-6'>
            <h2 className='text-2xl font-bold text-brand-black mb-4'>
              {block.title}
            </h2>
            {block.content && renderContent(block.content, level + 1)}
          </div>
        );
      default:
        return null;
    }
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const paramsResolved = await params;
  const blog = blogs.find((b) => b.link === paramsResolved.slug);

  if (!blog) {
    notFound();
  }

  const isExternal = blog.image?.startsWith('http');

  return (
    <main className='min-h-screen bg-brand-offwhite pb-24'>
      {/* ── Article Header ───────────────────────────── */}
      <div className='relative pt-[80px] w-full min-h-[40vh] md:min-h-[50vh] flex flex-col justify-end overflow-hidden pb-12'>
        <div className='absolute inset-0 z-0'>
          {isExternal ? (
            <img
              src={blog.image}
              alt={blog.title}
              className='w-full h-full object-cover'
            />
          ) : (
            <Image
              src={`${blog.image}`}
              alt={blog.title}
              fill
              className='object-cover'
              priority
            />
          )}
          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/70 to-transparent' />
        </div>

        <div className='relative z-10 max-w-[1400px] w-full mx-auto px-4 lg:px-8 pt-24'>
          <Link
            href='/resources'
            className='inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-semibold mb-6 group'
          >
            <ArrowLeft className='w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform' />
            Back to Resources
          </Link>
          {/* <div className='flex items-center gap-2 text-brand-primary font-semibold text-sm mb-4 tracking-wide uppercase'>
            <Calendar className='w-4 h-4' />
            {blog.date}
          </div> */}
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md'>
            {blog.title}
          </h1>
        </div>
      </div>

      {/* ── Main Content Area ────────────────────────── */}
      <div className='max-w-[1400px] mx-auto px-4 lg:px-8 -mt-8 relative z-20'>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-10'>
          {/* ── Article Body ───────────────────────────── */}
          <div className='flex-1 lg:w-2/3'>
            <article className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 lg:p-12'>
              {/* Summary / Lead */}
              <div className='text-lg md:text-xl text-gray-500 font-medium leading-relaxed mb-10 pb-10 border-b border-gray-100'>
                {blog.summary}
              </div>

              {/* Dynamic Content */}
              <div className='prose prose-lg prose-brand max-w-none'>
                {renderContent(blog.content)}
              </div>
            </article>
          </div>

          {/* ── Sidebar (Related Articles) ─────────────── */}
          <aside className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:pt-12'>
            <div className='sticky top-24'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-bold text-brand-black'>
                  Recent Articles
                </h3>
                <Link
                  href='/resources'
                  className='text-brand-primary font-semibold text-sm hover:underline'
                >
                  View all
                </Link>
              </div>

              <div className='flex flex-col gap-5'>
                {blogs
                  .filter((b) => b.link !== blog.link)
                  .slice(0, 3)
                  .map((recentBlog, idx) => {
                    const externalImg = recentBlog.image?.startsWith('http');
                    return (
                      <Link
                        key={idx}
                        href={`/resources/${recentBlog.link}`}
                        className='group flex bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all hover:-translate-y-1'
                      >
                        <div className='relative w-32 shrink-0 bg-gray-100'>
                          {externalImg ? (
                            <img
                              src={recentBlog.image}
                              alt={recentBlog.title}
                              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                            />
                          ) : (
                            <Image
                              src={`${recentBlog.image}`}
                              alt={recentBlog.title}
                              fill
                              className='object-cover group-hover:scale-105 transition-transform duration-500'
                            />
                          )}
                        </div>
                        <div className='p-4 flex flex-col justify-center flex-1'>
                          <h4 className='font-bold text-sm text-brand-black line-clamp-3 group-hover:text-brand-primary transition-colors pr-2'>
                            {recentBlog.title}
                          </h4>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
