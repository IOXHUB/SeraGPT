'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ConsultancyPage() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectSize: '',
    location: '',
    budget: '',
    timeline: '',
    message: '',
    serviceType: 'consultation'
  });

  const consultancyServices = [
    {
      id: 'feasibility',
      title: 'Fizibilite Çalışmaları',
      icon: '📊',
      description: 'Detaylı fizibilite raporları ve yatırım analizi',
      features: [
        'Kapsamlı pazar araştırması',
        'Finansal projeksiyon ve ROI analizi',
        'Risk değerlendirmesi',
        'Teknik fizibilite çalışması',
        'Yatırım geri dönüş hesaplama'
      ],
      duration: '2-4 hafta',
      price: 'Proje büyüklüğüne göre'
    },
    {
      id: 'site-analysis',
      title: 'Yerinde Keşif ve Analiz',
      icon: '🔍',
      description: 'Uzman ekibimizle sahada detaylı inceleme',
      features: [
        'Toprak analizi ve uygunluk testi',
        'İklim ve mikroiklim değerlendirmesi',
        'Altyapı durum analizi',
        'Lojistik ve erişim değerlendirmesi',
        'Yasal uygunluk kontrolü'
      ],
      duration: '1-2 hafta',
      price: '₺15,000 - ₺25,000'
    },
    {
      id: 'investment',
      title: 'Yatırım Danışmanlığı',
      icon: '💰',
      description: 'Stratejik yatırım planlaması ve finansman desteği',
      features: [
        'Yatırım stratejisi geliştirme',
        'Finansman kaynaklarının belirlenmesi',
        'Teşvik ve hibeler konusunda rehberlik',
        'Yatırımcı bulma desteği',
        'İş planı hazırlama'
      ],
      duration: '3-6 hafta',
      price: 'Danışmanlık paketine göre'
    },
    {
      id: 'marketing',
      title: 'Pazarlama Yönetimi',
      icon: '📈',
      description: '��rün pazarlama ve satış kanalı geliştirme',
      features: [
        'Pazar konumlandırma stratejisi',
        'Satış kanalları gelişimi',
        'Marka oluşturma ve tanıtım',
        'Fiyatlama stratejisi',
        'Müşteri portföyü oluşturma'
      ],
      duration: 'Sürekli destek',
      price: 'Aylık paket seçenekleri'
    },
    {
      id: 'technical',
      title: 'Teknik Danışmanlık',
      icon: '⚙️',
      description: 'Sera teknolojileri ve zirai danışmanlık',
      features: [
        'Sera tasarımı ve mühendislik',
        'Teknoloji seçimi ve entegrasyon',
        'Zirai yöntemler ve optimizasyon',
        'Kalite kontrol sistemleri',
        'Sürdürülebilirlik danışmanlığı'
      ],
      duration: 'Proje süresince',
      price: 'Uzmanlık alanına göre'
    },
    {
      id: 'operational',
      title: 'Operasyonel Danışmanlık',
      icon: '🏭',
      description: 'İşletme yönetimi ve süreç optimizasyonu',
      features: [
        'İş süreçleri optimizasyonu',
        'Personel yönetimi ve eğitim',
        'Operasyonel maliyet kontrolü',
        'Kalite yönetim sistemleri',
        'Performans izleme ve analiz'
      ],
      duration: '6-12 ay',
      price: 'Operasyon büyüklüğüne göre'
    }
  ];

  const turnkeyServices = [
    {
      title: 'Sera Tasarımı ve İnşaatı',
      description: 'Modern sera tesisleri için komple tasarım ve inşaat',
      icon: '🏗️'
    },
    {
      title: 'Teknoloji Entegrasyonu',
      description: 'İleri teknoloji sistemlerinin kurulumu ve devreye alınması',
      icon: '🤖'
    },
    {
      title: 'Zirai Danışmanlık',
      description: 'Üretim sürecinde teknik danışmanlık ve rehberlik',
      icon: '🌱'
    },
    {
      title: 'Servis ve Bakım',
      description: 'Sürekli teknik destek ve bakım hizmetleri',
      icon: '🔧'
    }
  ];

  const projectTypes = [
    'Cam Sera (1,000-5,000 m²)',
    'Cam Sera (5,000+ m²)',
    'Polikarbon Sera',
    'Plastik Tünel Sera',
    'Hidroponik Sistem',
    'Aeroponik Sistem',
    'Dikey Tarım Sistemi',
    'Organik Üretim Sistemi'
  ];

  const budgetRanges = [
    '₺100,000 - ₺500,000',
    '₺500,000 - ₺1,000,000',
    '₺1,000,000 - ₺5,000,000',
    '₺5,000,000 - ₺10,000,000',
    '₺10,000,000+'
  ];

  const timelineOptions = [
    '1-3 ay',
    '3-6 ay',
    '6-12 ay',
    '1-2 yıl',
    '2+ yıl'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setFormData(prev => ({
      ...prev,
      serviceType: serviceId
    }));
    setShowContactModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Danışmanlık talebiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
    setShowContactModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      projectSize: '',
      location: '',
      budget: '',
      timeline: '',
      message: '',
      serviceType: 'consultation'
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f8f9]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#146448] to-[#0f4f37] text-white py-20">
        <div className="body-container">
          <div className="text-center text-container mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              👨‍🔬 Profesyonel Sera Danışmanlığ��
            </h1>
            <p className="text-xl mb-8 opacity-90">
              20 yıllık tecrübemiz ve 500+ başarılı projemizle sera yatırımınızda 
              yanınızdayız. Bütüncül yaklaşımla başarıya ulaşın.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-[#baf200]">20+</div>
                <div className="text-sm opacity-90">Yıllık Tecrübe</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-[#baf200]">500+</div>
                <div className="text-sm opacity-90">Başarılı Proje</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-[#baf200]">98%</div>
                <div className="text-sm opacity-90">Müşteri Memnuniyeti</div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-[#baf200] text-[#146448] px-8 py-4 rounded-2xl font-bold hover:bg-[#baf200]/90 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                🚀 Ücretsiz Danışmanlık Talep Et
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="body-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">🎯 Danışmanlık Hizmetlerimiz</h2>
            <p className="text-gray-600 text-container mx-auto">
              Her aşamada profesyonel destek ile başarılı sera yatırımları gerçekleştirin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultancyServices.map((service) => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#146448] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-500">Süre:</span>
                    <span className="font-medium text-[#146448]">{service.duration}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Fiyat:</span>
                    <span className="font-medium text-[#146448]">{service.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleServiceSelect(service.id)}
                  className="w-full bg-[#146448] text-white py-3 rounded-2xl hover:bg-[#0f4f37] transition-all duration-300 font-medium group-hover:bg-[#baf200] group-hover:text-[#146448]"
                >
                  Teklif Al
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnkey Partnership */}
      <section className="py-16 bg-[#f6f8f9]">
        <div className="body-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">🔗 Serapoli Ortaklığı ile Anahtar Teslim Çözümler</h2>
            <p className="text-gray-600 text-container mx-auto">
              İspanyol çözüm ortağımız Serapoli ile birlikte tek elden anahtar teslim proje hizmeti sunuyoruz
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#146448] to-[#baf200] rounded-2xl flex items-center justify-center text-2xl">
                    🤝
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#146448]">Serapoli Ortaklığı</h3>
                    <p className="text-gray-600">İspanya merkezli teknoloji lideri</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Çözüm ortağımız İspanyol firması Serapoli ile birlikte çalışarak tek elden 
                  anahtar teslim hizmet sunuyoruz. Danışmanlık hizmetimize ek olarak imalat, 
                  montaj, kurulum, zirai danışmanlık ve servis hizmetleri için kapsamlı 
                  proje teklifleri hazırlıyoruz.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {turnkeyServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-[#f6f8f9] rounded-xl">
                      <div className="text-2xl">{service.icon}</div>
                      <div>
                        <div className="font-medium text-[#146448] text-sm">{service.title}</div>
                        <div className="text-xs text-gray-600">{service.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, serviceType: 'turnkey' }));
                    setShowContactModal(true);
                  }}
                  className="bg-gradient-to-r from-[#146448] to-[#baf200] text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg transition-all duration-300"
                >
                  Anahtar Teslim Proje Teklifi Al
                </button>
              </div>

              <div className="bg-gradient-to-br from-[#146448] to-[#0f4f37] rounded-2xl p-8 text-white">
                <h4 className="text-xl font-bold mb-6">🏆 Referans Projelerimiz</h4>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="font-medium mb-1">Antalya Mega Sera Kompleksi</div>
                    <div className="text-sm opacity-90">25,000 m² • Domates Üretimi • 2023</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="font-medium mb-1">Mersin Organik Sera Projesi</div>
                    <div className="text-sm opacity-90">15,000 m² • Organik Salatalık • 2022</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="font-medium mb-1">İzmir Teknoloji Sera Tesisi</div>
                    <div className="text-sm opacity-90">30,000 m² • Hidroponik Sistem • 2024</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#baf200]">70,000+ m²</div>
                    <div className="text-sm opacity-90">Toplam Tamamlanan Proje Alanı</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="body-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">✨ Neden Bizi Seçmelisiniz?</h2>
            <p className="text-gray-600 text-container mx-auto">
              Güven duyabileceğiniz, profesyonel hizmet almanızı garanti eden özelliklerimiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎯',
                title: '20 Yıl Tecrübe',
                description: 'Sera tarımında köklü deneyim ve uzmanlık'
              },
              {
                icon: '📊',
                title: '500+ Başarılı Proje',
                description: 'Kanıtlanmış başarı sicili ve referanslar'
              },
              {
                icon: '🤝',
                title: 'Bütüncül Yaklaşım',
                description: 'Fizibilite\'den işletmeye kadar tam destek'
              },
              {
                icon: '🌍',
                title: 'Uluslararası Ortaklık',
                description: 'Serapoli ile global teknoloji erişimi'
              },
              {
                icon: '⚡',
                title: 'Hızlı Çözüm',
                description: 'Proaktif yaklaşım ve zamanında teslimat'
              },
              {
                icon: '🛡️',
                title: 'Garanti ve Destek',
                description: 'Sürekli teknik destek ve garanti kapsamı'
              },
              {
                icon: '💡',
                title: 'İnovatif Teknoloji',
                description: 'En güncel teknolojiler ve yenilikçi çözümler'
              },
              {
                icon: '📈',
                title: 'ROI Odaklı',
                description: 'Karlılık ve verimlilik odaklı planlama'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-[#f6f8f9] rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#146448] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#146448] to-[#0f4f37] text-white">
        <div className="body-container">
          <div className="text-center text-container mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Hayalinizdeki Sera Projesini Gerçekleştirin
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Uzman ekibimizle ücretsiz ön görüşme yapın ve projeniz için en uygun 
              çözümü keşfedin. 24 saat içinde size dönüş yapacağız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-[#baf200] text-[#146448] px-8 py-4 rounded-2xl font-bold hover:bg-[#baf200]/90 transition-all duration-300 hover:scale-105"
              >
                📞 Ücretsiz Danışmanlık
              </button>
              <Link href="/yardim">
                <button className="bg-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-colors border border-white/30">
                  ❓ Sıkça Sorulan Sorular
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#146448]">🚀 Danışmanlık Talebiniz</h3>
                  <p className="text-gray-600 text-sm">Detaylarınızı paylaşın, size özel çözüm geliştirelim</p>
                </div>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                    placeholder="Adınızı ve soyadınızı girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                    placeholder="E-posta adresinizi girin"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                    placeholder="Telefon numaranızı girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">
                    Şirket/Kurum
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                    placeholder="Şirket adınızı girin (opsiyonel)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">
                    Proje Türü *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                  >
                    <option value="">Proje türünü seçin</option>
                    {projectTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">
                    Proje Büyüklüğü
                  </label>
                  <input
                    type="text"
                    name="projectSize"
                    value={formData.projectSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                    placeholder="Örn: 5,000 m²"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">
                    Proje Lokasyonu
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                    placeholder="İl/İlçe bilgisi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">
                    Bütçe Aralığı
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                  >
                    <option value="">Bütçe aralığınızı seçin</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#146448] mb-2">
                  Proje Zaman Çizelgesi
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                >
                  <option value="">Ne zaman başlamayı planlıyorsunuz?</option>
                  {timelineOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#146448] mb-2">
                  Proje Detayları ve Özel İstekleriniz
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                  placeholder="Projeniz hakkında detaylı bilgi verin, özel isteklerinizi belirtin..."
                />
              </div>

              <div className="bg-[#f6f8f9] rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-medium text-[#146448] mb-1">Ücretsiz Ön Değerlendirme</h4>
                    <p className="text-sm text-gray-600">
                      Talebinizi aldıktan sonra 24 saat içinde uzman ekibimiz size dönüş yapacak 
                      ve ücretsiz ön değerlendirme sunacaktır.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#146448] to-[#baf200] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  🚀 Danışmanlık Talebini Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
