'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Plus, Search, Edit, CheckCircle, XCircle, Trash2, Loader2, ExternalLink, History } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { ProposalHistoryDialog, type ProposalViewLog } from '@/components/admin/proposal-history-dialog';
import { getProposalStage, type ProposalStage } from '@/components/proposal/types';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Proposal = {
  _id: string;
  businessName: string;
  businessValue: string;
  brokerName: string;
  brokerEmail: string;
  customerName: string;
  customerEmail: string;
  isApproved: boolean;
  submittedForApprovalAt?: string | null;
  createdAt: string;
};

const STAGE_STYLE: Record<ProposalStage, { label: string; cls: string }> = {
  draft: { label: 'Draft', cls: 'bg-canvas text-ink' },
  pending: { label: 'Pending', cls: 'bg-gilt/15 text-midnight' },
  approved: { label: 'Approved', cls: 'bg-emerald-50 text-emerald-800' },
};

const ROW_ACTION_CLASS =
  'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center border border-transparent text-ink transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-40';

function createdDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : format(date, 'dd MMM yyyy');
}

export default function ProposalsPage() {
  const { user } = useAdminAuth();
  const isSuperAdmin = user?.user?.role === 'superadmin';
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [listError, setListError] = useState(false);
  const [actionError, setActionError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [historyProposal, setHistoryProposal] = useState<Proposal | null>(null);
  const [historyLogs, setHistoryLogs] = useState<ProposalViewLog[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState(false);
  const listRequest = useRef(0);
  const historyRequest = useRef(0);

  const fetchProposals = useCallback(async () => {
    const request = ++listRequest.current;
    setLoading(true);
    setListError(false);
    try {
      const { data } = await apiClient.get('/api/digital-proposals', {
        params: { page, limit: 10, search },
      });
      if (request !== listRequest.current) return;
      setProposals(data.proposals ?? []);
      setTotalPages(Math.max(1, data.totalPages ?? 1));
    } catch {
      if (request === listRequest.current) setListError(true);
    } finally {
      if (request === listRequest.current) setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    void fetchProposals();
    return () => {
      listRequest.current += 1;
    };
  }, [fetchProposals]);

  const handleApprove = async (id: string) => {
    if (actionLoading) return;
    setActionLoading(id + '-approve');
    setActionError('');
    try {
      await apiClient.put(`/api/digital-proposals/${id}/approve`, {
        approvedBy: user?.user?.username,
      });
      await fetchProposals();
    } catch {
      setActionError('The proposal could not be approved. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRevoke = async (id: string) => {
    if (actionLoading) return;
    setActionLoading(id + '-revoke');
    setActionError('');
    try {
      await apiClient.put(`/api/digital-proposals/${id}/revoke`);
      await fetchProposals();
    } catch {
      setActionError('Approval could not be revoked. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteId || actionLoading) return;
    setActionLoading(deleteId + '-delete');
    setActionError('');
    try {
      await apiClient.delete(`/api/digital-proposals/${deleteId}`);
      setDeleteId(null);
      if (proposals.length === 1 && page > 1) setPage((value) => value - 1);
      else await fetchProposals();
    } catch {
      setActionError('The proposal could not be deleted. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const openHistory = async (proposal: Proposal) => {
    const request = ++historyRequest.current;
    setHistoryProposal(proposal);
    setHistoryLogs([]);
    setHistoryError(false);
    setHistoryLoading(true);
    try {
      const { data } = await apiClient.get(`/api/digital-proposals/${proposal._id}/views`);
      if (request === historyRequest.current) setHistoryLogs(data ?? []);
    } catch {
      if (request === historyRequest.current) setHistoryError(true);
    } finally {
      if (request === historyRequest.current) setHistoryLoading(false);
    }
  };

  return (
    <AdminPageLayout
      title='Digital proposals'
      description='Create, review and manage client proposals.'
      action={
        <LandingButtonLink href='/admin/proposals/new' size='compact'>
          <Plus aria-hidden='true' className='size-4' /> New proposal
        </LandingButtonLink>
      }
    >
      {actionError && !deleteId && (
        <p role='alert' className='m-0 border border-red-200 bg-red-50 px-5 py-4 text-sm leading-[1.75] text-red-800'>
          {actionError}
        </p>
      )}

      <section aria-label='Proposals' aria-busy={loading} className='min-w-0 border border-advisory-rule bg-white'>
        <div className='flex flex-col gap-4 border-b border-advisory-rule p-5 min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:p-6'>
          <div className='relative w-full min-w-0 min-[681px]:max-w-md'>
            <label htmlFor='proposal-search' className='sr-only'>Search proposals</label>
            <Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/60' />
            <input
              id='proposal-search'
              type='search'
              placeholder='Search proposals…'
              value={search}
              disabled={Boolean(actionLoading)}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className='h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white py-2 pr-3 pl-10 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none min-[681px]:text-sm'
            />
          </div>
          <p className='m-0 shrink-0 text-sm leading-[1.6] text-ink'>
            {loading ? 'Loading proposals…' : listError ? 'List unavailable' : `${proposals.length} ${proposals.length === 1 ? 'proposal' : 'proposals'} on this page`}
          </p>
        </div>

        {loading ? (
          <div className='px-5 min-[681px]:px-6'>
            <p role='status' className='sr-only'>Loading proposals.</p>
            <div aria-hidden='true' className='divide-y divide-advisory-rule'>
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className='flex items-center justify-between gap-8 py-6'>
                  <div className='min-w-0 flex-1 space-y-3'>
                    <div className='h-4 w-2/5 animate-pulse bg-canvas motion-reduce:animate-none' />
                    <div className='h-3 w-3/5 animate-pulse bg-canvas motion-reduce:animate-none' />
                  </div>
                  <div className='h-7 w-20 shrink-0 animate-pulse bg-canvas motion-reduce:animate-none' />
                </div>
              ))}
            </div>
          </div>
        ) : listError ? (
          <div role='alert' className='p-6 min-[681px]:p-8'>
            <h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load your proposals.</h2>
            <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Please try again to refresh the list.</p>
            <LandingButton variant='outline' size='compact' onClick={() => void fetchProposals()}>Try again</LandingButton>
          </div>
        ) : proposals.length === 0 ? (
          <div className='p-6 min-[681px]:p-8'>
            <h2 className='m-0 text-base font-semibold text-midnight'>
              {search ? 'No matching proposals' : 'No proposals yet'}
            </h2>
            <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>
              {search ? 'Try another business, client or broker name.' : 'Create your first proposal to get started.'}
            </p>
            {search ? (
              <LandingButton variant='outline' size='compact' onClick={() => { setSearch(''); setPage(1); }}>Clear search</LandingButton>
            ) : (
              <LandingButtonLink href='/admin/proposals/new' size='compact'>New proposal</LandingButtonLink>
            )}
          </div>
        ) : (
          <div
            role='region'
            aria-label='Proposal table'
            tabIndex={0}
            className='min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'
          >
            <table className='w-full min-w-[940px] text-left text-sm leading-[1.65]'>
              <caption className='sr-only'>Client proposals, approval status and management actions.</caption>
              <thead className='border-b border-advisory-rule bg-canvas'>
                <tr>
                  <th scope='col' className='px-5 py-4 font-semibold text-midnight'>Business</th>
                  <th scope='col' className='px-5 py-4 font-semibold text-midnight'>Broker</th>
                  <th scope='col' className='px-5 py-4 font-semibold text-midnight'>Value</th>
                  <th scope='col' className='px-5 py-4 font-semibold text-midnight'>Status</th>
                  <th scope='col' className='px-5 py-4 font-semibold text-midnight'>Created</th>
                  <th scope='col' className='px-5 py-4 font-semibold text-midnight'>Views</th>
                  <th scope='col' className='px-5 py-4 text-right font-semibold text-midnight'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-advisory-rule'>
                {proposals.map((proposal) => {
                  const stage = STAGE_STYLE[getProposalStage(proposal)];
                  const busy = Boolean(actionLoading);
                  const businessName = proposal.businessName || 'Untitled business';
                  return (
                    <tr key={proposal._id} className='transition-colors duration-150 hover:bg-canvas/50 motion-reduce:transition-none'>
                      <td className='w-[28%] min-w-56 px-5 py-5 align-top'>
                        <Link href={`/admin/proposals/${proposal._id}`} className='font-semibold text-midnight no-underline transition-colors duration-150 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'>
                          {businessName}
                        </Link>
                        <p className='mt-1 mb-0 text-xs leading-[1.75] text-ink'>{proposal.customerName || '—'}</p>
                        <p className='m-0 break-all text-xs leading-[1.75] text-ink'>{proposal.customerEmail || '—'}</p>
                      </td>
                      <td className='min-w-36 px-5 py-5 align-top text-ink'>{proposal.brokerName || '—'}</td>
                      <td className='px-5 py-5 align-top whitespace-nowrap tabular-nums text-midnight'>{proposal.businessValue || '—'}</td>
                      <td className='px-5 py-5 align-top'>
                        <span className={cn('inline-flex px-2.5 py-1 text-xs leading-[1.5] font-medium', stage.cls)}>{stage.label}</span>
                      </td>
                      <td className='px-5 py-5 align-top whitespace-nowrap text-ink'>{createdDate(proposal.createdAt)}</td>
                      <td className='px-5 py-3 align-top'>
                        <button type='button' onClick={() => void openHistory(proposal)} className={ROW_ACTION_CLASS} title='View history' aria-label={`View history for ${businessName}`}>
                          <History aria-hidden='true' className='size-4' />
                        </button>
                      </td>
                      <td className='px-5 py-3 align-top'>
                        <div className='flex items-center justify-end gap-1'>
                          <Link href={`/admin/proposals/${proposal._id}`} className={ROW_ACTION_CLASS} title='Edit proposal' aria-label={`Edit proposal for ${businessName}`}>
                            <Edit aria-hidden='true' className='size-4' />
                          </Link>
                          <Link href={`/proposal?id=${proposal._id}&email=${encodeURIComponent(proposal.customerEmail)}`} target='_blank' rel='noopener noreferrer' className={ROW_ACTION_CLASS} title='Open proposal' aria-label={`Open proposal for ${businessName} in a new tab`}>
                            <ExternalLink aria-hidden='true' className='size-4' />
                          </Link>
                          {isSuperAdmin && (proposal.isApproved ? (
                            <button type='button' onClick={() => void handleRevoke(proposal._id)} disabled={busy} className={cn(ROW_ACTION_CLASS, 'text-amber-800 hover:bg-amber-50 hover:text-amber-900')} title='Revoke approval' aria-label={`Revoke approval for ${businessName}`}>
                              {actionLoading === proposal._id + '-revoke' ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <XCircle aria-hidden='true' className='size-4' />}
                            </button>
                          ) : (
                            <button type='button' onClick={() => void handleApprove(proposal._id)} disabled={busy} className={cn(ROW_ACTION_CLASS, 'text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900')} title='Approve proposal' aria-label={`Approve proposal for ${businessName}`}>
                              {actionLoading === proposal._id + '-approve' ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <CheckCircle aria-hidden='true' className='size-4' />}
                            </button>
                          ))}
                          {isSuperAdmin && (
                            <button type='button' onClick={() => { setActionError(''); setDeleteId(proposal._id); }} disabled={busy} className={cn(ROW_ACTION_CLASS, 'text-red-700 hover:bg-red-50 hover:text-red-800')} title='Delete proposal' aria-label={`Delete proposal for ${businessName}`}>
                              <Trash2 aria-hidden='true' className='size-4' />
                            </button>
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
          <nav aria-label='Proposal pagination' className='flex flex-wrap items-center justify-between gap-4 border-t border-advisory-rule px-5 py-4 min-[681px]:px-6'>
            <p className='m-0 text-sm text-ink' aria-live='polite' aria-atomic='true'>Page {page} of {totalPages}</p>
            <div className='flex gap-2'>
              <LandingButton variant='outline' size='compact' onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1 || Boolean(actionLoading)}>Previous</LandingButton>
              <LandingButton variant='outline' size='compact' onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages || Boolean(actionLoading)}>Next</LandingButton>
            </div>
          </nav>
        )}
      </section>

      {historyProposal && (
        <ProposalHistoryDialog
          open
          onOpenChange={(open) => {
            if (!open) {
              historyRequest.current += 1;
              setHistoryProposal(null);
            }
          }}
          logs={historyLogs}
          loading={historyLoading}
          error={historyError}
          onRetry={() => void openHistory(historyProposal)}
          businessName={historyProposal.businessName}
        />
      )}

      <Dialog open={Boolean(deleteId)} onOpenChange={(open) => { if (!open && !actionLoading) { setDeleteId(null); setActionError(''); } }}>
        <DialogContent
          showCloseButton={false}
          className={cn(landingFontVariables, 'max-h-[85dvh] overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-midnight ring-0 sm:max-w-[460px] min-[681px]:p-8')}
        >
          <DialogHeader>
            <DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>Delete proposal?</DialogTitle>
            <DialogDescription className='mt-3 text-sm leading-[1.8] text-ink'>
              This proposal will be removed from your list and stop opening for the customer. It is archived (kept in the database) rather than permanently erased, so it can be recovered if needed.
            </DialogDescription>
          </DialogHeader>
          {actionError && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{actionError}</p>}
          <div className='flex flex-wrap justify-end gap-3'>
            <LandingButton variant='outline' size='compact' disabled={Boolean(actionLoading)} onClick={() => { setDeleteId(null); setActionError(''); }}>Cancel</LandingButton>
            <LandingButton size='compact' onClick={() => void handleDelete()} disabled={Boolean(actionLoading)} className='border-red-700 bg-red-700 text-white hover:bg-red-800'>
              {actionLoading ? <><Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> Deleting…</> : 'Delete proposal'}
            </LandingButton>
          </div>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}
