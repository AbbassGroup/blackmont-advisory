import type { Blog } from '@/lib/blogs';
import { LandingTheme } from '@/components/landing/landing-theme';
import {
  LandingContainer,
  LandingSectionIntro,
  LandingTextLink,
} from '@/components/landing/presentation';
import { BlogCard } from './blog-card';
import { BlogPagination } from './blog-pagination';

/**
 * A paged grid of articles for one Resources tab. Blogs, guides and case
 * studies all use it; only the copy and the paging path differ.
 */
export function BlogSection({
  blogs,
  page,
  totalPages,
  failed,
  heading = 'Blogs',
  basePath = '/resources/blogs',
  noun = 'articles',
}: {
  blogs: Blog[];
  page: number;
  totalPages: number;
  failed: boolean;
  heading?: string;
  /** The tab's own URL, used for paging links. */
  basePath?: string;
  /** Plural used in the empty and error messages, e.g. "case studies". */
  noun?: string;
}) {
  return (
    <LandingTheme className='bg-canvas'>
      <section
        id='articles'
        aria-labelledby='resources-articles-title'
        className='py-14 min-[681px]:py-16 min-[1121px]:py-20'
      >
        <LandingContainer>
          <LandingSectionIntro headingId='resources-articles-title' heading={heading} />
          {blogs.length > 0 ? (
            <>
              <div className='grid grid-cols-1 gap-6 min-[681px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1280px]:grid-cols-4'>
                {blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
              </div>
              <BlogPagination page={page} totalPages={totalPages} basePath={basePath} label={`${heading} pagination`} />
            </>
          ) : (
            <div className='border-t border-advisory-rule pt-6 text-base leading-[1.75] text-ink'>
              <p className='m-0'>
                {failed
                  ? `Our ${noun} are temporarily unavailable. Please check back shortly.`
                  : page > 1
                    ? `There are no ${noun} on this page.`
                    : `No ${noun} found yet. Please check back soon.`}
              </p>
              {page > 1 && (
                <LandingTextLink href={`${basePath}#articles`} className='mt-4 inline-flex min-h-11 items-center'>
                  Back to the first page
                </LandingTextLink>
              )}
            </div>
          )}
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
