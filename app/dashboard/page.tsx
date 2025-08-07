'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Force dynamic rendering for dashboard pages
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const [userTokens, setUserTokens] = useState(5); // 5 free tokens for new users
  const [userStats, setUserStats] = useState({
    totalAnalyses: 0,
    completedReports: 0,
    averageROI: 0,
    pendingAnalyses: 0
  });

  // SeraGPT Analysis Tools
  const analysisTools = [
    {
      id: 'roi-simulation',
      title: 'ROI Simülasyonu',
      description: 'Sera yatırımı geri dönüş analizi',
      icon: '📊',
      tokensRequired: 1,
      status: 'available',
      href: '/dashboard/analysis/roi',
      category: 'financial'
    },
    {
      id: 'climate-analysis',
      title: 'İklim Analizi',
      description: 'Bölgesel iklim uygunluk raporu',
      icon: '🌡️',
      tokensRequired: 1,
      status: 'available',
      href: '/dashboard/analysis/climate',
      category: 'environmental'
    },
    {
      id: 'equipment-list',
      title: 'Ekipman Listesi',
      description: 'Mühendis onaylı ekipman önerileri',
      icon: '🔧',
      tokensRequired: 1,
      status: 'available',
      href: '/dashboard/analysis/equipment',
      category: 'technical'
    },
    {
      id: 'market-analysis',
      title: 'Pazar Analizi',
      description: 'Tarım ürünü fiyat ve trend analizi',
      icon: '📈',
      tokensRequired: 1,
      status: 'available',
      href: '/dashboard/analysis/market',
      category: 'market'
    },
    {
      id: 'layout-plan',
      title: 'Teknik Plan',
      description: '2D/3D sera yerleşim planı',
      icon: '📐',
      tokensRequired: 1,
      status: 'available',
      href: '/dashboard/analysis/layout',
      category: 'design'
    }
  ];

  // Admin vs User Stats
  const statsConfig = isAdmin() ? [
    { name: 'Toplam Kullanıcılar', value: '1,534', change: '+4.8%', changeType: 'positive', color: 'green' },
    { name: 'Aktif Analizler', value: '869', change: '+2.1%', changeType: 'positive', color: 'blue' },
    { name: 'Tamamlanan Raporlar', value: '236', change: '+4.8%', changeType: 'positive', color: 'purple' },
    { name: 'Sistem Yükü', value: '429', change: '-1.2%', changeType: 'negative', color: 'red' },
  ] : [
    { name: 'Kullanılabilir Jeton', value: userTokens.toString(), change: `${userTokens} analiz hakkınız var`, changeType: 'neutral', color: 'green' },
    { name: 'Toplam Analizler', value: userStats.totalAnalyses.toString(), change: 'Henüz analiz yapılmadı', changeType: 'neutral', color: 'blue' },
    { name: 'Tamamlanan Raporlar', value: userStats.completedReports.toString(), change: 'İlk raporunuzu oluşturun', changeType: 'neutral', color: 'purple' },
    { name: 'Ortalama ROI', value: userStats.averageROI ? `%${userStats.averageROI}` : '-', change: 'Analiz sonrası görünür', changeType: 'neutral', color: 'orange' },
  ];

  // Recent Activity for Users
  const recentActivity = [
    {
      type: 'welcome',
      title: 'SeraGPT\'ye hoş geldiniz!',
      description: '5 ücretsiz analiz hakkınız ile başlayabilirsiniz',
      time: 'Şimdi',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      type: 'tip',
      title: 'İpucu: ROI Analizinden Başlayın',
      description: 'En popüler analiz aracımız ile yatırımınızın geri dönüşünü hesaplayın',
      time: '1 dk önce',
      color: 'bg-green-100 text-green-600'
    }
  ];

  // Admin Activity
  const adminActivity = [
    {
      type: 'user',
      title: 'Yeni kullanıcı kaydı',
      description: 'mehmet@example.com sisteme katıldı',
      time: '5 dk önce',
      color: 'bg-green-100 text-green-600'
    },
    {
      type: 'analysis',
      title: 'ROI analizi tamamlandı',
      description: 'ahmet@example.com - İzmir sera projesi',
      time: '15 dk önce',
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

  // Quick Actions for Users
  const userQuickActions = [
    {
      name: 'Ücretsiz Analiz Başlat',
      description: 'İlk 5 analiziniz ücretsiz',
      href: '/dashboard/analysis/roi',
      primary: true
    },
    {
      name: 'AI Sohbet',
      description: 'SeraGPT AI ile konuşun',
      href: '/dashboard/ai-chat',
      primary: false
    },
    {
      name: 'Örnek Raporları Görün',
      description: 'Nasıl raporlar alacağınızı öğrenin',
      href: '/dashboard/reports',
      primary: false
    },
    {
      name: 'Mühendis Desteği',
      description: 'Uzman desteği alın',
      href: '/dashboard/consulting',
      primary: false
    },
  ];

  // Admin Quick Actions
  const adminQuickActions = [
    {
      name: 'Kullanıcı Yönetimi',
      description: 'Kullanıcıları görüntüle ve yönet',
      href: '/admin/users',
      primary: true
    },
    {
      name: 'Sistem Ayarları',
      description: 'API ve sistem konfigürasyonu',
      href: '/admin/settings',
      primary: false
    },
    {
      name: 'Analitik Raporlar',
      description: 'Detaylı sistem raporları',
      href: '/admin/analytics',
      primary: false
    },
    {
      name: 'Blog Yönetimi',
      description: 'İçerik yönetimi paneli',
      href: '/admin/blog',
      primary: false
    },
  ];

  const currentQuickActions = isAdmin() ? adminQuickActions : userQuickActions;
  const currentActivity = isAdmin() ? adminActivity : recentActivity;

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: 'bg-green-50 border-green-200',
      blue: 'bg-blue-50 border-blue-200',
      purple: 'bg-purple-50 border-purple-200',
      red: 'bg-red-50 border-red-200',
      orange: 'bg-orange-50 border-orange-200'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-50 border-gray-200';
  };

  const getIconColor = (color: string) => {
    const iconColorMap = {
      green: 'text-green-600 bg-green-100',
      blue: 'text-blue-600 bg-blue-100',
      purple: 'text-purple-600 bg-purple-100',
      red: 'text-red-600 bg-red-100',
      orange: 'text-orange-600 bg-orange-100'
    };
    return iconColorMap[color as keyof typeof iconColorMap] || 'text-gray-600 bg-gray-100';
  };

  return (
    <DashboardLayout>
      <div className="flex-1 bg-white user-panel-container">
        <div className="user-panel-content space-y-modern">
          {/* Header */}
          <div className="user-panel-section" style={{ padding: '10px 0 50px', font: '400 36px/44px __Inter_d65c78, sans-serif' }}>
            <p>Hoşgeldiniz</p>
          </div>

          {/* Stats Cards */}
          <div className="focus-visual grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsConfig.map((stat, index) => (
            <div key={stat.name} className={`p-6 rounded-xl border ${getColorClasses(stat.color)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-600 text-sm font-medium">{stat.name}</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(stat.color)}`}>
                  {stat.color === 'green' && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  )}
                  {stat.color === 'blue' && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                  {stat.color === 'purple' && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  )}
                  {stat.color === 'red' && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  )}
                  {stat.color === 'orange' && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

          {/* User Analysis Tools Section */}
          {!isAdmin() && (
            <div className="user-panel-section">
              <div className="focus-text">
                <h2 style={{ marginTop: '50px', font: '500 36px/43px __Inter_d65c78, sans-serif' }}>
                  Kullanıma Hazır Analizler
                </h2>
                <p style={{ marginBottom: '50px', font: '400 16px/24px __Inter_d65c78, sans-serif' }}>
                  Her analiz için 1 jeton harcanır. İlk 5 analiziniz ücretsizdir.
                </p>
              </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {analysisTools.map((tool, index) => (
                <div key={tool.id} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-xl opacity-40 group-hover:opacity-70 transition duration-300"></div>
                  <div className="relative bg-white p-6 rounded-xl border-0 h-full flex flex-col">
                    <div className="text-center flex-1">
                      <div className="text-3xl mb-3">{tool.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                    </div>
                    <div className="mt-auto">
                      <a
                        href={tool.href}
                        className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                          userTokens >= tool.tokensRequired
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-105'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {userTokens >= tool.tokensRequired ? (
                          <>
                            <span className="mr-2">🪙</span>
                            Analizi Başlat
                          </>
                        ) : (
                          'Yetersiz Jeton'
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {isAdmin() ? 'Sistem Performansı' : 'Analiz Geçmişi'}
              </h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Aktif</span>
                <span className="text-sm text-gray-500">Tamamlanan</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'].map((month, index) => (
                <div key={month} className="flex flex-col items-center space-y-2">
                  <div className="flex flex-col space-y-1">
                    <div className={`w-8 bg-blue-500 rounded-t`} style={{ height: `${(index + 1) * 20 + 40}px` }}></div>
                    <div className={`w-8 bg-green-300 rounded-t`} style={{ height: `${(index + 1) * 15 + 20}px` }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {isAdmin() ? 'Kullanıcı Dağılımı' : 'Analiz Türleri'}
              </h3>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="8" strokeDasharray="40 60" strokeDashoffset="0"/>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray="30 70" strokeDashoffset="-40"/>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="8" strokeDasharray="20 80" strokeDashoffset="-70"/>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="8" strokeDasharray="10 90" strokeDashoffset="-90"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {isAdmin() ? '1,534' : userStats.totalAnalyses}
                    </div>
                    <div className="text-xs text-gray-500">Toplam</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {(isAdmin() ? [
                { label: 'Aktif Kullanıcılar', value: 420, color: 'bg-blue-500' },
                { label: 'Yeni Kullanıcılar', value: 380, color: 'bg-green-500' },
                { label: 'Premium Kullanıcılar', value: 234, color: 'bg-yellow-500' },
                { label: 'Pasif Kullanıcılar', value: 150, color: 'bg-red-500' },
              ] : [
                { label: 'ROI Analizi', value: 2, color: 'bg-blue-500' },
                { label: 'İklim Analizi', value: 1, color: 'bg-green-500' },
                { label: 'Pazar Analizi', value: 1, color: 'bg-yellow-500' },
                { label: 'Teknik Plan', value: 0, color: 'bg-red-500' },
              ]).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 ${item.color} rounded-full mr-2`}></div>
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {isAdmin() ? 'Yönetim Araçları' : 'Hızlı İşlemler'}
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {currentQuickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className={`block p-4 rounded-lg transition-colors ${
                    action.primary
                      ? 'bg-gray-900 hover:bg-gray-800 text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <div>
                    <h4 className={`font-medium mb-2 ${action.primary ? 'text-white' : 'text-gray-900'}`}>
                      {action.name}
                    </h4>
                    <p className={`text-sm ${action.primary ? 'text-gray-200' : 'text-gray-600'}`}>
                      {action.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {isAdmin() ? 'Sistem Aktivitesi' : 'Son Aktiviteler'}
              </h3>
              <span className="text-sm text-gray-500">Bugün</span>
            </div>
            <div className="space-y-4">
              {currentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Token Management Section */}
        {!isAdmin() && (
          <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Jeton Yönetimi</h3>
              <a 
                href="/dashboard/tokens" 
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Detaylı Görünüm
              </a>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-1">Mevcut Jetonlar</h4>
                <p className="text-2xl font-bold text-gray-900 mb-2">{userTokens}</p>
                <p className="text-sm text-gray-600">Kullanılabilir jeton</p>
              </div>
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-1">Ücretsiz Hak</h4>
                <p className="text-2xl font-bold text-green-600 mb-2">5</p>
                <p className="text-sm text-gray-600">Başlangıç jetonu</p>
              </div>
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-3">Jeton Satın Al</h4>
                <a
                  href="/dashboard/tokens"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Paketleri Gör
                </a>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </DashboardLayout>
  );
}
