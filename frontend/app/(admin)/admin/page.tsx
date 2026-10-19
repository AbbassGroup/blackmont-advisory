'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { AdminPageLayout } from '@/components/admin/page-layout';
import {
  LandingButton,
  LandingButtonLink,
  LandingTextLink,
} from '@/components/landing/presentation';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/context/admin-auth-context';

type Listing = {
  _id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  featured: boolean;
  category: string;
  createdAt: string;
};

const QUICK_ACTIONS = [
  {
    label: 'New proposal',
    href: '/admin/proposals/new',
    description: 'Prepare a business appraisal and proposal.',
  },
  {
    label: 'Add listing',
    href: '/admin/listings/new',
    description: 'Create a business listing.',
  },
  {
    label: 'View enquiries',
    href: '/admin/enquiries',
    description: 'Review buyer enquiries.',
  },
];

function listingImageUrl(image: string) {
  if (image.startsWith('http')) return image;
  const baseUrl = (apiClient.defaults.baseURL || '').replace(/\/$/, '');
  return `${baseUrl}/${image.replace(/^\/+/, '')}`;
}

export default function AdminOverviewPage() {
  const { token } = useAdminAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!token) return;
    let active = true;
    setLoading(true);
    setError(false);

    apiClient
      .get<Listing[]>('/api/listings')
      .then(({ data }) => {
        if (active) setListings(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token, reloadKey]);

  // The listings endpoint returns records newest first.
  const recent = listings.slice(0, 5);
  const summary = [
    { label: 'Total listings', value: listings.length },
    { label: 'Featured listings', value: listings.filter((listing) => listing.featured).length },
    { label: 'Business categories', value: new Set(listings.map((listing) => listing.category)).size },
    { label: 'Recent listings', value: recent.length },
  ];

  return (
    <AdminPageLayout title='Dashboard' description='Manage your listings, proposals and enquiries.'>
      <dl
        aria-label='Listing summary'
        aria-busy={loading}
        className='m-0 grid grid-cols-2 border border-advisory-rule bg-white min-[1121px]:grid-cols-4'
      >
        {summary.map((item, index) => (
          <div
            key={item.label}
            className={cn(
              'min-w-0 border-advisory-rule p-5 min-[1280px]:p-6',
              index > 1 && 'border-t min-[1121px]:border-t-0',
              index % 2 === 1 && 'border-l',
              index === 2 && 'min-[1121px]:border-l',
            )}
          >
            <dt className='text-sm leading-[1.6] text-ink'>{item.label}</dt>
            <dd className='mt-3 ml-0 text-[30px] leading-[1.2] font-semibold tabular-nums text-midnight'>
              {loading ? (
                <span aria-hidden='true' className='block h-9 w-14 animate-pulse bg-canvas motion-reduce:animate-none' />
              ) : error ? (
                <span aria-label='Unavailable'>—</span>
              ) : (
                item.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className='grid min-w-0 items-start gap-8 min-[1121px]:grid-cols-[minmax(0,1.7fr)_minmax(260px,1fr)]'>
        <section
          aria-labelledby='recent-listings-title'
          aria-busy={loading}
          className='min-w-0 border border-advisory-rule bg-white p-5 min-[681px]:p-6'
        >
          <div className='flex flex-wrap items-center justify-between gap-4 border-b border-advisory-rule pb-5'>
            <h2 id='recent-listings-title' className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>
              Recent listings
            </h2>
            <LandingTextLink href='/admin/listings' className='inline-flex min-h-10 items-center gap-2 text-sm no-underline'>
              View all <ArrowRight aria-hidden='true' className='size-4 shrink-0' />
            </LandingTextLink>
          </div>

          {loading ? (
            <>
              <p role='status' className='sr-only'>Loading listings.</p>
              <div aria-hidden='true' className='divide-y divide-advisory-rule'>
                {Array.from({ length: 5 }, (_, index) => (
                  <div key={index} className='flex items-center gap-4 py-5'>
                    <div className='h-14 w-16 shrink-0 animate-pulse bg-canvas motion-reduce:animate-none' />
                    <div className='min-w-0 flex-1 space-y-3'>
                      <div className='h-4 w-3/4 animate-pulse bg-canvas motion-reduce:animate-none' />
                      <div className='h-3 w-1/2 animate-pulse bg-canvas motion-reduce:animate-none' />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : error ? (
            <div role='alert' className='py-8'>
              <h3 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load your listings.</h3>
              <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>
                Please try again to refresh your dashboard.
              </p>
              <LandingButton variant='outline' size='compact' onClick={() => setReloadKey((value) => value + 1)}>
                Try again
              </LandingButton>
            </div>
          ) : recent.length === 0 ? (
            <div className='py-8'>
              <h3 className='m-0 text-base font-semibold text-midnight'>No listings yet</h3>
              <p className='mt-2 mb-5 max-w-[45ch] text-sm leading-[1.75] text-ink'>
                Add your first business listing to see it here.
              </p>
              <LandingButtonLink href='/admin/listings/new' size='compact'>
                Add listing
              </LandingButtonLink>
            </div>
          ) : (
            <ul className='m-0 list-none divide-y divide-advisory-rule p-0'>
              {recent.map((listing) => (
                <li key={listing._id}>
                  <Link
                    href={`/admin/listings/${listing._id}`}
                    className='group flex min-w-0 items-start gap-4 py-5 no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt'
                  >
                    <div className='flex h-14 w-16 shrink-0 items-center justify-center overflow-hidden bg-canvas'>
                      {listing.image ? (
                        <Image
                          src={listingImageUrl(listing.image)}
                          alt=''
                          width={64}
                          height={56}
                          className='h-full w-full object-cover'
                          unoptimized
                        />
                      ) : (
                        <Building2 aria-hidden='true' className='size-5 text-ink/60' strokeWidth={1.5} />
                      )}
                    </div>
                    <div className='grid min-w-0 flex-1 gap-x-5 gap-y-2 min-[681px]:grid-cols-[minmax(0,1fr)_auto]'>
                      <div className='min-w-0'>
                        <p className='m-0 line-clamp-2 text-[15px] leading-[1.65] font-semibold text-midnight transition-colors duration-150 group-hover:text-gilt group-focus-visible:text-gilt motion-reduce:transition-none'>
                          {listing.title}
                        </p>
                        <div className='mt-1 flex flex-wrap items-center gap-x-3 gap-y-1'>
                          <span className='text-sm leading-[1.6] text-ink'>{listing.location || 'Location not provided'}</span>
                          {listing.featured && (
                            <span className='bg-gilt/15 px-2 py-0.5 text-xs leading-[1.5] font-medium text-midnight'>
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      <p className='m-0 self-start text-sm leading-[1.75] font-semibold text-midnight min-[681px]:max-w-40 min-[681px]:text-right'>
                        {listing.price || 'POA'}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside aria-labelledby='quick-actions-title' className='min-w-0 bg-midnight p-5 text-white min-[681px]:p-6'>
          <h2 id='quick-actions-title' className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal'>
            Quick actions
          </h2>
          <p className='mt-3 mb-6 text-sm leading-[1.75] text-white/80'>
            Start a new document or pick up your next task.
          </p>
          <nav aria-label='Quick actions'>
            <ul className='m-0 list-none divide-y divide-white/20 p-0'>
              {QUICK_ACTIONS.map((action) => (
                <li key={action.href}>
                  <Link
                    href={action.href}
                    className='group flex min-h-14 items-start justify-between gap-4 py-5 text-white no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt'
                  >
                    <span className='min-w-0'>
                      <span className='block text-[15px] leading-[1.6] font-semibold transition-colors duration-150 group-hover:text-gilt group-focus-visible:text-gilt motion-reduce:transition-none'>
                        {action.label}
                      </span>
                      <span className='mt-1 block text-sm leading-[1.65] text-white/80'>{action.description}</span>
                    </span>
                    <ArrowRight aria-hidden='true' className='mt-1 size-4 shrink-0 text-gilt' />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </AdminPageLayout>
  );
}
