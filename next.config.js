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

  // Performance and optimization
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,

  // Build settings for production
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-project.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW8tcHJvamVjdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQ1MTkyMDAwLCJleHAiOjE5NjA3NjgwMDB9.fake-demo-key-for-development',
  },

  // Basic experimental features
  experimental: {
    optimizePackageImports: ['framer-motion', '@supabase/supabase-js'],
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
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

  // Skip static optimization for auth-dependent routes
  async rewrites() {
    return [
      // Force all auth and dashboard routes to be server-side rendered
      {
        source: '/dashboard/:path*',
        destination: '/dashboard/:path*',
      },
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
      {
        source: '/auth/:path*',
        destination: '/auth/:path*',
      },
    ];
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
