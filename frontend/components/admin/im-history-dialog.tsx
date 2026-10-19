'use client';

import { Fragment, useEffect, useId, useState } from 'react';
import { Loader2, ChevronDown, ChevronRight, X } from 'lucide-react';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { apiClient } from '@/lib/api';

export type ImViewLog = {
  _id: string;
  name?: string;
  email: string;
  enquiryId?: string;
  listingId?: string;
  imRevoked?: boolean;
  imSharedAt?: string;
  autoExpired?: boolean;
  createdAt: string;
  businessName?: string;
  /** 'grant' = access granted (not a view); 'view'/undefined = an actual open. */
  type?: string;
};

type GroupedPerson = {
  key: string;
  enquiryId: string;
  name: string;
  email: string;
  businessName: string;
  imRevoked: boolean;
  imSharedAt: string | null;
  autoExpired: boolean;
  viewCount: number;
  lastViewedAt: string | null; // null until they actually view
  lastActivityAt: string; // last of any log (grant or view), for ordering
  views: ImViewLog[];
};

interface ImHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  logs: ImViewLog[];
  loading: boolean;
  token: string;
  error?: boolean;
  onRetry?: () => void;
  businessName?: string;
  onRevokeToggle?: (enquiryId: string, revoked: boolean) => void;
  /** Hide the Email column (vendors must not see prospect PII). */
  hideEmail?: boolean;
  /**
   * Builds the revoke endpoint for an enquiry. Defaults to the broker endpoint;
   * the vendor portal passes its own scoped path.
   */
  revokePath?: (enquiryId: string) => string;
}

const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

