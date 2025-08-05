import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fallback values for build time when env vars might not be available
const defaultUrl = 'https://placeholder.supabase.co'
const defaultKey = 'placeholder-anon-key'

export const supabase = createClient(
  supabaseUrl || defaultUrl,
  supabaseAnonKey || defaultKey
)

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey &&
           supabaseUrl !== defaultUrl &&
           supabaseAnonKey !== defaultKey)
}
