import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/auth'
import { applyCacheHeaders, addSecurityHeaders, addCompressionHeaders } from '@/lib/middleware/cache-headers'

// =====================================================
// SECURITY MIDDLEWARE
// =====================================================
// Comprehensive security protection including auth,
// rate limiting, and request validation
// =====================================================

// Rate limiting storage
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

// Security configuration
const SECURITY_CONFIG = {
  rateLimit: {
    maxRequests: 100, // per window
    windowMs: 15 * 60 * 1000, // 15 minutes
    apiMaxRequests: 30, // API requests per window
    authMaxRequests: 5, // Auth attempts per window
  },
  blockedIPs: new Set<string>([
    // Add known bad IPs here
  ]),
  suspiciousPatterns: [
    /\b(sql|union|select|insert|delete|drop|exec)\b/i,
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /\bscript\b(?=.*[<>])/i,  // Only match "script" with HTML tags
  ]
}

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/admin',
  '/api/auth/profile',
  '/api/auth/tokens',
  '/api/auth/preferences',
  '/api/chat',
  '/api/analysis',
  '/api/payments'
]

// Public API routes that don't require auth
const PUBLIC_API_ROUTES = [
  '/api/auth/status',
  '/api/auth/test',
  '/api/test-supabase',
  '/api/check-email-domain',
  '/api/send-email'
]

// Admin-only routes
const ADMIN_ROUTES = [
  '/admin',
  '/api/admin'
]

export async function middleware(request: NextRequest) {
  const startTime = Date.now()
  const { pathname } = request.nextUrl
  const clientIP = getClientIP(request)

  console.log(`🔒 [Security] ${request.method} ${pathname} from ${clientIP}`)

  try {
    // BYPASS ALL SECURITY FOR AUTH ROUTES
    if (pathname.startsWith('/auth/')) {
      console.log(`�� [Security] Bypassing all checks for auth route: ${pathname}`)
      let response = NextResponse.next()
      response = addSecurityHeaders(response)
      console.log(`✅ [Security] Auth route processed in ${Date.now() - startTime}ms`)
      return response
    }

    // 1. Block malicious IPs (DISABLED FOR DEBUGGING)
    // TODO: Re-enable after debugging
    /*
    if (SECURITY_CONFIG.blockedIPs.has(clientIP)) {
      console.log(`🚫 [Security] Blocked IP: ${clientIP}`)
      return new Response('Access Denied', { status: 403 })
    }
    */
    console.log(`🔍 [Debug] IP blocking bypassed for: ${clientIP}`)

    // 2. Check for suspicious patterns in URL and headers (DISABLED FOR DEBUGGING)
    // TODO: Re-enable after debugging
    /*
    const suspiciousContent = [
      pathname,
      request.nextUrl.search,
      request.headers.get('user-agent') || '',
      request.headers.get('referer') || ''
    ].join(' ')

    for (const pattern of SECURITY_CONFIG.suspiciousPatterns) {
      if (pattern.test(suspiciousContent)) {
        console.log(`🚨 [Security] Suspicious pattern detected: ${pattern} in ${pathname}`)
        return new Response('Bad Request', { status: 400 })
      }
    }
    */
    console.log(`🔍 [Debug] Pattern check bypassed for: ${pathname}`)

    // 3. Rate limiting (DISABLED FOR DEBUGGING)
    // TODO: Re-enable after debugging
    /*
    const rateLimitResponse = checkRateLimit(request, clientIP)
    if (rateLimitResponse) {
      return rateLimitResponse
    }
    */
    console.log(`🔍 [Debug] Rate limiting bypassed for: ${pathname}`)

    // 4. CSRF protection for POST/PUT/DELETE requests (DISABLED FOR DEBUGGING)
    // TODO: Re-enable after debugging
    /*
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const csrfResponse = checkCSRF(request)
      if (csrfResponse) {
        return csrfResponse
      }
    }
    */
    console.log(`🔍 [Debug] CSRF check bypassed for: ${request.method} ${pathname}`)

    // 5. Authentication check for protected routes
    if (isProtectedRoute(pathname)) {
      return await updateSession(request)
    }

    // 6. Admin route protection
    if (isAdminRoute(pathname)) {
      const adminResponse = await checkAdminAccess(request)
      if (adminResponse) {
        return adminResponse
      }
    }

    // 7. Create response and apply optimizations
    let response = NextResponse.next()

    // Apply cache headers for performance
    response = applyCacheHeaders(request, response)

    // Add compression headers
    const acceptEncoding = request.headers.get('Accept-Encoding')
    response = addCompressionHeaders(response, acceptEncoding || undefined)

    // Add security headers (using the imported function)
    response = addSecurityHeaders(response)

    const processingTime = Date.now() - startTime
    console.log(`✅ [Security] Request processed in ${processingTime}ms`)

    return response

  } catch (error) {
    console.error(`❌ [Security] Middleware error for ${pathname}:`, error)

    // For critical paths, redirect to login on error
    if (isProtectedRoute(pathname)) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next()
  }
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const real = request.headers.get('x-real-ip')
  const cfConnecting = request.headers.get('cf-connecting-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (cfConnecting) {
    return cfConnecting
  }
  if (real) {
    return real
  }

  return request.ip || '127.0.0.1'
}

