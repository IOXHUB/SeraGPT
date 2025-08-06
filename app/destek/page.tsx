'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DestekPage() {
  const [activeSection, setActiveSection] = useState('quick-start');

  const sidebarSections = [
    {
      title: 'Destek',
      id: 'destek',
      icon: '❓',
      items: [
        { id: 'quick-start', title: 'Hızlı Başlangıç', href: '#quick-start' },
        { id: 'account-setup', title: 'Hesap Kurulumu', href: '#account-setup' },
        { id: 'first-analysis', title: 'İlk Analiz', href: '#first-analysis' },
        { id: 'pdf-reports', title: 'PDF Raporları', href: '#pdf-reports' },
        { id: 'troubleshooting', title: 'Sorun Giderme', href: '#troubleshooting' }
      ]
    }
  ];

  const contentData = {
    'quick-start': {
      title: 'SeraGPT ile Başlayın',
      subtitle: 'Help Center / Destek',
      description: 'SeraGPT, sera yatırımı için güçlü bir analiz ve danışmanlık platformudur. Kolayca analiz oluşturabilir, uzman görüşleri alabilir ve projenizi dakikalar içinde başlatabilirsiniz.',
      steps: [
        {
          title: '1. Ücretsiz Hesap Oluşturun',
          items: [
            'SeraGPT Paneline git',
            'Ücretsiz hesabınızı oluşturun',
            'E-posta doğrulaması yapın'
          ]
        },
        {
          title: '2. İlk Analizinizi Başlatın',
          items: [
            'Lokasyon bilgilerinizi girin',
            'Hedef ürün ve sera tipini seçin',
            'Analizinizi başlatın ve PDF raporunuzu alın'
          ]
        },
        {
          title: '3. Uzman Desteği Alın',
          items: [
            'Raporunuz hazır olduğunda uzmanlarımızla iletişime geçin',
            'Projenizi detaylı görüşün',
            'Anahtar teslim çözümler için fiyat teklifi alın'
          ]
        }
      ]
    },
    'account-setup': {
      title: 'Hesap Kurulumu',
      subtitle: 'Help Center / Destek',
      description: 'SeraGPT hesabınızı kurmak ve optimize etmek için rehber.',
      steps: [
        {
          title: 'Hesap Oluşturma',
          items: [
            'E-posta adresinizi doğrulayın',
            'Güçlü bir şifre belirleyin',
            'Profil bilgilerinizi tamamlayın'
          ]
        },
        {
          title: 'Profil Ayarları',
          items: [
            'İş bilgilerinizi ekleyin',
            'İlgi alanlarınızı belirtin',
            'Bildirim tercihlerinizi ayarlayın'
          ]
        }
      ]
    },
    'consultation-types': {
      title: 'Danışmanlık Türleri',
      subtitle: 'Help Center / Danışmanlık',
      description: 'SeraGPT uzmanları size farklı alanlarda profesyonel danışmanlık hizmeti sunar.',
      steps: [
        {
          title: 'Teknik Danışmanlık',
          items: [
            'Sera tasarımı ve mühendislik çözümleri',
            'İklim kontrol sistemleri optimizasyonu',
            'Enerji verimliliği danışmanlığı'
          ]
        },
        {
          title: 'Finansal Danışmanlık',
          items: [
            'Yatırım planlaması ve ROI analizi',
            'Teşvik ve hibe başvuru desteği',
            'Maliyet optimizasyonu stratejileri'
          ]
        },
        {
          title: 'Operasyonel Danışmanlık',
          items: [
            'Üretim planlama ve yönetimi',
            'Pazarlama ve satış stratejileri',
            'Kalite kontrol ve sertifikasyon'
          ]
        }
      ]
    },
    'project-planning': {
      title: 'Anahtar Teslim Proje Planlama',
      subtitle: 'Help Center / Anahtar Teslim Sera',
      description: 'Sera projenizi baştan sona profesyonel ekibimizle planlayın ve hayata geçirin.',
      steps: [
        {
          title: 'Proje Başlangıcı',
          items: [
            'İhtiyaç analizi ve fizibilite çalışması',
            'Saha incelemesi ve uygunluk değerlendirmesi',
            'Ön tasarım ve kavramsal çözümler'
          ]
        },
        {
          title: 'Detay Tasarım',
          items: [
            'Yapısal mühendislik hesapları',
            'Mekanik ve elektrik sistem tasarımı',
            '3D modelleme ve görselleştirme'
          ]
        },
        {
          title: 'Uygulama',
          items: [
            'İnşaat ve montaj yönetimi',
            'Kalite kontrol ve test süreçleri',
            'Devreye alma ve kullanıcı eğitimi'
          ]
        }
      ]
    }
  };

  const currentContent = contentData[activeSection as keyof typeof contentData] || contentData['quick-start'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                  alt="SeraGPT Logo"
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/destek" className="text-gray-600 hover:text-gray-900 font-medium">
                Destek
              </a>
              <a href="/danismanlik" className="text-gray-600 hover:text-gray-900 font-medium">
                Danışmanlık
              </a>
              <a href="/anahtar-teslim-proje" className="text-gray-600 hover:text-gray-900 font-medium">
                Anahtar Teslim Sera
              </a>
              <a href="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Giriş Yap
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              {sidebarSections.map((section) => (
                <div key={section.id} className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">{section.icon}</span>
                    <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  </div>
                  <div className="space-y-1 ml-6">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          activeSection === item.id
                            ? 'bg-gray-100 text-gray-900 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">İpuçları & Püf Noktaları</h4>
                <div className="space-y-1">
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 py-1">
                    En İyi Uygulamalar
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 py-1">
                    Kaynaklar
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              {/* Breadcrumb */}
              <div className="text-sm text-gray-500 mb-6">
                {currentContent.subtitle}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {currentContent.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {currentContent.description}
              </p>

              {/* Content Steps */}
              <div className="space-y-8">
                {currentContent.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-l-4 border-gray-200 pl-6"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h2>
                    <div className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-xs font-medium text-gray-600">
                              {itemIndex + 1}
                            </span>
                          </div>
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Next Steps */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Sonraki Adımlar</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    • Hesabınızı özelleştirin ve farklı türde analizler deneyin
                  </p>
                  <p className="text-gray-700">
                    • Uzman danışmanlık hizmetlerimizden faydalanın
                  </p>
                  <p className="text-gray-700">
                    ��� Anahtar teslim sera projelerimizi keşfedin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
