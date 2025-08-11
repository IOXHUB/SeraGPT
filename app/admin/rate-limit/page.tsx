'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface RateLimitRule {
  id: string;
  name: string;
  endpoint: string;
  limit: number;
  window: string;
  status: 'active' | 'disabled';
  requests: number;
  blocked: number;
}

interface BlockedIP {
  ip: string;
  reason: string;
  blockedAt: string;
  attempts: number;
  location: string;
}

export default function RateLimitManager() {
  const { user, isAdmin, loading } = useAuth();
  const [rateLimitRules, setRateLimitRules] = useState<RateLimitRule[]>([]);
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'rules' | 'blocked' | 'analytics'>('rules');

  useEffect(() => {
    if (user && !loading) {
      loadRateLimitData();
    }
  }, [user, loading]);

  const loadRateLimitData = async () => {
    if (!isAdmin()) {
      window.location.href = '/dashboard';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock rate limit data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockRules: RateLimitRule[] = [
        {
          id: '1',
          name: 'API Genel Limit',
          endpoint: '/api/*',
          limit: 100,
          window: '1 saat',
          status: 'active',
          requests: 8450,
          blocked: 23
        },
        {
          id: '2',
          name: 'Analiz API',
          endpoint: '/api/analysis/*',
          limit: 10,
          window: '1 dakika',
          status: 'active',
          requests: 1234,
          blocked: 5
        },
        {
          id: '3',
          name: 'Auth Endpoints',
          endpoint: '/api/auth/*',
          limit: 5,
          window: '1 dakika',
          status: 'active',
          requests: 567,
          blocked: 12
        },
        {
          id: '4',
          name: 'Email API',
          endpoint: '/api/send-email',
          limit: 3,
          window: '5 dakika',
          status: 'active',
          requests: 89,
          blocked: 2
        }
      ];

      const mockBlockedIPs: BlockedIP[] = [
        {
          ip: '192.168.1.100',
          reason: 'Çok fazla API isteği',
          blockedAt: '2024-01-15 14:30',
          attempts: 156,
          location: 'İstanbul, TR'
        },
        {
          ip: '10.0.0.50',
          reason: 'Şüpheli aktivite',
          blockedAt: '2024-01-15 13:45',
          attempts: 89,
          location: 'Moskova, RU'
        },
        {
          ip: '203.45.67.89',
          reason: 'Brute force saldırısı',
          blockedAt: '2024-01-15 12:20',
          attempts: 234,
          location: 'Beijing, CN'
        }
      ];
      
      setRateLimitRules(mockRules);
      setBlockedIPs(mockBlockedIPs);
      
    } catch (error) {
      console.error('Failed to load rate limit data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const toggleRule = (ruleId: string) => {
    setRateLimitRules(rules => 
      rules.map(rule => 
        rule.id === ruleId 
          ? { ...rule, status: rule.status === 'active' ? 'disabled' : 'active' }
          : rule
      )
    );
  };

  const unblockIP = (ip: string) => {
    setBlockedIPs(ips => ips.filter(blocked => blocked.ip !== ip));
    alert(`${ip} adresinin engellemesi kaldırıldı`);
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
              <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Rate Limiting</h1>
              <p style={{ color: '#f6f8f9', opacity: '0.8' }}>API hız limitleri ve güvenlik kuralları</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
              >
                + Yeni Kural Ekle
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
        {/* Rate Limit Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Genel İstatistikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Kurallar</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    {rateLimitRules.filter(rule => rule.status === 'active').length}
                  </p>
                </div>
                <div className="text-2xl">⚡</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam İstek</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    {rateLimitRules.reduce((sum, rule) => sum + rule.requests, 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-2xl">📊</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Engellenen</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    {rateLimitRules.reduce((sum, rule) => sum + rule.blocked, 0)}
                  </p>
                </div>
                <div className="text-2xl">🚫</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Bloklu IP</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{blockedIPs.length}</p>
                </div>
                <div className="text-2xl">🔒</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg p-1" style={{ backgroundColor: '#f6f8f9' }}>
            <button
              onClick={() => setActiveTab('rules')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'rules' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'rules' ? '#146448' : 'transparent',
                color: activeTab === 'rules' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Rate Limit Kuralları
            </button>
            <button
              onClick={() => setActiveTab('blocked')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'blocked' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'blocked' ? '#146448' : 'transparent',
                color: activeTab === 'blocked' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Engellenen IP'ler
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
              Analytics
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'rules' && (
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Kural Adı</th>
                    <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Endpoint</th>
                    <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Limit</th>
                    <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Durum</th>
                    <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>İstekler</th>
                    <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Engellenen</th>
                    <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {rateLimitRules.map((rule) => (
                    <tr key={rule.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-medium" style={{ color: '#1e3237' }}>{rule.name}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-mono text-sm" style={{ color: '#1e3237' }}>{rule.endpoint}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-medium" style={{ color: '#1e3237' }}>{rule.limit} / {rule.window}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {rule.status === 'active' ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td className="p-4" style={{ color: '#1e3237' }}>{rule.requests.toLocaleString()}</td>
                      <td className="p-4">
                        <span className="font-medium text-red-600">{rule.blocked}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => toggleRule(rule.id)}
                            className={`px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90 ${
                              rule.status === 'active' 
                                ? 'text-white' 
                                : 'text-white'
                            }`}
                            style={{ 
                              backgroundColor: rule.status === 'active' ? '#dc2626' : '#146448'
                            }}
                          >
                            {rule.status === 'active' ? 'Devre Dışı' : 'Etkinleştir'}
                          </button>
                          <button 
                            className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                            style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                          >
                            Düzenle
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'blocked' && (
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>IP Adresi</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Konum</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Sebep</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Deneme Sayısı</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Engellenme Zamanı</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blockedIPs.map((blocked, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <p className="font-mono font-medium" style={{ color: '#1e3237' }}>{blocked.ip}</p>
                        </td>
                        <td className="p-4" style={{ color: '#1e3237' }}>{blocked.location}</td>
                        <td className="p-4" style={{ color: '#1e3237' }}>{blocked.reason}</td>
                        <td className="p-4">
                          <span className="font-medium text-red-600">{blocked.attempts}</span>
                        </td>
                        <td className="p-4" style={{ color: '#1e3237' }}>{blocked.blockedAt}</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => unblockIP(blocked.ip)}
                              className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                              style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                            >
                              Engeli Kaldır
                            </button>
                            <button 
                              className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                            >
                              Detaylar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Manuel IP Engelleme</h3>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="IP Adresi (örn: 192.168.1.1)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#146448' }}
                />
                <input
                  type="text"
                  placeholder="Sebep"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#146448' }}
                />
                <button 
                  className="px-6 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#dc2626', color: '#f6f8f9' }}
                >
                  Engelle
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>En Çok Engellenen Endpoint'ler</h3>
                <div className="space-y-3">
                  {[
                    { endpoint: '/api/auth/login', blocked: 45, percentage: 38 },
                    { endpoint: '/api/analysis/climate', blocked: 23, percentage: 25 },
                    { endpoint: '/api/send-email', blocked: 18, percentage: 20 },
                    { endpoint: '/api/test-ai', blocked: 12, percentage: 17 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-mono text-sm" style={{ color: '#1e3237' }}>{item.endpoint}</p>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="bg-red-500 h-1 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="font-medium text-red-600">{item.blocked}</p>
                        <p className="text-xs opacity-70" style={{ color: '#1e3237' }}>engelleme</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Ülke Bazında Engelleme</h3>
                <div className="space-y-3">
                  {[
                    { country: 'Çin', flag: '🇨🇳', blocked: 89, percentage: 45 },
                    { country: 'Rusya', flag: '🇷🇺', blocked: 67, percentage: 34 },
                    { country: 'ABD', flag: '🇺🇸', blocked: 34, percentage: 17 },
                    { country: 'Diğer', flag: '🌍', blocked: 8, percentage: 4 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="text-xl">{item.flag}</span>
                        <div className="flex-1">
                          <p className="font-medium" style={{ color: '#1e3237' }}>{item.country}</p>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className="bg-red-500 h-1 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="font-medium text-red-600">{item.blocked}</p>
                        <p className="text-xs opacity-70" style={{ color: '#1e3237' }}>IP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Son 24 Saat Rate Limit İstatistikleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold" style={{ color: '#146448' }}>10,847</p>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam İstek</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">198</p>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Engellenen İstek</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold" style={{ color: '#146448' }}>98.2%</p>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Başarı Oranı</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold" style={{ color: '#146448' }}>45ms</p>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Ort. Yanıt Süresi</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
