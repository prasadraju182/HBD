
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PartyPopper, Sparkles } from 'lucide-react'

const particles = Array.from({ length: 32 }, (_, i) => ({
  x: Math.cos((i / 32) * Math.PI * 2) * (80 + (i % 4) * 35),
  y: Math.sin((i / 32) * Math.PI * 2) * (80 + (i % 4) * 35),
  delay: (i % 8) * 0.035,
  rotate: i * 37
}))

export default function Celebration() {
  const [active, setActive] = useState(false)

  const celebrate = () => {
    if (active) return
    setActive(true)
    window.setTimeout(() => setActive(false), 3200)
  }

  return (
    <section className="relative overflow-hidden bg-[#0b0b0c] px-5 py-24 text-center sm:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="text-[9px] uppercase tracking-[0.4em] text-amber-200/70">
          One more little surprise
        </p>

        <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">
          Let's make some <span className="italic text-amber-200">noise.</span>
        </h2>

        <p className="mt-5 text-sm text-white/45">
          Press the button and let the celebration begin.
        </p>

        <motion.button
          type="button"
          onClick={celebrate}
          disabled={active}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="mt-9 inline-flex min-h-14 items-center gap-3 border border-amber-200/40 bg-amber-200/10 px-8 py-4 text-[10px] uppercase tracking-[0.25em] text-amber-100 transition hover:bg-amber-200 hover:text-black disabled:opacity-70"
        >
          <PartyPopper size={18} />
          Celebrate Jyothika
        </motion.button>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-amber-100/[0.04]" />

            {particles.map((particle, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 block h-2 w-2 rounded-sm"
                style={{
                  background: ['#f4d28e', '#e7a9b5', '#fff1d1', '#c9a7df'][i % 4]
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: particle.x * 2.2,
                  y: particle.y * 2.2,
                  opacity: [1, 1, 0],
                  scale: [0.5, 1.4, 0.5],
                  rotate: particle.rotate
                }}
                transition={{
                  duration: 2.3,
                  delay: particle.delay,
                  ease: 'easeOut'
                }}
              />
            ))}

            <motion.div
              className="absolute inset-x-5 top-1/2 -translate-y-1/2 text-center"
              initial={{ opacity: 0, scale: 0.6, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Sparkles className="mx-auto mb-5 text-amber-200" size={38} />
              <h3 className="font-serif text-4xl text-white sm:text-6xl">
                You're unforgettable!
              </h3>
              <p className="mt-5 text-sm tracking-widest text-amber-100">
                HAPPY MEMORIES, JYOTHIKA ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
