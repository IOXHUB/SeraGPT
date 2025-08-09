'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MockAnalysisService } from '@/lib/services/mock-analysis-service';
import { MockAnalysis } from '@/lib/utils/dev-mock-system';

export const dynamic = 'force-dynamic';

export default function AnalysesListPage() {
  const { user, loading } = useAuth();
  const [analyses, setAnalyses] = useState<MockAnalysis[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    if (user && !loading) {
      loadAnalyses();
    }
  }, [user, loading]);

  const loadAnalyses = async () => {
    if (!user) return;

    try {
      setDataLoading(true);
      const userAnalyses = await MockAnalysisService.getUserAnalyses(user.id);
      setAnalyses(userAnalyses);
    } catch (error) {
      console.error('Failed to load analyses:', error);
    } finally {
      setDataLoading(false);
    }
  };

  // Filter and sort analyses
  const filteredAnalyses = analyses
    .filter(analysis => {
      if (filter === 'all') return true;
      return analysis.type === filter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Tamamlandı</span>;
      case 'in_progress':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">İşleniyor</span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Taslak</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'roi': return '📊';
      case 'climate': return '🌡️';
      case 'equipment': return '🔧';
      case 'market': return '📈';
      case 'layout': return '📐';
      default: return '📄';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'roi': return 'ROI Analizi';
      case 'climate': return 'İklim Analizi';
      case 'equipment': return 'Ekipman Listesi';
      case 'market': return 'Pazar Analizi';
      case 'layout': return 'Teknik Plan';
      default: return 'Analiz';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading || dataLoading) {
    return (
      <DashboardLayout title="Analizlerim" subtitle="Oluşturduğunuz analiz raporları">
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Analizlerim" subtitle="Oluşturduğunuz analiz raporları">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-gray-900">{analyses.length}</div>
            <div className="text-sm text-gray-600">Toplam Analiz</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-green-600">
              {analyses.filter(a => a.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Tamamlanan</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-blue-600">
              {analyses.filter(a => a.status === 'in_progress').length}
            </div>
            <div className="text-sm text-gray-600">İşleniyor</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-gray-600">
              {analyses.filter(a => {
                const created = new Date(a.createdAt);
                const now = new Date();
                return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
              }).length}
            </div>
            <div className="text-sm text-gray-600">Bu Ay</div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-4">
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Tüm Analizler</option>
                <option value="roi">ROI Analizi</option>
                <option value="climate">İklim Analizi</option>
                <option value="equipment">Ekipman Listesi</option>
                <option value="market">Pazar Analizi</option>
                <option value="layout">Teknik Plan</option>
              </select>

              <select 
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">En Yeni</option>
                <option value="oldest">En Eski</option>
                <option value="title">Başlığa Göre</option>
              </select>
            </div>

            <div className="flex space-x-2">
              <a
                href="/dashboard/demo-reports"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                🎯 Demo Raporlar
              </a>
              <button
                onClick={loadAnalyses}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                🔄 Yenile
              </button>
              <a
                href="/dashboard/analysis/roi"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                + Yeni Analiz
              </a>
            </div>
          </div>
        </div>

        {/* Analyses List */}
        {filteredAnalyses.length === 0 ? (
          <div className="bg-white rounded-lg border p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz analiz bulunmuyor</h3>
            <p className="text-gray-600 mb-4">İlk analizinizi oluşturmak için aşağıdaki butonları kullanın</p>
            <div className="flex flex-wrap justify-center gap-2">
              <a href="/dashboard/analysis/roi" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                📊 ROI Analizi
              </a>
              <a href="/dashboard/analysis/climate" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                🌡️ İklim Analizi
              </a>
              <a href="/dashboard/analysis/equipment" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                🔧 Ekipman Listesi
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnalyses.map((analysis) => (
              <div key={analysis.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {getTypeIcon(analysis.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{analysis.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">{getTypeName(analysis.type)}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{formatDate(analysis.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(analysis.status)}
                    
                    <div className="flex space-x-2">
                      {analysis.status === 'completed' && (
                        <>
                          <a
                            href={`/dashboard/reports/${analysis.type}/${analysis.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Görüntüle
                          </a>
                          <button
                            onClick={async () => {
                              try {
                                window.open(`/dashboard/reports/${analysis.type}/${analysis.id}`, '_blank');
                                // Küçük bir gecikme sonrası PDF indirme fonksiyonunu tetikle
                                setTimeout(() => {
                                  const event = new CustomEvent('triggerPDFDownload');
                                  window.dispatchEvent(event);
                                }, 1000);
                              } catch (error) {
                                console.error('PDF indirme hatası:', error);
                                alert('PDF indirme sırasında bir hata oluştu');
                              }
                            }}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            PDF İndir
                          </button>
                        </>
                      )}
                      <button
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                        onClick={async () => {
                          if (confirm('Bu analizi silmek istediğinizden emin misiniz?')) {
                            try {
                              await MockAnalysisService.deleteAnalysis(analysis.id);
                              loadAnalyses();
                            } catch (error) {
                              console.error('Silme hatası:', error);
                              alert('Analiz silinirken bir hata oluştu');
                            }
                          }
                        }}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress bar for in-progress analyses */}
                {analysis.status === 'in_progress' && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Analiz işleniyor... Yaklaşık 2-3 dakika sürebilir.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
