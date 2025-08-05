'use client';

import { motion } from 'framer-motion';

export default function CorporateDemoSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            Platform Demosu
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8 leading-tight">
            Enterprise Platform<br />
            <span className="text-purple-600">Gücünü Deneyimleyin</span>
          </h2>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Kurumsal standartlarda hazırlanmış sera yatırım analiz raporlarını inceleyin.<br />
            <span className="text-purple-700 font-semibold">Executive dashboard, detaylı finansal projeksiyon ve risk analizi</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-slate-800 text-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold">E</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Enterprise Dashboard</h3>
                      <p className="text-xs text-slate-300">Real-time Analytics</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="p-6 space-y-6">
                {/* Project Overview */}
                <div className="border-b border-slate-200 pb-4">
                  <h4 className="text-lg font-bold text-slate-800 mb-3">
                    📊 Akdeniz Sera Kompleksi - Fizibilite Raporu
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Lokasyon:</span>
                      <span className="font-semibold ml-2">Antalya, Kumluca</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Proje ID:</span>
                      <span className="font-semibold ml-2">ENT-2024-001</span>
                    </div>
                  </div>
                </div>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-xs text-green-600 font-bold mb-1">TOPLAM YATIRIM</div>
                    <div className="text-2xl font-bold text-green-700">₺18.5M</div>
                    <div className="text-xs text-green-600">%12 risk marjı dahil</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-xs text-blue-600 font-bold mb-1">BEKLENEN ROI</div>
                    <div className="text-2xl font-bold text-blue-700">%31.2</div>
                    <div className="text-xs text-blue-600">5 yıllık projeksiyon</div>
                  </div>
                </div>
                
                {/* Technical Specs */}
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">🌡️ İklim Uygunluğu:</span>
                      <span className="font-semibold text-green-600">Optimal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">📏 Sera Alanı:</span>
                      <span className="font-semibold">25,000 m²</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">🏗️ Teknoloji:</span>
                      <span className="font-semibold">Cam Sera + IoT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">🚜 Hedef Ürün:</span>
                      <span className="font-semibold">Domates + Salatalık</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">⏱️ Tamamlanma:</span>
                      <span className="font-semibold">14 ay</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">📈 Risk Skoru:</span>
                      <span className="font-semibold text-yellow-600">Orta</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-semibold">
                    Detaylı Rapor
                  </button>
                  <button className="flex-1 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg text-sm font-semibold">
                    Paylaş
                  </button>
                </div>
              </div>
            </div>
            
            {/* Floating Badges */}
            <div className="absolute -top-4 -right-4 bg-purple-600 text-white rounded-full p-3 shadow-lg">
              <span className="text-xl">🏢</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-emerald-500 text-white rounded-full p-3 shadow-lg">
              <span className="text-xl">📊</span>
            </div>
          </motion.div>

          {/* Features & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Enterprise Dashboard Özellikleri
              </h3>
              
              <div className="space-y-6">
                {[
                  {
                    icon: "📊",
                    title: "Executive Summary",
                    description: "C-level yöneticiler için özetlenmiş karar destek raporları"
                  },
                  {
                    icon: "💰",
                    title: "Finansal Modelleme",
                    description: "DCF, NPV, IRR hesaplamaları ve senaryo analizleri"
                  },
                  {
                    icon: "🎯",
                    title: "Risk Matrisi",
                    description: "Kapsamlı risk değerlendirmesi ve mitigation stratejileri"
                  },
                  {
                    icon: "📈",
                    title: "Market Intelligence",
                    description: "Sektörel benchmarking ve pazar trend analizleri"
                  },
                  {
                    icon: "🔄",
                    title: "Real-time Updates",
                    description: "Canlı veri akışı ve otomatik rapor güncellemeleri"
                  },
                  {
                    icon: "👥",
                    title: "Team Collaboration",
                    description: "Çoklu kullanıcı erişimi ve yorum sistemi"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform">{feature.icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-colors flex items-center justify-center space-x-3"
              >
                <span>🖥️</span>
                <span>Canlı Demo İzle</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full border-2 border-slate-300 hover:border-purple-600 text-slate-700 hover:text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center space-x-3"
              >
                <span>📄</span>
                <span>Örnek Rapor İndir</span>
              </motion.button>
            </div>
            
            {/* Security & Compliance */}
            <div className="bg-slate-100 rounded-lg p-6 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center">
                <span className="mr-2">🔒</span>
                Güvenlik & Compliance
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  "SOC 2 Type II",
                  "ISO 27001",
                  "GDPR Compliant",
                  "256-bit Encryption"
                ].map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-emerald-600">✓</span>
                    <span className="text-slate-600">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
