import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('Auth callback received:', { code: !!code, origin, next })

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
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch (error) {
              console.error('Cookie setting error:', error)
            }
          },
        },
      }
    )

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      console.log('Code exchange result:', { success: !error, error: error?.message, user: !!data?.user })

      if (!error && data?.user) {
        console.log('Auth successful, redirecting to:', next)
        const response = NextResponse.redirect(`${origin}${next}`)
        return response
      } else {
        console.error('Auth code exchange failed:', error?.message)
        return NextResponse.redirect(`${origin}/auth/login?error=auth_code_error&message=${encodeURIComponent(error?.message || 'Unknown error')}`)
      }
    } catch (exchangeError) {
      console.error('Auth exchange exception:', exchangeError)
      return NextResponse.redirect(`${origin}/auth/login?error=auth_code_error&message=${encodeURIComponent('Authentication failed')}`)
    }
  }

  console.log('No auth code provided')
  // return the user to login if no code
  return NextResponse.redirect(`${origin}/auth/login?error=missing_code`)
}
