import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  async rewrites() {
    return [
      {
        source: '/api/projects/:path*',
        destination: 'http://localhost:5000/api/projects/:path*',
      },
      {
        source: '/api/projects',
        destination: 'http://localhost:5000/api/projects',
      },
      {
        source: '/api/leads/:path*',
        destination: 'http://localhost:5000/api/leads/:path*',
      },
      {
        source: '/api/leads',
        destination: 'http://localhost:5000/api/leads',
      },
    ];
  },
};

export default nextConfig;
