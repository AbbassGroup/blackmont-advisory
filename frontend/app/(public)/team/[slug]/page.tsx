import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { LandingContainer, LandingTextLink } from '@/components/landing/presentation';
import { SITE_URL, breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import { authorPath, bioParagraphs, fetchPublicAuthor, fetchPublicAuthors } from '@/lib/authors';
import { fetchPublicBlogs, type Blog } from '@/lib/blogs';
import { BlogCard } from '../../resources/_components/blog-card';
import { AuthorPhoto } from '../_components/author-photo';

type AuthorPageProps = { params: Promise<{ slug: string }> };

/** Prerender known profiles; ones added later render on demand. */
export async function generateStaticParams() {
  try {
    const authors = await fetchPublicAuthors();
    return authors.map(({ slug }) => ({ slug }));
  } catch (error) {
    console.error('Failed to list authors for prerendering:', error);
    return [];
  }
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await fetchPublicAuthor(slug).catch(() => null);
  if (!author) return { title: 'Not Found' };

  const intro = bioParagraphs(author.bio)[0];
  return buildMetadata({
    path: authorPath(author),
    title: `${author.name}${author.role ? `, ${author.role}` : ''} | Blackmont Advisory`,
    description: (intro || `${author.name} writes about buying and selling businesses for Blackmont Advisory.`).slice(0, 160),
  });
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await fetchPublicAuthor(slug);
  if (!author) notFound();

  const articles: Blog[] = await fetchPublicBlogs({ author: author._id, limit: 50 })
    .then(({ blogs }) => blogs)
    .catch(() => []);

  const path = authorPath(author);
  const crumbs = [
    { name: 'Home', path: '' },
    { name: 'Our Advisers', path: '/team' },
    { name: author.name, path },
  ];

  const jsonLd = [
    breadcrumbJsonLd(crumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url: `${SITE_URL}${path}`,
      mainEntity: {
        '@type': 'Person',
        // Same `@id` the articles use for their author, so they resolve to this entity.
        '@id': `${SITE_URL}${path}#person`,
        name: author.name,
        url: `${SITE_URL}${path}`,
        jobTitle: author.role || undefined,
        description: bioParagraphs(author.bio)[0] || undefined,
        image: author.photo || undefined,
        hasCredential: author.credentials.length
          ? author.credentials.map((name) => ({ '@type': 'EducationalOccupationalCredential', name }))
          : undefined,
        sameAs: author.linkedin ? [author.linkedin] : undefined,
        worksFor: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Blackmont Advisory' },
      },
    },
  ];

  return (
    <div className='min-h-screen bg-white pb-16 min-[1121px]:pb-20'>
      <JsonLd data={jsonLd} />
      <section aria-labelledby='author-name' className='bg-canvas py-12 min-[681px]:py-14 min-[1121px]:py-20'>
        <LandingContainer>
          <Breadcrumbs items={crumbs} tone='light' />
          <div className='mt-8 flex flex-col gap-8 min-[681px]:flex-row min-[681px]:items-start'>
            <AuthorPhoto src={author.photo} eager className='size-36 min-[681px]:size-44' />
            <div className='min-w-0 max-w-[720px]'>
              <h1 id='author-name' className='m-0 font-advisory-heading text-[clamp(34px,7vw,52px)] leading-[1.18] font-bold tracking-normal text-midnight'>
                {author.name}
              </h1>
              {author.role && <p className='m-0 mt-2 text-lg leading-[1.6] text-ink'>{author.role}</p>}
              {author.credentials.length > 0 && (
                <ul aria-label='Credentials' className='m-0 mt-5 flex list-none flex-wrap gap-2 p-0'>
                  {author.credentials.map((credential) => (
                    <li key={credential} className='bg-white px-3 py-1.5 text-sm leading-[1.5] text-midnight'>{credential}</li>
                  ))}
                </ul>
              )}
              <div className='mt-6 flex flex-col gap-4 text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>
                {bioParagraphs(author.bio).map((paragraph) => <p key={paragraph} className='m-0'>{paragraph}</p>)}
              </div>
              {author.linkedin && (
                <LandingTextLink href={author.linkedin} target='_blank' rel='noopener noreferrer' className='mt-6 inline-flex min-h-11 items-center'>
                  Connect on LinkedIn<span className='sr-only'> (opens in a new tab)</span>
                </LandingTextLink>
              )}
            </div>
          </div>
        </LandingContainer>
      </section>

      <LandingContainer className='mt-12 min-[681px]:mt-14'>
        <h2 className='m-0 mb-6 font-advisory-heading text-[28px] leading-[1.35] font-bold tracking-normal text-midnight'>
          Articles by {author.name}
        </h2>
        {articles.length ? (
          <div className='grid grid-cols-1 gap-6 min-[681px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1280px]:grid-cols-4'>
            {articles.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
          </div>
        ) : (
          <p className='m-0 text-base leading-[1.75] text-ink'>
            No articles yet. <LandingTextLink href='/resources'>Browse all resources</LandingTextLink>
          </p>
        )}
      </LandingContainer>
    </div>
  );
}
