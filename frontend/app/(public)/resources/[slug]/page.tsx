import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  fetchPublicBlog,
  fetchPublicBlogs,
  fetchAllPublicBlogSlugs,
  type Blog,
} from '@/lib/blogs';
import { JsonLd } from '@/components/seo/json-ld';

const SITE_URL = 'https://www.blackmontadvisory.com';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Styling for the stored article HTML.
 *
 * The body used to be a node tree with Tailwind classes applied per node; it's
 * now HTML from the API, so the same look is reproduced with child selectors on
 * the wrapper. Covers what the admin editor can emit — headings, lists, quotes,
 * links, images and rules — not just what the old static data happened to use.
 */
const ARTICLE_CLASS = [
  '[&>*:first-child]:mt-0',
  '[&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-secondary',
  '[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-secondary',
  '[&_h4]:mb-3 [&_h4]:mt-6 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-secondary',
  '[&_p]:mb-6 [&_p]:leading-relaxed [&_p]:text-muted-foreground',
  '[&_strong]:font-semibold [&_strong]:text-secondary',
  // `list-outside`, not `list-inside`: the editor stores list items as
  // <li><p>…</p></li>, and an inside marker sits inline with the first *inline*
  // content — so a block-level <p> pushes the bullet onto its own line. An
  // outside marker sits in the gutter and works for both that shape and the
  // bare <li>text</li> the imported articles use.
  '[&_ul]:mb-6 [&_ul]:list-outside [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_ul]:marker:text-accent',
  '[&_ol]:mb-6 [&_ol]:list-outside [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:text-muted-foreground [&_ol]:marker:text-accent',
  '[&_li]:leading-relaxed',
  // Paragraphs inside a list item must not carry the body paragraph's margin,
  // or every bullet gains a gap the authored content never asked for.
  '[&_li_p]:mb-0',
  // `[&_a:hover]` targets the link's own hover. `hover:[&_a]` would instead fire
  // when the article body is hovered, restyling every link at once.
  '[&_a]:text-accent [&_a]:underline [&_a]:transition-opacity [&_a:hover]:opacity-80',
  '[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground',
  '[&_img]:my-8 [&_img]:h-auto [&_img]:w-full',
  '[&_hr]:my-10 [&_hr]:border-secondary/10',
].join(' ');

/**
 * Prerender the articles that exist at build time. New ones published later
 * still work — Next renders them on demand — so a build isn't needed to publish.
 */
export async function generateStaticParams() {
  try {
    const slugs = await fetchAllPublicBlogSlugs();
    return slugs.map(({ url }) => ({ slug: url }));
  } catch (error) {
    // A blogs outage at build time shouldn't fail the build; every article just
    // renders on demand instead.
    console.error('Failed to list blog slugs for prerendering:', error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await fetchPublicBlog(slug).catch(() => null);

  if (!blog) return { title: 'Not Found' };

  return {
    title: `${blog.title} | Blackmont Advisory`,
    description: blog.metaDescription,
    alternates: { canonical: `/resources/${blog.url}` },
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      type: 'article',
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      ...(blog.image
        ? { images: [{ url: blog.image, width: 1200, height: 630, alt: blog.title }] }
        : {}),
    },
  };
}

/** Three other articles for the sidebar — ask for four in case one is this one. */
async function fetchRelated(currentSlug: string): Promise<Blog[]> {
  try {
    const { blogs } = await fetchPublicBlogs({ page: 1, limit: 4 });
    return blogs.filter((b) => b.url !== currentSlug).slice(0, 3);
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const blog = await fetchPublicBlog(slug);
  if (!blog) notFound();

  const related = await fetchRelated(blog.url ?? slug);

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.metaDescription,
      image: blog.image ?? undefined,
      url: `${SITE_URL}/resources/${blog.url}`,
      mainEntityOfPage: `${SITE_URL}/resources/${blog.url}`,
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt,
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
          item: `${SITE_URL}/resources/${blog.url}`,
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
          {blog.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={blog.image}
              alt={blog.title}
              className='h-full w-full object-cover'
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
              {blog.metaDescription && (
                <div className='mb-10 border-b border-secondary/10 pb-10 text-lg font-light leading-relaxed text-muted-foreground md:text-xl'>
                  {blog.metaDescription}
                </div>
              )}

              {/* Article body, authored in the admin editor */}
              <div
                className={ARTICLE_CLASS}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>
          </div>

          {/* ── Sidebar (Related Articles) ─────────────── */}
          {related.length > 0 && (
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
                  {related.map((item) => (
                    <Link
                      key={item._id}
                      href={`/resources/${item.url}`}
                      className='group flex overflow-hidden border border-secondary/10 bg-background transition-colors hover:border-accent/40'
                    >
                      <div className='relative w-32 shrink-0 bg-muted'>
                        {item.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.image}
                            alt={item.title}
                            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                          />
                        )}
                      </div>
                      <div className='flex flex-1 flex-col justify-center p-4'>
                        <h3 className='line-clamp-3 pr-2 text-sm font-bold tracking-tight text-secondary transition-colors group-hover:text-accent'>
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
