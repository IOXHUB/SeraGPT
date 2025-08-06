'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function SupabaseDebugPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test: string, result: any) => {
    setResults(prev => [...prev, { test, result, timestamp: new Date().toISOString() }]);
  };

  const testSupabaseConnection = async () => {
    setLoading(true);
    setResults([]);

    try {
      // Test 1: Environment variables
      addResult('Environment Variables', {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'Missing',
        keyExists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        keyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...'
      });

      // Test 2: Client creation
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      addResult('Client Creation', { success: true });

      // Test 3: Health check
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
          }
        });
        addResult('REST API Health', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        });
      } catch (error: any) {
        addResult('REST API Health', { error: error.message });
      }

      // Test 4: Auth endpoint
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings`, {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
          }
        });
        const authSettings = await response.json();
        addResult('Auth Settings', {
          status: response.status,
          settings: authSettings
        });
      } catch (error: any) {
        addResult('Auth Settings', { error: error.message });
      }

      // Test 5: Simple auth test (invalid login)
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'test@nonexistent.com',
          password: 'wrongpassword'
        });
        addResult('Auth Test (Invalid)', {
          success: !error,
          error: error?.message,
          data: !!data
        });
      } catch (error: any) {
        addResult('Auth Test (Invalid)', { exception: error.message });
      }

      // Test 6: Get session
      try {
        const { data, error } = await supabase.auth.getSession();
        addResult('Get Session', {
          hasSession: !!data.session,
          error: error?.message
        });
      } catch (error: any) {
        addResult('Get Session', { exception: error.message });
      }

    } catch (error: any) {
      addResult('General Error', { exception: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testSpecificLogin = async () => {
    setLoading(true);
    const email = 'info@isitmax.com';
    const password = 'Ev30082023-.-';

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      addResult('Testing Specific Login', { email, passwordLength: password.length });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      addResult('Login Result', {
        success: !error,
        error: error?.message,
        errorCode: error?.status,
        hasUser: !!data?.user,
        hasSession: !!data?.session,
        user: data?.user ? {
          id: data.user.id,
          email: data.user.email,
          emailConfirmed: !!data.user.email_confirmed_at,
          metadata: data.user.user_metadata
        } : null
      });

    } catch (error: any) {
      addResult('Login Exception', { 
        message: error.message,
        name: error.name,
        stack: error.stack?.split('\n').slice(0, 3)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-center mb-8">🔧 Supabase Auth Debug</h1>
          
          <div className="space-y-4 mb-8">
            <button
              onClick={testSupabaseConnection}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              🔍 Full Supabase Diagnostics
            </button>
            
            <button
              onClick={testSpecificLogin}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              🔑 Test Admin Login (info@isitmax.com)
            </button>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Testing Supabase...</p>
            </div>
          )}

          <div className="space-y-6">
            {results.map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{result.test}</h3>
                  <span className="text-xs text-gray-500">{new Date(result.timestamp).toLocaleTimeString()}</span>
                </div>
                <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto">
                  {JSON.stringify(result.result, null, 2)}
                </pre>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center space-x-4">
            <a href="/auth/login" className="text-blue-600 hover:underline">
              ← Login Page
            </a>
            <a href="/admin/setup" className="text-purple-600 hover:underline">
              Admin Setup →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
