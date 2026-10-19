'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Archive, ArchiveRestore, Edit, Eye, Loader2, Plus, Search, Trash2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getBrokerByEmail } from '@/lib/data/brokers';
import { cn } from '@/lib/utils';
import {
  EDITABLE_STATUSES,
  STATUS_LABELS,
  WAITING_LABELS,
  formatMoney,
  type OfferTermSheetRow,
  type SheetStatus,
} from '@/components/offer-term-sheet';

const BASE = '/api/offer-term-sheets';
const TABS = [
  { id: 'active', label: 'Active' },
  { id: 'awaiting', label: 'Awaiting approval' },
  { id: 'completed', label: 'Signed' },
  { id: 'archived', label: 'Archived' },
] as const;
type TabId = (typeof TABS)[number]['id'];
const TAB_PARAMS: Record<TabId, Record<string, string>> = {
  active: {},
  awaiting: { status: 'pending_approval_buyer,pending_approval_vendor' },
  completed: { status: 'completed' },
  archived: { archived: 'true' },
};
const STATUS_STYLE: Record<SheetStatus, string> = {
  draft: 'bg-canvas text-ink',
  changes_requested: 'bg-amber-50 text-amber-900',
  pending_approval_buyer: 'bg-gilt/15 text-midnight',
  pending_approval_vendor: 'bg-gilt/15 text-midnight',
  sent_to_buyer: 'bg-sky-50 text-sky-900',
  sent_to_vendor: 'bg-sky-50 text-sky-900',
  completed: 'bg-emerald-50 text-emerald-800',
  declined: 'bg-red-50 text-red-800',
  cancelled: 'bg-canvas text-ink',
};
const ROW_ACTION_CLASS = 'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center border border-transparent text-ink transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none';

function displayDate(value?: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : format(date, 'dd MMM yyyy, h:mma');
}

