'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function DashboardPage() {
  const stats = [
    { name: 'Toplam Sera Projesi', value: '12', icon: '🌱', change: '+2 bu ay', changeType: 'positive' },
    { name: 'Aktif Analizler', value: '8', icon: '📊', change: '+4 bu hafta', changeType: 'positive' },
    { name: 'Tamamlanan Raporlar', value: '24', icon: '📋', change: '+8 bu ay', changeType: 'positive' },
    { name: 'Toplam ROI', value: '%34.2', icon: '💰', change: '+12.5%', changeType: 'positive' },
  ];

  const recentProjects = [
    { name: 'Antalya Domates Serası', status: 'Analiz Tamamlandı', date: '2 gün önce', progress: 100 },
    { name: 'İzmir Salatalık Üretimi', status: 'Devam Ediyor', date: '5 gün önce', progress: 65 },
    { name: 'Bursa Marul Serası', status: 'Başlatıldı', date: '1 hafta önce', progress: 25 },
    { name: 'Adana Biber Üretimi', status: 'Planlama', date: '2 hafta önce', progress: 10 },
  ];

  const quickActions = [
    { name: 'Yeni Sera Projesi', icon: '➕', description: 'Yeni bir sera projesi analizine başlayın' },
    { name: 'Rapor Oluştur', icon: '📄', description: 'Mevcut verilerden detaylı rapor oluşturun' },
    { name: 'Veri İçe Aktarım', icon: '📥', description: 'Excel dosyasından sera verilerini aktarın' },
    { name: 'AI Öneriler', icon: '🤖', description: 'AI destekli sera optimizasyon önerileri alın' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Sera projelerinizin genel durumunu görüntüleyin</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Son Projeler</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.status} • {project.date}</p>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className="text-sm font-medium text-gray-500">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a href="/dashboard/projects" className="text-green-600 hover:text-green-700 text-sm font-medium">
                  Tüm projeleri görüntüle →
                </a>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Hızlı İşlemler</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{action.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{action.name}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Antalya Domates Serası analizi tamamlandı</p>
                  <p className="text-xs text-gray-500">2 saat önce</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📊</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Yeni ROI raporu oluşturuldu</p>
                  <p className="text-xs text-gray-500">5 saat önce</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm">🤖</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">AI öneriler güncellendi</p>
                  <p className="text-xs text-gray-500">1 gün önce</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
