'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function SimpleDashboard() {
  return (
    <DashboardLayout title="Dashboard" subtitle="SeraGPT Kontrol Paneli">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Token Bakiyesi</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">25</p>
            <p className="text-sm text-gray-600 mt-1">Kalan token</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Toplam Analiz</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
            <p className="text-sm text-gray-600 mt-1">Tamamlanan analiz</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Aktif Rapor</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">3</p>
            <p className="text-sm text-gray-600 mt-1">Hazır rapor</p>
          </div>
        </div>

        {/* Analysis Tools */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Analiz Araçları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/dashboard/analysis/roi" className="block p-4 border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium text-gray-900">ROI Analizi</h3>
              <p className="text-sm text-gray-600 mt-1">Yatırım geri dönüş analizi</p>
              <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">1 Token</span>
            </a>
            
            <a href="/dashboard/analysis/climate" className="block p-4 border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium text-gray-900">İklim Analizi</h3>
              <p className="text-sm text-gray-600 mt-1">Bölgesel iklim uygunluk analizi</p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">1 Token</span>
            </a>
            
            <a href="/dashboard/analysis/market" className="block p-4 border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium text-gray-900">Pazar Analizi</h3>
              <p className="text-sm text-gray-600 mt-1">Fiyat ve talep analizi</p>
              <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">1 Token</span>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Son Aktiviteler</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-gray-900">ROI Analizi Tamamlandı</p>
                <p className="text-sm text-gray-600">Antalya Domates Serası</p>
              </div>
              <span className="text-sm text-gray-500">2 saat önce</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-gray-900">İklim Analizi Başlatıldı</p>
                <p className="text-sm text-gray-600">Mersin Bölgesi</p>
              </div>
              <span className="text-sm text-gray-500">5 saat önce</span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900">Pazar Raporu İndirildi</p>
                <p className="text-sm text-gray-600">Hıyar Fiyat Analizi</p>
              </div>
              <span className="text-sm text-gray-500">1 gün önce</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
