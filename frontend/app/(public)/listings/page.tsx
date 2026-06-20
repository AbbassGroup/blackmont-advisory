import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Tag, Search } from 'lucide-react';
import type { Metadata } from 'next';
import { PINNED_ACQUISITION_LISTING } from '@/data/pinned-listing';
import ListingFilters from './_components/filters';
import { PageBanner } from '@/components/global/page-banner';

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
    <div className='group flex flex-col overflow-hidden border border-secondary/10 bg-background transition-colors hover:border-accent/40'>
      {/* Image */}
      <div className='relative h-48 overflow-hidden bg-muted'>
        {listing.image ? (
          <Image
            loading='eager'
            priority
            unoptimized
            src={listing.image}
            alt={listing.title}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center bg-muted'>
            <span className='text-sm font-medium text-muted-foreground'>
              No Image
            </span>
          </div>
        )}
        {listing.category && (
          <span className='absolute left-3 top-3 flex items-center gap-1 bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent'>
            <Tag className='h-3 w-3' />
            {listing.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className='flex flex-1 flex-col p-5'>
        {listing.location && (
          <div className='mb-3 flex items-center gap-1.5 text-xs text-muted-foreground'>
            <MapPin className='h-3.5 w-3.5 shrink-0 text-accent' />
            <span className='font-medium'>{listing.location}</span>
          </div>
        )}
        <h3 className='mb-2 line-clamp-2 min-h-[2.8em] text-base font-bold leading-snug text-secondary'>
          {listing.title}
        </h3>
        {!listing.isPinned && (
          <p className='mb-4 line-clamp-2 min-h-[2.8em] flex-1 text-xs leading-relaxed text-muted-foreground'>
            {subText || 'No description available.'}
          </p>
        )}
        {price && (
          <div className='mb-4 text-2xl font-bold text-accent'>{price}</div>
        )}
        <div className='mt-auto border-t border-secondary/10 pt-4'>
          <Link
            href={`/listings/${listing._id}`}
            className='block w-full bg-accent py-2.5 text-center text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-accent-light'
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
      <div className='mb-6 flex h-20 w-20 items-center justify-center border-[1.5px] border-accent/30 text-accent'>
        <Search className='h-8 w-8' />
      </div>
      <h3 className='mb-2 text-xl font-bold text-secondary'>
        No listings found
      </h3>
      <p className='text-sm text-muted-foreground'>
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
    <div className='min-h-screen bg-background'>
      <PageBanner
        title={
          <>
            Business <span className='font-light text-accent'>Listings</span>
          </>
        }
        description='Discover your next business opportunity'
        image='https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=2000&q=80'
      />

      {/* ── Content ──────────────────────────────────── */}
      <div className='mx-auto max-w-[1500px] px-6 py-16 sm:px-10 lg:px-16 lg:py-20'>
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
