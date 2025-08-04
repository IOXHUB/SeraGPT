'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { equipmentService, EquipmentRecommendation, EquipmentPackage } from '@/lib/services/equipment-service';

export default function EquipmentAnalysisPage() {
  const [currentView, setCurrentView] = useState<'recommendations' | 'packages'>('recommendations');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<EquipmentRecommendation[] | null>(null);
  const [packages, setPackages] = useState<EquipmentPackage[] | null>(null);
  const [error, setError] = useState<string>('');

  const [specs, setSpecs] = useState({
    area: 600,
    type: 'polycarbonate',
    location: 'Antalya',
    budget: 150000,
    cropType: 'domates',
    automationLevel: 'intermediate' as const
  });

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await equipmentService.getEquipmentRecommendations(specs);
      
      if (response.success && response.data) {
        setRecommendations(response.data);
      } else {
        setError(response.error || 'Ekipman önerileri alınamadı');
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleGetPackages = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await equipmentService.getEquipmentPackages(specs);
      
      if (response.success && response.data) {
        setPackages(response.data);
      } else {
        setError(response.error || 'Ekipman paketleri alınamadı');
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential': return 'bg-red-100 text-red-800 border-red-200';
      case 'recommended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'optional': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'essential': return 'Zorunlu';
      case 'recommended': return 'Önerilen';
      case 'optional': return 'İsteğe Bağlı';
      default: return priority;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'complex': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getComplexityText = (complexity: string) => {
    switch (complexity) {
      case 'easy': return 'Kolay';
      case 'medium': return 'Orta';
      case 'complex': return 'Karmaşık';
      default: return complexity;
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Ekipman Listesi</h1>
            <p className="text-gray-600 mt-1">Sera projeniz için mühendis onaylı ekipman önerileri</p>
          </motion.div>

          {/* Specs Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sera Özellikleri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sera Alanı (m²)
                </label>
                <input
                  type="number"
                  value={specs.area}
                  onChange={(e) => setSpecs({...specs, area: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bütçe (TL)
                </label>
                <input
                  type="number"
                  value={specs.budget}
                  onChange={(e) => setSpecs({...specs, budget: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ürün Tipi
                </label>
                <select
                  value={specs.cropType}
                  onChange={(e) => setSpecs({...specs, cropType: e.target.value})}
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
                  Otomasyon Seviyesi
                </label>
                <select
                  value={specs.automationLevel}
                  onChange={(e) => setSpecs({...specs, automationLevel: e.target.value as any})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="basic">Temel</option>
                  <option value="intermediate">Orta</option>
                  <option value="advanced">İleri</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasyon
                </label>
                <select
                  value={specs.location}
                  onChange={(e) => setSpecs({...specs, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="Antalya">Antalya</option>
                  <option value="Mersin">Mersin</option>
                  <option value="İzmir">İzmir</option>
                  <option value="Muğla">Muğla</option>
                  <option value="Adana">Adana</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </motion.div>

          {/* View Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center space-x-4"
          >
            <button
              onClick={() => {
                setCurrentView('recommendations');
                handleGetRecommendations();
              }}
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'recommendations'
                  ? 'bg-gray-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              } disabled:opacity-50`}
            >
              {loading && currentView === 'recommendations' ? 'Analiz Ediliyor...' : 'Kategori Bazlı Öneriler'}
            </button>
            
            <button
              onClick={() => {
                setCurrentView('packages');
                handleGetPackages();
              }}
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'packages'
                  ? 'bg-gray-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              } disabled:opacity-50`}
            >
              {loading && currentView === 'packages' ? 'Paketler Hazırlanıyor...' : 'Hazır Paketler'}
            </button>
          </motion.div>

          {/* Recommendations View */}
          {currentView === 'recommendations' && recommendations && (
            <div className="space-y-6">
              {recommendations.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(category.priority)}`}>
                        {getPriorityText(category.priority)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₺{category.totalCost.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{category.items.length} seçenek</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{category.reasoning}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.brand} - {item.model}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">₺{item.price.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{item.currency}</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Kurulum:</span>
                            <span className={getComplexityColor(item.installationComplexity)}>
                              {getComplexityText(item.installationComplexity)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Bakım:</span>
                            <span className={getComplexityColor(item.maintenanceLevel)}>
                              {getComplexityText(item.maintenanceLevel)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Enerji:</span>
                            <span className="font-medium text-green-600">{item.energyRating}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Özellikler:</p>
                          <div className="flex flex-wrap gap-1">
                            {item.features.slice(0, 3).map((feature, i) => (
                              <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="font-medium text-green-700 mb-1">Artıları:</p>
                            <ul className="text-green-600 space-y-1">
                              {item.pros.slice(0, 2).map((pro, i) => (
                                <li key={i}>• {pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-red-700 mb-1">Eksileri:</p>
                            <ul className="text-red-600 space-y-1">
                              {item.cons.slice(0, 2).map((con, i) => (
                                <li key={i}>• {con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-600">
                            <strong>Tedarikçi:</strong> {item.supplierInfo.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            <strong>Teslimat:</strong> {item.supplierInfo.deliveryTime}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {category.alternatives.length > 0 && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Alternatif Çözümler:</p>
                      <p className="text-sm text-gray-600">
                        {category.alternatives.join(', ')}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Total Summary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl text-white p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Toplam Özet</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-3xl font-bold">
                      ₺{recommendations.reduce((sum, cat) => sum + cat.totalCost, 0).toLocaleString()}
                    </p>
                    <p className="text-gray-300">Toplam Ekipman Maliyeti</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">
                      {recommendations.filter(cat => cat.priority === 'essential').length}
                    </p>
                    <p className="text-gray-300">Zorunlu Kategori</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">
                      {recommendations.reduce((sum, cat) => sum + cat.items.length, 0)}
                    </p>
                    <p className="text-gray-300">Toplam Ürün Seçeneği</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Packages View */}
          {currentView === 'packages' && packages && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-3xl font-bold text-gray-900">₺{pkg.totalCost.toLocaleString()}</p>
                      <p className="text-sm text-green-600">%{pkg.savings} tasarruf</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Uygun olduğu:</p>
                      <p className="text-sm text-gray-600">{pkg.suitableFor.greenhouseSize} sera</p>
                      <p className="text-sm text-gray-600">{pkg.suitableFor.cropType} üretim</p>
                      <p className="text-sm text-gray-600">{pkg.suitableFor.budget} bütçe</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Zaman Çizelgesi:</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Planlama:</span>
                          <span>{pkg.timeline.planning}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Tedarik:</span>
                          <span>{pkg.timeline.procurement}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Kurulum:</span>
                          <span>{pkg.timeline.installation}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Devreye alma:</span>
                          <span>{pkg.timeline.commissioning}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Dahil edilen kategoriler:</p>
                    <div className="space-y-1">
                      {pkg.categories.map((cat, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>{cat.category}</span>
                          <span className="font-medium">₺{cat.totalCost.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Paketi Seç
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Data State */}
          {!loading && !recommendations && !packages && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center"
            >
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ekipman Analizi Başlatın</h3>
              <p className="text-gray-600">
                Sera özelliklerinizi girin ve analiz butonuna tıklayarak 
                mühendis onaylı ekipman önerilerini görüntüleyin.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
