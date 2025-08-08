'use client';

import { useSimpleAuth } from '@/lib/hooks/useSimpleAuth';
import Link from 'next/link';

export default function SimpleDashboard() {
  const { user, isAdmin } = useSimpleAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">Use the development bar above to login</p>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hoş Geldiniz, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mb-4">
            {isAdmin 
              ? 'Admin paneline hoş geldiniz. Sistemi buradan yönetebilirsiniz.'
              : 'SeraGPT kullanıcı paneline hoş geldiniz. Analizlerinizi buradan yapabilirsiniz.'
            }
          </p>
          <div className="flex items-center space-x-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              📧 {user.email}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              isAdmin ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {isAdmin ? '👑 Admin' : '👤 User'}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-gray-600 text-sm font-medium">Kullanılabilir Token</h3>
            <p className="text-3xl font-bold text-green-600 mt-1">5</p>
            <p className="text-sm text-gray-500 mt-1">Ücretsiz analiz</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-gray-600 text-sm font-medium">Tamamlanan Analiz</h3>
            <p className="text-3xl font-bold text-blue-600 mt-1">0</p>
            <p className="text-sm text-gray-500 mt-1">Toplam analiz</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-gray-600 text-sm font-medium">Aktif Projeler</h3>
            <p className="text-3xl font-bold text-purple-600 mt-1">1</p>
            <p className="text-sm text-gray-500 mt-1">Sera projesi</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-gray-600 text-sm font-medium">Hesap Durumu</h3>
            <p className="text-3xl font-bold text-orange-600 mt-1">✅</p>
            <p className="text-sm text-gray-500 mt-1">Aktif</p>
          </div>
        </div>

        {/* Analysis Tools */}
        {!isAdmin && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">🚀 Analiz Araçları</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">ROI Simülasyonu</h3>
                  <p className="text-gray-600 text-sm mb-4">Sera yatırımı geri dönüş analizi</p>
                  <Link 
                    href="/dashboard/analysis/roi"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Analizi Başlat
                  </Link>
                </div>
              </div>

              <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-4">🌡️</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">İklim Analizi</h3>
                  <p className="text-gray-600 text-sm mb-4">Bölgesel iklim uygunluk raporu</p>
                  <Link 
                    href="/dashboard/analysis/climate"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Analizi Başlat
                  </Link>
                </div>
              </div>

              <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔧</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ekipman Listesi</h3>
                  <p className="text-gray-600 text-sm mb-4">Mühendis onaylı ekipman önerileri</p>
                  <Link 
                    href="/dashboard/analysis/equipment"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Analizi Başlat
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Tools */}
        {isAdmin && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">⚙️ Admin Araçları</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                href="/admin/users"
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:shadow-lg transition-all"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Kullanıcılar</h3>
                  <p className="text-gray-600 text-sm">Kullanıcı yönetimi</p>
                </div>
              </Link>

              <Link 
                href="/admin/analytics"
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:shadow-lg transition-all"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Analitik</h3>
                  <p className="text-gray-600 text-sm">Sistem raporları</p>
                </div>
              </Link>

              <Link 
                href="/admin/settings"
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:shadow-lg transition-all"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">⚙️</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ayarlar</h3>
                  <p className="text-gray-600 text-sm">Sistem ayarları</p>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📋 Son Aktiviteler</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Development mode'a giriş yapıldı</p>
                <p className="text-xs text-gray-600 mt-1">Otomatik development login aktif</p>
                <p className="text-xs text-gray-500 mt-1">Şimdi</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Sistem bypass aktif</p>
                <p className="text-xs text-gray-600 mt-1">Auth ve cache sistemleri atlandı</p>
                <p className="text-xs text-gray-500 mt-1">1 dk önce</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Development workspace hazır</p>
                <p className="text-xs text-gray-600 mt-1">Frontend geliştirme için optimize edildi</p>
                <p className="text-xs text-gray-500 mt-1">2 dk önce</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
