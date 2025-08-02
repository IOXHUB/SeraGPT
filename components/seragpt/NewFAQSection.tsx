'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Bu sistem gerçekten doğru sonuç verir mi?",
      answer: "Evet, SeraGPT lokasyona özel gerçek iklim verileri, toprak analizleri ve pazar verilerini kullanır. 20+ yıllık mühendislik deneyimimiz ve sürekli güncellenen veri tabanımızla %95+ doğruluk oranına sahip analizler üretiyoruz.",
      category: "Güvenilirlik"
    },
    {
      question: "Raporu aldıktan sonra ne yapacağım?",
      answer: "Raporda detaylı ekipman listesi, tedarikçi önerileri ve adım adım uygulama planı bulacaksın. Token sistemi ile uzman mühendis desteği alabilir, teklif karşılaştırması yapabilirsin. İhtiyacın olursa saha ziyareti de planlayabiliriz.",
      category: "Süreç"
    },
    {
      question: "Bu hizmeti kim sağlıyor?",
      answer: "SeraGPT, 20+ yıllık sera ve ziraat mühendisliği deneyimine sahip Volkan Şimşirkaya tarafından geliştirildi. Tarım sektöründe yüzlerce projeye imza atmış, sera teknolojileri konusunda uzman bir ekiple destekleniyor.",
      category: "Ekip"
    },
    {
      question: "Gerçekten ücretsiz mi?",
      answer: "İlk 5 analiz tamamen ücretsizdir. Bu sayede sistemi test edebilir, rapor kalitesini değerlendirebilirsin. Sonrasında ihtiyacına göre token paketleri satın alabilir veya aylık abonelik seçeneklerini kullanabilirsin.",
      category: "Fiyatlandırma"
    },
    {
      question: "Hangi bölgeler destekleniyor?",
      answer: "Türkiye'nin tüm il ve ilçeleri için detaylı analiz yapabiliyoruz. Sistimimiz Meteoroloji Genel Müdürlüğü, TÜİK ve tarım il müdürlüklerinin verilerini kullanarak lokasyona özel hesaplamalar yapıyor.",
      category: "Kapsam"
    },
    {
      question: "Analiz ne kadar sürer?",
      answer: "AI destekli sistemimiz sayesinde temel rapor 1 dakikada hazır. Uzman mühendis yorumları dahil detaylı rapor ise 24 saat içinde e-posta adresine ulaşıyor. Acil durumlar için express servis seçeneği de mevcut.",
      category: "Zaman"
    }
  ];

  const categoryColors = {
    "Güvenilirlik": "green",
    "Süreç": "blue", 
    "Ekip": "purple",
    "Fiyatlandırma": "yellow",
    "Kapsam": "red",
    "Zaman": "green"
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            Sık Sorulanlar
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Merak Ettiklerinizin <span className="text-green-400">Cevapları</span>
          </h2>
          <p className="text-xl text-gray-300">
            Size yardımcı olmak için en çok sorulan soruları yanıtladık
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
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    categoryColors[faq.category as keyof typeof categoryColors] === 'green' ? 'bg-green-500/20 text-green-400' :
                    categoryColors[faq.category as keyof typeof categoryColors] === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                    categoryColors[faq.category as keyof typeof categoryColors] === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                    categoryColors[faq.category as keyof typeof categoryColors] === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {faq.category}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {faq.question}
                  </h3>
                </div>
                
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <svg 
                    className="w-6 h-6 text-green-400" 
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
                    <div className="px-6 pb-5 text-gray-300 leading-relaxed border-t border-gray-700/50 pt-4">
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
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Başka <span className="text-green-400">Sorularınız</span> Var mı?
            </h3>
            <p className="text-gray-300 mb-6">
              Uzman ekibimizle doğrudan iletişime geçin, tüm sorularınızı yanıtlayalım.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <span>📞</span>
                <span>İletişime Geç</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-600 hover:border-blue-400 text-white hover:text-blue-400 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <span>💬</span>
                <span>Canlı Destek</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
