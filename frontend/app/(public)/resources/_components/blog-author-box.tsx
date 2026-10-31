import Link from 'next/link';
import { UserRound } from 'lucide-react';
import { authorPath, bioParagraphs, type Author } from '@/lib/authors';

/** "About the author" panel closing an article — the visible half of the E-E-A-T signal. */
export function BlogAuthorBox({ author }: { author: Author }) {
  const intro = bioParagraphs(author.bio)[0];

  return (
    <section aria-labelledby='about-author-title' className='mt-12 flex flex-col gap-5 border-t border-secondary/10 pt-10 min-[681px]:flex-row'>
      <div className='flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-canvas'>
        {author.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={author.photo} alt='' loading='lazy' className='h-full w-full object-cover' />
        ) : (
          <UserRound aria-hidden='true' className='size-8 text-ink/50' />
        )}
      </div>
      <div className='min-w-0'>
        <p className='m-0 text-xs font-semibold tracking-wide text-ink uppercase'>About the author</p>
        <h2 id='about-author-title' className='m-0 mt-1 font-advisory-heading text-[22px] leading-[1.4] font-bold tracking-normal text-midnight'>
          <Link href={authorPath(author)} className='text-midnight no-underline hover:text-gilt hover:underline'>{author.name}</Link>
        </h2>
        {author.role && <p className='m-0 mt-1 text-sm text-ink'>{author.role}</p>}
        {author.credentials.length > 0 && (
          <ul className='m-0 mt-3 flex list-none flex-wrap gap-2 p-0'>
            {author.credentials.map((credential) => (
              <li key={credential} className='bg-canvas px-2.5 py-1 text-xs leading-[1.5] text-midnight'>{credential}</li>
            ))}
          </ul>
        )}
        {intro && <p className='m-0 mt-4 leading-[1.8] text-ink'>{intro}</p>}
        <Link href={authorPath(author)} className='mt-3 inline-block text-sm font-bold text-midnight underline decoration-gilt underline-offset-4 hover:text-gilt'>
          View profile and articles
        </Link>
      </div>
    </section>
  );
}
