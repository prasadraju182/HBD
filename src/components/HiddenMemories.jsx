
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, Unlock, Heart } from 'lucide-react'

const secrets = [
  {
    title: 'The little things',
    message: 'Sometimes the smallest moments become the biggest memories.'
  },
  {
    title: 'A little reminder',
    message: 'Never forget how special, unique and wonderful you are.'
  },
  {
    title: 'Future chapters',
    message: 'There are still so many stories, laughs and adventures waiting for us.'
  },
  {
    title: 'One last secret',
    message: 'This website is only a tiny collection of memories. The real friendship is much bigger.'
  }
]

export default function HiddenMemories() {
  const [revealed, setRevealed] = useState([])

  const toggle = index => {
    setRevealed(current =>
      current.includes(index)
        ? current.filter(item => item !== index)
        : [...current, index]
    )
  }

  return (
    <section
      id="surprise"
      className="bg-[#101011] px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] text-amber-200/70">
            Not everything is revealed
          </p>
          <h2 className="mt-4 font-serif text-4xl text-white sm:text-6xl">
            Hidden <span className="italic text-amber-200">memories.</span>
          </h2>
          <p className="mt-5 text-sm text-white/45">
            Four little secrets are waiting. Tap each one.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {secrets.map((secret, index) => {
            const isRevealed = revealed.includes(index)

            return (
              <motion.button
                key={secret.title}
                type="button"
                onClick={() => toggle(index)}
                className="min-h-44 rounded-sm border border-amber-100/15 bg-gradient-to-br from-[#201a13] to-[#111] p-7 text-left transition hover:border-amber-200/40"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                aria-expanded={isRevealed}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-amber-200/60">
                    Secret {String(index + 1).padStart(2, '0')}
                  </span>
                  {isRevealed
                    ? <Unlock size={18} className="text-amber-200" />
                    : <Lock size={18} className="text-amber-200/60" />
                  }
                </div>

                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.div
                      key="revealed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mt-6"
                    >
                      <Heart size={17} className="mb-3 text-amber-200" />
                      <h3 className="font-serif text-xl text-amber-100">
                        {secret.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/65">
                        {secret.message}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="locked"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-8"
                    >
                      <h3 className="font-serif text-xl text-white">
                        A secret is waiting...
                      </h3>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
                        Tap to reveal
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
