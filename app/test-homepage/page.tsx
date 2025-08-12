'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestHomepage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-[1700px] mx-auto px-6">
          <div className="max-w-[896px] mx-auto text-center">
            <div className="max-w-[576px] mx-auto mb-8">
              <h1
                className="leading-tight text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '36px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                60 Saniyede Sera Yatırım Fizibilitesi
              </h1>
            </div>

            <div className="max-w-[576px] mx-auto mb-12">
              <p
                className="leading-relaxed text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '16px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                SeraGPT, lokasyona özel veri, iklim analizi ve pazar verilerini birleştirerek yatırım geri dönüşünüzü anında hesaplar. 5 ücretsiz rapor hakkınızla riskleri minimize edin, fırsatları görün ve yatırımınızı emin adımlarla başlatın.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/auth/login"
                className="px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#baf200',
                  color: '#146448',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Ücretsiz Rapor Al
              </Link>
              <Link
                href="/danismanlik"
                className="px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: 'transparent',
                  color: '#f6f8f9',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '2px solid #baf200',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Danışmanlık Talep Et
              </Link>
            </div>

            <p
              className="text-center"
              style={{
                color: '#f6f8f9',
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
              }}
            >
              Not: Kredi kartı gerekmez. 5 ücretsiz token.
            </p>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır Section */}
      <section className="py-16">
        <div className="max-w-[1700px] mx-auto px-6">
          <div className="max-w-[896px] mx-auto">
            <h2
              className="text-center mb-8"
              style={{
                color: '#f6f8f9',
                fontSize: '36px',
                fontWeight: '600',
                fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
              }}
            >
              Nasıl Çalışır?
            </h2>

            <div className="max-w-[576px] mx-auto mb-12">
              <p
                className="text-center mb-8"
                style={{
                  color: '#f6f8f9',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Yatırım sürecine başlamadan önce hedeflerinizi net bir şekilde tanımlamak büyük önem taşır. Kapasiteniz, ürün çeşitliliğiniz, bütçeniz, zaman çizelgeniz ve ulaşmak istediğiniz KPI'ları belirleyerek işe başlayın. SeraGPT, kurumsal yatırımcılardan mevcut sera sahiplerine ve yeni girişimcilere kadar her kullanıcı için kişiselleştirilmiş bir başlangıç noktası sunar.
              </p>
            </div>

            {/* Step 1: Verilerinizi ve Lokasyonunuzu Bağlayın */}
            <div className="mb-12 bg-white/5 rounded-xl p-8 border border-white/20">
              <h3
                className="mb-6 text-center"
                style={{
                  color: '#baf200',
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                1. Verilerinizi ve Lokasyonunuzu Bağlayın
              </h3>
              <p
                className="text-center mb-6"
                style={{
                  color: '#f6f8f9',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Doğru karar almak için doğru verilere ihtiyaç vardır. SeraGPT, gerekli verilere erişimleri sağlamak için 50'den fazla API entegrasyonu kullanır.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      <strong>Meteomatics / Open-Meteo:</strong> Bölgenize özel iklim verileri (ısıtma/soğutma yükleri, güneşlenme süresi, yağış oranları).
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      <strong>FAO / USDA Data:</strong> Küresel ve bölgesel tarımsal üretim ve verim istatistikleri.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      <strong>Eurostat / TÜİK:</strong> Bölgesel tarım ve pazar verileri.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      <strong>Google Maps / GIS API:</strong> Arazi yapısı ve lojistik analizleri.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      <strong>Energy Data APIs:</strong> Elektrik, doğal gaz ve yenilenebilir enerji maliyet analizi.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      <strong>Market Price APIs:</strong> Güncel pazar fiyatları ve ürün trendleri.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: AI Tabanlı Analiz ve Raporlama */}
            <div className="mb-12 bg-white/5 rounded-xl p-8 border border-white/20">
              <h3
                className="mb-6 text-center"
                style={{
                  color: '#baf200',
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                2. AI Tabanlı Analiz ve Raporlama
              </h3>
              <p
                className="text-center mb-6"
                style={{
                  color: '#f6f8f9',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                SeraGPT, gelişmiş yapay zeka modelleri kullanarak yatırımınız hakkında ayrıntılı analiz ve raporlar sunar:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      ROI (Yatırım Geri Dönüş) tahminleri ve duyarlılık analizler.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      İklim uyum değerlendirmeleri ve pazar talebi projeksiyonları.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      Ekipman listesi ve tedarik planı.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      Yerleşim düzeni tasarımı ve lojistik akış optimizasyonu.
                    </p>
                  </div>
                </div>
              </div>
              <p
                className="text-center mt-6"
                style={{
                  color: '#f6f8f9',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Sonuçlar, PDF formatında, interaktif bir gösterge paneli veya karşılaştırmalı versiyonlarla sunulur.
              </p>
            </div>

            {/* Step 3: Ücretsiz Tarımsal AI Asistanı */}
            <div className="mb-12 bg-white/5 rounded-xl p-8 border border-white/20">
              <h3
                className="mb-6 text-center"
                style={{
                  color: '#baf200',
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                3. Ücretsiz Tarımsal AI Asistanı ile Sohbet
              </h3>
              <p
                className="text-center mb-6"
                style={{
                  color: '#f6f8f9',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                SeraGPT'nin ücretsiz AI asistanı, kullanıcılarına analiz ve raporlama sürecinde rehberlik eder:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      Analiz sonuçlarınızı anında paylaşır ve detaylandırır.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      Senaryolar üzerinde değişiklik yapmanıza olanak tanır (ör. "Domates yerine biber üretirsem, ROI nasıl etkilenir?").
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      Teknik terimleri sadeleştirir ve raporları kullanıc�� dostu hale getirir.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      Sınırsız ve ücretsiz hizmet sunar.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Projelendirme ve Kurulum */}
            <div className="mb-12 bg-white/5 rounded-xl p-8 border border-white/20">
              <h3
                className="mb-6 text-center"
                style={{
                  color: '#baf200',
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                4. Projelendirme ve Kurulum
              </h3>
              <p
                className="text-center mb-6"
                style={{
                  color: '#f6f8f9',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                SeraGPT, tarımsal zeka ile donatılmış analizler sunmanın yanı sıra, yatırımınızı gerçeğe dönüştürmek için iki güçlü hizmet sunar:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4
                    className="mb-4"
                    style={{
                      color: '#baf200',
                      fontSize: '18px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Stratejik Proje Danışmanlığı
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Fizibilite çalışmalarından tasarıma, kurulum ve operasyon hazırlığına kadar eksiksiz destek.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Şeffaf bütçe yönetimi ve maliyet optimizasyonu.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Ekipman seçimi, tedarikçi yönetimi ve hukuki süreçlerde rehberlik.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Üretim planlama, bakım programı ve performans odaklı KPI seti oluşturma.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4
                    className="mb-4"
                    style={{
                      color: '#baf200',
                      fontSize: '18px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Anahtar Teslim Sera Kurulumu – Serapoli İş Birliğiyle
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Cam, yüksek tünel, polikarbon ve dikey tarım gibi farklı yapı seçenekleri.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Isıtma, soğutma, sulama, otomasyon, enerji ve iklimlendirme sistemlerinin kurulumu.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Kurulum sonrası direkt üretime uygun "Hazır Üretim" konsepti.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Avrupa standartlarında mühendislik, test ve kalite kontrol süreçleri.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Ölçüm ve Sürekli İyileştirme */}
            <div className="mb-8 bg-white/5 rounded-xl p-8 border border-white/20">
              <h3
                className="mb-6 text-center"
                style={{
                  color: '#baf200',
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                5. Ölçüm ve Sürekli İyileştirme
              </h3>
              <p
                className="text-center mb-6"
                style={{
                  color: '#f6f8f9',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Her kurulumun ardından, yatırımınızın performansı izlenir ve geliştirme önerileri sunulur:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                    Enerji verimliliği, ürün kalitesi ve pazar uyumu için etkin takip.
                  </p>
                </div>
                <div className="text-center">
                  <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                    KPI'lara dayalı optimizasyon ve müdahale planları.
                  </p>
                </div>
                <div className="text-center">
                  <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                    Yıllık bakım, modernizasyon ve kapasite artırma çözümleri ile sürekli gelişim.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 60 Saniyede Elde edeceğiniz Analizler Section */}
      <section className="py-16" style={{ backgroundColor: '#f6f8f9' }}>
        <div className="max-w-[1700px] mx-auto px-6">
          <div className="max-w-[896px] mx-auto">
            <h2
              className="text-center mb-12"
              style={{
                color: '#146448',
                fontSize: '36px',
                fontWeight: '600',
                fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
              }}
            >
              60 Saniyede Elde edeceğiniz Analizler
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#146448' }}>
                  <span style={{ color: '#baf200', fontSize: '20px' }}>📊</span>
                </div>
                <h3
                  className="mb-3"
                  style={{
                    color: '#146448',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  ROI Analizi
                </h3>
                <p
                  className="mb-3"
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Ürün, verim, fiyat ve maliyetlere göre geri dönüş hesaplar; duyarlılık senaryoları sunar.
                </p>
                <p
                  style={{
                    color: '#666',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Teknik: Nakit akışı, IRR, geri ödeme süreleri otomatik.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#146448' }}>
                  <span style={{ color: '#baf200', fontSize: '20px' }}>🌡️</span>
                </div>
                <h3
                  className="mb-3"
                  style={{
                    color: '#146448',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  İklim Riski
                </h3>
                <p
                  className="mb-3"
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Isıtma/soğutma yükü ve risk skoru çıkarır; lokasyona özel enerji profili verir.
                </p>
                <p
                  style={{
                    color: '#666',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Teknik: Meteo verisi + derece-gün modeli.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#146448' }}>
                  <span style={{ color: '#baf200', fontSize: '20px' }}>⚙️</span>
                </div>
                <h3
                  className="mb-3"
                  style={{
                    color: '#146448',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Ekipman Listesi
                </h3>
                <p
                  className="mb-3"
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Uygun kapasitede komponent önerir; tedarik ve bakım planını oluşturur.
                </p>
                <p
                  style={{
                    color: '#666',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Teknik: BOM, güç/su/ısıtma eşlemesi.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#146448' }}>
                  <span style={{ color: '#baf200', fontSize: '20px' }}>📈</span>
                </div>
                <h3
                  className="mb-3"
                  style={{
                    color: '#146448',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Pazar Verisi
                </h3>
                <p
                  className="mb-3"
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Bölgesel fiyat bandı ve talep projeksiyonu sağlar; rekabet yoğunluğunu gösterir.
                </p>
                <p
                  style={{
                    color: '#666',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Teknik: Zaman serisi + sezonluk endeks.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#146448' }}>
                  <span style={{ color: '#baf200', fontSize: '20px' }}>📄</span>
                </div>
                <h3
                  className="mb-3"
                  style={{
                    color: '#146448',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  PDF & Paylaşım
                </h3>
                <p
                  className="mb-3"
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Tek tıkla PDF download; ekip ile paylaşım ve sürüm takibi yapın.
                </p>
                <p
                  style={{
                    color: '#666',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Teknik: Zaman damgalı, sürüm numaralı raporlar.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#146448' }}>
                  <span style={{ color: '#baf200', fontSize: '20px' }}>🔄</span>
                </div>
                <h3
                  className="mb-3"
                  style={{
                    color: '#146448',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  API Simülasyon
                </h3>
                <p
                  className="mb-3"
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Değişkenleri toplu simüle edin; yinelemeli optimizasyon yapın.
                </p>
                <p
                  style={{
                    color: '#666',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Teknik: REST API + batch senaryo koşturma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kurumsal Proje Danışmanlığı Section */}
      <section className="py-16">
        <div className="max-w-[1700px] mx-auto px-6">
          <div className="max-w-[896px] mx-auto">
            <h2
              className="text-center mb-12"
              style={{
                color: '#f6f8f9',
                fontSize: '36px',
                fontWeight: '600',
                fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
              }}
            >
              Kurumsal Proje Danışmanlığı
            </h2>

            <div className="space-y-8">
              {/* Fizibilite Analizi */}
              <div className="bg-white/5 rounded-xl p-8 border border-white/20">
                <h3
                  className="mb-4"
                  style={{
                    color: '#baf200',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Fizibilite Analizi
                </h3>
                <p
                  className="mb-4"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Konum, ürün, iklim ve pazar verilerini birleştirerek sera fizibilitesi oluşturuyoruz. CAPEX/OPEX ön tahminleri, ROI analizi, geri ödeme aralığı ve duyarlılık testleri (fiyat, verim, enerji) ile yatırım kararınızı teknik temelde güçlendiriyoruz. KPI ölçümleri arasında: enerji maliyetinde %10–22 azalma, yıllık üretim miktarında artış ve karbon ayak izinde azalma yer alır.
                </p>
              </div>

              {/* Tasarım & Planlama */}
              <div className="bg-white/5 rounded-xl p-8 border border-white/20">
                <h3
                  className="mb-4"
                  style={{
                    color: '#baf200',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Tasarım & Planlama
                </h3>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Yapısal tasarım, iklimlendirme kapasitesi, sulama-gübreleme ve enerji mimarisi belirlenir. Yerleşim planı, iş akışları ve kritik yol yöntemi (CPM) ile proje zaman çizelgesi hazırlanır. Bu aşamada, kalite kontrol noktaları ve süreç uyum analizleri uygulanır.
                </p>
              </div>

              {/* Tedarik & Ekipman Seçimi */}
              <div className="bg-white/5 rounded-xl p-8 border border-white/20">
                <h3
                  className="mb-4"
                  style={{
                    color: '#baf200',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Tedarik & Ekipman Seçimi
                </h3>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Teknik şartnameler ve tedarikçi kısa listesi hazırlanır. Ekipman, otomasyon ve enerji çözümlerinde yaşam döngüsü maliyeti ve yedek parça sürekliliği dikkate alınır. SAP/ERP entegrasyonu ve süreç içinde denetim raporlaması mümkündür.
                </p>
              </div>

              {/* Kurulum Süreci Yönetimi */}
              <div className="bg-white/5 rounded-xl p-8 border border-white/20">
                <h3
                  className="mb-4"
                  style={{
                    color: '#baf200',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Kurulum Süreci Yönetimi
                </h3>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Saha hazırlığı, inşaat ve montajın kalite, zaman ve bütçe hedefleriyle uyumu sağlanır. İş sağlığı ve güvenliği, çevre ve gıda güvenliği gereksinimleri takip edilir. Süreç sonunda, proje teslim oranı ve kalite denetim başarısı gibi KPI'lar izlenir.
                </p>
              </div>

              {/* Operasyon ve KPI Takibi */}
              <div className="bg-white/5 rounded-xl p-8 border border-white/20">
                <h3
                  className="mb-4"
                  style={{
                    color: '#baf200',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Operasyon ve KPI Takibi
                </h3>
                <p
                  className="mb-4"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Üretim verimi, enerji yoğunluğu (kWh/kg), su kullanımı, fire oranı ve teslimat performansı düzenli olarak izlenir ve üst yönetime özetlenmiş performans raporları sunulur. Performans ölçümü ve sürekli iyileştirme döngüsü sağlanır.
                </p>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Faydalar arasında ölçülebilir tasarruf, doğru pazar seçimi, yatırım risklerinin azaltılması ve kısa geri ödeme süresi yer alır. Örnek proje sonuçları: enerji maliyetinde %10–22 azalma, iş gücü verimliliğinde %8–15 artış, gelirde %7–18 artış. Geri dönütler proje ve lokasyona göre fizibilite çalışmasında netleştirilir.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/danismanlik"
                className="px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#baf200',
                  color: '#146448',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Görüşme Planla
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Anahtar Teslim Sera Kurulumu Section */}
      <section className="py-16" style={{ backgroundColor: '#f6f8f9' }}>
        <div className="max-w-[1700px] mx-auto px-6">
          <div className="max-w-[896px] mx-auto">
            <h2
              className="text-center mb-8"
              style={{
                color: '#146448',
                fontSize: '36px',
                fontWeight: '600',
                fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
              }}
            >
              Anahtar Teslim Sera Kurulumu
            </h2>

            <div className="max-w-[576px] mx-auto mb-8">
              <p
                className="text-center mb-6"
                style={{
                  color: '#146448',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Anahtar teslim sera projelerinde sürecin tüm adımları mühendislik yaklaşımıyla yönetilir: statik, mekanik, elektrik ve hidrolik projeler; ısıtma-soğutma yükleri, debi ve enerji hesapları BIM tabanlı çizimlerle sunulur.
              </p>
              <p
                className="text-center mb-8"
                style={{
                  color: '#146448',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Ekipman seçimi, tedarik ve entegrasyon sürecinde; cam/kaplama, ısıtma kazanları, iklimlendirme, sulama-fertilizasyon, otomasyon sistemleri, enerji ve aydınlatma komponentleri ile tam kapsamlı çözüm sağlanır. İnşaat, montaj ve devreye alma aşamalarında saha yerleşim planları, kalite güvenceli fonksiyon testleri ve otomasyon (SCADA/BMS) entegrasyonu eksiksiz şekilde gerçekleştirilir.
              </p>
              <p
                className="text-center mb-8"
                style={{
                  color: '#146448',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Tasarım seçenekleri arasında cam sera, polikarbon sera, yüksek tünel ve dikey sistemler yer alır. Proje hedefleri ve lokasyon koşullarına göre statik optimizasyon, enerji verimliliği ve sürdürülebilirlik gözetilir.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3
                  className="mb-4"
                  style={{
                    color: '#146448',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Maliyet ve Yatırım Döngüsü
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4
                      style={{
                        color: '#146448',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      CAPEX
                    </h4>
                    <p
                      style={{
                        color: '#666',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Konstrüksiyon, kaplama, iklimlendirme, otomasyon, altyapı, enerji ve su sistemleri detaylanır.
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        color: '#146448',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      OPEX
                    </h4>
                    <p
                      style={{
                        color: '#666',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Yıllık enerji (kWh/m²), su, iş gücü, bakım ve sarf malzemeleri kalem kalem raporlanır.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3
                  className="mb-4"
                  style={{
                    color: '#146448',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Finansal Model
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4
                      style={{
                        color: '#146448',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Geri ödeme aralığı
                    </h4>
                    <p
                      style={{
                        color: '#666',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      24–48 ay; ürün karması, iklim, pazar ve tarife değişkenlerine göre hesaplanır.
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        color: '#146448',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Analiz
                    </h4>
                    <p
                      style={{
                        color: '#666',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Nakit akışı, IRR ve NPV analizleri ile yatırımın tüm aşamaları öngörülebilir hale getirilir.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h3
                className="mb-4 text-center"
                style={{
                  color: '#146448',
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Teslimat Kapsamı
              </h3>
              <p
                className="text-center"
                style={{
                  color: '#146448',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Uygulamaya hazır çizimler, onaylı sözleşme dokümanları, kurulum süpervizörlüğü, devreye alma, eğitim ve bakım planı dahil edilir. %99 sistem kullanılabilirliği hedeflenir; yedeklilik, periyodik bakım ve hızlı yedek parça tedariği sağlanır.
              </p>
            </div>

            <div className="text-center">
              <Link
                href="/anahtar-teslim-proje"
                className="px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#baf200',
                  color: '#146448',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Teklif İste
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SSS Section */}
      <section className="py-16">
        <div className="max-w-[1700px] mx-auto px-6">
          <div className="max-w-[896px] mx-auto">
            <h2
              className="text-center mb-12"
              style={{
                color: '#f6f8f9',
                fontSize: '36px',
                fontWeight: '600',
                fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
              }}
            >
              Sıkça Sorulan Sorular
            </h2>

            <div className="space-y-4">
              {[
                {
                  question: "Raporlar ne kadar doğru?",
                  answer: "Veri tabanı ve kurallar setiyle üretilir; isterseniz mühendis kontrolü ile teknik doğrulama sağlanır."
                },
                {
                  question: "Veriler nereden geliyor?",
                  answer: "Meteoroloji, enerji tarifeleri, pazar fiyatları ve resmi istatistikler; çoklu kaynak birleştirme ve kalite kontrolleri."
                },
                {
                  question: "5 ücretsiz token nasıl çalışır?",
                  answer: "Hesap açınca 5 ücretsiz token tanımlanır; her rapor 1 token düşer; kullanılmayanlar 12 ay geçerlidir."
                },
                {
                  question: "Ücret ve iade koşulları nedir?",
                  answer: "Ücretli paketlerde kullanılmamış tokenlar 7 gün içinde iade edilir; kullanılan raporlar iade edilmez."
                },
                {
                  question: "PDF formatı ve içerik kapsamı?",
                  answer: "PDF download mühendis formatındadır; ROI analizi, iklim analizi, ekipman listesi, pazar ve yerleşim önerileri içerir."
                },
                {
                  question: "API erişimi var mı?",
                  answer: "Evet; senaryo simülasyonları ve rapor tetikleme için REST API sunuyoruz; anahtar ile güvenli erişim."
                },
                {
                  question: "Danışmanlık kapsamınız nedir?",
                  answer: "Fizibilite→tasarım→tedarik→kurulum→operasyon; KPI, bütçe ve uyum raporlamasıyla uçtan uca yönetim."
                },
                {
                  question: "Teslim süreleri?",
                  answer: "Standart rapor 60 saniye; kurumsal fizibilite 10 iş günü; anahtar teslim teklif paketi 2–4 hafta."
                },
                {
                  question: "Güvenlik ve uyum?",
                  answer: "Veriler şifreli saklanır; erişim rol bazlıdır; üçüncü kişilerle paylaşılmaz; denetim izi tutulur."
                },
                {
                  question: "Turnkey greenhouse projelerinde risk yönetimi?",
                  answer: "Finansal, iklim ve tedarik riskleri için senaryolar; sözleşmesel risk dağıtımı ve uyum kontrolleri."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white/5 rounded-xl border border-white/20">
                  <button
                    className="w-full text-left p-6 flex justify-between items-center"
                    onClick={() => toggleFaq(index)}
                  >
                    <span style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      {faq.question}
                    </span>
                    <svg 
                      className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                      style={{ color: '#baf200' }} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="max-w-[1700px] mx-auto px-6">
          <div className="max-w-[896px] mx-auto text-center">
            <div className="max-w-[576px] mx-auto mb-8">
              <h2
                className="text-center mb-8"
                style={{
                  color: '#f6f8f9',
                  fontSize: '36px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Hemen Analiz Oluştur
              </h2>
              
              <p
                className="leading-relaxed text-center mb-8"
                style={{
                  color: '#f6f8f9',
                  fontSize: '16px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Vizyonunuza ve azminize hayranız. Sera yatırımlarınızı ölçülebilir, veriye dayalı kararlara dönüştürelim.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/login"
                className="px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#baf200',
                  color: '#146448',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Ücretsiz Rapor Al
              </Link>
              <Link
                href="/danismanlik"
                className="px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: 'transparent',
                  color: '#f6f8f9',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '2px solid #baf200',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Danışmanla Görüş
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
