import { updateSession } from '@/lib/auth'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Simple middleware - only for protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/admin')) {

    console.log('Middleware checking auth for:', request.nextUrl.pathname);
    return await updateSession(request)
  }

  return
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
  ],
}
