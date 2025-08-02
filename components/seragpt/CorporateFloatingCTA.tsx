'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CorporateFloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm flex items-center space-x-3 font-semibold transition-all"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">🏢</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">Enterprise Demo</div>
                <div className="text-xs opacity-90 hidden sm:block">Ücretsiz Konsültasyon</div>
              </div>
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
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-slate-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 text-2xl transition-colors"
              >
                ×
              </button>
              
              {/* Modal Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🏢</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Enterprise <span className="text-blue-600">Demo Talep Et</span>
                </h3>
                <p className="text-slate-600">
                  Size özel demo ve kurumsal fiyat teklifi için bilgilerinizi paylaşın
                </p>
              </div>

              {/* Enterprise Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Ünvan
                    </label>
                    <input
                      type="text"
                      placeholder="Proje Müdürü"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Şirket Adı *
                  </label>
                  <input
                    type="text"
                    placeholder="Şirket Adınız"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      placeholder="ornek@sirket.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      placeholder="+90 555 123 45 67"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Proje Büyüklüğü
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <option value="">Seçiniz...</option>
                    <option value="small">1-5 Milyon ₺</option>
                    <option value="medium">5-20 Milyon ₺</option>
                    <option value="large">20-50 Milyon ₺</option>
                    <option value="enterprise">50+ Milyon ₺</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Özel İhtiyaçlar
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Projeniz hakkında detaylı bilgi verin..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-lg text-lg font-bold mt-6 shadow-lg transition-all"
              >
                Demo Randevusu Al
              </motion.button>
              
              {/* Footer Info */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Demo Sürecinde:</h4>
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">✓</span>
                    <span>Kişiselleştirilmiş demo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-600">✓</span>
                    <span>ROI hesaplaması</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-600">✓</span>
                    <span>Özel fiyat teklifi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-600">✓</span>
                    <span>Uzman danışmanlık</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
