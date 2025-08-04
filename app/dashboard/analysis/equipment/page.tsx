'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function EquipmentAnalysisPage() {
  const [formData, setFormData] = useState({
    greenhouseSize: '',
    structureType: '',
    energyType: '',
    climateControl: '',
    irrigationSystem: '',
    automationLevel: ''
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

  const structureTypes = [
    'Cam Sera', 'Polikarbon Sera', 'Naylon Sera', 'Plastik Tünel', 'Açık Alan'
  ];

  const energyTypes = [
    'Doğalgaz', 'Elektrik', 'Güneş Enerjisi', 'Biyomass', 'Jeotermal', 'Hibrit Sistem'
  ];

  const climateControlOptions = [
    'Temel İklim Kontrolü', 'Orta Seviye Otomasyon', 'Tam Otomatik Sistem', 'Akıllı İklim Kontrolü'
  ];

  const irrigationOptions = [
    'Damla Sulama', 'Yağmurlama Sistemi', 'Mikrojet Sulama', 'Hidroponik Sistem', 'Geleneksel Sulama'
  ];

  const automationLevels = [
    'Manuel İşletme', 'Yarı Otomatik', 'Tam Otomatik', 'Akıllı Sistem (IoT)'
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
              Mühendis Onaylı Ekipman Listesi
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bölgenize uygun sera yapısı ve ekipmanları için mühendis onaylı 
              anahtar teslim öneriler alın.
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
                    <h2 className="text-xl font-semibold text-gray-900">Sera Özellikleri</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Ekipman önerileri için sera özelliklerini belirtin
                    </p>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Greenhouse Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sera Alanı (m²)
                      </label>
                      <input
                        type="number"
                        value={formData.greenhouseSize}
                        onChange={(e) => handleInputChange('greenhouseSize', e.target.value)}
                        placeholder="Örn: 1000"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      />
                    </div>

                    {/* Structure Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yapı Tipi
                      </label>
                      <select
                        value={formData.structureType}
                        onChange={(e) => handleInputChange('structureType', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Yapı tipi seçiniz</option>
                        {structureTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Energy Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enerji Kaynağı
                      </label>
                      <select
                        value={formData.energyType}
                        onChange={(e) => handleInputChange('energyType', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Enerji kaynağı seçiniz</option>
                        {energyTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Climate Control */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        İklim Kontrol Seviyesi
                      </label>
                      <select
                        value={formData.climateControl}
                        onChange={(e) => handleInputChange('climateControl', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">İklim kontrol seviyesi seçiniz</option>
                        {climateControlOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Irrigation System */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sulama Sistemi
                      </label>
                      <select
                        value={formData.irrigationSystem}
                        onChange={(e) => handleInputChange('irrigationSystem', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Sulama sistemi seçiniz</option>
                        {irrigationOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Automation Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Otomasyon Seviyesi
                      </label>
                      <select
                        value={formData.automationLevel}
                        onChange={(e) => handleInputChange('automationLevel', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Otomasyon seviyesi seçiniz</option>
                        {automationLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>

                    {/* Analysis Button */}
                    <div className="pt-4">
                      <button
                        onClick={handleStartAnalysis}
                        disabled={isAnalyzing || !formData.greenhouseSize || !formData.structureType}
                        className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Ekipman Listesi Hazırlanıyor...</span>
                          </>
                        ) : (
                          <span>Ekipman Analizini Başlat (1 jeton)</span>
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
                        <li>• Detaylı ekipman listesi</li>
                        <li>• Maliyet karşılaştırması</li>
                        <li>• Kurulum önerileri</li>
                        <li>• Genişletme seçenekleri</li>
                        <li>• Bakım planlaması</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🔗 Veri Kaynakları:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Internal equipment DB</li>
                        <li>• Mühendis doğrulama</li>
                        <li>• Tedarikçi kataloğu</li>
                        <li>• Fiyat karşılaştırma</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📄 PDF Raporu:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Komple ekipman listesi</li>
                        <li>• Maliyet tablosu</li>
                        <li>• Kurulum kılavuzu</li>
                        <li>• Tedarikçi bilgileri</li>
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
                  <h2 className="text-xl font-semibold text-gray-900">Ekipman Listesi Sonuçları</h2>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    PDF İndir
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">23</div>
                    <div className="text-sm text-gray-600">Önerilen Ekipman</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-1">₺285K</div>
                    <div className="text-sm text-gray-600">Toplam Maliyet</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">8 Hafta</div>
                    <div className="text-sm text-gray-600">Kurulum Süresi</div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Ekipman analiziniz tamamlandı! Detaylı listeyi PDF olarak indirebilirsiniz.
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
