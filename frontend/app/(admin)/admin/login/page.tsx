'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/context/admin-auth-context';
import {
  AuthShell,
  authButtonClass,
  authInputClass,
  authLabelClass,
} from '../../_components/auth-shell';

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
    <AuthShell>
      <div className='mb-8'>
        <p className='mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-accent'>
          Sign in
        </p>
        <h1 className='text-3xl font-bold tracking-tight text-secondary'>
          Welcome back
        </h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Enter your credentials to access the advisory portal.
        </p>
      </div>

      {error && (
        <div className='mb-6 flex items-start gap-2 border border-destructive/30 bg-destructive/5 p-3.5 text-sm text-destructive'>
          <span className='mt-0.5 shrink-0'>⚠</span>
          <span>{error}</span>
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
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${authInputClass} pl-10`}
            />
          </div>
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='password' className={authLabelClass}>
            Password
          </Label>
          <div className='relative'>
            <Lock className='absolute left-3.5 top-1/2 z-10 w-4 h-4 -translate-y-1/2 text-muted-foreground/60' />
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete='current-password'
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

        <div className='flex items-center justify-end'>
          <Link
            href='/admin/forgot-password'
            className='text-sm font-medium text-secondary transition-colors hover:text-accent'
          >
            Forgot password?
          </Link>
        </div>

        <Button type='submit' disabled={loading} className={authButtonClass}>
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
    </AuthShell>
  );
}
