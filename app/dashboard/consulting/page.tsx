'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function ConsultingPage() {
  const [formData, setFormData] = useState({
    consultationType: '',
    projectDescription: '',
    contactPhone: '',
    preferredDate: '',
    projectLocation: '',
    projectBudget: '',
    urgencyLevel: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const consultationTypes = [
    'Sera Yatırım Danışmanlığı',
    'Teknik Proje Geliştirme',
    'İklim Kontrol Sistemi',
    'Sulama ve Gübre Sistemi',
    'Otomasyon ve Teknoloji',
    'Pazarlama ve Satış Stratejisi',
    'Finansman ve Teşvik Danışmanlığı',
    'Diğer'
  ];

  const urgencyLevels = [
    'Acil değil (2-4 hafta)',
    'Normal (1-2 hafta)',
    'Öncelikli (3-7 gün)',
    'Acil (24-48 saat)'
  ];

  const consultants = [
    {
      name: 'Dr. Mehmet Yılmaz',
      title: 'Sera Teknolojileri Uzmanı',
      experience: '15+ yıl deneyim',
      specialties: ['İklim Kontrolü', 'Otomasyon', 'Verimlilik'],
      image: '/consultants/mehmet-yilmaz.jpg'
    },
    {
      name: 'Mühendis Ayşe Kaya',
      title: 'Tarımsal Mühendislik',
      experience: '12+ yıl deneyim',
      specialties: ['Sulama Sistemleri', 'Toprak Analizi', 'Organik Üretim'],
      image: '/consultants/ayse-kaya.jpg'
    },
    {
      name: 'Dr. Ali Demir',
      title: 'Tarımsal Finans Uzmanı',
      experience: '10+ yıl deneyim',
      specialties: ['Yatırım Planlama', 'Teşvik Başvuruları', 'ROI Analizi'],
      image: '/consultants/ali-demir.jpg'
    }
  ];

  if (submitted) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 text-gray-600 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Talebiniz Alındı!</h2>
            <p className="text-gray-600 mb-6">
              Danışmanlık talebiniz başarıyla iletildi. Uzman ekibimiz 24 saat içinde sizinle iletişime geçecektir.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Yeni Talep Oluştur
            </button>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Mühendis Danışmanlığı</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              20+ yıl deneyimli sera mühendisleri ile projelerinizi değerlendirin. 
              Uzman ekibimizden randevu alın ve özel danışmanlık hizmeti alın.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Consultation Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Danışmanlık Talebi</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Proje detaylarınızı paylaşın, size en uygun uzmanı eşleştirelim
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Consultation Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danışmanlık Türü
                    </label>
                    <select
                      value={formData.consultationType}
                      onChange={(e) => handleInputChange('consultationType', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      required
                    >
                      <option value="">Danışmanlık türü seçiniz</option>
                      {consultationTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proje Açıklaması
                    </label>
                    <textarea
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                      placeholder="Projeniz hakkında detaylı bilgi verin..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Contact and Location */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        İletişim Telefonu
                      </label>
                      <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                        placeholder="0555 123 45 67"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proje Lokasyonu
                      </label>
                      <input
                        type="text"
                        value={formData.projectLocation}
                        onChange={(e) => handleInputChange('projectLocation', e.target.value)}
                        placeholder="İl / İlçe"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Budget and Date */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proje Bütçesi (İsteğe bağlı)
                      </label>
                      <select
                        value={formData.projectBudget}
                        onChange={(e) => handleInputChange('projectBudget', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Bütçe aralığı seçiniz</option>
                        <option value="0-100k">₺0 - ₺100.000</option>
                        <option value="100k-500k">₺100.000 - ₺500.000</option>
                        <option value="500k-1m">₺500.000 - ₺1.000.000</option>
                        <option value="1m+">₺1.000.000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tercih Edilen Görüşme Tarihi
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  {/* Urgency Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aciliyet Durumu
                    </label>
                    <select
                      value={formData.urgencyLevel}
                      onChange={(e) => handleInputChange('urgencyLevel', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      required
                    >
                      <option value="">Aciliyet durumu seçiniz</option>
                      {urgencyLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Talep Gönderiliyor...</span>
                        </>
                      ) : (
                        <span>Danışmanlık Talebi Gönder</span>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Consultants Info */}
            <div className="space-y-6">
              {/* Service Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Hizmet Detayları</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🎯 Danışmanlık Kapsamı:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Teknik proje değerlendirmesi</li>
                      <li>• Yatırım fizibilite analizi</li>
                      <li>• Teknoloji seçimi</li>
                      <li>• Risk analizi ve çözümler</li>
                      <li>• Süreç optimizasyonu</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">⏰ Süreç:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• İlk görüşme: 30-60 dakika</li>
                      <li>• Proje değerlendirmesi: 2-3 gün</li>
                      <li>• Detaylı rapor: 1 hafta</li>
                      <li>• Takip toplantıları</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">💼 Fiyatlandırma:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• İlk görüşme ücretsiz</li>
                      <li>• Saatlik danışmanlık: ₺500</li>
                      <li>• Proje bazlı fiyatlandırma</li>
                      <li>• Özel indirimler mevcut</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Expert Team */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Uzman Ekibimiz</h3>
                </div>
                <div className="p-6 space-y-4">
                  {consultants.map((consultant, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">{consultant.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{consultant.title}</p>
                      <p className="text-xs text-gray-500 mb-2">{consultant.experience}</p>
                      <div className="flex flex-wrap gap-1">
                        {consultant.specialties.map((specialty, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
