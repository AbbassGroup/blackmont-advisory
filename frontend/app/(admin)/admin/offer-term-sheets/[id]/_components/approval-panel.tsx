'use client';

import { useId, useState } from 'react';
import { format } from 'date-fns';
import { AlertTriangle, CheckCircle2, Loader2, Undo2 } from 'lucide-react';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { STOCK_TREATMENT_OPTIONS, formatMoney, type OfferTermSheet } from '@/components/offer-term-sheet';
import { TEXTAREA_CLASS } from './presentation';

export function ApprovalPanel({
  sheet, busyAction, error, onApprove, onRequestChanges,
}: {
  sheet: OfferTermSheet;
  busyAction: string | null;
  error?: string;
  onApprove: (note: string) => Promise<boolean>;
  onRequestChanges: (note: string) => Promise<boolean>;
}) {
  const prefix = useId();
  const [note, setNote] = useState('');
  const [changesOpen, setChangesOpen] = useState(false);
  const [changesNote, setChangesNote] = useState('');
  const toVendor = sheet.status === 'pending_approval_vendor';
  const recipient = toVendor ? sheet.vendorEmail : sheet.buyerInviteEmail || sheet.purchaserEmail;
  const busy = Boolean(busyAction);

  return (
    <section aria-labelledby={`${prefix}-title`} className='flex min-w-0 flex-col gap-5 border border-advisory-rule bg-white p-5 min-[681px]:p-8'>
      <div>
        <h2 id={`${prefix}-title`} className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold tracking-normal text-midnight'>
          {toVendor ? 'Approve to send to the vendor' : 'Approve to send to the buyer'}
        </h2>
        <p className='mt-2 mb-0 text-sm leading-[1.75] text-ink'>
          {toVendor ? 'The buyer has signed. Check the terms below before this goes to the vendor.' : 'Check the business, vendor and inclusions before the buyer receives it.'}
        </p>
        <p className='mt-3 mb-0 break-words text-sm leading-[1.75] text-ink'>Goes to <span className='font-semibold text-midnight'>{recipient || '—'}</span></p>
      </div>

      {toVendor && <TermsAtAGlance sheet={sheet} />}

      <div className='flex flex-col gap-2'>
        <label htmlFor={`${prefix}-note`} className='text-sm font-medium text-midnight'>Approval note <span className='font-normal text-ink'>(optional)</span></label>
        <textarea id={`${prefix}-note`} value={note} disabled={busy} onChange={(event) => setNote(event.target.value)} placeholder='Optional note recorded against this approval' rows={2} className={TEXTAREA_CLASS} />
      </div>
      <div className='flex flex-col gap-3 min-[681px]:flex-row min-[681px]:flex-wrap min-[681px]:justify-end'>
        <LandingButton variant='outline' size='compact' disabled={busy} onClick={() => setChangesOpen(true)}>
          <Undo2 aria-hidden='true' className='size-4' /> Request changes
        </LandingButton>
        <LandingButton size='compact' onClick={() => void onApprove(note.trim())} disabled={busy}>
          {busyAction === 'approve' ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <CheckCircle2 aria-hidden='true' className='size-4' />}
          {busyAction === 'approve' ? 'Approving…' : toVendor ? 'Approve & send to vendor' : 'Approve & send to buyer'}
        </LandingButton>
      </div>

      <Dialog open={changesOpen} onOpenChange={(open) => { if (!busy) setChangesOpen(open); }}>
        <DialogContent showCloseButton={false} className={cn(landingFontVariables, 'max-h-[85dvh] overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-midnight ring-0 sm:max-w-[500px] min-[681px]:p-8')}>
          <DialogHeader>
            <DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>Request changes</DialogTitle>
            <DialogDescription className='mt-3 text-sm leading-[1.8] text-ink'>This goes back to the broker. Your note is the only instruction they receive.</DialogDescription>
          </DialogHeader>
          {toVendor && <p className='m-0 flex items-start gap-3 bg-amber-50 p-4 text-sm leading-[1.75] text-amber-900'><AlertTriangle aria-hidden='true' className='mt-1 size-4 shrink-0' />The buyer has already signed. Sending this back clears their signature, and they will need to sign again.</p>}
          <div className='flex flex-col gap-2'>
            <label htmlFor={`${prefix}-changes`} className='text-sm font-medium'>What needs to change?</label>
            <textarea id={`${prefix}-changes`} value={changesNote} disabled={busy} onChange={(event) => setChangesNote(event.target.value)} placeholder='What needs to change?' rows={4} className={TEXTAREA_CLASS} />
          </div>
          {error && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{error}</p>}
          <div className='flex flex-wrap justify-end gap-3'>
            <LandingButton variant='outline' size='compact' disabled={busy} onClick={() => setChangesOpen(false)}>Cancel</LandingButton>
            <LandingButton size='compact' disabled={!changesNote.trim() || busy} onClick={async () => { if (await onRequestChanges(changesNote.trim())) setChangesOpen(false); }}>
              {busyAction === 'request_changes' && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}
              {busyAction === 'request_changes' ? 'Sending…' : 'Send back to broker'}
            </LandingButton>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function TermsAtAGlance({ sheet }: { sheet: OfferTermSheet }) {
  const stock = STOCK_TREATMENT_OPTIONS.find((option) => option.value === sheet.stockTreatment)?.label;
  const settlement = sheet.settlementMode === 'date' && sheet.settlementDate
    ? format(new Date(sheet.settlementDate), 'dd MMM yyyy')
    : sheet.settlementMode === 'weeks' && sheet.settlementWeeks ? `${sheet.settlementWeeks} weeks after contract` : '—';
  const conditions: string[] = [];
  if (sheet.subjectTo?.dueDiligenceEnabled) conditions.push(`Due Diligence ${sheet.subjectTo.dueDiligenceDays ?? '-'} days`);
  if (sheet.subjectTo?.leaseTransfer) conditions.push('Lease transfer approval');
  if (sheet.subjectTo?.financeApproval) conditions.push('Finance approval');
  if (sheet.subjectTo?.transitionEnabled) conditions.push(`Transition support ${sheet.subjectTo.transitionWeeks ?? '-'} weeks`);
  if (sheet.subjectTo?.otherEnabled && sheet.subjectTo.otherText) conditions.push(sheet.subjectTo.otherText);

  return (
    <div className='flex flex-col gap-4 bg-canvas p-5'>
      <dl className='m-0 grid gap-5 min-[681px]:grid-cols-2 min-[1121px]:grid-cols-4'>
        <Stat label='Purchase price' value={formatMoney(sheet.purchasePrice)} />
        <Stat label='Deposit' value={formatMoney(sheet.depositAmount)} />
        <Stat label='Balance' value={formatMoney(sheet.balanceAmount)} />
        <Stat label='Settlement' value={settlement} />
      </dl>
      {stock && <p className='m-0 text-sm leading-[1.75] text-ink'>{stock}</p>}
      <div className='border-t border-advisory-rule pt-4'>
        <p className='mt-0 mb-2 text-sm font-semibold text-midnight'>Subject to</p>
        {conditions.length ? (
          <ul className='m-0 flex list-disc flex-col gap-1 pl-5 text-sm leading-[1.75] text-ink'>{conditions.map((condition) => <li key={condition}>{condition}</li>)}</ul>
        ) : <p className='m-0 text-sm text-ink'>No conditions.</p>}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className='min-w-0'><dt className='text-xs leading-[1.75] text-ink'>{label}</dt><dd className='mt-1 mb-0 break-words text-base font-semibold text-midnight'>{value}</dd></div>;
}
