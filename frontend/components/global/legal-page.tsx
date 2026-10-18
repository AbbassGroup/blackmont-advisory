'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LandingContainer } from '@/components/landing/presentation';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';

type LegalSection = {
  id: string;
  navLabel: string;
  heading: string;
  paragraphs: readonly string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  path: string;
  intro?: string;
  sections: readonly LegalSection[];
};

export function LegalPage({ title, description, path, intro, sections }: LegalPageProps) {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);
    let frame: number | null = null;

    const updateActiveSection = () => {
      let currentId = sections[0].id;
      for (const section of sectionElements) {
        if (section.getBoundingClientRect().top <= 160) currentId = section.id;
      }
      setActiveId(currentId);
    };

    const scheduleUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  const sectionLinks = sections.map((section) => (
    <a
      key={section.id}
      href={`#${section.id}`}
      aria-current={activeId === section.id ? 'location' : undefined}
      className={`-ml-px flex min-h-11 items-center border-l px-4 py-2.5 text-sm leading-[1.6] no-underline transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none ${
        activeId === section.id
          ? 'border-gilt bg-canvas font-semibold text-midnight'
          : 'border-transparent font-normal text-ink hover:bg-canvas hover:text-midnight'
      }`}
    >
      {section.navLabel}
    </a>
  ));

  return (
    <div className='bg-white'>
      <section aria-labelledby='legal-page-title' className='border-b border-advisory-rule bg-canvas py-9 min-[681px]:py-12'>
        <LandingContainer>
          <Breadcrumbs items={[{ name: 'Home', path: '' }, { name: title, path }]} tone='light' />
          <h1 id='legal-page-title' className='m-0 mt-7 font-advisory-heading text-[clamp(32px,6.5vw,44px)] leading-[1.25] font-bold tracking-normal text-midnight'>
            {title}
          </h1>
          <p className='m-0 mt-5 max-w-[760px] text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>
            {description}
          </p>
        </LandingContainer>
      </section>

      <LandingContainer className='grid items-start gap-8 py-9 min-[681px]:py-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14 min-[1280px]:gap-[72px]'>
        <aside className='min-w-0 lg:sticky lg:top-32 lg:max-h-[calc(100dvh-160px)] lg:overflow-y-auto lg:pr-2'>
          <details className='group border-y border-advisory-rule lg:hidden'>
            <summary className='flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-semibold text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt [&::-webkit-details-marker]:hidden'>
              On this page
              <ChevronDown aria-hidden className='size-4 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none' />
            </summary>
            <nav aria-label={`${title} sections`} className='mb-3 ml-px flex flex-col gap-1 border-l border-advisory-rule'>{sectionLinks}</nav>
          </details>
          <div className='hidden lg:block'>
            <h2 className='m-0 mb-4 font-advisory-heading text-xl leading-[1.4] font-bold tracking-normal text-midnight'>
              On this page
            </h2>
            <nav aria-label={`${title} sections`} className='ml-px flex flex-col gap-1 border-l border-advisory-rule'>{sectionLinks}</nav>
          </div>
        </aside>

        <article className='min-w-0 max-w-[800px]'>
          {intro && (
            <p className='m-0 mb-9 text-[17px] leading-[1.8] text-ink min-[681px]:mb-10 min-[681px]:text-lg'>
              {intro}
            </p>
          )}
          <div className='space-y-8 min-[681px]:space-y-10'>
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className='border-t border-advisory-rule pt-6 min-[681px]:pt-8'
              >
                <h2 id={`${section.id}-heading`} className='m-0 mb-4 font-advisory-heading text-[23px] leading-[1.4] font-bold tracking-normal text-midnight min-[681px]:text-[26px]'>
                  {section.heading.replace(/^\d+\.\s*/, '')}
                </h2>
                <div className='space-y-4 text-base leading-[1.85] text-ink min-[681px]:text-[17px]'>
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i} className='m-0 whitespace-pre-line'>
                      {paragraph.split('info@blackmontadvisory.com').map((part, partIndex) => (
                        <span key={partIndex}>
                          {partIndex > 0 && (
                            <a href='mailto:info@blackmontadvisory.com' className='break-words text-midnight underline decoration-gilt underline-offset-4 transition-colors duration-200 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none'>
                              info@blackmontadvisory.com
                            </a>
                          )}
                          {part}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </LandingContainer>
    </div>
  );
}
