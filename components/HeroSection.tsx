'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "20 Yıllık Deneyimle",
      subtitle: "Profesyonel Sera Çözümleri",
      description: "Ziraat mühendisliği uzmanlığımızla modern sera teknolojilerini buluşturuyoruz",
      image: "🌿",
      stats: "500+ Başarılı Proje"
    },
    {
      title: "Uluslararası Kalitede",
      subtitle: "Sera Montaj Hizmetleri", 
      description: "Avrupa standartlarında sera sistemleri ile verimli üretim çözümleri sunuyoruz",
      image: "🏗️",
      stats: "15+ Ülkede Hizmet"
    },
    {
      title: "Modern Teknoloji",
      subtitle: "Akıllı Sera Sistemleri",
      description: "IoT destekli iklim kontrol ve otomasyon sistemleriyle geleceğin tarımını inşa ediyoruz",
      image: "🚀",
      stats: "99% Müşteri Memnuniyeti"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-lg font-semibold text-green-600 mb-2">
                {slides[currentSlide].title}
              </h2>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                {slides[currentSlide].subtitle}
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {slides[currentSlide].description}
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
                ⭐ {slides[currentSlide].stats}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(34, 197, 94, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🌱 Teklif Alın
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all duration-300"
              >
                📁 Projelerimizi İnceleyin
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 shadow-2xl">
              {/* Main Image Placeholder */}
              <motion.div
                key={currentSlide}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="text-8xl mb-6">{slides[currentSlide].image}</div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Ziraat Mühendisi
                  </h3>
                  <p className="text-gray-600">
                    20+ Yıl Profesyonel Deneyim
                  </p>
                </div>
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg"
              >
                <div className="text-2xl text-green-600">📊</div>
                <div className="text-xs font-semibold text-gray-700">Başarı Oranı</div>
                <div className="text-lg font-bold text-green-600">%99</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg"
              >
                <div className="text-2xl text-blue-600">🌍</div>
                <div className="text-xs font-semibold text-gray-700">Ülke Sayısı</div>
                <div className="text-lg font-bold text-blue-600">15+</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-green-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-gray-500"
        >
          <span className="text-sm mb-2">Aşağı Kaydırın</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
