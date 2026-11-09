
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { memories } from '../data/memories'

export default function OurUniverse() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="universe" className="relative overflow-hidden bg-[#080a12] px-5 py-28 sm:px-8 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(87,79,160,.18),transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <p className="text-[9px] uppercase tracking-[0.45em] text-amber-200/70">
          Somewhere between a thousand stars
        </p>

        <h2 className="mt-5 font-serif text-4xl text-white sm:text-6xl">
          Our little <span className="italic text-amber-200">universe.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/50">
          Every star holds a memory. Choose one and revisit a little piece of our story.
        </p>

        <div className="relative mx-auto mt-12 min-h-[430px] max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0e1a]/70 sm:min-h-[520px]">
          {Array.from({ length: 55 }, (_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white"
              style={{
                left: `${(i * 37 + 11) % 97}%`,
                top: `${(i * 53 + 7) % 94}%`
              }}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.5, 0.8] }}
              transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.07 }}
            />
          ))}

          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 520" preserveAspectRatio="none">
            <path d="M130 270 L280 130 L440 220 L610 100 L790 230 L880 360 L650 410 L440 340 L280 420 Z" fill="none" stroke="rgba(226,195,133,.2)" strokeWidth="1.5" strokeDasharray="5 8" />
          </svg>

          {memories.map((photo, index) => {
            const angle = (index / memories.length) * Math.PI * 2 - Math.PI / 2
            const x = 50 + Math.cos(angle) * 34
            const y = 50 + Math.sin(angle) * 34

            return (
              <motion.button
                key={index}
                type="button"
                aria-label={`Open memory ${index + 1}`}
                onClick={() => setSelected(photo)}
                className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                style={{ left: `${x}%`, top: `${y}%` }}
                whileHover={{ scale: 1.35 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.span
                  className="block h-4 w-4 rounded-full border border-amber-100 bg-amber-200 shadow-[0_0_12px_4px_rgba(245,205,120,.55)] sm:h-5 sm:w-5"
                  animate={{ boxShadow: ['0 0 8px 2px rgba(245,205,120,.3)', '0 0 22px 8px rgba(245,205,120,.65)', '0 0 8px 2px rgba(245,205,120,.3)'] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }}
                />
                <span className="rounded-full bg-black/50 px-2 py-1 text-[8px] text-amber-100/80 backdrop-blur">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.button>
            )
          })}

          <div className="pointer-events-none absolute inset-x-0 bottom-5 text-center text-[8px] uppercase tracking-[0.3em] text-white/35">
            Tap a glowing star to open a memory
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="w-full max-w-md overflow-hidden rounded-2xl border border-amber-100/20 bg-[#15141a] p-4 shadow-2xl"
              initial={{ scale: 0.85, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9 }}
              onClick={event => event.stopPropagation()}
            >
              <img
                src={selected.image}
                alt={selected.title || 'Friendship memory'}
                className="max-h-[55svh] w-full rounded-xl object-contain"
              />
              <h3 className="mt-5 font-serif text-2xl text-amber-100">
                {selected.title || 'A special memory'}
              </h3>
              <p className="mt-2 text-sm leading-7 text-white/60">
                {selected.caption || 'A moment worth remembering.'}
              </p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mt-5 min-h-11 w-full rounded-full border border-white/20 text-xs text-white/70"
              >
                Close memory
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
