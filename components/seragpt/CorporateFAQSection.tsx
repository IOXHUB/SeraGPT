'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CorporateFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "SeraGPT Enterprise hangi kurumsal güvenlik standartlarını karşılıyor?",
      answer: "Platformumuz SOC 2 Type II, ISO 27001, GDPR ve yerel veri koruma mevzuatına tam uyumludur. Tüm veriler 256-bit AES şifreleme ile korunur ve Türkiye'deki veri merkezlerinde saklanır. Kurumsal firewall desteği, SSO entegrasyonu ve detaylı audit log sistemi mevcuttur.",
      category: "Güvenlik"
    },
    {
      question: "Platform mevcut ERP ve iş zekası sistemlerimizle entegre edilebilir mi?",
      answer: "Evet, RESTful API'ler ve webhook desteği ile SAP, Oracle, Microsoft Dynamics gibi ERP sistemleriyle entegrasyon sağlayabilirsiniz. Ayrıca PowerBI, Tableau gibi BI araçları için özel connector'larımız mevcuttur. Özel entegrasyon ihtiyaçları için teknik ekibimiz destek sağlar.",
      category: "Entegrasyon"
    },
    {
      question: "Kurumsal lisanslama ve fiyatlandırma modeli nasıl çalışıyor?",
      answer: "Enterprise lisanslar kullanıcı sayısı, proje hacmi ve özel özellik ihtiyaçlarına göre planlanır. Yıllık abonelik modeli ile %20'ye varan indirimler sunuyoruz. Pilot projeler için 3 aylık ücretsiz deneme imkanı bulunmaktadır. Detaylı fiyat teklifi için satış ekibimizle görüşün.",
      category: "Fiyatlandırma"
    },
    {
      question: "Hangi düzeyde teknik destek ve SLA garantisi sağlanıyor?",
      answer: "Enterprise müşterilerimize 7/24 teknik destek, %99.9 uptime SLA, maksimum 2 saat yanıt süresi garantisi sunuyoruz. Dedicated customer success manager, aylık review toplantıları ve proaktif system health monitoring dahildir. Kritik durumlar için escalation prosedürü mevcuttur.",
      category: "Destek"
    },
    {
      question: "Veri analiz kapasitesi ve rapor özelleştirme seçenekleri nelerdir?",
      answer: "Platform, unlimited proje analizi, real-time dashboard, özelleştirilebilir rapor şablonları ve white-label branding desteği sunar. Custom KPI'lar tanımlayabilir, otomatik rapor zamanlaması ayarlayabilir ve API üzerinden veri export edebilirsiniz. Advanced analytics için makine öğrenmesi modelleri de mevcuttur.",
      category: "Özellikler"
    },
    {
      question: "Implementation süreci ve change management desteği nasıl sağlanıyor?",
      answer: "Kurumsal implementasyon 4-8 hafta sürer ve dedicated proje ekibi tarafından yönetilir. User training, best practices rehberleri, change management consultancy ve go-live desteği dahildir. Pilot kullanıcı grupları ile aşamalı geçiş planı uygulanır.",
      category: "Süreç"
    }
  ];

  const categoryColors = {
    "Güvenlik": "emerald",
    "Entegrasyon": "blue",
    "Fiyatlandırma": "purple",
    "Destek": "orange",
    "Özellikler": "cyan",
    "Süreç": "pink"
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 border border-orange-200 rounded-full text-orange-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
            Kurumsal SSS
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Kurumsal Müşterilerimizin<br />
            <span className="text-orange-600">Sık Sorduğu Sorular</span>
          </h2>
          <p className="text-xl text-slate-600">
            Enterprise çözümler hakkında detaylı bilgiler
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-start hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    categoryColors[faq.category as keyof typeof categoryColors] === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                    categoryColors[faq.category as keyof typeof categoryColors] === 'blue' ? 'bg-blue-100 text-blue-700' :
                    categoryColors[faq.category as keyof typeof categoryColors] === 'purple' ? 'bg-purple-100 text-purple-700' :
                    categoryColors[faq.category as keyof typeof categoryColors] === 'orange' ? 'bg-orange-100 text-orange-700' :
                    categoryColors[faq.category as keyof typeof categoryColors] === 'cyan' ? 'bg-cyan-100 text-cyan-700' :
                    'bg-pink-100 text-pink-700'
                  }`}>
                    {faq.category}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 leading-relaxed">
                    {faq.question}
                  </h3>
                </div>
                
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <svg 
                    className="w-6 h-6 text-slate-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-slate-600 leading-relaxed border-t border-slate-200 pt-6 bg-white">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 lg:p-12 text-white text-center">
            <div className="text-4xl mb-6">📞</div>
            <h3 className="text-3xl font-bold mb-4">
              Özel İhtiyaçlarınız mı Var?
            </h3>
            <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto">
              Enterprise çözümler konusunda uzman satış danışmanlarımızla görüşün. 
              Size özel demo ve fiyat teklifi hazırlayalım.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <span>📅</span>
                <span>Demo Randevusu</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-slate-600 hover:border-white text-slate-300 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <span>💬</span>
                <span>Uzman Danışman</span>
              </motion.button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-700">
              <div className="text-center">
                <div className="text-orange-400 font-bold">24 Saat</div>
                <div className="text-sm text-slate-400">Yanıt Süresi</div>
              </div>
              <div className="text-center">
                <div className="text-orange-400 font-bold">Ücretsiz</div>
                <div className="text-sm text-slate-400">Konsültasyon</div>
              </div>
              <div className="text-center">
                <div className="text-orange-400 font-bold">Özel</div>
                <div className="text-sm text-slate-400">Çözümler</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
