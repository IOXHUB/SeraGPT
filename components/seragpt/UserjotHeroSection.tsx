'use client';

import { motion } from 'framer-motion';

export default function UserjotHeroSection() {
  return (
    <section className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">SeraGPT</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Fiyatlar</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Yardım</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Blog</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Güncellemeler</a>
          <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Giriş Yap
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-8">
              Sera mühendisiniz size sordu
            </p>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-8">
              <span className="text-gray-400">"</span>
              Neden yanlış projeler için zaman kaybediyoruz?
              <span className="text-gray-400">"</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              Sera yatırım kararlarınız dağınık veriler, eksik analizler ve 
              belirsizlikler arasında kayboldu. SeraGPT, 
              <span className="font-semibold text-gray-900"> doğru kararlar almak, 
              riskleri değerlendirmek ve başarılı projeler</span> yapmanız için 
              merkezi bir analiz platformu yaratıyor.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-3"
            >
              <span>Ücretsiz Başla</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </motion.button>
            
            <p className="text-gray-500 text-sm mt-6">
              Kredi kartı gerekmez. Kurulum gerektirmez.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Illustration Placeholder */}
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl h-32 flex items-center justify-center border border-gray-200">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-sm">SeraGPT Analiz Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
