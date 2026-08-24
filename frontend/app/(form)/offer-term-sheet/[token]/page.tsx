'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle2, Clock, Loader2, PenLine, X } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  computeAmounts,
  isDefaultDeposit,
  pickFields,
  setFieldValue,
  validateOwnerFields,
  type PartyRefusalCode,
  type PublicOfferTermSheet,
} from '@/components/offer-term-sheet';
import { BRAND } from '@/components/offer-term-sheet/brand';
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
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  target
    .querySelector<HTMLElement>('input, select, textarea, canvas')
    ?.focus({ preventScroll: true });
}

export default function PartyFormPage() {
  const params = useParams();
  const token = params?.token as string;

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
    if (!values || !sheet) return;

    // Blanks and out-of-range values are caught against the same bounds the
    // server enforces, so nothing round-trips to be told a number is too big.
    const issues = validateOwnerFields(sheet.role, values);
    setConsentTouched(true);
    setErrors(Object.fromEntries(issues.map((i) => [i.key, i.message])));

    if (issues.length) {
      revealField(issues[0].key);
      return;
    }
    if (!consent) return;

    setSubmitting(true);
    try {
      await apiClient.post(`${BASE}/${token}/sign`, {
        ...pickFields(values, sheet.editableFields),
        consentAccepted: true,
      });
      setOutcome('signed');
    } catch (e: unknown) {
      const body = (
        e as { response?: { data?: { fields?: Record<string, string> } } }
      )?.response?.data;
      const fields = body?.fields ?? {};
      setErrors(fields);
      const first = Object.keys(fields)[0];
      if (first) revealField(first);
      setSubmitting(false);
    }
  };

  const decline = async () => {
    setSubmitting(true);
    try {
      await apiClient.post(`${BASE}/${token}/decline`, {
        reason: declineReason.trim(),
      });
      setOutcome('declined');
    } finally {
      setSubmitting(false);
      setDeclineOpen(false);
    }
  };

  if (loading) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-3'>
        <Loader2 className='h-8 w-8 animate-spin text-accent' />
        <p className='text-gray-500'>Loading your letter…</p>
      </div>
    );
  }

  if (outcome === 'signed') {
    return (
      <Outcome
        icon={<CheckCircle2 className='h-10 w-10 text-white' />}
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
        icon={<X className='h-10 w-10 text-white' />}
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
            <CheckCircle2 className='h-10 w-10 text-white' />
          ) : (
            <Clock className='h-10 w-10 text-white' />
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
    <div className='mx-auto max-w-3xl px-4 pb-44 pt-8 sm:px-6 sm:pt-14'>
      <Letter
        values={values}
        editable={(key) => editableSet.has(key)}
        errors={errors}
        onChange={patch}
      />

      <div className='fixed inset-x-0 bottom-0 border-t border-gray-200 bg-white/95 backdrop-blur'>
        <div className='mx-auto max-w-3xl px-4 py-5 sm:px-6'>
          <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
            <label
              className={`flex max-w-xl cursor-pointer items-start gap-3 rounded-md p-1 text-[13px] leading-relaxed transition-colors ${
                consentMissing ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <Checkbox
                checked={consent}
                onCheckedChange={(v) => {
                  setConsent(v === true);
                  setConsentTouched(true);
                }}
                className={`mt-0.5 ${consentMissing ? 'border-red-400' : ''}`}
              />
              <span>
                I agree that signing here is valid electronic acceptance under
                the <em>Electronic Transactions (Victoria) Act 2000</em>, and is
                binding without a handwritten signature.
              </span>
            </label>

            <div className='flex shrink-0 items-center gap-3'>
              <Button
                variant='outline'
                size='lg'
                onClick={() => setDeclineOpen(true)}
                disabled={submitting}
                className='border-gray-200 text-gray-600 hover:bg-gray-50'
              >
                Decline
              </Button>
              <Button
                size='lg'
                onClick={sign}
                disabled={submitting}
                className='gap-2 rounded-none bg-accent px-8 font-semibold text-primary hover:bg-accent-light'
              >
                {submitting ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <PenLine className='h-4 w-4' />
                )}
                {isVendor ? 'Accept & sign' : 'Submit & sign'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {declineOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm'>
          <div className='w-full max-w-md rounded-none border border-border bg-card p-6'>
            <h3 className='mb-2 text-lg font-bold text-foreground'>
              Decline this letter?
            </h3>
            <p className='mb-4 text-sm text-gray-500'>
              Your broker will be notified. You can add a reason if you would
              like to.
            </p>
            <Textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder='Reason (optional)'
              rows={3}
            />
            <div className='mt-5 flex justify-end gap-3'>
              <Button variant='outline' onClick={() => setDeclineOpen(false)}>
                Go back
              </Button>
              <Button
                onClick={decline}
                disabled={submitting}
                className='bg-red-600 text-white hover:bg-red-700'
              >
                {submitting ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  'Decline'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Outcome({
  icon,
  title,
  body,
  tone = 'brand',
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tone?: 'brand' | 'neutral';
}) {
  return (
    <div className='flex min-h-screen items-center justify-center p-6'>
      <div className='w-full max-w-md overflow-hidden rounded-none border border-border bg-card text-center'>
        <div
          className={`px-8 py-12 ${
            tone === 'brand'
              ? 'bg-linear-to-br from-primary to-secondary'
              : 'bg-linear-to-br from-gray-500 to-gray-600'
          }`}
        >
          <div className='mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/20'>
            {icon}
          </div>
          <h2 className='text-2xl font-bold text-white'>{title}</h2>
        </div>
        <div className='p-8'>
          <p className='text-sm leading-relaxed text-gray-600'>{body}</p>
          <div className='mt-6 border-t border-gray-100 pt-6'>
            <Image
              src={BRAND.logo}
              alt={BRAND.tradingName}
              width={BRAND.logoWidth}
              height={BRAND.logoHeight}
              className='mx-auto h-9 w-auto'
            />
            <p className='mt-3 text-xs text-gray-400'>
              {BRAND.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
