'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LandingTextLink } from '@/components/landing/presentation';
import { cn } from '@/lib/utils';

export type GuideContentsItem = { id: string; label: string };

export function GuideContents({ items }: { items: GuideContentsItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    let observer: IntersectionObserver | undefined;

    const observeSections = () => {
      observer?.disconnect();
      // A narrow reading line below the sticky navbar also handles long sections.
      const readingLine = Math.min(144, Math.floor(window.innerHeight * 0.3));
      const updateActiveSection = () => {
        let current = sections[0].id;
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= readingLine + 2) {
            current = section.id;
          } else {
            break;
          }
        }
        setActiveId(current);
      };

      observer = new IntersectionObserver(updateActiveSection, {
        rootMargin: `-${readingLine}px 0px -${Math.max(0, window.innerHeight - readingLine - 2)}px 0px`,
        threshold: 0,
      });
      sections.forEach((section) => observer?.observe(section));
      updateActiveSection();
    };

    observeSections();
    window.addEventListener('resize', observeSections, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', observeSections);
    };
  }, [items]);

  const links = (
    <ol className='m-0 list-none space-y-1 border-l border-advisory-rule p-0'>
      {items.map(({ id, label }) => (
        <li key={id}>
          <a
            href={`#${id}`}
            aria-current={activeId === id ? 'location' : undefined}
            className={cn(
              '-ml-px block border-l-2 py-2 pl-4 text-sm leading-[1.6] no-underline transition-colors duration-200 hover:border-gilt hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none',
              activeId === id
                ? 'border-gilt font-semibold text-midnight'
                : 'border-transparent text-ink',
            )}
          >
            {label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <aside className='min-w-0 min-[1121px]:sticky min-[1121px]:top-32'>
      <nav aria-label='Guide contents' className='hidden min-[1121px]:block'>
        <p className='mt-0 mb-4 font-advisory-heading text-xl font-bold text-midnight'>In this guide</p>
        {links}
        <LandingTextLink href='/guides' className='mt-6 inline-block text-sm'>All guides</LandingTextLink>
      </nav>
      <details className='group border-y border-advisory-rule min-[1121px]:hidden'>
        <summary className='flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt [&::-webkit-details-marker]:hidden'>
          In this guide
          <ChevronDown aria-hidden='true' className='size-4 shrink-0 group-open:rotate-180' />
        </summary>
        <nav aria-label='Guide contents' className='pb-5'>{links}</nav>
      </details>
    </aside>
  );
}
