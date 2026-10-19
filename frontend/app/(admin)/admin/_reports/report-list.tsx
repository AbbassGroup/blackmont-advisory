'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Plus, Search, Edit, Trash2, Loader2, ExternalLink, Globe, Printer, Undo2, Archive, ArchiveRestore } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { buildDefaultSections, type ImTemplate, type ReportKindConfig } from '@/components/im';
import { getBrokerByEmail } from '@/lib/data/brokers';
import { cn } from '@/lib/utils';

type Tab = 'active' | 'archived';

const ROW_ACTION_CLASS =
  'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center border border-transparent text-ink no-underline transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-40';

/** The report's edited banner title, distinct from its linked customer name. */
function bannerTitle(template: ImTemplate): string {
  const banner = template.sections?.find((section) => section.type === 'banner');
  const title = (banner?.data as { title?: string } | undefined)?.title;
  return typeof title === 'string' && title.trim() ? title : '—';
}

function reportDate(value?: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : format(date, 'dd MMM yyyy, h:mm a');
}

export function ReportList({ config }: { config: ReportKindConfig }) {
  const router = useRouter();
  const { user } = useAdminAuth();
  const BASE = config.apiBase;
  const [tab, setTab] = useState<Tab>('active');
  const [templates, setTemplates] = useState<ImTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [creating, setCreating] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [archiveId, setArchiveId] = useState<string | null>(null);
  const [permId, setPermId] = useState<string | null>(null);
  const [listError, setListError] = useState(false);
  const [actionError, setActionError] = useState('');
  const listRequest = useRef(0);
  const isArchived = tab === 'archived';
  const controlsBusy = creating || Boolean(actionId);
  const confirming = Boolean(archiveId || permId);

  const fetchTemplates = useCallback(async () => {
    const request = ++listRequest.current;
    setLoading(true);
    setListError(false);
    try {
      const { data } = await apiClient.get(BASE, {
        params: { page, limit: 10, search, ...(tab === 'archived' ? { archived: 'true' } : {}) },
      });
      if (request !== listRequest.current) return;
      setTemplates(data.templates ?? []);
      setTotalPages(Math.max(1, data.totalPages ?? 1));
    } catch {
      if (request === listRequest.current) setListError(true);
    } finally {
      if (request === listRequest.current) setLoading(false);
    }
  }, [BASE, page, search, tab]);

  useEffect(() => {
    void fetchTemplates();
    return () => {
      listRequest.current += 1;
    };
  }, [fetchTemplates]);

  const switchTab = (next: Tab) => {
    if (next === tab || controlsBusy) return;
    setTab(next);
    setPage(1);
    setActionError('');
  };

  const refreshAfterRemoval = async () => {
    if (templates.length === 1 && page > 1) setPage((value) => value - 1);
    else await fetchTemplates();
  };

  const handleCreate = async () => {
    if (controlsBusy) return;
    setCreating(true);
    setActionError('');
    try {
      const { data } = await apiClient.post(BASE, {
        brokerEmail: user?.user?.email || '',
        sections: buildDefaultSections(config.kind),
      });
      router.push(`${config.basePath}/${data._id}`);
    } catch {
      setActionError(`We could not create the ${config.docNoun}. Please try again.`);
      setCreating(false);
    }
  };

  const toggleStatus = async (template: ImTemplate) => {
    if (controlsBusy) return;
    setActionId(template._id);
    setActionError('');
    try {
      await apiClient.patch(`${BASE}/${template._id}/status`, {
        status: template.status === 'published' ? 'draft' : 'published',
      });
      await fetchTemplates();
    } catch {
      setActionError('The publication status could not be updated. Please try again.');
    } finally {
      setActionId(null);
    }
  };

  const handleArchive = async () => {
    if (!archiveId || controlsBusy) return;
    setActionId(archiveId);
    setActionError('');
    try {
      await apiClient.delete(`${BASE}/${archiveId}`);
      setArchiveId(null);
      await refreshAfterRemoval();
    } catch {
      setActionError(`We could not archive this ${config.docNoun}. Please try again.`);
    } finally {
      setActionId(null);
    }
  };

  const handleRestore = async (id: string) => {
    if (controlsBusy) return;
    setActionId(id);
    setActionError('');
    try {
      await apiClient.patch(`${BASE}/${id}/restore`);
      await refreshAfterRemoval();
    } catch {
      setActionError(`We could not restore this ${config.docNoun}. Please try again.`);
    } finally {
      setActionId(null);
    }
  };

  const handlePermanentDelete = async () => {
    if (!permId || controlsBusy) return;
    setActionId(permId);
    setActionError('');
    try {
      await apiClient.delete(`${BASE}/${permId}/permanent`);
      setPermId(null);
      await refreshAfterRemoval();
    } catch {
      setActionError(`We could not permanently delete this ${config.docNoun}. Please try again.`);
    } finally {
      setActionId(null);
    }
  };

  const closeConfirmation = () => {
    if (actionId) return;
    setArchiveId(null);
    setPermId(null);
    setActionError('');
  };

  return (
    <AdminPageLayout
      title={config.listTitle}
      description={config.listDescription}
      action={
        <LandingButton size='compact' onClick={() => void handleCreate()} disabled={controlsBusy}>
          {creating ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <Plus aria-hidden='true' className='size-4' />}
          {creating ? 'Creating…' : config.newButtonLabel}
        </LandingButton>
      }
    >
      {actionError && !confirming && (
        <p role='alert' className='m-0 border border-red-200 bg-red-50 px-5 py-4 text-sm leading-[1.75] text-red-800'>{actionError}</p>
      )}

      <section aria-label={config.listTitle} aria-busy={loading} className='min-w-0 border border-advisory-rule bg-white'>
        <div className='flex flex-col gap-4 border-b border-advisory-rule p-5 min-[681px]:p-6 min-[931px]:flex-row min-[931px]:items-center min-[931px]:justify-between'>
          <div className='relative w-full min-w-0 min-[931px]:max-w-md'>
            <label htmlFor={`${config.kind}-search`} className='sr-only'>Search {config.listTitle}</label>
            <Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/60' />
            <input
              id={`${config.kind}-search`}
              type='search'
              placeholder={config.searchPlaceholder}
              value={search}
              disabled={controlsBusy}
              onChange={(event) => { setSearch(event.target.value); setPage(1); }}
              className='h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white py-2 pr-3 pl-10 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none min-[681px]:text-sm'
            />
          </div>
          <div role='group' aria-label='Document status filter' className='flex w-fit shrink-0 gap-0.5 border border-advisory-rule bg-canvas p-0.5'>
            {(['active', 'archived'] as const).map((value) => (
              <button
                key={value}
                type='button'
                aria-pressed={tab === value}
                disabled={controlsBusy}
                onClick={() => switchTab(value)}
                className={cn(
                  'inline-flex min-h-8 cursor-pointer items-center justify-center gap-1.5 px-3 py-1 text-xs leading-[1.5] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none',
                  tab === value ? 'bg-midnight text-white' : 'text-midnight hover:bg-white',
                )}
              >
                {value === 'archived' && <Archive aria-hidden='true' className='size-4' />}
                {value === 'active' ? 'Active' : 'Archived'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className='px-5 min-[681px]:px-6'>
            <p role='status' className='sr-only'>Loading documents.</p>
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
            <h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load these documents.</h2>
            <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Please try again to refresh the list.</p>
            <LandingButton variant='outline' size='compact' onClick={() => void fetchTemplates()}>Try again</LandingButton>
          </div>
        ) : templates.length === 0 ? (
          <div className='p-6 min-[681px]:p-8'>
            <h2 className='m-0 text-base font-semibold text-midnight'>
              {search ? 'No matching documents' : isArchived ? 'No archived documents' : 'No documents yet'}
            </h2>
            <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>
              {search ? 'Try a different search, or clear it to see all documents.' : isArchived ? 'Archived documents will appear here, ready to restore or remove.' : `Select “${config.newButtonLabel}” to create your first ${config.docNoun}.`}
            </p>
            {search ? (
              <LandingButton variant='outline' size='compact' onClick={() => { setSearch(''); setPage(1); }}>Clear search</LandingButton>
            ) : isArchived ? (
              <LandingButton variant='outline' size='compact' onClick={() => switchTab('active')}>View active documents</LandingButton>
            ) : (
              <LandingButton size='compact' onClick={() => void handleCreate()} disabled={controlsBusy}>{config.newButtonLabel}</LandingButton>
            )}
          </div>
        ) : (
          <div role='region' aria-label={`${config.listTitle} table`} tabIndex={0} className='min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
            <table className={cn('w-full text-left text-sm leading-[1.65]', config.titleColumnLabel ? 'min-w-[1040px]' : 'min-w-[880px]')}>
              <caption className='sr-only'>{isArchived ? 'Archived' : 'Active'} {config.listTitle}, publication status and management actions.</caption>
              <thead className='border-b border-advisory-rule bg-canvas'>
                <tr>
                  {config.titleColumnLabel && <Th>{config.titleColumnLabel}</Th>}
                  <Th>{config.columnLabel}</Th>
                  <Th>Broker</Th>
                  <Th>Status</Th>
                  <Th>{isArchived ? 'Archived' : 'Last updated'}</Th>
                  <Th className='text-right'>Actions</Th>
                </tr>
              </thead>
              <tbody className='divide-y divide-advisory-rule'>
                {templates.map((template) => {
                  const name = template.businessName || 'Untitled';
                  const published = template.status === 'published';
                  return (
                    <tr key={template._id} className='transition-colors duration-150 hover:bg-canvas/50 motion-reduce:transition-none'>
                      {config.titleColumnLabel && <td className='min-w-48 px-5 py-5 align-top font-semibold text-midnight'>{bannerTitle(template)}</td>}
                      <td className='min-w-48 px-5 py-5 align-top'>
                        {isArchived ? <p className='m-0 font-semibold text-midnight'>{name}</p> : (
                          <Link href={`${config.basePath}/${template._id}`} className='font-semibold text-midnight no-underline transition-colors duration-150 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'>{name}</Link>
                        )}
                      </td>
                      <td className='min-w-48 px-5 py-5 align-top text-ink'>
                        <p className='m-0'>{getBrokerByEmail(template.brokerEmail)?.name || template.brokerEmail || '—'}</p>
                        <p className='mt-1 mb-0 break-all text-xs leading-[1.75]'>{template.brokerEmail}</p>
                      </td>
                      <td className='px-5 py-5 align-top'>
                        <span className={cn('inline-flex px-2.5 py-1 text-xs leading-[1.5] font-medium', published ? 'bg-emerald-50 text-emerald-800' : 'bg-canvas text-ink')}>{published ? 'Published' : 'Draft'}</span>
                      </td>
                      <td className='px-5 py-5 align-top whitespace-nowrap text-ink'>{reportDate(isArchived ? template.archivedAt : template.updatedAt)}</td>
                      <td className='px-5 py-3 align-top'>
                        <div className='flex items-center justify-end gap-1'>
                          {isArchived ? (
                            <>
                              <button type='button' onClick={() => void handleRestore(template._id)} disabled={controlsBusy} title='Restore document' aria-label={`Restore ${name}`} className={cn(ROW_ACTION_CLASS, 'text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900')}>
                                {actionId === template._id ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <ArchiveRestore aria-hidden='true' className='size-4' />}
                              </button>
                              <button type='button' onClick={() => { setActionError(''); setPermId(template._id); }} disabled={controlsBusy} title='Delete permanently' aria-label={`Permanently delete ${name}`} className={cn(ROW_ACTION_CLASS, 'text-red-700 hover:bg-red-50 hover:text-red-800')}>
                                <Trash2 aria-hidden='true' className='size-4' />
                              </button>
                            </>
                          ) : (
                            <>
                              <Link href={`${config.basePath}/${template._id}`} className={ROW_ACTION_CLASS} title='Edit document' aria-label={`Edit ${name}`}><Edit aria-hidden='true' className='size-4' /></Link>
                              {published && <Link href={`${config.viewerBase}/${template._id}`} target='_blank' rel='noopener noreferrer' className={ROW_ACTION_CLASS} title='Open published page' aria-label={`Open ${name} in a new tab`}><ExternalLink aria-hidden='true' className='size-4' /></Link>}
                              <Link href={`${config.printBase}/${template._id}`} target='_blank' rel='noopener noreferrer' className={ROW_ACTION_CLASS} title='Print / Save PDF' aria-label={`Print or save PDF for ${name}`}><Printer aria-hidden='true' className='size-4' /></Link>
                              <button type='button' onClick={() => void toggleStatus(template)} disabled={controlsBusy} title={published ? 'Unpublish' : 'Publish'} aria-label={`${published ? 'Unpublish' : 'Publish'} ${name}`} className={cn(ROW_ACTION_CLASS, published ? 'text-amber-800 hover:bg-amber-50 hover:text-amber-900' : 'text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900')}>
                                {actionId === template._id ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : published ? <Undo2 aria-hidden='true' className='size-4' /> : <Globe aria-hidden='true' className='size-4' />}
                              </button>
                              <button type='button' onClick={() => { setActionError(''); setArchiveId(template._id); }} disabled={controlsBusy} title='Archive document' aria-label={`Archive ${name}`} className={cn(ROW_ACTION_CLASS, 'hover:bg-amber-50 hover:text-amber-900')}><Archive aria-hidden='true' className='size-4' /></button>
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

        {!loading && !listError && templates.length > 0 && (
          <footer className='flex flex-wrap items-center justify-between gap-4 border-t border-advisory-rule px-5 py-4 min-[681px]:px-6'>
            <p className='m-0 text-sm text-ink' aria-live='polite' aria-atomic='true'>{totalPages > 1 ? `Page ${page} of ${totalPages}` : `${templates.length} on this page`}</p>
            {totalPages > 1 && (
              <nav aria-label={`${config.listTitle} pagination`} className='flex gap-2'>
                <LandingButton variant='outline' size='compact' onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1 || controlsBusy}>Previous</LandingButton>
                <LandingButton variant='outline' size='compact' onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages || controlsBusy}>Next</LandingButton>
              </nav>
            )}
          </footer>
        )}
      </section>

      <Dialog open={confirming} onOpenChange={(open) => { if (!open) closeConfirmation(); }}>
        <DialogContent showCloseButton={false} className={cn(landingFontVariables, 'max-h-[85dvh] overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-midnight ring-0 sm:max-w-[460px] min-[681px]:p-8')}>
          <DialogHeader>
            <DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>{permId ? 'Delete permanently?' : `Archive ${config.docNoun}?`}</DialogTitle>
            <DialogDescription className='mt-3 text-sm leading-[1.8] text-ink'>
              {permId ? <>This will <span className='font-semibold text-red-800'>permanently remove</span> this {config.docNoun} from the database. This action cannot be undone.</> : <>This {config.docNoun} will be moved to <span className='font-semibold'>Archived</span>.</>}
            </DialogDescription>
          </DialogHeader>
          {actionError && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{actionError}</p>}
          <div className='flex flex-wrap justify-end gap-3'>
            <LandingButton variant='outline' size='compact' onClick={closeConfirmation} disabled={Boolean(actionId)}>Cancel</LandingButton>
            <LandingButton size='compact' onClick={() => void (permId ? handlePermanentDelete() : handleArchive())} disabled={Boolean(actionId)} className={cn(permId && 'border-red-700 bg-red-700 text-white hover:bg-red-800')}>
              {actionId ? <><Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> {permId ? 'Deleting…' : 'Archiving…'}</> : permId ? 'Delete permanently' : 'Archive'}
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
