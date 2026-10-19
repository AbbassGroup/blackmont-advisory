'use client';

import { useEffect, useRef, useState } from 'react';
import { Eye, FileText, Search, StickyNote } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useVendorAuth } from '@/context/vendor-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import { ImHistoryDialog, type ImViewLog } from '@/components/admin/im-history-dialog';
import { ProspectNotesDialog, type ProspectNote } from '@/components/admin/prospect-notes-dialog';

const CATEGORY_STYLES: Record<string, string> = { Hot: 'bg-red-50 text-red-800', Warm: 'bg-amber-50 text-amber-800', Cold: 'bg-blue-50 text-blue-800' };
type Prospect = { _id: string; firstName: string; lastName: string; category: string | null };
const prospectName = (prospect: Prospect) => `${prospect.firstName || ''} ${prospect.lastName || ''}`.trim() || 'Unnamed prospect';

export default function VendorDashboardPage() {
  const { token } = useVendorAuth();
  const [businessName, setBusinessName] = useState('Your deal');
  const [imTemplateId, setImTemplateId] = useState<string | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [notesMap, setNotesMap] = useState<Record<string, ProspectNote[]>>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState('');
  const [imOpen, setImOpen] = useState(false);
  const [imLogs, setImLogs] = useState<ImViewLog[]>([]);
  const [imLoading, setImLoading] = useState(false);
  const [imError, setImError] = useState('');
  const historyRequest = useRef(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [activeProspect, setActiveProspect] = useState<Prospect | null>(null);

  useEffect(() => {
    if (!token) return;
    let active = true;
    setLoading(true);
    setLoadError(false);
    Promise.all([
      apiClient.get('/api/vendor/deal'),
      apiClient.get('/api/vendor/deal/prospects'),
      apiClient.get('/api/vendor/deal/notes'),
    ]).then(([deal, buyers, notes]) => {
      if (!active) return;
      setBusinessName(deal.data?.businessName || 'Your deal');
      setImTemplateId(deal.data?.imTemplateId || null);
      setProspects(Array.isArray(buyers.data) ? buyers.data : []);
      setNotesMap(notes.data || {});
    }).catch(() => { if (active) setLoadError(true); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [token, attempt]);

  useEffect(() => () => { historyRequest.current += 1; }, []);

  const query = search.trim().toLowerCase();
  const priority: Record<string, number> = { Hot: 0, Warm: 1, Cold: 2 };
  const filtered = prospects.filter((prospect) => [prospectName(prospect), prospect.category].some((value) => (value || '').toLowerCase().includes(query)))
    .sort((a, b) => (priority[a.category ?? ''] ?? 3) - (priority[b.category ?? ''] ?? 3));

  const openImHistory = async () => {
    const request = ++historyRequest.current;
    setImOpen(true);
    setImLoading(true);
    setImError('');
    try {
      const { data } = await apiClient.get('/api/vendor/deal/im-views');
      if (request === historyRequest.current) setImLogs(Array.isArray(data) ? data : []);
    } catch {
      if (request === historyRequest.current) { setImLogs([]); setImError('We could not load the IM history. Please try again.'); }
    } finally { if (request === historyRequest.current) setImLoading(false); }
  };

  return (
    <AdminPageLayout title='Your deal' description='Prospects and Information Memorandum activity for your deal.'>
      <section aria-label='Deal documents' className='flex flex-col gap-5 border border-advisory-rule bg-white p-5 min-[681px]:p-6 min-[1121px]:flex-row min-[1121px]:items-center min-[1121px]:justify-between'>
        <div className='min-w-0'>{loading ? <div role='status' className='h-8 w-56 max-w-full animate-pulse bg-canvas motion-reduce:animate-none'><span className='sr-only'>Loading deal details.</span></div> : <h2 className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight'>{loadError ? 'Deal unavailable' : businessName}</h2>}</div>
        <div className='flex flex-wrap gap-3'>
          <LandingButton variant='outline' size='compact' disabled={loading || loadError || imLoading} onClick={() => void openImHistory()}><Eye aria-hidden='true' className='size-4' />View IM history</LandingButton>
          {!loading && !loadError && imTemplateId ? <LandingButtonLink href={`/information-memorandum/${imTemplateId}`} target='_blank' rel='noopener noreferrer' size='compact'><FileText aria-hidden='true' className='size-4' />Information Memorandum</LandingButtonLink> : <LandingButton disabled size='compact'><FileText aria-hidden='true' className='size-4' />Information Memorandum</LandingButton>}
        </div>
      </section>

      <section aria-label='Registered prospects' aria-busy={loading} className='min-w-0 border border-advisory-rule bg-white'>
        <div className='flex flex-col gap-4 border-b border-advisory-rule p-5 min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:p-6'>
          <div className='relative w-full min-[681px]:max-w-md'><label htmlFor='vendor-prospect-search' className='sr-only'>Search prospects by name or category</label><Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/60' /><input id='vendor-prospect-search' type='search' value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Search prospects…' className='h-10 w-full rounded-none border border-advisory-input bg-white py-2 pr-3 pl-10 text-base text-midnight outline-none placeholder:text-ink/65 focus:border-gilt min-[681px]:text-sm' /></div>
          <p aria-live='polite' className='m-0 shrink-0 text-sm'>{loading ? 'Loading prospects…' : loadError ? 'List unavailable' : query ? `${filtered.length} of ${prospects.length} prospects` : `${prospects.length} ${prospects.length === 1 ? 'prospect' : 'prospects'}`}</p>
        </div>
        {loadError && !loading ? (
          <div role='alert' className='p-6 min-[681px]:p-8'><h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load your deal activity.</h2><p className='mt-2 mb-5 text-sm leading-[1.75]'>Please try again to refresh the deal, prospects and notes.</p><LandingButton variant='outline' size='compact' onClick={() => setAttempt((value) => value + 1)}>Try again</LandingButton></div>
        ) : (
          <div role='region' aria-label='Prospect table' tabIndex={0} className='min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
            <table className='w-full min-w-[640px] text-left text-sm leading-[1.65]'>
              <caption className='sr-only'>Prospect names, categories and read-only notes.</caption>
              <thead className='border-b border-advisory-rule bg-canvas text-midnight'><tr>{['Name', 'Category', 'Notes'].map((label) => <th key={label} scope='col' className='px-5 py-4 font-semibold'>{label}</th>)}</tr></thead>
              <tbody className='divide-y divide-advisory-rule'>
                {loading ? [0, 1, 2, 3, 4].map((row) => <tr key={row} aria-hidden='true'>{[0, 1].map((column) => <td key={column} className='px-5 py-5'><div className='h-5 w-28 animate-pulse bg-canvas motion-reduce:animate-none' /></td>)}<td className='px-5 py-3'><div className='h-10 w-24 animate-pulse bg-canvas motion-reduce:animate-none' /></td></tr>) : filtered.length ? filtered.map((prospect) => {
                  const count = notesMap[prospect._id]?.length || 0;
                  return <tr key={prospect._id} className='hover:bg-canvas/50'>
                    <td className='px-5 py-5 font-semibold text-midnight'>{prospectName(prospect)}</td>
                    <td className='px-5 py-5'>{prospect.category ? <span className={cn('inline-flex px-2.5 py-1 text-xs leading-[1.5] font-medium', CATEGORY_STYLES[prospect.category] || 'bg-canvas text-ink')}>{prospect.category}</span> : '—'}</td>
                    <td className='px-5 py-3'><button type='button' onClick={() => { setActiveProspect(prospect); setNotesOpen(true); }} aria-label={`View notes for ${prospectName(prospect)}`} className='inline-flex min-h-10 items-center gap-2 px-3 text-sm font-medium text-midnight hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'><StickyNote aria-hidden='true' className='size-4' />{count ? `${count} ${count === 1 ? 'note' : 'notes'}` : 'View notes'}</button></td>
                  </tr>;
                }) : <tr><td colSpan={3} className='px-5 py-8'><p className='m-0 font-semibold text-midnight'>{query ? 'No matching prospects' : 'No prospects yet'}</p><p className='mt-2 mb-0'>{query ? 'Try another name or category.' : 'Registered prospects will appear here as they become available.'}</p>{query && <LandingButton variant='outline' size='compact' className='mt-5' onClick={() => setSearch('')}>Clear search</LandingButton>}</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <ImHistoryDialog open={imOpen} onOpenChange={setImOpen} logs={imLogs} loading={imLoading} token={token || ''} hideEmail error={Boolean(imError)} onRetry={() => void openImHistory()} revokePath={(enquiryId) => `/api/vendor/deal/im-revoke/${enquiryId}`} />
      <ProspectNotesDialog open={notesOpen} onOpenChange={setNotesOpen} readOnly prospectName={activeProspect ? prospectName(activeProspect) : ''} notes={activeProspect ? notesMap[activeProspect._id] || [] : []} />
    </AdminPageLayout>
  );
}
