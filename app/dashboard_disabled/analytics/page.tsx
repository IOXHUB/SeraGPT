'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Force dynamic rendering for dashboard pages
export const dynamic = 'force-dynamic';

export default function AnalyticsPage() {
  const kpis = [
    { name: 'Toplam Gelir', value: '₺4,870,750', change: '+12.5%', trend: 'up' },
    { name: 'Ortalama ROI', value: '%29.3', change: '+3.2%', trend: 'up' },
    { name: 'Aktif Projeler', value: '8', change: '+2', trend: 'up' },
    { name: 'Verimlilik', value: '%87.4', change: '+5.8%', trend: 'up' },
  ];

  const monthlyData = [
    { month: 'Ocak', revenue: 1200000, projects: 3, roi: 25.5 },
    { month: 'Şubat', revenue: 1450000, projects: 4, roi: 28.2 },
    { month: 'Mart', revenue: 1680000, projects: 5, roi: 31.1 },
    { month: 'Nisan', revenue: 1590000, projects: 6, roi: 29.8 },
    { month: 'Mayıs', revenue: 1870000, projects: 8, roi: 33.4 },
  ];

  const cropAnalysis = [
    { crop: 'Domates', projects: 5, area: '12,500 m²', avgRoi: '34.2%', color: 'bg-red-500' },
    { crop: 'Salatalık', projects: 3, area: '8,200 m²', avgRoi: '28.7%', color: 'bg-green-500' },
    { crop: 'Biber', projects: 2, area: '5,400 m²', avgRoi: '31.8%', color: 'bg-yellow-500' },
    { crop: 'Marul', projects: 2, area: '6,800 m²', avgRoi: '22.4%', color: 'bg-blue-500' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analizler</h1>
          <p className="text-gray-600">Sera projelerinizin detaylı performans analizleri</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi) => (
            <div key={kpi.name} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{kpi.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.trend === 'up' ? '↗' : '↘'} {kpi.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Aylık Gelir Trendi</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 text-sm text-gray-600">{data.month}</div>
                      <div className="flex-1">
                        <div className="bg-gray-200 rounded-full h-3 w-48">
                          <div 
                            className="bg-green-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(data.revenue / 2000000) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ₺{(data.revenue / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-gray-500">
                        {data.projects} proje
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROI Comparison */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">ROI Karşılaştırması</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {monthlyData.map((data) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{data.month}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(data.roi / 40) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">%{data.roi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Crop Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Ürün Bazlı Analiz</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cropAnalysis.map((crop) => (
                <div key={crop.crop} className="text-center">
                  <div className={`w-16 h-16 ${crop.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                    <span className="text-white text-2xl">🌱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{crop.crop}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">{crop.projects} Proje</p>
                    <p className="text-sm text-gray-600">{crop.area}</p>
                    <p className="text-sm font-medium text-green-600">ROI: {crop.avgRoi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Performans İçgörüleri</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📈</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">En Yüksek ROI</h3>
                    <p className="text-sm text-green-600">Antalya Domates: %34.2</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">En Verimli</h3>
                    <p className="text-sm text-blue-600">İzmir Salatalık: %92.1</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-800">En Hızlı</h3>
                    <p className="text-sm text-purple-600">Bursa Marul: 45 gün</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
