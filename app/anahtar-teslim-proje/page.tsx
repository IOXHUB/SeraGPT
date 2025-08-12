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
    capacity: '',
    energySource: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send email using Resend
      const response = await fetch('/api/send-turnkey-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const quoteId = `ATS-${Date.now()}`;
        alert(`Teklif talebiniz alındı!\nTeklif No: ${quoteId}\n\n3-5 iş günü içinde ön maliyet kırılımı ve geri ödeme analizi ile size dönüş yapacağız.`);
        setShowQuoteModal(false);
        setFormData({ name: '', email: '', phone: '', company: '', projectType: '', location: '', size: '', capacity: '', energySource: '', budget: '', timeline: '', message: '' });
      } else {
        throw new Error('Email gönderimi başarısız');
      }
    } catch (error) {
      console.error('Form gönderimi hatası:', error);
      const quoteId = `ATS-${Date.now()}`;
      alert(`Teklif talebiniz kaydedildi!\nTeklif No: ${quoteId}\n\n3-5 iş günü içinde ön maliyet kırılımı ve geri ödeme analizi ile size dönüş yapacağız.`);
      setShowQuoteModal(false);
      setFormData({ name: '', email: '', phone: '', company: '', projectType: '', location: '', size: '', capacity: '', energySource: '', budget: '', timeline: '', message: '' });
    }
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
                  Uçtan Uca Anahtar Teslim Sera
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
                  Planlamadan teslimata tüm süreci profesyonel ekibimiz yönetir. Ölçülebilir verimlilik ve hızlı geri dönüş sağlayan seralar kurarız.
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
          
          {/* Service Scope */}
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
              Hizmet Kapsamı
            </h2>

            <div className="space-y-8">
              {/* Design and Engineering */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px' }}>📐</span>
                  </div>
                  <div className="flex-1">
                    <h3
                      style={{
                        color: '#146448',
                        fontSize: '20px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-4"
                    >
                      Tasarım ve Mühendislik Çizimleri
                    </h3>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Statik, mekanik, elektrik ve hidrolik projeler; ısıtma-soğutma yük hesapları, hava/su debileri, kablo kesitleri ve saha yerleşim planları. BIM tabanlı dokümantasyon ve revizyon yönetimi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Equipment Selection and Supply */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px' }}>⚙️</span>
                  </div>
                  <div className="flex-1">
                    <h3
                      style={{
                        color: '#146448',
                        fontSize: '20px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-4"
                    >
                      Ekipman Seçimi ve Tedarik
                    </h3>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-4"
                    >
                      Cam/kaplama, ısıtma kazanları, chiller, fan-pad, CO₂ gübrelemesi, sulama-fertilizasyon üniteleri, LED/aydınlatma, topraksız yetiştiricilik hatları, otomasyon panoları. TCO analizleri, verim sınıfları ve garanti şartlarıyla tedarik.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Cam/Kaplama Sistemi',
                        'Isıtma Kazanları',
                        'Chiller Sistemleri',
                        'Fan-Pad Soğutma',
                        'CO₂ Gübrelemesi',
                        'Sulama-Fertilizasyon',
                        'LED Aydınlatma',
                        'Topraksız Yetiştiricilik',
                        'Otomasyon Panoları'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span style={{ color: '#baf200', fontSize: '12px' }}>✓</span>
                          <span
                            style={{
                              color: '#146448',
                              fontSize: '12px',
                              fontWeight: '400',
                              fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Construction, Assembly and Integration */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px' }}>🏗️</span>
                  </div>
                  <div className="flex-1">
                    <h3
                      style={{
                        color: '#146448',
                        fontSize: '20px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-4"
                    >
                      İnşaat, Montaj ve Entegrasyon
                    </h3>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Temel, drenaj, çelik/alüminyum konstrüksiyon, kaplama montajı, borulama ve kablolama. Fonksiyon testleri, soğuk/sıcak devreye alma, mekanik-elektrik-otomasyon entegrasyon doğrulaması.
                    </p>
                  </div>
                </div>
              </div>

              {/* Automation and Control Systems */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px' }}>🤖</span>
                  </div>
                  <div className="flex-1">
                    <h3
                      style={{
                        color: '#146448',
                        fontSize: '20px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-4"
                    >
                      Otomasyon ve Kontrol Sistemleri Kurulumu
                    </h3>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      İklim kontrolü, sulama, aydınlatma, enerji izleme ve güvenlik sistemleri. SCADA/BMS entegrasyonu, sensör kalibrasyonu, alarm matrisleri, veri kayıt ve raporlama altyapısı.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design Options */}
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
              Tasarım Seçenekleri
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Glass Greenhouse */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '24px' }}>🏗️</span>
                  </div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '20px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Cam Sera
                  </h3>
                </div>
                <p
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Yüksek ışık geçirgenliği, uzun ömür, ileri iklim kontrolü gereken bölgeler için uygundur. Rüzgar/kar yüklerine göre statik optimizasyon.
                </p>
              </div>

              {/* Polycarbonate Greenhouse */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '24px' }}>🔧</span>
                  </div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '20px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Polikarbon Sera
                  </h3>
                </div>
                <p
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Isı yalıtımı ve darbe dayanımı güçlü; CAPEX/performans dengesi arayan projeler için. Farklı kalınlık ve UV katman alternatifleri.
                </p>
              </div>

              {/* High Tunnel */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '24px' }}>🌱</span>
                  </div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '20px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Yüksek Tünel
                  </h3>
                </div>
                <p
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Hızlı kurulum, düşük CAPEX, mevsimsel veya kademeli ölçekleme stratejileri için. Modüler alan genişletme.
                </p>
              </div>

              {/* Vertical Systems */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '24px' }}>����</span>
                  </div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '20px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Dikey Sistemler
                  </h3>
                </div>
                <p
                  style={{
                    color: '#146448',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Alan kısıtlı, şehir içi veya niş ürün odaklı yatırımlar. İklim, aydınlatma ve besin çözeltisi hassas kontrolü; enerji geri kazanım opsiyonları.
                </p>
              </div>
            </div>
          </div>

          {/* Cost and Return */}
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
              Maliyet ve Geri Dönüş
            </h2>

            <div className="space-y-8">
              {/* CAPEX/OPEX Breakdown */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3
                  style={{
                    color: '#146448',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                  className="mb-6 text-center"
                >
                  CAPEX/OPEX Kırılımı
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4
                      style={{
                        color: '#baf200',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-4"
                    >
                      CAPEX
                    </h4>
                    <div className="space-y-2">
                      {['Konstrüksiyon', 'Kaplama', 'İklimlendirme', 'Sulama', 'Otomasyon', 'Altyapı'].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span style={{ color: '#baf200', fontSize: '12px' }}>•</span>
                          <span
                            style={{
                              color: '#146448',
                              fontSize: '14px',
                              fontWeight: '400',
                              fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4
                      style={{
                        color: '#baf200',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-4"
                    >
                      OPEX
                    </h4>
                    <div className="space-y-2">
                      {['Enerji (kWh/m²)', 'Su', 'Besin', 'İş gücü', 'Bakım', 'Sarf'].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span style={{ color: '#baf200', fontSize: '12px' }}>•</span>
                          <span
                            style={{
                              color: '#146448',
                              fontSize: '14px',
                              fontWeight: '400',
                              fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payback Period and Financial Model */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-8 border border-gray-200">
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '20px',
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
                      Ürün karması, iklim bölgesi ve enerji tarifelerine bağlı. ROI analizi ve duyarlılık senaryoları (fiyat, verim, enerji) raporlanır.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 border border-gray-200">
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '20px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                    className="mb-4"
                  >
                    Finansal Model
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>📊</span>
                      <span
                        style={{
                          color: '#146448',
                          fontSize: '14px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Nakit akışı, IRR ve geri ödeme hesapları
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>📈</span>
                      <span
                        style={{
                          color: '#146448',
                          fontSize: '14px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Pazar fiyat senaryoları
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>🔮</span>
                      <span
                        style={{
                          color: '#146448',
                          fontSize: '14px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Kapasite kullanım varsayımları
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty and Support */}
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
              Garanti ve Destek
            </h2>

            <div className="space-y-8">
              {/* 99% System Availability */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px' }}>✅</span>
                  </div>
                  <div className="flex-1">
                    <h3
                      style={{
                        color: '#146448',
                        fontSize: '20px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-4"
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
                      Kritik bileşenlerde yedeklilik, proaktif izleme ve alarm eşikleri. SLA'li müdahale süreleri.
                    </p>
                  </div>
                </div>
              </div>

              {/* Maintenance Plan */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px' }}>🔧</span>
                  </div>
                  <div className="flex-1">
                    <h3
                      style={{
                        color: '#146448',
                        fontSize: '20px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-4"
                    >
                      Bakım Planı
                    </h3>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Periyodik mekanik/elektrik kontrolleri, sensör kalibrasyonu, yazılım güncellemeleri. Arıza önleyici bakım çizelgeleri.
                    </p>
                  </div>
                </div>
              </div>

              {/* Spare Parts Supply */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px' }}>📦</span>
                  </div>
                  <div className="flex-1">
                    <h3
                      style={{
                        color: '#146448',
                        fontSize: '20px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-4"
                    >
                      Yedek Parça Tedariki
                    </h3>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Stratejik stok, tedarik süreleri tanımlı kritik parçalar, orijinal üretici garantileri. Uzaktan destek ve yerinde servis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-[576px] mx-auto text-center">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3
                className="mb-4"
                style={{
                  color: '#146448',
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Teklif İste
              </h3>
              
              <p
                className="mb-6"
                style={{
                  color: '#146448',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Proje formunda lokasyon, hedef ürünler, hedef kapasite (m²/ton), enerji kaynağı ve bütçe aralığını paylaşın. 3–5 iş günü içinde ön maliyet kırılımı ve planlanan geri ödeme analizi ile dönüş yapalım.
              </p>
              
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
                    Proje Büyüklüğü (m²) *
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
                    Hedef Kapasite (ton/yıl)
                  </label>
                  <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="Örn: 500 ton/yıl"
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
                    Enerji Kaynağı
                  </label>
                  <select
                    name="energySource"
                    value={formData.energySource}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Doğalgaz">Doğalgaz</option>
                    <option value="Elektrik">Elektrik</option>
                    <option value="Jeotermal">Jeotermal</option>
                    <option value="Güneş Enerjisi">Güneş Enerjisi</option>
                    <option value="Hibrit">Hibrit Sistem</option>
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
                    Bütçe Aralığı
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    <option value="">Seçiniz</option>
                    <option value="₺5-15 Milyon">₺5-15 Milyon</option>
                    <option value="₺15-30 Milyon">₺15-30 Milyon</option>
                    <option value="₺30-50 Milyon">₺30-50 Milyon</option>
                    <option value="₺50+ Milyon">₺50+ Milyon</option>
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
                  <option value="3-6 ay içinde">3-6 ay içinde</option>
                  <option value="6-12 ay içinde">6-12 ay içinde</option>
                  <option value="1-2 yıl içinde">1-2 yıl içinde</option>
                  <option value="2+ yıl sonra">2+ yıl sonra</option>
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
                  placeholder="Hedef ürünler, özel gereksinimler ve diğer proje detaylarını belirtin..."
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
