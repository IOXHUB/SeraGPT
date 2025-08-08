'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import { useROIAnalysis } from '@/lib/hooks/useCachedAPI';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export const dynamic = 'force-dynamic';

interface ROIInputs {
  location: string;
  greenhouseSize: number;
  plantType: string;
  initialInvestment: number;
  operationalCosts: {
    monthly: number;
    heating: number;
    seeds: number;
    fertilizer: number;
    labor: number;
    utilities: number;
  };
  expectedYield: {
    annual: number;
    pricePerKg: number;
    seasons: number;
  };
  projectDuration: number;
}

interface ROIResults {
  analysis: {
    roi: number;
    paybackPeriod: number;
    npv: number;
    irr: number;
    profitabilityIndex: number;
  };
  initialInvestment: {
    construction: number;
    equipment: number;
    automation: number;
    infrastructure: number;
    total: number;
  };
  revenue: {
    grossRevenue: number;
    netRevenue: number;
    annualProfit: number;
  };
  operationalCosts: {
    annual: number;
    monthly: number;
    breakdown: Record<string, number>;
  };
  recommendations: Array<{
    category: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
    potentialSaving: number;
    impact: string;
  }>;
  riskAssessment: {
    overallRisk: 'low' | 'medium' | 'high';
    factors: string[];
    mitigation: string[];
  };
  projectedCashFlow: Array<{
    year: number;
    revenue: number;
    costs: number;
    profit: number;
    cumulativeProfit: number;
  }>;
}

