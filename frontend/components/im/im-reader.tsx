'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronRight, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ImDocument, getNavItems } from './im-document';
import type { ImSection } from './types';

/**
 * Read-only presentation of a memorandum: a sticky section sidebar on the left
 * (scroll-spy — highlights the section in view, click to jump) and the document
 * flowing on the right. Used by the editor's Preview mode and the public viewer.
 */
export function ImReader({
  sections,
  brokerEmail,
}: {
  sections: ImSection[];
  brokerEmail?: string;
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
  };

  return (
    <>
      {/* Mobile contents — a slide-out sheet (the desktop sidebar is hidden below lg) */}
      {navItems.length > 0 && (
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <div className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur lg:hidden">
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-5 py-3"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <List className="h-4 w-4 shrink-0 text-brand-primary" />
                  <span className="text-sm font-semibold text-brand-black">Contents</span>
                  {activeLabel && (
                    <span className="truncate text-xs text-gray-400">· {activeLabel}</span>
                  )}
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
              </button>
            </SheetTrigger>
          </div>

          <SheetContent side="left" className="flex w-72 flex-col gap-0 p-0">
            <SheetHeader className="shrink-0 border-b border-gray-100">
              <SheetTitle>Contents</SheetTitle>
            </SheetHeader>
            <ul className="min-h-0 flex-1 space-y-0.5 overflow-y-auto overscroll-contain p-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      go(item.id);
                      setMenuOpen(false);
                    }}
                    className={cn(
                      'w-full rounded-lg px-3 py-2 text-left text-sm transition',
                      activeId === item.id
                        ? 'bg-brand-primary/10 font-semibold text-brand-primary'
                        : 'text-gray-600 hover:bg-gray-100',
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      )}

      <div className="mx-auto flex max-w-6xl gap-8 py-0 sm:px-4 sm:py-8">
        {navItems.length > 0 && (
          <nav className="sticky top-6 hidden max-h-[calc(100vh-4rem)] w-56 shrink-0 flex-col lg:flex">
            <p className="mb-3 shrink-0 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Contents
            </p>
            <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain pr-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className={cn(
                      'w-full rounded-lg px-3 py-2 text-left text-sm transition',
                      activeId === item.id
                        ? 'bg-brand-primary/10 font-semibold text-brand-primary'
                        : 'text-gray-600 hover:bg-gray-100',
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="min-w-0 flex-1">
          <div className="overflow-hidden bg-white sm:rounded-2xl sm:border sm:border-gray-100 sm:shadow-xs">
            <ImDocument sections={sections} editable={false} brokerEmail={brokerEmail} />
          </div>
        </div>
      </div>
    </>
  );
}
