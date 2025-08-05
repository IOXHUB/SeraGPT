'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { layoutService, LayoutSpecs, Layout2D, LayoutAnalysis } from '@/lib/services/layout-service';

export default function LayoutPlanningPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [layout2D, setLayout2D] = useState<Layout2D | null>(null);
  const [analysis, setAnalysis] = useState<LayoutAnalysis | null>(null);
  const [error, setError] = useState<string>('');

  const [specs, setSpecs] = useState<LayoutSpecs>({
    area: {
      length: 30,
      width: 20,
      totalArea: 600
    },
    constraints: {
      entryPoints: 2,
      utilityConnections: ['electricity', 'water'],
      accessPaths: true,
      drainageSlope: 2,
      windDirection: 'north',
      sunExposure: 'south'
    },
    requirements: {
      cropType: 'domates',
      plantingDensity: 4,
      walkwayWidth: 1.2,
      workAreaPercentage: 10,
      storageAreaRequired: true,
      automationLevel: 'intermediate'
    },
    preferences: {
      layoutStyle: 'modern',
      accessibility: true,
      futureExpansion: true,
      energyEfficiency: true
    }
  });

  // Update total area when length/width changes
  const updateArea = (field: 'length' | 'width', value: number) => {
    const newArea = { ...specs.area, [field]: value };
    newArea.totalArea = newArea.length * newArea.width;
    setSpecs({ ...specs, area: newArea });
  };

  const handleGenerateLayout = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await layoutService.generateLayout2D(specs);
      
      if (response.success && response.data) {
        setLayout2D(response.data);
        
        // Also generate analysis
        const analysisResponse = await layoutService.analyzeLayout(response.data);
        if (analysisResponse.success && analysisResponse.data) {
          setAnalysis(analysisResponse.data);
        }
        
        setCurrentStep(2);
      } else {
        setError(response.error || 'Layout oluşturulamadı');
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleOptimizeLayout = async (optimizationType: 'space' | 'cost' | 'efficiency' | 'accessibility') => {
    if (!layout2D) return;
    
    setLoading(true);
    
    try {
      const response = await layoutService.optimizeLayout(layout2D, optimizationType);
      
      if (response.success && response.data) {
        setLayout2D(response.data);
        
        // Re-analyze optimized layout
        const analysisResponse = await layoutService.analyzeLayout(response.data);
        if (analysisResponse.success && analysisResponse.data) {
          setAnalysis(analysisResponse.data);
        }
      } else {
        setError(response.error || 'Optimizasyon başarısız');
      }
    } catch (err) {
      setError('Optimizasyon sırasında hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const renderLayoutVisualization = (layout: Layout2D) => {
    const scale = 400 / Math.max(layout.dimensions.length, layout.dimensions.width);
    
    return (
      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mx-auto" style={{ width: '420px', height: '420px' }}>
        <svg width="400" height="400" viewBox={`0 0 ${layout.dimensions.width * scale} ${layout.dimensions.length * scale}`}>
          {/* Background */}
          <rect 
            width={layout.dimensions.width * scale} 
            height={layout.dimensions.length * scale} 
            fill="#f9fafb" 
            stroke="#e5e7eb" 
            strokeWidth="2"
          />
          
          {/* Layout elements */}
          {layout.elements.map((element) => {
            const x = element.coordinates.x * scale;
            const y = element.coordinates.y * scale;
            const width = element.coordinates.width * scale;
            const height = element.coordinates.height * scale;
            
            let fill = '#e5e7eb';
            let stroke = '#9ca3af';
            
            switch (element.type) {
              case 'growing_bed':
                fill = '#d1fae5';
                stroke = '#10b981';
                break;
              case 'walkway':
                fill = '#f3f4f6';
                stroke = '#6b7280';
                break;
              case 'work_area':
                fill = '#dbeafe';
                stroke = '#3b82f6';
                break;
              case 'storage':
                fill = '#fef3c7';
                stroke = '#f59e0b';
                break;
              case 'equipment':
                fill = '#e0e7ff';
                stroke = '#6366f1';
                break;
            }
            
            return (
              <g key={element.id}>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="1"
                />
                {width > 20 && height > 20 && (
                  <text
                    x={x + width/2}
                    y={y + height/2}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#374151"
                    dominantBaseline="middle"
                  >
                    {element.name.split(' ')[0]}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Dimensions */}
          <text x="10" y="15" fontSize="10" fill="#6b7280">
            {layout.dimensions.width}m × {layout.dimensions.length}m
          </text>
        </svg>
        
        {/* Legend */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-200 border border-green-500 rounded"></div>
            <span>Yetiştirme</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-200 border border-gray-500 rounded"></div>
            <span>Geçit</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-200 border border-blue-500 rounded"></div>
            <span>Çalışma</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-200 border border-yellow-500 rounded"></div>
            <span>Depo</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-indigo-200 border border-indigo-500 rounded"></div>
            <span>Ekipman</span>
          </div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Sera Parametreleri</h2>
      
      {/* Area Configuration */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">Alan Boyutları</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Uzunluk (metre)
            </label>
            <input
              type="number"
              value={specs.area.length}
              onChange={(e) => updateArea('length', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genişlik (metre)
            </label>
            <input
              type="number"
              value={specs.area.width}
              onChange={(e) => updateArea('width', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Toplam Alan (m²)
            </label>
            <input
              type="number"
              value={specs.area.totalArea}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">Üretim Gereksinimleri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ürün Tipi
            </label>
            <select
              value={specs.requirements.cropType}
              onChange={(e) => setSpecs({
                ...specs,
                requirements: { ...specs.requirements, cropType: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="domates">Domates</option>
              <option value="salatalik">Salatalık</option>
              <option value="biber">Biber</option>
              <option value="patlican">Patlıcan</option>
              <option value="çilek">Çilek</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bitki Yoğunluğu (bitki/m²)
            </label>
            <input
              type="number"
              value={specs.requirements.plantingDensity}
              onChange={(e) => setSpecs({
                ...specs,
                requirements: { ...specs.requirements, plantingDensity: parseFloat(e.target.value) || 0 }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geçit Genişliği (metre)
            </label>
            <input
              type="number"
              step="0.1"
              value={specs.requirements.walkwayWidth}
              onChange={(e) => setSpecs({
                ...specs,
                requirements: { ...specs.requirements, walkwayWidth: parseFloat(e.target.value) || 0 }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Otomasyon Seviyesi
            </label>
            <select
              value={specs.requirements.automationLevel}
              onChange={(e) => setSpecs({
                ...specs,
                requirements: { ...specs.requirements, automationLevel: e.target.value as any }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="basic">Temel</option>
              <option value="intermediate">Orta</option>
              <option value="advanced">İleri</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={specs.requirements.storageAreaRequired}
              onChange={(e) => setSpecs({
                ...specs,
                requirements: { ...specs.requirements, storageAreaRequired: e.target.checked }
              })}
              className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
            />
            <span className="ml-2 text-sm text-gray-700">Depolama alanı gerekli</span>
          </label>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">Tercihler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Layout Stili
            </label>
            <select
              value={specs.preferences.layoutStyle}
              onChange={(e) => setSpecs({
                ...specs,
                preferences: { ...specs.preferences, layoutStyle: e.target.value as any }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="traditional">Geleneksel</option>
              <option value="modern">Modern</option>
              <option value="hydroponic">Hidroponik</option>
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={specs.preferences.accessibility}
              onChange={(e) => setSpecs({
                ...specs,
                preferences: { ...specs.preferences, accessibility: e.target.checked }
              })}
              className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
            />
            <span className="ml-2 text-sm text-gray-700">Erişilebilirlik öncelikli</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={specs.preferences.futureExpansion}
              onChange={(e) => setSpecs({
                ...specs,
                preferences: { ...specs.preferences, futureExpansion: e.target.checked }
              })}
              className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
            />
            <span className="ml-2 text-sm text-gray-700">Gelecekte genişleme planı</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={specs.preferences.energyEfficiency}
              onChange={(e) => setSpecs({
                ...specs,
                preferences: { ...specs.preferences, energyEfficiency: e.target.checked }
              })}
              className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
            />
            <span className="ml-2 text-sm text-gray-700">Enerji verimliliği</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleGenerateLayout}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Layout Oluşturuluyor...' : 'Layout Oluştur'}
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => {
    if (!layout2D || !analysis) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Layout Sonuçları</h2>
          <button
            onClick={() => setCurrentStep(1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Parametreleri Düzenle
          </button>
        </div>

        {/* Layout Visualization */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">2D Layout Görünümü</h3>
          <div className="flex justify-center">
            {renderLayoutVisualization(layout2D)}
          </div>
        </div>

        {/* Layout Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Layout Bilgileri</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Toplam Alan:</span>
                <span className="font-medium">{layout2D.dimensions.totalArea} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kullanılabilir Alan:</span>
                <span className="font-medium">{layout2D.dimensions.usableArea.toFixed(1)} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alan Verimliliği:</span>
                <span className="font-medium">%{layout2D.efficiency.spaceUtilization.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bitki Kapasitesi:</span>
                <span className="font-medium">{layout2D.efficiency.plantCapacity.toLocaleString()} bitki</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Geçit Oranı:</span>
                <span className="font-medium">%{layout2D.efficiency.walkwayRatio.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verimlilik Analizi</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Genel Puan</span>
                  <span className="text-sm font-medium">{analysis.efficiency.score.toFixed(0)}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${analysis.efficiency.score}%` }}
                  ></div>
                </div>
              </div>
              
              {Object.entries(analysis.efficiency.factors).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 capitalize">
                      {key === 'spaceUtilization' ? 'Alan Kullanımı' :
                       key === 'accessibility' ? 'Erişilebilirlik' :
                       key === 'workflow' ? 'İş Akışı' :
                       key === 'maintenance' ? 'Bakım' :
                       key === 'expansion' ? 'Genişleme' : key}
                    </span>
                    <span className="text-sm font-medium">{value.toFixed(0)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optimization Options */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimizasyon Seçenekleri</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => handleOptimizeLayout('space')}
              disabled={loading}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📏</div>
                <div className="font-medium text-gray-900">Alan Optimizasyonu</div>
                <div className="text-sm text-gray-600">Kullanılabilir alanı artır</div>
              </div>
            </button>

            <button
              onClick={() => handleOptimizeLayout('cost')}
              disabled={loading}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="font-medium text-gray-900">Maliyet Optimizasyonu</div>
                <div className="text-sm text-gray-600">İnşaat maliyetini düşür</div>
              </div>
            </button>

            <button
              onClick={() => handleOptimizeLayout('efficiency')}
              disabled={loading}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-medium text-gray-900">Verimlilik Optimizasyonu</div>
                <div className="text-sm text-gray-600">Genel performansı artır</div>
              </div>
            </button>

            <button
              onClick={() => handleOptimizeLayout('accessibility')}
              disabled={loading}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🚶</div>
                <div className="font-medium text-gray-900">Erişilebilirlik</div>
                <div className="text-sm text-gray-600">Geçit düzenini iyileştir</div>
              </div>
            </button>
          </div>
        </div>

        {/* Recommendations and Warnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {layout2D.recommendations.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Öneriler</h3>
              <ul className="space-y-2">
                {layout2D.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {layout2D.warnings.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Uyarılar</h3>
              <ul className="space-y-2">
                {layout2D.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">⚠</span>
                    <span className="text-gray-700">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Maliyet Analizi</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">₺{analysis.costs.construction.toLocaleString()}</p>
              <p className="text-sm text-gray-600">İnşaat</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">₺{analysis.costs.equipment.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Ekipman</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">₺{analysis.costs.installation.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Kurulum</p>
            </div>
            <div className="text-center border-l border-gray-200">
              <p className="text-2xl font-bold text-green-600">₺{analysis.costs.total.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Toplam</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Layout Planlama</h1>
            <p className="text-gray-600 mt-1">2D/3D sera layout tasarımı ve CAD AI Tools entegrasyonu</p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 2 && (
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
