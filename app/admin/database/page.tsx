'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface DatabaseStats {
  totalConnections: number;
  activeQueries: number;
  databaseSize: string;
  lastBackup: string;
  uptime: string;
}

interface TableInfo {
  name: string;
  rows: number;
  size: string;
  lastUpdate: string;
}

export default function DatabaseManager() {
  const { user, isAdmin, loading } = useAuth();
  const [dbStats, setDbStats] = useState<DatabaseStats | null>(null);
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'tables' | 'queries' | 'backup'>('overview');

  useEffect(() => {
    if (user && !loading) {
      loadDatabaseData();
    }
  }, [user, loading]);

  const loadDatabaseData = async () => {
    if (!isAdmin()) {
      window.location.href = '/dashboard';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock database data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStats: DatabaseStats = {
        totalConnections: 45,
        activeQueries: 12,
        databaseSize: '2.3 GB',
        lastBackup: '2024-01-15 03:00',
        uptime: '15 gün 8 saat'
      };

      const mockTables: TableInfo[] = [
        { name: 'users', rows: 1847, size: '45.2 MB', lastUpdate: '2024-01-15 14:30' },
        { name: 'analyses', rows: 5634, size: '234.5 MB', lastUpdate: '2024-01-15 14:25' },
        { name: 'chat_messages', rows: 12456, size: '89.3 MB', lastUpdate: '2024-01-15 14:20' },
        { name: 'user_tokens', rows: 892, size: '12.1 MB', lastUpdate: '2024-01-15 14:15' },
        { name: 'system_logs', rows: 34567, size: '145.8 MB', lastUpdate: '2024-01-15 14:10' }
      ];
      
      setDbStats(mockStats);
      setTables(mockTables);
      
    } catch (error) {
      console.error('Failed to load database data:', error);
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

  if (loading || dataLoading || !dbStats) {
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
              <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Veritabanı Yönetimi</h1>
              <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Supabase veritabanı izleme ve yönetimi</p>
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
        {/* Database Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Veritabanı İstatistikleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Bağlantı</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{dbStats.totalConnections}</p>
                </div>
                <div className="text-2xl">🔗</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Sorgu</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{dbStats.activeQueries}</p>
                </div>
                <div className="text-2xl">⚡</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>DB Boyutu</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{dbStats.databaseSize}</p>
                </div>
                <div className="text-2xl">💾</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Son Yedek</p>
                  <p className="text-lg font-bold" style={{ color: '#1e3237' }}>{dbStats.lastBackup}</p>
                </div>
                <div className="text-2xl">📁</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Uptime</p>
                  <p className="text-lg font-bold" style={{ color: '#1e3237' }}>{dbStats.uptime}</p>
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
              onClick={() => setActiveTab('tables')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'tables' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'tables' ? '#146448' : 'transparent',
                color: activeTab === 'tables' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Tablolar
            </button>
            <button
              onClick={() => setActiveTab('queries')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'queries' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'queries' ? '#146448' : 'transparent',
                color: activeTab === 'queries' ? '#f6f8f9' : '#1e3237'
              }}
            >
              SQL Sorguları
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'backup' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'backup' ? '#146448' : 'transparent',
                color: activeTab === 'backup' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Yedekleme
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Veritabanı Performansı</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: '#1e3237' }}>Sorgu Performansı</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-sm mt-1" style={{ color: '#146448' }}>Mükemmel (85/100)</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: '#1e3237' }}>Bağlantı Havuzu</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <p className="text-sm mt-1" style={{ color: '#146448' }}>Orta (68/100)</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: '#1e3237' }}>Disk Kullanımı</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-sm mt-1" style={{ color: '#146448' }}>İyi (45/100)</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Son Aktiviteler</h3>
              <div className="space-y-3">
                {[
                  { time: '14:30', action: 'Yeni kullanıcı kaydı', table: 'users' },
                  { time: '14:25', action: 'Analiz sonucu kaydedildi', table: 'analyses' },
                  { time: '14:20', action: 'Chat mesajı eklendi', table: 'chat_messages' },
                  { time: '14:15', action: 'Token güncellendi', table: 'user_tokens' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <div>
                      <p className="font-medium" style={{ color: '#1e3237' }}>{activity.action}</p>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Tablo: {activity.table}</p>
                    </div>
                    <span className="text-sm" style={{ color: '#146448' }}>{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tables' && (
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Tablo Adı</th>
                    <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Satır Sayısı</th>
                    <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Boyut</th>
                    <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Son Güncelleme</th>
                    <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {tables.map((table, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-medium" style={{ color: '#1e3237' }}>{table.name}</p>
                      </td>
                      <td className="p-4" style={{ color: '#1e3237' }}>{table.rows.toLocaleString()}</td>
                      <td className="p-4" style={{ color: '#1e3237' }}>{table.size}</td>
                      <td className="p-4" style={{ color: '#1e3237' }}>{table.lastUpdate}</td>
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
                            style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                          >
                            Optimize Et
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

        {activeTab === 'queries' && (
          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>SQL Sorgu Editörü</h3>
              <div className="space-y-4">
                <textarea
                  placeholder="SELECT * FROM users WHERE created_at >= NOW() - INTERVAL '7 days';"
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#146448' }}
                />
                <div className="flex space-x-4">
                  <button 
                    className="px-6 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                  >
                    Sorguyu Çalıştır
                  </button>
                  <button 
                    className="px-6 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Formatla
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Yavaş Sorgular</h3>
              <div className="space-y-3">
                {[
                  { query: 'SELECT * FROM analyses WHERE...', duration: '2.34s', count: 12 },
                  { query: 'UPDATE users SET last_login...', duration: '1.89s', count: 8 },
                  { query: 'SELECT COUNT(*) FROM chat_messages...', duration: '1.56s', count: 15 }
                ].map((query, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-mono text-sm" style={{ color: '#1e3237' }}>{query.query}</p>
                        <p className="text-sm opacity-70 mt-1" style={{ color: '#1e3237' }}>
                          {query.count} kez çalıştırıldı
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {query.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Otomatik Yedekleme</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: '#1e3237' }}>Günlük Yedekleme</p>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Her gün saat 03:00'te otomatik yedekleme</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Aktif
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: '#1e3237' }}>Haftalık Tam Yedekleme</p>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Her Pazar tam veritabanı yedeklemesi</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Aktif
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Manuel Yedekleme</h3>
              <div className="space-y-4">
                <button 
                  className="w-full px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                >
                  Şimdi Tam Yedekleme Yap
                </button>
                <button 
                  className="w-full px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                >
                  Şimdi Artımlı Yedekleme Yap
                </button>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Son Yedeklemeler</h3>
              <div className="space-y-3">
                {[
                  { date: '2024-01-15 03:00', type: 'Günlük', size: '892 MB', status: 'Başarılı' },
                  { date: '2024-01-14 03:00', type: 'Günlük', size: '887 MB', status: 'Başarılı' },
                  { date: '2024-01-14 03:00', type: 'Haftalık', size: '2.3 GB', status: 'Başarılı' }
                ].map((backup, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <div>
                      <p className="font-medium" style={{ color: '#1e3237' }}>{backup.type} Yedekleme</p>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                        {backup.date} • {backup.size}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {backup.status}
                      </span>
                      <button 
                        className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                        style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                      >
                        İndir
                      </button>
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
