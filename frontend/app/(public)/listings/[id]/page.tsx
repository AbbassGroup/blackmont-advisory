import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import {
  PINNED_ACQUISITION_LISTING,
  PINNED_ACQUISITION_LISTING_ID,
} from '@/data/pinned-listing';
import { AcquisitionInterestForm } from '../_components/acquisition-interest-form';
import ListingActions from '../_components/listing-actions';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = await fetchListing(id);

  if (!listing) {
    return {
      title: 'Listing Not Found | Blackmont Advisory',
    };
  }

  const seoDescription =
    listing.summary ||
    listing.description ||
    `View details for ${listing.title} at Blackmont Advisory.`;

  return {
    title: `${listing.title} | Blackmont Advisory`,
    description: seoDescription.slice(0, 160),
    openGraph: {
      title: listing.title,
      description: seoDescription.slice(0, 160),
      images: listing.image ? [listing.image] : [],
    },
  };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface Listing {
  _id: string;
  title: string;
  category?: string;
  location?: string;
  suburb?: string;
  price?: string;
  image?: string;
  summary?: string;
  description?: string;
  about?: string;
  mapLink?: string;
  keyFeatures?: string[];
  whyOpportunity?: string;
  isPinned?: boolean;
}

async function fetchListing(id: string): Promise<Listing | null> {
  if (id === PINNED_ACQUISITION_LISTING_ID) {
    return PINNED_ACQUISITION_LISTING;
  }

  try {
    const res = await fetch(`${API_BASE}/api/listings/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await fetchListing(id);

  if (!listing) notFound();

  const price =
    listing.price && !listing.price.startsWith('$')
      ? `$${listing.price}`
      : listing.price;
  const isPinnedAcquisitionListing =
    listing._id === PINNED_ACQUISITION_LISTING_ID;

  if (isPinnedAcquisitionListing) {
    return (
      <main className='min-h-screen bg-brand-offwhite'>
        <div className='relative flex min-h-[500px] items-center justify-center overflow-hidden pt-[80px] text-center lg:min-h-[580px]'>
          {listing.image && (
            <div
              className='absolute inset-0 scale-110'
              style={{
                backgroundImage: `url(${listing.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(14px) brightness(0.35)',
              }}
            />
          )}
          <div className='absolute inset-0 bg-linear-to-b from-black/30 to-black/65' />
          <div className='relative z-10 px-4 text-white'>
            <p className='mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary'>
              Confidential Acquisition Access
            </p>
            <h1 className='mx-auto mb-4 max-w-[900px] text-3xl font-bold leading-tight drop-shadow-lg md:text-5xl'>
              {listing.title}
            </h1>
            {price && (
              <div className='text-2xl font-bold text-brand-primary drop-shadow md:text-3xl'>
                {price}
              </div>
            )}
          </div>

          <ScrollIndicator />
        </div>

        <div className='mx-auto max-w-[1040px] px-4 py-10 lg:px-8'>
          <div className='mb-8 flex flex-wrap gap-3'>
            <Link
              href='/listings'
              className='inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:border-brand-primary hover:text-brand-primary'
            >
              <ArrowLeft className='h-4 w-4' />
              Back to Listings
            </Link>
          </div>

          <div className='rounded-2xl border border-gray-100 bg-white shadow-sm'>
            <div className='flex flex-wrap gap-6 border-b border-gray-100 px-6 py-5 md:px-8'>
              <div className='flex items-center gap-2'>
                <MapPin className='h-4 w-4 shrink-0 text-brand-primary' />
                <span className='text-lg font-semibold text-brand-black'>
                  {listing.location}
                </span>
              </div>
              {price && (
                <div className='text-lg font-bold text-brand-primary'>
                  {price}
                </div>
              )}
            </div>

            <div className='space-y-8 px-6 py-7 md:px-8'>
              <p className='text-base leading-relaxed text-gray-500 md:text-lg'>
                We regularly represent confidential and off-market businesses
                valued at $5 million or more that are not publicly advertised.
                Complete the form below and we will contact qualified buyers
                when suitable acquisition opportunities become available.
              </p>

              <AcquisitionInterestForm />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-brand-offwhite'>
      <div className='relative pt-[80px] min-h-[500px] lg:min-h-[580px] overflow-hidden flex items-center justify-center'>
        {listing.image && (
          <div
            className='absolute inset-0 scale-110'
            style={{
              backgroundImage: `url(${listing.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(14px) brightness(0.35)',
            }}
          />
        )}
        <div className='absolute inset-0 bg-linear-to-b from-black/30 to-black/65' />
        <div className='relative z-10 h-full flex items-center pb-10 justify-center'>
          <div className='text-center text-white px-4'>
            <h1 className='text-3xl md:text-5xl font-bold drop-shadow-lg mb-3 max-w-[800px] mx-auto leading-tight'>
              {listing.title}
            </h1>
            {price && (
              <div className='text-2xl md:text-3xl font-bold text-brand-primary drop-shadow'>
                {price}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────── */}
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8 py-10'>
        {/* Action buttons */}
        <ListingActions listingId={listing._id} listingTitle={listing.title} />

        {/* Single content card */}
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100'>
          {/* ── Overview strip ─────────────────────── */}
          <div className='flex flex-wrap gap-6 px-8 py-5'>
            {(listing.suburb || listing.location) && (
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 text-brand-primary shrink-0' />
                <span className='text-lg font-semibold text-brand-black'>
                  {listing.suburb || listing.location}
                </span>
              </div>
            )}
            {price && (
              <div className='flex items-center gap-2'>
                <span className='text-lg font-bold text-brand-primary'>
                  {price}
                </span>
              </div>
            )}
            {listing.category && (
              <div className='flex items-center gap-2'>
                <Tag className='w-4 h-4 text-brand-primary shrink-0' />
                <span className='text-lg font-semibold text-brand-black'>
                  {listing.category}
                </span>
              </div>
            )}
          </div>

          {/* ── About ──────────────────────────────── */}
          {listing.about && (
            <div className='px-8 py-7'>
              <h2 className='text-base font-bold text-brand-black mb-4 flex items-center gap-2'>
                <span className='w-1 h-5 bg-brand-primary rounded-full inline-block' />
                About the Business
              </h2>
              <div
                className='prose prose-sm max-w-none text-gray-500 leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1'
                dangerouslySetInnerHTML={{ __html: listing.about }}
              />
            </div>
          )}

          {/* ── Map ────────────────────────────────── */}
          <div className='px-8 py-7'>
            <h2 className='text-base font-bold text-brand-black mb-4 flex items-center gap-2'>
              <span className='w-1 h-5 bg-brand-primary rounded-full inline-block' />
              Location
            </h2>
            {listing.mapLink ? (
              <div className='rounded-xl overflow-hidden h-[300px]'>
                <iframe
                  src={listing.mapLink}
                  width='100%'
                  height='300'
                  style={{ border: 0 }}
                  title='Map'
                  loading='lazy'
                />
              </div>
            ) : (
              <div className='h-[180px] bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100'>
                <p className='text-gray-400 text-sm'>No map available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
