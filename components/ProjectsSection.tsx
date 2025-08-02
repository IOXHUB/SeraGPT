'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'Tümü', icon: '🔍' },
    { id: 'greenhouse', label: 'Sera Projeleri', icon: '🏗️' },
    { id: 'climate', label: 'İklim Kontrolü', icon: '🌡️' },
    { id: 'irrigation', label: 'Sulama Sistemleri', icon: '💧' },
    { id: 'organic', label: 'Organik Çözümler', icon: '🌱' }
  ]

  const projects = [
    {
      id: 1,
      title: 'Akdeniz Organik Sera Kompleksi',
      category: 'greenhouse',
      location: 'Antalya, Türkiye',
      area: '50.000 m²',
      year: '2023',
      description: 'Modern iklim kontrollü sera kompleksi ile organik domates üretimi',
      image: '🍅',
      tags: ['Organik Üretim', 'İklim Kontrol', 'Hidroponik'],
      stats: { yield: '+40%', efficiency: '95%', sustainability: 'A+' },
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 2,
      title: 'Hollanda Teknolojisi Sera Kurulumu',
      category: 'climate',
      location: 'Amsterdam, Hollanda',
      area: '25.000 m²',
      year: '2023',
      description: 'IoT destekli akıllı sera sistemi ve enerji verimli çözümler',
      image: '🌷',
      tags: ['IoT', 'Enerji Verimliliği', 'Akıllı Sistem'],
      stats: { yield: '+60%', efficiency: '98%', sustainability: 'A+' },
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Çilek Üretim Serası - Almanya',
      category: 'irrigation',
      location: 'Berlin, Almanya',
      area: '15.000 m²',
      year: '2022',
      description: 'Damla sulama sistemli yüksek verimli çilek üretim tesisi',
      image: '🍓',
      tags: ['Damla Sulama', 'Verim Optimizasyonu', 'Kalite Kontrol'],
      stats: { yield: '+35%', efficiency: '92%', sustainability: 'A' },
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 4,
      title: 'Organik Sebze Üretim Merkezi',
      category: 'organic',
      location: 'İzmir, Türkiye',
      area: '30.000 m²',
      year: '2022',
      description: 'Sertifikalı organik sebze üretimi için tam otomatik sera sistemi',
      image: '🥬',
      tags: ['Organik Sertifika', 'Otomasyon', 'Sürdürülebilirlik'],
      stats: { yield: '+45%', efficiency: '94%', sustainability: 'A+' },
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      title: 'Renkli Biber Üretim Serası',
      category: 'greenhouse',
      location: 'Valencia, İspanya',
      area: '20.000 m²',
      year: '2021',
      description: 'Multi-span sera yapısı ile yıl boyu renkli biber üretimi',
      image: '🌶️',
      tags: ['Multi-span', 'Yıl Boyu Üretim', 'Export Kalitesi'],
      stats: { yield: '+50%', efficiency: '96%', sustainability: 'A' },
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 6,
      title: 'Hibrit Sera Teknolojisi',
      category: 'climate',
      location: 'Moskova, Rusya',
      area: '40.000 m²',
      year: '2021',
      description: 'Soğuk iklim koşullarına özel hibrit sera sistemi',
      image: '❄️',
      tags: ['Soğuk İklim', 'Enerji Tasarrufu', 'Hibrit Sistem'],
      stats: { yield: '+55%', efficiency: '90%', sustainability: 'A+' },
      color: 'from-cyan-500 to-blue-500'
    }
  ]

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Projelerimiz
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dünya genelindeki başarılı projelerimizle tarım sektöründe fark yaratıyoruz
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Project Image/Icon */}
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="text-6xl"
                >
                  {project.image}
                </motion.div>
                
                {/* Year Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white font-semibold text-sm">
                  {project.year}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <span className="mr-4">📍 {project.location}</span>
                  <span>📏 {project.area}</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{project.stats.yield}</div>
                    <div className="text-xs text-gray-500">Verim Artışı</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{project.stats.efficiency}</div>
                    <div className="text-xs text-gray-500">Verimlilik</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{project.stats.sustainability}</div>
                    <div className="text-xs text-gray-500">Sürdürülebilirlik</div>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Proje Başarı İstatistikleri</h3>
              <p className="text-green-100">Tüm projelerimizde elde ettiğimiz ortalama sonuçlar</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { 
                  icon: '📈', 
                  value: '+48%', 
                  label: 'Ortalama Verim Artışı',
                  description: 'Geleneksel yöntemlere göre'
                },
                { 
                  icon: '⚡', 
                  value: '94%', 
                  label: 'Sistem Verimliliği',
                  description: 'Enerji ve kaynak kullanımı'
                },
                { 
                  icon: '🌍', 
                  value: '15+', 
                  label: 'Ülkede Proje',
                  description: 'Uluslararası deneyim'
                },
                { 
                  icon: '⭐', 
                  value: '%100', 
                  label: 'Proje Başarı Oranı',
                  description: 'Zamanında teslim garantisi'
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-green-100 opacity-80">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
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
              Bir sonraki başarı hikayesi sizin olsun
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              20 yıllık deneyimimiz ve kanıtlanmış başarılarımızla projenizi hayata geçirelim
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              🚀 Projenizi Başlatalım
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
