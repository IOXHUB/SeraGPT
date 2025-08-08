'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { authService } from '@/lib/services/auth-service';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { DashboardOverviewSkeleton } from '@/components/ui/skeletons/DashboardSkeletons';
import CacheStatsWidget from '@/components/dashboard/CacheStatsWidget';
import { UserActivityLog } from '@/types/auth';

// Force dynamic rendering for dashboard pages
export const dynamic = 'force-dynamic';

interface UserStats {
  totalAnalyses: number;
  tokensUsed: number;
  activeSession: boolean;
  lastActivity: string | null;
}

interface DashboardData {
  stats: UserStats;
  recentActivity: UserActivityLog[];
  availableAnalyses: number;
}

export default function DashboardPage() {
  const { user, profile, tokens, isAdmin, loading } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    stats: {
      totalAnalyses: 0,
      tokensUsed: 0,
      activeSession: false,
      lastActivity: null
    },
    recentActivity: [],
    availableAnalyses: 0
  });
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load dashboard data
  useEffect(() => {
    if (user && !loading) {
      loadDashboardData();
    }
  }, [user, loading]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setDataLoading(true);
      setError(null);

      // Use mock data in development mode
      if (process.env.NODE_ENV === 'development') {
        const { DevMockSystem } = await import('@/lib/utils/dev-mock-system');

        // Generate mock stats
        const mockStats: UserStats = {
          totalAnalyses: Math.floor(Math.random() * 15) + 5,
          tokensUsed: tokens?.used_tokens || 10,
          activeSession: true,
          lastActivity: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
        };

        // Generate mock activity
        const mockActivity: UserActivityLog[] = Array.from({ length: 8 }, (_, i) => ({
          id: `activity-${i}`,
          user_id: user.id,
          activity_type: ['analysis_created', 'analysis_viewed', 'token_used', 'profile_updated'][Math.floor(Math.random() * 4)] as ActivityType,
          category: ['analysis', 'auth', 'payment', 'profile'][Math.floor(Math.random() * 4)],
          details: {
            analysis_type: ['roi', 'climate', 'equipment', 'market'][Math.floor(Math.random() * 4)],
            tokens_consumed: Math.floor(Math.random() * 3) + 1
          },
          ip_address: '127.0.0.1',
          user_agent: 'Development Browser',
          created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        }));

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        setDashboardData({
          stats: mockStats,
          recentActivity: mockActivity,
          availableAnalyses: tokens?.remaining_tokens || 0
        });

        console.log('🚀 Dashboard loaded with mock data');

      } else {
        // Production: Load real data from API
        const [stats, activity] = await Promise.all([
          authService.getUserStats(user.id),
          authService.getUserActivity(user.id, 10)
        ]);

        setDashboardData({
          stats,
          recentActivity: activity,
          availableAnalyses: tokens?.remaining_tokens || 0
        });
      }

    } catch (error: any) {
      console.error('Failed to load dashboard data:', error);
      setError('Dashboard verileri yüklenirken hata oluştu');

      // Fallback to empty state
      setDashboardData({
        stats: {
          totalAnalyses: 0,
          tokensUsed: 0,
          activeSession: false,
          lastActivity: null
        },
        recentActivity: [],
        availableAnalyses: 0
      });
    } finally {
      setDataLoading(false);
    }
  };

  // Refresh data function
  const refreshData = async () => {
    await loadDashboardData();
  };

  // SeraGPT Analysis Tools with real token checking
  const analysisTools = [
    {
      id: 'roi-simulation',
      title: 'ROI Simülasyonu',
      description: 'Sera yatırımı geri dönüş analizi',
      icon: '📊',
      tokensRequired: 1,
      status: 'available',
      href: '/dashboard/analysis/roi',
      category: 'financial',
      popular: true
    },
    {
      id: 'climate-analysis',
      title: 'İklim Analizi',
      description: 'Bölgesel iklim uygunluk raporu',
      icon: '🌡️',
      tokensRequired: 1,
      status: 'available',
      href: '/dashboard/analysis/climate',
      category: 'environmental',
      popular: false
    },
    {
      id: 'equipment-list',
      title: 'Ekipman Listesi',
      description: 'Mühendis onaylı ekipman önerileri',
      icon: '🔧',
      tokensRequired: 1,
      status: 'available',
      href: '/dashboard/analysis/equipment',
      category: 'technical',
      popular: false
    },
    {
      id: 'market-analysis',
      title: 'Pazar Analizi',
      description: 'Tarım ürünü fiyat ve trend analizi',
      icon: '📈',
      tokensRequired: 1,
      status: 'available',
      href: '/dashboard/analysis/market',
      category: 'market',
      popular: true
    },
    {
      id: 'layout-plan',
      title: 'Teknik Plan',
      description: '2D/3D sera yerleşim planı',
      icon: '📐',
      tokensRequired: 1,
      status: 'available',
      href: '/dashboard/analysis/layout',
      category: 'design',
      popular: false
    }
  ];

  // Dynamic stats based on real data
  const getUserStats = () => {
    if (isAdmin()) {
      return [
        { 
          name: 'Toplam Kullanıcılar', 
          value: '1,534', 
          change: '+4.8%', 
          changeType: 'positive', 
          color: 'green',
          description: 'Sistem geneli'
        },
        { 
          name: 'Aktif Analizler', 
          value: '869', 
          change: '+2.1%', 
          changeType: 'positive', 
          color: 'blue',
          description: 'Şu anda işleniyor'
        },
        { 
          name: 'Tamamlanan Raporlar', 
          value: '236', 
          change: '+4.8%', 
          changeType: 'positive', 
          color: 'purple',
          description: 'Bu ay'
        },
        { 
          name: 'Sistem Yükü', 
          value: '429', 
          change: '-1.2%', 
          changeType: 'negative', 
          color: 'red',
          description: 'Anlık kullanım'
        }
      ];
    } else {
      return [
        { 
          name: 'Kullanılabilir Token', 
          value: (tokens?.remaining_tokens || 0).toString(), 
          change: `${tokens?.remaining_tokens || 0} analiz hakkınız var`, 
          changeType: 'neutral', 
          color: 'green',
          description: 'Mevcut bakiye'
        },
        { 
          name: 'Toplam Analizler', 
          value: dashboardData.stats.totalAnalyses.toString(), 
          change: dashboardData.stats.totalAnalyses > 0 ? 'Analiz geçmişiniz var' : 'Henüz analiz yap��lmadı', 
          changeType: 'neutral', 
          color: 'blue',
          description: 'Tüm zamanlar'
        },
        { 
          name: 'Kullanılan Token', 
          value: (tokens?.used_tokens || 0).toString(), 
          change: dashboardData.stats.tokensUsed > 0 ? 'Token kullanımınız' : 'Token kullanımı yok', 
          changeType: 'neutral', 
          color: 'purple',
          description: 'Toplam harcama'
        },
        { 
          name: 'Hesap Durumu', 
          value: dashboardData.stats.activeSession ? 'Aktif' : 'Pasif', 
          change: profile?.subscription_type === 'premium' ? 'Premium üye' : 'Ücretsiz üye', 
          changeType: 'neutral', 
          color: 'orange',
          description: 'Oturum durumu'
        }
      ];
    }
  };

  // Enhanced recent activity with real data
  const getRecentActivity = () => {
    if (isAdmin()) {
      return [
        {
          type: 'user',
          title: 'Yeni kullanıcı kaydı',
          description: 'Son 24 saatte 12 yeni kullanıcı',
          time: '5 dk önce',
          color: 'bg-green-100 text-green-600'
        },
        {
          type: 'analysis',
          title: 'ROI analizi tamamlandı',
          description: 'İzmir sera projesi başarıyla işlendi',
          time: '15 dk ��nce',
          color: 'bg-blue-100 text-blue-600'
        },
        {
          type: 'system',
          title: 'Sistem güncellemesi',
          description: 'API performans iyileştirmesi',
          time: '1 saat önce',
          color: 'bg-purple-100 text-purple-600'
        }
      ];
    } else {
      // If we have real activity data, use it
      if (dashboardData.recentActivity.length > 0) {
        return dashboardData.recentActivity.slice(0, 5).map(activity => ({
          type: activity.activity_type,
          title: getActivityTitle(activity.activity_type),
          description: getActivityDescription(activity),
          time: formatTimeAgo(activity.created_at),
          color: getActivityColor(activity.activity_category)
        }));
      }

      // Fallback to welcome messages for new users
      return [
        {
          type: 'welcome',
          title: 'SeraGPT\'ye hoş geldiniz! 🌱',
          description: `${tokens?.remaining_tokens || 0} ücretsiz analiz hakkınız ile başlayabilirsiniz`,
          time: 'Şimdi',
          color: 'bg-blue-100 text-blue-600'
        },
        {
          type: 'tip',
          title: 'İpucu: ROI Analizinden Başlayın',
          description: 'En popüler analiz aracımız ile yatırımınızın geri dönüşünü hesaplayın',
          time: '1 dk önce',
          color: 'bg-green-100 text-green-600'
        },
        {
          type: 'guide',
          title: 'Kullanım Kılavuzu',
          description: 'Dashboard özelliklerini keşfedin ve ilk analizinizi yapın',
          time: '2 dk önce',
          color: 'bg-purple-100 text-purple-600'
        }
      ];
    }
  };

  // Helper functions for activity formatting
  const getActivityTitle = (activityType: string) => {
    const titles: Record<string, string> = {
      'login': 'Başarılı giriş',
      'analysis_created': 'Analiz oluşturuldu',
      'analysis_viewed': 'Analiz görüntülendi',
      'token_used': 'Token kullanıldı',
      'profile_updated': 'Profil güncellendi',
      'chat_started': 'AI sohbet başlatıldı'
    };
    return titles[activityType] || 'Sistem aktivitesi';
  };

  const getActivityDescription = (activity: UserActivityLog) => {
    if (activity.details && typeof activity.details === 'object') {
      return JSON.stringify(activity.details).substring(0, 50) + '...';
    }
    return 'Detaylar mevcut değil';
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Şimdi';
    if (diffMins < 60) return `${diffMins} dk önce`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} saat önce`;
    return `${Math.floor(diffMins / 1440)} gün önce`;
  };

  const getActivityColor = (category: string) => {
    const colors: Record<string, string> = {
      'auth': 'bg-blue-100 text-blue-600',
      'analysis': 'bg-green-100 text-green-600',
      'payment': 'bg-purple-100 text-purple-600',
      'ui': 'bg-gray-100 text-gray-600',
      'chat': 'bg-orange-100 text-orange-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  // Quick Actions with enhanced functionality
  const getUserQuickActions = () => {
    if (isAdmin()) {
      return [
        {
          name: 'Kullanıcı Yönetimi',
          description: 'Kullan��cıları görüntüle ve yönet',
          href: '/admin/users',
          primary: true,
          icon: '👥',
          disabled: false
        },
        {
          name: 'Sistem Ayarları',
          description: 'API ve sistem konfigürasyonu',
          href: '/admin/settings',
          primary: false,
          icon: '⚙️'
        },
        {
          name: 'Analitik Raporlar',
          description: 'Detaylı sistem raporları',
          href: '/admin/analytics',
          primary: false,
          icon: '📊'
        },
        {
          name: 'Blog Yönetimi',
          description: 'İçerik yönetimi paneli',
          href: '/admin/blog',
          primary: false,
          icon: '📝'
        }
      ];
    } else {
      const hasTokens = (tokens?.remaining_tokens || 0) > 0;
      return [
        {
          name: hasTokens ? 'Analiz Başlat' : 'Token Al',
          description: hasTokens ? 'Ücretsiz analizlerinizi kullanın' : 'Analiz yapmak için token alın',
          href: hasTokens ? '/dashboard/analysis/roi' : '/dashboard/tokens',
          primary: true,
          icon: hasTokens ? '🚀' : '🪙',
          disabled: false
        },
        {
          name: 'AI Sohbet',
          description: 'SeraGPT AI ile konuşun',
          href: '/dashboard/ai-chat',
          primary: false,
          icon: '💬',
          disabled: !hasTokens
        },
        {
          name: 'Raporlarım',
          description: 'Geçmiş analizlerinizi görün',
          href: '/dashboard/reports',
          primary: false,
          icon: '📋',
          disabled: dashboardData.stats.totalAnalyses === 0
        },
        {
          name: 'Uzman Desteği',
          description: 'Mühendis desteği alın',
          href: '/dashboard/consulting',
          primary: false,
          icon: '🔧',
          disabled: false
        }
      ];
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      green: 'bg-green-50 border-green-200',
      blue: 'bg-blue-50 border-blue-200',
      purple: 'bg-purple-50 border-purple-200',
      red: 'bg-red-50 border-red-200',
      orange: 'bg-orange-50 border-orange-200'
    };
    return colorMap[color] || 'bg-gray-50 border-gray-200';
  };

  const getIconColor = (color: string) => {
    const iconColorMap: Record<string, string> = {
      green: 'text-green-600 bg-green-100',
      blue: 'text-blue-600 bg-blue-100',
      purple: 'text-purple-600 bg-purple-100',
      red: 'text-red-600 bg-red-100',
      orange: 'text-orange-600 bg-orange-100'
    };
    return iconColorMap[color] || 'text-gray-600 bg-gray-100';
  };

  const statsConfig = getUserStats();
  const currentQuickActions = getUserQuickActions();
  const currentActivity = getRecentActivity();

  if (loading || dataLoading) {
    return (
      <DashboardLayout>
        <DashboardOverviewSkeleton />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center max-w-md">
            <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Hata</h3>
              <p>{error}</p>
            </div>
            <button
              onClick={refreshData}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard" subtitle="SeraGPT analiz ve raporlama merkeziniz">
      <div className="space-y-8">
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Hoş geldiniz{profile?.full_name ? `, ${profile.full_name}` : ''}! 👋
              </h1>
              <p className="text-gray-600 mb-4">
                {isAdmin() 
                  ? 'Admin paneline hoş geldiniz. Sistem durumunu burada takip edebilirsiniz.'
                  : 'SeraGPT ile tarımsal analizlerinize başlayın. İlk analizinizi yapmak için aşağıdaki araçları kullanın.'
                }
              </p>
              {!isAdmin() && (
                <div className="flex items-center space-x-4 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    💎 {profile?.subscription_type === 'premium' ? 'Premium Üye' : 'Ücretsiz Üye'}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    🪙 {tokens?.remaining_tokens || 0} Token
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              title="Verileri yenile"
            >
              🔄 Yenile
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsConfig.map((stat, index) => (
            <div key={stat.name} className={`p-6 rounded-xl border ${getColorClasses(stat.color)}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gray-600 text-sm font-medium">{stat.name}</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(stat.color)}`}>
                  {stat.color === 'green' && '✅'}
                  {stat.color === 'blue' && '👁️'}
                  {stat.color === 'purple' && '📋'}
                  {stat.color === 'red' && '⚡'}
                  {stat.color === 'orange' && '📊'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analysis Tools Section */}
        {!isAdmin() && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">🚀 Analiz Araçları</h2>
                <p className="text-gray-600 mt-1">
                  Her analiz için 1 token harcanır. Hemen analizinizi başlatın!
                </p>
              </div>
              <a 
                href="/dashboard/tokens" 
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                Token Al →
              </a>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {analysisTools.map((tool) => {
                const hasEnoughTokens = (tokens?.remaining_tokens || 0) >= tool.tokensRequired;
                return (
                  <div key={tool.id} className="relative group">
                    {tool.popular && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                        Popüler
                      </div>
                    )}
                    
                    <div className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                      hasEnoughTokens 
                        ? 'border-gray-200 hover:border-blue-300 hover:shadow-lg cursor-pointer' 
                        : 'border-gray-100 opacity-60'
                    }`}>
                      <div className="text-center">
                        <div className="text-4xl mb-4">{tool.icon}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                        
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {tool.tokensRequired} Token
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            tool.category === 'financial' ? 'bg-green-100 text-green-600' :
                            tool.category === 'environmental' ? 'bg-blue-100 text-blue-600' :
                            tool.category === 'technical' ? 'bg-purple-100 text-purple-600' :
                            tool.category === 'market' ? 'bg-orange-100 text-orange-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {tool.category}
                          </span>
                        </div>

                        <a
                          href={hasEnoughTokens ? tool.href : '/dashboard/tokens'}
                          className={`block w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                            hasEnoughTokens
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {hasEnoughTokens ? 'Analizi Başlat' : 'Token Gerekli'}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {isAdmin() ? '⚙️ Yönetim Araçları' : '⚡ Hızlı İşlemler'}
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {currentQuickActions.map((action, index) => (
                <a
                  key={index}
                  href={('disabled' in action && action.disabled) ? '#' : action.href}
                  className={`block p-4 rounded-lg transition-all duration-200 ${
                    ('disabled' in action && action.disabled)
                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                      : action.primary
                        ? 'bg-gray-900 hover:bg-gray-800 text-white transform hover:scale-105'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900 hover:shadow-md'
                  }`}
                  onClick={('disabled' in action && action.disabled) ? (e) => e.preventDefault() : undefined}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{action.icon}</span>
                    <div className="flex-1">
                      <h4 className={`font-medium mb-1 ${
                        ('disabled' in action && action.disabled) ? 'text-gray-400' : action.primary ? 'text-white' : 'text-gray-900'
                      }`}>
                        {action.name}
                      </h4>
                      <p className={`text-sm ${
                        ('disabled' in action && action.disabled) ? 'text-gray-400' : action.primary ? 'text-gray-200' : 'text-gray-600'
                      }`}>
                        {action.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {isAdmin() ? '📊 Sistem Aktivitesi' : '📋 Son Aktiviteler'}
              </h3>
              <span className="text-sm text-gray-500">Canlı</span>
            </div>
            
            <div className="space-y-4">
              {currentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {!isAdmin() && dashboardData.recentActivity.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🌱</div>
                <p className="text-sm">Henüz aktivite yok</p>
                <p className="text-xs mt-1">İlk analizinizi yaparak başlayın!</p>
              </div>
            )}
          </div>
        </div>

        {/* Token Management Section for Users */}
        {!isAdmin() && (
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">💰 Token Yönetimi</h3>
              <a 
                href="/dashboard/tokens" 
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                Detaylı Görünüm →
              </a>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Mevcut Tokenler</h4>
                <p className="text-3xl font-bold text-green-600 mb-2">{tokens?.remaining_tokens || 0}</p>
                <p className="text-sm text-gray-600">Kullanılabilir token</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Kullanılan</h4>
                <p className="text-3xl font-bold text-blue-600 mb-2">{tokens?.used_tokens || 0}</p>
                <p className="text-sm text-gray-600">Toplam harcama</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">Token Al</h4>
                <a
                  href="/dashboard/tokens"
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors mt-2"
                >
                  Paketleri Gör
                </a>
              </div>
            </div>

            {tokens && tokens.remaining_tokens <= 2 && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-yellow-600 mr-2">⚠️</span>
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Token Uyarısı</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Token bakiyeniz azalıyor. Analiz yapmaya devam etmek için token satın alın.
                    </p>
                  </div>
                  <a
                    href="/dashboard/tokens"
                    className="ml-auto px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700"
                  >
                    Token Al
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cache Performance Widget */}
        <div className="fixed bottom-4 right-4 z-50">
          <CacheStatsWidget className="w-64" />
        </div>

      </div>
    </DashboardLayout>
  );
}
