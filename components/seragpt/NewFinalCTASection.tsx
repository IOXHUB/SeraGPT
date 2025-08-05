'use client';

import { motion } from 'framer-motion';

export default function NewFinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-green-900/20 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Harekete Geçme Zamanı
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Sera Kurmaya <span className="text-green-400">Hazırsan,</span><br />
            <span className="text-white">İlk Adımı</span> <span className="text-green-400">SeraGPT</span> <span className="text-white">ile At!</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            1 dakikada detaylı yatırım analizini al.<br />
            <span className="text-green-400 font-semibold">Karar vermeden önce veriyle hareket et.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-gray-900 px-10 py-5 rounded-xl text-xl font-bold shadow-2xl transition-all flex items-center space-x-3"
            >
              <span className="text-2xl">🚀</span>
              <span>Hemen Başla</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-600 hover:border-yellow-400 text-white hover:text-yellow-400 px-10 py-5 rounded-xl text-xl font-bold transition-all flex items-center space-x-3"
            >
              <span className="text-2xl">📄</span>
              <span>Demo Raporu İndir</span>
            </motion.button>
          </div>

          {/* Trust Elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-green-400/50 transition-all"
            >
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2 text-green-400">20+ Yıl Deneyim</h3>
              <p className="text-gray-300">Sera teknolojileri ve ziraat mühendisliği uzmanı</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-400/50 transition-all"
            >
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">AI Destekli Analiz</h3>
              <p className="text-gray-300">En gelişmiş yapay zeka teknolojisi</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-400/50 transition-all"
            >
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2 text-purple-400">%95+ Doğruluk</h3>
              <p className="text-gray-300">Gerçek verilerle destekli güvenilir sonuçlar</p>
            </motion.div>
          </div>

          {/* Security & Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-3xl">🔒</div>
                <div>
                  <h3 className="text-xl font-bold text-green-400">Güven Mührü</h3>
                  <p className="text-gray-300">
                    Tarım uzmanları ve mühendislerle birlikte geliştirildi
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              {[
                { icon: "✓", text: "İlk 5 analiz ücretsiz", color: "green" },
                { icon: "⚡", text: "1 dakikada sonuç", color: "yellow" },
                { icon: "👨‍🔬", text: "Uzman mühendis desteği", color: "blue" },
                { icon: "📊", text: "Detaylı PDF rapor", color: "purple" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-2">
                  <span className={`${
                    feature.color === 'green' ? 'text-green-400' :
                    feature.color === 'yellow' ? 'text-yellow-400' :
                    feature.color === 'blue' ? 'text-blue-400' :
                    'text-purple-400'
                  }`}>
                    {feature.icon}
                  </span>
                  <span className="text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
