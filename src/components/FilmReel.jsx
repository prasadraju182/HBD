
import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { memories } from '../data/memories'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

export default function FilmReel() {
  const [active, setActive] = useState(0)
  const touchStart = useRef(null)

  const current = memories[active]

  const previous = () => {
    setActive(index => (index - 1 + memories.length) % memories.length)
  }

  const next = () => {
    setActive(index => (index + 1) % memories.length)
  }

  const onTouchStart = event => {
    touchStart.current = event.touches[0].clientX
  }

  const onTouchEnd = event => {
    if (touchStart.current === null) return

    const difference = event.changedTouches[0].clientX - touchStart.current

    if (Math.abs(difference) > 45) {
      difference > 0 ? previous() : next()
    }

    touchStart.current = null
  }

  return (
    <section
      id="film"
      className="overflow-hidden bg-[#080809] px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] text-amber-200/70">
            A movie made of memories
          </p>
          <h2 className="mt-4 font-serif text-4xl text-white sm:text-6xl">
            Our little <span className="italic text-amber-200">film.</span>
          </h2>
        </div>

        <div className="film-frame relative overflow-hidden border border-amber-100/20 bg-black p-3 sm:p-5">
          <div className="mb-3 flex justify-between text-[8px] tracking-[0.3em] text-amber-100/45">
            <span>OUR STORY · ORIGINAL EDITION</span>
            <span>{String(active + 1).padStart(2, '0')} / {String(memories.length).padStart(2, '0')}</span>
          </div>

          <div
            className="relative overflow-hidden bg-[#171514]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="relative"
                initial={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45 }}
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="aspect-[4/3] max-h-[65svh] w-full object-contain sm:aspect-[16/8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 sm:bottom-9 sm:left-9">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-amber-200">
                    Chapter {active + 1}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-white sm:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-2 text-xs text-white/70 sm:text-sm">
                    {current.caption}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous memory"
              className="rounded-full border border-white/20 p-3 text-white hover:border-amber-200 hover:text-amber-200"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex flex-1 justify-center gap-1.5">
              {memories.map((photo, index) => (
                <button
                  type="button"
                  key={photo.id}
                  aria-label={`Go to memory ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    active === index
                      ? 'w-7 bg-amber-200'
                      : 'w-2 bg-white/25'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next memory"
              className="rounded-full border border-white/20 p-3 text-white hover:border-amber-200 hover:text-amber-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p className="mt-4 text-center text-[8px] uppercase tracking-[0.25em] text-white/30 sm:hidden">
            Swipe left or right to watch
          </p>
        </div>
      </div>
    </section>
  )
}
