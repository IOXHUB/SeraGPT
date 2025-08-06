'use client';

import { useState } from 'react';

export default function AdminSetupPage() {
  const [email, setEmail] = useState('info@isitmax.com');
  const [password, setPassword] = useState('Ev30082023-.-');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const createAdminUser = async () => {
    setLoading(true);
    setMessage('🔧 Admin hesabı oluşturuluyor...');

    try {
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          role: 'admin'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Admin hesabı başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.');
      } else {
        setMessage(`❌ Hata: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Bağlantı hatası: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setMessage('🔑 Admin girişi test ediliyor...');
    
    // Test login
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessage(`❌ Giriş hatası: ${error.message}`);
      } else {
        setMessage('✅ Admin girişi başarılı! Admin paneline yönlendiriliyor...');
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      }
    } catch (error) {
      setMessage(`❌ Test hatası: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-center mb-8">🔐 Admin Setup</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={createAdminUser}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                🛠️ Admin Hesabı Oluştur
              </button>

              <button
                onClick={testLogin}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                🔑 Admin Girişi Test Et
              </button>
            </div>

            {message && (
              <div className={`p-4 rounded-lg text-center ${
                message.includes('✅') 
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : message.includes('🔧') || message.includes('🔑')
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">🎯 Admin Panel Features:</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>👥 Kullanıcı Yönetimi</li>
                <li>📊 Sistem Analytics</li>
                <li>⚙️ Platform Ayarları</li>
                <li>📝 Blog Yönetimi</li>
                <li>🔧 API Status Monitor</li>
              </ul>
            </div>

            <div className="text-center space-x-4">
              <a href="/auth/login" className="text-blue-600 hover:underline">
                ← Login Sayfası
              </a>
              <a href="/admin" className="text-purple-600 hover:underline">
                Admin Panel →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
