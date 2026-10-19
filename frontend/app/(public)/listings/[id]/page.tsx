import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  PINNED_ACQUISITION_LISTING,
  PINNED_ACQUISITION_LISTING_ID,
} from '@/data/pinned-listing';
import { AcquisitionInterestForm } from '../_components/acquisition-interest-form';
import ListingActions from '../_components/listing-actions';
import { ListingBanner } from '../_components/listing-banner';
import { ListingOverview } from '../_components/listing-overview';
import { LandingContainer } from '@/components/landing/presentation';
import { JsonLd } from '@/components/seo/json-ld';

const SITE_URL = 'https://blackmontadvisory.com';

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
      <div className='bg-white'>
        <JsonLd data={structuredData} />
        <ListingBanner
          title={listing.title}
          listingId={listing._id}
          price={price}
          location={listing.location}
          image={listing.image}
          acquisitionAccess
        />

        <section
          id='register-interest'
          aria-labelledby='acquisition-interest-title'
          className='scroll-mt-32 bg-white text-ink py-14 min-[681px]:py-16 min-[1121px]:py-20'
        >
          <LandingContainer className='max-w-[1040px]'>
            <h2
              id='acquisition-interest-title'
              className='m-0 font-advisory-heading text-[28px] leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:text-[34px]'
            >
              Register your interest
            </h2>
            <p className='mt-5 mb-0 max-w-[850px] text-base leading-[1.8] min-[681px]:text-[17px]'>
              We regularly represent confidential and off-market businesses
              valued at $5 million or more that are not publicly advertised.
              Complete the form below and we will contact qualified buyers
              when suitable acquisition opportunities become available.
            </p>
            <AcquisitionInterestForm />
          </LandingContainer>
        </section>
      </div>
    );
  }

  return (
    <div className='bg-white'>
      <JsonLd data={structuredData} />
      <ListingBanner
        title={listing.title}
        listingId={listing._id}
        price={price}
        location={listing.suburb || listing.location}
        category={listing.category}
        summary={listing.summary}
        image={listing.image}
      >
        <ListingActions listingId={listing._id} listingTitle={listing.title} />
      </ListingBanner>

      <ListingOverview
        title={listing.title}
        about={listing.about}
        location={listing.suburb || listing.location}
        mapLink={listing.mapLink}
      />
    </div>
  );
}
