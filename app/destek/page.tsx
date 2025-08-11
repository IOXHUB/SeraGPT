'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DestekPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const supportCategories = [
    {
      id: 'platform',
      title: 'Platform Kullanımı',
      description: 'SeraGPT arayüzü ve analiz araçları',
      icon: '🖥️',
      color: '#baf200'
    },
    {
      id: 'technical',
      title: 'Teknik Destek',
      description: 'Sera teknolojileri ve mühendislik',
      icon: '🔧',
      color: '#baf200'
    },
    {
      id: 'reports',
      title: 'Rapor Desteği',
      description: 'Analiz sonuçları ve değerlendirme',
      icon: '📊',
      color: '#baf200'
    },
    {
      id: 'financial',
      title: 'Finansal Danışmanlık',
      description: 'Yatırım ve finansman konuları',
      icon: '💰',
      color: '#baf200'
    },
    {
      id: 'grants',
      title: 'Hibe ve Teşvikler',
      description: 'Devlet destekleri ve başvuru süreci',
      icon: '🏛️',
      color: '#baf200'
    },
    {
      id: 'live-chat',
      title: 'Canlı Destek',
      description: 'Uzmanlarımızla anlık görüşme',
      icon: '💬',
      color: '#baf200'
    }
  ];

  const faqData = [
    {
      question: "Raporlarınız hangi veriler ve metotlarla hazırlanıyor?",
      answer: [
        "Raporlarımız; bölgenize ait gerçek zamanlı iklim verileri, TÜİK tarım istatistikleri, Copernicus uydu görüntüleri, FAO ve yerel pazar fiyat verileri gibi güvenilir kaynaklar kullanılarak hazırlanır.",
        "Enerji ihtiyacı ve iklimlendirme hesaplamalarında ASHRAE tabloları ve mühendislik formülleri uygulanır.",
        "Bu sayede sonuçlar yalnızca tahmini değil, sahada uygulanabilir ve yatırım kararına doğrudan temel oluşturacak nitelikte olur."
      ]
    },
    {
      question: "Sera tipini ve ekipman seçimlerini nasıl belirliyorsunuz?",
      answer: [
        "Sera tipini ve ekipmanlarını belirlerken şu parametreler analiz edilir:",
        "• Lokasyonun yıllık ortalama ve ekstrem sıcaklık/soğuk değerleri",
        "• Güneşlenme süresi ve ışık şiddeti", 
        "• Ürün tipi ve yetiştirme modeli (topraklı/hidroponik)",
        "• Su kaynağı ve sulama kapasitesi",
        "• Enerji kaynakları ve maliyetleri",
        "Tüm bu veriler yapay zeka ve mühendis ekibimizin değerlendirmesiyle optimum yatırım modeli olarak raporlanır."
      ]
    },
    {
      question: "Devlet hibeleri ve teşvikler için uygunluk analizi nasıl yapılıyor?",
      answer: [
        "Raporlarımızda TKDK, IPARD ve Ziraat Bankası gibi kurumların kriterleri dikkate alınır.",
        "Bölgesel hibe oranları, yatırım bütçesi limitleri ve teknik gereklilikler proje dosyasına eklenir.",
        "Eğer yatırımınız uygun bulunursa, hibe başvurusu sırasında gerekli teknik çizim ve fizibilite raporları tarafımızdan hazırlanabilir."
      ]
    },
    {
      question: "Ekipman marka ve model önerilerini hangi kriterlere göre yapıyorsunuz?",
      answer: [
        "Ekipman seçiminde kalite, güvenilirlik, enerji verimliliği ve yerel servis ağı faktörleri öncelik alır.",
        "Uzun vadeli işletme maliyetleri, yedek parça temini ve teknik destek olanakları değerlendirilir.",
        "Türkiye'deki temsilcilikleri olan ve yerel servis ağı güçlü markalar tercih edilir.",
        "Maliyet-performans analizi ile her bütçeye uygun seçenekler sunulur."
      ]
    },
    {
      question: "Görsel çizim ve 3D modelleme desteği alabilir miyim?",
      answer: [
        "Evet, profesyonel danışmanlık paketlerimizde detaylı teknik çizimler ve 3D görseller yer almaktadır.",
        "AutoCAD ortamında hazırlanan vaziyet planları, sera yerleşim planları ve kesit çizimleri sağlanır.",
        "3D modelleme ile projenizi gerçekçi görseller halinde görüntüleyebilir, potansiyel yatırımcılara sunum yapabilirsiniz.",
        "Tüm çizimler mühendis onaylı olup, ihale ve hibe başvurularında kullanılabilir niteliktedir."
      ]
    }
  ];

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

      {/* Main Content - Destek Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <h1
              className="mb-8 text-center"
              style={{
                color: '#f6f8f9',
                fontSize: '36px',
                fontWeight: '600'
              }}
            >
              Hemen Destek Alın
            </h1>

            <div className="max-w-[576px] mx-auto mb-12">
              <p
                className="leading-relaxed text-center"
                style={{
                  color: '#f6f8f9',
                  fontSize: '18px',
                  fontWeight: '400'
                }}
              >
                Sera yatırımınızla ilgili her konuda uzman ekibimiz size destek vermeye hazır.
              </p>
            </div>

            {/* Support Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {supportCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer hover:bg-white/10"
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3
                    className="mb-3"
                    style={{ color: category.color, fontSize: '18px', fontWeight: '600' }}
                  >
                    {category.title}
                  </h3>
                  <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', opacity: '0.8' }}>
                    {category.description}
                  </p>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="max-w-[800px] mx-auto mb-12">
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
                {faqData.map((faq, index) => (
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
                        {index + 1}. {faq.question}
                      </span>
                      <svg 
                        className={`w-5 h-5 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}
                        style={{ color: '#baf200' }} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-6">
                        <div className="space-y-3 text-left" style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                          {faq.answer.map((paragraph, pIndex) => (
                            <p key={pIndex} style={{ lineHeight: '1.6' }}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-[600px] mx-auto">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4
                  className="mb-4"
                  style={{ color: '#baf200', fontSize: '18px', fontWeight: '600' }}
                >
                  📞 Telefon Desteği
                </h4>
                <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', marginBottom: '16px' }}>
                  Hafta içi 09:00 - 18:00 saatleri arası
                </p>
                <button
                  className="w-full py-2 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237', fontSize: '14px' }}
                >
                  Ara: (312) 555-0123
                </button>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4
                  className="mb-4"
                  style={{ color: '#baf200', fontSize: '18px', fontWeight: '600' }}
                >
                  ✉️ E-posta Desteği
                </h4>
                <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400', marginBottom: '16px' }}>
                  24 saat içinde yanıt garantisi
                </p>
                <button
                  className="w-full py-2 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237', fontSize: '14px' }}
                >
                  E-posta Gönder
                </button>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white/5 rounded-xl p-8 border border-white/10 max-w-[600px] mx-auto">
              <h4
                className="mb-4"
                style={{ color: '#baf200', fontSize: '20px', fontWeight: '600' }}
              >
                Özel Destek Gerekiyor mu?
              </h4>
              <p 
                className="mb-6" 
                style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '400', lineHeight: '1.6' }}
              >
                Kompleks projeler için özel danışmanlık hizmeti alabilirsiniz. 
                Uzmanlarımız projenize özel çözümler geliştirir.
              </p>
              <Link
                href="/auth/login"
                className="inline-block px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#baf200',
                  color: '#1e3237',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Özel Danışmanlık Talep Et
              </Link>
            </div>

            {/* Bottom Link */}
            <div className="mt-12">
              <Link
                href="/auth/login"
                className="inline-block"
                style={{ color: '#baf200', fontSize: '16px', fontWeight: '500', textDecoration: 'underline' }}
              >
                Destek Talebinizi Platform Üzerinden Oluşturun →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
