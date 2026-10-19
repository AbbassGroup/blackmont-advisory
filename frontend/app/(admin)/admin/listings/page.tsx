'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Edit, Loader2, Trash2, Plus, Copy, Check, Search } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { cn, formatReferenceId } from '@/lib/utils';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Listing = {
  _id: string;
  title: string;
  location: string;
  price: string | number;
  referenceId: string;
  deal?: string;
  businessName?: string;
};

const ROW_ACTION_CLASS = 'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center border border-transparent text-ink transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none';
const listingName = (listing: Listing) => listing.businessName || listing.title || 'Untitled business';

export default function ListingsPage() {
  const { user } = useAdminAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyError, setCopyError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Listing | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

  useEffect(() => {
    if (!user?.token) return;
    let active = true;
    setLoading(true);
    setListError(false);
    apiClient.get('/api/listings?featuredOnly=false', {
      headers: { Authorization: `Bearer ${user.token}` },
    }).then(({ data }) => {
      if (active) setListings(Array.isArray(data) ? data : []);
    }).catch(() => {
      if (active) setListError(true);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [user?.token, attempt]);

  const handleCopyUrl = async (id: string) => {
    setCopyError('');
    try {
      await navigator.clipboard.writeText(`https://blackmontadvisory.com/listings/${id}`);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      setCopiedId(id);
      copyTimer.current = setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopyError('The listing URL could not be copied. Please try again.');
    }
  };

  const closeDelete = () => {
    if (deleting) return;
    setDeleteTarget(null);
    setDeleteError('');
  };

  const handleDelete = async () => {
    if (!user?.token || !deleteTarget || deleting) return;
    const id = deleteTarget._id;
    setDeleting(true);
    setDeleteError('');
    try {
      await apiClient.delete(`/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setListings((previous) => previous.filter((listing) => listing._id !== id));
      setDeleteTarget(null);
    } catch {
      setDeleteError('The listing could not be deleted. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const query = search.trim().toLowerCase();
  const visibleListings = listings.filter((listing) => [
    listing.businessName, listing.title, listing.location,
    listing.referenceId, formatReferenceId(listing.referenceId),
  ].some((value) => (value || '').toLowerCase().includes(query)));

  return (
    <AdminPageLayout
      title='Manage listings'
      description='View, edit and manage your business listings.'
      action={<LandingButtonLink href='/admin/listings/new' size='compact'><Plus aria-hidden='true' className='size-4' /> Add listing</LandingButtonLink>}
    >
      {copyError && <p role='alert' className='m-0 border border-red-200 bg-red-50 px-5 py-4 text-sm leading-[1.75] text-red-800'>{copyError}</p>}
      <p role='status' aria-live='polite' className='sr-only'>{copiedId ? 'Public listing URL copied.' : ''}</p>

      <section aria-label='Business listings' aria-busy={loading} className='min-w-0 border border-advisory-rule bg-white'>
        <div className='flex flex-col gap-4 border-b border-advisory-rule p-5 min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:p-6'>
          <div className='relative w-full min-w-0 min-[681px]:max-w-md'>
            <label htmlFor='listing-search' className='sr-only'>Search listings by name, location or reference</label>
            <Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/60' />
            <input
              id='listing-search'
              type='search'
              placeholder='Search by name, location or reference…'
              value={search}
              disabled={deleting}
              onChange={(event) => setSearch(event.target.value)}
              className='h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white py-2 pr-3 pl-10 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none min-[681px]:text-sm'
            />
          </div>
          <p className='m-0 shrink-0 text-sm leading-[1.6] text-ink' aria-live='polite'>
            {loading ? 'Loading listings…' : listError ? 'List unavailable' : query ? `${visibleListings.length} of ${listings.length} listings` : `${listings.length} ${listings.length === 1 ? 'listing' : 'listings'}`}
          </p>
        </div>

        {loading ? (
          <div>
            <p role='status' className='sr-only'>Loading listings.</p>
            <div aria-hidden='true' className='min-w-0 overflow-x-auto'>
              <table className='w-full min-w-[880px] text-left text-sm leading-[1.65]'>
                <ListingTableHead />
                <tbody className='divide-y divide-advisory-rule'>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <tr key={index}>
                      <td className='px-5 py-5'><div className='h-4 w-20 animate-pulse bg-canvas motion-reduce:animate-none' /></td>
                      <td className='w-[34%] min-w-56 px-5 py-5'><div className='h-4 w-4/5 animate-pulse bg-canvas motion-reduce:animate-none' /></td>
                      <td className='min-w-36 px-5 py-5'><div className='h-4 w-24 animate-pulse bg-canvas motion-reduce:animate-none' /></td>
                      <td className='px-5 py-5'><div className='h-4 w-20 animate-pulse bg-canvas motion-reduce:animate-none' /></td>
                      <td className='px-5 py-3'><div className='ml-auto h-10 w-32 animate-pulse bg-canvas motion-reduce:animate-none' /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : listError ? (
          <div role='alert' className='p-6 min-[681px]:p-8'>
            <h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load your listings.</h2>
            <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Please try again to refresh the list.</p>
            <LandingButton variant='outline' size='compact' onClick={() => setAttempt((value) => value + 1)}>Try again</LandingButton>
          </div>
        ) : visibleListings.length === 0 ? (
          <div className='p-6 min-[681px]:p-8'>
            <h2 className='m-0 text-base font-semibold text-midnight'>{query ? 'No matching listings' : 'No listings yet'}</h2>
            <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>{query ? 'Try another business name, location or reference.' : 'Add your first business listing to get started.'}</p>
            {query ? <LandingButton variant='outline' size='compact' onClick={() => setSearch('')}>Clear search</LandingButton> : <LandingButtonLink href='/admin/listings/new' size='compact'><Plus aria-hidden='true' className='size-4' /> Add listing</LandingButtonLink>}
          </div>
        ) : (
          <div role='region' aria-label='Business listing table' tabIndex={0} className='min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
            <table className='w-full min-w-[880px] text-left text-sm leading-[1.65]'>
              <caption className='sr-only'>Business listings, reference IDs, locations, prices and management actions.</caption>
              <ListingTableHead />
              <tbody className='divide-y divide-advisory-rule'>
                {visibleListings.map((listing) => {
                  const name = listingName(listing);
                  return (
                    <tr key={listing._id} className='transition-colors duration-150 hover:bg-canvas/50 motion-reduce:transition-none'>
                      <td className='px-5 py-5 align-top whitespace-nowrap tabular-nums text-ink'>{formatReferenceId(listing.referenceId) || '—'}</td>
                      <td className='w-[34%] min-w-56 px-5 py-5 align-top'>
                        <Link href={`/admin/listings/${listing._id}`} className='break-words font-semibold text-midnight no-underline transition-colors duration-150 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'>{name}</Link>
                      </td>
                      <td className='min-w-36 px-5 py-5 align-top text-ink'>{listing.location || '—'}</td>
                      <td className='px-5 py-5 align-top whitespace-nowrap tabular-nums text-midnight'>{listing.price === 0 || listing.price ? String(listing.price) : '—'}</td>
                      <td className='px-5 py-3 align-top'>
                        <div role='group' aria-label={`Actions for ${name}`} className='flex items-center justify-end gap-1'>
                          <button type='button' onClick={() => void handleCopyUrl(listing._id)} disabled={deleting} className={ROW_ACTION_CLASS} title={copiedId === listing._id ? 'Listing URL copied' : 'Copy public listing URL'} aria-label={`Copy public listing URL for ${name}`}>
                            {copiedId === listing._id ? <Check aria-hidden='true' className='size-4 text-emerald-800' /> : <Copy aria-hidden='true' className='size-4' />}
                          </button>
                          <Link href={`/admin/listings/${listing._id}`} className={ROW_ACTION_CLASS} title='Edit listing' aria-label={`Edit ${name}`}><Edit aria-hidden='true' className='size-4' /></Link>
                          <button type='button' onClick={() => { setDeleteError(''); setDeleteTarget(listing); }} disabled={deleting} className={cn(ROW_ACTION_CLASS, 'text-red-700 hover:bg-red-50 hover:text-red-800')} title='Delete listing' aria-label={`Delete ${name}`}><Trash2 aria-hidden='true' className='size-4' /></button>
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

      <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => { if (!open) closeDelete(); }}>
        <DialogContent showCloseButton={false} className={cn(landingFontVariables, 'max-h-[85dvh] overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-midnight ring-0 sm:max-w-[460px] min-[681px]:p-8')}>
          <DialogHeader>
            <DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>Delete listing?</DialogTitle>
            <DialogDescription className='mt-3 text-sm leading-[1.8] text-ink'>
              <span className='mb-2 block break-words font-semibold text-midnight'>{deleteTarget ? listingName(deleteTarget) : ''}</span>
              This permanently deletes the listing. It cannot be restored from this page.
            </DialogDescription>
          </DialogHeader>
          {deleteError && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{deleteError}</p>}
          <div className='flex flex-wrap justify-end gap-3'>
            <LandingButton variant='outline' size='compact' disabled={deleting} onClick={closeDelete}>Cancel</LandingButton>
            <LandingButton size='compact' disabled={deleting} onClick={() => void handleDelete()} className='border-red-700 bg-red-700 text-white hover:bg-red-800'>
              {deleting && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{deleting ? 'Deleting…' : 'Delete listing'}
            </LandingButton>
          </div>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}

function ListingTableHead() {
  return (
    <thead className='border-b border-advisory-rule bg-canvas text-midnight'>
      <tr>
        {['Reference ID', 'Business name', 'Location', 'Price', 'Actions'].map((label) => (
          <th key={label} scope='col' className={cn('px-5 py-4 font-semibold', label === 'Actions' && 'text-right')}>{label}</th>
        ))}
      </tr>
    </thead>
  );
}
