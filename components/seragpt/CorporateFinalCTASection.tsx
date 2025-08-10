'use client';

import { motion } from 'framer-motion';

export default function CorporateFinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/20 border border-white/30 rounded-full text-blue-100 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></span>
            Kurumsal Çözümler
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            Sera Yatırımlarınızı<br />
            <span className="text-blue-200">Veri Odaklı</span> Planlayın
          </h2>
          
          <p className="text-xl lg:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Enterprise-grade analiz platformu ile kurumsal sera projelerinizi 
            <span className="text-white font-semibold"> %60 daha hızlı</span> ve 
            <span className="text-white font-semibold"> %25 daha karlı</span> hale getirin.
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <span className="text-2xl">🚀</span>
              <span>Ücretsiz Enterprise Demo</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg text-base font-medium transition-all flex items-center space-x-2"
            >
              <span className="text-2xl">📋</span>
              <span>Fiyat Teklifi Al</span>
            </motion.button>
          </div>

          {/* Enterprise Value Props */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
            >
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold mb-4">Enterprise Ready</h3>
              <ul className="text-left space-y-2 text-blue-100">
                <li className="flex items-center space-x-2">
                  <span className="text-white">✓</span>
                  <span>SOC 2 & ISO 27001 Sertifikalı</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white">✓</span>
                  <span>SSO & LDAP Entegrasyonu</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white">✓</span>
                  <span>%99.9 Uptime SLA</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-4">Hızlı ROI</h3>
              <ul className="text-left space-y-2 text-blue-100">
                <li className="flex items-center space-x-2">
                  <span className="text-white">✓</span>
                  <span>3 ay içinde geri dönüş</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white">✓</span>
                  <span>%60 hızlı karar alma</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white">✓</span>
                  <span>%25 maliyet tasarrufu</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Premium Destek</h3>
              <ul className="text-left space-y-2 text-blue-100">
                <li className="flex items-center space-x-2">
                  <span className="text-white">✓</span>
                  <span>7/24 Teknik Destek</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white">✓</span>
                  <span>Dedicated Customer Success</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white">✓</span>
                  <span>Özel Training & Onboarding</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-8">Kurumsal Güven Göstergeleri</h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { number: "500+", label: "Kurumsal Müşteri", icon: "🏢" },
                { number: "₺2.5B+", label: "Analiz Edilen Yatırım", icon: "💰" },
                { number: "%99.8", label: "Platform Güvenilirliği", icon: "🛡️" },
                { number: "20+", label: "Yıl Sektör Deneyimi", icon: "⭐" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
              {[
                "ISO 27001 Sertifikalı",
                "SOC 2 Type II",
                "GDPR Uyumlu", 
                "Türkiye Veri Merkezi",
                "256-bit Şifreleme",
                "99.9% SLA"
              ].map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-white">🔒</span>
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <p className="text-lg text-blue-100 mb-6">
              Fortune 500 şirketleri SeraGPT Enterprise ile sera yatırımlarını optimize ediyor
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-blue-200">
              <div className="flex items-center space-x-2">
                <span className="text-white">✓</span>
                <span>30 gün ücretsiz deneme</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white">✓</span>
                <span>Kurulum desteği</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white">✓</span>
                <span>Para iade garantisi</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
