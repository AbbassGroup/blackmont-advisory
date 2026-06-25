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
import { PageBanner } from '@/components/global/page-banner';
import { JsonLd } from '@/components/seo/json-ld';

const SITE_URL = 'https://www.blackmontadvisory.com';

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
    alternates: { canonical: `/listings/${id}` },
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

  const listingUrl = `${SITE_URL}/listings/${listing._id}`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: listing.title,
      description: listing.summary || listing.description || listing.title,
      ...(listing.image ? { image: listing.image } : {}),
      category: listing.category,
      url: listingUrl,
      brand: { '@type': 'Brand', name: 'Blackmont Advisory' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Listings',
          item: `${SITE_URL}/listings`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: listing.title,
          item: listingUrl,
        },
      ],
    },
  ];

  if (isPinnedAcquisitionListing) {
    return (
      <main className='min-h-screen bg-muted'>
        <JsonLd data={structuredData} />
        <PageBanner
          eyebrow='Confidential Acquisition Access'
          title={listing.title}
          description={
            price ? (
              <span className='font-semibold text-accent text-3xl'>
                {price}
              </span>
            ) : undefined
          }
          image={listing.image}
        />

        <div className='mx-auto max-w-[1040px] px-6 py-12 sm:px-10 lg:px-16'>
          <div className='mb-8 flex flex-wrap gap-3'>
            <Link
              href='/listings'
              className='inline-flex items-center gap-2  border border-secondary/15 bg-background px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-accent hover:text-accent'
            >
              <ArrowLeft className='h-4 w-4' />
              Back to Listings
            </Link>
          </div>

          <div className=' border border-secondary/10 bg-background shadow-sm'>
            <div className='flex flex-wrap gap-6 border-b border-secondary/10 px-6 py-5 md:px-8'>
              <div className='flex items-center gap-2'>
                <MapPin className='h-4 w-4 shrink-0 text-accent' />
                <span className='text-lg font-semibold text-secondary'>
                  {listing.location}
                </span>
              </div>
              {price && (
                <div className='text-lg font-bold text-accent'>{price}</div>
              )}
            </div>

            <div className='space-y-8 px-6 py-7 md:px-8'>
              <p className='text-base leading-relaxed text-muted-foreground md:text-lg'>
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
    <main className='min-h-screen bg-muted'>
      <JsonLd data={structuredData} />
      <PageBanner
        title={listing.title}
        description={
          price ? (
            <span className='font-semibold text-accent text-3xl'>{price}</span>
          ) : undefined
        }
        image={listing.image}
      />

      {/* ── Content ──────────────────────────────────── */}
      <div className='max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-16 py-10'>
        {/* Action buttons */}
        <ListingActions listingId={listing._id} listingTitle={listing.title} />

        {/* Single content card */}
        <div className='bg-background  border border-secondary/10 shadow-sm divide-y divide-secondary/10'>
          {/* ── Overview strip ─────────────────────── */}
          <div className='flex flex-wrap gap-6 px-8 py-5'>
            {(listing.suburb || listing.location) && (
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 text-accent shrink-0' />
                <span className='text-lg font-semibold text-secondary'>
                  {listing.suburb || listing.location}
                </span>
              </div>
            )}
            {price && (
              <div className='flex items-center gap-2'>
                <span className='text-lg font-bold text-accent'>{price}</span>
              </div>
            )}
            {listing.category && (
              <div className='flex items-center gap-2'>
                <Tag className='w-4 h-4 text-accent shrink-0' />
                <span className='text-lg font-semibold text-secondary'>
                  {listing.category}
                </span>
              </div>
            )}
          </div>

          {/* ── About ──────────────────────────────── */}
          {listing.about && (
            <div className='px-8 py-7'>
              <h2 className='text-base font-bold text-secondary mb-4 flex items-center gap-2'>
                <span className='w-1 h-5 bg-accent rounded-full inline-block' />
                About the Business
              </h2>
              <div
                className='prose prose-sm max-w-none text-muted-foreground leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1'
                dangerouslySetInnerHTML={{ __html: listing.about }}
              />
            </div>
          )}

          {/* ── Map ────────────────────────────────── */}
          <div className='px-8 py-7'>
            <h2 className='text-base font-bold text-secondary mb-4 flex items-center gap-2'>
              <span className='w-1 h-5 bg-accent rounded-full inline-block' />
              Location
            </h2>
            {listing.mapLink ? (
              <div className=' overflow-hidden h-[300px]'>
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
              <div className='h-[180px] bg-muted  flex items-center justify-center border border-secondary/10'>
                <p className='text-muted-foreground text-sm'>
                  No map available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
