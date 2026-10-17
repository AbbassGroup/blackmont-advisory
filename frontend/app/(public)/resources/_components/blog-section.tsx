import type { Blog } from '@/lib/blogs';
import { LandingTheme } from '@/components/landing/landing-theme';
import {
  LandingContainer,
  LandingSectionIntro,
  LandingTextLink,
} from '@/components/landing/presentation';
import { BlogCard } from './blog-card';
import { BlogPagination } from './blog-pagination';

export function BlogSection({
  blogs,
  page,
  totalPages,
  failed,
}: {
  blogs: Blog[];
  page: number;
  totalPages: number;
  failed: boolean;
}) {
  return (
    <LandingTheme className='bg-canvas'>
      <section
        id='articles'
        aria-labelledby='resources-articles-title'
        className='border-t border-advisory-rule py-[56px] min-[681px]:py-[80px]'
      >
        <LandingContainer>
          <LandingSectionIntro headingId='resources-articles-title' heading='Blogs' />
          {blogs.length > 0 ? (
            <>
              <div className='grid grid-cols-1 gap-6 min-[681px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1280px]:grid-cols-4'>
                {blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
              </div>
              <BlogPagination page={page} totalPages={totalPages} />
            </>
          ) : (
            <div className='border-t border-advisory-rule pt-6 text-base leading-[1.75] text-ink'>
              <p className='m-0'>
                {failed
                  ? 'Our articles are temporarily unavailable. Please check back shortly.'
                  : page > 1
                    ? 'There are no articles on this page.'
                    : 'No articles have been published yet.'}
              </p>
              {page > 1 && (
                <LandingTextLink href='/resources#articles' className='mt-4 inline-flex min-h-11 items-center'>
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
