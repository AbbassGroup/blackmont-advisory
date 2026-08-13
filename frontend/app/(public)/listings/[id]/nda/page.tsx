import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import {
  PINNED_ACQUISITION_LISTING,
  PINNED_ACQUISITION_LISTING_ID,
} from '@/data/pinned-listing';
import { PageBanner } from '@/components/global/page-banner';
import NDAFormInline from '../../_components/nda-form-inline';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface Listing {
  _id: string;
  title: string;
  category?: string;
  location?: string;
  suburb?: string;
  price?: string;
  image?: string;
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

  return {
    title: `Sign NDA · ${listing.title} | Blackmont Advisory`,
    description: `Complete the confidentiality agreement to access detailed information about ${listing.title}.`,
    alternates: { canonical: `/listings/${id}/nda` },
    robots: { index: false, follow: false },
  };
}

export default async function ListingNDAPage({
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

  return (
    <main className='min-h-screen bg-muted'>
      <PageBanner
        eyebrow='Confidentiality Agreement'
        title='Sign NDA'
        description={listing.title}
        image={listing.image}
      />

      <div className='mx-auto max-w-[1040px] px-6 py-12 sm:px-10 lg:px-16'>
        <div className='mb-8 flex flex-wrap gap-3'>
          <Link
            href={`/listings/${listing._id}`}
            className='inline-flex items-center gap-2  border border-secondary/15 bg-background px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-accent hover:text-accent'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Listing
          </Link>
        </div>

        <div className=' border border-secondary/10 bg-background shadow-sm'>
          <div className='flex flex-wrap gap-6 border-b border-secondary/10 px-6 py-5 md:px-8'>
            {(listing.suburb || listing.location) && (
              <div className='flex items-center gap-2'>
                <MapPin className='h-4 w-4 shrink-0 text-accent' />
                <span className='text-lg font-semibold text-secondary'>
                  {listing.suburb || listing.location}
                </span>
              </div>
            )}
            {price && (
              <div className='text-lg font-bold text-accent'>{price}</div>
            )}
          </div>

          <div className='space-y-8 px-6 py-7 md:px-8'>
            <p className='text-base leading-relaxed text-muted-foreground md:text-lg'>
              To access detailed information about this business, please review
              the confidentiality agreement below and complete the form. We will
              be in touch shortly after your submission.
            </p>

            <NDAFormInline
              listingTitle={listing.title}
              listingId={listing._id}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
