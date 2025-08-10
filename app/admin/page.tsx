'use client';

import { useState, useEffect } from 'react';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdminErrorBoundary from '@/components/AdminErrorBoundary';
import { externalApiService } from '@/lib/services/external-api-service';

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const [timeRange, setTimeRange] = useState('7days');
  const [adminData, setAdminData] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [apiStatusData, setApiStatusData] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      loadAdminData();
    }
  }, [user, loading]);

  const loadAdminData = async () => {
    if (!isAdmin()) {
      window.location.href = '/dashboard';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock admin data loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAdminData = {
        systemStats: [
          { name: 'Toplam Kullanıcı', value: 847, change: '+12 bu hafta', changeType: 'positive' },
          { name: 'Aktif Analizler', value: 73, change: '+18 bugün', changeType: 'positive' },
          { name: 'Jeton Kullanımı', value: 2156, change: '+142 bu hafta', changeType: 'positive' },
          { name: 'Sistem Durumu', value: '99.9%', change: 'Tüm sistemler aktif', changeType: 'positive' },
        ],
        recentUsers: [
          { name: 'Mehmet Yılmaz', email: 'mehmet@example.com', role: 'user', joinDate: '2 gün önce', status: 'active' },
          { name: 'Ayşe Kaya', email: 'ayse@example.com', role: 'premium', joinDate: '3 gün önce', status: 'active' },
          { name: 'Ali Demir', email: 'ali@example.com', role: 'user', joinDate: '1 gün önce', status: 'active' },
          { name: 'Fatma Şen', email: 'fatma@example.com', role: 'user', joinDate: '4 gün önce', status: 'pending' },
          { name: 'Mustafa Özkan', email: 'mustafa@example.com', role: 'user', joinDate: '5 gün önce', status: 'active' }
        ],
        apiStatus: [
          { name: 'OpenWeather API', status: 'active', responseTime: '145ms', requests: 2340 },
          { name: 'FAO Data API', status: 'active', responseTime: '223ms', requests: 1245 },
          { name: 'TUİK API', status: 'active', responseTime: '334ms', requests: 567 },
          { name: 'Supabase DB', status: 'active', responseTime: '89ms', requests: 5670 },
          { name: 'Vercel Hosting', status: 'active', responseTime: '45ms', requests: 12340 },
        ]
      };
      
      setAdminData(mockAdminData);
      console.log('🚀 Admin dashboard loaded with mock data');
      
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const testExternalApis = async () => {
    setApiLoading(true);
    try {
      console.log('🔍 Testing external APIs...');
      const status = await externalApiService.getApiStatus();
      setApiStatusData(status);
      console.log('�� API Status:', status);
    } catch (error) {
      console.error('Failed to test APIs:', error);
    } finally {
      setApiLoading(false);
    }
  };

  // Redirect non-admin users
  if (!loading && user && !isAdmin()) {
    return (
      <DashboardLayout title="Erişim Reddedildi" subtitle="Bu sayfaya erişim yetkiniz yok">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">🚫</div>
          <h3 className="text-lg font-medium text-red-800 mb-2">Yetkisiz Erişim</h3>
          <p className="text-red-600 mb-4">Bu sayfaya erişmek için admin yetkisine sahip olmanız gerekir.</p>
          <a href="/dashboard" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            Dashboard'a Dön
          </a>
        </div>
      </DashboardLayout>
    );
  }

  if (loading || dataLoading || !adminData) {
    return (
      <DashboardLayout title="Admin Panel" subtitle="Sistem yönetimi ve istatistikler">
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(j => (
                  <div key={j} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  const { systemStats, recentUsers, apiStatus } = adminData;

  const tokenStats = [
    { name: 'Satılan Jeton', value: '10,247', change: '+456 bu hafta', changeType: 'positive' },
    { name: 'Kullanılan Jeton', value: '8,932', change: '+234 bu hafta', changeType: 'positive' },
    { name: 'Aktif Abonelik', value: '156', change: '+12 bu ay', changeType: 'positive' },
    { name: 'Aylık Gelir', value: '₺25,648', change: '+18% bu ay', changeType: 'positive' },
  ];

  const analysisStats = [
    { type: 'ROI Analizi', count: 456, percentage: 35 },
    { type: 'İklim Analizi', count: 234, percentage: 18 },
    { type: 'Ekipman Listesi', count: 189, percentage: 15 },
    { type: 'Pazar Analizi', count: 167, percentage: 13 },
    { type: 'Teknik Plan', count: 98, percentage: 8 },
    { type: 'Diğer', count: 156, percentage: 11 },
  ];

  return (
    <AdminErrorBoundary>
      <DashboardLayout title="Admin Panel" subtitle="Sistem yönetimi ve istatistikler">
        <div className="space-y-8">
          {/* Time Range Selector */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Sistem durumu ve istatistikler</p>
            </div>
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="24hours">Son 24 Saat</option>
              <option value="7days">Son 7 Gün</option>
              <option value="30days">Son 30 Gün</option>
              <option value="90days">Son 90 Gün</option>
            </select>
          </div>

          {/* System Stats */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sistem ��statistikleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStats.map((stat: any, index: number) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg border p-6"
                >
                  <h3 className="text-sm font-medium text-gray-600">{stat.name}</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value.toLocaleString()}</p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Token Stats */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Token İstatistikleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tokenStats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg border p-6"
                >
                  <h3 className="text-sm font-medium text-gray-600">{stat.name}</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Analysis Stats */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Analiz Türleri Dağılımı</h2>
            <div className="bg-white rounded-lg border p-6">
              <div className="space-y-4">
                {analysisStats.map((analysis, index) => (
                  <div key={analysis.type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium text-gray-900">{analysis.type}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${analysis.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{analysis.count}</span>
                      <span className="text-sm text-gray-500 w-8 text-right">{analysis.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* API Status */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">API Durumu</h2>
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600">
                  <div>Servis</div>
                  <div>Durum</div>
                  <div>Yanıt Süresi</div>
                  <div>İstekler</div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {apiStatus.map((api) => (
                  <div key={api.name} className="px-6 py-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="text-sm font-medium text-gray-900">{api.name}</div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          api.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : api.status === 'warning'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {api.status === 'active' ? 'Aktif' : api.status === 'warning' ? 'Uyarı' : 'Hata'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">{api.responseTime}</div>
                      <div className="text-sm text-gray-600">{api.requests.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Users */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Son Kullanıcılar</h2>
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600">
                  <div>Kullanıcı</div>
                  <div>Rol</div>
                  <div>Katılım</div>
                  <div>Durum</div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentUsers.map((user, index) => (
                  <motion.div
                    key={user.email}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-6 py-4 hover:bg-gray-50"
                  >
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'premium' 
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role === 'premium' ? 'Premium' : 'Kullanıcı'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">{user.joinDate}</div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status === 'active' ? 'Aktif' : 'Beklemede'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* External API Services */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">External API Services</h2>
              <button
                onClick={testExternalApis}
                disabled={apiLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {apiLoading ? '🔄 Test Ediliyor...' : '🧪 API Test Et'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weather & Climate Services */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">🌤️</div>
                  <div>
                    <h3 className="font-medium text-gray-900">Hava Durumu & İklim</h3>
                    <p className="text-sm text-gray-600">İklim uyum skoru, ısıtma/soğutma yükleri</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Open-Meteo', desc: '16-gün tahmin, saatlik/günlük metrikler', tier: 'FREE' },
                    { name: 'Meteostat', desc: 'Geçmiş iklim verileri, uzun yıllar ortalaması', tier: 'FREE' },
                    { name: 'NASA POWER', desc: 'Güneşlenme, radyasyon, yüzey meteorolojisi', tier: 'FREE' },
                    { name: 'Copernicus ERA5', desc: '1979-günümüz, yüksek çözünürlüklü reanalysis', tier: 'FREE' }
                  ].map((api, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm text-gray-900">{api.name}</div>
                        <div className="text-xs text-gray-600">{api.desc}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{api.tier}</span>
                        <div className={`w-3 h-3 rounded-full ${
                          apiStatusData?.[api.name]?.status === 'active' ? 'bg-green-500' :
                          apiStatusData?.[api.name]?.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Satellite & Terrain Services */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">🛰️</div>
                  <div>
                    <h3 className="font-medium text-gray-900">Uydu, Arazi, Toprak</h3>
                    <p className="text-sm text-gray-600">Parsel uygunluğu, NDVI, toprak sınıfları</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Sentinel-2', desc: 'NDVI, EVI, NBR; 10-30m çözünürlük', tier: 'FREE' },
                    { name: 'SoilGrids', desc: 'Küresel toprak haritaları, pH, organik madde', tier: 'FREE' },
                    { name: 'SRTM DEM', desc: 'Sayısal Yükseklik Modeli (30m)', tier: 'FREE' },
                    { name: 'PVGIS', desc: 'Güneş potansiyeli, PV üretim simülasyonu', tier: 'FREE' }
                  ].map((api, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm text-gray-900">{api.name}</div>
                        <div className="text-xs text-gray-600">{api.desc}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{api.tier}</span>
                        <div className={`w-3 h-3 rounded-full ${
                          api.name === 'SoilGrids' && apiStatusData?.['SoilGrids']?.status === 'active' ? 'bg-green-500' :
                          api.name === 'PVGIS' && apiStatusData?.['PVGIS']?.status === 'active' ? 'bg-green-500' :
                          'bg-gray-400'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market & Financial Services */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">📈</div>
                  <div>
                    <h3 className="font-medium text-gray-900">Pazar & Finans</h3>
                    <p className="text-sm text-gray-600">Fiyat trendleri, döviz kurları</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'FAO Data', desc: 'Global tarım fiyat endeksleri', tier: 'FREE' },
                    { name: 'TÜİK', desc: 'Bölgesel üretim/hasat istatistikleri', tier: 'FREE' },
                    { name: 'TCMB', desc: 'Güncel döviz kurları', tier: 'FREE' },
                    { name: 'EPİAŞ', desc: 'Elektrik piyasa verileri (PTF/SMF)', tier: 'FREE' }
                  ].map((api, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm text-gray-900">{api.name}</div>
                        <div className="text-xs text-gray-600">{api.desc}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{api.tier}</span>
                        <div className={`w-3 h-3 rounded-full ${
                          api.name === 'TCMB' && apiStatusData?.['TCMB']?.status === 'active' ? 'bg-green-500' :
                          'bg-gray-400'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic Services */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">🗺️</div>
                  <div>
                    <h3 className="font-medium text-gray-900">Coğrafi Servisler</h3>
                    <p className="text-sm text-gray-600">Geocoding, mesafe, lojistik rota</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Nominatim', desc: 'Geocoding / Reverse geocoding', tier: 'FREE' },
                    { name: 'OpenRouteService', desc: 'Sürüş mesafesi, süre, isochrone', tier: 'FREE' },
                    { name: 'Google Maps', desc: 'Yüksek doğruluk, SLA', tier: 'PAID' },
                    { name: 'Mapbox', desc: 'Harita görselleştirme + erişilebilirlik', tier: 'PAID' }
                  ].map((api, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm text-gray-900">{api.name}</div>
                        <div className="text-xs text-gray-600">{api.desc}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          api.tier === 'FREE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>{api.tier}</span>
                        <div className={`w-3 h-3 rounded-full ${
                          api.name === 'Nominatim' && apiStatusData?.['Nominatim']?.status === 'active' ? 'bg-green-500' :
                          'bg-gray-400'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* API Status Details */}
            {apiStatusData && (
              <div className="mt-6 bg-white rounded-lg border p-6">
                <h3 className="font-medium text-gray-900 mb-4">API Test Sonuçları</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(apiStatusData).map(([apiName, status]: [string, any]) => (
                    <div key={apiName} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">{apiName}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          status.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {status.status === 'active' ? 'Aktif' : 'Hata'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <div>Yanıt Süresi: {status.responseTime}</div>
                        <div>Son Test: {new Date(status.lastChecked).toLocaleTimeString('tr-TR')}</div>
                        {status.error && <div className="text-red-600 mt-1">Hata: {status.error}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/admin/users" className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="font-medium text-gray-900">Kullanıcı Yönetimi</h3>
                <p className="text-sm text-gray-600 mt-1">Kullanıcıları görüntüle ve yönet</p>
              </a>
              
              <a href="/admin/analytics" className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-medium text-gray-900">Analitik Raporları</h3>
                <p className="text-sm text-gray-600 mt-1">Detaylı sistem analitiği</p>
              </a>

              <a href="/admin/api-test" className="bg-green-50 rounded-lg border-2 border-green-200 p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">🔌</div>
                <h3 className="font-medium text-green-900">API Test</h3>
                <p className="text-sm text-green-700 mt-1">Production API'lerini test et</p>
              </a>
              
              <a href="/admin/settings" className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">��️</div>
                <h3 className="font-medium text-gray-900">Sistem Ayarları</h3>
                <p className="text-sm text-gray-600 mt-1">Platform konfigürasyonu</p>
              </a>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AdminErrorBoundary>
  );
}
