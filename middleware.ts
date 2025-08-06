import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Temporarily disable middleware to debug auth issues
  // All auth will be handled client-side
  console.log('Middleware disabled for debugging. Path:', request.nextUrl.pathname);
  return
}

export const config = {
  matcher: [
    // Temporarily disable all middleware matching
    // '/dashboard/:path*',
    // '/admin/:path*',
  ],
}
