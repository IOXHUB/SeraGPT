'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface CacheStats {
  hitRate: number;
  totalHits: number;
  totalMisses: number;
  totalSize: string;
  evictions: number;
  uptime: string;
}

interface CacheKey {
  key: string;
  type: string;
  size: string;
  ttl: string;
  hits: number;
  lastAccess: string;
}

export default function CacheManager() {
  const { user, isAdmin, loading } = useAuth();
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
  const [cacheKeys, setCacheKeys] = useState<CacheKey[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'keys' | 'settings'>('overview');

  useEffect(() => {
    if (user && !loading) {
      loadCacheData();
    }
  }, [user, loading]);

  const loadCacheData = async () => {
    if (!isAdmin()) {
      window.location.href = '/dashboard';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock cache data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStats: CacheStats = {
        hitRate: 94.5,
        totalHits: 45230,
        totalMisses: 2610,
        totalSize: '2.3 GB',
        evictions: 45,
        uptime: '15 gün 8 saat'
      };

      const mockKeys: CacheKey[] = [
        {
          key: 'user:session:1234',
          type: 'Session',
          size: '2.1 KB',
          ttl: '24h',
          hits: 156,
          lastAccess: '2 dk önce'
        },
        {
          key: 'analysis:climate:789',
          type: 'Analysis',
          size: '45.2 KB',
          ttl: '1h',
          hits: 89,
          lastAccess: '5 dk önce'
        },
        {
          key: 'api:response:market',
          type: 'API Response',
          size: '12.8 KB',
          ttl: '30m',
          hits: 234,
          lastAccess: '1 dk önce'
        }
      ];
      
      setCacheStats(mockStats);
      setCacheKeys(mockKeys);
      
    } catch (error) {
      console.error('Failed to load cache data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const clearCache = (type?: string) => {
    // Mock cache clearing
    alert(type ? `${type} cache temizlendi` : 'Tüm cache temizlendi');
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

  if (loading || dataLoading || !cacheStats) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
              <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Cache Yöneticisi</h1>
              <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Redis cache izleme ve yönetimi</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => clearCache()}
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#dc2626', color: '#f6f8f9' }}
              >
                Tüm Cache'i Temizle
              </button>
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
        {/* Cache Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Cache İstatistikleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Hit Rate</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{cacheStats.hitRate}%</p>
                </div>
                <div className="text-2xl">🎯</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Hit</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{cacheStats.totalHits.toLocaleString()}</p>
                </div>
                <div className="text-2xl">✅</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Miss</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{cacheStats.totalMisses.toLocaleString()}</p>
                </div>
                <div className="text-2xl">❌</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Boyut</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{cacheStats.totalSize}</p>
                </div>
                <div className="text-2xl">💾</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Evictions</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{cacheStats.evictions}</p>
                </div>
                <div className="text-2xl">🗑️</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Uptime</p>
                  <p className="text-lg font-bold" style={{ color: '#1e3237' }}>{cacheStats.uptime}</p>
                </div>
                <div className="text-2xl">⏰</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg p-1" style={{ backgroundColor: '#f6f8f9' }}>
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'overview' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'overview' ? '#146448' : 'transparent',
                color: activeTab === 'overview' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Genel Bakış
            </button>
            <button
              onClick={() => setActiveTab('keys')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'keys' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'keys' ? '#146448' : 'transparent',
                color: activeTab === 'keys' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Cache Keys
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
              Ayarlar
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Cache Performansı</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm" style={{ color: '#1e3237' }}>Hit Rate</span>
                      <span className="text-sm font-medium" style={{ color: '#146448' }}>{cacheStats.hitRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${cacheStats.hitRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm" style={{ color: '#1e3237' }}>Bellek Kullanımı</span>
                      <span className="text-sm font-medium" style={{ color: '#146448' }}>68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Cache Türleri</h3>
                <div className="space-y-3">
                  {[
                    { type: 'Session Cache', count: 1234, size: '45 MB' },
                    { type: 'API Response Cache', count: 892, size: '123 MB' },
                    { type: 'Analysis Cache', count: 456, size: '67 MB' },
                    { type: 'Static Content', count: 234, size: '12 MB' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium" style={{ color: '#1e3237' }}>{item.type}</p>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>{item.count} keys</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium" style={{ color: '#146448' }}>{item.size}</p>
                        <button 
                          onClick={() => clearCache(item.type)}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Temizle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Son Aktiviteler</h3>
              <div className="space-y-3">
                {[
                  { time: '14:30', action: 'Cache hit', key: 'user:session:1234' },
                  { time: '14:29', action: 'Key expired', key: 'analysis:climate:456' },
                  { time: '14:28', action: 'Cache miss', key: 'api:response:market' },
                  { time: '14:27', action: 'Key evicted', key: 'static:image:789' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <div>
                      <p className="font-medium" style={{ color: '#1e3237' }}>{activity.action}</p>
                      <p className="text-sm opacity-70 font-mono" style={{ color: '#1e3237' }}>{activity.key}</p>
                    </div>
                    <span className="text-sm" style={{ color: '#146448' }}>{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'keys' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Cache key ara..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#146448' }}
                />
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2">
                  <option>Tüm Türler</option>
                  <option>Session</option>
                  <option>Analysis</option>
                  <option>API Response</option>
                </select>
              </div>
              <button 
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                Yenile
              </button>
            </div>

            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Key</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Tür</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Boyut</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>TTL</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Hits</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Son Erişim</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cacheKeys.map((key, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <p className="font-mono text-sm" style={{ color: '#1e3237' }}>{key.key}</p>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {key.type}
                          </span>
                        </td>
                        <td className="p-4" style={{ color: '#1e3237' }}>{key.size}</td>
                        <td className="p-4" style={{ color: '#1e3237' }}>{key.ttl}</td>
                        <td className="p-4" style={{ color: '#1e3237' }}>{key.hits}</td>
                        <td className="p-4" style={{ color: '#1e3237' }}>{key.lastAccess}</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button 
                              className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                              style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                            >
                              İncele
                            </button>
                            <button 
                              className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                              style={{ backgroundColor: '#dc2626', color: '#f6f8f9' }}
                            >
                              Sil
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Cache Ayarları</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Maksimum Bellek Kullanımı
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2">
                    <option>1 GB</option>
                    <option>2 GB</option>
                    <option selected>4 GB</option>
                    <option>8 GB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Varsayılan TTL (Saniye)
                  </label>
                  <input
                    type="number"
                    value={3600}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Eviction Policy
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2">
                    <option selected>allkeys-lru</option>
                    <option>allkeys-lfu</option>
                    <option>volatile-lru</option>
                    <option>volatile-lfu</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="enable-compression" className="rounded" />
                  <label htmlFor="enable-compression" className="text-sm font-medium" style={{ color: '#1e3237' }}>
                    Compression Etkinleştir
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="enable-persistence" className="rounded" checked />
                  <label htmlFor="enable-persistence" className="text-sm font-medium" style={{ color: '#1e3237' }}>
                    Disk Persistence Etkinleştir
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                >
                  Ayarları Kaydet
                </button>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Bakım İşlemleri</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: '#1e3237' }}>Expired Keys Temizle</p>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Süresi dolmuş cache keys'leri temizle</p>
                  </div>
                  <button 
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Çalıştır
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: '#1e3237' }}>Memory Defrag</p>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Bellek parçalanmasını düzelt</p>
                  </div>
                  <button 
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Çalıştır
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: '#1e3237' }}>Cache Flush</p>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Tüm cache'i temizle (DİKKAT!)</p>
                  </div>
                  <button 
                    onClick={() => clearCache()}
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#dc2626', color: '#f6f8f9' }}
                  >
                    Flush
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
