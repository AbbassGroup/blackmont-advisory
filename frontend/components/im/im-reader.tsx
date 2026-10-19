'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronRight, List, X } from 'lucide-react';
import { LandingTheme } from '@/components/landing/landing-theme';
import { landingFontVariables } from '@/components/landing/fonts';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet';
import { ImDocument, getNavItems } from './im-document';
import type { ImSection } from './types';
import type { ReportKind } from './report-kind';
import Link from 'next/link';

export function ImReader({
  sections,
  brokerEmail,
  kind = 'im',
}: {
  sections: ImSection[];
  brokerEmail?: string;
  kind?: ReportKind;
}) {
  const navItems = getNavItems(sections);
  const navKey = navItems.map((n) => n.id).join(',');
  const [activeId, setActiveId] = useState<string | undefined>(navItems[0]?.id);
  const [menuOpen, setMenuOpen] = useState(false);
  const visible = useRef<Record<string, boolean>>({});
  const activeLabel = navItems.find((n) => n.id === activeId)?.label;

  useEffect(() => {
    visible.current = {};
    const ids = navKey ? navKey.split(',') : [];
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visible.current[e.target.id] = e.isIntersecting;
        });
        const first = ids.find((id) => visible.current[id]);
        if (first) setActiveId(first);
      },
      { rootMargin: '-12% 0px -68% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [navKey]);

  const go = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    setActiveId(id);
  };

  const navClass = (id: string) => cn(
    'flex min-h-10 w-full items-center rounded-none px-3 py-2.5 text-left text-sm leading-[1.65] transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none',
    activeId === id ? 'bg-gilt/15 font-semibold text-midnight' : 'text-ink hover:bg-white hover:text-midnight',
  );

  return (
    <LandingTheme className='min-h-dvh bg-canvas text-sm min-[681px]:text-sm'>
      {navItems.length > 0 && (
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <div className='sticky top-0 z-30 border-b border-advisory-rule bg-white lg:hidden'>
            <SheetTrigger asChild>
              <button type='button' className='flex min-h-14 w-full items-center justify-between gap-3 px-5 py-3 text-midnight focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
                <span className='flex min-w-0 items-center gap-3'><List aria-hidden='true' className='size-4 shrink-0' /><span className='text-sm font-semibold'>Contents</span>{activeLabel && <span className='truncate text-xs text-ink'>{activeLabel}</span>}</span>
                <ChevronRight aria-hidden='true' className='size-4 shrink-0' />
              </button>
            </SheetTrigger>
          </div>
          <SheetContent side='left' showCloseButton={false} className={cn(landingFontVariables, 'flex flex-col gap-0 border-advisory-rule bg-white p-0 font-advisory-body text-sm text-ink data-[side=left]:w-[min(320px,90vw)]')}>
            <SheetHeader className='shrink-0 border-b border-advisory-rule p-5 pr-16'>
              <SheetTitle className='font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight'>Contents</SheetTitle>
              <SheetDescription className='sr-only'>Navigate the sections of this document.</SheetDescription>
            </SheetHeader>
            <SheetClose asChild><button type='button' aria-label='Close contents' className='absolute top-4 right-4 flex size-10 items-center justify-center text-midnight hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'><X aria-hidden='true' className='size-4' /></button></SheetClose>
            {kind === 'acquisition' && <Link href='/acquisition' className='mx-5 mt-5 inline-flex min-h-10 w-fit items-center gap-2 text-sm font-semibold text-midnight underline decoration-gilt underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt'><ArrowLeft aria-hidden='true' className='size-4' />Back to reports</Link>}
            <nav aria-label='Document contents' className='min-h-0 flex-1 overflow-y-auto overscroll-contain p-3'>
              <ul className='m-0 flex list-none flex-col gap-1 p-0'>{navItems.map((item) => <li key={item.id}><button type='button' aria-current={activeId === item.id ? 'location' : undefined} onClick={() => { go(item.id); setMenuOpen(false); }} className={navClass(item.id)}>{item.label}</button></li>)}</ul>
            </nav>
          </SheetContent>
        </Sheet>
      )}

      <div className='mx-auto flex w-full max-w-6xl items-start gap-8 py-0 min-[681px]:px-6 min-[681px]:py-8'>
        {navItems.length > 0 && (
          <nav aria-label='Document contents' className='sticky top-8 hidden max-h-[calc(100dvh-4rem)] w-56 shrink-0 flex-col gap-5 lg:flex'>
            {kind === 'acquisition' && <Link href='/acquisition' className='inline-flex min-h-10 w-fit items-center gap-2 text-sm font-semibold text-midnight underline decoration-gilt underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt'><ArrowLeft aria-hidden='true' className='size-4' />Back to reports</Link>}
            <h2 className='m-0 px-3 font-advisory-heading text-[21px] leading-[1.5] font-bold text-midnight'>Contents</h2>
            <ul className='m-0 flex min-h-0 flex-1 list-none flex-col gap-1 overflow-y-auto overscroll-contain p-0 pr-1'>{navItems.map((item) => <li key={item.id}><button type='button' aria-current={activeId === item.id ? 'location' : undefined} onClick={() => go(item.id)} className={navClass(item.id)}>{item.label}</button></li>)}</ul>
          </nav>
        )}
        <div className='min-w-0 flex-1 overflow-hidden bg-white font-sans text-base min-[681px]:border min-[681px]:border-advisory-rule'>
          <ImDocument sections={sections} editable={false} kind={kind} brokerEmail={brokerEmail} />
        </div>
      </div>
    </LandingTheme>
  );
}
