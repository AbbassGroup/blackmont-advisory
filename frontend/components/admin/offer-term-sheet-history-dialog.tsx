'use client';

import { X } from 'lucide-react';
import { STATUS_LABELS, type SheetStatus } from '@/components/offer-term-sheet';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { cn } from '@/lib/utils';

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

interface OfferTermSheetHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  logs: OfferTermSheetViewLog[];
  loading: boolean;
  error?: boolean;
  onRetry?: () => void;
  businessName?: string;
}

const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

function FormatLocalTime({ dateStr }: { dateStr: string }) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return <span>—</span>;

  return (
    <div className='flex flex-col gap-1 whitespace-nowrap'>
      <span>{date.toLocaleDateString('en-AU', {
        timeZone: TZ,
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })}</span>
      <span className='text-xs text-ink'>{date.toLocaleTimeString('en-AU', {
        timeZone: TZ,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })}</span>
    </div>
  );
}

export function OfferTermSheetHistoryDialog({
  open,
  onOpenChange,
  logs,
  loading,
  error = false,
  onRetry,
  businessName,
}: OfferTermSheetHistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          landingFontVariables,
          'flex max-h-[85dvh] min-h-0 w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden rounded-none border border-advisory-rule bg-white p-0 font-advisory-body text-sm text-ink ring-0 sm:max-w-[760px]',
        )}
      >
        <DialogHeader className='shrink-0 border-b border-advisory-rule p-6 pr-16 min-[681px]:p-8 min-[681px]:pr-20'>
          <DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>
            Term sheet view history
          </DialogTitle>
          <DialogDescription className='mt-2 break-words text-sm leading-[1.75] text-ink'>
            {businessName ? `Recorded views for ${businessName}.` : 'Recorded views for this term sheet.'}
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <button type='button' aria-label='Close history' className='absolute top-4 right-4 inline-flex size-10 cursor-pointer items-center justify-center border border-transparent text-midnight transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none'>
            <X aria-hidden='true' className='size-4' />
          </button>
        </DialogClose>

        <div
          role='region'
          aria-label='Term sheet view records'
          aria-busy={loading}
          tabIndex={0}
          className='min-h-0 flex-1 overflow-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'
        >
          {loading ? (
            <div className='px-6 min-[681px]:px-8'>
              <p role='status' className='sr-only'>Loading term sheet views.</p>
              <div aria-hidden='true' className='divide-y divide-advisory-rule'>
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className='flex justify-between gap-6 py-5'>
                    <div className='h-4 w-2/3 animate-pulse bg-canvas motion-reduce:animate-none' />
                    <div className='h-4 w-20 shrink-0 animate-pulse bg-canvas motion-reduce:animate-none' />
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div role='alert' className='p-6 min-[681px]:p-8'>
              <p className='m-0 font-semibold text-midnight'>We couldn&apos;t load the view history.</p>
              <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Please try again to refresh these records.</p>
              {onRetry && <LandingButton variant='outline' size='compact' onClick={onRetry}>Try again</LandingButton>}
            </div>
          ) : logs.length === 0 ? (
            <div className='p-6 min-[681px]:p-8'>
              <p className='m-0 font-semibold text-midnight'>No views recorded yet</p>
              <p className='mt-2 mb-0 text-sm leading-[1.75] text-ink'>Views are recorded once the buyer or vendor opens their link.</p>
            </div>
          ) : (
            <table className='w-full min-w-[700px] text-left text-sm leading-[1.65]'>
              <caption className='sr-only'>Buyer and vendor views of this term sheet.</caption>
              <thead className='sticky top-0 z-10 border-b border-advisory-rule bg-canvas text-midnight'>
                <tr>
                  <th scope='col' className='px-5 py-4 text-center font-semibold'>#</th>
                  <th scope='col' className='px-5 py-4 font-semibold'>Opened by</th>
                  <th scope='col' className='px-5 py-4 font-semibold'>Email</th>
                  <th scope='col' className='px-5 py-4 font-semibold'>Stage</th>
                  <th scope='col' className='px-5 py-4 font-semibold'>Viewed at</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-advisory-rule'>
                {logs.map((log, index) => (
                  <tr key={log._id} className='transition-colors duration-150 hover:bg-canvas/50 motion-reduce:transition-none'>
                    <td className='px-5 py-4 text-center align-top tabular-nums'>{logs.length - index}</td>
                    <td className='px-5 py-4 align-top font-medium text-midnight'><span className='block'>{log.name || (log.role === 'buyer' ? 'Buyer' : 'Vendor')}</span><span className='mt-1 block text-xs font-normal capitalize text-ink'>{log.role}</span></td>
                    <td className='break-all px-5 py-4 align-top'>{log.email || '—'}</td>
                    <td className='px-5 py-4 align-top'>{STATUS_LABELS[log.status as SheetStatus] ?? '—'}</td>
                    <td className='px-5 py-4 align-top'><FormatLocalTime dateStr={log.createdAt} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {!loading && !error && logs.length > 0 && (
          <p className='m-0 shrink-0 border-t border-advisory-rule px-6 py-4 text-xs leading-[1.75] text-ink min-[681px]:px-8'>
            Times shown in {TZ.replaceAll('_', ' ')}.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
