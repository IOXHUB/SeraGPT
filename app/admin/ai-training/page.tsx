'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface TrainingJob {
  id: string;
  name: string;
  model: string;
  status: 'preparing' | 'training' | 'completed' | 'failed' | 'paused';
  progress: number;
  startTime: string;
  estimatedCompletion: string;
  datasetSize: number;
  epochs: number;
  currentEpoch: number;
  loss: number;
  accuracy: number;
  cost: number;
}

interface TrainingDataset {
  id: string;
  name: string;
  description: string;
  size: number;
  format: 'jsonl' | 'csv' | 'json';
  createdAt: string;
  lastUsed: string;
  quality: number;
}

export default function AITrainingPage() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([]);
  const [datasets, setDatasets] = useState<TrainingDataset[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [newTraining, setNewTraining] = useState({
    name: '',
    model: 'GPT-4-Turbo',
    dataset: '',
    epochs: 10,
    learningRate: 0.001,
    batchSize: 32,
    description: ''
  });

  const tabs = [
    { id: 'overview', title: 'Genel Bakış', icon: '📊' },
    { id: 'jobs', title: 'Eğitim İşleri', icon: '🔄' },
    { id: 'datasets', title: 'Veri Setleri', icon: '📚' },
    { id: 'new-training', title: 'Yeni Eğitim', icon: '➕' },
    { id: 'analytics', title: 'Analitik', icon: '📈' }
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
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTrainingJobs: TrainingJob[] = [
        {
          id: 'job-001',
          name: 'SeraGPT-ROI-v3',
          model: 'GPT-4-Turbo',
          status: 'training',
          progress: 75,
          startTime: '2024-03-15 14:30',
          estimatedCompletion: '2 saat',
          datasetSize: 15000,
          epochs: 10,
          currentEpoch: 7,
          loss: 0.23,
          accuracy: 94.2,
          cost: 234.56
        },
        {
          id: 'job-002',
          name: 'Climate-Analysis-v2',
          model: 'GPT-4',
          status: 'training',
          progress: 30,
          startTime: '2024-03-15 16:15',
          estimatedCompletion: '6 saat',
          datasetSize: 8500,
          epochs: 8,
          currentEpoch: 2,
          loss: 0.45,
          accuracy: 87.1,
          cost: 156.78
        },
        {
          id: 'job-003',
          name: 'Equipment-Recommender-v1',
          model: 'GPT-3.5-Turbo',
          status: 'completed',
          progress: 100,
          startTime: '2024-03-14 09:00',
          estimatedCompletion: 'Tamamlandı',
          datasetSize: 5000,
          epochs: 6,
          currentEpoch: 6,
          loss: 0.18,
          accuracy: 91.5,
          cost: 89.23
        },
        {
          id: 'job-004',
          name: 'Market-Insights-v1',
          model: 'GPT-4',
          status: 'failed',
          progress: 45,
          startTime: '2024-03-13 11:20',
          estimatedCompletion: 'Hata',
          datasetSize: 12000,
          epochs: 12,
          currentEpoch: 5,
          loss: 0.67,
          accuracy: 78.3,
          cost: 67.89
        }
      ];

      const mockDatasets: TrainingDataset[] = [
        {
          id: 'dataset-001',
          name: 'ROI Analysis Training Set',
          description: 'Sera ROI hesaplamaları için eğitim verisi',
          size: 15000,
          format: 'jsonl',
          createdAt: '2024-02-10',
          lastUsed: '2024-03-15',
          quality: 96.5
        },
        {
          id: 'dataset-002',
          name: 'Climate Data Collection',
          description: 'İklim analizi ve öngörü verileri',
          size: 8500,
          format: 'csv',
          createdAt: '2024-02-15',
          lastUsed: '2024-03-15',
          quality: 94.2
        },
        {
          id: 'dataset-003',
          name: 'Equipment Database',
          description: 'Sera ekipmanları önerileri ve spesifikasyonları',
          size: 5000,
          format: 'json',
          createdAt: '2024-02-20',
          lastUsed: '2024-03-14',
          quality: 92.8
        },
        {
          id: 'dataset-004',
          name: 'Market Trends Dataset',
          description: 'Pazar trendleri ve fiyat analizi verileri',
          size: 12000,
          format: 'jsonl',
          createdAt: '2024-01-30',
          lastUsed: '2024-03-13',
          quality: 89.1
        }
      ];
      
      setTrainingJobs(mockTrainingJobs);
      setDatasets(mockDatasets);
      
    } catch (error) {
      console.error('Failed to load training data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'training': return '#3B82F6';
      case 'completed': return '#10B981';
      case 'failed': return '#EF4444';
      case 'paused': return '#F59E0B';
      case 'preparing': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'training': return 'Eğitiliyor';
      case 'completed': return 'Tamamlandı';
      case 'failed': return 'Hata';
      case 'paused': return 'Duraklatıldı';
      case 'preparing': return 'Hazırlanıyor';
      default: return 'Bilinmiyor';
    }
  };

  const startTraining = async () => {
    if (!newTraining.name || !newTraining.dataset) {
      alert('Lütfen ad ve veri seti seçin');
      return;
    }

    const job: TrainingJob = {
      id: `job-${Date.now()}`,
      name: newTraining.name,
      model: newTraining.model,
      status: 'preparing',
      progress: 0,
      startTime: new Date().toLocaleString('tr-TR'),
      estimatedCompletion: '4-6 saat',
      datasetSize: datasets.find(d => d.id === newTraining.dataset)?.size || 0,
      epochs: newTraining.epochs,
      currentEpoch: 0,
      loss: 0,
      accuracy: 0,
      cost: Math.random() * 200 + 100
    };

    setTrainingJobs(prev => [job, ...prev]);
    setNewTraining({ name: '', model: 'GPT-4-Turbo', dataset: '', epochs: 10, learningRate: 0.001, batchSize: 32, description: '' });
    alert('Eğitim işi başlatıldı!');

    // Simulate training progress
    setTimeout(() => {
      setTrainingJobs(prev => prev.map(j =>
        j.id === job.id ? { ...j, status: 'training', progress: 25, currentEpoch: 2 } : j
      ));
    }, 2000);
  };

  const pauseTraining = async (jobId: string) => {
    setTrainingJobs(prev => prev.map(j =>
      j.id === jobId ? { ...j, status: 'paused' } : j
    ));
    alert('Eğitim duraklatıldı!');
  };

  const resumeTraining = async (jobId: string) => {
    setTrainingJobs(prev => prev.map(j =>
      j.id === jobId ? { ...j, status: 'training' } : j
    ));
    alert('Eğitim devam ediyor!');
  };

  const viewTrainingDetails = (job: TrainingJob) => {
    alert(`Eğitim Detayları:\n\nAd: ${job.name}\nModel: ${job.model}\nDurum: ${getStatusText(job.status)}\nİlerleme: ${job.progress}%\nDoğruluk: ${job.accuracy}%\nMaliyet: $${job.cost}`);
  };

  const inspectDataset = (dataset: TrainingDataset) => {
    alert(`Veri Seti Detayları:\n\nAd: ${dataset.name}\nAçıklama: ${dataset.description}\nBoyut: ${dataset.size.toLocaleString()} kayıt\nFormat: ${dataset.format.toUpperCase()}\nKalite: ${dataset.quality}%`);
  };

  const startTrainingWithDataset = (dataset: TrainingDataset) => {
    setNewTraining(prev => ({ ...prev, dataset: dataset.id, name: `${dataset.name}-Training-${Date.now()}` }));
    setActiveTab('new-training');
    alert(`${dataset.name} veri seti seçildi. Yeni eğitim formuna yönlendiriliyorsunuz.`);
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
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
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>AI Eğitim & Fine-tuning</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Model eğitimi ve optimizasyon merkezi</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                🚀 Yeni Eğitim Başlat
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Training Overview Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Eğitim İstatistikleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Eğitim</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    {trainingJobs.filter(j => j.status === 'training').length}
                  </p>
                </div>
                <div className="text-2xl">🔄</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>
                {trainingJobs.filter(j => j.status === 'preparing').length} hazırlanıyor
              </p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Tamamlanan</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    {trainingJobs.filter(j => j.status === 'completed').length}
                  </p>
                </div>
                <div className="text-2xl">✅</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Bu ay</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Veri</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    {datasets.reduce((acc, d) => acc + d.size, 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-2xl">📚</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>
                {datasets.length} veri seti
              </p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Maliyet</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    ${trainingJobs.reduce((acc, j) => acc + j.cost, 0).toFixed(0)}
                  </p>
                </div>
                <div className="text-2xl">💰</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Bu ay</p>
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
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Son Eğitim İşleri</h3>
                <div className="space-y-4">
                  {trainingJobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="border rounded-lg p-4" style={{ borderColor: '#146448' }}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium" style={{ color: '#1e3237' }}>{job.name}</span>
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium text-white"
                          style={{ backgroundColor: getStatusColor(job.status) }}
                        >
                          {getStatusText(job.status)}
                        </span>
                      </div>
                      {job.status === 'training' && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ backgroundColor: '#baf200', width: `${job.progress}%` }}
                          ></div>
                        </div>
                      )}
                      <div className="text-sm grid grid-cols-2 gap-4">
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Model</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{job.model}</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Progress</p>
                          <p className="font-medium" style={{ color: '#146448' }}>
                            {job.currentEpoch}/{job.epochs} epochs
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Model Performans</h3>
                <div className="space-y-4">
                  {trainingJobs.filter(j => j.status === 'completed').map((job) => (
                    <div key={job.id} className="border rounded-lg p-4" style={{ borderColor: '#146448' }}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium" style={{ color: '#1e3237' }}>{job.name}</span>
                        <span className="text-sm" style={{ color: '#146448' }}>
                          {job.accuracy}% doğruluk
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Loss</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{job.loss}</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Veri Boyutu</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{job.datasetSize.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Maliyet</p>
                          <p className="font-medium" style={{ color: '#146448' }}>${job.cost}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Tüm Eğitim İşleri</h3>
              <div className="space-y-4">
                {trainingJobs.map((job) => (
                  <div key={job.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                            {job.name}
                          </h4>
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: getStatusColor(job.status) }}
                          >
                            {getStatusText(job.status)}
                          </span>
                        </div>

                        {job.status === 'training' && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span style={{ color: '#1e3237' }}>
                                Epoch {job.currentEpoch}/{job.epochs}
                              </span>
                              <span style={{ color: '#146448' }}>{job.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="h-3 rounded-full" 
                                style={{ backgroundColor: '#baf200', width: `${job.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Model</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{job.model}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Başlangıç</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{job.startTime}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Tahmini Tamamlanma</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{job.estimatedCompletion}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Doğruluk</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{job.accuracy}%</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Maliyet</p>
                            <p className="font-medium" style={{ color: '#146448' }}>${job.cost}</p>
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 flex space-x-2">
                        {job.status === 'training' && (
                          <button
                            className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                            style={{ backgroundColor: '#F59E0B', color: '#f6f8f9' }}
                          >
                            ⏸️ Duraklat
                          </button>
                        )}
                        <button
                          className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                        >
                          📊 Detaylar
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
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Eğitim Veri Setleri</h3>
              <div className="space-y-4">
                {datasets.map((dataset) => (
                  <div key={dataset.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2" style={{ color: '#1e3237' }}>
                          {dataset.name}
                        </h4>
                        <p className="text-sm opacity-70 mb-4" style={{ color: '#1e3237' }}>
                          {dataset.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Boyut</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {dataset.size.toLocaleString()} kayıt
                            </p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Format</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {dataset.format.toUpperCase()}
                            </p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Kalite</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{dataset.quality}%</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Oluşturma</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{dataset.createdAt}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Son Kullanım</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{dataset.lastUsed}</p>
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 flex space-x-2">
                        <button
                          className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                        >
                          📊 İncele
                        </button>
                        <button
                          className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                        >
                          🚀 Eğitim Başlat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'new-training' && (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#1e3237' }}>Yeni Eğitim İşi Oluştur</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Eğitim Adı
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                      placeholder="Örn: SeraGPT-Equipment-v2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                        Veri Seti
                      </label>
                      <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        {datasets.map(dataset => (
                          <option key={dataset.id} value={dataset.id}>
                            {dataset.name} ({dataset.size.toLocaleString()} kayıt)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Epochs
                      </label>
                      <input 
                        type="number" 
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                        defaultValue="10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Learning Rate
                      </label>
                      <input 
                        type="number" 
                        step="0.0001"
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                        defaultValue="0.001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Batch Size
                      </label>
                      <input 
                        type="number" 
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                        defaultValue="32"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Açıklama (İsteğe Bağlı)
                    </label>
                    <textarea 
                      className="w-full p-3 border rounded-lg h-24" 
                      style={{ borderColor: '#146448' }}
                      placeholder="Bu eğitim işi hakkında notlar..."
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">💰 Tahmini Maliyet</h4>
                    <div className="text-sm text-yellow-700">
                      <p>• Model: GPT-4-Turbo - $0.01/1K token</p>
                      <p>• Eğitim Süresi: ~4-6 saat</p>
                      <p>• Tahmini Maliyet: $150-250</p>
                    </div>
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
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Eğitim Trend Analizi</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        backgroundColor: '#baf200',
                        height: `${Math.random() * 80 + 20}%`,
                        minHeight: '8px'
                      }}
                      title={`${i + 1}. ay - ${Math.floor(Math.random() * 10 + 5)} eğitim`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs mt-2 opacity-70" style={{ color: '#1e3237' }}>
                  <span>Ocak</span>
                  <span>Haziran</span>
                  <span>Aralık</span>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Model Performans Karşılaştırması</h3>
                <div className="space-y-4">
                  {['GPT-4-Turbo', 'GPT-4', 'GPT-3.5-Turbo'].map((model, index) => (
                    <div key={model}>
                      <div className="flex justify-between text-sm mb-1">
                        <span style={{ color: '#1e3237' }}>{model}</span>
                        <span style={{ color: '#146448' }}>{(95 - index * 3).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            backgroundColor: index === 0 ? '#baf200' : index === 1 ? '#146448' : '#F59E0B',
                            width: `${95 - index * 3}%` 
                          }}
                        ></div>
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
