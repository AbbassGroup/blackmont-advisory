import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { LandingContainer } from '@/components/landing/presentation';
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from '@/lib/seo';
import { authorPath, fetchPublicAuthors, type Author } from '@/lib/authors';
import { AuthorPhoto } from './_components/author-photo';

const TITLE = 'Our Advisers';
const DESCRIPTION =
  'Meet the Blackmont Advisory brokers and M&A advisers behind our guides and articles on buying and selling businesses in Australia.';

export const metadata: Metadata = buildMetadata({
  path: '/team',
  title: `${TITLE} | Blackmont Advisory`,
  description: DESCRIPTION,
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: TITLE, path: '/team' },
];

export default async function TeamPage() {
  // An API outage shows the empty state rather than failing the page.
  const authors: Author[] = await fetchPublicAuthors().catch(() => []);

  const jsonLd = [
    breadcrumbJsonLd(CRUMBS),
    ...(authors.length
      ? [itemListJsonLd(TITLE, authors.map((a) => ({ name: a.name, description: a.role, path: authorPath(a) })))]
      : []),
  ];

  return (
    <div className='min-h-screen bg-white pb-16 min-[1121px]:pb-20'>
      <JsonLd data={jsonLd} />
      <section aria-labelledby='team-title' className='bg-canvas py-12 min-[681px]:py-14 min-[1121px]:py-20'>
        <LandingContainer>
          <Breadcrumbs items={CRUMBS} tone='light' />
          <h1 id='team-title' className='m-0 mt-8 mb-5 font-advisory-heading text-[clamp(36px,8vw,56px)] leading-[1.18] font-bold tracking-normal text-midnight'>
            {TITLE}
          </h1>
          <p className='m-0 max-w-[620px] text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>{DESCRIPTION}</p>
        </LandingContainer>
      </section>

      <LandingContainer className='mt-12 min-[681px]:mt-14'>
        {authors.length ? (
          <ul className='m-0 grid list-none grid-cols-1 gap-6 p-0 min-[681px]:grid-cols-2 min-[1024px]:grid-cols-3'>
            {authors.map((author) => (
              <li key={author._id}>
                <Link href={authorPath(author)} className='group flex h-full items-start gap-5 border border-advisory-rule p-6 text-midnight no-underline transition-colors duration-200 hover:border-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'>
                  <AuthorPhoto src={author.photo} className='size-20' />
                  <span className='min-w-0'>
                    <span className='block font-advisory-heading text-[20px] leading-[1.4] font-bold transition-colors group-hover:text-gilt'>{author.name}</span>
                    {author.role && <span className='mt-1 block text-sm leading-[1.6] text-ink'>{author.role}</span>}
                    {author.credentials[0] && <span className='mt-3 block text-xs leading-[1.6] text-ink'>{author.credentials[0]}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className='m-0 text-base leading-[1.75] text-ink'>Adviser profiles are coming soon.</p>
        )}
      </LandingContainer>
    </div>
  );
}
