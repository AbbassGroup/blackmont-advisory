'use client';

import { Suspense, useEffect, useRef, useState, type FormEvent } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { AuthField, AuthMessage } from '@/app/(admin)/_components/auth-shell';
import { DocumentState } from '@/components/documents/document-state';
import { LandingButton } from '@/components/landing/presentation';
import { SessionLoading } from '@/components/portal/session-loading';
import { ImReader, type ImTemplate } from '@/components/im';

type GateError = '' | 'mismatch' | 'expired' | 'denied' | 'generic' | 'timeout' | 'not_found_listing' | 'not_found_template';
// After this long with no activity (or with the tab in the background) the
// memorandum locks and the reader must verify their email again. Each
// re-verification logs a fresh IM view, notifies the broker and re-applies
// revocation / 30-day expiry, so a tab left open can't hide repeat visits.
const SESSION_IDLE_MS = 30 * 60 * 1000;
const IDLE_CHECK_MS = 30 * 1000;

const ERROR_MESSAGES: Record<Exclude<GateError, '' | 'expired'>, string> = {
  mismatch: "This email doesn't match our records for this memorandum.",
  denied: 'This link is invalid or access has not been granted.',
  generic: 'Something went wrong. Please try again.',
  timeout: 'Your session timed out due to inactivity. Please verify your email again to continue.',
  not_found_listing: 'The requested listing could not be found.',
  not_found_template: 'The requested template could not be found.',
};

function SecureImViewer({ listingId, token }: { listingId: string; token: string }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<GateError>('');
  const [template, setTemplate] = useState<ImTemplate | null>(null);

  const lastActiveRef = useRef(0);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const { data } = await apiClient.post(`/api/listings/${listingId}/im-template/verify`, { token, email: email.trim() });
      lastActiveRef.current = Date.now();
      setTemplate(data.template as ImTemplate);
    } catch (cause: unknown) {
      const code = (cause as { response?: { data?: { error?: string } } })?.response?.data?.error || '';
      if (code === 'email_mismatch') setError('mismatch');
      else if (code === 'expired') setError('expired');
      else if (code === 'not_found_listing') setError('not_found_listing');
      else if (code === 'not_found_template') setError('not_found_template');
      else if (code === 'access_denied' || code === 'invalid_token') setError('denied');
      else setError('generic');
    } finally { setSubmitting(false); }
  };

  // Idle timeout: lock the memorandum back to the email gate once the reader
  // has been inactive (or away from the tab) for SESSION_IDLE_MS.
  useEffect(() => {
    if (!template) return;
    const lock = () => { setTemplate(null); setEmail(''); setError('timeout'); };
    const isIdle = () => Date.now() - lastActiveRef.current >= SESSION_IDLE_MS;
    const onActivity = () => {
      if (document.visibilityState !== 'visible') return;
      // Check first: background-tab timers are throttled, so the interval may
      // not have fired yet when the reader comes back.
      if (isIdle()) return lock();
      lastActiveRef.current = Date.now();
    };
    const timer = window.setInterval(() => { if (isIdle()) lock(); }, IDLE_CHECK_MS);
    // Capture phase so scrolls inside nested containers (which don't bubble) count too.
    const events = ['visibilitychange', 'focus', 'pointerdown', 'keydown', 'scroll', 'wheel', 'touchstart'] as const;
    events.forEach((name) => window.addEventListener(name, onActivity, { capture: true, passive: true }));
    return () => {
      window.clearInterval(timer);
      events.forEach((name) => window.removeEventListener(name, onActivity, { capture: true }));
    };
  }, [template]);

  if (template) return <ImReader sections={template.sections} brokerEmail={template.brokerEmail} templateId={template._id} />;
  if (error === 'expired') return <DocumentState title='This link has expired' description='This Information Memorandum is no longer available. If you believe this is an error, please contact the broker directly.' />;

  return (
    <DocumentState title='Verify your email' description='Enter the email address associated with your access to this Information Memorandum.'>
      <form onSubmit={handleSubmit} className='flex min-w-0 flex-col gap-5'>
        <AuthField id='im-email' label='Email address' type='email' autoComplete='email' required autoFocus disabled={submitting} value={email} onChange={(event) => { setEmail(event.target.value); if (error) setError(''); }} placeholder='you@example.com' aria-invalid={error === 'mismatch'} />
        {error && <AuthMessage>{ERROR_MESSAGES[error]}</AuthMessage>}
        <LandingButton type='submit' size='compact' disabled={submitting || !email.trim()} className='w-full'>{submitting && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{submitting ? 'Verifying…' : 'View memorandum'}</LandingButton>
        {submitting && <span role='status' className='sr-only'>Verifying your email.</span>}
      </form>
    </DocumentState>
  );
}

function SecureImRoute() {
  const params = useParams<{ listingId: string }>();
  const search = useSearchParams();
  const token = search.get('token') || '';
  return <SecureImViewer key={params.listingId + ':' + token} listingId={params.listingId} token={token} />;
}

export default function SecureImViewerPage() {
  return <Suspense fallback={<SessionLoading message='Opening memorandum…' />}><SecureImRoute /></Suspense>;
}
