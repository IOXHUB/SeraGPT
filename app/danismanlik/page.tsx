'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header - matching homepage */}
      <header className="py-4" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                  alt="SeraGPT Logo"
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/danismanlik"
                className="font-medium transition-opacity hover:opacity-70"
                style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
              >
                Danışmanlık
              </Link>
              <Link
                href="/anahtar-teslim-proje"
                className="font-medium transition-opacity hover:opacity-70"
                style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
              >
                Anahtar Teslim Proje
              </Link>
              <Link
                href="/destek"
                className="font-medium transition-opacity hover:opacity-70"
                style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
              >
                Destek
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <Link
                href="/auth/login"
                className="px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#baf200',
                  color: '#1e3237',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Ücretsiz Başla
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Background */}
      <div style={{ backgroundColor: '#f6f8f9', minHeight: '100vh' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                {sidebarSections.map((section) => (
                  <div key={section.id} className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg">{section.icon}</span>
                      <h3 className="font-semibold" style={{ color: '#1e3237' }}>{section.title}</h3>
                    </div>
                    <div className="space-y-1 ml-6">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            activeSection === item.id
                              ? 'text-white font-medium'
                              : 'hover:bg-gray-50'
                          }`}
                          style={{
                            backgroundColor: activeSection === item.id ? '#146448' : 'transparent',
                            color: activeSection === item.id ? '#ffffff' : '#1e3237'
                          }}
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
                    className="w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
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
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-6">
                  {currentContent.subtitle}
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-6" style={{ color: '#1e3237' }}>
                  {currentContent.title}
                </h1>

                {/* Description */}
                <p className="text-lg mb-8 leading-relaxed opacity-80" style={{ color: '#1e3237' }}>
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
                      className="border-l-4 pl-6"
                      style={{ borderColor: '#146448' }}
                    >
                      <h2 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>
                        {step.title}
                      </h2>
                      <div className="space-y-2">
                        {step.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start space-x-3">
                            <div 
                              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                              style={{ backgroundColor: '#baf200' }}
                            >
                              <span className="text-xs font-medium" style={{ color: '#1e3237' }}>
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
                <div className="mt-12 p-6 rounded-lg" style={{ backgroundColor: '#f6f8f9' }}>
                  <h3 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Sonraki Adımlar</h3>
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
      </div>

      {/* Footer - matching homepage */}
      <footer className="py-12" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div>
              <div className="mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                  alt="SeraGPT Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p 
                className="leading-relaxed"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                AI destekli sera analiz platformu. Doğru yatırım, doğru analizle başlar.
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 
                className="mb-4"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                Hizmetler
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/auth/login" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    Ücretsiz Analiz Başlat
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/danismanlik" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    Danışmanlık AL
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/anahtar-teslim-proje" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    Anahtar Teslim Sera Teklifi İste
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 
                className="mb-4"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                Destek
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/auth/login" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    Kullanıcı Paneli Giriş
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/destek" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    Destek Kaydı Aç
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/privacy" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/terms" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    Kullanım Koşulları
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 
                className="mb-4"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                İletişim
              </h3>
              <div className="space-y-2">
                <p 
                  style={{ 
                    color: '#f6f8f9', 
                    fontSize: '14px', 
                    fontWeight: '400' 
                  }}
                >
                  info@seragpt.com
                </p>
                <p 
                  style={{ 
                    color: '#f6f8f9', 
                    fontSize: '14px', 
                    fontWeight: '400' 
                  }}
                >
                  0850 303 0 GPT
                </p>
                <p 
                  style={{ 
                    color: '#f6f8f9', 
                    fontSize: '14px', 
                    fontWeight: '400' 
                  }}
                >
                  Türkiye
                </p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p 
              style={{ 
                color: '#f6f8f9', 
                fontSize: '14px', 
                fontWeight: '400' 
              }}
            >
              �� 2025 SeraGPT. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>

      {/* Consulting Request Modal */}
      <ConsultingRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
