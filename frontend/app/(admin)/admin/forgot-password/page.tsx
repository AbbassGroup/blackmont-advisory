'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AuthShell, AuthHeading, AuthMessage, AuthField, authButtonClass } from '../../_components/auth-shell';

export default function ForgotPasswordPage() {
  const { forgotPassword, loading, error } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;
    try { await forgotPassword(email); setSuccess(true); } catch { /* Context provides the error. */ }
  }

  return (
    <AuthShell>
      {success ? (
        <>
          <AuthHeading title='Check your inbox' description={<>We&apos;ve sent a password reset link to <span className='break-all font-semibold text-midnight'>{email}</span>.</>} />
          <AuthMessage success>Follow the link in your email to choose a new password.</AuthMessage>
        </>
      ) : (
        <>
          <AuthHeading title='Forgot password?' description="Enter your email and we'll send you a reset link." />
          {error && <AuthMessage>{error}</AuthMessage>}
          <form onSubmit={onSubmit} className='flex flex-col gap-6'>
            <AuthField id='email' label='Email address' type='email' required autoComplete='email' disabled={loading} value={email} onChange={(event) => setEmail(event.target.value)} />
            <button type='submit' disabled={loading} className={authButtonClass}>{loading && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{loading ? 'Sending…' : 'Send reset link'}</button>
            {loading && <span role='status' className='sr-only'>Sending reset link.</span>}
          </form>
        </>
      )}
      <Link href='/admin/login' className='inline-flex min-h-10 w-fit items-center gap-2 text-sm font-medium text-midnight underline decoration-gilt underline-offset-4 hover:decoration-midnight focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt'><ArrowLeft aria-hidden='true' className='size-4' />Back to sign in</Link>
    </AuthShell>
  );
}
