'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { AlertCircle, ArrowLeft, Ban, CloudUpload, Eye, Loader2, Send } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSidebar } from '@/components/ui/sidebar';
import { STATUS_STYLE } from './_components/presentation';
import { cn } from '@/lib/utils';
import {
  EDITABLE_STATUSES,
  STATUS_LABELS,
  WAITING_LABELS,
  computeAmounts,
  depositExceedsPrice,
  isDefaultDeposit,
  missingRequiredFields,
  type OfferTermSheet,
  type SheetMeta,
} from '@/components/offer-term-sheet';
import {
  OfferTermSheetHistoryDialog,
  type OfferTermSheetViewLog,
} from '@/components/admin/offer-term-sheet-history-dialog';
import { ApprovalPanel } from './_components/approval-panel';
import { BrokerForm, type BrokerFormValues } from './_components/broker-form';
import { PartySummary } from './_components/party-summary';

const BASE = '/api/offer-term-sheets';

// Brings the first unfilled field into view and focuses it.
function revealField(key: string) {
  const target = document.querySelector<HTMLElement>(`[data-field="${key}"]`);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  target.querySelector<HTMLElement>('input, select, textarea')?.focus({ preventScroll: true });
}

const toForm = (sheet: OfferTermSheet): BrokerFormValues => ({
  businessName: sheet.businessName ?? '',
  businessAddress: sheet.businessAddress ?? '',
  vendorName: sheet.vendorName ?? '',
  vendorEmail: sheet.vendorEmail ?? '',
  buyerInviteEmail: sheet.buyerInviteEmail ?? '',
  purchasePrice: sheet.purchasePrice ?? null,
  depositAmount: sheet.depositAmount ?? null,
  inclusions: { ...sheet.inclusions },
  subjectTo: { ...sheet.subjectTo },
});

