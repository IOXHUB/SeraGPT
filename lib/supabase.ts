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
    detectSessionInUrl: typeof window !== 'undefined',
    // Use PKCE flow for better security with proper callback
    flowType: 'pkce',
    // Ensure proper storage and session detection
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'supabase.auth.token'
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  // Add fetch configuration for better error handling
  // fetch: (url: RequestInfo | URL, options: RequestInit = {}) => {
  //   return fetch(url, {
  //     ...options,
  //     headers: {
  //       ...options.headers,
  //       'Content-Type': 'application/json',
  //     },
  //   }).catch((error) => {
  //     console.error('Supabase fetch error:', error);
  //     throw new Error(`Network error: ${error.message}`);
  //   });
  // }
})

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey &&
           supabaseUrl !== defaultUrl &&
           supabaseAnonKey !== defaultKey)
}
