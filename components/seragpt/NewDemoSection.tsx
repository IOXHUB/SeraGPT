'use client';

import { motion } from 'framer-motion';

export default function NewDemoSection() {
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
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm mb-8">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
            Demo Rapor
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Raporun <span className="text-green-400">Gücünü</span><br />
            <span className="text-purple-400">Kendin Gör</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Örnek yatırım analizini indir, detayları incele:<br />
            <span className="text-green-400 font-semibold">iklim verileri, ekipman listesi, ROI hesaplamaları</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Report Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300">
              {/* PDF Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">PDF</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">SeraGPT_Yatirim_Raporu.pdf</h3>
                    <p className="text-xs text-gray-400">2.3 MB • Bugün oluşturuldu</p>
                  </div>
                </div>
                <div className="text-green-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              
              {/* Report Content */}
              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-4">
                  <h4 className="text-lg font-bold text-white mb-2">
                    🌱 Sera Yatırım Analizi
                  </h4>
                  <p className="text-sm text-gray-400">
                    Lokasyon: Antalya, Aksu • {new Date().toLocaleDateString('tr-TR')}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                    <div className="text-xs text-green-400 font-bold mb-1">YATIRIM TUTARI</div>
                    <div className="text-2xl font-bold text-green-400">₺1.85M</div>
                  </div>
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="text-xs text-blue-400 font-bold mb-1">TAHMİNİ ROI</div>
                    <div className="text-2xl font-bold text-blue-400">%28.5</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: "🌡️ Ortalama Sıcaklık", value: "18-25°C" },
                    { label: "🏗️ Sera Tipi", value: "Cam Sera" },
                    { label: "📏 Alan", value: "5.000 m²" },
                    { label: "🍅 Hedef Ürün", value: "Domates" },
                    { label: "⏱️ Geri Ödeme", value: "3.2 Yıl" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-400">{item.label}:</span>
                      <span className="text-white font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-purple-500 text-white rounded-full p-3 shadow-lg">
              <span className="text-xl">📊</span>
            </div>
          </motion.div>

          {/* Content & Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Raporda Neler Var?
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    icon: "🌡️",
                    title: "İklim Analizi",
                    description: "Detaylı sıcaklık, nem ve ışık verileri"
                  },
                  {
                    icon: "⚙️",
                    title: "Ekipman Önerileri",
                    description: "Maliyet hesaplamalı ekipman listesi"
                  },
                  {
                    icon: "💰",
                    title: "Finansal Analiz",
                    description: "5 yıllık karlılık ve risk projeksiyonu"
                  },
                  {
                    icon: "📈",
                    title: "Pazar Araştırması",
                    description: "Hedef ürün pazar analizi ve fiyat tahminleri"
                  },
                  {
                    icon: "🎯",
                    title: "Uzman Önerileri",
                    description: "Mühendis görüşleri ve uygulama planı"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 group cursor-pointer"
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-green-400 transition-colors">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-green-500 hover:bg-green-600 text-gray-900 px-4 py-2 rounded-lg text-base font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>📄</span>
                <span>PDF Raporu İndir</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full border border-gray-600 hover:border-purple-400 text-white hover:text-purple-400 px-4 py-2 rounded-lg text-base font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>🚀</span>
                <span>Canlı Demo İzle</span>
              </motion.button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Ücretsiz örnek</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Anında indirme</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Gerçek veriler</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
