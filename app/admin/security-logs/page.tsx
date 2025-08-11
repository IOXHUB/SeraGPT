'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface SecurityLog {
  id: string;
  timestamp: string;
  type: 'login_attempt' | 'api_abuse' | 'suspicious_activity' | 'unauthorized_access' | 'data_breach_attempt';
  severity: 'low' | 'medium' | 'high' | 'critical';
  ip: string;
  userAgent: string;
  description: string;
  location: string;
  status: 'resolved' | 'investigating' | 'open';
}

export default function SecurityLogsManager() {
  const { user, isAdmin, loading } = useAuth();
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'open'>('all');
  const [dateRange, setDateRange] = useState('24h');

  useEffect(() => {
    if (user && !loading) {
      loadSecurityLogs();
    }
  }, [user, loading]);

  const loadSecurityLogs = async () => {
    if (!isAdmin()) {
      window.location.href = '/dashboard';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock security logs data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockLogs: SecurityLog[] = [
        {
          id: '1',
          timestamp: '2024-01-15 14:45:32',
          type: 'login_attempt',
          severity: 'high',
          ip: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          description: 'Başarısız giriş denemesi - 5. deneme',
          location: 'İstanbul, TR',
          status: 'investigating'
        },
        {
          id: '2',
          timestamp: '2024-01-15 14:30:15',
          type: 'api_abuse',
          severity: 'critical',
          ip: '203.45.67.89',
          userAgent: 'python-requests/2.28.1',
          description: 'API rate limit aşımı - 1000 istek/dakika',
          location: 'Beijing, CN',
          status: 'resolved'
        },
        {
          id: '3',
          timestamp: '2024-01-15 13:15:42',
          type: 'suspicious_activity',
          severity: 'medium',
          ip: '10.0.0.50',
          userAgent: 'curl/7.68.0',
          description: 'Şüpheli endpoint taraması',
          location: 'Moskova, RU',
          status: 'open'
        },
        {
          id: '4',
          timestamp: '2024-01-15 12:05:18',
          type: 'unauthorized_access',
          severity: 'high',
          ip: '172.16.0.25',
          userAgent: 'Postman Runtime/7.29.2',
          description: 'Admin paneline yetkisiz erişim denemesi',
          location: 'Unknown',
          status: 'resolved'
        },
        {
          id: '5',
          timestamp: '2024-01-15 11:30:05',
          type: 'data_breach_attempt',
          severity: 'critical',
          ip: '45.123.67.89',
          userAgent: 'sqlmap/1.6.12',
          description: 'SQL injection saldırısı tespit edildi',
          location: 'Lagos, NG',
          status: 'investigating'
        }
      ];
      
      setSecurityLogs(mockLogs);
      
    } catch (error) {
      console.error('Failed to load security logs:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const updateLogStatus = (logId: string, newStatus: SecurityLog['status']) => {
    setSecurityLogs(logs => 
      logs.map(log => 
        log.id === logId ? { ...log, status: newStatus } : log
      )
    );
  };

  const getSeverityColor = (severity: SecurityLog['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: SecurityLog['type']) => {
    switch (type) {
      case 'login_attempt': return '🔐';
      case 'api_abuse': return '⚡';
      case 'suspicious_activity': return '🔍';
      case 'unauthorized_access': return '🚫';
      case 'data_breach_attempt': return '🛡️';
      default: return '📝';
    }
  };

  const filteredLogs = securityLogs.filter(log => {
    if (filter === 'all') return true;
    if (filter === 'open') return log.status === 'open';
    return log.severity === filter;
  });

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
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
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
              <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Güvenlik Günlükleri</h1>
              <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Sistem güvenlik olayları ve şüpheli aktiviteler</p>
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
        {/* Security Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Güvenlik Durumu</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Kritik Uyarılar</p>
                  <p className="text-2xl font-bold text-red-600">
                    {securityLogs.filter(log => log.severity === 'critical').length}
                  </p>
                </div>
                <div className="text-2xl">🚨</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Açık Olaylar</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {securityLogs.filter(log => log.status === 'open').length}
                  </p>
                </div>
                <div className="text-2xl">⚠️</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>İnceleniyor</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {securityLogs.filter(log => log.status === 'investigating').length}
                  </p>
                </div>
                <div className="text-2xl">🔍</div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Çözümlendi</p>
                  <p className="text-2xl font-bold" style={{ color: '#146448' }}>
                    {securityLogs.filter(log => log.status === 'resolved').length}
                  </p>
                </div>
                <div className="text-2xl">✅</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
            >
              Tümü ({securityLogs.length})
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'critical' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
              style={{ backgroundColor: '#dc2626', color: '#f6f8f9' }}
            >
              Kritik ({securityLogs.filter(log => log.severity === 'critical').length})
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'high' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
              style={{ backgroundColor: '#f97316', color: '#f6f8f9' }}
            >
              Yüksek ({securityLogs.filter(log => log.severity === 'high').length})
            </button>
            <button
              onClick={() => setFilter('open')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'open' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
              style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
            >
              Açık ({securityLogs.filter(log => log.status === 'open').length})
            </button>
          </div>
          
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            style={{ focusRingColor: '#146448' }}
          >
            <option value="1h">Son 1 Saat</option>
            <option value="24h">Son 24 Saat</option>
            <option value="7d">Son 7 Gün</option>
            <option value="30d">Son 30 Gün</option>
          </select>
        </div>

        {/* Security Logs */}
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div key={log.id} className="rounded-lg p-6 border-l-4" 
                 style={{ 
                   backgroundColor: '#f6f8f9',
                   borderLeftColor: log.severity === 'critical' ? '#dc2626' :
                                   log.severity === 'high' ? '#f97316' :
                                   log.severity === 'medium' ? '#eab308' : '#3b82f6'
                 }}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-2xl">{getTypeIcon(log.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold" style={{ color: '#1e3237' }}>{log.description}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                        {log.severity === 'critical' ? 'Kritik' :
                         log.severity === 'high' ? 'Yüksek' :
                         log.severity === 'medium' ? 'Orta' : 'Düşük'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.status === 'open' ? 'bg-red-100 text-red-800' :
                        log.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {log.status === 'open' ? 'Açık' :
                         log.status === 'investigating' ? 'İnceleniyor' : 'Çözümlendi'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium opacity-70" style={{ color: '#1e3237' }}>Zaman</p>
                        <p style={{ color: '#1e3237' }}>{log.timestamp}</p>
                      </div>
                      <div>
                        <p className="font-medium opacity-70" style={{ color: '#1e3237' }}>IP Adresi</p>
                        <p className="font-mono" style={{ color: '#1e3237' }}>{log.ip}</p>
                      </div>
                      <div>
                        <p className="font-medium opacity-70" style={{ color: '#1e3237' }}>Konum</p>
                        <p style={{ color: '#1e3237' }}>{log.location}</p>
                      </div>
                      <div>
                        <p className="font-medium opacity-70" style={{ color: '#1e3237' }}>User Agent</p>
                        <p className="text-xs opacity-70" style={{ color: '#1e3237' }}>{log.userAgent}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  {log.status === 'open' && (
                    <button 
                      onClick={() => updateLogStatus(log.id, 'investigating')}
                      className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#eab308', color: '#f6f8f9' }}
                    >
                      İncele
                    </button>
                  )}
                  {log.status === 'investigating' && (
                    <button 
                      onClick={() => updateLogStatus(log.id, 'resolved')}
                      className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                    >
                      Çözümle
                    </button>
                  )}
                  <button 
                    className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    Detaylar
                  </button>
                  <button 
                    className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#dc2626', color: '#f6f8f9' }}
                  >
                    IP Engelle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#f6f8f9' }}>
              {filter === 'all' ? 'Güvenlik günlüğü bulunamadı' : `Seçilen filtreye uygun log bulunamadı`}
            </h3>
            <p style={{ color: '#f6f8f9', opacity: '0.7' }}>
              Bu güvenlik sisteminizin iyi durumda olduğunu gösterir.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
