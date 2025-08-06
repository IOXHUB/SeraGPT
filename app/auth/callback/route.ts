import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    try {
      // For now, just redirect to dashboard since we're using demo auth
      return NextResponse.redirect(`${origin}${next}`)
    } catch (error) {
      console.error('Auth callback error:', error)
    }
  }

  // return the user to login page
  return NextResponse.redirect(`${origin}/auth/login`)
}
