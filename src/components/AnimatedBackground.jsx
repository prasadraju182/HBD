
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateDevice = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    updateDevice()
    window.addEventListener('resize', updateDevice)

    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const move = (event) => {
      setPosition({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [isMobile])

  const particles = Array.from(
    { length: isMobile ? 10 : 28 },
    (_, i) => ({
      id: i,
      left: `${(i * 37) % 100}%`,
      duration: 8 + (i % 5),
      delay: (i % 6) * 0.8,
      size: 2 + (i % 3)
    })
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

      {!isMobile && (
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: `radial-gradient(450px circle at ${position.x}% ${position.y}%, rgba(214,178,108,0.09), transparent 70%)`
          }}
        />
      )}

      <motion.div
        className="absolute w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-amber-300/[0.06] blur-[100px]"
        animate={{
          x: [0, isMobile ? 30 : 120, 0],
          y: [0, isMobile ? 40 : 100, 0]
        }}
        transition={{
          duration: isMobile ? 30 : 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ top: '-10%', left: '-10%' }}
      />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-amber-100"
          style={{
            left: particle.left,
            bottom: '-20px',
            width: particle.size,
            height: particle.size,
            boxShadow: '0 0 8px rgba(255,220,150,0.5)'
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {!isMobile && <div className="absolute inset-0 film-grain opacity-[0.12]" />}
    </div>
  )
}
