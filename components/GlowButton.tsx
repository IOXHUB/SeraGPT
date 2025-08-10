'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
}

export function GlowButton({ 
  children, 
  href, 
  variant = 'primary', 
  className = '', 
  onClick 
}: GlowButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold rounded-xl overflow-hidden transition-all duration-300 group"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg hover:shadow-cyan-500/50",
    secondary: "bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300"
  }

  const ButtonComponent = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Particle Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: (i * 17) % 100 - 50,
              y: (i * 13) % 50 - 25
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1
            }}
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`
            }}
          />
        ))}
      </div>
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        {ButtonComponent}
      </a>
    )
  }

  return ButtonComponent
}
