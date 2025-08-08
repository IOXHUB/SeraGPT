'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { authService } from '@/lib/services/auth-service';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { DashboardOverviewSkeleton } from '@/components/ui/skeletons/DashboardSkeletons';

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
      // Mock data for development
      const mockStats: UserStats = {
        totalAnalyses: Math.floor(Math.random() * 25) + 5,
        tokensUsed: Math.floor(Math.random() * 50) + 10,
        activeSession: true,
        lastActivity: new Date(Date.now() - Math.random() * 3600000).toISOString()
      };

      const mockActivity: ActivityItem[] = [
        {
          id: '1',
          type: 'analysis',
          description: 'ROI Analizi tamamlandı',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          status: 'completed'
        },
        {
          id: '2', 
          type: 'analysis',
          description: 'Pazar Analizi başlatıldı',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'in_progress'
        },
        {
          id: '3',
          type: 'token',
          description: 'Token satın alındı',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          status: 'completed'
        },
        {
          id: '4',
          type: 'analysis',
          description: 'İklim Analizi tamamlandı',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
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
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'failed': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
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
      title="Dashboard" 
      subtitle={`Hoş geldiniz${profile?.full_name ? `, ${profile.full_name}` : ''}`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Toplam Analiz</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalAnalyses}</p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Kullanılan Token</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.tokensUsed}</p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Kalan Token</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{tokens?.remaining_tokens || 0}</p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Üyelik Durumu</h3>
            <p className="text-lg font-semibold text-gray-900 mt-2">
              {profile?.subscription_type === 'premium' ? 'Premium' : 
               profile?.subscription_type === 'admin' ? 'Admin' : 'Ücretsiz'}
            </p>
          </div>
        </div>

        {/* Analysis Tools */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Analiz Araçları</h2>
            <p className="text-sm text-gray-600 mt-1">Tarımsal analizlerinize başlamak için bir araç seçin</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisTools.map((tool, index) => {
                const hasEnoughTokens = (tokens?.remaining_tokens || 0) >= tool.tokens;
                
                return (
                  <div 
                    key={index}
                    className={`border rounded-lg p-6 transition-all duration-200 ${
                      hasEnoughTokens 
                        ? 'border-gray-200 hover:border-blue-300 hover:shadow-md cursor-pointer' 
                        : 'border-gray-100 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {tool.category}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tool.tokens} Token
                        </span>
                      </div>
                      
                      <a
                        href={hasEnoughTokens ? tool.href : '/dashboard/tokens'}
                        className={`block w-full text-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          hasEnoughTokens
                            ? 'bg-gray-900 text-white hover:bg-gray-800'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {hasEnoughTokens ? 'Analizi Başlat' : 'Token Gerekli'}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h2>
            <p className="text-sm text-gray-600 mt-1">Hesabınızdaki son işlemler</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTime(activity.timestamp)}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                      {activity.status === 'completed' ? 'Tamamlandı' :
                       activity.status === 'in_progress' ? 'Devam Ediyor' : 'Başarısız'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500">Henüz aktivite bulunmuyor</p>
                <p className="text-sm text-gray-400 mt-1">İlk analizinizi yaparak başlayın</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/dashboard/analysis"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors group"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Tüm Analizler</h3>
            <p className="text-sm text-gray-600 mt-1">Geçmiş analizlerinizi görüntüleyin</p>
          </a>
          
          <a
            href="/dashboard/tokens"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors group"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Token Yönetimi</h3>
            <p className="text-sm text-gray-600 mt-1">Token bakiyenizi kontrol edin</p>
          </a>
          
          <a
            href="/dashboard/settings"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors group"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Hesap Ayarları</h3>
            <p className="text-sm text-gray-600 mt-1">Profil ve tercihlerinizi düzenleyin</p>
          </a>
        </div>

      </div>
    </DashboardLayout>
  );
}
