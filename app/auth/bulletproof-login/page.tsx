'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function BulletproofLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    console.log('🚀 BULLETPROOF LOGIN STARTED');
    console.log('Email:', email);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Login response:', { data, error });

      if (error) {
        setMessage(`❌ HATA: ${error.message}`);
        console.error('Login failed:', error);
      } else if (data?.user && data?.session) {
        console.log('✅ LOGIN SUCCESS - User and session found');
        
        // Store user info in localStorage as backup
        localStorage.setItem('seragpt_user', JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          loginTime: new Date().toISOString()
        }));
        
        setMessage('✅ GİRİŞ BAŞARILI! Dashboard\'a yönlendiriliyorsunuz...');
        
        // Immediate hard redirect - no delays, no checks
        console.log('🎯 IMMEDIATE REDIRECT TO BULLETPROOF DASHBOARD');
        setTimeout(() => {
          window.location.href = '/dashboard/bulletproof-success';
        }, 1000);
        
      } else {
        setMessage('❌ Giriş bilgileri doğru değil');
        console.error('No user or session in response');
      }
    } catch (err: any) {
      console.error('Exception during login:', err);
      setMessage(`❌ Sistem hatası: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800" 
            alt="SeraGPT Logo" 
            className="h-16 w-auto mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔧 Bulletproof Login
          </h1>
          <p className="text-gray-600">
            Bu sefer kesinlikle çalışacak!
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta Adresi
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ornek@email.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Şifreniz"
                required
              />
            </div>

            {message && (
              <div className={`p-4 rounded-lg text-sm text-center ${
                message.includes('✅') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Giriş yapılıyor...
                </div>
              ) : (
                '🚀 BULLETPROOF GİRİŞ'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/auth/login" className="text-blue-600 hover:underline text-sm">
              ← Normal login sayfasına dön
            </a>
          </div>

          <div className="mt-6 text-xs text-gray-500 p-3 bg-gray-50 rounded">
            <p><strong>Debug:</strong></p>
            <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ SET' : '❌ MISSING'}</p>
            <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ SET' : '❌ MISSING'}</p>
            <p>Bu login sayfası session'ı localStorage'a da kaydeder.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
