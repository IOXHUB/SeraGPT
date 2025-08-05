'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Bu sistem gerçekten doğru sonuç verir mi?",
      answer: "Evet, SeraGPT lokasyona özel gerçek iklim verileri, toprak analizleri ve pazar verilerini kullanır. 20+ yıllık mühendislik deneyimimiz ve sürekli güncellenen veri tabanımızla %95+ doğruluk oranına sahip analizler üretiyoruz."
    },
    {
      question: "Raporu aldıktan sonra ne yapacağım?",
      answer: "Raporda detaylı ekipman listesi, tedarikçi önerileri ve adım adım uygulama planı bulacaksın. Ayrıca token sistemi ile uzman mühendis desteği alabilir, teklif karşılaştırması yapabilirsin. İhtiyacın olursa saha ziyareti de planlayabiliriz."
    },
    {
      question: "Bu hizmeti kim sağlıyor?",
      answer: "SeraGPT, 20+ yıllık sera ve ziraat mühendisliği deneyimine sahip Volkan Şimşirkaya tarafından geliştirildi. Tarım sektöründe yüzlerce projeye imza atmış, sera teknolojileri konusunda uzman bir ekiple destekleniyor."
    },
    {
      question: "Gerçekten ücretsiz mi?",
      answer: "İlk 5 analiz tamamen ücretsizdir. Bu sayede sistemi test edebilir, rapor kalitesini değerlendirebilirsin. Sonrasında ihtiyacına göre token paketleri satın alabilir veya aylık abonelik seçeneklerini kullanabilirsin."
    },
    {
      question: "Hangi bölgeler için analiz yapılıyor?",
      answer: "Türkiye'nin tüm il ve ilçeleri için detaylı analiz yapabiliyoruz. Sistimimiz Meteoroloji Genel Müdürlüğü, TÜİK ve tarım il müdürlüklerinin verilerini kullanarak lokasyona özel hesaplamalar yapıyor."
    },
    {
      question: "Rapor ne kadar sürede hazırlanıyor?",
      answer: "AI destekli sistemimiz sayesinde temel rapor 1 dakikada hazır. Uzman mühendis yorumları dahil detaylı rapor ise 24 saat içinde e-posta adresine ulaşıyor. Acil durumlar için express servis seçeneği de mevcut."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sık Sorulan <span className="text-green-600">Sorular</span>
          </h2>
          <p className="text-xl text-gray-600">
            Merak ettiğin her şeyin cevabı burada
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
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg 
                    className="w-6 h-6 text-green-600" 
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
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
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
          className="text-center mt-12"
        >
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              🤝 Başka Sorun Var mı?
            </h3>
            <p className="text-green-600 mb-4">
              Uzman ekibimizle doğrudan iletişime geç, sorularını yanıtlayalım.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              📞 İletişime Geç
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
