'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

interface AnalysisType {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'draft' | 'deprecated';
  prompt: string;
  outputFormat: string;
  requiredInputs: string[];
  estimatedTokens: number;
  lastModified: string;
  version: string;
}

export default function AnalysisEditorPage() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('list');
  const [analysisTypes, setAnalysisTypes] = useState<AnalysisType[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisType | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  const tabs = [
    { id: 'list', title: 'Analiz Listesi', icon: '📋' },
    { id: 'editor', title: 'Editör', icon: '✏️' },
    { id: 'templates', title: 'Şablonlar', icon: '📄' },
    { id: 'settings', title: 'Ayarlar', icon: '⚙️' }
  ];

  const categories = ['ROI Analizi', 'İklim Analizi', 'Ekipman Önerisi', 'Pazar Analizi', 'Planlama'];

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

      // Mock analysis types data
      const mockAnalysisTypes: AnalysisType[] = [
        {
          id: 'roi-basic',
          name: 'Temel ROI Analizi',
          description: 'Basit ROI hesaplaması ve karlılık analizi',
          category: 'ROI Analizi',
          status: 'active',
          prompt: 'Sen bir sera ROI uzmanısın. Verilen parametreler ile detaylı karlılık analizi yap...',
          outputFormat: 'json',
          requiredInputs: ['sera_tipi', 'yatirim_tutari', 'urun_tipi', 'bolge'],
          estimatedTokens: 850,
          lastModified: '2 gün önce',
          version: '1.2.3'
        },
        {
          id: 'climate-advanced',
          name: 'Gelişmiş İklim Analizi',
          description: 'Detaylı iklim verileri ve öneriler',
          category: 'İklim Analizi',
          status: 'active',
          prompt: 'İklim uzmanı olarak, verilen bölge için kapsamlı iklim analizi yap...',
          outputFormat: 'structured',
          requiredInputs: ['bolge', 'urun_tipi', 'sera_tipi'],
          estimatedTokens: 1200,
          lastModified: '1 hafta önce',
          version: '2.1.0'
        },
        {
          id: 'equipment-smart',
          name: 'Akıllı Ekipman Önerisi',
          description: 'AI destekli ekipman seçimi ve optimizasyonu',
          category: 'Ekipman Önerisi',
          status: 'draft',
          prompt: 'Sera ekipmanları uzmanı olarak, verilen gereksinimler için optimal ekipman öner...',
          outputFormat: 'detailed',
          requiredInputs: ['sera_boyutu', 'urun_tipi', 'butce', 'otomasyon_seviyesi'],
          estimatedTokens: 950,
          lastModified: '3 gün önce',
          version: '1.0.0-beta'
        }
      ];

      setAnalysisTypes(mockAnalysisTypes);
    } catch (error) {
      console.error('Failed to load analysis types:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'deprecated': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'draft': return 'Taslak';
      case 'deprecated': return 'Kullanımdan Kaldırıldı';
      default: return status;
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 bg-white/10 rounded"></div>
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
      {/* Header */}
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
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Analiz Editörü</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Analiz türlerini düzenle ve yönet</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadAnalysisTypes}
                disabled={dataLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  dataLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                {dataLoading ? '🔄 Yenileniyor...' : '🔄 Yenile'}
              </button>
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#f6f8f9', color: '#1e3237' }}
              >
                ➕ Yeni Analiz
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'shadow-lg transform scale-105'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? '#baf200' : '#f6f8f9',
                  color: '#1e3237'
                }}
              >
                {tab.icon} {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'list' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Analiz Türleri</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {analysisTypes.map((analysis) => (
                  <div key={analysis.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold" style={{ color: '#1e3237' }}>{analysis.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(analysis.status)}`}>
                        {getStatusText(analysis.status)}
                      </span>
                    </div>
                    
                    <p className="text-sm mb-4 opacity-70" style={{ color: '#1e3237' }}>
                      {analysis.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Kategori</p>
                        <p className="font-medium" style={{ color: '#146448' }}>{analysis.category}</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Token Tahmini</p>
                        <p className="font-medium" style={{ color: '#146448' }}>{analysis.estimatedTokens}</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Versiyon</p>
                        <p className="font-medium" style={{ color: '#146448' }}>{analysis.version}</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Son Değişiklik</p>
                        <p className="font-medium" style={{ color: '#146448' }}>{analysis.lastModified}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedAnalysis(analysis);
                          setActiveTab('editor');
                        }}
                        className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                        style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                      >
                        ✏️ Düzenle
                      </button>
                      <button
                        className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                        style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                      >
                        🧪 Test Et
                      </button>
                      <button
                        className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                        style={{ backgroundColor: '#f6f8f9', color: '#1e3237', border: '1px solid #146448' }}
                      >
                        📋 Kopyala
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'editor' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>
                {selectedAnalysis ? `${selectedAnalysis.name} - Düzenle` : 'Yeni Analiz Oluştur'}
              </h3>
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Analiz Adı
                      </label>
                      <input 
                        type="text" 
                        defaultValue={selectedAnalysis?.name || ''}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                        placeholder="Analiz türü adını girin"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Açıklama
                      </label>
                      <textarea 
                        rows={3}
                        defaultValue={selectedAnalysis?.description || ''}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                        placeholder="Analiz türünün açıklamasını girin"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Kategori
                      </label>
                      <select 
                        defaultValue={selectedAnalysis?.category || ''}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      >
                        <option value="">Kategori seçin</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Durum
                      </label>
                      <select 
                        defaultValue={selectedAnalysis?.status || 'draft'}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      >
                        <option value="draft">Taslak</option>
                        <option value="active">Aktif</option>
                        <option value="deprecated">Kullanımdan Kaldırıldı</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Sistem Promptu
                      </label>
                      <textarea 
                        rows={8}
                        defaultValue={selectedAnalysis?.prompt || ''}
                        className="w-full p-3 border rounded-lg font-mono text-sm" 
                        style={{ borderColor: '#146448' }}
                        placeholder="Sistem promptunu girin..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Gerekli Girdiler (virgülle ayırın)
                      </label>
                      <input 
                        type="text" 
                        defaultValue={selectedAnalysis?.requiredInputs.join(', ') || ''}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                        placeholder="sera_tipi, yatirim_tutari, urun_tipi"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Tahmini Token Sayısı
                      </label>
                      <input 
                        type="number" 
                        defaultValue={selectedAnalysis?.estimatedTokens || 500}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                        min="100"
                        max="5000"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-8">
                  <button
                    className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    💾 Kaydet
                  </button>
                  <button
                    className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                  >
                    🧪 Test Et
                  </button>
                  <button
                    onClick={() => {
                      setSelectedAnalysis(null);
                      setActiveTab('list');
                    }}
                    className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#f6f8f9', color: '#1e3237', border: '1px solid #146448' }}
                  >
                    ❌ İptal
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Analiz Şablonları</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['ROI Temel Şablon', 'İklim Analizi Şablon', 'Ekipman Önerisi Şablon'].map((template) => (
                  <div key={template} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#1e3237' }}>{template}</h4>
                    <p className="text-sm opacity-70 mb-4" style={{ color: '#1e3237' }}>
                      Hazır şablon kullanarak hızlıca yeni analiz türü oluştur
                    </p>
                    <button
                      className="w-full py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      📄 Şablonu Kullan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Editör Ayarları</h3>
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium" style={{ color: '#1e3237' }}>Otomatik Kaydetme</h4>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                        Değişiklikler otomatik olarak kaydedilsin
                      </p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium" style={{ color: '#1e3237' }}>Sözdizimi Vurgulama</h4>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                        Prompt editöründe sözdizimi vurgulamasını etkinleştir
                      </p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium" style={{ color: '#1e3237' }}>Gelişmiş Önizleme</h4>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                        Analiz sonuçlarının canlı önizlemesini göster
                      </p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
