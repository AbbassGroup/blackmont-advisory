'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Listings', to: '/listings' },
  { label: 'Buy a Business', to: '/buy-a-business' },
  { label: 'About', to: '/about' },
  { label: 'Agents', to: '/agents' },
  { label: 'Careers', to: '/careers' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
];

const locationLinks = [
  'Melbourne',
  'Sydney',
  'Brisbane',
  'Hobart',
  'Adelaide',
  'Perth',
].map((c) => ({ label: `Business Brokers ${c}`, to: '/contact' }));

const buyLinks = [
  { label: 'Buy Business Melbourne', to: '/buy-a-business' },
  { label: 'Buy Business Sydney', to: '/buy-a-business' },
  { label: 'Buy Business Brisbane', to: '/buy-a-business' },
  { label: 'Buy Business Adelaide', to: '/buy-a-business' },
  { label: 'Buy Business Perth', to: '/buy-a-business' },
  { label: 'Buy Business Queensland', to: '/buy-a-business' },
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
        body: JSON.stringify({ email, businessUnit: 'Business Brokers' }),
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
          className='bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10 flex-1'
        />
        <Button
          type='submit'
          disabled={busy}
          className='bg-brand-primary hover:bg-brand-primary-dark text-white h-10 px-4 shrink-0 cursor-pointer'
        >
          {busy ? '...' : 'Go'}
        </Button>
      </div>
      {msg && <p className='text-xs text-white/60 mt-2'>{msg}</p>}
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
      <h3 className='text-white font-bold text-[0.95rem] mb-4 uppercase tracking-wider'>
        {title}
      </h3>
      <ul className='space-y-2'>
        {links.map(({ label, to }) => (
          <li key={label}>
            <Link
              href={to}
              className='text-white/55 text-sm hover:text-brand-primary transition-colors'
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
    <footer className='bg-[#1a1a1a] text-white pt-16 pb-0'>
      <div className='max-w-[1500px] mx-auto px-4 lg:px-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8'>
          {/* Logo + Brand */}
          <div className='lg:col-span-1 flex flex-col items-start gap-3'>
            <Image
              loading='eager'
              src='/businessbrokers/mark.webp'
              alt='ABBASS Business Brokers'
              width={120}
              height={120}
              className='rounded-full object-contain lg:w-[200px] lg:h-[200px]'
            />
            <div className='flex flex-col'>
              <span className='text-white font-semibold text-4xl tracking-[0.32em] leading-none'>
                ABBASS
              </span>
              <span className='text-brand-primary font-medium text-[0.72rem] tracking-[0.28em] mt-1'>
                BUSINESS BROKERS
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title='Quick Links' links={quickLinks} />

          {/* Where We Operate */}
          <FooterColumn title='Where We Operate' links={locationLinks} />

          {/* Buy a Business */}
          <FooterColumn title='Buy a Business' links={buyLinks} />

          {/* Contact */}
          <div>
            <h3 className='text-white font-bold text-[0.95rem] mb-4 uppercase tracking-wider'>
              Contact
            </h3>
            <ul className='space-y-2 text-sm text-white/55'>
              <li>101 Moray St, South Melbourne VIC 3205</li>
              <li>388 George St, Sydney NSW 2000</li>
              <li>
                <a
                  href='tel:(03)91031317'
                  className='text-brand-primary hover:underline'
                >
                  (03) 9103 1317
                </a>
              </li>
              <li>
                <a
                  href='mailto:info@abbass.group'
                  className='text-brand-primary hover:underline'
                >
                  info@abbass.group
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h3 className='text-white font-bold text-[0.95rem] mb-2 uppercase tracking-wider'>
              Newsletter
            </h3>
            <p className='text-white/40 text-xs mb-1'>
              Stay updated with our latest listings
            </p>
            <NewsletterForm />

            <h3 className='text-white font-bold text-[0.95rem] mt-8 mb-4 uppercase tracking-wider'>
              Follow Us
            </h3>
            <div className='flex gap-3'>
              {[
                {
                  Icon: Facebook,
                  href: 'https://www.facebook.com/abbassbusinessbrokers',
                  label: 'Facebook',
                },
                {
                  Icon: Instagram,
                  href: 'https://www.instagram.com/abbassbusinessbrokers',
                  label: 'Instagram',
                },
                {
                  Icon: Linkedin,
                  href: 'https://www.linkedin.com/company/abbassbusinessbrokers',
                  label: 'LinkedIn',
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all'
                >
                  <Icon className='w-4 h-4' />
                </a>
              ))}
            </div>

            {/* Legal */}
            <div className='flex flex-col gap-1 mt-6'>
              <Link
                href='/terms-and-conditions'
                className='text-white/40 text-xs hover:text-brand-primary transition-colors'
              >
                Terms & Conditions
              </Link>
              <Link
                href='/privacy'
                className='text-white/40 text-xs hover:text-brand-primary transition-colors'
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-12 border-t border-white/8 py-5 text-center'>
        <p className='text-white/35 text-sm'>
          © {new Date().getFullYear()} ABBASS Business Brokers. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
