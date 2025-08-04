'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7days');

  const systemStats = [
    { name: 'Toplam Kullanıcı', value: '1,247', change: '+12 bu hafta', changeType: 'positive' },
    { name: 'Aktif Analizler', value: '89', change: '+23 bugün', changeType: 'positive' },
    { name: 'Jeton Kullanımı', value: '2,456', change: '+156 bu hafta', changeType: 'positive' },
    { name: 'Sistem Durumu', value: '99.9%', change: 'Tüm sistemler aktif', changeType: 'positive' },
  ];

  const recentUsers = [
    { name: 'Mehmet Yılmaz', email: 'mehmet@example.com', role: 'user', joinDate: '2 saat önce', status: 'active' },
    { name: 'Ayşe Kaya', email: 'ayse@example.com', role: 'user', joinDate: '5 saat önce', status: 'active' },
    { name: 'Ali Demir', email: 'ali@example.com', role: 'user', joinDate: '1 gün önce', status: 'pending' },
    { name: 'Fatma Şen', email: 'fatma@example.com', role: 'user', joinDate: '2 gün önce', status: 'active' },
  ];

  const apiStatus = [
    { name: 'OpenWeather API', status: 'active', responseTime: '145ms', requests: '2,456' },
    { name: 'FAO Data API', status: 'active', responseTime: '232ms', requests: '1,234' },
    { name: 'TUİK API', status: 'warning', responseTime: '891ms', requests: '567' },
    { name: 'Supabase DB', status: 'active', responseTime: '89ms', requests: '5,678' },
    { name: 'Vercel Hosting', status: 'active', responseTime: '45ms', requests: '12,345' },
  ];

  const tokenStats = [
    { package: 'Ücretsiz (5 jeton)', users: 834, revenue: '₺0', percentage: 67 },
    { package: 'Starter (25 jeton)', users: 298, revenue: '₺14,900', percentage: 24 },
    { package: 'Pro (100 jeton)', users: 89, revenue: '₺26,700', percentage: 7 },
    { package: 'Enterprise', users: 26, revenue: '₺39,000', percentage: 2 },
  ];

  const recentAnalyses = [
    { user: 'mehmet@example.com', type: 'ROI Simülasyonu', location: 'Antalya', completed: true, time: '5 dk önce' },
    { user: 'ayse@example.com', type: 'İklim Analizi', location: 'İzmir', completed: true, time: '12 dk önce' },
    { user: 'ali@example.com', type: 'Ekipman Listesi', location: 'Bursa', completed: false, time: '25 dk önce' },
    { user: 'fatma@example.com', type: 'Pazar Analizi', location: 'Mersin', completed: true, time: '1 saat önce' },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="space-y-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <span>👑</span>
                <span>Admin Dashboard</span>
              </h1>
              <p className="text-gray-600 mt-1">Sistem yönetimi ve kullanıcı analitikleri</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="24hours">Son 24 Saat</option>
                <option value="7days">Son 7 Gün</option>
                <option value="30days">Son 30 Gün</option>
                <option value="90days">Son 90 Gün</option>
              </select>
            </div>
          </motion.div>

          {/* System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemStats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
              >
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Users */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Son Kayıt Olan Kullanıcılar</h2>
                    <a href="/admin/users" className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                      Tümünü Gör →
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status === 'active' ? 'Aktif' : 'Beklemede'}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{user.joinDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* API Status */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">API Durumu</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {apiStatus.map((api, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{api.name}</h4>
                          <p className="text-xs text-gray-600">{api.responseTime} • {api.requests} istek</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          api.status === 'active' ? 'bg-green-500' : 
                          api.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Token Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Jeton Paket İstatistikleri</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                {tokenStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#6b7280"
                            strokeWidth="2"
                            strokeDasharray={`${stat.percentage}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-900">{stat.percentage}%</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{stat.package}</h3>
                    <p className="text-sm text-gray-600">{stat.users} kullanıcı</p>
                    <p className="text-sm font-semibold text-gray-900">{stat.revenue}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Analyses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Son Analizler</h2>
                <a href="/admin/analytics" className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                  Detaylı Analitik →
                </a>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-sm font-medium text-gray-600 pb-3">Kullanıcı</th>
                      <th className="text-left text-sm font-medium text-gray-600 pb-3">Analiz Türü</th>
                      <th className="text-left text-sm font-medium text-gray-600 pb-3">Lokasyon</th>
                      <th className="text-left text-sm font-medium text-gray-600 pb-3">Durum</th>
                      <th className="text-left text-sm font-medium text-gray-600 pb-3">Zaman</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAnalyses.map((analysis, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 text-sm text-gray-900">{analysis.user}</td>
                        <td className="py-3 text-sm text-gray-600">{analysis.type}</td>
                        <td className="py-3 text-sm text-gray-600">{analysis.location}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            analysis.completed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {analysis.completed ? 'Tamamlandı' : 'İşleniyor'}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-500">{analysis.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Quick Admin Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Hızlı İşlemler</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <a
                  href="/admin/users"
                  className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-center"
                >
                  <span className="text-2xl mb-2">👥</span>
                  <h3 className="font-medium text-gray-900 mb-1">Kullanıcı Yönetimi</h3>
                  <p className="text-sm text-gray-600">Kullanıcıları görüntüle ve yönet</p>
                </a>
                <a
                  href="/admin/analytics"
                  className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-center"
                >
                  <span className="text-2xl mb-2">📊</span>
                  <h3 className="font-medium text-gray-900 mb-1">Analitik Raporları</h3>
                  <p className="text-sm text-gray-600">Detaylı kullanım istatistikleri</p>
                </a>
                <a
                  href="/admin/settings"
                  className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-center"
                >
                  <span className="text-2xl mb-2">⚙️</span>
                  <h3 className="font-medium text-gray-900 mb-1">Sistem Ayarları</h3>
                  <p className="text-sm text-gray-600">API ve sistem konfigürasyonu</p>
                </a>
                <a
                  href="/admin/billing"
                  className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-center"
                >
                  <span className="text-2xl mb-2">💳</span>
                  <h3 className="font-medium text-gray-900 mb-1">Ödeme Yönetimi</h3>
                  <p className="text-sm text-gray-600">Faturalar ve ödeme işlemleri</p>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
