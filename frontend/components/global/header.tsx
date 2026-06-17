'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Listings', path: '/listings' },
  { label: 'Resources', path: '/resources' },
  { label: 'Buy a Business', path: '/buy-a-business' },
  { label: 'About', path: '/about' },
  { label: 'Agents', path: '/agents' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) return null;

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  const navClass = [
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
    scrolled
      ? 'bg-[rgba(28,36,52,0.97)] backdrop-blur-[10px] shadow-[0_2px_16px_rgba(0,0,0,0.15)]'
      : 'bg-gradient-to-b from-black/30 to-transparent',
  ].join(' ');

  return (
    <header className={navClass}>
      <div className='flex justify-between items-center h-[80px] px-4 md:px-6 max-w-[1500px] mx-auto'>
        {/* Logo */}
        <Link href='/' className='flex items-center shrink-0'>
          <Image
            src='/businessbrokers/logo-text.webp'
            alt='ABBASS Business Brokers'
            width={180}
            height={60}
            className={`w-auto transition-all duration-300 ${scrolled ? 'h-[52px]' : 'h-[62px]'}`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden lg:flex items-center justify-end grow'>
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                className={[
                  'px-5 py-2 font-medium tracking-wide transition-all duration-200 relative whitespace-nowrap',
                  active
                    ? 'text-brand-primary font-semibold after:absolute after:-bottom-[2px] after:left-3 after:right-3 after:h-[2px] after:bg-brand-primary after:rounded-full'
                    : 'text-white/90 hover:text-white',
                ].join(' ')}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Nav */}
        <div className='lg:hidden flex items-center'>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='text-white hover:bg-white/10'
              >
                <Menu className='h-6 w-6' />
                <span className='sr-only'>Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='bg-[rgba(28,36,52,0.99)] border-white/10 text-white p-6 pt-16 w-[280px]'
            >
              <nav className='flex flex-col space-y-1'>
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={[
                        'px-4 py-3 rounded-lg text-base font-medium transition-colors',
                        active
                          ? 'bg-brand-primary/15 text-brand-primary font-semibold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white',
                      ].join(' ')}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
