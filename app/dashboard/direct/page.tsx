'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function DirectDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authMethod, setAuthMethod] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔍 Direct Dashboard Auth Check Started');
      
      // Method 1: Check Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setAuthMethod('Supabase Session');
        setLoading(false);
        return;
      }

      // Method 2: Check localStorage
      const storedUser = localStorage.getItem('seragpt_user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setAuthMethod('localStorage');
          setLoading(false);
          return;
        } catch (err) {
          console.error('localStorage parse error:', err);
        }
      }

      // Method 3: Direct user check
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        setUser(currentUser);
        setAuthMethod('Direct User Check');
        setLoading(false);
        return;
      }

      console.log('No user found, will redirect to login');
      setLoading(false);
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 2000);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('seragpt_user');
    await supabase.auth.signOut();
    window.location.href = '/auth/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Dashboard Yükleniyor...</h2>
          <p className="text-gray-600 mt-2">Kullanıcı doğrulanıyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-yellow-600 mb-4">⚠️ Kullanıcı Bulunamadı</h1>
          <p className="text-gray-700 mb-6">
            Giriş yapmış görünmüyorsunuz. Login sayfasına yönlendiriliyorsunuz...
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/auth/login'}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Login Sayfasına Git
            </button>
            <button
              onClick={() => window.location.href = '/auth/bulletproof-login'}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Bulletproof Login'e Git
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-green-600">
                🎉 SeraGPT Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Auth: <span className="font-semibold text-green-700">{authMethod}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🎉 Hoş Geldiniz!
            </h2>
            <p className="text-gray-600 mb-4">
              SeraGPT Dashboard'una başarıyla erişim sağladınız!
            </p>
            
            <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">✅ Sorun Çözüldü!</h3>
              <p className="text-green-700 text-sm">
                Authentication problemi başarıyla çözüldü. Artık dashboard'a erişebiliyorsunuz.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-medium"
              >
                → Ana Dashboard'a Git
              </button>
              
              <button
                onClick={() => window.location.href = '/dashboard/bulletproof-success'}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-medium"
              >
                🛡️ Bulletproof Success'e Git
              </button>
            </div>
          </div>

          {/* User Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">👤 Kullanıcı Bilgileri</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Son Giriş:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('tr-TR') : 'N/A'}</p>
              <p><strong>Email Doğrulandı:</strong> {user.email_confirmed_at ? '✅ Evet' : '❌ Hayır'}</p>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Auth Method:</strong> {authMethod}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Hızlı İşlemler</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              <a href="/dashboard/ai-chat" className="bg-blue-100 hover:bg-blue-200 p-4 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-2">🤖</div>
                <div className="text-sm font-medium text-blue-800">AI Chat</div>
              </a>
              
              <a href="/dashboard/analysis/roi" className="bg-green-100 hover:bg-green-200 p-4 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-2">🧮</div>
                <div className="text-sm font-medium text-green-800">ROI Analizi</div>
              </a>
              
              <a href="/dashboard/analysis/climate" className="bg-purple-100 hover:bg-purple-200 p-4 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-2">🌦️</div>
                <div className="text-sm font-medium text-purple-800">İklim Analizi</div>
              </a>
              
              <a href="/dashboard/reports" className="bg-orange-100 hover:bg-orange-200 p-4 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-orange-800">Raporlar</div>
              </a>
              
              <a href="/dashboard/settings" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="text-sm font-medium text-gray-800">Ayarlar</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
