/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Netlify
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },

  // Add trailing slash for static export
  trailingSlash: true,

  // Base path if needed (keep empty for root domain)
  basePath: '',
  
  // Disable server-side features for static export
  poweredByHeader: false,
  
  // React strict mode
  reactStrictMode: false,
  
  // SWC minification
  swcMinify: true,
}

module.exports = nextConfig;
