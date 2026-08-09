import { motion } from 'framer-motion'

export default function FloatingDecorations() {
  const decorations = [
    { emoji: '❤️', delay: 0, duration: 6 },
    { emoji: '✨', delay: 1, duration: 8 },
    { emoji: '🎀', delay: 2, duration: 7 },
    { emoji: '⭐', delay: 3, duration: 9 },
    { emoji: '💕', delay: 4, duration: 7.5 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {decorations.map((dec, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-20"
          animate={{
            y: [-100, window.innerHeight + 100],
            opacity: [0, 0.3, 0],
            x: Math.sin(i) * 100
          }}
          transition={{
            duration: dec.duration,
            delay: dec.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            left: `${15 + i * 18}%`,
            top: '-100px'
          }}
        >
          {dec.emoji}
        </motion.div>
      ))}
    </div>
  )
}