export default function ROIAnalysisPage() {
  const { user, consumeToken, hasTokens } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [reportId, setReportId] = useState<string | null>(null);

  // ROI Analysis inputs
  const [roiInputs, setRoiInputs] = useState<ROIInputs>({
    location: 'Antalya',
    greenhouseSize: 600,
    plantType: 'domates',
    initialInvestment: 500000,
    operationalCosts: {
      monthly: 8000,
      heating: 2000,
      seeds: 800,
      fertilizer: 1200,
      labor: 3000,
      utilities: 1000
    },
    expectedYield: {
      annual: 15000,
      pricePerKg: 15,
      seasons: 2
    },
    projectDuration: 5
  });

  // Cached API hook for ROI analysis
  const roiAnalysis = useROIAnalysis(
    {
      type: 'roi_analysis',
      parameters: {
        ...roiInputs,
        user_preferences: {
          currency: 'TRY',
          units: 'metric'
        }
      },
      context: {
        analysis_depth: 'comprehensive',
        include_recommendations: true,
        include_risk_assessment: true,
        include_cash_flow: true
      }
    },
    {
      autoLoad: false,
      onSuccess: (data) => {
        consumeToken(2); // ROI analysis costs 2 tokens
        setReportId(data.data?.report_id || null);
        setCurrentStep(2);
      },
      onError: (error) => {
        console.error('ROI Analysis failed:', error);
      }
    }
  );

  const getAuthToken = async () => {
    const { data: { session } } = await (window as any).supabase.auth.getSession();
    return session?.access_token || '';
  };

  const handleCalculateROI = async () => {
    if (!user || !hasTokens(2)) { // ROI analysis costs 2 tokens
      return;
    }

    // Execute cached API call
    await roiAnalysis.execute();
  };

  const handleGeneratePDF = async () => {
    if (!roiAnalysis.data || !reportId) return;

    try {
      const response = await fetch(`/api/analysis/reports?id=${reportId}&format=pdf`, {
        headers: {
          'Authorization': `Bearer ${await getAuthToken()}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `roi-analiz-raporu-${new Date().getTime()}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        setError('PDF raporu oluşturulamadı');
      }
    } catch (err) {
      setError('PDF indirme sırasında hata oluştu');
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

  const calculateTotalAnnualCosts = () => {
    return (roiInputs.operationalCosts.monthly * 12) +
           (roiInputs.operationalCosts.heating * 12) +
           (roiInputs.operationalCosts.seeds * roiInputs.expectedYield.seasons) +
           (roiInputs.operationalCosts.fertilizer * 12) +
           (roiInputs.operationalCosts.labor * 12) +
           (roiInputs.operationalCosts.utilities * 12);
  };

  const calculateExpectedRevenue = () => {
    return roiInputs.expectedYield.annual * roiInputs.expectedYield.pricePerKg;
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🏗️ Sera Özellikleri</h2>
        <p className="text-gray-600">Seranızın temel özelliklerini belirleyin</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sera Büyüklüğü (m²) *
          </label>
          <input
            type="number"
            value={roiInputs.greenhouseSize}
            onChange={(e) => handleInputChange('greenhouseSize', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="600"
            min="50"
            max="10000"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 50m², maksimum 10.000m²</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lokasyon *
          </label>
          <select
            value={roiInputs.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Antalya">Antalya</option>
            <option value="Mersin">Mersin</option>
            <option value="İzmir">İzmir</option>
            <option value="Adana">Adana</option>
            <option value="Muğla">Muğla</option>
            <option value="Hatay">Hatay</option>
            <option value="Aydın">Aydın</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">İklim koşulları analizi için önemli</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bitki Türü *
          </label>
          <select
            value={roiInputs.plantType}
            onChange={(e) => handleInputChange('plantType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="domates">🍅 Domates</option>
            <option value="salatalik">🥒 Salatalık</option>
            <option value="biber">🌶️ Biber</option>
            <option value="patlican">🍆 Patlıcan</option>
            <option value="cilek">🍓 Çilek</option>
            <option value="marul">🥬 Marul</option>
            <option value="fasulye">🫘 Fasulye</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Verim ve fiyat hesaplamaları için</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Başlangıç Yatırımı (TL) *
          </label>
          <input
            type="number"
            value={roiInputs.initialInvestment}
            onChange={(e) => handleInputChange('initialInvestment', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="500000"
            min="50000"
          />
          <p className="text-xs text-gray-500 mt-1">
            İnşaat, ekipman, altyapı dahil toplam maliyet
          </p>
        </div>
      </div>

      {/* Investment Breakdown Preview */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">�� Yatırım Dağılımı Tahmini</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <span className="text-blue-800">İnşaat:</span>
            <span className="ml-1 font-medium">₺{(roiInputs.initialInvestment * 0.4).toLocaleString()}</span>
          </div>
          <div>
            <span className="text-blue-800">Ekipman:</span>
            <span className="ml-1 font-medium">₺{(roiInputs.initialInvestment * 0.35).toLocaleString()}</span>
          </div>
          <div>
            <span className="text-blue-800">Otomasyon:</span>
            <span className="ml-1 font-medium">₺{(roiInputs.initialInvestment * 0.15).toLocaleString()}</span>
          </div>
          <div>
            <span className="text-blue-800">Altyapı:</span>
            <span className="ml-1 font-medium">₺{(roiInputs.initialInvestment * 0.1).toLocaleString()}</span>
          </div>
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
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🌱 Ürün Özellikleri</h2>
        <p className="text-gray-600">Beklenen üretim ve satış bilgileri</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yıllık Beklenen Üretim (kg) *
          </label>
          <input
            type="number"
            value={roiInputs.expectedYield.annual}
            onChange={(e) => handleInputChange('expectedYield.annual', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="15000"
            min="100"
          />
          <p className="text-xs text-gray-500 mt-1">
            {roiInputs.plantType} için m² başına beklenen verim
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kg Baş��na Satış Fiyatı (TL) *
          </label>
          <input
            type="number"
            step="0.1"
            value={roiInputs.expectedYield.pricePerKg}
            onChange={(e) => handleInputChange('expectedYield.pricePerKg', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="15.0"
            min="1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Ortalama pazar fiyatı (mevsimsel değişkenlik dahil)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yıllık Sezon Sayısı *
          </label>
          <select
            value={roiInputs.expectedYield.seasons}
            onChange={(e) => handleInputChange('expectedYield.seasons', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={1}>1 Sezon (Tek Mahsul)</option>
            <option value={2}>2 Sezon (Çift Mahsul)</option>
            <option value={3}>3 Sezon (Sürekli Üretim)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Seralarda genellikle 2-3 sezon üretim yapılır
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proje Analiz Süresi (yıl) *
          </label>
          <select
            value={roiInputs.projectDuration}
            onChange={(e) => handleInputChange('projectDuration', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={3}>3 Yıl (Kısa Vadeli)</option>
            <option value={5}>5 Yıl (Orta Vadeli)</option>
            <option value={7}>7 Yıl (Uzun Vadeli)</option>
            <option value={10}>10 Yıl (Çok Uzun Vadeli)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            ROI hesaplama dönemi
          </p>
        </div>
      </div>

      {/* Revenue Preview */}
      <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-medium text-green-900 mb-2">💰 Gelir Tahmini</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-green-800">Yıllık Brüt Gelir:</span>
            <span className="ml-1 font-bold text-green-900">
              ₺{calculateExpectedRevenue().toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-green-800">Sezon Başına:</span>
            <span className="ml-1 font-bold text-green-900">
              ₺{(calculateExpectedRevenue() / roiInputs.expectedYield.seasons).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-green-800">m² Başına Yıllık:</span>
            <span className="ml-1 font-bold text-green-900">
              ₺{(calculateExpectedRevenue() / roiInputs.greenhouseSize).toLocaleString()}
            </span>
          </div>
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
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">💼 İşletme Maliyetleri</h2>
        <p className="text-gray-600">Aylık ve sezonluk giderlerinizi belirleyin</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genel İşletme Maliyeti (Aylık TL) *
          </label>
          <input
            type="number"
            value={roiInputs.operationalCosts.monthly}
            onChange={(e) => handleInputChange('operationalCosts.monthly', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="8000"
            min="1000"
          />
          <p className="text-xs text-gray-500 mt-1">Genel işletme, bakım, sigorta vb.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Isıtma Maliyeti (Aylık TL) *
          </label>
          <input
            type="number"
            value={roiInputs.operationalCosts.heating}
            onChange={(e) => handleInputChange('operationalCosts.heating', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2000"
            min="0"
          />
          <p className="text-xs text-gray-500 mt-1">Doğalgaz, fuel oil, elektrik ısıtma</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tohum/Fide Maliyeti (Sezonluk TL) *
          </label>
          <input
            type="number"
            value={roiInputs.operationalCosts.seeds}
            onChange={(e) => handleInputChange('operationalCosts.seeds', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="800"
            min="100"
          />
          <p className="text-xs text-gray-500 mt-1">Her sezon için tohum/fide maliyeti</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gübre ve İlaç (Aylık TL) *
          </label>
          <input
            type="number"
            value={roiInputs.operationalCosts.fertilizer}
            onChange={(e) => handleInputChange('operationalCosts.fertilizer', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1200"
            min="200"
          />
          <p className="text-xs text-gray-500 mt-1">Besin çözeltileri, pestisit, fungisit</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İşçilik Maliyeti (Aylık TL) *
          </label>
          <input
            type="number"
            value={roiInputs.operationalCosts.labor}
            onChange={(e) => handleInputChange('operationalCosts.labor', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="3000"
            min="500"
          />
          <p className="text-xs text-gray-500 mt-1">Ekim, bakım, hasat işçiliği</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Elektrik/Su Maliyeti (Aylık TL) *
          </label>
          <input
            type="number"
            value={roiInputs.operationalCosts.utilities}
            onChange={(e) => handleInputChange('operationalCosts.utilities', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1000"
            min="200"
          />
          <p className="text-xs text-gray-500 mt-1">Sulama, aydınlatma, otomasyon</p>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
        <h3 className="font-medium text-red-900 mb-2">📊 Maliyet Özeti</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-red-800">Toplam Aylık:</span>
            <span className="ml-1 font-bold text-red-900">
              ₺{(roiInputs.operationalCosts.monthly + roiInputs.operationalCosts.heating + 
                   roiInputs.operationalCosts.fertilizer + roiInputs.operationalCosts.labor + 
                   roiInputs.operationalCosts.utilities).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-red-800">Toplam Yıllık:</span>
            <span className="ml-1 font-bold text-red-900">
              ₺{calculateTotalAnnualCosts().toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-red-800">m² Başına Yıllık:</span>
            <span className="ml-1 font-bold text-red-900">
              ₺{(calculateTotalAnnualCosts() / roiInputs.greenhouseSize).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Profitability Preview */}
      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h3 className="font-medium text-purple-900 mb-2">🎯 Karlılık Ön Değerlendirme</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-purple-800">Beklenen Yıllık Kar:</span>
            <span className="ml-1 font-bold text-purple-900">
              ₺{(calculateExpectedRevenue() - calculateTotalAnnualCosts()).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-purple-800">Tahmini ROI:</span>
            <span className="ml-1 font-bold text-purple-900">
              %{(((calculateExpectedRevenue() - calculateTotalAnnualCosts()) / roiInputs.initialInvestment) * 100).toFixed(1)}
            </span>
          </div>
        </div>
        <p className="text-xs text-purple-700 mt-2">
          ⚠️ Bu sadece bir ön hesaplama. Detaylı analiz için "ROI Hesapla" butonunu kullanın.
        </p>
      </div>
    </motion.div>
  );

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🎉 ROI Analiz Sonuçları</h2>
        <p className="text-gray-600">Detaylı finansal analiz ve yatırım geri dönüş hesaplamaları</p>
        {reportId && (
          <p className="text-sm text-blue-600 mt-2">Rapor ID: {reportId}</p>
        )}
      </div>

      {roiAnalysis.data && (
        <>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1">ROI</h3>
                  <p className="text-3xl font-bold">%{roiAnalysis.data.analysis.roi}</p>
                  <p className="text-sm opacity-90 mt-1">Yatırım Getirisi</p>
                </div>
                <div className="text-4xl opacity-75">📈</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1">Geri Dönüş</h3>
                  <p className="text-3xl font-bold">{roiAnalysis.data.analysis.paybackPeriod}</p>
                  <p className="text-sm opacity-90 mt-1">Yıl</p>
                </div>
                <div className="text-4xl opacity-75">⏱️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1">NPV</h3>
                  <p className="text-2xl font-bold">₺{roiAnalysis.data.analysis.npv.toLocaleString()}</p>
                  <p className="text-sm opacity-90 mt-1">Net Bugünkü Değer</p>
                </div>
                <div className="text-4xl opacity-75">💰</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1">IRR</h3>
                  <p className="text-3xl font-bold">%{roiAnalysis.data.analysis.irr}</p>
                  <p className="text-sm opacity-90 mt-1">İç Verim Oranı</p>
                </div>
                <div className="text-4xl opacity-75">🎯</div>
              </div>
            </div>
          </div>

          {/* Investment Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">💼 Yatırım Dağılımı</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🏗️</div>
                <p className="text-2xl font-bold text-gray-900">₺{roiAnalysis.data.initialInvestment.construction.toLocaleString()}</p>
                <p className="text-sm text-gray-600">İnşaat</p>
                <p className="text-xs text-blue-600 mt-1">
                  %{((roiAnalysis.data.initialInvestment.construction / roiAnalysis.data.initialInvestment.total) * 100).toFixed(0)}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔧</div>
                <p className="text-2xl font-bold text-gray-900">₺{roiAnalysis.data.initialInvestment.equipment.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Ekipman</p>
                <p className="text-xs text-blue-600 mt-1">
                  %{((roiAnalysis.data.initialInvestment.equipment / roiAnalysis.data.initialInvestment.total) * 100).toFixed(0)}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🤖</div>
                <p className="text-2xl font-bold text-gray-900">₺{roiAnalysis.data.initialInvestment.automation.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Otomasyon</p>
                <p className="text-xs text-blue-600 mt-1">
                  %{((roiAnalysis.data.initialInvestment.automation / roiAnalysis.data.initialInvestment.total) * 100).toFixed(0)}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🛠️</div>
                <p className="text-2xl font-bold text-gray-900">₺{roiAnalysis.data.initialInvestment.infrastructure.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Altyapı</p>
                <p className="text-xs text-blue-600 mt-1">
                  %{((roiAnalysis.data.initialInvestment.infrastructure / roiAnalysis.data.initialInvestment.total) * 100).toFixed(0)}
                </p>
              </div>
              <div className="text-center border-l border-gray-200 pl-6">
                <div className="text-3xl mb-2">💎</div>
                <p className="text-2xl font-bold text-green-600">₺{roiAnalysis.data.initialInvestment.total.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Toplam Yatırım</p>
                <p className="text-xs text-green-600 mt-1">%100</p>
              </div>
            </div>
          </div>

          {/* Revenue & Costs Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Gelir Analizi</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Brüt Gelir (Yıllık)</span>
                  <span className="font-semibold text-green-600">₺{roiAnalysis.data.revenue.grossRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Net Gelir (Yıllık)</span>
                  <span className="font-semibold text-green-600">₺{roiAnalysis.data.revenue.netRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Yıllık Kar</span>
                  <span className="font-semibold text-green-600">₺{roiAnalysis.data.revenue.annualProfit.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium">Kar Marjı</span>
                    <span className="font-bold text-blue-600">
                      %{((roiAnalysis.data.revenue.annualProfit / roiAnalysis.data.revenue.grossRevenue) * 100).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Maliyet Analizi</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Yıllık İşletme</span>
                  <span className="font-semibold text-red-600">₺{roiAnalysis.data.operationalCosts.annual.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Aylık Ortalama</span>
                  <span className="font-semibold text-red-600">₺{roiAnalysis.data.operationalCosts.monthly.toLocaleString()}</span>
                </div>
                {Object.entries(roiAnalysis.data.operationalCosts.breakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 capitalize">{key}</span>
                    <span className="text-gray-700">₺{value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 AI Önerileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roiAnalysis.data.recommendations.map((rec, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  rec.priority === 'high' ? 'border-red-500 bg-red-50' : 
                  rec.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' : 
                  'border-green-500 bg-green-50'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      rec.priority === 'high' ? 'bg-red-500' : 
                      rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{rec.category}</h4>
                      <p className="text-gray-700 text-sm mb-2">{rec.suggestion}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600 font-medium">
                          💰 ₺{rec.potentialSaving.toLocaleString()} tasarruf
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-700' : 
                          rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-green-100 text-green-700'
                        }`}>
                          {rec.priority === 'high' ? 'Yüksek' : rec.priority === 'medium' ? 'Orta' : 'Düşük'} öncelik
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          {roiAnalysis.data.riskAssessment && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Risk Değerlendirmesi</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Risk Faktörleri</h4>
                  <div className="space-y-2">
                    {roiAnalysis.data.riskAssessment.factors.map((factor, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-red-500">⚠️</span>
                        <span className="text-gray-700 text-sm">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Risk Azaltma Önerileri</h4>
                  <div className="space-y-2">
                    {roiAnalysis.data.riskAssessment.mitigation.map((strategy, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-green-500">✅</span>
                        <span className="text-gray-700 text-sm">{strategy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Genel Risk Seviyesi</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    roiAnalysis.data.riskAssessment.overallRisk === 'high' ? 'bg-red-100 text-red-700' :
                    roiAnalysis.data.riskAssessment.overallRisk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {roiAnalysis.data.riskAssessment.overallRisk === 'high' ? 'Yüksek Risk' :
                     roiAnalysis.data.riskAssessment.overallRisk === 'medium' ? 'Orta Risk' :
                     'Düşük Risk'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <button
              onClick={handleGeneratePDF}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <span className="mr-2">📄</span>
              PDF Rapor İndir
            </button>
            <button
              onClick={() => {
                setCurrentStep(1);
                setResults(null);
                setReportId(null);
                setError('');
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <span className="mr-2">🔄</span>
              Yeni Analiz Yap
            </button>
            <a
              href="/dashboard/ai-chat"
              className="bg-green-100 hover:bg-green-200 text-green-700 px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <span className="mr-2">💬</span>
              AI ile Yorumla
            </a>
          </div>
        </>
      )}
    </motion.div>
  );

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Sera Özellikleri';
      case 2: return 'Ürün Bilgileri';
      case 3: return 'Maliyet Analizi';
      case 4: return 'Sonuçlar';
      default: return '';
    }
  };

  return (
    <DashboardLayout 
      title="ROI Analizi" 
      subtitle="Sera yatırımınızın geri dönüş süresini ve karlılığını analiz edin"
      requiresTokens={currentStep < 4}
    >
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📊 ROI Simülasyonu
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sera yatırımınızın finansal analizini yapın, geri dönüş süresini hesaplayın ve 
            AI destekli öneriler alın
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  currentStep >= stepNumber 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber === 4 ? '📊' : stepNumber}
                  {currentStep === stepNumber && (
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping"></div>
                  )}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    currentStep > stepNumber ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Indicator */}
        <div className="text-center">
          <span className="text-sm font-medium text-blue-600">
            Adım {currentStep}/4: {getStepTitle(currentStep)}
          </span>
        </div>

        {/* Token Warning */}
        {currentStep < 4 && !hasTokens(1) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-yellow-600 mr-2">⚠️</span>
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Token Gerekli</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  ROI analizi yapmak için en az 1 token gerekiyor.
                </p>
              </div>
              <a
                href="/dashboard/tokens"
                className="ml-auto px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700"
              >
                Token Al
              </a>
            </div>
          </div>
        )}

        {/* Error Display */}
        {roiAnalysis.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-red-600 mr-2">❌</span>
              <p className="text-red-600">{roiAnalysis.error}</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderResults()}
        </div>

        {/* Navigation */}
        {currentStep < 4 && (
          <div className="flex justify-between items-center">
            <button
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 flex items-center"
            >
              <span className="mr-2">←</span>
              Önceki
            </button>

            {currentStep === 3 ? (
              <button
                onClick={handleCalculateROI}
                disabled={roiAnalysis.loading || !hasTokens(2)}
                className="relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                    </svg>
                    Hesaplanıyor...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🚀</span>
                    ROI Hesapla (~1 Token)
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium transition-colors hover:bg-blue-600 flex items-center"
              >
                Sonraki
                <span className="ml-2">→</span>
              </button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
