import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('Auth callback received:', {
    code: !!code,
    error,
    errorDescription,
    origin,
    next,
    fullUrl: request.url,
    searchParams: Object.fromEntries(searchParams.entries())
  })

  // Handle OAuth errors first
  if (error) {
    console.error('OAuth error received:', { error, errorDescription })
    return NextResponse.redirect(`${origin}/auth/login?error=oauth_error&message=${encodeURIComponent(errorDescription || error)}`)
  }

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options)
              })
            } catch (error) {
              console.error('Cookie setting error:', error)
            }
          },
        },
      }
    )

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      console.log('Code exchange result:', {
        success: !error,
        error: error?.message,
        user: !!data?.user,
        session: !!data?.session,
        sessionId: data?.session?.access_token?.substring(0, 20) + '...'
      })

      if (!error && data?.session && data?.user) {
        console.log('Auth successful for user:', data.user.email)

        // Force a slight delay to ensure session is properly set
        await new Promise(resolve => setTimeout(resolve, 100))

        // Create response with proper redirect
        const redirectUrl = `${origin}${next}`
        console.log('Redirecting authenticated user to:', redirectUrl)

        const response = NextResponse.redirect(redirectUrl)

        // Ensure all session cookies are properly forwarded
        const allCookies = cookieStore.getAll()
        console.log('Setting', allCookies.length, 'cookies for session')
        allCookies.forEach(cookie => {
          response.cookies.set(cookie.name, cookie.value, {
            path: cookie.path,
            domain: cookie.domain,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            sameSite: cookie.sameSite as any,
            maxAge: cookie.maxAge
          })
        })

        return response
      } else {
        console.error('Auth code exchange failed:', {
          error: error?.message,
          hasUser: !!data?.user,
          hasSession: !!data?.session
        })
        return NextResponse.redirect(`${origin}/auth/login?error=auth_code_error&message=${encodeURIComponent(error?.message || 'Code exchange failed')}`)
      }
    } catch (exchangeError: any) {
      console.error('Auth exchange exception:', exchangeError)
      return NextResponse.redirect(`${origin}/auth/login?error=auth_code_error&message=${encodeURIComponent(exchangeError?.message || 'Authentication failed')}`)
    }
  }

  console.log('No auth code provided, redirecting to login')
  return NextResponse.redirect(`${origin}/auth/login?error=missing_code&message=${encodeURIComponent('No authentication code provided')}`)
}
