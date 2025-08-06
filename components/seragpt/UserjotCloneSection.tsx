'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import BlogCardsSection from './BlogCardsSection';
import Footer from '../Footer';
import { useAuth } from '../../lib/hooks/useAuth';

export default function UserjotCloneSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null); // No FAQ open by default
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Full width with 960px content container */}
      <header className="w-full bg-gray-50 relative">
        <div className="navbar-footer-container">
          {/* Logo - clickable to homepage */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                alt="SeraGPT Logo"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Center navigation - 3 links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Dan��şmanlık
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Anahtar Teslim Proje
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
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

          {/* Mobile menu button - hamburger icon */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Modern Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-50"
          >
            <div className="max-w-md mx-auto p-6 space-y-6">
              {/* Header */}
              <div className="text-center border-b border-gray-100 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">Menü</h3>
              </div>

              {/* Navigation Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Services Column */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Hizmetler</h4>
                  <a
                    href="#"
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🎯</span>
                      <span className="text-sm">Danışmanlık</span>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🏗️</span>
                      <span className="text-sm">Anahtar Teslim Sera</span>
                    </div>
                  </a>
                  <a
                    href="/dashboard/help"
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">❓</span>
                      <span className="text-sm">Destek</span>
                    </div>
                  </a>
                </div>

                {/* Resources Column */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Kaynaklar</h4>
                  <a
                    href="/blog"
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">📖</span>
                      <span className="text-sm">Blog</span>
                    </div>
                  </a>
                  <a
                    href="/blog/gizli-maliyetler-sera-yatirimi"
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">💰</span>
                      <span className="text-sm">Maliyet Rehberi</span>
                    </div>
                  </a>
                  <a
                    href="/blog/iklim-krizi-tarim"
                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🌡️</span>
                      <span className="text-sm">İklim Analizi</span>
                    </div>
                  </a>
                </div>
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
          </motion.div>
        )}
      </header>

      {/* Main content - Full viewport hero */}
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 -mt-16">
        <div className="text-section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            {/* Small text above headline */}
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              +20 YIL, +500 PROJE, +110 VERİ SETİ
            </p>

            {/* Main headline */}
            <h1 className="text-4xl font-bold text-gray-900 leading-tight space-y-2">
              <div className="text-gray-600">🚀 60 Saniyede</div>
              <div className="text-gray-600">Sera Yatırım Raporun Hazır!</div>
            </h1>

            {/* Description paragraph */}
            <p className="text-sm text-gray-600 leading-relaxed px-4 mt-5">
              SeraGPT; 20 yılı aşkın mühendislik deneyimi, 500'den fazla
              tamamlanmış proje ve 110'dan fazla gerçek zamanlı veri
              setiyle, tarımsal yatırım kararlarınızı saniyeler içinde
              analiz eder.
            </p>

            {/* CTA Button */}
            <div className="mt-5">
              <motion.a
                href="/auth/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors inline-flex items-center space-x-2"
              >
                <span className="text-center">Şimdi Oluştur – İlk 5 Rapor Ücretsiz</span>
              </motion.a>
            </div>

            {/* Small text under button */}
            <p className="text-gray-500 text-sm pb-10">
              Doğru yatırım, doğru analizle başlar.
            </p>
          </motion.div>
        </div>
      </main>

      {/* AI Chat Section - Single View */}
      <div className="relative -mt-40 z-10">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl p-8 shadow-lg shadow-purple-400/20 hover:shadow-purple-500/30 transition-all duration-300 bg-center bg-cover bg-no-repeat border-4 border-purple-400">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Dashboard Image */}
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
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Kullanıcı Paneline Giriş Yapın
            </motion.button>
            <p className="text-gray-500 text-sm mt-4">
              Tüm sera projelerinizi tek platformdan yönetin
            </p>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section - Horizontal Scrolling */}
      <div className="py-20 bg-gray-50 text-gray-600">
        <div className="page-section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Panelde Sizi Bekleyen Analiz Türleri ve ��zellikleri
            </h2>
          </motion.div>

          {/* Horizontal Scrolling Cards */}
          <div className="relative">
            <div className="flex overflow-x-auto scrollbar-hide space-x-6 pb-6">
              {/* Card 1 - ROI Simülasyonu */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 border border-gray-200 relative"
              >
                <div className="absolute top-6 left-6 text-6xl font-bold text-gray-100">01</div>
                <div className="mt-16">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Yatırım Geri Dönüş (ROI) Simülasyonu</h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🎯 3 Önemli Fayda:</p>
                      <p className="text-gray-600 text-xs">• Yatırımın geri dönüş süresi</p>
                      <p className="text-gray-600 text-xs">• Kar marjı ve yıllık getiri tahmini</p>
                      <p className="text-gray-600 text-xs">• İşletme maliyetleri kıyaslaması</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• OpenWeather, FAO & TÜİK</p>
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

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"Yatırımınız size ne zaman geri döner?"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[PDF'yi Örnekle Gör]</button>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - İklim Analizi */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 border border-gray-200 relative"
              >
                <div className="absolute top-6 left-6 text-6xl font-bold text-gray-100">02</div>
                <div className="mt-16">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">İklim Uyumu & Risk Analizi</h3>

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
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[İklim Skorunu Gör]</button>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - Ekipman Listesi */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 border border-gray-200 relative"
              >
                <div className="absolute top-6 left-6 text-6xl font-bold text-gray-100">03</div>
                <div className="mt-16">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Mühendis Onaylı Ekipman Listesi</h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🏗️ 3 Önemli Fayda:</p>
                      <p className="text-gray-600 text-xs">• Bölgeye uygun yapı ve iklimlendirme</p>
                      <p className="text-gray-600 text-xs">• Anahtar teslim modüler öneriler</p>
                      <p className="text-gray-600 text-xs">• Genişletilebilirlik alternatifleri</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• Internal equipment DB</p>
                      <p className="text-gray-600 text-xs">• Mühendis doğrulama kütüphanesi</p>
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

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"Mühendislerin önerdiği en doğru sistem"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[Ekipman Listesine Bak]</button>
                  </div>
                </div>
              </motion.div>

              {/* Card 4 - Pazar Verisi */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 border border-gray-200 relative"
              >
                <div className="absolute top-6 left-6 text-6xl font-bold text-gray-100">04</div>
                <div className="mt-16">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Pazar ve Tarım Verisi Entegrasyonu</h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🎯 3 Önemli Fayda:</p>
                      <p className="text-gray-600 text-xs">• Bitki türüne göre pazar fiyat analizi</p>
                      <p className="text-gray-600 text-xs">��� Bölgeye göre verim ortalamaları</p>
                      <p className="text-gray-600 text-xs">• Hasat-zamanlama optimizasyonu</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                      <p className="text-gray-600 text-xs">• TUİK, FAO, Türkiye Hal Fiyatları</p>
                      <p className="text-gray-600 text-xs">• TMO & Ziraat Odası verileri</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">👤 Kullan��cı Girdisi:</p>
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
              </motion.div>

              {/* Card 5 - Teknik Plan */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 border border-gray-200 relative"
              >
                <div className="absolute top-6 left-6 text-6xl font-bold text-gray-100">05</div>
                <div className="mt-16">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Yerleşim ve Teknik Plan Görselleştirmesi</h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🎯 3 Önemli Fayda:</p>
                      <p className="text-gray-600 text-xs">• Sera yerleşim planı (2D çizim)</p>
                      <p className="text-gray-600 text-xs">• Elektrik ve sulama hat planı</p>
                      <p className="text-gray-600 text-xs">• Teknik kabin, depo gösterimi</p>
                    </div>

                    <div>
                      <p className="text-gray-800 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
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
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[Planı Önizle]</button>
                  </div>
                </div>
              </motion.div>
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

      {/* AI Chat Section */}
      <div className="py-20 text-gray-600">
        <div className="text-section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Tarımsal Zeka Panelinizde Sizi Bekliyor!
            </h2>
            <p className="text-sm text-gray-600 text-section-container leading-relaxed">
              Proje çıktılarınız üzerine sohbet edebileceğiniz, derinlemesine araştırma yapabileceğiniz özel asistanınız panelinizde sizi bekliyor, üstelik tamamen ücretsiz
            </p>
          </motion.div>

          {/* AI Chat Flow */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative max-w-[900px] mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-2xl shadow-blue-500/25 border border-blue-100">
              <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                {/* Placeholder Image for AI Assistant */}
                <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">AI Asistan</h3>
                    <p className="text-sm text-gray-500">SeraGPT AI Sohbet Arayüzü Önizlemesi</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors shadow-md hover:shadow-lg"
            >
              AI Asistanınızı Test Edin
            </motion.button>
            <p className="text-gray-500 text-sm mt-4">
              Adil Kullanım Kotası İle Birlikte Ücretsizdir
            </p>
          </motion.div>
        </div>
      </div>

      {/* Visual Gallery Section */}
      <div className="py-20 bg-gray-50 text-gray-600">
        <div className="page-section-container bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 flex flex-col"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex flex-col max-w-[576px] mx-auto">
              <span className="mx-auto text-3xl">
                Yatırımcılarımızın Tercih Ettiği Sera Çözümleri
              </span>
              <br />
            </h2>
            <p className="text-sm text-gray-900 max-w-[576px] mx-auto leading-relaxed">
              Çözüm ortaklarımız ile hayata geçirilen sera projelerimiz
            </p>
          </motion.div>

          {/* Horizontal Scrolling Gallery */}
          <div className="relative mb-12 visual-section-container">
            <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-6">
              {/* Gallery Image 1 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-700 font-medium">Modern Sera Kompleksi</p>
                    <p className="text-gray-500 text-sm">Antalya, 5.000 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 2 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-700 font-medium">Domates Üretim Serası</p>
                    <p className="text-gray-500 text-sm">Mersin, 3.200 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 3 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-700 font-medium">Hidroponik Sera Sistemi</p>
                    <p className="text-gray-500 text-sm">İzmir, 2.800 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 4 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-700 font-medium">Fide Üretim Tesisi</p>
                    <p className="text-gray-500 text-sm">Bursa, 4.500 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 5 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌡️</div>
                    <p className="text-gray-700 font-medium">İklim Kontrollü Sera</p>
                    <p className="text-gray-500 text-sm">Konya, 6.000 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 6 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🥒</div>
                    <p className="text-gray-700 font-medium">Salatalık Üretim Serası</p>
                    <p className="text-gray-500 text-sm">Muğla, 2.100 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 7 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌹</div>
                    <p className="text-gray-700 font-medium">Çiçek Üretim Serası</p>
                    <p className="text-gray-500 text-sm">Isparta, 1.800 m²</p>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Image 8 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🥬</div>
                    <p className="text-gray-700 font-medium">Organik Sebze Serası</p>
                    <p className="text-gray-500 text-sm">Çanakkale, 3.700 m²</p>
                  </div>
                </div>
              </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pb-11">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors shadow-md hover:shadow-lg mt-6"
              >
                Anahtar Teslim Fiyat Alın
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors shadow-md hover:shadow-lg mt-6"
              >
                Kurumsal Danışmanlık Hizmeti
              </motion.button>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Uzman ekibimiz size özel teklifini hazırlayacak
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Cards Section */}
      <BlogCardsSection />

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white py-20 text-gray-600"
      >
        <div className="text-section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Sıkça Sorulan Sorular (SSS)
            </h2>
          </motion.div>

          <div className="space-y-2">
            {[
              {
                question: "Raporlar ne kadar doğru?",
                answer: "SeraGPT, gerçek zamanlı iklim, tarım ve ticaret verilerini kullanır. Raporlar, uzman mühendislerin geliştirdiği algoritmalarla analiz edilir ve %90 üzeri doğruluk oranı sunar."
              },
              {
                question: "Devlet teşviklerine uygun mu?",
                answer: "Evet. Raporlar TKDK, IPARD ve Ziraat Bankası destek başvurularında ön fizibilite dosyası olarak kullanılabilir. Talep halinde ek mühendis onayı alınabilir."
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
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
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-sm md:text-base text-gray-600 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Support Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">
              Sorunuza cevap bulamadınız mı?
            </p>
            <a
              href="/dashboard/help"
              className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
            >
              <span>Destek Sayfamıza Gidin</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
