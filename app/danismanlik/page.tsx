'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../../components/Footer';
import ConsultingRequestModal from '../../components/ConsultingRequestModal';

export default function DanismanlikPage() {
  const [activeSection, setActiveSection] = useState('project-consulting');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarSections = [
    {
      title: 'Proje Danışmanlığı',
      id: 'consulting',
      icon: '🎯',
      items: [
        { id: 'project-consulting', title: 'Proje Danışmanlığı Hizmeti', href: '#project-consulting' },
        { id: 'preliminary-meeting', title: 'Ön Görüşme', href: '#preliminary-meeting' },
        { id: 'data-analysis', title: 'Veri Analizi', href: '#data-analysis' },
        { id: 'custom-report', title: 'Özel Rapor Hazırlama', href: '#custom-report' },
        { id: 'qa-support', title: 'Soru-Cevap Desteği', href: '#qa-support' },
        { id: 'implementation-guidance', title: 'Uygulama Yönlendirmesi', href: '#implementation-guidance' }
      ]
    },
    {
      title: 'Fiyatlandırma',
      id: 'pricing',
      icon: '💰',
      items: [
        { id: 'pricing-plans', title: 'Fiyatlandırma Planları', href: '#pricing-plans' },
        { id: 'starter-consulting', title: 'Starter Danışmanlık', href: '#starter-consulting' },
        { id: 'project-reporting', title: 'Proje Raporlama Paketi', href: '#project-reporting' },
        { id: 'corporate-consulting', title: 'Kurumsal Danışmanlık', href: '#corporate-consulting' }
      ]
    },
    {
      title: 'Hedef Kitle',
      id: 'target-audience',
      icon: '👥',
      items: [
        { id: 'target-groups', title: 'Hedef Gruplar', href: '#target-groups' },
        { id: 'investment-advisors', title: 'Yatırımcı Danışmanları', href: '#investment-advisors' },
        { id: 'corporate-projects', title: 'Kurumsal Projeler', href: '#corporate-projects' },
        { id: 'engineering-offices', title: 'Mühendislik Ofisleri', href: '#engineering-offices' }
      ]
    }
  ];

  const contentData = {
    'project-consulting': {
      title: 'Proje Danışmanlığı Hizmeti',
      subtitle: 'Help Center / Danışmanlık',
      description: 'Kullanıcının AI çıktısından daha fazlasına ihtiyacı varsa, tecrübeli mühendisler tarafından birebir proje danışmanlığı sunulur. 20+ yıl deneyimli uzman ekibimizle sera yatırımınızı en verimli şekilde planlayın.',
      steps: [
        {
          title: '1. Ön Görüşme',
          items: [
            'Zoom/telefon ile proje ihtiyacı belirlenir',
            'Lokasyon değerlendirmesi yapılır',
            'Hedef ve beklentiler netleştirilir',
            'Proje kapsamı ve sınırları çizilir'
          ]
        },
        {
          title: '2. Veri Analizi',
          items: [
            'Kullanıcının sunduğu veriler manuel olarak değerlendirilir',
            'İklim verileri detaylı analiz edilir',
            'Toprak ve saha koşulları incelenir',
            'Pazar araştırması ve karlılık analizi yapılır'
          ]
        },
        {
          title: '3. Özel Rapor',
          items: [
            'Kullanıcıya özel oluşturulmuş PDF raporlar',
            'Teknik çizimler ve 3D görselleştirmeler',
            'Alternatif çözüm senaryoları sunumu',
            'Maliyet analizi ve ROI hesaplamaları'
          ]
        },
        {
          title: '4. Soru-Cevap Desteği',
          items: [
            'Belirli bir süre (7 gün) teknik soru-cevap desteği',
            'E-posta ve telefon üzerinden danışmanlık',
            'Rapor detaylarının açıklanması',
            'İlave sorular için uzman görüşü'
          ]
        },
        {
          title: '5. Uygulama Yönlendirmesi',
          items: [
            'Kurulum sürecinde yönlendirme',
            'Altyapı hazırlıkları konusunda rehberlik',
            'Satın alma süreçlerinde destek',
            'Tedarikçi önerileri ve değerlendirme'
          ]
        }
      ]
    },
    'preliminary-meeting': {
      title: 'Ön Görüşme Süreci',
      subtitle: 'Help Center / Danışmanlık',
      description: 'Proje danışmanlığının ilk adımı olan ön görüşmede, uzman mühendislerimiz projenizin ihtiyaçlarını detaylı şekilde analiz eder.',
      steps: [
        {
          title: 'Görüşme Hazırlığı',
          items: [
            'Ön bilgi formunun doldurulması',
            'Saha fotoğrafları ve dokümanların hazırlanması',
            'Bütçe ve zaman planının belirlenmesi',
            'Hedef ürün ve kapasitesinin netleştirilmesi'
          ]
        },
        {
          title: 'Görüşme İçeriği',
          items: [
            'Proje hedeflerinin detaylı analizi',
            'Saha koşullarının değerlendirilmesi',
            'Teknik gereksinimlerin belirlenmesi',
            'İlk önerilerin sunulması'
          ]
        }
      ]
    },
    'pricing-plans': {
      title: 'Fiyatlandırma Planları',
      subtitle: 'Help Center / Danışmanlık',
      description: 'Proje danışmanlığı hizmetlerimiz için esnek fiyatlandırma seçenekleri sunuyoruz. İhtiyacınıza uygun paketi seçebilirsiniz.',
      steps: [
        {
          title: 'Starter Danışmanlık - 11.950₺',
          items: [
            'Temel proje değerlendirmesi',
            '1 saatlik detaylı görüşme',
            'Basit fizibilite raporu',
            '3 gün soru-cevap desteği'
          ]
        },
        {
          title: 'Proje Raporlama + Görüşme Paketi - 44.900₺',
          items: [
            'Kapsamlı proje analizi ve raporlama',
            'Detaylı teknik çizimler',
            'Alternatif çözüm senaryoları',
            '7 gün soru-cevap desteği',
            'Uygulama sürecinde yönlendirme'
          ]
        },
        {
          title: 'Kurumsal Proje Danışmanlığı - Teklif Usulü',
          items: [
            'Büyük ölçekli projeler için özel fiyatlandırma',
            'Uzun vadeli danışmanlık anlaşmaları',
            'Saha ziyaretleri dahil',
            'Sürekli teknik destek'
          ]
        }
      ]
    },
    'target-groups': {
      title: 'Hedef Kitle',
      subtitle: 'Help Center / Danışmanlık',
      description: 'Proje danışmanlığı hizmetimiz, sera yatırımı konusunda profesyonel destek ihtiyacı olan farklı grupları hedeflemektedir.',
      steps: [
        {
          title: 'Yatırımcı Danışmanları',
          items: [
            'Sera yatırımı planlayan danışmanlık firmaları',
            'Portföy yöneticileri',
            'Yatırım bankalarının tarım departmanları',
            'Özel sektör yatırım uzmanları'
          ]
        },
        {
          title: 'Kurumsal Projeler',
          items: [
            'Büyük ölçekli gıda üretim şirketleri',
            'Devlet destekli tarım projeleri',
            'Uluslararası kalkınma projeleri',
            'Holding şirketlerinin tarım kolları'
          ]
        },
        {
          title: 'Ziraat Mühendisliği Ofisleri',
          items: [
            'Serbest mühendislik büroları',
            'Tarımsal proje geliştirme şirketleri',
            'Teknik danışmanlık firmaları',
            'Sera teknolojileri uzmanları'
          ]
        },
        {
          title: 'Girişimciler',
          items: [
            'Sera altyapısı kurmak isteyen küçük ölçekli girişimciler',
            'Orta ölçekli tarım işletmeleri',
            'Aile işletmeleri',
            'Yeni nesil çiftçiler'
          ]
        }
      ]
    }
  };

  const currentContent = contentData[activeSection as keyof typeof contentData] || contentData['project-consulting'];

  return (
    <div className="min-h-screen bg-[#f6f8f9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                  alt="SeraGPT Logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/destek" className="text-gray-600 hover:text-[#1e3237] font-medium">
                Destek
              </Link>
              <Link href="/danismanlik" className="text-gray-600 hover:text-[#1e3237] font-medium">
                Danışmanlık
              </Link>
              <Link href="/anahtar-teslim-proje" className="text-gray-600 hover:text-[#1e3237] font-medium">
                Anahtar Teslim Sera
              </Link>
              <Link href="/auth/login" className="text-gray-600 hover:text-[#1e3237] font-medium">
                Giriş Yap
              </Link>
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
                <Link
                  href="/destek"
                  className="block text-gray-700 hover:text-[#1e3237] hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">❓</span>
                    <span className="text-base font-medium">Destek</span>
                  </div>
                </Link>
                <Link
                  href="/danismanlik"
                  className="block text-gray-700 hover:text-[#1e3237] hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🎯</span>
                    <span className="text-base font-medium">Danışmanlık</span>
                  </div>
                </Link>
                <Link
                  href="/anahtar-teslim-proje"
                  className="block text-gray-700 hover:text-[#1e3237] hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🏗️</span>
                    <span className="text-base font-medium">Anahtar Teslim Sera</span>
                  </div>
                </Link>
                <Link
                  href="/blog"
                  className="block text-gray-700 hover:text-[#1e3237] hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">📖</span>
                    <span className="text-base font-medium">Blog</span>
                  </div>
                </Link>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-4 rounded-xl font-medium transition-all hover:from-gray-800 hover:to-gray-900 shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg mr-2">🔐</span>
                  <span>Panele Giriş</span>
                </Link>
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
                            ? 'bg-blue-100 text-blue-900 font-medium'
                            : 'text-gray-600 hover:text-[#1e3237] hover:bg-gray-50'
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
                  className="w-full bg-[#baf200] hover:bg-[#baf200]/90 text-[#1e3237] py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <span className="text-lg">🎯</span>
                  <span>Danışmanlık Talep Et</span>
                </motion.button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Uzman danışmanlarımızla iletişime geçin
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
                    <h2 className="text-xl font-semibold text-[#1e3237] mb-4">
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
                <h3 className="font-semibold text-[#1e3237] mb-4">Sonraki Adımlar</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    • Size uygun danışmanlık paketini seçin
                  </p>
                  <p className="text-gray-700">
                    • Ön görüşme için randevu alın
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

      {/* Footer */}
      <Footer />

      {/* Consulting Request Modal */}
      <ConsultingRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
