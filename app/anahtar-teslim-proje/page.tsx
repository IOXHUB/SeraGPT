'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AnahtarTeslimProjePage() {
  const [activeSection, setActiveSection] = useState('project-planning');

  const sidebarSections = [
    {
      title: 'Proje Planlama',
      id: 'planning',
      icon: '📋',
      items: [
        { id: 'project-planning', title: 'Proje Planlama Süreci', href: '#project-planning' },
        { id: 'feasibility-study', title: 'Fizibilite Çalışması', href: '#feasibility-study' },
        { id: 'design-phase', title: 'Tasarım Aşaması', href: '#design-phase' },
        { id: 'timeline-planning', title: 'Zaman Planlaması', href: '#timeline-planning' },
        { id: 'permit-licensing', title: 'İzin ve Ruhsatlar', href: '#permit-licensing' }
      ]
    },
    {
      title: 'Saha Değerlendirmesi',
      id: 'site-assessment',
      icon: '🔍',
      items: [
        { id: 'site-survey', title: 'Saha Araştırması', href: '#site-survey' },
        { id: 'soil-analysis', title: 'Toprak Analizi', href: '#soil-analysis' },
        { id: 'climate-assessment', title: 'İklim Değerlendirmesi', href: '#climate-assessment' },
        { id: 'infrastructure-check', title: 'Altyapı Kontrolü', href: '#infrastructure-check' },
        { id: 'environmental-impact', title: 'Çevresel Etki', href: '#environmental-impact' }
      ]
    },
    {
      title: 'Kurulum & Bakım',
      id: 'installation',
      icon: '🏗️',
      items: [
        { id: 'equipment-selection', title: 'Ekipman Seçimi', href: '#equipment-selection' },
        { id: 'installation-process', title: 'Kurulum Süreci', href: '#installation-process' },
        { id: 'testing-commissioning', title: 'Test ve Devreye Alma', href: '#testing-commissioning' },
        { id: 'training-support', title: 'Eğitim ve Destek', href: '#training-support' },
        { id: 'maintenance-service', title: 'Bakım Hizmetleri', href: '#maintenance-service' }
      ]
    }
  ];

  const contentData = {
    'project-planning': {
      title: 'Anahtar Teslim Proje Planlama',
      subtitle: 'Help Center / Anahtar Teslim Proje',
      description: 'Sera projenizi baştan sona profesyonel ekibimizle planlayın ve hayata geçirin. 20+ yıl deneyimimizle projelerinizi güvenle teslim ediyoruz.',
      steps: [
        {
          title: '1. Proje Başlangıcı',
          items: [
            'İhtiyaç analizi ve fizibilite çalışması',
            'Saha incelemesi ve uygunluk değerlendirmesi',
            'Ön tasarım ve kavramsal çözümler',
            'Maliyet tahmini ve zaman planlaması'
          ]
        },
        {
          title: '2. Detay Tasarım',
          items: [
            'Yapısal mühendislik hesapları',
            'Mekanik ve elektrik sistem tasarımı',
            '3D modelleme ve görselleştirme',
            'Teknik doküman hazırlama'
          ]
        },
        {
          title: '3. Uygulama',
          items: [
            'İnşaat ve montaj yönetimi',
            'Kalite kontrol ve test süreçleri',
            'Devreye alma ve kullanıcı eğitimi',
            'Teslim sonrası destek ve garanti'
          ]
        }
      ]
    },
    'feasibility-study': {
      title: 'Fizibilite Çalışması',
      subtitle: 'Help Center / Anahtar Teslim Proje',
      description: 'Kapsamlı fizibilite çalışması ile projenizin teknik ve ekonomik uygunluğunu değerlendiriyoruz.',
      steps: [
        {
          title: 'Teknik Fizibilite',
          items: [
            'Saha koşulları ve uygunluk analizi',
            'İklim verileri ve çevresel faktörler',
            'Altyapı gereksinimleri değerlendirmesi',
            'Teknoloji seçimi ve sistem tasarımı'
          ]
        },
        {
          title: 'Ekonomik Fizibilite',
          items: [
            'Yatırım maliyeti hesaplaması',
            'İşletme giderleri projeksiyonu',
            'Gelir tahminleri ve pazar analizi',
            'ROI hesaplama ve geri ödeme süresi'
          ]
        }
      ]
    },
    'site-survey': {
      title: 'Saha Araştırması',
      subtitle: 'Help Center / Anahtar Teslim Proje',
      description: 'Detaylı saha araştırması ile projenizin başarısını garanti altına alıyoruz. Uzman ekibimiz her detayı inceleyerek en uygun çözümleri sunar.',
      steps: [
        {
          title: 'Jeoteknik İnceleme',
          items: [
            'Zemin etüdü ve taşıma kapasitesi analizi',
            'Drenaj sistemi değerlendirmesi',
            'Eğim ve topografya analizi',
            'Su tablası seviyesi ölçümü'
          ]
        },
        {
          title: 'Çevresel Faktörler',
          items: [
            'Rüzgar yönü ve hızı ölçümleri',
            'Güneş ışığı ve gölgeleme analizi',
            'Çevredeki yapıların etkisi',
            'Erişim yolları ve lojistik planlama'
          ]
        }
      ]
    },
    'equipment-selection': {
      title: 'Ekipman Seçimi',
      subtitle: 'Help Center / Anahtar Teslim Proje',
      description: 'Projeniz için en uygun ekipmanları seçerek maksimum verimlilik ve uzun ömür garanti ediyoruz.',
      steps: [
        {
          title: 'Yapısal Ekipmanlar',
          items: [
            'Sera çerçeve sistemi seçimi (Çelik/Alüminyum)',
            'Örtü malzemesi belirleme (Cam/Polikarbon)',
            'Havalandırma sistemi planlaması',
            'Gölgeleme ve enerji perdeleri'
          ]
        },
        {
          title: 'Teknik Sistemler',
          items: [
            'İklim kontrol ve otomasyon sistemleri',
            'Sulama ve gübreleme ekipmanları',
            'Isıtma ve soğutma sistemleri',
            'Elektrik ve aydınlatma altyapısı'
          ]
        }
      ]
    },
    'installation-process': {
      title: 'Kurulum Süreci',
      subtitle: 'Help Center / Anahtar Teslim Proje',
      description: 'Deneyimli montaj ekibimizle projelerinizi zamanında ve kaliteli şekilde teslim ediyoruz.',
      steps: [
        {
          title: 'Kurulum Aşamaları',
          items: [
            'Saha hazırlığı ve temel işleri',
            'Çelik konstrüksiyon montajı',
            'Örtü malzemesi ve yalıtım işleri',
            'Mekanik ve elektrik sistem kurulumu'
          ]
        },
        {
          title: 'Kalite Kontrol',
          items: [
            'Her aşamada kalite kontrol testleri',
            'Sistem entegrasyon ve ayarları',
            'Performans testleri ve kalibrasyonlar',
            'Son kontroller ve teslim hazırlığı'
          ]
        }
      ]
    },
    'maintenance-service': {
      title: 'Bakım Hizmetleri',
      subtitle: 'Help Center / Anahtar Teslim Proje',
      description: 'Teslim sonrası kapsamlı bakım ve destek hizmetleri ile yatırımınızı koruyoruz.',
      steps: [
        {
          title: 'Periyodik Bakım',
          items: [
            'Mevsimsel sistem kontrolleri',
            'Ekipman kalibrasyonu ve ayarları',
            'Önleyici bakım programları',
            'Yedek parça ve malzeme desteği'
          ]
        },
        {
          title: 'Teknik Destek',
          items: [
            '7/24 uzaktan izleme hizmeti',
            'Arıza durumunda hızlı müdahale',
            'Sistem optimizasyonu danışmanlığı',
            'Modernizasyon ve yükseltme hizmetleri'
          ]
        }
      ]
    }
  };

  const currentContent = contentData[activeSection as keyof typeof contentData] || contentData['project-planning'];

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
                    className="border-l-4 border-green-200 pl-6"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h2>
                    <div className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-xs font-medium text-green-600">
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
              <div className="mt-12 p-6 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Sonraki Adımlar</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    • Ücretsiz fizibilite çalışması için başvuru yapın
                  </p>
                  <p className="text-gray-700">
                    • Saha ziyareti randevusu alın
                  </p>
                  <p className="text-gray-700">
                    • Anahtar teslim proje teklifinizi inceleyin
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
