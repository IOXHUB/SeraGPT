'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnahtarTeslimPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    location: '',
    size: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quoteId = `ATS-${Date.now()}`;
    alert(`Teklif talebiniz alındı!\nTeklif No: ${quoteId}\n\nUzman ekibimiz 48 saat içinde detaylı teklif ile size dönüş yapacaktır.`);
    setShowQuoteModal(false);
    setFormData({ name: '', email: '', phone: '', company: '', projectType: '', location: '', size: '', budget: '', timeline: '', message: '' });
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
              <Link href="/danismanlik" className="text-white hover:text-[#baf200] transition-colors">
                Proje Danışmanlığı
              </Link>
            </div>
          </div>
          
          <div className="text-center max-w-[896px] mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">
              Anahtar Teslim Sera Teklifi Al
            </h1>
            <p className="text-xl text-white/90 max-w-[576px] mx-auto mb-8">
              İspanyol ç��züm ortağımız Serapoli ile birlikte tek elden 
              anahtar teslim sera projesi gerçekleştirin.
            </p>
            <button
              onClick={() => setShowQuoteModal(true)}
              className="bg-[#baf200] text-[#146448] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#a5e600] transition-colors"
            >
              Teklif Talep Et
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          
          {/* Services */}
          <div className="max-w-[896px] mx-auto mb-16">
            <h2 className="text-2xl font-bold text-[#146448] text-center mb-8">Hizmet Kapsamımız</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all text-center">
                <div className="text-3xl mb-4">🏭</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2">İmalat</h3>
                <p className="text-gray-600 text-sm">
                  Avrupa standartlarında kaliteli malzeme ve üretim
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all text-center">
                <div className="text-3xl mb-4">🔧</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2">Montaj</h3>
                <p className="text-gray-600 text-sm">
                  Uzman ekip ile profesyonel kurulum hizmeti
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all text-center">
                <div className="text-3xl mb-4">⚙️</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2">Kurulum</h3>
                <p className="text-gray-600 text-sm">
                  Tüm sistemlerin devreye alınması ve testleri
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all text-center">
                <div className="text-3xl mb-4">🛠️</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2">Servis</h3>
                <p className="text-gray-600 text-sm">
                  Sürekli teknik destek ve bakım hizmetleri
                </p>
              </div>
            </div>
          </div>

          {/* Partnership Info */}
          <div className="max-w-[896px] mx-auto mb-16">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-[#146448] text-center mb-8">Serapoli Ortaklığı</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-[#146448] mb-4">İspanyol Kalitesi</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2"></div>
                      <p className="text-gray-600 text-sm">Avrupa standartlarında malzeme ve teknoloji</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2"></div>
                      <p className="text-gray-600 text-sm">Uzman İspanyol mühendislik ekibi</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2"></div>
                      <p className="text-gray-600 text-sm">Uluslararası garanti ve servis desteği</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2"></div>
                      <p className="text-gray-600 text-sm">Modern otomasyon ve kontrol sistemleri</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f6f8f9] rounded-xl p-6">
                  <h4 className="text-lg font-bold text-[#146448] mb-4">Proje Süreçleri</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-[#baf200] rounded-full flex items-center justify-center text-xs font-bold text-[#146448]">1</div>
                      <span className="text-sm text-gray-600">Keşif ve Ön Tasarım</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-[#baf200] rounded-full flex items-center justify-center text-xs font-bold text-[#146448]">2</div>
                      <span className="text-sm text-gray-600">Detaylı Proje ve Teklif</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-[#baf200] rounded-full flex items-center justify-center text-xs font-bold text-[#146448]">3</div>
                      <span className="text-sm text-gray-600">İmalat ve Sevkiyat</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-[#baf200] rounded-full flex items-center justify-center text-xs font-bold text-[#146448]">4</div>
                      <span className="text-sm text-gray-600">Montaj ve Devreye Alma</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Types */}
          <div className="max-w-[896px] mx-auto mb-16">
            <h2 className="text-2xl font-bold text-[#146448] text-center mb-8">Proje Türlerimiz</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4 text-center">🌱</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2 text-center">Modern Cam Seralar</h3>
                <p className="text-gray-600 text-center text-sm mb-4">
                  1,000 m² ve üzeri profesyonel cam sera projeleri
                </p>
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, projectType: 'Modern Cam Sera' }));
                    setShowQuoteModal(true);
                  }}
                  className="w-full bg-[#146448] text-white py-2 rounded-lg hover:bg-[#0f4f37] transition-colors"
                >
                  Teklif Al
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4 text-center">🤖</div>
                <h3 className="text-lg font-bold text-[#146448] mb-2 text-center">Akıllı Otomasyon</h3>
                <p className="text-gray-600 text-center text-sm mb-4">
                  IoT teknolojisi ile tam otomatik sera sistemleri
                </p>
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, projectType: 'Akıllı Otomasyon Sera' }));
                    setShowQuoteModal(true);
                  }}
                  className="w-full bg-[#146448] text-white py-2 rounded-lg hover:bg-[#0f4f37] transition-colors"
                >
                  Teklif Al
                </button>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="max-w-[576px] mx-auto text-center">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[#146448] mb-6">Neden Anahtar Teslim?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2"></div>
                  <p className="text-gray-600">Tek elden proje yönetimi</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2"></div>
                  <p className="text-gray-600">İspanyol teknolojisi ve kalitesi</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2"></div>
                  <p className="text-gray-600">Zamanında teslim garantisi</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#baf200] rounded-full mt-2"></div>
                  <p className="text-gray-600">Sürekli teknik destek ve servis</p>
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
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#146448]">Anahtar Teslim Sera Teklifi</h3>
                <button
                  onClick={() => setShowQuoteModal(false)}
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
                  <label className="block text-sm font-medium text-[#146448] mb-2">Telefon *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
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
                  <label className="block text-sm font-medium text-[#146448] mb-2">Proje Türü *</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Modern Cam Sera">Modern Cam Sera</option>
                    <option value="Akıllı Otomasyon Sera">Akıllı Otomasyon Sera</option>
                    <option value="Polikarbon Sera">Polikarbon Sera</option>
                    <option value="Hidroponik Sistem">Hidroponik Sistem</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">Lokasyon *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="İl/İlçe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">Proje Büyüklüğü *</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    required
                    placeholder="Örn: 5,000 m²"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#146448] mb-2">Bütçe Aralığı</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  >
                    <option value="">Seçiniz</option>
                    <option value="₺1-5 Milyon">₺1-5 Milyon</option>
                    <option value="₺5-10 Milyon">₺5-10 Milyon</option>
                    <option value="₺10+ Milyon">₺10+ Milyon</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#146448] mb-2">Proje Zamanlaması</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                >
                  <option value="">Seçiniz</option>
                  <option value="1-3 ay içinde">1-3 ay içinde</option>
                  <option value="3-6 ay içinde">3-6 ay içinde</option>
                  <option value="6-12 ay içinde">6-12 ay içinde</option>
                  <option value="1 yıl sonra">1 yıl sonra</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#146448] mb-2">Proje Detayları</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200]"
                  placeholder="Projeniz hakkında detaylı bilgi verin, özel gereksinimlerinizi belirtin..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#146448] text-white py-3 rounded-lg font-medium hover:bg-[#0f4f37] transition-colors"
                >
                  Teklif Talep Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
