'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle2, Clock, Loader2, PenLine, X } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { DocumentState } from '@/components/documents/document-state';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  computeAmounts,
  isDefaultDeposit,
  pickFields,
  setFieldValue,
  validateOwnerFields,
  type PartyRefusalCode,
  type PublicOfferTermSheet,
} from '@/components/offer-term-sheet';
import { Letter } from './_components/letter';

const BASE = '/api/offer-term-sheets/public';

const REFUSAL_TONE: Record<PartyRefusalCode, 'done' | 'gone'> = {
  already_signed: 'done',
  declined: 'gone',
  cancelled: 'gone',
  not_yet: 'gone',
  expired: 'gone',
  invalid: 'gone',
  superseded: 'gone',
  not_found: 'gone',
};

// Brings the first unfilled field into view and focuses it.
function revealField(key: string) {
  const target = document.querySelector<HTMLElement>(`[data-field="${key}"]`);
  if (!target) return;
  target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  target
    .querySelector<HTMLElement>('input, select, textarea, canvas')
    ?.focus({ preventScroll: true });
}

function PartyForm({ token }: { token: string }) {
  const [sheet, setSheet] = useState<PublicOfferTermSheet | null>(null);
  const [values, setValues] = useState<PublicOfferTermSheet | null>(null);
  const [loading, setLoading] = useState(true);
  const [refusal, setRefusal] = useState<{
    code: PartyRefusalCode;
    message: string;
  } | null>(null);

  const [consent, setConsent] = useState(false);
  const [consentTouched, setConsentTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [outcome, setOutcome] = useState<'signed' | 'declined' | null>(null);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [actionError, setActionError] = useState('');
  const actionBar = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(240);

  useEffect(() => {
    let active = true;
    apiClient
      .get(`${BASE}/${token}`)
      .then(({ data }) => {
        if (!active) return;
        setSheet(data);
        setValues(data);
      })
      .catch((e) => {
        if (!active) return;
        const body = e?.response?.data;
        setRefusal({
          code: (body?.code as PartyRefusalCode) || 'invalid',
          message: body?.message || 'This link could not be opened.',
        });
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [token]);

  useEffect(() => {
    const element = actionBar.current;
    if (!element) return;
    const update = () => setBarHeight(Math.ceil(element.getBoundingClientRect().height));
    const observer = new ResizeObserver(update);
    observer.observe(element);
    update();
    return () => observer.disconnect();
  }, [loading, outcome, refusal, sheet]);

  const editableSet = useMemo(
    () => new Set(sheet?.editableFields ?? []),
    [sheet],
  );

  const patch = (key: string, value: unknown) => {
    setValues((current) => {
      if (!current) return current;
      const next = setFieldValue(current, key, value);
      // A deposit still sitting at the default follows the price; one the buyer
      // typed deliberately is left as it stands.
      if (
        key === 'purchasePrice' &&
        current.depositAmount !== null &&
        isDefaultDeposit(current.purchasePrice, current.depositAmount)
      ) {
        return setFieldValue(
          next,
          'depositAmount',
          computeAmounts(value as number | null).depositAmount,
        );
      }
      return next;
    });
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const sign = async () => {
    if (!values || !sheet || submitting) return;
    setActionError('');

    // Blanks and out-of-range values are caught against the same bounds the
    // server enforces, so nothing round-trips to be told a number is too big.
    const issues = validateOwnerFields(sheet.role, values);
    setConsentTouched(true);
    setErrors(Object.fromEntries(issues.map((i) => [i.key, i.message])));

    if (issues.length) {
      revealField(issues[0].key);
      return;
    }
    if (!consent) { document.getElementById('offer-consent')?.focus(); return; }

    setSubmitting(true);
    try {
      await apiClient.post(`${BASE}/${token}/sign`, {
        ...pickFields(values, sheet.editableFields),
        consentAccepted: true,
      });
      setOutcome('signed');
    } catch (e: unknown) {
      const body = (
        e as { response?: { data?: { fields?: Record<string, string>; message?: string } } }
      )?.response?.data;
      const fields = body?.fields ?? {};
      setErrors(fields);
      const first = Object.keys(fields)[0];
      if (first) revealField(first);
      setActionError(body?.message || 'We could not submit your signed letter. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const decline = async () => {
    if (submitting) return;
    setSubmitting(true);
    setActionError('');
    try {
      await apiClient.post(`${BASE}/${token}/decline`, { reason: declineReason.trim() });
      setOutcome('declined');
      setDeclineOpen(false);
    } catch (cause: unknown) {
      const body = (cause as { response?: { data?: { message?: string } } })?.response?.data;
      setActionError(body?.message || 'We could not decline this letter. Please try again.');
    } finally { setSubmitting(false); }
  };

  if (loading) return <LetterSkeleton />;

  if (outcome === 'signed') {
    return (
      <Outcome
        icon={<CheckCircle2 className='size-8' />}
        title='Thank you, your letter is signed'
        body={
          sheet?.role === 'vendor'
            ? 'Both parties have now signed. A copy of the signed Letter of Intent is on its way to your inbox.'
            : 'Your Letter of Intent has been submitted. We will be in touch once the vendor has signed off.'
        }
      />
    );
  }

  if (outcome === 'declined') {
    return (
      <Outcome
        tone='neutral'
        icon={<X className='size-8' />}
        title='Letter declined'
        body='Thank you for letting us know. Your broker has been notified and will be in touch.'
      />
    );
  }

  if (refusal || !sheet || !values) {
    const tone = refusal ? REFUSAL_TONE[refusal.code] : 'gone';
    return (
      <Outcome
        tone={tone === 'done' ? 'brand' : 'neutral'}
        icon={
          tone === 'done' ? (
            <CheckCircle2 className='size-8' />
          ) : (
            <Clock className='size-8' />
          )
        }
        title={tone === 'done' ? 'Already signed' : 'This link is not active'}
        body={refusal?.message || 'This letter could not be opened.'}
      />
    );
  }

  const isVendor = sheet.role === 'vendor';
  const consentMissing = consentTouched && !consent;

  return (
    <main className='mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pt-6 min-[681px]:px-6 min-[681px]:pt-8' style={{ paddingBottom: barHeight + 32 }}>
      {Object.keys(errors).length > 0 && (
        <section role='alert' aria-label='Fields to review' className='flex flex-col gap-3 border border-red-200 bg-red-50 p-5 text-sm leading-[1.75] text-red-800'>
          <p className='m-0 font-semibold'>Please review the highlighted fields.</p>
          <ul className='m-0 flex list-disc flex-col gap-1 pl-5'>{Object.entries(errors).map(([key, message]) => <li key={key}><button type='button' onClick={() => revealField(key)} className='text-left underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt'>{message}</button></li>)}</ul>
        </section>
      )}
      <fieldset disabled={submitting} inert={submitting} className='m-0 min-w-0 border-0 p-0'>
        <legend className='sr-only'>Letter of Intent details and signatures</legend>
        <Letter values={values} editable={(key) => editableSet.has(key)} errors={errors} onChange={patch} />
      </fieldset>

      <div ref={actionBar} className='fixed inset-x-0 bottom-0 z-30 border-t border-advisory-rule bg-white pb-[env(safe-area-inset-bottom)]'>
        <div className='mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-4 min-[681px]:px-6'>
          {actionError && !declineOpen && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{actionError}</p>}
          <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6'>
            <div className='flex min-w-0 flex-1 flex-col gap-2'>
              <label className={cn('flex cursor-pointer items-start gap-3 text-xs leading-[1.75]', consentMissing ? 'text-red-800' : 'text-ink')}>
                <input id='offer-consent' type='checkbox' checked={consent} disabled={submitting} aria-invalid={consentMissing} aria-describedby={consentMissing ? 'offer-consent-error' : undefined}
                  onChange={(event) => { setConsent(event.target.checked); setConsentTouched(true); }}
                  className='mt-1 size-4 shrink-0 accent-midnight focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt disabled:opacity-50' />
                <span>I agree that signing here is valid electronic acceptance under the <em>Electronic Transactions (Victoria) Act 2000</em>, and is binding without a handwritten signature.</span>
              </label>
              {consentMissing && <p id='offer-consent-error' role='alert' className='m-0 text-xs leading-[1.75] text-red-800'>Please confirm your electronic acceptance before signing.</p>}
            </div>
            <div className='grid shrink-0 grid-cols-2 gap-3 lg:flex'>
              <LandingButton variant='outline' size='compact' disabled={submitting} onClick={() => { setActionError(''); setDeclineOpen(true); }} className='px-3 text-xs min-[681px]:px-5 min-[681px]:text-sm'>Decline</LandingButton>
              <LandingButton size='compact' disabled={submitting} onClick={() => void sign()} className='px-3 text-xs min-[681px]:px-5 min-[681px]:text-sm'>
                {submitting ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <PenLine aria-hidden='true' className='size-4' />}
                {submitting ? 'Submitting…' : isVendor ? 'Accept & sign' : 'Submit & sign'}
              </LandingButton>
            </div>
          </div>
          {submitting && <span role='status' className='sr-only'>Submitting your response.</span>}
        </div>
      </div>

      <Dialog open={declineOpen} onOpenChange={(open) => { if (!submitting) { setDeclineOpen(open); setActionError(''); } }}>
        <DialogContent showCloseButton={false} className={cn(landingFontVariables, 'max-h-[85dvh] overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-sm leading-[1.75] text-ink ring-0 sm:max-w-[500px] min-[681px]:p-8')}
          onEscapeKeyDown={(event) => { if (submitting) event.preventDefault(); }} onInteractOutside={(event) => { if (submitting) event.preventDefault(); }}>
          <button type='button' aria-label='Close decline confirmation' disabled={submitting} onClick={() => { setDeclineOpen(false); setActionError(''); }} className='absolute top-4 right-4 flex size-10 items-center justify-center text-midnight hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt disabled:opacity-50'><X aria-hidden='true' className='size-4' /></button>
          <DialogHeader className='pr-10'><DialogTitle className='font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight'>Decline this letter?</DialogTitle><DialogDescription className='text-sm leading-[1.75] text-ink'>Your broker will be notified. You can add a reason if you would like to.</DialogDescription></DialogHeader>
          <form onSubmit={(event) => { event.preventDefault(); void decline(); }} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'><label htmlFor='decline-reason' className='text-sm font-medium text-midnight'>Reason (optional)</label><textarea id='decline-reason' rows={3} disabled={submitting} value={declineReason} onChange={(event) => setDeclineReason(event.target.value)} className='min-h-24 w-full resize-y rounded-none border border-advisory-input bg-white px-3 py-3 text-base text-midnight outline-none focus:border-gilt disabled:opacity-50 min-[681px]:text-sm' /></div>
            {actionError && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{actionError}</p>}
            <div className='flex flex-wrap justify-end gap-3'>
              <LandingButton variant='outline' size='compact' disabled={submitting} onClick={() => { setDeclineOpen(false); setActionError(''); }}>Go back</LandingButton>
              <LandingButton type='submit' size='compact' disabled={submitting} className='border-red-800 bg-red-800 hover:bg-red-900'>{submitting && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{submitting ? 'Declining…' : 'Decline letter'}</LandingButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function Outcome({ icon, title, body, tone = 'brand' }: { icon: React.ReactNode; title: string; body: string; tone?: 'brand' | 'neutral' }) {
  return <DocumentState title={title} description={body}><span aria-hidden='true' className={cn('order-first', tone === 'brand' ? 'text-emerald-800' : 'text-midnight')}>{icon}</span></DocumentState>;
}

function LetterSkeleton() {
  return (
    <main aria-busy='true' className='mx-auto w-full max-w-4xl px-4 pt-6 pb-64 min-[681px]:px-6 min-[681px]:pt-8'>
      <p role='status' className='sr-only'>Loading your letter.</p>
      <div aria-hidden='true' className='border border-advisory-rule bg-white'>
        <div className='flex flex-wrap items-center justify-between gap-5 border-b border-advisory-rule px-5 py-6 min-[681px]:px-10'><div className='h-10 w-[220px] animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-16 w-48 bg-canvas' /></div>
        <div className='flex flex-col gap-8 px-5 py-8 min-[681px]:px-10 min-[681px]:py-10'>
          <h1 className='m-0 text-center font-advisory-heading text-[26px] leading-[1.4] font-bold text-midnight min-[681px]:text-[30px]'>Letter of Intent (Non-Binding Offer Letter)</h1>
          {['The Business', 'Purchaser Details', 'Vendor Details'].map((title) => <section key={title} className='flex flex-col gap-5'><h2 className='m-0 font-advisory-heading text-[21px] leading-[1.5] font-bold text-midnight'>{title}</h2>{[0, 1].map((index) => <div key={index} className='flex flex-col gap-2'><div className='h-5 w-28 bg-canvas' /><div className='h-10 w-full animate-pulse bg-canvas/60 motion-reduce:animate-none' /></div>)}</section>)}
        </div>
      </div>
      <div aria-hidden='true' className='fixed inset-x-0 bottom-0 border-t border-advisory-rule bg-white pb-[env(safe-area-inset-bottom)]'><div className='mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-4 min-[681px]:px-6 lg:flex-row lg:items-center lg:justify-between'><div className='flex flex-1 flex-col gap-2'><div className='h-4 w-full max-w-md bg-canvas' /><div className='h-4 w-3/4 max-w-sm bg-canvas' /></div><div className='grid grid-cols-2 gap-3 lg:flex'><div className='h-10 bg-canvas lg:w-28' /><div className='h-10 bg-canvas lg:w-36' /></div></div></div>
    </main>
  );
}

export default function PartyFormPage() {
  const params = useParams<{ token: string }>();
  return <PartyForm key={params.token} token={params.token} />;
}
