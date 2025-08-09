'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MockAnalysisService } from '@/lib/services/mock-analysis-service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const dynamic = 'force-dynamic';

interface MarketData {
  product: string;
  region: string;
  currentPrice: number;
  priceHistory: {
    month: string;
    price: number;
    volume: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  marketCondition: {
    overall: 'excellent' | 'good' | 'fair' | 'poor';
    priceStability: number;
    demandLevel: 'high' | 'medium' | 'low';
    supplyLevel: 'high' | 'medium' | 'low';
    competitionLevel: number;
  };
  priceProjections: {
    nextMonth: {
      price: number;
      confidence: number;
      factors: string[];
    };
    nextQuarter: {
      price: number;
      confidence: number;
      factors: string[];
    };
    yearEnd: {
      price: number;
      confidence: number;
      factors: string[];
    };
  };
  seasonalPattern: {
    season: string;
    avgPrice: number;
    demand: string;
    supply: string;
    profitability: number;
  }[];
  competitors: {
    name: string;
    marketShare: number;
    pricePosition: 'premium' | 'mid' | 'budget';
    strengths: string[];
    weaknesses: string[];
  }[];
  recommendations: {
    pricing: string;
    timing: string;
    distribution: string;
    marketing: string;
  };
  riskFactors: string[];
  opportunities: string[];
}

export default function MarketReportPage() {
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
      if (analysisData && analysisData.type === 'market') {
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
      
      pdf.save(`Pazar-Analizi-${analysis.id}.pdf`);
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

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'fair': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'Mükemmel';
      case 'good': return 'İyi';
      case 'fair': return 'Orta';
      case 'poor': return 'Zayıf';
      default: return condition;
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'high': return 'Yüksek';
      case 'medium': return 'Orta';
      case 'low': return 'Düşük';
      default: return level;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Pazar Analizi Raporu" subtitle="Rapor yükleniyor...">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout title="Pazar Analizi Raporu" subtitle="Rapor bulunamadı">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Rapor bulunamadı</h3>
          <p className="text-gray-600">Bu rapor mevcut değil veya silinmiş olabilir.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Mock market data based on analysis
  const marketData: MarketData = {
    product: "Domates",
    region: "Antalya",
    currentPrice: 8.50,
    priceHistory: [
      { month: 'Ocak', price: 12.00, volume: 15000, trend: 'down' },
      { month: 'Şubat', price: 10.50, volume: 18000, trend: 'down' },
      { month: 'Mart', price: 9.20, volume: 22000, trend: 'down' },
      { month: 'Nisan', price: 8.80, volume: 25000, trend: 'stable' },
      { month: 'Mayıs', price: 8.50, volume: 28000, trend: 'stable' },
      { month: 'Haziran', price: 7.20, volume: 32000, trend: 'down' },
      { month: 'Temmuz', price: 6.80, volume: 35000, trend: 'down' },
      { month: 'Ağustos', price: 7.50, volume: 33000, trend: 'up' },
      { month: 'Eylül', price: 8.90, volume: 29000, trend: 'up' },
      { month: 'Ekim', price: 10.20, volume: 26000, trend: 'up' },
      { month: 'Kasım', price: 11.80, volume: 22000, trend: 'up' },
      { month: 'Aralık', price: 13.50, volume: 18000, trend: 'up' }
    ],
    marketCondition: {
      overall: 'good',
      priceStability: 72,
      demandLevel: 'high',
      supplyLevel: 'medium',
      competitionLevel: 68
    },
    priceProjections: {
      nextMonth: {
        price: 9.20,
        confidence: 78,
        factors: [
          "Mevsimsel talep artışı",
          "Güney Anadolu üretim azalması",
          "İhracat talebindeki artış"
        ]
      },
      nextQuarter: {
        price: 11.50,
        confidence: 65,
        factors: [
          "Kış dönemi fiyat artışları",
          "Sera üretim maliyetleri",
          "Alternatif ürün rekabeti",
          "Döviz kuru etkisi"
        ]
      },
      yearEnd: {
        price: 14.20,
        confidence: 55,
        factors: [
          "Yıl sonu talep zirvesi",
          "Resmi tatil yoğunluğu",
          "Stok döngüsü",
          "Makroekonomik faktörler"
        ]
      }
    },
    seasonalPattern: [
      { season: 'İlkbahar', avgPrice: 9.5, demand: 'Orta', supply: 'Yüksek', profitability: 65 },
      { season: 'Yaz', avgPrice: 7.2, demand: 'Yüksek', supply: 'Çok Yüksek', profitability: 45 },
      { season: 'Sonbahar', avgPrice: 10.8, demand: 'Yüksek', supply: 'Orta', profitability: 85 },
      { season: 'Kış', avgPrice: 13.5, demand: 'Çok Yüksek', supply: 'Düşük', profitability: 95 }
    ],
    competitors: [
      {
        name: "Akdeniz Seracılık A.Ş.",
        marketShare: 25,
        pricePosition: 'premium',
        strengths: ["Kaliteli üretim", "Güçlü marka", "İhracat kapasitesi"],
        weaknesses: ["Yüksek fiyat", "Sınırlı dağıtım"]
      },
      {
        name: "Güney Sera Kooperatifi",
        marketShare: 18,
        pricePosition: 'mid',
        strengths: ["Uygun fiyat", "Geniş üretim", "Kooperatif avantajı"],
        weaknesses: ["Kalite dalgalanması", "Pazarlama zayıflığı"]
      },
      {
        name: "Sera Teknolojileri Ltd.",
        marketShare: 15,
        pricePosition: 'premium',
        strengths: ["Teknolojik üretim", "Organik sertifika", "Sürdürülebilirlik"],
        weaknesses: ["Küçük ölçek", "Yüksek maliyet"]
      },
      {
        name: "Küçük Üreticiler",
        marketShare: 42,
        pricePosition: 'budget',
        strengths: ["Düşük fiyat", "Yerel pazarlama", "Esneklik"],
        weaknesses: ["Kalite standardı", "Ölçek eksikliği", "Teknoloji yetersizliği"]
      }
    ],
    recommendations: {
      pricing: "Pazar ortalamasının %5-10 üzerinde premium fiyatlama stratejisi",
      timing: "Ekim-Şubat döneminde maksimum satış, yaz aylarında maliyet optimizasyonu",
      distribution: "Doğrudan perakende zincirler ve ihracat kanallarına odaklanma",
      marketing: "Kalite ve teknolojik üretim vurgusu, sürdürülebilirlik mesajları"
    },
    riskFactors: [
      "İklim değişikliği ve aşırı hava olayları",
      "Döviz kuru dalgalanmaları",
      "Enerji maliyeti artışları",
      "Avrupa pazarında rekabet yoğunlaşması",
      "Yeni teknolojilerin yaygınlaşması"
    ],
    opportunities: [
      "Organik ve sürdürülebilir üretim talebi",
      "Teknoloji destekli kalite artışı",
      "Yeni ihracat pazarları",
      "E-ticaret kanalları",
      "Değer katma süreçleri (işleme, paketleme)"
    ]
  };

  return (
    <DashboardLayout title="Pazar Analizi Raporu" subtitle={analysis.title}>
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
                <h1 className="text-3xl font-bold text-gray-900">Pazar Analizi Raporu</h1>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pazar Özeti</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">₺{marketData.currentPrice}</div>
                <div className="text-sm text-gray-600">Güncel Fiyat (kg)</div>
              </div>
              <div className={`rounded-lg p-4 text-center ${getConditionColor(marketData.marketCondition.overall)}`}>
                <div className="text-2xl font-bold">{getConditionText(marketData.marketCondition.overall)}</div>
                <div className="text-sm">Pazar Koşulu</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{marketData.marketCondition.priceStability}%</div>
                <div className="text-sm text-gray-600">Fiyat İstikrarı</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{getLevelText(marketData.marketCondition.demandLevel)}</div>
                <div className="text-sm text-gray-600">Talep Seviyesi</div>
              </div>
            </div>
          </div>

          {/* Current Market Status */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Güncel Pazar Durumu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Ürün</span>
                  <span className="font-medium">{marketData.product}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Bölge</span>
                  <span className="font-medium">{marketData.region}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Talep Seviyesi</span>
                  <span className="font-medium">{getLevelText(marketData.marketCondition.demandLevel)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Arz Seviyesi</span>
                  <span className="font-medium">{getLevelText(marketData.marketCondition.supplyLevel)}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Rekabet Seviyesi</span>
                  <span className="font-medium">%{marketData.marketCondition.competitionLevel}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Fiyat İstikrarı</span>
                  <span className="font-medium">%{marketData.marketCondition.priceStability}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Pazar Koşulu</span>
                  <span className="font-medium">{getConditionText(marketData.marketCondition.overall)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price History */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fiyat Geçmişi (Son 12 Ay)</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left">Ay</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Fiyat (₺/kg)</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Hacim (ton)</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.priceHistory.map((month, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-3 py-2 font-medium">{month.month}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                        ₺{month.price.toFixed(2)}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        {month.volume.toLocaleString('tr-TR')}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-xl">
                        {getTrendIcon(month.trend)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Price Projections */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fiyat Tahminleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Gelecek Ay</h3>
                <div className="text-2xl font-bold text-green-600 mb-2">₺{marketData.priceProjections.nextMonth.price}</div>
                <div className="text-sm text-gray-600 mb-3">%{marketData.priceProjections.nextMonth.confidence} güven</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {marketData.priceProjections.nextMonth.factors.map((factor, i) => (
                    <li key={i}>• {factor}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Gelecek Çeyrek</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">₺{marketData.priceProjections.nextQuarter.price}</div>
                <div className="text-sm text-gray-600 mb-3">%{marketData.priceProjections.nextQuarter.confidence} güven</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {marketData.priceProjections.nextQuarter.factors.map((factor, i) => (
                    <li key={i}>• {factor}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Yıl Sonu</h3>
                <div className="text-2xl font-bold text-purple-600 mb-2">₺{marketData.priceProjections.yearEnd.price}</div>
                <div className="text-sm text-gray-600 mb-3">%{marketData.priceProjections.yearEnd.confidence} güven</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {marketData.priceProjections.yearEnd.factors.map((factor, i) => (
                    <li key={i}>• {factor}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Seasonal Analysis */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mevsimsel Analiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {marketData.seasonalPattern.map((season, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{season.season}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ort. Fiyat:</span>
                      <span className="font-medium">₺{season.avgPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Talep:</span>
                      <span className="font-medium">{season.demand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arz:</span>
                      <span className="font-medium">{season.supply}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Karlılık:</span>
                      <span className={`font-medium ${season.profitability >= 80 ? 'text-green-600' : season.profitability >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        %{season.profitability}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Analysis */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rekabet Analizi</h2>
            <div className="space-y-4">
              {marketData.competitors.map((competitor, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">%{competitor.marketShare}</div>
                      <div className="text-xs text-gray-600">Pazar Payı</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700 mb-1">Güçlü Yönler:</p>
                      <ul className="text-gray-600 space-y-1">
                        {competitor.strengths.map((strength, i) => (
                          <li key={i}>• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">Zayıf Yönler:</p>
                      <ul className="text-gray-600 space-y-1">
                        {competitor.weaknesses.map((weakness, i) => (
                          <li key={i}>• {weakness}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stratejik Öneriler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Fiyatlama Stratejisi</h3>
                  <p className="text-blue-800 text-sm">{marketData.recommendations.pricing}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Zamanlama</h3>
                  <p className="text-green-800 text-sm">{marketData.recommendations.timing}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">Dağıtım</h3>
                  <p className="text-purple-800 text-sm">{marketData.recommendations.distribution}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-900 mb-2">Pazarlama</h3>
                  <p className="text-orange-800 text-sm">{marketData.recommendations.marketing}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk and Opportunities */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Risk ve Fırsatlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-3">Risk Faktörleri</h3>
                <ul className="space-y-2">
                  {marketData.riskFactors.map((risk, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">⚠️</span>
                      <span className="text-gray-700">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">Fırsatlar</h3>
                <ul className="space-y-2">
                  {marketData.opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">💡</span>
                      <span className="text-gray-700">{opportunity}</span>
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
                <p>Bu rapor SeraGPT AI pazar analiz sistemi tarafından oluşturulmuştur.</p>
                <p>Güncel pazar verileri ve istatistiksel modeller kullanılmıştır.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sorumluluk Reddi</h4>
                <p>Pazar verileri geçmiş trendlere dayanır. Gelecek performans garanti edilmez.</p>
                <p>Yatırım ve iş kararları için güncel verileri kontrol edin.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
