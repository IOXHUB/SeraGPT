'use client';

import { motion } from 'framer-motion';

export default function CorporateSolutionSection() {
  const solutions = [
    {
      icon: "🎯",
      title: "Veri Odaklı Analiz",
      description: "Kapsamlı veri setleri ve algoritma destekli analiz",
      features: ["Gerçek zamanlı veri", "Prediktif analiz", "Benchmarking"]
    },
    {
      icon: "🛡️",
      title: "Risk Yönetimi",
      description: "Gelişmiş risk modelleme ve senario analizi",
      features: ["Monte Carlo simülasyonu", "Stress testing", "Risk matrisi"]
    },
    {
      icon: "👨‍💼",
      title: "Uzman Danışmanlık",
      description: "20+ yıl deneyimli mühendis ekibi",
      features: ["Sektör expertise", "Teknik danışmanlık", "Proje yönetimi"]
    },
    {
      icon: "⚙️",
      title: "Teknoloji Entegrasyonu",
      description: "Modern sera teknolojileri entegrasyon desteği",
      features: ["IoT entegrasyonu", "Otomasyon", "API desteği"]
    },
    {
      icon: "📊",
      title: "Kurumsal Raporlama",
      description: "Detaylı analiz ve sunum raporları",
      features: ["Executive summary", "Finansal projeksiyon", "ROI analizi"]
    },
    {
      icon: "🔒",
      title: "Güvenlik & Compliance",
      description: "Kurumsal güvenlik standartları",
      features: ["ISO 27001", "GDPR uyumlu", "Veri şifreleme"]
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="page-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Enterprise Çözümler
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-8 leading-tight">
            <span className="text-blue-600">SeraGPT Enterprise</span><br />
            Kurumsal Analiz Platformu
          </h2>
          
          <p className="text-xl text-slate-600 text-section-container leading-relaxed">
            Kurumsal müşterilerimiz için özel geliştirilmiş, <span className="text-blue-700 font-semibold">enterprise-grade</span> sera yatırım analiz çözümü. 
            Tüm iş süreçlerinizi dijitalleştirin ve veri odaklı kararlar alın.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl h-full">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">
                  {solution.icon}
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors">
                  {solution.title}
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {solution.description}
                </p>
                
                <ul className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-slate-500">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-12 text-white"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Enterprise Avantajları
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: "SLA Garantisi", value: "99.9%" },
                  { label: "Destek", value: "7/24" },
                  { label: "Entegrasyon", value: "API" },
                  { label: "Güvenlik", value: "SOC 2" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-blue-100">{item.value}</div>
                    <div className="text-sm text-blue-200">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h4 className="text-xl font-bold mb-6">Platform Özellikleri</h4>
              <ul className="space-y-3">
                {[
                  "Çoklu proje yönetimi",
                  "Real-time dashboard",
                  "Otomatik raporlama",
                  "Team collaboration",
                  "Version control",
                  "Audit trails"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-blue-300 mr-3">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-50 transition-colors"
            >
              Enterprise Demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg text-base font-medium transition-colors"
            >
              Fiyat Teklifi Al
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
