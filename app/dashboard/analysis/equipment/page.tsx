'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { equipmentService, EquipmentInputs, EquipmentRecommendations } from '@/lib/services/equipment-service';

export const dynamic = 'force-dynamic';

export default function EquipmentAnalysisPage() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<EquipmentInputs>({
    greenhouseSize: 1000,
    location: '',
    plantType: '',
    budgetRange: 'medium',
    automationLevel: 'basic',
    energySource: 'electric',
    specialRequirements: []
  });
  const [results, setResults] = useState<EquipmentRecommendations | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userTokens, setUserTokens] = useState(5);

  const locations = [
    { value: 'antalya', label: 'Antalya' },
    { value: 'mersin', label: 'Mersin' },
    { value: 'izmir', label: 'İzmir' },
    { value: 'adana', label: 'Adana' },
    { value: 'mugla', label: 'Muğla' },
    { value: 'istanbul', label: 'İstanbul' }
  ];

  const plantTypes = [
    { value: 'tomato', label: 'Domates' },
    { value: 'cucumber', label: 'Salatalık' },
    { value: 'pepper', label: 'Biber' },
    { value: 'eggplant', label: 'Patlıcan' },
    { value: 'lettuce', label: 'Marul' },
    { value: 'strawberry', label: 'Çilek' }
  ];

  const runAnalysis = async () => {
    if (userTokens < 1) {
      alert('Yetersiz jeton! Analiz için en az 1 jeton gerekli.');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const analysisResults = await equipmentService.generateRecommendations(inputs);
      
      if (analysisResults.success) {
        setResults(analysisResults.data!);
        setUserTokens(prev => prev - 1);
        setStep(3);
      }
    } catch (error) {
      console.error('Equipment analysis failed:', error);
      alert('Analiz sırasında bir hata oluştu.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sera Özellikleri</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sera Büyüklüğü (m²)
          </label>
          <input
            type="number"
            value={inputs.greenhouseSize}
            onChange={(e) => handleInputChange('greenhouseSize', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="100"
            max="50000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lokasyon
          </label>
          <select
            value={inputs.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Lokasyon seçin</option>
            {locations.map(location => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bitki Türü
          </label>
          <select
            value={inputs.plantType}
            onChange={(e) => handleInputChange('plantType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Bitki türü seçin</option>
            {plantTypes.map(plant => (
              <option key={plant.value} value={plant.value}>
                {plant.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bütçe Aralığı
          </label>
          <select
            value={inputs.budgetRange}
            onChange={(e) => handleInputChange('budgetRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="low">Düşük (100-300K TL)</option>
            <option value="medium">Orta (300-800K TL)</option>
            <option value="high">Yüksek (800K+ TL)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Otomasyon Seviyesi
          </label>
          <select
            value={inputs.automationLevel}
            onChange={(e) => handleInputChange('automationLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="manual">Manuel</option>
            <option value="basic">Temel Otomasyon</option>
            <option value="advanced">Gelişmiş Otomasyon</option>
            <option value="full">Tam Otomasyon</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enerji Kaynağı
          </label>
          <select
            value={inputs.energySource}
            onChange={(e) => handleInputChange('energySource', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="electric">Elektrik</option>
            <option value="gas">Doğalgaz</option>
            <option value="solar">Güneş Enerjisi</option>
            <option value="hybrid">Hibrit</option>
          </select>
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Analiz Özeti</h2>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Seçilen Parametreler</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Sera Büyüklüğü:</span> {inputs.greenhouseSize} m²</p>
              <p><span className="font-medium">Lokasyon:</span> {locations.find(l => l.value === inputs.location)?.label}</p>
              <p><span className="font-medium">Bitki:</span> {plantTypes.find(p => p.value === inputs.plantType)?.label}</p>
              <p><span className="font-medium">Bütçe:</span> {
                inputs.budgetRange === 'low' ? 'Düşük (100-300K)' :
                inputs.budgetRange === 'medium' ? 'Orta (300-800K)' : 'Yüksek (800K+)'
              }</p>
              <p><span className="font-medium">Otomasyon:</span> {
                inputs.automationLevel === 'manual' ? 'Manuel' :
                inputs.automationLevel === 'basic' ? 'Temel' :
                inputs.automationLevel === 'advanced' ? 'Gelişmiş' : 'Tam Otomasyon'
              }</p>
              <p><span className="font-medium">Enerji:</span> {
                inputs.energySource === 'electric' ? 'Elektrik' :
                inputs.energySource === 'gas' ? 'Doğalgaz' :
                inputs.energySource === 'solar' ? 'Güneş' : 'Hibrit'
              }</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">📋 Analiz İçeriği</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Mühendis onaylı ekipman önerileri</li>
              <li>• Maliyet-fayda analizi</li>
              <li>• Kurulum rehberi</li>
              <li>• Bakım ve işletme tavsiyeleri</li>
              <li>• Alternatif ekipman seçenekleri</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Mühendis Onaylı Ekipman Listesi</h2>
        <p className="text-gray-600">Sera projeniz için özel hazırlanmış ekipman önerileri</p>
      </div>

      {results && (
        <>
          {/* Equipment Categories */}
          <div className="space-y-6">
            {results.categories.map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {category.items.length} ürün
                  </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.priority === 'essential' ? 'bg-red-100 text-red-700' :
                          item.priority === 'recommended' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {item.priority === 'essential' ? 'Zorunlu' :
                           item.priority === 'recommended' ? 'Önerilen' : 'Opsiyonel'}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Marka:</span> {item.brand}</p>
                        <p><span className="font-medium">Model:</span> {item.model}</p>
                        <p><span className="font-medium">Fiyat:</span> ₺{item.estimatedCost.toLocaleString('tr-TR')}</p>
                        {item.specifications && (
                          <p><span className="font-medium">Özellik:</span> {item.specifications}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Kategori Toplam Maliyeti:</span>
                    <span className="text-lg font-bold text-gray-900">
                      ₺{category.items.reduce((sum, item) => sum + item.estimatedCost, 0).toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cost Summary */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Minimum Maliyet</h3>
              <p className="text-3xl font-bold text-green-600">₺{results.costSummary.minimum.toLocaleString('tr-TR')}</p>
              <p className="text-sm text-green-700 mt-1">Temel ekipmanlar</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Önerilen Maliyet</h3>
              <p className="text-3xl font-bold text-blue-600">₺{results.costSummary.recommended.toLocaleString('tr-TR')}</p>
              <p className="text-sm text-blue-700 mt-1">Optimum kalite</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Premium Maliyet</h3>
              <p className="text-3xl font-bold text-purple-600">₺{results.costSummary.premium.toLocaleString('tr-TR')}</p>
              <p className="text-sm text-purple-700 mt-1">En iyi teknoloji</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Mühendis Tavsiyeleri</h3>
            <div className="space-y-3">
              {results.engineerRecommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 mt-0.5">💡</span>
                  <p className="text-sm text-blue-800">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={() => alert('PDF rapor oluşturuluyor...')}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
        >
          📄 Ekipman Listesi PDF
        </button>
        <button
          onClick={() => setStep(1)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Yeni Analiz
        </button>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🔧 Ekipman Analizi
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              20 yıllık deneyime sahip mühendislerimizin onayladığı ekipman önerileri alın
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    step >= stepNumber 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber === 3 ? '📋' : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step > stepNumber ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderResults()}
          </div>

          {/* Navigation */}
          {step < 3 && (
            <div className="flex justify-between">
              <button
                onClick={() => step > 1 && setStep(step - 1)}
                disabled={step === 1}
                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
              >
                ← Önceki
              </button>

              {step === 2 ? (
                <button
                  onClick={runAnalysis}
                  disabled={!inputs.location || !inputs.plantType || isAnalyzing || userTokens < 1}
                  className="relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                      </svg>
                      Analiz Ediliyor...
                    </div>
                  ) : (
                    <>🪙 Ekipman Analizini Başlat (1 Jeton)</>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && (!inputs.location || !inputs.plantType)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sonraki →
                </button>
              )}
            </div>
          )}

          {/* Token Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Kullanılabilir Jeton: <span className="font-semibold text-blue-600">{userTokens}</span>
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
