'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientOnly from '@/components/ui/ClientOnly';

interface Analysis {
  id: string;
  type: string;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  progress?: number;
  result?: any;
}

export default function AnalysisPage() {
  const { user, loading, signOut } = useAuth();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user && !loading) {
      loadAnalyses();
    }
  }, [user, loading]);

  const loadAnalyses = async () => {
    if (!user) return;
    
    try {
      setDataLoading(true);
      
      const response = await fetch('/api/analysis/user', {
        headers: {
          'Authorization': `Bearer ${await user.getIdToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch analyses');
      }
      
      const data = await response.json();
      setAnalyses(data.analyses || []);
    } catch (error) {
      console.error('Failed to load analyses:', error);
      setAnalyses([]);
    } finally {
      setDataLoading(false);
    }
  };

  const deleteAnalysis = async (analysisId: string) => {
    try {
      const response = await fetch(`/api/analysis/${analysisId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${await user?.getIdToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete analysis');
      }
      
      loadAnalyses();
    } catch (error) {
      console.error('Failed to delete analysis:', error);
      alert('Analiz silinirken hata oluştu');
    }
  };

  const getAnalysisTypeText = (type: string) => {
    switch (type) {
      case 'roi': return 'ROI Analizi';
      case 'climate': return 'İklim Analizi';
      case 'equipment': return 'Ekipman Önerisi';
      case 'market': return 'Pazar Analizi';
      case 'layout': return 'Layout Planlama';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Tamamlandı';
      case 'processing': return 'İşleniyor';
      case 'pending': return 'Beklemede';
      case 'failed': return 'Başarısız';
      default: return status;
    }
  };

  if (loading || dataLoading) {
    return (
      <ClientOnly>
        <DashboardLayout user={user} signOut={signOut}>
          <div className="p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </DashboardLayout>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <DashboardLayout user={user} signOut={signOut}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                Analizlerim
              </h1>
              <div className="flex space-x-4">
                <a
                  href="/dashboard/analysis/roi"
                  className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                >
                  ➕ Yeni Analiz
                </a>
              </div>
            </div>

            {analyses.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#1e3237' }}>
                  Henüz Analiz Yok
                </h3>
                <p className="text-gray-600 mb-6">
                  İlk analizi oluşturmak için aşağıdaki seçeneklerden birini kullanın
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="/dashboard/analysis/roi"
                    className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    ROI Analizi
                  </a>
                  <a
                    href="/dashboard/analysis/climate"
                    className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                  >
                    İklim Analizi
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    style={{ backgroundColor: '#f6f8f9' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg" style={{ color: '#1e3237' }}>
                        {getAnalysisTypeText(analysis.type)}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(analysis.status)}`}>
                        {getStatusText(analysis.status)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {analysis.title || 'Analiz detayları'}
                    </p>

                    {analysis.status === 'processing' && analysis.progress && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span style={{ color: '#1e3237' }}>İlerleme</span>
                          <span style={{ color: '#146448' }}>{analysis.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ backgroundColor: '#baf200', width: `${analysis.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 mb-4">
                      Oluşturulma: {new Date(analysis.createdAt).toLocaleDateString('tr-TR')}
                    </div>

                    <div className="flex space-x-2">
                      {analysis.status === 'completed' ? (
                        <a
                          href={`/dashboard/reports/${analysis.type}/${analysis.id}`}
                          className="flex-1 py-2 px-3 rounded text-center text-sm font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                        >
                          📊 Raporu Görüntüle
                        </a>
                      ) : (
                        <button
                          disabled
                          className="flex-1 py-2 px-3 rounded text-center text-sm font-medium opacity-50 cursor-not-allowed"
                          style={{ backgroundColor: '#e5e7eb', color: '#6b7280' }}
                        >
                          {analysis.status === 'processing' ? '⏳ İşleniyor...' : '⏸️ Beklemede'}
                        </button>
                      )}
                      
                      <button
                        onClick={() => {
                          if (confirm('Bu analizi silmek istediğinizden emin misiniz?')) {
                            deleteAnalysis(analysis.id);
                          }
                        }}
                        className="py-2 px-3 rounded text-sm font-medium transition-all hover:opacity-90"
                        style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ClientOnly>
  );
}
