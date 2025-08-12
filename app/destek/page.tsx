'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SupportPage() {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });

  const supportCategories = [
    {
      id: 'platform',
      title: 'Platform Kullanımı',
      description: 'SeraGPT arayüzü, rapor indirme, hesap işlemleri',
      responseTime: '2-4 saat'
    },
    {
      id: 'analysis',
      title: 'Analiz Raporları',
      description: 'ROI, iklim, ekipman analizleri hakkında sorular',
      responseTime: '4-8 saat'
    },
    {
      id: 'technical',
      title: 'Teknik Sorular',
      description: 'Sera teknolojileri, ekipman seçimi konularında',
      responseTime: '6-12 saat'
    },
    {
      id: 'general',
      title: 'Genel Sorular',
      description: 'Diğer konular, öneriler ve bilgi talepleri',
      responseTime: '12-24 saat'
    }
  ];

  const faqItems = [
    {
      question: 'SeraGPT analizleri nasıl yorumlarım?',
      answer: 'Analizlerimiz 20 yıllık tecrübemiz ve 500+ projeden elde edilen verilerle hazırlanır. Her raporda detaylı açıklamalar ve öneriler yer alır. Anlayamadığınız kısımlar için destek talebi oluşturabilirsiniz.'
    },
    {
      question: 'Rapor indirirken sorun yaşıyorum',
      answer: 'Rapor indirme sorunu yaşıyorsanız, tarayıcınızın güncel olduğundan emin olun. Sorun devam ederse platform kullanımı kategorisinden destek talebi oluşturun.'
    },
    {
      question: 'Proje danışmanlığı ne zaman gerekli?',
      answer: 'SeraGPT raporları yeterli gelmediğinde, yerinde keşif ve detaylı projelendirme desteği için proje danışmanlığı hizmetimizden yararlanabilirsiniz.'
    },
    {
      question: 'Anahtar teslim proje hizmeti nasıl çalışır?',
      answer: 'İspanyol ortağımız Serapoli ile birlikte imalat, montaj, kurulum, zirai danışmanlık ve servis hizmetlerini tek elden sunuyoruz. Detaylı bilgi için danışmanlık sayfamızı ziyaret edin.'
    }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Düşük - Genel sorular', color: 'text-green-600' },
    { value: 'medium', label: 'Orta - Platform kullanımı', color: 'text-yellow-600' },
    { value: 'high', label: 'Yüksek - Önemli teknik sorun', color: 'text-orange-600' },
    { value: 'critical', label: 'Kritik - Acil çözüm gerekli', color: 'text-red-600' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicketData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Destek talebi:', ticketData);
    
    const ticketId = `SPT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    alert(`Destek talebiniz başarıyla oluşturuldu!\n\nTalep Numarası: ${ticketId}\n\nSize e-posta ile bilgilendirme gönderilecek ve uzman ekibimiz en kısa sürede size dönüş yapacaktır.`);
    
    setShowTicketModal(false);
    setTicketData({
      name: '',
      email: '',
      subject: '',
      category: '',
      priority: 'medium',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f8f9]">
      {/* Hero Section */}
      <section className="bg-[#146448] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-[896px] mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Destek Merkezi
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-[576px] mx-auto">
              Size yardımcı olmaktan mutluluk duyuyoruz. Sorularınızı cevaplıyor, 
              panel kullanımında ve teknik konularda etkili çözümler sunuyoruz.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => setShowTicketModal(true)}
                className="bg-[#baf200] text-[#146448] px-8 py-4 rounded-xl font-bold hover:bg-[#a5e600] transition-colors"
              >
                Destek Talebi Oluştur
              </button>
              <Link href="#faq">
                <button className="bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/30">
                  Sıkça Sorulan Sorular
                </button>
              </Link>
            </div>

            {/* Support Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-[896px] mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-[#baf200]">4-24</div>
                <div className="text-sm opacity-90">Saat İçinde Yanıt</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-[#baf200]">98%</div>
                <div className="text-sm opacity-90">Çözüm Oranı</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-[#baf200]">7/24</div>
                <div className="text-sm opacity-90">E-posta Desteği</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">Destek Kategorileri</h2>
            <p className="text-gray-600 max-w-[576px] mx-auto">
              Sorunuzun türüne göre en hızlı çözümü almak için doğru kategoriyi seçin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[896px] mx-auto">
            {supportCategories.map((category) => (
              <div key={category.id} className="bg-[#f6f8f9] border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-[#146448] mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 bg-[#baf200]/20 text-[#146448] rounded-full text-xs font-medium">
                    ⏱️ {category.responseTime}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setTicketData(prev => ({ ...prev, category: category.title }));
                    setShowTicketModal(true);
                  }}
                  className="w-full bg-[#146448] text-white py-3 rounded-xl hover:bg-[#0f4f37] transition-colors font-medium"
                >
                  Talep Oluştur
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-[#f6f8f9]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-600 max-w-[576px] mx-auto">
              En çok sorulan soruların yanıtlarını hızlıca bulun
            </p>
          </div>

          <div className="max-w-[896px] mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <h3 className="font-medium text-[#146448] flex-1">{item.question}</h3>
                  <svg className="w-5 h-5 text-[#146448] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
                  <p className="leading-relaxed pt-4 max-w-[576px]">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/yardim">
              <button className="bg-[#146448] text-white px-6 py-3 rounded-xl hover:bg-[#0f4f37] transition-colors">
                Tüm Yardım Makalelerini Görüntüle
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">İletişim Bilgileri</h2>
            <p className="text-gray-600 max-w-[576px] mx-auto">
              Destek ekibimizle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[896px] mx-auto">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-bold text-[#146448] mb-2">E-posta Desteği</h3>
              <p className="text-gray-600 text-sm mb-4">Ticket sistemi ile profesyonel destek</p>
              <p className="text-[#146448] font-medium">7/24 E-posta Desteği</p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">👨‍🔬</div>
              <h3 className="font-bold text-[#146448] mb-2">Uzman Danışmanlık</h3>
              <p className="text-gray-600 text-sm mb-4">20 yıl tecrübe ile proje desteği</p>
              <Link href="/danismanlik" className="text-[#146448] font-medium hover:underline">
                Danışmanlık Sayfası
              </Link>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="font-bold text-[#146448] mb-2">Anahtar Teslim Proje</h3>
              <p className="text-gray-600 text-sm mb-4">Serapoli ortaklığı ile tam hizmet</p>
              <Link href="/anahtar-teslim-proje" className="text-[#146448] font-medium hover:underline">
                Proje Sayfası
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Creation Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#146448]">Destek Talebi Oluştur</h3>
                  <p className="text-gray-600 text-sm">Sorununuzu detaylı açıklayın, en kısa sürede çözüm bulalım</p>
                </div>
                <button
                  onClick={() => setShowTicketModal(false)}
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
                    value={ticketData.name}
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
                    value={ticketData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                    placeholder="E-posta adresinizi girin"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#146448] mb-2">
                  Konu Başlığı *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={ticketData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  placeholder="Sorunuzu kısaca özetleyin"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    value={ticketData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    <option value="">Kategori seçin</option>
                    {supportCategories.map((category) => (
                      <option key={category.id} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">
                    Öncelik Seviyesi *
                  </label>
                  <select
                    name="priority"
                    value={ticketData.priority}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    {priorityLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#146448] mb-2">
                  Detaylı Açıklama *
                </label>
                <textarea
                  name="description"
                  value={ticketData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  placeholder="Sorununuzu mümkün olduğunca detaylı açıklayın. Hangi adımları denediğinizi ve karşılaştığınız hataları belirtin."
                />
              </div>

              <div className="bg-[#f6f8f9] rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-medium text-[#146448] mb-1">Hızlı Çözüm İpucu</h4>
                    <p className="text-sm text-gray-600">
                      Sorununuzu detaylı açıklamak çözüm süresini hızlandırır. 
                      Hangi tarayıcı kullandığınızı ve karşılaştığınız hata mesajlarını 
                      belirtmeyi unutmayın.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#146448] text-white py-3 rounded-lg font-medium hover:bg-[#0f4f37] transition-colors"
                >
                  Destek Talebini Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
