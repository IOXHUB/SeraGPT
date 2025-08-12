'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

interface BackupJob {
  id: string;
  type: 'database' | 'files' | 'full';
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  progress: number;
  startTime: string;
  endTime?: string;
  size: number;
  location: string;
  retention: number;
}

interface BackupStats {
  totalBackups: number;
  totalSize: string;
  lastBackup: string;
  successRate: number;
  nextScheduled: string;
  storageUsed: number;
  storageLimit: number;
}

export default function BackupSystemPage() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [backups, setBackups] = useState<BackupJob[]>([]);
  const [stats, setStats] = useState<BackupStats | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  const tabs = [
    { id: 'overview', title: 'Genel Bakış', icon: '📊' },
    { id: 'backups', title: 'Yedekler', icon: '💾' },
    { id: 'schedule', title: 'Zamanlama', icon: '⏰' },
    { id: 'restore', title: 'Geri Yükleme', icon: '🔄' },
    { id: 'settings', title: 'Ayarlar', icon: '⚙️' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadBackupData();
    }
  }, [user, loading]);

  const loadBackupData = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);

      // Mock backup data
      const mockBackups: BackupJob[] = [
        {
          id: 'backup-001',
          type: 'full',
          status: 'running',
          progress: 65,
          startTime: '30 dakika önce',
          size: 2.4,
          location: 'AWS S3',
          retention: 30
        },
        {
          id: 'backup-002',
          type: 'database',
          status: 'completed',
          progress: 100,
          startTime: '2 saat önce',
          endTime: '1.5 saat önce',
          size: 1.2,
          location: 'AWS S3',
          retention: 30
        },
        {
          id: 'backup-003',
          type: 'files',
          status: 'completed',
          progress: 100,
          startTime: '6 saat önce',
          endTime: '5.5 saat önce',
          size: 0.8,
          location: 'Google Cloud',
          retention: 15
        },
        {
          id: 'backup-004',
          type: 'database',
          status: 'failed',
          progress: 45,
          startTime: '1 gün önce',
          size: 0,
          location: 'AWS S3',
          retention: 30
        }
      ];

      const mockStats: BackupStats = {
        totalBackups: 156,
        totalSize: '47.2 GB',
        lastBackup: '30 dakika önce',
        successRate: 98.7,
        nextScheduled: '6 saat sonra',
        storageUsed: 47.2,
        storageLimit: 100
      };

      setBackups(mockBackups);
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load backup data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'scheduled': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return 'Çalışıyor';
      case 'completed': return 'Tamamlandı';
      case 'failed': return 'Başarısız';
      case 'scheduled': return 'Zamanlandı';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'database': return 'Veritabanı';
      case 'files': return 'Dosyalar';
      case 'full': return 'Tam Yedek';
      default: return type;
    }
  };

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
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Yedekleme Sistemi</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Otomatik yedekler ve geri yükleme</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadBackupData}
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
                style={{ backgroundColor: '#f6f8f9', color: '#1e3237' }}
              >
                💾 Yedek Başlat
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        {stats && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Yedek</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{stats.totalBackups}</p>
                </div>
                <div className="text-2xl">💾</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Son: {stats.lastBackup}</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Boyut</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{stats.totalSize}</p>
                </div>
                <div className="text-2xl">📊</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>
                {stats.storageUsed}GB / {stats.storageLimit}GB kullanıldı
              </p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Başarı Oranı</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{stats.successRate}%</p>
                </div>
                <div className="text-2xl">✅</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Son 30 gün</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Sonraki Yedek</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>6h</p>
                </div>
                <div className="text-2xl">⏰</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>{stats.nextScheduled}</p>
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
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Sistem Durumu</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Depolama Kullanımı</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span style={{ color: '#1e3237' }}>AWS S3</span>
                        <span style={{ color: '#146448' }}>32.1 GB / 50 GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="h-3 rounded-full" style={{ backgroundColor: '#baf200', width: '64%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span style={{ color: '#1e3237' }}>Google Cloud</span>
                        <span style={{ color: '#146448' }}>15.1 GB / 50 GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="h-3 rounded-full" style={{ backgroundColor: '#146448', width: '30%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Son Aktiviteler</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#baf200' }}></div>
                      <span className="text-sm" style={{ color: '#1e3237' }}>Tam yedekleme başlatıldı</span>
                      <span className="text-xs opacity-60" style={{ color: '#1e3237' }}>30 dk önce</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#146448' }}></div>
                      <span className="text-sm" style={{ color: '#1e3237' }}>Veritabanı yedekleme tamamlandı</span>
                      <span className="text-xs opacity-60" style={{ color: '#1e3237' }}>2 saat önce</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#146448' }}></div>
                      <span className="text-sm" style={{ color: '#1e3237' }}>Dosya yedekleme tamamlandı</span>
                      <span className="text-xs opacity-60" style={{ color: '#1e3237' }}>6 saat önce</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backups' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Yedekleme Geçmişi</h3>
              <div className="space-y-4">
                {backups.map((backup) => (
                  <div key={backup.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h4 className="font-semibold" style={{ color: '#1e3237' }}>
                            {getTypeText(backup.type)} Yedek
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(backup.status)}`}>
                            {getStatusText(backup.status)}
                          </span>
                        </div>
                        
                        {backup.status === 'running' && (
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span style={{ color: '#1e3237', opacity: '0.7' }}>İlerleme</span>
                              <span style={{ color: '#146448' }}>{backup.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all duration-300" 
                                style={{ backgroundColor: '#baf200', width: `${backup.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Başlangıç</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{backup.startTime}</p>
                          </div>
                          {backup.endTime && (
                            <div>
                              <p className="opacity-70" style={{ color: '#1e3237' }}>Bitiş</p>
                              <p className="font-medium" style={{ color: '#146448' }}>{backup.endTime}</p>
                            </div>
                          )}
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Boyut</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {backup.size > 0 ? `${backup.size} GB` : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Konum</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{backup.location}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6 flex space-x-2">
                        {backup.status === 'completed' && (
                          <>
                            <button
                              className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                              style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                            >
                              🔄 Geri Yükle
                            </button>
                            <button
                              className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                            >
                              📥 İndir
                            </button>
                          </>
                        )}
                        {backup.status === 'running' && (
                          <button
                            className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                            style={{ backgroundColor: '#f69200', color: '#f6f8f9' }}
                          >
                            ⏸️ Duraklat
                          </button>
                        )}
                        {backup.status === 'failed' && (
                          <button
                            className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                            style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                          >
                            🔄 Yeniden Dene
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Yedekleme Zamanlaması</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Otomatik Yedeklemeler</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <div>
                        <h5 className="font-medium" style={{ color: '#1e3237' }}>Günlük Veritabanı Yedek</h5>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Her gün 02:00'da</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <div>
                        <h5 className="font-medium" style={{ color: '#1e3237' }}>Haftalık Tam Yedek</h5>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Her Pazar 01:00'da</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <div>
                        <h5 className="font-medium" style={{ color: '#1e3237' }}>Aylık Arşiv Yedek</h5>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Her ayın 1'inde</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Yeni Zamanlama Oluştur</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Yedek Türü
                      </label>
                      <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        <option value="database">Veritabanı</option>
                        <option value="files">Dosyalar</option>
                        <option value="full">Tam Yedek</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Sıklık
                      </label>
                      <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        <option value="daily">Günlük</option>
                        <option value="weekly">Haftalık</option>
                        <option value="monthly">Aylık</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Saat
                      </label>
                      <input 
                        type="time" 
                        defaultValue="02:00"
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                    
                    <button
                      className="w-full py-3 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      ⏰ Zamanlama Oluştur
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'restore' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Geri Yükleme</h3>
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Mevcut Yedeklerden Geri Yükle</h4>
                    <div className="space-y-3">
                      {backups.filter(b => b.status === 'completed').map((backup) => (
                        <div key={backup.id} className="p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                          <div className="flex justify-between items-center">
                            <div>
                              <h5 className="font-medium" style={{ color: '#1e3237' }}>
                                {getTypeText(backup.type)} - {backup.startTime}
                              </h5>
                              <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                                {backup.size} GB • {backup.location}
                              </p>
                            </div>
                            <button
                              className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                              style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                            >
                              Geri Yükle
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Dosyadan Geri Yükle</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                          Yedek Dosyası
                        </label>
                        <input 
                          type="file" 
                          className="w-full p-3 border rounded-lg" 
                          style={{ borderColor: '#146448' }}
                          accept=".sql,.tar.gz,.zip"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                          Geri Yükleme Türü
                        </label>
                        <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                          <option value="full">Tam Geri Yükleme</option>
                          <option value="partial">Kısmi Geri Yükleme</option>
                          <option value="merge">Birleştirme</option>
                        </select>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                        <h5 className="font-medium text-yellow-800 mb-2">⚠️ Uyarı</h5>
                        <p className="text-sm text-yellow-700">
                          Geri yükleme işlemi mevcut verilerin üzerine yazacaktır. 
                          İşleme başlamadan önce güncel bir yedek almanızı öneririz.
                        </p>
                      </div>
                      
                      <button
                        className="w-full py-3 rounded-lg font-medium transition-all hover:opacity-90"
                        style={{ backgroundColor: '#f69200', color: '#f6f8f9' }}
                      >
                        🔄 Geri Yükleme Başlat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Yedekleme Ayarları</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Depolama Ayarları</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Varsayılan Depolama
                      </label>
                      <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        <option value="aws">AWS S3</option>
                        <option value="gcp">Google Cloud Storage</option>
                        <option value="azure">Azure Blob Storage</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Varsayılan Saklama Süresi (gün)
                      </label>
                      <input 
                        type="number" 
                        defaultValue="30"
                        min="1"
                        max="365"
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Sıkıştırma Seviyesi
                      </label>
                      <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        <option value="none">Sıkıştırma Yok</option>
                        <option value="low">Düşük</option>
                        <option value="medium" selected>Orta</option>
                        <option value="high">Yüksek</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Bildirim Ayarları</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium" style={{ color: '#1e3237' }}>Başarılı Yedekleme</h5>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                          Yedekleme tamamlandığında bildir
                        </p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium" style={{ color: '#1e3237' }}>Başarısız Yedekleme</h5>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                          Yedekleme başarısız olduğunda bildir
                        </p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium" style={{ color: '#1e3237' }}>Depolama Uyarısı</h5>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                          Depolama %80 dolduğunda bildir
                        </p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Bildirim E-postası
                      </label>
                      <input 
                        type="email" 
                        defaultValue="admin@seragpt.com"
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
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
                  🧪 Bağlantıyı Test Et
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
