'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface SEOPage {
  url: string;
  title: string;
  description: string;
  keywords: string;
  lastUpdate: string;
  status: 'optimized' | 'needs-attention' | 'poor';
}

export default function SEOManager() {
  const { user, isAdmin, loading } = useAuth();
  const [seoPages, setSeoPages] = useState<SEOPage[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pages' | 'settings' | 'analytics'>('pages');

  useEffect(() => {
    if (user && !loading) {
      loadSEOData();
    }
  }, [user, loading]);

  const loadSEOData = async () => {
    if (!isAdmin()) {
      window.location.href = '/dashboard';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock SEO data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSEOPages: SEOPage[] = [
        {
          url: '/',
          title: 'SeraGPT - Sera Tarımında AI Çözümleri',
          description: 'Sera tarımı için gelişmiş yapay zeka çözümleri. Iklim analizi, verimlilik optimizasyonu ve akıllı sera yönetimi.',
          keywords: 'sera tarımı, ai, yapay zeka, iklim analizi',
          lastUpdate: '2024-01-15',
          status: 'optimized'
        },
        {
          url: '/blog',
          title: 'Blog - SeraGPT',
          description: 'Sera tarımı hakkında güncel makaleler ve uzman görüşleri.',
          keywords: 'sera tarımı blog, tarım makaleleri',
          lastUpdate: '2024-01-14',
          status: 'needs-attention'
        },
        {
          url: '/dashboard',
          title: 'Dashboard',
          description: '',
          keywords: '',
          lastUpdate: '2024-01-10',
          status: 'poor'
        }
      ];
      
      setSeoPages(mockSEOPages);
      
    } catch (error) {
      console.error('Failed to load SEO data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  if (!loading && user && !isAdmin()) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full rounded-lg p-8 text-center" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="text-6xl mb-4">🚫</div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Yetkisiz Erişim</h3>
            <p className="mb-6" style={{ color: '#1e3237', opacity: '0.7' }}>Bu sayfaya erişmek için admin yetkisine sahip olmanız gerekir.</p>
            <Link 
              href="/dashboard" 
              className="inline-block px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
            >
              Dashboard'a Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      <header className="border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>SEO Yöneticisi</h1>
              <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Meta tags, sitemap ve SEO performansını yönetin</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                Admin Panel'e Dön
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg p-1" style={{ backgroundColor: '#f6f8f9' }}>
            <button
              onClick={() => setActiveTab('pages')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'pages' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'pages' ? '#146448' : 'transparent',
                color: activeTab === 'pages' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Sayfa SEO
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'settings' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'settings' ? '#146448' : 'transparent',
                color: activeTab === 'settings' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Genel Ayarlar
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'analytics' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'analytics' ? '#146448' : 'transparent',
                color: activeTab === 'analytics' ? '#f6f8f9' : '#1e3237'
              }}
            >
              SEO Analytics
            </button>
          </div>
        </div>

        {activeTab === 'pages' && (
          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Sayfa SEO Durumu</h3>
              <div className="space-y-4">
                {seoPages.map((page, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium" style={{ color: '#1e3237' }}>{page.url}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          page.status === 'optimized' ? 'bg-green-100 text-green-800' :
                          page.status === 'needs-attention' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {page.status === 'optimized' ? 'Optimized' : 
                           page.status === 'needs-attention' ? 'Dikkat Gerekli' : 'Zayıf'}
                        </span>
                      </div>
                      <button 
                        className="px-3 py-1 rounded text-sm font-medium transition-all hover:opacity-90"
                        style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                      >
                        Düzenle
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-1" style={{ color: '#1e3237' }}>Title</p>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                          {page.title || 'Belirtilmemiş'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1" style={{ color: '#1e3237' }}>Description</p>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                          {page.description || 'Belirtilmemiş'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1" style={{ color: '#1e3237' }}>Keywords</p>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                          {page.keywords || 'Belirtilmemiş'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Genel SEO Ayarları</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Site Başlığı
                  </label>
                  <input
                    type="text"
                    value="SeraGPT - Sera Tarımında AI Çözümleri"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ focusRingColor: '#146448' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Site Açıklaması
                  </label>
                  <textarea
                    value="Sera tarımı için gelişmiş yapay zeka çözümleri. İklim analizi, verimlilik optimizasyonu ve akıllı sera yönetimi."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    rows={3}
                    style={{ focusRingColor: '#146448' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Varsayılan Anahtar Kelimeler
                  </label>
                  <input
                    type="text"
                    value="sera tarımı, ai, yapay zeka, iklim analizi, akıllı tarım"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ focusRingColor: '#146448' }}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Sitemap & Robots.txt</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: '#1e3237' }}>Sitemap Durumu</p>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Otomatik olarak güncelleniyor</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Aktif
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: '#1e3237' }}>Robots.txt</p>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Arama motorları için yönergeler</p>
                  </div>
                  <button 
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                  >
                    Düzenle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#1e3237' }}>Organik Trafik</h4>
                <p className="text-2xl font-bold" style={{ color: '#146448' }}>+24%</p>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Son 30 gün</p>
              </div>
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#1e3237' }}>Anahtar Kelime Sıralaması</h4>
                <p className="text-2xl font-bold" style={{ color: '#146448' }}>156</p>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>İlk 10'da</p>
              </div>
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#1e3237' }}>Site Hızı</h4>
                <p className="text-2xl font-bold" style={{ color: '#146448' }}>2.1s</p>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Ortalama yükleme</p>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>En Performanslı Anahtar Kelimeler</h3>
              <div className="space-y-3">
                {[
                  { keyword: 'sera tarımı', position: 3, clicks: 1234, impressions: 15678 },
                  { keyword: 'akıllı sera', position: 7, clicks: 892, impressions: 9876 },
                  { keyword: 'sera iklim analizi', position: 12, clicks: 456, impressions: 5432 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <div>
                      <p className="font-medium" style={{ color: '#1e3237' }}>{item.keyword}</p>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                        {item.clicks} tık • {item.impressions} gösterim
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold" style={{ color: '#146448' }}>#{item.position}</p>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>sıralama</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
