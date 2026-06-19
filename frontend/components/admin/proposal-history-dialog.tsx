'use client';

import { Eye, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export type ProposalViewLog = {
  _id: string;
  proposalId: string;
  customerEmail: string;
  customerName?: string;
  businessName?: string;
  ip?: string;
  userAgent?: string;
  createdAt: string;
};

interface ProposalHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  logs: ProposalViewLog[];
  loading: boolean;
  businessName?: string;
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
      <span className='text-xs text-muted-foreground/70'>{timePart}</span>
    </div>
  );
};

export function ProposalHistoryDialog({
  open,
  onOpenChange,
  logs,
  loading,
  businessName,
}: ProposalHistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='md:max-w-3xl! w-full max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 bg-card'>
        <DialogHeader className='px-6 py-4 border-b border-border'>
          <DialogTitle className='flex items-center gap-2 text-lg text-secondary'>
            <Eye className='w-5 h-5 text-accent' />
            Proposal View History
            {businessName && (
              <span className='ml-1 text-sm font-normal text-muted-foreground'>
                — {businessName}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto p-0'>
          {loading ? (
            <div className='flex items-center justify-center p-12'>
              <Loader2 className='w-8 h-8 animate-spin text-accent' />
            </div>
          ) : logs.length === 0 ? (
            <div className='flex flex-col items-center justify-center p-12'>
              <Eye className='mb-4 h-12 w-12 text-border' />
              <p className='font-medium text-muted-foreground'>
                No views recorded yet for this proposal.
              </p>
            </div>
          ) : (
            <table className='w-full text-sm text-left'>
              <thead className='sticky top-0 z-10 border-b border-border bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground'>
                <tr>
                  <th className='w-12 px-5 py-3 text-center font-semibold'>#</th>
                  <th className='px-4 py-3 font-semibold'>Customer Name</th>
                  <th className='px-4 py-3 font-semibold'>Email</th>
                  <th className='px-4 py-3 font-semibold'>Viewed At</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border'>
                {logs.map((log, idx) => (
                  <tr
                    key={log._id}
                    className='transition-colors hover:bg-muted/50'
                  >
                    <td className='px-5 py-3.5 text-center text-xs font-medium text-muted-foreground/70'>
                      {logs.length - idx}
                    </td>
                    <td className='px-4 py-3.5 font-medium text-secondary'>
                      {log.customerName || '—'}
                    </td>
                    <td className='px-4 py-3.5 text-foreground'>
                      {log.customerEmail || '—'}
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
