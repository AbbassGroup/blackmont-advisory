'use client';

import { useEffect, useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton } from '@/components/landing/presentation';

interface Enquiry {
  _id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  source?: string;
  createdAt: string;
  formCompleted?: boolean;
}

const enquiryName = (enquiry: Enquiry) => enquiry.name || `${enquiry.firstName || ''} ${enquiry.lastName || ''}`.trim() || 'N/A';

function sourceStyle(source?: string) {
  switch (source) {
    case 'Contact Form': return { label: source, className: 'bg-canvas text-midnight' };
    case 'Franchise Form': return { label: source, className: 'bg-gilt/15 text-midnight' };
    case 'Listing EOI': return { label: source, className: 'bg-emerald-50 text-emerald-800' };
    case 'Confidentiality Agreement': return { label: 'Confidentiality', className: 'bg-red-50 text-red-800' };
    default: return { label: source || 'Valuations Form', className: 'bg-canvas text-ink' };
  }
}

function enquiryDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString('en-AU', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default function AdminEnquiriesPage() {
  const { user } = useAdminAuth();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState<Set<string>>(new Set());
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    if (!user?.token) return;
    let active = true;
    setLoading(true);
    setListError(false);
    apiClient.get('/api/enquiries', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(({ data }) => { if (active) setEnquiries(Array.isArray(data) ? data : []); })
      .catch(() => { if (active) setListError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [user?.token, attempt]);

  const handleToggleCompleted = async (enquiry: Enquiry) => {
    if (!user?.token || updating.has(enquiry._id)) return;
    const completed = !enquiry.formCompleted;
    setActionError('');
    setUpdating((previous) => new Set(previous).add(enquiry._id));
    setEnquiries((previous) => previous.map((item) => item._id === enquiry._id ? { ...item, formCompleted: completed } : item));
    try {
      await apiClient.put(`/api/enquiries/${enquiry._id}`, { formCompleted: completed }, { headers: { Authorization: `Bearer ${user.token}` } });
    } catch {
      setEnquiries((previous) => previous.map((item) => item._id === enquiry._id ? { ...item, formCompleted: enquiry.formCompleted } : item));
      setActionError(`The completion status for ${enquiryName(enquiry)} could not be saved. Please try again.`);
    } finally {
      setUpdating((previous) => { const next = new Set(previous); next.delete(enquiry._id); return next; });
    }
  };

  const query = search.trim().toLowerCase();
  const filtered = enquiries.filter((enquiry) => [enquiryName(enquiry), enquiry.email, enquiry.phone, enquiry.source].some((value) => (value || '').toLowerCase().includes(query)));

  return (
    <AdminPageLayout title='Enquiries' description='Manage all leads and form submissions.'>
      {actionError && <p role='alert' className='m-0 border border-red-200 bg-red-50 px-5 py-4 text-sm leading-[1.75] text-red-800'>{actionError}</p>}
      <section aria-label='Enquiries' aria-busy={loading} className='min-w-0 border border-advisory-rule bg-white'>
        <div className='flex flex-col gap-4 border-b border-advisory-rule p-5 min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:p-6'>
          <div className='relative w-full min-w-0 min-[681px]:max-w-md'>
            <label htmlFor='enquiry-search' className='sr-only'>Search enquiries by name, phone, email or source</label>
            <Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/60' />
            <input id='enquiry-search' type='search' value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Search enquiries…' className='h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white py-2 pr-3 pl-10 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt motion-reduce:transition-none min-[681px]:text-sm' />
          </div>
          <p className='m-0 shrink-0 text-sm leading-[1.6] text-ink' aria-live='polite'>{loading ? 'Loading enquiries…' : listError ? 'List unavailable' : query ? `${filtered.length} of ${enquiries.length} enquiries` : `${enquiries.length} ${enquiries.length === 1 ? 'enquiry' : 'enquiries'}`}</p>
        </div>

        {loading ? (
          <div>
            <p role='status' className='sr-only'>Loading enquiries.</p>
            <div aria-hidden='true' className='min-w-0 overflow-x-auto'>
              <table className='w-full min-w-[1040px] text-left text-sm leading-[1.65]'>
                <EnquiriesHead />
                <tbody className='divide-y divide-advisory-rule'>
                  {[0, 1, 2, 3, 4].map((index) => <tr key={index}>{[0, 1, 2, 3, 4].map((column) => <td key={column} className='px-5 py-5'><div className='h-4 w-24 animate-pulse bg-canvas motion-reduce:animate-none' /></td>)}<td className='px-5 py-3'><div className='mx-auto h-10 w-16 animate-pulse bg-canvas motion-reduce:animate-none' /></td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        ) : listError ? (
          <div role='alert' className='p-6 min-[681px]:p-8'><h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load your enquiries.</h2><p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Please try again to refresh the list.</p><LandingButton variant='outline' size='compact' disabled={updating.size > 0} onClick={() => setAttempt((value) => value + 1)}>Try again</LandingButton></div>
        ) : filtered.length === 0 ? (
          <div className='p-6 min-[681px]:p-8'><h2 className='m-0 text-base font-semibold text-midnight'>{query ? 'No matching enquiries' : 'No enquiries yet'}</h2><p className='mt-2 mb-0 text-sm leading-[1.75] text-ink'>{query ? 'Try another name, phone number, email address or source.' : 'Leads and form submissions will appear here.'}</p>{query && <LandingButton variant='outline' size='compact' className='mt-5' onClick={() => setSearch('')}>Clear search</LandingButton>}</div>
        ) : (
          <div role='region' aria-label='Enquiry table' tabIndex={0} className='min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
            <table className='w-full min-w-[1040px] text-left text-sm leading-[1.65]'>
              <caption className='sr-only'>Enquiry contact details, source, submission date and completion status.</caption>
              <EnquiriesHead />
              <tbody className='divide-y divide-advisory-rule'>
                {filtered.map((enquiry) => {
                  const name = enquiryName(enquiry);
                  const source = sourceStyle(enquiry.source);
                  const busy = updating.has(enquiry._id);
                  return (
                    <tr key={enquiry._id} className='transition-colors duration-150 hover:bg-canvas/50 motion-reduce:transition-none'>
                      <td className='min-w-40 px-5 py-5 align-top font-semibold text-midnight'>{name}</td>
                      <td className='px-5 py-5 align-top whitespace-nowrap text-ink'>{enquiry.phone || '—'}</td>
                      <td className='break-all px-5 py-5 align-top text-ink'>{enquiry.email || '—'}</td>
                      <td className='px-5 py-5 align-top'><span className={cn('inline-flex px-2.5 py-1 text-xs leading-[1.5] font-medium', source.className)}>{source.label}</span></td>
                      <td className='px-5 py-5 align-top whitespace-nowrap text-ink'>{enquiryDate(enquiry.createdAt)}</td>
                      <td className='px-5 py-3 align-top'>
                        <div aria-busy={busy} className='flex min-h-10 items-center justify-center gap-1'>
                          <span aria-hidden='true' className='inline-flex size-4 shrink-0 items-center'>{busy && <Loader2 className='size-4 animate-spin motion-reduce:animate-none' />}</span>
                          <label className='inline-flex size-10 cursor-pointer items-center justify-center' title={enquiry.formCompleted ? 'Mark as incomplete' : 'Mark as completed'}>
                            <input type='checkbox' checked={Boolean(enquiry.formCompleted)} disabled={busy} onChange={() => void handleToggleCompleted(enquiry)} aria-label={`Completed enquiry for ${name}`} className='size-4 cursor-pointer accent-midnight focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt disabled:cursor-wait disabled:opacity-50' />
                          </label>
                          {busy && <span role='status' className='sr-only'>Saving completion status for {name}.</span>}
                        </div>
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

function EnquiriesHead() {
  return <thead className='border-b border-advisory-rule bg-canvas text-midnight'><tr>{['Name', 'Phone', 'Email', 'Source', 'Date', 'Completed'].map((label) => <th key={label} scope='col' className={cn('px-5 py-4 font-semibold', label === 'Completed' && 'text-center')}>{label}</th>)}</tr></thead>;
}
