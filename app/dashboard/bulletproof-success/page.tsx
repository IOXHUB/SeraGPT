'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

export default function BulletproofSuccessPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authMethod, setAuthMethod] = useState<string>('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔍 BULLETPROOF AUTH CHECK STARTED');
      
      try {
        // Method 1: Check Supabase session
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('Supabase session check:', { hasSession: !!session, hasUser: !!session?.user, error });
        
        if (session?.user) {
          console.log('✅ Found user via Supabase session');
          setUser(session.user);
          setAuthMethod('Supabase Session');
          setLoading(false);
          return;
        }

        // Method 2: Check localStorage backup
        const storedUser = localStorage.getItem('seragpt_user');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            console.log('✅ Found user via localStorage:', userData);
            setUser(userData);
            setAuthMethod('localStorage Backup');
            setLoading(false);
            return;
          } catch (err) {
            console.error('Failed to parse stored user:', err);
          }
        }

        // Method 3: Try to get current user directly
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          console.log('✅ Found user via getUser');
          setUser(currentUser);
          setAuthMethod('Direct User Check');
          setLoading(false);
          return;
        }

        console.log('❌ No user found with any method');
        setLoading(false);
        
      } catch (err) {
        console.error('Auth check failed:', err);
        setLoading(false);
      }
    };

    checkAuth();

    // Also listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', { event, hasUser: !!session?.user });
      if (session?.user) {
        setUser(session.user);
        setAuthMethod('Auth State Change');
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('seragpt_user');
    await supabase.auth.signOut();
    window.location.href = '/auth/bulletproof-login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🔍 Kullanıcı Aranıyor...</h2>
          <p className="text-gray-600">Tüm yöntemler deneniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Kullanıcı Bulunamadı</h1>
          <p className="text-gray-700 mb-6">
            Ne Supabase session'da ne de localStorage'da kullanıcı verisi bulunamadı.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/auth/bulletproof-login'}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              🔧 Bulletproof Login'e Git
            </button>
            <button
              onClick={() => window.location.href = '/auth/login'}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Normal Login'e Git
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-green-600">
                🎉 BULLETPROOF SUCCESS! 🎉
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Auth Method: <span className="font-semibold text-green-700">{authMethod}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-medium"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-4xl font-bold text-green-600 mb-4">
              İŞTE BU! ÇALIŞTI!
            </h2>
            <p className="text-xl text-gray-700">
              Giriş başarıyla tamamlandı ve kullanıcı verisi alındı!
            </p>
          </div>

          {/* User Info */}
          <div className="bg-green-100 border-2 border-green-300 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-4">👤 Kullanıcı Bilgileri:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-green-700">
              <div>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.id}</p>
              </div>
              <div>
                <p><strong>Son Giriş:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('tr-TR') : user.loginTime ? new Date(user.loginTime).toLocaleString('tr-TR') : 'N/A'}</p>
                <p><strong>Email Doğrulandı:</strong> {user.email_confirmed_at ? '✅ Evet' : '❌ Hayır'}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center space-y-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                → Ana Dashboard'a Git
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 font-medium"
              >
                🏠 Ana Sayfaya Git
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Bu sayfa hem Supabase session'ını hem de localStorage backup'ını kontrol eder.
              <br />
              Hangi yöntemle bulunduğu yukarıda belirtilmiştir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
