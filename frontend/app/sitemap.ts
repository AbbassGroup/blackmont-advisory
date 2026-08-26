import type { MetadataRoute } from 'next';
import { fetchAllPublicBlogSlugs } from '@/lib/blogs';

const BASE_URL = 'https://www.blackmontadvisory.com';

// No priority/changeFrequency: Google ignores both. lastModified only where real.
const staticPages = [
  '',
  '/agents',
  '/buy-a-business',
  '/partnership',
  '/resources',
  '/access',
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

  return [...staticEntries, ...blogEntries];
}
