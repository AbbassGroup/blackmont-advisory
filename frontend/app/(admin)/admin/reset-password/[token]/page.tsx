'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
} from 'lucide-react';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  AuthShell,
  authButtonClass,
  authInputClass,
  authLabelClass,
} from '../../../_components/auth-shell';

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;
  const { resetPassword, loading, error } = useAdminAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError('');
    if (password !== confirmPassword) {
      setLocalError("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }
    try {
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => router.push('/admin/login'), 3000);
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
            Password reset
          </h2>
          <p className='mt-3 text-sm text-muted-foreground'>
            Your password has been reset successfully.
          </p>
          <p className='mt-1 text-xs text-muted-foreground/70'>
            Redirecting to login...
          </p>
        </div>
      ) : (
        <>
          <div className='mb-8'>
            <p className='mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-accent'>
              Account security
            </p>
            <h1 className='text-3xl font-bold tracking-tight text-secondary'>
              Set new password
            </h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              Choose a strong password for your account.
            </p>
          </div>

          {(error || localError) && (
            <div className='mb-6 flex items-start gap-2 border border-destructive/30 bg-destructive/5 p-3.5 text-sm text-destructive'>
              <span className='mt-0.5 shrink-0'>⚠</span>{' '}
              <span>{localError || error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className='space-y-5'>
            <div className='space-y-1.5'>
              <Label htmlFor='password' className={authLabelClass}>
                New Password
              </Label>
              <div className='relative'>
                <Lock className='absolute left-3.5 top-1/2 z-10 w-4 h-4 -translate-y-1/2 text-muted-foreground/60' />
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${authInputClass} pl-10 pr-10`}
                />
                <button
                  type='button'
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3.5 top-1/2 z-10 -translate-y-1/2 text-muted-foreground/60 transition-colors hover:text-secondary'
                >
                  {showPassword ? (
                    <EyeOff className='w-4 h-4' />
                  ) : (
                    <Eye className='w-4 h-4' />
                  )}
                </button>
              </div>
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='confirm-password' className={authLabelClass}>
                Confirm New Password
              </Label>
              <div className='relative'>
                <Lock className='absolute left-3.5 top-1/2 z-10 w-4 h-4 -translate-y-1/2 text-muted-foreground/60' />
                <Input
                  id='confirm-password'
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${authInputClass} pl-10 pr-10`}
                />
                <button
                  type='button'
                  tabIndex={-1}
                  onClick={() => setShowConfirm(!showConfirm)}
                  className='absolute right-3.5 top-1/2 z-10 -translate-y-1/2 text-muted-foreground/60 transition-colors hover:text-secondary'
                >
                  {showConfirm ? (
                    <EyeOff className='w-4 h-4' />
                  ) : (
                    <Eye className='w-4 h-4' />
                  )}
                </button>
              </div>
            </div>

            <Button type='submit' disabled={loading} className={authButtonClass}>
              {loading ? (
                <span className='flex items-center gap-2'>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  Resetting...
                </span>
              ) : (
                'Reset Password'
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
