'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface AnalysisType {
  id: string;
  name: string;
  description: string;
  category: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  isActive: boolean;
  parameters: AnalysisParameter[];
  version: string;
  lastModified: string;
  usage: number;
  accuracy: number;
}

interface AnalysisParameter {
  id: string;
  name: string;
  type: 'number' | 'text' | 'select' | 'boolean' | 'file';
  required: boolean;
  defaultValue?: any;
  options?: string[];
  description: string;
}

export default function AnalysisEditorPage() {
  const { user, isAdmin, loading } = useAuth();
  const [analysisTypes, setAnalysisTypes] = useState<AnalysisType[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisType | null>(null);
  const [editingAnalysis, setEditingAnalysis] = useState<AnalysisType | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testingAnalysis, setTestingAnalysis] = useState<AnalysisType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dataLoading, setDataLoading] = useState(true);
  const [newAnalysis, setNewAnalysis] = useState({
    name: '',
    description: '',
    category: 'roi' as 'roi' | 'climate' | 'equipment' | 'market' | 'layout'
  });

  const categories = [
    { id: 'all', title: 'Tümü', icon: '📊' },
    { id: 'roi', title: 'ROI Analizi', icon: '💰' },
    { id: 'climate', title: 'İklim Analizi', icon: '🌤️' },
    { id: 'equipment', title: 'Ekipman Analizi', icon: '🔧' },
    { id: 'market', title: 'Pazar Analizi', icon: '📈' },
    { id: 'layout', title: 'Layout Analizi', icon: '📐' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadAnalysisTypes();
    }
  }, [user, loading]);

  const loadAnalysisTypes = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAnalysisTypes: AnalysisType[] = [
        {
          id: 'roi-basic',
          name: 'Temel ROI Analizi',
          description: 'Sera yatırımı geri dönüş süresini hesaplar',
          category: 'roi',
          isActive: true,
          version: '2.1.0',
          lastModified: '2024-03-10',
          usage: 1245,
          accuracy: 94.2,
          parameters: [
            {
              id: 'investment-amount',
              name: 'Yatırım Tutarı',
              type: 'number',
              required: true,
              description: 'Toplam sera yatırım maliyeti (TL)'
            },
            {
              id: 'expected-yield',
              name: 'Beklenen Verim',
              type: 'number',
              required: true,
              description: 'Yıllık beklenen verim (kg/m²)'
            },
            {
              id: 'product-price',
              name: 'Ürün Fiyatı',
              type: 'number',
              required: true,
              description: 'Kilogram başına satış fiyatı (TL)'
            },
            {
              id: 'operating-costs',
              name: 'İşletme Maliyetleri',
              type: 'number',
              required: true,
              description: 'Yıllık işletme maliyetleri (TL)'
            }
          ]
        },
        {
          id: 'climate-advanced',
          name: 'Gelişmiş İklim Analizi',
          description: 'Detaylı iklim verileri ve öngörüleri',
          category: 'climate',
          isActive: true,
          version: '1.8.3',
          lastModified: '2024-03-08',
          usage: 892,
          accuracy: 91.8,
          parameters: [
            {
              id: 'location',
              name: 'Konum',
              type: 'text',
              required: true,
              description: 'Sera konumu (il, ilçe)'
            },
            {
              id: 'analysis-period',
              name: 'Analiz Dönemi',
              type: 'select',
              required: true,
              options: ['1 yıl', '3 yıl', '5 yıl', '10 yıl'],
              defaultValue: '3 yıl',
              description: 'İklim analizi yapılacak dönem'
            },
            {
              id: 'climate-factors',
              name: 'İklim Faktörleri',
              type: 'select',
              required: true,
              options: ['Sıcaklık', 'Nem', 'Yağış', 'Rüzgar', 'Tümü'],
              defaultValue: 'Tümü',
              description: 'Analiz edilecek iklim faktörleri'
            }
          ]
        },
        {
          id: 'equipment-optimizer',
          name: 'Ekipman Optimizasyon Analizi',
          description: 'En uygun ekipman kombinasyonunu belirler',
          category: 'equipment',
          isActive: true,
          version: '1.5.2',
          lastModified: '2024-03-05',
          usage: 567,
          accuracy: 88.5,
          parameters: [
            {
              id: 'greenhouse-size',
              name: 'Sera Boyutu',
              type: 'number',
              required: true,
              description: 'Sera alanı (m²)'
            },
            {
              id: 'crop-type',
              name: 'Ürün Tipi',
              type: 'select',
              required: true,
              options: ['Domates', 'Salatalık', 'Biber', 'Patlıcan', 'Diğer'],
              description: 'Yetiştirilen ürün türü'
            },
            {
              id: 'budget-limit',
              name: 'Bütçe Limiti',
              type: 'number',
              required: false,
              description: 'Ekipman için maksimum bütçe (TL)'
            },
            {
              id: 'automation-level',
              name: 'Otomasyon Seviyesi',
              type: 'select',
              required: true,
              options: ['Temel', 'Orta', 'İleri', 'Tam Otomatik'],
              defaultValue: 'Orta',
              description: 'İstenen otomasyon seviyesi'
            }
          ]
        },
        {
          id: 'market-trend',
          name: 'Pazar Trend Analizi',
          description: 'Ürün pazar trendlerini ve fiyat tahminlerini analiz eder',
          category: 'market',
          isActive: true,
          version: '2.0.1',
          lastModified: '2024-03-12',
          usage: 434,
          accuracy: 92.3,
          parameters: [
            {
              id: 'product-category',
              name: 'Ürün Kategorisi',
              type: 'select',
              required: true,
              options: ['Sebze', 'Meyve', 'Çiçek', 'Fide'],
              description: 'Analiz edilecek ürün kategorisi'
            },
            {
              id: 'market-region',
              name: 'Pazar Bölgesi',
              type: 'select',
              required: true,
              options: ['Yerel', 'Bölgesel', 'Ulusal', 'İhracat'],
              defaultValue: 'Bölgesel',
              description: 'Hedef pazar bölgesi'
            },
            {
              id: 'forecast-period',
              name: 'Tahmin Dönemi',
              type: 'select',
              required: true,
              options: ['3 ay', '6 ay', '1 yıl', '2 yıl'],
              defaultValue: '1 yıl',
              description: 'Fiyat tahmini dönemi'
            }
          ]
        },
        {
          id: 'layout-optimizer',
          name: 'Sera Layout Optimizasyonu',
          description: 'Sera iç mekan düzenlemesini optimize eder',
          category: 'layout',
          isActive: false,
          version: '1.2.0',
          lastModified: '2024-03-01',
          usage: 298,
          accuracy: 89.7,
          parameters: [
            {
              id: 'greenhouse-dimensions',
              name: 'Sera Ölçüleri',
              type: 'text',
              required: true,
              description: 'En x Boy x Yükseklik (metre)'
            },
            {
              id: 'production-goal',
              name: 'Üretim Hedefi',
              type: 'select',
              required: true,
              options: ['Maksimum Verim', 'Maliyet Optimizasyonu', 'Kalite Odaklı', 'Karma'],
              defaultValue: 'Maksimum Verim',
              description: 'Öncelikli üretim hedefi'
            },
            {
              id: 'include-automation',
              name: 'Otomasyon Dahil Et',
              type: 'boolean',
              required: false,
              defaultValue: true,
              description: 'Layout planında otomasyon sistemlerini dahil et'
            }
          ]
        }
      ];
      
      setAnalysisTypes(mockAnalysisTypes);
      
    } catch (error) {
      console.error('Failed to load analysis types:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : '📊';
  };

  const getParameterTypeIcon = (type: string) => {
    switch (type) {
      case 'number': return '🔢';
      case 'text': return '📝';
      case 'select': return '📋';
      case 'boolean': return '☑️';
      case 'file': return '📁';
      default: return '❓';
    }
  };

  const filteredAnalysisTypes = selectedCategory === 'all'
    ? analysisTypes
    : analysisTypes.filter(at => at.category === selectedCategory);

  const createAnalysis = async () => {
    if (!newAnalysis.name || !newAnalysis.description) {
      alert('Lütfen ad ve açıklama alanlarını doldurun');
      return;
    }

    const analysis: AnalysisType = {
      id: `analysis-${Date.now()}`,
      name: newAnalysis.name,
      description: newAnalysis.description,
      category: newAnalysis.category,
      isActive: true,
      version: '1.0.0',
      lastModified: new Date().toISOString().split('T')[0],
      usage: 0,
      accuracy: 0,
      parameters: []
    };

    setAnalysisTypes(prev => [analysis, ...prev]);
    setNewAnalysis({ name: '', description: '', category: 'roi' });
    setShowCreateModal(false);
    alert('Analiz türü başarıyla oluşturuldu!');
  };

  const updateAnalysis = async () => {
    if (!editingAnalysis) return;

    setAnalysisTypes(prev => prev.map(a =>
      a.id === editingAnalysis.id
        ? { ...editingAnalysis, lastModified: new Date().toISOString().split('T')[0] }
        : a
    ));

    setSelectedAnalysis(editingAnalysis);
    setEditingAnalysis(null);
    alert('Analiz türü başarıyla güncellendi!');
  };

  const testAnalysis = async (analysis: AnalysisType) => {
    setTestingAnalysis(analysis);
    setShowTestModal(true);
  };

  const toggleAnalysisStatus = async (analysisId: string) => {
    setAnalysisTypes(prev => prev.map(a =>
      a.id === analysisId ? { ...a, isActive: !a.isActive } : a
    ));

    if (selectedAnalysis?.id === analysisId) {
      setSelectedAnalysis(prev => prev ? { ...prev, isActive: !prev.isActive } : null);
    }

    alert('Analiz durumu güncellendi!');
  };

  const deleteAnalysis = async (analysisId: string) => {
    if (!confirm('Bu analiz türünü silmek istediğinizden emin misiniz?')) return;

    setAnalysisTypes(prev => prev.filter(a => a.id !== analysisId));

    if (selectedAnalysis?.id === analysisId) {
      setSelectedAnalysis(null);
    }

    alert('Analiz türü silindi!');
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 bg-white/10 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      <header className="border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="text-2xl hover:opacity-70 transition-opacity"
                style={{ color: '#f6f8f9' }}
              >
                ←
              </Link>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Analiz Türü Editörü</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Analiz türlerini yönet ve düzenle</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                ➕ Yeni Analiz Türü
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Analiz</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{analysisTypes.length}</p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Analiz</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {analysisTypes.filter(at => at.isActive).length}
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Kullanım</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {analysisTypes.reduce((acc, at) => acc + at.usage, 0).toLocaleString()}
                </p>
              </div>
              <div className="text-2xl">🔥</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Ort. Doğruluk</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {(analysisTypes.reduce((acc, at) => acc + at.accuracy, 0) / analysisTypes.length).toFixed(1)}%
                </p>
              </div>
              <div className="text-2xl">🎯</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'shadow-lg transform scale-105'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? '#baf200' : '#f6f8f9',
                  color: '#1e3237'
                }}
              >
                {category.icon} {category.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analysis Types List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>
              Analiz Türleri {selectedCategory !== 'all' && `- ${categories.find(c => c.id === selectedCategory)?.title}`}
            </h2>
            <div className="space-y-4">
              {filteredAnalysisTypes.map((analysisType) => (
                <div 
                  key={analysisType.id} 
                  className={`rounded-lg p-6 cursor-pointer transition-all ${
                    selectedAnalysis?.id === analysisType.id ? 'ring-2 ring-white/20' : ''
                  }`}
                  style={{ backgroundColor: '#f6f8f9' }}
                  onClick={() => setSelectedAnalysis(analysisType)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getCategoryIcon(analysisType.category)}</span>
                        <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                          {analysisType.name}
                        </h3>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            analysisType.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {analysisType.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                      
                      <p className="text-sm opacity-70 mb-3" style={{ color: '#1e3237' }}>
                        {analysisType.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Parametreler</p>
                          <p className="font-medium" style={{ color: '#146448' }}>
                            {analysisType.parameters.length} adet
                          </p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Kullanım</p>
                          <p className="font-medium" style={{ color: '#146448' }}>
                            {analysisType.usage.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Doğruluk</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{analysisType.accuracy}%</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Versiyon</p>
                          <p className="font-medium" style={{ color: '#146448' }}>v{analysisType.version}</p>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingAnalysis(analysisType);
                        }}
                        className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                        style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                      >
                        📝 Düzenle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Detail Panel */}
          <div>
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Analiz Detayı</h2>
            {selectedAnalysis ? (
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{getCategoryIcon(selectedAnalysis.category)}</span>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                      {selectedAnalysis.name}
                    </h3>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                      {selectedAnalysis.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Kategori:</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>
                      {selectedAnalysis.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Durum:</span>
                    <span 
                      className={`text-sm font-medium ${
                        selectedAnalysis.isActive ? 'text-green-600' : 'text-gray-600'
                      }`}
                    >
                      {selectedAnalysis.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Versiyon:</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>
                      v{selectedAnalysis.version}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3" style={{ color: '#1e3237' }}>Parametreler:</h4>
                  <div className="space-y-3">
                    {selectedAnalysis.parameters.map((param) => (
                      <div key={param.id} className="border rounded-lg p-3" style={{ borderColor: '#146448' }}>
                        <div className="flex items-center space-x-2 mb-1">
                          <span>{getParameterTypeIcon(param.type)}</span>
                          <span className="font-medium" style={{ color: '#1e3237' }}>
                            {param.name}
                          </span>
                          {param.required && (
                            <span className="text-xs px-1 py-0.5 rounded bg-red-100 text-red-600">
                              Zorunlu
                            </span>
                          )}
                        </div>
                        <p className="text-xs opacity-70 mb-1" style={{ color: '#1e3237' }}>
                          {param.description}
                        </p>
                        <div className="text-xs" style={{ color: '#146448' }}>
                          Tip: {param.type}
                          {param.defaultValue && ` • Varsayılan: ${param.defaultValue}`}
                          {param.options && ` • Seçenekler: ${param.options.join(', ')}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingAnalysis(selectedAnalysis)}
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                  >
                    📝 Düzenle
                  </button>
                  <button
                    onClick={() => testAnalysis(selectedAnalysis)}
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    🧪 Test Et
                  </button>
                  <button
                    onClick={() => toggleAnalysisStatus(selectedAnalysis.id)}
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90 ml-2"
                    style={{ backgroundColor: selectedAnalysis.isActive ? '#EF4444' : '#10B981', color: '#f6f8f9' }}
                  >
                    {selectedAnalysis.isActive ? '⏸️ Deaktif Et' : '▶️ Aktif Et'}
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="rounded-lg p-6 text-center"
                style={{ backgroundColor: '#f6f8f9' }}
              >
                <div className="text-4xl mb-4">📊</div>
                <p style={{ color: '#1e3237' }}>Detayları görmek için bir analiz türü seçin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingAnalysis && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div 
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg p-6"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold" style={{ color: '#1e3237' }}>
                Analiz Türü Düzenle
              </h3>
              <button
                onClick={() => setEditingAnalysis(null)}
                className="text-2xl hover:opacity-70"
                style={{ color: '#1e3237' }}
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Analiz Adı
                  </label>
                  <input
                    type="text"
                    value={editingAnalysis.name}
                    onChange={(e) => setEditingAnalysis({...editingAnalysis, name: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    style={{ borderColor: '#146448' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Kategori
                  </label>
                  <select
                    value={editingAnalysis.category}
                    onChange={(e) => setEditingAnalysis({...editingAnalysis, category: e.target.value as any})}
                    className="w-full p-3 border rounded-lg"
                    style={{ borderColor: '#146448' }}
                  >
                    <option value="roi">ROI Analizi</option>
                    <option value="climate">İklim Analizi</option>
                    <option value="equipment">Ekipman Analizi</option>
                    <option value="market">Pazar Analizi</option>
                    <option value="layout">Layout Analizi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Açıklama
                </label>
                <textarea
                  value={editingAnalysis.description}
                  onChange={(e) => setEditingAnalysis({...editingAnalysis, description: e.target.value})}
                  className="w-full p-3 border rounded-lg h-20"
                  style={{ borderColor: '#146448' }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold" style={{ color: '#1e3237' }}>Parametreler</h4>
                  <button
                    className="px-3 py-1 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    + Parametre Ekle
                  </button>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {editingAnalysis.parameters.map((param, index) => (
                    <div key={param.id} className="border rounded-lg p-3" style={{ borderColor: '#146448' }}>
                      <div className="grid grid-cols-3 gap-3">
                        <input 
                          type="text" 
                          value={param.name}
                          placeholder="Parametre adı"
                          className="p-2 border rounded text-sm" 
                          style={{ borderColor: '#146448' }}
                        />
                        <select className="p-2 border rounded text-sm" style={{ borderColor: '#146448' }}>
                          <option value="number">Sayı</option>
                          <option value="text">Metin</option>
                          <option value="select">Seçim</option>
                          <option value="boolean">Evet/Hayır</option>
                          <option value="file">Dosya</option>
                        </select>
                        <div className="flex items-center space-x-2">
                          <label className="flex items-center">
                            <input type="checkbox" checked={param.required} className="mr-1" />
                            <span className="text-xs">Zorunlu</span>
                          </label>
                          <button className="text-red-500 hover:text-red-700">🗑️</button>
                        </div>
                      </div>
                      <input 
                        type="text" 
                        value={param.description}
                        placeholder="Parametre açıklaması"
                        className="w-full mt-2 p-2 border rounded text-sm" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setEditingAnalysis(null)}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#6B7280', color: '#f6f8f9' }}
                >
                  İptal
                </button>
                <button
                  onClick={updateAnalysis}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                >
                  💾 Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div
            className="max-w-2xl w-full rounded-lg p-6"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold" style={{ color: '#1e3237' }}>
                Yeni Analiz Türü Oluştur
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-2xl hover:opacity-70"
                style={{ color: '#1e3237' }}
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Analiz Adı
                </label>
                <input
                  type="text"
                  value={newAnalysis.name}
                  onChange={(e) => setNewAnalysis({...newAnalysis, name: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  style={{ borderColor: '#146448' }}
                  placeholder="Örn: Gelişmiş ROI Analizi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Kategori
                </label>
                <select
                  value={newAnalysis.category}
                  onChange={(e) => setNewAnalysis({...newAnalysis, category: e.target.value as any})}
                  className="w-full p-3 border rounded-lg"
                  style={{ borderColor: '#146448' }}
                >
                  <option value="roi">ROI Analizi</option>
                  <option value="climate">İklim Analizi</option>
                  <option value="equipment">Ekipman Analizi</option>
                  <option value="market">Pazar Analizi</option>
                  <option value="layout">Layout Analizi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Açıklama
                </label>
                <textarea
                  value={newAnalysis.description}
                  onChange={(e) => setNewAnalysis({...newAnalysis, description: e.target.value})}
                  className="w-full p-3 border rounded-lg h-24"
                  style={{ borderColor: '#146448' }}
                  placeholder="Analiz türünün ne yaptığını açıklayın..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#6B7280', color: '#f6f8f9' }}
                >
                  İptal
                </button>
                <button
                  onClick={createAnalysis}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                >
                  💾 Oluştur
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Modal */}
      {showTestModal && testingAnalysis && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div
            className="max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-lg p-6"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold" style={{ color: '#1e3237' }}>
                Analiz Test - {testingAnalysis.name}
              </h3>
              <button
                onClick={() => setShowTestModal(false)}
                className="text-2xl hover:opacity-70"
                style={{ color: '#1e3237' }}
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3" style={{ color: '#1e3237' }}>Test Parametreleri:</h4>
                <div className="space-y-3">
                  {testingAnalysis.parameters.map((param) => (
                    <div key={param.id} className="border rounded-lg p-3" style={{ borderColor: '#146448' }}>
                      <label className="block text-sm font-medium mb-1" style={{ color: '#1e3237' }}>
                        {param.name} {param.required && <span className="text-red-500">*</span>}
                      </label>
                      {param.type === 'select' ? (
                        <select className="w-full p-2 border rounded" style={{ borderColor: '#146448' }}>
                          {param.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : param.type === 'boolean' ? (
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">{param.description}</span>
                        </label>
                      ) : (
                        <input
                          type={param.type}
                          className="w-full p-2 border rounded"
                          style={{ borderColor: '#146448' }}
                          placeholder={param.description}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3" style={{ color: '#1e3237' }}>Test Sonucu:</h4>
                <div
                  className="p-4 rounded-lg border"
                  style={{ borderColor: '#146448', backgroundColor: '#f8f9fa' }}
                >
                  <p style={{ color: '#1e3237' }}>
                    ✅ Analiz konfigürasyonu geçerli<br />
                    ✅ Tüm zorunlu parametreler tanımlı<br />
                    ✅ Veri tipleri uyumlu<br />
                    ✅ Test verisi başarıyla işlendi<br />
                    <br />
                    <strong>Sonuç:</strong> {testingAnalysis.name} analiz türü düzgün çalışıyor.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowTestModal(false)}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#6B7280', color: '#f6f8f9' }}
                >
                  Kapat
                </button>
                <button
                  onClick={() => alert('Test başarıyla tamamlandı!')}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                >
                  🧪 Çalıştır
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
