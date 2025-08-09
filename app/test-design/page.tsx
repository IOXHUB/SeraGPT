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
            <div
              className="flex"
              style={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                gap: '50px',
                width: '100%',
                maxWidth: '1200px',
                minWidth: '1200px',
                flexDirection: 'row'
              }}
            >
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#146448', display: 'none' }}
              >
                <svg className="w-5 h-5" style={{ color: '#f6f8f9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl"
                  style={{
                    backgroundColor: '#146448',
                    color: '#f6f8f9',
                    borderRadius: '12px',
                    fontSize: '20px',
                    fontWeight: '700',
                    height: '48px',
                    width: '48px'
                  }}
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

      {/* Main Content Area - Centered Design */}
      <main className="flex-1 flex justify-center items-center py-16">
        <div className="w-full max-w-4xl px-6">
          {/* Hero Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: '#baf200' }}>
              <span className="text-2xl">⚠️</span>
            </div>
            <h1
              className="text-4xl font-semibold mb-4"
              style={{ color: '#f6f8f9' }}
            >
              60 Saniyede Sera Yatırım Raporun Hazır!
            </h1>
            <p
              className="text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ color: '#f6f8f9', opacity: 0.9 }}
            >
              SeraGPT; 20 yılı aşkın mühendislik deneyimi, 500'den fazla tamamlanmış proje ve 110'dan fazla gerçek zamanlı veri setiyle, tarımsal yatırım kararlarınızı saniyeler içinde analiz eder.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-30 transition-all">
              <div className="text-3xl mb-3">💻</div>
              <h3 className="font-semibold mb-2" style={{ color: '#f6f8f9' }}>Kod Yazma</h3>
              <p className="text-sm" style={{ color: '#f6f8f9', opacity: 0.8 }}>Programlama yardımı</p>
            </div>
            <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-30 transition-all">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-semibold mb-2" style={{ color: '#f6f8f9' }}>Metin Yazma</h3>
              <p className="text-sm" style={{ color: '#f6f8f9', opacity: 0.8 }}>İçerik oluşturma</p>
            </div>
            <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-30 transition-all">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold mb-2" style={{ color: '#f6f8f9' }}>Görsel Analiz</h3>
              <p className="text-sm" style={{ color: '#f6f8f9', opacity: 0.8 }}>Resim açıklama</p>
            </div>
            <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-30 transition-all">
              <div className="text-3xl mb-3">⚠️</div>
              <h3 className="font-semibold mb-2" style={{ color: '#f6f8f9' }}>Problem Çözme</h3>
              <p className="text-sm" style={{ color: '#f6f8f9', opacity: 0.8 }}>Analitik düşünme</p>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="space-y-6">
            {/* Assistant Message */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                <span className="text-sm">🤖</span>
              </div>
              <div
                className="bg-white rounded-2xl p-4 max-w-2xl"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
              >
                <p style={{ color: '#1e3237' }}>
                  Merhaba! Ben ChatGPT. Öğrenel tarafından geliştirilen bir yapay zeka asistanıyım. Size nasıl yardımcı olabilirim?
                </p>
                <div className="text-xs mt-2" style={{ color: '#666' }}>16:45</div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="relative">
              <div
                className="bg-white rounded-2xl p-4 shadow-lg"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
              >
                <div className="flex items-center space-x-3">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder="ChatGPT'ye bir mesaj yazın..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-700"
                  />
                  <button
                    className="p-2 rounded-lg transition-colors"
                    style={{ backgroundColor: '#baf200' }}
                  >
                    <svg className="w-4 h-4" style={{ color: '#1e3237' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="text-center mt-3">
                <p className="text-sm" style={{ color: '#f6f8f9', opacity: 0.7 }}>
                  ChatGPT hata yapabilir. Önemli bilgileri doğrulayın.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Optional Sidebar for future use */}
      <aside className="hidden lg:block w-64 bg-white shadow-lg">
        <div className="p-6">
          <button
            className="w-full mb-6 px-4 py-3 rounded-xl font-medium transition-all hover:opacity-90 shadow-md"
            style={{
              backgroundColor: '#baf200',
              color: '#1e3237',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            + Yeni Sohbet
          </button>

          <div className="space-y-2">
            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: 'rgba(186, 242, 0, 0.1)' }}
            >
              <h4 className="font-medium" style={{ color: '#1e3237' }}>Yeni Sohbet</h4>
              <p className="text-sm" style={{ color: '#666' }}>Merhaba! Ben ChatGPT</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3 text-sm" style={{ color: '#1e3237' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Ayarlar</span>
            </div>
            <div className="flex items-center space-x-3 text-sm mt-3" style={{ color: '#1e3237' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profil</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Features Section - Simplified */}
      <section className="py-16 hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
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

      {/* CTA Section - Hidden for centered design */}
      <section className="py-16 hidden">
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
