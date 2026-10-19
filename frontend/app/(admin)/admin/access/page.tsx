'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton } from '@/components/landing/presentation';

interface Totals {
  pageViews: number;
  uniqueVisitors: number;
  cardOpens: number;
  toolStarts: number;
  toolCompletions: number;
  leads: number;
  ctaClicks: number;
  conversionRate: number;
}

interface ResourceRow {
  resource: string;
  views: number;
  cardOpens: number;
  completions: number;
  leads: number;
}

interface Lead {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  industry?: string;
  location?: string;
  comments?: string;
  resource?: string;
  leadType?: string;
  createdAt: string;
}

interface Summary {
  days: number;
  totals: Totals;
  byResource: ResourceRow[];
  recentLeads: Lead[];
}

const RANGES = [
  { label: '7 days', days: 7 },
  { label: '30 days', days: 30 },
  { label: '90 days', days: 90 },
  { label: 'All time', days: 0 },
];

const METRICS = [
  { label: 'Page views', key: 'pageViews' },
  { label: 'Unique visitors', key: 'uniqueVisitors' },
  { label: 'Resource opens', key: 'cardOpens' },
  { label: 'Tool completions', key: 'toolCompletions' },
  { label: 'Leads', key: 'leads' },
] as const;

const FUNNEL_COLUMNS = ['Resource', 'Tool views', 'Opens', 'Completions', 'Leads'];
const LEAD_COLUMNS = ['Name', 'Email', 'Phone', 'Resource', 'Type', 'Date'];

function leadDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function ResourceAnalyticsPage() {
  const { user } = useAdminAuth();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [days, setDays] = useState(30);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!user?.token) return;
    let active = true;
    setLoading(true);
    setLoadError(false);
    apiClient.get<Summary>('/api/access-analytics/summary', {
      params: { days },
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(({ data }) => { if (active) setSummary(data); })
      .catch(() => { if (active) setLoadError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [user?.token, days, attempt]);

  const query = search.trim().toLowerCase();
  const leads = summary?.recentLeads ?? [];
  const filteredLeads = useMemo(() => (summary?.recentLeads ?? []).filter((lead) =>
    [lead.name, lead.email, lead.phone, lead.resource, lead.industry].some((value) => (value || '').toLowerCase().includes(query)),
  ), [summary?.recentLeads, query]);

  const totals = summary?.totals;
  const period = RANGES.find((range) => range.days === days)?.label;

  return (
    <AdminPageLayout title='Resource Analytics' description='Track resource activity, tool completions and captured leads.'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div role='group' aria-label='Analytics period' className='inline-flex w-fit flex-wrap gap-0.5 border border-advisory-rule bg-white p-0.5'>
          {RANGES.map((range) => (
            <button key={range.days} type='button' aria-pressed={days === range.days}
              onClick={() => { if (days !== range.days) { setLoading(true); setDays(range.days); } }}
              className={cn('inline-flex min-h-8 items-center justify-center px-3 py-1 font-advisory-body text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none', days === range.days ? 'bg-midnight text-white' : 'text-midnight hover:bg-canvas')}>
              {range.label}
            </button>
          ))}
        </div>
        <p role='status' className='m-0 text-sm text-ink'>{loading ? 'Loading analytics…' : loadError ? 'Analytics unavailable' : period}</p>
      </div>

      {loadError && !loading ? (
        <section role='alert' className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
          <h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load your analytics.</h2>
          <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Please try again to refresh this period.</p>
          <LandingButton variant='outline' size='compact' onClick={() => setAttempt((value) => value + 1)}>Try again</LandingButton>
        </section>
      ) : (
        <div aria-busy={loading} className='flex min-w-0 flex-col gap-8'>
          <dl aria-label={`Activity totals: ${period}`} className='m-0 grid grid-cols-1 gap-px border border-advisory-rule bg-advisory-rule min-[481px]:grid-cols-2 min-[1121px]:grid-cols-5'>
            {METRICS.map((metric) => (
              <div key={metric.key} className='flex flex-col gap-3 bg-white p-5 min-[681px]:p-6'>
                <dt className='text-sm font-medium text-ink'>{metric.label}</dt>
                <dd className='m-0 flex min-h-[58px] flex-col gap-1'>
                  {loading ? <span aria-hidden='true' className='mt-1 h-7 w-20 animate-pulse bg-canvas motion-reduce:animate-none' /> : (
                    <><span className='text-[28px] leading-[1.25] font-semibold tabular-nums text-midnight'>{(totals?.[metric.key] ?? 0).toLocaleString('en-AU')}</span>
                      {metric.key === 'leads' && <span className='text-xs leading-[1.6] text-ink'>{totals?.conversionRate ?? 0}% of page views</span>}</>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <section aria-labelledby='resource-funnel-title' className='min-w-0 border border-advisory-rule bg-white'>
            <div className='flex flex-col gap-2 border-b border-advisory-rule p-5 min-[681px]:p-6'>
              <h2 id='resource-funnel-title' className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight'>Resource funnel</h2>
              <p className='m-0 text-sm leading-[1.75] text-ink'>How each tool moves from open to completion to lead.</p>
            </div>
            <div role='region' aria-label='Resource funnel table' tabIndex={0} className='min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
              <table className='w-full min-w-[680px] text-left text-sm leading-[1.65]'>
                <caption className='sr-only'>Resource activity for {period}.</caption>
                <AnalyticsHead columns={FUNNEL_COLUMNS} numeric />
                <tbody className='divide-y divide-advisory-rule'>
                  {loading ? <AnalyticsRows columns={5} rows={4} /> : summary?.byResource?.length ? summary.byResource.map((resource) => (
                    <tr key={resource.resource} className='hover:bg-canvas/50'>
                      <th scope='row' className='px-5 py-5 font-semibold text-midnight'>{resource.resource}</th>
                      {[resource.views, resource.cardOpens, resource.completions, resource.leads].map((value, index) => <td key={index} className={cn('px-5 py-5 text-right tabular-nums text-ink', index === 3 && 'font-semibold text-midnight')}>{value.toLocaleString('en-AU')}</td>)}
                    </tr>
                  )) : <tr><td colSpan={5} className='px-5 py-8 text-ink'>No resource activity recorded in this period.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby='captured-leads-title' className='min-w-0 border border-advisory-rule bg-white'>
            <div className='flex flex-col gap-5 border-b border-advisory-rule p-5 min-[681px]:p-6 min-[1121px]:flex-row min-[1121px]:items-center min-[1121px]:justify-between'>
              <div className='flex flex-col gap-2'>
                <h2 id='captured-leads-title' className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight'>Captured leads</h2>
                <p className='m-0 text-sm leading-[1.75] text-ink'>Contacts collected from resource tools and consultation forms.</p>
              </div>
              <div className='flex w-full flex-col gap-2 min-[1121px]:max-w-xs'>
                <div className='relative'>
                  <label htmlFor='analytics-lead-search' className='sr-only'>Search leads by name, email, phone, resource or industry</label>
                  <Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/60' />
                  <input id='analytics-lead-search' type='search' value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Search leads…' className='h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white py-2 pr-3 pl-10 text-base text-midnight outline-none placeholder:text-ink/65 focus:border-gilt min-[681px]:text-sm' />
                </div>
                <p aria-live='polite' className='m-0 text-xs text-ink'>{loading ? 'Loading leads…' : `${filteredLeads.length} of ${leads.length} captured leads`}</p>
              </div>
            </div>
            <div role='region' aria-label='Captured leads table' tabIndex={0} className='min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
              <table className='w-full min-w-[1000px] text-left text-sm leading-[1.65]'>
                <caption className='sr-only'>Captured lead contact details, resource, type and date.</caption>
                <AnalyticsHead columns={LEAD_COLUMNS} />
                <tbody className='divide-y divide-advisory-rule'>
                  {loading ? <AnalyticsRows columns={6} rows={5} /> : filteredLeads.length ? filteredLeads.map((lead) => (
                    <tr key={lead._id} className='hover:bg-canvas/50'>
                      <td className='min-w-36 px-5 py-5 align-top font-semibold text-midnight'>{lead.name || '—'}</td>
                      <td className='break-all px-5 py-5 align-top text-ink'>{lead.email || '—'}</td>
                      <td className='px-5 py-5 align-top whitespace-nowrap text-ink'>{lead.phone || '—'}</td>
                      <td className='px-5 py-5 align-top text-ink'>{lead.resource || '—'}</td>
                      <td className='px-5 py-5 align-top'><span className={cn('inline-flex px-2.5 py-1 text-xs leading-[1.5] font-medium text-midnight', lead.leadType === 'consultation' ? 'bg-canvas' : 'bg-gilt/15')}>{lead.leadType === 'consultation' ? 'Consultation' : 'Resource Unlock'}</span></td>
                      <td className='px-5 py-5 align-top whitespace-nowrap text-ink'>{leadDate(lead.createdAt)}</td>
                    </tr>
                  )) : <tr><td colSpan={6} className='px-5 py-8 text-ink'>
                    <p className='m-0 font-semibold text-midnight'>{query ? 'No matching leads' : 'No leads captured in this period'}</p>
                    <p className='mt-2 mb-0'>{query ? 'Try another name, email address, phone number, resource or industry.' : 'Contacts will appear here when someone submits a resource or consultation form.'}</p>
                    {query && <LandingButton variant='outline' size='compact' className='mt-5' onClick={() => setSearch('')}>Clear search</LandingButton>}
                  </td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </AdminPageLayout>
  );
}

function AnalyticsHead({ columns, numeric = false }: { columns: string[]; numeric?: boolean }) {
  return <thead className='border-b border-advisory-rule bg-canvas text-midnight'><tr>{columns.map((column, index) => <th key={column} scope='col' className={cn('px-5 py-4 font-semibold', numeric && index > 0 && 'text-right')}>{column}</th>)}</tr></thead>;
}

function AnalyticsRows({ columns, rows }: { columns: number; rows: number }) {
  return <>{Array.from({ length: rows }, (_, row) => <tr key={row} aria-hidden='true'>{Array.from({ length: columns }, (_, column) => <td key={column} className='px-5 py-5'><div className='h-[23px] w-20 animate-pulse bg-canvas motion-reduce:animate-none' /></td>)}</tr>)}</>;
}
