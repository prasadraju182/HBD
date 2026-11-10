
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, Heart, PartyPopper, Star } from 'lucide-react'

const colors = [
  '#f4d28e',
  '#e7a9b5',
  '#fff1d1',
  '#c9a7df',
  '#f5c76b',
  '#ffffff',
]

const confetti = Array.from({ length: 100 }, (_, i) => {
  const angle = (i / 100) * Math.PI * 2
  const distance = 100 + (i % 7) * 45

  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: (i % 20) * 0.035,
    rotate: i * 47,
    color: colors[i % colors.length],
    size: 5 + (i % 5) * 2,
  }
})

const hearts = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: `${2 + ((i * 31) % 96)}%`,
  delay: (i % 12) * 0.25,
  duration: 4 + (i % 4),
  size: 14 + (i % 5) * 8,
}))

const stars = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: `${(i * 47) % 100}%`,
  top: `${(i * 67) % 100}%`,
  delay: (i % 10) * 0.3,
  size: 8 + (i % 4) * 5,
}))

function ConfettiBurst({ delay = 0, scale = 1 }) {
  return (
    <>
      {confetti.map((piece) => (
        <motion.span
          key={`${delay}-${piece.id}`}
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-sm"
          style={{
            width: piece.size,
            height: piece.size * 1.5,
            backgroundColor: piece.color,
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            x: piece.x * 2.3 * scale,
            y: piece.y * 2.3 * scale,
            opacity: [0, 1, 1, 0],
            scale: [0.2, 1.5, 1, 0.2],
            rotate: piece.rotate,
          }}
          transition={{
            duration: 3.5,
            delay: delay + piece.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  )
}

export default function Celebration() {
  const [active, setActive] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)

  useEffect(() => {
    if (!active) {
      setShowSurprise(false)
      return
    }

    const surpriseTimer = window.setTimeout(() => {
      setShowSurprise(true)
    }, 2400)

    const closeTimer = window.setTimeout(() => {
      setActive(false)
    }, 11000)

    return () => {
      window.clearTimeout(surpriseTimer)
      window.clearTimeout(closeTimer)
    }
  }, [active])

  const celebrate = () => {
    setShowSurprise(false)
    setActive(true)
  }

  return (
    <>
      {/* Celebration trigger */}
      <section className="relative isolate overflow-hidden bg-[#08080b] px-5 py-32 text-center sm:px-8">
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{
            opacity: [0.35, 0.8, 0.35],
            scale: [1, 1.12, 1],
          }}
          transition={{ duration: 7, repeat: Infinity }}
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(206,160,85,.19), transparent 65%)',
          }}
        />

        <motion.div
          className="relative z-10 mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{
              rotate: [0, -12, 12, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <Sparkles
              className="mx-auto mb-6 text-amber-200"
              size={32}
            />
          </motion.div>

          <p className="text-[9px] uppercase tracking-[0.5em] text-amber-200/70">
            A little celebration of us
          </p>

          <h2 className="mt-5 font-serif text-4xl text-white sm:text-6xl">
            Here's to our
            <br />
            <motion.span
              className="inline-block italic text-amber-200"
              animate={{
                textShadow: [
                  '0 0 0px rgba(245,205,120,0)',
                  '0 0 25px rgba(245,205,120,.65)',
                  '0 0 0px rgba(245,205,120,0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              forever friendship.
            </motion.span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-8 text-white/50">
            Every laugh, every silly moment, every unforgettable memory.
            Some friendships deserve their own celebration.
          </p>

          <motion.button
            type="button"
            onClick={celebrate}
            disabled={active}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 35px rgba(245,205,120,.35)',
            }}
            whileTap={{ scale: 0.94 }}
            className="mt-10 inline-flex min-h-14 items-center gap-3 rounded-full border border-amber-200/50 bg-amber-200/10 px-9 py-4 text-[10px] uppercase tracking-[0.25em] text-amber-100 transition hover:bg-amber-200 hover:text-black disabled:opacity-50"
          >
            <PartyPopper size={18} />
            {active ? 'Celebrating our friendship...' : 'Celebrate our friendship'}
          </motion.button>
        </motion.div>
      </section>

      {/* Full-screen cinematic celebration */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {active && (
              <motion.div
                className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#050507] px-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.7 }}
                onClick={() => setActive(false)}
              >
                {/* Animated golden background */}
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  animate={{
                    opacity: [0.25, 0.75, 0.3],
                    scale: [0.9, 1.3, 0.9],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background:
                      'radial-gradient(circle at 50% 48%, rgba(218,171,93,.35), transparent 65%)',
                  }}
                />

                {/* Expanding light rings */}
                {[0, 1, 2].map((ring) => (
                  <motion.div
                    key={ring}
                    className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(85vw,85vh)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/30"
                    initial={{ scale: 0.1, opacity: 0 }}
                    animate={{
                      scale: [0.1, 1.7],
                      opacity: [0.7, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      delay: ring * 0.65,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                ))}

                {/* First confetti wave */}
                <ConfettiBurst delay={0} scale={1} />

                {/* Second confetti wave */}
                <ConfettiBurst delay={0.7} scale={0.7} />

                {/* Third confetti wave */}
                <ConfettiBurst delay={1.4} scale={1.2} />

                {/* Twinkling stars */}
                {stars.map((star) => (
                  <motion.div
                    key={star.id}
                    className="pointer-events-none absolute text-amber-100"
                    style={{
                      left: star.left,
                      top: star.top,
                    }}
                    animate={{
                      opacity: [0.1, 1, 0.2],
                      scale: [0.5, 1.5, 0.5],
                      rotate: [0, 90, 180],
                    }}
                    transition={{
                      duration: 2 + (star.id % 3),
                      delay: star.delay,
                      repeat: Infinity,
                    }}
                  >
                    <Star size={star.size} fill="currentColor" />
                  </motion.div>
                ))}

                {/* Floating hearts */}
                {hearts.map((heart) => (
                  <motion.div
                    key={heart.id}
                    className="pointer-events-none absolute bottom-[-50px] text-amber-200"
                    style={{
                      left: heart.left,
                      fontSize: heart.size,
                    }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                      y: '-115vh',
                      opacity: [0, 0.9, 0.9, 0],
                      rotate: [0, 25, -25, 10],
                    }}
                    transition={{
                      duration: heart.duration,
                      delay: heart.delay,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    ♥
                  </motion.div>
                ))}

                {/* Main animated message */}
                <motion.div
                  className="pointer-events-none relative z-10 mx-auto max-w-4xl text-center"
                  initial={{
                    opacity: 0,
                    scale: 0.45,
                    y: 60,
                    filter: 'blur(15px)',
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.35,
                    type: 'spring',
                    stiffness: 65,
                  }}
                >
                  {/* Pulsing heart */}
                  <motion.div
                    animate={{
                      scale: [1, 1.25, 1],
                      rotate: [0, -12, 12, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Heart
                      size={54}
                      fill="#e9bd70"
                      className="mx-auto mb-8 text-amber-200 drop-shadow-[0_0_20px_rgba(245,205,120,.8)]"
                    />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-6 text-[9px] uppercase tracking-[0.5em] text-amber-200/80 sm:text-xs"
                  >
                    A story made of a thousand little moments
                  </motion.p>

                  <h2 className="font-serif text-5xl leading-tight text-white sm:text-7xl md:text-8xl">
                    A forever
                    <br />
                    <motion.span
                      className="inline-block italic text-amber-200"
                      animate={{
                        textShadow: [
                          '0 0 5px rgba(245,205,120,.2)',
                          '0 0 35px rgba(245,205,120,.9)',
                          '0 0 5px rgba(245,205,120,.2)',
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      friendship.
                    </motion.span>
                  </h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 1 }}
                    className="mx-auto mt-8 max-w-xl text-sm leading-8 tracking-wide text-white/75 sm:text-base"
                  >
                    To Jyothika,
                    <br />
                    Thank you for all the laughter, madness and memories.
                    <br />
                    Every little moment has a story worth keeping.
                  </motion.p>

                  <AnimatePresence>
                    {showSurprise && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 30,
                          scale: 0.7,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          duration: 1,
                          type: 'spring',
                        }}
                        className="mt-8"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="font-serif text-xl italic text-amber-100 sm:text-2xl"
                        >
                          Not just memories.
                          <br />
                          A friendship that stays forever. ❤️
                        </motion.div>

                        <motion.div
                          className="mt-5 flex justify-center gap-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {[0, 1, 2, 3, 4].map((item) => (
                            <motion.span
                              key={item}
                              animate={{
                                y: [0, -12, 0],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1.2,
                                delay: item * 0.12,
                                repeat: Infinity,
                              }}
                            >
                              <Heart
                                size={17}
                                fill="#e9bd70"
                                className="text-amber-200"
                              />
                            </motion.span>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Close button */}
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  onClick={() => setActive(false)}
                  className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 rounded-full border border-amber-200/50 bg-black/50 px-8 py-3 text-[9px] uppercase tracking-[0.25em] text-amber-100 backdrop-blur-md transition hover:bg-amber-200 hover:text-black"
                >
                  Return to our memories
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
