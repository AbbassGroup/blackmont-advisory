'use client';

import { useEffect, useState } from 'react';
import { Loader2, UserCog, Trash2, Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiClient } from '@/lib/api';

interface AcquirerAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportId: string;
  token: string;
}

/**
 * Manages the Acquisition Portal login for a report's linked deal. The login is
 * per-deal, so it is shared by every report on that deal. Requires the report to
 * have a deal linked first.
 */
export function AcquirerAccessDialog({
  open,
  onOpenChange,
  reportId,
  token,
}: AcquirerAccessDialogProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [exists, setExists] = useState(false);
  const [hasDeal, setHasDeal] = useState(false);
  const [dealName, setDealName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lastLoginAt, setLastLoginAt] = useState<string | null>(null);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!open) return;
    setPassword('');
    setLoading(true);
    apiClient
      .get(`/api/acquisition-reports/${reportId}/acquirer`, authHeader)
      .then(({ data }) => {
        setHasDeal(!!data.deal);
        setDealName(data.dealName || '');
        if (data.acquirer) {
          setExists(true);
          setEmail(data.acquirer.email || '');
          setUsername(data.acquirer.username || '');
          setLastLoginAt(data.acquirer.lastLoginAt || null);
        } else {
          setExists(false);
          setEmail('');
          setUsername('');
          setLastLoginAt(null);
        }
      })
      .catch(() => {
        setExists(false);
        setHasDeal(false);
        setEmail('');
        setUsername('');
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reportId]);

  const handleSave = async () => {
    if (!email.trim() && !username.trim()) {
      toast.error('An acquirer email or username is required');
      return;
    }
    if (!exists && password.length < 6) {
      toast.error('A password of at least 6 characters is required');
      return;
    }
    if (exists && password && password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setSaving(true);
    try {
      await apiClient.put(
        `/api/acquisition-reports/${reportId}/acquirer`,
        {
          email: email.trim(),
          username: username.trim(),
          ...(password ? { password } : {}),
        },
        authHeader,
      );
      toast.success(exists ? 'Acquirer access updated' : 'Acquirer access created');
      setExists(true);
      setPassword('');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Failed to save acquirer access');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await apiClient.delete(`/api/acquisition-reports/${reportId}/acquirer`, authHeader);
      toast.success('Acquirer access removed');
      setExists(false);
      setEmail('');
      setUsername('');
      setPassword('');
      setLastLoginAt(null);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Failed to remove acquirer access');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md w-full bg-card'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-lg text-secondary'>
            <UserCog className='w-5 h-5 text-accent' />
            Acquirer Portal Access
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className='flex justify-center py-8'>
            <Loader2 className='w-6 h-6 animate-spin text-accent' />
          </div>
        ) : !hasDeal ? (
          <p className='py-6 text-center text-sm text-muted-foreground'>
            Link a deal to this report first, then you can grant the buyer portal
            access.
          </p>
        ) : (
          <div className='space-y-4 pt-2'>
            {dealName && (
              <p className='text-xs text-muted-foreground'>
                Access for deal:{' '}
                <span className='font-medium text-secondary'>{dealName}</span>. The
                login is shared across every report linked to this deal.
              </p>
            )}

            <div className='space-y-1.5'>
              <Label htmlFor='acq-email' className='text-sm font-medium'>
                Acquirer Email
              </Label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60' />
                <Input
                  id='acq-email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='pl-9 h-11'
                  placeholder='buyer@example.com'
                />
              </div>
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='acq-username' className='text-sm font-medium'>
                Username
              </Label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60' />
                <Input
                  id='acq-username'
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='pl-9 h-11'
                  placeholder='buyer-username'
                  autoComplete='off'
                />
              </div>
            </div>

            <p className='text-xs text-muted-foreground'>
              Provide an email, a username, or both. The acquirer can sign in with
              either one.
            </p>

            <div className='space-y-1.5'>
              <Label htmlFor='acq-password' className='text-sm font-medium'>
                {exists ? 'New Password (leave blank to keep)' : 'Password'}
              </Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60' />
                <Input
                  id='acq-password'
                  type='text'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pl-9 h-11'
                  placeholder={exists ? '••••••••' : 'Min 6 characters'}
                  autoComplete='new-password'
                />
              </div>
            </div>

            {exists && lastLoginAt && (
              <p className='text-xs text-muted-foreground'>
                Last login:{' '}
                {new Date(lastLoginAt).toLocaleString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}
            {exists && !lastLoginAt && (
              <p className='text-xs text-muted-foreground'>
                Acquirer has not logged in yet.
              </p>
            )}

            <div className='flex items-center justify-between gap-2 pt-2'>
              {exists ? (
                <Button
                  variant='outline'
                  onClick={handleDelete}
                  disabled={saving}
                  className='gap-1.5 rounded-none text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600'
                >
                  <Trash2 className='w-4 h-4' /> Remove Access
                </Button>
              ) : (
                <span />
              )}
              <Button
                onClick={handleSave}
                disabled={saving}
                className='gap-1.5 rounded-none bg-accent text-primary hover:bg-accent-light'
              >
                {saving ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : exists ? (
                  'Save Changes'
                ) : (
                  'Create Access'
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
