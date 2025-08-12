'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auth guard - redirect if not authenticated
  useEffect(() => {
    if (mounted && !loading && !user) {
      console.log('🚫 Dashboard access denied - redirecting to login');
      window.location.href = '/auth/login';
    }
  }, [user, loading, mounted]);

  // Show nothing until mounted
  if (!mounted) {
    return null;
  }

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#146448' }}>
        <div className="text-white text-lg">🔐 Authentication kontrolü...</div>
      </div>
    );
  }

  // Show login message if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#146448' }}>
        <div className="text-white text-lg">Giriş yapmanız gerekiyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#146448]">
      {/* Header */}
      <header className="bg-[#146448] border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F9f4710c59a39492e92e469b69a3b57a3?format=webp&width=800" 
              className="h-8" 
              alt="SeraGPT Logo" 
            />
            <h1 className="text-white font-semibold text-xl">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white/80 text-sm">Hoş geldiniz, {user?.email}</span>
            <button
              onClick={() => window.location.href = '/auth/login'}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Çıkış
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Hoş Geldiniz!
            </h2>
            <p className="text-white/80 text-lg">
              SeraGPT Dashboard'a başarıyla giriş yaptınız. Aşağıdan analiz başlatabilirsiniz.
            </p>
          </div>

          {/* Analysis Options */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => window.location.href = '/dashboard/analysis/roi'}
              className="bg-white/95 hover:bg-white rounded-lg p-6 text-center transition-all hover:scale-105 group"
            >
              <h3 className="font-semibold text-[#146448] mb-2 group-hover:text-[#0d4d36]">
                ROI Analizi
              </h3>
              <p className="text-[#146448]/70 text-sm">
                Yatırım geri dönüş hesaplaması
              </p>
            </button>

            <button
              onClick={() => window.location.href = '/dashboard/analysis/climate'}
              className="bg-white/95 hover:bg-white rounded-lg p-6 text-center transition-all hover:scale-105 group"
            >
              <h3 className="font-semibold text-[#146448] mb-2 group-hover:text-[#0d4d36]">
                İklim Analizi
              </h3>
              <p className="text-[#146448]/70 text-sm">
                Bölgesel iklim uygunluğu
              </p>
            </button>

            <button
              onClick={() => window.location.href = '/dashboard/analysis/equipment'}
              className="bg-white/95 hover:bg-white rounded-lg p-6 text-center transition-all hover:scale-105 group"
            >
              <h3 className="font-semibold text-[#146448] mb-2 group-hover:text-[#0d4d36]">
                Ekipman Listesi
              </h3>
              <p className="text-[#146448]/70 text-sm">
                Mühendis onaylı ekipmanlar
              </p>
            </button>

            <button
              onClick={() => window.location.href = '/dashboard/analysis/market'}
              className="bg-white/95 hover:bg-white rounded-lg p-6 text-center transition-all hover:scale-105 group"
            >
              <h3 className="font-semibold text-[#146448] mb-2 group-hover:text-[#0d4d36]">
                Pazar Analizi
              </h3>
              <p className="text-[#146448]/70 text-sm">
                Ticaret ve fiyat verileri
              </p>
            </button>

            <button
              onClick={() => window.location.href = '/dashboard/analysis/layout'}
              className="bg-white/95 hover:bg-white rounded-lg p-6 text-center transition-all hover:scale-105 group"
            >
              <h3 className="font-semibold text-[#146448] mb-2 group-hover:text-[#0d4d36]">
                Yerleşim Planı
              </h3>
              <p className="text-[#146448]/70 text-sm">
                2D/3D sera tasarımları
              </p>
            </button>

            <button
              onClick={() => window.location.href = '/dashboard/reports'}
              className="bg-white/95 hover:bg-white rounded-lg p-6 text-center transition-all hover:scale-105 group"
            >
              <h3 className="font-semibold text-[#146448] mb-2 group-hover:text-[#0d4d36]">
                Raporlarım
              </h3>
              <p className="text-[#146448]/70 text-sm">
                Önceki analizlerinizi görün
              </p>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => window.location.href = '/dashboard/settings'}
              className="bg-[#baf200] hover:bg-[#baf200]/80 rounded-lg p-4 text-center transition-colors"
            >
              <h4 className="font-medium text-[#146448] mb-1">Ayarlar</h4>
              <p className="text-[#146448]/70 text-sm">Hesap ayarları</p>
            </button>

            <button
              onClick={() => window.location.href = '/dashboard/tokens'}
              className="bg-[#baf200] hover:bg-[#baf200]/80 rounded-lg p-4 text-center transition-colors"
            >
              <h4 className="font-medium text-[#146448] mb-1">Token İşlemleri</h4>
              <p className="text-[#146448]/70 text-sm">Token bakiyesi</p>
            </button>

            <button
              onClick={() => window.location.href = '/destek'}
              className="bg-[#baf200] hover:bg-[#baf200]/80 rounded-lg p-4 text-center transition-colors"
            >
              <h4 className="font-medium text-[#146448] mb-1">Destek</h4>
              <p className="text-[#146448]/70 text-sm">Yardım alın</p>
            </button>

            <button
              onClick={() => window.location.href = '/'}
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-colors border border-white/20"
            >
              <h4 className="font-medium text-white mb-1">Ana Sayfa</h4>
              <p className="text-white/70 text-sm">Anasayfaya dön</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
