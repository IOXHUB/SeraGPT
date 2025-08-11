'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface BackupRecord {
  id: string;
  type: 'database' | 'files' | 'full' | 'incremental';
  status: 'completed' | 'running' | 'failed' | 'scheduled';
  startTime: string;
  endTime?: string;
  duration?: number;
  size: string;
  description: string;
  downloadUrl?: string;
  progress?: number;
  errorMessage?: string;
}

interface BackupSchedule {
  id: string;
  name: string;
  type: 'database' | 'files' | 'full';
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  enabled: boolean;
  lastRun?: string;
  nextRun: string;
  retention: number; // days
}

export default function BackupSystemPage() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [backupRecords, setBackupRecords] = useState<BackupRecord[]>([]);
  const [backupSchedules, setBackupSchedules] = useState<BackupSchedule[]>([]);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const tabs = [
    { id: 'overview', title: 'Genel Bakış', icon: '📊' },
    { id: 'backups', title: 'Yedekler', icon: '💾' },
    { id: 'schedule', title: 'Zamanlanmış', icon: '⏰' },
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockBackups: BackupRecord[] = [
        {
          id: 'backup-001',
          type: 'full',
          status: 'completed',
          startTime: '2024-03-15 02:00:00',
          endTime: '2024-03-15 02:45:23',
          duration: 2723000, // ms
          size: '2.4 GB',
          description: 'Haftalık tam yedekleme',
          downloadUrl: '/api/admin/backup/download/backup-001'
        },
        {
          id: 'backup-002',
          type: 'database',
          status: 'completed',
          startTime: '2024-03-15 01:00:00',
          endTime: '2024-03-15 01:15:45',
          duration: 945000,
          size: '145 MB',
          description: 'Günlük veritabanı yedeklemesi',
          downloadUrl: '/api/admin/backup/download/backup-002'
        },
        {
          id: 'backup-003',
          type: 'incremental',
          status: 'running',
          startTime: '2024-03-15 16:00:00',
          size: '~50 MB',
          description: 'Artımlı yedekleme (devam ediyor)',
          progress: 75
        },
        {
          id: 'backup-004',
          type: 'files',
          status: 'failed',
          startTime: '2024-03-14 23:00:00',
          size: '0 MB',
          description: 'Dosya yedeklemesi',
          errorMessage: 'Disk alanı yetersiz'
        },
        {
          id: 'backup-005',
          type: 'database',
          status: 'scheduled',
          startTime: '2024-03-16 01:00:00',
          size: '~150 MB',
          description: 'Zamanlanmış veritabanı yedeklemesi'
        }
      ];

      const mockSchedules: BackupSchedule[] = [
        {
          id: 'schedule-001',
          name: 'Günlük Veritabanı Yedeklemesi',
          type: 'database',
          frequency: 'daily',
          time: '01:00',
          enabled: true,
          lastRun: '2024-03-15 01:00:00',
          nextRun: '2024-03-16 01:00:00',
          retention: 30
        },
        {
          id: 'schedule-002',
          name: 'Haftalık Tam Yedekleme',
          type: 'full',
          frequency: 'weekly',
          time: '02:00',
          enabled: true,
          lastRun: '2024-03-15 02:00:00',
          nextRun: '2024-03-22 02:00:00',
          retention: 90
        },
        {
          id: 'schedule-003',
          name: 'Aylık Arşiv Yedeklemesi',
          type: 'full',
          frequency: 'monthly',
          time: '03:00',
          enabled: true,
          lastRun: '2024-03-01 03:00:00',
          nextRun: '2024-04-01 03:00:00',
          retention: 365
        },
        {
          id: 'schedule-004',
          name: 'Dosya Yedeklemesi',
          type: 'files',
          frequency: 'weekly',
          time: '23:00',
          enabled: false,
          nextRun: '2024-03-22 23:00:00',
          retention: 60
        }
      ];
      
      setBackupRecords(mockBackups);
      setBackupSchedules(mockSchedules);
      
    } catch (error) {
      console.error('Failed to load backup data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const createManualBackup = async (type: string) => {
    setIsCreatingBackup(true);
    
    try {
      // Simulate backup creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newBackup: BackupRecord = {
        id: `backup-${Date.now()}`,
        type: type as any,
        status: 'running',
        startTime: new Date().toISOString(),
        size: '~200 MB',
        description: `Manuel ${type} yedeklemesi`,
        progress: 0
      };
      
      setBackupRecords(prev => [newBackup, ...prev]);
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setBackupRecords(prev => prev.map(backup => 
          backup.id === newBackup.id 
            ? { 
                ...backup, 
                progress: Math.min((backup.progress || 0) + 10, 100),
                status: backup.progress === 90 ? 'completed' : 'running',
                endTime: backup.progress === 90 ? new Date().toISOString() : undefined
              }
            : backup
        ));
      }, 500);
      
      setTimeout(() => clearInterval(progressInterval), 5000);
      
    } catch (error) {
      console.error('Backup creation failed:', error);
    } finally {
      setIsCreatingBackup(false);
    }
  };

  const toggleSchedule = (scheduleId: string) => {
    setBackupSchedules(prev => prev.map(schedule =>
      schedule.id === scheduleId
        ? { ...schedule, enabled: !schedule.enabled }
        : schedule
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'running': return '#3B82F6';
      case 'failed': return '#EF4444';
      case 'scheduled': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Tamamlandı';
      case 'running': return 'Çalışıyor';
      case 'failed': return 'Başarısız';
      case 'scheduled': return 'Zamanlandı';
      default: return 'Bilinmiyor';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'database': return '🗄️';
      case 'files': return '📁';
      case 'full': return '💾';
      case 'incremental': return '📈';
      default: return '💽';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'database': return 'Veritabanı';
      case 'files': return 'Dosyalar';
      case 'full': return 'Tam Yedek';
      case 'incremental': return 'Artımlı';
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
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
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Veri yedekleme ve geri yükleme merkezi</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => createManualBackup('database')}
                disabled={isCreatingBackup}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isCreatingBackup ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                {isCreatingBackup ? '⏳ Oluşturuluyor...' : '💾 Hızlı Yedek'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* System Overview Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Yedekleme Durumu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Yedek</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    {backupRecords.filter(b => b.status === 'completed').length}
                  </p>
                </div>
                <div className="text-2xl">💾</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Son 30 gün</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Son Yedek</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    {backupRecords.find(b => b.status === 'completed') ? '✅' : '❌'}
                  </p>
                </div>
                <div className="text-2xl">🕐</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>
                {backupRecords.find(b => b.status === 'completed')?.startTime 
                  ? new Date(backupRecords.find(b => b.status === 'completed')!.startTime).toLocaleDateString('tr-TR')
                  : 'Henüz yok'}
              </p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Boyut</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>12.8 GB</p>
                </div>
                <div className="text-2xl">📊</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Depolama kullanımı</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Zamanlama</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    {backupSchedules.filter(s => s.enabled).length}
                  </p>
                </div>
                <div className="text-2xl">⏰</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>
                {backupSchedules.length} toplam
              </p>
            </div>
          </div>
        </div>

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Son Yedeklemeler</h3>
                <div className="space-y-4">
                  {backupRecords.slice(0, 4).map((backup) => (
                    <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(backup.type)}</span>
                        <div>
                          <p className="font-medium" style={{ color: '#1e3237' }}>{backup.description}</p>
                          <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                            {new Date(backup.startTime).toLocaleString('tr-TR')}
                          </p>
                        </div>
                      </div>
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: getStatusColor(backup.status) }}
                      >
                        {getStatusText(backup.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Hızlı İşlemler</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => createManualBackup('database')}
                    className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors"
                    style={{ borderColor: '#146448' }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🗄️</span>
                      <div>
                        <p className="font-medium" style={{ color: '#1e3237' }}>Veritabanı Yedekle</p>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Tüm veritabanını yedekle</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => createManualBackup('full')}
                    className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors"
                    style={{ borderColor: '#146448' }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">💾</span>
                      <div>
                        <p className="font-medium" style={{ color: '#1e3237' }}>Tam Yedekleme</p>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Tüm sistemi yedekle</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => createManualBackup('files')}
                    className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors"
                    style={{ borderColor: '#146448' }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📁</span>
                      <div>
                        <p className="font-medium" style={{ color: '#1e3237' }}>Dosya Yedeklemesi</p>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Uygulama dosyalarını yedekle</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backups' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Tüm Yedeklemeler</h3>
              <div className="space-y-4">
                {backupRecords.map((backup) => (
                  <div key={backup.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{getTypeIcon(backup.type)}</span>
                          <h4 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                            {backup.description}
                          </h4>
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: getStatusColor(backup.status) }}
                          >
                            {getStatusText(backup.status)}
                          </span>
                        </div>

                        {backup.status === 'running' && backup.progress !== undefined && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span style={{ color: '#1e3237' }}>İlerleme</span>
                              <span style={{ color: '#146448' }}>{backup.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="h-3 rounded-full transition-all duration-300" 
                                style={{ 
                                  backgroundColor: '#baf200',
                                  width: `${backup.progress}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Tür</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{getTypeName(backup.type)}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Başlangıç</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {new Date(backup.startTime).toLocaleString('tr-TR')}
                            </p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Süre</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {backup.duration ? `${Math.round(backup.duration / 60000)} dk` : '-'}
                            </p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Boyut</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{backup.size}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>ID</p>
                            <p className="font-medium text-xs" style={{ color: '#146448' }}>{backup.id}</p>
                          </div>
                        </div>

                        {backup.errorMessage && (
                          <div className="mt-4 p-3 rounded bg-red-50 border border-red-200">
                            <p className="text-sm text-red-700">❌ {backup.errorMessage}</p>
                          </div>
                        )}
                      </div>

                      <div className="ml-6 flex space-x-2">
                        {backup.downloadUrl && backup.status === 'completed' && (
                          <button
                            className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                            style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                          >
                            📥 İndir
                          </button>
                        )}
                        <button
                          className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                        >
                          📋 Detaylar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Zamanlanmış Yedeklemeler</h3>
              <div className="space-y-4">
                {backupSchedules.map((schedule) => (
                  <div key={schedule.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{getTypeIcon(schedule.type)}</span>
                          <h4 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                            {schedule.name}
                          </h4>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              schedule.enabled 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {schedule.enabled ? 'Aktif' : 'Pasif'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Sıklık</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {schedule.frequency === 'daily' ? 'Günlük' :
                               schedule.frequency === 'weekly' ? 'Haftalık' : 'Aylık'}
                            </p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Saat</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{schedule.time}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Son Çalışma</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {schedule.lastRun 
                                ? new Date(schedule.lastRun).toLocaleDateString('tr-TR')
                                : 'Henüz çalışmadı'}
                            </p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Sonraki Çalışma</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {new Date(schedule.nextRun).toLocaleDateString('tr-TR')}
                            </p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Saklama</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{schedule.retention} gün</p>
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 flex space-x-2">
                        <button
                          onClick={() => toggleSchedule(schedule.id)}
                          className={`px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90 ${
                            schedule.enabled 
                              ? 'bg-red-500 text-white' 
                              : 'text-white'
                          }`}
                          style={{ 
                            backgroundColor: schedule.enabled ? '#EF4444' : '#10B981' 
                          }}
                        >
                          {schedule.enabled ? '⏸️ Durdur' : '▶️ Başlat'}
                        </button>
                        <button
                          className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                        >
                          ⚙️ Düzenle
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'restore' && (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#1e3237' }}>Geri Yükleme</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Yedek Dosyası Seç
                    </label>
                    <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <option>Yedek dosyası seçin...</option>
                      {backupRecords.filter(b => b.status === 'completed').map(backup => (
                        <option key={backup.id} value={backup.id}>
                          {backup.description} - {new Date(backup.startTime).toLocaleDateString('tr-TR')} ({backup.size})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Geri Yükleme Türü
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="restoreType" value="full" className="mr-2" />
                        <span style={{ color: '#1e3237' }}>Tam geri yükleme (mevcut veriler silinecek)</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="restoreType" value="selective" className="mr-2" />
                        <span style={{ color: '#1e3237' }}>Seçici geri yükleme (belirli tabloları seç)</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="restoreType" value="merge" className="mr-2" />
                        <span style={{ color: '#1e3237' }}>Birleştirici geri yükleme (mevcut verilerle birleştir)</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">⚠️ Önemli Uyarı</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Geri yükleme işlemi geri alınamaz</li>
                      <li>• İşlem sırasında sistem geçici olarak erişilemez olabilir</li>
                      <li>• Önemli değişiklikler yapmadan önce yeni bir yedek alın</li>
                    </ul>
                  </div>

                  <button
                    className="w-full py-3 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#EF4444', color: '#f6f8f9' }}
                  >
                    🔄 Geri Yüklemeyi Başlat
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#1e3237' }}>Yedekleme Ayarları</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Varsayılan Saklama Süresi (Gün)
                    </label>
                    <input 
                      type="number" 
                      defaultValue="30"
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Maksimum Depolama Boyutu (GB)
                    </label>
                    <input 
                      type="number" 
                      defaultValue="100"
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Sıkıştırma Seviyesi
                    </label>
                    <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <option value="low">Düşük (Hızlı)</option>
                      <option value="medium">Orta (Dengeli)</option>
                      <option value="high">Yüksek (Küçük boyut)</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span style={{ color: '#1e3237' }}>Yedekleme tamamlandığında e-posta gönder</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span style={{ color: '#1e3237' }}>Hata durumunda e-posta gönder</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span style={{ color: '#1e3237' }}>Yedekleri uzak depolamaya gönder</span>
                    </label>
                  </div>

                  <button
                    className="w-full py-3 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    💾 Ayarları Kaydet
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
