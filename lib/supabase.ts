import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fallback values for build time when env vars might not be available
const defaultUrl = 'https://placeholder.supabase.co'
const defaultKey = 'placeholder-anon-key'

// Use fallback values during build or when env vars are missing
const url = supabaseUrl || defaultUrl
const key = supabaseAnonKey || defaultKey

export const supabase = createClient(url, key, {
  auth: {
    // Disable auto refresh during build/static generation
    autoRefreshToken: typeof window !== 'undefined',
    persistSession: typeof window !== 'undefined',
    detectSessionInUrl: typeof window !== 'undefined'
  }
})

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey &&
           supabaseUrl !== defaultUrl &&
           supabaseAnonKey !== defaultKey)
}
