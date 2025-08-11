'use client';

import Link from 'next/link';

export default function AnahtarTeslimProjePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header */}
      <header className="py-4" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="hover:opacity-70 transition-opacity" style={{ color: '#f6f8f9' }}>
                ← Ana Sayfa
              </Link>
            </div>
            <div className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F01c1e8a05ef6424b912d584875377957?format=webp&width=800"
                alt="SeraGPT Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Anahtar Teslim Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            {/* Main title */}
            <div className="max-w-[576px] mx-auto mb-16">
              <h1
                className="leading-tight text-center mb-8"
                style={{
                  color: '#f6f8f9',
                  fontSize: '36px',
                  fontWeight: '600'
                }}
              >
                Anahtar Teslim Sera Kurulumu
              </h1>

              <div
                className="space-y-6 text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '16px',
                  fontWeight: '400'
                }}
              >
                <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                  Sera yatırımınız için SeraGPT ile analiz yaptınız. Şimdi sıra, bu verileri sahaya taşımakta. ISITMAX ve XXXXX İspanya ortaklığıyla yürüttüğümüz anahtar teslim proje sistemimizde:
                </p>

                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>Keşif, projelendirme ve süpervizörlük hizmetleri ISITMAX tarafından. Tüm imalat, ekipman, otomasyon ve saha kurulum süreçleri ise XXXXX Spain tarafından sağlanır</p>
                </div>
              </div>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-[800px] mx-auto">
              <div
                className="p-6 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm"
                style={{ borderColor: '#baf200' }}
              >
                <h4
                  className="font-semibold mb-3"
                  style={{ color: '#baf200', fontSize: '18px' }}
                >
                  Türkiye Avantajı
                </h4>
                <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                  Yerinde planlama ve süpervizörlük hizmetleri
                </p>
              </div>

              <div
                className="p-6 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm"
                style={{ borderColor: '#baf200' }}
              >
                <h4
                  className="font-semibold mb-3"
                  style={{ color: '#baf200', fontSize: '18px' }}
                >
                  Avrupa Standardı
                </h4>
                <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                  Kaliteli malzeme ve profesyonel kurulum
                </p>
              </div>

              <div
                className="p-6 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm"
                style={{ borderColor: '#baf200' }}
              >
                <h4
                  className="font-semibold mb-3"
                  style={{ color: '#baf200', fontSize: '18px' }}
                >
                  Tek Elden Yönetim
                </h4>
                <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                  Zamanında teslim edilen projeler
                </p>
              </div>
            </div>

            {/* Two Column Layout for Services and Target */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16 max-w-[900px] mx-auto">
              {/* Service Scope */}
              <div className="text-center">
                <h3
                  className="mb-6"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '24px',
                    fontWeight: '600'
                  }}
                >
                  Hizmet Kapsamı
                </h3>
                <div
                  className="space-y-4 bg-white/5 rounded-xl p-6"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400'
                  }}
                >
                  <p style={{ color: '#f6f8f9' }}>Yerinde keşif ve teknik analiz (ISITMAX)</p>
                  <p style={{ color: '#f6f8f9' }}>Statik & yapısal proje çizimleri</p>
                  <p style={{ color: '#f6f8f9' }}>XXXXX menşeli otomasyon, ekipman ve kurulum hizmeti</p>
                  <p style={{ color: '#f6f8f9' }}>ISITMAX süpervizörlüğünde şantiye yönetimi</p>
                  <p style={{ color: '#f6f8f9' }}>Tam kapsamlı fiyat teklifi ve mühendislik dosyası (PDF)</p>
                </div>
              </div>

              {/* Target Audience */}
              <div className="text-center">
                <h3
                  className="mb-6"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '24px',
                    fontWeight: '600'
                  }}
                >
                  Kimler İçin Uygun?
                </h3>
                <div
                  className="space-y-4 bg-white/5 rounded-xl p-6"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400'
                  }}
                >
                  <p style={{ color: '#f6f8f9' }}>1.000 m² ve üzeri yatırım düşünen profesyonel üreticiler</p>
                  <p style={{ color: '#f6f8f9' }}>Hibe/destek başvurusu için teknik dosya gereksinimi olanlar</p>
                  <p style={{ color: '#f6f8f9' }}>Sera projelerinde uzun ömür, otomasyon ve enerji verimliliğini öncelikleyen yatırımcılar</p>
                </div>
              </div>
            </div>

            {/* Experience Stats */}
            <div className="mb-16">
              <h3
                className="mb-8 text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '24px',
                  fontWeight: '600'
                }}
              >
                Güvence ve Tecrübe
              </h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-[600px] mx-auto">
                <div className="text-center">
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: '#baf200' }}
                  >
                    500+
                  </div>
                  <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                    Tamamlanmış Sera Projesi
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: '#baf200' }}
                  >
                    3
                  </div>
                  <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                    Ülkede Uygulanan Sistem
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: '#baf200' }}
                  >
                    %100
                  </div>
                  <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                    Standartlara Uygunluk
                  </p>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-16 max-w-[800px] mx-auto">
              <h3
                className="mb-8 text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '24px',
                  fontWeight: '600'
                }}
              >
                Hizmet Detayları
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h4
                    className="mb-4"
                    style={{ color: '#baf200', fontSize: '18px', fontWeight: '600' }}
                  >
                    🏗️ İnşaat ve Yapı
                  </h4>
                  <ul className="space-y-2 text-left">
                    <li style={{ color: '#f6f8f9', fontSize: '14px' }}>• Temel ve altyapı çalışmaları</li>
                    <li style={{ color: '#f6f8f9', fontSize: '14px' }}>• Çelik konstrüksiyon montajı</li>
                    <li style={{ color: '#f6f8f9', fontSize: '14px' }}>• Örtü sistemi uygulaması</li>
                    <li style={{ color: '#f6f8f9', fontSize: '14px' }}>• Havalandırma sistemleri</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <h4
                    className="mb-4"
                    style={{ color: '#baf200', fontSize: '18px', fontWeight: '600' }}
                  >
                    🤖 Otomasyon ve Teknoloji
                  </h4>
                  <ul className="space-y-2 text-left">
                    <li style={{ color: '#f6f8f9', fontSize: '14px' }}>• İklim kontrol sistemleri</li>
                    <li style={{ color: '#f6f8f9', fontSize: '14px' }}>• Damla sulama sistemi</li>
                    <li style={{ color: '#f6f8f9', fontSize: '14px' }}>• Güneş enerji sistemleri</li>
                    <li style={{ color: '#f6f8f9', fontSize: '14px' }}>• Uzaktan izleme ve kontrol</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-6">
              <Link
                href="/auth/login"
                className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-105 transform"
                style={{
                  backgroundColor: '#baf200',
                  color: '#1e3237',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                KURUMSAL TEKLİF AL
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-12 bg-white/5 rounded-xl p-6 max-w-[600px] mx-auto">
              <h4
                className="mb-4"
                style={{ color: '#baf200', fontSize: '18px', fontWeight: '600' }}
              >
                İletişim ve Randevu
              </h4>
              <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}>
                Anahtar teslim sera projeleriniz için detaylı bilgi almak ve teknik görüşme yapmak üzere uzmanlarımızla iletişime geçebilirsiniz. 
                Ücretsiz ön değerlendirme ve keşif hizmeti mevcuttur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
