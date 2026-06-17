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
          <Button className='bg-brand-primary hover:bg-brand-primary/90 text-white gap-2'>
            <Plus className='w-4 h-4' /> New Proposal
          </Button>
        </Link>
      }
    >
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4'>
        <div className='relative max-w-sm'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <Input
            placeholder='Search proposals...'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className='pl-9 bg-gray-50 border-gray-200'
          />
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-gray-100 bg-gray-50/80'>
                <th className='text-left px-5 py-3.5 font-semibold text-gray-600'>
                  Business
                </th>
                <th className='text-left px-5 py-3.5 font-semibold text-gray-600'>
                  Broker
                </th>
                <th className='text-left px-5 py-3.5 font-semibold text-gray-600 hidden md:table-cell'>
                  Value
                </th>
                <th className='text-left px-5 py-3.5 font-semibold text-gray-600'>
                  Status
                </th>
                <th className='text-left px-5 py-3.5 font-semibold text-gray-600 hidden lg:table-cell'>
                  Created
                </th>
                <th className='text-left px-5 py-3.5 font-semibold text-gray-600'>
                  Views
                </th>
                <th className='text-right px-5 py-3.5 font-semibold text-gray-600'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {loading ? (
                <tr>
                  <td colSpan={6} className='text-center py-12 text-gray-400'>
                    <Loader2 className='w-6 h-6 animate-spin mx-auto mb-2' />
                    Loading proposals...
                  </td>
                </tr>
              ) : proposals.length === 0 ? (
                <tr>
                  <td colSpan={6} className='text-center py-12 text-gray-400'>
                    No proposals found
                  </td>
                </tr>
              ) : (
                proposals.map((p) => (
                  <tr
                    key={p._id}
                    className='hover:bg-gray-50/60 transition-colors'
                  >
                    <td className='px-5 py-4'>
                      <p className='font-semibold text-brand-black'>
                        {p.businessName}
                      </p>
                      <p className='text-xs text-gray-500 mt-0.5'>
                        {p.customerName}
                      </p>
                      <p className='text-xs text-gray-400'>{p.customerEmail}</p>
                    </td>
                    <td className='px-5 py-4 text-gray-700'>{p.brokerName}</td>
                    <td className='px-5 py-4 text-gray-700 hidden md:table-cell'>
                      {p.businessValue || '—'}
                    </td>
                    <td className='px-5 py-4'>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${p.isApproved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
                      >
                        {p.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className='px-5 py-4 text-gray-500 hidden lg:table-cell'>
                      {format(new Date(p.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className='px-5 py-4'>
                      <button
                        onClick={() => openHistory(p)}
                        className='p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 hover:text-blue-700 transition-colors'
                        title='View History'
                      >
                        <History className='w-4 h-4' />
                      </button>
                    </td>
                    <td className='px-5 py-4'>
                      <div className='flex items-center justify-end gap-1'>
                        <Link href={`/admin/proposals/${p._id}`}>
                          <button
                            className='p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors'
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
                            className='p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-brand-primary transition-colors'
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
                              className='p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors'
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
                              className='p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors'
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
                            className='p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors'
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
          <div className='flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50/50'>
            <p className='text-sm text-gray-500'>
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
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full'>
            <h3 className='text-lg font-bold text-brand-black mb-2'>
              Delete Proposal?
            </h3>
            <p className='text-sm text-gray-500 mb-6'>
              This action cannot be undone. The proposal and all associated data
              will be permanently deleted.
            </p>
            <div className='flex gap-3 justify-end'>
              <Button variant='outline' onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={!!actionLoading}
                className='bg-red-600 hover:bg-red-700 text-white'
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
