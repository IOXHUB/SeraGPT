'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function LayoutAnalysisPage() {
  const [formData, setFormData] = useState({
    landWidth: '',
    landLength: '',
    waterSource: '',
    electricityAccess: '',
    roadAccess: '',
    soilType: '',
    terrainSlope: ''
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

  const waterSources = [
    'Artezyen Kuyusu', 'Şebeke Suyu', 'Doğal Kaynak', 'Kapalı Sistem', 'Yağmur Suyu'
  ];

  const electricityOptions = [
    'Mevcut (Trafo Yakın)', 'Mevcut (Uzak)', 'Yeni Çekim Gerekli', 'Güneş Enerjisi', 'Jeneratör'
  ];

  const roadAccessOptions = [
    'Asfalt Yol', 'Stabilize Yol', 'Toprak Yol', 'Yol Yapımı Gerekli'
  ];

  const soilTypes = [
    'Killi Toprak', 'Kumlu Toprak', 'Humuslu Toprak', 'Kireçli Toprak', 'Karışık'
  ];

  const slopeOptions = [
    'Düz Arazi (0-2%)', 'Hafif Eğimli (2-5%)', 'Orta Eğimli (5-10%)', 'Eğimli (10%+)'
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
              Yerleşim ve Teknik Plan Görselleştirmesi
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              CAD AI Tools ve HerbaTools kullanarak 2D/3D sera yerleşim planı, 
              elektrik ve sulama hatları tasarımı oluşturun.
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
                    <h2 className="text-xl font-semibold text-gray-900">Arazi Özellikleri</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Teknik plan için arazi bilgilerini doldurun
                    </p>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Land Dimensions */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Arazi Genişliği (m)
                        </label>
                        <input
                          type="number"
                          value={formData.landWidth}
                          onChange={(e) => handleInputChange('landWidth', e.target.value)}
                          placeholder="Örn: 50"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Arazi Uzunluğu (m)
                        </label>
                        <input
                          type="number"
                          value={formData.landLength}
                          onChange={(e) => handleInputChange('landLength', e.target.value)}
                          placeholder="Örn: 80"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Water Source */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Su Kaynağı
                      </label>
                      <select
                        value={formData.waterSource}
                        onChange={(e) => handleInputChange('waterSource', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Su kaynağı seçiniz</option>
                        {waterSources.map(source => (
                          <option key={source} value={source}>{source}</option>
                        ))}
                      </select>
                    </div>

                    {/* Electricity Access */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Elektrik Erişimi
                      </label>
                      <select
                        value={formData.electricityAccess}
                        onChange={(e) => handleInputChange('electricityAccess', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Elektrik durumu seçiniz</option>
                        {electricityOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Road Access */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yol Erişimi
                      </label>
                      <select
                        value={formData.roadAccess}
                        onChange={(e) => handleInputChange('roadAccess', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Yol durumu seçiniz</option>
                        {roadAccessOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Soil Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Toprak Tipi
                      </label>
                      <select
                        value={formData.soilType}
                        onChange={(e) => handleInputChange('soilType', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Toprak tipi seçiniz</option>
                        {soilTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Terrain Slope */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Arazi Eğimi
                      </label>
                      <select
                        value={formData.terrainSlope}
                        onChange={(e) => handleInputChange('terrainSlope', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Eğim durumu seçiniz</option>
                        {slopeOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Analysis Button */}
                    <div className="pt-4">
                      <button
                        onClick={handleStartAnalysis}
                        disabled={isAnalyzing || !formData.landWidth || !formData.landLength}
                        className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Teknik Plan Hazırlanıyor...</span>
                          </>
                        ) : (
                          <span>Yerleşim Analizini Başlat (1 jeton)</span>
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
                        <li>• 2D yerleşim planı</li>
                        <li>• Elektrik hat şeması</li>
                        <li>• Sulama sistemi çizimi</li>
                        <li>• Teknik kabin konumu</li>
                        <li>• 3D görselleştirme</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🔗 Veri Kaynakları:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Planner 2D AI Tools</li>
                        <li>• CAD algoritmaları</li>
                        <li>• HerbaTools kütüphanesi</li>
                        <li>• Teknik standartlar</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📄 PDF Raporu:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Teknik çizim planları</li>
                        <li>• Montaj kılavuzu</li>
                        <li>• Malzeme listesi</li>
                        <li>• İzometrik görünümler</li>
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
                  <h2 className="text-xl font-semibold text-gray-900">Yerleşim Planı Sonuçları</h2>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    PDF İndir
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-1">3.200m²</div>
                    <div className="text-sm text-gray-600">Kullanılabilir Alan</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">92%</div>
                    <div className="text-sm text-gray-600">Alan Verimliliği</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">5</div>
                    <div className="text-sm text-gray-600">Teknik Çizim</div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Yerleşim planınız tamamlandı! 2D/3D çizimleri PDF olarak indirebilirsiniz.
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
