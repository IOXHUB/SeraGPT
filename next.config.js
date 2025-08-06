/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    domains: ['cdn.builder.io'],
    unoptimized: false
  },

  // No trailing slash for standard deployment
  trailingSlash: false,

  // Experimental features
  experimental: {
    // Turbopack compatible experimental features only
  },
  
  // Base path if needed (keep empty for root domain)
  basePath: '',
  
  // Asset prefix for CDN (keep empty for same domain)
  assetPrefix: '',
  
  // Environment variables that should be available in the browser
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
  },
  
  // Webpack configuration for better builds
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // HMR optimization for development
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**']
      };

      // Improved HMR reliability
      config.output.hotUpdateChunkFilename = 'static/webpack/[id].[fullhash].hot-update.js';
      config.output.hotUpdateMainFilename = 'static/webpack/[fullhash].hot-update.json';

      // Better error handling for fetch failures
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic'
      };

      // Prevent fetch issues in HMR
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };

      // Improve HMR connection reliability
      config.devServer = {
        ...config.devServer,
        hot: true,
        liveReload: false
      };
    }

    // Important: return the modified config
    return config;
  },
  
  // Performance and optimization
  poweredByHeader: false,
  
  // Compression
  compress: true,
  
  // React strict mode - disabled in dev to reduce hydration warnings from browser extensions
  reactStrictMode: false,
  
  // SWC minification (faster than Terser)
  swcMinify: true,
}

module.exports = nextConfig;
