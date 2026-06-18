import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Tag, Search } from 'lucide-react';
import type { Metadata } from 'next';
import { PINNED_ACQUISITION_LISTING } from '@/data/pinned-listing';
import ListingFilters from './_components/filters';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

export const metadata: Metadata = {
  title: 'Business Listings – Buy a Business in Australia',
  description:
    'Browse businesses for sale across Melbourne, Sydney, and Australia. Filter by category and location to find your next business opportunity with Blackmont Advisory.',
  openGraph: {
    title: 'Businesses for Sale | Blackmont Advisory',
    description:
      'Discover verified business listings across Australia. Find your next investment today.',
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface Listing {
  _id: string;
  title: string;
  category?: string;
  location?: string;
  price?: string;
  image?: string;
  summary?: string;
  description?: string;
  isPinned?: boolean;
}

// ─── Server fetch ─────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function fetchListings(
  category?: string,
  location?: string,
): Promise<Listing[]> {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (location) params.set('location', location);

  const url = `${API_BASE}/api/listings?${params.toString()}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// ─── Listing Card ─────────────────────────────────────────────────────────────

function ListingCard({ listing }: { listing: Listing }) {
  const price =
    listing.price && !listing.price.startsWith('$')
      ? `$${listing.price}`
      : listing.price;
  const subText = listing.summary || listing.description;

  return (
    <div className='group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col'>
      {/* Image */}
      <div className='relative h-48 bg-gray-100 overflow-hidden'>
        {listing.image ? (
          <Image
            loading='eager'
            priority
            unoptimized
            src={listing.image}
            alt={listing.title}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-500'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200'>
            <span className='text-gray-400 text-sm font-medium'>No Image</span>
          </div>
        )}
        {listing.category && (
          <span className='absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand-primary text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1'>
            <Tag className='w-3 h-3' />
            {listing.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className='flex flex-col flex-1 p-5'>
        {listing.location && (
          <div className='flex items-center gap-1.5 text-gray-400 text-xs mb-3'>
            <MapPin className='w-3.5 h-3.5 text-brand-primary shrink-0' />
            <span className='font-medium'>{listing.location}</span>
          </div>
        )}
        <h3 className='font-bold text-brand-black text-base leading-snug mb-2 line-clamp-2 min-h-[2.8em]'>
          {listing.title}
        </h3>
        {!listing.isPinned && (
          <p className='text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4 min-h-[2.8em] flex-1'>
            {subText || 'No description available.'}
          </p>
        )}
        {price && (
          <div className='text-2xl font-bold text-brand-primary mb-4'>
            {price}
          </div>
        )}
        <div className='border-t border-gray-100 pt-4 mt-auto'>
          <Link
            href={`/listings/${listing._id}`}
            className='block w-full text-center bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-sm py-2.5 rounded-md transition-all duration-200 shadow-sm shadow-brand-primary/20'
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center py-28 text-center'>
      <div className='w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center mb-6'>
        <Search className='w-8 h-8 text-brand-primary' />
      </div>
      <h3 className='text-xl font-bold text-brand-black mb-2'>
        No listings found
      </h3>
      <p className='text-gray-400 text-sm'>
        Try adjusting your filters to see more results.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; location?: string }>;
}) {
  const { category, location } = await searchParams;
  const fetchedListings = await fetchListings(category, location);
  const listings = [
    PINNED_ACQUISITION_LISTING,
    ...fetchedListings.filter(
      (listing) => listing._id !== PINNED_ACQUISITION_LISTING._id,
    ),
  ];

  return (
    <div className='min-h-screen bg-brand-offwhite'>
      {/* ── Hero ─────────────────────────────────────── */}
      <div className='relative pt-[80px] min-h-[500px] lg:min-h-[580px] bg-[#1c2434] text-center overflow-hidden flex items-center justify-center'>
        <div className='absolute inset-0 bg-[url("https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=2000&q=80")] bg-cover bg-center' />
        <div className='absolute inset-0 bg-black/45' />
        <div className='relative z-10 max-w-[800px] mx-auto px-6'>
          <h1 className='text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg'>
            Business Listings
          </h1>
          <p className='text-white/85 text-xl font-light'>
            Discover your next business opportunity
          </p>
        </div>

        <ScrollIndicator />
      </div>

      {/* ── Content ──────────────────────────────────── */}
      <div className='max-w-[1500px] mx-auto px-4 lg:px-8 py-12'>
        <div className='flex gap-8'>
          {/* ── Sidebar ───────────────────────────────── */}
          <aside className='hidden lg:block w-[280px] shrink-0'>
            <div className='sticky top-28'>
              <Suspense>
                <ListingFilters
                  category={category ?? ''}
                  location={location ?? ''}
                  count={listings.length}
                />
              </Suspense>
            </div>
          </aside>

          {/* ── Grid ─────────────────────────────────── */}
          <div className='flex-1 min-w-0'>
            {listings.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                {listings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
