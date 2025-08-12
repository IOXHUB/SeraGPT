'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const helpCategories = [
    { id: 'all', name: 'Tümü', icon: '📚', count: 24 },
    { id: 'getting-started', name: 'Başlangıç', icon: '🚀', count: 6 },
    { id: 'analysis', name: 'Analiz Raporları', icon: '📊', count: 8 },
    { id: 'ai-chat', name: 'AI Asistan', icon: '🤖', count: 4 },
    { id: 'account', name: 'Hesap Yönetimi', icon: '👤', count: 3 },
    { id: 'billing', name: 'Faturalandırma', icon: '💳', count: 3 }
  ];

  const faqData = [
    {
      id: 1,
      category: 'getting-started',
      question: 'SeraGPT platformunu nasıl kullanmaya başlarım?',
      answer: 'SeraGPT\'ye başlamak için öncelikle hesap oluşturmanız gerekiyor. Kayıt olduktan sonra dashboard\'a erişim sağlayacaksınız. İlk adım olarak sera projenizin temel bilgilerini girerek ROI analizi oluşturabilirsiniz. Platform size adım adım rehberlik edecektir.',
      tags: ['başlangıç', 'kayıt', 'dashboard']
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'Hangi sera türleri için analiz yapabilirim?',
      answer: 'SeraGPT tüm sera türleri için kapsamlı analiz sunmaktadır: Cam seralar, polikarbon seralar, plastik tünel seralar, hidroponik sistemler, aeroponik sistemler ve dikey tarım sistemleri. Her sera türü için özelleştirilmiş analiz parametreleri mevcuttur.',
      tags: ['sera türleri', 'analiz', 'sistem türleri']
    },
    {
      id: 3,
      category: 'analysis',
      question: 'ROI analizi nasıl hesaplanır?',
      answer: 'ROI analizi; toplam yatırım maliyeti, beklenen yıllık gelir, operasyonel giderler, vergi hesaplamaları ve pazar koşulları dikkate alınarak hesaplanır. Monte Carlo simülasyonu ile risk analizi de dahil edilir. Analiz 5 yıllık projeksiyon içerir ve NPV, IRR değerlerini de sunar.',
      tags: ['roi', 'finansal analiz', 'hesaplama']
    },
    {
      id: 4,
      category: 'analysis',
      question: 'İklim analizi hangi faktörleri içerir?',
      answer: 'İklim analizi şu faktörleri kapsar: Bölgesel sıcaklık verileri, nem oranları, rüzgar analizleri, yağış miktarları, don riski hesaplamaları, güneş ışığı süreleri ve iklim değişikliği projeksiyonları. Veriler meteoroloji genel müdürlüğü ve uluslararası iklim veri tabanlarından alınır.',
      tags: ['iklim', 'hava durumu', 'çevresel faktörler']
    },
    {
      id: 5,
      category: 'analysis',
      question: 'Pazar analizi nasıl güncellenir?',
      answer: 'Pazar analizi verileri haftalık olarak güncellenir. Hal fiyatları, ihracat verileri, üretici fiyat endeksleri ve uluslararası piyasa trendleri takip edilir. Yapay zeka algoritmaları ile fiyat tahminlemeleri yapılır ve sezonsal değişimler analiz edilir.',
      tags: ['pazar', 'fiyat', 'güncelleme']
    },
    {
      id: 6,
      category: 'ai-chat',
      question: 'SeraGPT AI asistanı nasıl çalışır?',
      answer: 'SeraGPT AI asistanı, sera tarımı konusunda uzmanlaşmış dil modelini kullanır. Analizlerinizi okuyarak kişiselleştirilmiş öneriler sunar. Derin analiz modunda daha detaylı stratejik öneriler ve aksiyon planları geliştirir. Türkçe doğal dil işleme ile profesyonel seviyede etkileşim sağlar.',
      tags: ['ai', 'asistan', 'chatbot']
    },
    {
      id: 7,
      category: 'ai-chat',
      question: 'AI asistanından en iyi sonuçları nasıl alırım?',
      answer: 'En iyi sonuçlar için: Spesifik sorular sorun, mevcut analizlerinizi referans alın, proje detaylarınızı paylaşın ve açık uçlu sorular yerine hedef odaklı sorular tercih edin. Derin analiz modunu karmaşık stratejik kararlar için kullanın.',
      tags: ['ai tips', 'optimizasyon', 'kullanım']
    },
    {
      id: 8,
      category: 'account',
      question: 'Hesap bilgilerimi nasıl güncellerim?',
      answer: 'Hesap bilgilerinizi dashboard\'dan "Profil Ayarları" bölümünden güncelleyebilirsiniz. E-posta değişikliği için e-posta doğrulaması gerekir. Şifre değişikliği için mevcut şifrenizi girmeniz gerekmektedir. Tüm değişiklikler güvenlik amaçlı kayıt altına alınır.',
      tags: ['profil', 'güncelleme', 'hesap']
    },
    {
      id: 9,
      category: 'billing',
      question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      answer: 'Kredi kartı (Visa, MasterCard, American Express), banka havalesi ve kurumsal faturalandırma seçeneklerimiz mevcuttur. Ödeme güvenliği için 3D Secure protokolü kullanılır. Kurumsal müşteriler için 30 günlük vadeli ödeme imkanı sunulmaktadır.',
      tags: ['ödeme', 'faturalandırma', 'güvenlik']
    },
    {
      id: 10,
      category: 'getting-started',
      question: 'Demo hesabı ile neler yapabilirim?',
      answer: 'Demo hesabı ile tüm analiz türlerini deneyebilir, AI asistanı ile etkileşim kurabilir ve platform özelliklerini keşfedebilirsiniz. Demo veriler gerçek proje örnekleri üzerinden hazırlanmıştır. Sınırlı rapor indirme hakkı vardır.',
      tags: ['demo', 'deneme', 'özellikler']
    }
  ];

  const quickLinks = [
    { title: 'Hızlı Başlangıç Rehberi', description: 'Platform kullanımına başlama kılavuzu', link: '#', icon: '🚀', time: '5 dk' },
    { title: 'Video Eğitimler', description: 'Adım adım video anlatımları', link: '#', icon: '🎥', time: '15 dk' },
    { title: 'API Dokümantasyonu', description: 'Geliştiriciler için teknik dökümanlar', link: '#', icon: '⚙️', time: '30 dk' },
    { title: 'En İyi Uygulamalar', description: 'Başarılı proje örnekleri ve ipuçları', link: '#', icon: '💡', time: '10 dk' },
    { title: 'Troubleshooting', description: 'Sık karşılaşılan sorunlar ve çözümleri', link: '#', icon: '🔧', time: '8 dk' },
    { title: 'Sistem Gereksinimleri', description: 'Minimum teknik gereksinimler', link: '#', icon: '💻', time: '3 dk' }
  ];

  const supportChannels = [
    {
      title: 'Canlı Destek Chat',
      description: 'Anlık yardım için canlı chat',
      icon: '💬',
      status: 'online',
      action: 'Chat Başlat',
      available: '7/24 aktif'
    },
    {
      title: 'E-posta Desteği',
      description: 'Detaylı sorular için e-posta',
      icon: '📧',
      status: 'available',
      action: 'E-posta Gönder',
      available: '24 saat içinde yanıt'
    },
    {
      title: 'Telefon Desteği', 
      description: 'Acil durumlar için telefon',
      icon: '📞',
      status: 'business',
      action: 'Ara: +90 312 555 0123',
      available: 'Hafta içi 09:00-18:00'
    },
    {
      title: 'Danışmanlık Talebi',
      description: 'Uzman danışmanlık hizmeti',
      icon: '👨‍🔬',
      status: 'premium',
      action: 'Randevu Al',
      available: 'Profesyonel danışmanlık'
    }
  ];

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f6f8f9]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#146448] to-[#0f4f37] text-white py-20">
        <div className="body-container">
          <div className="text-center text-container mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              🤝 Size Nasıl Yardımcı Olabiliriz?
            </h1>
            <p className="text-xl mb-8 opacity-90">
              SeraGPT hakkında aklınıza takılan her şeyi hızlıca bulun. 
              Kapsamlı yardım merkezi ile 7/24 desteğinizdeyiz.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Aradığınız konuyu yazın... (örn: ROI analizi nasıl yapılır?)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white/95 border border-white/30 rounded-2xl text-[#146448] placeholder-[#146448]/60 focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] text-base"
              />
              <svg className="absolute left-5 top-5 w-6 h-6 text-[#146448]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-[#baf200]">500+</div>
                <div className="text-sm opacity-90">Yardım Makalesi</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-[#baf200]">24/7</div>
                <div className="text-sm opacity-90">Destek Hizmeti</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-[#baf200]">98%</div>
                <div className="text-sm opacity-90">Memnuniyet Oranı</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="body-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">🚀 Hızlı Erişim</h2>
            <p className="text-gray-600 text-container mx-auto">
              En çok aranan konulara hızlı erişim sağlayın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link href={link.link} key={index} className="group">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#baf200] transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#146448] mb-2 group-hover:text-[#baf200] transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {link.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#baf200] text-sm font-medium">
                          Okuma süresi: {link.time}
                        </span>
                        <svg className="w-5 h-5 text-[#146448] group-hover:text-[#baf200] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#f6f8f9]">
        <div className="body-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">❓ Sıkça Sorulan Sorular</h2>
            <p className="text-gray-600 text-container mx-auto">
              En çok merak edilen konuların yanıtlarını bulun
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {helpCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#146448] text-white shadow-lg'
                    : 'bg-white text-[#146448] hover:bg-[#146448] hover:text-white border border-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
                <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-[#146448] mb-1">
                      {faq.question}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {faq.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-[#baf200]/20 text-[#146448] rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-[#146448] transition-transform ${
                      expandedFaq === faq.id ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
                    <p className="leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-[#146448] mb-2">
                Aradığınız sonuç bulunamadı
              </h3>
              <p className="text-gray-600 mb-6">
                Farklı anahtar kelimeler deneyin veya kategori filtresini değiştirin
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-[#146448] text-white px-6 py-3 rounded-2xl hover:bg-[#0f4f37] transition-colors"
              >
                Filtreleri Temizle
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 bg-white">
        <div className="body-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">📞 Destek Kanalları</h2>
            <p className="text-gray-600 text-container mx-auto">
              Sorununuzu çözemediğiniz durumda uzman ekibimizle iletişime geçin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">{channel.icon}</div>
                <h3 className="font-bold text-[#146448] mb-2">{channel.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{channel.description}</p>
                
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  channel.status === 'online' ? 'bg-green-100 text-green-800' :
                  channel.status === 'available' ? 'bg-blue-100 text-blue-800' :
                  channel.status === 'business' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    channel.status === 'online' ? 'bg-green-500' :
                    channel.status === 'available' ? 'bg-blue-500' :
                    channel.status === 'business' ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`}></div>
                  {channel.available}
                </div>

                <Link href={channel.title === 'Danışmanlık Talebi' ? '/danismanlik' : '/destek'}>
                  <button className="w-full bg-[#146448] text-white py-3 rounded-2xl hover:bg-[#0f4f37] transition-colors font-medium">
                    {channel.action}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-[#146448] to-[#0f4f37] text-white">
        <div className="body-container">
          <div className="text-center text-container mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Hala cevap bulamadınız mı?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Uzman ekibimiz size özel çözümler geliştirmek için hazır
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/destek">
                <button className="bg-[#baf200] text-[#146448] px-8 py-4 rounded-2xl font-bold hover:bg-[#baf200]/90 transition-colors">
                  🎫 Destek Talebi Olu��tur
                </button>
              </Link>
              <Link href="/danismanlik">
                <button className="bg-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-colors border border-white/30">
                  👨‍🔬 Uzman Danışmanlığı Al
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
