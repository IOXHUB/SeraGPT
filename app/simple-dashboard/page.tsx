'use client';

import { useEffect, useState } from 'react';

export default function SimpleDashboard() {
  const [mockUser, setMockUser] = useState<any>(null);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    setTimestamp('16.01.2024 15:00:00');
    
    // Check localStorage for mock user
    const stored = localStorage.getItem('seragpt_user');
    if (stored) {
      try {
        setMockUser(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse mock user');
      }
    }
  }, []);

  const setUser = (type: string) => {
    const users = {
      admin: {
        id: 'admin-001',
        email: 'admin@seragpt.com',
        role: 'admin',
        name: 'Admin User'
      },
      user: {
        id: 'user-001',
        email: 'user@example.com',
        role: 'user',
        name: 'Test User'
      }
    };

    const user = users[type as keyof typeof users];
    localStorage.setItem('seragpt_user', JSON.stringify(user));
    setMockUser(user);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🚀 SeraGPT Dashboard
              </h1>
              <p className="text-gray-600">
                Son güncelleme: {timestamp}
              </p>
            </div>
            <div className="text-right">
              {mockUser ? (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-600">✅ Aktif Kullanıcı</p>
                  <p className="font-semibold">{mockUser.name}</p>
                  <p className="text-sm text-gray-500">{mockUser.email}</p>
                  <p className="text-xs text-blue-600 capitalize">Role: {mockUser.role}</p>
                </div>
              ) : (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-600">❌ Kullanıcı Yok</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🛠️ Development Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setUser('admin')}
              className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              👑 Set Admin User
            </button>
            <button
              onClick={() => setUser('user')}
              className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              👤 Set Regular User
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('seragpt_user');
                setMockUser(null);
              }}
              className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              🚪 Clear User
            </button>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🧭 Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/dashboard"
              className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              📊 Full Dashboard
            </a>
            <a
              href="/admin"
              className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center"
            >
              ⚙️ Admin Panel
            </a>
            <a
              href="/test-mock"
              className="bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 transition-colors text-center"
            >
              🔍 Debug Page
            </a>
            <a
              href="/"
              className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              🏠 Homepage
            </a>
          </div>
        </div>

        {/* Analysis Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                💰
              </div>
              <div>
                <h3 className="text-lg font-semibold">ROI Simülasyonu</h3>
                <p className="text-gray-600">Yatırım geri dönüş analizi</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Toplam Analiz:</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span>Ortalama ROI:</span>
                <span className="font-semibold text-green-600">24.5%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                🌡️
              </div>
              <div>
                <h3 className="text-lg font-semibold">İklim Analizi</h3>
                <p className="text-gray-600">Uygunluk skorları</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Toplam Analiz:</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span>Ortalama Skor:</span>
                <span className="font-semibold text-blue-600">85/100</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                🔧
              </div>
              <div>
                <h3 className="text-lg font-semibold">Ekipman Listesi</h3>
                <p className="text-gray-600">Sistem önerileri</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Toplam Liste:</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between">
                <span>Ortalama Maliyet:</span>
                <span className="font-semibold text-orange-600">₺125.000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500">
          <p>✅ Simple Dashboard çalışıyor - Middleware bypass aktif</p>
          <p className="text-xs mt-2">Bu sayfa auth kontrollerini bypass eder</p>
        </div>
      </div>
    </div>
  );
}
