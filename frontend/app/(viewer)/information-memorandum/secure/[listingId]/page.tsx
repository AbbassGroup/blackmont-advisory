'use client';

import { Suspense, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { AlertCircle, Loader2, Lock, Mail } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImReader, type ImTemplate } from '@/components/im';

type GateError = '' | 'mismatch' | 'expired' | 'denied' | 'generic';

function SecureImViewer() {
  const params = useParams();
  const search = useSearchParams();
  const listingId = params?.listingId as string;
  const token = search.get('token') || '';

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<GateError>('');
  const [template, setTemplate] = useState<ImTemplate | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const { data } = await apiClient.post(
        `/api/listings/${listingId}/im-template/verify`,
        { token, email: email.trim() },
      );
      setTemplate(data.template as ImTemplate);
    } catch (err: unknown) {
      const code =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || '';
      if (code === 'email_mismatch') setError('mismatch');
      else if (code === 'expired') setError('expired');
      else if (code === 'access_denied' || code === 'invalid_token')
        setError('denied');
      else setError('generic');
    } finally {
      setSubmitting(false);
    }
  };

  // Verified — render the memorandum.
  if (template) {
    return (
      <ImReader
        sections={template.sections}
        brokerEmail={template.brokerEmail}
      />
    );
  }

  // Expired / revoked link — a tactful dead end (no retry).
  if (error === 'expired') {
    return (
      <Centered>
        <div className='text-5xl'>⏳</div>
        <h1 className='text-xl font-semibold tracking-tight text-brand-black'>
          This Link Has Expired
        </h1>
        <p className='text-sm leading-relaxed text-muted-foreground'>
          This Information Memorandum is no longer available. If you believe
          this is an error, please contact the broker directly.
        </p>
        <ContactLine />
      </Centered>
    );
  }

  // Email gate.
  return (
    <Centered>
      <span className='flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent'>
        <Lock className='h-6 w-6' />
      </span>
      <h1 className='text-xl font-semibold tracking-tight text-secondary'>
        Verify your email to continue
      </h1>

      <form onSubmit={handleSubmit} className='mt-2 w-full space-y-3 text-left'>
        <div className='space-y-1.5'>
          <Label htmlFor='im-email'>Email address</Label>
          <div className='relative'>
            <Mail className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60' />
            <Input
              id='im-email'
              type='email'
              required
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder='you@example.com'
              className='pl-9'
            />
          </div>
        </div>

        {error === 'mismatch' && (
          <p className='flex items-center gap-1.5 text-sm text-red-600'>
            <AlertCircle className='h-4 w-4 shrink-0' />
            This email doesn&apos;t match our records for this memorandum.
          </p>
        )}
        {error === 'denied' && (
          <p className='flex items-center gap-1.5 text-sm text-red-600'>
            <AlertCircle className='h-4 w-4 shrink-0' />
            This link is invalid or access has not been granted.
          </p>
        )}
        {error === 'generic' && (
          <p className='flex items-center gap-1.5 text-sm text-red-600'>
            <AlertCircle className='h-4 w-4 shrink-0' />
            Something went wrong. Please try again.
          </p>
        )}

        <Button
          type='submit'
          size='lg'
          disabled={submitting || !email.trim()}
          className='w-full rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'
        >
          {submitting ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            'View Memorandum'
          )}
        </Button>
      </form>

      <ContactLine />
    </Centered>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-10'>
      <div className='flex w-full max-w-md flex-col items-center gap-3 border border-border bg-card p-8 text-center shadow-sm'>
        {children}
      </div>
    </div>
  );
}

function ContactLine() {
  return (
    <p className='mt-2 text-xs text-muted-foreground/60'>
      Blackmont Advisory &middot;{' '}
      <a
        href='mailto:info@blackmontadvisory.com'
        className='text-accent'
      >
        info@blackmontadvisory.com
      </a>{' '}
      {/* &middot; (03) 9103 1317 */}
    </p>
  );
}

export default function SecureImViewerPage() {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center'>
          <Loader2 className='h-8 w-8 animate-spin text-accent' />
        </div>
      }
    >
      <SecureImViewer />
    </Suspense>
  );
}
