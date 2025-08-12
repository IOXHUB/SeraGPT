'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

interface CacheEntry {
  key: string;
  type: 'string' | 'hash' | 'list' | 'set' | 'zset';
  ttl: number;
  size: string;
  lastAccessed: string;
  hitCount: number;
  category: string;
}

interface CacheStats {
  totalKeys: number;
  totalMemory: string;
  hitRate: number;
  missRate: number;
  evictedKeys: number;
  connections: number;
}

export default function CacheManagerPage() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'overview', title: 'Genel Bakış', icon: '📊' },
    { id: 'keys', title: 'Cache Keys', icon: '🔑' },
    { id: 'analytics', title: 'Analitik', icon: '📈' },
    { id: 'config', title: 'Konfigürasyon', icon: '⚙️' },
    { id: 'tools', title: 'Araçlar', icon: '🛠️' }
  ];

  const categories = ['Analysis', 'User Data', 'API Response', 'Session', 'System'];

  useEffect(() => {
    if (user && !loading) {
      loadCacheData();
    }
  }, [user, loading]);

  const loadCacheData = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);

      // Mock cache data
      const mockCacheEntries: CacheEntry[] = [
        {
          key: 'analysis:roi:user_123:hash_abc',
          type: 'hash',
          ttl: 3600,
          size: '2.3 KB',
          lastAccessed: '5 dakika önce',
          hitCount: 45,
          category: 'Analysis'
        },
        {
          key: 'user:session:sess_456',
          type: 'string',
          ttl: 1800,
          size: '512 B',
          lastAccessed: '2 dakika önce',
          hitCount: 23,
          category: 'Session'
        },
        {
          key: 'api:climate:antalya:data',
          type: 'hash',
          ttl: 7200,
          size: '4.1 KB',
          lastAccessed: '10 dakika önce',
          hitCount: 78,
          category: 'API Response'
        },
        {
          key: 'system:config:ai_models',
          type: 'list',
          ttl: -1,
          size: '1.8 KB',
          lastAccessed: '1 saat önce',
          hitCount: 156,
          category: 'System'
        },
        {
          key: 'user:profile:user_789',
          type: 'hash',
          ttl: 3600,
          size: '892 B',
          lastAccessed: '15 dakika önce',
          hitCount: 34,
          category: 'User Data'
        }
      ];

      const mockStats: CacheStats = {
        totalKeys: 2847,
        totalMemory: '45.2 MB',
        hitRate: 94.2,
        missRate: 5.8,
        evictedKeys: 123,
        connections: 8
      };

      setCacheEntries(mockCacheEntries);
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load cache data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'string': return 'bg-blue-100 text-blue-700';
      case 'hash': return 'bg-green-100 text-green-700';
      case 'list': return 'bg-yellow-100 text-yellow-700';
      case 'set': return 'bg-purple-100 text-purple-700';
      case 'zset': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Analysis': return 'bg-blue-100 text-blue-700';
      case 'User Data': return 'bg-green-100 text-green-700';
      case 'API Response': return 'bg-yellow-100 text-yellow-700';
      case 'Session': return 'bg-purple-100 text-purple-700';
      case 'System': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatTTL = (ttl: number) => {
    if (ttl === -1) return 'Kalıcı';
    if (ttl < 60) return `${ttl}s`;
    if (ttl < 3600) return `${Math.floor(ttl / 60)}m`;
    return `${Math.floor(ttl / 3600)}h`;
  };

  const filteredEntries = cacheEntries.filter(entry =>
    entry.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 bg-white/10 rounded"></div>
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
      {/* Header */}
      <header className="border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="text-2xl hover:opacity-70 transition-opacity"
                style={{ color: '#f6f8f9' }}
              >
                ←
              </Link>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Cache Yöneticisi</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Redis ve cache stratejileri</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadCacheData}
                disabled={dataLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  dataLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                {dataLoading ? '🔄 Yenileniyor...' : '🔄 Yenile'}
              </button>
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#f69200', color: '#f6f8f9' }}
              >
                🗑️ Cache Temizle
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        {stats && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Key</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{stats.totalKeys.toLocaleString()}</p>
                </div>
                <div className="text-2xl">🔑</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Cache anahtarları</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Bellek Kullanımı</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{stats.totalMemory}</p>
                </div>
                <div className="text-2xl">💾</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Redis memory</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Hit Rate</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{stats.hitRate}%</p>
                </div>
                <div className="text-2xl">🎯</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Cache başarı oranı</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Miss Rate</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{stats.missRate}%</p>
                </div>
                <div className="text-2xl">❌</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Cache miss oranı</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Evicted Keys</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{stats.evictedKeys}</p>
                </div>
                <div className="text-2xl">🗑️</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Silinmiş anahtarlar</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Bağlantılar</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{stats.connections}</p>
                </div>
                <div className="text-2xl">🔗</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Aktif bağlantı</p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'shadow-lg transform scale-105'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? '#baf200' : '#f6f8f9',
                  color: '#1e3237'
                }}
              >
                {tab.icon} {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Cache Durumu</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Bellek Dağılımı</h4>
                  <div className="space-y-4">
                    {categories.map((category, index) => {
                      const percentage = Math.random() * 30 + 10;
                      return (
                        <div key={category}>
                          <div className="flex justify-between mb-2">
                            <span style={{ color: '#1e3237' }}>{category}</span>
                            <span style={{ color: '#146448' }}>{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="h-3 rounded-full" 
                              style={{ 
                                backgroundColor: index % 2 === 0 ? '#baf200' : '#146448', 
                                width: `${percentage}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Performans Metrikleri</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <span style={{ color: '#1e3237' }}>Ortalama Hit Time</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>0.3ms</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <span style={{ color: '#1e3237' }}>Ortalama Miss Time</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>15.2ms</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <span style={{ color: '#1e3237' }}>Peak Memory</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>52.1 MB</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <span style={{ color: '#1e3237' }}>Network I/O</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>124 KB/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'keys' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold" style={{ color: '#f6f8f9' }}>Cache Keys</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Key ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                    style={{ borderColor: '#146448' }}
                  />
                  <select className="px-4 py-2 border rounded-lg" style={{ borderColor: '#146448' }}>
                    <option value="">Tüm Kategoriler</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredEntries.map((entry) => (
                  <div key={entry.key} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(entry.type)}`}>
                            {entry.type.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(entry.category)}`}>
                            {entry.category}
                          </span>
                          <span className="font-mono text-sm" style={{ color: '#146448' }}>{entry.key}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>TTL</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{formatTTL(entry.ttl)}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Boyut</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{entry.size}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Son Erişim</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{entry.lastAccessed}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Hit Count</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{entry.hitCount}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              className="px-2 py-1 rounded text-xs font-medium hover:opacity-90"
                              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                            >
                              👁️ Görüntüle
                            </button>
                            <button
                              className="px-2 py-1 rounded text-xs font-medium hover:opacity-90"
                              style={{ backgroundColor: '#f69200', color: '#f6f8f9' }}
                            >
                              🗑️ Sil
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Cache Analitik</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Hit/Miss Oranları (Son 24 Saat)</h4>
                  <div className="h-48 flex items-end justify-between space-x-1">
                    {Array.from({ length: 24 }, (_, i) => {
                      const hitRate = Math.random() * 30 + 70;
                      return (
                        <div key={i} className="flex-1 flex flex-col space-y-1">
                          <div
                            className="rounded-t"
                            style={{
                              backgroundColor: '#baf200',
                              height: `${hitRate}%`,
                              minHeight: '8px'
                            }}
                            title={`${i}:00 - Hit: ${hitRate.toFixed(1)}%`}
                          ></div>
                          <div
                            className="rounded-t"
                            style={{
                              backgroundColor: '#f69200',
                              height: `${100 - hitRate}%`,
                              minHeight: '4px'
                            }}
                            title={`${i}:00 - Miss: ${(100 - hitRate).toFixed(1)}%`}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs mt-2 opacity-70" style={{ color: '#1e3237' }}>
                    <span>00:00</span>
                    <span>12:00</span>
                    <span>24:00</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: '#baf200' }}></div>
                      <span style={{ color: '#1e3237' }}>Cache Hit</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f69200' }}></div>
                      <span style={{ color: '#1e3237' }}>Cache Miss</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Kategori Bazlı Performans</h4>
                  <div className="space-y-4">
                    {categories.map((category) => {
                      const hitRate = Math.random() * 20 + 80;
                      const avgTime = Math.random() * 2 + 0.5;
                      return (
                        <div key={category} className="p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium" style={{ color: '#1e3237' }}>{category}</span>
                            <span style={{ color: '#146448' }}>{hitRate.toFixed(1)}%</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="opacity-70" style={{ color: '#1e3237' }}>Ort. Yanıt</p>
                              <p style={{ color: '#146448' }}>{avgTime.toFixed(1)}ms</p>
                            </div>
                            <div>
                              <p className="opacity-70" style={{ color: '#1e3237' }}>Toplam Key</p>
                              <p style={{ color: '#146448' }}>{Math.floor(Math.random() * 500 + 100)}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Cache Konfigürasyonu</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Redis Ayarları</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Max Memory
                      </label>
                      <input 
                        type="text" 
                        defaultValue="100MB"
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Max Memory Policy
                      </label>
                      <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        <option value="allkeys-lru" selected>allkeys-lru</option>
                        <option value="volatile-lru">volatile-lru</option>
                        <option value="allkeys-random">allkeys-random</option>
                        <option value="volatile-random">volatile-random</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Default TTL (saniye)
                      </label>
                      <input 
                        type="number" 
                        defaultValue="3600"
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium" style={{ color: '#1e3237' }}>Persistence Aktif</h5>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                          Verileri diske kaydet
                        </p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Cache Stratejileri</h4>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium" style={{ color: '#1e3237' }}>Analysis Cache</span>
                        <input type="checkbox" className="w-5 h-5" defaultChecked />
                      </div>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                        Analiz sonuçlarını cache'le (TTL: 1 saat)
                      </p>
                    </div>
                    
                    <div className="p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium" style={{ color: '#1e3237' }}>API Response Cache</span>
                        <input type="checkbox" className="w-5 h-5" defaultChecked />
                      </div>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                        API yanıtlarını cache'le (TTL: 15 dakika)
                      </p>
                    </div>
                    
                    <div className="p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium" style={{ color: '#1e3237' }}>Session Cache</span>
                        <input type="checkbox" className="w-5 h-5" defaultChecked />
                      </div>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                        Kullanıcı oturumlarını cache'le (TTL: 30 dakika)
                      </p>
                    </div>
                    
                    <div className="p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium" style={{ color: '#1e3237' }}>Content Cache</span>
                        <input type="checkbox" className="w-5 h-5" />
                      </div>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                        Statik içerikleri cache'le (TTL: 24 saat)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                >
                  💾 Ayarları Kaydet
                </button>
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                >
                  🧪 Konfigürasyonu Test Et
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Cache Araçları</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>🗑️ Cache Temizleme</h4>
                  <p className="text-sm opacity-70 mb-4" style={{ color: '#1e3237' }}>
                    Belirtilen pattern'e göre cache'leri temizle
                  </p>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Pattern (örn: analysis:*)"
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                    />
                    <button
                      className="w-full py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#f69200', color: '#f6f8f9' }}
                    >
                      Temizle
                    </button>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>🔧 Cache Warmup</h4>
                  <p className="text-sm opacity-70 mb-4" style={{ color: '#1e3237' }}>
                    Sık kullanılan verileri önceden cache'le
                  </p>
                  <div className="space-y-3">
                    <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <option value="analysis">Analiz Verileri</option>
                      <option value="users">Kullanıcı Profilleri</option>
                      <option value="config">Sistem Ayarları</option>
                    </select>
                    <button
                      className="w-full py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      Warmup Başlat
                    </button>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>📊 Analiz Raporu</h4>
                  <p className="text-sm opacity-70 mb-4" style={{ color: '#1e3237' }}>
                    Cache performans raporunu oluştur
                  </p>
                  <div className="space-y-3">
                    <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <option value="daily">Günlük Rapor</option>
                      <option value="weekly">Haftalık Rapor</option>
                      <option value="monthly">Aylık Rapor</option>
                    </select>
                    <button
                      className="w-full py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                    >
                      Rapor Oluştur
                    </button>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>💾 Yedekleme</h4>
                  <p className="text-sm opacity-70 mb-4" style={{ color: '#1e3237' }}>
                    Redis verilerinin yedeklerini al
                  </p>
                  <div className="space-y-3">
                    <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <option value="full">Tam Yedek</option>
                      <option value="incremental">Artırımlı Yedek</option>
                    </select>
                    <button
                      className="w-full py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                    >
                      Yedek Al
                    </button>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>🔍 Key Explorer</h4>
                  <p className="text-sm opacity-70 mb-4" style={{ color: '#1e3237' }}>
                    Cache key'lerini detaylı incele
                  </p>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Key pattern (örn: user:*)"
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                    />
                    <button
                      className="w-full py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      Keşfet
                    </button>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>⚡ Performance Test</h4>
                  <p className="text-sm opacity-70 mb-4" style={{ color: '#1e3237' }}>
                    Cache performansını test et
                  </p>
                  <div className="space-y-3">
                    <input 
                      type="number" 
                      placeholder="Test sayısı"
                      defaultValue="1000"
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                    />
                    <button
                      className="w-full py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                    >
                      Test Başlat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
