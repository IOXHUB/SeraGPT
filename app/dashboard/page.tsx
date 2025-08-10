'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { authService } from '@/lib/services/auth-service';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { DashboardOverviewSkeleton } from '@/components/ui/skeletons/DashboardSkeletons';
import Link from 'next/link';

// Force dynamic rendering for dashboard pages
export const dynamic = 'force-dynamic';

interface UserStats {
  totalAnalyses: number;
  tokensUsed: number;
  activeSession: boolean;
  lastActivity: string | null;
}

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'in_progress' | 'failed';
}

export default function DashboardPage() {
  const { user, profile, tokens, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<UserStats>({
    totalAnalyses: 0,
    tokensUsed: 0,
    activeSession: true,
    lastActivity: null
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user && !loading) {
      loadDashboardData();
    }
  }, [user, loading]);

  const loadDashboardData = async () => {
    setDataLoading(true);
    
    try {
      // Mock data for development - fixed values to prevent hydration mismatch
      const mockStats: UserStats = {
        totalAnalyses: 12,
        tokensUsed: 25,
        activeSession: true,
        lastActivity: '2024-01-16T10:30:00.000Z'
      };

      const mockActivity: ActivityItem[] = [
        {
          id: '1',
          type: 'analysis',
          description: 'ROI Analizi tamamlandı',
          timestamp: '2024-01-16T14:30:00.000Z',
          status: 'completed'
        },
        {
          id: '2',
          type: 'analysis',
          description: 'Pazar Analizi başlatıldı',
          timestamp: '2024-01-16T13:30:00.000Z',
          status: 'in_progress'
        },
        {
          id: '3',
          type: 'token',
          description: 'Token satın alındı',
          timestamp: '2024-01-16T12:30:00.000Z',
          status: 'completed'
        },
        {
          id: '4',
          type: 'analysis',
          description: 'İklim Analizi tamamlandı',
          timestamp: '2024-01-16T11:30:00.000Z',
          status: 'completed'
        }
      ];

      setStats(mockStats);
      setRecentActivity(mockActivity);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit', 
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const analysisTools = [
    {
      title: 'ROI Simülasyonu',
      description: 'Yatırım geri dönüş analizi',
      href: '/dashboard/analysis/roi',
      category: 'Finansal Analiz',
      tokens: 1
    },
    {
      title: 'İklim & Risk Analizi', 
      description: 'Bölgesel uygunluk skorları',
      href: '/dashboard/analysis/climate',
      category: 'Çevresel Analiz',
      tokens: 1
    },
    {
      title: 'Ekipman Listesi',
      description: 'Mühendis onaylı sistem önerileri',
      href: '/dashboard/analysis/equipment',
      category: 'Teknik Analiz',
      tokens: 2
    },
    {
      title: 'Pazar Verisi',
      description: 'Fiyat ve verim analizleri',
      href: '/dashboard/analysis/market',
      category: 'Pazar Analizi', 
      tokens: 1
    },
    {
      title: 'Teknik Plan',
      description: 'Yerleşim görselleştirmesi',
      href: '/dashboard/analysis/layout',
      category: 'Teknik Analiz',
      tokens: 3
    }
  ];

  if (loading || dataLoading) {
    return (
      <DashboardLayout title="Dashboard" subtitle="Yükleniyor...">
        <DashboardOverviewSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={`Dashboard${profile?.full_name ? ` - Hoş Geldiniz ${profile.full_name}` : ''}`}
      subtitle="Sera yatırım analizlerinizi yönetin, AI asistanınızla konuşun ve raporlarınızı görüntüleyin"
    >

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div 
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#baf200' }}
              >
                <span className="text-xl" style={{ color: '#1e3237' }}>📊</span>
              </div>
              <div className="ml-4">
                <p 
                  className="text-sm font-medium"
                  style={{ color: '#1e3237', opacity: 0.8 }}
                >
                  Toplam Analiz
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: '#1e3237' }}
                >
                  {stats.totalAnalyses}
                </p>
              </div>
            </div>
          </div>

          <div 
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#baf200' }}
              >
                <span className="text-xl" style={{ color: '#1e3237' }}>🧠</span>
              </div>
              <div className="ml-4">
                <p 
                  className="text-sm font-medium"
                  style={{ color: '#1e3237', opacity: 0.8 }}
                >
                  Kalan Token
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: '#1e3237' }}
                >
                  {tokens?.remaining_tokens || 0}
                </p>
              </div>
            </div>
          </div>

          <div 
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#baf200' }}
              >
                <span className="text-xl" style={{ color: '#1e3237' }}>👤</span>
              </div>
              <div className="ml-4">
                <p 
                  className="text-sm font-medium"
                  style={{ color: '#1e3237', opacity: 0.8 }}
                >
                  Üyelik
                </p>
                <p 
                  className="text-lg font-bold"
                  style={{ color: '#1e3237' }}
                >
                  {profile?.subscription_type === 'premium' ? '⭐ Premium' :
                   profile?.subscription_type === 'admin' ? '👑 Admin' : '🆓 Ücretsiz'}
                </p>
              </div>
            </div>
          </div>

          <div 
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#baf200' }}
              >
                <span className="text-xl" style={{ color: '#1e3237' }}>⚡</span>
              </div>
              <div className="ml-4">
                <p 
                  className="text-sm font-medium"
                  style={{ color: '#1e3237', opacity: 0.8 }}
                >
                  Kullanılan Token
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: '#1e3237' }}
                >
                  {stats.tokensUsed}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Tools */}
        <div className="mb-8">
          <div 
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="text-xl font-bold"
                style={{ color: '#1e3237' }}
              >
                Analiz Araçları
              </h2>
              <p 
                className="text-sm"
                style={{ color: '#1e3237', opacity: 0.8 }}
              >
                Tarımsal analizlerinize başlamak için bir araç seçin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {analysisTools.map((tool, index) => {
                const hasEnoughTokens = (tokens?.remaining_tokens || 0) >= tool.tokens;
                
                return (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg transition-all duration-200 ${
                      hasEnoughTokens
                        ? 'border-gray-200 hover:border-[#baf200] cursor-pointer'
                        : 'border-gray-100 bg-gray-50 opacity-60'
                    }`}
                    style={{ borderColor: hasEnoughTokens ? '#1e3237' : '#e5e7eb', borderOpacity: 0.2 }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 
                            className="text-sm font-semibold"
                            style={{ color: '#1e3237' }}
                          >
                            {tool.title}
                          </h3>
                          <p 
                            className="text-xs mt-0.5 line-clamp-2"
                            style={{ color: '#1e3237', opacity: 0.7 }}
                          >
                            {tool.description}
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <span 
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{ 
                              backgroundColor: '#baf200', 
                              color: '#1e3237' 
                            }}
                          >
                            {tool.tokens}🧠
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span 
                          className="text-xs font-medium uppercase tracking-wide"
                          style={{ color: '#1e3237', opacity: 0.6 }}
                        >
                          {tool.category}
                        </span>
                        <Link
                          href={hasEnoughTokens ? tool.href : '/dashboard/tokens'}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            hasEnoughTokens
                              ? 'hover:opacity-90'
                              : 'cursor-not-allowed opacity-50'
                          }`}
                          style={{
                            backgroundColor: hasEnoughTokens ? '#baf200' : '#e5e7eb',
                            color: hasEnoughTokens ? '#1e3237' : '#6b7280'
                          }}
                        >
                          {hasEnoughTokens ? 'Başlat' : 'Token Gerekli'}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div 
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className="text-xl font-bold"
                  style={{ color: '#1e3237' }}
                >
                  Son Aktiviteler
                </h2>
                <Link 
                  href="/dashboard/analysis"
                  className="text-sm font-medium hover:underline"
                  style={{ color: '#1e3237' }}
                >
                  Tümünü Görüntüle
                </Link>
              </div>

              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.slice(0, 5).map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex items-center justify-between p-4 border rounded-lg"
                      style={{ borderColor: '#1e3237', borderOpacity: 0.1 }}
                    >
                      <div>
                        <h3 
                          className="font-medium text-sm"
                          style={{ color: '#1e3237' }}
                        >
                          {activity.description}
                        </h3>
                        <p 
                          className="text-xs"
                          style={{ color: '#1e3237', opacity: 0.6 }}
                        >
                          {formatTime(activity.timestamp)}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status === 'completed' ? 'Tamamlandı' :
                         activity.status === 'in_progress' ? 'Devam Ediyor' : 'Başarısız'}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p 
                      className="text-sm"
                      style={{ color: '#1e3237', opacity: 0.6 }}
                    >
                      Henüz aktivite bulunmuyor
                    </p>
                    <p 
                      className="text-xs mt-1"
                      style={{ color: '#1e3237', opacity: 0.4 }}
                    >
                      İlk analizinizi yaparak başlayın
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* AI Assistant */}
            <div 
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <h3 
                className="text-lg font-bold mb-4"
                style={{ color: '#1e3237' }}
              >
                AI Asistan
              </h3>
              <p 
                className="text-sm mb-4"
                style={{ color: '#1e3237', opacity: 0.8 }}
              >
                Sorularınızı sorun, öneriler alın
              </p>
              <Link 
                href="/dashboard/ai-chat"
                className="w-full block text-center px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                AI ile Sohbet Et
              </Link>
            </div>

            {/* Quick Actions */}
            <div 
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <h3 
                className="text-lg font-bold mb-4"
                style={{ color: '#1e3237' }}
              >
                Hızlı İşlemler
              </h3>
              <div className="space-y-3">
                <Link 
                  href="/dashboard/analysis"
                  className="w-full block px-4 py-2 text-left rounded-lg transition-colors hover:bg-[#baf200]"
                  style={{ color: '#1e3237' }}
                >
                  Tüm Analizler
                </Link>
                <Link 
                  href="/dashboard/tokens"
                  className="w-full block px-4 py-2 text-left rounded-lg transition-colors hover:bg-[#baf200]"
                  style={{ color: '#1e3237' }}
                >
                  Token Yönetimi
                </Link>
                <Link 
                  href="/dashboard/settings"
                  className="w-full block px-4 py-2 text-left rounded-lg transition-colors hover:bg-[#baf200]"
                  style={{ color: '#1e3237' }}
                >
                  Hesap Ayarları
                </Link>
              </div>
            </div>

            {/* Support */}
            <div 
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <h3 
                className="text-lg font-bold mb-4"
                style={{ color: '#1e3237' }}
              >
                Destek
              </h3>
              <p 
                className="text-sm mb-4"
                style={{ color: '#1e3237', opacity: 0.8 }}
              >
                Yardıma mı ihtiyacınız var?
              </p>
              <div className="space-y-2">
                <Link 
                  href="/destek"
                  className="block text-sm hover:underline"
                  style={{ color: '#1e3237' }}
                >
                  Destek Merkezi
                </Link>
                <Link 
                  href="/danismanlik"
                  className="block text-sm hover:underline"
                  style={{ color: '#1e3237' }}
                >
                  Danışmanlık Talep Et
                </Link>
                <Link 
                  href="/dashboard/help"
                  className="block text-sm hover:underline"
                  style={{ color: '#1e3237' }}
                >
                  Yardım Merkezi
                </Link>
              </div>
            </div>
          </div>
        </div>
    </DashboardLayout>
  );
}
