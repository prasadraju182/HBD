
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { chaosMessages } from '../data/memories'

const confetti = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  x: Math.cos((i / 32) * Math.PI * 2) * (100 + (i % 4) * 35),
  y: Math.sin((i / 32) * Math.PI * 2) * (100 + (i % 4) * 35),
  color: ['#FF6B9D', '#E91E63', '#FFC5D9', '#F5D58B'][i % 4],
  delay: (i % 8) * 0.035,
}))

export default function ChaosButton() {
  const [active, setActive] = useState(false)
  const [message, setMessage] = useState('')

  const handleClick = () => {
    if (active) return

    const randomMessage =
      chaosMessages[Math.floor(Math.random() * chaosMessages.length)]

    setMessage(randomMessage)
    setActive(true)

    window.setTimeout(() => {
      setActive(false)
    }, 3200)
  }

  return (
    <div className="relative z-10 flex justify-center px-3">

      <motion.div
        className="relative w-full max-w-sm rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-white to-pink-50 px-6 py-10 shadow-[0_0_35px_rgba(255,80,140,0.25)] sm:px-10"
        animate={active ? {
          x: [0, -7, 7, -5, 5, 0],
          boxShadow: [
            '0 0 25px rgba(255,80,140,.3)',
            '0 0 55px rgba(255,80,140,.7)',
            '0 0 25px rgba(255,80,140,.3)'
          ]
        } : {}}
        transition={{ duration: 0.5 }}
      >

        <motion.p
          className="mb-3 text-lg font-semibold text-pink-600"
          animate={active ? { scale: [1, 1.12, 1] } : {}}
        >
          ⚠️ DO NOT TOUCH ⚠️
        </motion.p>

        <p className="mb-7 text-sm text-pink-400">
          Seriously. Don't.
        </p>

        <motion.button
          type="button"
          onClick={handleClick}
          disabled={active}
          whileHover={!active ? {
            scale: 1.06,
            boxShadow: '0 0 30px rgba(236,72,153,.45)'
          } : {}}
          whileTap={{ scale: 0.94 }}
          className="min-h-14 w-full rounded-full bg-gradient-to-r from-pink-400 to-pink-600 px-7 py-4 text-sm font-bold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {active ? 'CHAOS ACTIVATED! 😂' : 'PRESS IT ANYWAY'}
        </motion.button>

        <AnimatePresence>
          {active && (
            <motion.p
              key="button-message"
              className="mt-5 text-sm font-bold text-pink-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

      </motion.div>

      {/* Full-screen confetti animation */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {confetti.map(item => (
              <motion.span
                key={item.id}
                className="absolute left-1/2 top-1/2 h-3 w-3 rounded-sm"
                style={{ backgroundColor: item.color }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0
                }}
                animate={{
                  x: item.x * 2,
                  y: item.y * 2,
                  rotate: 720,
                  opacity: [1, 1, 0],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: 2.3,
                  delay: item.delay,
                  ease: 'easeOut'
                }}
              />
            ))}

            <motion.div
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl sm:text-7xl">🎉😂💖</div>

              <h2 className="mt-6 font-serif text-3xl font-bold text-white drop-shadow-lg sm:text-6xl">
                YOU WERE WARNED!
              </h2>

              <p className="mt-5 text-sm tracking-widest text-amber-200 sm:text-base">
                JYOTHIKA CHAOS LEVEL: 100% 😂
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
