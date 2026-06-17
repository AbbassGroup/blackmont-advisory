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
  console.log('🚀 ~ AdminOverviewPage ~ stats:', stats);

  const statCards = [
    {
      label: 'Total Listings',
      value: stats.total,
      icon: Building2,
      color: 'bg-blue-50 text-blue-600',
      border: 'border-l-blue-500',
    },
    {
      label: 'Featured Listings',
      value: stats.featured,
      icon: Star,
      color: 'bg-amber-50 text-amber-600',
      border: 'border-l-amber-500',
    },
    {
      label: 'Business Categories',
      value: stats.categories,
      icon: Tag,
      color: 'bg-brand-primary/10 text-brand-primary',
      border: 'border-l-brand-primary',
    },
    {
      label: 'Recent Updates',
      value: stats.recent.length,
      icon: Clock,
      color: 'bg-purple-50 text-purple-600',
      border: 'border-l-purple-500',
    },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-brand-black'>
          Dashboard Overview
        </h1>
        <p className='text-sm text-gray-500 mt-1'>
          Welcome back — here&apos;s what&apos;s happening.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`bg-white rounded-xl border-l-4 ${card.border} shadow-sm p-5 flex items-center gap-4`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}
            >
              <card.icon className='w-5 h-5' />
            </div>
            <div>
              {loading ? (
                <div className='h-8 w-12 bg-gray-200 rounded animate-pulse mb-1' />
              ) : (
                <p className='text-3xl font-bold text-brand-black'>
                  {card.value}
                </p>
              )}
              <p className='text-sm text-gray-500'>{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100'>
          <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
            <h2 className='font-semibold text-brand-black flex items-center gap-2'>
              <Clock className='w-4 h-4 text-brand-primary' /> Recent Listings
            </h2>
            <Link
              href='/admin/listings'
              className='text-xs text-brand-primary hover:underline flex items-center gap-1'
            >
              View all <ArrowRight className='w-3 h-3' />
            </Link>
          </div>
          <div className='divide-y divide-gray-50'>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='flex items-center gap-3 p-4'>
                  <div className='w-12 h-12 rounded-lg bg-gray-200 animate-pulse shrink-0' />
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 bg-gray-200 rounded animate-pulse w-3/4' />
                    <div className='h-3 bg-gray-100 rounded animate-pulse w-1/2' />
                  </div>
                </div>
              ))
            ) : stats.recent.length === 0 ? (
              <p className='text-sm text-gray-400 text-center py-10'>
                No listings yet
              </p>
            ) : (
              stats.recent.map((listing) => (
                <div
                  key={listing._id}
                  className='flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors'
                >
                  <div className='w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0'>
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
                        className='w-full h-full object-cover'
                        unoptimized
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <Building2 className='w-5 h-5 text-gray-400' />
                      </div>
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='font-medium text-brand-black truncate text-sm'>
                      {listing.title}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {listing.location || 'N/A'} •{' '}
                      {listing.price ? listing.price : 'POA'}
                    </p>
                  </div>
                  {listing.featured && (
                    <span className='text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium shrink-0'>
                      Featured
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100'>
          <div className='px-5 py-4 border-b border-gray-100'>
            <h2 className='font-semibold text-brand-black'>Quick Actions</h2>
          </div>
          <div className='p-4 flex flex-col gap-3'>
            {[
              {
                label: 'New Proposal',
                href: '/admin/proposals/new',
                icon: FileText,
                color: 'bg-brand-primary text-white hover:bg-brand-primary/90',
              },
              {
                label: 'Add Listing',
                href: '/admin/listings/new',
                icon: Building2,
                color: 'bg-gray-900 text-white hover:bg-gray-800',
              },
              {
                label: 'View Enquiries',
                href: '/admin/enquiries',
                icon: Star,
                color: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${action.color}`}
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
