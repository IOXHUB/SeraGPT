'use client';

import { motion } from 'framer-motion';

export default function UserjotFeaturesSection() {
  const features = [
    {
      title: "Lokasyon Analizi",
      description: "İklim verileri, toprak analizi ve coğrafi koşulları otomatik olarak değerlendiriyoruz.",
      icon: "🌍"
    },
    {
      title: "Risk Değerlendirmesi", 
      description: "Finansal, teknik ve pazar risklerini AI algoritmaları ile hesaplayıp raporluyoruz.",
      icon: "⚠️"
    },
    {
      title: "ROI Hesaplama",
      description: "Detaylı maliyet analizi ve gelir projeksiyonları ile yatırım getirisi hesaplanır.",
      icon: "📈"
    },
    {
      title: "Uzman Danışmanlık",
      description: "20+ yıl deneyimli sera mühendisleri ile direkt iletişim kurabilirsiniz.",
      icon: "👨‍💼"
    },
    {
      title: "Ekipman Önerileri",
      description: "Projenize uygun teknoloji ve ekipman seçenekleri detaylı olarak listelenir.",
      icon: "⚙️"
    },
    {
      title: "Pazar Analizi",
      description: "Hedef ürünler için güncel pazar verileri ve satış projeksiyonları sunulur.",
      icon: "📊"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sera yatırımınız için ihtiyacınız olan her şey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veri odaklı kararlar alın, riskleri minimize edin ve başarılı sera projeleri geliştirin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-50 hover:bg-gray-100 rounded-xl p-8 transition-colors duration-300 h-full">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
