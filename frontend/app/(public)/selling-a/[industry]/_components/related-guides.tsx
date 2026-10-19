import { ArrowUpRight } from 'lucide-react';
import {
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';
import { LandingLink } from '@/components/landing/landing-link';
import { LastUpdated } from '@/components/seo/last-updated';
import type { Guide } from '@/lib/data/guides';

type RelatedGuidesProps = {
  industries: { slug: string; title: string; multiple: string }[];
  guides: Pick<Guide, 'slug' | 'h1' | 'summary'>[];
};

export function IndustryRelatedGuides({ industries, guides }: RelatedGuidesProps) {
  return (
    <div className='bg-white text-ink py-14 min-[681px]:py-16 min-[1121px]:py-20'>
      <LandingContainer>
        {industries.length > 0 && (
          <section aria-labelledby='related-industries-title'>
            <h2
              id='related-industries-title'
              className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
            >
              Other industry guides
            </h2>
            <ul role='list' className='m-0 mt-8 grid list-none gap-x-8 gap-y-6 p-0 min-[681px]:grid-cols-2 min-[1121px]:grid-cols-3 min-[1121px]:gap-x-10'>
              {industries.map(({ slug, title, multiple }) => (
                <li key={slug} className='min-w-0'>
                  <LandingLink
                    href={`/selling-a/${slug}`}
                    className='group flex h-full flex-col border-t border-advisory-rule pt-4 text-midnight no-underline transition-colors duration-200 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt motion-reduce:transition-none'
                  >
                    <span className='font-advisory-heading text-[20px] leading-[1.4] font-bold'>{title}</span>
                    <span className='mt-auto flex items-center justify-between gap-4 pt-3 text-[15px] leading-relaxed text-ink'>
                      {multiple}
                      <ArrowUpRight aria-hidden='true' className='size-4 shrink-0 text-gilt' />
                    </span>
                  </LandingLink>
                </li>
              ))}
            </ul>
            <LandingTextLink href='/selling-a' className='mt-7 inline-flex min-h-11 items-center'>
              See all industries and multiples
            </LandingTextLink>
          </section>
        )}

        {guides.length > 0 && (
          <section
            aria-labelledby='before-selling-guides-title'
            className={industries.length ? 'mt-10 border-t border-advisory-rule pt-10' : undefined}
          >
            <h2
              id='before-selling-guides-title'
              className='m-0 font-advisory-heading text-[29px] leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:text-[34px]'
            >
              Before you sell
            </h2>
            <ul role='list' className='m-0 mt-6 grid list-none gap-7 p-0 min-[931px]:grid-cols-3 min-[931px]:gap-10'>
              {guides.map(({ slug, h1, summary }) => (
                <li key={slug}>
                  <LandingTextLink
                    href={`/guides/${slug}`}
                    className='inline-flex min-h-11 items-start gap-3 font-advisory-heading text-[21px] leading-[1.45] no-underline'
                  >
                    {h1}
                    <ArrowUpRight aria-hidden='true' className='mt-1.5 size-4 shrink-0 text-gilt' />
                  </LandingTextLink>
                  <p className='mt-3 mb-0 text-[15px] leading-[1.8]'>{summary}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className='mt-10 border-t border-advisory-rule pt-5 [&>p]:m-0 [&>p]:text-ink'>
          <LastUpdated />
        </div>
      </LandingContainer>
    </div>
  );
}
