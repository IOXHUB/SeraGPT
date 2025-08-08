import { NextRequest, NextResponse } from 'next/server'

// =====================================================
// COMPLETE MIDDLEWARE BYPASS FOR DEBUGGING
// =====================================================
// All security features disabled temporarily
// =====================================================

export async function middleware(request: NextRequest) {
  const startTime = Date.now()
  const { pathname } = request.nextUrl
  const clientIP = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1'

  console.log(`🟢 [BYPASS] ${request.method} ${pathname} from ${clientIP}`)

  try {
    // COMPLETE BYPASS - NO SECURITY CHECKS AT ALL
    console.log(`🚀 [BYPASS] All security completely disabled for: ${pathname}`)
    
    // Just return NextResponse.next() with debug headers
    let response = NextResponse.next()
    
    // Add debug headers to confirm middleware is working
    response.headers.set('X-Debug-Mode', 'true')
    response.headers.set('X-Middleware-Bypass', 'complete')
    response.headers.set('X-Request-Path', pathname)
    response.headers.set('X-Processing-Time', `${Date.now() - startTime}ms`)
    
    const processingTime = Date.now() - startTime
    console.log(`✅ [BYPASS] Request completed in ${processingTime}ms`)

    return response

  } catch (error) {
    console.error(`❌ [BYPASS] Middleware error for ${pathname}:`, error)
    
    // Even on error, just pass through without blocking
    let response = NextResponse.next()
    response.headers.set('X-Error-Bypass', 'true')
    return response
  }
}

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
