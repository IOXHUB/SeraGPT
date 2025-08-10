'use client';

import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

export default function SimpleLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const supabase = getSupabaseClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    console.log('=== SIMPLE LOGIN ATTEMPT ===');
    console.log('Email:', email);
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Login result:', { data, error });

      if (error) {
        setMessage(`❌ HATA: ${error.message}`);
        console.error('Login error:', error);
      } else if (data?.user) {
        setMessage('✅ GİRİŞ BAŞARILI! Dashboard\'a gidiliyor...');
        console.log('Login successful, user:', data.user.email);
        
        // Immediate hard redirect
        setTimeout(() => {
          console.log('HARD REDIRECT TO DASHBOARD');
          window.location.replace('/dashboard');
        }, 1000);
      } else {
        setMessage('❌ Bilinmeyen hata');
      }
    } catch (err: any) {
      console.error('Exception:', err);
      setMessage(`❌ Exception: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Simple Login Test</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        
        {message && (
          <div className={`mt-4 p-3 rounded ${
            message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}
        
        <div className="mt-6 text-xs text-gray-500">
          <p>Debug Info:</p>
          <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING'}</p>
          <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING'}</p>
        </div>
        
        <div className="mt-4 text-center">
          <a href="/auth/login" className="text-blue-600 hover:underline">
            ← Normal login sayfasına dön
          </a>
        </div>
      </div>
    </div>
  );
}
