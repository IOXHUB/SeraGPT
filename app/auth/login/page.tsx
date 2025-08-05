'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!isSupabaseConfigured()) {
      setMessage('Authentication service not configured');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setMessage('Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!isSupabaseConfigured()) {
      setMessage('Authentication service not configured');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage('E-posta adresinizi kontrol edin ve doğrulama linkine tıklayın.');
      }
    } catch (error) {
      setMessage('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Demo login function for development
  const handleDemoLogin = (userType: 'demo' | 'admin') => {
    setLoading(true);
    setMessage('');

    // Create mock user session in localStorage
    const mockUser = {
      id: userType === 'admin' ? 'admin-123' : 'demo-456',
      email: userType === 'admin' ? 'admin@seragpt.com' : 'demo@seragpt.com',
      user_metadata: {
        full_name: userType === 'admin' ? 'Admin Kullanıcı' : 'Demo Kullanıcı',
        role: userType
      }
    };

    // Store mock session
    localStorage.setItem('mockUserSession', JSON.stringify(mockUser));

    setMessage(`${userType === 'admin' ? 'Admin' : 'Demo'} kullanıcı olarak giriş yapıldı`);

    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-12 w-48 bg-gray-200 rounded mx-auto mb-6"></div>
          <div className="space-y-4 w-80">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-auto">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800" 
              alt="SeraGPT Logo" 
              className="h-12 w-auto mx-auto"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            SeraGPT'ye Giriş Yapın
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sera yatırım analizlerinize erişin
          </p>
        </div>

        <form className="mt-8 space-y-6" suppressHydrationWarning>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="ornek@email.com"
                suppressHydrationWarning
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Şifreniz"
                suppressHydrationWarning
              />
            </div>
          </div>

          {message && (
            <div className={`text-sm text-center ${message.includes('kontrol') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              onClick={handleSignIn}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
            
            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Kayıt olunuyor...' : 'Yeni Hesap Oluştur'}
            </button>
          </div>
        </form>

        {/* Demo Login Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-gray-700">Demo Giriş (Geliştirme)</p>
            <p className="text-xs text-gray-500">Şifresiz hızlı giriş</p>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('demo')}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              👤 Demo Kullanıcı Girişi
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-purple-300 text-sm font-medium rounded-md text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              👑 Admin Girişi
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            <a href="/" className="font-medium text-green-600 hover:text-green-500">
              ← Ana sayfaya dön
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
