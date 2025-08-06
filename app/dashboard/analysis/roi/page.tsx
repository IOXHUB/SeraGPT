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

  const handleGeneratePDF = async () => {
    if (!results) return;

    const reportData = {
      type: 'roi' as const,
      title: 'ROI Analiz Raporu',
      generatedAt: new Date().toISOString(),
      projectName: `${cropSpecs.type} Sera Projesi`,
      location: {
        city: greenhouseSpecs.location.city,
        region: greenhouseSpecs.location.region,
        coordinates: {
          lat: greenhouseSpecs.location.lat,
          lon: greenhouseSpecs.location.lon
        }
      },
      user: {
        name: 'Kullanıcı',
        email: 'user@example.com'
      },
      data: results
    };

    const pdfResponse = await pdfService.generateROIReport(reportData, results);
    
    if (pdfResponse.success && pdfResponse.data) {
      // In production, this would download the actual PDF
      alert(`PDF raporu oluşturuldu: ${pdfResponse.data.filename}`);
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Sera Özellikleri</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Uzunluk (metre)
          </label>
          <input
            type="number"
            value={greenhouseSpecs.length}
            onChange={(e) => setGreenhouseSpecs({...greenhouseSpecs, length: parseInt(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genişlik (metre)
          </label>
          <input
            type="number"
            value={greenhouseSpecs.width}
            onChange={(e) => setGreenhouseSpecs({...greenhouseSpecs, width: parseInt(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yükseklik (metre)
          </label>
          <input
            type="number"
            value={greenhouseSpecs.height}
            onChange={(e) => setGreenhouseSpecs({...greenhouseSpecs, height: parseInt(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Şehir
          </label>
          <select
            value={greenhouseSpecs.location.city}
            onChange={(e) => setGreenhouseSpecs({
              ...greenhouseSpecs, 
              location: {...greenhouseSpecs.location, city: e.target.value}
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="Antalya">Antalya</option>
            <option value="Mersin">Mersin</option>
            <option value="İzmir">İzmir</option>
            <option value="Muğla">Muğla</option>
            <option value="Adana">Adana</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İskelet Tipi
          </label>
          <select
            value={greenhouseSpecs.frameType}
            onChange={(e) => setGreenhouseSpecs({...greenhouseSpecs, frameType: e.target.value as any})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="galvanized">Galvanizli Çelik</option>
            <option value="aluminum">Alüminyum</option>
            <option value="wood">Ahşap</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Örtü Materyali
          </label>
          <select
            value={greenhouseSpecs.coveringType}
            onChange={(e) => setGreenhouseSpecs({...greenhouseSpecs, coveringType: e.target.value as any})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="polycarbonate">Polikarbon</option>
            <option value="glass">Cam</option>
            <option value="polyethylene">Polietilen</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setCurrentStep(2)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Sonraki Adım
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Ürün Bilgileri</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ürün Tipi
          </label>
          <select
            value={cropSpecs.type}
            onChange={(e) => setCropSpecs({...cropSpecs, type: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="domates">Domates</option>
            <option value="salatalik">Salatalık</option>
            <option value="biber">Biber</option>
            <option value="patlican">Patlıcan</option>
            <option value="çilek">Çilek</option>
            <option value="marul">Marul</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dikim Yoğunluğu (bitki/m²)
          </label>
          <input
            type="number"
            value={cropSpecs.plantingDensity}
            onChange={(e) => setCropSpecs({...cropSpecs, plantingDensity: parseFloat(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yıllık Dönem Sayısı
          </label>
          <input
            type="number"
            value={cropSpecs.cyclesPerYear}
            onChange={(e) => setCropSpecs({...cropSpecs, cyclesPerYear: parseInt(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Beklenen Verim (kg/m²/dönem)
          </label>
          <input
            type="number"
            value={cropSpecs.expectedYieldPerM2}
            onChange={(e) => setCropSpecs({...cropSpecs, expectedYieldPerM2: parseFloat(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Beklenen Fiyat (TL/kg)
          </label>
          <input
            type="number"
            value={cropSpecs.expectedPrice}
            onChange={(e) => setCropSpecs({...cropSpecs, expectedPrice: parseFloat(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Önceki Adım
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Sonraki Adım
        </button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">İşletme Maliyetleri (Aylık)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Elektrik (TL/ay)
          </label>
          <input
            type="number"
            value={operationalCosts.electricity}
            onChange={(e) => setOperationalCosts({...operationalCosts, electricity: parseFloat(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Su (TL/ay)
          </label>
          <input
            type="number"
            value={operationalCosts.water}
            onChange={(e) => setOperationalCosts({...operationalCosts, water: parseFloat(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gübre (TL/ay)
          </label>
          <input
            type="number"
            value={operationalCosts.fertilizer}
            onChange={(e) => setOperationalCosts({...operationalCosts, fertilizer: parseFloat(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İşçilik (TL/ay)
          </label>
          <input
            type="number"
            value={operationalCosts.labor}
            onChange={(e) => setOperationalCosts({...operationalCosts, labor: parseFloat(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bakım-Onarım (TL/ay)
          </label>
          <input
            type="number"
            value={operationalCosts.maintenance}
            onChange={(e) => setOperationalCosts({...operationalCosts, maintenance: parseFloat(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sigorta (TL/yıl)
          </label>
          <input
            type="number"
            value={operationalCosts.insurance}
            onChange={(e) => setOperationalCosts({...operationalCosts, insurance: parseFloat(e.target.value) || 0})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(2)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Önceki Adım
        </button>
        <button
          onClick={handleCalculateROI}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Hesaplanıyor...' : 'ROI Hesapla'}
        </button>
      </div>
    </motion.div>
  );

  const renderResults = () => {
    if (!results) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">ROI Analiz Sonuçları</h2>
          <button
            onClick={handleGeneratePDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            PDF İndir
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800 mb-1">ROI</h3>
            <p className="text-2xl font-bold text-green-900">%{results.analysis.roi.toFixed(1)}</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Geri Dönüş Süresi</h3>
            <p className="text-2xl font-bold text-blue-900">{results.analysis.paybackPeriod.toFixed(1)} yıl</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-800 mb-1">NPV</h3>
            <p className="text-2xl font-bold text-purple-900">₺{results.analysis.npv.toLocaleString()}</p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-orange-800 mb-1">IRR</h3>
            <p className="text-2xl font-bold text-orange-900">%{results.analysis.irr.toFixed(1)}</p>
          </div>
        </div>

        {/* Investment Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Yatırım Dağılımı</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">İnşaat</p>
              <p className="text-lg font-semibold">₺{results.initialInvestment.construction.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ekipman</p>
              <p className="text-lg font-semibold">₺{results.initialInvestment.equipment.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Otomasyon</p>
              <p className="text-lg font-semibold">₺{results.initialInvestment.automation.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Altyapı</p>
              <p className="text-lg font-semibold">₺{results.initialInvestment.infrastructure.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">İzinler</p>
              <p className="text-lg font-semibold">₺{results.initialInvestment.permits.toLocaleString()}</p>
            </div>
            <div className="border-t pt-2">
              <p className="text-sm text-gray-600">Toplam</p>
              <p className="text-xl font-bold text-gray-900">₺{results.initialInvestment.total.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {results.recommendations.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
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
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Yeni Analiz
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="body-content-container space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">ROI Simülasyonu</h1>
            <p className="text-gray-600 mt-1">Sera yatırımınızın karlılık analizini yapın</p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-8 h-0.5 ${
                    currentStep > step ? 'bg-gray-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderResults()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
