/** @type {import('next').NextConfig} */
const nextConfig = {
  // Advanced image optimization settings
  images: {
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
        port: '',
        pathname: '/**',
      }
    ],
    // AVIF first for best compression, fallback to WebP, then JPEG/PNG
    formats: ['image/avif', 'image/webp'],
    // Optimized quality settings
    quality: 85,
    // Comprehensive device sizes for responsive images
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
    // Additional image sizes for thumbnails and icons
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384, 512],
    // Extended cache TTL for better performance
    minimumCacheTTL: 31536000, // 1 year
    // Security settings
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    // Enable image optimization
    loader: 'default',
    // Additional optimization
    loaderFile: undefined
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
    // Development-only optimizations
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**']
      };

      // Improved HMR reliability - DEV ONLY
      config.output.hotUpdateChunkFilename = 'static/webpack/[id].[fullhash].hot-update.js';
      config.output.hotUpdateMainFilename = 'static/webpack/[fullhash].hot-update.json';

      // Prevent fetch issues in HMR
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Production optimizations
    if (!dev) {
      // Simple production optimizations
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic'
      };

      // Remove any HMR plugins in production
      config.plugins = config.plugins.filter(plugin =>
        !plugin.constructor.name.includes('HotModuleReplacementPlugin')
      );
    }

    // Better error handling for all environments
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      chunkIds: 'deterministic'
    };

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
