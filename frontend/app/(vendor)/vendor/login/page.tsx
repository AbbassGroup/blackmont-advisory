'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Lock, User } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useVendorAuth } from '@/context/vendor-auth-context';
import {
  AuthShell,
  authButtonClass,
  authInputClass,
  authLabelClass,
} from '../../../(admin)/_components/auth-shell';

export default function VendorLoginPage() {
  const router = useRouter();
  const { login, loading, error } = useVendorAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login({ identifier, password });
      router.push('/vendor');
    } catch {
      // error shown via context
    }
  }

  return (
    <AuthShell>
      <div className='mb-8'>
        <p className='mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-accent'>
          Vendor Portal
        </p>
        <h1 className='text-3xl font-bold tracking-tight text-secondary'>
          Sign in
        </h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Sign in to view your deal activity.
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
          <Label htmlFor='identifier' className={authLabelClass}>
            Email or Username
          </Label>
          <div className='relative'>
            <User className='absolute left-3.5 top-1/2 z-10 w-4 h-4 -translate-y-1/2 text-muted-foreground/60' />
            <Input
              id='identifier'
              type='text'
              required
              autoComplete='username'
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
