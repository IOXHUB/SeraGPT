import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // COMPLETELY DISABLED - ALL AUTH HANDLED CLIENT-SIDE
  console.log('Middleware: Allowing all requests through, path:', request.nextUrl.pathname);
  return
}

export const config = {
  matcher: [],
}
