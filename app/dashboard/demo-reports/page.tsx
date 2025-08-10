'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export const dynamic = 'force-dynamic';

interface DemoReport {
  id: string;
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function DemoReportsPage() {
  const demoReports: DemoReport[] = [
    {
      id: 'demo-roi-001',
      type: 'roi',
      title: 'Antalya Domates Serası ROI Analizi',
      description: 'Detaylı finansal analiz ve 5 yıllık geri dönüş projeksiyonu',
      icon: '📊',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'demo-climate-001',
      type: 'climate',
      title: 'İzmir İklim Uygunluk Analizi',
      description: '12 aylık iklim verileri ve risk değerlendirmesi',
      icon: '🌡️',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'demo-equipment-001',
      type: 'equipment',
      title: 'Hidroponik Sistem Ekipman Listesi',
      description: 'Mühendis onaylı ekipman önerileri ve maliyet analizi',
      icon: '🔧',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      id: 'demo-market-001',
      type: 'market',
      title: 'Salatalık Pazar Fiyat Analizi',
      description: 'Fiyat trendleri, rekabet analizi ve pazar öngörüleri',
      icon: '📈',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    {
      id: 'demo-layout-001',
      type: 'layout',
      title: 'Modern Sera Layout Planı',
      description: '2D teknik çizimler, malzeme listesi ve kurulum kılavuzu',
      icon: '📐',
      color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
    }
  ];

  const openReport = (report: DemoReport) => {
    window.open(`/dashboard/reports/${report.type}/${report.id}`, '_blank');
  };

  return (
    <DashboardLayout title="Demo Raporlar" subtitle="5 farklı analiz türü için örnek raporlar">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🎯 Sera Analiz Raporları Demo
          </h2>
          <p className="text-gray-600 mb-4">
            5 farklı analiz türü için hazırlanmış profesyonel rapor örneklerini inceleyin. 
            Her rapor gerçek verilerle oluşturulmuş ve PDF olarak indirilebilir.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              PDF İndirilebilir
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Yazdırma Destekli
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Profesyonel Format
            </span>
          </div>
        </div>

        {/* Demo Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {demoReports.map((report) => (
            <div
              key={report.id}
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${report.color}`}
              onClick={() => openReport(report)}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-4xl">{report.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {report.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {report.description}
                  </p>
                </div>
              </div>

              {/* Report Features */}
              <div className="space-y-2 mb-4">
                <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  İçerik Özellikleri:
                </div>
                <div className="flex flex-wrap gap-2">
                  {report.type === 'roi' && (
                    <>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">Finansal Projeksiyon</span>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">Risk Analizi</span>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">5 Yıllık Plan</span>
                    </>
                  )}
                  {report.type === 'climate' && (
                    <>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">12 Aylık Veri</span>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">Risk Matrisi</span>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">Mevsimsel Analiz</span>
                    </>
                  )}
                  {report.type === 'equipment' && (
                    <>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">Marka-Model</span>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">Maliyet Analizi</span>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">Kurulum Takvimi</span>
                    </>
                  )}
                  {report.type === 'market' && (
                    <>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">Fiyat Trendleri</span>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">Rekabet Analizi</span>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">Tahminler</span>
                    </>
                  )}
                  {report.type === 'layout' && (
                    <>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">2D Çizimler</span>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">Malzeme Listesi</span>
                      <span className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs">Teknik Detay</span>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openReport(report);
                  }}
                  className="flex-1 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all text-sm border"
                >
                  📄 Raporu Görüntüle
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/dashboard/analysis/${report.type}`, '_blank');
                  }}
                  className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all text-sm border"
                >
                  ➕ Yeni Analiz
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📋 Nasıl Kullanılır?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Rapor Seçin</p>
                <p className="text-gray-600">İncelemek istediğiniz analiz türünü seçin ve raporu açın</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <p className="font-medium text-gray-900 mb-1">İnceleyin</p>
                <p className="text-gray-600">Rapor içeriğini detaylı olarak inceleyin ve PDF indirin</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Yeni Analiz</p>
                <p className="text-gray-600">Kendi verilerinizle yeni analiz oluşturun</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600">Analiz Türü</div>
          </div>
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-green-600">PDF</div>
            <div className="text-sm text-gray-600">İndirme</div>
          </div>
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">AI</div>
            <div className="text-sm text-gray-600">Destekli</div>
          </div>
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">Real</div>
            <div className="text-sm text-gray-600">Veriler</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
