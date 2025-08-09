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
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-purple-500 to-blue-600">
      {/* Header - Glass morphism style */}
      <header className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 backdrop-blur-sm bg-white/10 rounded-2xl mt-4 border border-white/20">
            {/* Logo */}
            <div className="flex items-center space-x-3 pl-6">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold text-white">SeraGPT</span>
                </div>
              </Link>
            </div>

            {/* Center navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/danismanlik" className="text-white/90 hover:text-white font-medium transition-colors">
                Danışmanlık
              </Link>
              <Link href="/anahtar-teslim-proje" className="text-white/90 hover:text-white font-medium transition-colors">
                Anahtar Teslim Proje
              </Link>
              <Link href="/destek" className="text-white/90 hover:text-white font-medium transition-colors">
                Destek
              </Link>
            </nav>

            {/* Right menu */}
            <div className="hidden md:flex items-center space-x-4 pr-6">
              {!loading && (
                <>
                  {user ? (
                    <Link href="/dashboard" className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-medium hover:bg-white/30 transition-colors border border-white/30">
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link href="/auth/login" className="text-white/90 hover:text-white font-medium transition-colors">
                        Giriş Yap
                      </Link>
                      <Link href="/auth/login" className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-medium hover:bg-white/30 transition-colors border border-white/30">
                        Ücretsiz Başla
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden relative p-2 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors mr-4 border border-white/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl z-50">
            <div className="p-6 space-y-6">
              <div className="text-center border-b border-white/20 pb-4">
                <h3 className="text-lg font-semibold text-white">Menü</h3>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleNavigation('/destek')}
                  className="w-full text-left block text-white/90 hover:text-white hover:bg-white/10 py-3 px-4 rounded-xl transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">❓</span>
                    <span className="text-base font-medium">Destek</span>
                  </div>
                </button>
                <button
                  onClick={() => handleNavigation('/danismanlik')}
                  className="w-full text-left block text-white/90 hover:text-white hover:bg-white/10 py-3 px-4 rounded-xl transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🎯</span>
                    <span className="text-base font-medium">Danışmanlık</span>
                  </div>
                </button>
                <button
                  onClick={() => handleNavigation('/anahtar-teslim-proje')}
                  className="w-full text-left block text-white/90 hover:text-white hover:bg-white/10 py-3 px-4 rounded-xl transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🏗️</span>
                    <span className="text-base font-medium">Anahtar Teslim Sera</span>
                  </div>
                </button>
              </div>

              <div className="border-t border-white/20 pt-4">
                {!loading && (
                  <>
                    {user ? (
                      <button
                        onClick={() => handleNavigation('/dashboard')}
                        className="flex items-center justify-center w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-xl font-medium transition-all hover:bg-white/30 border border-white/30"
                      >
                        <span className="text-lg mr-2">📊</span>
                        <span>Panelime Git</span>
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <button
                          onClick={() => handleNavigation('/auth/login')}
                          className="flex items-center justify-center w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-xl font-medium transition-all hover:bg-white/30 border border-white/30"
                        >
                          <span className="text-lg mr-2">🔐</span>
                          <span>Panele Giriş</span>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Subtitle */}
          <p className="text-sm sm:text-base font-medium text-white/80 uppercase tracking-wide mb-6">
            +20 YIL, +500 PROJE, +110 VERİ SETİ
          </p>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
            <span className="block">60 Saniyede</span>
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Sera Yatırım Raporun Hazır!
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
            SeraGPT; 20 yılı aşkın mühendislik deneyimi, 500'den fazla
            tamamlanmış proje ve 110'dan fazla gerçek zamanlı veri
            setiyle, tarımsal yatırım kararlarınızı saniyeler içinde
            analiz eder.
          </p>

          {/* CTA Button */}
          <Link 
            href="/auth/login" 
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/90 transition-colors shadow-xl hover:shadow-2xl mb-4"
          >
            <span className="hidden sm:inline">🚀 Şimdi Oluştur – İlk 5 Rapor Ücretsiz</span>
            <span className="sm:hidden">🚀 Ücretsiz Başla</span>
          </Link>

          {/* Small text */}
          <p className="text-white/70 text-sm">
            Doğru yatırım, doğru analizle başlar.
          </p>
        </div>
      </main>

      {/* User Panel Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Dashboard Preview */}
              <div
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-center bg-cover bg-no-repeat flex items-center justify-center"
                style={{
                  backgroundImage: "url(https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F1cd1d24d2413420fa7c24610e14c9006)"
                }}
              >
                <div className="text-center p-4">
                  <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4">
                    <p className="text-white text-sm sm:text-base font-medium">📊 Analiz Paneli Önizleme</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link 
              href="/auth/login" 
              className="inline-block bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
            >
              Kullanıcı Paneline Giriş Yapın
            </Link>
            <p className="text-white/80 text-center mt-4">
              Tüm sera projelerinizi tek platformdan yönetin
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Tools Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Panelde Sizi Bekleyen Analiz Türleri ve Özellikleri
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - ROI Simülasyonu */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:bg-white/20 transition-all">
              <div className="text-6xl font-bold text-white/20 mb-6">01</div>
              
              <h3 className="text-xl font-bold text-white mb-4">
                ROI Simülasyonu
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-white/90 text-sm font-semibold mb-2">🎯 Temel Faydalar:</p>
                  <div className="space-y-2">
                    <p className="text-white/80 text-sm flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>Yatırımın geri dönüş süresi</span>
                    </p>
                    <p className="text-white/80 text-sm flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>Kar marjı ve yıllık getiri tahmini</span>
                    </p>
                    <p className="text-white/80 text-sm flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>İşletme maliyetleri kıyaslaması</span>
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-white/90 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                  <p className="text-white/70 text-xs">• OpenWeather, FAO & TÜİK</p>
                  <p className="text-white/70 text-xs">• Seraburada / e-Tarım API</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <p className="text-white font-medium mb-3">"Yatırımınız size ne zaman geri döner?"</p>
                <button className="w-full bg-white text-purple-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/90 transition-colors">
                  📄 PDF'yi Örnekle Gör
                </button>
              </div>
            </div>

            {/* Card 2 - İklim Analizi */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:bg-white/20 transition-all">
              <div className="text-6xl font-bold text-white/20 mb-6">02</div>
              
              <h3 className="text-xl font-bold text-white mb-4">
                İklim & Risk Analizi
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-white/90 text-sm font-semibold mb-2">🎯 3 Önemli Fayda:</p>
                  <p className="text-white/80 text-sm">• Seçilen ürün için uygunluk skoru</p>
                  <p className="text-white/80 text-sm">• Don, rüzgar, nem riskleri</p>
                  <p className="text-white/80 text-sm">• Geçmiş yıllardaki iklim olayları</p>
                </div>
                <div>
                  <p className="text-white/90 text-xs font-semibold mb-1">🔗 Veri Kaynakları:</p>
                  <p className="text-white/70 text-xs">• Open-Meteo, Copernicus Climate</p>
                  <p className="text-white/70 text-xs">• ERA5 verileri, MGMT</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <p className="text-white font-medium mb-3">"İklim bu yatırıma uygun mu?"</p>
                <button className="text-white/90 text-sm font-medium hover:text-white hover:underline">
                  İklim Skorunu Gör →
                </button>
              </div>
            </div>

            {/* Card 3 - Ekipman Listesi */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:bg-white/20 transition-all">
              <div className="text-6xl font-bold text-white/20 mb-6">03</div>
              
              <h3 className="text-xl font-bold text-white mb-4">
                Ekipman Listesi
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-white/90 text-sm font-semibold mb-2">🏗️ Temel Faydalar:</p>
                  <div className="space-y-2">
                    <p className="text-white/80 text-sm flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>Bölgeye uygun yapı ve iklimlendirme</span>
                    </p>
                    <p className="text-white/80 text-sm flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>Anahtar teslim modüler öneriler</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <p className="text-white font-medium mb-3">"Mühendislerin önerdiği en doğru sistem"</p>
                <button className="w-full bg-white text-purple-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/90 transition-colors">
                  📄 Ekipman Listesine Bak
                </button>
              </div>
            </div>

            {/* Card 4 - Pazar Verisi */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:bg-white/20 transition-all">
              <div className="text-6xl font-bold text-white/20 mb-6">04</div>
              
              <h3 className="text-xl font-bold text-white mb-4">
                Pazar & Tarım Verisi
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-white/90 text-sm font-semibold mb-2">🎯 3 Önemli Fayda:</p>
                  <p className="text-white/80 text-sm">• Bitki türüne göre pazar fiyat analizi</p>
                  <p className="text-white/80 text-sm">• Bölgeye göre verim ortalamaları</p>
                  <p className="text-white/80 text-sm">• Hasat-zamanlama optimizasyonu</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <p className="text-white font-medium mb-3">"Pazarlar ne diyor? Bitkiniz değerli mi?"</p>
                <button className="text-white/90 text-sm font-medium hover:text-white hover:underline">
                  Verileri Göster →
                </button>
              </div>
            </div>

            {/* Card 5 - Teknik Plan */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:bg-white/20 transition-all md:col-span-2 lg:col-span-1">
              <div className="text-6xl font-bold text-white/20 mb-6">05</div>
              
              <h3 className="text-xl font-bold text-white mb-4">
                Teknik Plan Görselleştirmesi
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-white/90 text-sm font-semibold mb-2">🎯 3 Önemli Fayda:</p>
                  <p className="text-white/80 text-sm">• Sera yerleşim planı (2D çizim)</p>
                  <p className="text-white/80 text-sm">• Elektrik ve sulama hat planı</p>
                  <p className="text-white/80 text-sm">• Teknik kabin, depo gösterimi</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <p className="text-white font-medium mb-3">"2D/3D Yerleşim Planı Hazır!"</p>
                <button className="text-white/90 text-sm font-medium hover:text-white hover:underline">
                  Planı Önizle →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Cards Section */}
      <div className="bg-white/5 backdrop-blur-sm">
        <BlogCardsSection />
      </div>

      {/* FAQ Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Sıkça Sorulan Sorular (SSS)
            </h2>
          </div>

          <div className="space-y-4">
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
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20"
              >
                <button
                  className="w-full p-6 text-left hover:bg-white/20 transition-colors group"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white group-hover:text-white/90 pr-4">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-white/70 group-hover:text-white transition-transform flex-shrink-0 ${
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
                  <div className="px-6 pb-6 text-white/80 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Support Link */}
          <div className="text-center mt-12">
            <p className="text-white/80 text-center mb-4">
              Sorunuza cevap bulamadınız mı?
            </p>
            <Link
              href="/destek"
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-medium transition-colors border border-white/30"
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
