import type { ReactNode } from 'react';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { LandingContainer, LandingTextLink } from '@/components/landing/presentation';
import { LandingLink } from '@/components/landing/landing-link';
import { Breadcrumbs, type Crumb } from '@/components/seo/breadcrumbs';
import { LastUpdated } from '@/components/seo/last-updated';
import { GuideContents, type GuideContentsItem } from './contents';

export const guideHeading = 'm-0 font-advisory-heading text-[28px] leading-[1.35] font-bold tracking-normal text-midnight min-[681px]:text-[32px]';
export const guideSubheading = 'm-0 font-advisory-heading text-[22px] leading-[1.45] font-bold tracking-normal text-midnight min-[681px]:text-[25px]';

export function GuideArticle({
  title, crumbs, intro, contents, children,
}: {
  title: string;
  crumbs: Crumb[];
  intro: ReactNode;
  contents: GuideContentsItem[];
  children: ReactNode;
}) {
  return (
    <>
      <header className='border-b border-advisory-rule bg-canvas py-10 min-[681px]:py-12 min-[1121px]:py-16'>
        <LandingContainer className='max-w-[1200px]'>
          <Breadcrumbs items={crumbs} tone='light' />
          <h1 className='mt-8 mb-0 max-w-[1050px] font-advisory-heading text-[clamp(34px,7vw,44px)] leading-[1.22] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(42px,4.5vw,56px)]'>
            {title}
          </h1>
          <p className='mt-6 mb-0 max-w-[850px] text-base leading-[1.85] text-ink min-[681px]:text-[18px]'>
            {intro}
          </p>
        </LandingContainer>
      </header>

      <LandingContainer className='grid max-w-[1200px] items-start gap-8 min-[681px]:gap-10 min-[1121px]:gap-16 min-[1121px]:grid-cols-[220px_minmax(0,1fr)] py-10 min-[681px]:py-12 min-[1121px]:py-16'>
        <GuideContents items={contents} />
        <article className='min-w-0 text-base leading-[1.85] text-ink min-[681px]:text-[17px]'>
          {children}
          <footer className='mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-advisory-rule pt-6 [&>p]:m-0 [&>p]:text-ink'>
            <LastUpdated />
            <LandingTextLink href='/guides' className='text-sm'>Back to all guides</LandingTextLink>
          </footer>
        </article>
      </LandingContainer>
    </>
  );
}

export function GuideFaqs({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section id='common-questions' aria-labelledby='common-questions-title' className='mt-12 scroll-mt-32 min-[681px]:mt-14'>
      <h2 id='common-questions-title' className={guideHeading}>Common questions</h2>
      <div className='mt-6 border-b border-advisory-rule'>
        {items.map(({ q, a }) => (
          <details key={q} className='group border-t border-advisory-rule'>
            <summary className='flex min-h-16 cursor-pointer list-none items-start justify-between gap-5 py-5 text-midnight transition-colors duration-200 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none [&::-webkit-details-marker]:hidden'>
              <span className='font-advisory-heading text-[20px] leading-[1.5] font-bold min-[681px]:text-[22px]'>{q}</span>
              <Plus aria-hidden='true' className='mt-1 size-5 shrink-0 text-gilt group-open:hidden' />
              <Minus aria-hidden='true' className='mt-1 hidden size-5 shrink-0 text-gilt group-open:block' />
            </summary>
            <p className='m-0 max-w-[75ch] pr-8 pb-6 leading-[1.85]'>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function GuideActions({ items }: { items: { href: string; title: string; detail: string }[] }) {
  return (
    <section id='next-steps' aria-labelledby='next-steps-title' className='mt-12 scroll-mt-32 min-[681px]:mt-14'>
      <h2 id='next-steps-title' className={guideHeading}>Your next step</h2>
      <div className='mt-6 grid gap-7 min-[681px]:grid-cols-2 min-[681px]:gap-8'>
        {items.map(({ href, title, detail }) => (
          <LandingLink key={href} href={href} className='group block border-t border-advisory-rule pt-5 text-midnight no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt'>
            <span className='flex items-start justify-between gap-4 font-advisory-heading text-[22px] leading-[1.45] font-bold transition-colors duration-200 group-hover:text-gilt motion-reduce:transition-none'>
              {title}<ArrowUpRight aria-hidden='true' className='mt-1 size-5 shrink-0 text-gilt' />
            </span>
            <span className='mt-3 block text-[15px] leading-[1.8] text-ink'>{detail}</span>
          </LandingLink>
        ))}
      </div>
    </section>
  );
}
