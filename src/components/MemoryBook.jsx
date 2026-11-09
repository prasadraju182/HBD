
import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { memories } from '../data/memories'

export default function MemoryBook() {
  const [page, setPage] = useState(0)
  const touchStart = useRef(null)

  const current = memories[page]

  const previous = () => {
    setPage(value => (value - 1 + memories.length) % memories.length)
  }

  const next = () => {
    setPage(value => (value + 1) % memories.length)
  }

  const touchEnd = event => {
    if (touchStart.current === null) return

    const difference = event.changedTouches[0].clientX - touchStart.current

    if (difference < -45) next()
    if (difference > 45) previous()

    touchStart.current = null
  }

  return (
    <section id="memory-book" className="overflow-hidden bg-[#11100f] px-5 py-28 sm:px-8 md:py-36">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-amber-200/70">
          Pages from our story
        </p>

        <h2 className="mt-5 font-serif text-4xl text-white sm:text-6xl">
          The memory <span className="italic text-amber-200">book.</span>
        </h2>

        <p className="mt-5 text-sm text-white/45">
          Every page has a story. Turn the pages and relive it.
        </p>

        <div className="mx-auto mt-14 max-w-2xl rounded-xl border border-amber-100/20 bg-[#241d16] p-3 shadow-[0_25px_90px_rgba(0,0,0,.5)] sm:p-6">
          <div className="rounded-lg border border-amber-100/15 bg-[#eee8dc] p-3 sm:p-6">
            <div
              className="relative overflow-hidden"
              onTouchStart={event => { touchStart.current = event.touches[0].clientX }}
              onTouchEnd={touchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0, rotateY: -25, x: 25 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, rotateY: 25, x: -25 }}
                  transition={{ duration: 0.45 }}
                  className="origin-left"
                >
                  <img
                    src={current.image}
                    alt={current.title || 'Memory book photograph'}
                    className="aspect-[4/3] max-h-[58svh] w-full object-contain"
                  />

                  <div className="px-3 pb-4 pt-5 text-center text-[#29231d]">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#96754a]">
                      Memory {page + 1} of {memories.length}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl sm:text-3xl">
                      {current.title || 'A beautiful moment'}
                    </h3>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6c6256]">
                      {current.caption || 'A memory worth keeping forever.'}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 px-1 pt-5">
            <button
              type="button"
              onClick={previous}
              className="min-h-11 rounded-full border border-amber-100/30 px-5 text-xs text-amber-100 transition hover:bg-amber-100/10"
            >
              ← Previous
            </button>

            <span className="text-[10px] tracking-[0.2em] text-amber-100/60">
              {page + 1} / {memories.length}
            </span>

            <button
              type="button"
              onClick={next}
              className="min-h-11 rounded-full border border-amber-100/30 px-5 text-xs text-amber-100 transition hover:bg-amber-100/10"
            >
              Next →
            </button>
          </div>
        </div>

        <p className="mt-5 text-[9px] uppercase tracking-[0.25em] text-white/30 sm:hidden">
          Swipe left or right to turn pages
        </p>
      </div>
    </section>
  )
}

