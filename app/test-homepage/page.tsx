'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestHomepage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');

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
                60 Saniyede Sera Yatırım Raporu
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
                SeraGPT, lokasyona özel ve AI destekli analizle 60 saniyede yatırım fizibilitesi oluşturur. 5 ücretsiz token ile başlayın; her rapor 1 token. PDF indir seçeneği ve mühendis kontrolü opsiyonu dahildir.
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
              className="text-center mb-12"
              style={{
                color: '#f6f8f9',
                fontSize: '36px',
                fontWeight: '600',
                fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
              }}
            >
              Nasıl Çalışır
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#baf200' }}>
                  <span style={{ color: '#146448', fontSize: '24px', fontWeight: '600' }}>1</span>
                </div>
                <h3
                  className="mb-4"
                  style={{
                    color: '#baf200',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Lokasyon & Ürün
                </h3>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  İl/ilçe, hedef ürün ve pazar bilgilerini girin; sistem lokasyona özel parametreleri çeker.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#baf200' }}>
                  <span style={{ color: '#146448', fontSize: '24px', fontWeight: '600' }}>2</span>
                </div>
                <h3
                  className="mb-4"
                  style={{
                    color: '#baf200',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  AI Analiz
                </h3>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  ROI analizi, iklim analizi, ekipman ve pazar verilerini birleştirerek senaryo bazlı sonuç üretir.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#baf200' }}>
                  <span style={{ color: '#146448', fontSize: '24px', fontWeight: '600' }}>3</span>
                </div>
                <h3
                  className="mb-4"
                  style={{
                    color: '#baf200',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  PDF İndir
                </h3>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Mühendis formatında raporu PDF indir, isterseniz mühendis kontrolü ile detay doğrulaması alın.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Özellikler Section */}
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
              Öne Çıkan Özellikler
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

      {/* Kurumsal Danışmanlık Section */}
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
              Kurumsal Danışmanlık
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white/5 rounded-xl p-6 border border-white/20">
                <h3
                  className="mb-4"
                  style={{
                    color: '#baf200',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Fizibilite
                </h3>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Saha, iklim ve finans göstergeleriyle sera fizibilite ve risk çerçevesi; ölçülebilir KPI seti.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/20">
                <h3
                  className="mb-4"
                  style={{
                    color: '#baf200',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Ölçekleme
                </h3>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Çok lokasyonlu kapasite planı, tedarik stratejisi ve ROI artırıcı yol haritası.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/20">
                <h3
                  className="mb-4"
                  style={{
                    color: '#baf200',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Yönetişim
                </h3>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Bütçe, zaman çizelgesi, kalite ve uyum raporlaması; kurumsal standartlarla entegrasyon.
                </p>
              </div>
            </div>

            <div className="text-center">
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

      {/* Anahtar Teslim Proje Section */}
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
              Anahtar Teslim Proje
            </h2>

            <div className="max-w-[576px] mx-auto mb-8">
              <p
                className="text-center"
                style={{
                  color: '#146448',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                CAPEX/OPEX kırılımı, nakit akışı ve 24–48 ay geri ödeme aralığı; cam, polikarbon, yüksek tünel ve dikey tasarım tipleri. Uygulanabilir çizimler, sözleşme paketleri ve saha kurulumu dahildir.
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

      {/* Dashboard Tanıtım Section */}
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
              Dashboard Tanıtım
            </h2>

            <div className="max-w-[576px] mx-auto mb-8">
              <p
                className="text-center mb-6"
                style={{
                  color: '#f6f8f9',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Tüm sera yatırımı analizlerinizi tek bir panelde yönetin. Lokasyona özel sonuçları karşılaştırın, raporları sürümleyin ve süreç KPI'larını izleyin. Sera danışmanlığı ekipleriniz için erişim ve yetki yönetimi hazır.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#baf200' }}>
                  <span style={{ color: '#146448', fontSize: '20px' }}>📊</span>
                </div>
                <h3
                  className="mb-2"
                  style={{
                    color: '#baf200',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Analiz geçmişi
                </h3>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Senaryoları zaman içinde karşılaştırma
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#baf200' }}>
                  <span style={{ color: '#146448', fontSize: '20px' }}>📄</span>
                </div>
                <h3
                  className="mb-2"
                  style={{
                    color: '#baf200',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Rapor merkezi
                </h3>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  PDF indir, sürüm ve paylaşım kontrolü
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#baf200' }}>
                  <span style={{ color: '#146448', fontSize: '20px' }}>👥</span>
                </div>
                <h3
                  className="mb-2"
                  style={{
                    color: '#baf200',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Ekip erişimi
                </h3>
                <p
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Rol bazlı yetki ve denetim izi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Güven Unsurları Section */}
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
              Güven Unsurları
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#146448' }}>
                    <span style={{ color: '#baf200', fontSize: '20px' }}>👨‍💼</span>
                  </div>
                  <div>
                    <div style={{ color: '#666', fontSize: '12px', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      Operasyon Direktörü
                    </div>
                  </div>
                </div>
                <blockquote
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontStyle: 'italic',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  "SeraGPT ile 3 lokasyonda OPEX'i %14 azalttık; geri ödeme 6 ay kısaldı."
                </blockquote>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#146448' }}>
                    <span style={{ color: '#baf200', fontSize: '20px' }}>💼</span>
                  </div>
                  <div>
                    <div style={{ color: '#666', fontSize: '12px', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      Yatırım Komitesi Üyesi
                    </div>
                  </div>
                </div>
                <blockquote
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontStyle: 'italic',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  "Yeni tesis için iklim analizi ve ROI senaryoları karar süremizi yarıya indirdi."
                </blockquote>
              </div>
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
                    onClick={() => {
                      const content = document.getElementById(`faq-${index}`);
                      const arrow = document.getElementById(`arrow-${index}`);
                      if (content && arrow) {
                        if (content.style.display === 'none' || !content.style.display) {
                          content.style.display = 'block';
                          arrow.style.transform = 'rotate(180deg)';
                        } else {
                          content.style.display = 'none';
                          arrow.style.transform = 'rotate(0deg)';
                        }
                      }
                    }}
                  >
                    <span style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      {faq.question}
                    </span>
                    <svg id={`arrow-${index}`} className="w-5 h-5 transition-transform" style={{ color: '#baf200' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div id={`faq-${index}`} style={{ display: 'none' }} className="px-6 pb-6">
                    <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      {faq.answer}
                    </p>
                  </div>
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
                className="leading-tight text-center mb-8"
                style={{
                  color: '#f6f8f9',
                  fontSize: '36px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Vizyonunuza ve Azminize Hayranız.
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
                Sera yatırımlarınızı ölçülebilir, veriye dayalı kararlara dönüştürelim.
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
