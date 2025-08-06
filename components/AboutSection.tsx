'use client'

import { motion } from 'framer-motion'

export function AboutSection() {
  const achievements = [
    {
      icon: '🎓',
      title: 'Ziraat Mühendisliği',
      description: '20+ yıl tarım ve sera teknolojileri alanında uzmanlık',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '����',
      title: 'Uluslararası Deneyim',
      description: '15+ ülkede başarılı proje uygulamaları',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🏆',
      title: 'Kalite Sertifikaları',
      description: 'CE, ISO 9001, ISO 14001 sertifikalı sistemler',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: '🔬',
      title: 'Ar-Ge Çalışmaları',
      description: 'Sürekli inovasyon ve teknoloji geliştirme',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hakkımızda
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            20 yıllık deneyimimizle tarım sektöründe öncü, güvenilir ve yenilikçi sera çözümleri sunuyoruz
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Vizyonumuz
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Sürdürülebilir tarım ve modern sera teknolojileriyle gıda güvenliğine katkıda bulunmak, 
                çiftçilerimize en verimli ve karlı üretim çözümlerini sunmaktır.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Misyonumuz
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ziraat mühendisliği uzmanlığımızla, en son teknoloji sera sistemlerini tasarlayıp 
                uygulayarak müşterilerimize kaliteli, dayanıklı ve verimli çözümler sunmak.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">
                🌱 Profesyonel Yaklaşım
              </h3>
              <p className="opacity-90">
                Her projede müşteri memnuniyetini ön planda tutarak, 
                başlangıçtan teslime kadar kesintisiz hizmet garantisi veriyoruz.
              </p>
            </div>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group-hover:border-green-200">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {achievement.icon}
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {achievement.description}
                  </p>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: '500+', label: 'Tamamlanan Proje', icon: '🏗️' },
                { number: '15+', label: 'Ülkede Hizmet', icon: '🌍' },
                { number: '20+', label: 'Yıl Deneyim', icon: '⭐' },
                { number: '%99', label: 'Müşteri Memnuniyeti', icon: '😊' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-green-100">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
