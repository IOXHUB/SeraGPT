'use client';

import { motion } from 'framer-motion';

export default function SolutionSection() {
  const mainBenefits = [
    {
      icon: "🌍",
      title: "Lokasyon + İklim Verisiyle Analiz",
      description: "Gerçek zamanlı veri analizi ile en doğru sonuçlar"
    },
    {
      icon: "🤖",
      title: "AI Destekli Yatırım Raporu",
      description: "Yapay zeka algoritmaları ile risk analizi"
    },
    {
      icon: "👨‍🔬",
      title: "PDF Çıktı + Uzman Mühendis Yorumu",
      description: "20+ yıllık deneyimle profesyonel değerlendirme"
    }
  ];

  const features = [
    {
      icon: "🪙",
      title: "Token Tabanlı Danışmanlık",
      description: "Esnek ödeme sistemi"
    },
    {
      icon: "🔧",
      title: "ISITMAX/IOX Modüler Uyumu",
      description: "Endüstri standardı ekipmanlar"
    },
    {
      icon: "📊",
      title: "ROI Hesaplama Motoru",
      description: "Detaylı karlılık analizi"
    },
    {
      icon: "🌱",
      title: "Hedef Bitki & Maliyet Tahmini",
      description: "Bitki bazında özel hesaplamalar"
    },
    {
      icon: "⚡",
      title: "1 Dakikada Çıktı",
      description: "Anında sonuç alma"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            İşte Karar Vermeni Kolaylaştıran<br />
            <span className="text-green-600">Akıllı Danışmanın:</span><br />
            <span className="text-blue-600">SeraGPT</span>
          </h2>
        </motion.div>

        {/* Main Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {mainBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Öne Çıkan Özellikler
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-green-500 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-xs">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              🎯 Artık Karar Vermek Bu Kadar Kolay!
            </h3>
            <p className="text-xl mb-6 opacity-90">
              SeraGPT ile doğru yatırım kararını veriyle destekle
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Ücretsiz Analiz Başlat
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
