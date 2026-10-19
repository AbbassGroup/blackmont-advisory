'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AuthShell, AuthHeading, AuthMessage, AuthField, AuthPasswordField, authButtonClass } from '../../_components/auth-shell';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, loading, error } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;
    try {
      await login({ email, password });
      router.push('/admin');
    } catch {
      // Authentication errors are provided by the context.
    }
  }

  return (
    <AuthShell>
      <AuthHeading title='Sign in' description='Enter your credentials to access the advisory portal.' />
      {error && <AuthMessage>{error}</AuthMessage>}
      <form onSubmit={onSubmit} className='flex flex-col gap-6'>
        <fieldset disabled={loading} className='m-0 flex min-w-0 flex-col gap-5 border-0 p-0'>
          <legend className='sr-only'>Sign in credentials</legend>
          <AuthField id='email' label='Email address' type='email' required autoComplete='email'
            value={email} onChange={(event) => setEmail(event.target.value)} />
          <AuthPasswordField id='password' label='Password' required autoComplete='current-password' value={password} onChange={(event) => setPassword(event.target.value)} disabled={loading} />
        </fieldset>
        <Link href='/admin/forgot-password' className='w-fit self-end text-sm font-medium text-midnight underline decoration-gilt underline-offset-4 hover:decoration-midnight focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt'>Forgot password?</Link>
        <button type='submit' disabled={loading} className={authButtonClass}>{loading && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{loading ? 'Signing in…' : 'Sign in'}</button>
        {loading && <span role='status' className='sr-only'>Signing in.</span>}
      </form>
    </AuthShell>
  );
}
