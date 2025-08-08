'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MockAnalysisService, AnalysisFormData } from '@/lib/services/mock-analysis-service';

export const dynamic = 'force-dynamic';

interface ROIFormData extends AnalysisFormData {
  location: {
    city: string;
    district?: string;
  };
  cropType: string;
  greenhouseSize: number;
  investment: {
    total: number;
    equipment: number;
    construction: number;
  };
  targetProduction: number;
  operationPeriod: number;
}

export default function ROIAnalysisPage() {
  const { user, hasTokens, consumeToken } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [preview, setPreview] = useState<any>(null);
  const [formData, setFormData] = useState<ROIFormData>({
    type: 'roi',
    location: {
      city: 'antalya'
    },
    cropType: 'domates',
    greenhouseSize: 1000,
    investment: {
      total: 200000,
      equipment: 120000,
      construction: 80000
    },
    targetProduction: 80,
    operationPeriod: 5
  });

  // Load analysis preview when form data changes
  useEffect(() => {
    if (currentStep === 2) {
      loadPreview();
    }
  }, [currentStep]);

  const loadPreview = async () => {
    setPreviewLoading(true);
    try {
      const previewData = await MockAnalysisService.getAnalysisPreview('roi', formData);
      setPreview(previewData);
    } catch (error) {
      console.error('Preview yüklenirken hata:', error);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInvestmentChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      investment: {
        ...prev.investment,
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleSubmit = async () => {
    if (!hasTokens(1)) {
      alert('Analiz oluşturmak için yeterli token\'iniz bulunmuyor.');
      return;
    }

    setLoading(true);
    try {
      // Consume token
      await consumeToken(1, 'analysis_created');
      
      // Create analysis
      const result = await MockAnalysisService.createAnalysis(formData);
      
      alert(`ROI Analizi başlatıldı! Analiz ID: ${result.id}`);
      
      // Redirect to analyses list or result page
      window.location.href = '/dashboard/analysis';
      
    } catch (error: any) {
      console.error('Analiz oluşturulurken hata:', error);
      alert('Analiz oluşturulurken hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const cities = [
    { value: 'antalya', label: 'Antalya' },
    { value: 'mersin', label: 'Mersin' },
    { value: 'adana', label: 'Adana' },
    { value: 'izmir', label: 'İzmir' },
    { value: 'bursa', label: 'Bursa' },
    { value: 'konya', label: 'Konya' }
  ];

  const crops = [
    { value: 'domates', label: 'Domates' },
    { value: 'salatalik', label: 'Salatalık' },
    { value: 'biber', label: 'Biber' },
    { value: 'marul', label: 'Marul' },
    { value: 'patlican', label: 'Patlıcan' }
  ];

  return (
    <DashboardLayout 
      title="ROI Simülasyonu" 
      subtitle="Sera yatırımı geri dönüş analizi"
    >
      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <div className={`flex-1 h-1 ${
              currentStep > 1 ? 'bg-green-600' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {currentStep > 2 ? '✓' : '2'}
            </div>
            <div className={`flex-1 h-1 ${
              currentStep > 2 ? 'bg-green-600' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Sera Bilgileri</span>
            <span>Önizleme</span>
            <span>Sonuç</span>
          </div>
        </div>

        {/* Step 1: Form */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Sera Bilgileri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konum
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={formData.location.city}
                  onChange={(e) => handleInputChange('location', { city: e.target.value })}
                >
                  {cities.map(city => (
                    <option key={city.value} value={city.value}>{city.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ürün Türü
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={formData.cropType}
                  onChange={(e) => handleInputChange('cropType', e.target.value)}
                >
                  {crops.map(crop => (
                    <option key={crop.value} value={crop.value}>{crop.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sera Boyutu (m²)
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={formData.greenhouseSize}
                  onChange={(e) => handleInputChange('greenhouseSize', parseInt(e.target.value))}
                  min="100"
                  max="10000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hedef Üretim (ton/yıl)
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={formData.targetProduction}
                  onChange={(e) => handleInputChange('targetProduction', parseInt(e.target.value))}
                  min="1"
                  max="500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Toplam Yatırım (₺)
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={formData.investment.total}
                  onChange={(e) => handleInvestmentChange('total', parseInt(e.target.value))}
                  min="50000"
                  max="2000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İşletme Süresi (yıl)
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={formData.operationPeriod}
                  onChange={(e) => handleInputChange('operationPeriod', parseInt(e.target.value))}
                >
                  <option value={3}>3 Yıl</option>
                  <option value={5}>5 Yıl</option>
                  <option value={10}>10 Yıl</option>
                  <option value={15}>15 Yıl</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Devam Et
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Preview */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Analiz Önizleme</h2>
            
            {previewLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-2 text-gray-600">Önizleme yükleniyor...</span>
              </div>
            ) : preview ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Tahmini ROI</div>
                    <div className="text-xl font-bold text-green-600">{preview.estimatedROI}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Geri Dönüş Süresi</div>
                    <div className="text-xl font-bold text-blue-600">{preview.paybackPeriod}</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Risk Seviyesi</div>
                    <div className="text-xl font-bold text-yellow-600">{preview.riskLevel}</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Güven Oranı</div>
                    <div className="text-xl font-bold text-purple-600">{preview.confidence}%</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Analiz Parametreleri</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Konum:</span>
                      <span className="ml-2 font-medium">{cities.find(c => c.value === formData.location.city)?.label}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Ürün:</span>
                      <span className="ml-2 font-medium">{crops.find(c => c.value === formData.cropType)?.label}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Sera Boyutu:</span>
                      <span className="ml-2 font-medium">{formData.greenhouseSize.toLocaleString()} m²</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Toplam Yatırım:</span>
                      <span className="ml-2 font-medium">₺{formData.investment.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Geri Dön
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !hasTokens(1)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analiz Oluşturuluyor...
                  </div>
                ) : (
                  `Analizi Başlat (1 Token)`
                )}
              </button>
            </div>

            {!hasTokens(1) && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  ⚠️ Bu analizi oluşturmak için yeterli token'iniz bulunmuyor. 
                  <a href="/dashboard/tokens" className="font-medium underline ml-1">Token satın alın</a>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
