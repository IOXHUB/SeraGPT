'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestNewPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header */}
      <header className="py-4" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                🌱
              </div>
              <h1 
                className="text-2xl font-semibold"
                style={{ color: '#f6f8f9', fontSize: '24px', fontWeight: '600' }}
              >
                SeraGPT
              </h1>
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

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            {/* Small text above headline */}
            <p 
              className="mb-6"
              style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
            >
              +20 YIL, +500 PROJE, +110 VERİ SETİ
            </p>

            {/* Main headline */}
            <div className="max-w-[576px] mx-auto mb-8">
              <h1 
                className="leading-tight"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '36px', 
                  fontWeight: '600' 
                }}
              >
                60 Saniyede Sera Yatırım Raporun Hazır!
              </h1>
            </div>

            {/* Description paragraph */}
            <div className="max-w-[576px] mx-auto mb-12">
              <p 
                className="leading-relaxed"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                SeraGPT; 20 yılı aşkın mühendislik deneyimi, 500'den fazla
                tamamlanmış proje ve 110'dan fazla gerçek zamanlı veri
                setiyle, tarımsal yatırım kararlarınızı saniyeler içinde
                analiz eder.
              </p>
            </div>

            {/* CTA Button */}
            <Link 
              href="/auth/login" 
              className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 mb-6"
              style={{ 
                backgroundColor: '#baf200', 
                color: '#1e3237', 
                fontSize: '14px', 
                fontWeight: '600' 
              }}
            >
              Şimdi Oluştur – İlk 5 Rapor Ücretsiz
            </Link>

            {/* Small text under button */}
            <p 
              className="text-center"
              style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
            >
              Doğru yatırım, doğru analizle başlar.
            </p>
          </div>
        </div>
      </section>

      {/* User Panel Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[800px] mx-auto">
            <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="rounded-xl overflow-hidden">
                <div
                  className="w-full h-80 bg-center bg-cover bg-no-repeat flex items-center justify-center rounded-xl"
                  style={{
                    backgroundImage: "url(https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F1cd1d24d2413420fa7c24610e14c9006)"
                  }}
                >
                  <div className="text-center p-4">
                    <div className="bg-black bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
                      <p 
                        className="font-medium"
                        style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                      >
                        📊 Analiz Paneli Önizleme
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/auth/login" 
                className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 mb-4"
                style={{ 
                  backgroundColor: '#baf200', 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                Kullanıcı Paneline Giriş Yapın
              </Link>
              <p 
                className="text-center"
                style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
              >
                Tüm sera projelerinizi tek platformdan yönetin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Types Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 
              className="text-center"
              style={{ 
                color: '#f6f8f9', 
                fontSize: '24px', 
                fontWeight: '600' 
              }}
            >
              Panelde Sizi Bekleyen Analiz Türleri ve Özellikleri
            </h2>
          </div>

          {/* Report Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[800px] mx-auto">
            {/* Card 1 - ROI Simülasyonu */}
            <div className="rounded-2xl p-6 shadow-lg" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 
                className="mb-4"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '24px', 
                  fontWeight: '600' 
                }}
              >
                ROI Simülasyonu
              </h3>
              <p 
                className="mb-6 leading-relaxed"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Yatırımın geri dönüş süresi, kar marjı ve yıllık getiri tahminleri ile kapsamlı finansal analiz.
              </p>
              <button
                className="w-full px-4 py-3 rounded-lg font-medium transition-all hover:opacity-90"
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

            {/* Card 2 - İklim Analizi */}
            <div className="rounded-2xl p-6 shadow-lg" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 
                className="mb-4"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '24px', 
                  fontWeight: '600' 
                }}
              >
                İklim Analizi
              </h3>
              <p 
                className="mb-6 leading-relaxed"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Bölgesel uygunluk skoru, don ve nem riskleri, geçmiş iklim verileri analizi.
              </p>
              <button
                className="w-full px-4 py-3 rounded-lg font-medium transition-all hover:opacity-90"
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

            {/* Card 3 - Ekipman Listesi */}
            <div className="rounded-2xl p-6 shadow-lg" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 
                className="mb-4"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '24px', 
                  fontWeight: '600' 
                }}
              >
                Ekipman Listesi
              </h3>
              <p 
                className="mb-6 leading-relaxed"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Mühendis onaylı ekipman önerileri, bölgeye uygun yapı ve iklimlendirme sistemleri.
              </p>
              <button
                className="w-full px-4 py-3 rounded-lg font-medium transition-all hover:opacity-90"
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

            {/* Card 4 - Pazar Analizi */}
            <div className="rounded-2xl p-6 shadow-lg" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 
                className="mb-4"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '24px', 
                  fontWeight: '600' 
                }}
              >
                Pazar Analizi
              </h3>
              <p 
                className="mb-6 leading-relaxed"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Bitki türüne göre fiyat analizi, bölgesel verim ortalamaları ve hasat zamanlaması.
              </p>
              <button
                className="w-full px-4 py-3 rounded-lg font-medium transition-all hover:opacity-90"
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

            {/* Card 5 - Teknik Plan */}
            <div className="rounded-2xl p-6 shadow-lg" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 
                className="mb-4"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '24px', 
                  fontWeight: '600' 
                }}
              >
                Teknik Plan
              </h3>
              <p 
                className="mb-6 leading-relaxed"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                2D/3D yerleşim planı, elektrik ve sulama hat planları, teknik kabin gösterimi.
              </p>
              <button
                className="w-full px-4 py-3 rounded-lg font-medium transition-all hover:opacity-90"
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

            {/* Card 6 - Uzman Desteği */}
            <div className="rounded-2xl p-6 shadow-lg" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 
                className="mb-4"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '24px', 
                  fontWeight: '600' 
                }}
              >
                Uzman Desteği
              </h3>
              <p 
                className="mb-6 leading-relaxed"
                style={{ 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                Mühendis danışmanlığı, birebir destek ve profesyonel rehberlik hizmetleri.
              </p>
              <button
                className="w-full px-4 py-3 rounded-lg font-medium transition-all hover:opacity-90"
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

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-12">
              <h2 
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '24px', 
                  fontWeight: '600' 
                }}
              >
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
                  className="rounded-xl overflow-hidden"
                  style={{ backgroundColor: '#f6f8f9' }}
                >
                  <button
                    className="w-full p-6 text-left hover:opacity-90 transition-opacity"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 
                        className="font-medium pr-4"
                        style={{ 
                          color: '#1e3237', 
                          fontSize: '14px', 
                          fontWeight: '600' 
                        }}
                      >
                        {faq.question}
                      </h3>
                      <svg
                        className={`w-5 h-5 transition-transform flex-shrink-0 ${
                          openFAQ === index ? 'rotate-180' : ''
                        }`}
                        style={{ color: '#1e3237' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p 
                        className="leading-relaxed"
                        style={{ 
                          color: '#1e3237', 
                          fontSize: '14px', 
                          fontWeight: '400' 
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p 
                className="text-center mb-4"
                style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
              >
                Sorunuza cevap bulamadınız mı?
              </p>
              <Link
                href="/destek"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#baf200', 
                  color: '#1e3237', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                <span>Destek Sayfamıza Gidin</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 max-w-[800px] mx-auto">
            
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
                  className="font-semibold"
                  style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '600' }}
                >
                  SeraGPT
                </span>
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
                    href="/danismanlik" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    Danışmanlık
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/anahtar-teslim-proje" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
                  >
                    Anahtar Teslim Proje
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/destek" 
                    className="transition-opacity hover:opacity-70"
                    style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}
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
                  color: '#f6f8f9', 
                  fontSize: '14px', 
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
              <p 
                className="leading-relaxed"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '14px', 
                  fontWeight: '400' 
                }}
              >
                info@seragpt.com<br />
                www.seragpt.com
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-6 text-center">
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
    </div>
  );
}
