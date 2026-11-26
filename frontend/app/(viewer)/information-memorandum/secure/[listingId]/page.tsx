'use client';

import { Suspense, useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { AuthField, AuthMessage } from '@/app/(admin)/_components/auth-shell';
import { DocumentState } from '@/components/documents/document-state';
import { LandingButton } from '@/components/landing/presentation';
import { SessionLoading } from '@/components/portal/session-loading';
import { ImReader, type ImTemplate } from '@/components/im';

type GateError = '' | 'mismatch' | 'expired' | 'denied' | 'generic' | 'not_found_listing' | 'not_found_template';
// A tab left open (or idle) this long is treated as a new visit when the reader
// returns: we silently re-verify, which logs a fresh IM view, notifies the
// broker and re-applies revocation / 30-day expiry.
const SESSION_IDLE_MS = 30 * 60 * 1000;

const ERROR_MESSAGES: Record<Exclude<GateError, '' | 'expired'>, string> = {
  mismatch: "This email doesn't match our records for this memorandum.",
  denied: 'This link is invalid or access has not been granted.',
  generic: 'Something went wrong. Please try again.',
  not_found_listing: 'The requested listing could not be found.',
  not_found_template: 'The requested template could not be found.',
};

function SecureImViewer({ listingId, token }: { listingId: string; token: string }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<GateError>('');
  const [template, setTemplate] = useState<ImTemplate | null>(null);

  const verifiedEmailRef = useRef('');
  const lastActiveRef = useRef(0);
  const reverifyingRef = useRef(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const { data } = await apiClient.post(`/api/listings/${listingId}/im-template/verify`, { token, email: email.trim() });
      verifiedEmailRef.current = email.trim();
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

  // Re-verify in the background when the reader comes back after being away.
  const reverify = useCallback(async () => {
    if (reverifyingRef.current || !verifiedEmailRef.current) return;
    reverifyingRef.current = true;
    try {
      const { data } = await apiClient.post(`/api/listings/${listingId}/im-template/verify`, { token, email: verifiedEmailRef.current });
      setTemplate(data.template as ImTemplate);
    } catch (cause: unknown) {
      const status = (cause as { response?: { status?: number; data?: { error?: string } } })?.response;
      if (!status) return; // network blip: keep the current view, try again next return
      // Access was revoked, expired or otherwise refused: lock the memorandum.
      setTemplate(null);
      setEmail('');
      verifiedEmailRef.current = '';
      setError(status.data?.error === 'expired' ? 'expired' : 'denied');
    } finally {
      reverifyingRef.current = false;
    }
  }, [listingId, token]);

  useEffect(() => {
    if (!template) return;
    const onActivity = () => {
      if (document.visibilityState !== 'visible') return;
      const now = Date.now();
      const idleFor = now - lastActiveRef.current;
      lastActiveRef.current = now;
      if (idleFor >= SESSION_IDLE_MS) void reverify();
    };
    const events = ['visibilitychange', 'focus', 'pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
    events.forEach((name) => (name === 'visibilitychange' ? document : window).addEventListener(name, onActivity, { passive: true }));
    return () => events.forEach((name) => (name === 'visibilitychange' ? document : window).removeEventListener(name, onActivity));
  }, [template, reverify]);

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
