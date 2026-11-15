import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pin the project root to frontend/. Otherwise Turbopack picks the top-most
  // lockfile it finds (e.g. a stray one at the repo root), which breaks
  // next/font/google resolution during `next build`.
  turbopack: {
    root: path.join(__dirname),
  },
  // The adviser list page was retired; 301 it so Google drops it (and its
  // sitelink) and passes its link value to the homepage. /team/<slug>
  // profiles are unaffected.
  async redirects() {
    return [
      { source: '/team', destination: '/', permanent: true },
      // Valuation tool moved to a shorter, keyword-led URL.
      { source: '/exit/valuation', destination: '/business-valuation', permanent: true },
      { source: '/exit/readiness', destination: '/exit/sale-readiness', permanent: true },
      { source: '/exit/benchmarks', destination: '/exit/industry-benchmarks', permanent: true },
      // Resources are split into tabs; the old index pages point at the matching tab.
      // Query strings (e.g. ?page=2) carry over automatically.
      { source: '/resources', destination: '/resources/blogs', permanent: true },
    ];
  },
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.blackmontadvisory.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
