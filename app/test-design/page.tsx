'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestDesignPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header */}
      <header className="relative py-4" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            className="rounded-2xl p-4 shadow-lg"
            style={{ backgroundColor: '#146448' }}
          >
            <div className="flex justify-center text-left">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl"
                  style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                >
                  🌱
                </div>
                <div>
                  <h1 
                    className="text-2xl font-bold"
                    style={{ color: '#1e3237', fontSize: '24px', fontWeight: '600' }}
                  >
                    SeraGPT
                  </h1>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link 
                  href="/danismanlik" 
                  className="font-normal transition-opacity hover:opacity-70"
                  style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                >
                  Danışmanlık
                </Link>
                <Link 
                  href="/anahtar-teslim-proje" 
                  className="font-normal transition-opacity hover:opacity-70"
                  style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                >
                  Anahtar Teslim
                </Link>
                <Link 
                  href="/destek" 
                  className="font-normal transition-opacity hover:opacity-70"
                  style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                >
                  Destek
                </Link>
              </nav>

              {/* CTA Button */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90 shadow-md"
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

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#146448' }}
              >
                <svg className="w-5 h-5" style={{ color: '#f6f8f9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 px-4 sm:px-6 z-50">
            <div className="max-w-[1200px] mx-auto">
              <div
                className="rounded-2xl p-6 shadow-lg"
                style={{ backgroundColor: '#146448' }}
              >
                <div className="space-y-4">
                  <Link 
                    href="/danismanlik" 
                    className="block py-2 transition-opacity hover:opacity-70"
                    style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                  >
                    Danışmanlık
                  </Link>
                  <Link 
                    href="/anahtar-teslim-proje" 
                    className="block py-2 transition-opacity hover:opacity-70"
                    style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                  >
                    Anahtar Teslim Proje
                  </Link>
                  <Link 
                    href="/destek" 
                    className="block py-2 transition-opacity hover:opacity-70"
                    style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                  >
                    Destek
                  </Link>
                  <Link
                    href="/auth/login"
                    className="block text-center px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90 shadow-md mt-4"
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
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Text Content - 576px max width */}
            <div className="max-w-[576px] text-center">
              <div
                className="rounded-2xl p-8 shadow-lg"
                style={{ backgroundColor: '#146448' }}
              >
                <h1 
                  className="leading-tight mb-6"
                  style={{ 
                    color: '#1e3237', 
                    fontSize: '36px', 
                    fontWeight: '600' 
                  }}
                >
                  60 Saniyede Sera Yatırım Raporunuz Hazır!
                </h1>
                
                <p 
                  className="leading-relaxed mb-8"
                  style={{ 
                    color: '#1e3237', 
                    fontSize: '14px', 
                    fontWeight: '400' 
                  }}
                >
                  SeraGPT; 20 yılı aşkın mühendislik deneyimi, 500'den fazla tamamlanmış proje ve 110'dan fazla gerçek zamanlı veri setiyle, tarımsal yatırım kararlarınızı saniyeler içinde analiz eder.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#baf200' }}
                    ></div>
                    <span 
                      style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                    >
                      +20 Yıl Mühendislik Deneyimi
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#baf200' }}
                    ></div>
                    <span 
                      style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                    >
                      +500 Tamamlanmış Proje
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#baf200' }}
                    ></div>
                    <span 
                      style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                    >
                      +110 Gerçek Zamanlı Veri Seti
                    </span>
                  </div>
                </div>

                <Link
                  href="/auth/login"
                  className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 shadow-lg"
                  style={{ 
                    backgroundColor: '#baf200', 
                    color: '#1e3237', 
                    fontSize: '14px', 
                    fontWeight: '600' 
                  }}
                >
                  🚀 İlk 5 Rapor Ücretsiz - Hemen Başla
                </Link>
              </div>
            </div>

            {/* Visual Content - 800px max width */}
            <div className="max-w-[800px]">
              <div
                className="rounded-2xl p-8 shadow-lg"
                style={{ backgroundColor: '#146448' }}
              >
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F1cd1d24d2413420fa7c24610e14c9006"
                    alt="SeraGPT Dashboard Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p 
                    style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                  >
                    📊 Analiz Paneli Önizlemesi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2
              className="leading-tight"
              style={{
                color: '#1e3237',
                fontSize: '36px',
                fontWeight: '600'
              }}
            >
              Analiz Türleri ve Özellikleri
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 - ROI Analysis */}
            <div 
              className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl"
                style={{ backgroundColor: '#baf200' }}
              >
                📊
              </div>
              <h3 
                className="mb-3"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '20px', 
                  fontWeight: '600' 
                }}
              >
                ROI Simülasyonu
              </h3>
              <p 
                className="mb-4 leading-relaxed"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Yatırımın geri dönüş süresi, kar marjı ve yıllık getiri tahminleri ile kapsamlı finansal analiz.
              </p>
              <button
                className="px-4 py-2 rounded-lg transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#baf200', 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                Detayları Gör
              </button>
            </div>

            {/* Feature 2 - Climate Analysis */}
            <div 
              className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl"
                style={{ backgroundColor: '#baf200' }}
              >
                🌡️
              </div>
              <h3 
                className="mb-3"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '20px', 
                  fontWeight: '600' 
                }}
              >
                İklim Analizi
              </h3>
              <p 
                className="mb-4 leading-relaxed"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Bölgesel uygunluk skoru, don ve nem riskleri, geçmiş iklim verileri analizi.
              </p>
              <button
                className="px-4 py-2 rounded-lg transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#baf200', 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                Detayları Gör
              </button>
            </div>

            {/* Feature 3 - Equipment List */}
            <div 
              className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl"
                style={{ backgroundColor: '#baf200' }}
              >
                ⚙️
              </div>
              <h3 
                className="mb-3"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '20px', 
                  fontWeight: '600' 
                }}
              >
                Ekipman Listesi
              </h3>
              <p 
                className="mb-4 leading-relaxed"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Mühendis onaylı ekipman önerileri, bölgeye uygun yapı ve iklimlendirme sistemleri.
              </p>
              <button
                className="px-4 py-2 rounded-lg transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#baf200', 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                Detayları Gör
              </button>
            </div>

            {/* Feature 4 - Market Analysis */}
            <div 
              className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl"
                style={{ backgroundColor: '#baf200' }}
              >
                ��
              </div>
              <h3 
                className="mb-3"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '20px', 
                  fontWeight: '600' 
                }}
              >
                Pazar Analizi
              </h3>
              <p 
                className="mb-4 leading-relaxed"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Bitki türüne göre fiyat analizi, bölgesel verim ortalamaları ve hasat zamanlaması.
              </p>
              <button
                className="px-4 py-2 rounded-lg transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#baf200', 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                Detayları Gör
              </button>
            </div>

            {/* Feature 5 - Layout Planning */}
            <div 
              className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl"
                style={{ backgroundColor: '#baf200' }}
              >
                📐
              </div>
              <h3 
                className="mb-3"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '20px', 
                  fontWeight: '600' 
                }}
              >
                Teknik Plan
              </h3>
              <p 
                className="mb-4 leading-relaxed"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                2D/3D yerleşim planı, elektrik ve sulama hat planları, teknik kabin gösterimi.
              </p>
              <button
                className="px-4 py-2 rounded-lg transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#baf200', 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                Detayları Gör
              </button>
            </div>

            {/* Feature 6 - Support */}
            <div 
              className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl"
                style={{ backgroundColor: '#baf200' }}
              >
                🎧
              </div>
              <h3 
                className="mb-3"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '20px', 
                  fontWeight: '600' 
                }}
              >
                Uzman Desteği
              </h3>
              <p 
                className="mb-4 leading-relaxed"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Mühendis danışmanlığı, birebir destek ve profesyonel rehberlik hizmetleri.
              </p>
              <button
                className="px-4 py-2 rounded-lg transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#baf200', 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                Detayları Gör
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2
              className="leading-tight mb-6"
              style={{
                color: '#1e3237',
                fontSize: '26px',
                fontWeight: '400'
              }}
            >
              Hemen Başlayın
            </h2>

            <p
              className="leading-relaxed mb-8"
              style={{
                color: '#1e3237',
                fontSize: '14px',
                fontWeight: '400'
              }}
            >
              İlk 5 raporunuz ücretsiz! Sera yatırım kararlarınızı bilim ve deneyim ışığında verin.
            </p>

            <Link
              href="/auth/login"
              className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 shadow-lg"
              style={{
                backgroundColor: '#baf200',
                color: '#1e3237',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              🚀 Ücretsiz Hesap Oluştur
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            className="rounded-2xl p-8 shadow-lg"
            style={{ backgroundColor: '#146448' }}
          >
            <div className="grid md:grid-cols-4 gap-8">
              
              {/* Company Info */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    🌱
                  </div>
                  <span
                    className="font-bold"
                    style={{ color: '#1e3237', fontSize: '16px', fontWeight: '600' }}
                  >
                    SeraGPT
                  </span>
                </div>
                <p 
                  className="leading-relaxed"
                  style={{ 
                    color: '#1e3237', 
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
                    color: '#1e3237', 
                    fontSize: '16px', 
                    fontWeight: '600' 
                  }}
                >
                  Hizmetler
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/danismanlik" 
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                    >
                      Danışmanlık
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/anahtar-teslim-proje" 
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                    >
                      Anahtar Teslim Proje
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/destek" 
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                    >
                      Destek
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 
                  className="mb-4"
                  style={{ 
                    color: '#1e3237', 
                    fontSize: '16px', 
                    fontWeight: '600' 
                  }}
                >
                  Yasal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/privacy" 
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
                    >
                      Gizlilik Politikası
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/terms" 
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#1e3237', fontSize: '14px', fontWeight: '400' }}
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
                    color: '#1e3237', 
                    fontSize: '16px', 
                    fontWeight: '600' 
                  }}
                >
                  İletişim
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ 
                    color: '#1e3237', 
                    fontSize: '14px', 
                    fontWeight: '400' 
                  }}
                >
                  info@seragpt.com
                  <br />
                  www.seragpt.com
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-6 text-center">
              <p 
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                © 2025 SeraGPT. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
