'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AnahtarTeslimPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    location: '',
    size: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quoteId = `ATS-${Date.now()}`;
    alert(`Teklif talebiniz alındı!\nTeklif No: ${quoteId}\n\nUzman ekibimiz 48 saat içinde detaylı teklif ile size dönüş yapacaktır.`);
    setShowQuoteModal(false);
    setFormData({ name: '', email: '', phone: '', company: '', projectType: '', location: '', size: '', budget: '', timeline: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div style={{ backgroundColor: '#146448' }}>
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
                  Anahtar Teslim Sera Kurulumu
                </h1>
              </div>

              <div className="max-w-[576px] mx-auto mb-12">
                <p
                  className="leading-relaxed text-center"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Anahtar teslim sera projelerinde sürecin tüm adımları mühendislik yaklaşımıyla yönetilir: statik, mekanik, elektrik ve hidrolik projeler; ısıtma-soğutma yükleri, debi ve enerji hesapları BIM tabanlı çizimlerle sunulur.
                </p>
              </div>

              <button
                onClick={() => setShowQuoteModal(true)}
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
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <main className="py-16" style={{ backgroundColor: '#f6f8f9' }}>
        <div className="max-w-[1700px] mx-auto px-6">
          {/* Service Overview */}
          <div className="max-w-[896px] mx-auto mb-16">
            <h2
              className="text-center mb-12"
              style={{
                color: '#146448',
                fontSize: '36px',
                fontWeight: '600',
                fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
              }}
            >
              Tam Kapsamlı Çözüm
            </h2>

            <div className="bg-white rounded-xl p-8 border border-gray-200 mb-8">
              <div className="max-w-[576px] mx-auto">
                <p
                  className="text-center mb-6"
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Ekipman seçimi, tedarik ve entegrasyon sürecinde; cam/kaplama, ısıtma kazanları, iklimlendirme, sulama-fertilizasyon, otomasyon sistemleri, enerji ve aydınlatma komponentleri ile tam kapsamlı çözüm sağlanır.
                </p>
                
                <p
                  className="text-center"
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  İnşaat, montaj ve devreye alma aşamalarında saha yerleşim planları, kalite güvenceli fonksiyon testleri ve otomasyon (SCADA/BMS) entegrasyonu eksiksiz şekilde gerçekleştirilir.
                </p>
              </div>
            </div>

            {/* Design Options */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="text-3xl mb-4">🏗️</div>
                <h3
                  style={{
                    color: '#146448',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                  className="mb-2"
                >
                  Cam Sera
                </h3>
                <p
                  style={{
                    color: '#146448',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Yüksek kalite ve dayanıklılık
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="text-3xl mb-4">🔧</div>
                <h3
                  style={{
                    color: '#146448',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                  className="mb-2"
                >
                  Polikarbon Sera
                </h3>
                <p
                  style={{
                    color: '#146448',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Enerji verimliliği odaklı
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="text-3xl mb-4">🌱</div>
                <h3
                  style={{
                    color: '#146448',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                  className="mb-2"
                >
                  Yüksek Tünel
                </h3>
                <p
                  style={{
                    color: '#146448',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Maliyet etkin çözümler
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="text-3xl mb-4">🏭</div>
                <h3
                  style={{
                    color: '#146448',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                  className="mb-2"
                >
                  Dikey Sistemler
                </h3>
                <p
                  style={{
                    color: '#146448',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Teknoloji odaklı üretim
                </p>
              </div>
            </div>
          </div>

          {/* Financial Analysis */}
          <div className="max-w-[896px] mx-auto mb-16">
            <h2
              className="text-center mb-8"
              style={{
                color: '#146448',
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
              }}
            >
              Maliyet ve Yatırım Döngüsü
            </h2>

            <div className="bg-white rounded-xl p-8 border border-gray-200 mb-8">
              <div className="max-w-[576px] mx-auto text-center mb-8">
                <p
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Maliyet ve yatırım döngüsü şeffaf bir şekilde sunulur
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                    className="mb-4"
                  >
                    CAPEX - Yatırım Maliyetleri:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Konstrüksiyon
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Kaplama
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        İklimlendirme
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Otomasyon
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Altyapı, enerji ve su sistemleri
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                    className="mb-4"
                  >
                    OPEX - İşletme Maliyetleri:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Yıllık enerji (kWh/m²)
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Su
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        İş gücü
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Bakım
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Sarf malzemeleri
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3
                  style={{
                    color: '#146448',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                  className="mb-4"
                >
                  Geri Ödeme Aralığı
                </h3>
                <div className="text-center">
                  <div
                    style={{
                      color: '#baf200',
                      fontSize: '36px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                    className="mb-2"
                  >
                    24–48 Ay
                  </div>
                  <p
                    style={{
                      color: '#146448',
                      fontSize: '12px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Ürün karması, iklim, pazar ve tarife değişkenlerine göre hesaplanır
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3
                  style={{
                    color: '#146448',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                  className="mb-4"
                >
                  Finansal Model
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>📊</span>
                    <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      Nakit akışı
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>📈</span>
                    <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      IRR ve NPV analizleri
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span style={{ color: '#baf200', fontSize: '14px' }}>🔮</span>
                    <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                      Öngörülebilir yatırım aşamaları
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Scope */}
          <div className="max-w-[896px] mx-auto mb-16">
            <h2
              className="text-center mb-8"
              style={{
                color: '#146448',
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
              }}
            >
              Teslimat Kapsamı
            </h2>

            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="max-w-[576px] mx-auto text-center mb-8">
                <p
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Teslimat kapsamında, uygulamaya hazır çizimler, onaylı sözleşme dokümanları, kurulum süpervizörlüğü, devreye alma, eğitim ve bakım planı dahil edilir.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                    className="mb-4"
                  >
                    Teknik Dokümanlar:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Uygulamaya hazır çizimler
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Onaylı sözleşme dokümanları
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Bakım planı
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                    className="mb-4"
                  >
                    Kurulum ve Destek:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Kurulum süpervizörlüğü
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Devreye alma
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Eğitim
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '20px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                    className="mb-2"
                  >
                    %99 Sistem Kullanılabilirliği
                  </h3>
                  <p
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Yedeklilik, periyodik bakım ve hızlı yedek parça tedariği ile garanti edilir.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-[576px] mx-auto text-center">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3
                className="mb-6"
                style={{
                  color: '#146448',
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Projenizi Hayata Geçirelim
              </h3>
              
              <button
                onClick={() => setShowQuoteModal(true)}
                className="px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#146448',
                  color: '#f6f8f9',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Teklif İste
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation to Other Pages */}
      <section className="py-16" style={{ backgroundColor: '#146448' }}>
        <div className="max-w-[896px] mx-auto px-6">
          <h2
            className="text-center mb-8"
            style={{
              color: '#f6f8f9',
              fontSize: '20px',
              fontWeight: '600',
              fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
            }}
          >
            Diğer Hizmetlerimiz
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/danismanlik" className="block">
              <div className="bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group">
                <div className="text-center">
                  <div className="text-3xl mb-4">👨‍🔬</div>
                  <h3
                    className="mb-2 group-hover:text-[#baf200] transition-colors"
                    style={{
                      color: '#f6f8f9',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Proje Danışmanlığı
                  </h3>
                  <p
                    style={{
                      color: '#f6f8f9',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Fizibilite → tasarım → kurulum süreç yönetimi
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/destek" className="block">
              <div className="bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group">
                <div className="text-center">
                  <div className="text-3xl mb-4">🔧</div>
                  <h3
                    className="mb-2 group-hover:text-[#baf200] transition-colors"
                    style={{
                      color: '#f6f8f9',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Destek Kaydı Aç
                  </h3>
                  <p
                    style={{
                      color: '#f6f8f9',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Teknik sorunlarınız için profesyonel destek
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3
                  style={{
                    color: '#146448',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Anahtar Teslim Sera Teklifi
                </h3>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Şirket
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Proje Türü *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Cam Sera">Cam Sera</option>
                    <option value="Polikarbon Sera">Polikarbon Sera</option>
                    <option value="Yüksek Tünel">Yüksek Tünel</option>
                    <option value="Dikey Sistemler">Dikey Sistemler</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Lokasyon *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="İl/İlçe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Proje Büyüklüğü *
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    required
                    placeholder="Örn: 5,000 m²"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Bütçe Aralığı
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    <option value="">Seçiniz</option>
                    <option value="₺1-5 Milyon">₺1-5 Milyon</option>
                    <option value="₺5-10 Milyon">₺5-10 Milyon</option>
                    <option value="₺10+ Milyon">₺10+ Milyon</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block mb-2"
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Proje Zamanlaması
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                >
                  <option value="">Seçiniz</option>
                  <option value="1-3 ay içinde">1-3 ay içinde</option>
                  <option value="3-6 ay içinde">3-6 ay içinde</option>
                  <option value="6-12 ay içinde">6-12 ay içinde</option>
                  <option value="1 yıl sonra">1 yıl sonra</option>
                </select>
              </div>

              <div>
                <label
                  className="block mb-2"
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Proje Detayları
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  placeholder="Projeniz hakkında detaylı bilgi verin, özel gereksinimlerinizi belirtin..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-medium transition-colors"
                  style={{
                    backgroundColor: '#146448',
                    color: '#f6f8f9',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Teklif Talep Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
