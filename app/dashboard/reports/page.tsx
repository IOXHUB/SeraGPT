'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface Report {
  id: string;
  title: string;
  analysisType: string;
  date: string;
  status: 'completed' | 'processing' | 'failed';
  downloadUrl?: string;
  preview: string;
}

export default function ReportsPage() {
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Mock reports data - this would come from API in real implementation
  const reports: Report[] = [
    {
      id: '1',
      title: 'Antalya Domates Serası ROI Analizi',
      analysisType: 'ROI Simülasyonu',
      date: '2024-01-15',
      status: 'completed',
      downloadUrl: '/reports/roi-antalya-domates.pdf',
      preview: 'Yatırım geri dönüş süresi: 2.8 yıl, ROI: %34.2, Net kar: ₺285K'
    },
    {
      id: '2',
      title: 'İzmir Salatalık İklim Uygunluğu',
      analysisType: 'İklim Analizi',
      date: '2024-01-12',
      status: 'completed',
      downloadUrl: '/reports/climate-izmir-cucumber.pdf',
      preview: 'Uygunluk skoru: %87, Düşük don riski, Optimal verim beklentisi'
    },
    {
      id: '3',
      title: 'Bursa Biber Serası Ekipman Listesi',
      analysisType: 'Ekipman Listesi',
      date: '2024-01-10',
      status: 'completed',
      downloadUrl: '/reports/equipment-bursa-pepper.pdf',
      preview: '23 ekipman önerisi, Toplam maliyet: ₺285K, 8 hafta kurulum'
    },
    {
      id: '4',
      title: 'Mersin Domates Pazar Analizi',
      analysisType: 'Pazar Analizi',
      date: '2024-01-08',
      status: 'completed',
      downloadUrl: '/reports/market-mersin-tomato.pdf',
      preview: 'Ortalama fiyat: ₺12.5/kg, Bölge verimi: 85 ton/ha, Mayıs optimal'
    },
    {
      id: '5',
      title: 'Konya Sera Yerleşim Planı',
      analysisType: 'Teknik Planlar',
      date: '2024-01-05',
      status: 'processing',
      preview: 'Teknik çizimler hazırlanıyor... %75 tamamlandı'
    }
  ];

  const filteredReports = reports.filter(report => {
    if (filterType === 'all') return true;
    return report.analysisType.toLowerCase().includes(filterType);
  });

  const sortedReports = filteredReports.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Report['status']) => {
    switch (status) {
      case 'completed': return 'Tamamlandı';
      case 'processing': return 'İşleniyor';
      case 'failed': return 'Başarısız';
      default: return 'Bilinmiyor';
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Raporlarım</h1>
              <p className="text-gray-600 mt-1">Oluşturduğunuz analiz raporlarını görüntüleyin ve indirin</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="all">Tüm Raporlar</option>
                <option value="roi">ROI Simülasyonu</option>
                <option value="iklim">İklim Analizi</option>
                <option value="ekipman">Ekipman Listesi</option>
                <option value="pazar">Pazar Analizi</option>
                <option value="teknik">Teknik Planlar</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="date">Tarihe Göre</option>
                <option value="title">İsme Göre</option>
              </select>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-1">Toplam Rapor</h3>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-1">Tamamlanan</h3>
              <p className="text-2xl font-bold text-green-600">{reports.filter(r => r.status === 'completed').length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-1">İşleniyor</h3>
              <p className="text-2xl font-bold text-yellow-600">{reports.filter(r => r.status === 'processing').length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-1">Bu Ay</h3>
              <p className="text-2xl font-bold text-blue-600">{reports.filter(r => 
                new Date(r.date).getMonth() === new Date().getMonth()
              ).length}</p>
            </motion.div>
          </div>

          {/* Reports List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Rapor Listesi</h2>
            </div>
            <div className="p-6">
              {sortedReports.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Henüz rapor yok</h3>
                  <p className="text-gray-600 mb-4">İlk analizinizi yaparak rapor oluşturun</p>
                  <a
                    href="/dashboard"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Analiz Yap
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedReports.map((report, index) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                              {getStatusText(report.status)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span>{report.analysisType}</span>
                            <span>•</span>
                            <span>{new Date(report.date).toLocaleDateString('tr-TR')}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{report.preview}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          {report.status === 'completed' && report.downloadUrl && (
                            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                              PDF İndir
                            </button>
                          )}
                          <button className="text-gray-600 hover:text-gray-700 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium transition-colors">
                            Detaylar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
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
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="/dashboard"
                  className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Yeni Analiz</h3>
                    <p className="text-sm text-gray-600">ROI, İklim, Ekipman analizi yap</p>
                  </div>
                </a>
                <a
                  href="/dashboard/ai-chat"
                  className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">AI ile Konuş</h3>
                    <p className="text-sm text-gray-600">Raporlarınız hakkında soru sorun</p>
                  </div>
                </a>
                <a
                  href="/dashboard/consulting"
                  className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Mühendis Desteği</h3>
                    <p className="text-sm text-gray-600">Uzman danışmanlık alın</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
