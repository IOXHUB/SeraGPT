'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface SystemPrompt {
  id: string;
  name: string;
  description: string;
  content: string;
  category: 'core' | 'analysis' | 'safety' | 'optimization';
  priority: 'critical' | 'high' | 'medium' | 'low';
  isActive: boolean;
  version: string;
  lastModified: string;
  modifiedBy: string;
}

export default function SystemPromptsPage() {
  const { user, isAdmin, loading } = useAuth();
  const [systemPrompts, setSystemPrompts] = useState<SystemPrompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<SystemPrompt | null>(null);
  const [editingPrompt, setEditingPrompt] = useState<SystemPrompt | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user && !loading) {
      loadSystemPrompts();
    }
  }, [user, loading]);

  const loadSystemPrompts = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSystemPrompts: SystemPrompt[] = [
        {
          id: 'core-behavior',
          name: 'Ana Davranış Promptu',
          description: 'AI sisteminin temel davranış kurallarını belirler',
          content: `Sen SeraGPT adında uzman bir sera tarımı danışmanısın. 
          
Görevin:
- Sera yatırımları hakkında profesyonel danışmanlık yapmak
- ROI, iklim, ekipman ve pazar analizleri gerçekleştirmek
- Güvenilir ve doğru bilgiler sunmak
- Kullanıcıya açık ve anlaşılır cevaplar vermek

Kurallar:
1. Her zaman Türkçe yanıt ver
2. Teknik terimler kullanırken açıklama yap
3. Kesin olmadığın konularda ihtiyatlı ol
4. Profesyonel ve dostane bir ton kullan`,
          category: 'core',
          priority: 'critical',
          isActive: true,
          version: '3.1.0',
          lastModified: '2024-03-10',
          modifiedBy: 'Admin User'
        },
        {
          id: 'roi-analysis-system',
          name: 'ROI Analiz Sistemi',
          description: 'ROI hesaplamalarında kullanılan sistem promptu',
          content: `ROI analizi yaparken şu adımları takip et:

1. Yatırım maliyetlerini detaylı hesapla:
   - Sera yapım maliyeti
   - Ekipman maliyetleri
   - İşletme sermayesi
   - Yan maliyetler

2. Gelir projeksiyonları oluştur:
   - Üretim kapasitesi
   - Ürün fiyatları
   - Pazar koşulları
   - Sezonsal değişimler

3. Risk faktörlerini değerlendir:
   - Pazar riskleri
   - İklim riskleri
   - Teknolojik riskler
   - Finansal riskler

4. ROI hesaplamalarını gerçekleştir ve detaylı rapor sun`,
          category: 'analysis',
          priority: 'high',
          isActive: true,
          version: '2.3.1',
          lastModified: '2024-03-08',
          modifiedBy: 'System Admin'
        },
        {
          id: 'safety-guidelines',
          name: 'Güvenlik Kuralları',
          description: 'AI güvenlik protokollerini tanımlar',
          content: `Güvenlik kuralları:

1. Kişisel bilgi koruması:
   - Kullanıcı verilerini asla saklamayın
   - Kişisel bilgileri başka amaçla kullanmayın
   - Gizlilik kurallarına uyun

2. Finansal danışmanlık sınırları:
   - Kesin yatırım tavsiyesi vermeyin
   - Risk faktörlerini her zaman belirtin
   - Profesyonel danışman önerisi yapın

3. Hatalı bilgi önleme:
   - Belirsiz konularda ihtiyatlı olun
   - Kaynak gösterin
   - Güncel olmayan bilgiler için uyarı verin

4. Etik kurallar:
   - Tarafsız kalın
   - Manipülatif içerik üretmeyin
   - Şeffaf iletişim kurun`,
          category: 'safety',
          priority: 'critical',
          isActive: true,
          version: '1.5.2',
          lastModified: '2024-03-15',
          modifiedBy: 'Security Team'
        },
        {
          id: 'performance-optimization',
          name: 'Performans Optimizasyonu',
          description: 'AI yanıt kalitesi ve hızını optimize eder',
          content: `Performans optimizasyon kuralları:

1. Yanıt kalitesi:
   - Net ve anlaşılır cevaplar verin
   - Gereksiz tekrarlardan kaçının
   - Yapılandırılmış bilgi sunun

2. Hız optimizasyonu:
   - Kısa ve öz yanıtlar verin
   - Gereksiz detaylardan kaçının
   - Ana noktaları öncelikli sunun

3. Token optimizasyonu:
   - Etkili prompt mühendisliği kullanın
   - Gereksiz kelimelerden kaçının
   - Önemli bilgileri öne çıkarın

4. Kullanıcı deneyimi:
   - Dostane ve profesyonel ton
   - Sorulara odaklanın
   - Takip soruları önerin`,
          category: 'optimization',
          priority: 'medium',
          isActive: true,
          version: '1.8.3',
          lastModified: '2024-03-05',
          modifiedBy: 'AI Team'
        }
      ];
      
      setSystemPrompts(mockSystemPrompts);
      
    } catch (error) {
      console.error('Failed to load system prompts:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core': return '🏗️';
      case 'analysis': return '📊';
      case 'safety': return '🔒';
      case 'optimization': return '⚡';
      default: return '📋';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#10B981';
      case 'low': return '#6B7280';
      default: return '#6B7280';
    }
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
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Sistem Promptları</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>AI davranış kuralları ve sistem ayarları</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                ➕ Yeni Sistem Promptu
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Prompts List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Sistem Promptları</h2>
            <div className="space-y-4">
              {systemPrompts.map((prompt) => (
                <div 
                  key={prompt.id} 
                  className={`rounded-lg p-6 cursor-pointer transition-all ${
                    selectedPrompt?.id === prompt.id ? 'ring-2 ring-white/20' : ''
                  }`}
                  style={{ backgroundColor: '#f6f8f9' }}
                  onClick={() => setSelectedPrompt(prompt)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getCategoryIcon(prompt.category)}</span>
                        <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                          {prompt.name}
                        </h3>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            prompt.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {prompt.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium text-white"
                          style={{ backgroundColor: getPriorityColor(prompt.priority) }}
                        >
                          {prompt.priority.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-sm opacity-70 mb-3" style={{ color: '#1e3237' }}>
                        {prompt.description}
                      </p>

                      <div className="flex items-center space-x-4 text-sm">
                        <span style={{ color: '#146448' }}>v{prompt.version}</span>
                        <span style={{ color: '#1e3237', opacity: '0.7' }}>
                          {prompt.lastModified} • {prompt.modifiedBy}
                        </span>
                      </div>
                    </div>

                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPrompt(prompt);
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

          {/* Prompt Detail Panel */}
          <div>
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Prompt Detayı</h2>
            {selectedPrompt ? (
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{getCategoryIcon(selectedPrompt.category)}</span>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                      {selectedPrompt.name}
                    </h3>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                      {selectedPrompt.description}
                    </p>
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Kategori:</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>
                      {selectedPrompt.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Öncelik:</span>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: getPriorityColor(selectedPrompt.priority) }}
                    >
                      {selectedPrompt.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Versiyon:</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>
                      v{selectedPrompt.version}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Durum:</span>
                    <span 
                      className={`text-sm font-medium ${
                        selectedPrompt.isActive ? 'text-green-600' : 'text-gray-600'
                      }`}
                    >
                      {selectedPrompt.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2" style={{ color: '#1e3237' }}>Prompt İçeriği:</h4>
                  <div 
                    className="p-4 rounded border text-sm whitespace-pre-wrap max-h-96 overflow-y-auto"
                    style={{ borderColor: '#146448', backgroundColor: '#f8f9fa', color: '#1e3237' }}
                  >
                    {selectedPrompt.content}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingPrompt(selectedPrompt)}
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                  >
                    📝 Düzenle
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    🧪 Test Et
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="rounded-lg p-6 text-center"
                style={{ backgroundColor: '#f6f8f9' }}
              >
                <div className="text-4xl mb-4">📋</div>
                <p style={{ color: '#1e3237' }}>Detayları görmek için bir prompt seçin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div 
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg p-6"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold" style={{ color: '#1e3237' }}>
                Sistem Promptu Düzenle
              </h3>
              <button
                onClick={() => setEditingPrompt(null)}
                className="text-2xl hover:opacity-70"
                style={{ color: '#1e3237' }}
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Prompt Adı
                </label>
                <input 
                  type="text" 
                  value={editingPrompt.name}
                  className="w-full p-3 border rounded-lg" 
                  style={{ borderColor: '#146448' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Açıklama
                </label>
                <input 
                  type="text" 
                  value={editingPrompt.description}
                  className="w-full p-3 border rounded-lg" 
                  style={{ borderColor: '#146448' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Kategori
                  </label>
                  <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                    <option value="core">Core</option>
                    <option value="analysis">Analysis</option>
                    <option value="safety">Safety</option>
                    <option value="optimization">Optimization</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Öncelik
                  </label>
                  <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Prompt İçeriği
                </label>
                <textarea 
                  value={editingPrompt.content}
                  className="w-full p-3 border rounded-lg h-64" 
                  style={{ borderColor: '#146448' }}
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setEditingPrompt(null)}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#6B7280', color: '#f6f8f9' }}
                >
                  İptal
                </button>
                <button
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
    </div>
  );
}
