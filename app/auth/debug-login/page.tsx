'use client';

import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

export default function DebugLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [debugInfo, setDebugInfo] = useState<any>({});

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createBrowserClient(
    supabaseUrl!,
    supabaseKey!
  );

  const testConnection = async () => {
    setLoading(true);
    setMessage('Testing Supabase connection...');
    
    try {
      // Test basic connection
      const { data, error } = await supabase.auth.getSession();
      
      setDebugInfo({
        connectionTest: {
          success: !error,
          error: error?.message,
          hasData: !!data
        },
        environment: {
          url: supabaseUrl,
          hasKey: !!supabaseKey,
          keyPreview: supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'MISSING'
        },
        client: {
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
          supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...'
        }
      });
      
      if (error) {
        setMessage(`❌ Connection failed: ${error.message}`);
      } else {
        setMessage('✅ Connection successful!');
      }
    } catch (err: any) {
      setMessage(`❌ Connection error: ${err.message}`);
      setDebugInfo({
        error: err.message,
        stack: err.stack
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    console.log('=== DEBUG LOGIN ATTEMPT ===');
    console.log('Supabase URL:', supabaseUrl);
    console.log('Has Key:', !!supabaseKey);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Login result:', { data, error });

      setDebugInfo({
        loginAttempt: {
          email,
          hasPassword: !!password,
          success: !error,
          error: error?.message,
          userData: data?.user ? {
            id: data.user.id,
            email: data.user.email
          } : null
        }
      });

      if (error) {
        setMessage(`❌ Login failed: ${error.message}`);
      } else {
        setMessage('✅ Login successful!');
      }
    } catch (err: any) {
      console.error('Login exception:', err);
      setMessage(`❌ Login exception: ${err.message}`);
      setDebugInfo({
        exception: {
          message: err.message,
          stack: err.stack,
          name: err.name
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">🔧 Supabase Debug Login</h1>
          
          {/* Environment Check */}
          <div className="mb-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Environment Variables:</h3>
            <div className="text-sm space-y-1">
              <p>NEXT_PUBLIC_SUPABASE_URL: {supabaseUrl ? '✅ SET' : '❌ MISSING'}</p>
              <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {supabaseKey ? '✅ SET' : '❌ MISSING'}</p>
              {supabaseUrl && <p className="text-xs text-gray-600">URL: {supabaseUrl}</p>}
              {supabaseKey && <p className="text-xs text-gray-600">Key: {supabaseKey.substring(0, 20)}...</p>}
            </div>
          </div>

          {/* Connection Test */}
          <div className="mb-6">
            <button
              onClick={testConnection}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              Test Supabase Connection
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="test@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="password"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Login'}
            </button>
          </form>

          {/* Message */}
          {message && (
            <div className={`mt-4 p-3 rounded ${
              message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}

          {/* Debug Info */}
          {Object.keys(debugInfo).length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Debug Information:</h3>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 text-center space-x-4">
            <a href="/auth/login" className="text-blue-600 hover:underline">
              ← Back to Login
            </a>
            <a href="/dashboard" className="text-green-600 hover:underline">
              Go to Dashboard →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
