'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-[#f6f8f9]">
      {/* Header */}
      <header className="bg-[#146448] py-6">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-white text-lg font-medium hover:text-[#baf200] transition-colors">
              ← Ana Sayfa
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/destek" className="text-white hover:text-[#baf200] transition-colors">
                Destek Kaydı Aç
              </Link>
              <Link href="/anahtar-teslim-proje" className="text-white hover:text-[#baf200] transition-colors">
                Anahtar Teslim Sera
              </Link>
            </div>
          </div>
          
          <div className="text-center max-w-[896px] mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">
              Proje Danışmanlığı
            </h1>
            <p className="text-xl text-white/90 max-w-[576px] mx-auto mb-8">
              20 yıllık tecrübemiz ve 500+ başarılı projemizle sera yatırımınızda 
              yanınızdayız. Uzman danışmanlık hizmeti alın.
            </p>
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-[#baf200] text-[#146448] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#a5e600] transition-colors"
            >
              Danışmanlık Talep Et
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          
          {/* Services */}
          <div className="max-w-[896px] mx-auto mb-16">
            <h2 className="text-2xl font-bold text-[#146448] text-center mb-8">Hizmetlerimiz</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4 text-center">🔍</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2 text-center">Yerinde Keşif</h3>
                <p className="text-gray-600 text-center text-sm mb-4">
                  Proje lokasyonunda detaylı inceleme ve analiz
                </p>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-[#146448] text-white py-2 rounded-lg hover:bg-[#0f4f37] transition-colors"
                >
                  Bilgi Al
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4 text-center">📋</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2 text-center">Projelendirme</h3>
                <p className="text-gray-600 text-center text-sm mb-4">
                  Teknik planlar ve mühendislik desteği
                </p>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-[#146448] text-white py-2 rounded-lg hover:bg-[#0f4f37] transition-colors"
                >
                  Bilgi Al
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4 text-center">💼</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2 text-center">Yatırım Danışmanlığı</h3>
                <p className="text-gray-600 text-center text-sm mb-4">
                  Finansman ve pazarlama stratejileri
                </p>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-[#146448] text-white py-2 rounded-lg hover:bg-[#0f4f37] transition-colors"
                >
                  Bilgi Al
                </button>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="max-w-[896px] mx-auto mb-16">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-[#146448] text-center mb-8">Tecrübemiz</h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#baf200] mb-2">20+</div>
                  <div className="text-gray-600">Yıllık Tecrübe</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#baf200] mb-2">500+</div>
                  <div className="text-gray-600">Başarılı Proje</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#baf200] mb-2">98%</div>
                  <div className="text-gray-600">Müşteri Memnuniyeti</div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="max-w-[576px] mx-auto text-center">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[#146448] mb-6">Neden Bizi Seçmelisiniz?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2"></div>
                  <p className="text-gray-600">20 yıllık sera tarımı tecrübesi</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2"></div>
                  <p className="text-gray-600">500+ başarılı proje deneyimi</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2"></div>
                  <p className="text-gray-600">Bütüncül yaklaşım ve profesyonel hizmet</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2"></div>
                  <p className="text-gray-600">İspanyol ortaklığı ile uluslararası standartlar</p>
                </div>
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
            <Link href="/destek" className="block">
              <div className="bg-[#f6f8f9] rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all group">
                <div className="text-3xl mb-4 text-center">🔧</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2 text-center group-hover:text-[#baf200] transition-colors">
                  Destek Kaydı Aç
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  Teknik sorunlarınız için profesyonel destek
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

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#146448]">Proje Danışmanlığı Talebi</h3>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">Telefon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">Şirket</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">Proje Türü</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Cam Sera">Cam Sera</option>
                    <option value="Polikarbon Sera">Polikarbon Sera</option>
                    <option value="Plastik Tünel">Plastik Tünel</option>
                    <option value="Hidroponik Sistem">Hidroponik Sistem</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">Lokasyon</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="İl/İlçe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#146448] mb-2">Proje Büyüklüğü</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="Örn: 5,000 m²"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#146448] mb-2">Proje Detayları</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  placeholder="Projeniz hakkında detaylı bilgi verin..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#146448] text-white py-3 rounded-lg font-medium hover:bg-[#0f4f37] transition-colors"
                >
                  Talep Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
