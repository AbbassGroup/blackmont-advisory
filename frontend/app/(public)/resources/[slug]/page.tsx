import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  fetchPublicBlog,
  fetchPublicBlogs,
  fetchPublicRelatedBlogs,
  fetchAllPublicBlogSlugs,
  clampHeadings,
  blogPageTitle,
  blogAuthor,
  type Blog,
} from '@/lib/blogs';
import { authorPath } from '@/lib/authors';
import { faqJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { BlogFaqs, BlogKeyTakeaways } from '../_components/blog-answers';
import { BlogAuthorBox } from '../_components/blog-author-box';
import { landingFontVariables } from '@/components/landing/fonts';

const SITE_URL = 'https://blackmontadvisory.com';

const ORGANIZATION_REF = { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Blackmont Advisory' };

/** "12 March 2026", in Melbourne time so the date doesn't shift with the server's zone. */
function displayDate(value: string): string | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Melbourne' });
}

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
  'font-advisory-body text-base leading-[1.8] text-ink md:text-[17px]',
  '[&>*:first-child]:mt-0',
  '[&_:is(h1,h2,h3,h4,h5,h6)]:font-advisory-heading [&_:is(h1,h2,h3,h4,h5,h6)]:font-bold [&_:is(h1,h2,h3,h4,h5,h6)]:tracking-normal [&_:is(h1,h2,h3,h4,h5,h6)]:text-midnight',
  '[&_h1]:mb-4 [&_h1]:mt-10 [&_h1]:text-[28px] [&_h1]:leading-[1.35] md:[&_h1]:text-[32px]',
  '[&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-[25px] [&_h2]:leading-[1.4] md:[&_h2]:text-[28px]',
  '[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-[21px] [&_h3]:leading-[1.4] md:[&_h3]:text-[23px]',
  '[&_h4]:mb-3 [&_h4]:mt-6 [&_h4]:text-[19px] [&_h4]:leading-[1.45] md:[&_h4]:text-xl',
  '[&_h5]:mb-3 [&_h5]:mt-6 [&_h5]:text-lg [&_h5]:leading-[1.5]',
  '[&_h6]:mb-3 [&_h6]:mt-6 [&_h6]:text-base [&_h6]:leading-[1.5]',
  '[&_p]:mb-6 [&_p]:leading-[1.8] [&_p]:text-ink',
  '[&_strong]:font-bold [&_strong]:text-midnight',
  // `list-outside`, not `list-inside`: the editor stores list items as
  // <li><p>…</p></li>, and an inside marker sits inline with the first *inline*
  // content — so a block-level <p> pushes the bullet onto its own line. An
  // outside marker sits in the gutter and works for both that shape and the
  // bare <li>text</li> the imported articles use.
  '[&_ul]:mb-6 [&_ul]:list-outside [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-ink [&_ul]:marker:text-gilt',
  '[&_ol]:mb-6 [&_ol]:list-outside [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:text-ink [&_ol]:marker:text-midnight',
  '[&_li]:leading-[1.8]',
  // Paragraphs inside a list item must not carry the body paragraph's margin,
  // or every bullet gains a gap the authored content never asked for.
  '[&_li_p]:mb-0',
  // `[&_a:hover]` targets the link's own hover. `hover:[&_a]` would instead fire
  // when the article body is hovered, restyling every link at once.
  '[&_a]:text-midnight [&_a]:underline [&_a]:decoration-gilt [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-gilt [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-3 [&_a:focus-visible]:outline-gilt motion-reduce:[&_a]:transition-none',
  '[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:font-advisory-heading [&_blockquote]:text-lg [&_blockquote]:leading-[1.75] [&_blockquote]:italic [&_blockquote]:text-ink',
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

  // Without an image of its own the article keeps the site-wide share image —
  // omitting `images` here would leave share cards with no picture at all, since
  // the root layout's openGraph/twitter are replaced, not merged.
  const images = blog.image
    ? [{ url: blog.image, width: 1200, height: 630, alt: blog.imageAlt || blog.title }]
    : [{ url: '/assets/blackmont-og.png', width: 1200, height: 630, alt: 'Blackmont Advisory' }];

  return {
    title: blogPageTitle(blog),
    description: blog.metaDescription,
    alternates: { canonical: `/resources/${blog.url}` },
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      url: `/resources/${blog.url}`,
      siteName: 'Blackmont Advisory',
      locale: 'en_AU',
      type: 'article',
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      section: blog.category || undefined,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.metaDescription,
      images: images.map((image) => image.url),
    },
  };
}

/**
 * Three articles on the same topic for the sidebar. Falls back to the latest
 * articles if the related endpoint fails — e.g. a frontend deployed ahead of
 * the API that serves it.
 */
