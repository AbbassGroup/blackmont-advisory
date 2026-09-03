import type { MetadataRoute } from 'next';
import { fetchAllPublicBlogSlugs } from '@/lib/blogs';
import {
  CONTENT_UPDATED,
  indexableIndustryPages,
} from '@/lib/data/industry-benchmarks';
import { indexableGuides } from '@/lib/data/guides';

const BASE_URL = 'https://www.blackmontadvisory.com';

// No priority/changeFrequency: Google ignores both. lastModified only where real.
const staticPages = [
  '',
  '/agents',
  '/buy-a-business',
  '/partnership',
  '/resources',
  '/access',
  '/selling-a',
  '/guides',
  '/access/valuation',
  '/access/readiness',
  '/access/benchmarks',
  '/access/exit-planning',
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

  return [
    ...staticEntries,
    ...industryEntries,
    ...guideEntries,
    ...blogEntries,
  ];
}
