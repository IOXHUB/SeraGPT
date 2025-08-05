'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewFloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show button after scrolling down 100vh
      setIsVisible(scrollPosition > windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-gray-900 px-6 py-4 rounded-full shadow-2xl border border-green-400/30 backdrop-blur-sm flex items-center space-x-3 font-bold text-lg transition-all"
            >
              <motion.span 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                🚀
              </motion.span>
              <span className="hidden sm:block">Ücretsiz Analiz Al</span>
              <span className="sm:hidden">Analiz</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors"
              >
                ×
              </button>
              
              {/* Modal Header */}
              <div className="text-center mb-6">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-4"
                >
                  🚀
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Ücretsiz <span className="text-green-400">Analiz Başlat</span>
                </h3>
                <p className="text-gray-300">
                  1 dakikada sera yatırım raporun hazır!
                </p>
              </div>

              {/* Quick Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-green-400 mb-2">
                    📍 Lokasyon
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                    <option value="">İl seçin...</option>
                    <option value="antalya">Antalya</option>
                    <option value="mersin">Mersin</option>
                    <option value="adana">Adana</option>
                    <option value="mugla">Muğla</option>
                    <option value="izmir">İzmir</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-blue-400 mb-2">
                    🌱 Hedef Ürün
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <option value="">Ürün seçin...</option>
                    <option value="domates">Domates</option>
                    <option value="salatalik">Salatalık</option>
                    <option value="biber">Biber</option>
                    <option value="patlican">Patlıcan</option>
                    <option value="cilek">Çilek</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-purple-400 mb-2">
                    📏 Sera Büyüklüğü (m²)
                  </label>
                  <input
                    type="number"
                    placeholder="Örn: 5000"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-yellow-400 mb-2">
                    📧 E-posta
                  </label>
                  <input
                    type="email"
                    placeholder="rapor@email.com"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-gray-900 py-4 rounded-lg text-lg font-bold mt-6 shadow-lg transition-all flex items-center justify-center space-x-3"
              >
                <span>🚀</span>
                <span>Analizi Başlat</span>
              </motion.button>
              
              <div className="grid grid-cols-3 gap-4 mt-4 text-xs text-gray-400 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-green-400">✓</span>
                  <span>Ücretsiz</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-blue-400">⚡</span>
                  <span>1 dakika</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-purple-400">👨‍🔬</span>
                  <span>Uzman yorumu</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
