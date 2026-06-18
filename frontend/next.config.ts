import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/businessbrokers/**',
      },
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
