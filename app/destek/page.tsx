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
    description: '',
    attachments: [] as File[]
  });

  const [submittedTickets, setSubmittedTickets] = useState([
    {
      id: 'SPT-2025-001',
      subject: 'Dashboard erişim sorunu',
      category: 'Teknik Destek',
      status: 'open',
      priority: 'high',
      createdAt: '2025-01-15T10:30:00Z',
      lastUpdate: '2025-01-15T14:20:00Z',
      assignedTo: 'Ahmet Yılmaz'
    },
    {
      id: 'SPT-2025-002',
      subject: 'ROI analizi sonuçları hakkında',
      category: 'Genel Destek',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2025-01-14T09:15:00Z',
      lastUpdate: '2025-01-14T16:45:00Z',
      assignedTo: 'Elif Kaya'
    }
  ]);

  const supportCategories = [
    {
      id: 'technical',
      title: 'Teknik Destek',
      icon: '🔧',
      description: 'Platform kullanımı, hata raporları, teknik sorunlar',
      responseTime: '2-4 saat',
      examples: ['Login sorunu', 'Rapor indirme hatası', 'Platform yavaşlığı']
    },
    {
      id: 'account',
      title: 'Hesap Yönetimi',
      icon: '👤',
      description: 'Hesap ayarları, şifre sıfırlama, profil güncelleme',
      responseTime: '1-2 saat',
      examples: ['Şifre sıfırlama', 'E-posta değişikliği', 'Hesap kapatma']
    },
    {
      id: 'billing',
      title: 'Faturalandırma',
      icon: '💳',
      description: 'Ödeme sorunları, fatura talepleri, abonelik işlemleri',
      responseTime: '4-8 saat',
      examples: ['Ödeme sorunu', 'Fatura talebi', 'Plan değişikliği']
    },
    {
      id: 'analysis',
      title: 'Analiz Desteği',
      icon: '📊',
      description: 'Rapor yorumlama, analiz sonuçları, öneriler',
      responseTime: '6-12 saat',
      examples: ['ROI yorumlama', 'İklim analizi soruları', 'Pazar verileri']
    },
    {
      id: 'ai',
      title: 'AI Asistan',
      icon: '🤖',
      description: 'SeraGPT kullanımı, AI önerileri, chat sorunları',
      responseTime: '2-6 saat',
      examples: ['AI yanıt kalitesi', 'Chat geçmişi', 'Önerileri anlama']
    },
    {
      id: 'general',
      title: 'Genel Destek',
      icon: '💬',
      description: 'Diğer sorular, öneriler, genel bilgi talebi',
      responseTime: '12-24 saat',
      examples: ['Özellik önerisi', 'Genel soru', 'Görüş bildirme']
    }
  ];

  const faqItems = [
    {
      category: 'technical',
      question: 'Platform\'a giriş yapamıyorum, ne yapmalıyım?',
      answer: 'Şifrenizi sıfırlamayı deneyin. Eğer sorun devam ederse, tarayıcı önbelleğinizi temizleyin ve farklı tarayıcı ile deneyin. Sorun çözülmezse destek talebi oluşturun.'
    },
    {
      category: 'analysis',
      question: 'ROI analizi sonuçlarım gerçekçi görünmüyor, neden?',
      answer: 'ROI hesaplama girdi verilerinizin doğruluğuna bağlıdır. Maliyet ve gelir projeksiyonlarınızı kontrol edin. Detaylı inceleme için analiz desteği kategorisinden ticket oluşturun.'
    },
    {
      category: 'ai',
      question: 'SeraGPT yanlış öneriler veriyor, nasıl iyileştirebilirim?',
      answer: 'Daha spesifik sorular sorun ve mevcut analiz raporlarınızı referans alın. Derin analiz modunu aktifleştirin. Sürekli sorun yaşıyorsanız örneklerle birlikte destek talebi oluşturun.'
    },
    {
      category: 'billing',
      question: 'Faturamı nasıl indirebilirim?',
      answer: 'Dashboard > Hesap Ayarları > Faturalandırma bölümünden geçmiş faturalarınızı görüntüleyebilir ve indirebilirsiniz. Sorun yaşıyorsanız faturalandırma desteği kategorisinden yardım alın.'
    }
  ];

  const supportChannels = [
    {
      title: 'E-posta Desteği',
      description: 'En detaylı yardım için',
      icon: '📧',
      contact: 'destek@seragpt.com',
      responseTime: '4-24 saat',
      availability: '7/24',
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Canlı Chat',
      description: 'Anlık yardım için',
      icon: '💬',
      contact: 'Chat Başlat',
      responseTime: '2-5 dakika',
      availability: 'Hafta içi 09:00-18:00',
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Telefon Desteği',
      description: 'Acil durumlar için',
      icon: '📞',
      contact: '+90 312 555 0123',
      responseTime: 'Anında',
      availability: 'Hafta içi 09:00-18:00',
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Video Görüşme',
      description: 'Uzaktan teknik destek',
      icon: '📹',
      contact: 'Randevu Al',
      responseTime: '30 dakika - 2 saat',
      availability: 'Hafta içi 10:00-17:00',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Düşük', description: 'Genel sorular, öneriler', color: 'text-green-600' },
    { value: 'medium', label: 'Orta', description: 'Kullanım sorunları, hesap işlemleri', color: 'text-yellow-600' },
    { value: 'high', label: 'Yüksek', description: 'Önemli teknik sorunlar', color: 'text-orange-600' },
    { value: 'critical', label: 'Kritik', description: 'Hizmet kesintisi, güvenlik sorunları', color: 'text-red-600' }
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
    
    const newTicket = {
      id: `SPT-2025-${String(submittedTickets.length + 3).padStart(3, '0')}`,
      subject: ticketData.subject,
      category: ticketData.category,
      status: 'open' as const,
      priority: ticketData.priority as any,
      createdAt: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      assignedTo: 'Otomatik Atama'
    };

    setSubmittedTickets(prev => [newTicket, ...prev]);
    
    alert(`Destek talebiniz başarıyla oluşturuldu!\n\nTalep Numarası: ${newTicket.id}\n\nSize e-posta ile bilgilendirme gönderilecek ve en kısa sürede uzman ekibimiz tarafından yanıtlanacaktır.`);
    
    setShowTicketModal(false);
    setTicketData({
      name: '',
      email: '',
      subject: '',
      category: '',
      priority: 'medium',
      description: '',
      attachments: []
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f9]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#146448] to-[#0f4f37] text-white py-20">
        <div className="body-container">
          <div className="text-center text-container mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              🎫 Destek Merkezi
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Size yardımcı olmaktan mutluluk duyuyoruz. Sorularınızı cevaplıyor, 
              panel kullanımında ve teknik konularda etkili çözümler sunuyoruz.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => setShowTicketModal(true)}
                className="bg-[#baf200] text-[#146448] px-8 py-4 rounded-2xl font-bold hover:bg-[#baf200]/90 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                🎫 Yeni Destek Talebi
              </button>
              <Link href="#faq">
                <button className="bg-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-colors border border-white/30">
                  ❓ SSS'ye Göz At
                </button>
              </Link>
            </div>

            {/* Support Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-[#baf200]">2.5</div>
                <div className="text-sm opacity-90">Ortalama Yanıt Süresi (saat)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-[#baf200]">98%</div>
                <div className="text-sm opacity-90">İlk Kontakta Çözüm</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-[#baf200]">24/7</div>
                <div className="text-sm opacity-90">E-posta Desteği</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 bg-white">
        <div className="body-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">🚀 Destek Kategorileri</h2>
            <p className="text-gray-600 text-container mx-auto">
              Sorunuzun türüne göre en hızlı çözümü almak için doğru kategoriyi seçin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((category) => (
              <div key={category.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
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

                <div className="space-y-2 mb-6">
                  <div className="text-xs font-medium text-gray-500 mb-2">Örnek Konular:</div>
                  {category.examples.map((example, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#baf200] rounded-full flex-shrink-0"></div>
                      <span className="text-xs text-gray-600">{example}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setTicketData(prev => ({ ...prev, category: category.title }));
                    setShowTicketModal(true);
                  }}
                  className="w-full bg-[#146448] text-white py-3 rounded-2xl hover:bg-[#0f4f37] transition-all duration-300 font-medium group-hover:bg-[#baf200] group-hover:text-[#146448]"
                >
                  Talep Oluştur
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My Tickets Section */}
      {submittedTickets.length > 0 && (
        <section className="py-16 bg-[#f6f8f9]">
          <div className="body-container">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-[#146448] mb-4">📋 Destek Taleplerim</h2>
              <p className="text-gray-600 text-container mx-auto">
                Oluşturduğunuz destek taleplerinin durumunu takip edin
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {submittedTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-bold text-[#146448]">{ticket.subject}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status === 'open' ? 'Açık' : 
                           ticket.status === 'in-progress' ? 'İşlemde' : 
                           ticket.status === 'resolved' ? 'Çözüldü' : 'Kapatıldı'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority === 'low' ? 'Düşük' :
                           ticket.priority === 'medium' ? 'Orta' :
                           ticket.priority === 'high' ? 'Yüksek' : 'Kritik'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Talep ID:</span>
                          <div className="font-mono text-[#146448]">{ticket.id}</div>
                        </div>
                        <div>
                          <span className="font-medium">Kategori:</span>
                          <div>{ticket.category}</div>
                        </div>
                        <div>
                          <span className="font-medium">Oluşturulma:</span>
                          <div>{new Date(ticket.createdAt).toLocaleDateString('tr-TR')}</div>
                        </div>
                        <div>
                          <span className="font-medium">Atanan:</span>
                          <div>{ticket.assignedTo}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-[#146448] text-white rounded-xl hover:bg-[#0f4f37] transition-colors text-sm">
                        Detaylar
                      </button>
                      {ticket.status === 'open' && (
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors text-sm">
                          Güncelle
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Support Channels */}
      <section className="py-16 bg-white">
        <div className="body-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">📞 İletişim Kanalları</h2>
            <p className="text-gray-600 text-container mx-auto">
              Size en uygun iletişim kanalını seçerek uzman ekibimizle bağlantı kurun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${channel.color} rounded-2xl flex items-center justify-center text-2xl text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {channel.icon}
                </div>
                
                <h3 className="font-bold text-[#146448] mb-2">{channel.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{channel.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-500">İletişim:</span>
                    <div className="font-medium text-[#146448]">{channel.contact}</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Yanıt Süresi:</span>
                    <div className="font-medium text-[#146448]">{channel.responseTime}</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Müsaitlik:</span>
                    <div className="font-medium text-[#146448]">{channel.availability}</div>
                  </div>
                </div>

                <button className="w-full bg-[#146448] text-white py-3 rounded-2xl hover:bg-[#0f4f37] transition-colors font-medium">
                  {channel.title === 'E-posta Desteği' ? 'E-posta Gönder' :
                   channel.title === 'Canlı Chat' ? 'Chat Başlat' :
                   channel.title === 'Telefon Desteği' ? 'Ara' : 'Randevu Al'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-[#f6f8f9]">
        <div className="body-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#146448] mb-4">❓ Sıkça Sorulan Sorular</h2>
            <p className="text-gray-600 text-container mx-auto">
              En çok sorulan soruların yanıtlarını hızlıca bulun
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <h3 className="font-medium text-[#146448] flex-1">{item.question}</h3>
                  <svg className="w-5 h-5 text-[#146448] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
                  <p className="leading-relaxed pt-4">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/yardim">
              <button className="bg-[#146448] text-white px-6 py-3 rounded-2xl hover:bg-[#0f4f37] transition-colors">
                Tüm Yardım Makalelerini Görüntüle
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ticket Creation Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#146448]">🎫 Yeni Destek Talebi</h3>
                  <p className="text-gray-600 text-sm">Sorununuzu detaylı açıklayın, en kısa sürede çözüm bulalım</p>
                </div>
                <button
                  onClick={() => setShowTicketModal(false)}
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
                    value={ticketData.name}
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
                    value={ticketData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                  >
                    {priorityLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label} - {level.description}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] transition-colors"
                  placeholder="Sorununuzu mümkün olduğunca detaylı açıklayın. Hangi adımları denediğinizi, hata mesajlarını ve ekran görüntülerini paylaşın."
                />
              </div>

              <div className="bg-[#f6f8f9] rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-medium text-[#146448] mb-1">Hızlı Çözüm İpuçları</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Ekran görüntüsü eklemek çözüm süresini %50 hızlandırır</li>
                      <li>• Hata mesajlarını tam olarak kopyalayın</li>
                      <li>• Hangi tarayıcı ve işletim sistemi kullandığınızı belirtin</li>
                      <li>• Sorunu çözmek için denediğiniz adımları listeleyin</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#146448] to-[#baf200] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  🎫 Destek Talebini Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
