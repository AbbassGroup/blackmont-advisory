'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  Archive,
  ArchiveRestore,
  Edit,
  Eye,
  Loader2,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/global/dashboard-layout';
import { getBrokerByEmail } from '@/lib/data/brokers';
import { cn } from '@/lib/utils';
import {
  EDITABLE_STATUSES,
  STATUS_CLASSES,
  STATUS_LABELS,
  WAITING_LABELS,
  formatMoney,
  type OfferTermSheetRow,
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
  const [archiveId, setArchiveId] = useState<string | null>(null);
  const [permId, setPermId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchSheets = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get(BASE, {
        params: { page, limit: 10, search, ...TAB_PARAMS[tab] },
      });
      setSheets(data.sheets ?? []);
      setTotalPages(data.totalPages ?? 1);
      setError('');
    } catch {
      setSheets([]);
      setError('Could not load term sheets. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, search, tab]);

  useEffect(() => {
    fetchSheets();
  }, [fetchSheets]);

  const switchTab = (next: TabId) => {
    if (next === tab) return;
    setTab(next);
    setPage(1);
  };

  const handleCreate = async () => {
    setCreating(true);
    setError('');
    try {
      const { data } = await apiClient.post(BASE, {});
      router.push(`/admin/offer-term-sheets/${data.sheet._id}`);
    } catch {
      setError('Could not create a term sheet. Please try again.');
      setCreating(false);
    }
  };

  const runAction = async (id: string, action: () => Promise<unknown>) => {
    setActionId(id);
    setError('');
    try {
      await action();
      await fetchSheets();
    } catch {
      setError('That action could not be completed. Please try again.');
    } finally {
      setActionId(null);
    }
  };

  const isArchived = tab === 'archived';

  return (
    <DashboardLayout
      title='Offer Term Sheet'
      description='Create and track Letters of Intent through to signature'
      button={
        <Button
          onClick={handleCreate}
          disabled={creating}
          className='gap-2 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'
        >
          {creating ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <Plus className='h-4 w-4' />
          )}
          New Term Sheet
        </Button>
      }
    >
      <div className='rounded-none border border-border bg-card p-4 shadow-sm'>
        <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
          <div className='relative w-full max-w-sm'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70' />
            <Input
              placeholder='Search by business, buyer or vendor...'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className='border-border bg-muted pl-9'
            />
          </div>

          <div className='flex w-fit shrink-0 gap-1 rounded-none border border-border bg-muted p-1'>
            {TABS.map((t) => (
              <TabButton
                key={t.id}
                active={tab === t.id}
                onClick={() => switchTab(t.id)}
              >
                {t.id === 'archived' && <Archive className='h-3.5 w-3.5' />}
                {t.label}
              </TabButton>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className='rounded-none border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600'>
          {error}
        </div>
      )}

      <div className='overflow-hidden rounded-none border border-border bg-card shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-border bg-muted/80'>
                <Th>Term Sheet</Th>
                <Th className='hidden md:table-cell'>Buyer</Th>
                <Th className='hidden xl:table-cell'>Vendor</Th>
                <Th>Price</Th>
                <Th>Status</Th>
                <Th className='hidden lg:table-cell'>Waiting on</Th>
                <Th className='hidden lg:table-cell'>
                  {isArchived ? 'Archived' : 'Updated'}
                </Th>
                <Th className='text-right'>Actions</Th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border'>
              {loading ? (
                <tr>
                  <td colSpan={8} className='py-12 text-center text-muted-foreground/70'>
                    <Loader2 className='mx-auto mb-2 h-6 w-6 animate-spin' />
                    Loading term sheets...
                  </td>
                </tr>
              ) : sheets.length === 0 ? (
                <tr>
                  <td colSpan={8} className='py-12 text-center text-muted-foreground/70'>
                    <EmptyMessage tab={tab} searching={!!search} />
                  </td>
                </tr>
              ) : (
                sheets.map((sheet) => {
                  const busy = actionId === sheet._id;
                  const editable = EDITABLE_STATUSES.includes(sheet.status);

                  return (
                    <tr
                      key={sheet._id}
                      className='transition-colors hover:bg-muted/60'
                    >
                      <td className='px-5 py-4'>
                        <p className='font-semibold text-foreground'>
                          {sheet.businessName || 'Untitled'}
                        </p>
                        {user?.user?.role === 'superadmin' && (
                          <p className='text-xs text-muted-foreground/70'>
                            {getBrokerByEmail(sheet.brokerEmail)?.name ||
                              sheet.brokerEmail}
                          </p>
                        )}
                      </td>
                      <td className='hidden px-5 py-4 text-foreground/80 md:table-cell'>
                        <p>{sheet.purchaserName || '-'}</p>
                        <p className='text-xs text-muted-foreground/70'>
                          {sheet.purchaserEmail || sheet.buyerInviteEmail || '-'}
                        </p>
                      </td>
                      <td className='hidden px-5 py-4 text-foreground/80 xl:table-cell'>
                        <p>{sheet.vendorName || '-'}</p>
                        <p className='text-xs text-muted-foreground/70'>
                          {sheet.vendorEmail || '-'}
                        </p>
                      </td>
                      <td className='px-5 py-4 text-foreground/80'>
                        {formatMoney(sheet.purchasePrice)}
                      </td>
                      <td className='px-5 py-4'>
                        <span
                          className={cn(
                            'inline-flex rounded-none px-2.5 py-1 text-xs font-medium',
                            STATUS_CLASSES[sheet.status],
                          )}
                        >
                          {STATUS_LABELS[sheet.status]}
                        </span>
                      </td>
                      <td className='hidden px-5 py-4 text-muted-foreground lg:table-cell'>
                        {sheet.waitingOn ? WAITING_LABELS[sheet.waitingOn] : '-'}
                      </td>
                      <td className='hidden px-5 py-4 text-muted-foreground lg:table-cell'>
                        {(() => {
                          const at = isArchived
                            ? sheet.archivedAt
                            : sheet.updatedAt;
                          return at
                            ? format(new Date(at), 'MMM dd, yyyy, h:mma')
                            : '-';
                        })()}
                      </td>
                      <td className='px-5 py-4'>
                        <div className='flex items-center justify-end gap-1'>
                          {isArchived ? (
                            <>
                              <IconButton
                                title='Restore'
                                busy={busy}
                                onClick={() =>
                                  runAction(sheet._id, () =>
                                    apiClient.patch(
                                      `${BASE}/${sheet._id}/restore`,
                                    ),
                                  )
                                }
                                className='text-green-600 hover:bg-green-50'
                              >
                                <ArchiveRestore className='h-4 w-4' />
                              </IconButton>
                              <IconButton
                                title='Delete permanently'
                                onClick={() => setPermId(sheet._id)}
                                className='text-red-500 hover:bg-red-50'
                              >
                                <Trash2 className='h-4 w-4' />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <Link
                                href={`/admin/offer-term-sheets/${sheet._id}`}
                                title={editable ? 'Edit' : 'View'}
                                className='flex rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground/80'
                              >
                                {editable ? (
                                  <Edit className='h-4 w-4' />
                                ) : (
                                  <Eye className='h-4 w-4' />
                                )}
                              </Link>
                              <IconButton
                                title='Archive'
                                onClick={() => setArchiveId(sheet._id)}
                                className='text-muted-foreground hover:bg-amber-50 hover:text-amber-600'
                              >
                                <Archive className='h-4 w-4' />
                              </IconButton>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className='flex items-center justify-between border-t border-border bg-muted/50 px-5 py-3.5'>
            <p className='text-sm text-muted-foreground'>
              Page {page} of {totalPages}
            </p>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!archiveId}
        title='Archive term sheet?'
        body='It will move to Archived and stop appearing in the active list.'
        confirmLabel='Archive'
        confirmClass='bg-amber-500 text-white hover:bg-amber-600'
        busy={!!actionId}
        onCancel={() => setArchiveId(null)}
        onConfirm={async () => {
          const id = archiveId;
          setArchiveId(null);
          if (id) await runAction(id, () => apiClient.delete(`${BASE}/${id}`));
        }}
      />

      <ConfirmDialog
        open={!!permId}
        title='Delete permanently?'
        body='This removes the term sheet and its audit trail from the database. It cannot be undone.'
        confirmLabel='Delete permanently'
        confirmClass='bg-red-600 text-white hover:bg-red-700'
        busy={!!actionId}
        onCancel={() => setPermId(null)}
        onConfirm={async () => {
          const id = permId;
          setPermId(null);
          if (id)
            await runAction(id, () =>
              apiClient.delete(`${BASE}/${id}/permanent`),
            );
        }}
      />
    </DashboardLayout>
  );
}

function EmptyMessage({ tab, searching }: { tab: TabId; searching: boolean }) {
  if (searching) return <>No term sheets match that search.</>;
  if (tab === 'archived') return <>No archived term sheets.</>;
  if (tab === 'awaiting') return <>Nothing is waiting for approval.</>;
  if (tab === 'completed') return <>No signed term sheets yet.</>;
  return (
    <>
      No term sheets yet. Click <span className='font-medium'>New Term Sheet</span>{' '}
      to start one.
    </>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-md px-3.5 py-1 text-sm font-medium transition-colors',
        active
          ? 'bg-accent/10 text-accent'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      {children}
    </button>
  );
}

function Th({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-5 py-3.5 text-left font-semibold text-muted-foreground ${className}`}
    >
      {children}
    </th>
  );
}

function IconButton({
  children,
  title,
  onClick,
  busy = false,
  className = '',
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
  busy?: boolean;
  className?: string;
}) {
  return (
    <button
      type='button'
      title={title}
      onClick={onClick}
      disabled={busy}
      className={cn(
        'rounded-md p-1.5 transition-colors disabled:opacity-50',
        className,
      )}
    >
      {busy ? <Loader2 className='h-4 w-4 animate-spin' /> : children}
    </button>
  );
}

function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel,
  confirmClass,
  busy,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  confirmClass: string;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm'>
      <div className='w-full max-w-sm rounded-none bg-card p-6 shadow-xl'>
        <h3 className='mb-2 text-lg font-bold text-foreground'>{title}</h3>
        <p className='mb-6 text-sm text-muted-foreground'>{body}</p>
        <div className='flex justify-end gap-3'>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={busy} className={confirmClass}>
            {busy ? <Loader2 className='h-4 w-4 animate-spin' /> : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
