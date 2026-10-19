'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, Loader2, Search } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton } from '@/components/landing/presentation';

interface ConfidentialityPDF {
  filename: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  businessTitle?: string;
  createdAt?: string;
  size?: number;
  hasEnquiryData?: boolean;
}

const agreementName = (pdf: ConfidentialityPDF) => `${pdf.firstName || ''} ${pdf.lastName || ''}`.trim() || 'Unknown';

function agreementDate(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: '2-digit' });
}

export default function AdminConfidentialityPage() {
  const { user } = useAdminAuth();
  const [pdfs, setPdfs] = useState<ConfidentialityPDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState('');
  const [downloading, setDownloading] = useState<Set<string>>(new Set());
  const [downloadError, setDownloadError] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('');

  useEffect(() => {
    if (!user?.token) return;
    let active = true;
    setLoading(true);
    setLoadError(false);
    apiClient.get<ConfidentialityPDF[]>('/api/confidentiality/list', {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(({ data }) => { if (active) setPdfs(Array.isArray(data) ? data : []); })
      .catch(() => { if (active) setLoadError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [user?.token, attempt]);

  const handleDownload = async (pdf: ConfidentialityPDF) => {
    if (!user?.token || downloading.has(pdf.filename)) return;
    setDownloadError('');
    setDownloadStatus('');
    setDownloading((previous) => new Set(previous).add(pdf.filename));
    try {
      const { data } = await apiClient.get<Blob>(`/api/confidentiality/download/${encodeURIComponent(pdf.filename)}`, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = pdf.filename || 'Confidentiality_Agreement.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setDownloadStatus(`Download started for ${pdf.filename}.`);
    } catch {
      setDownloadError(`We couldn't download ${pdf.filename}. Please try the Download button again.`);
    } finally {
      setDownloading((previous) => { const next = new Set(previous); next.delete(pdf.filename); return next; });
    }
  };

  const query = search.trim().toLowerCase();
  const filteredPdfs = useMemo(() => pdfs.filter((pdf) =>
    [pdf.filename, agreementName(pdf), pdf.email, pdf.phone, pdf.businessTitle].some((value) => (value || '').toLowerCase().includes(query)),
  ), [pdfs, query]);

  return (
    <AdminPageLayout title='Confidentiality Agreements' description='Manage and download signed NDAs and compliance agreements.'>
      {downloadError && <p role='alert' className='m-0 border border-red-200 bg-red-50 px-5 py-4 text-sm leading-[1.75] text-red-800'>{downloadError}</p>}
      <span role='status' className='sr-only'>{downloadStatus}</span>
      <section aria-label='Signed confidentiality agreements' aria-busy={loading} className='min-w-0 border border-advisory-rule bg-white'>
        <div className='flex flex-col gap-4 border-b border-advisory-rule p-5 min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:p-6'>
          <div className='relative w-full min-w-0 min-[681px]:max-w-md'>
            <label htmlFor='agreement-search' className='sr-only'>Search agreements by name, file, email, phone or business</label>
            <Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/60' />
            <input id='agreement-search' type='search' value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Search agreements…' className='h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white py-2 pr-3 pl-10 text-base text-midnight outline-none placeholder:text-ink/65 focus:border-gilt min-[681px]:text-sm' />
          </div>
          <p aria-live='polite' className='m-0 shrink-0 text-sm leading-[1.6] text-ink'>{loading ? 'Loading agreements…' : loadError ? 'List unavailable' : query ? `${filteredPdfs.length} of ${pdfs.length} agreements` : `${pdfs.length} ${pdfs.length === 1 ? 'agreement' : 'agreements'}`}</p>
        </div>

        {loadError && !loading ? (
          <div role='alert' className='p-6 min-[681px]:p-8'>
            <h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load your agreements.</h2>
            <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Please try again to refresh the list.</p>
            <LandingButton variant='outline' size='compact' onClick={() => setAttempt((value) => value + 1)}>Try again</LandingButton>
          </div>
        ) : !loading && filteredPdfs.length === 0 ? (
          <div className='p-6 min-[681px]:p-8'>
            <h2 className='m-0 text-base font-semibold text-midnight'>{query ? 'No matching agreements' : 'No signed agreements yet'}</h2>
            <p className='mt-2 mb-0 text-sm leading-[1.75] text-ink'>{query ? 'Try another name, filename, email address, phone number or business.' : 'Signed confidentiality agreements will appear here, ready to download.'}</p>
            {query && <LandingButton variant='outline' size='compact' className='mt-5' onClick={() => setSearch('')}>Clear search</LandingButton>}
          </div>
        ) : (
          <div role='region' aria-label='Confidentiality agreements table' tabIndex={0} className='min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
            <table className='w-full min-w-[1180px] text-left text-sm leading-[1.65]'>
              <caption className='sr-only'>Signed agreement contact information, business, filename, creation date, file size and download action.</caption>
              <AgreementsHead />
              <tbody className='divide-y divide-advisory-rule'>
                {loading ? [0, 1, 2, 3, 4].map((row) => <tr key={row} aria-hidden='true'>
                  <td className='px-5 py-4'><div className='h-4 w-32 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='mt-2 h-4 w-44 animate-pulse bg-canvas motion-reduce:animate-none' /></td>
                  {[0, 1, 2, 3, 4].map((column) => <td key={column} className='px-5 py-4'><div className='h-4 w-20 animate-pulse bg-canvas motion-reduce:animate-none' /></td>)}
                  <td className='px-5 py-4'><div className='ml-auto h-10 w-32 animate-pulse bg-canvas motion-reduce:animate-none' /></td>
                </tr>) : filteredPdfs.map((pdf) => {
                  const name = agreementName(pdf);
                  const busy = downloading.has(pdf.filename);
                  return (
                    <tr key={pdf.filename} className='hover:bg-canvas/50'>
                      <td className='w-64 px-5 py-4 align-top'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <span className='font-semibold text-midnight'>{name}</span>
                          {!pdf.hasEnquiryData && <span className='bg-canvas px-2 py-0.5 text-xs font-medium text-ink'>Legacy</span>}
                        </div>
                        <p className='mt-1 mb-0 break-all text-xs leading-[1.7] text-ink'>{pdf.filename}</p>
                      </td>
                      <td className='break-all px-5 py-4 align-top text-ink'>{pdf.email || '—'}</td>
                      <td className='px-5 py-4 align-top whitespace-nowrap text-ink'>{pdf.phone || '—'}</td>
                      <td className='min-w-36 px-5 py-4 align-top text-ink'>{pdf.businessTitle || '—'}</td>
                      <td className='px-5 py-4 align-top whitespace-nowrap text-ink'>{agreementDate(pdf.createdAt)}</td>
                      <td className='px-5 py-4 align-top whitespace-nowrap tabular-nums text-ink'>{typeof pdf.size === 'number' ? `${(pdf.size / 1024).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} KB` : '—'}</td>
                      <td className='px-5 py-4 align-top text-right'>
                        <LandingButton size='compact' variant='outline' disabled={busy} aria-label={`Download ${pdf.filename}`} className={cn('min-w-32 whitespace-nowrap', busy && 'cursor-wait')} onClick={() => void handleDownload(pdf)}>
                          {busy ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <Download aria-hidden='true' className='size-4' />}
                          {busy ? 'Downloading…' : 'Download'}
                        </LandingButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminPageLayout>
  );
}

function AgreementsHead() {
  return <thead className='border-b border-advisory-rule bg-canvas text-midnight'><tr>{['Name & file', 'Email', 'Phone', 'Business', 'Created', 'Size', 'Action'].map((column) => <th key={column} scope='col' className={cn('px-5 py-4 font-semibold', column === 'Action' && 'text-right')}>{column}</th>)}</tr></thead>;
}
