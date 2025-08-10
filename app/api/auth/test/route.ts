import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
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
    // Test both session and user
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    const allCookies = cookieStore.getAll()
    const authCookies = allCookies.filter(cookie => 
      cookie.name.includes('supabase') || 
      cookie.name.includes('auth') ||
      cookie.name.includes('token')
    )

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
      },
      session: {
        exists: !!session,
        hasUser: !!session?.user,
        userEmail: session?.user?.email,
        expiresAt: session?.expires_at,
        error: sessionError?.message
      },
      user: {
        exists: !!user,
        email: user?.email,
        emailConfirmed: user?.email_confirmed_at ? true : false,
        lastSignIn: user?.last_sign_in_at,
        error: userError?.message
      },
      cookies: {
        total: allCookies.length,
        authRelated: authCookies.length,
        authCookieNames: authCookies.map(c => c.name)
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Auth test failed',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
