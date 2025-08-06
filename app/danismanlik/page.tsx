'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DanismanlikPage() {
  const [activeSection, setActiveSection] = useState('consultation-types');

  const sidebarSections = [
    {
      title: 'Danışmanlık Türleri',
      id: 'consultation',
      icon: '🎯',
      items: [
        { id: 'consultation-types', title: 'Danışmanlık Türleri', href: '#consultation-types' },
        { id: 'technical-consulting', title: 'Teknik Danışmanlık', href: '#technical-consulting' },
        { id: 'financial-consulting', title: 'Finansal Danışmanlık', href: '#financial-consulting' },
        { id: 'operational-consulting', title: 'Operasyonel Danışmanlık', href: '#operational-consulting' },
        { id: 'market-analysis', title: 'Pazar Analizi', href: '#market-analysis' }
      ]
    },
    {
      title: 'Uzman Eşleştirme',
      id: 'expert-matching',
      icon: '👨‍🔬',
      items: [
        { id: 'expert-profiles', title: 'Uzman Profilleri', href: '#expert-profiles' },
        { id: 'specialization-areas', title: 'Uzmanlık Alanları', href: '#specialization-areas' },
        { id: 'experience-levels', title: 'Deneyim Seviyeleri', href: '#experience-levels' },
        { id: 'matching-process', title: 'Eşleştirme Süreci', href: '#matching-process' }
      ]
    },
    {
      title: 'Rezervasyon & Fiyatlandırma',
      id: 'booking',
      icon: '📅',
      items: [
        { id: 'session-booking', title: 'Seans Rezervasyonu', href: '#session-booking' },
        { id: 'pricing-plans', title: 'Fiyatlandırma Planları', href: '#pricing-plans' },
        { id: 'payment-methods', title: 'Ödeme Yöntemleri', href: '#payment-methods' },
        { id: 'cancellation-policy', title: 'İptal Politikası', href: '#cancellation-policy' },
        { id: 'package-deals', title: 'Paket Anlaşmalar', href: '#package-deals' }
      ]
    }
  ];

  const contentData = {
    'consultation-types': {
      title: 'Danışmanlık Türleri',
      subtitle: 'Help Center / Danışmanlık',
      description: 'SeraGPT uzmanları size farklı alanlarda profesyonel danışmanlık hizmeti sunar. 20+ yıl deneyimli mühendislerimizle sera yatırımınızı en verimli şekilde planlayın.',
      steps: [
        {
          title: '1. Teknik Danışmanlık',
          items: [
            'Sera tasarımı ve mühendislik çözümleri',
            'İklim kontrol sistemleri optimizasyonu',
            'Enerji verimliliği danışmanlığı',
            'Sulama ve gübreleme sistem tasarımı'
          ]
        },
        {
          title: '2. Finansal Danışmanlık',
          items: [
            'Yatırım planlaması ve ROI analizi',
            'Teşvik ve hibe başvuru desteği',
            'Maliyet optimizasyonu stratejileri',
            'Finansman kaynakları rehberliği'
          ]
        },
        {
          title: '3. Operasyonel Danışmanlık',
          items: [
            'Üretim planlama ve yönetimi',
            'Pazarlama ve satış stratejileri',
            'Kalite kontrol ve sertifikasyon',
            'İş süreçleri optimizasyonu'
          ]
        }
      ]
    },
    'technical-consulting': {
      title: 'Teknik Danışmanlık',
      subtitle: 'Help Center / Danışmanlık',
      description: 'Sera mühendisliği alanında uzman ekibimizden teknik danışmanlık alın. Modern teknolojiler ve kanıtlanmış yöntemlerle projelerinizi optimize edin.',
      steps: [
        {
          title: 'Sera Tasarımı ve Mühendislik',
          items: [
            'Statik hesaplamalar ve yapısal tasarım',
            'İklim kontrol sistemleri planlaması',
            'Havalandırma ve ısıtma optimizasyonu',
            'Otomasyion sistemleri entegrasyonu'
          ]
        },
        {
          title: 'Sistem Optimizasyonu',
          items: [
            'Enerji verimliliği analizi',
            'Sulama sistemleri konfigürasyonu',
            'CO2 zenginleştirme sistemleri',
            'Performans izleme ve raporlama'
          ]
        }
      ]
    },
    'expert-profiles': {
      title: 'Uzman Profilleri',
      subtitle: 'Help Center / Danışmanlık',
      description: 'SeraGPT uzman kadrosu, farklı disiplinlerden deneyimli profesyonellerden oluşmaktadır. Size en uygun uzmanla eşleştirilmeniz için profilleri inceleyin.',
      steps: [
        {
          title: 'Mühendislik Uzmanları',
          items: [
            'Ziraat Mühendisleri (10+ yıl deneyim)',
            'Makine Mühendisleri (Sera sistemleri)',
            'Elektrik Mühendisleri (Otomasyon)',
            'İnşaat Mühendisleri (Yapısal tasarım)'
          ]
        },
        {
          title: 'İş Geliştirme Uzmanları',
          items: [
            'Tarımsal girişim danışmanları',
            'Finansal planlama uzmanları',
            'Pazarlama ve satış danışmanları',
            'Proje yönetimi uzmanları'
          ]
        }
      ]
    },
    'session-booking': {
      title: 'Seans Rezervasyonu',
      subtitle: 'Help Center / Danışmanlık',
      description: 'Uzman danışmanlarımızla birebir görüşme rezervasyonu yapın. Online veya yüz yüze görüşme seçenekleri mevcuttur.',
      steps: [
        {
          title: 'Rezervasyon Süreci',
          items: [
            'Uzman seçimi ve müsait zaman dilimlerini görüntüleme',
            'Görüşme türü seçimi (Online/Yüz yüze)',
            'Randevu onayı ve takvim entegrasyonu',
            'Ön hazırlık dokümanları gönderimi'
          ]
        },
        {
          title: 'Görüşme Türleri',
          items: [
            '30 dakika hızlı danışmanlık',
            '60 dakika detaylı analiz',
            '2 saatlik kapsamlı proje değerlendirmesi',
            'Saha ziyareti ve yerinde inceleme'
          ]
        }
      ]
    },
    'pricing-plans': {
      title: 'Fiyatlandırma Planları',
      subtitle: 'Help Center / Danışmanlık',
      description: 'Danışmanlık hizmetlerimiz için esnek fiyatlandırma seçenekleri sunuyoruz. İhtiyacınıza uygun paketi seçebilirsiniz.',
      steps: [
        {
          title: 'Temel Danışmanlık Paketleri',
          items: [
            'Başlangıç Paketi: 30 dk görüşme - ₺500',
            'Standart Paket: 60 dk görüşme + rapor - ₺1.000',
            'Premium Paket: 2 saat + saha ziyareti - ₺2.500',
            'Kurumsal Paket: Özel fiyatlandırma'
          ]
        },
        {
          title: 'Ek Hizmetler',
          items: [
            'Detaylı fizibilite raporu hazırlama',
            'Teknik çizim ve proje dokümanları',
            'Teşvik başvuru süreç desteği',
            'Uzun vadeli danışmanlık anlaşmaları'
          ]
        }
      ]
    }
  };

  const currentContent = contentData[activeSection as keyof typeof contentData] || contentData['consultation-types'];

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
                    className="border-l-4 border-blue-200 pl-6"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h2>
                    <div className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-xs font-medium text-blue-600">
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
              <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Sonraki Adımlar</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    • Size uygun uzman danışmanla eşleştirme için profil oluşturun
                  </p>
                  <p className="text-gray-700">
                    • İlk ücretsiz görüşme için randevu alın
                  </p>
                  <p className="text-gray-700">
                    • Proje detaylarınızı uzmanlarımızla paylaşın
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
