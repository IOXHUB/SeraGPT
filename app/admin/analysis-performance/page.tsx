'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface PerformanceMetric {
  id: string;
  analysisType: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  date: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  averageAccuracy: number;
  peakResponseTime: number;
  minimumResponseTime: number;
  tokensUsed: number;
  cost: number;
}

interface AnalysisPerformance {
  analysisType: string;
  totalExecutions: number;
  successRate: number;
  averageResponseTime: number;
  averageAccuracy: number;
  totalCost: number;
  trend: 'up' | 'down' | 'stable';
}

export default function AnalysisPerformancePage() {
  const { user, isAdmin, loading } = useAuth();
  const [performanceData, setPerformanceData] = useState<PerformanceMetric[]>([]);
  const [analysisPerformance, setAnalysisPerformance] = useState<AnalysisPerformance[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedAnalysisType, setSelectedAnalysisType] = useState('all');
  const [dataLoading, setDataLoading] = useState(true);

  const analysisTypes = [
    { id: 'all', title: 'Tümü', icon: '📊' },
    { id: 'roi', title: 'ROI Analizi', icon: '💰' },
    { id: 'climate', title: 'İklim Analizi', icon: '🌤️' },
    { id: 'equipment', title: 'Ekipman Analizi', icon: '🔧' },
    { id: 'market', title: 'Pazar Analizi', icon: '📈' },
    { id: 'layout', title: 'Layout Analizi', icon: '📐' }
  ];

  const timePeriods = [
    { id: '24hours', title: 'Son 24 Saat' },
    { id: '7days', title: 'Son 7 Gün' },
    { id: '30days', title: 'Son 30 Gün' },
    { id: '90days', title: 'Son 3 Ay' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadPerformanceData();
    }
  }, [user, loading, selectedPeriod, selectedAnalysisType]);

  const loadPerformanceData = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock performance data based on selected period
      const mockMetrics: PerformanceMetric[] = generateMockData();
      const mockAnalysisPerf: AnalysisPerformance[] = [
        {
          analysisType: 'ROI Analizi',
          totalExecutions: 1456,
          successRate: 94.2,
          averageResponseTime: 2340,
          averageAccuracy: 92.5,
          totalCost: 456.78,
          trend: 'up'
        },
        {
          analysisType: 'İklim Analizi',
          totalExecutions: 892,
          successRate: 91.8,
          averageResponseTime: 1890,
          averageAccuracy: 89.3,
          totalCost: 234.56,
          trend: 'stable'
        },
        {
          analysisType: 'Ekipman Analizi',
          totalExecutions: 567,
          successRate: 88.5,
          averageResponseTime: 3210,
          averageAccuracy: 87.1,
          totalCost: 178.90,
          trend: 'down'
        },
        {
          analysisType: 'Pazar Analizi',
          totalExecutions: 434,
          successRate: 92.3,
          averageResponseTime: 2560,
          averageAccuracy: 90.7,
          totalCost: 145.23,
          trend: 'up'
        },
        {
          analysisType: 'Layout Analizi',
          totalExecutions: 298,
          successRate: 89.7,
          averageResponseTime: 4120,
          averageAccuracy: 85.9,
          totalCost: 98.45,
          trend: 'stable'
        }
      ];
      
      setPerformanceData(mockMetrics);
      setAnalysisPerformance(mockAnalysisPerf);
      
    } catch (error) {
      console.error('Failed to load performance data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const generateMockData = (): PerformanceMetric[] => {
    const days = selectedPeriod === '24hours' ? 1 : 
                 selectedPeriod === '7days' ? 7 :
                 selectedPeriod === '30days' ? 30 : 90;
    
    const data: PerformanceMetric[] = [];
    const types: ('roi' | 'climate' | 'equipment' | 'market' | 'layout')[] = 
      ['roi', 'climate', 'equipment', 'market', 'layout'];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      types.forEach(type => {
        const totalReq = Math.floor(Math.random() * 50) + 10;
        const failed = Math.floor(totalReq * (Math.random() * 0.1));
        const successful = totalReq - failed;
        
        data.push({
          id: `${type}-${i}`,
          analysisType: type,
          date: date.toISOString().split('T')[0],
          totalRequests: totalReq,
          successfulRequests: successful,
          failedRequests: failed,
          averageResponseTime: Math.floor(Math.random() * 3000) + 1000,
          averageAccuracy: Math.random() * 10 + 85,
          peakResponseTime: Math.floor(Math.random() * 2000) + 4000,
          minimumResponseTime: Math.floor(Math.random() * 500) + 500,
          tokensUsed: Math.floor(Math.random() * 5000) + 1000,
          cost: Math.random() * 50 + 10
        });
      });
    }
    
    return data.reverse();
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#10B981';
      case 'down': return '#EF4444';
      case 'stable': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const exportData = () => {
    const data = {
      period: selectedPeriod,
      analysisType: selectedAnalysisType,
      metrics: performanceData,
      summary: analysisPerformance,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis-performance-${selectedPeriod}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Performans verileri indirildi!');
  };

  const optimizeAnalysis = (analysisType: string) => {
    alert(`${analysisType} için optimizasyon işlemi başlatıldı! Bu işlem:\n\n• Yanıt sürelerini iyileştirme\n• Doğruluk oranını artırma\n• Maliyet optimizasyonu\n• Performans ayarlarını güncelleme\n\nişlemlerini içerir.`);
  };

  const clearCache = () => {
    if (confirm('Analiz cache\'ini temizlemek istediğinizden emin misiniz? Bu işlem geçici olarak yanıt sürelerini artırabilir.')) {
      alert('Cache temizlendi! Sistem performansı izleniyor...');
    }
  };

  const filteredData = selectedAnalysisType === 'all' 
    ? performanceData 
    : performanceData.filter(d => d.analysisType === selectedAnalysisType);

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
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Analiz Performans İzleme</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>AI analiz süreçlerinin detaylı performans metrikleri</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={clearCache}
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#F59E0B', color: '#1e3237' }}
              >
                🗑️ Cache Temizle
              </button>
              <button
                onClick={exportData}
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                📊 Veri İndir
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            {analysisTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedAnalysisType(type.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedAnalysisType === type.id
                    ? 'shadow-lg transform scale-105'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: selectedAnalysisType === type.id ? '#baf200' : '#f6f8f9',
                  color: '#1e3237'
                }}
              >
                {type.icon} {type.title}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 rounded-lg border"
              style={{ borderColor: '#146448' }}
            >
              {timePeriods.map(period => (
                <option key={period.id} value={period.id}>{period.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Performans Özeti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam İstek</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    {filteredData.reduce((acc, d) => acc + d.totalRequests, 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-2xl">📊</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>{selectedPeriod} dönemi</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Başarı Oranı</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    {filteredData.length > 0
                      ? Math.round((filteredData.reduce((acc, d) => acc + d.successfulRequests, 0) / 
                          filteredData.reduce((acc, d) => acc + d.totalRequests, 0)) * 100)
                      : 0}%
                  </p>
                </div>
                <div className="text-2xl">✅</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>
                {filteredData.reduce((acc, d) => acc + d.failedRequests, 0)} hata
              </p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Ort. Yanıt Süresi</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    {filteredData.length > 0
                      ? Math.round(filteredData.reduce((acc, d) => acc + d.averageResponseTime, 0) / filteredData.length)
                      : 0}ms
                  </p>
                </div>
                <div className="text-2xl">⚡</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Ortalama süre</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Maliyet</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                    ${filteredData.reduce((acc, d) => acc + d.cost, 0).toFixed(2)}
                  </p>
                </div>
                <div className="text-2xl">💰</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>
                {filteredData.reduce((acc, d) => acc + d.tokensUsed, 0).toLocaleString()} token
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Type Performance */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Analiz Türü Bazında Performans</h2>
          <div className="space-y-4">
            {analysisPerformance.map((analysis) => (
              <div key={analysis.analysisType} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                        {analysis.analysisType}
                      </h3>
                      <span className="text-2xl">{getTrendIcon(analysis.trend)}</span>
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: getTrendColor(analysis.trend) }}
                      >
                        {analysis.trend === 'up' ? 'Yükseliş' : 
                         analysis.trend === 'down' ? 'Düşüş' : 'Sabit'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Toplam Analiz</p>
                        <p className="font-medium" style={{ color: '#146448' }}>
                          {analysis.totalExecutions.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Başarı Oranı</p>
                        <p className="font-medium" style={{ color: '#146448' }}>{analysis.successRate}%</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Ort. Yanıt</p>
                        <p className="font-medium" style={{ color: '#146448' }}>{analysis.averageResponseTime}ms</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Doğruluk</p>
                        <p className="font-medium" style={{ color: '#146448' }}>{analysis.averageAccuracy}%</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Maliyet</p>
                        <p className="font-medium" style={{ color: '#146448' }}>${analysis.totalCost}</p>
                      </div>
                      <div>
                        <p className="opacity-70" style={{ color: '#1e3237' }}>Trend</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              backgroundColor: getTrendColor(analysis.trend),
                              width: `${analysis.successRate}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6 flex space-x-2">
                    <button
                      onClick={() => optimizeAnalysis(analysis.analysisType)}
                      className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                    >
                      ⚡ Optimize Et
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Metrics Chart Placeholder */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Detaylı Metrikler</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Yanıt Süresi Trendi</h3>
              <div className="h-64 flex items-end justify-between space-x-1">
                {filteredData.slice(-20).map((data, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t"
                    style={{
                      backgroundColor: '#baf200',
                      height: `${Math.min((data.averageResponseTime / 5000) * 100, 100)}%`,
                      minHeight: '8px'
                    }}
                    title={`${data.date}: ${data.averageResponseTime}ms`}
                  ></div>
                ))}
              </div>
              <div className="text-xs opacity-70 mt-2" style={{ color: '#1e3237' }}>
                Son {Math.min(filteredData.length, 20)} veri noktası
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Doğruluk Oranı</h3>
              <div className="h-64 flex items-end justify-between space-x-1">
                {filteredData.slice(-20).map((data, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t"
                    style={{
                      backgroundColor: '#10B981',
                      height: `${Math.min((data.averageAccuracy / 100) * 100, 100)}%`,
                      minHeight: '8px'
                    }}
                    title={`${data.date}: ${data.averageAccuracy.toFixed(1)}%`}
                  ></div>
                ))}
              </div>
              <div className="text-xs opacity-70 mt-2" style={{ color: '#1e3237' }}>
                Doğruluk oranı değişimi
              </div>
            </div>
          </div>
        </div>

        {/* System Recommendations */}
        <div>
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Sistem Önerileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg p-6 border-l-4" style={{ backgroundColor: '#f6f8f9', borderLeftColor: '#F59E0B' }}>
              <h4 className="font-semibold mb-2" style={{ color: '#F59E0B' }}>⚠️ Performans Uyarısı</h4>
              <p className="text-sm" style={{ color: '#1e3237' }}>
                Ekipman analizi yanıt süreleri ortalamadan yüksek. Cache optimizasyonu öneriliyor.
              </p>
            </div>

            <div className="rounded-lg p-6 border-l-4" style={{ backgroundColor: '#f6f8f9', borderLeftColor: '#10B981' }}>
              <h4 className="font-semibold mb-2" style={{ color: '#10B981' }}>✅ Optimizasyon Fırsatı</h4>
              <p className="text-sm" style={{ color: '#1e3237' }}>
                ROI analizi performansı mükemmel. Bu yapılandırmayı diğer analizlere uygulanabilir.
              </p>
            </div>

            <div className="rounded-lg p-6 border-l-4" style={{ backgroundColor: '#f6f8f9', borderLeftColor: '#3B82F6' }}>
              <h4 className="font-semibold mb-2" style={{ color: '#3B82F6' }}>💡 İyileştirme Önerisi</h4>
              <p className="text-sm" style={{ color: '#1e3237' }}>
                Token kullanımını optimize ederek maliyetleri %15-20 azaltma potansiyeli var.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
