import type { MetadataRoute } from 'next';
import { blogs } from '@/data/blog-data';

const BASE_URL = 'https://www.blackmontadvisory.com';
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Routes
  const staticPages = [
    '',
    '/listings',
    '/agents',
    '/buy-a-business',
    '/partnership',
    '/resources',
    '/privacy',
    '/terms-and-conditions',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === '' || route === '/listings' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : route === '/listings' ? 0.9 : 0.7,
  }));

  // Lead-generation "Sell" hub + its free resource tools.
  const accessRoutes: { route: string; priority: number }[] = [
    { route: '/access', priority: 0.9 },
    { route: '/access/valuation', priority: 0.8 },
    { route: '/access/readiness', priority: 0.8 },
    { route: '/access/benchmarks', priority: 0.8 },
    { route: '/access/exit-planning', priority: 0.8 },
  ];

  const accessEntries: MetadataRoute.Sitemap = accessRoutes.map(
    ({ route, priority }) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority,
    }),
  );

  // Dynamic Blog Routes
  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/resources/${blog.link}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic Listing Routes (Fetched from API)
  let listingEntries: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/api/listings`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const listings = await res.json();
      listingEntries = listings.map((listing: any) => ({
        url: `${BASE_URL}/listings/${listing._id}`,
        lastModified: new Date(), // Ideally this would come from the listing data
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch listings for sitemap:', error);
  }

  return [
    ...sitemapEntries,
    ...accessEntries,
    ...blogEntries,
    ...listingEntries,
  ];
}
