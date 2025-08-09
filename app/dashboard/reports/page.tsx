'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MockAnalysisService } from '@/lib/services/mock-analysis-service';

export const dynamic = 'force-dynamic';

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const reportTypes = [
    {
      type: 'roi',
      title: 'ROI Analizi',
      description: 'Sera yatırımı geri dönüş analizi ve finansal projeksiyon',
      icon: '📊',
      color: 'bg-green-50 border-green-200 text-green-800',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      type: 'climate',
      title: 'İklim Analizi',
      description: 'Lokasyon bazlı iklim uygunluk raporu ve risk değerlendirmesi',
      icon: '����️',
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      type: 'equipment',
      title: 'Ekipman Listesi',
      description: 'Mühendis onaylı ekipman önerileri ve maliyet analizi',
      icon: '🔧',
      color: 'bg-purple-50 border-purple-200 text-purple-800',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      type: 'market',
      title: 'Pazar Analizi',
      description: 'Ürün fiyat analizi, rekabet durumu ve pazar öngörüleri',
      icon: '📈',
      color: 'bg-orange-50 border-orange-200 text-orange-800',
      buttonColor: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      type: 'layout',
      title: 'Layout Planlama',
      description: '2D/3D sera tasarımı ve teknik çizimler',
      icon: '📐',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ];

  const createSampleAnalysis = async (type: string) => {
    try {
      const sampleData = {
        type: type,
        title: `Örnek ${reportTypes.find(t => t.type === type)?.title}`,
        status: 'completed' as const
      };
      
      const analysis = await MockAnalysisService.createAnalysis(sampleData);
      
      // Analizin oluşturulmasını bekle
      setTimeout(() => {
        window.open(`/dashboard/reports/${type}/${analysis.id}`, '_blank');
      }, 500);
      
    } catch (error) {
      console.error('Örnek analiz oluşturulamadı:', error);
      alert('Örnek analiz oluşturulamadı');
    }
  };

  return (
    <DashboardLayout title="Analiz Raporları" subtitle="İndirilebilir rapor örnekleri ve yapıları">
      <div className="space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border p-6 text-center">
            <div className="text-3xl font-bold text-gray-900">5</div>
            <div className="text-sm text-gray-600">Analiz Türü</div>
          </div>
          <div className="bg-white rounded-lg border p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">PDF</div>
            <div className="text-sm text-gray-600">İndirilebilir Format</div>
          </div>
          <div className="bg-white rounded-lg border p-6 text-center">
            <div className="text-3xl font-bold text-green-600">AI</div>
            <div className="text-sm text-gray-600">Powered Reports</div>
          </div>
        </div>

        {/* Report Types */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Rapor Türleri</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportTypes.map((reportType) => (
              <div
                key={reportType.type}
                className={`border-2 rounded-xl p-6 ${reportType.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{reportType.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold">{reportType.title}</h3>
                      <p className="text-sm opacity-80">{reportType.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="mb-4">
                  <div className="text-sm opacity-80 mb-2">Rapor İçeriği:</div>
                  <ul className="text-xs space-y-1 opacity-70">
                    {reportType.type === 'roi' && (
                      <>
                        <li>• Finansal projeksiyon tabloları</li>
                        <li>• Risk analizi ve fırsatlar</li>
                        <li>• 5 yıllık geri dönüş hesaplaması</li>
                      </>
                    )}
                    {reportType.type === 'climate' && (
                      <>
                        <li>• 12 aylık iklim verileri</li>
                        <li>• Risk faktörleri değerlendirmesi</li>
                        <li>• Mevsimsel uygunluk analizi</li>
                      </>
                    )}
                    {reportType.type === 'equipment' && (
                      <>
                        <li>• Kategorize edilmiş ekipman listesi</li>
                        <li>• Marka-model önerileri</li>
                        <li>• Kurulum takvimi ve maliyetler</li>
                      </>
                    )}
                    {reportType.type === 'market' && (
                      <>
                        <li>• Güncel fiyat analizi</li>
                        <li>• Rekabet haritası</li>
                        <li>• Gelecek dönem tahminleri</li>
                      </>
                    )}
                    {reportType.type === 'layout' && (
                      <>
                        <li>• 2D teknik çizimler</li>
                        <li>• Malzeme listesi ve maliyetler</li>
                        <li>• Uygulama takvimi</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => createSampleAnalysis(reportType.type)}
                    className={`flex-1 ${reportType.buttonColor} text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm`}
                  >
                    📄 Örnek Rapor Görüntüle
                  </button>
                  <a
                    href={`/dashboard/analysis/${reportType.type}`}
                    className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors text-sm hover:bg-gray-50"
                  >
                    Yeni Analiz
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Features */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Rapor Özellikleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">📊</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Detaylı Analizler</h3>
              <p className="text-sm text-gray-600">Kapsamlı veri analizi ve görselleştirme</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">📄</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">PDF İndirme</h3>
              <p className="text-sm text-gray-600">Profesyonel PDF formatında raporlar</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">🖨️</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Yazdırma Desteği</h3>
              <p className="text-sm text-gray-600">Optimize edilmiş yazdırma düzeni</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 text-xl">🔄</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Güncel Veriler</h3>
              <p className="text-sm text-gray-600">Real-time pazar ve iklim verileri</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">💡 Rapor Nasıl Oluşturulur?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <p className="font-medium text-blue-900 mb-1">Analiz Türü Seçin</p>
                <p className="text-blue-700">5 farklı analiz türünden birini seçerek analiz sürecini başlatın</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <p className="font-medium text-blue-900 mb-1">Parametreler Girin</p>
                <p className="text-blue-700">Sera büyüklüğü, lokasyon, ürün türü gibi gerekli bilgileri doldurun</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <p className="font-medium text-blue-900 mb-1">Rapor İndirin</p>
                <p className="text-blue-700">AI analizi tamamlandıktan sonra PDF olarak raporunuzu indirin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
