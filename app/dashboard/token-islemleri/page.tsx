'use client';

import Link from 'next/link';

export default function TokenIslemleriPage() {
  const tokenOperations = [
    {
      id: 'view',
      title: 'Token Görüntüle',
      description: 'Aktif API tokenlarınızı görüntüleyin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
        </svg>
      )
    },
    {
      id: 'generate',
      title: 'Yeni Token Oluştur',
      description: 'API erişimi için yeni token oluşturun',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
        </svg>
      )
    },
    {
      id: 'manage',
      title: 'Token Yönetimi',
      description: 'Tokenları düzenleyin ve silin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
        </svg>
      )
    },
    {
      id: 'usage',
      title: 'Kullanım İstatistikleri',
      description: 'Token kullanım raporlarını inceleyin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z"/>
        </svg>
      )
    },
    {
      id: 'security',
      title: 'Güvenlik Ayarları',
      description: 'Token güvenlik politikalarını yapılandırın',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,7C10.6,7 9.2,8.6 9.2,10V11H8V16H16V11H14.8V10C14.8,8.6 13.4,7 12,7M12,8.2C12.8,8.2 13.6,8.7 13.6,10V11H10.4V10C10.4,8.7 11.2,8.2 12,8.2Z"/>
        </svg>
      )
    },
    {
      id: 'backup',
      title: 'Token Yedekleme',
      description: 'Tokenları güvenli bir şekilde yedekleyin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L8,5H11V14H13V5H16M18,23H6C4.89,23 4,22.1 4,21V9A2,2 0 0,1 6,7H9V9H6V21H18V9H15V7H18A2,2 0 0,1 20,9V21A2,2 0 0,1 18,23Z"/>
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
              <Link href="/dashboard/ai-chat" className="hover:opacity-70 transition-opacity" style={{ color: '#f6f8f9' }}>
                ← Geri
              </Link>
              <h1 className="text-xl font-semibold" style={{ color: '#f6f8f9' }}>Token İşlemleri</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokenOperations.map((operation) => (
            <button
              key={operation.id}
              className="rounded-lg p-6 hover:shadow-lg transition-all duration-200 text-left group border"
              style={{ backgroundColor: '#f6f8f9', borderColor: '#146448' }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="transition-colors" style={{ color: '#1e3237' }}>
                  {operation.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2" style={{ color: '#1e3237' }}>
                    {operation.title}
                  </h3>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                    {operation.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
