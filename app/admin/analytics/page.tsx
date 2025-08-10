'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdminErrorBoundary from '@/components/AdminErrorBoundary';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

const analyticsData = {
  overview: {
    totalUsers: 1247,
    activeUsers: 892,
    totalAnalyses: 5634,
    revenue: 45230
  },
  growth: {
    usersGrowth: 12.5,
    analysesGrowth: 8.3,
    revenueGrowth: 15.7
  },
  topAnalyses: [
    { name: 'ROI Simülasyonu', count: 1876, percentage: 33.3 },
    { name: 'İklim Analizi', count: 1245, percentage: 22.1 },
    { name: 'Ekipman Listesi', count: 998, percentage: 17.7 },
    { name: 'Pazar Analizi', count: 834, percentage: 14.8 },
    { name: 'Layout Planlama', count: 681, percentage: 12.1 }
  ],
  recentActivities: [
    { user: 'Mehmet Yılmaz', action: 'ROI Analizi tamamladı', time: '5 dk önce' },
    { user: 'Ayşe Kaya', action: 'Jeton paketi satın aldı', time: '12 dk önce' },
    { user: 'Ali Demir', action: 'İklim analizi başlattı', time: '18 dk önce' },
    { user: 'Fatma Şen', action: 'Hesap oluşturdu', time: '25 dk önce' },
    { user: 'Hasan Öz', action: 'Danışmanlık talebi gönderdi', time: '32 dk önce' }
  ]
};

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <AdminErrorBoundary>
      <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="page-section-container space-y-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analitik ve Raporlar</h1>
              <p className="text-gray-600 mt-1">Platform kullanımı ve performans metrikleri</p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="24h">Son 24 Saat</option>
              <option value="7d">Son 7 Gün</option>
              <option value="30d">Son 30 Gün</option>
              <option value="90d">Son 90 Gün</option>
            </select>
          </motion.div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Toplam Kullanıcı</h3>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    ↗ +{analyticsData.growth.usersGrowth}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">👥</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Aktif Kullanıcı</h3>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.activeUsers.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    %{((analyticsData.overview.activeUsers / analyticsData.overview.totalUsers) * 100).toFixed(1)} aktiflik
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">⚡</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Toplam Analiz</h3>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalAnalyses.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    ↗ +{analyticsData.growth.analysesGrowth}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-xl">📊</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Gelir</h3>
                  <p className="text-2xl font-bold text-gray-900">₺{analyticsData.overview.revenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    ↗ +{analyticsData.growth.revenueGrowth}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-xl">💰</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Usage Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Kullanım Trendi</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Grafik yükleniyor...</p>
              </div>
            </motion.div>

            {/* Top Analyses */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Popüler Analizler</h2>
              <div className="space-y-4">
                {analyticsData.topAnalyses.map((analysis, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{analysis.name}</span>
                        <span className="text-sm text-gray-600">{analysis.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-600 h-2 rounded-full"
                          style={{ width: `${analysis.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Activities and System Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Son Aktiviteler</h2>
              <div className="space-y-4">
                {analyticsData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Tüm aktiviteleri gör →
              </button>
            </motion.div>

            {/* System Performance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Sistem Performansı</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">CPU Kullanımı</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">45%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">RAM Kullanımı</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">72%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Disk Kullanımı</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '38%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">38%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Yanıt Süresi</span>
                  <span className="text-sm font-medium text-gray-900">125ms</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Aktif Bağlantılar</span>
                  <span className="text-sm font-medium text-gray-900">247</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Export and Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Rapor ve Dışa Aktarım</h2>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                PDF Raporu İndir
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Excel'e Aktar
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                CSV İndir
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Özel Rapor Oluştur
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      </DashboardLayout>
    </AdminErrorBoundary>
  );
}
