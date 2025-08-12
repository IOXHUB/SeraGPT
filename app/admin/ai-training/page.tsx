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
  const [showNewTrainingModal, setShowNewTrainingModal] = useState(false);
  const [isCreatingTraining, setIsCreatingTraining] = useState(false);
  const [newTrainingForm, setNewTrainingForm] = useState({
    name: '',
    type: 'fine-tuning',
    datasetId: '',
    epochs: 5,
    learningRate: 0.001,
    batchSize: 32
  });

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
        setJobs(data.data.jobs || []);
        setDatasets(data.data.datasets || []);
      } else {
        throw new Error(data.error || 'Failed to load training data');
      }

    } catch (error) {
      console.error('Failed to load training data:', error);
      // Set empty states instead of mock data
      setJobs([]);
      setDatasets([]);
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

  const handleCreateTraining = async () => {
    if (!newTrainingForm.name || !newTrainingForm.datasetId) {
      alert('Lütfen eğitim adı ve veri seti seçin');
      return;
    }

    setIsCreatingTraining(true);
    try {
      const response = await fetch('/api/admin/ai-training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTrainingForm),
      });

      const result = await response.json();

      if (result.success) {
        // Add new training to jobs list
        setJobs(prev => [result.data, ...prev]);
        setShowNewTrainingModal(false);
        // Reset form
        setNewTrainingForm({
          name: '',
          type: 'fine-tuning',
          datasetId: '',
          epochs: 5,
          learningRate: 0.001,
          batchSize: 32
        });
        alert('✅ Yeni eğitim başarıyla başlatıldı!');
      } else {
        alert('❌ Eğitim başlatılamadı: ' + result.error);
      }
    } catch (error) {
      console.error('Error creating training:', error);
      alert('❌ Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsCreatingTraining(false);
    }
  };

  const openNewTrainingModal = () => {
    setShowNewTrainingModal(true);
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
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {jobs.length > 0 ? ((jobs.filter(j => j.status === 'completed').length / jobs.length) * 100).toFixed(1) : 0}%
                </p>
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
              {jobs.length === 0 ? (
                <div className="rounded-lg p-12 text-center" style={{ backgroundColor: '#f6f8f9' }}>
                  <div className="text-6xl mb-4">🤖</div>
                  <h4 className="text-xl font-semibold mb-2" style={{ color: '#1e3237' }}>
                    Henüz Aktif Eğitim Yok
                  </h4>
                  <p className="text-sm opacity-70 mb-6" style={{ color: '#1e3237' }}>
                    AI model eğitimi başlatmak için yeni bir eğitim işi oluşturun
                  </p>
                  <button
                    className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    ➕ Yeni Eğitim Başlat
                  </button>
                </div>
              ) : (
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
                            <p className="font-medium" style={{ color: '#146448' }}>{job.datasetSize?.toLocaleString() || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Maliyet</p>
                            <p className="font-medium" style={{ color: '#146448' }}>${job.cost?.toFixed(2) || '0.00'}</p>
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
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'datasets' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Veri Setleri</h3>
              {datasets.length === 0 ? (
                <div className="rounded-lg p-12 text-center" style={{ backgroundColor: '#f6f8f9' }}>
                  <div className="text-6xl mb-4">📊</div>
                  <h4 className="text-xl font-semibold mb-2" style={{ color: '#1e3237' }}>
                    Henüz Veri Seti Yok
                  </h4>
                  <p className="text-sm opacity-70 mb-6" style={{ color: '#1e3237' }}>
                    AI eğitimi için veri setleri yükleyin veya oluşturun
                  </p>
                  <button
                    className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    ➕ Veri Seti Ekle
                  </button>
                </div>
              ) : (
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
                          <p className="font-medium" style={{ color: '#146448' }}>{dataset.samples?.toLocaleString() || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Kalite</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{dataset.quality?.toFixed(1) || 'N/A'}%</p>
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {(activeTab === 'models' || activeTab === 'hyperparams' || activeTab === 'monitoring' || activeTab === 'history') && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>
                {activeTab === 'models' && 'Eğitilmiş Modeller'}
                {activeTab === 'hyperparams' && 'Hiperparametre Yönetimi'}
                {activeTab === 'monitoring' && 'Eğitim İzleme'}
                {activeTab === 'history' && 'Eğitim Geçmişi'}
              </h3>
              <div className="rounded-lg p-12 text-center" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="text-6xl mb-4">⚙️</div>
                <h4 className="text-xl font-semibold mb-2" style={{ color: '#1e3237' }}>
                  Bu Özellik Geliştiriliyor
                </h4>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                  {activeTab === 'models' && 'Model yönetimi özellikleri yakında eklenecek'}
                  {activeTab === 'hyperparams' && 'Hiperparametre ayarlama araçları yakında eklenecek'}
                  {activeTab === 'monitoring' && 'Eğitim izleme dashboard\'u yakında eklenecek'}
                  {activeTab === 'history' && 'Geçmiş eğitim raporları yakında eklenecek'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
