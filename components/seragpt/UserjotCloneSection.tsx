'use client';

import { useState } from 'react';
import Image from 'next/image';
import BlogCardsSection from './BlogCardsSection';
import Footer from '../Footer';
import { useAuth } from '../../lib/hooks/useAuth';

export default function UserjotCloneSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null); // No FAQ open by default
  const { user, loading } = useAuth();

  return (
    <div className="page-container">
      {/* Header - Clean layout */}
      <header className="header">
        <div className="header-footer-container">
          {/* Logo - clickable to homepage */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359"
                alt="SeraGPT Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </a>
          </div>

          {/* Center navigation - 3 links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/danismanlik" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Danışmanlık
            </a>
            <a href="/anahtar-teslim-proje" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Anahtar Teslim Proje
            </a>
            <a href="/destek" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Destek
            </a>
          </nav>

          {/* Right menu - conditional based on user state */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  // For logged in users - show Dashboard
                  <a href="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                    Dashboard
                  </a>
                ) : (
                  // For logged out users - show Login or Sign Up CTA
                  <>
                    <a href="/auth/login" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                      Giriş Yap
                    </a>
                    <a href="/auth/login" className="bg-gray-600 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors">
                      Ücretsiz Başla
                    </a>
                  </>
                )}
              </>
            )}
          </div>

          {/* Modern mobile menu button */}
          <button
            className="md:hidden relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div
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
            </div>
          </button>
        </div>

        {/* Modern Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-50">
            <div className="max-w-md mx-auto p-6 space-y-6">
              {/* Header */}
              <div className="text-center border-b border-gray-100 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">Menü</h3>
              </div>

              {/* Navigation Links */}
              <div className="space-y-3">
                <a
                  href="/destek"
                  className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">❓</span>
                    <span className="text-base font-medium">Destek</span>
                  </div>
                </a>
                <a
                  href="/danismanlik"
                  className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🎯</span>
                    <span className="text-base font-medium">Danışmanlık</span>
                  </div>
                </a>
                <a
                  href="/anahtar-teslim-proje"
                  className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🏗️</span>
                    <span className="text-base font-medium">Anahtar Teslim Sera</span>
                  </div>
                </a>
                <a
                  href="/blog"
                  className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">📖</span>
                    <span className="text-base font-medium">Blog</span>
                  </div>
                </a>
              </div>

              {/* Panel Access Button */}
              <div className="border-t border-gray-100 pt-4">
                {!loading && (
                  <>
                    {user ? (
                      <a
                        href="/dashboard"
                        className="flex items-center justify-center w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-4 rounded-xl font-medium transition-all hover:from-gray-800 hover:to-gray-900 shadow-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-lg mr-2">📊</span>
                        <span>Panelime Git</span>
                      </a>
                    ) : (
                      <div className="space-y-3">
                        <a
                          href="/auth/login"
                          className="flex items-center justify-center w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-4 rounded-xl font-medium transition-all hover:from-gray-800 hover:to-gray-900 shadow-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="text-lg mr-2">🔐</span>
                          <span>Panele Giriş</span>
                        </a>
                        <div className="flex space-x-2">
                          <a
                            href="/auth/login"
                            className="flex-1 text-center border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Giriş Yap
                          </a>
                          <a
                            href="/auth/login"
                            className="flex-1 text-center bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Kayıt Ol
                          </a>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content - Mobile-Optimized Hero Section */}
      <main className="hero-section">
        <div className="hero-content px-4 md:px-0">
          {/* Small text above headline - Mobile responsive */}
          <p className="hero-subtitle text-xs sm:text-sm">
            +20 YIL, +500 PROJE, +110 VERİ SETİ
          </p>

          {/* Main headline - Mobile responsive typography */}
          <h1 className="hero-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="block">60 Saniyede</span>
            <span className="block" style={{ color: 'rgba(23, 23, 23, 1)' }}>Sera Yatırım Raporun Hazır!</span>
          </h1>

          {/* Description paragraph - Mobile responsive */}
          <p className="hero-description text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            SeraGPT; 20 yılı aşkın mühendislik deneyimi, 500'den fazla
            tamamlanmış proje ve 110'dan fazla gerçek zamanlı veri
            setiyle, tarımsal yatırım kararlarınızı saniyeler içinde
            analiz eder.
          </p>

          {/* CTA Button - Mobile optimized */}
          <a href="/auth/login" className="btn btn-primary mb-4 w-full sm:w-auto max-w-sm mx-auto block text-center">
            <span className="hidden sm:inline">Şimdi Oluştur – İlk 5 Rapor Ücretsiz</span>
            <span className="sm:hidden">🚀 Ücretsiz Başla</span>
          </a>

          {/* Small text under button */}
          <p className="text-small text-center text-xs sm:text-sm">
            Doğru yatırım, doğru analizle başlar.
          </p>
        </div>
      </main>

      {/* User Panel Section - Single View */}
      <div className="section relative z-10">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="relative">
            <div className="rounded-2xl p-8 shadow-lg shadow-purple-400/20 hover:shadow-purple-500/30 transition-all duration-300 bg-center bg-cover bg-no-repeat border-4 border-purple-400" style={{ color: '#cdd6fd' }}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Dashboard Image - Mobile Responsive */}
                <div
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-center bg-cover bg-no-repeat flex items-center justify-center rounded-t-xl"
                  style={{
                    backgroundImage: "url(https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F1cd1d24d2413420fa7c24610e14c9006)"
                  }}
                >
                  <div className="text-center p-4">
                    <div className="bg-black bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
                      <p className="text-white text-xs sm:text-sm font-medium">📊 Analiz Paneli Önizleme</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button className="btn btn-primary mb-4">
              Kullanıcı Paneline Giriş Yapın
            </button>
            <p className="text-small text-center">
              Tüm sera projelerinizi tek platformdan yönetin
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="section" style={{ background: '#f9fafb' }}>
        <div className="body-container">
          <div className="text-center mb-8">
            <div className="text-container">
              <h2 className="heading-2 text-center">
                Panelde Sizi Bekleyen Analiz T��rleri ve Özellikleri
              </h2>
            </div>
          </div>

          {/* Mobile-Responsive Cards Grid */}
          <div className="relative">
            {/* Mobile: Vertical stack, Tablet+: Horizontal scroll */}
            <div className="md:flex md:overflow-x-auto md:scrollbar-hide md:space-x-6 md:pb-6 space-y-6 md:space-y-0">
              {/* Card 1 - ROI Simülasyonu */}
              <div
                className="md:flex-shrink-0 w-full md:w-80 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 relative shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute top-4 md:top-6 left-4 md:left-6 text-4xl md:text-6xl font-bold text-gray-100">01</div>
                <div className="mt-12 md:mt-16">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-tight">
                    <span className="block sm:hidden">ROI Simülasyonu</span>
                    <span className="hidden sm:block">Yatırım Geri Dönüş (ROI) Simülasyonu</span>
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs sm:text-sm font-semibold mb-2">🎯 Temel Faydalar:</p>
                      <div className="space-y-1">
                        <p className="text-gray-600 text-xs sm:text-sm flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span>Yatırımın geri dönüş süresi</span>
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span>Kar marjı ve yıllık getiri tahmini</span>
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span>İşletme maliyetleri kıyaslaması</span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• OpenWeather, FAO & TÜ���K</p>
                      <p className="text-gray-600 text-xs">• Seraburada / e-Tarım API</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">👤 Kullanıcı Girdisi:</p>
                      <p className="text-gray-600 text-xs">• Lokasyon, bitki türü, üretim hedefi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">📄 PDF İçeriği:</p>
                      <p className="text-gray-600 text-xs">• ROI tablosu ve 3 yıllık projeksiyonu</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-blue-100">
                    <p className="text-gray-700 text-sm font-medium mb-2">"Yatırımınız size ne zaman geri döner?"</p>
                    <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                      <span className="sm:hidden">📄 Örnek PDF</span>
                      <span className="hidden sm:inline">📄 PDF'yi Örnekle Gör</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2 - İklim Analizi */}
              <div
                className="md:flex-shrink-0 w-full md:w-80 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 relative shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute top-4 md:top-6 left-4 md:left-6 text-4xl md:text-6xl font-bold text-gray-100">02</div>
                <div className="mt-12 md:mt-16">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-tight">
                    <span className="block sm:hidden">İklim & Risk Analizi</span>
                    <span className="hidden sm:block">İklim Uyumu & Risk Analizi</span>
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🎯 3 Önemli Fayda:</p>
                      <p className="text-gray-600 text-xs">• Seçilen ürün için uygunluk skoru</p>
                      <p className="text-gray-600 text-xs">• Don, rüzgar, nem riskleri</p>
                      <p className="text-gray-600 text-xs">• Geçmiş yıllardaki iklim olayları</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• Open-Meteo, Copernicus Climate</p>
                      <p className="text-gray-600 text-xs">• ERA5 verileri, MGMT</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">👤 Kullanıcı Girdisi:</p>
                      <p className="text-gray-600 text-xs">• İl/ilçe, bitki türü, sera tipi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">📄 PDF İçeriği:</p>
                      <p className="text-gray-600 text-xs">• Uygunluk skoru ve risk matrisi</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"İklim bu yatırıma uygun mu?"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[İklim Skorunu G��r]</button>
                  </div>
                </div>
              </div>

              {/* Card 3 - Ekipman Listesi */}
              <div
                className="md:flex-shrink-0 w-full md:w-80 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 relative shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute top-4 md:top-6 left-4 md:left-6 text-4xl md:text-6xl font-bold text-gray-100">03</div>
                <div className="mt-12 md:mt-16">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-tight">
                    <span className="block sm:hidden">Ekipman Listesi</span>
                    <span className="hidden sm:block">Mühendis Onaylı Ekipman Listesi</span>
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs sm:text-sm font-semibold mb-2">🏗️ Temel Faydalar:</p>
                      <div className="space-y-1">
                        <p className="text-gray-600 text-xs sm:text-sm flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span>Bölgeye uygun yapı ve iklimlendirme</span>
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span>Anahtar teslim modüler öneriler</span>
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span>Genişletilebilirlik alternatifleri</span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• Internal equipment DB</p>
                      <p className="text-gray-600 text-xs">• Mühendis do��rulama kütüphanesi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">👤 Kullanıcı Girdisi:</p>
                      <p className="text-gray-600 text-xs">• Sera büyüklüğü, yapı tipi, enerji</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">📄 PDF İçeriği:</p>
                      <p className="text-gray-600 text-xs">• Modüler ekipman ve maliyet listesi</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-blue-100">
                    <p className="text-gray-700 text-sm font-medium mb-2">"Mühendislerin önerdiği en doğru sistem"</p>
                    <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                      <span className="sm:hidden">📄 Ekipman PDF</span>
                      <span className="hidden sm:inline">📄 Ekipman Listesine Bak</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 4 - Pazar Verisi */}
              <div
                className="md:flex-shrink-0 w-full md:w-80 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 relative shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute top-4 md:top-6 left-4 md:left-6 text-4xl md:text-6xl font-bold text-gray-100">04</div>
                <div className="mt-12 md:mt-16">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-tight">
                    <span className="block sm:hidden">Pazar & Tarım Verisi</span>
                    <span className="hidden sm:block">Pazar ve Tarım Verisi Entegrasyonu</span>
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🎯 3 Önemli Fayda:</p>
                      <p className="text-gray-600 text-xs">• Bitki türüne göre pazar fiyat analizi</p>
                      <p className="text-gray-600 text-xs">• Bölgeye göre verim ortalamaları</p>
                      <p className="text-gray-600 text-xs">• Hasat-zamanlama optimizasyonu</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• TUİK, FAO, Türkiye Hal Fiyatları</p>
                      <p className="text-gray-600 text-xs">• TMO & Ziraat Odası verileri</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">👤 Kullanıcı Girdisi:</p>
                      <p className="text-gray-600 text-xs">• Bitki türü, sezon, pazarlama hedefi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">📄 PDF İçeriği:</p>
                      <p className="text-gray-600 text-xs">• Fiyat analizi ve hasat çizelgesi</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"Pazarlar ne diyor? Bitkiniz değerli mi?"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[Verileri Göster]</button>
                  </div>
                </div>
              </div>

              {/* Card 5 - Teknik Plan */}
              <div
                className="md:flex-shrink-0 w-full md:w-80 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 relative shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute top-4 md:top-6 left-4 md:left-6 text-4xl md:text-6xl font-bold text-gray-100">05</div>
                <div className="mt-12 md:mt-16">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-tight">
                    <span className="block sm:hidden">Teknik Plan Görselleştirmesi</span>
                    <span className="hidden sm:block">Yerleşim ve Teknik Plan Görselleştirmesi</span>
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🎯 3 Önemli Fayda:</p>
                      <p className="text-gray-600 text-xs">• Sera yerleşim planı (2D çizim)</p>
                      <p className="text-gray-600 text-xs">• Elektrik ve sulama hat planı</p>
                      <p className="text-gray-600 text-xs">• Teknik kabin, depo gösterimi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">��� Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• Planner 2D, CAD AI Tools</p>
                      <p className="text-gray-600 text-xs">• HerbaTools yerleşim kütüphanesi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">👤 Kullanıcı Girdisi:</p>
                      <p className="text-gray-600 text-xs">• Parsel ölçüleri, teknik bölmeler</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">📄 PDF İçeriği:</p>
                      <p className="text-gray-600 text-xs">• Teknik çizim ve montaj önerileri</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"2D/3D Yerleşim Planı Hazır!"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[Planı ��nizle]</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-end mt-6 space-x-2">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="section">
        <div className="text-container">

          {/* AI Chat Flow - Same style as User Panel */}
          <div className="visual-container">
            <div className="rounded-2xl p-8 shadow-lg shadow-purple-400/20 hover:shadow-purple-500/30 transition-all duration-300 bg-center bg-cover bg-no-repeat border-4 border-purple-400">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Chat Interface Preview - Same image as user panel */}
                <div
                  className="w-full h-96 bg-center bg-cover bg-no-repeat flex items-center justify-center"
                  style={{
                    backgroundImage: "url(https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F1cd1d24d2413420fa7c24610e14c9006)"
                  }}
                >
                  <div className="text-center">
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button className="btn btn-primary mb-4">
              AI Asistan Özelliği
            </button>
            <p className="text-small text-center">
              Raporlarınız üzerinden asistanınızla sohbet edin. Adil kullanım kotası ile birlikte ücretsizdir.
            </p>
          </div>
        </div>
      </div>

      {/* References Section */}
      <div className="section" style={{ background: '#f9fafb' }}>
        <div className="body-container">
          <div className="text-center mb-16">
            <div className="text-container">
              <h2 className="heading-2 text-center">
                Referanslar
              </h2>
              <p className="text-body text-center">
                Ç��züm ortaklarımız ile hayata geçirilen sera projelerimiz
              </p>
            </div>
          </div>

          {/* Horizontal Scrolling Gallery */}
          <div className="relative mb-12 visual-section-container">
            <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-6">
              {/* Gallery Image 1 */}
              <div

                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-700 font-medium">Modern Sera Kompleksi</p>
                    <p className="text-gray-500 text-sm">Antalya, 5.000 m²</p>
                  </div>
                </div>
              </div>

              {/* Gallery Image 2 */}
              <div

                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-700 font-medium">Domates Üretim Serası</p>
                    <p className="text-gray-500 text-sm">Mersin, 3.200 m²</p>
                  </div>
                </div>
              </div>

              {/* Gallery Image 3 */}
              <div

                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-700 font-medium">Hidroponik Sera Sistemi</p>
                    <p className="text-gray-500 text-sm">İzmir, 2.800 m²</p>
                  </div>
                </div>
              </div>

              {/* Gallery Image 4 */}
              <div

                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-700 font-medium">Fide Üretim Tesisi</p>
                    <p className="text-gray-500 text-sm">Bursa, 4.500 m²</p>
                  </div>
                </div>
              </div>

              {/* Gallery Image 5 */}
              <div
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌡️</div>
                    <p className="text-gray-700 font-medium">İklim Kontrollü Sera</p>
                    <p className="text-gray-500 text-sm">Konya, 6.000 m²</p>
                  </div>
                </div>
              </div>

              {/* Gallery Image 6 */}
              <div
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🥒</div>
                    <p className="text-gray-700 font-medium">Salatalık Üretim Serası</p>
                    <p className="text-gray-500 text-sm">Muğla, 2.100 m²</p>
                  </div>
                </div>
              </div>

              {/* Gallery Image 7 */}
              <div
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌹</div>
                    <p className="text-gray-700 font-medium">Çiçek Üretim Serası</p>
                    <p className="text-gray-500 text-sm">Isparta, 1.800 m²</p>
                  </div>
                </div>
              </div>

              {/* Gallery Image 8 */}
              <div
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🥬</div>
                    <p className="text-gray-700 font-medium">Organik Sebze Serası</p>
                    <p className="text-gray-500 text-sm">Çanakkale, 3.700 m²</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* CTA Button */}
          <div

            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pb-11">
              <button
  
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors shadow-md hover:shadow-lg mt-6"
              >
                Anahtar Teslim Fiyat Alın
              </button>
              <button
  
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors shadow-md hover:shadow-lg mt-6"
              >
                Kurumsal Danışmanlık Hizmeti
              </button>
            </div>
            <p className="text-small text-center">
              Uzman ekibimiz size özel teklifini hazırlayacak
            </p>
          </div>
        </div>
      </div>

      {/* Blog Cards Section */}
      <BlogCardsSection />

      {/* FAQ Section */}
      <div className="section">
        <div className="text-container">
          <div className="text-center mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Sıkça Sorulan Sorular (SSS)
            </h2>
          </div>

          <div className="space-y-2" style={{ fontSize: '16px', lineHeight: '24px', backgroundColor: 'rgba(245, 245, 245, 1)' }}>
            {[
              {
                question: "Raporlar ne kadar doğru?",
                answer: "SeraGPT, gerçek zamanlı iklim, tarım ve ticaret verilerini kullanır. Raporlar, uzman mühendislerin geliştirdiği algoritmalarla analiz edilir ve %90 üzeri doğruluk oranı sunar."
              },
              {
                question: "Devlet teşviklerine uygun mu?",
                answer: "Evet. Raporlar TKDK, IPARD ve Ziraat Bankası destek başvurularında ön fizibilite dosyası olarak kullanılabilir. Talep halinde ek m��hendis onayı alınabilir."
              },
              {
                question: "Mühendis desteği sunuyor musunuz?",
                answer: "Evet. Profesyonel kullanıcılar için mühendis danışmanlık hizmeti sağlıyoruz. Size en yakın uzmanla eşleştirilerek birebir destek sunulur."
              },
              {
                question: "Bilgilerim güvende mi?",
                answer: "Kesinlikle. Tüm bilgileriniz Supabase veritabanında şifreli olarak saklanır. Raporlar yalnızca size özeldir, üçüncü taraflarla paylaşılmaz."
              },
              {
                question: "Ödeme nasıl yapılıyor?",
                answer: "İlk 5 rapor ücretsizdir. Sonrasında, kredi kartı veya havale/EFT ile jeton (token) satın alabilirsiniz. Ödeme altyapısı %100 güvenlidir."
              }
            ].map((faq, index) => (
              <div
                key={index}

                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full p-6 text-left hover:bg-gray-100 transition-colors group"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-medium text-gray-900 group-hover:text-gray-700 pr-4">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform flex-shrink-0 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 text-sm md:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Support Link */}
          <div className="text-center mt-12">
            <p className="text-body text-center mb-4">
              Sorunuza cevap bulamadınız mı?
            </p>
            <a
              href="/destek"
              className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
            >
              <span>Destek Sayfamıza Gidin</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
