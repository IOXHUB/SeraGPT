'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface NavigationBarProps {
  activeSection: string
}

export function NavigationBar({ activeSection }: NavigationBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Ana Sayfa', icon: '🏠' },
    { id: 'about', label: 'Hakkımızda', icon: '🌱' },
    { id: 'services', label: 'Hizmetlerimiz', icon: '🔧' },
    { id: 'projects', label: 'Projelerimiz', icon: '🏗️' },
    { id: 'experience', label: 'Deneyim', icon: '⭐' },
    { id: 'contact', label: 'İletişim', icon: '📞' }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-green-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🌿</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">SeraGreen</h1>
              <p className="text-xs text-green-600">Profesyonel Sera Çözümleri</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeSection === item.id
                    ? 'bg-green-100 text-green-700 shadow-sm'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-green-100 py-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center space-x-3 ${
                  activeSection === item.id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
