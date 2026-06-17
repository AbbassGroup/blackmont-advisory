'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const { forgotPassword, loading, error } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setSuccess(true);
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
          {success ? (
            <div className='text-center py-4'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-50 border border-green-200 mb-5'>
                <CheckCircle2 className='w-8 h-8 text-green-500' />
              </div>
              <h2 className='text-2xl font-bold text-brand-black mb-2'>
                Check your inbox
              </h2>
              <p className='text-gray-500 text-sm mb-8 leading-relaxed'>
                We&apos;ve sent a password reset link to{' '}
                <span className='text-brand-black font-medium'>{email}</span>.
              </p>
              <Link
                href='/admin/login'
                className='inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 text-sm font-medium'
              >
                <ArrowLeft className='w-4 h-4' /> Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className='text-center mb-8'>
                <Image
                  loading='eager'
                  src='/businessbrokers/mark.webp'
                  alt='ABBASS Business Brokers'
                  width={120}
                  height={120}
                  className='rounded-full object-contain mx-auto'
                />
                <p className='text-brand-black pt-2 font-medium'>
                  ABBASS Business Brokers
                </p>
              </div>
              <div className='text-center mb-8'>
                <h1 className='text-2xl font-bold text-brand-black mb-2'>
                  Forgot Password?
                </h1>
                <p className='text-gray-500 text-sm'>
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              {error && (
                <div className='mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-2'>
                  <span className='mt-0.5 shrink-0'>⚠</span>{' '}
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={onSubmit} className='space-y-5'>
                <div className='space-y-1.5'>
                  <Label
                    htmlFor='email'
                    className='text-gray-700 text-sm font-medium'
                  >
                    Email Address
                  </Label>
                  <div className='relative'>
                    <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <Input
                      id='email'
                      type='email'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='pl-10 h-11'
                    />
                  </div>
                </div>
                <Button
                  type='submit'
                  disabled={loading}
                  className='w-full h-11 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-xl'
                >
                  {loading ? (
                    <span className='flex items-center gap-2'>
                      <Loader2 className='w-4 h-4 animate-spin' />
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>

              <div className='mt-6 text-center'>
                <Link
                  href='/admin/login'
                  className='inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-primary transition-colors'
                >
                  <ArrowLeft className='w-3.5 h-3.5' /> Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
