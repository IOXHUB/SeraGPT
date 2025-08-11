'use client';

import Link from 'next/link';

export default function KullaniciIslemleriPage() {
  const userOperations = [
    {
      id: 'profile',
      title: 'Profil Yönetimi',
      description: 'Kişisel bilgilerinizi düzenleyin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )
    },
    {
      id: 'security',
      title: 'Güvenlik Ayarları',
      description: 'Şifre ve güvenlik seçenekleri',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
        </svg>
      )
    },
    {
      id: 'notifications',
      title: 'Bildirim Tercihleri',
      description: 'E-posta ve sistem bildirimleri',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,9V7H13V9H11M11,17V11H13V17H11Z"/>
        </svg>
      )
    },
    {
      id: 'subscription',
      title: 'Abonelik Yönetimi',
      description: 'Plan ve faturalandırma',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19M16.5,16.25C16.5,16.8 16.05,17.25 15.5,17.25H14.5C13.95,17.25 13.5,16.8 13.5,16.25V15.75C13.5,15.2 13.95,14.75 14.5,14.75H15.5C16.05,14.75 16.5,15.2 16.5,15.75V16.25M16.5,13.5C16.5,14.05 16.05,14.5 15.5,14.5H14.5C13.95,14.5 13.5,14.05 13.5,13.5V6.75C13.5,6.2 13.95,5.75 14.5,5.75H15.5C16.05,5.75 16.5,6.2 16.5,6.75V13.5M11,16.25C11,16.8 10.55,17.25 10,17.25H9C8.45,17.25 8,16.8 8,16.25V15.75C8,15.2 8.45,14.75 9,14.75H10C10.55,14.75 11,15.2 11,15.75V16.25M11,13.5C11,14.05 10.55,14.5 10,14.5H9C8.45,14.5 8,14.05 8,13.5V6.75C8,6.2 8.45,5.75 9,5.75H10C10.55,5.75 11,6.2 11,6.75V13.5Z"/>
        </svg>
      )
    },
    {
      id: 'activity',
      title: 'Hesap Aktivitesi',
      description: 'Giriş kayıtları ve aktivite geçmişi',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3"/>
        </svg>
      )
    },
    {
      id: 'data',
      title: 'Veri Yönetimi',
      description: 'Veri dışa aktarma ve silme',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/ai-chat" className="text-gray-600 hover:text-gray-900">
                ← Geri
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Kullanıcı İşlemleri</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userOperations.map((operation) => (
            <button
              key={operation.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="text-black group-hover:text-gray-700 transition-colors">
                  {operation.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {operation.title}
                  </h3>
                  <p className="text-sm text-gray-600">
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
