'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { LandingContainer } from '@/components/landing/presentation';
export type PageSection = { id: string; label: string };

/**
 * Sticky tab bar under the site header. Tabs are plain #anchor links (every
 * section is always in the page, which keeps all content crawlable); the
 * active tab follows the section in view.
 */
export function SectionNav({ sections }: { sections: readonly PageSection[] }) {
  const [active, setActive] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let frame = 0;

    // Active = the last section whose top has scrolled up to just below the
    // sticky tab bar. Anchor jumps land a section's top right under the bar,
    // so the clicked tab is always the one highlighted.
    const update = () => {
      frame = 0;
      const line = (navRef.current?.getBoundingClientRect().bottom ?? 0) + 48;
      let current: string | null = null;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // Scrolled to the very bottom: the last section can't reach the line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const lastId = sections[sections.length - 1]?.id;
      const last = lastId ? document.getElementById(lastId) : null;
      if (atBottom && last && last.getBoundingClientRect().top < window.innerHeight)
        current = lastId;
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sections]);

  // Keep the active tab visible when the bar scrolls sideways on small screens.
  useEffect(() => {
    const list = listRef.current;
    const tab = active && list?.querySelector<HTMLElement>(`[data-tab='${active}']`);
    if (!list || !tab) return;
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  return (
    <nav
      ref={navRef}
      aria-label='On this page'
      className='sticky top-[73px] z-40 border-b border-advisory-rule bg-white/95 backdrop-blur min-[681px]:top-[78px] min-[931px]:top-[90px]'
    >
      <LandingContainer>
        <ul
          ref={listRef}
          className='m-0 flex list-none gap-1 overflow-x-auto p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        >
          {sections.map(({ id, label }) => (
            <li key={id} className='shrink-0'>
              <a
                href={`#${id}`}
                data-tab={id}
                onClick={() => setActive(id)}
                aria-current={active === id ? 'location' : undefined}
                className={cn(
                  'inline-flex min-h-[52px] items-center border-b-2 border-transparent px-3 text-sm font-semibold whitespace-nowrap text-ink transition-colors duration-200 hover:text-midnight focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none min-[681px]:px-4 min-[681px]:text-[15px]',
                  active === id && 'border-gilt text-midnight',
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </LandingContainer>
    </nav>
  );
}
