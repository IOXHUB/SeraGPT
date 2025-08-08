'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BlogCardsSection from './BlogCardsSection';
import Footer from '../Footer';
import SeraGPTLogo from '../ui/SeraGPTLogo';

export default function UserjotCloneSection() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  // Simple auth check without context
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for development user first
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
          const devUser = localStorage.getItem('seragpt_user');
          if (devUser) {
            setUser(JSON.parse(devUser));
            setLoading(false);
            return;
          }
        }

        // Check if user is logged in via API
        const response = await fetch('/api/auth/status', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.isAuthenticated && data.user) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.warn('Auth status check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="page-container">
      {/* Header - Clean layout */}
      <header className="header">
        <div className="header-footer-container">
          {/* Logo - clickable to homepage */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <SeraGPTLogo size="md" priority />
            </Link>
          </div>

          {/* Center navigation - 3 links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/danismanlik" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Danışmanlık
            </Link>
            <Link href="/anahtar-teslim-proje" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Anahtar Teslim Proje
            </Link>
            <Link href="/destek" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Destek
            </Link>
          </nav>

          {/* Right menu - conditional based on user state */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  // For logged in users - show Dashboard
                  <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                    Dashboard
                  </Link>
                ) : (
                  // For logged out users - show Login or Sign Up CTA
                  <>
                    <Link href="/auth/login" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                      Giriş Yap
                    </Link>
                    <Link href="/auth/login" className="bg-gray-600 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors">
                      Ücretsiz Başla
                    </Link>
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
            <div>
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
                <button
                  onClick={() => handleNavigation('/destek')}
                  className="w-full text-left block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">❓</span>
                    <span className="text-base font-medium">Destek</span>
                  </div>
                </button>
                <button
                  onClick={() => handleNavigation('/danismanlik')}
                  className="w-full text-left block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🎯</span>
                    <span className="text-base font-medium">Danışmanlık</span>
                  </div>
                </button>
                <button
                  onClick={() => handleNavigation('/anahtar-teslim-proje')}
                  className="w-full text-left block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🏗️</span>
                    <span className="text-base font-medium">Anahtar Teslim Sera</span>
                  </div>
                </button>
                <button
                  onClick={() => handleNavigation('/blog')}
                  className="w-full text-left block text-gray-700 hover:text-gray-900 hover:bg-gray-50 py-3 px-4 rounded-lg transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">📖</span>
                    <span className="text-base font-medium">Blog</span>
                  </div>
                </button>
              </div>

              {/* Panel Access Button */}
              <div className="border-t border-gray-100 pt-4">
                {!loading && (
                  <>
                    {user ? (
                      <button
                        onClick={() => handleNavigation('/dashboard')}
                        className="flex items-center justify-center w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-4 rounded-xl font-medium transition-all hover:from-gray-800 hover:to-gray-900 shadow-lg"
                      >
                        <span className="text-lg mr-2">📊</span>
                        <span>Panelime Git</span>
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <button
                          onClick={() => handleNavigation('/auth/login')}
                          className="flex items-center justify-center w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-4 rounded-xl font-medium transition-all hover:from-gray-800 hover:to-gray-900 shadow-lg"
                        >
                          <span className="text-lg mr-2">🔐</span>
                          <span>Panele Giriş</span>
                        </button>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleNavigation('/auth/login')}
                            className="flex-1 text-center border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                          >
                            Giriş Yap
                          </button>
                          <button
                            onClick={() => handleNavigation('/auth/login')}
                            className="flex-1 text-center bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                          >
                            Kayıt Ol
                          </button>
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
          <Link href="/auth/login" className="btn btn-primary mb-4 w-full sm:w-auto max-w-sm mx-auto block text-center">
            <span className="hidden sm:inline">Şimdi Oluştur – İlk 5 Rapor Ücretsiz</span>
            <span className="sm:hidden">🚀 Ücretsiz Başla</span>
          </Link>

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
                Panelde Sizi Bekleyen Analiz Türleri ve Özellikleri
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
              <div className="md:flex-shrink-0 w-full md:w-80 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 relative shadow-sm hover:shadow-md transition-shadow">
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
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"İklim bu yatırıma uygun mu?"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[İklim Skorunu Gör]</button>
                  </div>
                </div>
              </div>

              {/* Card 3 - Ekipman Listesi */}
              <div className="md:flex-shrink-0 w-full md:w-80 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 relative shadow-sm hover:shadow-md transition-shadow">
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
                      </div>
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
              <div className="md:flex-shrink-0 w-full md:w-80 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 relative shadow-sm hover:shadow-md transition-shadow">
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
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"Pazarlar ne diyor? Bitkiniz değerli mi?"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[Verileri Göster]</button>
                  </div>
                </div>
              </div>

              {/* Card 5 - Teknik Plan */}
              <div className="md:flex-shrink-0 w-full md:w-80 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 relative shadow-sm hover:shadow-md transition-shadow">
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
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm font-medium">"2D/3D Yerleşim Planı Hazır!"</p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">[Planı Önizle]</button>
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
            <Link
              href="/destek"
              className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
            >
              <span>Destek Sayfamıza Gidin</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
