'use client';

import { useEffect, useState } from 'react';
import { Loader2, Eye, FileText, StickyNote } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useVendorAuth } from '@/context/vendor-auth-context';
import { Button } from '@/components/ui/button';
import { ImHistoryDialog } from '@/components/admin/im-history-dialog';
import {
  ProspectNotesDialog,
  type ProspectNote,
} from '@/components/admin/prospect-notes-dialog';

const CATEGORY_STYLES: Record<string, string> = {
  Hot: 'bg-red-500 text-white',
  Warm: 'bg-orange-500 text-white',
  Cold: 'bg-blue-500 text-white',
};

type Prospect = {
  _id: string;
  firstName: string;
  lastName: string;
  category: string | null;
};

type ImLog = {
  _id: string;
  name?: string;
  email: string;
  enquiryId?: string;
  imRevoked?: boolean;
  imSharedAt?: string;
  autoExpired?: boolean;
  createdAt: string;
  type?: string;
};

export default function VendorDashboardPage() {
  const { token } = useVendorAuth();

  const [businessName, setBusinessName] = useState('Your Deal');
  const [imTemplateId, setImTemplateId] = useState<string | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [notesMap, setNotesMap] = useState<Record<string, ProspectNote[]>>({});
  const [loading, setLoading] = useState(true);

  // IM history
  const [imOpen, setImOpen] = useState(false);
  const [imLogs, setImLogs] = useState<ImLog[]>([]);
  const [imLoading, setImLoading] = useState(false);

  // Notes (read-only)
  const [notesOpen, setNotesOpen] = useState(false);
  const [activeProspect, setActiveProspect] = useState<Prospect | null>(null);

  useEffect(() => {
    if (!token) return;
    const load = async () => {
      setLoading(true);
      try {
        const [dealRes, prospectsRes, notesRes] = await Promise.all([
          apiClient.get('/api/vendor/deal'),
          apiClient.get('/api/vendor/deal/prospects'),
          apiClient.get('/api/vendor/deal/notes'),
        ]);
        setBusinessName(dealRes.data?.businessName || 'Your Deal');
        setImTemplateId(dealRes.data?.imTemplateId || null);
        setProspects(prospectsRes.data || []);
        setNotesMap(notesRes.data || {});
      } catch (error) {
        console.error('Failed to load vendor deal:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const sortedProspects = [...prospects].sort((a, b) => {
    const priority: Record<string, number> = { Hot: 0, Warm: 1, Cold: 2 };
    const pa = priority[a.category ?? ''] ?? 3;
    const pb = priority[b.category ?? ''] ?? 3;
    return pa - pb;
  });

  const openImHistory = async () => {
    setImOpen(true);
    setImLoading(true);
    try {
      const res = await apiClient.get('/api/vendor/deal/im-views');
      setImLogs(res.data || []);
    } catch (error) {
      console.error('Failed to load IM history:', error);
      setImLogs([]);
    } finally {
      setImLoading(false);
    }
  };

  const openNotes = (p: Prospect) => {
    setActiveProspect(p);
    setNotesOpen(true);
  };

  return (
    <div className='space-y-6 max-w-6xl mx-auto'>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-bold text-secondary'>{businessName}</h1>
          <p className='text-sm text-muted-foreground mt-0.5'>
            Prospects and Information Memorandum activity for your deal
          </p>
        </div>
        <div className='flex flex-wrap gap-3'>
          <Button
            variant='outline'
            onClick={openImHistory}
            className='gap-2 rounded-none text-accent border-accent/30 hover:bg-accent/5 hover:text-accent'
          >
            <Eye className='w-4 h-4' /> View IM History
          </Button>
          {imTemplateId ? (
            <Button
              asChild
              className='gap-2 rounded-none bg-accent text-primary hover:bg-accent-light'
            >
              <a
                href={`/information-memorandum/${imTemplateId}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FileText className='w-4 h-4' /> Information Memorandum
              </a>
            </Button>
          ) : (
            <Button disabled className='gap-2 rounded-none'>
              <FileText className='w-4 h-4' /> Information Memorandum
            </Button>
          )}
        </div>
      </div>

      <div className='overflow-hidden border border-border bg-card'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left'>
            <thead>
              <tr className='bg-muted/60 border-b border-border text-xs uppercase tracking-wider text-muted-foreground'>
                <th className='px-6 py-4 font-semibold'>Name</th>
                <th className='px-6 py-4 font-semibold'>Category</th>
                <th className='px-6 py-4 font-semibold'>Notes</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border'>
              {loading ? (
                <tr>
                  <td colSpan={3} className='text-center py-12'>
                    <Loader2 className='w-6 h-6 animate-spin text-accent mx-auto mb-2' />
                    <p className='text-muted-foreground'>
                      Loading prospects...
                    </p>
                  </td>
                </tr>
              ) : sortedProspects.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className='text-center py-12 text-muted-foreground'
                  >
                    No prospects found for this deal.
                  </td>
                </tr>
              ) : (
                sortedProspects.map((p) => {
                  const noteCount = notesMap[p._id]?.length || 0;
                  return (
                    <tr
                      key={p._id}
                      className='hover:bg-muted/50 transition-colors'
                    >
                      <td className='px-6 py-4 font-medium text-secondary'>
                        {p.firstName} {p.lastName}
                      </td>
                      <td className='px-6 py-4'>
                        {p.category ? (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              CATEGORY_STYLES[p.category] ||
                              'bg-muted text-muted-foreground'
                            }`}
                          >
                            {p.category}
                          </span>
                        ) : (
                          <span className='text-muted-foreground/50 text-xs'>
                            —
                          </span>
                        )}
                      </td>
                      <td className='px-6 py-4'>
                        <button
                          onClick={() => openNotes(p)}
                          className='inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-accent transition-colors'
                        >
                          <StickyNote className='w-4 h-4' />
                          {noteCount > 0
                            ? `${noteCount} note${noteCount > 1 ? 's' : ''}`
                            : 'View'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ImHistoryDialog
        open={imOpen}
        onOpenChange={setImOpen}
        logs={imLogs}
        loading={imLoading}
        token={token || ''}
        hideEmail
        revokePath={(enquiryId) => `/api/vendor/deal/im-revoke/${enquiryId}`}
      />

      <ProspectNotesDialog
        open={notesOpen}
        onOpenChange={setNotesOpen}
        readOnly
        prospectName={
          activeProspect
            ? `${activeProspect.firstName} ${activeProspect.lastName}`.trim()
            : ''
        }
        notes={activeProspect ? notesMap[activeProspect._id] || [] : []}
      />
    </div>
  );
}
