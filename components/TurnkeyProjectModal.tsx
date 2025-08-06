'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TurnkeyProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  projectArea: string;
  targetCrop: string;
  budget: string;
  projectType: 'greenhouse' | 'hydroponic' | 'climate_controlled' | 'organic' | '';
  hasLand: 'yes' | 'no' | 'searching' | '';
  timeline: string;
  message: string;
}

export default function TurnkeyProjectModal({ isOpen, onClose }: TurnkeyProjectModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    projectArea: '',
    targetCrop: '',
    budget: '',
    projectType: '',
    hasLand: '',
    timeline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const projectTypes = [
    { value: 'greenhouse', label: 'Geleneksel Sera' },
    { value: 'hydroponic', label: 'Hidroponik Sera' },
    { value: 'climate_controlled', label: 'İklim Kontrollü Sera' },
    { value: 'organic', label: 'Organik Üretim Serası' }
  ];

  const landOptions = [
    { value: 'yes', label: 'Evet, sahibim' },
    { value: 'no', label: 'Hayır, yok' },
    { value: 'searching', label: 'Arıyorum' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/support-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Anahtar Teslim Proje Talebi - ${formData.projectType}`,
          message: `
Anahtar Teslim Proje Talep Detayları:

Kişi Bilgileri:
- Ad Soyad: ${formData.name}
- E-posta: ${formData.email}
- Telefon: ${formData.phone}
- Şirket: ${formData.company}

Proje Bilgileri:
- Lokasyon: ${formData.location}
- Proje Alanı: ${formData.projectArea}
- Hedef Ürün: ${formData.targetCrop}
- Sera Tipi: ${formData.projectType}
- Arazi Durumu: ${formData.hasLand}
- Bütçe: ${formData.budget}
- Hedef Tamamlanma: ${formData.timeline}

Ek Notlar:
${formData.message}
          `,
          priority: 'high',
          category: 'general'
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            location: '',
            projectArea: '',
            targetCrop: '',
            budget: '',
            projectType: '',
            hasLand: '',
            timeline: '',
            message: ''
          });
        }, 2000);
      } else {
        setError('Proje talebi gönderilemedi. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900 bg-opacity-50"
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Anahtar Teslim Proje Teklifi
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Sera projeniz için ücretsiz teklif alın
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Proje Talebiniz Alındı!
                    </h3>
                    <p className="text-gray-600">
                      Uzman ekibimiz projenizi değerlendirip size ücretsiz teklif hazırlayacaktır.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Kişi Bilgileri */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Kişi Bilgileri</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ad Soyad *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            E-posta *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Telefon *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Şirket/Kurum
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Proje Bilgileri */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Proje Detayları</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Proje Lokasyonu *
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            placeholder="İl/İlçe"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sera Alanı (m²) *
                          </label>
                          <input
                            type="text"
                            name="projectArea"
                            value={formData.projectArea}
                            onChange={handleInputChange}
                            required
                            placeholder="Örn: 1000 m²"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sera Tipi *
                          </label>
                          <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Sera Tipi Seçin</option>
                            {projectTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hedef Ürün *
                          </label>
                          <input
                            type="text"
                            name="targetCrop"
                            value={formData.targetCrop}
                            onChange={handleInputChange}
                            required
                            placeholder="Domates, biber, salatalık..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Arazi Durumu *
                          </label>
                          <select
                            name="hasLand"
                            value={formData.hasLand}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Arazi Durumu</option>
                            {landOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bütçe Aralığı
                          </label>
                          <input
                            type="text"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            placeholder="Tahmini yatırım bütçeniz"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hedef Tamamlanma Süresi
                          </label>
                          <input
                            type="text"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            placeholder="Örn: 6 ay içinde"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Ek Bilgiler */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proje Hakkında Ek Bilgiler
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Özel istekleriniz, mevcut altyapı durumu, ek hizmetler..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex space-x-3 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? 'Gönderiliyor...' : 'Ücretsiz Teklif Talep Et'}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        İptal
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