export default function OfferTermSheetEditorPage() {
  const params = useParams();
  const id = params?.id as string;
  const { state: sidebarState } = useSidebar();

  const [sheet, setSheet] = useState<OfferTermSheet | null>(null);
  const [meta, setMeta] = useState<SheetMeta | null>(null);
  const [form, setForm] = useState<BrokerFormValues | null>(null);
  const [baseline, setBaseline] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [missing, setMissing] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [views, setViews] = useState<OfferTermSheetViewLog[]>([]);
  const [viewsLoading, setViewsLoading] = useState(false);
  const [viewsError, setViewsError] = useState(false);
  const historyRequest = useRef(0);

  const applyResponse = useCallback(
    (data: { sheet: OfferTermSheet; meta: SheetMeta }) => {
      const next = toForm(data.sheet);
      setSheet(data.sheet);
      setMeta(data.meta);
      setForm(next);
      setBaseline(JSON.stringify(next));
    },
    [],
  );

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError('');
    apiClient
      .get(`${BASE}/${id}`)
      .then(({ data }) => active && applyResponse(data))
      .catch((e) => {
        if (!active) return;
        setLoadError(
          e?.response?.status === 403
            ? 'You do not have access to this term sheet.'
            : 'This term sheet could not be found.',
        );
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id, applyResponse]);

  const editable = !!sheet && EDITABLE_STATUSES.includes(sheet.status);
  const dirty = !!form && JSON.stringify(form) !== baseline;
  const busy = saving || Boolean(busyAction);

  const changesNote = useMemo(() => {
    if (sheet?.status !== 'changes_requested') return '';
    return (
      [...(sheet.auditTrail ?? [])]
        .reverse()
        .find((entry) => entry.action === 'request_changes')?.note ?? ''
    );
  }, [sheet]);

  const patch = (next: Partial<BrokerFormValues>) => {
    setForm((current) => {
      if (!current) return current;
      const merged = { ...current, ...next };
      // A deposit still sitting at the default follows the price; one that was
      // typed deliberately is left as it stands.
      if (
        next.purchasePrice !== undefined &&
        current.depositAmount !== null &&
        isDefaultDeposit(current.purchasePrice, current.depositAmount)
      ) {
        merged.depositAmount = computeAmounts(
          merged.purchasePrice,
        ).depositAmount;
      }
      return merged;
    });
    setMissing([]);
    setFieldErrors({});
    setError('');
  };

  const save = async () => {
    if (!form || busy) return false;

    // Caught here so a figure that cannot go on the letter never round-trips.
    if (depositExceedsPrice(form.purchasePrice, form.depositAmount)) {
      setFieldErrors({
        depositAmount: 'The deposit cannot be more than the purchase price.',
      });
      revealField('depositAmount');
      return false;
    }

    setSaving(true);
    setError('');
    try {
      const { data } = await apiClient.put(`${BASE}/${id}`, form);
      applyResponse(data);
      return true;
    } catch (e: unknown) {
      const fields = (
        e as { response?: { data?: { fields?: Record<string, string> } } }
      )?.response?.data?.fields;
      if (fields && Object.keys(fields).length) {
        setFieldErrors(fields);
        revealField(Object.keys(fields)[0]);
      } else {
        setError(messageFrom(e, 'Could not save. Please try again.'));
      }
      return false;
    } finally {
      setSaving(false);
    }
  };

  const runAction = async (action: string, body: object = {}) => {
    if (busy) return false;
    setBusyAction(action);
    setError('');
    setMissing([]);
    try {
      const { data } = await apiClient.post(`${BASE}/${id}/${action}`, body);
      applyResponse(data);
      return true;
    } catch (e: unknown) {
      const response = (e as { response?: { data?: { message?: string; missing?: string[] } } })
        .response;
      const gaps = response?.data?.missing ?? [];
      setMissing(gaps);
      if (gaps.length) revealField(gaps[0]);
      else setError(messageFrom(e, 'That action could not be completed.'));
      return false;
    } finally {
      setBusyAction(null);
    }
  };

  const openHistory = async () => {
    const request = ++historyRequest.current;
    setHistoryOpen(true);
    setViews([]);
    setViewsError(false);
    setViewsLoading(true);
    try {
      const { data } = await apiClient.get(`${BASE}/${id}/views`);
      if (request === historyRequest.current) setViews(data.views ?? []);
    } catch {
      if (request === historyRequest.current) setViewsError(true);
    } finally {
      if (request === historyRequest.current) setViewsLoading(false);
    }
  };

  const submit = async () => {
    if (!form || busy) return;

    // Checked here first so nothing round-trips just to be told a box is empty.
    const gaps = missingRequiredFields('broker', form).map((f) => f.key);
    if (!form.buyerInviteEmail) gaps.push('buyerInviteEmail');
    gaps.push(
      ...missingRequiredFields('buyer', form)
        .filter((field) => field.key.startsWith('subjectTo.'))
        .map((field) => field.key),
    );

    setMissing(gaps);
    if (gaps.length) {
      revealField(gaps[0]);
      return;
    }

    if (dirty && !(await save())) return;
    await runAction('submit');
  };


  if (loading) {
    return (
      <AdminPageLayout title='Offer term sheet' description='Review business details, offer terms and signatures.' action={<div aria-hidden='true' className='h-10 w-36 animate-pulse bg-advisory-rule/60 motion-reduce:animate-none' />}>
        <p role='status' className='sr-only'>Loading term sheet.</p>
        <div aria-hidden='true' className='flex flex-col gap-8 pb-28'>
          <div className='h-5 w-32 animate-pulse bg-advisory-rule/60 motion-reduce:animate-none' />
          <div className='h-16 border border-advisory-rule bg-white' />
          <div className='border border-advisory-rule bg-white'>
            <div className='border-b border-advisory-rule p-5 min-[681px]:p-8'><div className='h-7 w-2/3 animate-pulse bg-canvas motion-reduce:animate-none' /></div>
            {[0, 1, 2].map((index) => <div key={index} className='flex flex-col gap-5 border-b border-advisory-rule p-5 min-[681px]:p-8'><div className='h-6 w-40 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='grid gap-5 min-[681px]:grid-cols-2'>{[0, 1].map((field) => <div key={field} className='flex flex-col gap-2'><div className='h-4 w-28 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-10 animate-pulse bg-canvas motion-reduce:animate-none' /></div>)}</div></div>)}
          </div>
        </div>
      </AdminPageLayout>
    );
  }

  if (loadError || !sheet || !form || !meta) {
    return (
      <AdminPageLayout title='Offer term sheet' description='Your term sheet could not be opened.'>
        <section role='alert' className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
          <p className='mt-0 mb-5 text-sm leading-[1.75] text-ink'>{loadError || 'This term sheet could not be found.'}</p>
          <LandingButtonLink href='/admin/offer-term-sheets' variant='outline' size='compact'>Back to term sheets</LandingButtonLink>
        </section>
      </AdminPageLayout>
    );
  }

  const canSubmit = meta.availableActions.includes('submit');
  const canCancel = meta.availableActions.includes('cancel');
  const canApprove = meta.availableActions.includes('approve');

  return (
    <AdminPageLayout
      title='Offer term sheet'
      description='Review business details, offer terms and signatures.'
      action={<LandingButton variant='outline' size='compact' onClick={() => void openHistory()}><Eye aria-hidden='true' className='size-4' /> View history</LandingButton>}
    >
      <div className='flex min-w-0 flex-col gap-8 pb-[calc(10rem+env(safe-area-inset-bottom))] min-[681px]:pb-28'>
        <div>
          <LandingButtonLink href='/admin/offer-term-sheets' variant='outline' size='compact'><ArrowLeft aria-hidden='true' className='size-4' /> All term sheets</LandingButtonLink>
        </div>

        <div className='flex flex-wrap items-center gap-x-5 gap-y-3 border border-advisory-rule bg-white px-5 py-4 min-[681px]:px-8'>
          <span className={cn('inline-flex px-2.5 py-1 text-xs leading-[1.5] font-medium', STATUS_STYLE[sheet.status])}>{STATUS_LABELS[sheet.status]}</span>
          {meta.waitingOn && <span className='text-sm text-ink'>Waiting on <span className='font-medium text-midnight'>{WAITING_LABELS[meta.waitingOn].toLowerCase()}</span></span>}
          <span className='text-xs leading-[1.75] text-ink min-[681px]:ml-auto'>Created {displayDate(sheet.createdAt)}</span>
        </div>

        {changesNote && (
          <div className='bg-amber-50 p-5 min-[681px]:p-6'>
            <h2 className='m-0 text-sm font-semibold text-amber-900'>Changes requested</h2>
            <p className='mt-2 mb-0 whitespace-pre-wrap text-sm leading-[1.75] text-amber-900'>{changesNote}</p>
          </div>
        )}

        {canApprove && <ApprovalPanel sheet={sheet} busyAction={busyAction} error={error} onApprove={(note) => runAction('approve', { note })} onRequestChanges={(note) => runAction('request_changes', { note })} />}

        {!editable && !canApprove && <p className='m-0 border border-advisory-rule bg-white px-5 py-4 text-sm leading-[1.75] text-ink min-[681px]:px-8'>{statusExplainer(sheet.status)}</p>}

        {error && !confirmCancel && <p role='alert' className='m-0 flex items-start gap-3 border border-red-200 bg-red-50 px-5 py-4 text-sm leading-[1.75] text-red-800'><AlertCircle aria-hidden='true' className='mt-1 size-4 shrink-0' />{error}</p>}

        <div className='min-w-0 border border-advisory-rule bg-white'>
          <header className='flex flex-col gap-2 px-5 py-6 min-[681px]:px-8 min-[681px]:py-8'>
            <h2 className='m-0 break-words font-advisory-heading text-[23px] leading-[1.4] font-bold tracking-normal text-midnight'>{sheet.businessName || 'Untitled term sheet'}</h2>
            <p className='m-0 text-sm leading-[1.75] text-ink'>Letter of Intent (Non-Binding Offer Letter)</p>
          </header>
          <fieldset disabled={busy} className='m-0 min-w-0 border-0 p-0'>
            <legend className='sr-only'>Term sheet details</legend>
            <BrokerForm values={form} readOnly={!editable} invalid={new Set(missing)} errors={fieldErrors} onChange={patch} />
            <PartySummary sheet={sheet} subjectTo={form.subjectTo} readOnly={!editable} errors={{ ...Object.fromEntries(missing.map((field) => [field, 'This field is required.'])), ...fieldErrors }} onSubjectToChange={(subjectTo) => patch({ subjectTo })} />
          </fieldset>
        </div>
      </div>

      {(editable || canCancel) && (
        <div className={cn('fixed inset-x-0 bottom-0 z-40 border-t border-advisory-rule bg-white px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]', sidebarState === 'expanded' ? 'md:left-[var(--sidebar-width)]' : 'md:left-[var(--sidebar-width-icon)]')}>
          <div className='mx-auto flex max-w-advisory flex-wrap items-center justify-between gap-3'>
            <p role='status' aria-live='polite' className='m-0 flex items-center gap-2 text-sm text-ink'>
              {saving ? <><Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> Saving…</> : dirty ? <><CloudUpload aria-hidden='true' className='size-4 text-amber-800' /> Unsaved changes</> : 'All changes saved'}
            </p>
            <div className='flex flex-wrap items-center gap-2'>
              {canCancel && <LandingButton variant='outline' size='compact' disabled={busy} onClick={() => { setError(''); setConfirmCancel(true); }} className='border-red-700 text-red-800 hover:bg-red-50 hover:text-red-900'><Ban aria-hidden='true' className='size-4' /> Cancel</LandingButton>}
              {editable && <LandingButton variant='outline' size='compact' onClick={() => void save()} disabled={!dirty || busy}>Save draft</LandingButton>}
              {canSubmit && <LandingButton size='compact' onClick={() => void submit()} disabled={busy}>{busyAction === 'submit' ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <Send aria-hidden='true' className='size-4' />}{busyAction === 'submit' ? 'Submitting…' : 'Send for approval'}</LandingButton>}
            </div>
          </div>
        </div>
      )}

      <OfferTermSheetHistoryDialog
        open={historyOpen}
        onOpenChange={(open) => { setHistoryOpen(open); if (!open) historyRequest.current += 1; }}
        logs={views} loading={viewsLoading} error={viewsError} onRetry={() => void openHistory()} businessName={sheet.businessName}
      />

      <Dialog open={confirmCancel} onOpenChange={(open) => { if (!busy) { setConfirmCancel(open); setError(''); } }}>
        <DialogContent showCloseButton={false} className={cn(landingFontVariables, 'max-h-[85dvh] overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-midnight ring-0 sm:max-w-[460px] min-[681px]:p-8')}>
          <DialogHeader>
            <DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>Cancel this term sheet?</DialogTitle>
            <DialogDescription className='mt-3 text-sm leading-[1.8] text-ink'>It stops here permanently. Any link already sent to the buyer or vendor stops working.</DialogDescription>
          </DialogHeader>
          {error && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{error}</p>}
          <div className='flex flex-wrap justify-end gap-3'>
            <LandingButton variant='outline' size='compact' disabled={busy} onClick={() => { setConfirmCancel(false); setError(''); }}>Keep it</LandingButton>
            <LandingButton size='compact' disabled={busy} onClick={async () => { if (await runAction('cancel')) setConfirmCancel(false); }} className='border-red-700 bg-red-700 text-white hover:bg-red-800'>
              {busyAction === 'cancel' && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}
              {busyAction === 'cancel' ? 'Cancelling…' : 'Cancel term sheet'}
            </LandingButton>
          </div>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}

function displayDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : format(date, 'dd MMM yyyy');
}

function messageFrom(e: unknown, fallback: string) {
  const message = (e as { response?: { data?: { message?: string } } })?.response
    ?.data?.message;
  return message || fallback;
}

function statusExplainer(status: OfferTermSheet['status']) {
  switch (status) {
    case 'pending_approval_buyer':
      return 'Submitted for approval. It becomes editable again only if changes are requested.';
    case 'sent_to_buyer':
      return 'With the buyer. They are completing the offer terms and signing.';
    case 'pending_approval_vendor':
      return 'The buyer has signed. Awaiting approval before it goes to the vendor.';
    case 'sent_to_vendor':
      return 'With the vendor for signature.';
    case 'completed':
      return 'Signed by both parties. This record is final.';
    case 'declined':
      return 'Declined. This record is final.';
    case 'cancelled':
      return 'Cancelled. This record is final.';
    default:
      return '';
  }
}
