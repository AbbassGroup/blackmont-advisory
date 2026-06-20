'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  AuthShell,
  authButtonClass,
  authInputClass,
  authLabelClass,
} from '../../_components/auth-shell';

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
    <AuthShell>
      {success ? (
        <div className='text-center'>
          <div className='mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center border border-accent/30 bg-accent/10'>
            <CheckCircle2 className='h-7 w-7 text-accent' />
          </div>
          <h2 className='text-2xl font-bold tracking-tight text-secondary'>
            Check your inbox
          </h2>
          <p className='mx-auto mt-3 mb-8 max-w-xs text-sm leading-relaxed text-muted-foreground'>
            We&apos;ve sent a password reset link to{' '}
            <span className='font-semibold text-secondary'>{email}</span>.
          </p>
          <Link
            href='/admin/login'
            className='inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-accent'
          >
            <ArrowLeft className='h-4 w-4' /> Back to Sign In
          </Link>
        </div>
      ) : (
        <>
          <div className='mb-8'>
            <p className='mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-accent'>
              Account recovery
            </p>
            <h1 className='text-3xl font-bold tracking-tight text-secondary'>
              Forgot password?
            </h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              Enter your email and we&apos;ll send you a reset link.
            </p>
          </div>

          {error && (
            <div className='mb-6 flex items-start gap-2 border border-destructive/30 bg-destructive/5 p-3.5 text-sm text-destructive'>
              <span className='mt-0.5 shrink-0'>⚠</span> <span>{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className='space-y-5'>
            <div className='space-y-1.5'>
              <Label htmlFor='email' className={authLabelClass}>
                Email Address
              </Label>
              <div className='relative'>
                <Mail className='absolute left-3.5 top-1/2 z-10 w-4 h-4 -translate-y-1/2 text-muted-foreground/60' />
                <Input
                  id='email'
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${authInputClass} pl-10`}
                />
              </div>
            </div>
            <Button type='submit' disabled={loading} className={authButtonClass}>
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

          <div className='mt-7 text-center'>
            <Link
              href='/admin/login'
              className='inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent'
            >
              <ArrowLeft className='h-3.5 w-3.5' /> Back to Sign In
            </Link>
          </div>
        </>
      )}
    </AuthShell>
  );
}
