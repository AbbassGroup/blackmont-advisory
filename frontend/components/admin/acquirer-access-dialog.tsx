'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { Eye, EyeOff, Loader2, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { cn } from '@/lib/utils';
import { apiClient } from '@/lib/api';

interface AcquirerAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportId: string;
  token: string;
}

const INPUT_CLASS =
  'block h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white px-3 py-2 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none min-[681px]:text-sm';

function accessError(error: unknown, fallback: string) {
  const message = (error as { response?: { data?: { error?: unknown } } })?.response?.data?.error;
  return typeof message === 'string' ? message : fallback;
}

/** The portal login belongs to the linked deal and is shared by its reports. */
export function AcquirerAccessDialog({ open, onOpenChange, reportId, token }: AcquirerAccessDialogProps) {
  const prefix = useId();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [saving, setSaving] = useState<'save' | 'remove' | null>(null);
  const [formError, setFormError] = useState('');
  const [exists, setExists] = useState(false);
  const [hasDeal, setHasDeal] = useState(false);
  const [dealName, setDealName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [lastLoginAt, setLastLoginAt] = useState<string | null>(null);
  const authHeader = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);
  const busy = Boolean(saving);

  useEffect(() => {
    if (!open) return;
    let active = true;
    setPassword('');
    setShowPassword(false);
    setFormError('');
    setLoading(true);
    setLoadError(false);
    apiClient
      .get(`/api/acquisition-reports/${reportId}/acquirer`, authHeader)
      .then(({ data }) => {
        if (!active) return;
        setHasDeal(Boolean(data.deal));
        setDealName(data.dealName || '');
        setExists(Boolean(data.acquirer));
        setEmail(data.acquirer?.email || '');
        setUsername(data.acquirer?.username || '');
        setLastLoginAt(data.acquirer?.lastLoginAt || null);
      })
      .catch(() => { if (active) setLoadError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [open, reportId, authHeader, attempt]);

  const showError = (message: string) => {
    setFormError(message);
    toast.error(message);
  };

  const handleSave = async () => {
    if (busy) return;
    if (!email.trim() && !username.trim()) {
      showError('An acquirer email or username is required');
      return;
    }
    if (!exists && password.length < 6) {
      showError('A password of at least 6 characters is required');
      return;
    }
    if (exists && password && password.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }
    setSaving('save');
    setFormError('');
    try {
      await apiClient.put(
        `/api/acquisition-reports/${reportId}/acquirer`,
        { email: email.trim(), username: username.trim(), ...(password ? { password } : {}) },
        authHeader,
      );
      toast.success(exists ? 'Acquirer access updated' : 'Acquirer access created');
      setExists(true);
      setPassword('');
      setShowPassword(false);
    } catch (error) {
      showError(accessError(error, 'Failed to save acquirer access'));
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async () => {
    if (busy) return;
    setSaving('remove');
    setFormError('');
    try {
      await apiClient.delete(`/api/acquisition-reports/${reportId}/acquirer`, authHeader);
      toast.success('Acquirer access removed');
      setExists(false);
      setEmail('');
      setUsername('');
      setPassword('');
      setShowPassword(false);
      setLastLoginAt(null);
    } catch (error) {
      showError(accessError(error, 'Failed to remove acquirer access'));
    } finally {
      setSaving(null);
    }
  };

  const loginDate = lastLoginAt ? new Date(lastLoginAt) : null;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (busy) return;
        if (!next) { setPassword(''); setShowPassword(false); setLoading(true); }
        onOpenChange(next);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className={cn(landingFontVariables, 'flex max-h-[85dvh] flex-col gap-6 overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-sm text-ink ring-0 sm:max-w-[500px] min-[681px]:p-8')}
      >
        <DialogHeader className='pr-10'>
          <DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>Acquirer portal access</DialogTitle>
          <DialogDescription className='mt-2 text-sm leading-[1.75] text-ink'>Manage the buyer&apos;s login for this report&apos;s linked deal.</DialogDescription>
        </DialogHeader>
        <button type='button' aria-label='Close access settings' disabled={busy} onClick={() => { setPassword(''); setShowPassword(false); setLoading(true); onOpenChange(false); }} className='absolute top-4 right-4 inline-flex size-10 cursor-pointer items-center justify-center border border-transparent text-midnight transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none'>
          <X aria-hidden='true' className='size-4' />
        </button>

        {loading ? (
          <div aria-busy='true'>
            <p role='status' className='sr-only'>Loading acquirer access.</p>
            <div aria-hidden='true' className='space-y-6'>
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className='space-y-3'>
                  <div className='h-3 w-28 animate-pulse bg-canvas motion-reduce:animate-none' />
                  <div className='h-10 w-full animate-pulse bg-canvas motion-reduce:animate-none' />
                </div>
              ))}
            </div>
          </div>
        ) : loadError ? (
          <div role='alert'>
            <p className='mt-0 mb-4 text-sm leading-[1.75] text-ink'>We couldn&apos;t load the acquirer access settings.</p>
            <LandingButton variant='outline' size='compact' onClick={() => setAttempt((value) => value + 1)}>Try again</LandingButton>
          </div>
        ) : !hasDeal ? (
          <p className='m-0 text-sm leading-[1.8] text-ink'>Link a deal to this report first, then you can grant the buyer portal access.</p>
        ) : (
          <div className='flex min-w-0 flex-col gap-5'>
            {dealName && <p className='m-0 bg-canvas p-4 text-sm leading-[1.75] text-ink'>Access for deal: <span className='break-words font-semibold text-midnight'>{dealName}</span>. The login is shared across every report linked to this deal.</p>}

            <div>
              <label htmlFor={`${prefix}-email`} className='mb-2 block text-sm leading-[1.6] font-medium text-midnight'>Acquirer email</label>
              <input id={`${prefix}-email`} type='email' value={email} disabled={busy} onChange={(event) => { setEmail(event.target.value); setFormError(''); }} aria-describedby={`${prefix}-login-hint`} className={INPUT_CLASS} placeholder='buyer@example.com' />
            </div>
            <div>
              <label htmlFor={`${prefix}-username`} className='mb-2 block text-sm leading-[1.6] font-medium text-midnight'>Username</label>
              <input id={`${prefix}-username`} type='text' value={username} disabled={busy} onChange={(event) => { setUsername(event.target.value); setFormError(''); }} aria-describedby={`${prefix}-login-hint`} className={INPUT_CLASS} placeholder='buyer-username' autoComplete='off' />
              <p id={`${prefix}-login-hint`} className='mt-2 mb-0 text-xs leading-[1.75] text-ink'>Provide an email, a username, or both. The acquirer can sign in with either one.</p>
            </div>
            <div>
              <label htmlFor={`${prefix}-password`} className='mb-2 block text-sm leading-[1.6] font-medium text-midnight'>{exists ? 'New password' : 'Password'}</label>
              <div className='relative'>
                <input id={`${prefix}-password`} type={showPassword ? 'text' : 'password'} value={password} disabled={busy} onChange={(event) => { setPassword(event.target.value); setFormError(''); }} aria-describedby={`${prefix}-password-hint`} className={cn(INPUT_CLASS, 'pr-12')} placeholder={exists ? 'Leave blank to keep' : 'Min 6 characters'} autoComplete='new-password' />
                <button type='button' disabled={busy} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword((value) => !value)} className='absolute top-0 right-0 inline-flex size-10 cursor-pointer items-center justify-center text-midnight focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-40'>
                  {showPassword ? <EyeOff aria-hidden='true' className='size-4' /> : <Eye aria-hidden='true' className='size-4' />}
                </button>
              </div>
              <p id={`${prefix}-password-hint`} className='mt-2 mb-0 text-xs leading-[1.75] text-ink'>{exists ? 'Leave blank to keep the current password. New passwords need at least 6 characters.' : 'Use at least 6 characters.'}</p>
            </div>

            {exists && (
              <p className='m-0 text-xs leading-[1.75] text-ink'>
                {loginDate ? Number.isNaN(loginDate.getTime()) ? 'Last login: unavailable.' : `Last login: ${loginDate.toLocaleString('en-AU', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}` : 'Acquirer has not logged in yet.'}
              </p>
            )}
            {formError && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{formError}</p>}
            <div className='flex flex-col gap-3 border-t border-advisory-rule pt-5 min-[426px]:flex-row min-[426px]:flex-wrap min-[426px]:justify-between'>
              {exists && (
                <LandingButton variant='outline' size='compact' onClick={() => void handleDelete()} disabled={busy} className='border-red-700 text-red-800 hover:bg-red-50 hover:text-red-900'>
                  {saving === 'remove' ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <Trash2 aria-hidden='true' className='size-4' />}
                  {saving === 'remove' ? 'Removing…' : 'Remove access'}
                </LandingButton>
              )}
              <LandingButton size='compact' onClick={() => void handleSave()} disabled={busy} className='min-[426px]:ml-auto'>
                {saving === 'save' && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}
                {saving === 'save' ? 'Saving…' : exists ? 'Save changes' : 'Create access'}
              </LandingButton>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
