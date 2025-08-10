'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

export default function AuthDebugPage() {
  const { user, loading } = useAuth();
  const [session, setSession] = useState<any>(null);
  const [rawAuthData, setRawAuthData] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('Debug session check:', { session, error });
        setSession(session);

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        console.log('Debug user check:', { user, userError });
        setRawAuthData({ user, error: userError });
      } catch (error) {
        console.error('Debug auth check failed:', error);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* useAuth Hook Data */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">useAuth Hook</h2>
            <div className="space-y-2">
              <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
              <p><strong>User:</strong> {user ? 'Authenticated' : 'Not authenticated'}</p>
              {user && (
                <div className="mt-4 p-4 bg-green-50 rounded">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Email Confirmed:</strong> {user.email_confirmed_at ? 'Yes' : 'No'}</p>
                  <p><strong>Created:</strong> {user.created_at}</p>
                  <p><strong>Role:</strong> {user.user_metadata?.role || 'None'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Raw Session Data */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Raw Session</h2>
            <div className="space-y-2">
              <p><strong>Session Exists:</strong> {session ? 'true' : 'false'}</p>
              {session && (
                <div className="mt-4 p-4 bg-blue-50 rounded">
                  <p><strong>Access Token:</strong> {session.access_token ? 'Present' : 'Missing'}</p>
                  <p><strong>Refresh Token:</strong> {session.refresh_token ? 'Present' : 'Missing'}</p>
                  <p><strong>Expires:</strong> {session.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'Unknown'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Raw User Data */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Raw User Data</h2>
            <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(rawAuthData, null, 2)}
            </pre>
          </div>

          {/* Environment Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Environment</h2>
            <div className="space-y-2">
              <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing'}</p>
              <p><strong>Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'}</p>
              <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
          <a
            href="/auth/login"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Go to Login
          </a>
          <a
            href="/dashboard"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
