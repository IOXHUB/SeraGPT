'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function ServicesSection() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      icon: '🏗️',
      title: 'Sera Montajı',
      description: 'Profesyonel ekibimizle A-Z sera kurulum hizmetleri',
      features: [
        'Anahtar teslim sera projeleri',
        'Kaliteli malzeme garantisi',
        'Hızlı ve güvenli montaj',
        'Saha analizi ve planlama'
      ],
      image: '🌿',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🌡️',
      title: 'İklim Kontrol Sistemleri',
      description: 'Modern otomasyon ve akıllı kontrol çözümleri',
      features: [
        'Sıcaklık ve nem kontrolü',
        'Otomatik havalandırma',
        'IoT entegrasyonu',
        '7/24 uzaktan izleme'
      ],
      image: '⚙️',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💧',
      title: 'Sulama Sistemleri',
      description: 'Verimli su kullanımı için damla sulama çözümleri',
      features: [
        'Damla sulama sistemleri',
        'Hidroponik kurulumlar',
        'Gübre karıştırma sistemleri',
        'Su geri kazanım çözümleri'
      ],
      image: '💧',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: '🔧',
      title: 'Bakım ve Onarım',
      description: 'Düzenli bakım ve hızlı onarım hizmetleri',
      features: [
        'Periyodik bakım hizmetleri',
        'Acil onarım desteği',
        'Yedek parça temini',
        'Sistem upgrade hizmetleri'
      ],
      image: '🛠️',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '📋',
      title: 'Danışmanlık',
      description: 'Ziraat mühendisliği uzmanlığı ve teknik danışmanlık',
      features: [
        'Proje fizibilite analizi',
        'Bitki yetiştirme danışmanlığı',
        'Verim optimizasyonu',
        'Eğitim ve teknik destek'
      ],
      image: '📊',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: '🌱',
      title: 'Organik Çözümler',
      description: 'Sürdürülebilir ve organik tarım sistemleri',
      features: [
        'Organik sertifikalı sistemler',
        'Biyolojik mücadele çözümleri',
        'Kompost ve gübreleme',
        'Sürdürülebilir tarım danışmanlığı'
      ],
      image: '🌿',
      color: 'from-green-600 to-emerald-600'
    }
  ]

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hizmetlerimiz
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sera teknolojisinin her alanında profesyonel çözümler sunuyoruz
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setActiveService(index)}
              className={`cursor-pointer group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 ${
                activeService === index ? 'border-green-500' : 'border-transparent hover:border-green-200'
              }`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Active Indicator */}
              {activeService === index && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full"
                />
              )}

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Service View */}
        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Details */}
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${services[activeService].color} rounded-lg flex items-center justify-center text-white text-xl mr-4`}>
                  {services[activeService].icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {services[activeService].title}
                </h3>
              </div>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {services[activeService].description}
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Özellikler ve Avantajlar:
              </h4>

              <ul className="space-y-3">
                {services[activeService].features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`mt-6 bg-gradient-to-r ${services[activeService].color} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
              >
                Detaylı Bilgi Al
              </motion.button>
            </div>

            {/* Right Side - Visual */}
            <div className={`bg-gradient-to-br ${services[activeService].color} p-8 flex items-center justify-center`}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center text-white"
              >
                <div className="text-8xl mb-4">
                  {services[activeService].image}
                </div>
                <h4 className="text-2xl font-bold mb-2">
                  Profesyonel Hizmet
                </h4>
                <p className="text-white/80">
                  20+ yıl deneyim ile güvence
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Projeniz için en uygun çözümü birlikte bulalım
            </h3>
            <p className="text-gray-600 mb-6">
              Uzman ekibimiz size özel sera çözümleri geliştirmek için hazır
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              🌱 Ücretsiz Keşif ve Teklif
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
