'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import TurnkeyProjectModal from '../../components/TurnkeyProjectModal';

export default function AnahtarTeslimProjePage() {
  const [activeSection, setActiveSection] = useState('turnkey-service');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarSections = [
    {
      title: 'Anahtar Teslim Hizmeti',
      id: 'turnkey',
      icon: '🏗️',
      items: [
        { id: 'turnkey-service', title: 'Anahtar Teslim Sera Hizmeti', href: '#turnkey-service' },
        { id: 'discovery', title: 'Keşif', href: '#discovery' },
        { id: 'project-design', title: 'Projelendirme', href: '#project-design' },
        { id: 'proposal', title: 'Tekliflendirme', href: '#proposal' },
        { id: 'installation', title: 'Kurulum', href: '#installation' },
        { id: 'training-commissioning', title: 'Eğitim & Devreye Alma', href: '#training-commissioning' }
      ]
    },
    {
      title: 'Hizmet Bileşenleri',
      id: 'service-components',
      icon: '🛠️',
      items: [
        { id: 'service-overview', title: 'Hizmet Bileşenleri', href: '#service-overview' },
        { id: 'construction', title: 'Sera Konstrüksiyonu', href: '#construction' },
        { id: 'automation', title: 'Otomasyon Sistemi', href: '#automation' },
        { id: 'heating-systems', title: 'ISITMAX Isıtma Sistemleri', href: '#heating-systems' },
        { id: 'irrigation', title: 'Sulama Sistemleri', href: '#irrigation' }
      ]
    },
    {
      title: 'Partnerler & Hedef Kitle',
      id: 'partners',
      icon: '🤝',
      items: [
        { id: 'business-partners', title: 'İş Ortaklarımız', href: '#business-partners' },
        { id: 'target-audience', title: 'Hedef Kitle', href: '#target-audience' },
        { id: 'government-subsidies', title: 'Devlet Teşvikleri', href: '#government-subsidies' },
        { id: 'corporate-clients', title: 'Kurumsal Müşteriler', href: '#corporate-clients' }
      ]
    }
  ];

  const contentData = {
    'turnkey-service': {
      title: 'Anahtar Teslim Sera Hizmeti',
      subtitle: 'Help Center / Anahtar Teslim Proje',
      description: 'Kullanıcının yatırım fikrini baştan sona anahtar teslim şekilde uygulamak. Demonte veya sabit sera konstrüksiyonundan otomasyon sistemine, ısıtmadan sulamaya kadar tüm bileşenleri ile eksiksiz hizmet.',
      steps: [
        {
          title: '1. Keşif',
          items: [
            'Lokasyon verileri alınır',
            'Saha ziyaretleri yapılır',
            'Toprak ve iklim analizi',
            'Çevresel faktörlerin değerlendirilmesi'
          ]
        },
        {
          title: '2. Projelendirme',
          items: [
            'İklim verilerine göre sera modeli tasarlanır',
            'Zemin koşulları değerlendirilir',
            'Ürün hedefi belirlenir',
            'Yatırım bütçesine uygun çözümler geliştirilir'
          ]
        },
        {
          title: '3. Tekliflendirme',
          items: [
            'Detaylı malzeme listesi hazırlanır',
            'Kurulum süreci planlanır',
            'Teslim süresi belirlenir',
            'Şeffaf fiyat detayları sunulur'
          ]
        },
        {
          title: '4. Kurulum',
          items: [
            'Isıtma sistemleri kurulur',
            'Otomasyon altyapısı tamamlanır',
            'Sulama sistemleri monte edilir',
            'Diğer altyapılar entegre edilir'
          ]
        },
        {
          title: '5. Eğitim & Devreye Alma',
          items: [
            'Personel eğitimi verilir',
            'İlk ürün aşamasında destek sağlanır',
            'Sistem optimizasyonu yapılır',
            'Garanti ve bakım programı başlatılır'
          ]
        }
      ]
    },
    'discovery': {
      title: 'Keşif Süreci',
      subtitle: 'Help Center / Anahtar Teslim Proje',
      description: 'Projenin başarısı için kritik olan keşif aşamasında, saha koşulları detaylı şekilde incelenir ve en uygun çözümler için temel veriler toplanır.',
      steps: [
        {
          title: 'Saha İncelemesi',
          items: [
            'Lokasyon koordinatları ve erişim yolları',
            'Mevcut altyapı durumu (elektrik, su, doğalgaz)',
            'Topografik özellikler ve eğim analizi',
            'Çevredeki yapılar ve gölgeleme faktörleri'
          ]
        },
        {
          title: 'Veri Toplama',
          items: [
            'İklim verileri ve meteorolojik ölçümler',
            'Toprak analizi ve drenaj durumu',
            'Su kaynakları ve kalitesi',
            'Yasal izinler ve zoning durumu'
          ]
        }
      ]
    },
    'service-overview': {
      title: 'Hizmet Bileşenleri',
      subtitle: 'Help Center / Anahtar Teslim Proje',
      description: 'Anahtar teslim sera projelerimizde sunduğumuz kapsamlı hizmet bileşenleri ile tam entegre çözümler sağlıyoruz.',
      steps: [
        {
          title: 'Yapısal Sistemler',
          items: [
            'Demonte veya sabit sera konstrüksiyonu',
            'Galvanizli çelik çerçeve sistemleri',
            'Polikarbon veya cam örtü malzemeleri',
            'Havalandırma ve çatı sistemleri'
          ]
        },
        {
          title: 'Teknolojik Sistemler',
          items: [
            'Otomasyon sistemi (ısı, sulama, nem, ışık kontrol)',
            'ISITMAX ısıtma sistemleri',
            'Sulama sistemleri (damla, sisleme, sprey)',
            'Bitki türüne özel yerleşim ve üretim tasarımı'
          ]
        },
        {
          title: 'Destek Hizmetleri',
          items: [
            'Kurulum sonrası teknik destek',
            'Garanti ve bakım hizmetleri',
            'Personel eğitimi programları',
            'Sistem optimizasyonu danışmanlığı'
          ]
        }
      ]
    },
    'business-partners': {
      title: 'İş Ortaklarımız',
      subtitle: 'Help Center / Anahtar Teslim Proje',
      description: 'Anahtar teslim projelerimizde güvenilir ve deneyimli iş ortaklarımızla birlikte çalışarak en kaliteli çözümleri sunuyoruz.',
      steps: [
        {
          title: 'Ana Çözüm Ortakları',
          items: [
            'Eminel Tarım - Anahtar teslim projelerde ana çözüm ortağı',
            'ISITMAX - Sera ısıtma sistemleri uzmanı',
            'IOX Modular Systems - Modüler sera teknolojileri',
            'Sertifikalı montaj ve kurulum ekipleri'
          ]
        },
        {
          title: 'Teknoloji Ortakları',
          items: [
            'Otomasyon sistemleri tedarikçileri',
            'İklim kontrol teknolojileri sağlayıcıları',
            'Sulama ekipmanları üreticileri',
            'Sera örtü malzemeleri tedarikçileri'
          ]
        }
      ]
    },
    'target-audience': {
      title: 'Hedef Kitle',
      subtitle: 'Help Center / Anahtar Teslim Proje',
      description: 'Anahtar teslim sera hizmetimiz, farklı ölçeklerde ve amaçlarda sera yatırımı planlayan geniş bir kitleye hitap etmektedir.',
      steps: [
        {
          title: 'Devlet Destekli Projeler',
          items: [
            'Devlet teşvikli sera yatırımcıları',
            'TKDK destekli tarım projeleri',
            'Kalkınma ajansı hibelerinden yararlananlar',
            'Tarım ve Orman Bakanlığı projelerı'
          ]
        },
        {
          title: 'Kurumsal Müşteriler',
          items: [
            'Kurumsal gıda ve ürün tedarik zinciri firmaları',
            'Büyük ölçekli perakende zincirleri',
            'Kooperatifler ve tarım birlikleri',
            'Yurt dışına üretim planlayan profesyonel üreticiler'
          ]
        },
        {
          title: 'Özel Sektör',
          items: [
            'Tarımsal holding şirketleri',
            'Yatırım fonları ve sermaye şirketleri',
            'Aile işletmeleri ve girişimciler',
            'İhracat odaklı üretici kooperatifleri'
          ]
        }
      ]
    },
    'heating-systems': {
      title: 'ISITMAX Isıtma Sistemleri',
      subtitle: 'Help Center / Anahtar Teslim Proje',
      description: 'İş ortağımız ISITMAX ile sera projelerinizde enerji verimliliği yüksek, çevre dostu ısıtma çözümleri sunuyoruz.',
      steps: [
        {
          title: 'Sistem Özellikleri',
          items: [
            'Yüksek enerji verimliliği',
            'Çevre dostu teknolojiler',
            'Otomatik kontrol sistemleri',
            'Düşük işletme maliyetleri'
          ]
        },
        {
          title: 'Kurulum ve Destek',
          items: [
            'Profesyonel montaj hizmeti',
            'Sistem optimizasyonu',
            'Periyodik bakım programları',
            '7/24 teknik destek'
          ]
        }
      ]
    }
  };

  const currentContent = contentData[activeSection as keyof typeof contentData] || contentData['turnkey-service'];

  return (
    <div className="min-h-screen bg-[#f6f8f9]">
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
              <a href="/destek" className="text-[#1e3237]/70 hover:text-[#1e3237] font-medium">
                Destek
              </a>
              <a href="/danismanlik" className="text-[#1e3237]/70 hover:text-[#1e3237] font-medium">
                Danışmanlık
              </a>
              <a href="/anahtar-teslim-proje" className="text-[#1e3237]/70 hover:text-[#1e3237] font-medium">
                Anahtar Teslim Sera
              </a>
              <a href="/auth/login" className="text-[#1e3237]/70 hover:text-[#1e3237] font-medium">
                Giriş Yap
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  closed: { rotate: 0 },
                  open: { rotate: 180 }
                }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-50"
          >
            <div className="max-w-md mx-auto p-6 space-y-6">
              <div className="text-center border-b border-gray-100 pb-4">
                <h3 className="text-lg font-semibold text-[#1e3237]">Menü</h3>
              </div>
              <div className="space-y-3">
                <a
                  href="/destek"
                  className="block text-gray-700 hover:text-[#1e3237] hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">❓</span>
                    <span className="text-base font-medium">Destek</span>
                  </div>
                </a>
                <a
                  href="/danismanlik"
                  className="block text-gray-700 hover:text-[#1e3237] hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🎯</span>
                    <span className="text-base font-medium">Danışmanlık</span>
                  </div>
                </a>
                <a
                  href="/anahtar-teslim-proje"
                  className="block text-gray-700 hover:text-[#1e3237] hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🏗️</span>
                    <span className="text-base font-medium">Anahtar Teslim Sera</span>
                  </div>
                </a>
                <a
                  href="/blog"
                  className="block text-gray-700 hover:text-[#1e3237] hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">📖</span>
                    <span className="text-base font-medium">Blog</span>
                  </div>
                </a>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <a
                  href="/auth/login"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-4 rounded-xl font-medium transition-all hover:from-gray-800 hover:to-gray-900 shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg mr-2">🔐</span>
                  <span>Panele Giriş</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-lg">
              {sidebarSections.map((section) => (
                <div key={section.id} className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">{section.icon}</span>
                    <h3 className="font-semibold text-[#1e3237]">{section.title}</h3>
                  </div>
                  <div className="space-y-1 ml-6">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          activeSection === item.id
                            ? 'bg-[#baf200]/30 text-[#1e3237] font-medium'
                            : 'text-[#1e3237]/70 hover:text-[#1e3237] hover:bg-gray-50'
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#baf200] hover:bg-[#baf200]/90 text-[#1e3237] text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <span className="text-lg">🏗️</span>
                  <span>Proje Teklifi Al</span>
                </motion.button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Ücretsiz keşif ve teklif hizmeti
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg">
              {/* Breadcrumb */}
              <div className="text-sm text-gray-500 mb-6">
                {currentContent.subtitle}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-[#1e3237] mb-6">
                {currentContent.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-[#1e3237]/70 mb-8 leading-relaxed">
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
                    className="border-l-4 border-[#146448] pl-6"
                  >
                    <h2 className="text-xl font-semibold text-[#1e3237] mb-4">
                      {step.title}
                    </h2>
                    <div className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-[#baf200]/30 rounded-full flex items-center justify-center mt-0.5">
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
                <h3 className="font-semibold text-[#1e3237] mb-4">Sonraki Adımlar</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    • Ücretsiz saha değerlendirmesi için başvuru yapın
                  </p>
                  <p className="text-gray-700">
                    • Keşif ve ön fizibilite raporu alın
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

      {/* Footer */}
      <Footer />

      {/* Turnkey Project Modal */}
      <TurnkeyProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
