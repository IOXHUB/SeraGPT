'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MockAnalysisService } from '@/lib/services/mock-analysis-service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const dynamic = 'force-dynamic';

interface ClimateData {
  location: string;
  plantType: string;
  suitabilityScore: number;
  avgTemperature: number;
  maxTemperature: number;
  minTemperature: number;
  avgHumidity: number;
  annualRainfall: number;
  windSpeed: number;
  frostDays: number;
  growingSeasonLength: number;
  riskFactors: {
    frost: string;
    heatWave: string;
    wind: string;
    humidity: string;
    drought: string;
  };
  optimalSeasons: {
    season: string;
    months: string;
    suitability: number;
    avgTemp: number;
    conditions: string;
  }[];
  monthlyData: {
    month: string;
    avgTemp: number;
    humidity: number;
    rainfall: number;
    suitability: number;
  }[];
  recommendations: string[];
  warnings: string[];
}

export default function ClimateReportPage() {
  const params = useParams();
  const reportRef = useRef<HTMLDivElement>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadAnalysis();
  }, [params.id]);

  const loadAnalysis = async () => {
    try {
      const analysisData = await MockAnalysisService.getAnalysisById(params.id as string);
      if (analysisData && analysisData.type === 'climate') {
        setAnalysis(analysisData);
      }
    } catch (error) {
      console.error('Analiz yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async () => {
    if (!reportRef.current) return;
    
    setGenerating(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`Iklim-Analizi-${analysis.id}.pdf`);
    } catch (error) {
      console.error('PDF oluşturulurken hata:', error);
      alert('PDF oluşturulurken hata oluştu');
    } finally {
      setGenerating(false);
    }
  };

  const printReport = () => {
    window.print();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low': return 'Düşük Risk';
      case 'medium': return 'Orta Risk';
      case 'high': return 'Yüksek Risk';
      default: return 'Bilinmiyor';
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="İklim Analizi Raporu" subtitle="Rapor yükleniyor...">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout title="İklim Analizi Raporu" subtitle="Rapor bulunamadı">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Rapor bulunamadı</h3>
          <p className="text-gray-600">Bu rapor mevcut değil veya silinmiş olabilir.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Mock climate data based on analysis
  const climateData: ClimateData = {
    location: "Antalya",
    plantType: "Domates",
    suitabilityScore: 85,
    avgTemperature: 19.2,
    maxTemperature: 42.1,
    minTemperature: -2.3,
    avgHumidity: 68,
    annualRainfall: 1054,
    windSpeed: 12.5,
    frostDays: 8,
    growingSeasonLength: 285,
    riskFactors: {
      frost: 'low',
      heatWave: 'medium',
      wind: 'low',
      humidity: 'medium',
      drought: 'low'
    },
    optimalSeasons: [
      { season: 'İlkbahar', months: 'Mart-Mayıs', suitability: 92, avgTemp: 18.5, conditions: 'Mükemmel koşullar' },
      { season: 'Sonbahar', months: 'Eylül-Kasım', suitability: 88, avgTemp: 21.2, conditions: 'İdeal sıcaklık' },
      { season: 'Kış', months: 'Aralık-Şubat', suitability: 75, avgTemp: 12.8, conditions: 'Ek ısıtma gerekli' },
      { season: 'Yaz', months: 'Haziran-Ağustos', suitability: 70, avgTemp: 28.6, conditions: 'Soğutma sistemi önerili' }
    ],
    monthlyData: [
      { month: 'Ocak', avgTemp: 10.2, humidity: 72, rainfall: 190, suitability: 70 },
      { month: 'Şubat', avgTemp: 11.8, humidity: 69, rainfall: 142, suitability: 75 },
      { month: 'Mart', avgTemp: 15.1, humidity: 65, rainfall: 98, suitability: 88 },
      { month: 'Nisan', avgTemp: 18.9, humidity: 62, rainfall: 52, suitability: 95 },
      { month: 'Mayıs', avgTemp: 23.2, humidity: 58, rainfall: 35, suitability: 92 },
      { month: 'Haziran', avgTemp: 27.8, humidity: 55, rainfall: 15, suitability: 78 },
      { month: 'Temmuz', avgTemp: 30.1, humidity: 53, rainfall: 8, suitability: 65 },
      { month: 'Ağustos', avgTemp: 29.6, humidity: 56, rainfall: 12, suitability: 68 },
      { month: 'Eylül', avgTemp: 26.2, humidity: 61, rainfall: 28, suitability: 90 },
      { month: 'Ekim', avgTemp: 21.5, humidity: 66, rainfall: 68, suitability: 88 },
      { month: 'Kasım', avgTemp: 16.3, humidity: 70, rainfall: 125, suitability: 82 },
      { month: 'Aralık', avgTemp: 12.1, humidity: 73, rainfall: 165, suitability: 72 }
    ],
    recommendations: [
      "İlkbahar ve sonbahar aylarında maksimum üretim yapın",
      "Yaz aylarında gölgeleme ve soğutma sistemleri kullanın",
      "Kış aylarında ek ısıtma ve nem kontrolü sağlayın",
      "Don olayları için erken uyarı sistemi kurun",
      "Yağmur suyu toplama sistemi önerilir"
    ],
    warnings: [
      "Temmuz-Ağustos aylarında aşırı sıcaklık riski",
      "Aralık-Şubat aylarında don riski",
      "Yaz aylarında su stresi riski"
    ]
  };

  return (
    <DashboardLayout title="İklim Analizi Raporu" subtitle={analysis.title}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex space-x-3 print:hidden">
          <button
            onClick={generatePDF}
            disabled={generating}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {generating ? 'PDF Oluşturuluyor...' : '📄 PDF İndir'}
          </button>
          <button
            onClick={printReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            🖨️ Yazdır
          </button>
          <a
            href="/dashboard/analysis"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            ← Analizlere Dön
          </a>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="bg-white rounded-lg border p-8 print:shadow-none print:border-none">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">İklim Analizi Raporu</h1>
                <p className="text-lg text-gray-600 mt-2">{analysis.title}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Rapor Tarihi</div>
                <div className="font-medium">{new Date(analysis.createdAt).toLocaleDateString('tr-TR')}</div>
                <div className="text-sm text-gray-600 mt-2">Rapor ID</div>
                <div className="font-mono text-sm">{analysis.id}</div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Özet</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{climateData.suitabilityScore}/100</div>
                <div className="text-lg font-medium text-green-800">Uygunluk Skoru</div>
                <div className="text-sm text-green-600 mt-1">
                  {climateData.suitabilityScore >= 80 ? 'Mükemmel' :
                   climateData.suitabilityScore >= 60 ? 'İyi' :
                   climateData.suitabilityScore >= 40 ? 'Orta' : 'Düşük'} uygunluk
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Lokasyon</h3>
                <p className="text-blue-800">{climateData.location}</p>
                <p className="text-sm text-blue-600 mt-1">Hedef Ürün: {climateData.plantType}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-900 mb-3">Yetiştirme Sezonu</h3>
                <p className="text-yellow-800">{climateData.growingSeasonLength} gün</p>
                <p className="text-sm text-yellow-600 mt-1">Yıllık üretim döngüsü</p>
              </div>
            </div>
          </div>

          {/* Climate Data Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">İklim Verileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Ortalama Sıcaklık</span>
                  <span className="font-medium">{climateData.avgTemperature}°C</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Maksimum Sıcaklık</span>
                  <span className="font-medium">{climateData.maxTemperature}°C</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Minimum Sıcaklık</span>
                  <span className="font-medium">{climateData.minTemperature}°C</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Ortalama Nem</span>
                  <span className="font-medium">%{climateData.avgHumidity}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Yıllık Yağış</span>
                  <span className="font-medium">{climateData.annualRainfall} mm</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Ortalama Rüzgar Hızı</span>
                  <span className="font-medium">{climateData.windSpeed} km/h</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Don Günleri (Yıllık)</span>
                  <span className="font-medium">{climateData.frostDays} gün</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Risk Değerlendirmesi</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className={`p-4 rounded-lg border ${getRiskColor(climateData.riskFactors.frost)}`}>
                <div className="text-2xl mb-2">❄️</div>
                <div className="font-semibold">Don Riski</div>
                <div className="text-sm">{getRiskText(climateData.riskFactors.frost)}</div>
              </div>
              <div className={`p-4 rounded-lg border ${getRiskColor(climateData.riskFactors.heatWave)}`}>
                <div className="text-2xl mb-2">🔥</div>
                <div className="font-semibold">Sıcak Hava</div>
                <div className="text-sm">{getRiskText(climateData.riskFactors.heatWave)}</div>
              </div>
              <div className={`p-4 rounded-lg border ${getRiskColor(climateData.riskFactors.wind)}`}>
                <div className="text-2xl mb-2">💨</div>
                <div className="font-semibold">Rüzgar</div>
                <div className="text-sm">{getRiskText(climateData.riskFactors.wind)}</div>
              </div>
              <div className={`p-4 rounded-lg border ${getRiskColor(climateData.riskFactors.humidity)}`}>
                <div className="text-2xl mb-2">💧</div>
                <div className="font-semibold">Nem</div>
                <div className="text-sm">{getRiskText(climateData.riskFactors.humidity)}</div>
              </div>
              <div className={`p-4 rounded-lg border ${getRiskColor(climateData.riskFactors.drought)}`}>
                <div className="text-2xl mb-2">🏜️</div>
                <div className="font-semibold">Kuraklık</div>
                <div className="text-sm">{getRiskText(climateData.riskFactors.drought)}</div>
              </div>
            </div>
          </div>

          {/* Seasonal Analysis */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mevsimsel Analiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {climateData.optimalSeasons.map((season, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{season.season}</h3>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">%{season.suitability}</div>
                      <div className="text-xs text-gray-600">Uygunluk</div>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Dönem:</span> {season.months}</p>
                    <p><span className="text-gray-600">Ortalama Sıcaklık:</span> {season.avgTemp}°C</p>
                    <p><span className="text-gray-600">Koşullar:</span> {season.conditions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Data Table */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Aylık İklim Verileri</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left">Ay</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Sıcaklık (°C)</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Nem (%)</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Yağış (mm)</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Uygunluk (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {climateData.monthlyData.map((month, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-3 py-2 font-medium">{month.month}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">{month.avgTemp}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">{month.humidity}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">{month.rainfall}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          month.suitability >= 80 ? 'bg-green-100 text-green-800' :
                          month.suitability >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {month.suitability}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations and Warnings */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Öneriler ve Uyarılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">Öneriler</h3>
                <ul className="space-y-2">
                  {climateData.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✅</span>
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-3">Uyarılar</h3>
                <ul className="space-y-2">
                  {climateData.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">⚠️</span>
                      <span className="text-gray-700">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Rapor Bilgileri</h4>
                <p>Bu rapor SeraGPT AI iklim analiz sistemi tarafından oluşturulmuştur.</p>
                <p>Son 10 yıllık meteoroloji verileri kullanılmıştır.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sorumluluk Reddi</h4>
                <p>İklim verileri istatistiksel tahminlere dayanır. Gerçek koşullar farklılık gösterebilir.</p>
                <p>Kritik kararlar için güncel meteoroloji verilerini kontrol edin.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
