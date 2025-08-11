'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DanismanlikPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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

      {/* Main Content - Danışmanlık Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            {/* Main title */}
            <div className="max-w-[576px] mx-auto mb-16">
              <h1
                className="leading-tight text-center mb-12"
                style={{
                  color: '#f6f8f9',
                  fontSize: '36px',
                  fontWeight: '600'
                }}
              >
                Proje Danışmanlık Hizmetimiz
              </h1>
            </div>

            {/* Consultation Packages */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16 max-w-[1000px] mx-auto">
              {/* Package 1: Ön Fizibilite */}
              <div className="text-left">
                <div
                  className="bg-white/5 rounded-xl p-8 border-2"
                  style={{ borderColor: '#baf200' }}
                >
                  <h3
                    className="mb-6 text-center"
                    style={{
                      color: '#baf200',
                      fontSize: '24px',
                      fontWeight: '600'
                    }}
                  >
                    1. Ön Fizibilite Paketi
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Lokasyon, iklim ve ürün analizi
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Tahmini yatırım maliyeti
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Beklenen ROI (yatırım geri dönüş süresi)
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Uygun sera tipleri önerisi
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Devlet teşvik ve hibe uygunluğu değerlendirmesi
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '500' }}>
                        Teslim Süresi:
                      </span>
                      <span style={{ color: '#baf200', fontSize: '14px', fontWeight: '600' }}>
                        5 iş günü
                      </span>
                    </div>
                    <div className="mt-4">
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                        <strong style={{ color: '#baf200' }}>Amaç:</strong> Yatırımcıya "başlamaya değer mi?" sorusunun cevabını vermek
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package 2: Teknik Projelendirme */}
              <div className="text-left">
                <div
                  className="bg-white/5 rounded-xl p-8 border-2"
                  style={{ borderColor: '#baf200' }}
                >
                  <h3
                    className="mb-6 text-center"
                    style={{
                      color: '#baf200',
                      fontSize: '24px',
                      fontWeight: '600'
                    }}
                  >
                    2. Teknik Projelendirme Paketi
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Vaziyet planı ve araziye yerleştirme
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Sera yapı ve statik hesapları
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        İklim kontrol sistemleri projelendirmesi
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Sulama sistemi detay çizimleri
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Enerji ihtiyacı analizi ve elektrik projeleri
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span style={{ color: '#baf200', fontSize: '16px' }}>•</span>
                      <p style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400' }}>
                        Detaylı maliyet analizi ve keşif
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '500' }}>
                        Teslim Süresi:
                      </span>
                      <span style={{ color: '#baf200', fontSize: '14px', fontWeight: '600' }}>
                        10-15 iş günü
                      </span>
                    </div>
                    <div className="mt-4">
                      <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                        <strong style={{ color: '#baf200' }}>Amaç:</strong> İhale dosyaları ve uygulama projelerini hazırlamak
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mb-16">
              <Link
                href="/auth/login"
                className="inline-flex items-center px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#baf200',
                  color: '#1e3237',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                DANIŞMANLIK TALEBİ OLUŞTUR
              </Link>
            </div>

            {/* FAQ Section */}
            <div className="max-w-[800px] mx-auto">
              <h3
                className="mb-8 text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '24px',
                  fontWeight: '600'
                }}
              >
                Sıkça Sorulan Sorular
              </h3>

              <div className="space-y-4">
                {[
                  {
                    question: "Raporlarınızdaki veri kaynakları ve metotları güvenilir mi?",
                    answer: "Evet, raporlarımız güncel meteoroloji verileri, tarımsal araştırma enstitülerinin yayınları ve sektör deneyimi birleştirilerek hazırlanır. Tüm veriler güvenilir kaynaklardan alınır ve güncel tutulur."
                  },
                  {
                    question: "Hangi sera tipi ve ekipmanları seçmem konusunda yardım alabilirim?",
                    answer: "Sera tipi seçiminde iklim, ürün, bütçe ve arazi özelliklerinizi analiz ederek en uygun sera modelini öneriyoruz. Ekipman seçiminde ise kalite, maliyet ve sürdürülebilirlik kriterlerini göz önünde bulundururuz."
                  },
                  {
                    question: "Devlet hibeleri ve teşvikleri konusunda bilgi alabilir miyim?",
                    answer: "Evet, danışmanlık hizmetimiz kapsamında güncel devlet teşvikleri, hibe programları ve destekler hakkında detaylı bilgi sunuyoruz. Başvuru süreçlerinde de rehberlik sağlıyoruz."
                  },
                  {
                    question: "Ekipman marka ve model seçiminde destek veriliyor mu?",
                    answer: "Kesinlikle. Uzman ekibimiz, projenizin ihtiyaçlarına göre en uygun marka ve modelleri değerlendirerek, maliyet-performans analizi ile beraber öneriler sunar."
                  },
                  {
                    question: "Görsel ve teknik çizim desteği alabilir miyim?",
                    answer: "Evet, teknik projelendirme paketimizde detaylı çizimler, 3D görseller ve uygulama planları yer almaktadır. Bu sayede projenizi görselleştirebilir ve uygulamaya hazır hale getirebilirsiniz."
                  }
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl border border-white/10"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                    >
                      <span
                        style={{
                          color: '#f6f8f9',
                          fontSize: '16px',
                          fontWeight: '500'
                        }}
                      >
                        {faq.question}
                      </span>
                      <span
                        style={{ color: '#baf200', fontSize: '20px' }}
                        className={`transform transition-transform ${openFAQ === index ? 'rotate-45' : ''}`}
                      >
                        +
                      </span>
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-6">
                        <p
                          style={{
                            color: '#f6f8f9',
                            fontSize: '14px',
                            fontWeight: '400',
                            opacity: '0.8'
                          }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
