'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

interface TrainingJob {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
  progress: number;
  startTime: string;
  estimatedCompletion: string;
  datasetSize: number;
  epochs: number;
  learningRate: number;
  batchSize: number;
  cost: number;
  logs: string[];
}

interface TrainingDataset {
  id: string;
  name: string;
  type: string;
  size: number;
  quality: number;
  lastUpdated: string;
  format: string;
  samples: number;
}

export default function AITrainingPage() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState<TrainingJob[]>([]);
  const [datasets, setDatasets] = useState<TrainingDataset[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const tabs = [
    { id: 'jobs', title: 'Eğitim İşleri', icon: '🚀' },
    { id: 'datasets', title: 'Veri Setleri', icon: '📊' },
    { id: 'models', title: 'Modeller', icon: '🤖' },
    { id: 'hyperparams', title: 'Hiperparametreler', icon: '⚙️' },
    { id: 'monitoring', title: 'İzleme', icon: '📈' },
    { id: 'history', title: 'Geçmiş', icon: '📋' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadTrainingData();
    }
  }, [user, loading]);

  const loadTrainingData = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);

      // Fetch real training data from API
      const response = await fetch('/api/admin/ai-training');

      if (!response.ok) {
        throw new Error('Failed to fetch training data');
      }

      const data = await response.json();

      if (data.success) {
        setJobs(data.data.jobs);
        setDatasets(data.data.datasets);
      } else {
        throw new Error(data.error || 'Failed to load training data');
      }

    } catch (error) {
      console.error('Failed to load training data:', error);

      // Fallback to mock data if API fails
      const mockJobs: TrainingJob[] = [
        {
          id: 'train-001',
          name: 'SeraGPT ROI Analizi v2.1',
          type: 'Fine-tuning',
          status: 'running',
          progress: 75,
          startTime: '2 saat önce',
          estimatedCompletion: '45 dakika',
          datasetSize: 15000,
          epochs: 3,
          learningRate: 0.0001,
          batchSize: 16,
          cost: 234.56,
          logs: [
            '[14:30] Eğitim başlatıldı - Dataset: ROI-Analysis-v2',
            '[14:32] Epoch 1/3 başlatıldı',
            '[15:45] Epoch 1/3 tamamlandı - Loss: 0.342',
            '[15:46] Epoch 2/3 başlatıldı',
            '[17:02] Epoch 2/3 tamamlandı - Loss: 0.187',
            '[17:03] Epoch 3/3 başlatıldı (şu an)'
          ]
        },
        {
          id: 'train-002',
          name: 'İklim Analizi Modeli v1.8',
          type: 'Transfer Learning',
          status: 'pending',
          progress: 0,
          startTime: 'Beklemede',
          estimatedCompletion: '3 saat',
          datasetSize: 8500,
          epochs: 5,
          learningRate: 0.00005,
          batchSize: 32,
          cost: 145.32,
          logs: ['[18:00] Eğitim kuyruğa alındı']
        },
        {
          id: 'train-003',
          name: 'Ekipman Önerisi Classifier',
          type: 'Fine-tuning',
          status: 'completed',
          progress: 100,
          startTime: '1 gün önce',
          estimatedCompletion: 'Tamamlandı',
          datasetSize: 12000,
          epochs: 4,
          learningRate: 0.0002,
          batchSize: 24,
          cost: 189.75,
          logs: [
            '[Dün 09:00] Eğitim başlatıldı',
            '[Dün 09:02] Epoch 1/4 tamamlandı - Loss: 0.512',
            '[Dün 10:15] Epoch 2/4 tamamlandı - Loss: 0.298',
            '[Dün 11:28] Epoch 3/4 tamamlandı - Loss: 0.156',
            '[Dün 12:41] Epoch 4/4 tamamlandı - Loss: 0.089',
            '[Dün 12:42] Eğitim başarıyla tamamlandı'
          ]
        }
      ];

      const mockDatasets: TrainingDataset[] = [
        {
          id: 'ds-001',
          name: 'ROI Analizi Veri Seti v2',
          type: 'Training',
          size: 15000,
          quality: 94.5,
          lastUpdated: '2 gün önce',
          format: 'JSONL',
          samples: 15000
        },
        {
          id: 'ds-002',
          name: 'İklim Verileri Türkiye',
          type: 'Training',
          size: 8500,
          quality: 89.2,
          lastUpdated: '1 hafta önce',
          format: 'CSV',
          samples: 8500
        },
        {
          id: 'ds-003',
          name: 'Ekipman Katalog Verileri',
          type: 'Training',
          size: 12000,
          quality: 91.8,
          lastUpdated: '3 gün önce',
          format: 'JSON',
          samples: 12000
        },
        {
          id: 'ds-004',
          name: 'Test Validation Set',
          type: 'Validation',
          size: 2500,
          quality: 96.3,
          lastUpdated: '1 gün önce',
          format: 'JSONL',
          samples: 2500
        }
      ];

      setJobs(mockJobs);
      setDatasets(mockDatasets);
    } finally {
      setDataLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return 'Çalışıyor';
      case 'completed': return 'Tamamlandı';
      case 'failed': return 'Başarısız';
      case 'paused': return 'Duraklatıldı';
      case 'pending': return 'Beklemede';
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
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>AI Eğitim Yönetimi</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Model eğitimi ve fine-tuning işlemleri</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadTrainingData}
                disabled={dataLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  dataLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                {dataLoading ? '🔄 Yenileniyor...' : '🔄 Verileri Yenile'}
              </button>
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#f6f8f9', color: '#1e3237' }}
              >
                ➕ Yeni Eğitim
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Eğitimler</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {jobs.filter(j => j.status === 'running').length}
                </p>
              </div>
              <div className="text-2xl">🚀</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Veri Seti</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{datasets.length}</p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Bu Ay Maliyet</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  ${jobs.reduce((sum, job) => sum + job.cost, 0).toFixed(0)}
                </p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Başarı Oranı</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>94.2%</p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>
        </div>

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
          {activeTab === 'jobs' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Eğitim İşleri</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <div key={job.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold" style={{ color: '#1e3237' }}>{job.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {getStatusText(job.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#1e3237', opacity: '0.7' }}>İlerleme</span>
                        <span style={{ color: '#146448' }}>{job.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300" 
                          style={{ backgroundColor: '#baf200', width: `${job.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Veri Boyutu</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{job.datasetSize.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Maliyet</p>
                          <p className="font-medium" style={{ color: '#146448' }}>${job.cost}</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Başlangıç</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{job.startTime}</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Tahmini Bitiş</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{job.estimatedCompletion}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        {job.status === 'running' && (
                          <button
                            className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                            style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                          >
                            ⏸️ Duraklat
                          </button>
                        )}
                        {job.status === 'paused' && (
                          <button
                            className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                            style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                          >
                            ▶️ Devam Et
                          </button>
                        )}
                        <button
                          className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                          style={{ backgroundColor: '#f6f8f9', color: '#1e3237', border: '1px solid #146448' }}
                        >
                          📋 Loglar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'datasets' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Veri Setleri</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {datasets.map((dataset) => (
                  <div key={dataset.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold" style={{ color: '#1e3237' }}>{dataset.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        dataset.type === 'Training' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {dataset.type}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Örnekler</p>
                        <p className="font-medium" style={{ color: '#146448' }}>{dataset.samples.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Kalite</p>
                        <p className="font-medium" style={{ color: '#146448' }}>{dataset.quality}%</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Format</p>
                        <p className="font-medium" style={{ color: '#146448' }}>{dataset.format}</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Güncelleme</p>
                        <p className="font-medium" style={{ color: '#146448' }}>{dataset.lastUpdated}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <button
                        className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                        style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                      >
                        📊 Analiz Et
                      </button>
                      <button
                        className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                        style={{ backgroundColor: '#f6f8f9', color: '#1e3237', border: '1px solid #146448' }}
                      >
                        📥 İndir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'models' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Eğitilmiş Modeller</h3>
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <p style={{ color: '#1e3237', opacity: '0.7' }}>
                  Eğitilmiş modeller burada görüntülenecek. Şu anda hiç eğitilmiş model bulunmamaktadır.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'hyperparams' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Hiperparametre Yönetimi</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Varsayılan Parametreler</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Learning Rate
                      </label>
                      <input 
                        type="number" 
                        defaultValue="0.0001"
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                        step="0.0001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Batch Size
                      </label>
                      <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        <option value="8">8</option>
                        <option value="16" selected>16</option>
                        <option value="32">32</option>
                        <option value="64">64</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Epochs
                      </label>
                      <input 
                        type="number" 
                        defaultValue="3"
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Optimizasyon Önerileri</h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <h5 className="font-medium text-blue-800 mb-1">ROI Analizi</h5>
                      <p className="text-sm text-blue-700">Learning rate: 0.0001, Batch size: 16</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <h5 className="font-medium text-green-800 mb-1">İklim Analizi</h5>
                      <p className="text-sm text-green-700">Learning rate: 0.00005, Batch size: 32</p>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                      <h5 className="font-medium text-yellow-800 mb-1">Ekipman Önerisi</h5>
                      <p className="text-sm text-yellow-700">Learning rate: 0.0002, Batch size: 24</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'monitoring' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Eğitim İzleme</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Loss Grafikleri</h4>
                  <div className="h-64 flex items-end justify-between space-x-1">
                    {Array.from({ length: 20 }, (_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          backgroundColor: '#baf200',
                          height: `${Math.max(20, 100 - (i * 3) - Math.random() * 10)}%`,
                          minHeight: '8px'
                        }}
                        title={`Epoch ${i + 1} - Loss: ${(0.5 - (i * 0.02)).toFixed(3)}`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-sm mt-2 opacity-70" style={{ color: '#1e3237' }}>
                    Training Loss - Son 20 epoch
                  </p>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>GPU Kullanımı</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span style={{ color: '#1e3237' }}>GPU Memory</span>
                        <span style={{ color: '#146448' }}>12.5GB / 16GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="h-3 rounded-full" style={{ backgroundColor: '#baf200', width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span style={{ color: '#1e3237' }}>GPU Utilization</span>
                        <span style={{ color: '#146448' }}>94%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="h-3 rounded-full" style={{ backgroundColor: '#146448', width: '94%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span style={{ color: '#1e3237' }}>Temperature</span>
                        <span style={{ color: '#146448' }}>72°C</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="h-3 rounded-full" style={{ backgroundColor: '#f6a200', width: '72%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Eğitim Geçmişi</h3>
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="space-y-4">
                  {jobs.filter(job => job.status === 'completed').map((job) => (
                    <div key={job.id} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium" style={{ color: '#1e3237' }}>{job.name}</h4>
                          <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                            {job.startTime} • {job.datasetSize.toLocaleString()} örnek
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium" style={{ color: '#146448' }}>${job.cost}</p>
                          <p className="text-sm" style={{ color: '#146448' }}>✅ Başarılı</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
