'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ParticleBackground } from '@/components/ParticleBackground'
import { FeatureCard } from '@/components/FeatureCard'
import { GlowButton } from '@/components/GlowButton'
import { FloatingElements } from '@/components/FloatingElements'

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: '🧠',
      title: 'Yapay Zeka Gücü',
      description: 'En gelişmiş AI teknolojisiyle desteklenen akıllı çözümler',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⚡',
      title: 'Işık Hızında Yanıt',
      description: 'Anında sonuç alın, zamandan tasarruf edin',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🚀',
      title: 'Gelecek Teknoloji',
      description: 'Yarının teknolojisini bugün deneyimleyin',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: '🔮',
      title: 'Sınırsız Potansiyel',
      description: 'Hayal gücünüzün sınırlarını zorlamanın zamanı',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Floating Elements */}
      <FloatingElements />
      
      {/* Custom Cursor */}
      <div 
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
          borderRadius: '50%',
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-blue-800 to-cyan-800 animate-gradient-x"></div>
        </div>
        
        {/* Glass Morphism Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ y: y1, opacity }}
          className="relative z-10 text-center max-w-6xl mx-auto px-6"
        >
          {/* Holographic Title */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse-glow"
          >
            SERA<span className="text-cyan-300">GPT</span>
          </motion.h1>
          
          {/* Subtitle with Typewriter Effect */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-gray-300 font-light"
          >
            <span className="typewriter">Geleceğin Yapay Zeka Asistanı</span>
          </motion.p>
          
          {/* Holographic Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mb-12"
          >
            <p className="text-lg text-cyan-300 font-mono">
              &gt; Hayal gücünüzün sınırlarını zorlayın_
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <GlowButton 
              href="/chat"
              variant="primary"
              className="px-8 py-4 text-lg"
            >
              🚀 Hemen Başla
            </GlowButton>
            <GlowButton 
              href="#features"
              variant="secondary"
              className="px-8 py-4 text-lg"
            >
              ⚡ Keşfet
            </GlowButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20">
        <motion.div 
          style={{ y: y2 }}
          className="max-w-7xl mx-auto px-6"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          >
            Gelecek Burada
          </motion.h2>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { number: '1M+', label: 'Kullanıcı', icon: '👥' },
              { number: '99.9%', label: 'Uptime', icon: '⚡' },
              { number: '∞', label: 'Potansiyel', icon: '🚀' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="glass-card p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-500 group-hover:shadow-cyan-500/50 group-hover:shadow-2xl">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="text-center max-w-4xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Geleceğe Yolculuk Başlasın
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-12"
          >
            Yapay zekanın gücüyle tanışın ve imkansızı mümkün kılın
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <GlowButton 
              href="/chat"
              variant="primary"
              className="px-12 py-6 text-xl"
            >
              🚀 Şimdi Deneyimle
            </GlowButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
