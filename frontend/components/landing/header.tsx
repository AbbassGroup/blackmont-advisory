'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { LandingLink } from './landing-link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LandingBrand } from './brand';
import { LandingContainer } from './presentation';

const NAV_LINKS = [
  { label: 'Selling a business', href: '#selling' },
  { label: 'Buying a business', href: '#buying' },
  { label: 'Recent acquisitions', href: '#acquisitions' },
  { label: 'About us', href: '#about' },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const utilityRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const utility = utilityRef.current;
    if (!header || !utility) return;

    const measureUtility = () => {
      const utilityHeight = utility.getBoundingClientRect().height;
      header.style.setProperty('--landing-utility-height', `${utilityHeight}px`);
    };

    measureUtility();
    const observer = new ResizeObserver(measureUtility);
    observer.observe(utility);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 931px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target))
        setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className='sticky top-[calc(-1*var(--landing-utility-height,38px))] z-50 border-b border-white/15 bg-midnight text-white min-[681px]:top-[calc(-1*var(--landing-utility-height,43px))]'
    >
      <div ref={utilityRef} className='border-b border-white/[0.17] text-[10px] leading-[1.35] min-[681px]:text-xs'>
        <LandingContainer className='flex min-h-[37px] items-center justify-between gap-5 min-[681px]:min-h-[42px]'>
          <div className='flex flex-wrap items-center gap-x-[9px] min-[681px]:gap-x-[13px]'>
            <span>Melbourne, Australia</span>
            <span aria-hidden='true' className='text-gilt'>|</span>
            <a
              href='mailto:info@blackmontadvisory.com'
              className='hover:underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt'
            >
              info@blackmontadvisory.com
            </a>
          </div>
          <span className='hidden min-[931px]:inline'>
            Business agent licence: BLA 092153L
          </span>
        </LandingContainer>
      </div>
      <nav
        ref={navRef}
        aria-label='Main navigation'
        className='relative'
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
      >
        <LandingContainer className='flex min-h-[73px] items-center justify-between gap-2 min-[681px]:min-h-[78px] min-[681px]:gap-7 min-[931px]:min-h-[90px]'>
          <LandingBrand />
          <button
            ref={toggleRef}
            type='button'
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((previous) => !previous)}
            className='inline-flex size-11 shrink-0 cursor-pointer items-center justify-center bg-transparent text-white transition-colors duration-200 hover:bg-white/10 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none min-[931px]:hidden'
          >
            {open ? (
              <X size={24} strokeWidth={1.75} aria-hidden='true' />
            ) : (
              <Menu size={24} strokeWidth={1.75} aria-hidden='true' />
            )}
          </button>
          <div
            id={menuId}
            className={cn(
              'absolute inset-x-0 top-full z-40 hidden flex-col items-stretch border-t border-white/[0.18] bg-midnight px-[22px] pt-[15px] pb-6 min-[681px]:px-[max(36px,calc((100%_-_720px)/2))] min-[681px]:pb-[25px] min-[931px]:static min-[931px]:ml-auto min-[931px]:flex min-[931px]:flex-row min-[931px]:items-center min-[931px]:justify-end min-[931px]:gap-4 min-[931px]:border-0 min-[931px]:p-0 min-[1121px]:gap-[clamp(18px,2.1vw,31px)]',
              open && 'flex',
            )}
          >
            {NAV_LINKS.map((link) => (
              <LandingLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className='py-[13px] text-[15px] leading-[1.5] font-semibold whitespace-nowrap hover:underline hover:underline-offset-[6px] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt min-[931px]:py-0 min-[931px]:text-xs min-[1121px]:text-[15px] min-[1344px]:text-base'
              >
                {link.label}
              </LandingLink>
            ))}
            <LandingLink
              href='#contact'
              onClick={() => setOpen(false)}
              className='mt-3 inline-flex min-h-[47px] items-center justify-center bg-gilt px-5 py-[13px] text-[15px] leading-[1.5] font-semibold whitespace-nowrap text-midnight transition-colors duration-200 ease-out hover:bg-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none min-[931px]:mt-0 min-[931px]:px-[15px] min-[931px]:py-0 min-[931px]:text-xs min-[1121px]:px-5 min-[1121px]:text-[15px] min-[1344px]:text-base'
            >
              Talk to an advisor
            </LandingLink>
          </div>
        </LandingContainer>
      </nav>
    </header>
  );
}
