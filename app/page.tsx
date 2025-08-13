'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
// import Footer from '../components/Footer';

export default function Homepage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgba(20, 100, 72, 1)' }}>
      <Header />
      
      <div>
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
                  SeraGPT, kurumsal yatırımcılardan mevcut sera sahiplerine ve yeni girişimcilere kadar her kullanıcı için kişiselleştirilmiş bir başlangıç noktası sunar.
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

        {/* Nasıl Çalışır Introduction */}
        <section style={{ padding: '30px 0' }}>
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

              <div className="max-w-[576px] mx-auto mb-16">
                <p
                  className="text-center"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '16px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  SeraGPT, kurumsal yatırımcılardan mevcut sera sahiplerine
                  ve yeni girişimcilere kadar her kullanıcı için
                  kişiselleştirilmiş bir başlangıç noktası sunar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 relative">
          <div className="max-w-[1700px] mx-auto px-6">
            {/* Timeline Line - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent h-full"></div>

            <div className="relative">
              {/* Timeline Item 1 - Left Side */}
              <div className="flex flex-col md:flex-row md:items-center mb-16">
                <div className="w-full md:w-1/2 md:pr-8 mb-6 md:mb-0">
                  <div className="bg-white/5 rounded-xl p-8 border border-white/20 relative">
                    {/* Arrow pointing to timeline - Hidden on mobile */}
                    <div className="hidden md:block absolute top-8 -right-4 w-0 h-0 border-l-[16px] border-l-white/20 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent"></div>
                    
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#baf200' }}>
                        <span style={{ color: '#146448', fontSize: '20px', fontWeight: '600' }}>1</span>
                      </div>
                      <h3
                        style={{
                          color: '#baf200',
                          fontSize: '20px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Verilerinizi ve Lokasyonunuzu Bağlayın
                      </h3>
                    </div>
                    
                    <p
                      className="mb-6"
                      style={{
                        color: '#f6f8f9',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Doğru karar almak için doğru verilere ihtiyaç vardır. SeraGPT, gerekli verilere erişimleri sağlamak için 50'den fazla API entegrasyonu kullanır.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                        <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                          <strong>Meteomatics / Open-Meteo:</strong> Bölgenize özel iklim verileri
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                        <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                          <strong>FAO / USDA Data:</strong> Küresel tarımsal üretim istatistikleri
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                        <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                          <strong>Google Maps / GIS:</strong> Arazi yapısı ve lojistik analizleri
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Node - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white/20" style={{ backgroundColor: '#baf200' }}></div>

                {/* Visual Area - Right Side */}
                <div className="w-full md:w-1/2 md:pl-8">
                  <div className="bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-xl p-8 border border-white/10 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#baf200' }}>
                        <span style={{ color: '#146448', fontSize: '24px' }}>🌐</span>
                      </div>
                      <h4
                        style={{
                          color: '#f6f8f9',
                          fontSize: '16px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        50+ API Entegrasyonu
                      </h4>
                      <p
                        style={{
                          color: '#f6f8f9',
                          fontSize: '12px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Gerçek zamanlı veriler
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 - Right Side */}
              <div className="flex flex-col md:flex-row md:items-center mb-16">
                {/* Visual Area - Left Side */}
                <div className="w-full md:w-1/2 md:pr-8 mb-6 md:mb-0 md:order-1 order-2">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-8 border border-white/10 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#baf200' }}>
                        <span style={{ color: '#146448', fontSize: '24px' }}>⚡</span>
                      </div>
                      <h4
                        style={{
                          color: '#f6f8f9',
                          fontSize: '16px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        60 Saniye Analiz
                      </h4>
                      <p
                        style={{
                          color: '#f6f8f9',
                          fontSize: '12px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        AI ile hızlı sonuçlar
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Node - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white/20" style={{ backgroundColor: '#baf200' }}></div>

                <div className="w-full md:w-1/2 md:pl-8 mb-6 md:mb-0 md:order-2 order-1">
                  <div className="bg-white/5 rounded-xl p-8 border border-white/20 relative">
                    {/* Arrow pointing to timeline - Hidden on mobile */}
                    <div className="hidden md:block absolute top-8 -left-4 w-0 h-0 border-r-[16px] border-r-white/20 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent"></div>

                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#baf200' }}>
                        <span style={{ color: '#146448', fontSize: '20px', fontWeight: '600' }}>2</span>
                      </div>
                      <h3
                        style={{
                          color: '#baf200',
                          fontSize: '20px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        60 Saniyede Elde edeceğiniz Analizler
                      </h3>
                    </div>
                    
                    <p
                      className="mb-6"
                      style={{
                        color: '#f6f8f9',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      SeraGPT, gelişmiş yapay zeka modelleri kullanarak yatırımınız hakkında ayrıntılı analiz ve raporlar sunar:
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span style={{ color: '#baf200', fontSize: '16px' }}>📊</span>
                          <span style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '500', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>ROI Analizi</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span style={{ color: '#baf200', fontSize: '16px' }}>🌡️</span>
                          <span style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '500', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>İklim Riski</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span style={{ color: '#baf200', fontSize: '16px' }}>⚙️</span>
                          <span style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '500', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>Ekipman Listesi</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span style={{ color: '#baf200', fontSize: '16px' }}>📈</span>
                          <span style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '500', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>Pazar Verisi</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span style={{ color: '#baf200', fontSize: '16px' }}>📄</span>
                          <span style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '500', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>PDF & Paylaşım</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span style={{ color: '#baf200', fontSize: '16px' }}>🔄</span>
                          <span style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '500', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>API Simülasyon</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 - Left Side */}
              <div className="flex flex-col md:flex-row md:items-center mb-16">
                <div className="w-full md:w-1/2 md:pr-8 mb-6 md:mb-0">
                  <div className="bg-white/5 rounded-xl p-8 border border-white/20 relative">
                    <div className="hidden md:block absolute top-8 -right-4 w-0 h-0 border-l-[16px] border-l-white/20 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent"></div>

                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#baf200' }}>
                        <span style={{ color: '#146448', fontSize: '20px', fontWeight: '600' }}>3</span>
                      </div>
                      <h3
                        style={{
                          color: '#baf200',
                          fontSize: '20px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Ücretsiz Tarımsal AI Asistanı
                      </h3>
                    </div>
                    
                    <p
                      className="mb-6"
                      style={{
                        color: '#f6f8f9',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      SeraGPT'nin ücretsiz AI asistanı, kullanıcılarına analiz ve raporlama sürecinde rehberlik eder:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                        <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                          Analiz sonuçlarınızı anında paylaşır ve detaylandırır
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                        <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                          Senaryolar üzerinde değişiklik yapmanıza olanak tanır
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                        <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                          Sınırsız ve ücretsiz hizmet sunar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Node - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white/20" style={{ backgroundColor: '#baf200' }}></div>

                {/* Visual Area - Right Side */}
                <div className="w-full md:w-1/2 md:pl-8">
                  <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-8 border border-white/10 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#baf200' }}>
                        <span style={{ color: '#146448', fontSize: '24px' }}>🤖</span>
                      </div>
                      <h4
                        style={{
                          color: '#f6f8f9',
                          fontSize: '16px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        AI Asistan Chat
                      </h4>
                      <p
                        style={{
                          color: '#f6f8f9',
                          fontSize: '12px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        7/24 sınırsız destek
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 4A - Right Side */}
              <div className="flex flex-col md:flex-row md:items-center mb-16">
                {/* Visual Area - Left Side */}
                <div className="w-full md:w-1/2 md:pr-8 mb-6 md:mb-0 md:order-1 order-2">
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-8 border border-white/10 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#baf200' }}>
                        <span style={{ color: '#146448', fontSize: '24px' }}>📋</span>
                      </div>
                      <h4
                        style={{
                          color: '#f6f8f9',
                          fontSize: '16px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Proje Danışmanlığı
                      </h4>
                      <p
                        style={{
                          color: '#f6f8f9',
                          fontSize: '12px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Fizibilite → Kurulum
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Node - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white/20" style={{ backgroundColor: '#baf200' }}></div>

                <div className="w-full md:w-1/2 md:pl-8 mb-6 md:mb-0 md:order-2 order-1">
                  <div className="bg-white/5 rounded-xl p-8 border border-white/20 relative">
                    <div className="hidden md:block absolute top-8 -left-4 w-0 h-0 border-r-[16px] border-r-white/20 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent"></div>

                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#baf200' }}>
                        <span style={{ color: '#146448', fontSize: '16px', fontWeight: '600' }}>4A</span>
                      </div>
                      <h3
                        style={{
                          color: '#baf200',
                          fontSize: '20px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Kurumsal Proje Danışmanlığı
                      </h3>
                    </div>
                    
                    <p
                      className="mb-6"
                      style={{
                        color: '#f6f8f9',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Fizibilite analizi, tasarım, tedarik, kurulum ve operasyon takibi ile uçtan uca yönetim hizmeti.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                        <span style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                          Enerji maliyetinde %10–22 azalma
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                        <span style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                          İş gücü verimliliğinde %8–15 artış
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                        <span style={{ color: '#f6f8f9', fontSize: '12px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                          Gelirde %7–18 artış
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-6" style={{ display: 'flex', flexDirection: 'column' }}>
                      <Link
                        href="/danismanlik"
                        className="px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90"
                        style={{
                          backgroundColor: '#baf200',
                          color: '#146448',
                          fontSize: '14px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif',
                          marginRight: 'auto'
                        }}
                      >
                        <p>Paketleri İncele</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 4B - Left Side */}
              <div className="flex flex-col md:flex-row md:items-center mb-16">
                <div className="w-full md:w-1/2 md:pr-8 mb-6 md:mb-0">
                  <div className="bg-white/5 rounded-xl p-8 border border-white/20 relative">
                    <div className="hidden md:block absolute top-8 -right-4 w-0 h-0 border-l-[16px] border-l-white/20 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent"></div>

                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#baf200' }}>
                        <span style={{ color: '#146448', fontSize: '16px', fontWeight: '600' }}>4B</span>
                      </div>
                      <h3
                        style={{
                          color: '#baf200',
                          fontSize: '20px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Anahtar Teslim Sera Kurulumu
                      </h3>
                    </div>
                    
                    <p
                      className="mb-6"
                      style={{
                        color: '#f6f8f9',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Mühendislik yaklaşımıyla statik, mekanik, elektrik projeler ve tam kapsamlı kurulum hizmeti.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4
                          style={{
                            color: '#baf200',
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                          }}
                        >
                          CAPEX/OPEX
                        </h4>
                        <p
                          style={{
                            color: '#f6f8f9',
                            fontSize: '12px',
                            fontWeight: '400',
                            fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                          }}
                        >
                          Şeffaf maliyet analizi
                        </p>
                      </div>
                      <div>
                        <h4
                          style={{
                            color: '#baf200',
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                          }}
                        >
                          24–48 Ay
                        </h4>
                        <p
                          style={{
                            color: '#f6f8f9',
                            fontSize: '12px',
                            fontWeight: '400',
                            fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                          }}
                        >
                          Geri ödeme aralığı
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <Link
                        href="/anahtar-teslim-proje"
                        className="px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90"
                        style={{
                          backgroundColor: '#baf200',
                          color: '#146448',
                          fontSize: '14px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Teklif İste
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Node - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white/20" style={{ backgroundColor: '#baf200' }}></div>

                {/* Visual Area - Right Side */}
                <div className="w-full md:w-1/2 md:pl-8">
                  <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-8 border border-white/10 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#baf200' }}>
                        <span style={{ color: '#146448', fontSize: '24px' }}>🏗️</span>
                      </div>
                      <h4
                        style={{
                          color: '#f6f8f9',
                          fontSize: '16px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Anahtar Teslim
                      </h4>
                      <p
                        style={{
                          color: '#f6f8f9',
                          fontSize: '12px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        %99 sistem kullanılabilirliği
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SSS Section */}
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
                  <div key={index} className="bg-white rounded-xl border border-gray-200">
                    <button
                      className="w-full text-left p-6 flex justify-between items-center"
                      onClick={() => toggleFaq(index)}
                    >
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
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
                        <p style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
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

      {/* <Footer /> */}
    </div>
  );
}
