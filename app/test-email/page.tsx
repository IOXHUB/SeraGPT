'use client';

import { useState } from 'react';

export default function EmailTestPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const testEmail = async (type: 'welcome' | 'verification' | 'password-reset') => {
    if (!email) {
      setMessage('❌ E-posta adresi gerekli');
      return;
    }

    setLoading(true);
    setMessage(`📤 ${type} email'i gönderiliyor...`);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          to: email,
          name: email.split('@')[0],
          url: type === 'welcome' 
            ? `${window.location.origin}/dashboard`
            : `${window.location.origin}/auth/verify?token=test123`
        })
      });

      if (response.ok) {
        setMessage(`✅ ${type} email'i başarıyla gönderildi! E-postanızı kontrol edin.`);
      } else {
        const error = await response.json();
        setMessage(`❌ Email gönderilemedi: ${error.error}`);
      }
    } catch (error) {
      setMessage(`❌ Hata: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-center mb-8">📧 Email Sistem Testi</h1>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Email Adresi:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4 mb-6">
            <button
              onClick={() => testEmail('welcome')}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              🌱 Hoş Geldin Email'i Gönder (Resend)
            </button>

            <button
              onClick={() => testEmail('verification')}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              ✅ Doğrulama Email'i Gönder (Resend)
            </button>

            <button
              onClick={() => testEmail('password-reset')}
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              🔐 Şifre Sıfırlama Email'i Gönder (Resend)
            </button>

            <button
              onClick={async () => {
                if (!email) {
                  setMessage('❌ E-posta adresi gerekli');
                  return;
                }
                setLoading(true);
                setMessage('📤 Supabase test email gönderiliyor...');

                try {
                  // Test Supabase email directly
                  const { createClient } = await import('@supabase/supabase-js');
                  const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                  );

                  const { error } = await supabase.auth.signInWithOtp({
                    email: email,
                    options: {
                      shouldCreateUser: false
                    }
                  });

                  if (error) {
                    setMessage(`❌ Supabase email hatası: ${error.message}`);
                  } else {
                    setMessage('✅ Supabase test email\'i gönderildi! (Magic link)');
                  }
                } catch (error) {
                  setMessage(`❌ Supabase test hatası: ${error}`);
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              🔮 Supabase Magic Link Test
            </button>
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-center ${
              message.includes('✅') 
                ? 'bg-green-50 text-green-800 border border-green-200'
                : message.includes('📤')
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">📋 Debug Info:</h3>
            <div className="text-sm text-yellow-700 space-y-1">
              <div>API Key: {process.env.NEXT_PUBLIC_RESEND_API_KEY ? '❌ Public (Dangerous!)' : '✅ Server-side'}</div>
              <div>Environment: {process.env.NODE_ENV}</div>
              <div>Domain: {typeof window !== 'undefined' ? window.location.hostname : 'SSR'}</div>
            </div>

            <button
              onClick={async () => {
                try {
                  const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      type: 'test',
                      to: 'debug@test.com',
                      name: 'Debug Test'
                    })
                  });
                  const data = await response.json();
                  console.log('Debug test response:', data);
                  setMessage(`Debug Response: ${JSON.stringify(data)}`);
                } catch (error) {
                  console.error('Debug test error:', error);
                  setMessage(`Debug Error: ${error}`);
                }
              }}
              className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700"
            >
              🔧 Debug API Test
            </button>
          </div>

          <div className="mt-6 text-center">
            <a href="/auth/login" className="text-blue-600 hover:underline">
              ← Login Sayfasına Dön
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
