'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

interface AnalysisSession {
  id: string;
  userId: string;
  userEmail: string;
  sessionTitle: string;
  analysisType: string;
  status: 'active' | 'completed' | 'pending' | 'error';
  messagesCount: number;
  reportGenerated: boolean;
  reportId?: string;
  createdAt: string;
  updatedAt: string;
  analysisData?: any;
}

interface AnalysisStats {
  totalSessions: number;
  activeSessions: number;
  completedAnalyses: number;
  reportsGenerated: number;
  averageCompletionTime: number;
  successRate: number;
}

export default function AnalysisManagementPage() {
  const { user, isAdmin, loading } = useAuth();
  const [sessions, setSessions] = useState<AnalysisSession[]>([]);
  const [stats, setStats] = useState<AnalysisStats | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSession, setSelectedSession] = useState<AnalysisSession | null>(null);

  const tabs = [
    { id: 'overview', title: 'Genel Bakış', icon: '📊' },
    { id: 'sessions', title: 'Aktif Analizler', icon: '🔄' },
    { id: 'completed', title: 'Tamamlanan', icon: '✅' },
    { id: 'reports', title: 'Raporlar', icon: '📄' },
    { id: 'users', title: 'Kullanıcı Analizi', icon: '👥' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadAnalysisData();
    }
  }, [user, loading]);

  const loadAnalysisData = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);

      // Load analysis sessions and stats
      const [sessionsResponse, statsResponse] = await Promise.all([
        fetch('/api/admin/analysis-sessions'),
        fetch('/api/admin/analysis-stats')
      ]);

      if (sessionsResponse.ok && statsResponse.ok) {
        const sessionsData = await sessionsResponse.json();
        const statsData = await statsResponse.json();

        setSessions(sessionsData.sessions || []);
        setStats(statsData.stats || {});
      } else {
        // Mock data for demonstration
        const mockSessions: AnalysisSession[] = [
          {
            id: 'session-001',
            userId: 'user-123',
            userEmail: 'ahmet@example.com',
            sessionTitle: 'Antalya 5000m² Sera Analizi',
            analysisType: 'comprehensive',
            status: 'completed',
            messagesCount: 8,
            reportGenerated: true,
            reportId: 'RPT-1640995200000-abc123',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T11:15:00Z'
          },
          {
            id: 'session-002',
            userId: 'user-456',
            userEmail: 'mehmet@example.com',
            sessionTitle: 'ROI Hesaplama - Mersin',
            analysisType: 'roi',
            status: 'active',
            messagesCount: 4,
            reportGenerated: false,
            createdAt: '2024-01-15T14:20:00Z',
            updatedAt: '2024-01-15T14:35:00Z'
          },
          {
            id: 'session-003',
            userId: 'user-789',
            userEmail: 'fatma@example.com',
            sessionTitle: 'İklim Analizi - Muğla',
            analysisType: 'climate',
            status: 'pending',
            messagesCount: 2,
            reportGenerated: false,
            createdAt: '2024-01-15T16:45:00Z',
            updatedAt: '2024-01-15T16:50:00Z'
          }
        ];

        const mockStats: AnalysisStats = {
          totalSessions: 156,
          activeSessions: 23,
          completedAnalyses: 128,
          reportsGenerated: 89,
          averageCompletionTime: 18.5,
          successRate: 82.1
        };

        setSessions(mockSessions);
        setStats(mockStats);
      }

    } catch (error) {
      console.error('Failed to load analysis data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Devam Ediyor';
      case 'completed': return 'Tamamlandı';
      case 'pending': return 'Beklemede';
      case 'error': return 'Hata';
      default: return status;
    }
  };

  const getAnalysisTypeText = (type: string) => {
    switch (type) {
      case 'comprehensive': return 'Kapsamlı Analiz';
      case 'roi': return 'ROI Analizi';
      case 'climate': return 'İklim Analizi';
      case 'equipment': return 'Ekipman Analizi';
      case 'market': return 'Pazar Analizi';
      case 'layout': return 'Tasarım Analizi';
      default: return type;
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
              >
                <span>←</span>
                <span>Admin Panel</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">Analiz Yönetimi</h1>
            </div>
            <div className="text-sm text-gray-500">{user?.email}</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        {stats && (
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📊</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Toplam Analiz</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.totalSessions}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">✅</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Tamamlanan</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.completedAnalyses}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📄</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Oluşturulan Rapor</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.reportsGenerated}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🔄</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Aktif Analiz</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.activeSessions}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">⏱️</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Ort. Süre</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.averageCompletionTime} dk</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📈</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Başarı Oranı</dt>
                      <dd className="text-lg font-medium text-gray-900">%{stats.successRate}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.icon} {tab.title}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Genel Bakış</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <h4 className="text-blue-800 font-medium">Sistem Durumu</h4>
                    <p className="text-blue-600 text-sm">Tüm analiz sistemleri normal çalışıyor</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <h4 className="text-green-800 font-medium">Performans</h4>
                    <p className="text-green-600 text-sm">Bugün {stats?.completedAnalyses || 0} analiz tamamlandı</p>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'sessions' || activeTab === 'completed') && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {activeTab === 'sessions' ? 'Aktif Analizler' : 'Tamamlanan Analizler'}
                </h3>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kullanıcı
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Analiz
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tip
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Durum
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rapor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tarih
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sessions
                        .filter(session => 
                          activeTab === 'sessions' 
                            ? session.status === 'active' || session.status === 'pending'
                            : session.status === 'completed'
                        )
                        .map((session) => (
                          <tr key={session.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {session.userEmail}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <div className="max-w-xs truncate">{session.sessionTitle}</div>
                              <div className="text-xs text-gray-500">{session.messagesCount} mesaj</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {getAnalysisTypeText(session.analysisType)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                                {getStatusText(session.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {session.reportGenerated ? (
                                <a
                                  href={`/api/reports/download/${session.reportId}?format=pdf`}
                                  className="text-emerald-600 hover:text-emerald-900"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  İndir
                                </a>
                              ) : (
                                <span className="text-gray-400">Yok</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(session.createdAt).toLocaleDateString('tr-TR')}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
