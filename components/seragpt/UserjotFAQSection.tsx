'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserjotFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "SeraGPT nasıl çalışıyor?",
      answer: "Lokasyon bilgilerinizi girdikten sonra, AI algoritmaları iklim verileri, toprak analizi, pazar koşulları ve risk faktörlerini analiz ederek size özel sera yatırım raporu hazırlar. Bu rapor 1 dakika içinde hazır olur."
    },
    {
      question: "Hangi bölgeler destekleniyor?",
      answer: "Türkiye'nin tüm illerini destekliyoruz. İklim verileri Meteoroloji Genel Müdürlüğü'nden, pazar verileri TÜİK'ten alınmaktadır. Her bölge için lokasyona özel detaylı analiz yapılır."
    },
    {
      question: "Raporlar ne kadar güvenilir?",
      answer: "Raporlarımız %95+ doğruluk oranına sahiptir. 20+ yıllık sera mühendisliği deneyimi, gerçek zamanlı veriler ve sürekli güncellenen algoritmaları kullanırız. Tüm hesaplamalar uzman mühendisler tarafından doğrulanır."
    },
    {
      question: "Ücretsiz plan sınırları nelerdir?",
      answer: "Ücretsiz planla 5 proje analizi yapabilir, temel raporlara erişebilirsiniz. Detaylı finansal analiz, uzman danışmanlık ve gelişmiş özellikler için ücretli planlara geçiş yapabilirsiniz."
    },
    {
      question: "Uzman desteği nasıl çalışıyor?",
      answer: "Profesyonel ve Kurumsal plan kullancıları, 20+ yıl deneyimli sera mühendisleri ile direkt iletişim kurabilir. Telefon, e-mail ve video görüşme seçenekleri mevcuttur. Proje danışmanlığı da sağlanır."
    },
    {
      question: "İptal etmek istersem ne yapmalıyım?",
      answer: "İstediğiniz zaman planınızı iptal edebilirsiniz. İptal işlemi anında gerçekleşir ve bir sonraki faturalandırma döneminizde ücret kesilmez. Verileriniz 30 gün boyunca saklanır."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sıkça sorulan sorular
          </h2>
          <p className="text-xl text-gray-600">
            Aklınıza takılan her şeyin cevabı burada
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
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <svg 
                    className="w-5 h-5 text-gray-500" 
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
          <p className="text-gray-600 mb-6">
            Başka sorularınız var mı?
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Bizimle İletişime Geçin
          </button>
        </motion.div>
      </div>
    </section>
  );
}
