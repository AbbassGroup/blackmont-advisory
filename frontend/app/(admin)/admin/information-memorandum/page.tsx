'use client';

import { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Loader2,
  ExternalLink,
  Globe,
  Printer,
  Undo2,
  Archive,
  ArchiveRestore,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/global/dashboard-layout';
import { buildDefaultSections, type ImTemplate } from '@/components/im';
import { getBrokerByEmail } from '@/lib/data/brokers';
import { cn } from '@/lib/utils';

const BASE = '/api/im-templates';

type Tab = 'active' | 'archived';

export default function InformationMemorandumPage() {
  const router = useRouter();
  const { user } = useAdminAuth();

  const [tab, setTab] = useState<Tab>('active');
  const [templates, setTemplates] = useState<ImTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [creating, setCreating] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [archiveId, setArchiveId] = useState<string | null>(null); // archive confirm
  const [permId, setPermId] = useState<string | null>(null); // permanent-delete confirm

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get(BASE, {
        params: {
          page,
          limit: 10,
          search,
          ...(tab === 'archived' ? { archived: 'true' } : {}),
        },
      });
      setTemplates(data.templates ?? []);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [page, search, tab]); // eslint-disable-line

  const switchTab = (t: Tab) => {
    if (t === tab) return;
    setTab(t);
    setPage(1);
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const email = user?.user?.email || '';
      const { data } = await apiClient.post(BASE, {
        brokerEmail: email,
        sections: buildDefaultSections(),
      });
      router.push(`/admin/information-memorandum/${data._id}`);
    } catch {
      setCreating(false);
    }
  };

  const toggleStatus = async (t: ImTemplate) => {
    setActionId(t._id);
    try {
      await apiClient.patch(`${BASE}/${t._id}/status`, {
        status: t.status === 'published' ? 'draft' : 'published',
      });
      fetchTemplates();
    } finally {
      setActionId(null);
    }
  };

  const handleArchive = async () => {
    if (!archiveId) return;
    setActionId(archiveId);
    try {
      await apiClient.delete(`${BASE}/${archiveId}`);
      setArchiveId(null);
      fetchTemplates();
    } finally {
      setActionId(null);
    }
  };

  const handleRestore = async (id: string) => {
    setActionId(id);
    try {
      await apiClient.patch(`${BASE}/${id}/restore`);
      fetchTemplates();
    } finally {
      setActionId(null);
    }
  };

  const handlePermanentDelete = async () => {
    if (!permId) return;
    setActionId(permId);
    try {
      await apiClient.delete(`${BASE}/${permId}/permanent`);
      setPermId(null);
      fetchTemplates();
    } finally {
      setActionId(null);
    }
  };

  const isArchived = tab === 'archived';

  return (
    <DashboardLayout
      title='Information Memorandum'
      description='Create and manage Information Memorandum templates'
      button={
        <Button
          onClick={handleCreate}
          disabled={creating}
          className='gap-2 bg-brand-primary text-white hover:bg-brand-primary/90'
        >
          {creating ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <Plus className='h-4 w-4' />
          )}
          New Template
        </Button>
      }
    >
      <div className='rounded-xl border border-gray-100 bg-white p-4 shadow-sm'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='relative w-full max-w-sm'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <Input
              placeholder='Search by business or broker...'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className='border-gray-200 bg-gray-50 pl-9'
            />
          </div>

          {/* Active / Archived tabs */}
          <div className='flex w-fit shrink-0 gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1'>
            <TabButton
              active={tab === 'active'}
              onClick={() => switchTab('active')}
            >
              Active
            </TabButton>
            <TabButton
              active={tab === 'archived'}
              onClick={() => switchTab('archived')}
            >
              <Archive className='h-3.5 w-3.5' /> Archived
            </TabButton>
          </div>
        </div>
      </div>

      <div className='overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-gray-100 bg-gray-50/80'>
                <Th>Memorandum</Th>
                <Th>Broker</Th>
                <Th>Status</Th>
                <Th className='hidden lg:table-cell'>
                  {isArchived ? 'Archived' : 'Last Updated'}
                </Th>
                <Th className='text-right'>Actions</Th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {loading ? (
                <tr>
                  <td colSpan={5} className='py-12 text-center text-gray-400'>
                    <Loader2 className='mx-auto mb-2 h-6 w-6 animate-spin' />
                    Loading templates...
                  </td>
                </tr>
              ) : templates.length === 0 ? (
                <tr>
                  <td colSpan={5} className='py-12 text-center text-gray-400'>
                    {isArchived ? (
                      'No archived templates.'
                    ) : (
                      <>
                        No templates yet. Click{' '}
                        <span className='font-medium'>New Template</span> to
                        create one.
                      </>
                    )}
                  </td>
                </tr>
              ) : (
                templates.map((t) => (
                  <tr
                    key={t._id}
                    className='transition-colors hover:bg-gray-50/60'
                  >
                    <td className='px-5 py-4'>
                      <p className='font-semibold text-brand-black'>
                        {t.businessName || 'Untitled'}
                      </p>
                    </td>
                    <td className='px-5 py-4 text-gray-700'>
                      <p>
                        {getBrokerByEmail(t.brokerEmail)?.name ||
                          t.brokerEmail ||
                          '-'}
                      </p>
                      <p className='text-xs text-gray-400'>{t.brokerEmail}</p>
                    </td>
                    <td className='px-5 py-4'>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                          t.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {t.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className='hidden px-5 py-4 text-gray-500 lg:table-cell'>
                      {(() => {
                        const d = isArchived ? t.archivedAt : t.updatedAt;
                        return d
                          ? format(new Date(d), 'MMM dd, yyyy, h:mma')
                          : '-';
                      })()}
                    </td>
                    <td className='px-5 py-4'>
                      <div className='flex items-center justify-end gap-1'>
                        {isArchived ? (
                          <>
                            <button
                              onClick={() => handleRestore(t._id)}
                              disabled={actionId === t._id}
                              title='Restore'
                              className='rounded-lg p-1.5 text-green-600 transition-colors hover:bg-green-50 disabled:opacity-50'
                            >
                              {actionId === t._id ? (
                                <Loader2 className='h-4 w-4 animate-spin' />
                              ) : (
                                <ArchiveRestore className='h-4 w-4' />
                              )}
                            </button>
                            <button
                              onClick={() => setPermId(t._id)}
                              title='Delete permanently'
                              className='rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50'
                            >
                              <Trash2 className='h-4 w-4' />
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              href={`/admin/information-memorandum/${t._id}`}
                            >
                              <IconBtn title='Edit'>
                                <Edit className='h-4 w-4' />
                              </IconBtn>
                            </Link>
                            {t.status === 'published' && (
                              <Link
                                href={`/information-memorandum/${t._id}`}
                                target='_blank'
                              >
                                <IconBtn
                                  title='Open published page'
                                  className='hover:text-brand-primary'
                                >
                                  <ExternalLink className='h-4 w-4' />
                                </IconBtn>
                              </Link>
                            )}
                            <Link href={`/im-print/${t._id}`} target='_blank'>
                              <IconBtn
                                title='Print / Save PDF'
                                className='hover:text-brand-primary'
                              >
                                <Printer className='h-4 w-4' />
                              </IconBtn>
                            </Link>
                            <button
                              onClick={() => toggleStatus(t)}
                              disabled={actionId === t._id}
                              title={
                                t.status === 'published'
                                  ? 'Unpublish'
                                  : 'Publish'
                              }
                              className={`rounded-lg p-1.5 transition-colors ${
                                t.status === 'published'
                                  ? 'text-amber-600 hover:bg-amber-50'
                                  : 'text-green-600 hover:bg-green-50'
                              }`}
                            >
                              {actionId === t._id ? (
                                <Loader2 className='h-4 w-4 animate-spin' />
                              ) : t.status === 'published' ? (
                                <Undo2 className='h-4 w-4' />
                              ) : (
                                <Globe className='h-4 w-4' />
                              )}
                            </button>
                            <button
                              onClick={() => setArchiveId(t._id)}
                              title='Archive'
                              className='rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-amber-50 hover:text-amber-600'
                            >
                              <Archive className='h-4 w-4' />
                            </button>
                          </>
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
          <div className='flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-3.5'>
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

      {/* Archive confirm */}
      {archiveId && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm'>
          <div className='w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl'>
            <h3 className='mb-2 text-lg font-bold text-brand-black'>
              Archive template?
            </h3>
            <p className='mb-6 text-sm text-gray-500'>
              This memorandum will be moved to{' '}
              <span className='font-medium'>Archived</span>.
            </p>
            <div className='flex justify-end gap-3'>
              <Button variant='outline' onClick={() => setArchiveId(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleArchive}
                disabled={!!actionId}
                className='bg-amber-500 text-white hover:bg-amber-600'
              >
                {actionId ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  'Archive'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Permanent delete confirm */}
      {permId && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm'>
          <div className='w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl'>
            <h3 className='mb-2 text-lg font-bold text-brand-black'>
              Delete permanently?
            </h3>
            <p className='mb-6 text-sm text-gray-500'>
              This will{' '}
              <span className='font-medium text-red-600'>
                permanently remove
              </span>{' '}
              this memorandum from the database. This action cannot be undone.
            </p>
            <div className='flex justify-end gap-3'>
              <Button variant='outline' onClick={() => setPermId(null)}>
                Cancel
              </Button>
              <Button
                onClick={handlePermanentDelete}
                disabled={!!actionId}
                className='bg-red-600 text-white hover:bg-red-700'
              >
                {actionId ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  'Delete permanently'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
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
        'flex items-center gap-1.5 rounded-lg px-3.5 py-1 text-sm font-medium transition-colors',
        active
          ? 'bg-brand-primary/10 text-brand-primary'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800',
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
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-5 py-3.5 text-left font-semibold text-gray-600 ${className}`}
    >
      {children}
    </th>
  );
}

function IconBtn({
  children,
  title,
  className = '',
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <span
      title={title}
      className={`flex rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 ${className}`}
    >
      {children}
    </span>
  );
}
