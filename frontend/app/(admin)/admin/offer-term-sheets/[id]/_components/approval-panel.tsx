'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { AlertTriangle, CheckCircle2, Loader2, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  STOCK_TREATMENT_OPTIONS,
  formatMoney,
  type OfferTermSheet,
} from '@/components/offer-term-sheet';

export function ApprovalPanel({
  sheet,
  busyAction,
  onApprove,
  onRequestChanges,
}: {
  sheet: OfferTermSheet;
  busyAction: string | null;
  onApprove: (note: string) => void;
  onRequestChanges: (note: string) => void;
}) {
  const [note, setNote] = useState('');
  const [changesOpen, setChangesOpen] = useState(false);
  const [changesNote, setChangesNote] = useState('');

  const toVendor = sheet.status === 'pending_approval_vendor';
  const recipient = toVendor
    ? sheet.vendorEmail
    : sheet.buyerInviteEmail || sheet.purchaserEmail;

  return (
    <div className='rounded-none border border-accent/25 bg-accent/5 p-5 sm:p-6'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div>
          <h2 className='text-base font-bold text-foreground'>
            {toVendor ? 'Approve to send to the vendor' : 'Approve to send to the buyer'}
          </h2>
          <p className='mt-0.5 text-sm text-muted-foreground'>
            {toVendor
              ? 'The buyer has signed. Check the terms below before this goes to the vendor.'
              : 'Check the business, vendor and inclusions before the buyer receives it.'}
          </p>
        </div>
        <p className='text-sm text-muted-foreground'>
          Goes to <span className='font-semibold'>{recipient || '-'}</span>
        </p>
      </div>

      {toVendor && <TermsAtAGlance sheet={sheet} />}

      <div className='mt-5 space-y-3'>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder='Optional note recorded against this approval'
          rows={2}
          className='border-border bg-card'
        />
        <div className='flex flex-wrap justify-end gap-2'>
          <Button
            variant='outline'
            onClick={() => setChangesOpen(true)}
            className='gap-2 border-amber-300 bg-card text-amber-700 hover:bg-amber-50'
          >
            <Undo2 className='h-4 w-4' /> Request changes
          </Button>
          <Button
            onClick={() => onApprove(note.trim())}
            disabled={busyAction === 'approve'}
            className='gap-2 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'
          >
            {busyAction === 'approve' ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <CheckCircle2 className='h-4 w-4' />
            )}
            {toVendor ? 'Approve & send to vendor' : 'Approve & send to buyer'}
          </Button>
        </div>
      </div>

      {changesOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm'>
          <div className='w-full max-w-md rounded-none bg-card p-6 shadow-xl'>
            <h3 className='mb-2 text-lg font-bold text-foreground'>
              Request changes
            </h3>
            <p className='mb-4 text-sm text-muted-foreground'>
              This goes back to the broker. Your note is the only instruction
              they receive.
            </p>

            {toVendor && (
              <div className='mb-4 flex gap-2 rounded-none border border-amber-200 bg-amber-50 px-4 py-3'>
                <AlertTriangle className='mt-0.5 h-4 w-4 shrink-0 text-amber-600' />
                <p className='text-sm text-amber-800'>
                  The buyer has already signed. Sending this back clears their
                  signature, and they will need to sign again.
                </p>
              </div>
            )}

            <Textarea
              value={changesNote}
              onChange={(e) => setChangesNote(e.target.value)}
              placeholder='What needs to change?'
              rows={4}
              autoFocus
            />

            <div className='mt-5 flex justify-end gap-3'>
              <Button variant='outline' onClick={() => setChangesOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setChangesOpen(false);
                  onRequestChanges(changesNote.trim());
                }}
                disabled={!changesNote.trim() || busyAction === 'request_changes'}
                className='bg-amber-500 text-white hover:bg-amber-600'
              >
                {busyAction === 'request_changes' ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  'Send back to broker'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TermsAtAGlance({ sheet }: { sheet: OfferTermSheet }) {
  const stock = STOCK_TREATMENT_OPTIONS.find(
    (o) => o.value === sheet.stockTreatment,
  )?.label;

  const settlement =
    sheet.settlementMode === 'date' && sheet.settlementDate
      ? format(new Date(sheet.settlementDate), 'dd MMM yyyy')
      : sheet.settlementMode === 'weeks' && sheet.settlementWeeks
        ? `${sheet.settlementWeeks} weeks after contract`
        : '-';

  const conditions: string[] = [];
  if (sheet.subjectTo?.dueDiligenceEnabled) {
    conditions.push(
      `Due Diligence ${sheet.subjectTo.dueDiligenceDays ?? '-'} days`,
    );
  }
  if (sheet.subjectTo?.leaseTransfer) conditions.push('Lease transfer approval');
  if (sheet.subjectTo?.financeApproval) conditions.push('Finance approval');
  if (sheet.subjectTo?.transitionEnabled) {
    conditions.push(
      `Transition support ${sheet.subjectTo.transitionWeeks ?? '-'} weeks`,
    );
  }
  if (sheet.subjectTo?.otherEnabled && sheet.subjectTo.otherText) {
    conditions.push(sheet.subjectTo.otherText);
  }

  return (
    <div className='mt-5 rounded-none border border-border bg-card p-4'>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
        <Stat label='Purchase price' value={formatMoney(sheet.purchasePrice)} />
        <Stat label='Deposit' value={formatMoney(sheet.depositAmount)} />
        <Stat label='Balance' value={formatMoney(sheet.balanceAmount)} />
        <Stat label='Settlement' value={settlement} />
      </div>

      {stock && <p className='mt-3 text-sm text-muted-foreground'>{stock}</p>}

      <div className='mt-4 border-t border-border pt-3'>
        <p className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
          Subject to
        </p>
        {conditions.length ? (
          <ul className='mt-2 flex flex-wrap gap-2'>
            {conditions.map((c) => (
              <li
                key={c}
                className='rounded-none bg-muted px-3 py-1 text-xs text-foreground/80'
              >
                {c}
              </li>
            ))}
          </ul>
        ) : (
          <p className='mt-1 text-sm text-muted-foreground'>No conditions.</p>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className='text-xs text-muted-foreground'>{label}</p>
      <p className='mt-0.5 text-base font-bold text-foreground'>{value}</p>
    </div>
  );
}
