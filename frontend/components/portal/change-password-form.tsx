'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import { AuthPasswordField, AuthMessage } from '@/app/(admin)/_components/auth-shell';

export function ChangePasswordForm({ home, changePassword }: { home: string; changePassword: (current: string, next: string) => Promise<void> }) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;
    setError('');
    if (newPassword.length < 6) { setError('New password must be at least 6 characters.'); return; }
    if (newPassword !== confirm) { setError('New passwords do not match.'); return; }
    setLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      toast.success('Password updated successfully');
      router.push(home);
    } catch (cause) {
      setError(isAxiosError(cause) ? cause.response?.data?.message || 'Failed to update password. Please try again.' : cause instanceof Error ? cause.message : 'Failed to update password. Please try again.');
    } finally { setLoading(false); }
  }

  return (
    <AdminPageLayout title='Change password' description='Update the password you use to access your portal.' action={<LandingButtonLink href={home} variant='outline' size='compact'><ArrowLeft aria-hidden='true' className='size-4' />Back to portal</LandingButtonLink>}>
      <form onSubmit={onSubmit} className='flex w-full max-w-[600px] flex-col gap-6 border border-advisory-rule bg-white p-5 min-[681px]:p-8'>
        <fieldset disabled={loading} className='m-0 flex min-w-0 flex-col gap-5 border-0 p-0'>
          <legend className='sr-only'>Change password</legend>
          <AuthPasswordField id='current-password' label='Current password' required autoComplete='current-password' disabled={loading} value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
          <AuthPasswordField id='new-password' label='New password' required autoComplete='new-password' disabled={loading} hint='Use at least 6 characters.' value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
          <AuthPasswordField id='confirm-password' label='Confirm new password' required autoComplete='new-password' disabled={loading} value={confirm} onChange={(event) => setConfirm(event.target.value)} />
        </fieldset>
        {error && <AuthMessage>{error}</AuthMessage>}
        <div className='flex flex-wrap gap-3 border-t border-advisory-rule pt-5'><LandingButton size='compact' type='submit' disabled={loading}>{loading && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{loading ? 'Updating…' : 'Update password'}</LandingButton><LandingButton variant='outline' size='compact' disabled={loading} onClick={() => router.push(home)}>Cancel</LandingButton></div>
        {loading && <span role='status' className='sr-only'>Updating password.</span>}
      </form>
    </AdminPageLayout>
  );
}
