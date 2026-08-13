'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, KeyRound, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useVendorAuth } from '@/context/vendor-auth-context';

export default function VendorChangePasswordPage() {
  const router = useRouter();
  const { changePassword } = useVendorAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirm) {
      toast.error('New passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      toast.success('Password updated successfully');
      router.push('/vendor');
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || err?.message || 'Failed to update password',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='max-w-md mx-auto'>
      <Button
        variant='ghost'
        size='sm'
        className='gap-1.5 mb-4 -ml-2'
        onClick={() => router.push('/vendor')}
      >
        <ArrowLeft className='w-4 h-4' /> Back
      </Button>

      <div className='border border-border bg-card p-6'>
        <div className='flex items-center gap-2 mb-6'>
          <KeyRound className='w-5 h-5 text-accent' />
          <h1 className='text-lg font-semibold text-secondary'>
            Change Password
          </h1>
        </div>

        <form onSubmit={onSubmit} className='space-y-5'>
          <div className='space-y-1.5'>
            <Label htmlFor='current' className='text-sm font-medium'>
              Current Password
            </Label>
            <Input
              id='current'
              type='password'
              required
              autoComplete='current-password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className='h-11'
            />
          </div>
          <div className='space-y-1.5'>
            <Label htmlFor='new' className='text-sm font-medium'>
              New Password
            </Label>
            <Input
              id='new'
              type='password'
              required
              autoComplete='new-password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='h-11'
            />
          </div>
          <div className='space-y-1.5'>
            <Label htmlFor='confirm' className='text-sm font-medium'>
              Confirm New Password
            </Label>
            <Input
              id='confirm'
              type='password'
              required
              autoComplete='new-password'
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className='h-11'
            />
          </div>

          <Button
            type='submit'
            disabled={loading}
            className='w-full h-11 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'
          >
            {loading ? (
              <span className='flex items-center gap-2'>
                <Loader2 className='w-4 h-4 animate-spin' /> Updating...
              </span>
            ) : (
              'Update Password'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
