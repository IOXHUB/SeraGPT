'use client'

import { motion } from 'framer-motion'

interface Feature {
  icon: string
  title: string
  description: string
  gradient: string
}

interface FeatureCardProps {
  feature: Feature
  index: number
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10, 
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur`}></div>
      
      {/* Main Card */}
      <div className="relative bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 h-full group-hover:border-cyan-500/50 transition-all duration-500">
        {/* Holographic Background Pattern */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl"></div>
        </div>
        
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-4xl mb-6 flex items-center justify-center w-16 h-16 mx-auto"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
          <span className="relative z-10">{feature.icon}</span>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-500">
            {feature.title}
          </h3>
          <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
            {feature.description}
          </p>
        </div>

        {/* Animated Corner Elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-75"></div>
      </div>
    </motion.div>
  )
}