export default function OfferTermSheetsPage() {
  const router = useRouter();
  const { user } = useAdminAuth();
  const [tab, setTab] = useState<TabId>('active');
  const [sheets, setSheets] = useState<OfferTermSheetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [creating, setCreating] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ id: string; name: string; permanent: boolean } | null>(null);
  const [listError, setListError] = useState(false);
  const [actionError, setActionError] = useState('');
  const listRequest = useRef(0);
  const controlsBusy = creating || Boolean(actionId);
  const isArchived = tab === 'archived';

  const fetchSheets = useCallback(async () => {
    const request = ++listRequest.current;
    setLoading(true);
    setListError(false);
    try {
      const { data } = await apiClient.get(BASE, {
        params: { page, limit: 10, search, ...TAB_PARAMS[tab] },
      });
      if (request !== listRequest.current) return;
      setSheets(data.sheets ?? []);
      setTotalPages(Math.max(1, data.totalPages ?? 1));
    } catch {
      if (request === listRequest.current) setListError(true);
    } finally {
      if (request === listRequest.current) setLoading(false);
    }
  }, [page, search, tab]);

  useEffect(() => {
    void fetchSheets();
    return () => { listRequest.current += 1; };
  }, [fetchSheets]);

  const handleCreate = async () => {
    if (controlsBusy) return;
    setCreating(true);
    setActionError('');
    try {
      const { data } = await apiClient.post(BASE, {});
      router.push(`/admin/offer-term-sheets/${data.sheet._id}`);
    } catch {
      setActionError('Could not create a term sheet. Please try again.');
      setCreating(false);
    }
  };

  const runAction = async (id: string, action: () => Promise<unknown>) => {
    if (controlsBusy) return;
    setActionId(id);
    setActionError('');
    try {
      await action();
      setConfirmation(null);
      if (sheets.length === 1 && page > 1) setPage((value) => value - 1);
      else await fetchSheets();
    } catch {
      setActionError('That action could not be completed. Please try again.');
    } finally {
      setActionId(null);
    }
  };

  const closeConfirmation = () => {
    if (actionId) return;
    setConfirmation(null);
    setActionError('');
  };

  return (
    <AdminPageLayout
      title='Offer term sheets'
      description='Create and track Letters of Intent through to signature.'
      action={
        <LandingButton size='compact' onClick={() => void handleCreate()} disabled={controlsBusy}>
          {creating ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <Plus aria-hidden='true' className='size-4' />}
          {creating ? 'Creating…' : 'New term sheet'}
        </LandingButton>
      }
    >
      {actionError && !confirmation && (
        <p role='alert' className='m-0 border border-red-200 bg-red-50 px-5 py-4 text-sm leading-[1.75] text-red-800'>{actionError}</p>
      )}

      <section aria-label='Offer term sheets' aria-busy={loading} className='min-w-0 border border-advisory-rule bg-white'>
        <div className='flex flex-col gap-5 border-b border-advisory-rule p-5 min-[681px]:p-6'>
          <div role='group' aria-label='Filter term sheets by stage' className='grid grid-cols-2 gap-1 border border-advisory-rule bg-canvas p-1 min-[681px]:flex min-[681px]:w-fit min-[681px]:flex-wrap'>
            {TABS.map((item) => (
              <button
                key={item.id}
                type='button'
                aria-pressed={tab === item.id}
                disabled={controlsBusy}
                onClick={() => { if (item.id !== tab) { setTab(item.id); setPage(1); } }}
                className={cn('inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 px-4 py-2 text-sm leading-[1.5] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none', tab === item.id ? 'bg-midnight text-white' : 'text-ink hover:bg-white hover:text-midnight')}
              >
                {item.id === 'archived' && <Archive aria-hidden='true' className='size-4 shrink-0' />}
                {item.label}
              </button>
            ))}
          </div>
          <div className='flex flex-col gap-3 min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between'>
            <div className='relative w-full min-w-0 min-[681px]:max-w-md'>
              <label htmlFor='term-sheet-search' className='sr-only'>Search by business, buyer or vendor</label>
              <Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/60' />
              <input
                id='term-sheet-search'
                type='search'
                placeholder='Search by business, buyer or vendor…'
                value={search}
                disabled={controlsBusy}
                onChange={(event) => { setSearch(event.target.value); setPage(1); }}
                className='h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white py-2 pr-3 pl-10 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none min-[681px]:text-sm'
              />
            </div>
            <p className='m-0 shrink-0 text-sm leading-[1.6] text-ink'>
              {loading ? 'Loading term sheets…' : listError ? 'List unavailable' : `${sheets.length} ${sheets.length === 1 ? 'term sheet' : 'term sheets'} on this page`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className='px-5 min-[681px]:px-6'>
            <p role='status' className='sr-only'>Loading term sheets.</p>
            <div aria-hidden='true' className='divide-y divide-advisory-rule'>
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className='flex items-center justify-between gap-8 py-6'>
                  <div className='min-w-0 flex-1 space-y-3'>
                    <div className='h-4 w-2/5 animate-pulse bg-canvas motion-reduce:animate-none' />
                    <div className='h-3 w-3/5 animate-pulse bg-canvas motion-reduce:animate-none' />
                  </div>
                  <div className='h-7 w-24 shrink-0 animate-pulse bg-canvas motion-reduce:animate-none' />
                </div>
              ))}
            </div>
          </div>
        ) : listError ? (
          <div role='alert' className='p-6 min-[681px]:p-8'>
            <h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load your term sheets.</h2>
            <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Please try again to refresh the list.</p>
            <LandingButton variant='outline' size='compact' onClick={() => void fetchSheets()} disabled={controlsBusy}>Try again</LandingButton>
          </div>
        ) : sheets.length === 0 ? (
          <div className='p-6 min-[681px]:p-8'>
            <h2 className='m-0 text-base font-semibold text-midnight'>
              {search ? 'No matching term sheets' : tab === 'archived' ? 'No archived term sheets' : tab === 'awaiting' ? 'Nothing is waiting for approval' : tab === 'completed' ? 'No signed term sheets yet' : 'No term sheets yet'}
            </h2>
            <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>
              {search ? 'Try another business, buyer or vendor name.' : tab === 'archived' ? 'Archived term sheets will appear here, where you can restore or permanently delete them.' : tab === 'awaiting' ? 'Term sheets submitted for buyer or vendor approval will appear here.' : tab === 'completed' ? 'Term sheets will appear here once both parties have signed.' : 'Create your first term sheet to start a Letter of Intent.'}
            </p>
            {search ? (
              <LandingButton variant='outline' size='compact' disabled={controlsBusy} onClick={() => { setSearch(''); setPage(1); }}>Clear search</LandingButton>
            ) : tab === 'active' ? (
              <LandingButton size='compact' onClick={() => void handleCreate()} disabled={controlsBusy}>{creating ? 'Creating…' : 'New term sheet'}</LandingButton>
            ) : (
              <LandingButton variant='outline' size='compact' disabled={controlsBusy} onClick={() => { setTab('active'); setPage(1); }}>View active term sheets</LandingButton>
            )}
          </div>
        ) : (
          <div role='region' aria-label='Term sheet table' tabIndex={0} className='min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
            <table className='w-full min-w-[1120px] text-left text-sm leading-[1.65]'>
              <caption className='sr-only'>Letters of Intent, parties, workflow status and management actions.</caption>
              <thead className='border-b border-advisory-rule bg-canvas'>
                <tr>
                  <Th>Term sheet</Th><Th>Buyer</Th><Th>Vendor</Th><Th>Price</Th><Th>Status</Th><Th>Waiting on</Th><Th>{isArchived ? 'Archived' : 'Updated'}</Th><Th className='text-right'>Actions</Th>
                </tr>
              </thead>
              <tbody className='divide-y divide-advisory-rule'>
                {sheets.map((sheet) => {
                  const editable = EDITABLE_STATUSES.includes(sheet.status);
                  const name = sheet.businessName || 'Untitled business';
                  return (
                    <tr key={sheet._id} className='transition-colors duration-150 hover:bg-canvas/50 motion-reduce:transition-none'>
                      <td className='min-w-48 px-5 py-5 align-top'>
                        <Link href={`/admin/offer-term-sheets/${sheet._id}`} className='font-semibold text-midnight no-underline transition-colors duration-150 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'>{name}</Link>
                        {user?.user?.role === 'superadmin' && <p className='mt-1 mb-0 break-words text-xs leading-[1.75] text-ink'>{getBrokerByEmail(sheet.brokerEmail)?.name || sheet.brokerEmail}</p>}
                      </td>
                      <td className='min-w-40 px-5 py-5 align-top'>
                        <p className='m-0 text-midnight'>{sheet.purchaserName || '—'}</p>
                        <p className='mt-1 mb-0 break-all text-xs leading-[1.75] text-ink'>{sheet.purchaserEmail || sheet.buyerInviteEmail || '—'}</p>
                      </td>
                      <td className='min-w-40 px-5 py-5 align-top'>
                        <p className='m-0 text-midnight'>{sheet.vendorName || '—'}</p>
                        <p className='mt-1 mb-0 break-all text-xs leading-[1.75] text-ink'>{sheet.vendorEmail || '—'}</p>
                      </td>
                      <td className='px-5 py-5 align-top whitespace-nowrap tabular-nums text-midnight'>{formatMoney(sheet.purchasePrice)}</td>
                      <td className='px-5 py-5 align-top'>
                        <span className={cn('inline-flex px-2.5 py-1 text-xs leading-[1.5] font-medium', STATUS_STYLE[sheet.status])}>{STATUS_LABELS[sheet.status]}</span>
                      </td>
                      <td className='px-5 py-5 align-top whitespace-nowrap text-ink'>{sheet.waitingOn ? WAITING_LABELS[sheet.waitingOn] : '—'}</td>
                      <td className='px-5 py-5 align-top whitespace-nowrap text-ink'>{displayDate(isArchived ? sheet.archivedAt : sheet.updatedAt)}</td>
                      <td className='px-5 py-3 align-top'>
                        <div className='flex items-center justify-end gap-1'>
                          {isArchived ? (
                            <>
                              <button type='button' title='Restore term sheet' aria-label={`Restore ${name}`} disabled={controlsBusy} onClick={() => void runAction(sheet._id, () => apiClient.patch(`${BASE}/${sheet._id}/restore`))} className={cn(ROW_ACTION_CLASS, 'text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900')}>
                                {actionId === sheet._id ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <ArchiveRestore aria-hidden='true' className='size-4' />}
                              </button>
                              <button type='button' title='Delete permanently' aria-label={`Permanently delete ${name}`} disabled={controlsBusy} onClick={() => { setActionError(''); setConfirmation({ id: sheet._id, name, permanent: true }); }} className={cn(ROW_ACTION_CLASS, 'text-red-700 hover:bg-red-50 hover:text-red-800')}>
                                <Trash2 aria-hidden='true' className='size-4' />
                              </button>
                            </>
                          ) : (
                            <>
                              <Link href={`/admin/offer-term-sheets/${sheet._id}`} title={editable ? 'Edit term sheet' : 'View term sheet'} aria-label={`${editable ? 'Edit' : 'View'} ${name}`} className={ROW_ACTION_CLASS}>
                                {editable ? <Edit aria-hidden='true' className='size-4' /> : <Eye aria-hidden='true' className='size-4' />}
                              </Link>
                              <button type='button' title='Archive term sheet' aria-label={`Archive ${name}`} disabled={controlsBusy} onClick={() => { setActionError(''); setConfirmation({ id: sheet._id, name, permanent: false }); }} className={cn(ROW_ACTION_CLASS, 'hover:bg-amber-50 hover:text-amber-900')}>
                                <Archive aria-hidden='true' className='size-4' />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !listError && totalPages > 1 && (
          <nav aria-label='Term sheet pagination' className='flex flex-wrap items-center justify-between gap-4 border-t border-advisory-rule px-5 py-4 min-[681px]:px-6'>
            <p className='m-0 text-sm text-ink' aria-live='polite' aria-atomic='true'>Page {page} of {totalPages}</p>
            <div className='flex gap-2'>
              <LandingButton variant='outline' size='compact' onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1 || controlsBusy}>Previous</LandingButton>
              <LandingButton variant='outline' size='compact' onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages || controlsBusy}>Next</LandingButton>
            </div>
          </nav>
        )}
      </section>

      <Dialog open={Boolean(confirmation)} onOpenChange={(open) => { if (!open) closeConfirmation(); }}>
        <DialogContent showCloseButton={false} className={cn(landingFontVariables, 'max-h-[85dvh] overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-midnight ring-0 sm:max-w-[460px] min-[681px]:p-8')}>
          <DialogHeader>
            <DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>{confirmation?.permanent ? 'Delete permanently?' : 'Archive term sheet?'}</DialogTitle>
            <DialogDescription className='mt-3 text-sm leading-[1.8] text-ink'>
              <span className='mb-2 block break-words font-semibold text-midnight'>{confirmation?.name}</span>
              {confirmation?.permanent ? 'This removes the term sheet and its audit trail from the database. It cannot be undone.' : 'It will move to Archived and stop appearing in the active list. You can restore it from Archived.'}
            </DialogDescription>
          </DialogHeader>
          {actionError && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{actionError}</p>}
          <div className='flex flex-wrap justify-end gap-3'>
            <LandingButton variant='outline' size='compact' disabled={Boolean(actionId)} onClick={closeConfirmation}>Cancel</LandingButton>
            <LandingButton
              size='compact'
              disabled={Boolean(actionId)}
              className={confirmation?.permanent ? 'border-red-700 bg-red-700 text-white hover:bg-red-800' : undefined}
              onClick={() => {
                if (!confirmation) return;
                const { id, permanent } = confirmation;
                void runAction(id, () => apiClient.delete(`${BASE}/${id}${permanent ? '/permanent' : ''}`));
              }}
            >
              {actionId ? <><Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> {confirmation?.permanent ? 'Deleting…' : 'Archiving…'}</> : confirmation?.permanent ? 'Delete permanently' : 'Archive'}
            </LandingButton>
          </div>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}

function Th({ children, className }: { children: ReactNode; className?: string }) {
  return <th scope='col' className={cn('px-5 py-4 font-semibold text-midnight', className)}>{children}</th>;
}
