'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { weatherService, ClimateAnalysis, WeatherData } from '@/lib/services/weather-service';
import { pdfService } from '@/lib/services/pdf-service';

export default function ClimateAnalysisPage() {
  const [location, setLocation] = useState({
    city: 'Antalya',
    lat: 36.8969,
    lon: 30.7133
  });
  const [loading, setLoading] = useState(false);
  const [climateData, setClimateData] = useState<ClimateAnalysis | null>(null);
  const [currentWeather, setCurrentWeather] = useState<WeatherData['current'] | null>(null);
  const [forecast, setForecast] = useState<WeatherData['forecast'] | null>(null);
  const [error, setError] = useState<string>('');

  const cities = [
    { name: 'Antalya', lat: 36.8969, lon: 30.7133 },
    { name: 'Mersin', lat: 36.8121, lon: 34.6415 },
    { name: 'İzmir', lat: 38.4192, lon: 27.1287 },
    { name: 'Muğla', lat: 37.2153, lon: 28.3636 },
    { name: 'Adana', lat: 37.0000, lon: 35.3213 },
    { name: 'Bursa', lat: 40.1826, lon: 29.0665 },
    { name: 'Konya', lat: 37.8667, lon: 32.4833 }
  ];

  const handleAnalyzeClimate = async () => {
    setLoading(true);
    setError('');

    try {
      // Get current weather
      const weatherResponse = await weatherService.getCurrentWeather(location.lat, location.lon);
      if (weatherResponse.success && weatherResponse.data) {
        setCurrentWeather(weatherResponse.data);
      }

      // Get forecast
      const forecastResponse = await weatherService.getForecast(location.lat, location.lon, 7);
      if (forecastResponse.success && forecastResponse.data) {
        setForecast(forecastResponse.data);
      }

      // Get climate analysis
      const climateResponse = await weatherService.getClimateAnalysis(location.lat, location.lon);
      if (climateResponse.success && climateResponse.data) {
        setClimateData(climateResponse.data);
      } else {
        setError(climateResponse.error || 'İklim analizi alınamadı');
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    if (!climateData) return;

    const reportData = {
      type: 'climate' as const,
      title: 'İklim Analiz Raporu',
      generatedAt: new Date().toISOString(),
      projectName: `${location.city} İklim Analizi`,
      location: {
        city: location.city,
        region: 'Türkiye',
        coordinates: { lat: location.lat, lon: location.lon }
      },
      user: {
        name: 'Kullanıcı',
        email: 'user@example.com'
      },
      data: climateData
    };

    const pdfResponse = await pdfService.generateClimateReport(reportData, climateData);
    
    if (pdfResponse.success && pdfResponse.data) {
      alert(`PDF raporu oluşturuldu: ${pdfResponse.data.filename}`);
    }
  };

  const getRiskLevelColor = (score: number) => {
    if (score < 30) return { bg: 'bg-green-100', text: 'text-green-800', level: 'Düşük Risk' };
    if (score < 60) return { bg: 'bg-yellow-100', text: 'text-yellow-800', level: 'Orta Risk' };
    return { bg: 'bg-red-100', text: 'text-red-800', level: 'Yüksek Risk' };
  };

  const getSeasonName = (season: string) => {
    const names: Record<string, string> = {
      spring: 'İlkbahar',
      summer: 'Yaz',
      autumn: 'Sonbahar',
      winter: 'Kış'
    };
    return names[season] || season;
  };

  const getMonthName = (month: number) => {
    const names = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return names[month - 1] || `Ay ${month}`;
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="visual-content-container space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">İklim Analizi</h1>
            <p className="text-gray-600 mt-1">Sera lokasyonunuz için detaylı iklim verilerini inceleyin</p>
          </motion.div>

          {/* Location Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Lokasyon Seçimi</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şehir
                </label>
                <select
                  value={location.city}
                  onChange={(e) => {
                    const selectedCity = cities.find(city => city.name === e.target.value);
                    if (selectedCity) {
                      setLocation({
                        city: selectedCity.name,
                        lat: selectedCity.lat,
                        lon: selectedCity.lon
                      });
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleAnalyzeClimate}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? 'Analiz Ediliyor...' : 'İklim Analizini Başlat'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </motion.div>

          {/* Current Weather */}
          {currentWeather && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Mevcut Hava Durumu</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">{currentWeather.temperature.toFixed(1)}°C</p>
                  <p className="text-sm text-gray-600">Sıcaklık</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{currentWeather.humidity}%</p>
                  <p className="text-sm text-gray-600">Nem</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{currentWeather.windSpeed.toFixed(1)} m/s</p>
                  <p className="text-sm text-gray-600">Rüzgar</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{currentWeather.pressure} hPa</p>
                  <p className="text-sm text-gray-600">Basınç</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Climate Analysis Results */}
          {climateData && (
            <>
              {/* Risk Assessment */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Risk Değerlendirmesi</h2>
                  <button
                    onClick={handleGeneratePDF}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    PDF İndir
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={climateData.riskScore < 30 ? "#10b981" : climateData.riskScore < 60 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="2"
                          strokeDasharray={`${climateData.riskScore}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">{climateData.riskScore}</span>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">Risk Skoru</p>
                    <p className={`text-sm font-medium ${getRiskLevelColor(climateData.riskScore).text}`}>
                      {getRiskLevelColor(climateData.riskScore).level}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Öneriler</h3>
                    <ul className="space-y-2">
                      {climateData.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Seasonal Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Mevsimsel Analiz</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {climateData.seasons.map((season, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {getSeasonName(season.season)}
                      </h3>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Uygunluk</span>
                          <span className="text-sm font-medium">{season.suitability}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${season.suitability}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-gray-700 mb-1">Fırsatlar:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {season.opportunities.map((opp, i) => (
                              <li key={i}>• {opp}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium text-gray-700 mb-1">Zorluklar:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {season.challenges.map((challenge, i) => (
                              <li key={i}>• {challenge}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Monthly Climate Data */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Aylık İklim Verileri</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-medium text-gray-700">Ay</th>
                        <th className="text-right py-2 font-medium text-gray-700">Ort. Sıc.</th>
                        <th className="text-right py-2 font-medium text-gray-700">Min/Max</th>
                        <th className="text-right py-2 font-medium text-gray-700">Yağış</th>
                        <th className="text-right py-2 font-medium text-gray-700">Nem</th>
                        <th className="text-right py-2 font-medium text-gray-700">Güneş</th>
                      </tr>
                    </thead>
                    <tbody>
                      {climateData.monthlyData.map((month, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2 font-medium text-gray-900">{getMonthName(month.month)}</td>
                          <td className="text-right py-2">{month.avgTemp.toFixed(1)}°C</td>
                          <td className="text-right py-2 text-gray-600">
                            {month.minTemp.toFixed(1)}° / {month.maxTemp.toFixed(1)}°
                          </td>
                          <td className="text-right py-2">{month.precipitation.toFixed(0)}mm</td>
                          <td className="text-right py-2">{month.humidity.toFixed(0)}%</td>
                          <td className="text-right py-2">{month.solarRadiation.toFixed(0)} W/m²</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* 7-Day Forecast */}
              {forecast && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">7 Günlük Tahmin</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {forecast.map((day, index) => (
                      <div key={index} className="text-center border border-gray-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-700">
                          {new Date(day.date).toLocaleDateString('tr-TR', { weekday: 'short' })}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          {new Date(day.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                        </p>
                        <div className="text-lg font-semibold text-gray-900">
                          {day.tempMax.toFixed(0)}°
                        </div>
                        <div className="text-sm text-gray-600">
                          {day.tempMin.toFixed(0)}°
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          💧 {day.precipitation.toFixed(1)}mm
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}

          {/* No Data State */}
          {!loading && !climateData && !error && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center"
            >
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">İklim Analizi Başlatın</h3>
              <p className="text-gray-600">
                Lokasyonunuzu seçin ve "İklim Analizini Başlat" butonuna tıklayarak 
                detaylı iklim raporunu görüntüleyin.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
