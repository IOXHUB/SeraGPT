'use client';

import { motion } from 'framer-motion';

export default function DemoSection() {
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
            Raporun Ne Kadar<br />
            <span className="text-blue-600">Güçlü Olduğunu</span><br />
            <span className="text-green-600">Kendin Gör</span>
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Örnek yatırım analizini indir, içerikleri gör:<br />
            <span className="font-semibold text-green-600">sıcaklık, ekipman listesi, ROI hesaplamaları</span>
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
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
              {/* PDF Header */}
              <div className="bg-red-600 text-white px-4 py-2 rounded-t-lg text-sm font-bold flex items-center">
                <span className="mr-2">📄</span>
                SeraGPT_Yatirim_Raporu.pdf
              </div>
              
              {/* PDF Content Preview */}
              <div className="bg-white p-6 rounded-b-lg">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    🌱 Sera Yatırım Analizi Raporu
                  </h3>
                  <p className="text-sm text-gray-600">
                    Lokasyon: Antalya, Aksu • Tarih: {new Date().toLocaleDateString('tr-TR')}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded">
                      <div className="text-xs text-green-600 font-bold">YATIRIM TUTARI</div>
                      <div className="text-lg font-bold text-green-700">₺1.850.000</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-xs text-blue-600 font-bold">TAHMİNİ ROI</div>
                      <div className="text-lg font-bold text-blue-700">%28.5</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">🌡️ Ortalama Sıcaklık:</span>
                      <span className="font-semibold">18-25°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">🏗️ Sera Tipi:</span>
                      <span className="font-semibold">Cam Sera</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">📏 Alan:</span>
                      <span className="font-semibold">5.000 m²</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">🍅 Hedef Ürün:</span>
                      <span className="font-semibold">Domates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-3 shadow-lg">
              <span className="text-xl">📊</span>
            </div>
          </motion.div>

          {/* Content & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Raporda Neler Var?
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    icon: "🌡️",
                    title: "İklim Analizi",
                    description: "Lokasyona özel sıcaklık, nem ve ışık verileri"
                  },
                  {
                    icon: "⚙️",
                    title: "Ekipman Listesi",
                    description: "Detaylı ekipman önerileri ve maliyet hesaplamaları"
                  },
                  {
                    icon: "💰",
                    title: "ROI Hesaplaması",
                    description: "5 yıllık karlılık projeksiyonu ve risk analizi"
                  },
                  {
                    icon: "📈",
                    title: "Pazar Analizi",
                    description: "Hedef ürün için pazar durumu ve fiyat tahminleri"
                  },
                  {
                    icon: "🎯",
                    title: "Öneriler",
                    description: "Uzman mühendis görüşleri ve uygulama planı"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-colors"
              >
                📄 PDF Raporu İndir
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-colors"
              >
                🚀 Demo Al
              </motion.button>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              ✅ Ücretsiz örnek rapor
              <span className="mx-2">•</span>
              ✅ Anında indirme
              <span className="mx-2">•</span>
              ✅ Gerçek veriler
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
