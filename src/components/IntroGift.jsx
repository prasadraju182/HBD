import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function IntroGift({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 5000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cream to-soft-pink flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-20 right-32 w-96 h-96 gradient-blob opacity-60" />
      <div className="absolute bottom-20 left-20 w-96 h-96 gradient-blob-2 opacity-40" />

      {/* Sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{
            duration: 2,
            delay: 0.5 + i * 0.3,
            repeat: Infinity
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        >
          ✨
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Gift Box */}
        <motion.div
          className="mb-8 text-8xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎁
        </motion.div>

        {/* Main Text */}
        <motion.h1
          className="text-3xl md:text-4xl font-serif font-bold text-dark-gray mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Something special is waiting...
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-mid-pink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          ✨ Tap to unwrap ✨
        </motion.p>
      </motion.div>

      {/* Floating hearts (subtle) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-xl opacity-20"
          animate={{
            y: [0, -100],
            opacity: [0.2, 0],
            x: Math.random() * 100 - 50
          }}
          transition={{
            duration: 3,
            delay: i * 0.4,
            repeat: Infinity
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: '80%'
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}
