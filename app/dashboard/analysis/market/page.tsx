'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { marketService, MarketPrice, MarketAnalysis, CropCalendar } from '@/lib/services/market-service';
import { pdfService } from '@/lib/services/pdf-service';

export default function MarketAnalysisPage() {
  const [formData, setFormData] = useState({
    plantType: '',
    seasonPlan: '',
    marketTarget: '',
    province: '',
    productionAmount: ''
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const plantTypes = [
    'Domates', 'Salatalık', 'Biber', 'Patlıcan', 'Marul', 'Çilek', 
    'Diğer Sebzeler', 'Çiçek (Gül)', 'Çiçek (Karanfil)', 'Fide Üretimi'
  ];

  const seasonPlans = [
    'Yaz Sezonu', 'Kış Sezonu', 'Yıl Boyu Üretim', 'İlkbahar-Sonbahar'
  ];

  const marketTargets = [
    'Yerel Pazar', 'Bölgesel Pazar', 'Ulusal Pazar', 'İhracat', 'Karma Pazarlama'
  ];

  const provinces = [
    'Antalya', 'Mersin', 'İzmir', 'Muğla', 'Adana', 'Bursa', 
    'Konya', 'Ankara', 'İstanbul', 'Diğer'
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Pazar ve Tarım Verisi Entegrasyonu
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              TUİK, FAO ve Hal fiyatları verilerini kullanarak pazar analizi yapın, 
              verim ortalamaları ve hasat zamanlaması önerisi alın.
            </p>
          </motion.div>

          {!showResults ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Analysis Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200"
                >
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Pazar Analiz Bilgileri</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Pazar analizi için ürün ve pazarlama bilgilerinizi girin
                    </p>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Plant Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Üretilecek Ürün
                      </label>
                      <select
                        value={formData.plantType}
                        onChange={(e) => handleInputChange('plantType', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Ürün seçiniz</option>
                        {plantTypes.map(plant => (
                          <option key={plant} value={plant}>{plant}</option>
                        ))}
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Üretim Bölgesi
                      </label>
                      <select
                        value={formData.province}
                        onChange={(e) => handleInputChange('province', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">İl seçiniz</option>
                        {provinces.map(province => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    </div>

                    {/* Production Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tahmini Üretim Miktarı (ton/yıl)
                      </label>
                      <input
                        type="number"
                        value={formData.productionAmount}
                        onChange={(e) => handleInputChange('productionAmount', e.target.value)}
                        placeholder="Örn: 50"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      />
                    </div>

                    {/* Season Plan */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sezon Planı
                      </label>
                      <select
                        value={formData.seasonPlan}
                        onChange={(e) => handleInputChange('seasonPlan', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Sezon planı seçiniz</option>
                        {seasonPlans.map(plan => (
                          <option key={plan} value={plan}>{plan}</option>
                        ))}
                      </select>
                    </div>

                    {/* Market Target */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pazarlama Hedefi
                      </label>
                      <select
                        value={formData.marketTarget}
                        onChange={(e) => handleInputChange('marketTarget', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Pazarlama hedefi seçiniz</option>
                        {marketTargets.map(target => (
                          <option key={target} value={target}>{target}</option>
                        ))}
                      </select>
                    </div>

                    {/* Analysis Button */}
                    <div className="pt-4">
                      <button
                        onClick={handleStartAnalysis}
                        disabled={isAnalyzing || !formData.plantType || !formData.province}
                        className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Pazar Analizi Yapılıyor...</span>
                          </>
                        ) : (
                          <span>Pazar Analizini Başlat (1 jeton)</span>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Info Panel */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200"
                >
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Analiz Detayları</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🎯 Analiz Çıktıları:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Pazar fiyat analizi</li>
                        <li>• Bölgesel verim ortalamaları</li>
                        <li>• Hasat zamanlama önerileri</li>
                        <li>• Fiyat dalgalanmaları</li>
                        <li>• Pazarlama önerileri</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🔗 Veri Kaynakları:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• TUİK tarım istatistikleri</li>
                        <li>• FAO global verileri</li>
                        <li>• Türkiye Hal fiyatları</li>
                        <li>• TMO & Ziraat Odası</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📄 PDF Raporu:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Fiyat analiz tablosu</li>
                        <li>• Hasat çizelgesi</li>
                        <li>• Pazar risk değerlendirmesi</li>
                        <li>• Pazarlama stratejileri</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            /* Results Section */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Pazar Analiz Sonuçları</h2>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    PDF İndir
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-1">₺12.5</div>
                    <div className="text-sm text-gray-600">Ortalama Fiyat (kg)</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">85 ton</div>
                    <div className="text-sm text-gray-600">Bölge Verimi (ha)</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600 mb-1">Mayıs</div>
                    <div className="text-sm text-gray-600">Optimal Hasat</div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Pazar analiziniz tamamlandı! Detaylı raporu PDF olarak indirebilirsiniz.
                  </p>
                  <button
                    onClick={() => setShowResults(false)}
                    className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    ← Yeni Analiz Yap
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
