'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AuthShell, AuthHeading, AuthMessage, AuthPasswordField, authButtonClass } from '../../../_components/auth-shell';

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const { resetPassword, loading, error } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;
    setLocalError('');
    if (password !== confirmPassword) { setLocalError("Passwords don't match"); return; }
    if (password.length < 6) { setLocalError('Password must be at least 6 characters'); return; }
    try {
      await resetPassword(params.token, password);
      setSuccess(true);
      timer.current = setTimeout(() => router.push('/admin/login'), 3000);
    } catch { /* Context provides the error. */ }
  }

  return (
    <AuthShell>
      {success ? (
        <>
          <AuthHeading title='Password reset' description='Your password has been reset successfully.' />
          <AuthMessage success>Redirecting to sign in…</AuthMessage>
        </>
      ) : (
        <>
          <AuthHeading title='Set new password' description='Choose a strong password for your account.' />
          {(error || localError) && <AuthMessage>{localError || error}</AuthMessage>}
          <form onSubmit={onSubmit} className='flex flex-col gap-6'>
            <fieldset disabled={loading} className='m-0 flex min-w-0 flex-col gap-5 border-0 p-0'>
              <legend className='sr-only'>New password</legend>
              <AuthPasswordField id='password' label='New password' required autoComplete='new-password' disabled={loading} hint='Use at least 6 characters.' value={password} onChange={(event) => setPassword(event.target.value)} />
              <AuthPasswordField id='confirm-password' label='Confirm new password' required autoComplete='new-password' disabled={loading} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
            </fieldset>
            <button type='submit' disabled={loading} className={authButtonClass}>{loading && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{loading ? 'Resetting…' : 'Reset password'}</button>
            {loading && <span role='status' className='sr-only'>Resetting password.</span>}
          </form>
        </>
      )}
      <Link href='/admin/login' className='inline-flex min-h-10 w-fit items-center gap-2 text-sm font-medium text-midnight underline decoration-gilt underline-offset-4 hover:decoration-midnight focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt'><ArrowLeft aria-hidden='true' className='size-4' />Back to sign in</Link>
    </AuthShell>
  );
}
