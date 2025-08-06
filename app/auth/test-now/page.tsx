'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestAuthPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    setMessage('Testing login...');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'test123'
      });
      
      console.log('Test login result:', { data, error });
      setMessage(`Result: ${error ? `❌ ${error.message}` : `✅ Success - User: ${data?.user?.email}`}`);
    } catch (err: any) {
      setMessage(`❌ Exception: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testSignup = async () => {
    setLoading(true);
    setMessage('Testing signup...');
    
    try {
      const redirectUrl = `${window.location.origin}/auth/callback`;
      console.log('Using redirect URL:', redirectUrl);
      
      const { data, error } = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'test123',
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      
      console.log('Test signup result:', { data, error, redirectUrl });
      setMessage(`Result: ${error ? `❌ ${error.message}` : `✅ Signup initiated - Check email`}`);
    } catch (err: any) {
      setMessage(`❌ Exception: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('Current session:', { session, error });
      setMessage(`Session: ${session ? `✅ Active - ${session.user?.email}` : '❌ None'}`);
    } catch (err: any) {
      setMessage(`❌ Session check failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔧 Quick Auth Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div className="space-y-2">
            <button
              onClick={testLogin}
              disabled={loading}
              className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Test Login (test@example.com)
            </button>
            
            <button
              onClick={testSignup}
              disabled={loading}
              className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Test Signup (test@example.com)
            </button>
            
            <button
              onClick={checkSession}
              disabled={loading}
              className="w-full p-3 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            >
              Check Current Session
            </button>
          </div>
          
          {message && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-sm">{message}</p>
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-600">
            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
            <p><strong>Expected callback:</strong> {typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : 'SSR'}</p>
          </div>
          
          <div className="mt-4 space-x-2">
            <a href="/auth/login" className="inline-block bg-gray-600 text-white px-4 py-2 rounded">
              → Login Page
            </a>
            <a href="/auth/debug" className="inline-block bg-gray-600 text-white px-4 py-2 rounded">
              → Debug Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
