'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { weatherService, ClimateAnalysisInputs, ClimateAnalysisResults } from '@/lib/services/weather-service';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function ClimateAnalysisPage() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<ClimateAnalysisInputs>({
    location: {
      city: '',
      district: '',
      coordinates: { lat: 0, lon: 0 }
    },
    plantType: '',
    greenhouseType: 'plastic',
    plannedStartDate: '',
    analysisPeriod: 12 // months
  });
  const [results, setResults] = useState<ClimateAnalysisResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userTokens, setUserTokens] = useState(5);
  const [currentWeather, setCurrentWeather] = useState<any>(null);

  const cities = [
    { value: 'antalya', label: 'Antalya', lat: 36.8969, lon: 30.7133 },
    { value: 'mersin', label: 'Mersin', lat: 36.8000, lon: 34.6333 },
    { value: 'izmir', label: 'İzmir', lat: 38.4127, lon: 27.1384 },
    { value: 'adana', label: 'Adana', lat: 37.0000, lon: 35.3213 },
    { value: 'mugla', label: 'Muğla', lat: 37.2153, lon: 28.3636 },
    { value: 'istanbul', label: 'İstanbul', lat: 41.0082, lon: 28.9784 },
    { value: 'ankara', label: 'Ankara', lat: 39.9334, lon: 32.8597 },
    { value: 'konya', label: 'Konya', lat: 37.8667, lon: 32.4833 }
  ];

  const plantTypes = [
    { value: 'tomato', label: 'Domates', tempRange: [15, 35], humidityRange: [60, 80] },
    { value: 'cucumber', label: 'Salatalık', tempRange: [18, 32], humidityRange: [70, 85] },
    { value: 'pepper', label: 'Biber', tempRange: [20, 35], humidityRange: [60, 75] },
    { value: 'eggplant', label: 'Patlıcan', tempRange: [22, 35], humidityRange: [65, 80] },
    { value: 'lettuce', label: 'Marul', tempRange: [10, 25], humidityRange: [50, 70] },
    { value: 'strawberry', label: 'Çilek', tempRange: [15, 28], humidityRange: [60, 80] }
  ];

  const greenhouseTypes = [
    { value: 'plastic', label: 'Plastik Sera', insulation: 0.7 },
    { value: 'polycarbonate', label: 'Polikarbon Sera', insulation: 0.85 },
    { value: 'glass', label: 'Cam Sera', insulation: 0.9 }
  ];

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent as keyof ClimateAnalysisInputs],
            [child]: value
          }
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleCityChange = (cityValue: string) => {
    const selectedCity = cities.find(c => c.value === cityValue);
    if (selectedCity) {
      setInputs(prev => ({
        ...prev,
        location: {
          ...prev.location,
          city: cityValue,
          coordinates: {
            lat: selectedCity.lat,
            lon: selectedCity.lon
          }
        }
      }));
      
      // Fetch current weather
      fetchCurrentWeather(selectedCity.lat, selectedCity.lon);
    }
  };

  const fetchCurrentWeather = async (lat: number, lon: number) => {
    try {
      const weather = await weatherService.getCurrentWeather(lat, lon);
      setCurrentWeather(weather.data);
    } catch (error) {
      console.error('Weather fetch failed:', error);
    }
  };

  const runClimateAnalysis = async () => {
    if (userTokens < 1) {
      alert('Yetersiz jeton! Analiz için en az 1 jeton gerekli.');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const analysisResults = await weatherService.analyzeClimate(inputs);
      
      if (analysisResults.success) {
        setResults(analysisResults.data!);
        setUserTokens(prev => prev - 1);
        setStep(3);
      } else {
        alert('İklim analizi sırasında bir hata oluştu: ' + analysisResults.error);
      }
    } catch (error) {
      console.error('Climate analysis failed:', error);
      alert('Analiz sırasında beklenmeyen bir hata oluştu.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generatePDFReport = () => {
    if (!results) return;
    alert('PDF rapor oluşturuluyor... Bu özellik yakında eklenecek.');
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Lokasyon ve Bitki Bilgileri</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Şehir
          </label>
          <select
            value={inputs.location.city}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Şehir seçin</option>
            {cities.map(city => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İlçe (Opsiyonel)
          </label>
          <input
            type="text"
            value={inputs.location.district}
            onChange={(e) => handleInputChange('location.district', e.target.value)}
            placeholder="İlçe adı"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
            Sera Tipi
          </label>
          <select
            value={inputs.greenhouseType}
            onChange={(e) => handleInputChange('greenhouseType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {greenhouseTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Planlanan Başlangıç Tarihi
          </label>
          <input
            type="date"
            value={inputs.plannedStartDate}
            onChange={(e) => handleInputChange('plannedStartDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Analiz Süresi (Ay)
          </label>
          <select
            value={inputs.analysisPeriod}
            onChange={(e) => handleInputChange('analysisPeriod', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={6}>6 Ay</option>
            <option value={12}>12 Ay</option>
            <option value={24}>24 Ay</option>
          </select>
        </div>
      </div>

      {/* Current Weather Display */}
      {currentWeather && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Güncel Hava Durumu</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-blue-700">Sıcaklık</p>
              <p className="font-semibold text-blue-900">{currentWeather.temperature}°C</p>
            </div>
            <div>
              <p className="text-blue-700">Nem</p>
              <p className="font-semibold text-blue-900">{currentWeather.humidity}%</p>
            </div>
            <div>
              <p className="text-blue-700">Rüzgar</p>
              <p className="font-semibold text-blue-900">{currentWeather.windSpeed} km/h</p>
            </div>
            <div>
              <p className="text-blue-700">Durum</p>
              <p className="font-semibold text-blue-900">{currentWeather.condition}</p>
            </div>
          </div>
        </div>
      )}
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
              <p><span className="font-medium">Lokasyon:</span> {cities.find(c => c.value === inputs.location.city)?.label}</p>
              <p><span className="font-medium">Bitki:</span> {plantTypes.find(p => p.value === inputs.plantType)?.label}</p>
              <p><span className="font-medium">Sera Tipi:</span> {greenhouseTypes.find(g => g.value === inputs.greenhouseType)?.label}</p>
              <p><span className="font-medium">Başlangıç:</span> {inputs.plannedStartDate}</p>
              <p><span className="font-medium">Analiz Süresi:</span> {inputs.analysisPeriod} ay</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Bitki Gereksinimleri</h3>
            {inputs.plantType && (
              <div className="space-y-2 text-sm">
                {(() => {
                  const plant = plantTypes.find(p => p.value === inputs.plantType);
                  return plant ? (
                    <>
                      <p><span className="font-medium">Sıcaklık:</span> {plant.tempRange[0]}°C - {plant.tempRange[1]}°C</p>
                      <p><span className="font-medium">Nem:</span> %{plant.humidityRange[0]} - %{plant.humidityRange[1]}</p>
                    </>
                  ) : null;
                })()}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>📊 Analiz İçeriği:</strong> Seçtiğiniz lokasyon için son 5 yıllık iklim verilerini analiz edecek, 
            bitki türünüze uygun sezonal öneriler sunacak ve risk faktörlerini değerlendireceğiz.
          </p>
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">��klim Analizi Sonuçları</h2>
        <p className="text-gray-600">Lokasyonunuzun sera tarımı için uygunluk raporu</p>
      </div>

      {results && (
        <>
          {/* Suitability Score */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 text-center mb-6">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Genel Uygunluk Skoru</h3>
            <div className="text-5xl font-bold text-green-600 mb-2">{results.suitabilityScore}/100</div>
            <p className="text-green-700">
              {results.suitabilityScore >= 80 ? 'Mükemmel' :
               results.suitabilityScore >= 60 ? 'İyi' :
               results.suitabilityScore >= 40 ? 'Orta' : 'Düşük'} uygunluk
            </p>
          </div>

          {/* Risk Matrix */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-lg border ${getRiskColor(results.riskFactors.frost)}`}>
              <h4 className="font-semibold mb-1">❄️ Don Riski</h4>
              <p className="text-sm">{getRiskText(results.riskFactors.frost)}</p>
            </div>
            <div className={`p-4 rounded-lg border ${getRiskColor(results.riskFactors.heatWave)}`}>
              <h4 className="font-semibold mb-1">🔥 Sıcak Hava</h4>
              <p className="text-sm">{getRiskText(results.riskFactors.heatWave)}</p>
            </div>
            <div className={`p-4 rounded-lg border ${getRiskColor(results.riskFactors.wind)}`}>
              <h4 className="font-semibold mb-1">💨 Rüzgar</h4>
              <p className="text-sm">{getRiskText(results.riskFactors.wind)}</p>
            </div>
            <div className={`p-4 rounded-lg border ${getRiskColor(results.riskFactors.humidity)}`}>
              <h4 className="font-semibold mb-1">💧 Nem</h4>
              <p className="text-sm">{getRiskText(results.riskFactors.humidity)}</p>
            </div>
          </div>

          {/* Climate Data */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 İklim Verileri</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ortalama Sıcaklık:</span>
                  <span className="font-medium">{results.climateData.avgTemperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">En Yüksek Sıcaklık:</span>
                  <span className="font-medium">{results.climateData.maxTemperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">En Düşük Sıcaklık:</span>
                  <span className="font-medium">{results.climateData.minTemperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ortalama Nem:</span>
                  <span className="font-medium">%{results.climateData.avgHumidity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Yıllık Yağış:</span>
                  <span className="font-medium">{results.climateData.annualRainfall} mm</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🌱 Optimal Sezonlar</h3>
              <div className="space-y-3">
                {results.optimalSeasons.map((season, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">{season.season}</p>
                      <p className="text-sm text-green-600">{season.months}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-700">Uygunluk: %{season.suitability}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Öneriler</h3>
            <div className="space-y-3">
              {results.recommendations.map((recommendation, index) => (
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
          onClick={generatePDFReport}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
        >
          📄 PDF Rapor İndir
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🌡️ İklim Analizi
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lokasyonunuzun sera tarımı için iklim uygunluğunu analiz edin, risk faktörlerini belirleyin
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
                    {stepNumber === 3 ? '📊' : stepNumber}
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
                  onClick={runClimateAnalysis}
                  disabled={!inputs.location.city || !inputs.plantType || isAnalyzing || userTokens < 1}
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
                    <>🪙 İklim Analizini Başlat (1 Jeton)</>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && (!inputs.location.city || !inputs.plantType)}
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
