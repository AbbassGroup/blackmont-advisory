'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/context/admin-auth-context';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, loading, error } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login({ email, password });
      router.push('/admin');
    } catch {
      // error shown via context
    }
  }

  return (
    <div className='min-h-dvh flex items-center justify-center p-4 relative overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl' />
        <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl' />
      </div>

      <div className='relative w-full max-w-md'>
        <div className='border border-gray-200 rounded-2xl p-8'>
          <div className='text-center mb-8'>
            <Image
              loading='eager'
              src='/mark.webp'
              alt='Blackmont Advisory'
              width={120}
              height={120}
              className='rounded-full object-contain mx-auto'
            />
            <p className='text-brand-black pt-2 font-medium'>
              Blackmont Advisory
            </p>
          </div>

          {error && (
            <div className='mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-2'>
              <span className='mt-0.5 shrink-0'>⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className='space-y-5'>
            <div className='space-y-1.5'>
              <Label
                htmlFor='email'
                className='text-brand-black/70 text-sm font-medium'
              >
                Email Address
              </Label>
              <div className='relative'>
                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  id='email'
                  type='email'
                  required
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='pl-10 h-11'
                />
              </div>
            </div>

            <div className='space-y-1.5'>
              <Label
                htmlFor='password'
                className='text-brand-black/70 text-sm font-medium'
              >
                Password
              </Label>
              <div className='relative'>
                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pl-10 pr-10 h-11'
                />
                <button
                  type='button'
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                >
                  {showPassword ? (
                    <EyeOff className='w-4 h-4' />
                  ) : (
                    <Eye className='w-4 h-4' />
                  )}
                </button>
              </div>
            </div>

            <div className='flex items-center justify-end'>
              <Link
                href='/admin/forgot-password'
                className='text-sm text-brand-primary hover:text-brand-primary/80 transition-colors'
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type='submit'
              disabled={loading}
              className='w-full h-11 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-xl'
            >
              {loading ? (
                <span className='flex items-center gap-2'>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
