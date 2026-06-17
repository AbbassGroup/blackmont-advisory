'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  // { label: 'Listings', path: '/listings' },
  // { label: 'Buy a Business', path: '/buy-a-business' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function BrandLockup() {
  return (
    <Link
      href='/'
      className='flex items-center gap-3 shrink-0'
      aria-label='Blackmont Advisory home'
    >
      <span className='flex h-9 w-9 items-center justify-center border-[1.5px] border-accent'>
        <span className='text-[13px] font-bold tracking-[0.05em] text-accent'>
          BA
        </span>
      </span>
      <span className='flex flex-col leading-none'>
        <span className='text-[15px] font-bold uppercase tracking-[0.06em] text-parchment'>
          Blackmont
        </span>
        <span className='mt-0.5 text-[10px] font-normal uppercase tracking-[0.18em] text-parchment/45'>
          Advisory
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) return null;

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 w-full border-b border-accent/15 bg-secondary transition-shadow duration-300',
        scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.25)]' : '',
      ].join(' ')}
    >
      <div
        className={[
          'mx-auto flex max-w-[1500px] items-center justify-between px-6 transition-[height] duration-300 sm:px-10 lg:px-16',
          scrolled ? 'h-[60px]' : 'h-[72px]',
        ].join(' ')}
      >
        <BrandLockup />

        {/* Desktop nav */}
        <nav className='hidden items-center gap-8 lg:flex'>
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                className={[
                  'text-xs font-medium uppercase tracking-[0.1em] transition-colors',
                  active
                    ? 'text-accent'
                    : 'text-parchment/55 hover:text-accent',
                ].join(' ')}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className='flex items-center gap-3'>
          <Link
            href='/contact'
            className='hidden whitespace-nowrap bg-accent px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light sm:inline-block'
          >
            Begin Confidentially
          </Link>

          {/* Mobile nav */}
          <div className='lg:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-parchment hover:bg-white/10 hover:text-accent'
                >
                  <Menu className='h-6 w-6' />
                  <span className='sr-only'>Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side='right'
                className='w-[280px] border-accent/15 bg-secondary p-6 pt-16 text-parchment'
              >
                <SheetTitle className='sr-only'>Navigation menu</SheetTitle>
                <nav className='flex flex-col space-y-1'>
                  {NAV_LINKS.map((link) => {
                    const active = isActive(link.path);
                    return (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={[
                          'rounded-md px-4 py-3 text-sm font-medium uppercase tracking-[0.1em] transition-colors',
                          active
                            ? 'bg-accent/15 text-accent'
                            : 'text-parchment/70 hover:bg-white/10 hover:text-accent',
                        ].join(' ')}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  <Link
                    href='/contact'
                    onClick={() => setIsOpen(false)}
                    className='mt-4 bg-accent px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light'
                  >
                    Begin Confidentially
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
