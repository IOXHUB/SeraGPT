/**
 * Cache Headers Middleware for SeraGPT
 * Optimizes static asset caching and API response headers
 */

import { NextRequest, NextResponse } from 'next/server';

export interface CacheConfig {
  maxAge: number; // seconds
  sMaxAge?: number; // seconds (CDN cache)
  staleWhileRevalidate?: number; // seconds
  mustRevalidate?: boolean;
  noCache?: boolean;
  noStore?: boolean;
  public?: boolean;
  private?: boolean;
  immutable?: boolean;
}

export const CACHE_CONFIGS = {
  // Static assets - Long term caching
  STATIC_ASSETS: {
    maxAge: 31536000, // 1 year
    sMaxAge: 31536000,
    public: true,
    immutable: true
  },
  
  // Images - Medium term with revalidation
  IMAGES: {
    maxAge: 2592000, // 30 days
    sMaxAge: 7776000, // 90 days
    staleWhileRevalidate: 86400, // 1 day
    public: true
  },
  
  // API responses - Short term with background refresh
  API_RESPONSES: {
    maxAge: 300, // 5 minutes
    sMaxAge: 900, // 15 minutes
    staleWhileRevalidate: 1800, // 30 minutes
    public: false,
    private: true
  },
  
  // Analysis APIs - Longer caching due to computation cost
  ANALYSIS_API: {
    maxAge: 3600, // 1 hour
    sMaxAge: 7200, // 2 hours
    staleWhileRevalidate: 3600, // 1 hour
    public: false,
    private: true
  },
  
  // User data - No caching for security
  USER_DATA: {
    maxAge: 0,
    noCache: true,
    noStore: true,
    mustRevalidate: true,
    private: true
  },
  
  // Blog and static content - Medium term
  BLOG_CONTENT: {
    maxAge: 3600, // 1 hour
    sMaxAge: 86400, // 1 day
    staleWhileRevalidate: 43200, // 12 hours
    public: true
  },
  
  // Market data - Short term due to volatility
  MARKET_DATA: {
    maxAge: 900, // 15 minutes
    sMaxAge: 1800, // 30 minutes
    staleWhileRevalidate: 3600, // 1 hour
    public: true
  }
} as const;

export function generateCacheHeader(config: CacheConfig): string {
  const directives: string[] = [];

  if (config.noCache) {
    directives.push('no-cache');
  }
  
  if (config.noStore) {
    directives.push('no-store');
  }
  
  if (config.mustRevalidate) {
    directives.push('must-revalidate');
  }
  
  if (config.public) {
    directives.push('public');
  }
  
  if (config.private) {
    directives.push('private');
  }
  
  if (config.immutable) {
    directives.push('immutable');
  }
  
  if (config.maxAge !== undefined) {
    directives.push(`max-age=${config.maxAge}`);
  }
  
  if (config.sMaxAge !== undefined) {
    directives.push(`s-maxage=${config.sMaxAge}`);
  }
  
  if (config.staleWhileRevalidate !== undefined) {
    directives.push(`stale-while-revalidate=${config.staleWhileRevalidate}`);
  }

  return directives.join(', ');
}

export function applyCacheHeaders(request: NextRequest, response: NextResponse): NextResponse {
  const { pathname } = request.nextUrl;
  
  // Static assets (JS, CSS, fonts, etc.)
  if (pathname.match(/\.(js|css|woff2?|eot|ttf|otf|ico|svg)$/)) {
    const cacheHeader = generateCacheHeader(CACHE_CONFIGS.STATIC_ASSETS);
    response.headers.set('Cache-Control', cacheHeader);
    response.headers.set('Expires', new Date(Date.now() + 31536000000).toUTCString());
    return response;
  }
  
  // Images
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|bmp)$/)) {
    const cacheHeader = generateCacheHeader(CACHE_CONFIGS.IMAGES);
    response.headers.set('Cache-Control', cacheHeader);
    return response;
  }
  
  // Analysis API endpoints
  if (pathname.startsWith('/api/analysis/')) {
    const cacheHeader = generateCacheHeader(CACHE_CONFIGS.ANALYSIS_API);
    response.headers.set('Cache-Control', cacheHeader);
    response.headers.set('Vary', 'Authorization, Content-Type');
    return response;
  }
  
  // Market data APIs
  if (pathname.includes('market') || pathname.includes('price')) {
    const cacheHeader = generateCacheHeader(CACHE_CONFIGS.MARKET_DATA);
    response.headers.set('Cache-Control', cacheHeader);
    response.headers.set('Vary', 'Authorization');
    return response;
  }
  
  // User data APIs (auth, profile, tokens)
  if (pathname.startsWith('/api/auth/') || pathname.includes('profile') || pathname.includes('token')) {
    const cacheHeader = generateCacheHeader(CACHE_CONFIGS.USER_DATA);
    response.headers.set('Cache-Control', cacheHeader);
    response.headers.set('Pragma', 'no-cache');
    return response;
  }
  
  // Blog content
  if (pathname.startsWith('/blog') || pathname.includes('blog')) {
    const cacheHeader = generateCacheHeader(CACHE_CONFIGS.BLOG_CONTENT);
    response.headers.set('Cache-Control', cacheHeader);
    return response;
  }
  
  // Other API responses
  if (pathname.startsWith('/api/')) {
    const cacheHeader = generateCacheHeader(CACHE_CONFIGS.API_RESPONSES);
    response.headers.set('Cache-Control', cacheHeader);
    response.headers.set('Vary', 'Authorization');
    return response;
  }
  
  // Default for pages - moderate caching
  const defaultConfig: CacheConfig = {
    maxAge: 300, // 5 minutes
    staleWhileRevalidate: 1800, // 30 minutes
    public: true
  };
  
  const cacheHeader = generateCacheHeader(defaultConfig);
  response.headers.set('Cache-Control', cacheHeader);
  
  return response;
}

// ETag generation for cache validation
export function generateETag(content: string | Buffer): string {
  const crypto = require('crypto');
  const hash = crypto.createHash('md5').update(content).digest('hex');
  return `"${hash}"`;
}

// Conditional request handling
export function handleConditionalRequest(
  request: NextRequest,
  response: NextResponse,
  etag: string,
  lastModified?: Date
): NextResponse {
  const ifNoneMatch = request.headers.get('If-None-Match');
  const ifModifiedSince = request.headers.get('If-Modified-Since');
  
  // Check ETag
  if (ifNoneMatch === etag) {
    return new NextResponse(null, { status: 304 });
  }
  
  // Check Last-Modified
  if (lastModified && ifModifiedSince) {
    const modifiedSince = new Date(ifModifiedSince);
    if (lastModified <= modifiedSince) {
      return new NextResponse(null, { status: 304 });
    }
  }
  
  // Set cache validation headers
  response.headers.set('ETag', etag);
  if (lastModified) {
    response.headers.set('Last-Modified', lastModified.toUTCString());
  }
  
  return response;
}

// Compression headers
export function addCompressionHeaders(response: NextResponse, acceptEncoding?: string): NextResponse {
  if (!acceptEncoding) return response;
  
  if (acceptEncoding.includes('br')) {
    response.headers.set('Content-Encoding', 'br');
  } else if (acceptEncoding.includes('gzip')) {
    response.headers.set('Content-Encoding', 'gzip');
  }
  
  response.headers.set('Vary', 'Accept-Encoding');
  
  return response;
}

// Security headers that work with caching
export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https://cdn.builder.io; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
  );
  
  // Other security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}
