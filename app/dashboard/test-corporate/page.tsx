'use client';

import { useState } from 'react';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function CorporateDashboardTest() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header */}
      <header className="border-b" style={{ backgroundColor: '#146448', borderBottomColor: '#1e3237' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                alt="SeraGPT Logo"
                className="h-8 w-auto"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'overview' 
                    ? 'text-white border-b-2 border-[#baf200]' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Genel Bakış
              </button>
              <button
                onClick={() => setActiveTab('analyses')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'analyses' 
                    ? 'text-white border-b-2 border-[#baf200]' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Analizler
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'reports' 
                    ? 'text-white border-b-2 border-[#baf200]' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Raporlar
              </button>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button 
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                Yeni Analiz
              </button>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm font-medium text-white">VS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: '#f6f8f9' }}
          >
            Hoş Geldiniz, Volkan Şimşirkaya
          </h1>
          <p 
            className="text-lg"
            style={{ color: '#f6f8f9', opacity: 0.8 }}
          >
            Sera yatırım analizlerinizi yönetin ve raporlarınızı görüntüleyin
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div 
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#baf200' }}
              >
                <span className="text-xl" style={{ color: '#1e3237' }}>📊</span>
              </div>
              <div className="ml-4">
                <p 
                  className="text-sm font-medium"
                  style={{ color: '#1e3237', opacity: 0.8 }}
                >
                  Toplam Analiz
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: '#1e3237' }}
                >
                  12
                </p>
              </div>
            </div>
          </div>

          <div 
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#baf200' }}
              >
                <span className="text-xl" style={{ color: '#1e3237' }}>💰</span>
              </div>
              <div className="ml-4">
                <p 
                  className="text-sm font-medium"
                  style={{ color: '#1e3237', opacity: 0.8 }}
                >
                  Ortalama ROI
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: '#1e3237' }}
                >
                  %34.2
                </p>
              </div>
            </div>
          </div>

          <div 
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#baf200' }}
              >
                <span className="text-xl" style={{ color: '#1e3237' }}>🌡️</span>
              </div>
              <div className="ml-4">
                <p 
                  className="text-sm font-medium"
                  style={{ color: '#1e3237', opacity: 0.8 }}
                >
                  Aktif Projeler
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: '#1e3237' }}
                >
                  3
                </p>
              </div>
            </div>
          </div>

          <div 
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#baf200' }}
              >
                <span className="text-xl" style={{ color: '#1e3237' }}>📋</span>
              </div>
              <div className="ml-4">
                <p 
                  className="text-sm font-medium"
                  style={{ color: '#1e3237', opacity: 0.8 }}
                >
                  Tamamlanan
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: '#1e3237' }}
                >
                  8
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Analyses */}
          <div className="lg:col-span-2">
            <div 
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className="text-xl font-bold"
                  style={{ color: '#1e3237' }}
                >
                  Son Analizler
                </h2>
                <button 
                  className="text-sm font-medium hover:underline"
                  style={{ color: '#1e3237' }}
                >
                  Tümünü Görüntüle
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Antalya Domates ROI Analizi', date: '2 gün önce', roi: '%34.2', status: 'Tamamlandı' },
                  { title: 'İzmir İklim Uygunluk Analizi', date: '5 gün önce', roi: '%28.7', status: 'İnceleniyor' },
                  { title: 'Mersin Salatalık Pazar Analizi', date: '1 hafta önce', roi: '%41.3', status: 'Tamamlandı' },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 border rounded-lg"
                    style={{ borderColor: '#1e323733' }}
                  >
                    <div>
                      <h3 
                        className="font-medium"
                        style={{ color: '#1e3237' }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-sm"
                        style={{ color: '#1e3237', opacity: 0.6 }}
                      >
                        {item.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p 
                        className="font-bold"
                        style={{ color: '#1e3237' }}
                      >
                        {item.roi}
                      </p>
                      <span 
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'Tamamlandı' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* AI Assistant */}
            <div 
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <h3 
                className="text-lg font-bold mb-4"
                style={{ color: '#1e3237' }}
              >
                AI Asistan
              </h3>
              <p 
                className="text-sm mb-4"
                style={{ color: '#1e3237', opacity: 0.8 }}
              >
                Sorularınızı sorun, öneriler alın
              </p>
              <button 
                className="w-full px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                AI ile Sohbet Et
              </button>
            </div>

            {/* Quick Actions */}
            <div 
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <h3 
                className="text-lg font-bold mb-4"
                style={{ color: '#1e3237' }}
              >
                Hızlı İşlemler
              </h3>
              <div className="space-y-3">
                <button
                  className="w-full px-4 py-2 text-left rounded-lg transition-colors"
                  style={{ color: '#1e3237', backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#baf200'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
                >
                  Yeni ROI Analizi
                </button>
                <button
                  className="w-full px-4 py-2 text-left rounded-lg transition-colors"
                  style={{ color: '#1e3237', backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#baf200'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
                >
                  İklim Analizi
                </button>
                <button
                  className="w-full px-4 py-2 text-left rounded-lg transition-colors"
                  style={{ color: '#1e3237', backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#baf200'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
                >
                  Pazar Araştırması
                </button>
              </div>
            </div>

            {/* Support */}
            <div 
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <h3 
                className="text-lg font-bold mb-4"
                style={{ color: '#1e3237' }}
              >
                Destek
              </h3>
              <p 
                className="text-sm mb-4"
                style={{ color: '#1e3237', opacity: 0.8 }}
              >
                Yardıma mı ihtiyacınız var?
              </p>
              <div className="space-y-2">
                <Link 
                  href="/destek"
                  className="block text-sm hover:underline"
                  style={{ color: '#1e3237' }}
                >
                  Destek Merkezi
                </Link>
                <Link 
                  href="/danismanlik"
                  className="block text-sm hover:underline"
                  style={{ color: '#1e3237' }}
                >
                  Danışmanlık Talep Et
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Back */}
        <div className="mt-8 flex justify-center">
          <Link 
            href="/dashboard"
            className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
            style={{ 
              backgroundColor: '#f6f8f9', 
              color: '#1e3237',
              border: '2px solid #baf200'
            }}
          >
            ← Mevcut Dashboard'a Dön
          </Link>
        </div>
      </main>
    </div>
  );
}
