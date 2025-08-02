'use client';

import { motion } from 'framer-motion';

export default function NewSolutionSection() {
  const features = [
    {
      icon: "🌍",
      title: "Lokasyon Analizi",
      description: "Gerçek zamanlı iklim ve toprak verileri",
      color: "green"
    },
    {
      icon: "🤖",
      title: "AI Destekli Analiz",
      description: "Yapay zeka algoritmaları ile risk hesaplama",
      color: "blue"
    },
    {
      icon: "📊",
      title: "Detaylı Raporlama",
      description: "PDF çıktı + uzman mühendis yorumu",
      color: "purple"
    },
    {
      icon: "⚡",
      title: "Hızlı Sonuç",
      description: "1 dakikada kapsamlı analiz",
      color: "yellow"
    },
    {
      icon: "🔧",
      title: "Ekipman Uyumu",
      description: "ISITMAX/IOX modüler sistemlerle uyumlu",
      color: "red"
    },
    {
      icon: "💰",
      title: "ROI Hesaplama",
      description: "Güvenilir karlılık projeksiyonu",
      color: "green"
    }
  ];

  const colorClasses = {
    green: "border-green-500/30 hover:border-green-400 text-green-400",
    blue: "border-blue-500/30 hover:border-blue-400 text-blue-400",
    purple: "border-purple-500/30 hover:border-purple-400 text-purple-400",
    yellow: "border-yellow-500/30 hover:border-yellow-400 text-yellow-400",
    red: "border-red-500/30 hover:border-red-400 text-red-400"
  };

  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Çözüm
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            <span className="text-white">Sera</span>
            <span className="text-green-400">GPT</span><br />
            <span className="text-gray-300">Akıllı Danışmanınız</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Yapay zeka destekli sera yatırım analizi ile <span className="text-green-400 font-semibold">doğru kararları</span> veriyle destekle.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`bg-gray-900/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:shadow-xl ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-current transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-green-400">Artık Karar Vermek</span> Bu Kadar Kolay!
            </h3>
            <p className="text-xl mb-8 text-gray-300">
              SeraGPT ile doğru yatırım kararını veriyle destekle
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Ücretsiz Analiz Başlat
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-600 hover:border-green-400 text-white hover:text-green-400 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Demo Raporu Gör
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
