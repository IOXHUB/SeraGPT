'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

interface AIModelMetrics {
  name: string;
  version: string;
  status: 'active' | 'training' | 'error' | 'maintenance';
  accuracy: number;
  responseTime: number;
  tokensUsed: number;
  cost: number;
  lastUpdate: string;
}

interface AISystemStats {
  totalRequests: number;
  successRate: number;
  avgResponseTime: number;
  totalTokensUsed: number;
  totalCost: number;
  activeModels: number;
}

export default function AIPanelPage() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [aiStats, setAiStats] = useState<AISystemStats | null>(null);
  const [models, setModels] = useState<AIModelMetrics[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const tabs = [
    { id: 'overview', title: 'Genel Bakış', icon: '📊' },
    { id: 'models', title: 'Model Yönetimi', icon: '🤖' },
    { id: 'training', title: 'Eğitim & Fine-tuning', icon: '🎯' },
    { id: 'prompts', title: 'Prompt Engineering', icon: '💬' },
    { id: 'performance', title: 'Performans İzleme', icon: '⚡' },
    { id: 'costs', title: 'Maliyet Analizi', icon: '����' }
  ];

  const analysisTypes = [
    {
      name: 'ROI Analysis',
      model: 'GPT-4-Turbo',
      accuracy: 94.2,
      usage: 1245,
      avgTokens: 850,
      status: 'optimized'
    },
    {
      name: 'Climate Analysis',
      model: 'GPT-4',
      accuracy: 91.8,
      usage: 892,
      avgTokens: 1200,
      status: 'active'
    },
    {
      name: 'Equipment Recommendations',
      model: 'GPT-3.5-Turbo',
      accuracy: 88.5,
      usage: 567,
      avgTokens: 650,
      status: 'needs-tuning'
    },
    {
      name: 'Market Analysis',
      model: 'GPT-4',
      accuracy: 92.3,
      usage: 434,
      avgTokens: 950,
      status: 'active'
    },
    {
      name: 'Layout Planning',
      model: 'GPT-4-Vision',
      accuracy: 89.7,
      usage: 298,
      avgTokens: 1100,
      status: 'experimental'
    }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadAIData();
    }
  }, [user, loading]);

  const loadAIData = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock AI system data
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const mockStats: AISystemStats = {
        totalRequests: 45230,
        successRate: 98.7,
        avgResponseTime: 1.8,
        totalTokensUsed: 2840000,
        totalCost: 4567.89,
        activeModels: 8
      };

      const mockModels: AIModelMetrics[] = [
        {
          name: 'GPT-4-Turbo',
          version: '2024-04-09',
          status: 'active',
          accuracy: 94.2,
          responseTime: 1.2,
          tokensUsed: 850000,
          cost: 1234.56,
          lastUpdate: '2 saat önce'
        },
        {
          name: 'GPT-4',
          version: '2024-03-01',
          status: 'active',
          accuracy: 92.1,
          responseTime: 1.8,
          tokensUsed: 1200000,
          cost: 2345.67,
          lastUpdate: '5 saat önce'
        },
        {
          name: 'GPT-3.5-Turbo',
          version: '2024-01-25',
          status: 'active',
          accuracy: 87.9,
          responseTime: 0.9,
          tokensUsed: 650000,
          cost: 456.78,
          lastUpdate: '1 gün önce'
        },
        {
          name: 'Custom-SeraGPT-v1',
          version: '1.0.0',
          status: 'training',
          accuracy: 91.5,
          responseTime: 2.1,
          tokensUsed: 340000,
          cost: 890.12,
          lastUpdate: '12 saat önce'
        }
      ];
      
      setAiStats(mockStats);
      setModels(mockModels);
      
    } catch (error) {
      console.error('Failed to load AI data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>AI Yönetim Paneli</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Yapay zeka sistemleri kontrol merkezi</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                🔄 Modelleri Yenile
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* AI System Stats */}
        {aiStats && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>AI Sistem İstatistikleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam İstek</p>
                    <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{aiStats.totalRequests.toLocaleString()}</p>
                  </div>
                  <div className="text-2xl">🚀</div>
                </div>
                <p className="text-sm mt-2" style={{ color: '#146448' }}>Son 30 gün</p>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Başarı Oranı</p>
                    <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{aiStats.successRate}%</p>
                  </div>
                  <div className="text-2xl">✅</div>
                </div>
                <p className="text-sm mt-2" style={{ color: '#146448' }}>Hedef: %95+</p>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Ortalama Yanıt</p>
                    <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{aiStats.avgResponseTime}s</p>
                  </div>
                  <div className="text-2xl">⚡</div>
                </div>
                <p className="text-sm mt-2" style={{ color: '#146448' }}>Hedef: <3s</p>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Token</p>
                    <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{(aiStats.totalTokensUsed / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="text-2xl">🔤</div>
                </div>
                <p className="text-sm mt-2" style={{ color: '#146448' }}>Bu ay kullanılan</p>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Maliyet</p>
                    <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>${aiStats.totalCost.toLocaleString()}</p>
                  </div>
                  <div className="text-2xl">💰</div>
                </div>
                <p className="text-sm mt-2" style={{ color: '#146448' }}>Bu ay</p>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Model</p>
                    <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{aiStats.activeModels}</p>
                  </div>
                  <div className="text-2xl">🤖</div>
                </div>
                <p className="text-sm mt-2" style={{ color: '#146448' }}>Çalışan model sayısı</p>
              </div>
            </div>
          </div>
        )}

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
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>AI Modelleri Genel Bakış</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {models.map((model) => (
                  <div key={model.name} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold" style={{ color: '#1e3237' }}>{model.name}</h4>
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          model.status === 'active' ? 'bg-green-100 text-green-700' :
                          model.status === 'training' ? 'bg-blue-100 text-blue-700' :
                          model.status === 'error' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {model.status === 'active' ? 'Aktif' :
                         model.status === 'training' ? 'Eğitim' :
                         model.status === 'error' ? 'Hata' : 'Bakım'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Doğruluk</p>
                        <p className="font-semibold" style={{ color: '#146448' }}>{model.accuracy}%</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Yanıt Süresi</p>
                        <p className="font-semibold" style={{ color: '#146448' }}>{model.responseTime}s</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Token Kullanımı</p>
                        <p className="font-semibold" style={{ color: '#146448' }}>{(model.tokensUsed / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Maliyet</p>
                        <p className="font-semibold" style={{ color: '#146448' }}>${model.cost.toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="text-xs mt-4 opacity-60" style={{ color: '#1e3237' }}>
                      Son güncelleme: {model.lastUpdate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'models' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Analiz Türleri ve Model Performansı</h3>
              <div className="space-y-4">
                {analysisTypes.map((analysis) => (
                  <div key={analysis.name} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2" style={{ color: '#1e3237' }}>{analysis.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Model</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{analysis.model}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Doğruluk</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{analysis.accuracy}%</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Kullanım</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{analysis.usage}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Ort. Token</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{analysis.avgTokens}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Durum</p>
                            <span 
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                analysis.status === 'optimized' ? 'bg-green-100 text-green-700' :
                                analysis.status === 'active' ? 'bg-blue-100 text-blue-700' :
                                analysis.status === 'needs-tuning' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-purple-100 text-purple-700'
                              }`}
                            >
                              {analysis.status === 'optimized' ? 'Optimize' :
                               analysis.status === 'active' ? 'Aktif' :
                               analysis.status === 'needs-tuning' ? 'Ayar Gerekli' : 'Deneysel'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-6">
                        <button
                          className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                        >
                          Optimize Et
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'training' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Model Eğitimi ve Fine-tuning</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Aktif Eğitim İşleri</h4>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4" style={{ borderColor: '#146448' }}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium" style={{ color: '#1e3237' }}>SeraGPT-ROI-v2</span>
                        <span className="text-sm" style={{ color: '#146448' }}>75% tamamlandı</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ backgroundColor: '#baf200', width: '75%' }}></div>
                      </div>
                      <p className="text-sm mt-2 opacity-70" style={{ color: '#1e3237' }}>
                        Tahmini tamamlanma: 2 saat
                      </p>
                    </div>
                    <div className="border rounded-lg p-4" style={{ borderColor: '#146448' }}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium" style={{ color: '#1e3237' }}>Climate-Analysis-v3</span>
                        <span className="text-sm" style={{ color: '#146448' }}>30% tamamlandı</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ backgroundColor: '#baf200', width: '30%' }}></div>
                      </div>
                      <p className="text-sm mt-2 opacity-70" style={{ color: '#1e3237' }}>
                        Tahmini tamamlanma: 6 saat
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Yeni Eğitim Başlat</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Analiz Türü
                      </label>
                      <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        <option>ROI Analysis</option>
                        <option>Climate Analysis</option>
                        <option>Equipment Recommendations</option>
                        <option>Market Analysis</option>
                        <option>Layout Planning</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Base Model
                      </label>
                      <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        <option>GPT-4-Turbo</option>
                        <option>GPT-4</option>
                        <option>GPT-3.5-Turbo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Eğitim Verisi
                      </label>
                      <input 
                        type="file" 
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                        accept=".jsonl,.csv"
                      />
                    </div>
                    <button
                      className="w-full py-3 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      🚀 Eğitimi Başlat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prompts' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Prompt Engineering</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Sistem Promptları</h4>
                    <div className="space-y-4">
                      {['ROI Analysis', 'Climate Analysis', 'Equipment Recommendations'].map((type) => (
                        <div key={type} className="border rounded-lg p-4" style={{ borderColor: '#146448' }}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium" style={{ color: '#1e3237' }}>{type}</span>
                            <button 
                              className="text-sm px-3 py-1 rounded hover:opacity-80"
                              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                            >
                              Düzenle
                            </button>
                          </div>
                          <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                            Son güncelleme: 2 gün önce • Versiyon: 1.2.3
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Prompt İstatistikleri</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Prompt</p>
                        <p className="text-2xl font-bold" style={{ color: '#146448' }}>24</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Versiyon</p>
                        <p className="text-2xl font-bold" style={{ color: '#146448' }}>18</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Test Edilen</p>
                        <p className="text-2xl font-bold" style={{ color: '#146448' }}>156</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Başarı Oranı</p>
                        <p className="text-2xl font-bold" style={{ color: '#146448' }}>94.2%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Performans İzleme</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Yanıt Süreleri (Son 24 Saat)</h4>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {Array.from({ length: 24 }, (_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          backgroundColor: '#baf200',
                          height: `${Math.random() * 80 + 20}%`,
                          minHeight: '8px'
                        }}
                        title={`${i}:00 - ${(Math.random() * 3 + 0.5).toFixed(1)}s`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs mt-2 opacity-70" style={{ color: '#1e3237' }}>
                    <span>00:00</span>
                    <span>12:00</span>
                    <span>24:00</span>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Hata Durumları</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#1e3237' }}>Rate Limit Exceeded</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#1e3237' }}>Timeout Errors</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#1e3237' }}>Invalid Response</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#1e3237' }}>Model Unavailable</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'costs' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Maliyet Analizi</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Model Bazlı Maliyetler</h4>
                  <div className="space-y-4">
                    {models.map((model) => (
                      <div key={model.name} className="flex justify-between items-center py-2 border-b border-gray-200">
                        <div>
                          <span className="font-medium" style={{ color: '#1e3237' }}>{model.name}</span>
                          <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                            {(model.tokensUsed / 1000).toFixed(0)}K tokens
                          </p>
                        </div>
                        <span className="font-semibold" style={{ color: '#146448' }}>${model.cost.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Maliyet Optimizasyonu</h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                      <h5 className="font-medium text-yellow-800 mb-2">💡 Öneriler</h5>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• GPT-3.5-Turbo kullanımını %30 artırarak maliyet azaltılabilir</li>
                        <li>• Prompt optimizasyonu ile token kullanımı %15 azaltılabilir</li>
                        <li>• Cache stratejisi ile tekrar eden sorgular önlenebilir</li>
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Bu Ay</p>
                        <p className="text-xl font-bold" style={{ color: '#146448' }}>$4,567</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Önceki Ay</p>
                        <p className="text-xl font-bold" style={{ color: '#146448' }}>$3,892</p>
                      </div>
                    </div>
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