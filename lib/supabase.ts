import { createClient } from '@supabase/supabase-js'

// Get environment variables safely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Build-safe fallbacks that won't trigger network requests
const defaultUrl = 'https://localhost:54321'  // Local Supabase default
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTIwMDB9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

// Safe URL and key selection
const url = (supabaseUrl &&
             supabaseUrl !== 'undefined' &&
             supabaseUrl !== 'your-supabase-url' &&
             supabaseUrl.includes('supabase.co'))
  ? supabaseUrl
  : defaultUrl

const key = (supabaseAnonKey &&
             supabaseAnonKey !== 'undefined' &&
             supabaseAnonKey !== 'your-supabase-anon-key' &&
             supabaseAnonKey.length > 100)
  ? supabaseAnonKey
  : defaultKey

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl &&
           supabaseAnonKey &&
           supabaseUrl !== 'undefined' &&
           supabaseAnonKey !== 'undefined' &&
           supabaseUrl !== 'your-supabase-url' &&
           supabaseAnonKey !== 'your-supabase-anon-key' &&
           supabaseUrl.includes('supabase.co'))
}

// Build-time check - don't create client during build if variables are missing
const isBuildTime = typeof window === 'undefined' && process.env.NODE_ENV !== 'development'

// Lazy initialization to prevent build-time errors
let _supabaseClient: any = null;

const createSupabaseClient = () => {
  if (!_supabaseClient) {
    const shouldCreateClient = !isBuildTime || isSupabaseConfigured()

    if (shouldCreateClient) {
      _supabaseClient = createClient(url, key, {
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
      })
    } else {
      _supabaseClient = null
    }
  }
  return _supabaseClient
}

// Export client getter instead of direct instance
export const supabase = createSupabaseClient()

// Export a safe version that handles null client
export const getSupabaseClient = () => {
  const client = createSupabaseClient()
  if (!client) {
    console.warn('Supabase client not initialized - using mock client')
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      }
    } as any
  }
  return client
}