const FormatLocalTime = ({ dateStr }: { dateStr: string }) => {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return <span>—</span>;
  const datePart = d.toLocaleDateString('en-AU', {
    timeZone: TZ,
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
  const timePart = d.toLocaleTimeString('en-AU', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return (
    <div className='flex flex-col gap-1 whitespace-nowrap'>
      <span>{datePart}</span>
      <span className='text-xs text-ink'>{timePart}</span>
    </div>
  );
};

function groupLogsByPerson(logs: ImViewLog[]): GroupedPerson[] {
  const map = new Map<string, GroupedPerson>();

  for (const log of logs) {
    const key = log.enquiryId || log.email;
    if (!key) continue;

    if (!map.has(key)) {
      map.set(key, {
        key,
        enquiryId: log.enquiryId || '',
        name: log.name || '—',
        email: log.email,
        businessName: log.businessName || '—',
        imRevoked: log.imRevoked || false,
        imSharedAt: log.imSharedAt || null,
        autoExpired: log.autoExpired || false,
        viewCount: 0,
        lastViewedAt: null,
        lastActivityAt: log.createdAt,
        views: [],
      });
    }

    const person = map.get(key)!;

    // Track latest activity (grant or view) so just-approved people sort to top.
    if (new Date(log.createdAt) > new Date(person.lastActivityAt)) {
      person.lastActivityAt = log.createdAt;
    }

    // Access grants establish the row but are not views.
    if (log.type === 'grant') continue;

    person.viewCount += 1;
    person.views.push(log);
    if (
      !person.lastViewedAt ||
      new Date(log.createdAt) > new Date(person.lastViewedAt)
    ) {
      person.lastViewedAt = log.createdAt;
    }
  }

  return Array.from(map.values()).sort(
    (a, b) =>
      new Date(b.lastActivityAt).getTime() -
      new Date(a.lastActivityAt).getTime(),
  );
}

function getExpiryInfo(
  person: GroupedPerson,
  isCurrentlyRevoked: boolean,
): { label: string; color: string } | null {
  if (!person.imSharedAt) return null;

  if (isCurrentlyRevoked && person.autoExpired) {
    return { label: 'Auto-expired', color: 'text-amber-900 bg-amber-50' };
  }
  if (isCurrentlyRevoked) {
    return { label: 'Manually revoked', color: 'text-red-800 bg-red-50' };
  }

  const sharedDate = new Date(person.imSharedAt);
  const expiresAt = new Date(sharedDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  const daysLeft = Math.ceil(
    (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  if (daysLeft <= 0) {
    return { label: 'Auto-expired', color: 'text-amber-900 bg-amber-50' };
  }
  if (daysLeft <= 7) {
    return {
      label: `Expires in ${daysLeft}d`,
      color: 'text-amber-900 bg-amber-50',
    };
  }
  return {
    label: `${daysLeft}d remaining`,
    color: 'text-emerald-800 bg-emerald-50',
  };
}

export function ImHistoryDialog({
  open,
  onOpenChange,
  logs,
  loading,
  token,
  error = false,
  onRetry,
  businessName,
  onRevokeToggle,
  hideEmail = false,
  revokePath = (enquiryId: string) => `/api/listings/im-revoke/${enquiryId}`,
}: ImHistoryDialogProps) {
  const prefix = useId();
  const [expandedPerson, setExpandedPerson] = useState<string | null>(null);
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());
  const [localRevoked, setLocalRevoked] = useState<Record<string, boolean>>({});
  const [accessError, setAccessError] = useState('');

  useEffect(() => {
    setLocalRevoked({});
    setExpandedPerson(null);
    setAccessError('');
  }, [logs]);

  const grouped = groupLogsByPerson(logs);
  const columnCount = hideEmail ? 7 : 8;
  const isRevoked = (person: GroupedPerson) => person.enquiryId in localRevoked ? localRevoked[person.enquiryId] : person.imRevoked;

  const handleToggleAccess = async (person: GroupedPerson) => {
    if (!person.enquiryId || !token || togglingIds.has(person.enquiryId)) return;
    const newRevoked = !isRevoked(person);
    setAccessError('');
    setTogglingIds((previous) => new Set(previous).add(person.enquiryId));
    try {
      await apiClient.patch(
        revokePath(person.enquiryId),
        { revoked: newRevoked },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setLocalRevoked((previous) => ({ ...previous, [person.enquiryId]: newRevoked }));
      onRevokeToggle?.(person.enquiryId, newRevoked);
      toast.success(newRevoked ? `IM access revoked for ${person.name}` : `IM access restored for ${person.name} (30-day access renewed)`);
    } catch {
      setAccessError('Failed to update access. Please try again.');
      toast.error('Failed to update access. Please try again.');
    } finally {
      setTogglingIds((previous) => { const next = new Set(previous); next.delete(person.enquiryId); return next; });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(landingFontVariables, 'flex max-h-[85dvh] min-h-0 w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden rounded-none border border-advisory-rule bg-white p-0 font-advisory-body text-sm text-ink ring-0 sm:max-w-[calc(100%-3rem)] xl:max-w-[1200px]')}
      >
        <DialogHeader className='shrink-0 border-b border-advisory-rule p-6 pr-16 min-[681px]:p-8 min-[681px]:pr-20'>
          <DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>IM view history</DialogTitle>
          <DialogDescription className='mt-2 break-words text-sm leading-[1.75] text-ink'>
            {businessName ? `Views and access for ${businessName}.` : 'Review prospect views and manage Information Memorandum access.'}
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <button type='button' aria-label='Close IM history' className='absolute top-4 right-4 inline-flex size-10 cursor-pointer items-center justify-center border border-transparent text-midnight transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none'><X aria-hidden='true' className='size-4' /></button>
        </DialogClose>
        {accessError && <p role='alert' className='m-0 shrink-0 border-b border-advisory-rule bg-red-50 px-6 py-3 text-sm leading-[1.75] text-red-800 min-[681px]:px-8'>{accessError}</p>}

        <div role='region' aria-label='IM views and access records' aria-busy={loading} tabIndex={0} className='min-h-0 flex-1 overflow-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
          {loading ? (
            <div className='px-6 min-[681px]:px-8'>
              <p role='status' className='sr-only'>Loading IM view history.</p>
              <div aria-hidden='true' className='divide-y divide-advisory-rule'>{Array.from({ length: 4 }, (_, index) => <div key={index} className='flex items-center justify-between gap-6 py-6'><div className='h-4 w-1/3 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-4 w-1/4 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-6 w-16 shrink-0 animate-pulse bg-canvas motion-reduce:animate-none' /></div>)}</div>
            </div>
          ) : error ? (
            <div role='alert' className='p-6 min-[681px]:p-8'>
              <p className='m-0 font-semibold text-midnight'>We couldn&apos;t load the IM history.</p>
              <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Please try again to refresh these records.</p>
              {onRetry && <LandingButton variant='outline' size='compact' onClick={onRetry}>Try again</LandingButton>}
            </div>
          ) : grouped.length === 0 ? (
            <div className='p-6 min-[681px]:p-8'>
              <p className='m-0 font-semibold text-midnight'>No IM activity recorded yet</p>
              <p className='mt-2 mb-0 text-sm leading-[1.75] text-ink'>Prospects will appear here when IM access is granted or they open their memorandum.</p>
            </div>
          ) : (
            <table className={cn('w-full text-left text-sm leading-[1.65]', hideEmail ? 'min-w-[900px]' : 'min-w-[1060px]')}>
              <caption className='sr-only'>Prospects, memorandum views, access expiry and access controls.</caption>
              <thead className='sticky top-0 z-10 border-b border-advisory-rule bg-canvas text-midnight'>
                <tr>
                  <th scope='col' className='w-14 px-2 py-4'><span className='sr-only'>View details</span></th>
                  <th scope='col' className='px-4 py-4 font-semibold'>Deal</th>
                  <th scope='col' className='px-4 py-4 font-semibold'>Name</th>
                  {!hideEmail && <th scope='col' className='px-4 py-4 font-semibold'>Email</th>}
                  <th scope='col' className='px-4 py-4 font-semibold'>Views</th>
                  <th scope='col' className='px-4 py-4 font-semibold'>Last viewed</th>
                  <th scope='col' className='px-4 py-4 font-semibold'>Expiry</th>
                  <th scope='col' className='px-4 py-4 text-center font-semibold'>Access</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-advisory-rule'>
                {grouped.map((person, index) => {
                  const revoked = isRevoked(person);
                  const toggling = togglingIds.has(person.enquiryId);
                  const expanded = expandedPerson === person.key;
                  const expiry = getExpiryInfo(person, revoked);
                  const detailId = `${prefix}-views-${index}`;
                  return (
                    <Fragment key={person.key}>
                      <tr className={cn('transition-colors duration-150 motion-reduce:transition-none', revoked ? 'bg-red-50/40 hover:bg-red-50/60' : 'hover:bg-canvas/50')}>
                        <td className='px-2 py-3 align-top'>
                          {person.viewCount > 1 && <button type='button' aria-expanded={expanded} aria-controls={expanded ? detailId : undefined} aria-label={`${expanded ? 'Hide' : 'Show'} individual views for ${person.name}`} onClick={() => setExpandedPerson(expanded ? null : person.key)} className='inline-flex size-10 cursor-pointer items-center justify-center text-ink hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt'>{expanded ? <ChevronDown aria-hidden='true' className='size-4' /> : <ChevronRight aria-hidden='true' className='size-4' />}</button>}
                        </td>
                        <td className='min-w-40 px-4 py-5 align-top font-medium text-midnight'>{person.businessName}</td>
                        <td className='min-w-32 px-4 py-5 align-top text-midnight'>{person.name}</td>
                        {!hideEmail && <td className='break-all px-4 py-5 align-top'>{person.email}</td>}
                        <td className='px-4 py-5 align-top whitespace-nowrap tabular-nums'>{person.viewCount} {person.viewCount === 1 ? 'view' : 'views'}</td>
                        <td className='px-4 py-5 align-top'>{person.lastViewedAt ? <FormatLocalTime dateStr={person.lastViewedAt} /> : <span className='whitespace-nowrap'>Not viewed yet</span>}</td>
                        <td className='px-4 py-5 align-top'>{expiry ? <span className={cn('inline-flex whitespace-nowrap px-2.5 py-1 text-xs leading-[1.5] font-medium', expiry.color)}>{expiry.label}</span> : '—'}</td>
                        <td className='px-4 py-3 align-top'>
                          <div className='flex min-h-10 items-center justify-center gap-2'>
                            <span aria-hidden='true' className='inline-flex size-4 shrink-0 items-center'>{toggling && <Loader2 className='size-4 animate-spin motion-reduce:animate-none' />}</span>
                            <Switch checked={!revoked} onCheckedChange={() => void handleToggleAccess(person)} disabled={!person.enquiryId || !token || toggling} aria-label={`IM access for ${person.name}`} className='shadow-none focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt' />
                          </div>
                        </td>
                      </tr>
                      {expanded && <tr className='bg-canvas/60'><td colSpan={columnCount} className='px-6 py-4 min-[681px]:px-8'><div id={detailId}><p className='mt-0 mb-3 text-xs font-semibold text-midnight'>Individual views for {person.name}</p><ol className='m-0 flex list-none flex-col gap-3 p-0'>{person.views.map((view, viewIndex) => <li key={view._id} className='flex flex-wrap items-start gap-x-5 gap-y-1 text-xs leading-[1.75] text-ink'><span className='min-w-16'>View {person.views.length - viewIndex}</span><FormatLocalTime dateStr={view.createdAt} /></li>)}</ol></div></td></tr>}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {!loading && !error && grouped.length > 0 && <p className='m-0 shrink-0 border-t border-advisory-rule px-6 py-4 text-xs leading-[1.75] text-ink min-[681px]:px-8'>Times shown in {TZ.replaceAll('_', ' ')}. Expand a row to see individual views.</p>}
      </DialogContent>
    </Dialog>
  );
}
