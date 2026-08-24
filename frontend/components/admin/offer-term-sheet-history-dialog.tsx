'use client';

import { Eye, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { STATUS_LABELS, type SheetStatus } from '@/components/offer-term-sheet';

export type OfferTermSheetViewLog = {
  _id: string;
  sheetId: string;
  role: 'buyer' | 'vendor';
  name?: string;
  email?: string;
  status?: string;
  ip?: string;
  userAgent?: string;
  createdAt: string;
};

const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

const FormatLocalTime = ({ dateStr }: { dateStr: string }) => {
  const d = new Date(dateStr);
  return (
    <div className='flex flex-col'>
      <span>
        {d.toLocaleDateString('en-AU', {
          timeZone: TZ,
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })}
      </span>
      <span className='text-xs text-muted-foreground/70'>
        {d.toLocaleTimeString('en-AU', {
          timeZone: TZ,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })}
      </span>
    </div>
  );
};

export function OfferTermSheetHistoryDialog({
  open,
  onOpenChange,
  logs,
  loading,
  businessName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  logs: OfferTermSheetViewLog[];
  loading: boolean;
  businessName?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='md:max-w-3xl! flex max-h-[85vh] w-full flex-col gap-0 overflow-hidden bg-card p-0'>
        <DialogHeader className='border-b border-border px-6 py-4'>
          <DialogTitle className='flex items-center gap-2 text-lg text-foreground'>
            <Eye className='h-5 w-5 text-accent' />
            View History
            {businessName && (
              <span className='ml-1 text-sm font-normal text-muted-foreground/70'>
                {businessName}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto'>
          {loading ? (
            <div className='flex items-center justify-center p-12'>
              <Loader2 className='h-8 w-8 animate-spin text-accent' />
            </div>
          ) : logs.length === 0 ? (
            <div className='flex flex-col items-center justify-center p-12'>
              <Eye className='mb-4 h-12 w-12 text-border' />
              <p className='font-medium text-muted-foreground'>
                Nobody has opened this letter yet.
              </p>
              <p className='mt-1 text-sm text-muted-foreground/70'>
                Views are recorded once the buyer or vendor is sent their link.
              </p>
            </div>
          ) : (
            <table className='w-full text-left text-sm'>
              <thead className='sticky top-0 z-10 border-b border-border bg-muted/80'>
                <tr>
                  <th className='w-12 px-5 py-3 text-center font-semibold text-muted-foreground'>
                    #
                  </th>
                  <th className='px-4 py-3 font-semibold text-muted-foreground'>
                    Opened by
                  </th>
                  <th className='px-4 py-3 font-semibold text-muted-foreground'>
                    Email
                  </th>
                  <th className='hidden px-4 py-3 font-semibold text-muted-foreground md:table-cell'>
                    Stage
                  </th>
                  <th className='px-4 py-3 font-semibold text-muted-foreground'>
                    Viewed at
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border'>
                {logs.map((log, idx) => (
                  <tr key={log._id} className='transition-colors hover:bg-muted/60'>
                    <td className='px-5 py-3.5 text-center text-xs font-medium text-muted-foreground/70'>
                      {logs.length - idx}
                    </td>
                    <td className='px-4 py-3.5'>
                      <p className='font-medium text-foreground'>
                        {log.name || (log.role === 'buyer' ? 'Buyer' : 'Vendor')}
                      </p>
                      <span className='text-xs capitalize text-muted-foreground/70'>
                        {log.role}
                      </span>
                    </td>
                    <td className='px-4 py-3.5 text-muted-foreground'>
                      {log.email || '-'}
                    </td>
                    <td className='hidden px-4 py-3.5 text-muted-foreground md:table-cell'>
                      {STATUS_LABELS[log.status as SheetStatus] ?? '-'}
                    </td>
                    <td className='px-4 py-3.5 text-muted-foreground'>
                      <FormatLocalTime dateStr={log.createdAt} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
