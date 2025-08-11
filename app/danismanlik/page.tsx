'use client';

import { useState } from 'react';
import Link from 'next/link';
import ConsultingRequestModal from '../../components/ConsultingRequestModal';

export default function DanismanlikPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      {/* 📋 Proje Danışmanlık Hizmetimiz Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            {/* Main title */}
            <div className="max-w-[576px] mx-auto mb-16">
              <h2
                className="leading-tight text-center mb-12"
                style={{
                  color: '#f6f8f9',
                  fontSize: '36px',
                  fontWeight: '600'
                }}
              >
                Proje Danışmanlık Hizmetimiz
              </h2>
            </div>

            {/* Consultation Packages */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16 max-w-[1000px] mx-auto">
              {/* Package 1: Ön Fizibilite */}
              <div className="text-left">
                <div
                  className="bg-white/5 rounded-xl p-8 border-2"
                  style={{ borderColor: '#baf200' }}
                >
                  <h3
                    className="mb-6 text-center"
                    style={{
                      color: '#baf200',
                      fontSize: '24px',
                      fontWeight: '600'
                    }}
                  >
                    1. Ön Fizibilite Paketi
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Lokasyon, iklim ve ürün analizi
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Tahmini yatırım maliyeti
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Beklenen ROI (yatırım geri dönüş süresi)
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Uygun sera tipleri önerisi
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Devlet teşvik ve hibe uygunluğu değerlendirmesi
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '500' }}>
                        Teslim Süresi:
                      </span>
                      <span style={{ color: '#baf200', fontSize: '14px', fontWeight: '600' }}>
                        5 iş günü
                      </span>
                    </div>
                    <div className="mt-4">
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                        <strong style={{ color: '#baf200' }}>Amaç:</strong> Yatırımcıya "başlamaya değer mi?" sorusunun cevabını vermek
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package 2: Teknik Projelendirme */}
              <div className="text-left">
                <div
                  className="bg-white/5 rounded-xl p-8 border-2"
                  style={{ borderColor: '#baf200' }}
                >
                  <h3
                    className="mb-6 text-center"
                    style={{
                      color: '#baf200',
                      fontSize: '24px',
                      fontWeight: '600'
                    }}
                  >
                    2. Teknik Projelendirme Paketi
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Ön Fizibilite + detaylı teknik çizimler
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Ekipman listesi ve marka/model önerileri
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Isıtma, soğutma, sulama, otomasyon projeleri
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Enerji ve su tüketim hesapları
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Üretim kapasitesi planı
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '500' }}>
                        Teslim Süresi:
                      </span>
                      <span style={{ color: '#baf200', fontSize: '14px', fontWeight: '600' }}>
                        10–15 iş günü
                      </span>
                    </div>
                    <div className="mt-4">
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                        <strong style={{ color: '#baf200' }}>Amaç:</strong> Yatırımın tüm teknik altyapısını netleştirmek
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button - Updated to open modal */}
            <div className="mb-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="hero-cta-button inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-105 transform"
                style={{
                  backgroundColor: '#baf200',
                  color: '#1e3237',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                DANIŞMANLIK TALEBİ OLUŞTUR
              </button>
            </div>

            {/* Bottom note */}
            <p
              className="text-center"
              style={{
                color: '#f6f8f9',
                fontSize: '14px',
                fontWeight: '400'
              }}
            >
              Profesyonel danışmanlık ile doğru adımları atın.
            </p>
          </div>
        </div>
      </section>

      {/* 🎁 Referanslar Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto flex flex-col">
            <h2
              className="mx-auto mb-8"
              style={{
                color: '#f6f8f9',
                fontSize: '36px',
                fontWeight: '600'
              }}
            >
              Referanslarımız
            </h2>

            <div className="max-w-[576px] mx-auto mb-12">
              <p
                className="leading-relaxed text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '20px',
                  fontWeight: '400'
                }}
              >
                Fikir aşamasından projelendirmeye; Kurulum'dan üretim danışmanlığına kadar profesyonel hizmet
              </p>
            </div>

            {/* Image Gallery - 900px with horizontal scrolling */}
            <div className="max-w-[900px] mx-auto mb-8 relative">
              <div className="overflow-x-auto scrollbar-hide" id="gallery-container">
                <div className="flex space-x-4 pb-4" style={{ width: 'fit-content' }}>
                  <div className="flex-shrink-0 w-[580px] h-[300px] rounded-xl overflow-hidden">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F9d3332e2ad3c411884d29aa35f7a626d"
                      alt="Sera Projesi 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-shrink-0 w-[580px] h-[300px] rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">🌱</div>
                        <p className="text-lg font-semibold">Domates Serası</p>
                        <p className="text-sm opacity-90">Antalya - 5000m²</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-[580px] h-[300px] rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">🥒</div>
                        <p className="text-lg font-semibold">Salatalık Serası</p>
                        <p className="text-sm opacity-90">İzmir - 3000m²</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: '#baf200' }}
                onClick={() => {
                  const container = document.getElementById('gallery-container');
                  container?.scrollBy({ left: -300, behavior: 'smooth' });
                }}
              >
                <svg className="w-6 h-6" style={{ color: '#1e3237' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: '#baf200' }}
                onClick={() => {
                  const container = document.getElementById('gallery-container');
                  container?.scrollBy({ left: 300, behavior: 'smooth' });
                }}
              >
                <svg className="w-6 h-6" style={{ color: '#1e3237' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 mx-auto"
              style={{
                backgroundColor: '#baf200',
                color: '#1e3237',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Proje Danışmanlığı
            </button>
          </div>
        </div>
      </section>

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

      {/* Consulting Request Modal */}
      <ConsultingRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
