
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Sparkles, RotateCcw, Zap } from 'lucide-react'

const results = [
  {
    score: 100,
    title: 'LEGENDARY FRIENDSHIP',
    message: 'Too much madness. Too many memories. Absolutely iconic. 😂'
  },
  {
    score: 98,
    title: 'PARTNERS IN CRIME',
    message: 'One look is enough to start a thousand adventures. 💕'
  },
  {
    score: 99,
    title: 'UNSTOPPABLE DUO',
    message: 'Normal friendship? Never heard of it. ✨'
  }
]

export default function ChaosSection() {
  const [revealed, setRevealed] = useState(false)
  const [result, setResult] = useState(results[0])

  const revealScore = () => {
    const random = results[Math.floor(Math.random() * results.length)]
    setResult(random)
    setRevealed(true)
  }

  const reset = () => {
    setRevealed(false)
  }

  return (
    <section
      id="moments"
      className="relative overflow-hidden bg-[#0b0b0c] px-5 py-28 sm:px-8 md:py-36"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(202,158,91,.12),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-5 text-[9px] uppercase tracking-[0.45em] text-amber-200/70">
            A scientifically questionable experiment
          </p>

          <h2 className="font-serif text-4xl leading-tight text-white sm:text-6xl">
            How strong is our
            <br />
            <span className="italic text-amber-200">friendship?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/45">
            We tried to measure the laughter, madness, memories
            and all those unforgettable moments.
          </p>
        </motion.div>

        {/* Friendship meter */}
        <motion.div
          className="mx-auto mt-14 max-w-2xl rounded-2xl border border-amber-100/15 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,.3)] backdrop-blur-xl sm:p-10"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <div className="flex items-center justify-center gap-3 text-amber-200">
            <Heart size={18} />
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Friendship compatibility
            </span>
            <Heart size={18} />
          </div>

          {/* Score */}
          <div className="my-10">
            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="font-serif text-7xl text-white/20 sm:text-8xl">
                    ??%
                  </div>

                  <p className="mt-3 text-xs text-white/40">
                    The results are waiting to be discovered...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.65, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 130 }}
                >
                  <motion.div
                    className="font-serif text-7xl text-amber-200 sm:text-8xl"
                    animate={{
                      textShadow: [
                        '0 0 0 rgba(230,200,140,0)',
                        '0 0 35px rgba(230,200,140,.45)',
                        '0 0 0 rgba(230,200,140,0)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {result.score}%
                  </motion.div>

                  <h3 className="mt-5 text-lg font-semibold tracking-[0.15em] text-amber-100 sm:text-xl">
                    {result.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {result.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Animated progress bar */}
          <div className="mx-auto max-w-lg">
            <div className="mb-3 flex justify-between text-[9px] uppercase tracking-[0.2em] text-white/40">
              <span>Ordinary</span>
              <span>Legendary</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-300 to-pink-300 shadow-[0_0_20px_rgba(230,190,120,.45)]"
                initial={{ width: '0%' }}
                animate={{
                  width: revealed ? `${result.score}%` : '0%'
                }}
                transition={{
                  duration: 2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              />
            </div>
          </div>

          {/* Action */}
          {!revealed ? (
            <motion.button
              type="button"
              onClick={revealScore}
              className="mt-10 inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-amber-200/40 bg-gradient-to-r from-amber-200/15 to-pink-300/10 px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-100 transition hover:border-amber-200 hover:bg-amber-200 hover:text-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={16} />
              Reveal our score
              <Sparkles size={16} />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={reset}
              className="mt-10 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/15 px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-white/65 transition hover:border-amber-200 hover:text-amber-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={14} />
              Test again
            </motion.button>
          )}

        </motion.div>

        <motion.p
          className="mt-9 font-serif text-lg italic text-amber-100/50"
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Some bonds cannot be measured. ❤️
        </motion.p>

      </div>
    </section>
  )
}
