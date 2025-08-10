import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Force this to run in Node.js runtime, not Edge Runtime
export const runtime = 'nodejs'

export function createClient() {
  const cookieStore = cookies()

  // Use fallback values during build time
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

  return createServerClient(
    url,
    key,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Use fallback values during build time
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    console.log('Middleware auth check:', {
      path: request.nextUrl.pathname,
      hasUser: !!user,
      userEmail: user?.email,
      error: error?.message
    })

    // Only redirect on very specific protected paths, and be less aggressive
    const protectedPaths = ['/dashboard', '/admin'];
    const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname === path);

    if (!user && isProtectedPath) {
      console.log('Redirecting unauthenticated user to login from:', request.nextUrl.pathname)
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return response
  } catch (error) {
    console.error('Middleware auth error:', error)
    // Be very conservative with error redirects
    if (request.nextUrl.pathname === '/dashboard' || request.nextUrl.pathname === '/admin') {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    return response
  }
}
