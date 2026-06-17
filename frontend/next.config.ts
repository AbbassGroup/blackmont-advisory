import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/businessbrokers',
  images: {
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
        protocol: 'http',
        hostname: 'localhost',
        port: '5005',
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
