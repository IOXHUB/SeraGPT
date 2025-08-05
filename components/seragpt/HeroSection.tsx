'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            🚀 <span className="text-green-600">1 Dakikada</span><br />
            Sera Yatırım Raporun<br />
            <span className="text-blue-600">Hazır!</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Lokasyonuna özel yapay zekâ destekli yatırım analizi.<br />
            <span className="font-semibold text-green-700">Gerçek veriler + gerçek mühendis desteğiyle</span> karar ver.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-colors"
            >
              Demo Raporu Gör
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-colors"
            >
              Hemen Başla
            </motion.button>
          </div>
          
          <div className="mt-8 text-sm text-gray-600">
            ✅ 20+ yıllık mühendislik deneyimi
            <span className="mx-3">•</span>
            ✅ Lokasyona özel analiz
            <span className="mx-3">•</span>
            ✅ İlk 5 analiz ücretsiz
          </div>
        </motion.div>
        
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <div className="h-4 bg-green-200 rounded mb-2"></div>
              <div className="h-4 bg-blue-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="text-center text-gray-600 font-semibold">
              📊 AI Destekli Sera Analizi
            </div>
          </div>
          
          <div className="absolute -bottom-4 -right-4 bg-green-600 text-white rounded-full p-4 shadow-lg">
            <div className="text-2xl">⚡</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
