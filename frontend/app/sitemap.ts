import type { MetadataRoute } from 'next';
import { fetchAllPublicBlogSlugs } from '@/lib/blogs';
import {
  CONTENT_UPDATED,
  indexableIndustryPages,
} from '@/lib/data/industry-benchmarks';
import { indexableGuides } from '@/lib/data/guides';
import { PINNED_ACQUISITION_LISTING_ID } from '@/data/pinned-listing';
import { authorPath, fetchPublicAuthors } from '@/lib/authors';
import { SUBURBS } from '@/lib/data/suburb-pages';
import { BUY_LOCATIONS, SELL_LOCATIONS } from '@/lib/data/location-pages';
import { BROKER_LOCATIONS } from '@/lib/data/broker-locations';

const BASE_URL = 'https://blackmontadvisory.com';

/**
 * Every public listing, plus the synthetic pinned one (it isn't in the API).
 * Native fetch so Next caches it; an hour is plenty for a sitemap.
 */
async function fetchListingEntries(): Promise<MetadataRoute.Sitemap> {
  const pinned = { url: `${BASE_URL}/listings/${PINNED_ACQUISITION_LISTING_ID}` };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005';
  const response = await fetch(`${apiUrl}/api/listings`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(`Failed to load listings (${response.status})`);
  }

  const listings: Array<{ _id: string; updatedAt?: string }> = await response.json();
  return [
    pinned,
    ...listings.map(({ _id, updatedAt }) => ({
      url: `${BASE_URL}/listings/${_id}`,
      ...(updatedAt ? { lastModified: new Date(updatedAt) } : {}),
    })),
  ];
}

// No priority/changeFrequency: Google ignores both. lastModified only where real.
const staticPages = [
  '',
  '/selling-a-business',
  '/buying-a-business',
  '/buy-a-business',
  '/about-us',
  '/business-brokers',
  '/partnership',
  '/resources/blogs',
  '/guides',
  '/resources/guides',
  '/resources/case-studies',
  '/exit',
  '/selling-a',
  '/business-valuation',
  '/exit/sale-readiness',
  '/exit/industry-benchmarks',
  '/exit/exit-planning',
  '/privacy',
  '/terms-and-conditions',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${BASE_URL}${route}`,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const slugs = await fetchAllPublicBlogSlugs();
    blogEntries = slugs.map(({ url, updatedAt }) => ({
      url: `${BASE_URL}/resources/${url}`,
      ...(updatedAt ? { lastModified: new Date(updatedAt) } : {}),
    }));
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap:', error);
  }

  let listingEntries: MetadataRoute.Sitemap = [];
  try {
    listingEntries = await fetchListingEntries();
  } catch (error) {
    console.error('Failed to fetch listings for sitemap:', error);
  }

  let authorEntries: MetadataRoute.Sitemap = [];
  try {
    const authors = await fetchPublicAuthors({ revalidate: 3600 });
    authorEntries = authors.map((author) => ({
      url: `${BASE_URL}${authorPath(author)}`,
      ...(author.updatedAt ? { lastModified: new Date(author.updatedAt) } : {}),
    }));
  } catch (error) {
    console.error('Failed to fetch authors for sitemap:', error);
  }

  const industryEntries: MetadataRoute.Sitemap = indexableIndustryPages().map(
    ({ page }) => ({
      url: `${BASE_URL}/selling-a/${page.slug}`,
      lastModified: new Date(CONTENT_UPDATED),
    }),
  );

  const guideEntries: MetadataRoute.Sitemap = indexableGuides().map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(CONTENT_UPDATED),
  }));

  // City pages, built from the same data as their routes so new cities appear automatically.
  const cityEntries: MetadataRoute.Sitemap = [
    ...SELL_LOCATIONS.map(({ slug }) => `/selling-a-business/${slug}`),
    ...BUY_LOCATIONS.map(({ slug }) => `/buying-a-business/${slug}`),
    ...BROKER_LOCATIONS.map(({ slug }) => `/business-brokers/${slug}`),
  ].map((route) => ({ url: `${BASE_URL}${route}` }));

  // CBD and inner-city pages, both the selling and buying versions.
  const suburbEntries: MetadataRoute.Sitemap = SUBURBS.flatMap(({ slug }) => [
    { url: `${BASE_URL}/selling-a-business/${slug}` },
    { url: `${BASE_URL}/buying-a-business/${slug}` },
  ]);

  return [
    ...staticEntries,
    ...cityEntries,
    ...suburbEntries,
    ...industryEntries,
    ...guideEntries,
    ...listingEntries,
    ...authorEntries,
    ...blogEntries,
  ];
}
