import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/auth'

// =====================================================
// PRODUCTION MIDDLEWARE WITH SECURITY ENABLED
// =====================================================
// Authentication and route protection active
// =====================================================

export async function middleware(request: NextRequest) {
  const startTime = Date.now()
  const { pathname } = request.nextUrl
  const clientIP = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1'

  console.log(`🔒 [SECURITY] ${request.method} ${pathname} from ${clientIP}`)

  try {
    // Enable auth protection for protected routes
    const response = await updateSession(request)
    
    // Add security headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Processing-Time', `${Date.now() - startTime}ms`)

    const processingTime = Date.now() - startTime
    console.log(`✅ [SECURITY] Request completed in ${processingTime}ms`)

    return response

  } catch (error) {
    console.error(`❌ [SECURITY] Middleware error for ${pathname}:`, error)

    // On auth error, redirect to login
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next()
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
