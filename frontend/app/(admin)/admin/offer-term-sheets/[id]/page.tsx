'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { AlertCircle, ArrowLeft, Ban, CloudUpload, Eye, Loader2, Send } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  EDITABLE_STATUSES,
  STATUS_CLASSES,
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
});

export default function OfferTermSheetEditorPage() {
  const params = useParams();
  const id = params?.id as string;

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
    if (!form) return false;

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
    setBusyAction(action);
    setError('');
    setMissing([]);
    try {
      const { data } = await apiClient.post(`${BASE}/${id}/${action}`, body);
      applyResponse(data);
    } catch (e: unknown) {
      const response = (e as { response?: { data?: { message?: string; missing?: string[] } } })
        .response;
      const gaps = response?.data?.missing ?? [];
      setMissing(gaps);
      if (gaps.length) revealField(gaps[0]);
      else setError(messageFrom(e, 'That action could not be completed.'));
    } finally {
      setBusyAction(null);
    }
  };

  const openHistory = async () => {
    setHistoryOpen(true);
    setViewsLoading(true);
    try {
      const { data } = await apiClient.get(`${BASE}/${id}/views`);
      setViews(data.views ?? []);
    } catch {
      setViews([]);
    } finally {
      setViewsLoading(false);
    }
  };

  const submit = async () => {
    if (!form) return;

    // Checked here first so nothing round-trips just to be told a box is empty.
    const gaps = missingRequiredFields('broker', form).map((f) => f.key);
    if (!form.buyerInviteEmail) gaps.push('buyerInviteEmail');

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
      <div className='flex min-h-[60vh] flex-col items-center justify-center gap-3'>
        <Loader2 className='h-8 w-8 animate-spin text-accent' />
        <p className='text-muted-foreground'>Loading term sheet...</p>
      </div>
    );
  }

  if (loadError || !sheet || !form || !meta) {
    return (
      <div className='flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center'>
        <div className='flex items-center gap-2 rounded-none border border-red-100 bg-red-50 px-5 py-4 text-red-600'>
          <AlertCircle className='h-5 w-5' />
          <span className='text-sm font-medium'>{loadError}</span>
        </div>
        <Link href='/admin/offer-term-sheets'>
          <Button variant='outline'>Back to term sheets</Button>
        </Link>
      </div>
    );
  }

  const canSubmit = meta.availableActions.includes('submit');
  const canCancel = meta.availableActions.includes('cancel');
  const canApprove = meta.availableActions.includes('approve');

  return (
    <div className='space-y-6 pb-24'>
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <Link
            href='/admin/offer-term-sheets'
            className='mb-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent'
          >
            <ArrowLeft className='h-4 w-4' /> All term sheets
          </Link>
          <h1 className='text-2xl font-bold text-foreground'>
            {sheet.businessName || 'Untitled term sheet'}
          </h1>
          <p className='mt-0.5 text-sm text-foreground/50'>
            Created {format(new Date(sheet.createdAt), 'dd MMM yyyy')}
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={openHistory}
            className='gap-1.5 border-border text-muted-foreground'
          >
            <Eye className='h-4 w-4' /> View history
          </Button>
          <span
            className={cn(
              'inline-flex rounded-none px-3 py-1 text-xs font-medium',
              STATUS_CLASSES[sheet.status],
            )}
          >
            {STATUS_LABELS[sheet.status]}
          </span>
          {meta.waitingOn && (
            <span className='text-xs text-muted-foreground/70'>
              Waiting on {WAITING_LABELS[meta.waitingOn].toLowerCase()}
            </span>
          )}
        </div>
      </div>

      {changesNote && (
        <div className='rounded-none border border-amber-200 bg-amber-50 px-5 py-4'>
          <p className='text-sm font-semibold text-amber-800'>
            Changes requested
          </p>
          <p className='mt-1 text-sm text-amber-700'>{changesNote}</p>
        </div>
      )}

      {canApprove && (
        <ApprovalPanel
          sheet={sheet}
          busyAction={busyAction}
          onApprove={(note) => runAction('approve', { note })}
          onRequestChanges={(note) => runAction('request_changes', { note })}
        />
      )}

      {!editable && !canApprove && (
        <div className='rounded-none border border-border bg-muted px-5 py-4 text-sm text-muted-foreground'>
          {statusExplainer(sheet.status)}
        </div>
      )}

      {error && (
        <div className='flex items-center gap-2 rounded-none border border-red-100 bg-red-50 px-5 py-3.5 text-sm text-red-600'>
          <AlertCircle className='h-4 w-4 shrink-0' />
          {error}
        </div>
      )}

      <div className='overflow-hidden rounded-none border border-border bg-card shadow-sm'>
        <div className='px-6 py-5 sm:px-8'>
          <p className='text-center text-sm font-bold text-foreground'>
            Letter of Intent (Non-Binding Offer Letter)
          </p>
        </div>

        <BrokerForm
          values={form}
          readOnly={!editable}
          invalid={new Set(missing)}
          errors={fieldErrors}
          onChange={patch}
        />
        <PartySummary sheet={sheet} />
      </div>

      {(editable || canCancel) && (
        <div className='fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 py-3 backdrop-blur md:left-(--sidebar-width,0px)'>
          <div className='mx-auto flex max-w-5xl items-center justify-between gap-3'>
            <span className='flex items-center gap-2 text-sm text-muted-foreground'>
              {saving ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin' /> Saving...
                </>
              ) : dirty ? (
                <>
                  <CloudUpload className='h-4 w-4 text-amber-500' /> Unsaved
                  changes
                </>
              ) : (
                'All changes saved'
              )}
            </span>

            <div className='flex items-center gap-2'>
              {canCancel && (
                <Button
                  variant='outline'
                  onClick={() => setConfirmCancel(true)}
                  className='gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700'
                >
                  <Ban className='h-4 w-4' /> Cancel
                </Button>
              )}
              {editable && (
                <Button
                  variant='outline'
                  onClick={save}
                  disabled={!dirty || saving}
                >
                  Save draft
                </Button>
              )}
              {canSubmit && (
                <Button
                  onClick={submit}
                  disabled={saving || busyAction === 'submit'}
                  className='gap-2 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'
                >
                  {busyAction === 'submit' ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    <Send className='h-4 w-4' />
                  )}
                  Send for approval
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <OfferTermSheetHistoryDialog
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        logs={views}
        loading={viewsLoading}
        businessName={sheet.businessName}
      />

      {confirmCancel && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm'>
          <div className='w-full max-w-sm rounded-none bg-card p-6 shadow-xl'>
            <h3 className='mb-2 text-lg font-bold text-foreground'>
              Cancel this term sheet?
            </h3>
            <p className='mb-6 text-sm text-muted-foreground'>
              It stops here permanently. Any link already sent to the buyer or
              vendor stops working.
            </p>
            <div className='flex justify-end gap-3'>
              <Button variant='outline' onClick={() => setConfirmCancel(false)}>
                Keep it
              </Button>
              <Button
                onClick={async () => {
                  setConfirmCancel(false);
                  await runAction('cancel');
                }}
                disabled={busyAction === 'cancel'}
                className='bg-red-600 text-white hover:bg-red-700'
              >
                {busyAction === 'cancel' ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  'Cancel term sheet'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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
