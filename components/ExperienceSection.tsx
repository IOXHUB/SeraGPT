'use client'

import { motion } from 'framer-motion'

export function ExperienceSection() {
  const timeline = [
    {
      year: '2003',
      title: 'Kuruluş',
      description: 'Ziraat mühendisliği uzmanlığıyla sera teknolojileri alanında ilk adım',
      icon: '🌱',
      color: 'from-green-500 to-emerald-500',
      achievements: ['İlk sera projesi', 'Temel ekip kurulumu']
    },
    {
      year: '2008',
      title: 'Teknoloji Entegrasyonu',
      description: 'Modern iklim kontrol sistemleri ve otomasyon çözümlerinin entegrasyonu',
      icon: '⚙️',
      color: 'from-blue-500 to-cyan-500',
      achievements: ['İlk otomatik sistem', 'İklim kontrol uzmanlığı']
    },
    {
      year: '2012',
      title: 'Uluslararası Genişleme',
      description: 'Avrupa pazarına açılım ve ilk uluslararası projeler',
      icon: '🌍',
      color: 'from-purple-500 to-indigo-500',
      achievements: ['5 ülkede proje', 'CE sertifikasyonu']
    },
    {
      year: '2016',
      title: 'İnovasyon Dönemi',
      description: 'IoT ve akıllı tarım teknolojilerinin sera sistemlerine entegrasyonu',
      icon: '🚀',
      color: 'from-orange-500 to-red-500',
      achievements: ['IoT sistemleri', 'Akıllı sera çözümleri']
    },
    {
      year: '2020',
      title: 'Sürdürülebilirlik',
      description: 'Organik üretim ve sürdürülebilir tarım çözümlerine odaklanma',
      icon: '♻️',
      color: 'from-green-600 to-emerald-600',
      achievements: ['Organik sertifikalar', 'Enerji verimliliği']
    },
    {
      year: '2023',
      title: 'Gelecek Vizyonu',
      description: 'AI destekli sera yönetimi ve karbon nötr üretim sistemleri',
      icon: '🔮',
      color: 'from-cyan-500 to-blue-600',
      achievements: ['AI entegrasyonu', 'Karbon nötr sistemler']
    }
  ]

  const certifications = [
    {
      name: 'ISO 9001',
      description: 'Kalite Yönetim Sistemi',
      icon: '🏆',
      year: '2010'
    },
    {
      name: 'ISO 14001',
      description: 'Çevre Yönetim Sistemi',
      icon: '🌿',
      year: '2012'
    },
    {
      name: 'CE Marking',
      description: 'Avrupa Uygunluk Belgesi',
      icon: '🇪🇺',
      year: '2011'
    },
    {
      name: 'Organik Sertifika',
      description: 'Organik Üretim Belgesi',
      icon: '🌱',
      year: '2018'
    }
  ]

  const expertise = [
    {
      area: 'Ziraat Mühendisliği',
      level: 95,
      icon: '🎓',
      description: '20+ yıl akademik ve saha deneyimi'
    },
    {
      area: 'Sera Teknolojileri',
      level: 98,
      icon: '🏗️',
      description: 'Modern sera sistemleri uzmanlığı'
    },
    {
      area: 'İklim Kontrolü',
      level: 92,
      icon: '🌡️',
      description: 'Otomatik iklim yönetim sistemleri'
    },
    {
      area: 'Sulama Sistemleri',
      level: 90,
      icon: '💧',
      description: 'Verimli su kullanım çözümleri'
    },
    {
      area: 'Organik Üretim',
      level: 88,
      icon: '🌿',
      description: 'Sürdürülebilir tarım uygulamaları'
    },
    {
      area: 'Proje Yönetimi',
      level: 96,
      icon: '📋',
      description: 'Anahtar teslim proje çözümleri'
    }
  ]

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            20 Yıllık Deneyim
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sera teknolojileri alanındaki yolculuğumuz ve sürekli gelişen uzmanlığımız
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Gelişim Yolculuğumuz
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 to-blue-600 rounded-full"></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                  >
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-3 bg-gradient-to-r ${item.color} text-white`}>
                      <span className="mr-2">{item.icon}</span>
                      {item.year}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <ul className="space-y-1">
                      {item.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-sm text-gray-500 flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r ${item.color} rounded-full border-4 border-white shadow-lg z-10`}
                ></motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expertise Levels */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Uzmanlık Alanlarımız
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {expertise.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">{skill.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{skill.area}</h4>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </div>
                </div>
                
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Seviye</span>
                  <span className="text-sm font-bold text-green-600">{skill.level}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Sertifikalar ve Belgeler
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cert.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {cert.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {cert.description}
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  {cert.year}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Ödüller ve Başarılar</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏆',
                title: 'En İyi Sera Projesi',
                year: '2022',
                organization: 'Avrupa Tarım Fuarı'
              },
              {
                icon: '🌟',
                title: 'İnovasyon Ödülü',
                year: '2021',
                organization: 'Türkiye Sera Birliği'
              },
              {
                icon: '🎖️',
                title: 'Sürdürülebilirlik Ödülü',
                year: '2023',
                organization: 'Green Tech Awards'
              }
            ].map((award, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.1 }}
                className="group"
              >
                <div className="text-4xl mb-3 group-hover:animate-bounce">
                  {award.icon}
                </div>
                <h4 className="font-bold text-lg mb-1">
                  {award.title}
                </h4>
                <p className="text-green-100 text-sm mb-1">
                  {award.organization}
                </p>
                <p className="text-green-200 text-xs">
                  {award.year}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
