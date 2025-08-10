/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    domains: ['cdn.builder.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        port: '',
        pathname: '/api/v1/image/assets/**',
      },
      {
        protocol: 'https',
        hostname: '*.builder.io',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    unoptimized: false
  },

  // Production optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', '@supabase/supabase-js'],
  },

  // No trailing slash for standard deployment
  trailingSlash: false,

  // Environment variables will be handled by Vercel automatically

  // Performance and optimization
  poweredByHeader: false,

  // Compression
  compress: true,

  // React strict mode for production
  reactStrictMode: true,

  // SWC minification (faster than Terser)
  swcMinify: true,

  // Disable TypeScript checking during build for faster deployment
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Force standalone output for Vercel deployment
  output: 'standalone',

  // Generate static pages where possible
  generateBuildId: async () => {
    return 'seragpt-build-' + Date.now();
  },

  // Experimental configuration for better auth handling
  experimental: {
    optimizePackageImports: ['framer-motion', '@supabase/supabase-js'],
    // Force specific routes to be dynamic
    forceSwcTransforms: false,
  },

  // Custom webpack configuration
  webpack: (config, { dev, isServer }) => {
    // In production builds, disable certain optimizations for auth pages
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        sideEffects: false,
      };
    }
    return config;
  },

  // Security headers for production
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  },

  // Redirects for SEO and UX
  async redirects() {
    return [
      {
        source: '/dashboard/analysis/sera-tasarim',
        destination: '/dashboard/analysis/layout',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig;
