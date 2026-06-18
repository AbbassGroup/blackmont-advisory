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
import Image from 'next/image';

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
                Password Reset!
              </h2>
              <p className='text-gray-500 text-sm mb-2'>
                Your password has been reset successfully.
              </p>
              <p className='text-gray-400 text-xs'>Redirecting to login...</p>
            </div>
          ) : (
            <>
              <div className='text-center mb-8'>
                <Image
                  src='/businessbrokers/mark.webp'
                  alt='Blackmont Advisory'
                  width={120}
                  height={120}
                  className='rounded-full object-contain mx-auto'
                />
                <p className='text-brand-black pt-2 font-medium'>
                  Blackmont Advisory
                </p>
              </div>
              <div className='text-center mb-8'>
                <h1 className='text-2xl font-bold text-brand-black mb-2'>
                  Set New Password
                </h1>
                <p className='text-gray-500 text-sm'>
                  Choose a strong password for your account.
                </p>
              </div>

              {(error || localError) && (
                <div className='mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-2'>
                  <span className='mt-0.5 shrink-0'>⚠</span>{' '}
                  <span>{localError || error}</span>
                </div>
              )}

              <form onSubmit={onSubmit} className='space-y-5'>
                <div className='space-y-1.5'>
                  <Label
                    htmlFor='password'
                    className='text-gray-700 text-sm font-medium'
                  >
                    New Password
                  </Label>
                  <div className='relative'>
                    <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <Input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='pl-10 pr-10 h-11'
                    />
                    <button
                      type='button'
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
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
                  <Label
                    htmlFor='confirm-password'
                    className='text-gray-700 text-sm font-medium'
                  >
                    Confirm New Password
                  </Label>
                  <div className='relative'>
                    <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <Input
                      id='confirm-password'
                      type={showConfirm ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='pl-10 pr-10 h-11'
                    />
                    <button
                      type='button'
                      tabIndex={-1}
                      onClick={() => setShowConfirm(!showConfirm)}
                      className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                    >
                      {showConfirm ? (
                        <EyeOff className='w-4 h-4' />
                      ) : (
                        <Eye className='w-4 h-4' />
                      )}
                    </button>
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
                      Resetting...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>

              <div className='mt-6 text-center'>
                <Link
                  href='/admin/login'
                  className='inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-primary'
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
