'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { roiCalculator, ROIInputs, ROICalculation } from '@/lib/services/roi-calculator';
import { pdfService } from '@/lib/services/pdf-service';

export default function ROIAnalysisPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ROICalculation | null>(null);
  const [error, setError] = useState<string>('');

  // ROI Analysis inputs
  const [roiInputs, setRoiInputs] = useState<ROIInputs>({
    location: 'Antalya',
    greenhouseSize: 600, // m²
    plantType: 'domates',
    initialInvestment: 500000, // TL
    operationalCosts: {
      monthly: 8000,
      heating: 2000,
      seeds: 800,
      fertilizer: 1200,
      labor: 3000,
      utilities: 1000
    },
    expectedYield: {
      annual: 15000, // kg
      pricePerKg: 15, // TL
      seasons: 2
    },
    projectDuration: 5 // years
  });

  const handleCalculateROI = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await roiCalculator.calculateROI(roiInputs);

      if (response.success && response.data) {
        setResults(response.data);
        setCurrentStep(4);
      } else {
        setError(response.error || 'Hesaplama sırasında hata oluştu');
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setRoiInputs(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof ROIInputs] as any),
          [child]: value
        }
      }));
    } else {
      setRoiInputs(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleGeneratePDF = async () => {
    if (!results) return;

    const reportData = {
      type: 'roi' as const,
      title: 'ROI Analiz Raporu',
      generatedAt: new Date().toISOString(),
      projectName: `${roiInputs.plantType} Sera Projesi`,
      location: {
        city: roiInputs.location,
        region: 'Türkiye',
        coordinates: { lat: 0, lon: 0 }
      },
      user: {
        name: 'Kullanıcı',
        email: 'user@example.com'
      },
      data: results
    };

    const pdfResponse = await pdfService.generateROIReport(reportData, results);
    
    if (pdfResponse.success && pdfResponse.data) {
      alert(`PDF raporu oluşturuldu: ${pdfResponse.data.filename}`);
    }
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
            value={roiInputs.greenhouseSize}
            onChange={(e) => handleInputChange('greenhouseSize', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lokasyon
          </label>
          <select
            value={roiInputs.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Antalya">Antalya</option>
            <option value="Mersin">Mersin</option>
            <option value="İzmir">İzmir</option>
            <option value="Adana">Adana</option>
            <option value="Muğla">Muğla</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bitki Türü
          </label>
          <select
            value={roiInputs.plantType}
            onChange={(e) => handleInputChange('plantType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="domates">Domates</option>
            <option value="salatalik">Salatalık</option>
            <option value="biber">Biber</option>
            <option value="patlican">Patlıcan</option>
            <option value="cilek">Çilek</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Başlangıç Yatırımı (TL)
          </label>
          <input
            type="number"
            value={roiInputs.initialInvestment}
            onChange={(e) => handleInputChange('initialInvestment', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ürün Özellikleri</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yıllık Beklenen Üretim (kg)
          </label>
          <input
            type="number"
            value={roiInputs.expectedYield.annual}
            onChange={(e) => handleInputChange('expectedYield.annual', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kg Başına Fiyat (TL)
          </label>
          <input
            type="number"
            value={roiInputs.expectedYield.pricePerKg}
            onChange={(e) => handleInputChange('expectedYield.pricePerKg', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yıllık Sezon Sayısı
          </label>
          <input
            type="number"
            value={roiInputs.expectedYield.seasons}
            onChange={(e) => handleInputChange('expectedYield.seasons', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proje Süresi (yıl)
          </label>
          <input
            type="number"
            value={roiInputs.projectDuration}
            onChange={(e) => handleInputChange('projectDuration', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">İşletme Maliyetleri</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aylık İşletme Maliyeti (TL)
          </label>
          <input
            type="number"
            value={roiInputs.operationalCosts.monthly}
            onChange={(e) => handleInputChange('operationalCosts.monthly', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aylık Isıtma Maliyeti (TL)
          </label>
          <input
            type="number"
            value={roiInputs.operationalCosts.heating}
            onChange={(e) => handleInputChange('operationalCosts.heating', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tohum Maliyeti (TL)
          </label>
          <input
            type="number"
            value={roiInputs.operationalCosts.seeds}
            onChange={(e) => handleInputChange('operationalCosts.seeds', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gübre Maliyeti (TL)
          </label>
          <input
            type="number"
            value={roiInputs.operationalCosts.fertilizer}
            onChange={(e) => handleInputChange('operationalCosts.fertilizer', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İşçilik Maliyeti (TL)
          </label>
          <input
            type="number"
            value={roiInputs.operationalCosts.labor}
            onChange={(e) => handleInputChange('operationalCosts.labor', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Elektrik/Su Maliyeti (TL)
          </label>
          <input
            type="number"
            value={roiInputs.operationalCosts.utilities}
            onChange={(e) => handleInputChange('operationalCosts.utilities', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">ROI Analiz Sonuçları</h2>
        <p className="text-gray-600">Finansal analiz ve yatırım geri dönüş hesaplamaları</p>
      </div>

      {results && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-medium mb-2">ROI</h3>
              <p className="text-3xl font-bold">%{results.analysis.roi}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-medium mb-2">Geri Dönüş Süresi</h3>
              <p className="text-3xl font-bold">{results.analysis.paybackPeriod} yıl</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-medium mb-2">NPV</h3>
              <p className="text-3xl font-bold">₺{results.analysis.npv.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-medium mb-2">IRR</h3>
              <p className="text-3xl font-bold">%{results.analysis.irr}</p>
            </div>
          </div>

          {/* Investment Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yatırım Dağılımı</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">₺{results.initialInvestment.construction.toLocaleString()}</p>
                <p className="text-sm text-gray-600">İnşaat</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">₺{results.initialInvestment.equipment.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Ekipman</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">₺{results.initialInvestment.automation.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Otomasyon</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">₺{results.initialInvestment.infrastructure.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Altyapı</p>
              </div>
              <div className="text-center border-l border-gray-200">
                <p className="text-2xl font-bold text-green-600">₺{results.initialInvestment.total.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Toplam</p>
              </div>
            </div>
          </div>

          {/* Revenue & Costs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gelir Analizi</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Brüt Gelir (Yıllık):</span>
                  <span className="font-medium">₺{results.revenue.grossRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Gelir (Yıllık):</span>
                  <span className="font-medium">₺{results.revenue.netRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-900 font-medium">Yıllık İşletme Maliyeti:</span>
                  <span className="font-medium">₺{results.operationalCosts.annual.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Öneriler</h3>
              <div className="space-y-3">
                {results.recommendations.map((rec: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      rec.priority === 'high' ? 'bg-red-500' : 
                      rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{rec.category}</p>
                      <p className="text-gray-600">{rec.suggestion}</p>
                      <p className="text-sm text-green-600">Potansiyel tasarruf: ₺{rec.potentialSaving.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={handleGeneratePDF}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              📄 PDF Rapor İndir
            </button>
            <button
              onClick={() => setCurrentStep(1)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Yeni Analiz
            </button>
          </div>
        </>
      )}
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
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              💰 ROI Simülasyonu
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sera yatırımınızın geri dönüş süresini ve karlılığını analiz edin
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    currentStep >= stepNumber 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber === 4 ? '📊' : stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-12 h-1 mx-2 ${
                      currentStep > stepNumber ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderResults()}
          </div>

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="flex justify-between">
              <button
                onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
              >
                ← Önceki
              </button>

              {currentStep === 3 ? (
                <button
                  onClick={handleCalculateROI}
                  disabled={loading}
                  className="relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                      </svg>
                      Hesaplanıyor...
                    </div>
                  ) : (
                    <>🚀 ROI Hesapla</>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium transition-colors hover:bg-blue-600"
                >
                  Sonraki →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
