'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface AnalysisFormData {
  type: 'roi';
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
  const { user, loading, signOut } = useAuth();
  const [formData, setFormData] = useState<AnalysisFormData>({
    type: 'roi',
    location: { city: '' },
    cropType: '',
    greenhouseSize: 0,
    investment: { total: 0, equipment: 0, construction: 0 },
    targetProduction: 0,
    operationPeriod: 5
  });
  const [preview, setPreview] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const cities = [
    'Antalya', 'Mersin', 'Adana', 'İzmir', 'Muğla', 'Aydın',
    'Manisa', 'Ankara', 'Konya', 'İstanbul', 'Bursa', 'Sakarya'
  ];

  const cropTypes = [
    'Domates', 'Biber', 'Patlıcan', 'Salatalık', 'Çilek',
    'Marul', 'Roka', 'Maydanoz', 'Fesleğen', 'Çiçek'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof AnalysisFormData],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const generatePreview = async () => {
    try {
      const response = await fetch('/api/analysis/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user?.getIdToken()}`
        },
        body: JSON.stringify({ type: 'roi', data: formData })
      });

      if (!response.ok) {
        throw new Error('Preview generation failed');
      }

      const previewData = await response.json();
      setPreview(previewData);
    } catch (error) {
      console.error('Preview generation failed:', error);
      alert('Önizleme oluşturulamadı. Lütfen tekrar deneyin.');
    }
  };

  const startAnalysis = async () => {
    if (!user) {
      alert('Analiz yapmak için giriş yapmanız gerekiyor');
      return;
    }

    try {
      setIsAnalyzing(true);
      
      const response = await fetch('/api/analysis/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Analysis creation failed');
      }

      const result = await response.json();
      
      if (result.success) {
        alert('Analiz başlatıldı! Sonuçları Analizlerim sayfasından takip edebilirsiniz.');
        window.location.href = '/dashboard/analysis';
      } else {
        throw new Error(result.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analiz başlatılamadı. Lütfen tekrar deneyin.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isFormValid = () => {
    return formData.location.city &&
           formData.cropType &&
           formData.greenhouseSize > 0 &&
           formData.investment.total > 0 &&
           formData.targetProduction > 0;
  };

  if (loading) {
    return (
      <DashboardLayout user={user} signOut={signOut}>
        <div className="p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user} signOut={signOut}>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#1e3237' }}>
              ROI Analizi
            </h1>
            <p className="text-gray-600">
              Sera yatırımınızın karlılığını ve geri dönüş süresini analiz edin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#1e3237' }}>
                Analiz Parametreleri
              </h2>

              <div className="space-y-6">
                {/* Lokasyon */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Şehir
                  </label>
                  <select
                    value={formData.location.city}
                    onChange={(e) => handleInputChange('location.city', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Şehir seçin</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Ürün Türü */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Ürün Türü
                  </label>
                  <select
                    value={formData.cropType}
                    onChange={(e) => handleInputChange('cropType', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Ürün türü seçin</option>
                    {cropTypes.map(crop => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>

                {/* Sera Büyüklüğü */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Sera Büyüklüğü (m²)
                  </label>
                  <input
                    type="number"
                    value={formData.greenhouseSize}
                    onChange={(e) => handleInputChange('greenhouseSize', Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Örn: 1000"
                  />
                </div>

                {/* Yatırım Tutarları */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Toplam Yatırım (₺)
                  </label>
                  <input
                    type="number"
                    value={formData.investment.total}
                    onChange={(e) => handleInputChange('investment.total', Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Örn: 500000"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Ekipman (₺)
                    </label>
                    <input
                      type="number"
                      value={formData.investment.equipment}
                      onChange={(e) => handleInputChange('investment.equipment', Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      İnşaat (₺)
                    </label>
                    <input
                      type="number"
                      value={formData.investment.construction}
                      onChange={(e) => handleInputChange('investment.construction', Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Hedef Üretim */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Hedef Üretim (kg/yıl)
                  </label>
                  <input
                    type="number"
                    value={formData.targetProduction}
                    onChange={(e) => handleInputChange('targetProduction', Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Örn: 100000"
                  />
                </div>

                {/* Analiz Süresi */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Analiz Süresi (yıl)
                  </label>
                  <select
                    value={formData.operationPeriod}
                    onChange={(e) => handleInputChange('operationPeriod', Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={3}>3 yıl</option>
                    <option value={5}>5 yıl</option>
                    <option value={10}>10 yıl</option>
                    <option value={15}>15 yıl</option>
                  </select>
                </div>

                {/* Butonlar */}
                <div className="flex space-x-4">
                  <button
                    onClick={generatePreview}
                    disabled={!isFormValid()}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                      isFormValid()
                        ? 'hover:opacity-90'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                  >
                    📊 Önizleme
                  </button>
                  <button
                    onClick={startAnalysis}
                    disabled={!isFormValid() || isAnalyzing}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                      isFormValid() && !isAnalyzing
                        ? 'hover:opacity-90'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    {isAnalyzing ? '⏳ Analiz Ediliyor...' : '🚀 Analizi Başlat'}
                  </button>
                </div>
              </div>
            </div>

            {/* Önizleme */}
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#1e3237' }}>
                Analiz Önizleme
              </h2>

              {preview ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                    <h3 className="font-semibold mb-2" style={{ color: '#1e3237' }}>
                      Temel Bilgiler
                    </h3>
                    <div className="text-sm space-y-1">
                      <p><strong>Lokasyon:</strong> {formData.location.city}</p>
                      <p><strong>Ürün:</strong> {formData.cropType}</p>
                      <p><strong>Alan:</strong> {formData.greenhouseSize.toLocaleString()} m²</p>
                      <p><strong>Yatırım:</strong> ₺{formData.investment.total.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                    <h3 className="font-semibold mb-2" style={{ color: '#1e3237' }}>
                      Ön Hesaplamalar
                    </h3>
                    <div className="text-sm space-y-1">
                      <p><strong>Tahmini ROI:</strong> {preview.estimatedROI || 'Hesaplanıyor...'}%</p>
                      <p><strong>Geri Ödeme Süresi:</strong> {preview.paybackPeriod || 'Hesaplanıyor...'} yıl</p>
                      <p><strong>Yıllık Gelir:</strong> ₺{preview.annualRevenue?.toLocaleString() || 'Hesaplanıyor...'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-600">
                    Parametreleri doldurun ve önizleme için butona tıklayın
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
