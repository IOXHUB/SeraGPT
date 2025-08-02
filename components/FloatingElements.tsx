'use client'

import { motion } from 'framer-motion'

export function FloatingElements() {
  const elements = [
    { icon: '⚡', delay: 0, x: '10%', y: '20%' },
    { icon: '🔮', delay: 1, x: '80%', y: '15%' },
    { icon: '✨', delay: 2, x: '15%', y: '70%' },
    { icon: '🚀', delay: 0.5, x: '85%', y: '75%' },
    { icon: '💎', delay: 1.5, x: '50%', y: '10%' },
    { icon: '🌟', delay: 2.5, x: '20%', y: '50%' },
    { icon: '🔥', delay: 3, x: '75%', y: '45%' },
    { icon: '💫', delay: 0.8, x: '60%', y: '80%' }
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-20"
          style={{ left: element.x, top: element.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        >
          <motion.span
            animate={{
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: element.delay
            }}
          >
            {element.icon}
          </motion.span>
        </motion.div>
      ))}
      
      {/* Holographic Grid Lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-grid-pattern"></div>
      </div>
      
      {/* Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-2 h-2 rounded-full bg-cyan-400/30"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.5, 0.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  )
}
