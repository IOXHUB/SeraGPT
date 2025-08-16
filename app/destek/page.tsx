'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function DestekPage() {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    priority: 'normal',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `DST-${Date.now()}`;
    alert(`Destek kaydınız oluşturuldu!\nKayıt No: ${ticketId}\n\n24 saat içinde size dönüş yapacağız.`);
    setShowTicketModal(false);
    setFormData({ name: '', email: '', subject: '', category: '', priority: 'normal', message: '' });
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
                  Destek Kaydı Aç
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
                  Teknik sorunlarınız için destek kaydı oluşturun. Uzman ekibimiz 24 saat içinde size dönüş yapacaktır.
                </p>
              </div>

              <button
                onClick={() => setShowTicketModal(true)}
                className="px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#baf200',
                  color: '#146448',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, "system-ui", Inter, "Segoe UI", Roboto, "Noto Sans", Ubuntu, sans-serif'
                }}
              >
                Yeni Destek Kaydı Oluştur
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <main className="py-16" style={{ backgroundColor: '#f6f8f9' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          
          {/* Support Categories */}
          <div className="max-w-[896px] mx-auto mb-16">
            <h2 className="text-2xl font-bold text-[#146448] text-center mb-8">Destek Kategorileri</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4 text-center">🔧</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2 text-center">Teknik Destek</h3>
                <p className="text-gray-600 text-center text-sm mb-4">
                  Platform kullanımı, rapor indirme, hesap sorunları
                </p>
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, category: 'Teknik Destek' }));
                    setShowTicketModal(true);
                  }}
                  className="w-full bg-[#146448] text-white py-2 rounded-lg hover:bg-[#0f4f37] transition-colors"
                >
                  Kayıt Aç
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4 text-center">📊</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2 text-center">Analiz Desteği</h3>
                <p className="text-gray-600 text-center text-sm mb-4">
                  ROI, iklim, ekipman analizleri hakkında sorular
                </p>
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, category: 'Analiz Desteği' }));
                    setShowTicketModal(true);
                  }}
                  className="w-full bg-[#146448] text-white py-2 rounded-lg hover:bg-[#0f4f37] transition-colors"
                >
                  Kayıt Aç
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4 text-center">💬</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2 text-center">Genel Sorular</h3>
                <p className="text-gray-600 text-center text-sm mb-4">
                  Diğer konular ve genel bilgi talepleri
                </p>
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, category: 'Genel Sorular' }));
                    setShowTicketModal(true);
                  }}
                  className="w-full bg-[#146448] text-white py-2 rounded-lg hover:bg-[#0f4f37] transition-colors"
                >
                  Kayıt Aç
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="max-w-[576px] mx-auto text-center">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[#146448] mb-4">İletişim Bilgileri</h3>
              <div className="space-y-3 text-gray-600">
                <p><strong>Yanıt Süresi:</strong> 24 saat içinde</p>
                <p><strong>Çalışma Saatleri:</strong> 7/24 E-posta Desteği</p>
                <p><strong>Destek Türü:</strong> Ticket sistemi ile profesyonel destek</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation to Other Pages */}
      <section className="py-16 bg-white">
        <div className="max-w-[896px] mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#146448] text-center mb-8">Diğer Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/danismanlik" className="block">
              <div className="bg-[#f6f8f9] rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all group">
                <div className="text-3xl mb-4 text-center">👨‍🔬</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2 text-center group-hover:text-[#baf200] transition-colors">
                  Proje Danışmanlığı
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  20 yıl tecrübe ile uzman danışmanlık hizmeti
                </p>
              </div>
            </Link>

            <Link href="/anahtar-teslim-proje" className="block">
              <div className="bg-[#f6f8f9] rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all group">
                <div className="text-3xl mb-4 text-center">🏗️</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2 text-center group-hover:text-[#baf200] transition-colors">
                  Anahtar Teslim Sera
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  İspanyol ortaklığı ile tam hizmet çözümleri
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Support Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#146448]">Destek Kaydı Oluştur</h3>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">Ad Soyad *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">E-posta *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#146448] mb-2">Konu *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">Kategori *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Teknik Destek">Teknik Destek</option>
                    <option value="Analiz Desteği">Analiz Desteği</option>
                    <option value="Genel Sorular">Genel Sorular</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">Öncelik</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    <option value="düşük">Düşük</option>
                    <option value="normal">Normal</option>
                    <option value="yüksek">Yüksek</option>
                    <option value="acil">Acil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#146448] mb-2">Mesaj *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  placeholder="Sorununuzu detaylı açıklayın..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#146448] text-white py-3 rounded-lg font-medium hover:bg-[#0f4f37] transition-colors"
                >
                  Kayıt Oluştur
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
