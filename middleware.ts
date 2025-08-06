import { updateSession } from '@/lib/auth'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Only run auth middleware on protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/admin')) {

    console.log('Middleware checking auth for:', request.nextUrl.pathname);
    return await updateSession(request)
  }

  // Let other routes pass through without auth
  return
}

export const config = {
  matcher: [
    /*
     * Match only protected routes that need authentication
     * - /dashboard (user dashboard)
     * - /admin (admin pages)
     */
    '/dashboard/:path*',
    '/admin/:path*',
  ],
}