async function fetchRelated(currentSlug: string): Promise<Blog[]> {
  try {
    return await fetchPublicRelatedBlogs(currentSlug, { limit: 3 });
  } catch {
    try {
      const { blogs } = await fetchPublicBlogs({ page: 1, limit: 4 });
      return blogs.filter((b) => b.url !== currentSlug).slice(0, 3);
    } catch {
      return [];
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const blog = await fetchPublicBlog(slug);
  if (!blog) notFound();

  const related = await fetchRelated(blog.url ?? slug);

  const author = blogAuthor(blog);
  const published = displayDate(blog.createdAt);
  const updated = displayDate(blog.updatedAt);
  const keyTakeaways = blog.keyTakeaways ?? [];
  const faqs = blog.faqs ?? [];
  const keywords = [
    ...new Set([blog.focusKeyword, ...(blog.keywords ?? [])].filter(Boolean)),
  ];

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
      articleSection: blog.category || undefined,
      keywords: keywords.length ? keywords.join(', ') : undefined,
      // A named expert when one is set, else the firm. `@id`s tie these to the
      // full entities emitted by the profile page and the public layout.
      author: author
        ? {
            '@type': 'Person',
            '@id': `${SITE_URL}${authorPath(author)}#person`,
            name: author.name,
            url: `${SITE_URL}${authorPath(author)}`,
            jobTitle: author.role || undefined,
            sameAs: author.linkedin ? [author.linkedin] : undefined,
          }
        : ORGANIZATION_REF,
      publisher: ORGANIZATION_REF,
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
    // Only when the FAQ is actually rendered below — structured data must
    // match visible content.
    ...(faqs.length
      ? [faqJsonLd(faqs.map(({ question, answer }) => ({ q: question, a: answer })))]
      : []),
  ];

  return (
    <div className={`${landingFontVariables} min-h-screen bg-white pb-14 min-[681px]:pb-16 min-[1121px]:pb-20 font-advisory-body text-ink`}>
      <JsonLd data={structuredData} />

      {/* ── Article Header ───────────────────────────── */}
      <div className='relative flex min-h-[44vh] w-full flex-col justify-end overflow-hidden py-12 min-[681px]:py-14 min-[931px]:py-16 min-[1121px]:py-20 md:min-h-[52vh]'>
        <div className='absolute inset-0 z-0'>
          {blog.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={blog.image}
              alt={blog.imageAlt || blog.title}
              className='h-full w-full object-cover'
            />
          )}
          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20' />
        </div>

        <div className='relative z-10 mx-auto w-[calc(100%_-_40px)] max-w-advisory min-[681px]:w-[calc(100%_-_72px)] min-[1121px]:w-[calc(100%_-_104px)]'>
          <Link
            href='/resources'
            className='group mb-6 inline-flex items-center text-[15px] font-semibold tracking-normal text-parchment transition-colors hover:text-accent'
          >
            <ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
            Back to Resources
          </Link>
          <h1 className='max-w-4xl font-advisory-heading text-[32px] leading-[1.25] font-bold tracking-normal text-parchment md:text-[42px] lg:text-[50px]'>
            {blog.title}
          </h1>
          <p className='m-0 mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] leading-[1.6] text-parchment/90'>
            <span>
              By{' '}
              {author ? (
                <Link href={authorPath(author)} className='font-semibold text-parchment underline decoration-accent underline-offset-4 hover:text-accent'>
                  {author.name}
                </Link>
              ) : (
                <span className='font-semibold text-parchment'>Blackmont Advisory</span>
              )}
            </span>
            {published && (
              <>
                <span aria-hidden='true'>·</span>
                <span>Published <time dateTime={blog.createdAt}>{published}</time></span>
              </>
            )}
            {updated && updated !== published && (
              <>
                <span aria-hidden='true'>·</span>
                <span>Updated <time dateTime={blog.updatedAt}>{updated}</time></span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* ── Main Content Area ────────────────────────── */}
      <div className='relative z-20 mx-auto -mt-8 w-[calc(100%_-_40px)] max-w-advisory min-[681px]:w-[calc(100%_-_72px)] min-[1121px]:w-[calc(100%_-_104px)]'>
        <div className='gap-8 min-[681px]:gap-10 min-[1121px]:gap-16 flex flex-col lg:flex-row'>
          {/* ── Article Body ───────────────────────────── */}
          <div className='flex-1 lg:w-2/3'>
            <article className='border border-secondary/10 bg-white p-6 min-[681px]:p-8'>
              {/* Summary / Lead */}
              {blog.metaDescription && (
                <div className='mb-10 border-b border-secondary/10 pb-10 text-lg leading-[1.8] font-normal text-ink md:text-[19px]'>
                  {blog.metaDescription}
                </div>
              )}

              {keyTakeaways.length > 0 && <BlogKeyTakeaways items={keyTakeaways} />}

              {/* Article body, authored in the admin editor. Any h1 in it is
                  demoted so the title above stays the page's only h1. */}
              <div
                className={ARTICLE_CLASS}
                dangerouslySetInnerHTML={{ __html: clampHeadings(blog.content) }}
              />

              {faqs.length > 0 && <BlogFaqs items={faqs} />}

              {author && <BlogAuthorBox author={author} />}
            </article>
          </div>

          {/* ── Sidebar (Related Articles) ─────────────── */}
          {related.length > 0 && (
            <aside className='w-full lg:w-1/3 lg:pt-8'>
              <div className='sticky top-24'>
                <div className='mb-6 flex items-center justify-between'>
                  <h2 className='font-advisory-heading text-[23px] leading-[1.4] font-bold tracking-normal text-midnight'>
                    Related Articles
                  </h2>
                  <Link
                    href='/resources'
                    className='text-sm font-bold tracking-normal text-midnight hover:text-gilt hover:underline'
                  >
                    View all
                  </Link>
                </div>

                <div className='flex flex-col gap-4'>
                  {related.map((item) => (
                    <Link
                      key={item._id}
                      href={`/resources/${item.url}`}
                      className='group flex overflow-hidden border border-secondary/10 bg-white transition-colors hover:border-accent/40'
                    >
                      <div className='relative w-32 shrink-0 bg-white'>
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
                        <h3 className='line-clamp-3 pr-2 font-advisory-heading text-base leading-[1.5] font-bold tracking-normal text-midnight transition-colors group-hover:text-accent'>
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
    </div>
  );
}
