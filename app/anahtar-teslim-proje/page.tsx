'use client';

import Link from 'next/link';

export default function AnahtarTeslimProjePage() {
  const turnkeyServices = [
    {
      id: 'design',
      title: 'Tasarım ve Planlama',
      description: 'Sera tasarımı ve mühendislik hesapları',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
        </svg>
      )
    },
    {
      id: 'construction',
      title: 'İnşaat ve Montaj',
      description: 'Profesyonel ekip ile sera inşaatı',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z"/>
        </svg>
      )
    },
    {
      id: 'climate-systems',
      title: 'İklim Kontrol Sistemleri',
      description: 'Otomatik ısıtma, soğutma ve havalandırma',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.22,15.05 2.27,14.78 2.46,14.63L4.57,12.97C4.53,12.65 4.5,12.33 4.5,12C4.5,11.67 4.53,11.34 4.57,11L2.46,9.37C2.27,9.22 2.22,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.78,8.95 21.73,9.22 21.54,9.37L19.43,11C19.47,11.34 19.5,11.67 19.5,12C19.5,12.33 19.47,12.65 19.43,12.97L21.54,14.63C21.73,14.78 21.78,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.03 19.05,18.95L16.56,17.94C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.61L12.75,4H11.25Z"/>
        </svg>
      )
    },
    {
      id: 'irrigation',
      title: 'Sulama Sistemleri',
      description: 'Modern damla sulama ve fertigation',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97L14.47,9.97Z"/>
        </svg>
      )
    },
    {
      id: 'automation',
      title: 'Otomasyon Sistemleri',
      description: 'Akıllı kontrol ve izleme sistemleri',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,6H13V8H11V6M11,10H13V16H11V10Z"/>
        </svg>
      )
    },
    {
      id: 'maintenance',
      title: 'Bakım ve Servis',
      description: 'Düzenli bakım ve teknik destek',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header */}
      <div className="border-b" style={{ backgroundColor: '#146448', borderBottomColor: '#f6f8f9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="hover:opacity-70 transition-opacity" style={{ color: '#f6f8f9' }}>
                ← Ana Sayfa
              </Link>
              <h1 className="text-xl font-semibold" style={{ color: '#f6f8f9' }}>Anahtar Teslim Proje</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#f6f8f9' }}>Anahtar Teslim Sera Çözümleri</h2>
          <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Baştan sona tamamlanmış sera projeleri</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {turnkeyServices.map((service) => (
            <button
              key={service.id}
              className="rounded-lg p-6 hover:shadow-lg transition-all duration-200 text-left group border"
              style={{ backgroundColor: '#f6f8f9', borderColor: '#146448' }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="transition-colors" style={{ color: '#1e3237' }}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2" style={{ color: '#1e3237' }}>
                    {service.title}
                  </h3>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                    {service.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="rounded-lg p-8" style={{ backgroundColor: '#f6f8f9' }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Anahtar Teslim Proje Teklifi Alın</h3>
            <p className="mb-6 opacity-70" style={{ color: '#1e3237' }}>Sera projeniz için detaylı fiyat teklifi alın</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all" style={{ backgroundColor: '#baf200', color: '#1e3237' }}>
                Teklif Talep Et
              </button>
              <button className="px-6 py-3 rounded-lg font-medium hover:opacity-80 transition-all border" style={{ backgroundColor: '#146448', color: '#f6f8f9', borderColor: '#146448' }}>
                Referans Projeler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
