'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function SimpleDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkUser = async () => {
      console.log('=== CHECKING USER SESSION ===');
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('Session check result:', { session, error });
        
        if (error) {
          setError(`Session error: ${error.message}`);
        } else if (session?.user) {
          setUser(session.user);
          console.log('User found:', session.user.email);
        } else {
          setError('No session found');
          console.log('No session - redirecting to login');
          setTimeout(() => {
            window.location.href = '/auth/simple-login';
          }, 2000);
        }
      } catch (err: any) {
        console.error('Exception checking session:', err);
        setError(`Exception: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth/simple-login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Oturum kontrol ediliyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold text-red-600 mb-4">Auth Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.href = '/auth/simple-login'}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login Sayfasına Git
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">✅ Dashboard (Simple)</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Kullanıcı Bilgileri</h2>
            
            <div className="space-y-2">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>ID:</strong> {user?.id}</p>
              <p><strong>Son Giriş:</strong> {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}</p>
              <p><strong>Email Doğrulandı:</strong> {user?.email_confirmed_at ? '✅ Evet' : '❌ Hayır'}</p>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">🎉 Başarılı!</h3>
              <p className="text-green-700">Giriş işlemi başarıyla tamamlandı ve dashboard'a erişim sağlandı.</p>
            </div>

            <div className="mt-4 text-center">
              <a href="/dashboard" className="text-blue-600 hover:underline">
                → Normal dashboard'a git
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
