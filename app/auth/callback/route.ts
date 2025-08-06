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

        // Return a page with JavaScript redirect to main dashboard
        const redirectUrl = `${origin}/dashboard`
        console.log('Will redirect to main dashboard:', redirectUrl)

        return new NextResponse(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Redirecting...</title>
            <meta charset="utf-8">
          </head>
          <body>
            <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui;">
              <div style="text-align: center;">
                <h2>✅ E-posta doğrulandı!</h2>
                <p>Dashboard'a yönlendiriliyorsunuz...</p>
                <div style="margin: 20px 0;">
                  <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 0 auto;"></div>
                </div>
              </div>
            </div>
            <style>
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            </style>
            <script>
              console.log('Email verification successful, redirecting to dashboard...');
              setTimeout(function() {
                window.location.replace('${redirectUrl}');
              }, 2000);
            </script>
          </body>
          </html>
        `, {
          status: 200,
          headers: { 'Content-Type': 'text/html' }
        })
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
