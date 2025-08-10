'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { marketService, MarketPrice, MarketAnalysis, CropCalendar } from '@/lib/services/market-service';
import { pdfService } from '@/lib/services/pdf-service';

export default function MarketAnalysisPage() {
  const [selectedProduct, setSelectedProduct] = useState('domates');
  const [selectedRegion, setSelectedRegion] = useState('Antalya');
  const [loading, setLoading] = useState(false);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[] | null>(null);
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis | null>(null);
  const [cropCalendar, setCropCalendar] = useState<CropCalendar | null>(null);
  const [error, setError] = useState<string>('');

  const products = [
    { value: 'domates', label: 'Domates', icon: '🍅' },
    { value: 'salatalik', label: 'Salatalık', icon: '🥒' },
    { value: 'biber', label: 'Biber', icon: '🌶️' },
    { value: 'patlican', label: 'Patlıcan', icon: '🍆' },
    { value: 'marul', label: 'Marul', icon: '🥬' },
    { value: 'rukola', label: 'Roka', icon: '🌿' },
    { value: 'çilek', label: 'Çilek', icon: '🍓' }
  ];

  const regions = [
    'Antalya', 'Mersin', 'İzmir', 'Muğla', 'Adana', 'Bursa', 'Konya'
  ];

  const handleAnalyzeMarket = async () => {
    setLoading(true);
    setError('');

    try {
      // Get current market prices
      const pricesResponse = await marketService.getCurrentPrices(selectedRegion);
      if (pricesResponse.success && pricesResponse.data) {
        setMarketPrices(pricesResponse.data);
      }

      // Get detailed market analysis for selected product
      const analysisResponse = await marketService.getMarketAnalysis(selectedProduct);
      if (analysisResponse.success && analysisResponse.data) {
        setMarketAnalysis(analysisResponse.data);
      }

      // Get crop calendar
      const calendarResponse = await marketService.getCropCalendar(selectedProduct, selectedRegion);
      if (calendarResponse.success && calendarResponse.data) {
        setCropCalendar(calendarResponse.data);
      }

      if (!pricesResponse.success || !analysisResponse.success || !calendarResponse.success) {
        setError('Bazı veriler alınamadı, ancak mevcut veriler gösteriliyor');
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    if (!marketAnalysis) return;

    const reportData = {
      type: 'market' as const,
      title: 'Pazar Analiz Raporu',
      generatedAt: new Date().toISOString(),
      projectName: `${selectedProduct} Pazar Analizi`,
      location: {
        city: selectedRegion,
        region: 'Türkiye',
        coordinates: { lat: 0, lon: 0 }
      },
      user: {
        name: 'Kullanıcı',
        email: 'user@example.com'
      },
      data: marketAnalysis
    };

    const pdfResponse = await pdfService.generateMarketReport(reportData, marketAnalysis);
    
    if (pdfResponse.success && pdfResponse.data) {
      alert(`PDF raporu oluşturuldu: ${pdfResponse.data.filename}`);
    }
  };

  const getMarketConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMarketConditionText = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'Mükemmel';
      case 'good': return 'İyi';
      case 'fair': return 'Orta';
      case 'poor': return 'Zayıf';
      default: return condition;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'planting': return '🌱';
      case 'growing': return '🌿';
      case 'harvesting': return '🌾';
      case 'dormant': return '🌰';
      default: return '⭕';
    }
  };

  return (
    <DashboardLayout
      title="Pazar Analizi"
      subtitle="Güncel pazar fiyatları ve trend analizleri ile karlılık projeksiyonları"
    >
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Pazar Analizi</h1>
            <p className="text-gray-600 mt-1">Güncel pazar fiyatları ve trend analizleri</p>
          </motion.div>

          {/* Selection Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Analiz Parametreleri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ürün Tipi
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  {products.map((product) => (
                    <option key={product.value} value={product.value}>
                      {product.icon} {product.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bölge
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleAnalyzeMarket}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? 'Analiz Ediliyor...' : 'Pazar Analizini Başlat'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-600">{error}</p>
              </div>
            )}
          </motion.div>

          {/* Market Prices Overview */}
          {marketPrices && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Güncel Pazar Fiyatları</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketPrices.slice(0, 6).map((price, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 capitalize">{price.product}</h3>
                      <span className="text-2xl">{getTrendIcon(price.trend)}</span>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          ₺{price.currentPrice.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">/{price.unit}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          price.change > 0 ? 'text-green-600' : 
                          price.change < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {price.change > 0 ? '+' : ''}{price.change.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500">önceki döneme göre</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2">{price.source}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Detailed Market Analysis */}
          {marketAnalysis && (
            <>
              {/* Market Condition Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {products.find(p => p.value === selectedProduct)?.icon} {' '}
                    {products.find(p => p.value === selectedProduct)?.label} Pazar Durumu
                  </h2>
                  <button
                    onClick={handleGeneratePDF}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    PDF İndir
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getMarketConditionColor(marketAnalysis.analysis.currentMarketCondition)}`}>
                      {getMarketConditionText(marketAnalysis.analysis.currentMarketCondition)}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Pazar Koşulu</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{marketAnalysis.analysis.priceStability}/100</div>
                    <p className="text-sm text-gray-600">Fiyat İstikrarı</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 capitalize">{marketAnalysis.analysis.demandLevel}</div>
                    <p className="text-sm text-gray-600">Talep Seviyesi</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 capitalize">{marketAnalysis.analysis.supplyLevel}</div>
                    <p className="text-sm text-gray-600">Arz Seviyesi</p>
                  </div>
                </div>
              </motion.div>

              {/* Price Predictions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Fiyat Tahminleri</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Gelecek Ay Tahmini</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-green-600">
                        ₺{marketAnalysis.predictions.nextMonth.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-600">
                        %{marketAnalysis.predictions.nextMonth.confidence} güven
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Etkileyen Faktörler:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {marketAnalysis.predictions.nextMonth.factors.map((factor, i) => (
                          <li key={i}>• {factor}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Gelecek Çeyrek Tahmini</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-blue-600">
                        ₺{marketAnalysis.predictions.nextQuarter.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-600">
                        %{marketAnalysis.predictions.nextQuarter.confidence} güven
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Etkileyen Faktörler:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {marketAnalysis.predictions.nextQuarter.factors.map((factor, i) => (
                          <li key={i}>• {factor}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Öneriler</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-700">En İyi Satış Dönemi:</p>
                      <p className="text-gray-600">{marketAnalysis.recommendations.bestSellingPeriod}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Fiyatlama Stratejisi:</p>
                      <p className="text-gray-600">{marketAnalysis.recommendations.pricingStrategy}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk ve Fırsatlar</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-red-700 mb-2">Risk Faktörleri:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {marketAnalysis.recommendations.riskFactors.map((risk, i) => (
                          <li key={i}>• {risk}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-green-700 mb-2">Fırsatlar:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {marketAnalysis.recommendations.opportunities.map((opp, i) => (
                          <li key={i}>• {opp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {/* Crop Calendar */}
          {cropCalendar && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Üretim Takvimi</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                {cropCalendar.schedule.map((month, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">{getActivityIcon(month.activity)}</div>
                    <p className="text-xs font-medium text-gray-700 mb-1">
                      {['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'][month.month - 1]}
                    </p>
                    <p className="text-xs text-gray-600 capitalize">{month.activity}</p>
                    <div className="mt-2 space-y-1">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-green-500 h-1 rounded-full"
                          style={{ width: `${month.expectedYield}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">Verim: {month.expectedYield}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Optimal Harvest Windows */}
              {cropCalendar.optimalHarvestWindows.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimal Hasat Dönemleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cropCalendar.optimalHarvestWindows.map((window, index) => (
                      <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
                        <p className="font-medium text-green-800">
                          {['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][window.startMonth - 1]} - {' '}
                          {['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][window.endMonth - 1]}
                        </p>
                        <p className="text-sm text-green-700">{window.reason}</p>
                        <p className="text-sm font-medium text-green-800 mt-1">
                          Beklenen Fiyat: ₺{window.expectedPrice.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* No Data State */}
          {!loading && !marketAnalysis && !error && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center"
            >
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pazar Analizi Başlatın</h3>
              <p className="text-gray-600">
                Ürün ve bölge seçin, "Pazar Analizini Başlat" butonuna tıklayarak 
                detaylı pazar raporunu görüntüleyin.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
