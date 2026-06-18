'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Linkedin, Instagram, Facebook } from 'lucide-react';

const companyLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
];

const expertiseLinks = [
  { label: 'For Business Owners', to: '/#selling' },
  { label: 'For Aspiring Acquirers', to: '/#buying' },
  { label: 'Our Network', to: '/#network' },
  { label: 'Why Blackmont', to: '/#why' },
  { label: 'Begin Confidentially', to: '/contact' },
];

const SUBSCRIBE_URL =
  'https://api.nexartechnologies.com/api/v1/subscribe/create';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) {
      setMsg('Please enter a valid email.');
      return;
    }
    try {
      setBusy(true);
      const res = await fetch(SUBSCRIBE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, businessUnit: 'Blackmont Advisory' }),
      });
      if (!res.ok) throw new Error();
      setEmail('');
      setMsg('Subscribed!');
    } catch {
      setMsg('Failed. Please try again.');
    } finally {
      setBusy(false);
      setTimeout(() => setMsg(''), 3500);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mt-3'>
      <div className='flex gap-2'>
        <Input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='h-10 flex-1 border-accent/20 bg-white/5 text-parchment placeholder:text-parchment/30 focus-visible:border-accent'
        />
        <Button
          type='submit'
          disabled={busy}
          className='h-10 shrink-0 cursor-pointer bg-accent px-4 font-bold text-primary hover:bg-accent-light'
        >
          {busy ? '...' : 'Go'}
        </Button>
      </div>
      {msg && <p className='mt-2 text-xs text-parchment/60'>{msg}</p>}
    </form>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <h3 className='mb-4 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-accent'>
        {title}
      </h3>
      <ul className='space-y-2.5'>
        {links.map(({ label, to }) => (
          <li key={label}>
            <Link
              href={to}
              className='text-sm text-parchment/55 transition-colors hover:text-accent'
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className='border-t-2 border-accent bg-secondary pt-16 text-parchment'>
      <div className='mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16'>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8'>
          {/* Logo + Brand */}
          <div className='flex flex-col items-start gap-4 lg:col-span-4'>
            <div className='flex items-center gap-3'>
              <Image
                unoptimized
                loading='eager'
                src='/assets/logo.png'
                alt='Blackmont Advisory'
                width={48}
                height={48}
                className='h-12 w-12'
              />
              <div className='flex flex-col leading-none'>
                <span className='text-xl font-bold uppercase tracking-[0.06em] text-parchment'>
                  Blackmont
                </span>
                <span className='mt-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-parchment/45'>
                  Advisory
                </span>
              </div>
            </div>
            <p className='max-w-xs text-sm leading-relaxed text-parchment/55'>
              We represent business owners seeking a premium exit, and act as
              exclusive buyer advocates for those looking to acquire.
            </p>
            <div className='flex gap-3'>
              {[
                {
                  Icon: Linkedin,
                  href: 'https://www.linkedin.com/company/blackmontadvisory',
                  label: 'LinkedIn',
                },
                {
                  Icon: Instagram,
                  href: 'https://www.instagram.com/blackmontadvisory',
                  label: 'Instagram',
                },
                {
                  Icon: Facebook,
                  href: 'https://www.facebook.com/blackmontadvisory',
                  label: 'Facebook',
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='flex h-10 w-10 items-center justify-center border border-accent/25 text-accent transition-colors hover:bg-accent hover:text-primary'
                >
                  <Icon className='h-4 w-4' />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className='lg:col-span-2'>
            <FooterColumn title='Company' links={companyLinks} />
          </div>

          {/* Expertise */}
          <div className='lg:col-span-3'>
            <FooterColumn title='Expertise' links={expertiseLinks} />
          </div>

          {/* Contact + Newsletter */}
          <div className='lg:col-span-3'>
            <h3 className='mb-4 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-accent'>
              Get in touch
            </h3>
            <ul className='space-y-2.5 text-sm text-parchment/55'>
              <li>
                <a
                  href='mailto:info@blackmontadvisory.com'
                  className='transition-colors hover:text-accent'
                >
                  info@blackmontadvisory.com
                </a>
              </li>
              <li>Australia, with global reach</li>
            </ul>

            <h3 className='mb-2 mt-7 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-accent'>
              Newsletter
            </h3>
            <p className='text-xs text-parchment/40'>
              Occasional market insights and opportunities.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className='mt-14 border-t border-parchment/10'>
        <div className='mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row sm:px-10 lg:px-16'>
          <p className='text-xs tracking-[0.04em] text-parchment/35'>
            © {new Date().getFullYear()} Blackmont Advisory. All rights
            reserved. Confidential.
          </p>
          <div className='flex gap-6'>
            <Link
              href='/terms-and-conditions'
              className='text-xs uppercase tracking-[0.1em] text-parchment/40 transition-colors hover:text-accent'
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href='/privacy'
              className='text-xs uppercase tracking-[0.1em] text-parchment/40 transition-colors hover:text-accent'
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
