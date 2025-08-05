'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    area: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        area: '',
        message: ''
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: '📞',
      title: 'Telefon',
      value: '+90 532 123 45 67',
      href: 'tel:+905321234567',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '📧',
      title: 'E-posta',
      value: 'info@seragreen.com',
      href: 'mailto:info@seragreen.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📍',
      title: 'Adres',
      value: 'Antalya Teknoloji Merkezi\nAkdeniz Üniversitesi Kampüsü',
      href: '#',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: '🌐',
      title: 'Website',
      value: 'www.seragreen.com',
      href: 'https://seragreen.com',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const projectTypes = [
    'Sera Kurulumu',
    'İklim Kontrol Sistemi',
    'Sulama Sistemi',
    'Otomasyon Çözümleri',
    'Organik Üretim',
    'Danışmanlık',
    'Bakım ve Onarım',
    'Diğer'
  ]

  const offices = [
    {
      country: '🇹🇷 Türkiye',
      city: 'Antalya (Merkez)',
      address: 'Teknoloji Merkezi, Akdeniz Üni.',
      phone: '+90 532 123 45 67'
    },
    {
      country: '🇳🇱 Hollanda',
      city: 'Amsterdam',
      address: 'Tech Hub, Zuidoost District',
      phone: '+31 20 123 4567'
    },
    {
      country: '🇩🇪 Almanya',
      city: 'Berlin',
      address: 'Innovation Center, Mitte',
      phone: '+49 30 123 4567'
    },
    {
      country: '🇪🇸 İspanya',
      city: 'Valencia',
      address: 'Agri-Tech Park, Centro',
      phone: '+34 96 123 4567'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            İletişim
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Projeniz için ücretsiz keşif ve teklif almak için bizimle iletişime geçin
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                🌱 Teklif Formu
              </h3>
              
              {submitted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h4 className="text-xl font-bold text-green-600 mb-2">
                    Talebiniz Alındı!
                  </h4>
                  <p className="text-gray-600">
                    En kısa sürede size dönüş yapacağız
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning={true}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Adınız ve soyadınız"
                        suppressHydrationWarning={true}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="email@ornek.com"
                        suppressHydrationWarning={true}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="0532 123 45 67"
                        suppressHydrationWarning={true}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Şirket
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Şirket adınız"
                        suppressHydrationWarning={true}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proje Türü *
                      </label>
                      <select
                        required
                        value={formData.projectType}
                        onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        suppressHydrationWarning={true}
                      >
                        <option value="">Seçiniz</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sera Alanı (m²)
                      </label>
                      <input
                        type="number"
                        value={formData.area}
                        onChange={(e) => setFormData({...formData, area: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Örn: 1000"
                        suppressHydrationWarning={true}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proje Detayları
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Projeniz hakkında detaylı bilgi verebilirsiniz..."
                      suppressHydrationWarning={true}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Gönderiliyor...
                      </div>
                    ) : (
                      '🚀 Teklif Talep Et'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="block bg-white rounded-xl shadow-lg p-6 border border-gray-100 group hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {info.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    {info.title}
                  </h4>
                  <p className="text-gray-600 whitespace-pre-line">
                    {info.value}
                  </p>
                </motion.a>
              ))}
            </div>

            {/* Office Locations */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-6">
                🌍 Ofislerimiz
              </h4>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border-l-4 border-green-500 pl-4 py-2"
                  >
                    <h5 className="font-bold text-gray-900">
                      {office.country}
                    </h5>
                    <p className="text-gray-600 text-sm">
                      {office.city} - {office.address}
                    </p>
                    <p className="text-green-600 text-sm font-medium">
                      📞 {office.phone}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-6 text-white">
              <h4 className="text-xl font-bold mb-4">
                ⚡ Hızlı İletişim
              </h4>
              <p className="mb-4 opacity-90">
                Acil durumlarda 7/24 ulaşabileceğiniz direktörümüz
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Ziraat Müh. Ahmet Sera</p>
                  <p className="text-green-100 text-sm">Genel Müdür</p>
                </div>
                <motion.a
                  href="tel:+905321234567"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  📞 Ara
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
