'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export const dynamic = 'force-dynamic';

export default function ROIAnalysisPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(2);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ROI Simülasyonu</h1>
          <p className="text-gray-600 mt-1">Sera yatırımı geri dönüş analizi</p>
        </div>

        {currentStep === 1 && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Sera Bilgileri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konum
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="antalya">Antalya</option>
                  <option value="mersin">Mersin</option>
                  <option value="adana">Adana</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sera Boyutu (m²)
                </label>
                <input
                  type="number"
                  defaultValue={600}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ürün Tipi
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="domates">Domates</option>
                  <option value="salatalik">Salatalık</option>
                  <option value="biber">Biber</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlangıç Yatırımı (₺)
                </label>
                <input
                  type="number"
                  defaultValue={500000}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg"
              >
                {loading ? 'Analiz Ediliyor...' : 'Analizi Başlat'}
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">ROI Analiz Sonuçları</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-green-600 text-sm font-medium">ROI</div>
                <div className="text-2xl font-bold text-green-900">%45.6</div>
                <div className="text-green-600 text-sm">Yıllık getiri</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-blue-600 text-sm font-medium">Geri Ödeme</div>
                <div className="text-2xl font-bold text-blue-900">2.2 yıl</div>
                <div className="text-blue-600 text-sm">Süre</div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-purple-600 text-sm font-medium">Net Kar</div>
                <div className="text-2xl font-bold text-purple-900">₺228,000</div>
                <div className="text-purple-600 text-sm">Yıllık</div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
              >
                Yeni Analiz
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
