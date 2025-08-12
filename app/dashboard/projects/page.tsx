'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ClientOnly from '@/components/ui/ClientOnly';

export const dynamic = 'force-dynamic';

export default function ProjectsPage() {
  const { user, loading, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'create' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const projects = [
    {
      id: 1,
      name: 'Antalya Domates Serası',
      location: 'Antalya, Türkiye',
      size: '2,500 m²',
      crop: 'Domates',
      status: 'Tamamlandı',
      progress: 100,
      roi: '+34.2%',
      startDate: '15 Mart 2024',
      endDate: '20 Mayıs 2024',
      investment: '₺1,250,000',
      expectedReturn: '₺1,677,500',
      category: 'Ticari Üretim',
      priority: 'Yüksek'
    },
    {
      id: 2,
      name: 'İzmir Salatalık Üretimi',
      location: 'İzmir, Türkiye',
      size: '1,800 m²',
      crop: 'Salatalık',
      status: 'Devam Ediyor',
      progress: 65,
      roi: '+28.7%',
      startDate: '1 Nisan 2024',
      endDate: '30 Haziran 2024',
      investment: '₺890,000',
      expectedReturn: '₺1,145,430',
      category: 'Organik Üretim',
      priority: 'Orta'
    },
    {
      id: 3,
      name: 'Bursa Marul Serası',
      location: 'Bursa, Türkiye',
      size: '3,200 m²',
      crop: 'Marul',
      status: 'Başlatıldı',
      progress: 25,
      roi: '+22.4%',
      startDate: '10 Mayıs 2024',
      endDate: '15 Ağustos 2024',
      investment: '₺1,680,000',
      expectedReturn: '₺2,056,320',
      category: 'Hibrit Teknoloji',
      priority: 'Yüksek'
    },
    {
      id: 4,
      name: 'Adana Biber Üretimi',
      location: 'Adana, Türkiye',
      size: '1,500 m²',
      crop: 'Biber',
      status: 'Planlama',
      progress: 10,
      roi: '+31.8%',
      startDate: '1 Haziran 2024',
      endDate: '30 Eylül 2024',
      investment: '₺750,000',
      expectedReturn: '₺988,500',
      category: 'Akıllı Sera',
      priority: 'Düşük'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Tamamlandı':
        return 'from-green-400 to-emerald-600';
      case 'Devam Ediyor':
        return 'from-blue-400 to-cyan-600';
      case 'Başlatıldı':
        return 'from-yellow-400 to-orange-500';
      case 'Planlama':
        return 'from-purple-400 to-violet-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Tamamlandı':
        return '✅';
      case 'Devam Ediyor':
        return '🔄';
      case 'Başlatıldı':
        return '🚀';
      case 'Planlama':
        return '📋';
      default:
        return '📄';
    }
  };

  const getCropIcon = (crop: string) => {
    switch (crop) {
      case 'Domates':
        return '🍅';
      case 'Salatalık':
        return '🥒';
      case 'Biber':
        return '🌶️';
      case 'Marul':
        return '🥬';
      default:
        return '🌱';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Yüksek':
        return 'text-red-400';
      case 'Orta':
        return 'text-yellow-400';
      case 'Düşük':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.crop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalInvestment = projects.reduce((acc, p) => acc + parseInt(p.investment.replace(/[^\d]/g, '')), 0);
  const totalArea = projects.reduce((acc, p) => acc + parseInt(p.size.replace(/[^\d]/g, '')), 0);
  const averageROI = projects.reduce((acc, p) => acc + parseFloat(p.roi.replace(/[^\d.]/g, '')), 0) / projects.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      console.log('🚫 Projects access denied - redirecting to login');
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
                <h1 className="text-xl font-bold text-white">Sera Projeleri</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-white text-sm">
                  <span className="opacity-70">Hoşgeldin, </span>
                  <span className="font-medium">{user?.email?.split('@')[0] || 'Kullanıcı'}</span>
                </div>
                <button
                  onClick={() => setModalType('create')}
                  className="bg-[#baf200] hover:bg-[#baf200]/90 text-[#146448] px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                >
                  <span>➕</span>
                  <span>Yeni Proje</span>
                </button>
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
          
          {/* Welcome Section & Overview Stats */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">🏗️ Sera Proje Yönetimi</h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto">
                Tüm sera projelerinizi tek yerden yönetin. İlerlemeleri takip edin, 
                finansal performansları analiz edin ve projelerinizi optimize edin.
              </p>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  🌱
                </div>
                <div className="text-3xl font-bold text-[#baf200] mb-2">{projects.length}</div>
                <div className="text-white/80 text-sm">Toplam Proje</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  🔄
                </div>
                <div className="text-3xl font-bold text-[#baf200] mb-2">
                  {projects.filter(p => p.status === 'Devam Ediyor' || p.status === 'Başlatıldı').length}
                </div>
                <div className="text-white/80 text-sm">Aktif Proje</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  📏
                </div>
                <div className="text-3xl font-bold text-[#baf200] mb-2">
                  {totalArea.toLocaleString()}
                </div>
                <div className="text-white/80 text-sm">m² Toplam Alan</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  💰
                </div>
                <div className="text-3xl font-bold text-[#baf200] mb-2">
                  +{averageROI.toFixed(1)}%
                </div>
                <div className="text-white/80 text-sm">Ortalama ROI</div>
              </div>
            </div>
          </div>

          {/* Search, Filter and Actions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Proje ara (isim, lokasyon, ürün)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/60 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                  />
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                >
                  <option value="all" className="text-black">Tüm Durumlar</option>
                  <option value="Planlama" className="text-black">Planlama</option>
                  <option value="Başlatıldı" className="text-black">Başlatıldı</option>
                  <option value="Devam Ediyor" className="text-black">Devam Ediyor</option>
                  <option value="Tamamlandı" className="text-black">Tamamlandı</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                >
                  <option value="name" className="text-black">İsme Göre</option>
                  <option value="status" className="text-black">Duruma Göre</option>
                  <option value="progress" className="text-black">İlerlemeye Göre</option>
                  <option value="roi" className="text-black">ROI'ye Göre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-[1.02] cursor-pointer"
                onClick={() => { setSelectedProject(project); setModalType('view'); }}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{getCropIcon(project.crop)}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#baf200] transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-white/70 text-sm">{project.location}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 bg-gradient-to-r ${getStatusColor(project.status)} rounded-full text-white text-xs font-medium flex items-center space-x-1`}>
                    <span>{getStatusIcon(project.status)}</span>
                    <span>{project.status}</span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Alan:</span>
                    <span className="text-white font-medium">{project.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Kategori:</span>
                    <span className="text-white font-medium">{project.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Öncelik:</span>
                    <span className={`font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">İlerleme</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getStatusColor(project.status)}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Financial Info */}
                <div className="bg-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Yatırım:</span>
                    <span className="text-white font-medium">{project.investment}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">ROI:</span>
                    <span className="text-green-400 font-bold">{project.roi}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedProject(project); setModalType('edit'); }}
                    className="flex-1 bg-[#baf200]/20 border border-[#baf200]/50 text-[#baf200] px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[#baf200]/30"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedProject(project); setModalType('view'); }}
                    className="flex-1 bg-white/20 border border-white/30 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/30"
                  >
                    Detaylar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {searchTerm || filterStatus !== 'all' ? 'Proje bulunamadı' : 'Henüz proje yok'}
              </h3>
              <p className="text-white/70 mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Arama kriterlerinizi değiştirerek tekrar deneyin'
                  : 'İlk sera projenizi oluşturarak başlayın'
                }
              </p>
              {(!searchTerm && filterStatus === 'all') && (
                <button
                  onClick={() => setModalType('create')}
                  className="bg-[#baf200] text-[#146448] px-6 py-3 rounded-xl font-semibold transition-colors hover:bg-[#baf200]/90"
                >
                  İlk Projeyi Oluştur
                </button>
              )}
            </div>
          )}

          {/* Project Analytics Summary */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">📊 Proje Performans Özeti</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                  💰
                </div>
                <div className="text-2xl font-bold text-[#baf200] mb-2">
                  ₺{totalInvestment.toLocaleString()}
                </div>
                <div className="text-white/80 text-sm">Toplam Yatırım</div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                  📈
                </div>
                <div className="text-2xl font-bold text-[#baf200] mb-2">
                  +{averageROI.toFixed(1)}%
                </div>
                <div className="text-white/80 text-sm">Ortalama ROI</div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                  ⏱️
                </div>
                <div className="text-2xl font-bold text-[#baf200] mb-2">
                  {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
                </div>
                <div className="text-white/80 text-sm">Ortalama İlerleme</div>
              </div>
            </div>
          </div>

        </main>

        {/* Modal */}
        {selectedProject && modalType && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-[#146448] to-[#0f4f37] rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {modalType === 'view' && '👁️ Proje Detayları'}
                  {modalType === 'edit' && '✏️ Proje Düzenle'}
                  {modalType === 'delete' && '🗑️ Proje Sil'}
                  {modalType === 'create' && '➕ Yeni Proje'}
                </h2>
                <button
                  onClick={() => { setSelectedProject(null); setModalType(null); }}
                  className="text-white/70 hover:text-white text-3xl transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Modal Content Based on Type */}
              {modalType === 'view' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <h4 className="font-bold text-white mb-4 flex items-center">
                        <span className="mr-2">{getCropIcon(selectedProject.crop)}</span>
                        Proje Bilgileri
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Ad:</span>
                          <span className="text-white font-medium">{selectedProject.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Lokasyon:</span>
                          <span className="text-white font-medium">{selectedProject.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Alan:</span>
                          <span className="text-white font-medium">{selectedProject.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Ürün:</span>
                          <span className="text-white font-medium">{selectedProject.crop}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Kategori:</span>
                          <span className="text-white font-medium">{selectedProject.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Durum:</span>
                          <span className={`px-2 py-1 bg-gradient-to-r ${getStatusColor(selectedProject.status)} rounded-full text-white text-xs font-medium`}>
                            {selectedProject.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <h4 className="font-bold text-white mb-4 flex items-center">
                        <span className="mr-2">💰</span>
                        Finansal Bilgiler
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Yatırım:</span>
                          <span className="text-white font-medium">{selectedProject.investment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Beklenen Getiri:</span>
                          <span className="text-white font-medium">{selectedProject.expectedReturn}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">ROI:</span>
                          <span className="text-green-400 font-bold">{selectedProject.roi}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Öncelik:</span>
                          <span className={`font-medium ${getPriorityColor(selectedProject.priority)}`}>
                            {selectedProject.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-bold text-white mb-4 flex items-center">
                      <span className="mr-2">📅</span>
                      Zaman Çizelgesi
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-white/70">Başlangıç:</span>
                        <span className="text-white font-medium">{selectedProject.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Bitiş:</span>
                        <span className="text-white font-medium">{selectedProject.endDate}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">İlerleme:</span>
                        <span className="text-white font-medium">{selectedProject.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full bg-gradient-to-r ${getStatusColor(selectedProject.status)}`}
                          style={{ width: `${selectedProject.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setModalType('edit')}
                      className="bg-[#baf200] text-[#146448] px-6 py-3 rounded-xl font-semibold transition-colors hover:bg-[#baf200]/90"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => { setSelectedProject(null); setModalType(null); }}
                      className="bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-colors hover:bg-white/30"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'create' && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Yeni Proje Oluşturma</h3>
                    <p className="text-white/70 mb-6">
                      Bu özellik yakında aktif olacak. Şimdilik mevcut projelerinizi yönetebilirsiniz.
                    </p>
                    <button
                      onClick={() => { setSelectedProject(null); setModalType(null); }}
                      className="bg-[#baf200] text-[#146448] px-6 py-3 rounded-xl font-semibold transition-colors hover:bg-[#baf200]/90"
                    >
                      Tamam
                    </button>
                  </div>
                </div>
              )}

              {(modalType === 'edit' || modalType === 'delete') && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">
                      {modalType === 'edit' ? '✏️' : '🗑️'}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {modalType === 'edit' ? 'Proje Düzenleme' : 'Proje Silme'}
                    </h3>
                    <p className="text-white/70 mb-6">
                      Bu özellik yakında aktif olacak.
                    </p>
                    <button
                      onClick={() => { setSelectedProject(null); setModalType(null); }}
                      className="bg-[#baf200] text-[#146448] px-6 py-3 rounded-xl font-semibold transition-colors hover:bg-[#baf200]/90"
                    >
                      Tamam
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </ClientOnly>
  );
}
