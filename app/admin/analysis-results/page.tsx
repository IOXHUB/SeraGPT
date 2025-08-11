'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface AnalysisResult {
  id: string;
  userId: string;
  userName: string;
  analysisType: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  status: 'completed' | 'failed' | 'processing' | 'pending';
  createdAt: string;
  completedAt?: string;
  duration: number;
  inputData: any;
  outputData?: any;
  errorMessage?: string;
  cost: number;
  tokensUsed: number;
  model: string;
}

export default function AnalysisResultsPage() {
  const { user, isAdmin, loading } = useAuth();
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dataLoading, setDataLoading] = useState(true);

  const analysisTypes = [
    { id: 'all', title: 'Tümü', icon: '📊' },
    { id: 'roi', title: 'ROI Analizi', icon: '💰' },
    { id: 'climate', title: 'İklim Analizi', icon: '🌤️' },
    { id: 'equipment', title: 'Ekipman Analizi', icon: '🔧' },
    { id: 'market', title: 'Pazar Analizi', icon: '📈' },
    { id: 'layout', title: 'Layout Analizi', icon: '📐' }
  ];

  const statusTypes = [
    { id: 'all', title: 'Tüm Durumlar' },
    { id: 'completed', title: 'Tamamlandı' },
    { id: 'failed', title: 'Başarısız' },
    { id: 'processing', title: 'İşleniyor' },
    { id: 'pending', title: 'Bekliyor' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadAnalysisResults();
    }
  }, [user, loading]);

  const loadAnalysisResults = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock analysis results data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResults: AnalysisResult[] = [
        {
          id: 'analysis-001',
          userId: 'user-123',
          userName: 'Ahmet Yılmaz',
          analysisType: 'roi',
          status: 'completed',
          createdAt: '2024-03-15 14:30:00',
          completedAt: '2024-03-15 14:32:15',
          duration: 135000, // ms
          cost: 0.45,
          tokensUsed: 850,
          model: 'GPT-4-Turbo',
          inputData: {
            investment: 150000,
            expectedYield: 20,
            productPrice: 12,
            operatingCosts: 35000
          },
          outputData: {
            roi: 18.5,
            paybackPeriod: 4.2,
            npv: 85000,
            recommendations: ['Optimize heating system', 'Consider automation']
          }
        },
        {
          id: 'analysis-002',
          userId: 'user-456',
          userName: 'Fatma Öz',
          analysisType: 'climate',
          status: 'completed',
          createdAt: '2024-03-15 13:15:22',
          completedAt: '2024-03-15 13:17:45',
          duration: 143000,
          cost: 0.62,
          tokensUsed: 1200,
          model: 'GPT-4',
          inputData: {
            location: 'Antalya',
            analysisPeriod: '5 years',
            cropType: 'Domates'
          },
          outputData: {
            averageTemp: 22.5,
            humidity: 65,
            riskFactors: ['Extreme heat events', 'Water scarcity'],
            recommendations: ['Install cooling system', 'Water conservation']
          }
        },
        {
          id: 'analysis-003',
          userId: 'user-789',
          userName: 'Mehmet Kaya',
          analysisType: 'equipment',
          status: 'failed',
          createdAt: '2024-03-15 12:45:10',
          duration: 25000,
          cost: 0.15,
          tokensUsed: 250,
          model: 'GPT-3.5-Turbo',
          inputData: {
            greenhouseSize: 500,
            cropType: 'Biber',
            budget: 75000
          },
          errorMessage: 'Insufficient data for equipment recommendation'
        },
        {
          id: 'analysis-004',
          userId: 'user-321',
          userName: 'Ayşe Demir',
          analysisType: 'market',
          status: 'processing',
          createdAt: '2024-03-15 15:20:30',
          duration: 45000,
          cost: 0.28,
          tokensUsed: 580,
          model: 'GPT-4',
          inputData: {
            productCategory: 'Sebze',
            marketRegion: 'Marmara',
            forecastPeriod: '1 year'
          }
        },
        {
          id: 'analysis-005',
          userId: 'user-654',
          userName: 'Ali Çelik',
          analysisType: 'layout',
          status: 'pending',
          createdAt: '2024-03-15 15:45:12',
          duration: 0,
          cost: 0,
          tokensUsed: 0,
          model: 'GPT-4-Vision',
          inputData: {
            dimensions: '20x40x4',
            productionGoal: 'Maksimum Verim',
            automationLevel: 'Orta'
          }
        }
      ];
      
      setAnalysisResults(mockResults);
      
    } catch (error) {
      console.error('Failed to load analysis results:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'failed': return '#EF4444';
      case 'processing': return '#3B82F6';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Tamamlandı';
      case 'failed': return 'Başarısız';
      case 'processing': return 'İşleniyor';
      case 'pending': return 'Bekliyor';
      default: return 'Bilinmiyor';
    }
  };

  const getAnalysisTypeIcon = (type: string) => {
    const typeObj = analysisTypes.find(t => t.id === type);
    return typeObj ? typeObj.icon : '📊';
  };

  const getAnalysisTypeName = (type: string) => {
    const typeObj = analysisTypes.find(t => t.id === type);
    return typeObj ? typeObj.title : type;
  };

  const filteredResults = analysisResults.filter(result => {
    const matchesType = filterType === 'all' || result.analysisType === filterType;
    const matchesStatus = filterStatus === 'all' || result.status === filterStatus;
    const matchesSearch = result.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

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
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Analiz Sonuçları</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Tüm kullanıcı analizlerinin detayları</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadAnalysisResults}
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                🔄 Yenile
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
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{analysisResults.length}</p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Tamamlanan</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {analysisResults.filter(r => r.status === 'completed').length}
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Maliyet</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  ${analysisResults.reduce((acc, r) => acc + r.cost, 0).toFixed(2)}
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
                  {analysisResults.length > 0 
                    ? Math.round((analysisResults.filter(r => r.status === 'completed').length / analysisResults.length) * 100)
                    : 0}%
                </p>
              </div>
              <div className="text-2xl">🎯</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            {analysisTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterType === type.id
                    ? 'shadow-lg transform scale-105'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: filterType === type.id ? '#baf200' : '#f6f8f9',
                  color: '#1e3237'
                }}
              >
                {type.icon} {type.title}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border"
              style={{ borderColor: '#146448' }}
            >
              {statusTypes.map(status => (
                <option key={status.id} value={status.id}>{status.title}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Kullanıcı adı veya analiz ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg flex-1 max-w-md"
              style={{ borderColor: '#146448' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Results List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>
              Analiz Sonuçları ({filteredResults.length})
            </h2>
            <div className="space-y-4">
              {filteredResults.map((result) => (
                <div 
                  key={result.id} 
                  className={`rounded-lg p-6 cursor-pointer transition-all ${
                    selectedResult?.id === result.id ? 'ring-2 ring-white/20' : ''
                  }`}
                  style={{ backgroundColor: '#f6f8f9' }}
                  onClick={() => setSelectedResult(result)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getAnalysisTypeIcon(result.analysisType)}</span>
                        <div>
                          <h3 className="font-semibold" style={{ color: '#1e3237' }}>
                            {getAnalysisTypeName(result.analysisType)}
                          </h3>
                          <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                            {result.userName} • {result.id}
                          </p>
                        </div>
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: getStatusColor(result.status) }}
                        >
                          {getStatusText(result.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Oluşturulma</p>
                          <p className="font-medium" style={{ color: '#146448' }}>
                            {new Date(result.createdAt).toLocaleString('tr-TR')}
                          </p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Süre</p>
                          <p className="font-medium" style={{ color: '#146448' }}>
                            {result.duration > 0 ? `${Math.round(result.duration / 1000)}s` : '-'}
                          </p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Model</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{result.model}</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Maliyet</p>
                          <p className="font-medium" style={{ color: '#146448' }}>${result.cost.toFixed(3)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredResults.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl" style={{ color: '#f6f8f9' }}>Hiç analiz sonucu bulunamadı</p>
                  <p className="opacity-70" style={{ color: '#f6f8f9' }}>
                    Filtrelerinizi değiştirin veya yeni analizler oluşturun
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Result Detail Panel */}
          <div>
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Analiz Detayı</h2>
            {selectedResult ? (
              <div className="rounded-lg p-6 space-y-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{getAnalysisTypeIcon(selectedResult.analysisType)}</span>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                      {getAnalysisTypeName(selectedResult.analysisType)}
                    </h3>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                      {selectedResult.userName}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: '#1e3237' }}>Durum:</span>
                    <span 
                      className="font-medium"
                      style={{ color: getStatusColor(selectedResult.status) }}
                    >
                      {getStatusText(selectedResult.status)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#1e3237' }}>Model:</span>
                    <span className="font-medium" style={{ color: '#146448' }}>
                      {selectedResult.model}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#1e3237' }}>Token Kullanımı:</span>
                    <span className="font-medium" style={{ color: '#146448' }}>
                      {selectedResult.tokensUsed.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#1e3237' }}>Maliyet:</span>
                    <span className="font-medium" style={{ color: '#146448' }}>
                      ${selectedResult.cost.toFixed(3)}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: '#1e3237' }}>Giriş Verisi:</h4>
                  <div 
                    className="p-3 rounded border text-xs overflow-x-auto"
                    style={{ borderColor: '#146448', backgroundColor: '#f8f9fa' }}
                  >
                    <pre style={{ color: '#1e3237' }}>
                      {JSON.stringify(selectedResult.inputData, null, 2)}
                    </pre>
                  </div>
                </div>

                {selectedResult.outputData && (
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: '#1e3237' }}>Çıkış Verisi:</h4>
                    <div 
                      className="p-3 rounded border text-xs overflow-x-auto"
                      style={{ borderColor: '#146448', backgroundColor: '#f8f9fa' }}
                    >
                      <pre style={{ color: '#1e3237' }}>
                        {JSON.stringify(selectedResult.outputData, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {selectedResult.errorMessage && (
                  <div>
                    <h4 className="font-semibold mb-3 text-red-600">Hata Mesajı:</h4>
                    <div className="p-3 rounded border bg-red-50 border-red-200">
                      <p className="text-sm text-red-700">{selectedResult.errorMessage}</p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                  >
                    📊 Detaylı Rapor
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    📥 İndir
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="rounded-lg p-6 text-center"
                style={{ backgroundColor: '#f6f8f9' }}
              >
                <div className="text-4xl mb-4">📊</div>
                <p style={{ color: '#1e3237' }}>Detayları görmek için bir analiz seçin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
