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
      <span className='text-xs text-gray-400'>{timePart}</span>
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
      <DialogContent className='md:max-w-3xl! w-full max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 bg-white'>
        <DialogHeader className='px-6 py-4 border-b border-gray-100'>
          <DialogTitle className='flex items-center gap-2 text-lg text-brand-black'>
            <Eye className='w-5 h-5 text-brand-primary' />
            Proposal View History
            {businessName && (
              <span className='text-sm font-normal text-gray-400 ml-1'>
                — {businessName}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto p-0'>
          {loading ? (
            <div className='flex items-center justify-center p-12'>
              <Loader2 className='w-8 h-8 animate-spin text-brand-primary' />
            </div>
          ) : logs.length === 0 ? (
            <div className='flex flex-col items-center justify-center p-12'>
              <Eye className='w-12 h-12 text-gray-200 mb-4' />
              <p className='text-gray-500 font-medium'>
                No views recorded yet for this proposal.
              </p>
            </div>
          ) : (
            <table className='w-full text-sm text-left'>
              <thead className='bg-gray-50/80 border-b border-gray-100 sticky top-0 z-10'>
                <tr>
                  <th className='px-5 py-3 font-semibold text-gray-600 w-12 text-center'>
                    #
                  </th>
                  <th className='px-4 py-3 font-semibold text-gray-600'>
                    Customer Name
                  </th>
                  <th className='px-4 py-3 font-semibold text-gray-600'>
                    Email
                  </th>
                  <th className='px-4 py-3 font-semibold text-gray-600'>
                    Viewed At
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {logs.map((log, idx) => (
                  <tr
                    key={log._id}
                    className='hover:bg-gray-50/60 transition-colors'
                  >
                    <td className='px-5 py-3.5 text-center text-gray-400 text-xs font-medium'>
                      {logs.length - idx}
                    </td>
                    <td className='px-4 py-3.5 font-medium text-brand-black'>
                      {log.customerName || '—'}
                    </td>
                    <td className='px-4 py-3.5 text-gray-600'>
                      {log.customerEmail || '—'}
                    </td>
                    <td className='px-4 py-3.5 text-gray-500'>
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
