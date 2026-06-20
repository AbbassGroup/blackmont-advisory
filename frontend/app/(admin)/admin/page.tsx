'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Building2,
  Star,
  Tag,
  Clock,
  ArrowRight,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';
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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminOverviewPage() {
  const { token } = useAdminAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    apiClient
      .get<Listing[]>('/api/listings')
      .then(({ data }) => setListings(Array.isArray(data) ? data : []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, [token]);

  const stats = {
    total: listings.length,
    featured: listings.filter((l) => l.featured).length,
    categories: new Set(listings.map((l) => l.category)).size,
    recent: listings.slice(-5).reverse(),
  };

  const statCards = [
    { label: 'Total Listings', value: stats.total, icon: Building2 },
    { label: 'Featured Listings', value: stats.featured, icon: Star },
    { label: 'Business Categories', value: stats.categories, icon: Tag },
    { label: 'Recent Updates', value: stats.recent.length, icon: Clock },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <p className='text-[11px] font-bold uppercase tracking-[0.18em] text-accent'>
          Overview
        </p>
        <h1 className='mt-1 text-2xl font-bold tracking-tight text-secondary'>
          Dashboard
        </h1>
        <p className='mt-1 text-sm text-muted-foreground'>
          Welcome back — here&apos;s what&apos;s happening.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        {statCards.map((card) => (
          <div
            key={card.label}
            className='flex items-center gap-4 border border-border border-l-2 border-l-accent bg-card p-5'
          >
            <div className='flex h-12 w-12 items-center justify-center border border-accent/30 bg-accent/5 text-accent'>
              <card.icon className='w-5 h-5' strokeWidth={1.5} />
            </div>
            <div>
              {loading ? (
                <div className='mb-1 h-8 w-12 animate-pulse bg-muted' />
              ) : (
                <p className='text-3xl font-bold text-secondary'>
                  {card.value}
                </p>
              )}
              <p className='text-sm text-muted-foreground'>{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 border border-border bg-card'>
          <div className='flex items-center justify-between border-b border-border px-5 py-4'>
            <h2 className='flex items-center gap-2 font-semibold text-secondary'>
              <Clock className='w-4 h-4 text-accent' /> Recent Listings
            </h2>
            <Link
              href='/admin/listings'
              className='flex items-center gap-1 text-xs font-medium text-secondary transition-colors hover:text-accent'
            >
              View all <ArrowRight className='w-3 h-3' />
            </Link>
          </div>
          <div className='divide-y divide-border'>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='flex items-center gap-3 p-4'>
                  <div className='h-12 w-12 shrink-0 animate-pulse bg-muted' />
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 w-3/4 animate-pulse bg-muted' />
                    <div className='h-3 w-1/2 animate-pulse bg-muted/60' />
                  </div>
                </div>
              ))
            ) : stats.recent.length === 0 ? (
              <p className='py-10 text-center text-sm text-muted-foreground'>
                No listings yet
              </p>
            ) : (
              stats.recent.map((listing) => (
                <div
                  key={listing._id}
                  className='flex items-center gap-3 p-4 transition-colors hover:bg-muted/50'
                >
                  <div className='h-12 w-12 shrink-0 overflow-hidden bg-muted'>
                    {listing.image ? (
                      <Image
                        src={
                          listing.image.startsWith('http')
                            ? listing.image
                            : `${API_URL}${listing.image}`
                        }
                        alt={listing.title}
                        width={48}
                        height={48}
                        className='h-full w-full object-cover'
                        unoptimized
                      />
                    ) : (
                      <div className='flex h-full w-full items-center justify-center'>
                        <Building2 className='w-5 h-5 text-muted-foreground' />
                      </div>
                    )}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium text-secondary'>
                      {listing.title}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {listing.location || 'N/A'} •{' '}
                      {listing.price ? listing.price : 'POA'}
                    </p>
                  </div>
                  {listing.featured && (
                    <span className='shrink-0 bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent'>
                      Featured
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className='border border-border bg-card'>
          <div className='border-b border-border px-5 py-4'>
            <h2 className='font-semibold text-secondary'>Quick Actions</h2>
          </div>
          <div className='flex flex-col gap-3 p-4'>
            {[
              {
                label: 'New Proposal',
                href: '/admin/proposals/new',
                icon: FileText,
                color: 'bg-accent text-primary hover:bg-accent-light',
              },
              {
                label: 'Add Listing',
                href: '/admin/listings/new',
                icon: Building2,
                color: 'bg-secondary text-parchment hover:bg-secondary/90',
              },
              {
                label: 'View Enquiries',
                href: '/admin/enquiries',
                icon: Star,
                color: 'bg-muted text-foreground hover:bg-linen',
              },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${action.color}`}
              >
                <action.icon className='w-4 h-4' /> {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