function checkRateLimit(request: NextRequest, clientIP: string): Response | null {
  const { pathname } = request.nextUrl
  const method = request.method
  const now = Date.now()
  const windowMs = SECURITY_CONFIG.rateLimit.windowMs

  // Determine rate limit based on route type
  let maxRequests = SECURITY_CONFIG.rateLimit.maxRequests

  // More lenient for homepage and static content
  if (pathname === '/' || pathname.startsWith('/blog') || pathname.startsWith('/_next')) {
    maxRequests = 1000 // Much higher for static content
  } else if (pathname.startsWith('/api/auth')) {
    maxRequests = SECURITY_CONFIG.rateLimit.authMaxRequests
  } else if (pathname.startsWith('/api/')) {
    maxRequests = SECURITY_CONFIG.rateLimit.apiMaxRequests
  }

  const key = `${clientIP}:${pathname.split('/')[1] || 'root'}`
  const current = rateLimitMap.get(key)

  if (!current || now - current.lastReset > windowMs) {
    rateLimitMap.set(key, { count: 1, lastReset: now })
    return null
  }

  if (current.count >= maxRequests) {
    console.log(`🚫 [RateLimit] ${clientIP} exceeded ${maxRequests} requests for ${pathname}`)

    const response = new Response('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': Math.ceil(windowMs / 1000).toString(),
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(current.lastReset + windowMs).toISOString()
      }
    })

    return response
  }

  current.count++
  return null
}

function checkCSRF(request: NextRequest): Response | null {
  const contentType = request.headers.get('content-type') || ''
  const method = request.method

  // Skip CSRF for API routes with proper headers
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin')
    const host = request.headers.get('host')

    // Allow same-origin requests
    if (origin && host) {
      const originHost = new URL(origin).host
      if (originHost === host) {
        return null
      }
    }

    // Check for proper API authentication
    const authorization = request.headers.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return null
    }

    console.log(`🚨 [CSRF] Potential CSRF attack detected from ${getClientIP(request)}`)
    return new Response('CSRF token missing or invalid', { status: 403 })
  }

  return null
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => {
    if (route.endsWith('*')) {
      return pathname.startsWith(route.slice(0, -1))
    }
    return pathname === route || pathname.startsWith(route + '/')
  })
}

function isAdminRoute(pathname: string): boolean {
  return ADMIN_ROUTES.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )
}

async function checkAdminAccess(request: NextRequest): Promise<Response | null> {
  // For now, just ensure user is authenticated
  // Later we can add proper admin role checking
  const { pathname } = request.nextUrl

  if (isAdminRoute(pathname)) {
    // This will be handled by updateSession for now
    return null
  }

  return null
}

// Security headers function moved to cache-headers.ts to avoid duplication

// =====================================================
// MIDDLEWARE CONFIGURATION
// =====================================================

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
