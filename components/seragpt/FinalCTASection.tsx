'use client';

import { motion } from 'framer-motion';

export default function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-blue-700 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Sera Kurmaya Hazırsan,<br />
            <span className="text-yellow-300">İlk Adımı SeraGPT ile At!</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            1 dakikada detaylı yatırım analizini al.<br />
            <span className="font-semibold">Karar vermeden önce veriyle hareket et.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-10 py-5 rounded-xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all"
            >
              🚀 Hemen Başla
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-gray-900 px-10 py-5 rounded-xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all"
            >
              📄 Demo Raporu İndir
            </motion.button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-bold mb-2">20+ Yıl Deneyim</h3>
              <p className="text-sm opacity-80">Sera teknolojileri uzmanı</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-bold mb-2">AI Destekli Analiz</h3>
              <p className="text-sm opacity-80">Yapay zeka teknolojisi</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-bold mb-2">%95+ Doğruluk</h3>
              <p className="text-sm opacity-80">Gerçek verilerle destekli</p>
            </motion.div>
          </div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="text-2xl">🔒</div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Güven Mührü</h3>
                <p className="text-sm opacity-90">
                  Tarım uzmanları ve mühendislerle birlikte geliştirildi
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">✓</span>
                <span>İlk 5 analiz ücretsiz</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">✓</span>
                <span>1 dakikada sonuç</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">✓</span>
                <span>Uzman mühendis desteği</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">✓</span>
                <span>Detaylı PDF rapor</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
