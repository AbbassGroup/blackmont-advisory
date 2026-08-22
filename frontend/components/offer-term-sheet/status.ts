import type { SheetStatus, WaitingOn } from './types';

export const STATUS_LABELS: Record<SheetStatus, string> = {
  draft: 'Draft',
  changes_requested: 'Changes requested',
  pending_approval_buyer: 'Awaiting approval',
  sent_to_buyer: 'With buyer',
  pending_approval_vendor: 'Awaiting approval',
  sent_to_vendor: 'With vendor',
  completed: 'Signed',
  declined: 'Declined',
  cancelled: 'Cancelled',
};

export const STATUS_CLASSES: Record<SheetStatus, string> = {
  draft: 'bg-muted text-muted-foreground',
  changes_requested: 'bg-amber-100 text-amber-700',
  pending_approval_buyer: 'bg-indigo-100 text-indigo-700',
  sent_to_buyer: 'bg-blue-100 text-blue-700',
  pending_approval_vendor: 'bg-indigo-100 text-indigo-700',
  sent_to_vendor: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  declined: 'bg-red-100 text-red-700',
  cancelled: 'bg-muted text-muted-foreground/70',
};

export const WAITING_LABELS: Record<NonNullable<WaitingOn>, string> = {
  broker: 'Broker',
  superadmin: 'Approver',
  buyer: 'Buyer',
  vendor: 'Vendor',
};

// Statuses in which the owning broker may still edit the letter.
export const EDITABLE_STATUSES: SheetStatus[] = ['draft', 'changes_requested'];

const AUD = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

export function formatMoney(value: number | null | undefined): string {
  return typeof value === 'number' && Number.isFinite(value)
    ? AUD.format(value)
    : '-';
}
