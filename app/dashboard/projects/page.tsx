'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function ProjectsPage() {
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
            <h1 className="text-2xl font-bold text-gray-900">Sera Projeleri</h1>
            <p className="text-gray-600">Tüm sera projelerinizi görüntüleyin ve yönetin</p>
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
                    Yatırım
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
                        <button className="text-green-600 hover:text-green-900">Görüntüle</button>
                        <button className="text-blue-600 hover:text-blue-900">Düzenle</button>
                        <button className="text-red-600 hover:text-red-900">Sil</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
