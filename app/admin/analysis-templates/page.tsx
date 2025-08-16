'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface AnalysisTemplate {
  id: string;
  name: string;
  description: string;
  category: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  isActive: boolean;
  isDefault: boolean;
  parameters: any;
  createdAt: string;
  createdBy: string;
  usage: number;
  version: string;
}

export default function AnalysisTemplatesPage() {
  const { user, isAdmin, loading } = useAuth();
  const [templates, setTemplates] = useState<AnalysisTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<AnalysisTemplate | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<AnalysisTemplate | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dataLoading, setDataLoading] = useState(true);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'roi' as 'roi' | 'climate' | 'equipment' | 'market' | 'layout'
  });

  const categories = [
    { id: 'all', title: 'Tümü', icon: '📋' },
    { id: 'roi', title: 'ROI Şablonları', icon: '💰' },
    { id: 'climate', title: 'İklim Şablonları', icon: '🌤️' },
    { id: 'equipment', title: 'Ekipman Şablonları', icon: '🔧' },
    { id: 'market', title: 'Pazar Şablonları', icon: '📈' },
    { id: 'layout', title: 'Layout Şablonları', icon: '📐' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadTemplates();
    }
  }, [user, loading]);

  const loadTemplates = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTemplates: AnalysisTemplate[] = [
        {
          id: 'template-001',
          name: 'Standart ROI Şablonu',
          description: 'Sera yatırımları için temel ROI hesaplama şablonu',
          category: 'roi',
          isActive: true,
          isDefault: true,
          createdAt: '2024-02-15',
          createdBy: 'System Admin',
          usage: 245,
          version: '2.1.0',
          parameters: {
            investment: { required: true, type: 'number', label: 'Yatırım Tutarı (TL)' },
            expectedYield: { required: true, type: 'number', label: 'Beklenen Verim (kg/m²)' },
            productPrice: { required: true, type: 'number', label: 'Ürün Fiyatı (TL/kg)' },
            operatingCosts: { required: true, type: 'number', label: 'İşletme Maliyetleri (TL/yıl)' },
            greenhouseSize: { required: true, type: 'number', label: 'Sera Boyutu (m²)' }
          }
        },
        {
          id: 'template-002',
          name: 'Detaylı İklim Analizi Şablonu',
          description: 'Kapsamlı iklim verisi analizi için gelişmiş şablon',
          category: 'climate',
          isActive: true,
          isDefault: false,
          createdAt: '2024-03-01',
          createdBy: 'Climate Team',
          usage: 89,
          version: '1.5.2',
          parameters: {
            location: { required: true, type: 'text', label: 'Konum (İl, İlçe)' },
            analysisPeriod: { required: true, type: 'select', label: 'Analiz Dönemi', options: ['1 yıl', '3 yıl', '5 yıl'] },
            cropType: { required: true, type: 'select', label: 'Ürün Tipi', options: ['Domates', 'Salatalık', 'Biber', 'Patlıcan'] },
            climateFactors: { required: false, type: 'multiselect', label: 'İklim Faktörleri', options: ['Sıcaklık', 'Nem', 'Yağış', 'Rüzgar'] }
          }
        },
        {
          id: 'template-003',
          name: 'Ekipman Optimizasyon Şablonu',
          description: 'Sera ekipmanları için maliyet-fayda analizi şablonu',
          category: 'equipment',
          isActive: true,
          isDefault: true,
          createdAt: '2024-02-28',
          createdBy: 'Equipment Team',
          usage: 156,
          version: '1.8.1',
          parameters: {
            greenhouseSize: { required: true, type: 'number', label: 'Sera Boyutu (m²)' },
            budget: { required: true, type: 'number', label: 'Bütçe (TL)' },
            automationLevel: { required: true, type: 'select', label: 'Otomasyon Seviyesi', options: ['Temel', 'Orta', 'İleri', 'Tam Otomatik'] },
            cropType: { required: true, type: 'select', label: 'Ürün Tipi', options: ['Domates', 'Salatalık', 'Biber', 'Meyve'] },
            priority: { required: false, type: 'select', label: 'Öncelik', options: ['Maliyet', 'Kalite', 'Verim', 'Sürdürülebilirlik'] }
          }
        },
        {
          id: 'template-004',
          name: 'Pazar Trend Analizi Şablonu',
          description: 'Ürün pazar trendleri ve fiyat öngörüsü şablonu',
          category: 'market',
          isActive: false,
          isDefault: false,
          createdAt: '2024-03-05',
          createdBy: 'Market Team',
          usage: 67,
          version: '1.2.3',
          parameters: {
            productCategory: { required: true, type: 'select', label: 'Ürün Kategorisi', options: ['Sebze', 'Meyve', 'Çiçek'] },
            marketRegion: { required: true, type: 'select', label: 'Pazar Bölgesi', options: ['Yerel', 'Bölgesel', 'Ulusal', 'İhracat'] },
            forecastPeriod: { required: true, type: 'select', label: 'Tahmin Dönemi', options: ['3 ay', '6 ay', '1 yıl', '2 yıl'] },
            seasonality: { required: false, type: 'boolean', label: 'Mevsimsellik Dahil Et' }
          }
        },
        {
          id: 'template-005',
          name: 'Layout Optimizasyon Şablonu',
          description: 'Sera iç mekan düzeni optimizasyonu için şablon',
          category: 'layout',
          isActive: true,
          isDefault: true,
          createdAt: '2024-01-20',
          createdBy: 'Layout Team',
          usage: 123,
          version: '2.0.0',
          parameters: {
            dimensions: { required: true, type: 'text', label: 'Sera Ölçüleri (En x Boy x Yükseklik)' },
            productionGoal: { required: true, type: 'select', label: 'Üretim Hedefi', options: ['Maksimum Verim', 'Maliyet Optimizasyonu', 'Kalite Odaklı'] },
            includeAutomation: { required: false, type: 'boolean', label: 'Otomasyon Sistemleri Dahil Et' },
            walkwayWidth: { required: false, type: 'number', label: 'Koridor Genişliği (cm)' }
          }
        }
      ];
      
      setTemplates(mockTemplates);
      
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const createTemplate = async () => {
    if (!newTemplate.name || !newTemplate.description) {
      alert('Lütfen ad ve açıklama alanlarını doldurun');
      return;
    }

    const template: AnalysisTemplate = {
      id: `template-${Date.now()}`,
      name: newTemplate.name,
      description: newTemplate.description,
      category: newTemplate.category,
      isActive: true,
      isDefault: false,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: user?.email || 'Admin User',
      usage: 0,
      version: '1.0.0',
      parameters: {}
    };

    setTemplates(prev => [template, ...prev]);
    setNewTemplate({ name: '', description: '', category: 'roi' });
    setShowCreateModal(false);
    alert('Analiz şablonu başarıyla oluşturuldu!');
  };

  const updateTemplate = async () => {
    if (!editingTemplate) return;

    setTemplates(prev => prev.map(t => 
      t.id === editingTemplate.id 
        ? { ...editingTemplate }
        : t
    ));
    
    setSelectedTemplate(editingTemplate);
    setEditingTemplate(null);
    alert('Şablon başarıyla güncellendi!');
  };

  const toggleTemplateStatus = async (templateId: string) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, isActive: !t.isActive } : t
    ));
    
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(prev => prev ? { ...prev, isActive: !prev.isActive } : null);
    }
    
    alert('Şablon durumu güncellendi!');
  };

  const deleteTemplate = async (templateId: string) => {
    if (!confirm('Bu şablonu silmek istediğinizden emin misiniz?')) return;
    
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null);
    }
    
    alert('Şablon silindi!');
  };

  const duplicateTemplate = async (template: AnalysisTemplate) => {
    const duplicated: AnalysisTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Kopya)`,
      isDefault: false,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: user?.email || 'Admin User',
      usage: 0,
      version: '1.0.0'
    };

    setTemplates(prev => [duplicated, ...prev]);
    alert('Şablon kopyalandı!');
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : '📋';
  };

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

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
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Analiz Şablonları</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Önceden tanımlanmış analiz şablonlarını yönet</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                ➕ Yeni Şablon
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
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Şablon</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{templates.length}</p>
              </div>
              <div className="text-2xl">📋</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Şablon</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {templates.filter(t => t.isActive).length}
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Varsayılan</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {templates.filter(t => t.isDefault).length}
                </p>
              </div>
              <div className="text-2xl">⭐</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Kullanım</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {templates.reduce((acc, t) => acc + t.usage, 0).toLocaleString()}
                </p>
              </div>
              <div className="text-2xl">🔥</div>
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
          {/* Templates List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>
              Şablonlar {selectedCategory !== 'all' && `- ${categories.find(c => c.id === selectedCategory)?.title}`}
            </h2>
            <div className="space-y-4">
              {filteredTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className={`rounded-lg p-6 cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id ? 'ring-2 ring-white/20' : ''
                  }`}
                  style={{ backgroundColor: '#f6f8f9' }}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                        <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                          {template.name}
                        </h3>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            template.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {template.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                        {template.isDefault && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            Varsayılan
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm opacity-70 mb-3" style={{ color: '#1e3237' }}>
                        {template.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Kullanım</p>
                          <p className="font-medium" style={{ color: '#146448' }}>
                            {template.usage.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Versiyon</p>
                          <p className="font-medium" style={{ color: '#146448' }}>v{template.version}</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Oluşturan</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{template.createdBy}</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Tarih</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{template.createdAt}</p>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTemplate(template);
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

          {/* Template Detail Panel */}
          <div>
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Şablon Detayı</h2>
            {selectedTemplate ? (
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{getCategoryIcon(selectedTemplate.category)}</span>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                      {selectedTemplate.name}
                    </h3>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                      {selectedTemplate.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Kategori:</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>
                      {selectedTemplate.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Durum:</span>
                    <span 
                      className={`text-sm font-medium ${
                        selectedTemplate.isActive ? 'text-green-600' : 'text-gray-600'
                      }`}
                    >
                      {selectedTemplate.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Varsayılan:</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>
                      {selectedTemplate.isDefault ? 'Evet' : 'Hayır'}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3" style={{ color: '#1e3237' }}>Parametreler:</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {Object.entries(selectedTemplate.parameters).map(([key, param]: [string, any]) => (
                      <div key={key} className="border rounded-lg p-2" style={{ borderColor: '#146448' }}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm" style={{ color: '#1e3237' }}>
                            {param.label || key}
                          </span>
                          <span className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#146448', color: '#f6f8f9' }}>
                            {param.type}
                          </span>
                        </div>
                        {param.required && (
                          <span className="text-xs text-red-600">Zorunlu</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingTemplate(selectedTemplate)}
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                  >
                    📝 Düzenle
                  </button>
                  <button
                    onClick={() => duplicateTemplate(selectedTemplate)}
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    📋 Kopyala
                  </button>
                  <button
                    onClick={() => toggleTemplateStatus(selectedTemplate.id)}
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: selectedTemplate.isActive ? '#EF4444' : '#10B981', color: '#f6f8f9' }}
                  >
                    {selectedTemplate.isActive ? '⏸️ Deaktif Et' : '▶️ Aktif Et'}
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="rounded-lg p-6 text-center"
                style={{ backgroundColor: '#f6f8f9' }}
              >
                <div className="text-4xl mb-4">📋</div>
                <p style={{ color: '#1e3237' }}>Detayları görmek için bir şablon seçin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div 
            className="max-w-2xl w-full rounded-lg p-6"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold" style={{ color: '#1e3237' }}>
                Yeni Analiz Şablonu Oluştur
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
                  Şablon Adı
                </label>
                <input 
                  type="text" 
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  className="w-full p-3 border rounded-lg" 
                  style={{ borderColor: '#146448' }}
                  placeholder="Örn: Özel ROI Şablonu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Kategori
                </label>
                <select 
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value as any})}
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
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                  className="w-full p-3 border rounded-lg h-24" 
                  style={{ borderColor: '#146448' }}
                  placeholder="Şablonun ne işe yaradığını açıklayın..."
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
                  onClick={createTemplate}
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

      {/* Edit Modal */}
      {editingTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div 
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg p-6"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold" style={{ color: '#1e3237' }}>
                Şablon Düzenle
              </h3>
              <button
                onClick={() => setEditingTemplate(null)}
                className="text-2xl hover:opacity-70"
                style={{ color: '#1e3237' }}
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Şablon Adı
                </label>
                <input 
                  type="text" 
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})}
                  className="w-full p-3 border rounded-lg" 
                  style={{ borderColor: '#146448' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Kategori
                </label>
                <select 
                  value={editingTemplate.category}
                  onChange={(e) => setEditingTemplate({...editingTemplate, category: e.target.value as any})}
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
                  value={editingTemplate.description}
                  onChange={(e) => setEditingTemplate({...editingTemplate, description: e.target.value})}
                  className="w-full p-3 border rounded-lg h-24" 
                  style={{ borderColor: '#146448' }}
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={editingTemplate.isDefault}
                    onChange={(e) => setEditingTemplate({...editingTemplate, isDefault: e.target.checked})}
                    className="mr-2" 
                  />
                  <span className="text-sm" style={{ color: '#1e3237' }}>Varsayılan şablon olarak ayarla</span>
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setEditingTemplate(null)}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#6B7280', color: '#f6f8f9' }}
                >
                  İptal
                </button>
                <button
                  onClick={updateTemplate}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                >
                  💾 Kaydet
                </button>
                <button
                  onClick={() => deleteTemplate(editingTemplate.id)}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#EF4444', color: '#f6f8f9' }}
                >
                  🗑️ Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
