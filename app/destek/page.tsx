'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SupportTicketModal from '../../components/SupportTicketModal';

export default function DestekPage() {
  const [activeSection, setActiveSection] = useState('quick-start');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <Link
                href="/blog"
                className="font-medium transition-opacity hover:opacity-70"
                style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
              >
                Blog
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
                    <span className="text-lg">🎫</span>
                    <span>Destek Kaydı Aç</span>
                  </motion.button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Özel sorununuz için destek talebi oluşturun
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
                      • Hesabınızı özelleştirin ve farklı türde analizler deneyin
                    </p>
                    <p className="text-gray-700">
                      • Uzman danışmanlık hizmetlerimizden faydalanın
                    </p>
                    <p className="text-gray-700">
                      • Anahtar teslim sera projelerimizi keşfedin
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
              © 2025 SeraGPT. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>

      {/* Support Ticket Modal */}
      <SupportTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
