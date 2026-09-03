import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // /access was indexed and sitemapped before the rename, so it redirects
  // permanently rather than 404ing and losing whatever ranking it holds.
  async redirects() {
    return [
      { source: '/access', destination: '/exit', permanent: true },
      { source: '/access/:path*', destination: '/exit/:path*', permanent: true },
    ];
  },
  images: {
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.abbassbusinessbrokers.com.au',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'apibusinessbrokers.abbass.com.au',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.blackmontadvisory.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
