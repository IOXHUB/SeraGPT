'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function ROIAnalysisPage() {
  const [formData, setFormData] = useState({
    location: '',
    province: '',
    district: '',
    plantType: '',
    productionArea: '',
    annualBudget: '',
    greenhouseType: '',
    energySource: '',
    marketTarget: ''
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

  const provinces = [
    'Antalya', 'Mersin', 'İzmir', 'Muğla', 'Adana', 'Bursa', 
    'Konya', 'Ankara', 'İstanbul', 'Diğer'
  ];

  const greenhouseTypes = [
    'Cam Sera', 'Polikarbon Sera', 'Naylon Sera (Çiftik)', 'Plastik Tünel', 'Açık Alan'
  ];

  const energySources = [
    'Doğalgaz', 'Elektrik', 'Güneş Enerjisi', 'Biyomass', 'Jeotermal', 'Hibrit Sistem'
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
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="text-4xl">🧮</span>
              <h1 className="text-3xl font-bold text-gray-900">
                Yatırım Geri Dönüş (ROI) Simülasyonu
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              20 yıllık mühendislik deneyimi ve gerçek zamanlı pazar verileri ile 
              yatırımınızın geri dönüş süresini hesaplayın.
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
                    <h2 className="text-xl font-semibold text-gray-900">Proje Bilgileri</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Analiz için gerekli bilgileri doldurun
                    </p>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Location */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          İl
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          İlçe
                        </label>
                        <input
                          type="text"
                          value={formData.district}
                          onChange={(e) => handleInputChange('district', e.target.value)}
                          placeholder="İlçe adını yazınız"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Plant Type and Area */}
                    <div className="grid md:grid-cols-2 gap-4">
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sera Alanı (m²)
                        </label>
                        <input
                          type="number"
                          value={formData.productionArea}
                          onChange={(e) => handleInputChange('productionArea', e.target.value)}
                          placeholder="Örn: 1000"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Greenhouse Type and Energy */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sera Tipi
                        </label>
                        <select
                          value={formData.greenhouseType}
                          onChange={(e) => handleInputChange('greenhouseType', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                          <option value="">Sera tipi seçiniz</option>
                          {greenhouseTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enerji Kaynağı
                        </label>
                        <select
                          value={formData.energySource}
                          onChange={(e) => handleInputChange('energySource', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                          <option value="">Enerji kaynağı seçiniz</option>
                          {energySources.map(source => (
                            <option key={source} value={source}>{source}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yatırım Bütçesi (TL)
                      </label>
                      <input
                        type="number"
                        value={formData.annualBudget}
                        onChange={(e) => handleInputChange('annualBudget', e.target.value)}
                        placeholder="Örn: 500000"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      />
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
                        <option value="local">Yerel Pazar</option>
                        <option value="regional">Bölgesel Pazar</option>
                        <option value="national">Ulusal Pazar</option>
                        <option value="export">İhracat</option>
                      </select>
                    </div>

                    {/* Analysis Button */}
                    <div className="pt-4">
                      <button
                        onClick={handleStartAnalysis}
                        disabled={isAnalyzing || !formData.province || !formData.plantType || !formData.productionArea}
                        className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Analiz Ediliyor...</span>
                          </>
                        ) : (
                          <>
                            <span>🪙</span>
                            <span>ROI Analizini Başlat (1 jeton)</span>
                          </>
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
                        <li>• Yatırımın geri dönüş süresi</li>
                        <li>• Kar marjı hesaplaması</li>
                        <li>• Yıllık getiri tahmini</li>
                        <li>• İşletme maliyetleri</li>
                        <li>• 3 yıllık projeksiyon</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🔗 Veri Kaynakları:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• OpenWeather API</li>
                        <li>• FAO & TUİK verileri</li>
                        <li>• Seraburada market API</li>
                        <li>• Hal fiyatları (TMO)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📄 PDF Raporu:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Detaylı ROI tablosu</li>
                        <li>• Maliyet analizi</li>
                        <li>• Gelir projeksiyonları</li>
                        <li>• Risk değerlendirmesi</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gray-600 text-white rounded-2xl p-6 mt-6"
                >
                  <h4 className="font-semibold mb-2">💡 İpucu</h4>
                  <p className="text-sm text-gray-200">
                    En doğru sonuçlar için sera alanınızı ve yatırım bütçenizi 
                    gerçek verilerle doldurun. Analiz yaklaşık 2-3 dakika sürer.
                  </p>
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
                  <h2 className="text-xl font-semibold text-gray-900">ROI Analiz Sonuçları</h2>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    PDF İndir
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-1">2.8 Yıl</div>
                    <div className="text-sm text-gray-600">Geri Dönüş Süresi</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">%34.2</div>
                    <div className="text-sm text-gray-600">Yıllık ROI</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">₺285K</div>
                    <div className="text-sm text-gray-600">3. Yıl Net Kar</div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Analiziniz tamamlandı! Detaylı raporu PDF olarak indirebilirsiniz.
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
