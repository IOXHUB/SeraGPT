'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { MockAnalysisService } from '@/lib/services/mock-analysis-service';
import ClientOnly from '@/components/ui/ClientOnly';

export const dynamic = 'force-dynamic';

export default function ReportsPage() {
  const { user, loading, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isCreatingReport, setIsCreatingReport] = useState<string | null>(null);

  const reportTypes = [
    {
      type: 'roi',
      title: 'ROI Analizi',
      description: 'Sera yatırımı geri dönüş analizi ve finansal projeksiyon',
      icon: '💰',
      color: 'from-green-400 to-emerald-600',
      bgColor: 'bg-green-50/80',
      textColor: 'text-green-800',
      features: ['Finansal projeksiyon tabloları', 'Risk analizi ve fırsatlar', '5 yıllık geri dönüş hesaplaması']
    },
    {
      type: 'climate',
      title: 'İklim Analizi',
      description: 'Lokasyon bazlı iklim uygunluk raporu ve risk değerlendirmesi',
      icon: '🌡️',
      color: 'from-blue-400 to-cyan-600',
      bgColor: 'bg-blue-50/80',
      textColor: 'text-blue-800',
      features: ['12 aylık iklim verileri', 'Risk faktörleri değerlendirmesi', 'Mevsimsel uygunluk analizi']
    },
    {
      type: 'equipment',
      title: 'Ekipman Analizi',
      description: 'Mühendis onaylı ekipman önerileri ve maliyet analizi',
      icon: '⚙️',
      color: 'from-purple-400 to-violet-600',
      bgColor: 'bg-purple-50/80',
      textColor: 'text-purple-800',
      features: ['Kategorize edilmiş ekipman listesi', 'Marka-model önerileri', 'Kurulum takvimi ve maliyetler']
    },
    {
      type: 'market',
      title: 'Pazar Analizi',
      description: 'Ürün fiyat analizi, rekabet durumu ve pazar öngörüleri',
      icon: '📈',
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-50/80',
      textColor: 'text-orange-800',
      features: ['Güncel fiyat analizi', 'Rekabet haritası', 'Gelecek dönem tahminleri']
    },
    {
      type: 'layout',
      title: 'Yerleşim Planlama',
      description: '2D/3D sera tasarımı ve teknik çizimler',
      icon: '🏗️',
      color: 'from-indigo-400 to-purple-600',
      bgColor: 'bg-indigo-50/80',
      textColor: 'text-indigo-800',
      features: ['2D teknik çizimler', 'Malzeme listesi ve maliyetler', 'Uygulama takvimi']
    }
  ];

  // Mock recent reports data
  const recentReports = [
    { id: '1', title: 'ROI Analizi - Domates Serası', type: 'roi', date: '2 saat önce', status: 'completed' },
    { id: '2', title: 'İklim Analizi - Antalya Bölgesi', type: 'climate', date: '1 gün önce', status: 'completed' },
    { id: '3', title: 'Ekipman Listesi - Modern Sera', type: 'equipment', date: '3 gün önce', status: 'completed' }
  ];

  const createSampleAnalysis = async (type: string) => {
    setIsCreatingReport(type);
    try {
      const sampleData = {
        type: type as "layout" | "roi" | "climate" | "equipment" | "market",
        title: `Örnek ${reportTypes.find(t => t.type === type)?.title}`,
        status: 'completed' as const
      };
      
      const analysis = await MockAnalysisService.createAnalysis(sampleData);
      
      setTimeout(() => {
        window.open(`/dashboard/reports/${type}/${analysis.id}`, '_blank');
        setIsCreatingReport(null);
      }, 1500);
      
    } catch (error) {
      console.error('Örnek analiz oluşturulamadı:', error);
      alert('Örnek analiz oluşturulamadı');
      setIsCreatingReport(null);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      console.log('🚫 Reports access denied - redirecting to login');
      window.location.href = '/auth/login';
    }
  }, [user, loading, mounted]);

  if (!loading && !user) {
    window.location.href = '/auth/login';
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">Yönlendiriliyor...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">🔐 Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        <div className="text-white text-lg">Giriş yapmanız gerekiyor...</div>
      </div>
    );
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gradient-to-br from-[#146448] to-[#0f4f37]">
        {/* Professional Header */}
        <header className="bg-[#146448]/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="flex items-center space-x-3 text-white hover:text-[#baf200] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-medium">Dashboard'a Dön</span>
                </button>
                <div className="h-6 w-px bg-white/20"></div>
                <h1 className="text-xl font-bold text-white">Analiz Raporları</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-white text-sm">
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
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          
          {/* Welcome Section & Stats */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">📊 Profesyonel Analiz Raporları</h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto">
                AI destekli sera analiz raporlarınızı oluşturun, görüntüleyin ve PDF formatında indirin. 
                Profesyonel kalitede, detaylı analizler ve görselleştirmeler.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold text-[#baf200] mb-2">5</div>
                <div className="text-white/80 text-sm">Analiz Türü</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold text-[#baf200] mb-2">PDF</div>
                <div className="text-white/80 text-sm">İndirilebilir</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold text-[#baf200] mb-2">AI</div>
                <div className="text-white/80 text-sm">Destekli</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold text-[#baf200] mb-2">24/7</div>
                <div className="text-white/80 text-sm">Erişim</div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rapor ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/60 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                  />
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
              >
                <option value="all">Tüm Türler</option>
                {reportTypes.map(type => (
                  <option key={type.type} value={type.type} className="text-black">{type.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Report Types Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportTypes.map((reportType) => (
              <div
                key={reportType.type}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${reportType.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                      {reportType.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{reportType.title}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{reportType.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">📋 Rapor İçeriği:</h4>
                  <ul className="space-y-2">
                    {reportType.features.map((feature, index) => (
                      <li key={index} className="text-white/70 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#baf200] rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => createSampleAnalysis(reportType.type)}
                    disabled={isCreatingReport === reportType.type}
                    className={`flex-1 bg-gradient-to-r ${reportType.color} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                  >
                    {isCreatingReport === reportType.type ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Oluşturuluyor...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="mr-2">📄</span>
                        Örnek Rapor Görüntüle
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => window.location.href = `/dashboard/analysis/${reportType.type}`}
                    className="flex-1 bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white/30 hover:scale-105"
                  >
                    <div className="flex items-center justify-center">
                      <span className="mr-2">⚡</span>
                      Yeni Analiz
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Reports */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">🕒</span>Son Raporlarım
            </h3>
            
            {recentReports.length > 0 ? (
              <div className="space-y-4">
                {recentReports.map((report) => {
                  const reportType = reportTypes.find(t => t.type === report.type);
                  return (
                    <div key={report.id} className="bg-white/10 rounded-xl p-4 flex items-center justify-between border border-white/20 hover:bg-white/15 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${reportType?.color} rounded-xl flex items-center justify-center text-lg`}>
                          {reportType?.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{report.title}</h4>
                          <p className="text-white/60 text-sm">{report.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                          Tamamlandı
                        </span>
                        <button className="bg-[#baf200] text-[#146448] px-4 py-2 rounded-lg font-medium transition-colors hover:bg-[#baf200]/90">
                          Görüntüle
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <h4 className="text-xl font-semibold text-white mb-2">Henüz rapor bulunmuyor</h4>
                <p className="text-white/70 mb-6">İlk analizinizi oluşturarak raporlarınızı görmeye başlayın</p>
                <button
                  onClick={() => window.location.href = '/dashboard/analysis'}
                  className="bg-[#baf200] text-[#146448] px-6 py-3 rounded-xl font-semibold transition-colors hover:bg-[#baf200]/90"
                >
                  Analiz Oluştur
                </button>
              </div>
            )}
          </div>

          {/* Report Features */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">✨ Rapor Özellikleri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Detaylı Analizler</h4>
                <p className="text-white/70 text-sm">Kapsamlı veri analizi ve görselleştirme</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">📄</span>
                </div>
                <h4 className="font-semibold text-white mb-2">PDF İndirme</h4>
                <p className="text-white/70 text-sm">Profesyonel PDF formatında raporlar</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🖨️</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Yazdırma Desteği</h4>
                <p className="text-white/70 text-sm">Optimize edilmiş yazdırma düzeni</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🔄</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Güncel Veriler</h4>
                <p className="text-white/70 text-sm">Real-time pazar ve iklim verileri</p>
              </div>
            </div>
          </div>

          {/* How to Create Reports */}
          <div className="bg-gradient-to-r from-[#baf200]/20 to-[#baf200]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#baf200]/30">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">💡 Rapor Nasıl Oluşturulur?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#baf200] text-[#146448] rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  1
                </div>
                <h4 className="font-semibold text-white mb-3">Analiz Türü Seçin</h4>
                <p className="text-white/80 text-sm">5 farklı analiz türünden birini seçerek analiz sürecini başlatın</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#baf200] text-[#146448] rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  2
                </div>
                <h4 className="font-semibold text-white mb-3">Parametreler Girin</h4>
                <p className="text-white/80 text-sm">Sera büyüklüğü, lokasyon, ürün türü gibi gerekli bilgileri doldurun</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#baf200] text-[#146448] rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  3
                </div>
                <h4 className="font-semibold text-white mb-3">Rapor İndirin</h4>
                <p className="text-white/80 text-sm">AI analizi tamamlandıktan sonra PDF olarak raporunuzu indirin</p>
              </div>
            </div>
          </div>

        </main>
      </div>
    </ClientOnly>
  );
}
