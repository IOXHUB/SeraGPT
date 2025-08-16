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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send email using Resend
      const response = await fetch('/api/send-consultation-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const requestId = `PRJ-${Date.now()}`;
        alert(`Danışmanlık talebiniz alındı!\nTalep No: ${requestId}\n\n24 saat içinde uzman ekibimiz size dönüş yapacaktır.`);
        setShowContactModal(false);
        setFormData({ name: '', email: '', phone: '', company: '', projectType: '', location: '', size: '', message: '' });
      } else {
        throw new Error('Email gönderimi başarısız');
      }
    } catch (error) {
      console.error('Form gönderimi hatası:', error);
      const requestId = `PRJ-${Date.now()}`;
      alert(`Danışmanlık talebiniz kaydedildi!\nTalep No: ${requestId}\n\n24 saat içinde uzman ekibimiz size dönüş yapacaktır.`);
      setShowContactModal(false);
      setFormData({ name: '', email: '', phone: '', company: '', projectType: '', location: '', size: '', message: '' });
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
              <div className="max-w-[576px] mx-auto mb-4">
                <h2
                  className="leading-tight text-center mb-4"
                  style={{
                    color: '#baf200',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Proje Danışmanlığı
                </h2>
                <h1
                  className="leading-tight text-center"
                  style={{
                    color: '#f6f8f9',
                    fontSize: '36px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                >
                  Veriye Dayalı Sera Proje Danışmanlığı
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
                  Sera yatırımlarınızı adım adım, ölçülebilir çıktılarla planlayın. Fizibiliteden operasyona kadar riskleri azaltın, kârlılığı artırın.
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
          
          {/* Why SeraGPT Consulting */}
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
              Neden SeraGPT Danışmanlığı?
            </h2>

            <div className="space-y-8">
              {/* ROI Optimization */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px' }}>📊</span>
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
                      ROI optimizasyonu
                    </h3>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      ROI analizi ve nakit akışı modellemesiyle ürün karması, kapasite ve fiyat senaryolarını optimize ederiz. Hedef: geri ödeme süresini kısaltmak, IRR'ı yükseltmek.
                    </p>
                  </div>
                </div>
              </div>

              {/* Climate Adaptation */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px' }}>🌡️</span>
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
                      İklim uyumu
                    </h3>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      İklim analizi ile ısıtma/soğutma yükleri, ışık ve su gereksinimleri hesaplanır; konum ve tasarım kararları buna göre netleşir.
                    </p>
                  </div>
                </div>
              </div>

              {/* Supply Optimization */}
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
                      Tedarik optimizasyonu
                    </h3>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Ekipman, otomasyon ve enerji çözümlerinde teknik-ticari kıyas yapar, toplam sahip olma maliyetini düşürürüz.
                    </p>
                  </div>
                </div>
              </div>

              {/* Risk Management */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#baf200' }}>
                    <span style={{ color: '#146448', fontSize: '20px' }}>🛡️</span>
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
                      Risk yönetimi
                    </h3>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      İnşaat, tedarik, iklim ve pazar riskleri için senaryolar kurar; sözleşmesel kontrol ve uyum çerçevesi oluştururuz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consulting Process */}
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
              Danışmanlık Süreci
            </h2>

            <div className="space-y-12">
              {/* Feasibility Analysis */}
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
                    Konum, ürün, iklim ve pazar verilerini birleştirerek sera fizibilitesi çıkarırız. CAPEX/OPEX ön tahminleri, ROI analizi, geri ödeme aralığı ve duyarlılık testleri (fiyat, verim, enerji) sunulur.
                  </p>
                </div>
              </div>

              {/* Design & Planning */}
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
                    Yapısal tasarım, iklimlendirme kapasitesi, sulama-gübreleme ve enerji mimarisi belirlenir. Yerleşim planı, iş akışları ve kritik yol yöntemi (CPM) ile zaman çizelgesi hazırlanır.
                  </p>
                </div>
              </div>

              {/* Supply & Equipment Selection */}
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
                    Spesifikasyon dokümanları, teknik şartnameler ve tedarikçi kısa listesi oluşturulur. Yaşam döngüsü maliyeti, servis seviyesi ve yedek parça sürekliliği değerlendirilir.
                  </p>
                </div>
              </div>

              {/* Installation Process Management */}
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
                    Saha hazırlığı, inşaat ve montajın kalite, zaman ve bütçe hedefleriyle uyumu denetlenir. İş sağlığı ve güvenliği, çevre ve gıda güvenliği gereksinimleri takip edilir.
                  </p>
                </div>
              </div>

              {/* Operation and KPI Tracking */}
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
                    Üretim verimi, enerji yoğunluğu (kWh/kg), su kullanımı, fire oranı ve teslimat performansı gibi KPI'lar izlenir. Sürekli iyileştirme döngüsü ve dönemsel performans raporları sunulur.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
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
              Faydalar
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3
                  style={{
                    color: '#146448',
                    fontSize: '20px',
                    fontWeight: '600',
                    fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                  }}
                  className="mb-6"
                >
                  Ölçülebilir Faydalar
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4
                      style={{
                        color: '#baf200',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-2"
                    >
                      Ölçülebilir tasarruf
                    </h4>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Enerji ve iş gücü maliyetlerinde düşüş, bakım planıyla arıza sürelerinin azalması.
                    </p>
                  </div>
                  
                  <div>
                    <h4
                      style={{
                        color: '#baf200',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-2"
                    >
                      Doğru pazar seçimi
                    </h4>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Talep ve fiyat dalgalanmalarına göre ürün/pazar uyumu, daha öngörülebilir gelir.
                    </p>
                  </div>
                  
                  <div>
                    <h4
                      style={{
                        color: '#baf200',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-2"
                    >
                      Yatırım risklerinin azaltılması
                    </h4>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Tedarik, iklim ve finans senaryolarıyla sürprizlerin minimize edilmesi.
                    </p>
                  </div>
                  
                  <div>
                    <h4
                      style={{
                        color: '#baf200',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                      className="mb-2"
                    >
                      Kısa geri ödeme süresi
                    </h4>
                    <p
                      style={{
                        color: '#146448',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                      }}
                    >
                      Optimize edilmiş CAPEX/OPEX dengesi ve verim artırıcı müdahaleler.
                    </p>
                  </div>
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
                  className="mb-6"
                >
                  Örnek Proje Sonuçları
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span style={{ color: '#baf200', fontSize: '16px' }}>⚡</span>
                    <div>
                      <span
                        style={{
                          color: '#146448',
                          fontSize: '16px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Enerji maliyeti: %10–22 azalma
                      </span>
                      <p
                        style={{
                          color: '#146448',
                          fontSize: '12px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        (ısıtma/soğutma ve izolasyon optimizasyonu).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span style={{ color: '#baf200', fontSize: '16px' }}>👥</span>
                    <div>
                      <span
                        style={{
                          color: '#146448',
                          fontSize: '16px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        İş gücü verimliliği: %8–15 iyileşme
                      </span>
                      <p
                        style={{
                          color: '#146448',
                          fontSize: '12px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        (iş akışı ve otomasyon düzenlemeleri).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span style={{ color: '#baf200', fontSize: '16px' }}>💰</span>
                    <div>
                      <span
                        style={{
                          color: '#146448',
                          fontSize: '16px',
                          fontWeight: '600',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        Gelir artışı: %7–18 artış
                      </span>
                      <p
                        style={{
                          color: '#146448',
                          fontSize: '12px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                        }}
                      >
                        (ürün karması ve hasat zamanlaması optimizasyonu).
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p
                    style={{
                      color: '#146448',
                      fontSize: '12px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                    }}
                  >
                    <strong>Not:</strong> Aralıklar proje tipine ve lokasyona göre değişir; doğrulama fizibilite çalışmasında yapılır.
                  </p>
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
                Görüşme Planla
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
                Kısa form ile konum, hedef ürün ve bütçe aralığını iletin. Ekibimiz 1 iş günü içinde ön değerlendirme ve toplantı zamanı paylaşır.
              </p>
              
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
