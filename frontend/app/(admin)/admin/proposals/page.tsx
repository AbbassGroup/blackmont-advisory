'use client';

import { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  CheckCircle,
  XCircle,
  Trash2,
  Loader2,
  ExternalLink,
  History,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/global/dashboard-layout';
import { ProposalHistoryDialog, type ProposalViewLog } from '@/components/admin/proposal-history-dialog';

type Proposal = {
  _id: string;
  businessName: string;
  businessValue: string;
  brokerName: string;
  brokerEmail: string;
  customerName: string;
  customerEmail: string;
  isApproved: boolean;
  createdAt: string;
};

export default function ProposalsPage() {
  const { user } = useAdminAuth();
  const isSuperAdmin = user?.user?.role === 'superadmin';

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [historyProposal, setHistoryProposal] = useState<Proposal | null>(null);
  const [historyLogs, setHistoryLogs] = useState<ProposalViewLog[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get('/api/digital-proposals', {
        params: { page, limit: 10, search },
      });
      setProposals(data.proposals ?? []);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      setProposals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [page, search]); // eslint-disable-line

  const handleApprove = async (id: string) => {
    setActionLoading(id + '-approve');
    try {
      await apiClient.put(`/api/digital-proposals/${id}/approve`, {
        approvedBy: user?.user?.username,
      });
      fetchProposals();
    } finally {
      setActionLoading(null);
    }
  };

  const handleRevoke = async (id: string) => {
    setActionLoading(id + '-revoke');
    try {
      await apiClient.put(`/api/digital-proposals/${id}/revoke`);
      fetchProposals();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setActionLoading(deleteId + '-delete');
    try {
      await apiClient.delete(`/api/digital-proposals/${deleteId}`);
      setDeleteId(null);
      fetchProposals();
    } finally {
      setActionLoading(null);
    }
  };

  const openHistory = async (proposal: Proposal) => {
    setHistoryProposal(proposal);
    setHistoryLogs([]);
    setHistoryLoading(true);
    try {
      const { data } = await apiClient.get(`/api/digital-proposals/${proposal._id}/views`);
      setHistoryLogs(data ?? []);
    } catch {
      setHistoryLogs([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <DashboardLayout
      title='Digital Proposals'
      description='Create and manage client proposals'
      button={
        <Link href='/admin/proposals/new'>
          <Button className='gap-2 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'>
            <Plus className='w-4 h-4' /> New Proposal
          </Button>
        </Link>
      }
    >
      <div className='border border-border bg-card p-4'>
        <div className='relative max-w-sm'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60' />
          <Input
            placeholder='Search proposals...'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className='rounded-none border-secondary/15 bg-background pl-9 shadow-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/15'
          />
        </div>
      </div>

      <div className='overflow-hidden border border-border bg-card'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-border bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground'>
                <th className='px-5 py-3.5 font-semibold'>Business</th>
                <th className='px-5 py-3.5 font-semibold'>Broker</th>
                <th className='px-5 py-3.5 font-semibold hidden md:table-cell'>
                  Value
                </th>
                <th className='px-5 py-3.5 font-semibold'>Status</th>
                <th className='px-5 py-3.5 font-semibold hidden lg:table-cell'>
                  Created
                </th>
                <th className='px-5 py-3.5 font-semibold'>Views</th>
                <th className='px-5 py-3.5 text-right font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border'>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className='py-12 text-center text-muted-foreground'
                  >
                    <Loader2 className='w-6 h-6 animate-spin mx-auto mb-2 text-accent' />
                    Loading proposals...
                  </td>
                </tr>
              ) : proposals.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className='py-12 text-center text-muted-foreground'
                  >
                    No proposals found
                  </td>
                </tr>
              ) : (
                proposals.map((p) => (
                  <tr
                    key={p._id}
                    className='transition-colors hover:bg-muted/50'
                  >
                    <td className='px-5 py-4'>
                      <p className='font-semibold text-secondary'>
                        {p.businessName}
                      </p>
                      <p className='mt-0.5 text-xs text-muted-foreground'>
                        {p.customerName}
                      </p>
                      <p className='text-xs text-muted-foreground/70'>
                        {p.customerEmail}
                      </p>
                    </td>
                    <td className='px-5 py-4 text-foreground'>{p.brokerName}</td>
                    <td className='px-5 py-4 text-foreground hidden md:table-cell'>
                      {p.businessValue || '—'}
                    </td>
                    <td className='px-5 py-4'>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium ${p.isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-accent/15 text-accent'}`}
                      >
                        {p.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className='px-5 py-4 text-muted-foreground hidden lg:table-cell'>
                      {format(new Date(p.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className='px-5 py-4'>
                      <button
                        onClick={() => openHistory(p)}
                        className='p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-secondary'
                        title='View History'
                      >
                        <History className='w-4 h-4' />
                      </button>
                    </td>
                    <td className='px-5 py-4'>
                      <div className='flex items-center justify-end gap-1'>
                        <Link href={`/admin/proposals/${p._id}`}>
                          <button
                            className='p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-secondary'
                            title='Edit'
                          >
                            <Edit className='w-4 h-4' />
                          </button>
                        </Link>
                        <Link
                          href={`/proposal?id=${p._id}&email=${encodeURIComponent(p.customerEmail)}`}
                          target='_blank'
                        >
                          <button
                            className='p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-accent'
                            title='Open Proposal'
                          >
                            <ExternalLink className='w-4 h-4' />
                          </button>
                        </Link>
                        {isSuperAdmin &&
                          (p.isApproved ? (
                            <button
                              onClick={() => handleRevoke(p._id)}
                              disabled={actionLoading === p._id + '-revoke'}
                              className='p-1.5 text-amber-600 transition-colors hover:bg-amber-50'
                              title='Revoke'
                            >
                              {actionLoading === p._id + '-revoke' ? (
                                <Loader2 className='w-4 h-4 animate-spin' />
                              ) : (
                                <XCircle className='w-4 h-4' />
                              )}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApprove(p._id)}
                              disabled={actionLoading === p._id + '-approve'}
                              className='p-1.5 text-emerald-600 transition-colors hover:bg-emerald-50'
                              title='Approve'
                            >
                              {actionLoading === p._id + '-approve' ? (
                                <Loader2 className='w-4 h-4 animate-spin' />
                              ) : (
                                <CheckCircle className='w-4 h-4' />
                              )}
                            </button>
                          ))}
                        {isSuperAdmin && (
                          <button
                            onClick={() => setDeleteId(p._id)}
                            className='p-1.5 text-red-500 transition-colors hover:bg-red-50'
                            title='Delete'
                          >
                            <Trash2 className='w-4 h-4' />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className='flex items-center justify-between border-t border-border bg-muted/40 px-5 py-3.5'>
            <p className='text-sm text-muted-foreground'>
              Page {page} of {totalPages}
            </p>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                className='rounded-none'
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='rounded-none'
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {historyProposal && (
        <ProposalHistoryDialog
          open={!!historyProposal}
          onOpenChange={(v) => !v && setHistoryProposal(null)}
          logs={historyLogs}
          loading={historyLoading}
          businessName={historyProposal.businessName}
        />
      )}

      {deleteId && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-secondary/40 p-4 backdrop-blur-sm'>
          <div className='w-full max-w-sm border border-border bg-card p-6 shadow-xl'>
            <h3 className='mb-2 text-lg font-bold text-secondary'>
              Delete Proposal?
            </h3>
            <p className='mb-6 text-sm text-muted-foreground'>
              This action cannot be undone. The proposal and all associated data
              will be permanently deleted.
            </p>
            <div className='flex justify-end gap-3'>
              <Button
                variant='outline'
                className='rounded-none'
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={!!actionLoading}
                className='rounded-none bg-red-600 text-white hover:bg-red-700'
              >
                {actionLoading ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  'Delete'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
