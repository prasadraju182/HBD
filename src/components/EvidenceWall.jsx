
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2
} from 'lucide-react'

import { memories } from '../data/memories'

export default function EvidenceWall() {
  const [selected, setSelected] = useState(null)
  const touchStartX = useRef(null)

  const activePhoto =
    selected === null ? null : memories[selected]

  const previous = () => {
    setSelected(index =>
      index === null
        ? null
        : (index - 1 + memories.length) % memories.length
    )
  }

  const next = () => {
    setSelected(index =>
      index === null
        ? null
        : (index + 1) % memories.length
    )
  }

  useEffect(() => {
    if (selected === null) return

    const onKeyDown = event => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }

    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [selected])

  const onTouchStart = event => {
    touchStartX.current = event.touches[0].clientX
  }

  const onTouchEnd = event => {
    if (touchStartX.current === null) return

    const delta =
      event.changedTouches[0].clientX - touchStartX.current

    if (Math.abs(delta) > 45) {
      if (delta > 0) previous()
      else next()
    }

    touchStartX.current = null
  }

  return (
    <section className="relative overflow-hidden bg-[#0b0b0c] px-5 py-24 sm:px-8 md:py-32">

      <div className="mx-auto max-w-7xl">

        <motion.div
          className="mb-14 text-center md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-[9px] uppercase tracking-[0.48em] text-amber-200/65">
            A gallery of little moments
          </p>

          <h2 className="font-serif text-4xl tracking-tight text-[#f4ecdf] sm:text-6xl">
            The memory <span className="italic text-amber-200">collection.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45">
            Every picture holds a story. Tap any frame to step back into that moment.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">

          {memories.map((photo, index) => (
            <motion.button
              type="button"
              key={photo.id}
              onClick={() => setSelected(index)}
              className={`group relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-[#171615] text-left ${
                index % 5 === 0
                  ? 'sm:col-span-2 sm:aspect-[16/8] lg:col-span-1 lg:aspect-[4/5]'
                  : ''
              }`}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.65, delay: (index % 3) * 0.08 }}
              whileHover={{ y: -5 }}
              aria-label={`Open ${photo.title}`}
            >
              <img
                src={photo.image}
                alt={photo.title || `Memory ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 opacity-80" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-amber-200/80">
                    Memory {String(index + 1).padStart(2, '0')}
                  </p>

                  <p className="mt-2 font-serif text-base text-white sm:text-xl">
                    {photo.title}
                  </p>

                  <p className="mt-1 line-clamp-2 text-[10px] text-white/65 sm:text-xs">
                    {photo.caption}
                  </p>
                </div>

                <span className="mb-1 hidden rounded-full border border-white/35 p-2 text-white transition group-hover:border-amber-200 group-hover:text-amber-200 sm:block">
                  <Maximize2 size={14} />
                </span>
              </div>
            </motion.button>
          ))}

        </div>
      </div>

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/40 p-3 text-white hover:text-amber-200"
              aria-label="Close gallery"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              onClick={event => {
                event.stopPropagation()
                previous()
              }}
              className="absolute left-2 z-20 rounded-full border border-white/20 bg-black/40 p-3 text-white hover:text-amber-200 sm:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>

            <motion.div
              key={activePhoto.id}
              className="relative flex max-h-[88svh] w-full max-w-5xl flex-col items-center"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={event => event.stopPropagation()}
            >
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[72svh] w-auto max-w-full rounded-sm object-contain shadow-2xl"
              />

              <div className="mt-5 text-center">
                <p className="text-[9px] uppercase tracking-[0.35em] text-amber-200/70">
                  {String(selected + 1).padStart(2, '0')} / {String(memories.length).padStart(2, '0')}
                </p>

                <h3 className="mt-2 font-serif text-xl text-white sm:text-2xl">
                  {activePhoto.title}
                </h3>

                <p className="mt-1 text-xs text-white/55">
                  {activePhoto.caption}
                </p>

                <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:hidden">
                  Swipe to browse
                </p>
              </div>
            </motion.div>

            <button
              type="button"
              onClick={event => {
                event.stopPropagation()
                next()
              }}
              className="absolute right-2 z-20 rounded-full border border-white/20 bg-black/40 p-3 text-white hover:text-amber-200 sm:right-6"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
