'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function DanismanlikPage() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    location: '',
    size: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requestId = `PRJ-${Date.now()}`;
    alert(`Danışmanlık talebiniz alındı!\nTalep No: ${requestId}\n\n24 saat içinde uzman ekibimiz size dönüş yapacaktır.`);
    setShowContactModal(false);
    setFormData({ name: '', email: '', phone: '', company: '', projectType: '', location: '', size: '', message: '' });
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
                  Kurumsal Proje Danışmanlığı
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
                  SeraGPT, tarımsal zeka ile donatılmış analizler sunmanın yanı sıra, yatırımınızı gerçeğe dönüştürmek için iki güçlü hizmet sunar:
                </p>
              </div>

              <button
                onClick={() => setShowContactModal(true)}
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
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <main className="py-16" style={{ backgroundColor: '#f6f8f9' }}>
        <div className="max-w-[1700px] mx-auto px-6">
          {/* Service Steps */}
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
              Hizmet Sürecimiz
            </h2>

            <div className="space-y-12">
              {/* Fizibilite Analizi */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px', fontWeight: '600' }}>1</span>
                  </div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '20px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Fizibilite Analizi
                  </h3>
                </div>
                
                <div className="max-w-[576px] ml-16">
                  <p
                    className="mb-6"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Konum, ürün, iklim ve pazar verilerini birleştirerek sera fizibilitesi oluşturuyoruz. CAPEX/OPEX ön tahminleri, ROI analizi, geri ödeme aralığı ve duyarlılık testleri (fiyat, verim, enerji) ile yatırım kararınızı teknik temelde güçlendiriyoruz.
                  </p>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                    <h4
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-3"
                    >
                      KPI Ölçümleri:
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                        <span style={{ color: '#146448', fontSize: '12px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                          Enerji maliyetinde %10–22 azalma
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                        <span style={{ color: '#146448', fontSize: '12px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                          Yıllık üretim miktarında artış
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span style={{ color: '#baf200', fontSize: '14px' }}>•</span>
                        <span style={{ color: '#146448', fontSize: '12px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                          Karbon ayak izinde azalma
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasarım & Planlama */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px', fontWeight: '600' }}>2</span>
                  </div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '20px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Tasarım & Planlama
                  </h3>
                </div>
                
                <div className="max-w-[576px] ml-16">
                  <p
                    className="mb-6"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Yapısal tasarım, iklimlendirme kapasitesi, sulama-gübreleme ve enerji mimarisi belirlenir. Yerleşim planı, iş akışları ve kritik yol yöntemi (CPM) ile proje zaman çizelgesi hazırlanır. Bu aşamada, kalite kontrol noktaları ve süreç uyum analizleri uygulanır.
                  </p>
                </div>
              </div>

              {/* Tedarik & Ekipman Seçimi */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px', fontWeight: '600' }}>3</span>
                  </div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '20px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Tedarik & Ekipman Seçimi
                  </h3>
                </div>
                
                <div className="max-w-[576px] ml-16">
                  <p
                    className="mb-6"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Teknik şartnameler ve tedarikçi kısa listesi hazırlanır. Ekipman, otomasyon ve enerji çözümlerinde yaşam döngüsü maliyeti ve yedek parça sürekliliği dikkate alınır. SAP/ERP entegrasyonu ve süreç içinde denetim raporlaması mümkündür.
                  </p>
                </div>
              </div>

              {/* Kurulum Süreci Yönetimi */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px', fontWeight: '600' }}>4</span>
                  </div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '20px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Kurulum Süreci Yönetimi
                  </h3>
                </div>
                
                <div className="max-w-[576px] ml-16">
                  <p
                    className="mb-6"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Saha hazırlığı, inşaat ve montajın kalite, zaman ve bütçe hedefleriyle uyumu sağlanır. İş sağlığı ve güvenliği, çevre ve gıda güvenliği gereksinimleri takip edilir. Süreç sonunda, proje teslim oranı ve kalite denetim başarısı gibi KPI'lar izlenir.
                  </p>
                </div>
              </div>

              {/* Operasyon ve KPI Takibi */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px', fontWeight: '600' }}>5</span>
                  </div>
                  <h3
                    style={{
                      color: '#146448',
                      fontSize: '20px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Operasyon ve KPI Takibi
                  </h3>
                </div>
                
                <div className="max-w-[576px] ml-16">
                  <p
                    className="mb-6"
                    style={{
                      color: '#146448',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Üretim verimi, enerji yoğunluğu (kWh/kg), su kullanımı, fire oranı ve teslimat performansı düzenli olarak izlenir ve üst yönetime özetlenmiş performans raporları sunulur. Performans ölçümü ve sürekli iyileştirme döngüsü sağlanır.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="max-w-[896px] mx-auto mt-16">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3
                className="text-center mb-8"
                style={{
                  color: '#146448',
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Faydalar
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4
                    style={{
                      color: '#146448',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                    className="mb-4"
                  >
                    Ölçülebilir Faydalar:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Ölçülebilir tasarruf
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Doğru pazar seçimi
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Yatırım risklerinin azaltılması
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>✓</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Kısa geri ödeme süresi
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4
                    style={{
                      color: '#146448',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                    className="mb-4"
                  >
                    Örnek Proje Sonuçları:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>📊</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Enerji maliyetinde %10–22 azalma
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>📈</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        İş gücü verimliliğinde %8–15 artış
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span style={{ color: '#baf200', fontSize: '14px' }}>💰</span>
                      <span style={{ color: '#146448', fontSize: '14px', fontWeight: '400', fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif' }}>
                        Gelirde %7–18 artış
                      </span>
                    </div>
                  </div>
                  
                  <p
                    className="mt-4 text-sm"
                    style={{
                      color: '#146448',
                      fontSize: '12px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Geri dönütler proje ve lokasyona göre fizibilite çalışmasında netleştirilir.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-[576px] mx-auto mt-16 text-center">
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
                Projenizi Başlatalım
              </h3>
              
              <button
                onClick={() => setShowContactModal(true)}
                className="px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#146448',
                  color: '#f6f8f9',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Görüşme Planla
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

            <Link href="/anahtar-teslim-proje" className="block">
              <div className="bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group">
                <div className="text-center">
                  <div className="text-3xl mb-4">🏗️</div>
                  <h3
                    className="mb-2 group-hover:text-[#baf200] transition-colors"
                    style={{
                      color: '#f6f8f9',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Anahtar Teslim Sera
                  </h3>
                  <p
                    style={{
                      color: '#f6f8f9',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    Tam kapsamlı çözümler ve kurulum hizmeti
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
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
                  Proje Danışmanlığı Talebi
                </h3>
                <button
                  onClick={() => setShowContactModal(false)}
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
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
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
                    Proje Türü
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Cam Sera">Cam Sera</option>
                    <option value="Polikarbon Sera">Polikarbon Sera</option>
                    <option value="Plastik Tünel">Plastik Tünel</option>
                    <option value="Hidroponik Sistem">Hidroponik Sistem</option>
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
                    Lokasyon
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="İl/İlçe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
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
                  Proje Büyüklüğü
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
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
                  Proje Detayları
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  placeholder="Projeniz hakkında detaylı bilgi verin..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
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
                  Talep Gönder
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
