'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ClientOnly from '@/components/ui/ClientOnly';
import { MockAnalysisService } from '@/lib/services/mock-analysis-service';
import { MockAnalysis } from '@/lib/utils/dev-mock-system';

export default function AnalysisPage() {
  const { user, loading, signOut } = useAuth();
  const [analyses, setAnalyses] = useState<MockAnalysis[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Auth check
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/auth/login';
    }
  }, [user, loading]);

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#146448] to-[#0f4f37] flex items-center justify-center">
        <div className="text-white text-lg">🔬 Analizler yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#146448] to-[#0f4f37] flex items-center justify-center">
        <div className="text-white text-lg">Giriş yapmanız gerekiyor...</div>
      </div>
    );
  }

  // Filter and sort analyses
  const filteredAnalyses = analyses
    .filter(analysis => {
      const matchesFilter = filter === 'all' || analysis.type === filter;
      const matchesSearch = searchQuery === '' || 
        analysis.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getTypeName(analysis.type).toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
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

  // Analysis type configurations
  const analysisTypes = [
    { id: 'roi', name: 'ROI Analizi', icon: '💰', color: 'from-green-500 to-green-600', href: '/dashboard/analysis/roi' },
    { id: 'climate', name: 'İklim Analizi', icon: '🌡️', color: 'from-blue-500 to-blue-600', href: '/dashboard/analysis/climate' },
    { id: 'equipment', name: 'Ekipman Analizi', icon: '⚙️', color: 'from-purple-500 to-purple-600', href: '/dashboard/analysis/equipment' },
    { id: 'market', name: 'Pazar Analizi', icon: '📈', color: 'from-orange-500 to-orange-600', href: '/dashboard/analysis/market' },
    { id: 'layout', name: 'Yerleşim Planı', icon: '🏗️', color: 'from-teal-500 to-teal-600', href: '/dashboard/analysis/layout' }
  ];

  function getStatusBadge(status: string) {
    switch (status) {
      case 'completed':
        return <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">✅ Tamamlandı</span>;
      case 'in_progress':
        return <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">⏳ İşleniyor</span>;
      case 'draft':
        return <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">📝 Taslak</span>;
      default:
        return <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  }

  function getTypeIcon(type: string) {
    const typeConfig = analysisTypes.find(t => t.id === type);
    return typeConfig?.icon || '📄';
  }

  function getTypeName(type: string) {
    const typeConfig = analysisTypes.find(t => t.id === type);
    return typeConfig?.name || 'Analiz';
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        {/* Header */}
        <header className="bg-[#146448] border-b border-white/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Analiz Merkezi</h1>
                <p className="text-white/70">Tüm sera analizlerinizi yönetin</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-white text-sm hidden md:block">
                <span className="opacity-70">Hoşgeldin, </span>
                <span className="font-medium">{user?.email?.split('@')[0] || 'Kullanıcı'}</span>
              </div>
              <button
                onClick={async () => {
                  await signOut();
                  window.location.href = '/auth/login';
                }}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
              >
                Çıkış
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{analyses.length}</div>
                  <div className="text-white/70 text-sm">Toplam Analiz</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {analyses.filter(a => a.status === 'completed').length}
                  </div>
                  <div className="text-white/70 text-sm">Tamamlanan</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⏳</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">
                    {analyses.filter(a => a.status === 'in_progress').length}
                  </div>
                  <div className="text-white/70 text-sm">İşleniyor</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#baf200]/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#baf200]">
                    {analyses.filter(a => {
                      const created = new Date(a.createdAt);
                      const now = new Date();
                      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                    }).length}
                  </div>
                  <div className="text-white/70 text-sm">Bu Ay</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions - Analysis Types */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">⚡</span>
              Yeni Analiz Başlat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {analysisTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => window.location.href = type.href}
                  className={`bg-gradient-to-br ${type.color} hover:scale-105 text-white rounded-xl p-4 transition-all duration-200 shadow-lg hover:shadow-xl`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className="font-medium text-sm">{type.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Analiz ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-[#baf200] focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <select 
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#baf200]"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all" className="text-black">Tüm Analizler</option>
                  <option value="roi" className="text-black">ROI Analizi</option>
                  <option value="climate" className="text-black">İklim Analizi</option>
                  <option value="equipment" className="text-black">Ekipman Analizi</option>
                  <option value="market" className="text-black">Pazar Analizi</option>
                  <option value="layout" className="text-black">Yerleşim Planı</option>
                </select>

                <select 
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#baf200]"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest" className="text-black">En Yeni</option>
                  <option value="oldest" className="text-black">En Eski</option>
                  <option value="title" className="text-black">Başlığa Göre</option>
                </select>

                <button
                  onClick={loadAnalyses}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Yenile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Analyses List */}
          {filteredAnalyses.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-12 border border-white/20 text-center">
              <div className="text-6xl mb-6">🔬</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {searchQuery ? 'Arama sonucu bulunamadı' : 'Henüz analiz bulunmuyor'}
              </h3>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                {searchQuery 
                  ? 'Farklı anahtar kelimelerle tekrar deneyin veya filtreleri kontrol edin.'
                  : 'İlk analizinizi oluşturmak için yukarıdaki hızlı eylem butonlarını kullanın.'
                }
              </p>
              {!searchQuery && (
                <div className="flex flex-wrap justify-center gap-3">
                  {analysisTypes.slice(0, 3).map((type) => (
                    <button
                      key={type.id}
                      onClick={() => window.location.href = type.href}
                      className={`bg-gradient-to-r ${type.color} hover:scale-105 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg`}
                    >
                      {type.icon} {type.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredAnalyses.map((analysis) => (
                <div key={analysis.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                        {getTypeIcon(analysis.type)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{analysis.title}</h3>
                        <div className="flex items-center space-x-3 text-white/70">
                          <span className="font-medium">{getTypeName(analysis.type)}</span>
                          <span>•</span>
                          <span>{formatDate(analysis.createdAt)}</span>
                        </div>
                        <div className="mt-2">
                          {getStatusBadge(analysis.status)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {analysis.status === 'completed' && (
                        <>
                          <button
                            onClick={() => window.open(`/dashboard/reports/${analysis.type}/${analysis.id}`, '_blank')}
                            className="bg-[#baf200] hover:bg-[#baf200]/80 text-[#146448] px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>Görüntüle</span>
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                window.open(`/dashboard/reports/${analysis.type}/${analysis.id}`, '_blank');
                                setTimeout(() => {
                                  const event = new CustomEvent('triggerPDFDownload');
                                  window.dispatchEvent(event);
                                }, 1000);
                              } catch (error) {
                                console.error('PDF indirme hatası:', error);
                              }
                            }}
                            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>PDF İndir</span>
                          </button>
                        </>
                      )}
                      <button
                        className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg font-medium transition-colors"
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

                  {/* Progress bar for in-progress analyses */}
                  {analysis.status === 'in_progress' && (
                    <div className="mt-6">
                      <div className="w-full bg-white/20 rounded-full h-3">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full animate-pulse" style={{ width: '65%' }}></div>
                      </div>
                      <p className="text-white/70 text-sm mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Analiz işleniyor... Yaklaşık 2-3 dakika sürebilir.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ClientOnly>
  );
}
