'use client';

import { Fragment, useState } from 'react';
import { Eye, Loader2, ChevronDown, ChevronRight, Clock } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { apiClient } from '@/lib/api';

type ImViewLog = {
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
  onRevokeToggle?: (enquiryId: string, revoked: boolean) => void;
}

const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

const FormatLocalTime = ({ dateStr }: { dateStr: string }) => {
  const d = new Date(dateStr);
  const datePart = d.toLocaleDateString('en-US', {
    timeZone: TZ,
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
  const timePart = d.toLocaleTimeString('en-US', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return (
    <div className='flex flex-col'>
      <span>{datePart}</span>
      <span>{timePart}</span>
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
    if (!person.lastViewedAt || new Date(log.createdAt) > new Date(person.lastViewedAt)) {
      person.lastViewedAt = log.createdAt;
    }
  }

  return Array.from(map.values()).sort(
    (a, b) =>
      new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime(),
  );
}

function getExpiryInfo(
  person: GroupedPerson,
  isCurrentlyRevoked: boolean,
): { label: string; color: string } | null {
  if (!person.imSharedAt) return null;

  if (isCurrentlyRevoked && person.autoExpired) {
    return { label: 'Auto-expired', color: 'text-amber-600 bg-amber-50' };
  }
  if (isCurrentlyRevoked) {
    return { label: 'Manually revoked', color: 'text-red-500 bg-red-50' };
  }

  const sharedDate = new Date(person.imSharedAt);
  const expiresAt = new Date(sharedDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  const daysLeft = Math.ceil(
    (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  if (daysLeft <= 0) {
    return { label: 'Auto-expired', color: 'text-amber-600 bg-amber-50' };
  }
  if (daysLeft <= 7) {
    return {
      label: `Expires in ${daysLeft}d`,
      color: 'text-amber-600 bg-amber-50',
    };
  }
  return {
    label: `${daysLeft}d remaining`,
    color: 'text-emerald-600 bg-emerald-50',
  };
}

export function ImHistoryDialog({
  open,
  onOpenChange,
  logs,
  loading,
  token,
  onRevokeToggle,
}: ImHistoryDialogProps) {
  const [expandedPerson, setExpandedPerson] = useState<string | null>(null);
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());
  const [localRevoked, setLocalRevoked] = useState<Record<string, boolean>>({});

  const grouped = groupLogsByPerson(logs);

  const isRevoked = (person: GroupedPerson) => {
    if (person.enquiryId in localRevoked) return localRevoked[person.enquiryId];
    return person.imRevoked;
  };

  const handleToggleAccess = async (person: GroupedPerson) => {
    if (!person.enquiryId) return;

    const currentlyRevoked = isRevoked(person);
    const newRevoked = !currentlyRevoked;

    setTogglingIds((prev) => new Set(prev).add(person.enquiryId));

    try {
      await apiClient.patch(
        `/api/listings/im-revoke/${person.enquiryId}`,
        { revoked: newRevoked },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setLocalRevoked((prev) => ({ ...prev, [person.enquiryId]: newRevoked }));
      onRevokeToggle?.(person.enquiryId, newRevoked);

      toast.success(
        newRevoked
          ? `IM access revoked for ${person.name}`
          : `IM access restored for ${person.name} (30-day access renewed)`,
      );
    } catch (error) {
      console.error('Failed to toggle IM access:', error);
      toast.error('Failed to update access. Please try again.');
    } finally {
      setTogglingIds((prev) => {
        const next = new Set(prev);
        next.delete(person.enquiryId);
        return next;
      });
    }
  };

  const toggleExpand = (enquiryId: string) => {
    setExpandedPerson((prev) => (prev === enquiryId ? null : enquiryId));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='md:max-w-7xl! w-full max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 bg-card'>
        <DialogHeader className='px-6 py-4 border-b border-border flex flex-row items-center justify-between'>
          <DialogTitle className='flex items-center gap-2 text-lg text-secondary'>
            <Eye className='w-5 h-5 text-accent' />
            IM View History
          </DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto p-0'>
          {loading ? (
            <div className='flex items-center justify-center p-12'>
              <Loader2 className='w-8 h-8 animate-spin text-accent' />
            </div>
          ) : grouped.length === 0 ? (
            <div className='flex flex-col items-center justify-center p-12'>
              <Eye className='w-12 h-12 text-border mb-4' />
              <p className='text-muted-foreground font-medium'>
                No IM views recorded yet.
              </p>
            </div>
          ) : (
            <table className='w-full text-sm text-left'>
              <thead className='bg-muted/60 border-b border-border sticky top-0 z-10 text-xs uppercase tracking-wider text-muted-foreground'>
                <tr>
                  <th className='w-8 px-3 py-3'></th>
                  <th className='px-4 py-3 font-semibold'>Deal</th>
                  <th className='px-4 py-3 font-semibold'>Name</th>
                  <th className='px-4 py-3 font-semibold'>Email</th>
                  <th className='px-4 py-3 font-semibold'>Views</th>
                  <th className='px-4 py-3 font-semibold'>Last Viewed</th>
                  <th className='px-4 py-3 font-semibold'>Expiry</th>
                  <th className='px-4 py-3 font-semibold text-center'>Access</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border'>
                {grouped.map((person) => {
                  const revoked = isRevoked(person);
                  const isToggling = togglingIds.has(person.enquiryId);
                  const isExpanded = expandedPerson === person.enquiryId;
                  const expiryInfo = getExpiryInfo(person, revoked);

                  return (
                    <Fragment key={person.enquiryId}>
                      {/* Main person row */}
                      <tr
                        className={`transition-colors cursor-pointer ${
                          revoked
                            ? 'bg-red-50/40 hover:bg-red-50/60'
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() =>
                          person.viewCount > 1 && toggleExpand(person.enquiryId)
                        }
                      >
                        <td className='px-3 py-3 text-muted-foreground/60'>
                          {person.viewCount > 1 &&
                            (isExpanded ? (
                              <ChevronDown className='w-4 h-4' />
                            ) : (
                              <ChevronRight className='w-4 h-4' />
                            ))}
                        </td>
                        <td
                          className={`px-4 py-3 font-medium ${
                            revoked ? 'text-muted-foreground/60' : 'text-secondary'
                          }`}
                        >
                          {person.businessName}
                        </td>
                        <td
                          className={`px-4 py-3 ${
                            revoked ? 'text-muted-foreground/60' : 'text-foreground'
                          }`}
                        >
                          {person.name}
                        </td>
                        <td
                          className={`px-4 py-3 ${
                            revoked ? 'text-muted-foreground/60' : 'text-muted-foreground'
                          }`}
                        >
                          {person.email}
                        </td>
                        <td className='px-4 py-3'>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                              revoked || person.viewCount === 0
                                ? 'bg-muted text-muted-foreground/70'
                                : 'bg-accent/15 text-accent'
                            }`}
                          >
                            {person.viewCount}{' '}
                            {person.viewCount === 1 ? 'view' : 'views'}
                          </span>
                        </td>
                        <td
                          className={`px-4 py-3 ${
                            revoked ? 'text-muted-foreground/60' : 'text-muted-foreground'
                          }`}
                        >
                          {person.lastViewedAt ? (
                            <FormatLocalTime dateStr={person.lastViewedAt} />
                          ) : (
                            <span className='text-muted-foreground/60'>Not viewed yet</span>
                          )}
                        </td>
                        <td className='px-4 py-3'>
                          {expiryInfo ? (
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${expiryInfo.color}`}
                            >
                              <Clock className='w-3 h-3' />
                              {expiryInfo.label}
                            </span>
                          ) : (
                            <span className='text-xs text-muted-foreground/50'>—</span>
                          )}
                        </td>
                        <td
                          className='px-4 py-3'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className='flex items-center justify-center gap-2'>
                            {isToggling ? (
                              <Loader2 className='w-4 h-4 animate-spin text-muted-foreground/60' />
                            ) : (
                              <Switch
                                size='sm'
                                checked={!revoked}
                                onCheckedChange={() =>
                                  handleToggleAccess(person)
                                }
                                disabled={!person.enquiryId || isToggling}
                                className={
                                  revoked
                                    ? 'data-[state=unchecked]:bg-red-300'
                                    : ''
                                }
                              />
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Expanded view logs */}
                      {isExpanded &&
                        person.views.map((view, idx) => (
                          <tr
                            key={`${person.enquiryId}-view-${view._id}`}
                            className='bg-muted/30'
                          >
                            <td className='px-3 py-2'></td>
                            <td
                              colSpan={6}
                              className='px-4 py-2 text-xs text-muted-foreground/60 pl-8 flex items-center gap-2'
                            >
                              <span>View #{person.views.length - idx} — </span>
                              <FormatLocalTime dateStr={view.createdAt} />
                            </td>
                            <td className='px-4 py-2'></td>
                          </tr>
                        ))}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
