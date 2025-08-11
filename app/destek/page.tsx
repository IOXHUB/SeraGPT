'use client';

import Link from 'next/link';

export default function DestekPage() {
  const supportOptions = [
    {
      id: 'quick-start',
      title: 'Hızlı Başlangıç',
      description: 'SeraGPT platformunu kullanmaya başlayın',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,7V13H13V7H11M11,15V17H13V15H11Z"/>
        </svg>
      )
    },
    {
      id: 'account-setup',
      title: 'Hesap Kurulumu',
      description: 'Hesabınızı kurun ve optimize edin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
        </svg>
      )
    },
    {
      id: 'analysis-help',
      title: 'Analiz Desteği',
      description: 'Analiz süreçleri ve raporlarla ilgili yardım',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M5,5H19V19H5V5M7,10V16H9V10H7M11,8V16H13V8H11M15,12V16H17V12H15Z"/>
        </svg>
      )
    },
    {
      id: 'technical-support',
      title: 'Teknik Destek',
      description: 'Platform kullanımında karşılaştığınız sorunlar',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z"/>
        </svg>
      )
    },
    {
      id: 'billing-support',
      title: 'Faturalandırma',
      description: 'Ödeme ve abonelik işlemleri',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8,10.9C9.53,10.31 8.8,9.7 8.8,8.75C8.8,7.66 9.81,6.9 11.5,6.9C13.28,6.9 13.94,7.75 14,9H16.21C16.14,7.28 15.09,5.7 13,5.19V3H10V5.16C8.06,5.58 6.5,6.84 6.5,8.77C6.5,11.08 8.41,12.23 11.2,12.9C13.7,13.5 14.2,14.38 14.2,15.31C14.2,16 13.71,17.1 11.5,17.1C9.44,17.1 8.63,16.18 8.5,15H6.32C6.44,17.19 8.08,18.42 10,18.83V21H13V18.85C14.95,18.5 16.5,17.35 16.5,15.3C16.5,12.46 14.07,11.5 11.8,10.9Z"/>
        </svg>
      )
    },
    {
      id: 'live-chat',
      title: 'Canlı Sohbet',
      description: 'Uzmanlarımızla anlık görüşme',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3Z"/>
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
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                ← Ana Sayfa
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Destek</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Size Nasıl Yardımcı Olabiliriz?</h2>
          <p className="text-gray-600">SeraGPT platformunu kullanırken ihtiyacınız olan desteği bulun</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportOptions.map((option) => (
            <button
              key={option.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="text-black group-hover:text-gray-700 transition-colors">
                  {option.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Hala Yardıma İhtiyacınız Var?</h3>
            <p className="text-gray-600 mb-6">Doğrudan bizimle iletişime geçin</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#146448] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#146448]/90 transition-colors">
                Destek Talebi Oluştur
              </button>
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                E-posta Gönder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
