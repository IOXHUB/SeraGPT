'use client'

import { motion } from 'framer-motion'

export function Footer() {
  const footerLinks = {
    services: [
      'Sera Montajı',
      'İklim Kontrol',
      'Sulama Sistemleri',
      'Bakım ve Onarım',
      'Danışmanlık'
    ],
    company: [
      'Hakkımızda',
      'Projelerimiz',
      'Kalite Politikamız',
      'Sürdürülebilirlik',
      'Kariyer'
    ],
    support: [
      'Teknik Destek',
      'Garanti Hizmetleri',
      'Yedek Parça',
      'Eğitim Programları',
      'SSS'
    ]
  }

  const socialLinks = [
    { icon: '📧', label: 'E-posta', href: 'mailto:info@seragreen.com' },
    { icon: '📞', label: 'Telefon', href: 'tel:+905321234567' },
    { icon: '📍', label: 'Konum', href: '#' },
    { icon: '🌐', label: 'Website', href: '#' }
  ]

  const certifications = [
    { name: 'ISO 9001', icon: '🏆' },
    { name: 'ISO 14001', icon: '🌿' },
    { name: 'CE', icon: '🇪🇺' },
    { name: 'Organik', icon: '🌱' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">🌿</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">SeraGreen</h3>
                <p className="text-gray-400 text-sm">Profesyonel Sera Çözümleri</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              20 yıllık deneyimimizle sera teknolojisinin öncüsü, 
              sürdürülebilir tarım çözümleriyle geleceği inşa ediyoruz.
            </p>

            {/* Certifications */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-200 mb-3">Sertifikalarımız</h4>
              <div className="flex space-x-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="bg-gray-800 rounded-lg p-2 text-center"
                    title={cert.name}
                  >
                    <div className="text-lg">{cert.icon}</div>
                    <div className="text-xs text-gray-400">{cert.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-6 text-green-400">Hizmetlerimiz</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((service, index) => (
                <li key={index}>
                  <motion.a
                    href="#services"
                    whileHover={{ x: 5, color: '#22c55e' }}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-6 text-green-400">Kurumsal</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((item, index) => (
                <li key={index}>
                  <motion.a
                    href="#about"
                    whileHover={{ x: 5, color: '#22c55e' }}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-6 text-green-400">Destek</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.support.map((item, index) => (
                <li key={index}>
                  <motion.a
                    href="#contact"
                    whileHover={{ x: 5, color: '#22c55e' }}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Quick Contact */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-green-400 mb-2">Hızlı İletişim</h5>
              <p className="text-gray-300 text-sm mb-2">
                📞 +90 532 123 45 67
              </p>
              <p className="text-gray-300 text-sm mb-3">
                📧 info@seragreen.com
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded font-semibold text-sm transition-colors duration-300"
              >
                Teklif Al
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-gray-400 text-sm mb-4 md:mb-0"
            >
              © 2024 SeraGreen Profesyonel Sera Çözümleri. Tüm hakları saklıdır.
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex space-x-6 text-sm"
            >
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                Kullanım Koşulları
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                KVKK
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-40"
      >
        ↑
      </motion.button>
    </footer>
  )
}
