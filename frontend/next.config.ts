import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pin the project root to frontend/. Otherwise Turbopack picks the top-most
  // lockfile it finds (e.g. a stray one at the repo root), which breaks
  // next/font/google resolution during `next build`.
  turbopack: {
    root: path.join(__dirname),
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
