'use client';

import { motion } from 'framer-motion';

export default function UserjotCloneSection() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Exact match to Userjot */}
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">SeraGPT</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Fiyatlar
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Yardım
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Blog
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Güncellemeler
          </a>
          <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Giriş Yap
          </button>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Main content - Exact match to Userjot layout */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Small text above headline */}
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              BİR SERA MÜHENDİSİ BANA SON ZAMANLARDA SORDU
            </p>
            
            {/* Main headline with quotes */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              <span className="text-gray-400">"</span>
              Neden yanlış sera projeleri için zaman kaybediyoruz?
              <span className="text-gray-400">"</span>
            </h1>
            
            {/* Description paragraph */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-5xl mx-auto">
              Sera yatırım kararlarınız dağınık analizler, belirsiz veriler ve 
              güvenilmez danışmanlıklar arasında kayboldu. SeraGPT merkezi bir 
              platform yaratıyor; <span className="font-semibold text-gray-900">
              mühendisler analiz yapar, oy verir ve projeleri tartışır</span>, 
              böylece her zaman bir sonraki doğru adımı bilirsiniz.
            </p>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-3"
            >
              <span>Ücretsiz Başla</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </motion.button>
            
            {/* Small text under button */}
            <p className="text-gray-500 text-sm">
              Kredi kartı gerekmez. Kurulum gerektirmez.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Bottom illustration area - matching Userjot's rounded container */}
      <div className="px-6 pb-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-gray-200 p-8 md:p-12"
          >
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-lg font-medium">SeraGPT Analiz Platformu</p>
              <p className="text-sm mt-2">Sera yatırım kararlarınız için merkezi analiz merkezi</p>
              
              {/* Simple dashboard mockup */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl mb-2">🌱</div>
                  <div className="text-sm text-gray-600">Proje Analizi</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="text-sm text-gray-600">ROI Hesaplama</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl mb-2">👨‍💼</div>
                  <div className="text-sm text-gray-600">Uzman Görüşü</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
