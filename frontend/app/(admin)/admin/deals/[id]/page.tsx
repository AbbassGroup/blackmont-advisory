'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Loader2, Eye, Bell, BellOff, UserCog, StickyNote, Copy, Check, Search } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import { ImHistoryDialog, type ImViewLog } from '@/components/admin/im-history-dialog';
import { VendorAccessDialog } from '@/components/admin/vendor-access-dialog';
import { ProspectNotesDialog, type ProspectNote } from '@/components/admin/prospect-notes-dialog';

const CATEGORIES = [
  { label: 'Hot', color: 'border-red-200 bg-red-50 text-red-800' },
  { label: 'Warm', color: 'border-amber-200 bg-amber-50 text-amber-900' },
  { label: 'Cold', color: 'border-sky-200 bg-sky-50 text-sky-900' },
];

type Prospect = { _id: string; firstName: string; lastName: string; phone?: string; email?: string };
const prospectName = (prospect: Prospect) => `${prospect.firstName || ''} ${prospect.lastName || ''}`.trim() || 'Unnamed prospect';

export default function ProspectsPage() {
  const params = useParams();
  const dealId = params?.id as string;
  const { user } = useAdminAuth();
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [categoryBusy, setCategoryBusy] = useState<Set<string>>(new Set());
  const [dealTitle, setDealTitle] = useState('Deal');
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [actionError, setActionError] = useState('');
  const [search, setSearch] = useState('');
  const [imDialogOpen, setImDialogOpen] = useState(false);
  const [imLogs, setImLogs] = useState<ImViewLog[]>([]);
  const [imLoading, setImLoading] = useState(false);
  const [imError, setImError] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifLoading, setNotifLoading] = useState(true);
  const [notifError, setNotifError] = useState(false);
  const [notifAttempt, setNotifAttempt] = useState(0);
  const [notifToggling, setNotifToggling] = useState(false);
  const [copied, setCopied] = useState(false);
  const [vendorDialogOpen, setVendorDialogOpen] = useState(false);
  const [notesMap, setNotesMap] = useState<Record<string, ProspectNote[]>>({});
  const [notesLoading, setNotesLoading] = useState(true);
  const [notesError, setNotesError] = useState(false);
  const [notesAttempt, setNotesAttempt] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [activeProspect, setActiveProspect] = useState<Prospect | null>(null);
  const [notesSaving, setNotesSaving] = useState(false);
  const historyRequest = useRef(0);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    historyRequest.current += 1;
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  useEffect(() => {
    if (!user?.token || !dealId) return;
    let active = true;
    setLoading(true);
    setListError(false);
    // The backend filters unapproved NDAs before returning prospects.
    Promise.all([
      apiClient.get(`/api/deals/${dealId}/prospects`, { headers: { Authorization: `Bearer ${user.token}` } }),
      apiClient.get(`/api/deals/${dealId}/categories`, { headers: { Authorization: `Bearer ${user.token}` } }),
    ]).then(([dealResponse, categoryResponse]) => {
      if (!active) return;
      setProspects(dealResponse.data?.prospects || []);
      setCategories(categoryResponse.data || {});
      setDealTitle(dealResponse.data?.businessName || 'Deal');
    }).catch(() => { if (active) setListError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [dealId, user?.token, attempt]);

  useEffect(() => {
    if (!user?.token || !dealId) return;
    let active = true;
    setNotifLoading(true);
    setNotifError(false);
    apiClient.get(`/api/deals/${dealId}/im-notifications`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(({ data }) => { if (active) setNotifEnabled(data?.enabled || false); })
      .catch(() => { if (active) setNotifError(true); })
      .finally(() => { if (active) setNotifLoading(false); });
    return () => { active = false; };
  }, [dealId, user?.token, notifAttempt]);

  useEffect(() => {
    if (!user?.token || !dealId) return;
    let active = true;
    setNotesLoading(true);
    setNotesError(false);
    apiClient.get(`/api/deals/${dealId}/notes`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(({ data }) => { if (active) setNotesMap(data || {}); })
      .catch(() => { if (active) setNotesError(true); })
      .finally(() => { if (active) setNotesLoading(false); });
    return () => { active = false; };
  }, [dealId, user?.token, notesAttempt]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(`https://blackmontadvisory.com/listings/${dealId}`);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      setCopied(true);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
      toast.success('Public listing URL copied');
    } catch { toast.error('Failed to copy URL'); }
  };

  const toggleNotification = async () => {
    if (!user?.token || notifLoading || notifError || notifToggling) return;
    const previous = notifEnabled;
    const enabled = !previous;
    setNotifEnabled(enabled);
    setNotifToggling(true);
    try {
      await apiClient.put(`/api/deals/${dealId}/im-notifications`, { enabled, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }, { headers: { Authorization: `Bearer ${user.token}` } });
      toast.success(enabled ? 'IM view email notifications enabled' : 'IM view email notifications disabled');
    } catch {
      setNotifEnabled(previous);
      toast.error('Failed to update notification preference');
    } finally { setNotifToggling(false); }
  };

  const handleCategorySelect = async (prospectId: string, label: string) => {
    if (!user?.token || categoryBusy.has(prospectId)) return;
    const previous = categories[prospectId];
    setActionError('');
    setCategoryBusy((current) => new Set(current).add(prospectId));
    setCategories((current) => ({ ...current, [prospectId]: label }));
    try {
      await apiClient.put(`/api/deals/${dealId}/categories/${prospectId}`, { category: label }, { headers: { Authorization: `Bearer ${user.token}` } });
    } catch {
      setCategories((current) => { const next = { ...current }; if (previous) next[prospectId] = previous; else delete next[prospectId]; return next; });
      setActionError('The prospect category could not be saved. Please try again.');
    } finally {
      setCategoryBusy((current) => { const next = new Set(current); next.delete(prospectId); return next; });
    }
  };

  const handleCreateNote = async (body: string) => {
    if (!user?.token || !activeProspect || notesSaving || notesLoading || notesError) return false;
    const prospectId = activeProspect._id;
    setNotesSaving(true);
    try {
      const { data } = await apiClient.post(`/api/deals/${dealId}/notes/${prospectId}`, { body }, { headers: { Authorization: `Bearer ${user.token}` } });
      setNotesMap((current) => ({ ...current, [prospectId]: [data, ...(current[prospectId] || [])] }));
      return true;
    } catch { toast.error('Failed to add note'); return false; }
    finally { setNotesSaving(false); }
  };

  const handleUpdateNote = async (noteId: string, body: string) => {
    if (!user?.token || !activeProspect || notesSaving) return false;
    const prospectId = activeProspect._id;
    setNotesSaving(true);
    try {
      const { data } = await apiClient.put(`/api/deals/${dealId}/notes/${noteId}`, { body }, { headers: { Authorization: `Bearer ${user.token}` } });
      setNotesMap((current) => ({ ...current, [prospectId]: (current[prospectId] || []).map((note) => note._id === noteId ? data : note) }));
      return true;
    } catch { toast.error('Failed to update note'); return false; }
    finally { setNotesSaving(false); }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!user?.token || !activeProspect || notesSaving) return false;
    const prospectId = activeProspect._id;
    setNotesSaving(true);
    try {
      await apiClient.delete(`/api/deals/${dealId}/notes/${noteId}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setNotesMap((current) => ({ ...current, [prospectId]: (current[prospectId] || []).filter((note) => note._id !== noteId) }));
      return true;
    } catch { toast.error('Failed to delete note'); return false; }
    finally { setNotesSaving(false); }
  };

  const openImHistory = async () => {
    if (!user?.token) return;
    const request = ++historyRequest.current;
    setImDialogOpen(true);
    setImLogs([]);
    setImError(false);
    setImLoading(true);
    try {
      const { data } = await apiClient.get(`/api/listings/im-views/all?listingId=${dealId}`, { headers: { Authorization: `Bearer ${user.token}` } });
      if (request === historyRequest.current) setImLogs(data || []);
    } catch { if (request === historyRequest.current) setImError(true); }
    finally { if (request === historyRequest.current) setImLoading(false); }
  };

  const query = search.trim().toLowerCase();
  const priority: Record<string, number> = { Hot: 0, Warm: 1, Cold: 2 };
  const sortedProspects = [...prospects]
    .filter((prospect) => `${prospectName(prospect)} ${prospect.email || ''} ${prospect.phone || ''}`.toLowerCase().includes(query))
    .sort((first, second) => (priority[categories[first._id]] ?? 3) - (priority[categories[second._id]] ?? 3));

  return (
    <AdminPageLayout title='Registered buyers' description='Manage buyer interest, prospect notes and IM access.' action={<LandingButtonLink href='/admin/deals' variant='outline' size='compact'><ArrowLeft aria-hidden='true' className='size-4' /> All deals</LandingButtonLink>}>
      <section aria-label='Deal actions' className='flex min-w-0 flex-col gap-5 border border-advisory-rule bg-white p-5 min-[681px]:p-6'>
        {loading ? <div aria-hidden='true' className='h-8 w-2/3 animate-pulse bg-canvas motion-reduce:animate-none' /> : <h2 className='m-0 break-words font-advisory-heading text-[23px] leading-[1.4] font-bold tracking-normal text-midnight'>{listError ? 'Deal details unavailable' : dealTitle}</h2>}
        <div className='flex flex-wrap gap-2'>
          <LandingButton variant='outline' size='compact' disabled={!user?.token} onClick={() => void handleCopyUrl()}>{copied ? <Check aria-hidden='true' className='size-4 text-emerald-800' /> : <Copy aria-hidden='true' className='size-4' />}{copied ? 'URL copied' : 'Copy listing URL'}</LandingButton>
          <LandingButton variant='outline' size='compact' disabled={loading || listError} onClick={() => void openImHistory()}><Eye aria-hidden='true' className='size-4' /> IM history</LandingButton>
          <LandingButton variant='outline' size='compact' disabled={loading || listError} onClick={() => setVendorDialogOpen(true)}><UserCog aria-hidden='true' className='size-4' /> Vendor access</LandingButton>
          <LandingButton variant='outline' size='compact' disabled={notifLoading || notifError || notifToggling} aria-pressed={notifEnabled} onClick={() => void toggleNotification()} className={notifEnabled ? 'border-advisory-rule bg-gilt/15 text-midnight hover:bg-gilt/25 hover:text-midnight' : undefined}>
            {notifToggling || notifLoading ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : notifEnabled ? <Bell aria-hidden='true' className='size-4' /> : <BellOff aria-hidden='true' className='size-4' />}
            {notifLoading ? 'Loading notifications…' : notifError ? 'Notifications unavailable' : notifEnabled ? 'Notifications on' : 'Notifications off'}
          </LandingButton>
        </div>
        {notifError && <div role='alert' className='flex flex-wrap items-center gap-3'><p className='m-0 text-sm text-ink'>Email notification settings couldn&apos;t be loaded.</p><LandingButton variant='outline' size='compact' onClick={() => setNotifAttempt((value) => value + 1)}>Try again</LandingButton></div>}
      </section>

      {actionError && <p role='alert' className='m-0 border border-red-200 bg-red-50 px-5 py-4 text-sm leading-[1.75] text-red-800'>{actionError}</p>}

      <section aria-label='Prospects' aria-busy={loading} className='min-w-0 border border-advisory-rule bg-white'>
        <div className='flex flex-col gap-4 border-b border-advisory-rule p-5 min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:p-6'>
          <div className='relative w-full min-w-0 min-[681px]:max-w-md'>
            <label htmlFor='prospect-search' className='sr-only'>Search prospects by name, email or phone</label>
            <Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/60' />
            <input id='prospect-search' type='search' value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Search by name, email or phone…' className='h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white py-2 pr-3 pl-10 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt motion-reduce:transition-none min-[681px]:text-sm' />
          </div>
          <p className='m-0 shrink-0 text-sm leading-[1.6] text-ink' aria-live='polite'>{loading ? 'Loading prospects…' : listError ? 'List unavailable' : query ? `${sortedProspects.length} of ${prospects.length} prospects` : `${prospects.length} ${prospects.length === 1 ? 'prospect' : 'prospects'}`}</p>
        </div>

        {loading ? (
          <div className='px-5 min-[681px]:px-6'><p role='status' className='sr-only'>Loading prospects.</p><div aria-hidden='true' className='divide-y divide-advisory-rule'>{[0, 1, 2, 3, 4].map((index) => <div key={index} className='flex items-center justify-between gap-8 py-6'><div className='h-4 w-1/3 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-4 w-1/4 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-8 w-24 shrink-0 animate-pulse bg-canvas motion-reduce:animate-none' /></div>)}</div></div>
        ) : listError ? (
          <div role='alert' className='p-6 min-[681px]:p-8'><h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load the prospects.</h2><p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Please try again to refresh this deal.</p><LandingButton variant='outline' size='compact' onClick={() => setAttempt((value) => value + 1)}>Try again</LandingButton></div>
        ) : sortedProspects.length === 0 ? (
          <div className='p-6 min-[681px]:p-8'><h2 className='m-0 text-base font-semibold text-midnight'>{query ? 'No matching prospects' : 'No prospects found for this deal'}</h2><p className='mt-2 mb-0 text-sm leading-[1.75] text-ink'>{query ? 'Try another name, email address or phone number.' : 'Prospects appear here once their NDA has been approved.'}</p>{query && <LandingButton variant='outline' size='compact' className='mt-5' onClick={() => setSearch('')}>Clear search</LandingButton>}</div>
        ) : (
          <div role='region' aria-label='Registered buyer table' tabIndex={0} className='min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
            <table className='w-full min-w-[900px] text-left text-sm leading-[1.65]'>
              <caption className='sr-only'>Approved prospects, contact details, interest categories and notes.</caption>
              <thead className='border-b border-advisory-rule bg-canvas text-midnight'><tr>{['Name', 'Phone', 'Email', 'Category', 'Notes'].map((heading) => <th key={heading} scope='col' className='px-5 py-4 font-semibold'>{heading}</th>)}</tr></thead>
              <tbody className='divide-y divide-advisory-rule'>
                {sortedProspects.map((prospect) => {
                  const name = prospectName(prospect);
                  const category = CATEGORIES.find((item) => item.label === categories[prospect._id]);
                  const noteCount = notesMap[prospect._id]?.length || 0;
                  return (
                    <tr key={prospect._id} className='transition-colors duration-150 hover:bg-canvas/50 motion-reduce:transition-none'>
                      <td className='min-w-44 px-5 py-5 align-top font-semibold text-midnight'>{name}</td>
                      <td className='px-5 py-5 align-top whitespace-nowrap text-ink'>{prospect.phone || '—'}</td>
                      <td className='break-all px-5 py-5 align-top text-ink'>{prospect.email || '—'}</td>
                      <td className='px-5 py-3 align-top'>
                        <label htmlFor={`category-${prospect._id}`} className='sr-only'>Interest category for {name}</label>
                        <select id={`category-${prospect._id}`} value={categories[prospect._id] || ''} disabled={categoryBusy.has(prospect._id)} onChange={(event) => void handleCategorySelect(prospect._id, event.target.value)} className={cn('h-10 w-36 cursor-pointer rounded-none border border-advisory-input bg-white px-3 py-2 font-advisory-body text-sm text-midnight outline-none focus:border-gilt disabled:cursor-wait disabled:opacity-60', category?.color)}>
                          <option value='' disabled>Set category</option>{CATEGORIES.map((item) => <option key={item.label} value={item.label}>{item.label}</option>)}
                        </select>
                      </td>
                      <td className='px-5 py-3 align-top'>
                        <button type='button' onClick={() => { setActiveProspect(prospect); setNotesOpen(true); }} className='inline-flex min-h-10 cursor-pointer items-center gap-2 px-2 text-sm font-medium text-midnight transition-colors duration-150 hover:bg-canvas hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none' aria-label={`Open notes for ${name}`}>
                          <StickyNote aria-hidden='true' className='size-4 shrink-0' />{notesLoading ? 'Loading notes…' : notesError ? 'View notes' : noteCount ? `${noteCount} ${noteCount === 1 ? 'note' : 'notes'}` : 'Add note'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {imDialogOpen && <ImHistoryDialog open onOpenChange={(open) => { if (!open) { historyRequest.current += 1; setImDialogOpen(false); } }} logs={imLogs} loading={imLoading} error={imError} onRetry={() => void openImHistory()} businessName={dealTitle} token={user?.token || ''} />}
      {vendorDialogOpen && <VendorAccessDialog open onOpenChange={setVendorDialogOpen} listingId={dealId} token={user?.token || ''} />}
      {notesOpen && activeProspect && <ProspectNotesDialog key={activeProspect._id} open onOpenChange={setNotesOpen} prospectName={prospectName(activeProspect)} notes={notesMap[activeProspect._id] || []} loading={notesLoading} error={notesError} onRetry={() => setNotesAttempt((value) => value + 1)} saving={notesSaving} onCreate={handleCreateNote} onUpdate={handleUpdateNote} onDelete={handleDeleteNote} />}
    </AdminPageLayout>
  );
}
