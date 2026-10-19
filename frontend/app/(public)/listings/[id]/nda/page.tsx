import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import {
  PINNED_ACQUISITION_LISTING,
  PINNED_ACQUISITION_LISTING_ID,
} from '@/data/pinned-listing';
import { LandingContainer, LandingTextLink } from '@/components/landing/presentation';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
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
    <div className='bg-white'>
      <header className='border-b border-advisory-rule bg-canvas text-ink py-10 min-[681px]:py-12 min-[1121px]:py-16'>
        <LandingContainer className='max-w-[1040px]'>
          <Breadcrumbs
            tone='light'
            items={[
              { name: 'Home', path: '' },
              { name: 'Buying a business', path: '/buy-a-business' },
              { name: listing.title, path: `/listings/${listing._id}` },
              { name: 'Sign NDA', path: `/listings/${listing._id}/nda` },
            ]}
          />
          <h1 className='mt-8 mb-0 font-advisory-heading text-[clamp(32px,7vw,42px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[48px]'>
            Confidentiality agreement
          </h1>
          <p className='mt-5 mb-0 max-w-[900px] text-[19px] leading-[1.65] font-medium text-midnight min-[681px]:text-[21px]'>
            {listing.title}
          </p>
          <p className='mt-5 mb-0 max-w-[850px] text-base leading-[1.8] min-[681px]:text-[17px]'>
            To access detailed information about this business, please review
            the confidentiality agreement below and complete the form. We will
            be in touch shortly after your submission.
          </p>
          {(price || listing.suburb || listing.location) && (
            <dl className='mt-6 mb-0 flex flex-wrap items-start gap-x-10 gap-y-4'>
              {(listing.suburb || listing.location) && (
                <div>
                  <dt className='text-sm'>Location</dt>
                  <dd className='mt-2 text-base font-medium text-midnight'>{listing.suburb || listing.location}</dd>
                </div>
              )}
              {price && (
                <div>
                  <dt className='text-sm'>{listing._id === PINNED_ACQUISITION_LISTING_ID ? 'Acquisition value' : 'Asking price'}</dt>
                  <dd className='mt-1 font-advisory-heading text-[26px] leading-[1.4] font-bold text-midnight'>{price}</dd>
                </div>
              )}
            </dl>
          )}
          <LandingTextLink href={`/listings/${listing._id}`} className='mt-6 inline-flex min-h-11 items-center gap-2'>
            <ArrowLeft aria-hidden='true' className='size-4 shrink-0' />
            Back to listing
          </LandingTextLink>
        </LandingContainer>
      </header>

      <LandingContainer className='max-w-[1040px] py-10 min-[681px]:py-12 min-[1121px]:py-16'>
        <NDAFormInline listingTitle={listing.title} listingId={listing._id} />
      </LandingContainer>
    </div>
  );
}
