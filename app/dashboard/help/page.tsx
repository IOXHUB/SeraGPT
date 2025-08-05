'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const faqData = [
  {
    id: 1,
    question: 'SeraGPT analiz araçları nasıl kullanılır?',
    answer: 'Her analiz aracı adım adım rehberlik sunar. ROI simülasyonu için tarla bilgilerinizi girin, iklim analizi için bölgenizi seçin, ekipman listesi için ihtiyaçlarınızı belirtin. Sistem size özel öneriler sunacaktır.'
  },
  {
    id: 2,
    question: 'Jeton sistemi nasıl çalışır?',
    answer: 'Her analiz 1 jeton harcar. Ücretsiz kullanıcılar 5 jeton ile başlar. Daha fazla analiz için jeton paketleri satın alabilirsiniz. Jetonlarınız bittiğinde yeni paket alana kadar analizleri kullanamassınız.'
  },
  {
    id: 3,
    question: 'Analiz sonuçlarını nasıl kaydederim?',
    answer: 'Tüm analiz sonuçları otomatik olarak "Raporlar" bölümünde saklanır. PDF olarak indirebilir, yazdırabilir veya başkalarıyla paylaşabilirsiniz. Eski analizlerinize istediğiniz zaman erişebilirsiniz.'
  },
  {
    id: 4,
    question: 'AI sohbet özelliği neye yarar?',
    answer: 'AI sohbet, yaptığınız analizler hakkında sorular sormanızı ve derinlemesine bilgi almanızı sağlar. Önceki raporlarınızı analiz ederek kişiselleştirilmiş öneriler sunar.'
  },
  {
    id: 5,
    question: 'Mühendislik danışmanlığı nasıl alınır?',
    answer: 'Danışmanlık sekmesinden uzman mühendislerimize bağlanabilirsiniz. Sera kurulum, ekipman seçimi, sistem optimizasyonu gibi konularda profesyonel destek alabilirsiniz.'
  },
  {
    id: 6,
    question: 'Verilerim güvende mi?',
    answer: 'Evet, tüm verileriniz şifrelenmiş olarak saklanır. KVKK uyumlu sistemimizde verileriniz güvendedir. İzniniz olmadan hiçbir veri üçüncü taraflarla paylaşılmaz.'
  }
];

const guideSteps = [
  {
    step: 1,
    title: 'Hesap Oluşturun',
    description: 'E-posta adresinizle ücretsiz hesap oluşturun ve 5 ücretsiz jeton kazanın.'
  },
  {
    step: 2,
    title: 'Analiz Seçin',
    description: 'Dashboard\'dan ihtiyacınıza uygun analiz aracını seçin (ROI, İklim, Ekipman, Pazar, Layout).'
  },
  {
    step: 3,
    title: 'Bilgileri Girin',
    description: 'Talep edilen tarla, lokasyon ve proje bilgilerini doğru şekilde doldurun.'
  },
  {
    step: 4,
    title: 'Sonuçları İnceleyin',
    description: 'Detaylı analiz sonuçlarını inceleyin ve PDF olarak kaydedin.'
  },
  {
    step: 5,
    title: 'AI ile Konuşun',
    description: 'AI sohbet ile analizleriniz hakkında sorular sorun ve ek öneriler alın.'
  }
];

export default function HelpPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('faq');

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Yardım ve Destek</h1>
            <p className="text-gray-600 mt-1">SeraGPT kullanımı hakkında rehberler ve sıkça sorulan sorular</p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'faq'
                    ? 'text-gray-900 border-b-2 border-gray-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sıkça Sorulan Sorular
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'guide'
                    ? 'text-gray-900 border-b-2 border-gray-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Kullanım Rehberi
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'contact'
                    ? 'text-gray-900 border-b-2 border-gray-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                İletişim
              </button>
            </div>

            <div className="p-6">
              {/* FAQ Tab */}
              {activeTab === 'faq' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {faqData.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <span className={`transform transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      {openFAQ === faq.id && (
                        <div className="px-6 pb-4 border-t border-gray-200">
                          <p className="text-gray-600 pt-4">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Guide Tab */}
              {activeTab === 'guide' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900">Adım Adım Kullanım Rehberi</h2>
                  <div className="space-y-6">
                    {guideSteps.map((guide) => (
                      <div key={guide.step} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {guide.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                          <p className="text-gray-600">{guide.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mt-8">
                    <h3 className="font-semibold text-gray-900 mb-3">Video Rehberler</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">ROI Analizi Nasıl Yapılır?</h4>
                        <p className="text-sm text-gray-600">5 dakikada ROI simülasyonu yapmayı öğrenin</p>
                        <button className="text-gray-600 hover:text-gray-900 text-sm font-medium mt-2">
                          Videoyu İzle →
                        </button>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">İklim Analizi Rehberi</h4>
                        <p className="text-sm text-gray-600">Bölgeniz için iklim raporları alın</p>
                        <button className="text-gray-600 hover:text-gray-900 text-sm font-medium mt-2">
                          Videoyu İzle →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Contact Tab */}
              {activeTab === 'contact' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900">Bizimle İletişime Geçin</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Teknik Destek</h3>
                      <p className="text-gray-600 mb-4">Platform kullanımı ve teknik sorunlarınız için</p>
                      <div className="space-y-2 text-sm">
                        <p><strong>E-posta:</strong> destek@seragpt.com</p>
                        <p><strong>Telefon:</strong> +90 212 XXX XX XX</p>
                        <p><strong>Çalışma Saatleri:</strong> 09:00 - 18:00</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Mühendislik Danışmanlığı</h3>
                      <p className="text-gray-600 mb-4">Uzman mühendislerimizden profesyonel destek</p>
                      <div className="space-y-2 text-sm">
                        <p><strong>E-posta:</strong> muhendis@seragpt.com</p>
                        <p><strong>Telefon:</strong> +90 212 XXX XX XX</p>
                        <p><strong>Randevu:</strong> Online ve telefonla</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Hızlı Destek Talebi</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ad Soyad
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            E-posta
                          </label>
                          <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Konu
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                          <option>Teknik Sorun</option>
                          <option>Analiz Sorunu</option>
                          <option>Hesap Problemi</option>
                          <option>Özellik Önerisi</option>
                          <option>Diğer</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mesajınız
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          placeholder="Sorununuzu detaylı olarak açıklayın..."
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Mesaj Gönder
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
