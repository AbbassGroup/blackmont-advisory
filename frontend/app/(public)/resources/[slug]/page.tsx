import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { blogs } from '@/data/blog-data';
import { JsonLd } from '@/components/seo/json-ld';

const SITE_URL = 'https://blackmontadvisory.com';

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
    title: `${blog.title} | Blackmont Advisory`,
    description: blog.summary,
    alternates: { canonical: `/resources/${blog.link}` },
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
            className={`mb-6 leading-relaxed ${
              block.sx?.fontWeight
                ? 'font-semibold text-secondary'
                : 'text-muted-foreground'
            }`}
          >
            {block.text}
          </p>
        );
      case 'list':
        return (
          <ul
            key={idx}
            className='mb-6 list-inside list-disc space-y-2 pl-4 text-muted-foreground marker:text-accent'
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
          <div key={idx} className='mb-6 mt-10'>
            <h2 className='mb-4 text-2xl font-bold tracking-tight text-secondary'>
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
  const imageUrl = isExternal ? blog.image : `${SITE_URL}/${blog.image}`;

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.summary,
      image: imageUrl,
      url: `${SITE_URL}/resources/${blog.link}`,
      mainEntityOfPage: `${SITE_URL}/resources/${blog.link}`,
      author: { '@type': 'Organization', name: 'Blackmont Advisory' },
      publisher: { '@type': 'Organization', name: 'Blackmont Advisory' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Resources',
          item: `${SITE_URL}/resources`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: blog.title,
          item: `${SITE_URL}/resources/${blog.link}`,
        },
      ],
    },
  ];

  return (
    <main className='min-h-screen bg-muted pb-24'>
      <JsonLd data={structuredData} />

      {/* ── Article Header ───────────────────────────── */}
      <div className='relative flex min-h-[44vh] w-full flex-col justify-end overflow-hidden pb-12 pt-[80px] md:min-h-[52vh]'>
        <div className='absolute inset-0 z-0'>
          {isExternal ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={blog.image}
              alt={blog.title}
              className='h-full w-full object-cover'
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
          <div className='absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20' />
        </div>

        <div className='relative z-10 mx-auto w-full max-w-[1500px] px-6 pt-24 sm:px-10 lg:px-16'>
          <Link
            href='/resources'
            className='group mb-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.1em] text-parchment/70 transition-colors hover:text-accent'
          >
            <ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
            Back to Resources
          </Link>
          <h1 className='max-w-4xl text-3xl font-bold leading-tight tracking-tight text-parchment md:text-5xl lg:text-6xl'>
            {blog.title}
          </h1>
        </div>
      </div>

      {/* ── Main Content Area ────────────────────────── */}
      <div className='relative z-20 mx-auto -mt-8 max-w-[1500px] px-6 sm:px-10 lg:px-16'>
        <div className='flex flex-col gap-8 lg:flex-row lg:gap-12'>
          {/* ── Article Body ───────────────────────────── */}
          <div className='flex-1 lg:w-2/3'>
            <article className='border border-secondary/10 bg-background p-6 md:p-10 lg:p-12'>
              {/* Summary / Lead */}
              <div className='mb-10 border-b border-secondary/10 pb-10 text-lg font-light leading-relaxed text-muted-foreground md:text-xl'>
                {blog.summary}
              </div>

              {/* Dynamic Content */}
              <div className='prose prose-lg max-w-none'>
                {renderContent(blog.content)}
              </div>
            </article>
          </div>

          {/* ── Sidebar (Related Articles) ─────────────── */}
          <aside className='mt-8 w-full lg:mt-0 lg:w-1/3 lg:pt-12'>
            <div className='sticky top-24'>
              <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-xl font-bold tracking-tight text-secondary'>
                  Recent Articles
                </h2>
                <Link
                  href='/resources'
                  className='text-xs font-bold uppercase tracking-[0.12em] text-accent hover:underline'
                >
                  View all
                </Link>
              </div>

              <div className='flex flex-col gap-4'>
                {blogs
                  .filter((b) => b.link !== blog.link)
                  .slice(0, 3)
                  .map((recentBlog, idx) => {
                    const externalImg = recentBlog.image?.startsWith('http');
                    return (
                      <Link
                        key={idx}
                        href={`/resources/${recentBlog.link}`}
                        className='group flex overflow-hidden border border-secondary/10 bg-background transition-colors hover:border-accent/40'
                      >
                        <div className='relative w-32 shrink-0'>
                          {externalImg ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={recentBlog.image}
                              alt={recentBlog.title}
                              className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                            />
                          ) : (
                            <Image
                              src={`${recentBlog.image}`}
                              alt={recentBlog.title}
                              fill
                              className='object-cover transition-transform duration-500 group-hover:scale-105'
                            />
                          )}
                        </div>
                        <div className='flex flex-1 flex-col justify-center p-4'>
                          <h3 className='line-clamp-3 pr-2 text-sm font-bold tracking-tight text-secondary transition-colors group-hover:text-accent'>
                            {recentBlog.title}
                          </h3>
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
