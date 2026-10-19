'use client';

import { useState, type FormEvent } from 'react';

import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useVendorAuth } from '@/context/vendor-auth-context';
import { AuthShell, AuthHeading, AuthMessage, AuthField, AuthPasswordField, authButtonClass } from '../../../(admin)/_components/auth-shell';

export default function VendorLoginPage() {
  const router = useRouter();
  const { login, loading, error } = useVendorAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;
    try {
      await login({ identifier, password });
      router.push('/vendor');
    } catch {
      // Authentication errors are provided by the context.
    }
  }

  return (
    <AuthShell>
      <AuthHeading title='Vendor sign in' description='Sign in to view your deal activity.' />
      {error && <AuthMessage>{error}</AuthMessage>}
      <form onSubmit={onSubmit} className='flex flex-col gap-6'>
        <fieldset disabled={loading} className='m-0 flex min-w-0 flex-col gap-5 border-0 p-0'>
          <legend className='sr-only'>Sign in credentials</legend>
          <AuthField id='identifier' label='Email or username' type='text' required autoComplete='username'
            value={identifier} onChange={(event) => setIdentifier(event.target.value)} />
          <AuthPasswordField id='password' label='Password' required autoComplete='current-password' value={password} onChange={(event) => setPassword(event.target.value)} disabled={loading} />
        </fieldset>
        
        <button type='submit' disabled={loading} className={authButtonClass}>{loading && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{loading ? 'Signing in…' : 'Sign in'}</button>
        {loading && <span role='status' className='sr-only'>Signing in.</span>}
      </form>
    </AuthShell>
  );
}
