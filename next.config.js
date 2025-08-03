/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Netlify deployment - keep standard build
  // output: 'export', // Disabled for auth support

  // Image optimization settings
  images: {
    domains: ['cdn.builder.io'],
    unoptimized: false
  },

  // No trailing slash for standard deployment
  trailingSlash: false,
  
  // Base path if needed (keep empty for root domain)
  basePath: '',
  
  // Asset prefix for CDN (keep empty for same domain)
  assetPrefix: '',
  
  // Disable server-side features for static export
  experimental: {
    // Disable features that require server
  },
  
  // Environment variables that should be available in the browser
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  
  // Webpack configuration for better builds
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config;
  },
  
  // Performance and optimization
  poweredByHeader: false,
  
  // Compression
  compress: true,
  
  // React strict mode
  reactStrictMode: true,
  
  // SWC minification (faster than Terser)
  swcMinify: true,
}

module.exports = nextConfig;
