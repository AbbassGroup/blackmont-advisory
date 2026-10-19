'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Briefcase, Eye, Bell, BellOff, Copy, Check, Search, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton } from '@/components/landing/presentation';
import { ImHistoryDialog } from '@/components/admin/im-history-dialog';

type Deal = {
  _id: string;
  title: string;
  image: string;
  businessName?: string;
  deal?: string;
};

export type ImViewLog = {
  _id: string;
  name?: string;
  email: string;
  enquiryId?: string;
  imRevoked?: boolean;
  imSharedAt?: string;
  autoExpired?: boolean;
  createdAt: string;
};

const ACTION_CLASS = 'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center border border-transparent text-ink transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none';
const GRID_CLASS = 'm-0 grid min-w-0 list-none grid-cols-1 gap-6 p-0 min-[681px]:grid-cols-2 min-[1121px]:grid-cols-3';

export default function Deals() {
  const { user } = useAdminAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState('');
  const [imDialogOpen, setImDialogOpen] = useState(false);
  const [historyDeal, setHistoryDeal] = useState<Deal | null>(null);
  const [imLogs, setImLogs] = useState<ImViewLog[]>([]);
  const [imLoading, setImLoading] = useState(false);
  const [imError, setImError] = useState(false);
  const [notifPrefs, setNotifPrefs] = useState<Record<string, boolean>>({});
  const [prefsLoading, setPrefsLoading] = useState(true);
  const [prefsError, setPrefsError] = useState(false);
  const [prefsAttempt, setPrefsAttempt] = useState(0);
  const [togglingNotif, setTogglingNotif] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const historyRequest = useRef(0);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      historyRequest.current += 1;
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!user?.token) return;
    let active = true;
    setLoading(true);
    setListError(false);
    apiClient.get('/api/deals')
      .then(({ data }) => { if (active) setDeals(data || []); })
      .catch(() => { if (active) setListError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [user?.token, attempt]);

  useEffect(() => {
    if (!user?.token) return;
    let active = true;
    setPrefsLoading(true);
    setPrefsError(false);
    apiClient.get('/api/deals/im-notifications/bulk', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(({ data }) => { if (active) setNotifPrefs(data || {}); })
      .catch(() => { if (active) setPrefsError(true); })
      .finally(() => { if (active) setPrefsLoading(false); });
    return () => { active = false; };
  }, [user?.token, prefsAttempt]);

  const handleCopyUrl = async (id: string) => {
    try {
      await navigator.clipboard.writeText(`https://blackmontadvisory.com/listings/${id}`);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      setCopiedId(id);
      toast.success('Public listing URL copied');
      copyTimer.current = setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error('Failed to copy URL');
    }
  };

  const toggleNotification = async (listingId: string) => {
    if (!user?.token || prefsLoading || prefsError || togglingNotif.has(listingId)) return;
    const currentEnabled = notifPrefs[listingId] || false;
    const newEnabled = !currentEnabled;
    setNotifPrefs((previous) => ({ ...previous, [listingId]: newEnabled }));
    setTogglingNotif((previous) => new Set(previous).add(listingId));
    try {
      await apiClient.put(
        `/api/deals/${listingId}/im-notifications`,
        { enabled: newEnabled, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      toast.success(newEnabled ? 'IM view email notifications enabled' : 'IM view email notifications disabled');
    } catch {
      setNotifPrefs((previous) => ({ ...previous, [listingId]: currentEnabled }));
      toast.error('Failed to update notification preference');
    } finally {
      setTogglingNotif((previous) => { const next = new Set(previous); next.delete(listingId); return next; });
    }
  };

  const openImHistory = async (deal: Deal | null = null) => {
    if (!user?.token) return;
    const request = ++historyRequest.current;
    setHistoryDeal(deal);
    setImDialogOpen(true);
    setImLogs([]);
    setImError(false);
    setImLoading(true);
    try {
      const url = deal ? `/api/listings/im-views/all?listingId=${deal._id}` : '/api/listings/im-views/all';
      const { data } = await apiClient.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      if (request === historyRequest.current) setImLogs(data || []);
    } catch {
      if (request === historyRequest.current) setImError(true);
    } finally {
      if (request === historyRequest.current) setImLoading(false);
    }
  };

  const query = search.trim().toLowerCase();
  const filteredDeals = deals.filter((deal) => `${deal.businessName || ''} ${deal.title || ''}`.toLowerCase().includes(query));

  return (
    <AdminPageLayout
      title='Deals & prospects'
      description='Manage business deals and view their prospects.'
      action={<LandingButton variant='outline' size='compact' onClick={() => void openImHistory()} disabled={!user?.token}><Eye aria-hidden='true' className='size-4' /> All IM history</LandingButton>}
    >
      <div className='flex flex-col gap-4 border border-advisory-rule bg-white p-5 min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:p-6'>
        <div className='relative w-full min-w-0 min-[681px]:max-w-md'>
          <label htmlFor='deal-search' className='sr-only'>Search deals by business name</label>
          <Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/60' />
          <input id='deal-search' type='search' value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Search by business name…' className='h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white py-2 pr-3 pl-10 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt motion-reduce:transition-none min-[681px]:text-sm' />
        </div>
        <p className='m-0 shrink-0 text-sm leading-[1.6] text-ink' aria-live='polite'>{loading ? 'Loading deals…' : listError ? 'List unavailable' : query ? `${filteredDeals.length} of ${deals.length} deals` : `${deals.length} ${deals.length === 1 ? 'deal' : 'deals'}`}</p>
      </div>

      {prefsError && !loading && !listError && deals.length > 0 && (
        <div role='alert' className='flex flex-wrap items-center justify-between gap-4 border border-advisory-rule bg-white p-5'>
          <p className='m-0 text-sm leading-[1.75] text-ink'>Email notification preferences couldn&apos;t be loaded.</p>
          <LandingButton variant='outline' size='compact' onClick={() => setPrefsAttempt((value) => value + 1)}>Try again</LandingButton>
        </div>
      )}

      <section aria-label='Business deals' aria-busy={loading} className='min-w-0'>
        {loading ? (
          <>
            <p role='status' className='sr-only'>Loading deals.</p>
            <ul aria-hidden='true' className={GRID_CLASS}>
              {Array.from({ length: 6 }, (_, index) => <li key={index} className='overflow-hidden border border-advisory-rule bg-white'><div className='aspect-[16/10] animate-pulse bg-advisory-rule/35 motion-reduce:animate-none' /><div className='flex min-h-[110px] flex-col gap-3 p-5'><div className='h-5 w-4/5 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-5 w-1/2 animate-pulse bg-canvas motion-reduce:animate-none' /></div><div className='flex items-center justify-between border-t border-advisory-rule px-4 py-3'><div className='h-5 w-24 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-10 w-32 animate-pulse bg-canvas motion-reduce:animate-none' /></div></li>)}
            </ul>
          </>
        ) : listError ? (
          <div role='alert' className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
            <h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load your deals.</h2>
            <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Please try again to refresh the list.</p>
            <LandingButton variant='outline' size='compact' onClick={() => setAttempt((value) => value + 1)}>Try again</LandingButton>
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
            <h2 className='m-0 text-base font-semibold text-midnight'>{query ? 'No matching deals' : 'No deals available'}</h2>
            <p className='mt-2 mb-0 text-sm leading-[1.75] text-ink'>{query ? 'Try another business name, or clear your search.' : 'There are currently no business deals available for your account.'}</p>
            {query && <LandingButton variant='outline' size='compact' className='mt-5' onClick={() => setSearch('')}>Clear search</LandingButton>}
          </div>
        ) : (
          <ul className={GRID_CLASS}>
            {filteredDeals.map((deal) => {
              const name = deal.businessName || deal.title || 'Untitled business';
              const href = `/admin/deals/${deal._id}?dealId=${deal.deal}`;
              const enabled = notifPrefs[deal._id] || false;
              const toggling = togglingNotif.has(deal._id);
              return (
                <li key={deal._id} className='flex min-w-0 flex-col overflow-hidden border border-advisory-rule bg-white'>
                  <Link href={href} aria-label={`View prospects for ${name}`} className='block focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
                    <DealPhoto src={deal.image} name={name} />
                  </Link>
                  <div className='flex min-h-[110px] flex-1 flex-col justify-start p-5'>
                    <h2 className='m-0 break-words font-advisory-heading text-xl leading-[1.4] font-bold tracking-normal text-midnight'>
                      <Link href={href} className='no-underline transition-colors duration-150 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none'>{name}</Link>
                    </h2>
                  </div>
                  <div className='flex flex-wrap items-center justify-between gap-2 border-t border-advisory-rule px-4 py-3'>
                    <Link href={href} className='inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-midnight no-underline transition-colors duration-150 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none'>Prospects <ArrowUpRight aria-hidden='true' className='size-4' /></Link>
                    <div role='group' aria-label={`Actions for ${name}`} className='flex gap-1'>
                      <button type='button' onClick={() => void handleCopyUrl(deal._id)} className={ACTION_CLASS} title={copiedId === deal._id ? 'Listing URL copied' : 'Copy public listing URL'} aria-label={`Copy public listing URL for ${name}`}>
                        {copiedId === deal._id ? <Check aria-hidden='true' className='size-4 text-emerald-800' /> : <Copy aria-hidden='true' className='size-4' />}
                      </button>
                      <button type='button' onClick={() => void toggleNotification(deal._id)} disabled={toggling || prefsLoading || prefsError} aria-pressed={enabled} aria-label={`IM email notifications for ${name}`} title={prefsLoading ? 'Loading notification preferences' : prefsError ? 'Notification preferences unavailable' : enabled ? 'Disable IM view email notifications' : 'Enable IM view email notifications'} className={cn(ACTION_CLASS, enabled && 'bg-gilt/15 text-midnight hover:bg-gilt/25')}>
                        {toggling || prefsLoading ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : enabled ? <Bell aria-hidden='true' className='size-4' /> : <BellOff aria-hidden='true' className='size-4' />}
                      </button>
                      <button type='button' onClick={() => void openImHistory(deal)} className={ACTION_CLASS} title='View IM history' aria-label={`View IM history for ${name}`}><Eye aria-hidden='true' className='size-4' /></button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {imDialogOpen && <ImHistoryDialog open onOpenChange={(open) => { if (!open) { historyRequest.current += 1; setImDialogOpen(false); } }} logs={imLogs} loading={imLoading} error={imError} onRetry={() => void openImHistory(historyDeal)} businessName={historyDeal?.businessName || historyDeal?.title} token={user?.token || ''} />}
    </AdminPageLayout>
  );
}

function DealPhoto({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className='relative aspect-[16/10] w-full overflow-hidden bg-canvas'>
      {src && !failed ? <Image unoptimized src={src} alt={name} width={800} height={500} onError={() => setFailed(true)} className='h-full w-full object-cover' /> : <div className='flex h-full items-center justify-center'><Briefcase aria-hidden='true' className='size-8 text-ink/40' /><span className='sr-only'>No listing image available</span></div>}
    </div>
  );
}
