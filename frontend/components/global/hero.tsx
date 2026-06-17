'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80';

const initialForm = { firstName: '', lastName: '', phone: '', email: '' };

export function Hero() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await apiClient.post('/api/valuations', form);
      setForm(initialForm);
      router.push('/success');
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section
      className='relative min-h-screen flex items-center bg-[#1a1a1a]'
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.30), rgba(0,0,0,0.30)), url(${HERO_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='max-w-[1300px] mx-auto px-4 lg:px-8 w-full'>
        <div className='flex flex-col md:flex-row items-center gap-12 lg:gap-20 pt-24 pb-16 md:py-0 md:min-h-screen'>
          {/* Left — Headline + CTA */}
          <div className='flex-1 text-center md:text-left max-w-[600px] mx-auto md:mx-0'>
            <h1 className='text-white text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.15] tracking-tight mb-12'>
              <span className='block'>Selling your business</span>
              <span className='block text-brand-primary'>is our business</span>
            </h1>

            <Link
              href='/contact'
              className='inline-block px-8 py-4 bg-brand-primary text-white font-bold rounded-[10px] text-lg hover:bg-brand-primary-dark transition-colors shadow-[0_4px_16px_rgba(46,202,106,0.3)]'
            >
              Contact Us →
            </Link>
          </div>

          {/* Right — Valuation Form */}
          <div className='w-full md:w-[460px] shrink-0'>
            <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)]'>
              <h2 className='text-white text-2xl font-bold mb-4'>
                What&apos;s my business worth?
              </h2>

              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid grid-cols-2 gap-3'>
                  <div className='space-y-1.5'>
                    <label className='block text-sm font-medium text-white'>
                      First Name
                    </label>
                    <Input
                      name='firstName'
                      placeholder=''
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      className='bg-white/10 border-white/25 text-white h-11 focus-visible:border-brand-primary'
                    />
                  </div>
                  <div className='space-y-1.5'>
                    <label className='block text-sm font-medium text-white'>
                      Last Name
                    </label>
                    <Input
                      name='lastName'
                      placeholder=''
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      className='bg-white/10 border-white/25 text-white h-11 focus-visible:border-brand-primary'
                    />
                  </div>
                </div>
                <div className='space-y-1.5'>
                  <label className='block text-sm font-medium text-white'>
                    Phone Number
                  </label>
                  <Input
                    name='phone'
                    type='tel'
                    placeholder=''
                    value={form.phone}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className='bg-white/10 border-white/25 text-white h-11 focus-visible:border-brand-primary'
                  />
                </div>
                <div className='space-y-1.5'>
                  <label className='block text-sm font-medium text-white'>
                    Your Email
                  </label>
                  <Input
                    name='email'
                    type='email'
                    placeholder=''
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className='bg-white/10 border-white/25 text-white h-11 focus-visible:border-brand-primary'
                  />
                </div>
                <Button
                  type='submit'
                  disabled={status === 'loading'}
                  className='w-full h-12 mt-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold text-base rounded-[10px] cursor-pointer'
                >
                  {status === 'loading' ? 'Sending...' : 'Send'}
                </Button>

                {status === 'error' && (
                  <p className='text-red-400 text-sm text-center font-medium'>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
