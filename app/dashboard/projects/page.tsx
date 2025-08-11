'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Force dynamic rendering for dashboard pages
export const dynamic = 'force-dynamic';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);
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
      expectedReturn: '₺1,677,500'
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
      expectedReturn: '₺1,145,430'
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
      expectedReturn: '₺2,056,320'
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
      expectedReturn: '₺988,500'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Tamamlandı':
        return 'bg-green-100 text-green-800';
      case 'Devam Ediyor':
        return 'bg-blue-100 text-blue-800';
      case 'Başlatıldı':
        return 'bg-yellow-100 text-yellow-800';
      case 'Planlama':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Sera Projeleri</h1>
            <p className="text-white">Tüm sera projelerinizi görüntüleyin ve yönetin</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
            <span>➕</span>
            <span>Yeni Proje</span>
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Toplam Proje</p>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Aktif Proje</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.filter(p => p.status === 'Devam Ediyor' || p.status === 'Başlatıldı').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📏</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Toplam Alan</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.reduce((acc, p) => acc + parseInt(p.size.replace(/[^\d]/g, '')), 0).toLocaleString()} m²
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ortalama ROI</p>
                <p className="text-2xl font-bold text-gray-900">+29.3%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Proje Listesi</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proje
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İlerleme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yatır��m
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500">{project.location} • {project.size} • {project.crop}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-green-600">{project.roi}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.investment}</div>
                        <div className="text-xs text-gray-500">Beklenen: {project.expectedReturn}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => { setSelectedProject(project); setModalType('view'); }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Görüntüle
                        </button>
                        <button
                          onClick={() => { setSelectedProject(project); setModalType('edit'); }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => { setSelectedProject(project); setModalType('delete'); }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Content */}
        {selectedProject && modalType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold" style={{ color: '#1e3237' }}>
                  {modalType === 'view' && 'Proje Detayları'}
                  {modalType === 'edit' && 'Proje Düzenle'}
                  {modalType === 'delete' && 'Proje Sil'}
                </h2>
                <button
                  onClick={() => { setSelectedProject(null); setModalType(null); }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* View Project */}
              {modalType === 'view' && (
                <div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                        <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Proje Bilgileri</h4>
                        <div className="space-y-2 text-sm" style={{ color: '#f6f8f9' }}>
                          <p><strong>Ad:</strong> {selectedProject.name}</p>
                          <p><strong>Lokasyon:</strong> {selectedProject.location}</p>
                          <p><strong>Alan:</strong> {selectedProject.size}</p>
                          <p><strong>Ürün:</strong> {selectedProject.crop}</p>
                          <p><strong>Durum:</strong> {selectedProject.status}</p>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                        <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Finansal Bilgiler</h4>
                        <div className="space-y-2 text-sm" style={{ color: '#f6f8f9' }}>
                          <p><strong>Yatırım:</strong> {selectedProject.investment}</p>
                          <p><strong>Beklenen Getiri:</strong> {selectedProject.expectedReturn}</p>
                          <p><strong>ROI:</strong> {selectedProject.roi}</p>
                          <p><strong>İlerleme:</strong> %{selectedProject.progress}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Zaman Çizelgesi</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm" style={{ color: '#f6f8f9' }}>
                        <p><strong>Başlangıç:</strong> {selectedProject.startDate}</p>
                        <p><strong>Bitiş:</strong> {selectedProject.endDate}</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border" style={{ borderColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#1e3237' }}>Proje İlerleme Durumu</h4>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                          className="h-3 rounded-full"
                          style={{ backgroundColor: '#146448', width: `${selectedProject.progress}%` }}
                        />
                      </div>
                      <p className="text-sm" style={{ color: '#1e3237' }}>%{selectedProject.progress} tamamlandı</p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => setModalType('edit')}
                      className="py-2 px-4 rounded-lg font-medium"
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => { setSelectedProject(null); setModalType(null); }}
                      className="py-2 px-4 rounded-lg font-medium border"
                      style={{ borderColor: '#146448', color: '#1e3237' }}
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Project */}
              {modalType === 'edit' && (
                <div>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Proje Düzenleme</h4>
                      <p className="text-sm opacity-90" style={{ color: '#f6f8f9' }}>
                        Proje bilgilerini güncelleyin.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium" style={{ color: '#1e3237' }}>Proje Adı</label>
                          <input
                            type="text"
                            defaultValue={selectedProject.name}
                            className="w-full p-3 rounded-lg border mt-1"
                            style={{ borderColor: '#146448' }}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium" style={{ color: '#1e3237' }}>Lokasyon</label>
                          <input
                            type="text"
                            defaultValue={selectedProject.location}
                            className="w-full p-3 rounded-lg border mt-1"
                            style={{ borderColor: '#146448' }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium" style={{ color: '#1e3237' }}>Alan (m²)</label>
                          <input
                            type="text"
                            defaultValue={selectedProject.size}
                            className="w-full p-3 rounded-lg border mt-1"
                            style={{ borderColor: '#146448' }}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium" style={{ color: '#1e3237' }}>Ürün</label>
                          <select className="w-full p-3 rounded-lg border mt-1" style={{ borderColor: '#146448' }}>
                            <option value="Domates" selected={selectedProject.crop === 'Domates'}>Domates</option>
                            <option value="Salatalık" selected={selectedProject.crop === 'Salatalık'}>Salatalık</option>
                            <option value="Biber" selected={selectedProject.crop === 'Biber'}>Biber</option>
                            <option value="Marul" selected={selectedProject.crop === 'Marul'}>Marul</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium" style={{ color: '#1e3237' }}>Durum</label>
                          <select className="w-full p-3 rounded-lg border mt-1" style={{ borderColor: '#146448' }}>
                            <option value="Planlama" selected={selectedProject.status === 'Planlama'}>Planlama</option>
                            <option value="Başlatıldı" selected={selectedProject.status === 'Başlatıldı'}>Başlatıldı</option>
                            <option value="Devam Ediyor" selected={selectedProject.status === 'Devam Ediyor'}>Devam Ediyor</option>
                            <option value="Tamamlandı" selected={selectedProject.status === 'Tamamlandı'}>Tamamlandı</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium" style={{ color: '#1e3237' }}>İlerleme (%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            defaultValue={selectedProject.progress}
                            className="w-full p-3 rounded-lg border mt-1"
                            style={{ borderColor: '#146448' }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium" style={{ color: '#1e3237' }}>Başlangıç Tarihi</label>
                          <input
                            type="date"
                            className="w-full p-3 rounded-lg border mt-1"
                            style={{ borderColor: '#146448' }}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium" style={{ color: '#1e3237' }}>Bitiş Tarihi</label>
                          <input
                            type="date"
                            className="w-full p-3 rounded-lg border mt-1"
                            style={{ borderColor: '#146448' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => { setSelectedProject(null); setModalType(null); }}
                      className="py-2 px-4 rounded-lg font-medium border"
                      style={{ borderColor: '#146448', color: '#1e3237' }}
                    >
                      İptal
                    </button>
                    <button
                      className="py-2 px-4 rounded-lg font-medium"
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      Değişiklikleri Kaydet
                    </button>
                  </div>
                </div>
              )}

              {/* Delete Project */}
              {modalType === 'delete' && (
                <div>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                      <h4 className="font-medium mb-2 text-red-800">⚠️ Proje Silme Onayı</h4>
                      <p className="text-sm text-red-700">
                        Bu projeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#146448' }}>
                      <h4 className="font-medium mb-2" style={{ color: '#f6f8f9' }}>Silinecek Proje:</h4>
                      <div className="space-y-1 text-sm" style={{ color: '#f6f8f9' }}>
                        <p><strong>Ad:</strong> {selectedProject.name}</p>
                        <p><strong>Lokasyon:</strong> {selectedProject.location}</p>
                        <p><strong>Durum:</strong> {selectedProject.status}</p>
                        <p><strong>İlerleme:</strong> %{selectedProject.progress}</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-yellow-300 bg-yellow-50">
                      <h4 className="font-medium mb-2 text-yellow-800">📋 Silme işlemi şunları da kaldıracak:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Tüm proje analizleri</li>
                        <li>• İlgili raporlar</li>
                        <li>• Finansal veriler</li>
                        <li>• Dosya ve belgeler</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => { setSelectedProject(null); setModalType(null); }}
                      className="py-2 px-4 rounded-lg font-medium border"
                      style={{ borderColor: '#146448', color: '#1e3237' }}
                    >
                      İptal
                    </button>
                    <button
                      className="py-2 px-4 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700"
                    >
                      Projeyi Sil
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
