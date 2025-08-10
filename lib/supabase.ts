import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Production-safe fallbacks that won't cause network requests during build
const defaultUrl = 'https://build-placeholder.local'
const defaultKey = 'build-placeholder-key'

// Only use real values if they're properly set, otherwise use safe defaults
const url = (supabaseUrl && supabaseUrl !== 'undefined' && !supabaseUrl.includes('placeholder'))
  ? supabaseUrl
  : defaultUrl
const key = (supabaseAnonKey && supabaseAnonKey !== 'undefined' && !supabaseAnonKey.includes('placeholder'))
  ? supabaseAnonKey
  : defaultKey

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
