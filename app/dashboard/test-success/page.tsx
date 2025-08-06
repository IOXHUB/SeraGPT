'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function TestSuccessPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;

    const checkUser = async () => {
      attempts++;
      console.log(`Test Success Page - Session check attempt ${attempts}`);

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('Session result:', {
          attempt: attempts,
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
          error: error?.message
        });

        if (session?.user) {
          console.log('✅ USER FOUND:', session.user.email);
          setUser(session.user);
          setLoading(false);
          return;
        }

        // If no user but haven't hit max attempts, try again
        if (attempts < maxAttempts) {
          console.log(`No user yet, retrying in 1 second... (${attempts}/${maxAttempts})`);
          setTimeout(checkUser, 1000);
        } else {
          console.log('❌ Max attempts reached, no user found');
          setLoading(false);
        }
      } catch (err) {
        console.error('Session check error:', err);
        if (attempts < maxAttempts) {
          setTimeout(checkUser, 1000);
        } else {
          setLoading(false);
        }
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">❌ No User Found</h1>
          <button
            onClick={() => window.location.href = '/auth/login'}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              🎉 BAŞARILI! 🎉
            </h1>
            <p className="text-xl text-gray-700">
              Giriş başarıyla tamamlandı ve dashboard'a erişim sağlandı!
            </p>
          </div>

          <div className="bg-green-100 border border-green-400 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-green-800 mb-3">Kullanıcı Bilgileri:</h2>
            <div className="space-y-2 text-green-700">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Son Giriş:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('tr-TR') : 'N/A'}</p>
              <p><strong>Email Doğrulandı:</strong> {user.email_confirmed_at ? '✅ Evet' : '❌ Hayır'}</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              → Ana Dashboard'a Git
            </button>
            
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-medium"
            >
              Çıkış Yap
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Test URL: <code>/dashboard/test-success</code></p>
            <p>Bu sayfa giriş başarılı olduğunu doğrular.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
