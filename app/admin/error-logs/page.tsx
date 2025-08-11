'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'critical' | 'info';
  source: string;
  message: string;
  stack?: string;
  userId?: string;
  userAgent?: string;
  url?: string;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  count: number;
}

export default function ErrorLogsPage() {
  const { user, isAdmin, loading } = useAuth();
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterResolved, setFilterResolved] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dataLoading, setDataLoading] = useState(true);

  const logLevels = [
    { id: 'all', title: 'Tümü', color: '#6B7280' },
    { id: 'critical', title: 'Kritik', color: '#DC2626' },
    { id: 'error', title: 'Hata', color: '#EF4444' },
    { id: 'warning', title: 'Uyarı', color: '#F59E0B' },
    { id: 'info', title: 'Bilgi', color: '#3B82F6' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadErrorLogs();
    }
  }, [user, loading]);

  const loadErrorLogs = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock error logs data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockLogs: ErrorLog[] = [
        {
          id: 'error-001',
          timestamp: '2024-03-15 15:45:23',
          level: 'critical',
          source: 'AI Analysis Service',
          message: 'OpenAI API rate limit exceeded',
          stack: 'Error: Rate limit exceeded\n    at OpenAIService.makeRequest (/lib/ai-service.ts:45)\n    at AnalysisService.processROI (/lib/analysis.ts:123)',
          userId: 'user-456',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          url: '/api/analysis/roi',
          resolved: false,
          count: 15
        },
        {
          id: 'error-002',
          timestamp: '2024-03-15 14:20:15',
          level: 'error',
          source: 'Database Connection',
          message: 'Supabase connection timeout',
          stack: 'Error: Connection timeout\n    at SupabaseClient.query (/lib/supabase.ts:67)\n    at UserService.getProfile (/lib/user-service.ts:34)',
          userId: 'user-789',
          url: '/dashboard/profile',
          resolved: true,
          resolvedBy: 'admin@seragpt.com',
          resolvedAt: '2024-03-15 14:45:00',
          count: 3
        },
        {
          id: 'error-003',
          timestamp: '2024-03-15 13:10:45',
          level: 'warning',
          source: 'Email Service',
          message: 'Failed to send welcome email',
          stack: 'Warning: SMTP server temporarily unavailable\n    at EmailService.sendWelcome (/lib/email-service.ts:89)',
          userId: 'user-123',
          resolved: false,
          count: 7
        },
        {
          id: 'error-004',
          timestamp: '2024-03-15 12:30:12',
          level: 'error',
          source: 'Weather API',
          message: 'OpenWeather API authentication failed',
          stack: 'Error: Invalid API key\n    at WeatherService.getCurrentWeather (/lib/weather-service.ts:23)',
          url: '/api/analysis/climate',
          resolved: true,
          resolvedBy: 'admin@seragpt.com',
          resolvedAt: '2024-03-15 13:00:00',
          count: 2
        },
        {
          id: 'error-005',
          timestamp: '2024-03-15 11:15:30',
          level: 'info',
          source: 'User Authentication',
          message: 'Multiple failed login attempts detected',
          userId: 'user-suspicious',
          userAgent: 'curl/7.68.0',
          resolved: false,
          count: 12
        },
        {
          id: 'error-006',
          timestamp: '2024-03-15 10:45:18',
          level: 'critical',
          source: 'Payment Processing',
          message: 'Stripe webhook signature verification failed',
          stack: 'Error: Invalid signature\n    at StripeService.verifyWebhook (/lib/stripe-service.ts:45)',
          url: '/api/webhooks/stripe',
          resolved: false,
          count: 1
        }
      ];
      
      setErrorLogs(mockLogs);
      
    } catch (error) {
      console.error('Failed to load error logs:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    const levelObj = logLevels.find(l => l.id === level);
    return levelObj?.color || '#6B7280';
  };

  const getLevelText = (level: string) => {
    const levelObj = logLevels.find(l => l.id === level);
    return levelObj?.title || level;
  };

  const markAsResolved = async (logId: string) => {
    setErrorLogs(prev => prev.map(log => 
      log.id === logId 
        ? { 
            ...log, 
            resolved: true, 
            resolvedBy: user?.email || 'admin',
            resolvedAt: new Date().toISOString()
          }
        : log
    ));
  };

  const filteredLogs = errorLogs.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesResolved = filterResolved === 'all' || 
                           (filterResolved === 'resolved' && log.resolved) ||
                           (filterResolved === 'unresolved' && !log.resolved);
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesResolved && matchesSearch;
  });

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-24 bg-white/10 rounded"></div>
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
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Hata Günlükleri</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Sistem hataları ve çözüm takibi</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadErrorLogs}
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                🔄 Yenile
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Hata</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{errorLogs.length}</p>
              </div>
              <div className="text-2xl">🚨</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Çözülmemiş</p>
                <p className="text-2xl font-bold" style={{ color: '#EF4444' }}>
                  {errorLogs.filter(log => !log.resolved).length}
                </p>
              </div>
              <div className="text-2xl">❌</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Kritik Hatalar</p>
                <p className="text-2xl font-bold" style={{ color: '#DC2626' }}>
                  {errorLogs.filter(log => log.level === 'critical').length}
                </p>
              </div>
              <div className="text-2xl">🔥</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Çözüm Oranı</p>
                <p className="text-2xl font-bold" style={{ color: '#10B981' }}>
                  {errorLogs.length > 0 
                    ? Math.round((errorLogs.filter(log => log.resolved).length / errorLogs.length) * 100)
                    : 0}%
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            {logLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setFilterLevel(level.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterLevel === level.id
                    ? 'shadow-lg transform scale-105'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: filterLevel === level.id ? '#baf200' : '#f6f8f9',
                  color: filterLevel === level.id ? '#1e3237' : level.color
                }}
              >
                {level.title}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <select 
              value={filterResolved}
              onChange={(e) => setFilterResolved(e.target.value)}
              className="px-4 py-2 rounded-lg border"
              style={{ borderColor: '#146448' }}
            >
              <option value="all">Tüm Durumlar</option>
              <option value="unresolved">Çözülmemiş</option>
              <option value="resolved">Çözülmüş</option>
            </select>

            <input
              type="text"
              placeholder="Hata mesajı, kaynak veya ID ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg flex-1 max-w-md"
              style={{ borderColor: '#146448' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Error Logs List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>
              Hata Günlükleri ({filteredLogs.length})
            </h2>
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div 
                  key={log.id} 
                  className={`rounded-lg p-6 cursor-pointer transition-all ${
                    selectedLog?.id === log.id ? 'ring-2 ring-white/20' : ''
                  } ${!log.resolved ? 'border-l-4' : ''}`}
                  style={{ 
                    backgroundColor: '#f6f8f9',
                    borderLeftColor: !log.resolved ? getLevelColor(log.level) : 'transparent'
                  }}
                  onClick={() => setSelectedLog(log)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium text-white"
                          style={{ backgroundColor: getLevelColor(log.level) }}
                        >
                          {getLevelText(log.level)}
                        </span>
                        <span className="font-semibold" style={{ color: '#1e3237' }}>
                          {log.source}
                        </span>
                        {log.count > 1 && (
                          <span 
                            className="px-2 py-1 rounded text-xs"
                            style={{ backgroundColor: '#F59E0B', color: 'white' }}
                          >
                            {log.count}x
                          </span>
                        )}
                        {log.resolved && (
                          <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                            Çözüldü
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-medium mb-2" style={{ color: '#1e3237' }}>
                        {log.message}
                      </h3>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Zaman</p>
                          <p className="font-medium" style={{ color: '#146448' }}>
                            {new Date(log.timestamp).toLocaleString('tr-TR')}
                          </p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Log ID</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{log.id}</p>
                        </div>
                      </div>
                    </div>

                    {!log.resolved && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsResolved(log.id);
                        }}
                        className="ml-4 px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                        style={{ backgroundColor: '#10B981', color: '#f6f8f9' }}
                      >
                        ✓ Çöz
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {filteredLogs.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-xl" style={{ color: '#f6f8f9' }}>Hiç hata bulunamadı</p>
                  <p className="opacity-70" style={{ color: '#f6f8f9' }}>
                    Bu harika bir durum! Filtrelerinizi kontrol edin.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Error Detail Panel */}
          <div>
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Hata Detayı</h2>
            {selectedLog ? (
              <div className="rounded-lg p-6 space-y-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center space-x-3">
                  <span 
                    className="px-3 py-1 rounded text-sm font-medium text-white"
                    style={{ backgroundColor: getLevelColor(selectedLog.level) }}
                  >
                    {getLevelText(selectedLog.level)}
                  </span>
                  <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                    {selectedLog.source}
                  </h3>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#1e3237' }}>Hata Mesajı:</h4>
                  <p className="text-sm" style={{ color: '#1e3237' }}>{selectedLog.message}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: '#1e3237' }}>Zaman:</span>
                    <span className="font-medium" style={{ color: '#146448' }}>
                      {new Date(selectedLog.timestamp).toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#1e3237' }}>Tekrar Sayısı:</span>
                    <span className="font-medium" style={{ color: '#146448' }}>{selectedLog.count}</span>
                  </div>
                  {selectedLog.userId && (
                    <div className="flex justify-between">
                      <span style={{ color: '#1e3237' }}>Kullanıcı ID:</span>
                      <span className="font-medium" style={{ color: '#146448' }}>{selectedLog.userId}</span>
                    </div>
                  )}
                  {selectedLog.url && (
                    <div className="flex justify-between">
                      <span style={{ color: '#1e3237' }}>URL:</span>
                      <span className="font-medium text-xs" style={{ color: '#146448' }}>{selectedLog.url}</span>
                    </div>
                  )}
                </div>

                {selectedLog.stack && (
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#1e3237' }}>Stack Trace:</h4>
                    <div 
                      className="p-3 rounded border text-xs overflow-x-auto"
                      style={{ borderColor: '#146448', backgroundColor: '#f8f9fa' }}
                    >
                      <pre style={{ color: '#1e3237' }}>{selectedLog.stack}</pre>
                    </div>
                  </div>
                )}

                {selectedLog.resolved && (
                  <div className="p-4 rounded bg-green-50 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Çözüldü</h4>
                    <div className="text-sm text-green-700">
                      <p>Çözen: {selectedLog.resolvedBy}</p>
                      <p>Tarih: {selectedLog.resolvedAt ? new Date(selectedLog.resolvedAt).toLocaleString('tr-TR') : 'Bilinmiyor'}</p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  {!selectedLog.resolved && (
                    <button
                      onClick={() => markAsResolved(selectedLog.id)}
                      className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#10B981', color: '#f6f8f9' }}
                    >
                      ✓ Çözüldü Olarak İşaretle
                    </button>
                  )}
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    📥 Dışa Aktar
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="rounded-lg p-6 text-center"
                style={{ backgroundColor: '#f6f8f9' }}
              >
                <div className="text-4xl mb-4">🚨</div>
                <p style={{ color: '#1e3237' }}>Detayları görmek için bir hata seçin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
