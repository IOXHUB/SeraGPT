'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ConsultancyPage() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectLocation: '',
    projectSize: '',
    budget: '',
    timeline: '',
    message: '',
    serviceType: 'project-consultancy'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Danışmanlık talebi:', formData);
    alert('Danışmanlık talebiniz başarıyla gönderildi! 24 saat içinde size dönüş yapacağız.');
    setShowContactModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      projectLocation: '',
      projectSize: '',
      budget: '',
      timeline: '',
      message: '',
      serviceType: 'project-consultancy'
    });
  };

  const projectTypes = [
    'Cam Sera (1,000-5,000 m²)',
    'Cam Sera (5,000+ m²)',
    'Polikarbon Sera',
    'Plastik Tünel Sera',
    'Hidroponik Sistem',
    'Organik Üretim Sistemi'
  ];

  const budgetRanges = [
    '₺100,000 - ₺500,000',
    '₺500,000 - ₺1,000,000',
    '₺1,000,000 - ₺5,000,000',
    '₺5,000,000+'
  ];

  const timelineOptions = [
    '1-3 ay',
    '3-6 ay',
    '6-12 ay',
    '1+ yıl'
  ];

  return (
    <div className="min-h-screen bg-[#f6f8f9]">
      {/* Hero Section */}
      <section className="bg-[#146448] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-[896px] mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Mühendis Danışmanlığı
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-[576px] mx-auto">
              20 yıllık tecrübemiz ve 500+ başarılı projemizden edindiğimiz deneyimle, 
              sera yatırımınızda yanınızdayız.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-[896px] mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-[#baf200]">20+</div>
                <div className="text-sm opacity-90">Yıllık Tecrübe</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-[#baf200]">500+</div>
                <div className="text-sm opacity-90">Başarılı Proje</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-[#baf200]">98%</div>
                <div className="text-sm opacity-90">Müşteri Memnuniyeti</div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-[#baf200] text-[#146448] px-8 py-4 rounded-xl font-bold hover:bg-[#a5e600] transition-colors"
              >
                Danışmanlık Talep Et
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[896px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-[#146448] mb-4">Proje Danışmanlığı Hizmetimiz</h2>
              <p className="text-gray-600 max-w-[576px] mx-auto">
                SeraGPT'den alınan raporlar yeterli gelmediğinde, yerinde keşif yaparak kapsamlı 
                projelendirme desteği, yatırım danışmanlığı ve pazarlama yönetimi konularında 
                bütüncül yaklaşımla hizmet sunuyoruz.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#f6f8f9] rounded-xl p-6 border border-gray-200">
                <div className="text-4xl mb-4 text-center">🔍</div>
                <h3 className="text-xl font-bold text-[#146448] mb-3 text-center">Yerinde Keşif</h3>
                <p className="text-gray-600 text-center">
                  Proje lokasyonunda detaylı inceleme ve analiz çalışması
                </p>
              </div>

              <div className="bg-[#f6f8f9] rounded-xl p-6 border border-gray-200">
                <div className="text-4xl mb-4 text-center">📋</div>
                <h3 className="text-xl font-bold text-[#146448] mb-3 text-center">Projelendirme</h3>
                <p className="text-gray-600 text-center">
                  Teknik planlar, ekipman seçimi ve detaylı mühendislik desteği
                </p>
              </div>

              <div className="bg-[#f6f8f9] rounded-xl p-6 border border-gray-200">
                <div className="text-4xl mb-4 text-center">💼</div>
                <h3 className="text-xl font-bold text-[#146448] mb-3 text-center">Yatırım Danışmanlığı</h3>
                <p className="text-gray-600 text-center">
                  Finansman, hibeler ve pazarlama stratejileri konusunda rehberlik
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serapoli Partnership */}
      <section className="py-16 bg-[#f6f8f9]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[896px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-[#146448] mb-4">Serapoli Ortaklığı</h2>
              <p className="text-gray-600 max-w-[576px] mx-auto">
                İspanyol çözüm ortağımız Serapoli ile birlikte tek elden anahtar teslim hizmet sunuyoruz
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-[#146448] mb-4">Anahtar Teslim Sera Çözümleri</h3>
                  <p className="text-gray-600 mb-6 max-w-[576px]">
                    Danışmanlık hizmetimize ek olarak imalat, montaj, kurulum, zirai danışmanlık 
                    ve servis hizmetleri içinde proje teklifi vermekteyiz. Yurtiçi ve yurtdışı 
                    bir çok başarılı mega sera yatırımı ile güven duyarak, profesyonel hizmet 
                    alacağınızdan emin olabilirsiniz.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#baf200] rounded-full"></div>
                      <span className="text-gray-700">İmalat ve Montaj</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#baf200] rounded-full"></div>
                      <span className="text-gray-700">Kurulum ve Devreye Alma</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#baf200] rounded-full"></div>
                      <span className="text-gray-700">Zirai Danışmanlık</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#baf200] rounded-full"></div>
                      <span className="text-gray-700">Servis ve Bakım Hizmetleri</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#146448] rounded-xl p-6 text-white">
                  <h4 className="text-lg font-bold mb-4">🏆 Başarılı Projelerimiz</h4>
                  
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-medium">Antalya Sera Kompleksi</div>
                      <div className="text-sm opacity-90">25,000 m² • Modern Cam Sera</div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-medium">Mersin Organik Sera</div>
                      <div className="text-sm opacity-90">15,000 m² • Hidroponik Sistem</div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-medium">İzmir Teknoloji Sera</div>
                      <div className="text-sm opacity-90">20,000 m² • Akıllı Otomasyon</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#baf200]">60,000+ m²</div>
                      <div className="text-sm opacity-90">Toplam Proje Alanı</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[896px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-[#146448] mb-4">Neden Bizi Seçmelisiniz?</h2>
              <p className="text-gray-600 max-w-[576px] mx-auto">
                Güven duyabileceğiniz, profesyonel hizmet almanızı garanti eden özelliklerimiz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '🎯',
                  title: '20 Yıl Tecrübe',
                  description: 'Sera tarımında köklü deneyim'
                },
                {
                  icon: '📊',
                  title: '500+ Proje',
                  description: 'Kanıtlanmış başarı sicili'
                },
                {
                  icon: '🤝',
                  title: 'Bütüncül Yaklaşım',
                  description: 'Baştan sona tam destek'
                },
                {
                  icon: '🌍',
                  title: 'Uluslararası Ortaklık',
                  description: 'Serapoli ile global çözümler'
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 bg-[#f6f8f9] rounded-xl border border-gray-200">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-[#146448] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#146448] text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-[576px] mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Sera Projenizi Gerçekleştirin
            </h2>
            <p className="text-xl mb-8 opacity-90">
              20 yıllık tecrübemizle hayalinizdeki sera projesini birlikte hayata geçirelim
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-[#baf200] text-[#146448] px-8 py-4 rounded-xl font-bold hover:bg-[#a5e600] transition-colors"
              >
                Danışmanlık Talep Et
              </button>
              <Link href="/yardim">
                <button className="bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/30">
                  Sıkça Sorulan Sorular
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#146448]">Danışmanlık Talebi</h3>
                  <p className="text-gray-600 text-sm">Proje detaylarınızı paylaşın, size özel çözüm geliştirelim</p>
                </div>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    <option value="">Proje türünü seçin</option>
                    {projectTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">
                    Proje Lokasyonu
                  </label>
                  <input
                    type="text"
                    name="projectLocation"
                    value={formData.projectLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                    placeholder="İl/İlçe bilgisi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">
                    Proje Büyüklüğü
                  </label>
                  <input
                    type="text"
                    name="projectSize"
                    value={formData.projectSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                    placeholder="Örn: 5,000 m²"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                >
                  <option value="">Ne zaman başlamayı planlıyorsunuz?</option>
                  {timelineOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#146448] mb-2">
                  Proje Detayları ve İhtiyaçlarınız
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  placeholder="Projeniz hakkında detaylı bilgi verin, özel ihtiyaçlarınızı belirtin..."
                />
              </div>

              <div className="bg-[#f6f8f9] rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-medium text-[#146448] mb-1">20 Yıllık Tecrübe</h4>
                    <p className="text-sm text-gray-600">
                      Talebinizi aldıktan sonra 24 saat içinde uzman ekibimiz size dönüş yapacak 
                      ve 500+ projeden edindiğimiz deneyimle size özel çözüm önerileri sunacaktır.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#146448] text-white py-3 rounded-lg font-medium hover:bg-[#0f4f37] transition-colors"
                >
                  Danışmanlık Talebini Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
