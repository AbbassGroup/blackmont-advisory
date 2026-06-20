'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Loader2,
  Search,
  Eye,
  Users,
  MousePointerClick,
  CheckCircle2,
  Target,
} from 'lucide-react';

import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import DashboardLayout from '@/components/global/dashboard-layout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

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

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className='bg-card border border-border border-l-2 border-l-accent p-5'>
      <div className='flex items-center gap-2 text-muted-foreground'>
        <Icon className='w-4 h-4 text-accent' />
        <span className='text-xs font-medium uppercase tracking-wide'>
          {label}
        </span>
      </div>
      <p className='mt-2 text-2xl font-bold text-secondary'>{value}</p>
      {hint && <p className='mt-0.5 text-xs text-muted-foreground'>{hint}</p>}
    </div>
  );
}

function leadTypeBadge(type?: string) {
  if (type === 'consultation')
    return (
      <Badge className='rounded-none bg-secondary/10 text-secondary hover:bg-secondary/10'>
        Consultation
      </Badge>
    );
  return (
    <Badge className='rounded-none bg-accent/15 text-accent hover:bg-accent/15'>
      Resource Unlock
    </Badge>
  );
}

export default function ResourceAnalyticsPage() {
  const { user } = useAdminAuth();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSummary = useCallback(async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const res = await apiClient.get('/api/access-analytics/summary', {
        params: { days },
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSummary(res.data);
    } catch (err) {
      console.error('Failed to load access analytics', err);
    } finally {
      setLoading(false);
    }
  }, [user?.token, days]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const filteredLeads = useMemo(() => {
    const leads = summary?.recentLeads ?? [];
    if (!searchTerm) return leads;
    const lower = searchTerm.toLowerCase();
    return leads.filter(
      (l) =>
        l.name?.toLowerCase().includes(lower) ||
        l.email?.toLowerCase().includes(lower) ||
        l.phone?.toLowerCase().includes(lower) ||
        l.resource?.toLowerCase().includes(lower) ||
        l.industry?.toLowerCase().includes(lower),
    );
  }, [summary?.recentLeads, searchTerm]);

  const totals = summary?.totals;

  return (
    <DashboardLayout title='Resource Analytics' description=''>
      <div className='flex flex-wrap items-center gap-2 mb-6'>
        {RANGES.map((r) => (
          <button
            key={r.days}
            onClick={() => setDays(r.days)}
            className={`px-3.5 py-1.5 rounded-none text-sm font-medium border transition-colors ${
              days === r.days
                ? 'bg-accent text-primary border-accent'
                : 'bg-card text-foreground border-border hover:bg-muted'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className='flex items-center justify-center p-24'>
          <Loader2 className='w-8 h-8 animate-spin text-accent' />
        </div>
      ) : (
        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-4 lg:grid-cols-5'>
            <StatCard
              icon={Eye}
              label='Page Views'
              value={totals?.pageViews ?? 0}
            />
            <StatCard
              icon={Users}
              label='Unique Visitors'
              value={totals?.uniqueVisitors ?? 0}
            />
            <StatCard
              icon={MousePointerClick}
              label='Resource Opens'
              value={totals?.cardOpens ?? 0}
            />
            <StatCard
              icon={CheckCircle2}
              label='Tool Completions'
              value={totals?.toolCompletions ?? 0}
            />
            <StatCard
              icon={Target}
              label='Leads'
              value={totals?.leads ?? 0}
              hint={`${totals?.conversionRate ?? 0}% of page views`}
            />
          </div>

          <div className='bg-card border border-border overflow-hidden'>
            <div className='px-5 py-4 border-b border-border'>
              <h2 className='text-sm font-semibold text-secondary'>
                Resource funnel
              </h2>
              <p className='text-xs text-muted-foreground'>
                How each tool moves from open to completion to lead.
              </p>
            </div>
            <Table>
              <TableHeader className='bg-muted/60'>
                <TableRow>
                  <TableHead className='font-semibold'>Resource</TableHead>
                  <TableHead className='font-semibold text-center'>
                    Tool Views
                  </TableHead>
                  <TableHead className='font-semibold text-center'>
                    Opens
                  </TableHead>
                  <TableHead className='font-semibold text-center'>
                    Completions
                  </TableHead>
                  <TableHead className='font-semibold text-center'>
                    Leads
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary?.byResource?.length ? (
                  summary.byResource.map((r) => (
                    <TableRow key={r.resource}>
                      <TableCell className='font-medium'>
                        {r.resource}
                      </TableCell>
                      <TableCell className='text-center'>{r.views}</TableCell>
                      <TableCell className='text-center'>
                        {r.cardOpens}
                      </TableCell>
                      <TableCell className='text-center'>
                        {r.completions}
                      </TableCell>
                      <TableCell className='text-center font-semibold text-accent'>
                        {r.leads}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className='text-center text-muted-foreground/60 py-10'
                    >
                      No activity in this period yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className='bg-card border border-border overflow-hidden'>
            <div className='px-5 py-4 border-b border-border flex flex-wrap items-center justify-between gap-3'>
              <div>
                <h2 className='text-sm font-semibold text-secondary'>
                  Captured leads
                </h2>
                <p className='text-xs text-muted-foreground'>
                  Contacts collected from the resource tools and consultation
                  forms.
                </p>
              </div>
              <div className='relative max-w-xs w-full'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60' />
                <Input
                  placeholder='Search leads...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-9 rounded-none border-secondary/15 bg-background shadow-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/15'
                />
              </div>
            </div>
            <Table>
              <TableHeader className='bg-muted/60'>
                <TableRow>
                  <TableHead className='font-semibold'>Name</TableHead>
                  <TableHead className='font-semibold'>Email</TableHead>
                  <TableHead className='font-semibold'>Phone</TableHead>
                  <TableHead className='font-semibold'>Resource</TableHead>
                  <TableHead className='font-semibold'>Type</TableHead>
                  <TableHead className='font-semibold'>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length ? (
                  filteredLeads.map((l) => (
                    <TableRow key={l._id}>
                      <TableCell className='font-medium'>
                        {l.name || '—'}
                      </TableCell>
                      <TableCell>{l.email || '—'}</TableCell>
                      <TableCell>{l.phone || '—'}</TableCell>
                      <TableCell>{l.resource || '—'}</TableCell>
                      <TableCell>{leadTypeBadge(l.leadType)}</TableCell>
                      <TableCell className='whitespace-nowrap text-muted-foreground'>
                        {new Date(l.createdAt).toLocaleDateString('en-AU', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='text-center text-muted-foreground/60 py-10'
                    >
                      No leads captured in this period yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
